
export interface Testimonial {
  id: string;
  name: string;
  rating: string;
  avatar: string;
  mediaUrls: string; // Changed from 'media' to support multiple lines/comma separated URLs
  text: string;
  variantPurchased?: string; // To mimic the "Variasi: Beige" in screenshot
  date?: string;
}

export interface Variant {
  id: string;
  name: string; // e.g., "Merah - XL"
  price?: string; // Optional override price
  sku?: string;
  image?: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  image: string; // Supports JPG, PNG, GIF
}

export interface SocialProof {
  enabled: boolean;
  interval: number;
  duration: number;
  names: string;
  cities: string;
  avatar: string;
}

export interface UrgencyTimer {
  enabled: boolean;
  duration: number; // in minutes
  text: string;
}

export interface FormData {
  // Product Info
  productName: string;
  productCategory: string;
  originalPrice: string;
  discountPrice: string;
  productDescription: string;
  
  // Variants (New Feature)
  variants: Variant[];

  // Design
  headingFont: string;
  bodyFont: string;
  colorScheme: string;
  layoutStyle: 'premium' | 'shopee' | 'tiktok'; // Strict typing for templates

  // Media
  mainImage: string;
  videoDemo: string;
  productGallery: string;
  featuredGallery: string; // Lifestyle/Model Gallery
  productFeatures: ProductFeature[]; // New: Rich Details (Img + Desc)

  // Integration
  orderOnlineEmbed: string;
  storeName: string;

  // Features
  testimoni: Testimonial[];
  socialProof: SocialProof;
  urgencyTimer: UrgencyTimer;

  // Target
  targetAudience: string;
  uniqueSellingPoint: string;
  additionalNotes: string;
}

export type FormSection = 
  | 'product'
  | 'variants'
  | 'design'
  | 'media'
  | 'integration'
  | 'testimonials'
  | 'social'
  | 'urgency'
  | 'target';
