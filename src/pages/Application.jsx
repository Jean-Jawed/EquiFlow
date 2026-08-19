import { useState } from 'react';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { usePwaInstall, promptInstall } from '../utils/pwaInstall';

const Application = () => {
  const installState = usePwaInstall();
  const [showIosTip, setShowIosTip] = useState(false);

  const handleInstallClick = () => {
    if (installState === 'available') {
      promptInstall();
    } else if (installState === 'ios') {
      setShowIosTip((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header court */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" title="Retour à l'accueil" className="inline-block transition-transform hover:scale-105">
            <img src="/logo_equiflow.jpg" alt="EquiFlow Logo" className="w-12 h-12 rounded-xl shadow-sm border border-gray-100" />
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-primary">EquiFlow</span> s'installe dès maintenant
          </h1>
          <p className="text-xl text-gray-600">
            Depuis votre navigateur, ajoutez EquiFlow à votre écran d'accueil : une icône, un lancement en plein écran, comme une vraie application.
          </p>
          <ul className="text-left max-w-sm mx-auto md:mx-0 space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              Totalement gratuite et sans publicité
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              Aucune inscription requise
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              Fonctionne aussi hors connexion
            </li>
          </ul>

          <div className="pt-2">
            {(installState === 'available' || installState === 'ios') && (
              <div className="relative inline-block">
                <button onClick={handleInstallClick} className="btn-3d-primary px-10">
                  📲 Installer l'application
                </button>
                {showIosTip && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50 text-sm text-gray-700 text-left">
                    Appuyez sur <strong>Partager</strong> puis <strong>« Sur l'écran d'accueil »</strong> pour installer EquiFlow.
                  </div>
                )}
              </div>
            )}
            {installState === 'installed' && (
              <p className="text-green-600 font-medium">✓ EquiFlow est déjà installé sur cet appareil</p>
            )}
            {installState === 'unsupported' && (
              <p className="text-gray-500 text-sm">L'installation n'est pas prise en charge par ce navigateur. Essayez avec Chrome, Edge, ou Safari sur mobile.</p>
            )}
          </div>

          <div className="pt-10 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Bientôt disponible sur les stores</p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <img src="/bientot-googleplay.png" alt="Bientôt disponible sur Google Play" className="h-11 w-auto" />
              <img src="/bientot-appstore.png" alt="Bientôt disponible sur l'App Store" className="h-11 w-auto" />
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            {/* Décoration arrière plan */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-70"></div>
            <img 
              src="/photo.jpeg" 
              alt="Aperçu de l'application EquiFlow sur smartphone" 
              className="relative z-10 w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Application;
