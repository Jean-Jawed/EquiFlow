import { useState } from 'react';
import ExpenseCard from './ExpenseCard';
import EditExpenseModal from './EditExpenseModal';

const ExpenseList = ({ expenses, participants, currency, groupId }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'Restaurant', 'Transport', 'Hébergement', 'Courses', 'Loisirs', 'Autre'];

  const filteredExpenses = filterCategory === 'all' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">💸</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune dépense pour le moment
        </h3>
        <p className="text-gray-600">
          Ajoutez votre première dépense en cliquant sur le bouton +
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat === 'all' ? 'Toutes' : cat}
          </button>
        ))}
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {filteredExpenses.map(expense => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            participants={participants}
            currency={currency}
            onEdit={() => setEditingExpense(expense)}
          />
        ))}
      </div>

      {filteredExpenses.length === 0 && filterCategory !== 'all' && (
        <div className="text-center py-8 text-gray-500">
          Aucune dépense dans cette catégorie
        </div>
      )}

      {/* Edit Modal */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          groupId={groupId}
          participants={participants}
          currency={currency}
        />
      )}
    </div>
  );
};

export default ExpenseList;
