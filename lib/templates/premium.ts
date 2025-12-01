
import { FormData } from '../../types';
import { formatPrice, getEmbedUrl, getFontUrl, themes } from '../utils';

export const generatePremiumTemplate = (data: FormData): string => {
    const fontUrl = getFontUrl(data.headingFont, data.bodyFont);
    const theme = themes[data.colorScheme] || themes.luxury;
    const isDark = ['luxury', 'midnight'].includes(data.colorScheme);

    // Build slide items: Video first, then Main Image, then Gallery
    let slidesHtml = '';
    
    // 1. Video Slide (if exists) - ALWAYS FIRST
    if (data.videoDemo) {
        if (data.videoDemo.includes('.mp4')) {
            slidesHtml += `<div class="swiper-slide"><video controls playsinline webkit-playsinline src="${data.videoDemo}" style="width:100%; height:100%; object-fit:contain; background:#000;"></video></div>`;
        } else {
            slidesHtml += `<div class="swiper-slide"><iframe width="100%" height="100%" src="${getEmbedUrl(data.videoDemo)}" frameborder="0" allowfullscreen></iframe></div>`;
        }
    }
    
    // 2. Main Image
    slidesHtml += `<div class="swiper-slide"><img id="heroMain" src="${data.mainImage}" alt="Hero"></div>`;
    
    // 3. Gallery
    if (data.productGallery) {
        slidesHtml += data.productGallery.split('\n').filter(x => x).map(url => 
            `<div class="swiper-slide"><img src="${url.trim()}" alt="Gallery"></div>`
        ).join('');
    }

    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.productName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="${fontUrl}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: ${theme.accent};
            --bg: ${theme.bg};
            --text: ${theme.text};
            --secondary: ${theme.cardBg};
            --white: #ffffff;
            --font-heading: '${data.headingFont}', serif;
            --font-body: '${data.bodyFont}', sans-serif;
            --btn-gradient: ${theme.gradient};
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: var(--font-body); background: var(--bg); color: var(--text); overflow-x: hidden; }
        
        .container { max-width: 1100px; margin: 0 auto; background: var(--white); min-height:100vh; position: relative; box-shadow: 0 0 50px rgba(0,0,0,0.03); }
        
        /* Navbar */
        .navbar { padding: 25px 40px; display: flex; justify-content: space-between; align-items: center; position: absolute; width: 100%; z-index: 10; background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent); }
        .brand { font-family: var(--font-heading); font-weight: 700; font-size: 1.5rem; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.3); letter-spacing: 1px; }
        
        /* Hero Swiper - CHANGED to 4:5 Ratio for Premium Look */
        .hero-swiper { width: 100%; position: relative; }
        /* Mobile: 4:5 Aspect Ratio (Taller than square) */
        @media(max-width: 767px) {
            .hero-swiper { aspect-ratio: 4 / 5; max-height: 80vh; }
        }
        /* Desktop: Fixed Height Wide */
        @media(min-width: 768px) { .hero-swiper { height: 750px; } }
        
        .hero-swiper .swiper-slide { background: #111; display:flex; justify-content:center; align-items:center; overflow:hidden; }
        .hero-swiper .swiper-slide img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .hero-swiper .swiper-pagination-bullet { background: #fff; opacity: 0.5; width: 8px; height: 8px; }
        .hero-swiper .swiper-pagination-bullet-active { background: var(--white); opacity: 1; transform: scale(1.2); }
        
        /* Custom Navigation Arrows */
        .swiper-button-next, .swiper-button-prev { 
            color: #fff; background: rgba(0,0,0,0.2); width: 40px; height: 40px; border-radius: 50%; 
            backdrop-filter: blur(5px); transition: all 0.3s;
        }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 16px; font-weight: bold; }
        .swiper-button-next:hover, .swiper-button-prev:hover { background: var(--primary); }
        
        /* Content Body */
        .content { padding: 40px 25px; background: var(--white); position: relative; z-index: 5; margin-top: -40px; border-radius: 30px 30px 0 0; }
        @media(min-width: 768px) { .content { padding: 60px; margin-top: 0; border-radius: 0; } }
        
        .header-section { text-align: center; margin-bottom: 40px; }
        .price-tag { font-size: 1.8rem; color: var(--primary); font-weight: 600; margin-bottom: 10px; letter-spacing: -0.5px; }
        .price-tag .old { font-size: 1rem; color: #999; text-decoration: line-through; font-weight: 400; margin-left: 10px; }
        .product-title { font-family: var(--font-heading); font-size: 2.2rem; line-height: 1.2; margin-bottom: 15px; font-weight: 700; }
        
        /* Variants - Minimalist Pills */
        .variants-wrap { margin: 40px 0; text-align: center; }
        .v-title { font-weight: 600; margin-bottom: 15px; display: block; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; color: #888; }
        .v-list { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
        
        /* Swatch Style */
        .v-swatch {
            width: 45px; height: 45px; border-radius: 50%; cursor: pointer;
            border: 1px solid #ddd; padding: 2px; transition: all 0.3s;
            position: relative;
        }
        .v-swatch img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        .v-swatch.active { border-color: var(--primary); transform: scale(1.1); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        
        /* Pill Style */
        .v-pill {
            padding: 8px 20px; border: 1px solid #eee; border-radius: 4px;
            cursor: pointer; font-size: 0.9rem; color: #555; transition: all 0.2s;
            background: #fff;
        }
        .v-pill.active { background: var(--text); color: var(--bg); border-color: var(--text); }

        /* Featured Gallery Grid */
        .featured-gallery-wrap { margin: 60px 0; }
        .fg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .fg-item { width: 100%; aspect-ratio: 3/4; border-radius: 0; overflow: hidden; position: relative; }
        .fg-item:hover img { transform: scale(1.05); }
        .fg-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }

        /* RICH FEATURES (Magazine Style) */
        .rich-features { margin: 60px 0; }
        .rf-item { display: flex; flex-direction: column; gap: 30px; margin-bottom: 60px; align-items: center; }
        .rf-img { width: 100%; border-radius: 0; box-shadow: 0 10px 40px rgba(0,0,0,0.08); aspect-ratio: 4/3; object-fit: cover; }
        .rf-content { text-align: center; max-width: 500px; padding: 0 10px; }
        .rf-title { font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 15px; color: var(--text); }
        .rf-desc { line-height: 1.8; color: #666; font-size: 1rem; font-weight: 300; }
        
        @media(min-width: 768px) {
            .rf-item { flex-direction: row; gap: 60px; text-align: left; }
            .rf-item:nth-child(even) { flex-direction: row-reverse; }
            .rf-content { text-align: left; }
            .rf-img, .rf-content { width: 50%; }
        }

        /* Testimonials */
        .testi-section { padding: 60px 0; background: var(--secondary); margin: 0 -25px; padding: 60px 25px; }
        @media(min-width: 768px) { .testi-section { margin: 0 -60px; padding: 80px 60px; } }
        
        .t-card { 
            background: var(--white); padding: 30px; border-radius: 8px; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.03); height: 100%;
        }
        .t-user { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; }
        .t-avatar { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; }
        .t-text { font-style: italic; line-height: 1.6; color: #444; }
        .t-media { margin-top: 15px; width: 80px; height: 80px; border-radius: 4px; overflow: hidden; cursor: pointer; }
        .t-media img { width: 100%; height: 100%; object-fit: cover; }
        
        /* Sticky CTA */
        .sticky-cta {
            position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 400px;
            background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
            padding: 10px; border-radius: 60px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); z-index: 99;
            display: flex; justify-content: center; border: 1px solid rgba(0,0,0,0.05);
        }
        .cta-btn {
            background: var(--btn-gradient); color: #fff; text-decoration: none;
            padding: 14px 0; border-radius: 50px; font-weight: 600; font-size: 1rem; letter-spacing: 1px;
            width: 100%; text-align: center; transition: transform 0.2s;
        }
        .cta-btn:active { transform: scale(0.98); }

        /* Social Proof Popup */
        .social-popup {
            position: fixed; top: 100px; right: 20px; background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px); padding: 12px 18px; border-radius: 8px; border-left: 4px solid var(--primary);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 15px;
            transform: translateX(150%); transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 999; max-width: 320px;
        }
        .social-popup.show { transform: translateX(0); }
        .sp-avatar { width: 35px; height: 35px; border-radius: 50%; object-fit: cover; }
        
        /* Timer Premium */
        .premium-timer {
            margin: 0 auto 30px auto; padding: 15px 25px; border: 1px solid #eee; border-radius: 0;
            display: inline-flex; align-items: center; gap: 20px;
        }
        .pt-text { font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }
        .pt-digits { display: flex; gap: 5px; font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: 700; color: var(--primary); }
    </style>
</head>
<body>
    <div class="container">
        <div class="navbar">
            <div class="brand">${data.storeName}</div>
        </div>

        <div class="swiper hero-swiper">
            <div class="swiper-wrapper">
                ${slidesHtml}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>

        <div class="content">
            <div class="header-section">
                ${data.urgencyTimer?.enabled ? `
                <div class="premium-timer">
                    <span class="pt-text">${data.urgencyTimer.text.replace(':', '')}</span>
                    <div class="pt-digits">
                        <span id="pt-h">00</span>:<span id="pt-m">00</span>:<span id="pt-s">00</span>
                    </div>
                </div>
                ` : ''}

                <h1 class="product-title">${data.productName}</h1>
                <div class="price-tag">
                    Rp ${formatPrice(data.discountPrice || data.originalPrice)}
                    ${data.discountPrice ? `<span class="old">Rp ${formatPrice(data.originalPrice)}</span>` : ''}
                </div>
                <p style="line-height: 1.8; color: #666; max-width: 700px; margin: 0 auto;">${data.productDescription}</p>
            </div>

            <!-- Variants Switcher -->
            ${data.variants.length > 0 ? `
            <div class="variants-wrap">
                <span class="v-title">Pilihan Warna / Ukuran</span>
                <div class="v-list">
                    ${data.variants.map((v, i) => v.image ? `
                    <div class="v-opt v-swatch ${i===0 ? 'active' : ''}" 
                         onclick="switchVariant(this, '${v.image}')"
                         title="${v.name}">
                         <img src="${v.image}">
                    </div>
                    ` : `
                    <div class="v-opt v-pill ${i===0 ? 'active' : ''}" 
                         onclick="switchVariant(this, '${data.mainImage}')">
                         ${v.name}
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Featured Gallery -->
            ${data.featuredGallery ? `
            <div class="featured-gallery-wrap">
                <div class="fg-grid">
                    ${data.featuredGallery.split('\n').filter(x=>x).map(url => `
                    <div class="fg-item"><img src="${url.trim()}"></div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- RICH FEATURES (Magazine Style) -->
            ${data.productFeatures && data.productFeatures.length > 0 ? `
            <div class="rich-features">
                ${data.productFeatures.map(f => `
                <div class="rf-item">
                    ${f.image ? `<img src="${f.image}" class="rf-img" alt="${f.title || 'Feature'}">` : ''}
                    <div class="rf-content">
                        ${f.title ? `<h3 class="rf-title">${f.title}</h3>` : ''}
                        <p class="rf-desc">${f.description}</p>
                    </div>
                </div>
                `).join('')}
            </div>
            ` : ''}

            <!-- Testimonials -->
            ${data.testimoni.length > 0 ? `
            <div class="testi-section">
                <h2 style="font-family: var(--font-heading); margin-bottom: 40px; text-align:center; font-size: 1.8rem;">Customer Reviews</h2>
                <div class="swiper testi-swiper">
                    <div class="swiper-wrapper">
                        ${data.testimoni.map(t => `
                        <div class="swiper-slide">
                            <div class="t-card">
                                <div class="t-user">
                                    <img src="${t.avatar || `https://ui-avatars.com/api/?name=${t.name}`}" class="t-avatar">
                                    <div>
                                        <strong style="display:block; font-size:0.9rem;">${t.name}</strong>
                                        <div style="color:#FFD700; font-size:0.7rem;">${'★'.repeat(parseInt(t.rating))}</div>
                                    </div>
                                </div>
                                <p class="t-text">"${t.text}"</p>
                                ${t.mediaUrls ? `
                                <div class="t-media">
                                    <img src="${t.mediaUrls.split('\n')[0].trim()}">
                                </div>` : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Order Form -->
            <div id="order" style="margin-top: 50px; padding-bottom: 100px;">
                <h2 style="font-family: var(--font-heading); margin-bottom: 30px; text-align:center;">Secure Checkout</h2>
                ${data.orderOnlineEmbed || '<div style="padding:40px; text-align:center; border:1px solid #eee; border-radius:8px; background:#fcfcfc;">Form Embed Area</div>'}
            </div>
        </div>

        <div class="sticky-cta">
            <a href="#order" class="cta-btn">SHOP NOW</a>
        </div>
        
        ${data.socialProof.enabled ? `
        <div id="socialPopup" class="social-popup">
            <img id="sp-img" src="" class="sp-avatar">
            <div>
                <div style="font-weight:700; font-size:0.85rem;" id="popupName"></div>
                <div style="font-size:0.75rem; color:#888;">Verified Purchase</div>
            </div>
        </div>
        ` : ''}
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        // Hero Swiper - Smooth & Video Handling
        new Swiper('.hero-swiper', {
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            loop: false,
            speed: 600, // Slower for premium feel
            touchRatio: 1, 
            touchStartPreventDefault: false, // Critical for video touch
            on: {
                slideChange: function () {
                    // Force pause all media when sliding
                    document.querySelectorAll('video').forEach(v => v.pause());
                    document.querySelectorAll('iframe').forEach(i => { const src = i.src; i.src = src; });
                }
            }
        });

        new Swiper('.testi-swiper', {
            slidesPerView: 1.1,
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
            breakpoints: {
                768: { slidesPerView: 2.5, centeredSlides: false }
            }
        });

        // Variant Switcher
        function switchVariant(el, imgUrl) {
            document.querySelectorAll('.v-opt').forEach(i => i.classList.remove('active'));
            el.classList.add('active');
            
            if(imgUrl) {
                const heroImg = document.getElementById('heroMain');
                if(heroImg) heroImg.src = imgUrl;
                // Go to Main Image Slide (Index 1 if video exists, else 0)
                const swiperEl = document.querySelector('.hero-swiper').swiper;
                if(swiperEl) {
                    const hasVideo = ${data.videoDemo ? 'true' : 'false'};
                    swiperEl.slideTo(hasVideo ? 1 : 0);
                }
            }
        }

        // Timer Logic
        ${data.urgencyTimer?.enabled ? `
        function startTimer(duration) {
            let timer = duration * 60;
            const h = document.getElementById('pt-h');
            const m = document.getElementById('pt-m');
            const s = document.getElementById('pt-s');
            
            setInterval(function () {
                let hours = parseInt(timer / 3600, 10);
                let minutes = parseInt((timer % 3600) / 60, 10);
                let seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                if(h) h.textContent = hours;
                if(m) m.textContent = minutes;
                if(s) s.textContent = seconds;

                if (--timer < 0) timer = duration * 60;
            }, 1000);
        }
        startTimer(${data.urgencyTimer.duration});
        ` : ''}

        // Social Proof Logic
        ${data.socialProof.enabled ? `
        const names = "${data.socialProof.names}".split(',');
        const cities = "${data.socialProof.cities}".split(',');
        const avatars = "${data.socialProof.avatar}".split(',').filter(a => a.trim() !== '');
        
        const popup = document.getElementById('socialPopup');
        const pName = document.getElementById('popupName');
        const pImg = document.getElementById('sp-img');

        function showSocial() {
            const name = names[Math.floor(Math.random() * names.length)].trim();
            const city = cities[Math.floor(Math.random() * cities.length)].trim();
            
            let avatarUrl;
            if (avatars.length > 0) {
                avatarUrl = avatars[Math.floor(Math.random() * avatars.length)].trim();
            } else {
                avatarUrl = 'https://ui-avatars.com/api/?name=' + name + '&background=random';
            }
            
            pName.innerText = name + ' - ' + city;
            pImg.src = avatarUrl;
            
            popup.classList.add('show');
            setTimeout(() => popup.classList.remove('show'), ${data.socialProof.duration * 1000});
        }
        setInterval(showSocial, ${data.socialProof.interval * 1000});
        setTimeout(showSocial, 2000);
        ` : ''}
    </script>
</body>
</html>`;
}
