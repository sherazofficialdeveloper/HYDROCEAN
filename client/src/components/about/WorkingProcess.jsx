import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Map, Settings, Ship, Wifi, Activity, BarChart3, Award } from 'lucide-react';

const WorkingProcess = () => {
  const steps = [
    { icon: ClipboardList, title: 'Requirement Analysis', desc: 'Exhaustive consultation to map mission goals and operational parameters.' },
    { icon: Map, title: 'Mission Planning', desc: 'Designing robust autonomous navigation paths and safety parameters.' },
    { icon: Settings, title: 'Vehicle Configuration', desc: 'Integrating customized sensor packages and calibrating thrusters.' },
    { icon: Ship, title: 'Deployment', desc: 'Precise launch of USV/AUV with initial subsea diagnostic checks.' },
    { icon: Wifi, title: 'Data Collection', desc: 'Real-time telemetry extraction and environmental metrics tracking.' },
    { icon: Activity, title: 'Monitoring', desc: 'Supervising position fixes, battery depletion, and autonomous status.' },
    { icon: BarChart3, title: 'Data Analysis', desc: 'Processing raw data and applying ML anomaly detection filters.' },
    { icon: Award, title: 'Final Reports', desc: 'Providing actionable GIS maps, pipeline defect sheets, and certified reports.' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-200 mt-3 tracking-tight">
            End-to-End Mission Workflow
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
          <p className="text-lg text-slate-600 mt-4">
            From initial planning to final data delivery, we follow international standards at every milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-mono font-bold text-primary-500/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                  <step.icon className="h-5 w-5" />
                </div>
              </div>
              <h4 className="font-bold text-dark-200 text-lg mb-2">{step.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;