import { HiOutlineInbox } from 'react-icons/hi';

/**
 * Empty state placeholder — gradient icon background with improved styling.
 */
export default function EmptyState({ title = 'Nothing here yet', message = '' }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-500/10 dark:to-primary-500/20 flex items-center justify-center mb-5 shadow-sm">
                <HiOutlineInbox className="text-primary-400 dark:text-primary-500" size={36} />
            </div>
            <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300">{title}</h3>
            {message && <p className="mt-2 text-sm text-surface-400 dark:text-surface-500 max-w-xs text-center">{message}</p>}
        </div>
    );
}
