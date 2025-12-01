
import React from 'react';
import { FormData, Variant } from '../types';
import { Input, TextArea, Select, SectionHeader, Button } from './UI';
import { 
  Package, Tag, DollarSign, List, AlignLeft, Image as ImageIcon, 
  Video, Globe, MessageSquare, Plus, Trash2, Users, MapPin, 
  Clock, Link as LinkIcon, ShoppingBag, Eye, Star, Layers, Palette, Type,
  Smartphone, Monitor, Layout, Check, Timer, Zap, Flame, TicketPercent, Truck, AlertCircle, FileImage
} from 'lucide-react';

// --- Shared Props ---
interface SectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// --- 1. Product Info ---
export const ProductSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Informasi Produk" description="Detail utama produk untuk landing page anda." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          name="productName" label="Nama Produk" icon={Package} 
          value={formData.productName} onChange={handleChange} 
          placeholder="e.g. Hijab Premium Silk" 
        />
        <Select 
          name="productCategory" label="Kategori" icon={Tag}
          value={formData.productCategory} onChange={handleChange}
          options={[
            { value: "fashion", label: "Fashion & Pakaian" },
            { value: "hijab", label: "Hijab & Busana Muslim" },
            { value: "elektronik", label: "Elektronik & Gadget" },
            { value: "kecantikan", label: "Kecantikan & Skincare" },
            { value: "makanan", label: "Makanan & Minuman" },
            { value: "rumah", label: "Rumah & Dekorasi" },
            { value: "digital", label: "Produk Digital" },
            { value: "jasa", label: "Layanan Jasa" },
          ]}
        />
        <Input 
          name="originalPrice" label="Harga Asli" icon={DollarSign} type="number"
          value={formData.originalPrice} onChange={handleChange} 
          placeholder="299000" 
        />
        <Input 
          name="discountPrice" label="Harga Diskon" icon={Tag} type="number"
          value={formData.discountPrice} onChange={handleChange} 
          placeholder="199000" 
        />
        <div className="col-span-1 md:col-span-2">
          <TextArea 
            name="productDescription" label="Deskripsi Produk" icon={AlignLeft}
            value={formData.productDescription} onChange={handleChange}
            placeholder="Deskripsikan fitur, bahan, dan keunggulan produk secara detail..."
          />
        </div>
      </div>
    </div>
  );
};

// --- 2. Variants (NEW FEATURE) ---
export const VariantsSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: '',
      price: '',
      sku: '',
      image: ''
    };
    setFormData(prev => ({ ...prev, variants: [...prev.variants, newVariant] }));
  };

  const removeVariant = (id: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== id)
    }));
  };

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.id === id ? { ...v, [field]: value } : v)
    }));
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Varian Produk" description="Kelola varian produk (Warna, Ukuran, Paket). Gambar akan otomatis muncul saat varian dipilih." />
      
      {formData.variants.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl mb-4">
          <div className="bg-white p-3 rounded-full inline-block shadow-sm mb-3">
            <Layers className="text-gold-500" size={24} />
          </div>
          <p className="text-slate-500 mb-4">Belum ada varian ditambahkan</p>
          <Button onClick={addVariant} variant="secondary">
            <Plus size={18} /> Tambah Varian Pertama
          </Button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {formData.variants.map((variant, index) => (
            <div key={variant.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:border-gold-300 transition-colors">
               <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => removeVariant(variant.id)} className="text-slate-400 hover:text-red-500 p-1">
                  <Trash2 size={18} />
                </button>
              </div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Varian #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Nama Varian" placeholder="Contoh: Merah - XL" 
                  value={variant.name} onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                />
                <Input 
                  label="URL Gambar (Penting untuk Switcher)" placeholder="https://..." icon={ImageIcon}
                  value={variant.image || ''} onChange={(e) => updateVariant(variant.id, 'image', e.target.value)}
                  subtext="Gambar ini akan muncul di preview saat tombol varian diklik."
                />
                <Input 
                  label="Harga Khusus (Opsional)" placeholder="Kosongkan jika sama" type="number"
                  value={variant.price || ''} onChange={(e) => updateVariant(variant.id, 'price', e.target.value)}
                />
                <Input 
                  label="Kode SKU (Opsional)" placeholder="SKU-123" 
                  value={variant.sku || ''} onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {formData.variants.length > 0 && (
         <Button onClick={addVariant} className="w-full border-dashed border-2 border-slate-200 bg-transparent hover:bg-slate-50 shadow-none text-slate-500">
           <Plus size={18} /> Tambah Varian Lain
         </Button>
      )}
    </div>
  );
};

// --- 3. Design & Typography ---
export const DesignSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const templates = [
    {
      id: 'premium',
      name: 'Shopify Premium Template',
      desc: 'Tampilan premium, elegan, tipografi besar dengan slider galeri klasik.',
      icon: Monitor
    },
    {
      id: 'shopee',
      name: 'Shopee Style Single Page',
      desc: 'Tata letak berdasarkan struktur resmi halaman produk Shopee dengan grid review.',
      icon: Layout
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop Mobile Style',
      desc: 'Layout mobile-first dengan fokus video dan swipe interaction.',
      icon: Smartphone
    }
  ];

  const colorThemes = [
    { id: 'luxury', name: 'Luxury Gold', bg: '#000000', accent: '#D4AF37' },
    { id: 'mono', name: 'Minimalist Mono', bg: '#ffffff', accent: '#000000' },
    { id: 'corporate', name: 'Corporate Blue', bg: '#F8FAFC', accent: '#0F4C75' },
    { id: 'midnight', name: 'Midnight Pro', bg: '#0f172a', accent: '#38bdf8' },
    { id: 'ocean', name: 'Clean Ocean', bg: '#f0f9ff', accent: '#0ea5e9' },
    { id: 'earth', name: 'Earthy Tones', bg: '#FAF8F5', accent: '#5F6F52' },
    { id: 'cherry', name: 'Vibrant Cherry', bg: '#FFF5F5', accent: '#E53E3E' },
    { id: 'cyber', name: 'Neon Cyber', bg: '#050505', accent: '#22c55e' },
    { id: 'islamic', name: 'Islamic Emerald', bg: '#F0FDFA', accent: '#0D9488' },
    { id: 'lavender', name: 'Soft Lavender', bg: '#FDF4FF', accent: '#C026D3' },
    { id: 'royal', name: 'Royal Purple', bg: '#FBF7FF', accent: '#7E22CE' },
    { id: 'sunset', name: 'Warm Sunset', bg: '#fff7ed', accent: '#f97316' },
  ];

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Desain & Tipografi" description="Pilih template struktur dan nuansa visual." />
      
      {/* Template Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3 font-sans">Pilih Template Landing Page</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div 
              key={t.id}
              onClick={() => setFormData({...formData, layoutStyle: t.id as any})}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden group ${formData.layoutStyle === t.id ? 'border-gold-500 bg-gold-50/30 ring-2 ring-gold-500/20' : 'border-slate-200 hover:border-gold-200 bg-white'}`}
            >
              {formData.layoutStyle === t.id && (
                <div className="absolute top-0 right-0 bg-gold-500 text-white p-1 rounded-bl-lg z-10">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-3 text-slate-700 group-hover:scale-110 transition-transform duration-300">
                <t.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">{t.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Scheme Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3 font-sans">Skema Warna & Tema</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colorThemes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setFormData({...formData, colorScheme: theme.id})}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all hover:-translate-y-0.5 ${
                formData.colorScheme === theme.id 
                  ? 'border-gold-500 ring-2 ring-gold-500/10 bg-white shadow-md' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="w-12 h-12 rounded-lg shadow-inner border border-black/5 overflow-hidden flex">
                 <div style={{ backgroundColor: theme.bg }} className="w-1/2 h-full"></div>
                 <div style={{ backgroundColor: theme.accent }} className="w-1/2 h-full"></div>
              </div>
              <div className="text-center">
                 <div className="text-xs font-bold text-slate-800 line-clamp-1">{theme.name}</div>
              </div>
              {formData.colorScheme === theme.id && (
                <div className="absolute top-2 right-2 text-gold-500 bg-white rounded-full p-0.5 shadow-sm">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1 font-sans">Kombinasi Font</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-4 transition-all ${formData.headingFont === 'Playfair Display' ? 'border-gold-500 bg-gold-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => setFormData({...formData, headingFont: 'Playfair Display', bodyFont: 'Inter'})}>
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-serif font-bold text-2xl text-slate-800 shadow-sm">
                  Aa
                </div>
                <div>
                  <div className="font-bold text-slate-900">Classic Luxury</div>
                  <div className="text-xs text-slate-500">Playfair Display + Inter</div>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-4 transition-all ${formData.headingFont === 'Manrope' ? 'border-gold-500 bg-gold-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => setFormData({...formData, headingFont: 'Manrope', bodyFont: 'Manrope'})}>
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-sans font-bold text-2xl text-slate-800 shadow-sm">
                  Aa
                </div>
                <div>
                  <div className="font-bold text-slate-900">Modern Professional</div>
                  <div className="text-xs text-slate-500">Manrope (Geometric Sans)</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. Media ---
export const MediaSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      productFeatures: [...(prev.productFeatures || []), { id: Date.now().toString(), title: '', description: '', image: '' }]
    }));
  };

  const removeFeature = (id: string) => {
    setFormData(prev => ({
      ...prev,
      productFeatures: prev.productFeatures.filter(f => f.id !== id)
    }));
  };

  const updateFeature = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      productFeatures: prev.productFeatures.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Visual & Media" description="Link gambar dan video untuk produk Anda." />
      <div className="space-y-4 mb-8">
        <Input 
          name="mainImage" label="URL Gambar Utama" icon={ImageIcon} 
          value={formData.mainImage} onChange={handleChange} 
          placeholder="https://..." 
        />
        <Input 
          name="videoDemo" label="URL Video Demo (YouTube/MP4)" icon={Video} 
          value={formData.videoDemo} onChange={handleChange} 
          placeholder="https://youtube.com/watch?v=... atau link .mp4" 
        />
        <TextArea 
          name="productGallery" label="Galeri Slider Produk (Satu URL per baris)" icon={List}
          value={formData.productGallery} onChange={handleChange}
          placeholder="https://image1.jpg&#10;https://image2.jpg"
          subtext="Akan ditampilkan dalam slider otomatis di atas."
        />
        <TextArea 
          name="featuredGallery" label="Galeri Lifestyle / Model (Satu URL per baris)" icon={ImageIcon}
          value={formData.featuredGallery} onChange={handleChange}
          placeholder="https://model1.jpg&#10;https://model2.jpg"
          subtext="Akan ditampilkan dalam format Grid/Masonry yang estetik di bawah pilihan Varian."
        />
      </div>

      {/* RICH FEATURES SECTION (Img + Desc) */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-slate-700 font-sans">Detail Visual & Deskripsi (Rich Media)</label>
          <Button onClick={addFeature} variant="secondary" className="px-3 py-1 text-xs">
            <Plus size={14} /> Tambah
          </Button>
        </div>
        <p className="text-xs text-slate-500 mb-4">Tambahkan blok gambar + deskripsi seperti landing page Shopee/AliExpress (Mendukung GIF).</p>
        
        <div className="space-y-4">
          {formData.productFeatures?.map((feature, index) => (
            <div key={feature.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
              <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => removeFeature(feature.id)} className="text-slate-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
              <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Blok Fitur #{index + 1}</h5>
              <div className="grid grid-cols-1 gap-3">
                 <Input 
                   label="Judul Fitur" placeholder="Contoh: BAHAN ADEM" 
                   value={feature.title} onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                   className="bg-white"
                 />
                 <TextArea 
                   label="Deskripsi Singkat" placeholder="Penjelasan detail..." 
                   value={feature.description} onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                   className="bg-white min-h-[60px]"
                 />
                 <Input 
                   label="URL Gambar / GIF" icon={FileImage}
                   value={feature.image} onChange={(e) => updateFeature(feature.id, 'image', e.target.value)}
                   placeholder="https://..."
                   className="bg-white"
                 />
              </div>
            </div>
          ))}
          {(!formData.productFeatures || formData.productFeatures.length === 0) && (
            <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-sm text-slate-400">Belum ada detail visual ditambahkan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 5. Testimonials ---
export const TestimonialsSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimoni: [...prev.testimoni, {
        id: Date.now().toString(),
        name: '', rating: '5', avatar: '', mediaUrls: '', text: '', variantPurchased: 'All Variants', date: new Date().toISOString().split('T')[0]
      }]
    }));
  };

  const removeTestimonial = (id: string) => {
    setFormData(prev => ({
      ...prev,
      testimoni: prev.testimoni.filter(t => t.id !== id)
    }));
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      testimoni: prev.testimoni.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Testimoni Customer" description="Buat review meyakinkan seperti di Marketplace." />
      
      <div className="space-y-6 mb-6">
        {formData.testimoni.map((item, idx) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group">
             <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => removeTestimonial(item.id)} className="text-slate-400 hover:text-red-500 p-1">
                  <Trash2 size={18} />
                </button>
              </div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Review #{idx + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Nama Customer" icon={Users}
                value={item.name} onChange={(e) => updateTestimonial(item.id, 'name', e.target.value)}
              />
              <Input 
                label="URL Foto Profil" icon={ImageIcon}
                value={item.avatar || ''} onChange={(e) => updateTestimonial(item.id, 'avatar', e.target.value)}
                placeholder="https://..."
                subtext="Opsional. Jika kosong akan menggunakan inisial."
              />
               <Select 
                label="Rating" icon={Star}
                value={item.rating} onChange={(e) => updateTestimonial(item.id, 'rating', e.target.value)}
                options={[
                  { value: "5", label: "⭐⭐⭐⭐⭐ (5)" },
                  { value: "4", label: "⭐⭐⭐⭐ (4)" },
                  { value: "3", label: "⭐⭐⭐ (3)" },
                ]}
              />
              <Input 
                label="Varian Dibeli" 
                value={item.variantPurchased || ''} onChange={(e) => updateTestimonial(item.id, 'variantPurchased', e.target.value)}
                placeholder="Contoh: Beige White"
              />
              <Input 
                label="Tanggal" type="date"
                value={item.date || ''} onChange={(e) => updateTestimonial(item.id, 'date', e.target.value)}
              />
              <div className="col-span-1 md:col-span-2">
                <Input 
                  label="Isi Review" icon={MessageSquare}
                  value={item.text} onChange={(e) => updateTestimonial(item.id, 'text', e.target.value)}
                  placeholder="Bagus banget, bahan lembut..."
                />
              </div>
               <div className="col-span-1 md:col-span-2">
                <TextArea 
                  label="Foto/Video Bukti (URL per baris)" icon={ImageIcon}
                  value={item.mediaUrls} onChange={(e) => updateTestimonial(item.id, 'mediaUrls', e.target.value)}
                  placeholder="https://img1.jpg&#10;https://video.mp4"
                  subtext="Masukkan link gambar atau video agar tampil seperti galeri review Shopee."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button onClick={addTestimonial} variant="secondary" className="w-full">
        <Plus size={18} /> Tambah Testimoni
      </Button>
    </div>
  );
};

// --- 6. Social Proof (Popup) ---
export const SocialSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const toggle = () => {
    setFormData(prev => ({
      ...prev,
      socialProof: { ...prev.socialProof, enabled: !prev.socialProof.enabled }
    }));
  };

  const handleChange = (field: string, value: string | number) => {
     setFormData(prev => ({
      ...prev,
      socialProof: { ...prev.socialProof, [field]: value }
    }));
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Social Proof Popup" description="Notifikasi pembelian palsu untuk urgensi (FOMO)." />
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.socialProof.enabled ? 'bg-gold-100 text-gold-600' : 'bg-slate-100 text-slate-400'}`}>
              <Users size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Aktifkan Popup Sales</p>
              <p className="text-xs text-slate-500">Muncul di pojok kanan bawah</p>
            </div>
          </div>
          <button 
            onClick={toggle}
            className={`w-14 h-8 rounded-full transition-colors relative ${formData.socialProof.enabled ? 'bg-gold-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${formData.socialProof.enabled ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        {formData.socialProof.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-down">
            <Input 
              label="Interval (Detik)" type="number" icon={Clock}
              value={formData.socialProof.interval} 
              onChange={(e) => handleChange('interval', parseInt(e.target.value))} 
            />
            <Input 
              label="Durasi Tampil (Detik)" type="number" icon={Clock}
              value={formData.socialProof.duration} 
              onChange={(e) => handleChange('duration', parseInt(e.target.value))} 
            />
            <div className="col-span-1 md:col-span-2">
              <Input 
                label="Daftar Nama (Pisahkan dengan koma)" icon={Users}
                value={formData.socialProof.names} 
                onChange={(e) => handleChange('names', e.target.value)} 
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Input 
                label="Daftar Kota (Pisahkan dengan koma)" icon={MapPin}
                value={formData.socialProof.cities} 
                onChange={(e) => handleChange('cities', e.target.value)} 
              />
            </div>
             <div className="col-span-1 md:col-span-2">
              <Input 
                label="URL Foto Profil (Bisa Banyak)" icon={ImageIcon}
                value={formData.socialProof.avatar} 
                onChange={(e) => handleChange('avatar', e.target.value)} 
                placeholder="https://img1.jpg, https://img2.jpg"
                subtext="Pisahkan dengan koma untuk merandom foto profil. Jika kosong, akan menggunakan inisial."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 7. Urgency Timer (NEW FEATURE) ---
export const UrgencySection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const toggle = () => {
    setFormData(prev => ({
      ...prev,
      urgencyTimer: { ...prev.urgencyTimer, enabled: !prev.urgencyTimer.enabled }
    }));
  };

  const handleChange = (field: string, value: string | number) => {
     setFormData(prev => ({
      ...prev,
      urgencyTimer: { ...prev.urgencyTimer, [field]: value }
    }));
  };

  const textTemplates = [
    { text: '⚡ FLASH SALE BERAKHIR:', icon: Zap },
    { text: '🔥 HARGA SPESIAL HILANG DALAM:', icon: Flame },
    { text: '⏰ DISKON 50% BERAKHIR:', icon: TicketPercent },
    { text: '📦 GRATIS ONGKIR SISA:', icon: Truck },
    { text: '🏃‍♂️ STOK MENIPIS! SISA WAKTU:', icon: AlertCircle },
  ];

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Timer Promo (Urgency)" description="Ciptakan urgensi dengan hitung mundur waktu promo." />
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.urgencyTimer.enabled ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
              <Timer size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Aktifkan Countdown Timer</p>
              <p className="text-xs text-slate-500">Meningkatkan konversi dengan FOMO</p>
            </div>
          </div>
          <button 
            onClick={toggle}
            className={`w-14 h-8 rounded-full transition-colors relative ${formData.urgencyTimer.enabled ? 'bg-gold-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${formData.urgencyTimer.enabled ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        {formData.urgencyTimer.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-down">
            <Input 
              label="Durasi Countdown (Menit)" type="number" icon={Clock}
              value={formData.urgencyTimer.duration} 
              onChange={(e) => handleChange('duration', parseInt(e.target.value))} 
              subtext="Timer akan reset setiap kali halaman direfresh (Looping)."
            />
            <div className="flex flex-col">
              <Input 
                label="Teks Label" placeholder="PROMO BERAKHIR DALAM:" icon={Type}
                value={formData.urgencyTimer.text} 
                onChange={(e) => handleChange('text', e.target.value)} 
              />
              <div className="mt-[-10px] mb-2">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 block">Template Populer:</span>
                 <div className="flex flex-wrap gap-2">
                   {textTemplates.map((item, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleChange('text', item.text)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-gold-50 border border-slate-200 hover:border-gold-300 rounded-lg text-xs font-medium text-slate-600 hover:text-gold-700 transition-all"
                     >
                       <item.icon size={12} />
                       {item.text.replace(':', '')}
                     </button>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- 8. Target & Integration ---
export const TargetSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="animate-fade-in">
      <SectionHeader title="Target & Integrasi" description="Siapa target market dan kemana data dikirim." />
      <div className="space-y-4">
        <Input 
          name="targetAudience" label="Target Audience" icon={Users} 
          value={formData.targetAudience} onChange={handleChange} 
          placeholder="Wanita karir usia 25-35..." 
        />
        <Input 
          name="uniqueSellingPoint" label="Unique Selling Point (USP)" icon={Star} 
          value={formData.uniqueSellingPoint} onChange={handleChange} 
          placeholder="Bahan premium anti gerah..." 
        />
         <Input 
          name="storeName" label="Nama Toko" icon={ShoppingBag} 
          value={formData.storeName} onChange={handleChange} 
        />
        <TextArea 
          name="orderOnlineEmbed" label="Embed Code (OrderOnline/Tribu/Woocommerce)" icon={LinkIcon}
          value={formData.orderOnlineEmbed} onChange={handleChange}
          placeholder="<script>...</script>"
          className="font-mono text-sm"
        />
         <TextArea 
          name="additionalNotes" label="Catatan Tambahan untuk AI"
          value={formData.additionalNotes} onChange={handleChange}
          placeholder="Instruksi khusus lainnya..."
        />
      </div>
    </div>
  );
};
