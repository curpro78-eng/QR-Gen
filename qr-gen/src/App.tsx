/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link as LinkIcon, QrCode, Share2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [url, setUrl] = useState('https://google.com');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code-${new Date().getTime()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <div className="max-w-xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-6 border border-black/5"
          >
            <QrCode className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight mb-3"
          >
            QR Gen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#9e9e9e] text-lg"
          >
            Generate elegant QR codes for any URL instantly.
          </motion.p>
        </header>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[32px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5"
        >
          {/* Input Section */}
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="url-input" className="block text-xs font-medium uppercase tracking-wider text-[#9e9e9e] mb-2 ml-1">
                Website URL
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <LinkIcon className="w-5 h-5 text-[#9e9e9e] group-focus-within:text-black transition-colors" />
                </div>
                <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-[#f9f9f9] border-none rounded-2xl py-4 pl-12 pr-4 text-lg focus:ring-2 focus:ring-black/5 transition-all outline-none placeholder:text-[#d1d1d1]"
                />
              </div>
            </div>

            {/* QR Display */}
            <div className="flex flex-col items-center justify-center py-8">
              <div 
                ref={qrRef}
                className="p-6 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 mb-8"
              >
                <QRCodeCanvas
                  value={url || ' '}
                  size={200}
                  level="H"
                  includeMargin={false}
                  className="rounded-lg"
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 bg-[#f9f9f9] hover:bg-[#f0f0f0] text-black font-medium py-4 rounded-2xl transition-all active:scale-[0.98]"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5 text-emerald-500" />
                        <span>Copied</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Copy URL</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <button
                  onClick={downloadQRCode}
                  disabled={!url}
                  className="flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white font-medium py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-6 text-[#9e9e9e] text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>High Quality SVG</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>No Expiration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Privacy Focused</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
