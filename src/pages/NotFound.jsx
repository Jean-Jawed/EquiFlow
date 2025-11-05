import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <Link to="/" className="btn-3d-primary">
          Retour à l'accueil
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;