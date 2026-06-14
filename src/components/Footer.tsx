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
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display text-sm tracking-[0.25em] font-light block">
              S P A T I A L
            </span>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-450 font-sans max-w-sm">
              우리는 전통적인 레이아웃 그리드의 우아한 해체를 지향합니다. 정밀한 서체의 완벽한 조화와 부드러운 파스텔 감각의 아름다움을 정갈히 결합하여, 공간(Spatial)은 현대 에디토리얼 타이포그래피 예술의 평온한 가치를 전합니다.
            </p>
            <div className="pt-2 font-mono text-[10px] text-zinc-400 capitalize">
              2026 / 가상 갤러리 투어
            </div>
          </div>

          {/* Col 2: Gallery Coordinates */}
          <div className="lg:col-span-4 space-y-3 font-sans text-xs">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#939393] block">
              미술관 위치 및 연락처
            </span>
            
            <div className="space-y-2.5">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-500">
                  558, Handong-ro, Heunghae-eup, Buk-gu,<br />
                  Pohang-si, Gyeongsangbuk-do, Republic of Korea
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <a href="mailto:yebin0940@handong.ac.kr" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                  yebin0940@handong.ac.kr
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Visual Social Channels */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#939393] block">
              디자인 채널
            </span>
            <ul className="space-y-2 font-mono text-[11px] uppercase tracking-wider">
              <li>
                <a 
                  href="https://www.instagram.com/happydrawinglife_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-500 hover:text-indigo-600 flex items-center space-x-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>인스타그램</span>
                </a>
              </li>
            </ul>
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
