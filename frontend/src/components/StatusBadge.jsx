/**
 * Status badge with dot indicator and color-coded styling.
 */
export default function StatusBadge({ status }) {
    const styles = {
        pending: {
            bg: 'bg-amber-50 dark:bg-amber-500/10',
            text: 'text-amber-700 dark:text-amber-400',
            border: 'border-amber-200 dark:border-amber-500/30',
            dot: 'bg-amber-500',
        },
        accepted: {
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            text: 'text-emerald-700 dark:text-emerald-400',
            border: 'border-emerald-200 dark:border-emerald-500/30',
            dot: 'bg-emerald-500',
        },
        rejected: {
            bg: 'bg-red-50 dark:bg-red-500/10',
            text: 'text-red-700 dark:text-red-400',
            border: 'border-red-200 dark:border-red-500/30',
            dot: 'bg-red-500',
        },
        interview: {
            bg: 'bg-blue-50 dark:bg-blue-500/10',
            text: 'text-blue-700 dark:text-blue-400',
            border: 'border-blue-200 dark:border-blue-500/30',
            dot: 'bg-blue-500',
        },
    };

    const s = styles[status] || styles.pending;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${s.bg} ${s.text} ${s.border}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {status}
        </span>
    );
}
