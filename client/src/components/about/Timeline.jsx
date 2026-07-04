import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, GraduationCap, Globe } from 'lucide-react';

const Timeline = () => {
  const phases = [
    {
      icon: BookOpen,
      title: 'Phase 1: Basic Research',
      desc: 'Conducting computer simulations of subsea water dynamics, fluid boundaries, and acoustic propagation patterns.',
      year: '2010-2015'
    },
    {
      icon: Award,
      title: 'Phase 2: Development & Prototyping',
      desc: 'Precision CNC machining from titanium blocks, oil-filling procedures, and electronics potting inside resin materials.',
      year: '2015-2018'
    },
    {
      icon: GraduationCap,
      title: 'Phase 3: Deep-Water Training',
      desc: 'Testing thrusters and servos inside specialized laboratory basins to calibrate motor control boundaries.',
      year: '2018-2020'
    },
    {
      icon: Globe,
      title: 'Phase 4: International Field Station',
      desc: 'Deploying vehicle platforms in high-salinity deep waters to validate real-time acoustics and autopilot mapping.',
      year: '2020-Present'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
            Our Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-200 mt-3 tracking-tight">
            Research & Development Timeline
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
          <p className="text-lg text-slate-600 mt-4">
            Our scientific journey from concept to deep-sea deployment.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform -translate-x-1/2" />

          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12 ${
                index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12 sm:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 sm:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-lg z-10" />

              {/* Content */}
              <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${index % 2 === 0 ? 'sm:text-right' : ''}`}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                      <phase.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-primary-500">{phase.year}</span>
                  </div>
                  <h4 className="font-bold text-dark-200 text-lg">{phase.title}</h4>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{phase.desc}</p>
                </div>
              </div>

              <div className="hidden sm:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;