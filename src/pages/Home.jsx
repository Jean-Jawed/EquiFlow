import { useState } from 'react';
import CreateGroupModal from '../components/groups/CreateGroupModal';
import JoinGroupModal from '../components/groups/JoinGroupModal';
import Footer from '../components/layout/Footer';

const Home = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <img 
                src="/logo_equiflow.jpg" 
                alt="EquiFlow Logo" 
                className="h-24 mx-auto lg:mx-0 rounded-2xl shadow-lg"
              />
              <h1 className="text-6xl font-bold text-gray-900">
                EquiFlow
              </h1>
              <p className="text-2xl text-gray-600">
                Gérez vos dépenses de groupe en toute simplicité
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-3d-primary w-full lg:w-auto px-12"
              >
                Créer un groupe
              </button>
              
              <button
                onClick={() => setShowJoinModal(true)}
                className="btn-3d-secondary w-full lg:w-auto px-12 lg:ml-4"
              >
                Rejoindre un groupe
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Partagez vos frais facilement entre amis, famille ou collègues
            </p>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block">
            <img 
              src="/conversation.png" 
              alt="Conversation illustration" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <Footer />

      {showCreateModal && (
        <CreateGroupModal onClose={() => setShowCreateModal(false)} />
      )}

      {showJoinModal && (
        <JoinGroupModal onClose={() => setShowJoinModal(false)} />
      )}
    </div>
  );
};

export default Home;