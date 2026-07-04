import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import JobCard from './JobCard';

const JobList = ({ jobs, onApplyClick }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="font-display font-bold text-lg text-dark-200">No Jobs Found</h3>
        <p className="text-sm text-slate-500 mt-2">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {jobs.map((job, index) => {
        const jobId = job.id || job._id;
        return (
          <JobCard 
            key={jobId}  // ✅ Added unique key
            job={job} 
            index={index} 
            onApplyClick={onApplyClick}
          />
        );
      })}
    </div>
  );
};

export default JobList;