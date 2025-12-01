
import { FormData } from '../types';
import { generatePremiumTemplate } from './templates/premium';
import { generateShopeeTemplate } from './templates/shopee';
import { generateTikTokTemplate } from './templates/tiktok';

export const generateLandingPageCode = (data: FormData): string => {
  switch (data.layoutStyle) {
    case 'shopee':
      return generateShopeeTemplate(data);
    case 'tiktok':
      return generateTikTokTemplate(data);
    case 'premium':
    default:
      return generatePremiumTemplate(data);
  }
};
