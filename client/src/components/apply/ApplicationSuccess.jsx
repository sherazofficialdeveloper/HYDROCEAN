import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';

const ApplicationSuccess = ({ trackingId }) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-12 w-12 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-bold text-dark-200">Application Submitted!</h2>
      <p className="text-slate-500 mt-2">Your application has been received successfully.</p>
      
      <div className="max-w-sm mx-auto mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-xs text-slate-500 font-medium">Tracking ID</p>
        <p className="text-lg font-mono font-bold text-primary-600">{trackingId || 'HMS-2026-000123'}</p>
        <p className="text-xs text-slate-400 mt-1">Keep this ID for future reference</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition"
        >
          <FileText className="h-4.5 w-4.5" />
          View Dashboard
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 hover:border-primary-500 text-slate-700 hover:text-primary-500 font-bold rounded-xl transition"
        >
          Browse More Jobs
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSuccess;