import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency, formatDateFull } from './formatters';

export const generatePDF = (groupName, participants, expenses, balances, settlements, currency) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('EquiFlow', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text(`Récapitulatif - ${groupName}`, 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 37, { align: 'center' });

  let yPos = 50;

  // Participants section
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Participants', 14, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  participants.forEach(p => {
    doc.text(`• ${p.name}`, 20, yPos);
    yPos += 5;
  });

  yPos += 5;

  // Expenses section
  if (expenses.length > 0) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Dépenses', 14, yPos);
    yPos += 5;

    const expenseData = expenses.map(e => {
      const payer = participants.find(p => p.id === e.paidBy);
      return [
        e.title,
        formatDateFull(e.date),
        payer?.name || 'Inconnu',
        formatCurrency(e.amount, currency)
      ];
    });

    doc.autoTable({
      startY: yPos,
      head: [['Titre', 'Date', 'Payé par', 'Montant']],
      body: expenseData,
      theme: 'striped',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] }
    });

    yPos = doc.lastAutoTable.finalY + 10;
  }

  // Balances section
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Balances finales', 14, yPos);
  yPos += 5;

  const balanceData = participants.map(p => {
    const balance = balances[p.id] || 0;
    const status = balance > 0.01 ? 'Doit recevoir' : 
                   balance < -0.01 ? 'Doit payer' : 
                   'Équilibré';
    return [
      p.name,
      formatCurrency(balance, currency),
      status
    ];
  });

  doc.autoTable({
    startY: yPos,
    head: [['Participant', 'Balance', 'Statut']],
    body: balanceData,
    theme: 'striped',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] }
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Settlements section
  if (settlements.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Remboursements à effectuer', 14, yPos);
    yPos += 5;

    const settlementData = settlements.map(s => {
      const fromName = participants.find(p => p.id === s.from)?.name || 'Inconnu';
      const toName = participants.find(p => p.id === s.to)?.name || 'Inconnu';
      return [
        fromName,
        toName,
        formatCurrency(s.amount, currency)
      ];
    });

    doc.autoTable({
      startY: yPos,
      head: [['De', 'À', 'Montant']],
      body: settlementData,
      theme: 'striped',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] }
    });
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save
  doc.save(`${groupName.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`);
};
