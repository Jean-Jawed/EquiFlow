import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 mt-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div>
          © EquiFlow 2025, Website by{' '}
          <a 
            href="https://javed.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Jawed
          </a>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <Link to="/application" className="hover:text-primary transition-colors">L'App Android</Link>
          <Link to="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;