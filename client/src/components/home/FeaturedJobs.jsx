import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ArrowRight, Landmark } from 'lucide-react';
import API from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await API.get('/jobs/featured');
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Apply button click - Redirect to Jobs page
  const handleApplyClick = (job) => {
    if (!isAuthenticated) {
      // Save job to session storage for redirect
      sessionStorage.setItem('pendingJobId', job.id);
      navigate('/login');
      return;
    }
    // Redirect to jobs page with job id in state
    navigate('/jobs', { state: { selectedJobId: job.id } });
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
            Featured Opportunities
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-200 mt-3 tracking-tight">
            Latest Marine & Robotics Vacancies
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
          <p className="text-lg text-slate-600 mt-4">
            Explore our latest deep-sea research missions, autonomous piloting, and subsea actuators engineering files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <h3 className="text-xl font-bold text-dark-200 line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Landmark className="h-4 w-4" />
                      {job.country}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Full Time
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
                      Salary
                    </span>
                    <span className="text-base font-bold text-dark-200 block">{job.salary}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
                      Qualification
                    </span>
                    <span className="text-base font-bold text-dark-200 block truncate">
                      {job.qualification}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {job.description}
                </p>

                {/* ✅ Apply Button - Redirects to Jobs Page */}
                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No featured jobs available at the moment.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 hover:border-primary-500 text-slate-700 hover:text-primary-500 font-bold rounded-xl transition"
          >
            View All Jobs
            <Briefcase className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;