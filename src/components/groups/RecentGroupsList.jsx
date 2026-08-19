import { Link } from 'react-router-dom';
import { useRecentGroups, remove } from '../../utils/recentGroups';
import { formatDate } from '../../utils/formatters';

const RecentGroupsList = () => {
  const groups = useRecentGroups();

  if (groups.length === 0) return null;

  return (
    <div className="pt-2">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Groupes récents
      </h2>
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group.id}
            className="flex items-center justify-between gap-2 bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2.5"
          >
            <Link
              to={`/group/${group.id}`}
              className="flex-1 min-w-0 flex items-baseline gap-2 text-left"
            >
              <span className="font-medium text-gray-900 truncate">{group.name}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(group.lastVisitedAt)}</span>
            </Link>
            <button
              type="button"
              onClick={() => remove(group.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-lg leading-none px-1"
              title="Retirer de la liste"
              aria-label={`Retirer ${group.name} des groupes récents`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentGroupsList;
