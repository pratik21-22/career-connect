import { Link } from 'react-router-dom';
import { HiLocationMarker, HiCurrencyDollar, HiOfficeBuilding, HiArrowRight } from 'react-icons/hi';

/**
 * Reusable job card — premium design with hover lift animation.
 */
export default function JobCard({ job }) {
    return (
        <Link to={`/jobs/${job._id}`} className="block group">
            <div className="glass-card hover-lift p-5 animate-fadeIn">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-700/20 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-base">
                            {job.company?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-0.5">
                                <HiOfficeBuilding size={14} />
                                {job.company}
                            </p>
                        </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <HiArrowRight className="text-primary-500" size={18} />
                    </div>
                </div>

                {/* Description preview */}
                <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg font-medium">
                        <HiLocationMarker size={13} />
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-medium">
                        <HiCurrencyDollar size={13} />
                        {job.salary || 'Not disclosed'}
                    </span>
                </div>
            </div>
        </Link>
    );
}
