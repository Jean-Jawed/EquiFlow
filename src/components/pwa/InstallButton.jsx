import { useState } from 'react';
import { usePwaInstall, promptInstall } from '../../utils/pwaInstall';

const InstallButton = () => {
  const state = usePwaInstall();
  const [showIosTip, setShowIosTip] = useState(false);

  if (state === 'installed' || state === 'unsupported') return null;

  const handleClick = () => {
    if (state === 'available') {
      promptInstall();
    } else if (state === 'ios') {
      setShowIosTip((prev) => !prev);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="btn-3d-secondary text-sm"
      >
        📲 Installer
      </button>
      {showIosTip && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50 text-sm text-gray-700">
          Appuyez sur <strong>Partager</strong> puis <strong>« Sur l'écran d'accueil »</strong> pour installer EquiFlow.
        </div>
      )}
    </div>
  );
};

export default InstallButton;
