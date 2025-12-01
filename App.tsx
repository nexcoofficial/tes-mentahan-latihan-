
import React, { useState, useRef } from 'react';
import { 
  Package, LayoutTemplate, Image, MessageSquare, 
  Users, Target, CheckCircle2, Copy, Sparkles, Box,
  Code2, Eye, Download, Smartphone, Monitor, Timer
} from 'lucide-react';
import { FormData, FormSection } from './types';
import { generateLandingPageCode } from './lib/htmlGenerator';
import { ProductSection, VariantsSection, DesignSection, MediaSection, TestimonialsSection, SocialSection, TargetSection, UrgencySection } from './components/FormSections';
import { Button } from './components/UI';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<FormSection>('product');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const resultRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productCategory: 'fashion',
    originalPrice: '',
    discountPrice: '',
    productDescription: '',
    variants: [],
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    colorScheme: 'luxury',
    layoutStyle: 'premium',
    mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    videoDemo: '',
    productGallery: '',
    featuredGallery: '',
    productFeatures: [], // Initial state for new feature
    orderOnlineEmbed: '',
    storeName: '',
    testimoni: [],
    socialProof: {
      enabled: false,
      interval: 8,
      duration: 5,
      names: 'Vina, Dina, Kartika, Lestari',
      cities: 'Jakarta, Surabaya, Bandung',
      avatar: ''
    },
    urgencyTimer: {
      enabled: false,
      duration: 15, // 15 minutes default
      text: '⚡ PROMO BERAKHIR DALAM:'
    },
    targetAudience: '',
    uniqueSellingPoint: '',
    additionalNotes: ''
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const code = generateLandingPageCode(formData);
      setGeneratedCode(code);
      setIsGenerating(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Kode HTML berhasil disalin!");
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.productName.replace(/\s+/g, '-').toLowerCase()}-landing.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const steps = [
    { id: 'product', label: 'Info Produk', icon: Package },
    { id: 'variants', label: 'Varian', icon: Box },
    { id: 'design', label: 'Desain', icon: LayoutTemplate },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'testimonials', label: 'Testimoni', icon: MessageSquare },
    { id: 'social', label: 'Social Proof', icon: Users },
    { id: 'urgency', label: 'Timer Promo', icon: Timer },
    { id: 'target', label: 'Integrasi', icon: Target },
  ];

  // Custom styling for the premium Generate button
  const generateBtnClass = `
    hidden md:flex 
    bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 
    hover:from-gold-600 hover:via-gold-500 hover:to-gold-400 
    text-white border-0 
    shadow-lg shadow-slate-900/20 hover:shadow-gold-500/40 
    transition-all duration-300 ease-out 
    hover:-translate-y-1 hover:scale-[1.02] active:scale-95 
    py-3 px-6 rounded-xl font-bold tracking-wide
  `;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 sticky top-0 h-auto md:h-screen overflow-y-auto z-10 flex-shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <img 
            src="https://cdn.orderonline.id/uploads/images_7847141758725198821.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900">
              nexco
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Generator v2.0</p>
          </div>
        </div>
        
        <nav className="p-3 space-y-1">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeSection === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveSection(step.id as FormSection)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-gold-400' : 'text-slate-400'} />
                {step.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
           <div className="bg-gradient-to-br from-gold-50 to-white border border-gold-200 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gold-700 font-bold mb-1">
                <Sparkles size={14} />
                <span className="text-[10px] tracking-wide uppercase">Pro Tip</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gunakan gambar dengan rasio 1:1 untuk varian agar tampilan terlihat rapi dan profesional.
              </p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative scroll-smooth">
        <div className="max-w-5xl mx-auto p-6 md:p-10 pb-32">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Buat Landing Page</h2>
              <p className="text-slate-500 text-sm mt-1">Isi detail produk untuk menghasilkan website profesional.</p>
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating} 
              className={generateBtnClass}
            >
              {isGenerating ? 'Memproses...' : 'Generate Landing Page'} 
              <Sparkles size={18} className={`ml-2 ${isGenerating ? 'animate-spin' : 'animate-pulse'}`} />
            </Button>
          </div>

          {/* Active Form Section */}
          <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 md:p-8 min-h-[500px] mb-8 relative">
            {activeSection === 'product' && <ProductSection formData={formData} setFormData={setFormData} />}
            {activeSection === 'variants' && <VariantsSection formData={formData} setFormData={setFormData} />}
            {activeSection === 'design' && <DesignSection formData={formData} setFormData={setFormData} />}
            {activeSection === 'media' && <MediaSection formData={formData} setFormData={setFormData} />}
            {activeSection === 'testimonials' && <TestimonialsSection formData={formData} setFormData={setFormData} />}
            {activeSection === 'social' && <SocialSection formData={formData} setFormData={setFormData} />}
            {activeSection === 'urgency' && <UrgencySection formData={formData} setFormData={setFormData} />}
            {activeSection === 'target' && <TargetSection formData={formData} setFormData={setFormData} />}
            
            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between pt-6 border-t border-slate-50">
               <button 
                onClick={() => {
                  const idx = steps.findIndex(s => s.id === activeSection);
                  if (idx > 0) setActiveSection(steps[idx - 1].id as FormSection);
                }}
                disabled={activeSection === steps[0].id}
                className="px-4 py-2 text-slate-500 font-medium text-sm disabled:opacity-30 hover:text-slate-800 transition-colors"
               >
                 Kembali
               </button>

               {activeSection !== 'target' ? (
                 <Button 
                  onClick={() => {
                    const idx = steps.findIndex(s => s.id === activeSection);
                    if (idx < steps.length - 1) setActiveSection(steps[idx + 1].id as FormSection);
                  }}
                 >
                   Lanjut
                 </Button>
               ) : (
                 <Button 
                   onClick={handleGenerate} 
                   disabled={isGenerating}
                   className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-gold-600 hover:to-gold-500 hover:shadow-gold-500/30 text-white font-bold transition-all hover:-translate-y-1"
                 >
                   {isGenerating ? 'Memproses...' : 'Generate Landing Page'} <Sparkles size={18} />
                 </Button>
               )}
            </div>
          </div>

          {/* Generated Result */}
          {generatedCode && (
            <div ref={resultRef} className="animate-slide-up scroll-mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                  <button 
                    onClick={() => setViewMode('preview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'preview' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    <Eye size={16} /> Preview
                  </button>
                  <button 
                    onClick={() => setViewMode('code')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'code' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    <Code2 size={16} /> Source Code
                  </button>
                </div>

                <div className="flex gap-2">
                   <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium transition-colors shadow-sm"
                   >
                     <Copy size={16} /> Salin
                   </button>
                   <button 
                    onClick={downloadHtml}
                    className="flex items-center gap-2 px-3 py-2 bg-gold-600 hover:bg-gold-500 text-white border border-gold-600 rounded-lg text-sm font-medium transition-colors shadow-sm"
                   >
                     <Download size={16} /> Download .html
                   </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ring-4 ring-slate-100">
                {viewMode === 'preview' ? (
                  <div className="relative w-full h-[600px] bg-slate-100">
                     <iframe 
                      title="Preview"
                      srcDoc={generatedCode}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                     />
                  </div>
                ) : (
                  <div className="bg-slate-900 p-0 h-[600px] flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/50 text-xs text-slate-400 font-mono">
                      <span>index.html</span>
                      <span>{generatedCode.length} chars</span>
                    </div>
                    <textarea 
                      readOnly 
                      value={generatedCode} 
                      className="w-full h-full bg-slate-900 text-slate-300 font-mono text-sm p-4 focus:outline-none resize-none custom-scrollbar" 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default App;
