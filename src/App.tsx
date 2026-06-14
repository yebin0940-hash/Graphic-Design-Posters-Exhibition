/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeftRight, 
  Sparkles, 
  Info,
  Maximize2,
  Sliders,
  X,
  Plus
} from 'lucide-react';

import { Poster, ThemeSettings } from './types';
import { 
  getStoredPosters, 
  saveStoredPosters, 
  getStoredTheme, 
  saveStoredTheme,
  COLOR_PRESETS,
  AMBIENT_LIGHTS 
} from './data';

import Header from './components/Header';
import ThemeCustomizer from './components/ThemeCustomizer';
import PosterCard from './components/PosterCard';
import QuickViewModal from './components/QuickViewModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  // --- STATE SYSTEM ---
  const [posters, setPosters] = useState<Poster[]>([]);
  const [theme, setTheme] = useState<ThemeSettings>(getStoredTheme());
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  
  // UI Panels
  const [adminActive, setAdminActive] = useState<boolean>(false);
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);
  
  // Interactive Helper Banners
  const [dismissedIntro, setDismissedIntro] = useState<boolean>(false);

  // Gallery Horizontal Alignment States
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // --- INITIALIZATION & URL PARSING ---
  useEffect(() => {
    // Load posters from Local or Initial fallback state
    const loadedPosters = getStoredPosters();
    setPosters(loadedPosters);

    // Deep-linking sharing system:
    // Check if the guest entered via a shared design coordinate link (e.g. ?poster=poster-2)
    const params = new URLSearchParams(window.location.search);
    const posterParam = params.get('poster');
    if (posterParam) {
      const match = loadedPosters.find(p => p.id === posterParam);
      if (match) {
        setSelectedPoster(match);
      }
    }
  }, []);

  // --- LOCAL PERSISTENCE BACKUP ---
  const handleUpdateTheme = (updatedTheme: ThemeSettings) => {
    setTheme(updatedTheme);
    saveStoredTheme(updatedTheme);
  };

  const handleAddPoster = (newPoster: Poster) => {
    const updated = [newPoster, ...posters];
    setPosters(updated);
    saveStoredPosters(updated);
  };

  const handleUpdatePoster = (modifiedPoster: Poster) => {
    const updated = posters.map(p => p.id === modifiedPoster.id ? modifiedPoster : p);
    setPosters(updated);
    saveStoredPosters(updated);
  };

  const handleDeletePoster = (id: string) => {
    const updated = posters.filter(p => p.id !== id);
    setPosters(updated);
    saveStoredPosters(updated);
  };

  // --- SMOOTH LATERAL NAVIGATION TRIGGERS ---
  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollOffset = direction === 'left' ? -460 : 460;
      container.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollProgress = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const totalWidth = container.scrollWidth - container.clientWidth;
      if (totalWidth > 0) {
        const currentProgress = (container.scrollLeft / totalWidth) * 100;
        setScrollProgress(currentProgress);
        
        setCanScrollLeft(container.scrollLeft > 5);
        setCanScrollRight(container.scrollLeft < totalWidth - 5);
      }
    }
  };

  // Bind mousewheel listener to scroll horizontally instead of vertically
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only horizontal scroll if admin route/panel is collapsed (primary viewing mode)
      if (!adminActive && Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 1.5,
          behavior: 'auto' // Instant for raw native feel
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [adminActive]);

  // Handle keys layout shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPoster(null);
        setCustomizerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- VISUAL STYLE MAPS ---
  const lightSettings = AMBIENT_LIGHTS[theme.ambientLight] || AMBIENT_LIGHTS.clean;
  const isDarkWall = theme.ambientLight === 'gallery-dark';

  // Fonts maps
  const headerFontClass = 
    theme.headerFont === 'serif' ? 'font-serif' : 
    theme.headerFont === 'sans' ? 'font-sans font-bold tracking-tight' : 
    'font-display uppercase tracking-[0.1em]';

  const bodyFontClass =
    theme.bodyFont === 'serif' ? 'font-serif' : 'font-sans';

  // Site spacing modifiers
  const spacingSectionPadding = 
    theme.spacing === 'compact' ? 'py-8' : 
    theme.spacing === 'balanced' ? 'py-14' : 
    'py-24';

  const activeColorPreset = COLOR_PRESETS[theme.primaryPalette] || COLOR_PRESETS.lavender;

  return (
    <div className={`min-h-screen lux-focus flex flex-col justify-between ${lightSettings.class} ${bodyFontClass} transition-colors duration-500`}>
      
      {/* 1. Header Toolbar Component */}
      <Header 
        theme={theme}
        adminActive={adminActive}
        onToggleAdmin={() => setAdminActive(!adminActive)}
        onToggleThemeSettings={() => setCustomizerOpen(!customizerOpen)}
        postersCount={posters.length}
      />

      {/* 2. Admin CRUD Dashboard Overlay Drawer */}
      <AnimatePresence>
        {adminActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <AdminDashboard 
              posters={posters}
              theme={theme}
              onAddPoster={handleAddPoster}
              onUpdatePoster={handleUpdatePoster}
              onDeletePoster={handleDeletePoster}
              onClose={() => setAdminActive(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Exhibition Hall (The Lateral Strip) */}
      <main className="flex-1 flex flex-col justify-center">
        
        {/* Gallery Intro Banner Guide */}
        {!dismissedIntro && (
          <div className="max-w-[1600px] mx-auto px-6 mt-6 w-full">
            <div className={`p-4 rounded border flex items-start justify-between transition-all ${
              isDarkWall 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300' 
                : 'bg-white border-neutral-150 text-zinc-700 shadow-xs'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-indigo-50 dark:bg-zinc-950 flex-shrink-0 text-indigo-500">
                  <ArrowLeftRight className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-semibold">
                    마우스 휠 스크롤 활성화됨
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    마우스 휠 스크롤, 트랙패드의 좌우 스와이프, 혹은 우측 하단의 탐색 화살표 버튼을 클릭해 그래픽 포스터 갤러리를 좌우로 자유롭게 관람하실 수 있습니다.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setDismissedIntro(true)} 
                className="text-zinc-400 hover:text-zinc-650 p-1"
                title="Dismiss Instruction Guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* The Exhibition Track Section */}
        <section className={`relative w-full overflow-hidden ${spacingSectionPadding}`}>
          {/* Faded wall reflections to reinforce depth (Left/Right margins glows) */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent pointer-events-none z-10" />

          {/* Lateral Scrolling Core Frame Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScrollProgress}
            className="flex overflow-x-auto overflow-y-hidden space-x-12 px-10 md:px-24 py-6 scroll-smooth no-scrollbar snap-x snap-mandatory"
            style={{ minHeight: '610px' }}
          >
            {/* Start spacer banner block to frame the entrance */}
            <div className="flex-shrink-0 flex flex-col justify-center w-[280px] snap-start pr-4 select-none">
              <h2 className={`${headerFontClass} text-2xl font-light leading-snug uppercase`}>
                GRAPHIC DESIGN<br />POSTERS EXHIBITION
              </h2>
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
                스위스의 타이포그래피 균형미와 유기적인 캔버스 역동성을 현대적으로 재해석했습니다. 천천히 걸어가며 아름다운 그래픽 레이아웃과 구도 이론을 조용히 경험해 보세요.
              </p>
              
              <div className="mt-8 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#a1a1a1]">
                  인터랙티브 갤러리 관람
                </span>
              </div>
            </div>

            {/* Render dynamic posters collections */}
            {posters.length === 0 ? (
              <div className="flex-shrink-0 w-full flex flex-col justify-center items-center py-20 text-zinc-400 font-mono text-sm">
                등록된 그래픽 포스터가 없습니다.
                <button 
                  onClick={() => setAdminActive(true)} 
                  className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded text-xs select-auto uppercase tracking-wider"
                >
                  새 작품 추가하기
                </button>
              </div>
            ) : (
              posters.map((poster) => (
                <div key={poster.id} className="snap-center flex-shrink-0">
                  <PosterCard 
                    poster={poster}
                    theme={theme}
                    onQuickView={setSelectedPoster}
                    onEdit={(post) => {
                      setAdminActive(true);
                    }}
                    onDelete={handleDeletePoster}
                    adminMode={true} // Enabled full direct access controls for high playground interactivity
                  />
                </div>
              ))
            )}

            {/* Outro/Credits block at the far end */}
            <div className="flex-shrink-0 w-[400px] flex flex-col justify-center snap-end pl-8 pr-16 select-none bg-indigo-50/10 dark:bg-zinc-900/10 p-8 rounded-lg border border-dashed border-neutral-200/50 dark:border-zinc-800">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 block mb-1">
                기획전 에필로그
              </span>
              <h3 className={`${headerFontClass} text-2xl uppercase tracking-wide leading-tight mt-1 mb-4`}>
                전시 기획전 회고
              </h3>
              
              <p className="text-xs text-zinc-500 dark:text-zinc-450 font-sans leading-relaxed">
                포스터 그래픽 디자인전의 예술적 여정을 함께해 주셔서 감사드립니다. 본 가상 전시관은 자유로운 큐레이터 관람 플랫폼입니다. 상단의 에디팅 튜닝 툴을 활용해 작품을 더 추가하거나 설명을 한글로 교정할 수도 있으며, 배경 명도의 온도를 조절해 미술관의 공기를 입맛대로 바꿔보실 수 있습니다.
              </p>

              <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-zinc-850">
                <span className="font-mono text-[10px] text-zinc-450 block uppercase mb-1">주관 대관처</span>
                <span className="font-sans text-xs font-semibold text-zinc-800 dark:text-zinc-200">한동대학교 콘텐츠융합디자인학부</span>
              </div>
            </div>

          </div>

          {/* Exhibition Lateral Navigation controls panel overlay */}
          <div className="max-w-[1600px] mx-auto px-6 mt-4 flex items-center justify-between">
            {/* Left: Scientific Visual Scroll Progress Indicator Bar */}
            <div className="flex-1 max-w-xs flex items-center space-x-3">
              <span className="font-mono text-[9px] text-zinc-400">01 / 전시장 입구</span>
              <div className="flex-1 h-[2px] bg-neutral-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zinc-900 dark:bg-white transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-zinc-400">02 / 관람 퇴장구</span>
            </div>

            {/* Right Side: Directional triggers */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollGallery('left')}
                disabled={!canScrollLeft}
                title="Scroll Left"
                className={`p-2.5 rounded-full border transition-all ${
                  canScrollLeft
                    ? 'border-neutral-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900 text-zinc-800 dark:text-white cursor-pointer hover:bg-zinc-150'
                    : 'border-neutral-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => scrollGallery('right')}
                disabled={!canScrollRight}
                title="Scroll Right"
                className={`p-2.5 rounded-full border transition-all ${
                  canScrollRight
                    ? 'border-neutral-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900 text-zinc-800 dark:text-white cursor-pointer hover:bg-zinc-150'
                    : 'border-neutral-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </section>
      </main>

      {/* 4. Multi-Channel Theme Settings panel */}
      <ThemeCustomizer 
        theme={theme}
        onChangeTheme={handleUpdateTheme}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />

      {/* 5. Master Poster Quick View Dialogue Lightbox */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <QuickViewModal 
              poster={selectedPoster}
              theme={theme}
              onClose={() => setSelectedPoster(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Footer Curation contact Coordinates & Subs */}
      <Footer theme={theme} />

    </div>
  );
}
