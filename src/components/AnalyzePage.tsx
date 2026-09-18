import React, { useState, useEffect, useRef } from 'react';
import { Page, SensorType, ChatMessage } from '../types';
import { SegmentedLandCoverImage, PrismIllustration } from './SatelliteVisuals';
import {
  Plus,
  Clock,
  Layers,
  ArrowLeft,
  Paperclip,
  ArrowRight,
  Maximize2,
  HelpCircle,
  Sparkles,
  Disc,
  Shuffle,
  CloudSun,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalyzePageProps {
  onNavigate: (page: Page) => void;
  initialPrompt?: string;
  initialSensor?: SensorType;
  uploadedImage?: string;
  onOpenFullImage: (src: string, title: string) => void;
  onOpenExplain: () => void;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({
  onNavigate,
  initialPrompt,
  initialSensor = 'optical',
  uploadedImage,
  onOpenFullImage,
  onOpenExplain,
}) => {
  const [sensor, setSensor] = useState<SensorType>(initialSensor);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'user',
      text: initialPrompt || 'What type of land cover is visible in this image?',
      timestamp: '10:24 AM',
      thumbnailUrl: uploadedImage || undefined,
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text:
        'The image shows a mix of agricultural land, built-up areas and a water body. The river flows through the eastern part of the image, with dense vegetation in the surrounding areas.',
      timestamp: '10:24 AM',
      confidence: 92,
      legend: [
        { label: 'Agricultural land', color: '#22c55e' },
        { label: 'Built-up area', color: '#ef4444' },
        { label: 'Water body', color: '#38bdf8' },
        { label: 'Vegetation', color: '#16a34a' },
      ],
      actionButtons: [
        { label: 'View full image', action: 'view_image', icon: 'max' },
        { label: 'How was this answered?', action: 'explain', icon: 'help' },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;
    const userText = inputText.trim();
    setInputText('');

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, sensorMode: sensor.toUpperCase() }),
      });

      let replyText =
        'Based on multi-spectral analysis, I isolated specific spatial reflectance patterns. High near-infrared chlorophyll reflectance characterizes the agricultural parcels, with backscatter stability across the built-up sector.';
      let conf = 93;

      if (response.ok) {
        const data = await response.json();
        if (data.executiveSummary) replyText = data.executiveSummary;
        if (data.confidence) conf = Math.round(data.confidence);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: conf,
        legend: [
          { label: 'Primary Feature', color: '#38bdf8' },
          { label: 'Spectral Target', color: '#ef4444' },
          { label: 'Vegetation Canopy', color: '#22c55e' },
        ],
        actionButtons: [
          { label: 'View full image', action: 'view_image', icon: 'max' },
          { label: 'How was this answered?', action: 'explain', icon: 'help' },
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback assistant reply
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text:
          'Identified water boundary contrast along the east tributary, confirmed with normalized difference water index (NDWI) threshold of -0.22.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 91,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'msg-fresh',
        sender: 'assistant',
        text:
          'New analysis session started. Upload satellite imagery or ask a question about land cover, water bodies, or temporal change.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#070e1b]">
      {/* Left Sidebar matching Page 2 reference */}
      <aside className="hidden md:flex flex-col w-64 bg-[#091223] border-r border-[#16253c] p-4 justify-between shrink-0">
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm text-white">SatQuery AI</span>
          </div>

          {/* Action Links */}
          <div className="flex flex-col gap-1.5 mt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#142642] hover:bg-[#1b3459] border border-sky-500/30 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer text-left"
            >
              <Plus className="w-4 h-4 text-sky-400" />
              <span>New Analysis</span>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#111e33] text-xs font-medium transition-all cursor-pointer text-left"
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>History</span>
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#111e33] text-xs font-medium transition-all cursor-pointer text-left"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => onNavigate('cross-modal')}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#111e33] text-xs font-medium transition-all cursor-pointer text-left"
            >
              <Shuffle className="w-4 h-4 text-slate-500" />
              <span>Cross-Modal</span>
            </button>
          </div>
        </div>

        {/* Bottom Explore Earth Card */}
        <div className="bg-[#0e1a2f] border border-[#1a2f4e] rounded-xl p-3.5 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-white">Explore Earth with AI</span>
          <div className="w-full flex items-center justify-center py-1">
            <PrismIllustration className="w-20 h-12" />
          </div>
          <span className="text-[11px] text-slate-400">
            Multi-spectral, SAR and thermal fusion models ready.
          </span>
        </div>
      </aside>

      {/* Main Chatbot Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#070e1b] relative">
        {/* Top Chat Bar */}
        <div className="h-14 border-b border-[#16253c] px-4 sm:px-6 flex items-center justify-between shrink-0 bg-[#070e1b]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium text-white">New Analysis</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Sensor Indicator Pill */}
            <div className="flex items-center gap-1 bg-[#0f1d33] border border-[#1c3356] rounded-full px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium capitalize">{sensor} Image</span>
              <div className="flex items-center gap-1 ml-2 border-l border-slate-700 pl-2">
                <button
                  onClick={() => setSensor('optical')}
                  title="Optical Sensor"
                  className={`p-1 rounded ${sensor === 'optical' ? 'text-sky-400' : 'text-slate-500'}`}
                >
                  <Disc className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setSensor('sar')}
                  title="SAR Sensor"
                  className={`p-1 rounded ${sensor === 'sar' ? 'text-sky-400' : 'text-slate-500'}`}
                >
                  <Shuffle className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setSensor('multispectral')}
                  title="Multispectral Sensor"
                  className={`p-1 rounded ${sensor === 'multispectral' ? 'text-sky-400' : 'text-slate-500'}`}
                >
                  <CloudSun className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* User Avatar */}
            <div className="w-7 h-7 rounded-full bg-[#1c2e47] text-sky-300 text-xs font-semibold flex items-center justify-center border border-[#2d476f]">
              Y
            </div>
          </div>
        </div>

        {/* Scrollable Chat Message Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col gap-6 max-w-4xl w-full mx-auto">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* User Message Bubble */}
                {isUser ? (
                  <div className="flex items-start gap-3 max-w-xl">
                    <div className="flex flex-col items-end gap-1">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-3 bg-[#111f36] border border-[#1f3559] p-2.5 rounded-2xl rounded-tr-none text-slate-200 text-xs sm:text-sm shadow-md"
                      >
                        {/* Satellite Image Thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700 bg-slate-900 shadow-inner">
                          {msg.thumbnailUrl ? (
                            <img
                              src={msg.thumbnailUrl}
                              alt="Uploaded query satellite patch"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <SegmentedLandCoverImage className="w-full h-full" showOverlay={false} />
                          )}
                        </div>
                        <p className="leading-relaxed">{msg.text}</p>
                      </motion.div>
                      <span className="text-[10px] text-slate-500 mr-1">{msg.timestamp}</span>
                    </div>
                  </div>
                ) : (
                  /* Assistant Message Bubble */
                  <div className="flex items-start gap-3 max-w-2xl w-full">
                    {/* Bot Avatar with pop-in */}
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1.5px] shrink-0 mt-1 shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                    >
                      <div className="w-full h-full rounded-full bg-[#091222] flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                      </div>
                    </motion.div>

                    <div className="flex-1 flex flex-col gap-3">
                      {/* Top Meta: Bot Name & Confidence Pill with Spring Pop-In */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">SatQuery AI</span>
                        {msg.confidence && (
                          <motion.span
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 450, damping: 18, delay: 0.15 }}
                            className="text-[11px] font-medium text-sky-300 bg-sky-950/70 border border-sky-400/40 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.2)] flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Confidence: {msg.confidence}%
                          </motion.span>
                        )}
                      </div>

                      {/* Explanation Text */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {msg.text}
                      </p>

                      {/* Segmented Image Visualization with Legend & Animated Radar Scan */}
                      <motion.div
                        whileHover={{ borderColor: 'rgba(56,189,248,0.4)' }}
                        className="rounded-xl overflow-hidden border border-[#1e3456] bg-[#0c182b] p-3 flex flex-col md:flex-row gap-4 shadow-xl transition-colors relative"
                      >
                        {/* Map Image Graphic with Active Radar Scanline */}
                        <div
                          onClick={() =>
                            onOpenFullImage(
                              uploadedImage ||
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG',
                              uploadedImage ? 'Custom Satellite Imagery (Classification Overlay)' : 'Land Cover Classification Map (Sentinel-2 L2A)'
                            )
                          }
                          className="w-full md:w-3/5 aspect-[4/3] rounded-lg overflow-hidden relative cursor-pointer group shrink-0 bg-black/50"
                        >
                          {uploadedImage ? (
                            <div className="relative w-full h-full">
                              <img
                                src={uploadedImage}
                                alt="Analyzed satellite scene"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {/* Overlay polygon highlights on top of custom image */}
                              <div className="absolute inset-0 bg-emerald-500/15 mix-blend-overlay pointer-events-none" />
                              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border-2 border-red-500/80 bg-red-500/25 rounded-md pointer-events-none" />
                            </div>
                          ) : (
                            <SegmentedLandCoverImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          )}
                          
                          {/* Animated Satellite Radar Scan Line */}
                          <motion.div
                            animate={{ top: ['0%', '98%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none shadow-[0_0_8px_#38bdf8]"
                          />

                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-medium backdrop-blur-[1px]">
                            <Maximize2 className="w-4 h-4 text-sky-400" />
                            <span>Click to expand</span>
                          </div>
                        </div>

                        {/* Classification Legend */}
                        <div className="flex-1 flex flex-col justify-center gap-2.5">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Classified Layers
                          </span>
                          <div className="flex flex-col gap-2">
                            {msg.legend?.map((item, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ scale: 1.04, x: 2 }}
                                className="flex items-center gap-2 text-xs text-slate-300 cursor-default"
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span>{item.label}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Action Buttons with Spring Pop-Up */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <motion.button
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            onOpenFullImage(
                              uploadedImage ||
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG',
                              uploadedImage ? 'Custom Satellite Imagery (Full View)' : 'Land Cover Analysis (Full Resolution 10m)'
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111f36] hover:bg-[#1a2e4f] border border-[#1f3559] hover:border-sky-400/60 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>View full image</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onOpenExplain}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111f36] hover:bg-[#1a2e4f] border border-[#1f3559] hover:border-sky-400/60 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                          <span>How was this answered?</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-[#091222] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                  </div>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-[#111f36] border border-[#1e3456] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-400 ml-2 font-mono">Analyzing spectral bands...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Chat Input Bar matching Page 2 */}
        <div className="p-4 bg-[#070e1b] border-t border-[#14233a] shrink-0">
          <div className="max-w-4xl mx-auto flex items-center gap-2 bg-[#0e192c] border border-[#1d3356] rounded-full p-1.5 pl-4 pr-1.5 shadow-lg focus-within:border-sky-400 focus-within:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
            <button
              onClick={() => {
                alert('Attach satellite raster or GeoJSON vector layer.');
              }}
              className="text-slate-400 hover:text-sky-300 p-1 rounded-full cursor-pointer transition-colors"
              title="Attach satellite layer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a follow-up question..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none min-w-0"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !inputText.trim()}
              className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-md"
              title="Send message"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
