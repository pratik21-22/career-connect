import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import API from '../../utils/api';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import Pagination from '../../components/Pagination';
import toast from 'react-hot-toast';
import { HiSearch, HiLocationMarker, HiOfficeBuilding } from 'react-icons/hi';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const debouncedSearch = useDebounce(search);
    const debouncedLocation = useDebounce(location);
    const debouncedCompany = useDebounce(company);

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line
    }, [debouncedSearch, debouncedLocation, debouncedCompany, page]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 9 };
            if (debouncedSearch) params.search = debouncedSearch;
            if (debouncedLocation) params.location = debouncedLocation;
            if (debouncedCompany) params.company = debouncedCompany;

            const { data } = await API.get('/api/jobs', { params });
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        } catch (err) {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Browse Jobs</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Find your next opportunity — <span className="font-semibold text-primary-600 dark:text-primary-400">{total}</span> jobs available</p>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative">
                        <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="input-field"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                    <div className="relative">
                        <HiLocationMarker className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by location..."
                            value={location}
                            onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                            className="input-field"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                    <div className="relative">
                        <HiOfficeBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by company..."
                            value={company}
                            onChange={(e) => { setCompany(e.target.value); setPage(1); }}
                            className="input-field"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>
            </div>

            {/* Job list */}
            {loading ? (
                <Loader />
            ) : jobs.length === 0 ? (
                <EmptyState title="No jobs found" message="Try adjusting your search criteria" />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
}
