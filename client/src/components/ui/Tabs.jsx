import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  return (
    <div>
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              relative px-4 py-3 text-sm font-semibold transition-colors
              ${activeTab === tab.id ? 'text-primary-500' : 'text-slate-500 hover:text-slate-700'}
            `}
          >
            {tab.icon && <tab.icon className="h-4.5 w-4.5 inline mr-2" />}
            {tab.label}
            {activeTab === tab.id && (
              <motion.span
                layoutId="tabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;