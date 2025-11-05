export const calculateBalances = (participants, expenses) => {
  const balances = {};
  
  participants.forEach(p => {
    balances[p.id] = 0;
  });
  
  expenses.forEach(expense => {
    balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount;
    
    Object.entries(expense.splits).forEach(([participantId, amount]) => {
      balances[participantId] = (balances[participantId] || 0) - amount;
    });
  });
  
  return balances;
};

export const calculateSettlements = (participants, expenses) => {
  const balances = calculateBalances(participants, expenses);
  
  const creditors = [];
  const debtors = [];
  
  Object.entries(balances).forEach(([id, balance]) => {
    if (balance > 0.01) {
      creditors.push({ id, amount: balance });
    } else if (balance < -0.01) {
      debtors.push({ id, amount: -balance });
    }
  });
  
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);
  
  const settlements = [];
  let i = 0, j = 0;
  
  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];
    
    const transferAmount = Math.min(creditor.amount, debtor.amount);
    
    settlements.push({
      from: debtor.id,
      to: creditor.id,
      amount: Math.round(transferAmount * 100) / 100
    });
    
    creditor.amount -= transferAmount;
    debtor.amount -= transferAmount;
    
    if (creditor.amount < 0.01) i++;
    if (debtor.amount < 0.01) j++;
  }
  
  return settlements;
};

export const getParticipantTotalPaid = (participantId, expenses) => {
  return expenses
    .filter(e => e.paidBy === participantId)
    .reduce((sum, e) => sum + e.amount, 0);
};

export const getParticipantTotalOwed = (participantId, expenses) => {
  return expenses
    .filter(e => e.splits[participantId])
    .reduce((sum, e) => sum + e.splits[participantId], 0);
};
