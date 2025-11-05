import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import ExpenseList from '../components/expenses/ExpenseList';
import BalanceView from '../components/balances/BalanceView';
import ParticipantList from '../components/participants/ParticipantList';
import ShareGroupModal from '../components/groups/ShareGroupModal';
import AddExpenseModal from '../components/expenses/AddExpenseModal';
import Footer from '../components/layout/Footer';

const GroupDashboard = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('expenses');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroup = async () => {
      try {
        const groupDoc = await getDoc(doc(db, 'groups', groupId));
        if (groupDoc.exists()) {
          setGroup({ id: groupDoc.id, ...groupDoc.data() });
        }
      } catch (error) {
        console.error('Error loading group:', error);
      }
    };

    loadGroup();
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
              {group.description && (
                <p className="text-sm text-gray-600">{group.description}</p>
              )}
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="btn-3d-secondary text-sm"
            >
              📤 Partager
            </button>
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
    </div>
  );
};

export default GroupDashboard;