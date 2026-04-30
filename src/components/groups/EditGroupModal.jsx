import { useState } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';

const EditGroupModal = ({ onClose, group }) => {
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Le nom du groupe est obligatoire', 'error');
      return;
    }

    if (name.length > 60) {
      showToast('Le nom ne peut pas dépasser 60 caractères', 'error');
      return;
    }

    if (description.length > 200) {
      showToast('La description ne peut pas dépasser 200 caractères', 'error');
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'groups', group.id), {
        name: name.trim(),
        description: description.trim(),
      });
      showToast('Groupe modifié avec succès !', 'success');
      onClose();
    } catch (error) {
      console.error('Error updating group:', error);
      showToast('Erreur lors de la modification', 'error');
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Modifier le groupe">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du groupe"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vacances Barcelone"
          maxLength={60}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optionnel)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre groupe..."
            maxLength={200}
            rows={3}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">{description.length}/200</p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Modification...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditGroupModal;
