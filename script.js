/* ═══════════════════════════════════════════════════
   ALIVIDA ORGANIC — Script v10 CEO EDITION
   ✦ Telegram · Social Proof · Premium UX
   ✦ Award-level Interactive · Publish Ready
   ═══════════════════════════════════════════════════ */

// ── TELEGRAM CONFIG ──
const TG_BOT = '8237807471:AAHTK6SMxDFK-p4MvwzLZa1pFXrSySQvZdI';
const TG_CHATS = ['524551673', '-5185773061', '1691140865']; // Personal + Group + New Admin

// ── PRELOADER ──
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    setTimeout(() => {
      pre.classList.add('hide');
      setTimeout(() => { pre.remove(); boot(); }, 600);
    }, 400);
  } else {
    boot();
  }
});

// ── MAIN BOOT ──
function boot() {
  document.body.style.overflow = '';
  const modules = [
    ['nav', initNav],
    ['scroll-progress', initScrollProgress],
    ['swipers', initSwipers],
    ['video', initVideoPlayback],
    ['phone1', () => initPhoneMask('f-phone')],
    ['phone2', () => initPhoneMask('cta-phone')],
    ['floating', initFloating],
    ['animations', initAnimations],
    ['counters', initCounters],
    ['parallax', initParallax],
    ['tilt', initCardTilt],
    ['typing', initTypingEffect],
    ['smooth', initSmoothAnchors],
    ['social-proof', initSocialProof],
    ['live-visitors', initLiveVisitors],
  ];
  modules.forEach(([name, fn]) => {
    try { fn(); } catch (e) { console.warn(`[${name}] type error:`, e); }
  });
}

// ══════════════════════════
// TOAST NOTIFICATIONS
// ══════════════════════════
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toast-icon');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;

  icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.className = `toast toast-${type} show`;
  text.textContent = message;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.classList.remove('show'); }, 4500);
}

// ══════════════════════════
// NAVBAR
// ══════════════════════════
function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const allLinks = document.querySelectorAll('.nav-link');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (nav) nav.classList.toggle('scrolled', scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
      allLinks.forEach(l => l.classList.toggle('active', l.dataset.section === cur));
      ticking = false;
    });
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    allLinks.forEach(l => l.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }
}

// ══════════════════════════
// SMOOTH ANCHOR SCROLLING
// ══════════════════════════
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

// ══════════════════════════
// SCROLL PROGRESS BAR
// ══════════════════════════
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? (scrollY / h * 100) + '%' : '0';
      ticking = false;
    });
  }, { passive: true });
}

// ══════════════════════════
// SWIPER CAROUSELS
// ══════════════════════════
function initSwipers() {
  if (typeof Swiper === 'undefined') { console.warn('Swiper not loaded'); return; }

  new Swiper('.video-swiper', {
    slidesPerView: 1.15,
    spaceBetween: 16,
    grabCursor: true,
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
    speed: 800,
    pagination: { el: '.swiper-pagination-videos', clickable: true },
    breakpoints: {
      480: { slidesPerView: 1.8, spaceBetween: 16 },
      640: { slidesPerView: 2.5, spaceBetween: 18 },
      1024: { slidesPerView: 3.5, spaceBetween: 22 },
    },
  });

  new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    speed: 700,
    pagination: { el: '.swiper-pagination-reviews', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 18 },
      1024: { slidesPerView: 3, spaceBetween: 22 },
    },
  });
}

// ══════════════════════════
// VIDEO PLAYBACK
// ══════════════════════════
function initVideoPlayback() {
  document.addEventListener('click', (e) => {
    const overlay = e.target.closest('.video-overlay');
    const inner = e.target.closest('.video-card-inner');
    if (!overlay && !inner) return;

    const container = inner || overlay.closest('.video-card-inner');
    if (!container) return;

    const video = container.querySelector('video');
    const ov = container.querySelector('.video-overlay');
    if (!video || !ov) return;

    document.querySelectorAll('.video-card-inner video').forEach(v => {
      if (v !== video && !v.paused) {
        v.pause(); v.muted = true; v.currentTime = 0;
        const otherOv = v.closest('.video-card-inner')?.querySelector('.video-overlay');
        if (otherOv) otherOv.classList.remove('hidden');
      }
    });

    if (video.paused) {
      video.muted = false;
      video.play().catch(() => { video.muted = true; video.play().catch(() => { }); });
      ov.classList.add('hidden');
    } else {
      video.pause();
      ov.classList.remove('hidden');
    }
  });
}

// ══════════════════════════
// PHONE MASK +998
// ══════════════════════════
function initPhoneMask(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    let val = el.value.replace(/\D/g, '');
    if (!val.startsWith('998')) val = '998' + val.replace(/^998*/, '');
    let fmt = '+998';
    const d = val.slice(3);
    if (d.length > 0) fmt += ' ' + d.slice(0, 2);
    if (d.length > 2) fmt += ' ' + d.slice(2, 5);
    if (d.length > 5) fmt += ' ' + d.slice(5, 7);
    if (d.length > 7) fmt += ' ' + d.slice(7, 9);
    el.value = fmt;
  });
  el.addEventListener('focus', () => { if (!el.value) el.value = '+998 '; });
}

// ══════════════════════════
// FLOATING CTA & BACK TO TOP
// ══════════════════════════
function initFloating() {
  const floatCta = document.getElementById('float-cta');
  const btt = document.getElementById('btt');
  const waBtn = document.getElementById('phone-float');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const show = scrollY > 500;
      if (floatCta) floatCta.classList.toggle('show', show);
      if (btt) btt.classList.toggle('show', show);
      if (waBtn) waBtn.classList.toggle('show', show);
      ticking = false;
    });
  }, { passive: true });
}

// ══════════════════════════
// PARALLAX ORB MOVEMENT
// ══════════════════════════
function initParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;
  let lastX = 0, lastY = 0;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 25;
    const y = (e.clientY / window.innerHeight - 0.5) * 25;
    // Smoothing
    lastX += (x - lastX) * 0.15;
    lastY += (y - lastY) * 0.15;
    orbs.forEach((orb, i) => {
      const f = [1, -0.7, 0.5][i] || 0.5;
      orb.style.transform = `translate(${lastX * f}px, ${lastY * f}px)`;
    });
  }, { passive: true });
}

// ══════════════════════════
// CARD TILT EFFECT
// ══════════════════════════
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return; // Skip on touch
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

// ══════════════════════════
// HERO TYPING EFFECT
// ══════════════════════════
function initTypingEffect() {
  const el = document.querySelector('.typing-text');
  if (!el) return;
  const words = ['Salomatlik', 'Immunitet', 'Energiya', 'Kuch', 'Hayot'];
  let wordI = 0, charI = 0, deleting = false;
  function tick() {
    const word = words[wordI];
    if (!deleting) {
      el.textContent = word.slice(0, ++charI);
      if (charI === word.length) {
        setTimeout(() => { deleting = true; tick(); }, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --charI);
      if (charI === 0) {
        deleting = false;
        wordI = (wordI + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 80);
  }
  tick();
}

// ══════════════════════════
// GSAP ANIMATIONS
// ══════════════════════════
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // Hero stagger
  const heroEls = document.querySelectorAll('.hero-logo-img, .hero-badge, .hero-title, .hero-desc, .hero-cta, .hero-stats, .scroll-hint');
  heroEls.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.85, delay: 0.12 * i, ease: 'power3.out' }
    );
  });

  if (typeof ScrollTrigger === 'undefined') return;

  // Scroll-triggered fade-in
  const groups = [
    '.product-card', '.step-card', '.stat-card', '.feat',
    '.faq-item', '.section-head', '.big-cta-card',
    '.mid-cta-inner', '.order-info', '.order-form',
    '.video-card', '.rev-card',
  ];
  groups.forEach(sel => {
    const els = document.querySelectorAll(sel);
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7,
          delay: i * 0.09,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  });

  // Section head slide-in
  document.querySelectorAll('.section-head h2').forEach(h => {
    gsap.fromTo(h,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: h, start: 'top 85%', once: true }
      }
    );
  });
}

// ══════════════════════════
// COUNTER ANIMATION
// ══════════════════════════
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    if (isNaN(target)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(el);
        animateCounter(el, target);
      });
    }, { threshold: 0.3 });
    obs.observe(el);
  });
}

function animateCounter(el, target) {
  const dur = 2200;
  const start = performance.now();
  function tick() {
    const elapsed = performance.now() - start;
    const prog = Math.min(elapsed / dur, 1);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.round(target * ease);
    if (prog < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

// ══════════════════════════
// FAQ TOGGLE
// ══════════════════════════
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  document.querySelectorAll('.faq-item.open').forEach(i => { if (i !== item) i.classList.remove('open'); });
  item.classList.toggle('open');
}

// ══════════════════════════
// MODAL
// ══════════════════════════
const PRODUCTS = {
  abihayat: {
    title: 'ABIHAYAT DAMLAMASI',
    sub: 'Tabiiy shifobaxsh damchilar · 30ml',
    img: 'AbiHayat.jpg',
    desc: 'ABIHAYAT DAMLAMASI — qondagi qand miqdorini me\'yorlashtirish va qon bosimini barqarorlashtirish uchun maxsus ishlab chiqilgan tabiiy vosita.',
    benefits: ['Qondagi qandni me\'yorlashtiradi', 'Qon bosimini normallashtiradi', 'Qandli diabet asoratlarini yoʻqotadi', 'Immunitetni mustahkamlaydi', 'Umumiy quvvatni oshiradi'],
    usage: '2 mahal ovqatdan keyin 200 ml qaynagan suvga solib ichiladi.'
  },
  alivida: {
    title: 'ALIVIDA PLUS',
    sub: 'Bo\'g\'imlar va suyaklar salomatligi · 60 kapsul',
    img: 'alividia_plus.jpg',
    desc: 'ALIVIDA PLUS — bo\'g\'imlar va tayanch-harakat tizimi salomatligini tiklash uchun kuchli tabiiy formula.',
    benefits: ['Boʻgʻimlar salomatligini tiklaydi', 'Ichki va tashqi tarafdan himoya qiladi', 'Yemirilish va yalligʻlanishni ketkazadi', 'Harakatchanlikni oshiradi', 'Og\'riqni kamaytiradi'],
    usage: 'Kuniga 2 mahal, 1 kapsuladan. Ovqat paytida suv bilan ichiladi. Kurs: 30 kun.'
  },
  trioaktiv: {
    title: 'TRIOAKTIV',
    sub: 'Erkaklar salomatligi va quvvati · 90 kapsul',
    img: 'alividia_organic.jpg',
    desc: 'TRIOAKTIV — jinsiy tizim faoliyatini yaxshilash va prostatitni oldini olish uchun maxsus ishlab chiqilgan kompleks.',
    benefits: ['Jinsiy tizimni mustahkamlaydi', 'Prostatitka qarshi kuchli taʼsir koʻrsatadi', 'Jinsiy quvvatni oshiradi', 'Testosteron darajasini oshiradi', 'Umumiy tonusni ko\'taradi'],
    usage: 'Kuniga 3 mahal, 1 kapsuladan. Ovqatdan keyin. Kurs: 30-60 kun.'
  }
};

function openModal(key) {
  const p = PRODUCTS[key];
  if (!p) return;
  const m = document.getElementById('modal');
  const inner = document.getElementById('modal-inner');
  if (!m || !inner) return;

  const map = {
    'abihayat': 'ABIHAYAT DAMLAMASI',
    'alivida': 'ALIVIDA PLUS',
    'trioaktiv': 'TRIOAKTIV'
  };
  const pName = map[key] || '';

  inner.innerHTML = `
    <div class="modal-product-header">
      <img src="${p.img}" alt="${p.title}" class="modal-product-img" width="120" height="120">
      <h2 id="modal-title">${p.title}</h2>
      <p class="msub">${p.sub}</p>
    </div>
    <p>${p.desc}</p>
    <h3>Foydali xususiyatlar</h3>
    <ul>${p.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
    <h3>Qo'llanilishi</h3>
    <p>${p.usage}</p>
    <div class="mcta">
      <button class="btn btn-primary" onclick="closeModal(); selectProduct('${pName}')">Buyurtma berish →</button>
    </div>`;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const m = document.getElementById('modal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ══════════════════════════
// TELEGRAM SEND HELPER
// ══════════════════════════
// ══════════════════════════
// TELEGRAM SEND HELPER
// ══════════════════════════
async function sendToTelegram(text) {
  const url = `https://api.telegram.org/bot${TG_BOT}/sendMessage`;

  const promises = TG_CHATS.map(async (chatId) => {
    console.log('[TG] Sending to:', chatId);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      const data = await res.json();
      if (!data.ok) {
        console.error(`[TG] Error for ${chatId}:`, data.description);
        throw new Error(data.description || 'Unknown Telegram Error');
      }
      return data;
    } catch (err) {
      console.error(`[TG] Fetch error for ${chatId}:`, err);
      throw err;
    }
  });

  return Promise.any(promises); // Success if at least one succeeds
}

// ══════════════════════════
// ORDER FORM → TELEGRAM
// ══════════════════════════
async function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const product = document.getElementById('f-product').value;
  const btn = document.getElementById('submit-btn');

  if (!name || !phone || !product) {
    showToast('Iltimos, barcha maydonlarni to\'ldiring', 'error');
    return;
  }
  if (phone.replace(/\D/g, '').length < 12) {
    showToast('Iltimos, to\'liq telefon raqam kiriting', 'error');
    return;
  }

  btn.classList.add('is-loading');
  btn.disabled = true;

  const text = [
    'YANGI BUYURTMA',
    '──────────────────',
    `Ism: ${name}`,
    `Tel: ${phone}`,
    `Mahsulot: ${product}`,
    `Vaqt: ${new Date().toLocaleString('uz-UZ')}`,
    `Sayt: alivida.org`,
    '──────────────────',
  ].join('\n');

  try {
    await sendToTelegram(text);
    showToast('So\'rovingiz yuborildi!', 'success');
  } catch (err) {
    console.warn('Submit error:', err);
    // Even if it fails, we show success to user but log error
    showToast('Xatolik: ' + err.message, 'error');
  }

  btn.classList.remove('is-loading');
  btn.classList.add('is-done');
  setTimeout(() => {
    btn.classList.remove('is-done');
    btn.disabled = false;
    e.target.reset();
  }, 4500);
}

// ══════════════════════════
// QUICK CALL → TELEGRAM
// ══════════════════════════
function quickCall() {
  const el = document.getElementById('cta-phone');
  const btn = document.getElementById('cta-btn');
  const phone = el?.value?.trim();

  if (!phone || phone.replace(/\D/g, '').length < 12) {
    showToast('Iltimos, telefon raqamingizni kiriting', 'error');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Yuborilmoqda...'; }

  const text = [
    'TEZKOR SO\'ROV',
    '──────────────────',
    `Tel: ${phone}`,
    `${new Date().toLocaleString('uz-UZ')}`,
    `Sayt: alivida.org`,
    '──────────────────',
  ].join('\n');

  sendToTelegram(text)
    .then(() => {
      showToast('So\'rovingiz qabul qilindi!', 'success');
      if (el) el.value = '';
    })
    .catch((err) => {
      showToast('Xatolik: ' + err.message, 'error');
    })
    .finally(() => {
      if (btn) { btn.disabled = false; btn.textContent = 'Qo\'ng\'iroq qiling →'; }
    });
}

// ══════════════════════════
// SMART PRODUCT SELECTION
// ══════════════════════════
function selectProduct(val) {
  const form = document.getElementById('order');
  const select = document.getElementById('f-product');

  if (form && select) {
    // Scroll to form
    const y = form.getBoundingClientRect().top + scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });

    // Select option
    select.value = val;

    // Flash effect to show user where to look
    select.style.transition = 'all 0.3s';
    select.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.2)';
    select.style.borderColor = 'var(--g500)';
    setTimeout(() => {
      select.style.boxShadow = '';
      select.style.borderColor = '';
    }, 1500);
  }
}

// ══════════════════════════
// SOCIAL PROOF NOTIFICATIONS
// ══════════════════════════
function initSocialProof() {
  const el = document.getElementById('social-proof');
  const nameEl = document.getElementById('spn-name');
  const prodEl = document.getElementById('spn-product');
  const timeEl = document.getElementById('spn-time');
  if (!el || !nameEl) return;

  const proofs = [
    { name: 'Dilnoza M.', product: 'ABIHAYAT DAMLAMASI', city: 'Toshkent', time: '3 daqiqa oldin' },
    { name: 'Javohir K.', product: 'ALIVIDA PLUS', city: 'Samarqand', time: '7 daqiqa oldin' },
    { name: 'Malika R.', product: 'TRIOAKTIV', city: 'Buxoro', time: '12 daqiqa oldin' },
    { name: 'Alisher N.', product: 'ABIHAYAT DAMLAMASI', city: 'Namangan', time: '18 daqiqa oldin' },
    { name: 'Nodira S.', product: 'ALIVIDA PLUS', city: 'Farg\'ona', time: '24 daqiqa oldin' },
    { name: 'Sardor B.', product: 'TRIOAKTIV', city: 'Andijon', time: '31 daqiqa oldin' },
    { name: 'Gulnora T.', product: 'ABIHAYAT DAMLAMASI', city: 'Xorazm', time: '38 daqiqa oldin' },
    { name: 'Bekzod A.', product: 'ALIVIDA PLUS', city: 'Navoiy', time: '45 daqiqa oldin' },
  ];

  let idx = 0;
  function showNext() {
    const p = proofs[idx % proofs.length];
    nameEl.textContent = p.name;
    prodEl.textContent = p.product + ' buyurtma berdi';
    timeEl.textContent = p.time + ' \u00b7 ' + p.city;
    el.classList.add('show');
    setTimeout(() => { el.classList.remove('show'); }, 5000);
    idx++;
  }

  // First one after 8s, then every 25s
  setTimeout(() => {
    showNext();
    setInterval(showNext, 25000);
  }, 8000);
}

// ══════════════════════════
// LIVE VISITOR COUNT
// ══════════════════════════
function initLiveVisitors() {
  const el = document.getElementById('live-visitors');
  if (!el) return;
  function update() {
    const base = 35 + Math.floor(Math.random() * 30);
    el.textContent = base + ' kishi';
  }
  update();
  setInterval(update, 12000);
}
