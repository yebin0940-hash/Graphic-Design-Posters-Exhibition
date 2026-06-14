/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, LayoutGrid, Type, Maximize2, Palette, ShieldAlert } from 'lucide-react';
import { ThemeSettings, ColorPalette, ThemeFont, SpacingPreset } from '../types';
import { COLOR_PRESETS, AMBIENT_LIGHTS } from '../data';

interface ThemeCustomizerProps {
  theme: ThemeSettings;
  onChangeTheme: (theme: ThemeSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeCustomizer({
  theme,
  onChangeTheme,
  isOpen,
  onClose
}: ThemeCustomizerProps) {
  if (!isOpen) return null;

  const updateField = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    onChangeTheme({
      ...theme,
      [key]: value
    });
  };

  const palettes: { key: ColorPalette; name: string; hex: string }[] = [
    { key: 'lavender', name: '라벤더', hex: '#818cf8' },
    { key: 'mint', name: '유칼립투스 민트', hex: '#34d399' },
    { key: 'peach', name: '코랄 피치', hex: '#fb923c' },
    { key: 'sky', name: '빙하 스카이', hex: '#38bdf8' },
    { key: 'rose', name: '블러쉬 로즈', hex: '#f43f5e' },
    { key: 'slate', name: '분필 슬레이트', hex: '#64748b' }
  ];

  const fonts: { key: ThemeFont; name: string; class: string; description: string }[] = [
    { key: 'serif', name: '플레이페어 디스플레이 (고급 세리프)', class: 'font-serif', description: '깊은 우아함과 고전적인 매뉴스크립트 에디토리얼 스타일.' },
    { key: 'sans', name: '플러스 자카르타 산스 (모더니스트)', class: 'font-sans', description: '가독성이 극대화된 심플하고 전문적인 현대 기하학 서체.' },
    { key: 'display', name: '스페이스 그로테스크 (스위스 디자인)', class: 'font-display', description: '기술 지향적이며 개성 넘치고 구조성이 뛰어난 시각 정렬.' }
  ];

  const spacings: { key: SpacingPreset; name: string; description: string }[] = [
    { key: 'compact', name: '건축학적 컴팩트 구성', description: '대비와 정밀성 위주, 좁은 간격으로 정보 밀도를 극대화합니다.' },
    { key: 'balanced', name: '미술관 기본 권장 균형', description: '가장 편안한 구도감을 주는 갤러리 표준 비율의 여백입니다.' },
    { key: 'relaxed', name: '와이드스크린 여유 공백', description: '충분하고 웅장한 가로 여백의 미를 선사합니다.' }
  ];

  const borderStyles: { key: 'none' | 'thin' | 'bold'; name: string }[] = [
    { key: 'none', name: '테두리 없음' },
    { key: 'thin', name: '얇은 프레임' },
    { key: 'bold', name: '볼드형 프레임' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#06070a]/40 backdrop-blur-xs" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white border-l border-neutral-100 text-zinc-800 shadow-2xl flex flex-col h-full">
          
          {/* Header controls */}
          <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-zinc-50/50">
            <div className="flex items-center space-x-2">
              <Palette className="w-4.5 h-4.5 text-zinc-500" />
              <div>
                <h3 className="font-display text-sm uppercase tracking-widest font-normal text-zinc-900">전시장 튜닝</h3>
                <p className="text-[10px] font-mono text-zinc-450 uppercase tracking-wider">미적 예술 칼리브레이션 패널</p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-customizer"
              className="p-1 rounded-full hover:bg-neutral-100 focus:outline-none"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          {/* Form options */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">

            {/* Ambient Lighting Temperature */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">
                미술관 온도 및 벽면 색상
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(AMBIENT_LIGHTS) as Array<keyof typeof AMBIENT_LIGHTS>).map((key) => {
                  const light = AMBIENT_LIGHTS[key];
                  const isActive = theme.ambientLight === key;
                  return (
                    <button
                      key={key}
                      onClick={() => updateField('ambientLight', key)}
                      className={`text-left p-2.5 rounded text-xs transition-all border duration-200 outline-none ${
                        isActive
                           ? 'border-zinc-800 bg-zinc-550/5 font-medium shadow-xs'
                           : 'border-neutral-100 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="block text-[11px] font-medium leading-normal text-zinc-900">{light.name.split(' (')[0]}</span>
                      <span className="text-[9px] font-mono text-zinc-450 block mt-0.5">
                        {key === 'clean' ? '라벤더 필터' : key === 'warm' ? '피치 필터' : key === 'cool' ? '스카이 필터' : '민트 필터'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spacing / Spatial Density */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8a8a8a] tracking-widest uppercase block">
                전시장 간격 및 여백 비율
              </label>
              <div className="space-y-1.5Col">
                <div className="space-y-1.5">
                  {spacings.map((sp) => {
                    const isActive = theme.spacing === sp.key;
                    return (
                      <button
                        key={sp.key}
                        onClick={() => updateField('spacing', sp.key)}
                        className={`w-full text-left p-2.5 rounded text-xs border transition-colors outline-none block ${
                          isActive
                            ? 'border-zinc-800 dark:border-white bg-zinc-100/50 dark:bg-zinc-800 font-medium'
                            : 'border-neutral-100 dark:border-zinc-800/80 hover:bg-neutral-50 dark:hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold block uppercase text-[10px] tracking-wider">{sp.name}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-[9px] text-[#909090] mt-0.5 block font-mono">{sp.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Primary Accent Theme Palette */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8a8a8a] tracking-widest uppercase block">
                큐레이터 컬러 악센트 팔레트
              </label>
              <div className="grid grid-cols-3 gap-2">
                {palettes.map((p) => {
                  const isActive = theme.primaryPalette === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => updateField('primaryPalette', p.key)}
                      className={`relative flex flex-col items-center p-2 rounded border cursor-pointer outline-none transition-all ${
                        isActive
                           ? 'border-zinc-800 dark:border-white bg-zinc-50 dark:bg-zinc-850 scale-[1.03]'
                           : 'border-neutral-100 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-800/30'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-neutral-200/50 shadow-inner"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span className="text-[9px] font-mono mt-1 text-center font-medium capitalize">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography / Header Fonts */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8a8a8a] tracking-widest uppercase block">
                메인 전시 타이틀 헤드라인 서체
              </label>
              <div className="space-y-1.5">
                {fonts.map((f) => {
                  const isActive = theme.headerFont === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => updateField('headerFont', f.key)}
                      className={`w-full text-left p-2.5 rounded border transition-colors outline-none block ${
                        isActive
                          ? 'border-zinc-800 dark:border-white bg-zinc-100/50 dark:bg-zinc-800'
                          : 'border-neutral-100 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`${f.class} text-xs block font-medium`}>{f.name}</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      </div>
                      <span className="text-[9px] font-mono text-[#919191] block mt-0.5">{f.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Poster Frame Framing Thickness */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8a8a8a] tracking-widest uppercase block">
                포스터 패스파르투 및 액자 테두리
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {borderStyles.map((b) => {
                  const isActive = theme.borderStyle === b.key;
                  return (
                    <button
                      key={b.key}
                      onClick={() => updateField('borderStyle', b.key)}
                      className={`text-center p-2 rounded text-[10px] transition-colors border font-mono uppercase tracking-wider outline-none ${
                        isActive
                          ? 'border-zinc-800 bg-zinc-100 dark:border-white dark:bg-zinc-800 font-semibold'
                          : 'border-neutral-100 dark:border-zinc-800 hover:bg-[#fafafa] dark:hover:bg-zinc-800/30'
                      }`}
                    >
                      {b.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General Toggles */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="text-xs uppercase tracking-wider font-medium block">포스터 상세 메타데이터 표시</span>
                  <span className="text-[9px] font-mono text-[#919191] block">액자 하단에 제작년도, 매체 및 기획 카테고리를 노출합니다.</span>
                </div>
                <button
                  onClick={() => updateField('showMetadata', !theme.showMetadata)}
                  className={`w-10 h-5.5 rounded-full relative transition-colors duration-200 outline-none ${
                    theme.showMetadata ? 'bg-[#10b981]' : 'bg-neutral-200 dark:bg-zinc-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                      theme.showMetadata ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="text-xs uppercase tracking-wider font-medium block">본문 텍스트 폰트 스타일</span>
                  <span className="text-[9px] font-mono text-[#919191] block">본문 서체를 깔끔한 본고딕(Sans-serif) 스타일과 명조(Serif) 중 선택합니다.</span>
                </div>
                <button
                  onClick={() => updateField('bodyFont', theme.bodyFont === 'sans' ? 'serif' : 'sans')}
                  className="px-3 py-1 border border-neutral-200 dark:border-zinc-700 rounded text-[9px] font-mono uppercase"
                >
                  {theme.bodyFont === 'sans' ? '고딕체 (Sans)' : '명조체 (Serif)'}
                </button>
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="p-3 bg-neutral-50 dark:bg-zinc-950/50 rounded-md border border-neutral-100 dark:border-zinc-800 mt-2">
              <span className="text-[9px] font-mono text-zinc-400 block leading-relaxed uppercase">
                ⚙️ 실시간 렌더링 동기화 엔진
              </span>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                전시장 조명도 및 레이아웃 옵션은 브라우저 로컬 저장소에 즉각 캐싱됩니다. 관리자 패널을 열어 설명글을 한글로 교정하거나, 전시 테마에 맞춰 명도 온도를 자유롭게 핸들링해 보세요.
              </p>
            </div>

          </div>

          <div className="p-4 border-t border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 flex space-x-2">
            <button
              onClick={() => {
                if (confirm('전시 공간 테마 옵션을 기본 공장값으로 원복하시겠습니까?')) {
                  onChangeTheme({
                    primaryPalette: 'lavender',
                    headerFont: 'serif',
                    bodyFont: 'sans',
                    spacing: 'balanced',
                    ambientLight: 'clean',
                    borderStyle: 'thin',
                    showMetadata: true
                  });
                }
              }}
              className="flex-1 py-2 border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded text-center text-[10px] font-mono tracking-wider uppercase transition-colors text-zinc-500"
            >
              기본값 복원
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 rounded text-center text-[10px] font-mono tracking-wider uppercase transition-colors"
            >
              설정 적용하기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
