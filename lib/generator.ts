
import { FormData } from '../types';

const colorSchemes: Record<string, string> = {
  luxury: 'Hitam (#000000), Abu Arang (#36454f), Emas (#d4af37), Sampanye (#f7e7ce), Aksen Putih (#ffffff)',
  mono: 'Hitam (#000000), Abu-abu Tua (#4a4a4a), Abu-abu Muda (#9a9a9a), Putih (#ffffff), Aksen Silver (#c0c0c0)',
  earth: 'Cokelat Tua (#654321), Cokelat Medium (#8b4513), Tan (#d2691e), Krem (#f5f5dc), Aksen Hijau Sage (#87a96b)',
  sunset: 'Oranye Dalam (#ff6600), Oranye Hangat (#ff9933), Emas (#ffd700), Merah Muda Sunset (#ff69b4), Aksen Ungu (#9370db)',
  islamic: 'Teal Dalam (#004d4d), Hijau Islami (#009688), Emas (#d4af37), Krem (#f5f5dc), Aksen Putih (#ffffff)',
  royal: 'Ungu Tua (#4b0082), Ungu Medium (#663399), Emas (#d4af37), Putih (#ffffff), Aksen Silver (#c0c0c0)',
  wine: 'Wine (#722f37), Burgundy (#800020), Rose Gold (#e8b4b8), Krem (#f5f5dc), Aksen Putih (#ffffff)',
  forest: 'Hijau Tua (#1b4332), Hijau Hutan (#2d5a3d), Emas (#d4af37), Krem (#f5f5dc), Aksen Putih (#ffffff)'
};

const layoutStyles: Record<string, string> = {
  premium: 'Desain mewah dengan whitespace yang luas, tipografi elegan, efek glassmorphism, animasi halus, dan elemen premium',
  minimalist: 'Layout clean dan modern dengan fokus pada konten, navigasi simpel, warna monokromatik, dan micro-interactions',
  islamic: 'Desain islami elegan dengan ornamen geometric, kaligrafi modern, warna teal-gold, dan nuansa spiritual',
  ecommerce: 'Layout e-commerce klasik dengan product showcase yang jelas, CTA prominent, trust badges, dan conversion-focused',
  fashion: 'Desain fashion-forward dengan visual storytelling, layout magazine-style, typography bold, dan efek parallax',
  tech: 'Layout tech modern dengan gradien futuristik, animasi code-style, dark mode option, dan elemen cyberpunk',
  natural: 'Desain natural organic dengan tekstur alami, warna earth-tone, ilustrasi botanical, dan nuansa eco-friendly'
};

export const generatePrompt = (data: FormData): string => {
  let prompt = `Buatkan landing page premium yang sangat menarik dan conversion-optimized untuk "${data.productName}" dengan spesifikasi lengkap berikut:

🎯 INFORMASI PRODUK:
- Nama Produk: ${data.productName}
- Kategori: ${data.productCategory}
- Harga Asli: Rp ${parseInt(data.originalPrice || '0').toLocaleString('id-ID')}
${data.discountPrice ? `- Harga Diskon: Rp ${parseInt(data.discountPrice).toLocaleString('id-ID')}` : ''}
- Deskripsi: ${data.productDescription}
- Target Audiens: ${data.targetAudience}
- USP: ${data.uniqueSellingPoint}
- Nama Toko: ${data.storeName}
${data.additionalNotes ? `- Catatan Tambahan: ${data.additionalNotes}` : ''}`;

  // Add Variants Section
  if (data.variants && data.variants.length > 0) {
    prompt += `\n\n📦 VARIAN PRODUK:
Tampilkan pilihan varian berikut dengan UI selector yang menarik (Button/Image Swatch):
`;
    data.variants.forEach((v) => {
      prompt += `- ${v.name} ${v.price ? `(Rp ${parseInt(v.price).toLocaleString('id-ID')})` : ''} ${v.sku ? `[SKU: ${v.sku}]` : ''} ${v.image ? `[Image: ${v.image}]` : ''}\n`;
    });
  }

  prompt += `\n\n🎨 TYPOGRAPHY & DESIGN PREMIUM:
- Heading Font: ${data.headingFont}
- Body Font: ${data.bodyFont}
- Skema Warna: ${colorSchemes[data.colorScheme] || 'Default'}
- Gaya Tata Letak: ${layoutStyles[data.layoutStyle] || 'Default'}
- Gambar Utama: ${data.mainImage}
${data.videoDemo ? `- Video Demo: ${data.videoDemo}` : ''}
${data.productGallery ? `- Galeri Produk:\n${data.productGallery.split('\n').map(url => `  • ${url.trim()}`).join('\n')}` : ''}

🛒 ORDERONLINE INTEGRATION PREMIUM:
KRITIS: Integrasikan formulir pemesanan dengan styling premium:
${data.orderOnlineEmbed}

Persyaratan Styling OrderOnline:
- Form terintegrasi mulus dengan desain keseluruhan
- Background dengan gradient matching tema
- Efek glassmorphism dengan backdrop blur
- Custom CSS untuk override default styles
- Border radius konsisten dengan desain
- Padding premium untuk breathing space
- Font family konsisten
- Mobile responsive sempurna`;

  // Testimonials
  if (data.testimoni && data.testimoni.length > 0) {
    prompt += `\n\n⭐ TESTIMONI CUSTOMER PREMIUM:
WAJIB: Implementasikan sistem testimoni seperti Marketplace dengan fitur lengkap:

Testimoni Data:`;
    data.testimoni.forEach((t, index) => {
      prompt += `\nTestimoni ${index + 1}:
- Nama: ${t.name}
- Rating: ${t.rating} bintang
- Testimoni: "${t.text}"
${t.avatar ? `- Avatar: ${t.avatar}` : ''}
${t.mediaUrls ? `- Media: ${t.mediaUrls}` : ''}`;
    });

    prompt += `\n\nFITUR TESTIMONI REQUIREMENTS:
1. Carousel Navigation
2. Lightbox untuk media review
3. Styling card premium`;
  }

  // Social Proof
  if (data.socialProof.enabled) {
    prompt += `\n\n👥 SOCIAL PROOF POPUP SYSTEM:
WAJIB: Implementasikan Indonesian Customer Social Proof dengan spesifikasi:

Konfigurasi:
- Popup Interval: setiap ${data.socialProof.interval} detik
- Display Duration: ${data.socialProof.duration} detik per popup
- Customer Names: ${data.socialProof.names}
- Customer Cities: ${data.socialProof.cities}
${data.socialProof.avatar ? `- Avatar Image: ${data.socialProof.avatar}` : ''}

TECHNICAL REQUIREMENTS:
1. Auto-show setiap ${data.socialProof.interval} detik
2. Slide in dari kanan dengan smooth animation
3. Format: "[Nama] dari [Kota] baru saja memesan ${data.productName}"
4. Random selection logic`;
  }

  prompt += `\n\n📱 STRUKTUR LANDING PAGE PREMIUM:
1. HERO SECTION PREMIUM (Full height, gradient overlay, strong CTA)
2. PRODUCT SHOWCASE (Gallery lightbox, zoom, video)
3. VARIANTS SELECTION (Interactive swatches/buttons)
4. BENEFITS & FEATURES (Icons, counters)
${data.testimoni.length > 0 ? '5. TESTIMONI CUSTOMER SECTION\n' : ''}
${data.testimoni.length > 0 ? '6' : '5'}. PRICING & PROMO (Countdown, bundle offers)
${data.testimoni.length > 0 ? '7' : '6'}. ORDER FORM PREMIUM (OrderOnline embed styled)
${data.socialProof.enabled ? 'Social Proof Notifications (Floating)' : ''}

FINAL INSTRUCTION:
Buatkan landing page dengan kode HTML, CSS, dan JavaScript yang:
1. Production-ready dan bug-free
2. Pixel-perfect sesuai spesifikasi desain premium
3. Responsive dan mobile-optimized
4. Typography konsisten
5. Siap deploy

Hasilkan kode lengkap! 🚀`;

  return prompt;
};