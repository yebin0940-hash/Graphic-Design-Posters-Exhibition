/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Instagram, Play, ArrowRight, Check, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { addSubscriber } from '../data';
import { ThemeSettings } from '../types';

interface FooterProps {
  theme: ThemeSettings;
}

export default function Footer({ theme }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('유효한 이메일 주소를 입력해 주세요.');
      return;
    }

    addSubscriber(email.trim());
    setSuccess(true);
    setEmail('');
    
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <footer className="border-t border-neutral-200/50 transition-colors duration-300 bg-white/40 text-zinc-800">
      <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          
          {/* Col 1: Brand philosophy, SEO Open Graph description */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-sm tracking-[0.25em] font-light block">
              S P A T I A L
            </span>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-450 font-sans max-w-sm">
              우리는 전통적인 레이아웃 그리드의 우아한 해체를 지향합니다. 정밀한 서체의 완벽한 조화와 부드러운 파스텔 감각의 아름다움을 정갈히 결합하여, 공간(Spatial)은 현대 에디토리얼 타이포그래피 예술의 평온한 가치를 전합니다.
            </p>
            <div className="pt-2 font-mono text-[10px] text-zinc-400 capitalize">
              설립 베를린 2026 / 가상 갤러리 투어
            </div>
          </div>

          {/* Col 2: Gallery Coordinates */}
          <div className="lg:col-span-3 space-y-3 font-sans text-xs">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#939393] block">
              미술관 위치 및 연락처
            </span>
            
            <div className="space-y-2.5">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-500">
                  Hallesches Ufer 60, Kreuzberg<br />
                  10963 Berlin, Germany
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <a href="mailto:curator@spatialexhibition.design" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                  curator@spatialexhibition.design
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="text-zinc-650">+49 (0) 30 528 8910</span>
              </div>
            </div>
          </div>

          {/* Col 3: Visual Social Channels */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#939393] block">
              디자인 채널
            </span>
            <ul className="space-y-2 font-mono text-[11px] uppercase tracking-wider">
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-500 hover:text-indigo-600 flex items-center space-x-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>인스타그램</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://behance.net" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-500 hover:text-indigo-600 flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>비핸스</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pinterest.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-500 hover:text-indigo-600 flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>핀터레스트</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#939393] block">
              오프닝 전시회 소식지
            </span>
            <p className="text-xs text-zinc-500">
              오프라인 기획전 개막 소식, 프린트 실크스크린 프레스 일정, 라이브 아티스트 토크 소식을 가장 신속하게 받아보세요.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력해 주세요..."
                  className="w-full text-xs font-mono p-2.5 pr-10 rounded border border-neutral-200 bg-white/50 text-zinc-800 outline-none focus:border-zinc-400 transition-colors"
                />
                <button
                  type="submit"
                  title="Subscribe Coordinate"
                  className="absolute right-2.5 top-[18%] p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-850 text-white transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {error && (
                <span className="text-[10px] font-mono text-rose-500 block">
                  {error}
                </span>
              )}

              {success && (
                <span className="text-[10px] font-mono text-emerald-500 flex items-center space-x-1 font-semibold">
                  <Check className="w-3 h-3" />
                  <span>소식지 신청 완료. 환영합니다!</span>
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="border-t border-neutral-150 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-zinc-450 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} SPATIAL DESIGN ALLIANCE. 모든 권리 보유.
          </div>
          <div className="flex space-x-4 tracking-wider uppercase">
            <a href="#" className="hover:text-zinc-800">개인정보처리방침</a>
            <span>/</span>
            <a href="#" className="hover:text-zinc-800">이용약관</a>
            <span>/</span>
            <a href="#" className="hover:text-zinc-800">연락소</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
