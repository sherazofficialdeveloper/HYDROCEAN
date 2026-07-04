import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Landmark } from 'lucide-react';

const JobCard = ({ job, index, onApplyClick }) => {
  const jobId = job.id || job._id;
  
  return (
    <motion.div
      key={jobId}  // ✅ Added unique key
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
    >
      {/* ... rest of the component */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-display font-bold text-dark-200">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Landmark className="h-3.5 w-3.5" />
              {job.country}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Full Time
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${
          job.isOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {job.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[9px] font-mono tracking-wider uppercase text-slate-400">Salary</p>
          <p className="text-sm font-bold text-dark-200">{job.salary}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[9px] font-mono tracking-wider uppercase text-slate-400">Qualification</p>
          <p className="text-sm font-bold text-dark-200 truncate">{job.qualification}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
        {job.description}
      </p>

      <button
        onClick={() => onApplyClick(job)}
        disabled={!job.isOpen}
        className={`w-full flex items-center justify-center gap-2 py-3 font-bold text-xs uppercase tracking-wider rounded-xl transition ${
          job.isOpen
            ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-primary-500/30'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {job.isOpen ? (
          <>
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          'Position Closed'
        )}
      </button>
    </motion.div>
  );
};

export default JobCard;