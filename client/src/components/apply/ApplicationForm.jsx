import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, Briefcase } from 'lucide-react';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Documents from './Step2Documents';
import ApplicationSuccess from './ApplicationSuccess';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';

const ApplicationForm = ({ jobId, jobs = [], onJobSelect, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(jobId || '');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    whatsAppNumber: '',
    experience: '',
    aboutYourself: '',
    candidatePhoto: null,
    cv: null,
    depositSlip: null,
    depositSlipNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  // ✅ Update selected job when prop changes
  useEffect(() => {
    if (jobId) {
      setSelectedJobId(jobId);
      if (onJobSelect) {
        onJobSelect(jobId);
      }
    }
  }, [jobId, onJobSelect]);

  // ✅ Debug - Check jobs data
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      console.log('📋 Jobs Data:', jobs);
      console.log('📋 First Job ID:', jobs[0]?.id || jobs[0]?._id);
      console.log('📋 First Job Title:', jobs[0]?.title);
    }
  }, [jobs]);

  const hasJobs = jobs && jobs.length > 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // ✅ FIX: value = job._id or job.id, display = job.title
  const handleJobChange = (e) => {
    const value = e.target.value; // ✅ This is job ID
    console.log('🔍 Selected Job ID from dropdown:', value);
    
    // ✅ Find job title for display confirmation
    const selectedJob = jobs.find(j => (j.id === value || j._id === value));
    if (selectedJob) {
      console.log('📌 Selected Job Title:', selectedJob.title);
    }
    
    setSelectedJobId(value);
    if (onJobSelect) {
      onJobSelect(value);
    }
  };

  const handleSubmit = async () => {
    console.log('📤 Submitting Application with Job ID:', selectedJobId);

    if (!selectedJobId) {
      showError('Please select a job position.');
      return;
    }

    setLoading(true);
    try {
      const formPayload = new FormData();
      // ✅ Send job ID to backend
      formPayload.append('jobId', selectedJobId);
      formPayload.append('firstName', formData.firstName);
      formPayload.append('lastName', formData.lastName);
      formPayload.append('fatherName', formData.fatherName);
      formPayload.append('whatsAppNumber', formData.whatsAppNumber);
      formPayload.append('experience', formData.experience);
      formPayload.append('aboutYourself', formData.aboutYourself);
      formPayload.append('email', user?.email || '');
      
      if (formData.candidatePhoto) {
        formPayload.append('candidatePhoto', formData.candidatePhoto);
      }
      if (formData.cv) {
        formPayload.append('cv', formData.cv);
      }
      if (formData.depositSlip) {
        formPayload.append('depositSlip', formData.depositSlip);
      }
      formPayload.append('depositSlipNumber', formData.depositSlipNumber || '');

      // ✅ Debug - Log FormData entries
      console.log('📤 Sending FormData:');
      for (let pair of formPayload.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await API.post('/applications/apply', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setTrackingId(response.data.trackingId || '');
      setSuccess(true);
      showSuccess('Application submitted successfully!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('❌ Application error:', error);
      console.error('❌ Error response:', error.response?.data);
      showError(error.response?.data?.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!selectedJobId) {
      showError('Please select a job position first.');
      return;
    }

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.fatherName || 
          !formData.whatsAppNumber || !formData.experience || !formData.aboutYourself) {
        showError('Please fill in all required fields.');
        return;
      }
      if (formData.aboutYourself.length > 20000) {
        showError('About Yourself must be less than 20,000 characters.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (success) {
    return <ApplicationSuccess trackingId={trackingId} />;
  }

  // ✅ Get selected job object for display (check both id and _id)
  const selectedJob = jobs.find(j => (j.id === selectedJobId || j._id === selectedJobId));

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
      {/* ✅ Job Selection Dropdown - ID Store, Title Show */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Select Job Position *
        </label>
        {hasJobs ? (
          <div>
            <select
              value={selectedJobId}
              onChange={handleJobChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            >
              <option value="">-- Choose a Job --</option>
              {/* ✅ CRITICAL FIX: value = job._id or job.id, display = job.title */}
              {jobs.map((job) => {
                const jobId = job.id || job._id;
                return (
                  <option key={jobId} value={jobId}>
                    {job.title} ({job.country})
                  </option>
                );
              })}
            </select>
            
            {/* ✅ Show selected job details for confirmation */}
            {selectedJobId && selectedJob && (
              <div className="mt-2 p-3 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-sm text-primary-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <strong>Selected Position:</strong> {selectedJob.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span className="font-mono">Job ID: {selectedJob.id || selectedJob._id}</span>
                  <span className="text-slate-300">|</span>
                  <span>Location: {selectedJob.country}</span>
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
            <Briefcase className="h-5 w-5 inline mr-2" />
            No jobs available at the moment. Please check back later.
          </div>
        )}
      </div>

      {/* ✅ Disable form if no jobs available */}
      <div className={!hasJobs ? 'opacity-50 pointer-events-none' : ''}>
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary-500">
            Step {step} of 2
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Step1PersonalInfo 
                formData={formData} 
                onChange={handleChange}
              />
              <button
                onClick={nextStep}
                disabled={!hasJobs || !selectedJobId}
                className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Step2Documents 
                formData={formData}
                onFileChange={handleFileChange}
                onChange={handleChange}
              />
              <div className="flex gap-4 mt-6">
                <button
                  onClick={prevStep}
                  className="flex-1 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !selectedJobId || !hasJobs}
                  className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Application
                      <Sparkles className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApplicationForm;