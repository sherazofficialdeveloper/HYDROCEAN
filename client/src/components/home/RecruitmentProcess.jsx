import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, FormInput, Landmark, Send, CheckCircle } from 'lucide-react';

const RecruitmentProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'Register or Login',
      description: 'Create your account or log in to manage your candidate recruitment profile.',
      icon: User
    },
    {
      number: '02',
      title: 'Select Position',
      description: 'Browse active job listings and click Apply on your desired vacancy.',
      icon: Briefcase
    },
    {
      number: '03',
      title: 'Fill Application',
      description: 'Enter your personal information, skills, and professional experience.',
      icon: FormInput
    },
    {
      number: '04',
      title: 'Pay & Upload',
      description: 'Pay the processing fee and upload your CV, photo, and deposit slip.',
      icon: Landmark
    },
    {
      number: '05',
      title: 'Submit & Track',
      description: 'Submit your application and track its status from your dashboard.',
      icon: Send
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
            How to Apply
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-200 mt-3 tracking-tight">
            Recruitment Process
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
          <p className="text-lg text-slate-600 mt-4">
            Follow these simple steps to complete your application successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <span className="absolute top-4 right-4 text-4xl font-bold text-primary-500/10">
                {step.number}
              </span>
              <div className="p-3 bg-primary-50 rounded-xl inline-block text-primary-500 mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-dark-200 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle className="h-5 w-5 text-primary-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentProcess;