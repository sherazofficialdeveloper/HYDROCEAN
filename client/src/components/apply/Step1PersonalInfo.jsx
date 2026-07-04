import React from 'react';
import { User, Phone, Briefcase, FileText } from 'lucide-react';

const Step1PersonalInfo = ({ formData, onChange, jobTitle }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary-500" />
        <h3 className="text-lg font-bold text-dark-200">Personal Information</h3>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-sm font-semibold text-dark-200">Applying for: {jobTitle || 'Selected Position'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={onChange}
            placeholder="John"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={onChange}
            placeholder="Doe"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          Father Name *
        </label>
        <input
          type="text"
          name="fatherName"
          required
          value={formData.fatherName}
          onChange={onChange}
          placeholder="Enter father's name"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          WhatsApp Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
          <input
            type="tel"
            name="whatsAppNumber"
            required
            value={formData.whatsAppNumber}
            onChange={onChange}
            placeholder="+92 300 1234567"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          Professional Experience *
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          <textarea
            name="experience"
            required
            value={formData.experience}
            onChange={onChange}
            placeholder="Briefly describe your professional experience..."
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          About Yourself *
        </label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          <textarea
            name="aboutYourself"
            required
            value={formData.aboutYourself}
            onChange={onChange}
            placeholder="Tell us about yourself (max 20,000 characters)..."
            rows={4}
            maxLength={20000}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
          />
        </div>
        <p className="text-right text-xs text-slate-400 mt-1">
          {formData.aboutYourself?.length || 0} / 20,000
        </p>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;