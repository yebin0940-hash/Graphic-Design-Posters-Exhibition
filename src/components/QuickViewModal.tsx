/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, User, Sliders, Hash, Compass, ArrowRight, Download, Share2, Clipboard, Heart } from 'lucide-react';
import { Poster, ThemeSettings } from '../types';
import { COLOR_PRESETS } from '../data';

interface QuickViewModalProps {
  poster: Poster | null;
  theme: ThemeSettings;
  onClose: () => void;
}

export default function QuickViewModal({
  poster,
  theme,
  onClose
}: QuickViewModalProps) {
  const [copied, setCopied] = useState(false);
  const [loved, setLoved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!poster) return null;

  const presetKey = (poster.colorPreset || theme.primaryPalette) as keyof typeof COLOR_PRESETS;
  const colors = COLOR_PRESETS[presetKey] || COLOR_PRESETS.lavender;

  // Header font styles mapping
  const headerFontClass = 
    theme.headerFont === 'serif' ? 'font-serif' : 
    theme.headerFont === 'sans' ? 'font-sans font-semibold tracking-tight' : 
    'font-display uppercase tracking-wider';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}?poster=${poster.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`[미술관 시스템]: "${poster.title}" 작품의 시뮬레이션 벡터 인쇄용 레이아웃(700dpi PDF)이 성공적으로 컴파일되었습니다. 다운로드 큐가 준비되었습니다.`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" role="dialog" aria-modal="true">
      {/* Immersive backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#090a0d]/85 backdrop-blur-md transition-opacity duration-500" 
        onClick={onClose} 
      />

      {/* Frame Container */}
      <div 
        id="quickview-frame"
        className="relative w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col md:flex-row transition-all duration-300 animate-fade-in-up border bg-white border-neutral-100/80 text-zinc-800"
      >
        {/* Absolute close button */}
        <button
          onClick={onClose}
          id="btn-close-quickview"
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white focus:outline-none transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Massive Artwork Gallery Stage */}
        <div className="relative w-full md:w-[45%] h-[40vh] md:h-[85vh] bg-[#fdfdfd] dark:bg-zinc-950 flex items-center justify-center p-6 sm:p-10 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-zinc-800">
          {/* Visual gradient backdrop behind poster for contrast */}
          <div className={`absolute inset-0 opacity-15 bg-gradient-to-tr ${colors.gradient} blur-2xl`} />

          {/* Realistic physical framing shadow structure */}
          <div className="relative w-full h-full max-h-[300px] md:max-h-[500px] shadow-2xl border border-neutral-200/40 bg-white flex items-center justify-center overflow-hidden">
            <img
              src={poster.imageUrl}
              alt={poster.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
        </div>

        {/* Right Side: Scientific Metadatas and Design Narrative */}
        <div className="flex-1 flex flex-col justify-between h-[50vh] md:h-[85vh] overflow-y-auto p-6 md:p-10">
          <div>
            {/* Category / Taxonomy metadata header */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded">
                대분류: {poster.category}
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded ${colors.accentBg} ${colors.accentText}`}>
                명도 테마: {poster.colorPreset || '기본값'}
              </span>
            </div>

            {/* Title & Artist */}
            <h2 className={`${headerFontClass} text-2xl md:text-3xl tracking-wide uppercase leading-tight mt-1 mb-2`}>
              {poster.title}
            </h2>

            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
              작가: <strong className="text-zinc-800 dark:text-zinc-200 uppercase">{poster.artist}</strong>
            </p>

            {/* Artistic Backstory & Narrative */}
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block border-b border-neutral-100 dark:border-zinc-800 pb-1.5">
                작품 기획전 비하인드 소스
              </label>
              <p className={`text-sm leading-relaxed text-zinc-650 font-sans ${theme.bodyFont === 'serif' ? 'font-serif' : 'font-sans'}`}>
                {poster.description || '이 기획전용 실물 포스터는 심미적 여백을 현대적 배합 공식에 기반하여 표현했습니다.'}
              </p>
            </div>

            {/* Spec Sheets & Dimension archives */}
            <div className="mt-8 space-y-3">
              <label className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block border-b border-neutral-100 dark:border-zinc-800 pb-1.5">
                미술관 영구 어카이벌 데이터
              </label>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <div>
                    <span className="text-[9px] text-[#909090] block">인쇄 및 출시 년도</span>
                    <span className="text-zinc-800">{poster.year}년 공식 출시</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                  <div>
                    <span className="text-[9px] text-[#909090] block">인쇄 규격</span>
                    <span className="text-zinc-800">{poster.dimensions || '70 × 100 cm'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <div>
                    <span className="text-[9px] text-[#909090] block">인쇄 캔버스 형태</span>
                    <span className="text-zinc-800 truncate block max-w-[130px]">{poster.medium || '실크스크린 실크 판종 인쇄'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Hash className="w-3.5 h-3.5 text-zinc-400" />
                  <div>
                    <span className="text-[9px] text-[#909090] block">미술관 소장 번호</span>
                    <span className="text-zinc-800">GD-{poster.id.toUpperCase().replace('POSTER-', '00')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share, Love, and Simulated Vector Print Purchase */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-zinc-800 space-y-4">
            <div className="flex space-x-2">
              {/* simulated like button */}
              <button
                onClick={() => setLoved(!loved)}
                className={`p-2.5 rounded border text-xs font-mono transition-all duration-200 flex items-center space-x-1.5 ${
                  loved
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-neutral-200 text-zinc-450 hover:text-zinc-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${loved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{loved ? '보관함 등록됨' : '도록 좋아요 소장'}</span>
              </button>

              {/* simulated share link */}
              <button
                onClick={handleCopyLink}
                className="flex-1 p-2.5 border border-neutral-200 rounded text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors flex items-center justify-center space-x-1.5"
              >
                {copied ? (
                  <>
                    <Clipboard className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold uppercase">공유 링크 복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>시각 공유 구도 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* vector download simulator */}
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className={`w-full py-3 px-4 rounded text-white flex items-center justify-center space-x-2 text-xs font-mono tracking-wider uppercase transition-all shadow-md ${
                downloading 
                  ? 'bg-zinc-500 cursor-not-allowed' 
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white'
              }`}
            >
              <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
              <span>{downloading ? '벡터 스케일 계산 및 렌더링 중...' : '고해상도 어카이벌 PDF 다운로드'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
