import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';

const JoinGroupModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [groupLink, setGroupLink] = useState('');
  const [loading, setLoading] = useState(false);

  const extractGroupId = (link) => {
    try {
      const url = new URL(link);
      const parts = url.pathname.split('/');
      return parts[parts.length - 1];
    } catch {
      const parts = link.split('/');
      return parts[parts.length - 1];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupLink.trim()) {
      showToast('Veuillez entrer le lien du groupe', 'error');
      return;
    }

    setLoading(true);
    try {
      const groupId = extractGroupId(groupLink);
      
      const groupDoc = await getDoc(doc(db, 'groups', groupId));
      
      if (!groupDoc.exists()) {
        showToast('Ce groupe n\'existe pas', 'error');
        setLoading(false);
        return;
      }

      showToast('Accès au groupe réussi !', 'success');
      navigate(`/group/${groupId}`);
    } catch (error) {
      console.error('Error joining group:', error);
      showToast('Erreur lors de l\'accès au groupe', 'error');
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Rejoindre un groupe">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Lien du groupe"
          type="text"
          value={groupLink}
          onChange={(e) => setGroupLink(e.target.value)}
          placeholder="https://equiflow.app/group/..."
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Connexion...' : 'Accéder au groupe'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinGroupModal;