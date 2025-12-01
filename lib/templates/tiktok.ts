
import { FormData } from '../../types';
import { formatPrice, getEmbedUrl, getFontUrl, themes } from '../utils';

export const generateTikTokTemplate = (data: FormData): string => {
    const fontUrl = getFontUrl(data.headingFont, data.bodyFont);
    const theme = themes[data.colorScheme] || themes.luxury;
    const isDark = ['luxury', 'midnight'].includes(data.colorScheme);

    // Build slide items: Video first, then Main Image, then Gallery
    let slidesHtml = '';
    if (data.videoDemo) {
        if (data.videoDemo.includes('.mp4')) {
            slidesHtml += `<div class="swiper-slide"><video controls playsinline webkit-playsinline src="${data.videoDemo}" style="width:100%; height:100%; object-fit:contain; background:#000;"></video></div>`;
        } else {
            slidesHtml += `<div class="swiper-slide"><iframe width="100%" height="100%" src="${getEmbedUrl(data.videoDemo)}" frameborder="0" allowfullscreen></iframe></div>`;
        }
    }
    slidesHtml += `<div class="swiper-slide"><img id="heroMain" src="${data.mainImage}" alt="Hero"></div>`;
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
            --primary: #FE2C55; /* TikTok Red */
            --bg: #F8F8F8;
            --text: #161823;
            --white: #ffffff;
            --font-heading: '${data.headingFont}', serif;
            --font-body: '${data.bodyFont}', sans-serif;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: var(--font-body); background: var(--bg); color: var(--text); overflow-x: hidden; padding-bottom: 90px; }
        
        .container { max-width: 500px; margin: 0 auto; background: var(--white); min-height:100vh; position: relative; }
        
        /* Navbar */
        .navbar { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; position: absolute; width: 100%; z-index: 10; background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent); }
        .brand { font-family: var(--font-heading); font-weight: 700; font-size: 1.1rem; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
        
        /* Hero Swiper */
        .hero-swiper { width: 100%; aspect-ratio: 1/1; background: #000; }
        .hero-swiper .swiper-slide { background:#000; display:flex; align-items:center; justify-content:center; }
        .hero-swiper .swiper-slide img { width: 100%; height: 100%; object-fit: cover; }
        .hero-swiper .swiper-pagination-bullet { background: #fff; opacity: 0.6; }
        .hero-swiper .swiper-pagination-bullet-active { background: #fff; opacity: 1; transform: scale(1.2); }
        
        /* Content Body */
        .content { padding: 20px 16px; border-radius: 16px 16px 0 0; margin-top: -16px; background: var(--white); position: relative; z-index: 5; }
        
        .price-row { display: flex; align-items: flex-end; gap: 8px; margin-bottom: 8px; }
        .price-tag { font-size: 1.5rem; color: var(--primary); font-weight: 700; line-height: 1; }
        .price-tag .old { font-size: 0.9rem; color: #888; text-decoration: line-through; font-weight: 400; }
        
        .product-title { font-size: 1.1rem; line-height: 1.3; margin-bottom: 12px; font-weight: 600; color: #161823; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .desc-text { font-size: 0.9rem; color: #555; line-height: 1.5; margin-bottom: 20px; }

        /* Variants - Compact Chips */
        .variants-wrap { margin: 20px 0; border-top: 1px solid #f1f1f1; padding-top: 20px; }
        .v-title { font-weight: 600; margin-bottom: 12px; display: block; font-size: 0.9rem; }
        
        /* Visual Card Grid for Variants */
        .v-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px; }
        
        .v-card {
            border: 1px solid #eee; border-radius: 6px; overflow: hidden; cursor: pointer;
            transition: all 0.2s; position: relative; background: #fff;
        }
        .v-card.active { border-color: var(--primary); box-shadow: 0 0 0 1px inset var(--primary); background: #fff0f2; }
        .v-card-img { width: 100%; height: 80px; object-fit: cover; background: #f8f8f8; }
        .v-card-body { padding: 6px; text-align: center; font-size: 0.75rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        /* Text-only fallback */
        .v-list-text { display: flex; flex-wrap: wrap; gap: 8px; }
        .v-chip {
            padding: 6px 14px; border: 1px solid #eee; border-radius: 4px; font-size: 0.85rem;
            background: #f8f8f8; cursor: pointer; transition: all 0.2s;
        }
        .v-chip.active { background: #fff0f2; color: var(--primary); border-color: var(--primary); font-weight: 600; }

        /* Featured Gallery Masonry */
        .featured-wrap { margin: 25px 0; }
        .fg-grid { column-count: 2; column-gap: 8px; }
        .fg-item { margin-bottom: 8px; break-inside: avoid; border-radius: 8px; overflow: hidden; }
        .fg-item img { width: 100%; display: block; }

        /* RICH FEATURES (Cards) */
        .rich-cards { margin: 25px 0; display:flex; flex-direction:column; gap:12px; }
        .rc-card { border:1px solid #eee; border-radius:10px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
        .rc-img { width:100%; display:block; }
        .rc-body { padding:14px; }
        .rc-title { font-weight:700; margin-bottom:4px; font-size:0.9rem; }
        .rc-desc { font-size:0.85rem; color:#666; line-height: 1.4; }

        /* Testimonial Swiper */
        .testi-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; margin-top: 30px; }
        .testi-swiper { padding: 0 0 40px 0; }
        .t-card { 
            background: #f9f9f9; padding: 15px; border-radius: 12px; 
            border: 1px solid #eee; height: 100%; font-size: 0.9rem;
        }
        .t-user { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .t-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .t-rating { color: #fbc02d; font-size: 0.8rem; }
        
        /* Sticky CTA */
        .sticky-cta {
            position: fixed; bottom: 0; left: 0; width: 100%; background: var(--white);
            padding: 12px 16px; border-top: 1px solid #eee; z-index: 100;
            display: flex; gap: 10px; align-items: center;
        }
        .cta-btn {
            background: var(--primary); color: #fff; text-decoration: none;
            padding: 12px; border-radius: 4px; font-weight: 600; font-size: 1rem;
            flex: 1; text-align: center;
        }
        .chat-btn {
            width: 48px; height: 48px; border: 1px solid #eee; border-radius: 4px;
            display: flex; align-items: center; justify-content: center; color: #161823;
        }

        /* Social Proof Popup */
        .social-popup {
            position: fixed; top: 15px; right: 15px; background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px); padding: 10px 14px; border-radius: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 10px;
            transform: translateX(150%); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 999; max-width: 90%;
        }
        .social-popup.show { transform: translateX(0); }
        .sp-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1px solid #fff; }
        
        /* Compact Timer */
        .compact-timer { 
            display: inline-flex; align-items: center; gap: 6px; background: #FFF0F2; color: var(--primary); 
            padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Navbar -->
        <div class="navbar">
            <div class="brand">${data.storeName}</div>
        </div>

        <!-- Hero Gallery -->
        <div class="swiper hero-swiper">
            <div class="swiper-wrapper">
                ${slidesHtml}
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <div class="content">
            ${data.urgencyTimer?.enabled ? `
            <div class="compact-timer">
                <i class="fas fa-bolt"></i> <span id="ct-txt">00:00:00</span>
            </div>
            ` : ''}

            <div class="price-row">
                <div class="price-tag">Rp ${formatPrice(data.discountPrice || data.originalPrice)}</div>
                ${data.discountPrice ? `<div class="old">Rp ${formatPrice(data.originalPrice)}</div>` : ''}
            </div>
            
            <h1 class="product-title">${data.productName}</h1>
            
            <!-- Variants Switcher -->
            ${data.variants.length > 0 ? `
            <div class="variants-wrap">
                <span class="v-title">Pilih Variasi</span>
                
                ${data.variants.some(v => v.image) ? `
                <div class="v-grid">
                    ${data.variants.map((v, i) => `
                    <div class="v-opt v-card ${i===0 ? 'active' : ''}" 
                         onclick="switchVariant(this, '${v.image || data.mainImage}')">
                        ${v.image ? `<img src="${v.image}" class="v-card-img">` : '<div class="v-card-img" style="display:flex;align-items:center;justify-content:center;color:#ccc;"><i class="fas fa-image"></i></div>'}
                        <div class="v-card-body">${v.name}</div>
                    </div>
                    `).join('')}
                </div>
                ` : `
                <div class="v-list-text">
                     ${data.variants.map((v, i) => `
                    <div class="v-opt v-chip ${i===0 ? 'active' : ''}" 
                         onclick="switchVariant(this, '${data.mainImage}')">
                        ${v.name}
                    </div>
                    `).join('')}
                </div>
                `}
            </div>
            ` : ''}
            
            <div class="desc-text">${data.productDescription}</div>

            <!-- Featured Gallery (Lifestyle) -->
            ${data.featuredGallery ? `
            <div class="featured-wrap">
                <span class="v-title">Galeri Lifestyle</span>
                <div class="fg-grid">
                    ${data.featuredGallery.split('\n').filter(x=>x).map(url => `
                    <div class="fg-item"><img src="${url.trim()}"></div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- RICH FEATURES (Cards) -->
            ${data.productFeatures && data.productFeatures.length > 0 ? `
            <div class="rich-cards">
                ${data.productFeatures.map(f => `
                <div class="rc-card">
                    ${f.image ? `<img src="${f.image}" class="rc-img" alt="${f.title || 'Feature'}">` : ''}
                    <div class="rc-body">
                         ${f.title ? `<div class="rc-title">${f.title}</div>` : ''}
                         <div class="rc-desc">${f.description}</div>
                    </div>
                </div>
                `).join('')}
            </div>
            ` : ''}

            <!-- Testimonials -->
            ${data.testimoni.length > 0 ? `
            <div class="testi-header">
                <span class="v-title" style="margin:0;">Ulasan (${data.testimoni.length})</span>
                <span style="font-size:0.8rem; color:var(--primary);">Lihat semua ></span>
            </div>
            <div class="swiper testi-swiper">
                <div class="swiper-wrapper">
                    ${data.testimoni.map(t => `
                    <div class="swiper-slide">
                        <div class="t-card">
                            <div class="t-user">
                                <img src="${t.avatar || `https://ui-avatars.com/api/?name=${t.name}`}" class="t-avatar">
                                <div>
                                    <div style="font-weight:600; font-size:0.8rem;">${t.name}</div>
                                    <div class="t-rating">${'★'.repeat(parseInt(t.rating))}</div>
                                </div>
                            </div>
                            <p style="color:#333;">"${t.text}"</p>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Order Form -->
            <div id="order" style="margin-top: 30px; padding-bottom: 20px;">
                <h3 style="font-size:1rem; font-weight:700; margin-bottom:15px;">Formulir Pemesanan</h3>
                ${data.orderOnlineEmbed || '<div style="padding:40px; text-align:center; border:1px solid #eee; border-radius:10px;">Area Embed Form</div>'}
            </div>
        </div>

        <div class="sticky-cta">
            <div class="chat-btn"><i class="far fa-comment-dots"></i></div>
            <a href="#order" class="cta-btn">Beli Sekarang</a>
        </div>
        
        ${data.socialProof.enabled ? `
        <div id="socialPopup" class="social-popup">
            <img id="sp-img" src="" class="sp-avatar">
            <div>
                <div style="font-weight:700; font-size:0.8rem;" id="popupName"></div>
                <div style="font-size:0.75rem; opacity:0.6;">Baru saja membeli</div>
            </div>
        </div>
        ` : ''}
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        // Init Swipers - Smooth & Video Handling
        new Swiper('.hero-swiper', {
            pagination: { el: '.swiper-pagination' },
            loop: false,
            speed: 400,
            resistance: true,
            resistanceRatio: 0.85,
            touchRatio: 1,
            touchStartPreventDefault: false,
            on: {
                slideChange: function () {
                    // Pause media
                    document.querySelectorAll('video').forEach(v => v.pause());
                    document.querySelectorAll('iframe').forEach(i => { const src = i.src; i.src = src; });
                }
            }
        });

        new Swiper('.testi-swiper', {
            slidesPerView: 1.3,
            spaceBetween: 12,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16
        });

        // Variant Switcher
        function switchVariant(el, imgUrl) {
            document.querySelectorAll('.v-opt').forEach(i => i.classList.remove('active'));
            el.classList.add('active');
            
            if(imgUrl) {
                const heroImg = document.getElementById('heroMain');
                if(heroImg) heroImg.src = imgUrl;
                
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
            const display = document.getElementById('ct-txt');
            
            setInterval(function () {
                let hours = parseInt(timer / 3600, 10);
                let minutes = parseInt((timer % 3600) / 60, 10);
                let seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                if(display) display.textContent = hours + ":" + minutes + ":" + seconds;

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
