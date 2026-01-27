import { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';
import { getRandomColor } from '../../utils/colors';

const AddParticipantModal = ({ onClose, groupId }) => {
  const [names, setNames] = useState([{ id: Date.now(), value: '' }]);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (id, value) => {
    setNames(names.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  const addField = () => {
    if (names.length < 10) {
      setNames([...names, { id: Date.now(), value: '' }]);
    }
  };

  const removeField = (id) => {
    if (names.length > 1) {
      setNames(names.filter(field => field.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validNames = names
      .map(n => n.value.trim())
      .filter(n => n !== '');

    if (validNames.length === 0) {
      showToast('Veuillez saisir au moins un nom', 'error');
      return;
    }

    const longNames = validNames.filter(n => n.length > 50);
    if (longNames.length > 0) {
      showToast('Certains noms dépassent 50 caractères', 'error');
      return;
    }

    setLoading(true);
    try {
      const promises = validNames.map(name =>
        addDoc(collection(db, `groups/${groupId}/participants`), {
          name,
          color: getRandomColor(),
          joinedAt: serverTimestamp(),
          userId: auth.currentUser?.uid || 'anonymous',
        })
      );

      await Promise.all(promises);

      showToast(`${validNames.length} participant(s) ajouté(s) !`, 'success');
      onClose();
    } catch (error) {
      console.error('Error adding participants:', error);
      showToast('Erreur lors de l\'ajout', 'error');
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Ajouter des participants">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
          {names.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  label={index === 0 ? "Noms des participants" : null}
                  type="text"
                  value={field.value}
                  onChange={(e) => handleNameChange(field.id, e.target.value)}
                  placeholder={`Nom du participant ${index + 1}`}
                  maxLength={50}
                />
              </div>
              {names.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeField(field.id)}
                  className="mb-[2px] px-3"
                  aria-label="Supprimer"
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
        </div>

        {names.length < 10 && (
          <Button
            type="button"
            variant="secondary"
            onClick={addField}
            className="w-full border-dashed"
          >
            + Ajouter un autre participant
          </Button>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" disabled={loading} className="flex-1">
            {loading ? 'Ajout...' : 'Ajouter les participants'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddParticipantModal;
