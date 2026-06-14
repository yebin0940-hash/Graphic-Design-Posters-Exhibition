/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Poster, ThemeSettings, NewsletterSubscriber } from './types';

export const INITIAL_POSTERS: Poster[] = [
  {
    id: 'poster-1',
    title: '네오 바우하우스 연구 4호',
    artist: '루카스 반더버그 (Lukas Vanderburg)',
    year: '2025',
    category: '기하학적 구성주의',
    medium: '실크스크린 프린트',
    dimensions: '70 × 100 cm (B1 규격)',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'lavender',
    description: '순수한 기하학적 형태와 구조적 균형을 탐구하며, 은은한 라벤더와 크림색 조화를 활용한 작품입니다. 데사우 연구소의 여름 레지던시 기간 동안 시각적 질감을 실험하기 위해 탄생했습니다.'
  },
  {
    id: 'poster-2',
    title: '침묵의 연대기',
    artist: '에미 다카하시 (Emi Takahashi)',
    year: '2026',
    category: '미니멀리즘 타이포그래피',
    medium: '파인 아트 지클레이',
    dimensions: '50 × 70 cm',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'peach',
    description: '여백의 힘과 무게를 은유적으로 표현한 시각 서사입니다. 평온한 파스텔 피치 빛 구름 사이에 고대비 명조 타이포그래피를 배치하여, 복잡함보다 직관적인 고요함이 얼마나 강력한 지 전달합니다.'
  },
  {
    id: 'poster-3',
    title: '키네틱 웨이브폼',
    artist: '소렌 닐센 (Soren Nielsen)',
    year: '2025',
    category: '생성형 알고리즘 예술',
    medium: '고밀도 안료 프린트',
    dimensions: '70 × 100 cm',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'sky',
    description: '유체 역학의 찰나를 수학적 알고리즘으로 시각화한 작품입니다. 흐르는 잔잔한 물결을 담은 마린 블루와 파스텔 스카이 컬러 팔레트로 무한한 캔버스 위에 부드러운 평온함을 선사합니다.'
  },
  {
    id: 'poster-4',
    title: '식물학적 해체',
    artist: '마티스 클레리 (Mathis Cléry)',
    year: '2024',
    category: '포스트 보태니컬 콜라주',
    medium: '수수 실크스크린 판화',
    dimensions: '60 × 80 cm',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'mint',
    description: '유기적인 자연의 곡선과 식물의 실루엣을 수학적 벡터 좌표로 단순화했습니다. 맑고 깨끗한 파스텔 민트색 윤곽선에 우아한 세리프 타이포그래피를 배치하여 균형 예술의 진수를 보여줍니다.'
  },
  {
    id: 'poster-5',
    title: '유기적 공간 나침반',
    artist: '알바 로시 (Alba Rossi)',
    year: '2026',
    category: '스위스 에디토리얼 디자인',
    medium: '혼합 매체 잉크 인쇄',
    dimensions: '70 × 100 cm',
    imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'rose',
    description: '그리드를 깨뜨리는 연출, 방향성 넘치는 라인, 그리고 겹쳐지는 파스텔 장벽을 통해 시각적 계층 구조에 건축학적으로 접근한 작품입니다. 현대 뉴 스위스 디자인 운동을 대표합니다.'
  },
  {
    id: 'poster-6',
    title: '빛의 굴절과 흩어짐',
    artist: '클라라 벨몽 (Clara Belmont)',
    year: '2025',
    category: '광학적 인상주의',
    medium: '고급 파인 아트 프린트',
    dimensions: '50 × 70 cm',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'lavender',
    description: '유리 프리즘을 통과하는 은은한 빛의 산란을 시적인 분홍빛과 보라빛 파스텔 스펙트럼으로 세밀하게 잡아내었습니다. 감정의 굴절 과정을 기하학적으로 은유했습니다.'
  },
  {
    id: 'poster-7',
    title: '시간의 부드러운 궤적',
    artist: '한지원 (Ji-Won Han)',
    year: '2026',
    category: '미니멀 추상',
    medium: '어카이벌 안료 프린트',
    dimensions: '70 × 100 cm',
    imageUrl: 'https://images.unsplash.com/photo-1618005198143-e528346d9a59?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'peach',
    description: '시간의 흐름 속에서 남는 잔상들을 부드러운 모래빛 황토와 파스텔 세이지 컬러의 원형 궤적으로 시각화했습니다. 과거와 현재의 연결을 점진적인 그라데이션으로 유려하게 펼칩니다.'
  },
  {
    id: 'poster-8',
    title: '푸른 낮잠의 온도',
    artist: '마이클 스톤 (Michael Stone)',
    year: '2025',
    category: '네오 서정주의',
    medium: '수채 석판화',
    dimensions: '60 × 80 cm',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'sky',
    description: '나른한 일요일 오후의 평화로운 휴식을 부드럽고 차분한 파스텔 하늘빛과 부드러운 크림색 블록의 조화로 연출했습니다. 캔버스 위에 머무는 편안한 온도감을 전합니다.'
  },
  {
    id: 'poster-9',
    title: '고요하게 피어오르는 곡선',
    artist: '엘사 모랭 (Elsa Morin)',
    year: '2026',
    category: '보태니컬 미니멀리즘',
    medium: '핸드프레스 잉크 판화',
    dimensions: '50 × 70 cm',
    imageUrl: 'https://images.unsplash.com/photo-1501472312651-726afd116ff1?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'mint',
    description: '새벽녘 정원 안개 속에 아련하게 흔들리는 식물의 모습을 추상화한 실루엣 드로잉입니다. 부드러운 민트와 아주 연한 카키 톤의 여백으로 고요하고 평온한 시공간을 조성합니다.'
  },
  {
    id: 'poster-10',
    title: '장미빛 환상의 조각들',
    artist: '마테오 실바 (Mateo Silva)',
    year: '2026',
    category: '콜라주 모더니즘',
    medium: '아트지에 실크스크린',
    dimensions: '70 × 100 cm',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
    colorPreset: 'rose',
    description: '조각조각 분해된 추상 도형들이 무중력 상태 속에서 조화롭게 춤추듯 배치된 모던 콜라주입니다. 포근하고 부드러운 살구빛과 화사한 베이비 핑크색으로 마음속의 평화를 시사합니다.'
  }
];

export const INITIAL_THEME: ThemeSettings = {
  primaryPalette: 'lavender',
  headerFont: 'serif',
  bodyFont: 'sans',
  spacing: 'balanced',
  ambientLight: 'clean',
  borderStyle: 'thin',
  showMetadata: true
};

export const COLOR_PRESETS = {
  lavender: {
    name: 'Wisteria Lavender',
    bg: 'bg-indigo-50/50',
    cardBg: 'bg-indigo-50/30',
    border: 'border-indigo-100',
    accentText: 'text-indigo-600',
    accentBg: 'bg-indigo-100/50',
    pickerColor: '#818cf8',
    gradient: 'from-[#f5f3ff] to-[#edd1ff]'
  },
  mint: {
    name: 'Eucalyptus Mint',
    bg: 'bg-emerald-50/40',
    cardBg: 'bg-emerald-50/20',
    border: 'border-emerald-100',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-100/50',
    pickerColor: '#34d399',
    gradient: 'from-[#f0fdf4] to-[#ccfbdb]'
  },
  peach: {
    name: 'Coral Peach',
    bg: 'bg-orange-50/50',
    cardBg: 'bg-orange-50/20',
    border: 'border-orange-100',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-100/50',
    pickerColor: '#fb923c',
    gradient: 'from-[#fff7ed] to-[#fed7aa]'
  },
  sky: {
    name: 'Glacier Sky',
    bg: 'bg-sky-50/50',
    cardBg: 'bg-sky-50/30',
    border: 'border-sky-100',
    accentText: 'text-sky-700',
    accentBg: 'bg-sky-100/50',
    pickerColor: '#38bdf8',
    gradient: 'from-[#f0f9ff] to-[#bae6fd]'
  },
  rose: {
    name: 'Blush Rose',
    bg: 'bg-rose-50/50',
    cardBg: 'bg-rose-50/30',
    border: 'border-rose-100',
    accentText: 'text-rose-700',
    accentBg: 'bg-rose-100/40',
    pickerColor: '#f43f5e',
    gradient: 'from-[#fff1f2] to-[#fecdd3]'
  },
  slate: {
    name: 'Chalk Slate',
    bg: 'bg-slate-50/80',
    cardBg: 'bg-white',
    border: 'border-slate-200',
    accentText: 'text-slate-800',
    accentBg: 'bg-slate-200/50',
    pickerColor: '#94a3b8',
    gradient: 'from-[#f8fafc] to-[#e2e8f0]'
  }
};

export const AMBIENT_LIGHTS = {
  clean: {
    name: 'Wisteria Glow (Pastel Lavender)',
    class: 'bg-gradient-to-tr from-[#FAF8FF] via-[#F4F0FF] to-[#FAF8FF] text-zinc-900'
  },
  warm: {
    name: 'Coral Whisper (Pastel Peach)',
    class: 'bg-gradient-to-tr from-[#FFFBF9] via-[#FFEEEC] to-[#FFFBF9] text-zinc-900'
  },
  cool: {
    name: 'Glacier Mist (Pastel Sky)',
    class: 'bg-gradient-to-tr from-[#F1F9FC] via-[#E2F1F7] to-[#F1F9FC] text-zinc-900'
  },
  'gallery-dark': {
    name: 'Eucalyptus Breeze (Pastel Mint)',
    class: 'bg-gradient-to-tr from-[#F2FBF6] via-[#DDF6E8] to-[#F2FBF6] text-zinc-900'
  }
};

export function getStoredPosters(): Poster[] {
  if (typeof window === 'undefined') return INITIAL_POSTERS;
  try {
    const data = localStorage.getItem('exhibition_posters');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length < 10) {
        localStorage.setItem('exhibition_posters', JSON.stringify(INITIAL_POSTERS));
        return INITIAL_POSTERS;
      }
      return parsed;
    }
    return INITIAL_POSTERS;
  } catch (e) {
    console.error('LocalStorage load failed, using fallback data', e);
    return INITIAL_POSTERS;
  }
}

export function saveStoredPosters(posters: Poster[]): void {
  try {
    localStorage.setItem('exhibition_posters', JSON.stringify(posters));
  } catch (e) {
    console.error('LocalStorage save failed', e);
  }
}

export function getStoredTheme(): ThemeSettings {
  if (typeof window === 'undefined') return INITIAL_THEME;
  try {
    const data = localStorage.getItem('exhibition_theme');
    return data ? JSON.parse(data) : INITIAL_THEME;
  } catch (e) {
    return INITIAL_THEME;
  }
}

export function saveStoredTheme(theme: ThemeSettings): void {
  try {
    localStorage.setItem('exhibition_theme', JSON.stringify(theme));
  } catch (e) {
    console.error('LocalStorage theme save failed', e);
  }
}

export function getStoredSubscribers(): NewsletterSubscriber[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('exhibition_subscribers');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addSubscriber(email: string): void {
  try {
    const subscribers = getStoredSubscribers();
    if (!subscribers.find(s => s.email === email)) {
      subscribers.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('exhibition_subscribers', JSON.stringify(subscribers));
    }
  } catch (e) {
    console.error('Failed to add subscriber', e);
  }
}
