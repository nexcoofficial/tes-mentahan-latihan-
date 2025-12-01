
import { FormData } from '../types';

// Format Harga IDR
export const formatPrice = (price: string) => parseInt(price || '0').toLocaleString('id-ID');

// Helper Video URL
export const getEmbedUrl = (url: string) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${id}`;
  }
  return url; // Raw MP4
};

// Generate Google Font URL
export const getFontUrl = (heading: string, body: string) => {
    return `https://fonts.googleapis.com/css2?family=${heading.replace(/\s+/g, '+')}:wght@400;600;700&family=${body.replace(/\s+/g, '+')}:wght@300;400;500;600&display=swap`;
};

// Color Themes Configuration
export const themes: any = {
    luxury: { 
      bg: '#000000', text: '#ffffff', accent: '#D4AF37', cardBg: '#1a1a1a', border: '#333',
      gradient: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)' 
    },
    mono: { 
      bg: '#ffffff', text: '#111111', accent: '#000000', cardBg: '#f9f9f9', border: '#e5e5e5',
      gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)' 
    },
    earth: { 
      bg: '#FAF8F5', text: '#3E362E', accent: '#5F6F52', cardBg: '#EFEBE2', border: '#D8D4CC',
      gradient: 'linear-gradient(135deg, #5F6F52 0%, #46523C 100%)' 
    },
    corporate: { 
      bg: '#F8FAFC', text: '#0F172A', accent: '#0F4C75', cardBg: '#FFFFFF', border: '#E2E8F0',
      gradient: 'linear-gradient(135deg, #0F4C75 0%, #082F4D 100%)'
    },
    islamic: { 
      bg: '#F0FDFA', text: '#134E4A', accent: '#0D9488', cardBg: '#CCFBF1', border: '#99f6e4',
      gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)' 
    },
    royal: { 
      bg: '#FBF7FF', text: '#2E1065', accent: '#7E22CE', cardBg: '#F3E8FF', border: '#e9d5ff',
      gradient: 'linear-gradient(135deg, #7E22CE 0%, #6B21A8 100%)' 
    },
    forest: { 
      bg: '#F0FDF4', text: '#064E3B', accent: '#059669', cardBg: '#DCFCE7', border: '#bbf7d0',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
    },
    midnight: {
      bg: '#0f172a', text: '#f8fafc', accent: '#38bdf8', cardBg: '#1e293b', border: '#334155',
      gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    },
    ocean: {
      bg: '#f0f9ff', text: '#0c4a6e', accent: '#0ea5e9', cardBg: '#e0f2fe', border: '#bae6fd',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
    },
    sunset: {
      bg: '#fff7ed', text: '#431407', accent: '#f97316', cardBg: '#ffedd5', border: '#fed7aa',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    },
    cherry: {
      bg: '#FFF5F5', text: '#742A2A', accent: '#E53E3E', cardBg: '#FFFFFF', border: '#FED7D7',
      gradient: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)'
    },
    cyber: {
      bg: '#050505', text: '#e2e8f0', accent: '#22c55e', cardBg: '#111', border: '#222',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    },
    lavender: {
      bg: '#FDF4FF', text: '#4A044E', accent: '#C026D3', cardBg: '#FFFFFF', border: '#F0ABFC',
      gradient: 'linear-gradient(135deg, #C026D3 0%, #A21CAF 100%)'
    }
};
