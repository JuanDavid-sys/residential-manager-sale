/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import MarketingView from './components/MarketingView';
import DashboardView from './components/DashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'dashboard'>('marketing');

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentView]);

  return (
    <div id="hogar_digital_root_app" className="bg-slate-50 min-h-screen overflow-x-hidden relative">
      {/* Minimalist Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'marketing' ? (
            <motion.div
              key="marketing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <MarketingView onNavigateToDashboard={() => setCurrentView('dashboard')} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <DashboardView onNavigateToLanding={() => setCurrentView('marketing')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
