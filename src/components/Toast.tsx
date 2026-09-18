import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto bg-[#0d1b2f] border border-[#213b63] shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(56,189,248,0.2)] rounded-2xl p-3.5 flex items-start gap-3 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-sky-500/30">
              {toast.type === 'info' ? (
                <Info className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs font-semibold text-white tracking-tight">{toast.title}</h4>
              {toast.description && (
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
