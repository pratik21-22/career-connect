import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

/**
 * Pagination — rounded buttons with active blue glow.
 */
export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="p-2 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-500 hover:text-primary-600 hover:border-primary-300 dark:hover:text-primary-400 dark:hover:border-primary-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <HiChevronLeft size={18} />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${p === page
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                            : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-500 hover:text-primary-600 hover:border-primary-300 dark:hover:text-primary-400'
                        }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="p-2 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-500 hover:text-primary-600 hover:border-primary-300 dark:hover:text-primary-400 dark:hover:border-primary-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <HiChevronRight size={18} />
            </button>
        </div>
    );
}
