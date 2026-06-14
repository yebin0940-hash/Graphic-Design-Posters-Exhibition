/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X, Sparkles, Check, Image as ImageIcon, Users, BookOpen, Layers } from 'lucide-react';
import { Poster, ThemeSettings, ColorPalette, NewsletterSubscriber } from '../types';
import { getStoredSubscribers } from '../data';

interface AdminDashboardProps {
  posters: Poster[];
  theme: ThemeSettings;
  onAddPoster: (poster: Poster) => void;
  onUpdatePoster: (poster: Poster) => void;
  onDeletePoster: (id: string) => void;
  onClose: () => void;
}

// Pre-curated high-end visual graphic poster presets
const STOCK_ART_OPTIONS = [
  {
    name: 'Geometric Liquid (Lavender)',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Wavy Minimalist (Peach)',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vibrant Light Sphere (Sky)',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Botanical Abstract (Mint)',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Neon Avant-Garde (Rose)',
    url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Minimal Chic Frame (Slate)',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  }
];

export default function AdminDashboard({
  posters,
  theme,
  onAddPoster,
  onUpdatePoster,
  onDeletePoster,
  onClose
}: AdminDashboardProps) {

  const [activeTab, setActiveTab] = useState<'manage' | 'subscribers'>('manage');
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    year: '',
    category: '',
    medium: '',
    dimensions: '',
    imageUrl: '',
    colorPreset: 'lavender' as ColorPalette,
    description: ''
  });

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Load subscribers from storage
  useEffect(() => {
    setSubscribers(getStoredSubscribers());
  }, []);

  // Update form inputs when we choose to Edit a poster
  const startEdit = (poster: Poster) => {
    setEditingPoster(poster);
    setFormData({
      title: poster.title,
      artist: poster.artist,
      year: poster.year,
      category: poster.category,
      medium: poster.medium || '',
      dimensions: poster.dimensions || '',
      imageUrl: poster.imageUrl,
      colorPreset: (poster.colorPreset || 'lavender') as ColorPalette,
      description: poster.description
    });
    setFormError('');
    setFormSuccess('');
    // Scroll form into focus on smaller windows
    document.getElementById('crud-form-header')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Clear Form state
  const clearForm = () => {
    setEditingPoster(null);
    setFormData({
      title: '',
      artist: '',
      year: new Date().getFullYear().toString(),
      category: 'Swiss Typography',
      medium: 'Silkscreen Screenprint',
      dimensions: '70 × 100 cm',
      imageUrl: STOCK_ART_OPTIONS[0].url,
      colorPreset: 'lavender',
      description: ''
    });
    setFormError('');
    setFormSuccess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectStockArt = (url: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  // Validate and submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.artist.trim() || !formData.description.trim()) {
      setFormError('기본 항목(포스터 제목, 작가명, 설명글)을 필수 기재해 주세요.');
      return;
    }

    if (!formData.imageUrl.trim()) {
      setFormError('포스터 이미지 주소(URL)를 직접 입력하시거나 프리셋 가이드를 선택해 주세요.');
      return;
    }

    const payload: Poster = {
      id: editingPoster ? editingPoster.id : `poster-${Date.now()}`,
      title: formData.title.trim(),
      artist: formData.artist.trim(),
      year: formData.year.trim() || '2026',
      category: formData.category.trim() || 'Graphic Art',
      medium: formData.medium.trim() || 'Archival Silk Print',
      dimensions: formData.dimensions.trim() || '70 × 100 cm',
      imageUrl: formData.imageUrl.trim(),
      colorPreset: formData.colorPreset,
      description: formData.description.trim()
    };

    if (editingPoster) {
      onUpdatePoster(payload);
      setFormSuccess(`"${payload.title}" 작품의 상세 데이터 개정이 완료되었습니다!`);
    } else {
      onAddPoster(payload);
      setFormSuccess(`"${payload.title}" 신작이 전시관에 정상적으로 추가 등록 및 배치되었습니다!`);
    }

    // Reset editing states but hold sucess label
    setEditingPoster(null);
    setTimeout(() => {
      clearForm();
    }, 500);
  };

  // Initialize empty state helper
  useEffect(() => {
    if (!editingPoster && !formData.title) {
      clearForm();
    }
  }, [editingPoster]);

  return (
    <div className="border-b border-zinc-200 bg-white/90 backdrop-blur-md border-t text-zinc-800">
      <div className="max-w-[1600px] mx-auto p-6 md:p-8">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h2 className="font-display text-xl uppercase tracking-widest font-normal">
                미술관 전시 작품 관리 포털
              </h2>
            </div>
            <p className="text-xs font-mono text-[#8c8c8c] uppercase mt-1 text-zinc-500">
              실시간 전시 매트릭스에 새로운 디자인 포스터를 추가하거나 기존 내용을 개정, 영구 수거합니다.
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Nav tabs */}
            <div className="flex bg-neutral-200/50 dark:bg-zinc-900 rounded-lg p-1 text-xs font-mono">
              <button
                onClick={() => setActiveTab('manage')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'manage'
                    ? 'bg-white text-zinc-900 shadow-xs font-medium'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                전시 포스터 목록 ({posters.length})
              </button>
              <button
                onClick={() => setActiveTab('subscribers')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'subscribers'
                    ? 'bg-white text-zinc-900 shadow-xs font-medium'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Users className="w-3.5 h-3.5 inline mr-1" />
                소식지 구독자 관리 ({subscribers.length})
              </button>
            </div>

            {/* Exit admin */}
            <button
              onClick={onClose}
              id="exit-dashboard"
              className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-mono tracking-wider uppercase rounded hover:opacity-85 transition-opacity"
            >
              종료하기
            </button>
          </div>
        </div>

        {activeTab === 'manage' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT 5 COLS: The CRUD Editor Form */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-lg shadow-sm border border-neutral-100 dark:border-zinc-800">
              <h3 id="crud-form-header" className="font-display text-sm tracking-widest uppercase mb-4 text-zinc-800 dark:text-zinc-200 border-b pb-2 flex justify-between items-center">
                <span>{editingPoster ? '⚙️ 포스터 작품 명세 개정' : '✨ 신규 기획 포스터 추가'}</span>
                {editingPoster && (
                  <button onClick={clearForm} className="text-[10px] font-mono text-rose-500 hover:underline uppercase">
                    수정 취소
                  </button>
                )}
              </h3>

              {formError && (
                <div className="p-3 mb-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-mono rounded">
                  ⚠️ {formError}
                </div>
              )}

              {formSuccess && (
                <div className="p-3 mb-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono rounded">
                  ✓ {formSuccess}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">포스터 작품명*</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="예시: SPACE RESONANCE No. 9"
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">작가 / 스튜디오*</label>
                    <input
                      type="text"
                      name="artist"
                      value={formData.artist}
                      onChange={handleInputChange}
                      placeholder="예시: Jean-Luc Godard"
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white outline-none focus:border-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">출시 년도</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="2026"
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">작품 대분류</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Swiss Typography"
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">조명 색상 프리셋</label>
                    <select
                      name="colorPreset"
                      value={formData.colorPreset}
                      onChange={handleInputChange}
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-850 text-zinc-800 dark:text-white outline-none"
                    >
                      <option value="lavender">라벤더 (Lavender)</option>
                      <option value="mint">민트 (Mint)</option>
                      <option value="peach">피치 오렌지 (Peach)</option>
                      <option value="sky">스카이 블루 (Sky Blue)</option>
                      <option value="rose">로즈 블러쉬 (Rosy Blush)</option>
                      <option value="slate">클래식 멜 샌드 (Classic Chalk)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">출력 매질 기법</label>
                    <input
                      type="text"
                      name="medium"
                      value={formData.medium}
                      onChange={handleInputChange}
                      placeholder="예시: Silkscreen on Cotton Board"
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">작품 물리 실격 규격</label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      placeholder="예시: 70 x 100 cm"
                      className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* IMAGE MANIPULATION ENGINE */}
                <div>
                  <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">포스터 해상도 캔버스 이미지 URL*</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-xs font-mono p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent outline-none"
                  />
                  
                  {/* Stock Graphic Presets Grid */}
                  <div className="mt-2">
                    <span className="text-[9px] font-mono text-zinc-450 block mb-1">
                      미술관 엄선 디자인 가이드 템플릿 (선택 권장):
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {STOCK_ART_OPTIONS.map((opt, idx) => {
                        const isCurrent = formData.imageUrl === opt.url;
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => selectStockArt(opt.url)}
                            className={`p-1 text-left rounded text-[8px] font-mono uppercase truncate flex items-center space-x-1 border transition-all ${
                              isCurrent 
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-700' 
                                : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <ImageIcon className="w-2.5 h-2.5 flex-shrink-0" />
                            <span className="truncate">{opt.name.split(' (')[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-mono text-[#a0a0a0] uppercase block mb-1">디자인 철학 지향 요소 (설명글)*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="레이아웃 그리드 구성 철학, 타이포 구성 및 기하학적 요소, 컬러 대비 등에 대해 상세히 적어주세요..."
                    className="w-full text-xs font-sans p-2.5 rounded border border-neutral-200 dark:border-zinc-700 bg-transparent text-zinc-800 outline-none focus:border-zinc-600"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingPoster ? '개정 데이터 저장' : '공식 미술 전시 등록'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={clearForm}
                    className="py-3 px-4 rounded border border-neutral-200 hover:bg-neutral-50 text-xs text-zinc-500 font-mono tracking-wider uppercase transition-colors"
                  >
                    폼 초기화
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT 7 COLS: Current installed collection inventory */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-sm tracking-widest uppercase font-medium">
                  현재 전시관 실시간 배치 목록 ({posters.length}개 작품)
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">컬렉션 인벤토리 목록</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[660px] overflow-y-auto pr-1">
                {posters.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-xs border border-neutral-200/50 dark:border-zinc-800 flex space-x-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div className="w-20 h-24 bg-neutral-100 dark:bg-zinc-950 flex-shrink-0 border border-neutral-200/40 rounded overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-[#a2a2a2] filter tracking-widest block uppercase">
                            {post.category} ({post.year})
                          </span>
                          <span className="text-[8px] font-mono uppercase bg-neutral-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-500">
                            COORD-{post.id.replace('poster-', '0')}
                          </span>
                        </div>
                        <h4 className="font-display font-medium text-xs text-zinc-800 dark:text-zinc-100 uppercase tracking-wide truncate mt-0.5" title={post.title}>
                          {post.title}
                        </h4>
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">by {post.artist}</p>
                      </div>

                      <div className="flex space-x-2 pt-2 border-t border-neutral-100 dark:border-zinc-800 mt-2">
                        <button
                          onClick={() => startEdit(post)}
                          className="flex items-center text-[10px] font-mono text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          <span>내용 개정</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`진열 목록에서 "${post.title}" 예술 장을 내리고 전시관에서 즉각 영구 수거(삭제)하시겠습니까?`)) {
                              onDeletePoster(post.id);
                            }
                          }}
                          className="flex items-center text-[10px] font-mono text-rose-500 hover:text-rose-700 ml-2"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          <span>전시 수거</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* NEWSLETTER SUBSCRIBERS LISTING TAB */
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-lg shadow-sm border border-neutral-100 dark:border-zinc-800">
            <div className="flex justify-between items-center border-b border-neutral-200 dark:border-zinc-800 pb-4 mb-4">
              <div>
                <h3 className="font-display text-sm tracking-widest uppercase">
                  전시회 오프닝 및 특별 한정 도록 안내 구독자 목록
                </h3>
                <p className="text-[10px] font-mono text-[#919191] uppercase mt-0.5">
                  오프라인 미술 특별 연동전 세션과 한정판 실크 프린트 굿즈 안내 등의 소식 수신처 자료입니다.
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm('전체 안내 구독 이력 목록을 영구히 말소 비우시겠습니까?')) {
                    localStorage.removeItem('exhibition_subscribers');
                    setSubscribers([]);
                  }
                }}
                className="px-3 py-1 border border-rose-200 text-rose-500 hover:bg-rose-50 rounded text-[10px] font-mono uppercase transition-colors"
                disabled={subscribers.length === 0}
              >
                전체 대장 비우기
              </button>
            </div>

            {subscribers.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 font-mono text-xs">
                현재 브라우저 캐시에 수집된 유효 구독자 궤적이 아직 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-zinc-400">
                      <th className="p-3">#</th>
                      <th className="p-3">이메일 인덱스 주소</th>
                      <th className="p-3">구독 수신 동의 일시</th>
                      <th className="p-3">안전 보호 확인 해시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, idx) => (
                      <tr key={idx} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50">
                        <td className="p-3 text-[#9b9b9b]">{idx + 1}</td>
                        <td className="p-3 font-semibold text-zinc-800">{sub.email}</td>
                        <td className="p-3 text-zinc-500">{new Date(sub.timestamp).toLocaleString()}</td>
                        <td className="p-3 text-emerald-500 text-[10px]">GD-SECURE-STABLE</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
