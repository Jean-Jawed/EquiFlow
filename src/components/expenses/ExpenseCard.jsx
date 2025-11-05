import { useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import Card from '../ui/Card';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { showToast } from '../../utils/toast';

const CATEGORY_ICONS = {
  Restaurant: '🍽️',
  Transport: '🚗',
  Hébergement: '🏠',
  Courses: '🛒',
  Loisirs: '🎉',
  Autre: '📦',
};

const ExpenseCard = ({ expense, participants, currency, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const payer = participants.find(p => p.id === expense.paidBy);
  const isOwner = expense.createdBy === auth.currentUser?.uid;

  const handleDelete = async () => {
    try {
      const groupId = window.location.pathname.split('/')[2];
      await deleteDoc(doc(db, `groups/${groupId}/expenses`, expense.id));
      showToast('Dépense supprimée', 'success');
    } catch (error) {
      console.error('Error deleting expense:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  return (
    <Card className="relative">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{CATEGORY_ICONS[expense.category]}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg truncate">
                {expense.title}
              </h3>
              <p className="text-sm text-gray-600">
                Payé par <span className="font-medium">{payer?.name || 'Inconnu'}</span>
              </p>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-xl text-gray-900 font-mono">
                {formatCurrency(expense.amount, currency)}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(expense.date)}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              👥 {expense.participants?.length || 0} {expense.participants?.length > 1 ? 'personnes' : 'personne'}
            </span>
            <span>•</span>
            <span>{expense.category}</span>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              ⋮
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowDeleteConfirm(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50"
                >
                  🗑️ Supprimer
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Supprimer la dépense ?</h3>
              <p className="text-gray-600 mb-6">
                Cette action est irréversible. La dépense "{expense.title}" sera définitivement supprimée.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-3d-secondary flex-1"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="btn-3d-danger flex-1"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExpenseCard;
