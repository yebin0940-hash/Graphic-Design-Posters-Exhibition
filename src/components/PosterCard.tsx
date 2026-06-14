/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, Edit3, Trash2 } from 'lucide-react';
import { Poster, ThemeSettings } from '../types';
import { COLOR_PRESETS } from '../data';

interface PosterCardProps {
  poster: Poster;
  theme: ThemeSettings;
  onQuickView: (poster: Poster) => void;
  onEdit?: (poster: Poster) => void;
  onDelete?: (id: string) => void;
  adminMode: boolean;
}

export default function PosterCard({
  poster,
  theme,
  onQuickView,
  onEdit,
  onDelete,
  adminMode
}: PosterCardProps) {
  // Determine color theme for this individual poster or fall back to the site-wide theme
  const presetKey = (poster.colorPreset || theme.primaryPalette) as keyof typeof COLOR_PRESETS;
  const colors = COLOR_PRESETS[presetKey] || COLOR_PRESETS.lavender;

  // Header font styles mapping
  const headerFontClass = 
    theme.headerFont === 'serif' ? 'font-serif' : 
    theme.headerFont === 'sans' ? 'font-sans font-semibold tracking-tight' : 
    'font-display uppercase tracking-wider';

  // Spacing presets for poster borders and cards
  const spacingCardClass = 
    theme.spacing === 'compact' ? 'p-3' : 
    theme.spacing === 'balanced' ? 'p-6' : 
    'p-8';

  // Frame borders mapping
  const borderFrameClass = 
    theme.borderStyle === 'none' ? 'border-0 shadow-sm' : 
    theme.borderStyle === 'thin' ? 'border border-neutral-200/80 dark:border-zinc-800 shadow-md' : 
    'border-[3px] border-zinc-900 dark:border-white shadow-xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 flex flex-col justify-between select-none h-full"
    >
      {/* Poster Passepartout and Image Wrapper */}
      <div 
        className={`relative flex flex-col items-center bg-white dark:bg-zinc-900 transition-all duration-300 ${borderFrameClass} ${spacingCardClass} group`}
        style={{ width: '400px', height: '560px' }}
      >
        {/* Subtle Pastel Ambient Backlight Reflection on Hover */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none -z-10 blur-xl scale-[1.03] bg-gradient-to-tr ${colors.gradient}`} 
        />

        {/* Paper texture background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

        {/* The Graphic Design Art Frame */}
        <div className="relative w-full h-[380px] overflow-hidden bg-neutral-100 dark:bg-zinc-800 border border-neutral-100 dark:border-zinc-700/50 flex items-center justify-center">
          <img
            src={poster.imageUrl || 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80'}
            alt={poster.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            draggable="false"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Gracefully handle images failures
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {/* Quick View and Adm Controls Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-3 transition-opacity duration-300">
            <button
              onClick={() => onQuickView(poster)}
              title="작품 아카이브 자세히 감상 (퀵 뷰)"
              className="p-3 bg-white text-zinc-900 rounded-full hover:bg-neutral-100 hover:scale-115 active:scale-95 transition-all duration-200 shadow-md"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            {adminMode && (
              <>
                <button
                  onClick={() => onEdit && onEdit(poster)}
                  title="포스터 정보 수정하기"
                  className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 hover:scale-115 active:scale-95 transition-all duration-200 shadow-md"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete && onDelete(poster.id)}
                  title="전시 포스터 영구 수거 (삭제)"
                  className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 hover:scale-115 active:scale-95 transition-all duration-200 shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Minimalist Year Indicator on Frame Edge */}
          <span className="absolute bottom-2.5 right-3 font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 select-none bg-black/10 dark:bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
            {poster.year}
          </span>
          
          <span className="absolute top-2.5 left-3 font-mono text-[9px] uppercase tracking-widest text-zinc-500 select-none bg-white/70 dark:bg-zinc-900/70 px-2 py-0.5 rounded backdrop-blur-xs">
            {poster.category}
          </span>
        </div>

        {/* Poster Label Passepartout Typography (Classic Gallery Layout) */}
        <div className="w-full mt-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <h4 className={`${headerFontClass} text-base tracking-wide text-zinc-800 dark:text-zinc-100 truncate flex-1 uppercase`}>
                {poster.title}
              </h4>
              <span className={`text-[10px] font-mono font-medium ml-2 uppercase px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-400 ${colors.accentText}`}>
                {poster.colorPreset || '기본'}
              </span>
            </div>
            
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center justify-between">
              <span>작가: <strong className="text-zinc-800 dark:text-zinc-200 uppercase">{poster.artist}</strong></span>
              {poster.dimensions && <span className="font-mono text-[9px] text-[#9c9c9c]">{poster.dimensions}</span>}
            </p>
          </div>

          <div className="border-t border-neutral-100 dark:border-zinc-800/80 pt-2 flex items-center justify-between mt-2.5">
            <span className="text-[10px] font-mono text-zinc-400 uppercase truncate max-w-[200px]" title={poster.medium}>
              {poster.medium || '관람용 원본 포스터'}
            </span>
            <button
              onClick={() => onQuickView(poster)}
              className="font-mono text-[9px] font-semibold text-zinc-800 dark:text-zinc-200 hover:opacity-75 uppercase tracking-wider flex items-center space-x-1"
            >
              <span>아카이브 감상 ↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Auxiliary Display Metadata beneath poster physical shape */}
      {theme.showMetadata && (
        <div className="mt-4 px-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-500 space-y-0.5">
          <div className="flex justify-between">
            <span>소장 인덱스 번호:</span>
            <span>GD-{poster.id.replace('poster-', '00')}</span>
          </div>
          <div className="flex justify-between">
            <span>소장 매체 종류:</span>
            <span>{poster.medium || '실크스크린 및 실크 판종 인쇄'} / 무산성(Mat-Acid-Free) 수입지</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
