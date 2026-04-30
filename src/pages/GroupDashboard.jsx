import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, collection, onSnapshot, updateDoc } from 'firebase/firestore';
import ExpenseList from '../components/expenses/ExpenseList';
import BalanceView from '../components/balances/BalanceView';
import ParticipantList from '../components/participants/ParticipantList';
import ShareGroupModal from '../components/groups/ShareGroupModal';
import EditGroupModal from '../components/groups/EditGroupModal';
import AddExpenseModal from '../components/expenses/AddExpenseModal';
import Footer from '../components/layout/Footer';
import { showToast } from '../utils/toast';

const GroupDashboard = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('expenses');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubGroup = onSnapshot(doc(db, 'groups', groupId), (groupDoc) => {
      if (!groupDoc.exists() || groupDoc.data().deleted === true) {
        setGroup(null);
      } else {
        setGroup({ id: groupDoc.id, ...groupDoc.data() });
      }
    }, (error) => {
      console.error('Error loading group:', error);
    });

    return () => unsubGroup();
  }, [groupId]);

  useEffect(() => {
    const unsubParticipants = onSnapshot(
      collection(db, `groups/${groupId}/participants`),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setParticipants(data);
        setLoading(false);
      }
    );

    const unsubExpenses = onSnapshot(
      collection(db, `groups/${groupId}/expenses`),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        data.sort((a, b) => {
          const dateA = a.date?.toDate?.() || new Date(a.date);
          const dateB = b.date?.toDate?.() || new Date(b.date);
          return dateB - dateA;
        });
        setExpenses(data);
      }
    );

    return () => {
      unsubParticipants();
      unsubExpenses();
    };
  }, [groupId]);

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleDeleteGroup = async () => {
    setDeleting(true);
    try {
      await updateDoc(doc(db, 'groups', groupId), { deleted: true });
      navigate('/');
    } catch (error) {
      console.error('Error deleting group:', error);
      showToast('Erreur lors de la suppression', 'error');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Groupe introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" title="Retour à l'accueil" className="flex-shrink-0 transition-transform hover:scale-105">
                <img src="/logo_equiflow.jpg" alt="EquiFlow Logo" className="w-12 h-12 rounded-xl shadow-sm border border-gray-100" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
                {group.description && (
                  <p className="text-sm text-gray-600">{group.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShareModal(true)}
                className="btn-3d-secondary text-sm"
              >
                📤 Partager
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(prev => !prev)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 text-xl leading-none"
                  title="Plus d'options"
                >
                  ⋮
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <button
                      onClick={() => { setShowEditModal(true); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      ✏️ Modifier le groupe
                    </button>
                    <button
                      onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      🗑️ Supprimer le groupe
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              {['expenses', 'balances', 'participants'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'expenses' && '💰 Dépenses'}
                  {tab === 'balances' && '⚖️ Équilibres'}
                  {tab === 'participants' && '👥 Participants'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 mb-20">
        {activeTab === 'expenses' && (
          <ExpenseList
            expenses={expenses}
            participants={participants}
            currency={group.currency}
            groupId={groupId}
          />
        )}
        {activeTab === 'balances' && (
          <BalanceView
            participants={participants}
            expenses={expenses}
            currency={group.currency}
            groupName={group.name}
          />
        )}
        {activeTab === 'participants' && (
          <ParticipantList
            participants={participants}
            groupId={groupId}
            expenses={expenses}
          />
        )}
      </main>

      <Footer />

      {/* Floating Action Button */}
      {activeTab === 'expenses' && (
        <button
          onClick={() => setShowAddExpense(true)}
          className="fab"
          title="Ajouter une dépense"
        >
          +
        </button>
      )}

      {/* Modals */}
      {showShareModal && (
        <ShareGroupModal
          onClose={() => setShowShareModal(false)}
          shareLink={group.shareLink}
        />
      )}

      {showAddExpense && (
        <AddExpenseModal
          onClose={() => setShowAddExpense(false)}
          groupId={groupId}
          participants={participants}
          currency={group.currency}
        />
      )}

      {showEditModal && (
        <EditGroupModal
          onClose={() => setShowEditModal(false)}
          group={group}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Supprimer le groupe</h2>
            <p className="text-gray-600 text-sm mb-6">
              Cette action est irréversible. Le groupe et toutes ses données ne seront plus accessibles.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteGroup}
                disabled={deleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDashboard;
