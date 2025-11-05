import { useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { calculateBalances, calculateSettlements } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { generatePDF } from '../../utils/pdfExport';

const BalanceView = ({ participants, expenses, currency, groupName }) => {
  const balances = useMemo(() => calculateBalances(participants, expenses), [participants, expenses]);
  const settlements = useMemo(() => calculateSettlements(participants, expenses), [participants, expenses]);

  const getParticipantName = (id) => {
    return participants.find(p => p.id === id)?.name || 'Inconnu';
  };

  const handleExportPDF = () => {
    generatePDF(groupName, participants, expenses, balances, settlements, currency);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚖️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune dépense à équilibrer
        </h3>
        <p className="text-gray-600">
          Ajoutez des dépenses pour voir les équilibres
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Individual Balances */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Balances individuelles</h2>
          <Button variant="secondary" onClick={handleExportPDF}>
            📄 Exporter PDF
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participants.map(participant => {
            const balance = balances[participant.id] || 0;
            const isPositive = balance > 0.01;
            const isNegative = balance < -0.01;

            return (
              <Card key={participant.id}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: participant.color }}
                  >
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{participant.name}</h3>
                    <div className={`text-lg font-bold font-mono ${
                      isPositive ? 'text-success' : isNegative ? 'text-error' : 'text-gray-500'
                    }`}>
                      {balance > 0 && '+'}
                      {formatCurrency(balance, currency)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isPositive && 'Doit recevoir'}
                      {isNegative && 'Doit payer'}
                      {!isPositive && !isNegative && 'Équilibré'}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Settlement Proposals */}
      {settlements.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Remboursements proposés
          </h2>
          <div className="space-y-3">
            {settlements.map((settlement, index) => (
              <Card key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">💸</div>
                    <div>
                      <p className="text-gray-900">
                        <span className="font-semibold">{getParticipantName(settlement.from)}</span>
                        {' '}doit payer{' '}
                        <span className="font-bold text-primary">
                          {formatCurrency(settlement.amount, currency)}
                        </span>
                        {' '}à{' '}
                        <span className="font-semibold">{getParticipantName(settlement.to)}</span>
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-success transition-colors">
                    <span className="text-2xl">✓</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 <strong>Astuce :</strong> Ces transactions sont optimisées pour minimiser le nombre de remboursements nécessaires.
            </p>
          </div>
        </div>
      )}

      {settlements.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-semibold text-success mb-2">
              Tout est équilibré !
            </h3>
            <p className="text-gray-600">
              Aucun remboursement nécessaire
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BalanceView;
