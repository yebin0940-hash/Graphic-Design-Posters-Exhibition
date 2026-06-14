/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Poster {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  year: string;
  category: string;
  medium?: string;
  dimensions?: string;
  colorPreset?: string; // e.g. 'lavender', 'mint', 'peach', 'sky' to style individual posters!
}

export type ThemeFont = 'serif' | 'sans' | 'display';
export type SpacingPreset = 'compact' | 'balanced' | 'relaxed';
export type ColorPalette = 'lavender' | 'mint' | 'peach' | 'sky' | 'slate' | 'rose';

export interface ThemeSettings {
  primaryPalette: ColorPalette;
  headerFont: ThemeFont;
  bodyFont: 'sans' | 'serif';
  spacing: SpacingPreset;
  ambientLight: 'clean' | 'warm' | 'cool' | 'gallery-dark';
  borderStyle: 'none' | 'thin' | 'bold';
  showMetadata: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}
