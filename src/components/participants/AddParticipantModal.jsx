import { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';
import { getRandomColor } from '../../utils/colors';

const AddParticipantModal = ({ onClose, groupId }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Le nom est obligatoire', 'error');
      return;
    }

    if (name.length > 50) {
      showToast('Le nom ne peut pas dépasser 50 caractères', 'error');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, `groups/${groupId}/participants`), {
        name: name.trim(),
        color: getRandomColor(),
        joinedAt: serverTimestamp(),
        userId: auth.currentUser?.uid || 'anonymous',
      });

      showToast('Participant ajouté avec succès !', 'success');
      onClose();
    } catch (error) {
      console.error('Error adding participant:', error);
      showToast('Erreur lors de l\'ajout', 'error');
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Ajouter un participant">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du participant"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alice, Bob..."
          maxLength={50}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" disabled={loading} className="flex-1">
            {loading ? 'Ajout...' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddParticipantModal;
