import React from 'react';
import { Search, SlidersHorizontal, MapPin, Briefcase } from 'lucide-react';

const JobFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4.5 w-4.5 text-primary-500" />
        <h3 className="font-bold text-sm text-dark-200 uppercase tracking-wider">Search & Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Location..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition appearance-none cursor-pointer"
          >
            <option value="open">Open Jobs</option>
            <option value="closed">Closed Jobs</option>
            <option value="all">All Jobs</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => setFilters({ search: '', location: '', status: 'open' })}
          className="py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition text-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;