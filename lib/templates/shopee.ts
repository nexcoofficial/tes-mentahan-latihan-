
import { FormData } from '../../types';
import { formatPrice, getEmbedUrl, getFontUrl } from '../utils';

export const generateShopeeTemplate = (data: FormData): string => {
    const fontUrl = getFontUrl(data.headingFont, data.bodyFont);

    // Build slide items: Video first, then Main Image, then Gallery
    let slidesHtml = '';
    
    // 1. Video Slide (if exists) - ALWAYS FIRST
    if (data.videoDemo) {
        if (data.videoDemo.includes('.mp4')) {
            // Added playsinline and webkit-playsinline for mobile non-fullscreen playback
            slidesHtml += `<div class="swiper-slide"><video controls playsinline webkit-playsinline src="${data.videoDemo}" style="width:100%; height:100%; object-fit:contain; background:#000;"></video></div>`;
        } else {
            // Added pointer-events handling via CSS/JS later
            slidesHtml += `<div class="swiper-slide"><iframe width="100%" height="100%" src="${getEmbedUrl(data.videoDemo)}" frameborder="0" allowfullscreen></iframe></div>`;
        }
    }
    
    // 2. Main Image
    slidesHtml += `<div class="swiper-slide"><img id="mainImage" src="${data.mainImage}" alt="Main"></div>`;
    
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
    <title>${data.productName} | ${data.storeName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="${fontUrl}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #EE4D2D; /* Shopee Orange */
            --text: #222;
            --gray: #757575;
            --bg: #f5f5f5;
            --white: #fff;
            --font-heading: '${data.headingFont}', serif;
            --font-body: '${data.bodyFont}', sans-serif;
            --btn-gradient: linear-gradient(180deg, #ee4d2d 0%, #d73211 100%);
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: var(--font-body); background: var(--bg); color: var(--text); padding-bottom: 80px; }
        .container { max-width: 480px; margin: 0 auto; background: var(--white); min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); position: relative; }
        
        /* Product Gallery Swiper - FORCED 1:1 */
        .product-swiper { width: 100%; aspect-ratio: 1 / 1; background: #fff; }
        .product-swiper .swiper-slide { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
        .product-swiper img { width: 100%; height: 100%; object-fit: cover; }
        
        /* Flash Sale Timer */
        .flash-sale { 
            background: linear-gradient(90deg, #ef3313 0%, #d71016 100%); 
            color: #fff; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; 
        }
        .fs-left { display: flex; flex-direction: column; }
        .fs-title { font-weight: 700; font-size: 1.1rem; font-style: italic; text-transform: uppercase; }
        .fs-timer { display: flex; align-items: center; gap: 5px; font-size: 0.8rem; }
        .fs-box { background: #000; color: #fff; padding: 2px 4px; border-radius: 2px; font-weight: 700; min-width: 22px; text-align: center; }

        /* Product Info */
        .p-info { padding: 15px; border-bottom: 10px solid #f5f5f5; }
        .p-price { font-size: 1.5rem; color: var(--primary); font-weight: 600; display: flex; align-items: center; gap: 10px; }
        .p-price .old { font-size: 0.9rem; color: var(--gray); text-decoration: line-through; font-weight: 400; }
        .p-name { font-size: 1.1rem; margin: 10px 0; font-weight: 500; line-height: 1.4; }
        .p-meta { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--gray); margin-top: 10px; }
        
        /* Variants */
        .variant-section { padding: 15px; border-bottom: 10px solid #f5f5f5; }
        .section-label { font-weight: 600; margin-bottom: 12px; display: block; font-size: 0.95rem; }
        .v-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .v-btn { 
            padding: 6px 12px; border: 1px solid #e0e0e0; border-radius: 2px; background: #fff; 
            cursor: pointer; font-size: 0.9rem; min-height: 42px; min-width: 80px;
            display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;
            position: relative; overflow: hidden;
        }
        .v-btn img { width: 32px; height: 32px; object-fit: cover; border-radius: 2px; border: 1px solid #eee; }
        .v-btn:hover { border-color: var(--primary); color: var(--primary); }
        .v-btn.active { border-color: var(--primary); color: var(--primary); background: #fff; }
        .v-btn.active::after {
            content: ''; position: absolute; bottom: 0; right: 0;
            width: 0; height: 0; 
            border-style: solid; border-width: 0 0 15px 15px; 
            border-color: transparent transparent var(--primary) transparent;
        }
        .v-btn.active::before {
            content: '✓'; position: absolute; bottom: -3px; right: 0;
            font-size: 9px; color: #fff; z-index: 1; font-weight: bold;
        }

        /* Featured Gallery (Lifestyle) */
        .featured-gallery { padding: 15px; border-bottom: 10px solid #f5f5f5; }
        .fg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .fg-item { aspect-ratio: 3/4; border-radius: 4px; overflow: hidden; }
        .fg-item img { width: 100%; height: 100%; object-fit: cover; }

        /* Description */
        .desc-section { padding: 15px; border-bottom: 10px solid #f5f5f5; }
        .desc-content { white-space: pre-line; font-size: 0.95rem; line-height: 1.6; color: #333; }

        /* Rich Details (Features) - STACKED LAYOUT */
        .rich-details { padding: 0 15px 15px 15px; border-bottom: 10px solid #f5f5f5; }
        .feature-block { margin-bottom: 25px; }
        .f-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 5px; text-transform: uppercase; color: #333; }
        .f-desc { font-size: 0.9rem; color: #555; margin-bottom: 10px; line-height: 1.5; }
        .f-img { width: 100%; border-radius: 8px; display: block; }

        /* Reviews (Shopee Style) */
        .review-section { padding: 15px; }
        .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .r-item { border-bottom: 1px solid #eee; padding: 15px 0; }
        .r-user { display: flex; gap: 10px; margin-bottom: 8px; }
        .r-avatar { width: 32px; height: 32px; border-radius: 50%; background: #ddd; object-fit: cover; }
        .r-meta div { font-size: 0.8rem; color: var(--gray); }
        .r-rating { color: #FFD211; font-size: 0.7rem; margin: 2px 0; }
        .r-text { font-size: 0.9rem; margin-bottom: 10px; line-height: 1.4; }
        .r-media-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
        .r-media-item { aspect-ratio: 1; border-radius: 4px; overflow: hidden; position: relative; cursor: pointer; border: 1px solid #f0f0f0; }
        .r-media-item img, .r-media-item video { width: 100%; height: 100%; object-fit: cover; }
        
        /* Lightbox Custom */
        .lightbox-overlay {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 9999; 
            justify-content: center; align-items: center;
            opacity: 0; transition: opacity 0.3s ease;
        }
        .lightbox-overlay.active { display: flex; opacity: 1; }
        
        .lightbox-content {
            position: relative; width: 90%; max-width: 400px; 
            background: transparent; padding: 0;
            display: flex; justify-content: center; align-items: center;
        }
        
        .lightbox-media {
            max-width: 100%; max-height: 70vh; 
            border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.5);
            object-fit: contain; background: #000;
        }
        
        .lightbox-close {
            position: absolute; top: -40px; right: 0;
            color: #fff; font-size: 24px; cursor: pointer;
            width: 30px; height: 30px; text-align: center; line-height: 30px;
            background: rgba(255,255,255,0.2); border-radius: 50%;
        }

        /* Bottom Bar */
        .bottom-bar { 
            position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 480px; 
            background: #fff; padding: 10px; display: flex; gap: 10px; border-top: 1px solid #eee; z-index: 100;
        }
        .btn-buy { 
            flex: 1; background: var(--btn-gradient); color: #fff; border: none; padding: 12px; 
            border-radius: 4px; font-weight: 600; font-size: 1rem; cursor: pointer; text-align: center; text-decoration: none; 
            box-shadow: 0 4px 6px rgba(238, 77, 45, 0.2);
        }
        .order-section { margin-top: 20px; padding: 20px; background: #fff; border-top: 10px solid #f5f5f5; padding-bottom: 80px; }

        /* Social Proof */
        .social-popup {
            position: fixed; top: 80px; right: 10px; background: rgba(255,255,255,0.98);
            padding: 10px 15px; border-radius: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            display: flex; align-items: center; gap: 10px; z-index: 999;
            transform: translateX(120%); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-width: 90%;
        }
        .social-popup.show { transform: translateX(0); }
        .sp-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .sp-info div { line-height: 1.2; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Product Images 1:1 -->
        <div class="swiper product-swiper">
            <div class="swiper-wrapper" id="mainGallery">
                ${slidesHtml}
            </div>
            <div class="swiper-pagination"></div>
        </div>

        ${data.urgencyTimer?.enabled ? `
        <!-- Flash Sale Bar -->
        <div class="flash-sale">
            <div class="fs-left">
                <span class="fs-title">FLASH SALE</span>
                <span style="font-size:0.75rem; opacity:0.9;">Stok Terbatas!</span>
            </div>
            <div class="fs-timer">
                <span>${data.urgencyTimer.text.replace(':', '')}</span>
                <span class="fs-box" id="fs-h">00</span> :
                <span class="fs-box" id="fs-m">00</span> :
                <span class="fs-box" id="fs-s">00</span>
            </div>
        </div>
        ` : ''}

        <!-- Info -->
        <div class="p-info">
            <div class="p-price">
                <span>Rp ${formatPrice(data.discountPrice || data.originalPrice)}</span>
                ${data.discountPrice ? `<span class="old">Rp ${formatPrice(data.originalPrice)}</span>` : ''}
            </div>
            <h1 class="p-name">${data.productName}</h1>
            <div class="p-meta">
                <span><i class="fas fa-star" style="color:#FFD211"></i> 4.9 (2.1k Terjual)</span>
                <span>${data.storeName}</span>
            </div>
        </div>

        <!-- Variants -->
        ${data.variants.length > 0 ? `
        <div class="variant-section">
            <span class="section-label">Pilih Variasi</span>
            <div class="v-grid">
                ${data.variants.map((v, i) => `
                <button class="v-btn ${i===0 ? 'active' : ''}" 
                    onclick="changeVariant(this, '${v.image || data.mainImage}')"
                    data-image="${v.image || ''}">
                    ${v.image ? `<img src="${v.image}">` : ''} <span>${v.name}</span>
                </button>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Featured Gallery (Lifestyle) -->
        ${data.featuredGallery ? `
        <div class="featured-gallery">
            <span class="section-label">Galeri Lifestyle</span>
            <div class="fg-grid">
                ${data.featuredGallery.split('\n').filter(x=>x).map(url => `
                <div class="fg-item"><img src="${url.trim()}"></div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Description -->
        <div class="desc-section">
            <span class="section-label">Rincian Produk</span>
            <div class="desc-content">${data.productDescription}</div>
        </div>

        <!-- RICH FEATURES (New Section) -->
        ${data.productFeatures && data.productFeatures.length > 0 ? `
        <div class="rich-details">
            <span class="section-label" style="margin-bottom:20px; display:block;">Fitur Unggulan</span>
            ${data.productFeatures.map(f => `
            <div class="feature-block">
                ${f.title ? `<div class="f-title">${f.title}</div>` : ''}
                ${f.description ? `<div class="f-desc">${f.description}</div>` : ''}
                ${f.image ? `<img src="${f.image}" class="f-img" alt="${f.title || 'Feature'}">` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Reviews -->
        <div class="review-section">
            <div class="review-header">
                <span class="section-label">Penilaian Produk</span>
                <span style="color:var(--primary); font-size:0.9rem;">Lihat Semua ></span>
            </div>
            
            ${data.testimoni.map(t => `
            <div class="r-item">
                <div class="r-user">
                    <img src="${t.avatar || `https://ui-avatars.com/api/?name=${t.name}&background=random`}" class="r-avatar">
                    <div class="r-meta">
                        <div>${t.name}</div>
                        <div class="r-rating">${'★'.repeat(parseInt(t.rating))}</div>
                        <div style="margin-top:2px;">${t.date || '2023-10-15'} | Variasi: ${t.variantPurchased || 'All'}</div>
                    </div>
                </div>
                <div class="r-text">${t.text}</div>
                ${t.mediaUrls ? `
                <div class="r-media-grid">
                    ${t.mediaUrls.split('\n').filter(x=>x).map(url => `
                        <div class="r-media-item" onclick="openLightbox('${url.trim()}')">
                           ${url.includes('.mp4') 
                             ? '<video src="' + url.trim() + '" muted></video><i class="fas fa-play" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#fff; font-size:0.8rem; text-shadow:0 0 2px #000;"></i>' 
                             : '<img src="' + url.trim() + '">'
                           }
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
            `).join('')}
        </div>
        
        <!-- Order Embed Container -->
        <div id="orderForm" class="order-section">
             <h3 class="section-label" style="text-align:center; margin-bottom:15px;">Formulir Pemesanan</h3>
             ${data.orderOnlineEmbed || '<p style="text-align:center; color:#999; border:1px dashed #ccc; padding:20px;">Area Embed OrderOnline akan muncul di sini.</p>'}
        </div>

        <div class="bottom-bar">
            <a href="#orderForm" onclick="document.getElementById('orderForm').scrollIntoView({behavior:'smooth'})" class="btn-buy">
                Beli Sekarang
            </a>
        </div>
        
        ${data.socialProof.enabled ? `
        <div id="socialPopup" class="social-popup">
            <img id="sp-img" src="" class="sp-avatar">
            <div class="sp-info">
                <div style="font-weight:700; font-size:0.85rem;" id="sp-name"></div>
                <div style="font-size:0.75rem; color:#555;">Baru saja membeli</div>
            </div>
        </div>
        ` : ''}

        <!-- Lightbox Modal -->
        <div id="lightbox" class="lightbox-overlay" onclick="if(event.target === this) closeLightbox()">
            <div class="lightbox-content">
                <div class="lightbox-close" onclick="closeLightbox()">&times;</div>
                <img id="lb-img" class="lightbox-media" style="display:none">
                <video id="lb-vid" class="lightbox-media" controls style="display:none"></video>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        // Init Product Swiper - OPTIMIZED SMOOTHNESS
        const swiper = new Swiper('.product-swiper', {
            pagination: { el: '.swiper-pagination' },
            loop: false, 
            autoHeight: false,
            // Optimized touch settings for native app feel
            speed: 500,
            resistance: true,
            resistanceRatio: 0.85,
            touchRatio: 1,
            touchStartPreventDefault: false, // Critical for video touch
            on: {
                // FORCE Pause video when sliding away
                slideChange: function () {
                    const videos = document.querySelectorAll('video');
                    videos.forEach(v => v.pause());
                    const iframes = document.querySelectorAll('iframe');
                    iframes.forEach(i => {
                         const src = i.src;
                         i.src = src; 
                    });
                }
            }
        });

        // Variant Switching Logic (Responsive)
        function changeVariant(btn, imageUrl) {
            document.querySelectorAll('.v-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if(imageUrl) {
                const mainImg = document.getElementById('mainImage');
                if(mainImg) {
                   mainImg.src = imageUrl;
                   const hasVideo = ${data.videoDemo ? 'true' : 'false'};
                   swiper.slideTo(hasVideo ? 1 : 0);
                }
            }
        }
        
        // Lightbox Logic
        function openLightbox(url) {
            const lb = document.getElementById('lightbox');
            const img = document.getElementById('lb-img');
            const vid = document.getElementById('lb-vid');
            
            img.style.display = 'none';
            vid.style.display = 'none';
            vid.pause();
            
            lb.classList.add('active');
            
            if (url.includes('.mp4')) {
                vid.src = url;
                vid.style.display = 'block';
                vid.play();
            } else {
                img.src = url;
                img.style.display = 'block';
            }
        }
        
        function closeLightbox() {
            const lb = document.getElementById('lightbox');
            lb.classList.remove('active');
            const vid = document.getElementById('lb-vid');
            vid.pause();
            vid.src = "";
        }

        // Timer Logic
        ${data.urgencyTimer?.enabled ? `
        function startTimer(duration) {
            let timer = duration * 60;
            const h = document.getElementById('fs-h');
            const m = document.getElementById('fs-m');
            const s = document.getElementById('fs-s');
            
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

                if (--timer < 0) {
                    timer = duration * 60;
                }
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
        const spName = document.getElementById('sp-name');
        const spImg = document.getElementById('sp-img');

        function showSocial() {
            const name = names[Math.floor(Math.random() * names.length)].trim();
            const city = cities[Math.floor(Math.random() * cities.length)].trim();
            
            let avatarUrl;
            if (avatars.length > 0) {
                avatarUrl = avatars[Math.floor(Math.random() * avatars.length)].trim();
            } else {
                avatarUrl = 'https://ui-avatars.com/api/?name=' + name + '&background=random';
            }
            
            spName.innerText = name + ' dari ' + city;
            spImg.src = avatarUrl;
            
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
