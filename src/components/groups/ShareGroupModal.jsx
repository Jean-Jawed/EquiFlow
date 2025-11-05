import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { showToast } from '../../utils/toast';

const ShareGroupModal = ({ onClose, shareLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    showToast('Lien copié !', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal onClose={onClose} title="Partager le groupe">
      <div className="space-y-4">
        <p className="text-gray-600">
          Partagez ce lien avec vos amis pour qu'ils rejoignent le groupe
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-mono break-all text-gray-700">
            {shareLink}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Fermer
          </Button>
          <Button variant="primary" onClick={handleCopy} className="flex-1">
            {copied ? '✓ Copié !' : 'Copier le lien'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareGroupModal;
