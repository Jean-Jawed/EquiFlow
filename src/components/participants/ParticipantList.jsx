import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import AddParticipantModal from './AddParticipantModal';
import { formatDateFull, formatCurrency } from '../../utils/formatters';
import { getParticipantTotalPaid } from '../../utils/calculations';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { showToast } from '../../utils/toast';

const ParticipantList = ({ participants, groupId, expenses }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const canDelete = (participantId) => {
    return !expenses.some(e => 
      e.paidBy === participantId || 
      e.participants.includes(participantId)
    );
  };

  const handleDelete = async (participantId, participantName) => {
    if (!canDelete(participantId)) {
      showToast('Impossible de supprimer un participant avec des dépenses liées', 'error');
      return;
    }

    if (!window.confirm(`Supprimer ${participantName} du groupe ?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, `groups/${groupId}/participants`, participantId));
      showToast('Participant supprimé', 'success');
    } catch (error) {
      console.error('Error deleting participant:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {participants.length} participant{participants.length > 1 ? 's' : ''}
        </h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          + Ajouter un participant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {participants.map(participant => {
          const totalPaid = getParticipantTotalPaid(participant.id, expenses);
          const isDeletable = canDelete(participant.id);

          return (
            <Card key={participant.id}>
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                  style={{ backgroundColor: participant.color }}
                >
                  {participant.name.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {participant.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Membre depuis {formatDateFull(participant.joinedAt)}
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">Total dépensé : </span>
                    <span className="font-mono font-semibold text-gray-900">
                      {totalPaid.toFixed(2)} €
                    </span>
                  </div>
                </div>

                {isDeletable && participants.length > 1 && (
                  <button
                    onClick={() => handleDelete(participant.id, participant.name)}
                    className="text-gray-400 hover:text-error transition-colors p-2"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {participants.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <div className="text-5xl mb-3">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun participant
            </h3>
            <p className="text-gray-600 mb-4">
              Ajoutez des participants pour commencer
            </p>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Ajouter le premier participant
            </Button>
          </div>
        </Card>
      )}

      {showAddModal && (
        <AddParticipantModal
          onClose={() => setShowAddModal(false)}
          groupId={groupId}
        />
      )}
    </div>
  );
};

export default ParticipantList;
