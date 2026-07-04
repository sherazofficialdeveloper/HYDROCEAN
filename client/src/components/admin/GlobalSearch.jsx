import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, FileText, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], jobs: [], applications: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const { showError } = useToast();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        performSearch();
      } else {
        setResults({ users: [], jobs: [], applications: [] });
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/admin/search?q=${query}`);
      setResults(response.data.results || { users: [], jobs: [], applications: [] });
      setShowResults(true);
    } catch (error) {
      showError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const totalResults = results.users.length + results.jobs.length + results.applications.length;

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          placeholder="Search users, jobs, applications..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults({ users: [], jobs: [], applications: [] }); setShowResults(false); }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 max-h-96 overflow-y-auto z-50"
          >
            {loading ? (
              <div className="p-8 text-center">
                <div className="h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-slate-500 mt-2">Searching...</p>
              </div>
            ) : totalResults === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-500">No results found for "{query}"</p>
              </div>
            ) : (
              <div className="p-2">
                {results.users.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-bold uppercase text-slate-400 px-3 py-1">Users</p>
                    {results.users.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {results.jobs.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-bold uppercase text-slate-400 px-3 py-1">Jobs</p>
                    {results.jobs.map((job) => (
                      <div key={job.id} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-slate-500">{job.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {results.applications.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400 px-3 py-1">Applications</p>
                    {results.applications.map((app) => (
                      <div key={app.id} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">{app.firstName} {app.lastName}</p>
                          <p className="text-xs text-slate-500">{app.jobTitle} • {app.trackingId}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ✅ ADD THIS - Default export
export default GlobalSearch;