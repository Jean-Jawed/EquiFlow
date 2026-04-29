import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const Application = () => {
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
            Emportez <span className="text-primary">EquiFlow</span> partout avec vous
          </h1>
          <p className="text-xl text-gray-600">
            Retrouvez exactement la même expérience et toutes les fonctionnalités du site web dans notre application native Android.
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
              Partage facile depuis votre répertoire
            </li>
          </ul>
          <div className="pt-6 flex justify-center md:justify-start">
            <a href="#" className="inline-block transition-transform hover:scale-105">
              <img src="/fr_badge_web_generic.png" alt="Disponible sur Google Play" className="h-16" />
            </a>
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
