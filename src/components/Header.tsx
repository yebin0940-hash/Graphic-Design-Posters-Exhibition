/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Sliders, Lock, Unlock, Eye, HelpCircle, X } from 'lucide-react';
import { ThemeSettings } from '../types';

interface HeaderProps {
  theme: ThemeSettings;
  adminActive: boolean;
  onToggleAdmin: () => void;
  onToggleThemeSettings: () => void;
  postersCount: number;
}

export default function Header({
  theme,
  adminActive,
  onToggleAdmin,
  onToggleThemeSettings,
  postersCount
}: HeaderProps) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-transparent backdrop-blur-md border-b border-neutral-100/30 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Minimalist Logo / Branding */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-[0.1em] font-light text-zinc-900">
              GRAPHIC DESIGN
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#9c9c9c] -mt-1 block">
              POSTERS EXHIBITION
            </span>
          </div>
          <span className="hidden sm:inline-block h-6 w-px bg-zinc-200" />
          <span className="hidden sm:inline-flex items-center text-[10px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-sm tracking-wider">
            {postersCount}개 작품 전시 중
          </span>
        </div>

        {/* Minimalist Nav Right */}
        <div className="flex items-center space-x-3">
          {/* Concept / About Trigger */}
          <button
            onClick={() => setShowAbout(true)}
            id="btn-about"
            className="px-4 py-2 text-xs font-mono tracking-wider uppercase flex items-center space-x-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 focus:outline-none text-zinc-700 hover:text-zinc-900"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">큐레이터 선언문</span>
          </button>

          {/* Theme customizer toggle */}
          <button
            onClick={onToggleThemeSettings}
            id="btn-theme-toggle"
            className="px-4 py-2 text-xs font-mono tracking-wider uppercase flex items-center space-x-1.5 rounded-full border border-neutral-200 bg-white/60 hover:bg-neutral-50 transition-all duration-200 text-zinc-850"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>전시장 튜닝</span>
          </button>

          {/* Admin panel toggle */}
          <button
            onClick={onToggleAdmin}
            id="btn-admin-toggle"
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase flex items-center space-x-2 rounded-full transition-all duration-300 ${
              adminActive
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {adminActive ? (
              <>
                <Eye className="w-3.5 h-3.5 animate-pulse" />
                <span>갤러리 관람하기</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>관리자 포털</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Curator Statement Slide-over / Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0c0d12]/60 backdrop-blur-sm" onClick={() => setShowAbout(false)} />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white text-zinc-800 shadow-2xl flex flex-col">
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <div>
                  <h3 className="font-display text-lg tracking-wide font-light uppercase">큐레이터 선언문</h3>
                  <p className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">조용한 그리드와 파스텔 비율</p>
                </div>
                <button
                  onClick={() => setShowAbout(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Statement Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <blockquote className="font-serif italic text-base text-neutral-600 dark:text-neutral-300 border-l-2 border-indigo-400 pl-4 py-1 leading-relaxed">
                  "타이포그래피는 눈에 보이는 목소리입니다. 그것은 고요한 생각과 깊은 울림을 갖는 시각적 표현을 연결하는 입체적인 기하학적 조각입니다."
                </blockquote>

                <div className="space-y-4 font-sans text-xs leading-relaxed text-zinc-650">
                  <p>
                    스위스 인터내셔널 스타일과 미니멀리즘 타이포그래피 포스터 디자인의 현대적 부활을 기리는 디지털 회고전에 오신 것을 환영합니다.
                  </p>
                  <p>
                    전형적인 평면 도록의 형식을 탈피하여, 본 플랫폼은 모든 기념비적인 포스터 에셋들을 드넓은 가로 스크롤 축 상에 배치해 오프라인 미술관 복도를 천천히 걸어가며 감상하는 실제적인 경험을 재현합니다.
                  </p>
                  <p>
                    마음을 차분하게 가라앉히는 감각적인 파스텔 색조들을 엄선하여 결합함으로써, 본 전시는 구성주의의 과감하고 주관적인 그리드 기하학을 편안하고 매력적인 배경색과 부드럽게 대조시킵니다.
                  </p>
                  <p>
                    상단 툴바의 <strong>전시장 튜닝 패널</strong>을 자유롭게 이용하여 미술관 조명 색온도, 타이포그래피 서체 크기, 액자 테두리, 작품 정보 공개 여부를 실시간으로 세밀하게 조율해 보시기 바랍니다.
                  </p>
                  <p className="italic font-mono text-[11px] text-zinc-400 mt-6">
                    세계 각지의 시각 예술 파트너들과 함께 제작되었습니다. React, Tailwind V4, Motion 기술을 활용하였습니다.
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase block mb-3">전시 상세 세부 정보</span>
                  <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
                    <div>
                      <span className="text-zinc-400 block">전시 일정</span>
                      <span className="font-medium text-zinc-800">6월 14일 - 8월 31일</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">전시 형태</span>
                      <span className="font-medium text-zinc-800">인터랙티브 웹 SPA</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">큐레이션</span>
                      <span className="font-medium text-zinc-800">디자인 연대 글로벌</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">기술 버전</span>
                      <span className="font-medium text-zinc-800">Tailwind v4 / Motion</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                <button
                  onClick={() => setShowAbout(false)}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-center text-xs font-mono tracking-wider uppercase transition-colors"
                >
                  기획전 갤러리 입장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
