import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';

const CATEGORIES = [
  { value: 'Restaurant', label: '🍽️ Restaurant', icon: '🍽️' },
  { value: 'Transport', label: '🚗 Transport', icon: '🚗' },
  { value: 'Hébergement', label: '🏠 Hébergement', icon: '🏠' },
  { value: 'Courses', label: '🛒 Courses', icon: '🛒' },
  { value: 'Loisirs', label: '🎉 Loisirs', icon: '🎉' },
  { value: 'Autre', label: '📦 Autre', icon: '📦' },
];

const EditExpenseModal = ({ expense, onClose, groupId, participants, currency }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [date, setDate] = useState(
    expense.date?.toDate?.().toISOString().split('T')[0] || 
    new Date(expense.date).toISOString().split('T')[0]
  );
  const [category, setCategory] = useState(expense.category);
  const [paidBy, setPaidBy] = useState(expense.paidBy);
  const [selectedParticipants, setSelectedParticipants] = useState(expense.participants || []);
  const [splitType, setSplitType] = useState(expense.splitType || 'equal');
  const [customSplits, setCustomSplits] = useState(expense.splits || {});
  const [loading, setLoading] = useState(false);

  const handleParticipantToggle = (participantId) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleCustomSplitChange = (participantId, value) => {
    setCustomSplits(prev => ({
      ...prev,
      [participantId]: parseFloat(value) || 0
    }));
  };

  const calculateSplits = () => {
    const splits = {};
    const totalAmount = parseFloat(amount);

    if (splitType === 'equal') {
      const splitAmount = totalAmount / selectedParticipants.length;
      selectedParticipants.forEach(id => {
        splits[id] = Math.round(splitAmount * 100) / 100;
      });
    } else {
      selectedParticipants.forEach(id => {
        splits[id] = customSplits[id] || 0;
      });
    }

    return splits;
  };

  const validateCustomSplits = () => {
    const total = Object.values(customSplits).reduce((sum, val) => sum + val, 0);
    const expectedTotal = parseFloat(amount);
    return Math.abs(total - expectedTotal) < 0.01;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Le titre est obligatoire', 'error');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('Le montant doit être un nombre positif', 'error');
      return;
    }

    if (selectedParticipants.length === 0) {
      showToast('Sélectionnez au moins un participant', 'error');
      return;
    }

    if (splitType === 'custom' && !validateCustomSplits()) {
      showToast('La somme des montants ne correspond pas au total', 'error');
      return;
    }

    setLoading(true);
    try {
      const splits = calculateSplits();

      await updateDoc(doc(db, `groups/${groupId}/expenses`, expense.id), {
        title: title.trim(),
        amount: numAmount,
        date: new Date(date),
        category,
        paidBy,
        participants: selectedParticipants,
        splits,
        splitType,
      });

      showToast('Dépense modifiée avec succès !', 'success');
      onClose();
    } catch (error) {
      console.error('Error updating expense:', error);
      showToast('Erreur lors de la modification', 'error');
      setLoading(false);
    }
  };

  const totalCustomSplits = Object.values(customSplits).reduce((sum, val) => sum + val, 0);
  const remaining = parseFloat(amount) - totalCustomSplits;

  return (
    <Modal onClose={onClose} title="Modifier la dépense">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Titre"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Restaurant, Taxi..."
          maxLength={100}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Montant"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  category === cat.value
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-xs">{cat.value}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qui a payé ?
          </label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full"
            required
          >
            {participants.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pour qui ?
          </label>
          <div className="space-y-2">
            {participants.map(p => (
              <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(p.id)}
                  onChange={() => handleParticipantToggle(p.id)}
                  className="w-4 h-4"
                />
                <span className="flex-1">{p.name}</span>
              </label>
            ))}
          </div>
        </div>

        {selectedParticipants.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Répartition
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={splitType === 'equal'}
                  onChange={() => setSplitType('equal')}
                  className="w-4 h-4"
                />
                <span>Répartir équitablement</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={splitType === 'custom'}
                  onChange={() => setSplitType('custom')}
                  className="w-4 h-4"
                />
                <span>Montants personnalisés</span>
              </label>
            </div>
          </div>
        )}

        {splitType === 'custom' && selectedParticipants.length > 0 && (
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Montants personnalisés
            </p>
            {participants
              .filter(p => selectedParticipants.includes(p.id))
              .map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <span className="flex-1 text-sm">{p.name}</span>
                  <input
                    type="number"
                    step="0.01"
                    value={customSplits[p.id] || ''}
                    onChange={(e) => handleCustomSplitChange(p.id, e.target.value)}
                    placeholder="0.00"
                    className="w-24"
                  />
                </div>
              ))}
            <div className="pt-2 border-t border-gray-200 text-sm">
              <div className="flex justify-between">
                <span>Total saisi:</span>
                <span className="font-mono">{totalCustomSplits.toFixed(2)} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Montant total:</span>
                <span className="font-mono">{parseFloat(amount || 0).toFixed(2)} {currency}</span>
              </div>
              <div className={`flex justify-between font-medium ${remaining !== 0 ? 'text-error' : 'text-success'}`}>
                <span>Reste:</span>
                <span className="font-mono">{remaining.toFixed(2)} {currency}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" disabled={loading} className="flex-1">
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditExpenseModal;
