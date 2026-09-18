/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Page, SensorType } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AnalyzePage } from './components/AnalyzePage';
import { ComparePage } from './components/ComparePage';
import { CrossModalPage } from './components/CrossModalPage';
import { HistoryPage } from './components/HistoryPage';
import { ImageModal } from './components/ImageModal';
import { ExplainModal } from './components/ExplainModal';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSensor, setSelectedSensor] = useState<SensorType>('optical');
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined);

  // Modals state
  const [inspectImage, setInspectImage] = useState<{ src: string; title: string } | null>(null);
  const [showExplain, setShowExplain] = useState<boolean>(false);

  const handleStartAnalysis = (prompt: string, sensor: SensorType, image?: string) => {
    setActivePrompt(prompt);
    setSelectedSensor(sensor);
    if (image) setUploadedImage(image);
    setCurrentPage('analyze');
  };

  const handleNavigate = (page: Page, prompt?: string) => {
    if (prompt) setActivePrompt(prompt);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-['Inter',sans-serif] selection:bg-[#2dd4bf]/30 selection:text-white">
      {/* Top Fixed Navbar */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={(page) => setCurrentPage(page)}
      />

      {/* Main Page Stage with Animated Transitions */}
      <main className="flex-1 pt-14 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HomePage
                onStartAnalysis={handleStartAnalysis}
                onSelectSensor={setSelectedSensor}
                selectedSensor={selectedSensor}
              />
            </motion.div>
          )}

          {currentPage === 'analyze' && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AnalyzePage
                onNavigate={handleNavigate}
                initialPrompt={activePrompt}
                initialSensor={selectedSensor}
                uploadedImage={uploadedImage}
                onOpenFullImage={(src, title) => setInspectImage({ src, title })}
                onOpenExplain={() => setShowExplain(true)}
              />
            </motion.div>
          )}

          {currentPage === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ComparePage
                onNavigate={handleNavigate}
                onOpenFullImage={(src, title) => setInspectImage({ src, title })}
              />
            </motion.div>
          )}

          {currentPage === 'cross-modal' && (
            <motion.div
              key="cross-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CrossModalPage
                onNavigate={handleNavigate}
                onOpenFullImage={(src, title) => setInspectImage({ src, title })}
              />
            </motion.div>
          )}

          {currentPage === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HistoryPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Image Inspector Modal */}
      {inspectImage && (
        <ImageModal
          src={inspectImage.src}
          title={inspectImage.title}
          onClose={() => setInspectImage(null)}
        />
      )}

      {/* Explainability "How was this answered?" Modal */}
      {showExplain && <ExplainModal onClose={() => setShowExplain(false)} />}
    </div>
  );
}
