import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';

const CURRENCIES = [
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
  { value: 'GBP', label: '£ GBP' },
  { value: 'CHF', label: 'CHF' },
  { value: 'CAD', label: '$ CAD' },
];

const CreateGroupModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('EUR');
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
      const groupRef = await addDoc(collection(db, 'groups'), {
        name: name.trim(),
        description: description.trim(),
        currency,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.uid || 'anonymous',
      });

      const groupId = groupRef.id;
      const shareLink = `${window.location.origin}/group/${groupId}`;

      await setDoc(doc(db, `groups/${groupId}`), {
        shareLink
      }, { merge: true });

      showToast('Groupe créé avec succès !', 'success');
      navigate(`/group/${groupId}`);
    } catch (error) {
      console.error('Error creating group:', error);
      showToast('Erreur lors de la création du groupe', 'error');
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Créer un nouveau groupe">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Devise
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full"
          >
            {CURRENCIES.map(curr => (
              <option key={curr.value} value={curr.value}>
                {curr.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Création...' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGroupModal;