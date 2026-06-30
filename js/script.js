/* ============================================================
   Mark and Sons Projects — Vanilla JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  runLoadingScreen();

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Navbar scroll + mobile toggle ---------- */
  initNavbar();

  /* ---------- Services (build flip cards) ---------- */
  buildServices();

  /* ---------- Gallery (categorised sliders) ---------- */
  buildGallery();
  initGalleryModal();

  /* ---------- Why-choose stats grid ---------- */
  buildStats();

  /* ---------- Testimonials carousel ---------- */
  initTestimonials();

  /* ---------- Video Showcase ---------- */
  buildVideos();
  initVideoModal();

  /* ---------- Contact (provinces chips + submit) ---------- */
  buildProvinces();
  initContactForm();

  /* ---------- FAQ Chatbot ---------- */
  initChatbot();

  /* ---------- Reveal on scroll ---------- */
  initReveal();
});

/* ============================================================
   Loading Screen
   ============================================================ */
function runLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const fill = document.getElementById('loading-bar-fill');
  const pct = document.getElementById('loading-pct');
  if (!screen || !fill) return;

  const start = window.performance.now();
  const duration = 1200;

  const tick = () => {
    const p = Math.min(100, ((window.performance.now() - start) / duration) * 100);
    fill.style.width = `${p}%`;
    if (pct) pct.textContent = Math.floor(p);

    if (p >= 100) {
      screen.classList.add('hidden');
      return;
    }

    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

/* ============================================================
   Navbar
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const toggleIcon = document.getElementById('nav-toggle-icon');
  const mobile = document.getElementById('nav-mobile');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll); onScroll();

  toggle.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    toggleIcon.src = open ? 'assets/icons/close.svg' : 'assets/icons/menu.svg';
  });
  mobile.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggleIcon.src = 'assets/icons/menu.svg';
    })
  );
}

/* ============================================================
   Services (3D flip cards)
   ============================================================ */
const SERVICES = [
  { title: 'Custom Kitchens', img: 'kitchen-1.jpg', desc: 'Bespoke kitchen cabinetry tailored to your space, lifestyle and aesthetic — from modern minimalist to classic luxury.' },
  { title: 'Wardrobes', img: 'glass_door_walldrope.jpg', desc: 'Walk-in and built-in wardrobes engineered for organization, longevity and a refined finish that lasts decades.' },
  { title: 'Staircases', img: 'staircase-1.jpg', desc: 'Hand-crafted timber staircases — floating, curved or traditional — designed as architectural statements.' },
  { title: 'School Desks', img: 'school-1.jpg', desc: 'Durable, ergonomic school furniture built to withstand daily classroom use across South African schools.' },
  { title: 'Office Desks', img: 'office-1.jpg', desc: 'Executive and operational office desks combining premium materials with intelligent cable management.' },
  { title: 'Ceilings', img: 'ceiling-1.jpg', desc: 'Coffered, beamed and panelled timber ceilings that transform interiors with depth, warmth and character.' },
  { title: 'Shoe Racks', img: 'shoerack-1.jpg', desc: 'Custom built-in shoe storage solutions designed for organization, accessibility and visual elegance.' },
  { title: 'Sliding Doors', img: 'glass_walldrope_3.jpg', desc: 'Smooth-action sliding wooden doors — barn style, room dividers and space-saving entryways.' },
  { title: 'TV Units', img: 'tvunit-1.jpg', desc: 'Floating media walls and integrated entertainment units crafted in premium timber finishes.' },
  { title: 'Cabinets', img: 'kitchen-frank.jpg', desc: 'Bespoke cabinetry for any room — from display cabinets to storage solutions, built to last.' },
  { title: 'Built-in Cupboards', img: 'wardrobe-2.jpg', desc: 'Space-maximizing built-in cupboards designed to your dimensions with seamless integration.' },
  { title: 'Reception Desks', img: 'reception-1.jpg', desc: 'Striking reception desks that define your brand and welcome clients with premium craftsmanship.' },
  { title: 'Shop Fittings', img: 'office-1.jpg', desc: 'Complete retail interiors — display units, counters and fixtures designed to elevate your brand.' },
  { title: 'Custom Furniture', img: 'furniture-1.jpg', desc: 'One-of-a-kind furniture pieces crafted to your exact specifications using premium hardwoods.' },
  { title: 'Wood Renovations', img: 'staircase-2.jpg', desc: 'Restoration and refinishing of existing timber work — staircases, doors, floors and heritage joinery.' },
];
function buildServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="flip-card reveal" style="transition-delay:${i * 0.05}s" data-flip>
      <div class="flip-inner">
        <div class="flip-face flip-front">
          <img src="assets/images/${s.img}" alt="${s.title}" loading="lazy" />
          <div class="grad"></div>
          <div class="caption"><h3>${s.title}</h3><p class="hint">Tap to learn more →</p></div>
          <div class="flip-icon">↻</div>
        </div>
        <div class="flip-face flip-back">
          <div>
            <p class="eyebrow">Service</p>
            <h3>${s.title}</h3>
            <p class="desc">${s.desc}</p>
          </div>
          <a href="#contact" class="btn-quote" data-stop>Request Quote →</a>
        </div>
      </div>
    </div>`).join('');
  grid.querySelectorAll('[data-flip]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-stop]')) return;
      card.classList.toggle('flipped');
    });
  });
}

/* ============================================================
   Gallery (horizontal sliders + lightbox)
   ============================================================ */
const CATEGORIES = [
  { name: 'Kitchens', images: ['glass_and_doorless_kitchen.jpg', 'custom_kitchen.jpg', 'kitchen-1.jpg', 'kitchen-2.jpg', 'Kitchen_4.jpg', 'kitchen-frank.jpg'] },
  { name: 'Wardrobes', images: ['wardrobe-1.jpg', 'glass_door_walldrope.jpg', 'sliding_door_walldrope.jpg', 'walk_in_walldrop.jpg', 'wardrobe-2.jpg'] },
  { name: 'Staircases', images: ['staircase-1.jpg', 'staircase-2.jpg'] },
  { name: 'School Desks', images: ['school-1.jpg'] },
  { name: 'Office Desks', images: ['office-1.jpg', 'reception-1.jpg'] },
  { name: 'Ceilings', images: ['ceiling-1.jpg'] },
  { name: 'Shoe Racks', images: ['shoerack-1.jpg'] },
  { name: 'Sliding Doors', images: ['slidingdoor-1.jpg', 'sliding_door_walldrope.jpg', 'walk_in_walldrop.jpg', 'wardrobe-2.jpg'] },
  { name: 'Custom Furniture', images: ['custom_TV_stand.jpg', 'led_tv_stand.jpg', 'close_Tv_stand.jpg', 'furniture-1.jpg', 'tvunit-1.jpg'] },
];
function buildGallery() {
  const wrap = document.getElementById('gallery-list');
  wrap.innerHTML = CATEGORIES.map(cat => `
    <div class="reveal">
      <div class="gallery-cat-head">
        <h3>${cat.name}</h3>
        <span class="gallery-swipe">Swipe →</span>
      </div>
      <div class="gallery-row">
        ${cat.images.map((img, i) => `
          <button class="gallery-tile" data-img="assets/images/${img}" type="button">
            <img src="assets/images/${img}" alt="${cat.name} project ${i + 1}" loading="lazy" />
            <div class="ov"></div>
            <div class="lbl"><p class="cat">${cat.name}</p><p class="pn">Project ${String(i + 1).padStart(2, '0')}</p></div>
          </button>`).join('')}
      </div>
    </div>`).join('');
}

function initGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const closeBtn = document.getElementById('gallery-modal-close');
  if (!modal || !modalImg || !closeBtn) return;

  const openModal = (tile) => {
    const image = tile.querySelector('img');
    modalImg.src = tile.dataset.img;
    modalImg.alt = image ? image.alt : 'Gallery project image';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    modalImg.src = '';
    modalImg.alt = '';
    document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', (event) => {
    const tile = event.target.closest('.gallery-tile[data-img]');
    if (tile) {
      openModal(tile);
      return;
    }

    if (!modal.hidden && (event.target === modal || event.target.classList.contains('gallery-modal-backdrop'))) {
      closeModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}
/* ============================================================
   Why Choose Us stats
   ============================================================ */
const STATS = [
  { icon: 'award.svg', k: '15+', v: 'Years Experience' },
  { icon: 'heart.svg', k: '99.99%', v: 'Client Satisfaction' },
  { icon: 'map-pin.svg', k: '9', v: 'Provinces Covered' },
  { icon: 'users.svg', k: '500+', v: 'Projects Delivered' },
  { icon: 'hammer.svg', k: '100%', v: 'Custom Craft' },
  { icon: 'shield-check.svg', k: 'Quality', v: 'Guaranteed' },
];
function buildStats() {
  const g = document.getElementById('stats-grid');
  g.innerHTML = STATS.map((s, i) => `
    <div class="stat-card reveal" style="transition-delay:${i * 0.06}s">
      <div class="sc-ic"><img src="assets/icons/${s.icon}" alt=""/></div>
      <p class="sc-k">${s.k}</p>
      <p class="sc-v">${s.v}</p>
    </div>`).join('');
}

/* ============================================================
   Testimonials Carousel
   ============================================================ */
const REVIEWS = [
  {
    name: 'Nomvula Dlamini', role: 'Homeowner · Johannesburg', initials: 'ND', color: 'linear-gradient(135deg,#fb7185,#db2777)',
    text: "Frank and his team built our dream kitchen. The attention to detail and finish quality is unmatched — every cabinet closes like silk. Truly award-winning work."
  },
  {
    name: 'Pieter van der Merwe', role: 'Property Developer · Cape Town', initials: 'PV', color: 'linear-gradient(135deg,#38bdf8,#2563eb)',
    text: "We've used Mark and Sons on three developments. On time, on budget, and every single client compliments the joinery. They've become our default carpentry partner."
  },
  {
    name: 'Thandi Mokoena', role: 'School Principal · Pretoria', initials: 'TM', color: 'linear-gradient(135deg,#fbbf24,#ea580c)',
    text: "Our entire school was refurnished with desks built to last. Two years later, not a single repair needed. The craftsmanship genuinely impressed our board."
  },
  {
    name: 'Sipho Ndlovu', role: 'Business Owner · Durban', initials: 'SN', color: 'linear-gradient(135deg,#34d399,#0d9488)',
    text: "The reception desk they crafted for our offices is now our biggest brand statement. Visitors comment on it daily. Worth every cent and more."
  },
  {
    name: 'Anita Pillay', role: 'Interior Designer · Sandton', initials: 'AP', color: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
    text: "I specify Mark and Sons on all my high-end projects. Frank understands design intent and delivers with consistency you simply cannot find elsewhere."
  },
];
let tIdx = 0, tTimer;
function initTestimonials() {
  const stars = document.getElementById('testimonial-stars');
  stars.innerHTML = Array.from({ length: 5 }).map(() => `<img src="assets/icons/star.svg" alt=""/>`).join('');
  const dots = document.getElementById('t-dots');
  dots.innerHTML = REVIEWS.map((_, i) => `<button class="t-dot" data-i="${i}" aria-label="Review ${i + 1}"></button>`).join('');
  dots.querySelectorAll('button').forEach(b => b.addEventListener('click', () => showReview(+b.dataset.i, true)));
  document.getElementById('t-prev').addEventListener('click', () => showReview((tIdx - 1 + REVIEWS.length) % REVIEWS.length, true));
  document.getElementById('t-next').addEventListener('click', () => showReview((tIdx + 1) % REVIEWS.length, true));
  showReview(0);
  tTimer = setInterval(() => showReview((tIdx + 1) % REVIEWS.length), 6000);
}
function showReview(i, manual) {
  tIdx = i;
  const r = REVIEWS[i];
  document.getElementById('testimonial-text').textContent = `"${r.text}"`;
  document.getElementById('testimonial-name').textContent = r.name;
  document.getElementById('testimonial-role').textContent = r.role;
  const a = document.getElementById('testimonial-avatar');
  a.textContent = r.initials; a.style.background = r.color;
  document.querySelectorAll('#t-dots .t-dot').forEach((d, j) => d.classList.toggle('active', j === i));
  if (manual && tTimer) { clearInterval(tTimer); tTimer = setInterval(() => showReview((tIdx + 1) % REVIEWS.length), 6000); }
}

/* ============================================================
   Video Showcase
   ============================================================ */
const VIDEOS = [
  { src: 'assets/videos/video_one.mp4', title: 'Custom Kitchen Build', desc: 'A closer look at fitted cabinetry and premium carpentry finishes.' },
  { src: 'assets/videos/video_two.mp4', title: 'Workshop Craft', desc: 'Woodwork details, assembly, and the hands-on process behind each project.' },
  { src: 'assets/videos/video_three.mp4', title: 'Finished Installation', desc: 'Completed joinery shown in place, ready for everyday use.' },
];
function buildVideos() {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = VIDEOS.map((v, i) => `
    <button class="video-card reveal" style="transition-delay:${i * 0.08}s" data-video="${v.src}" type="button">
      <div class="video-thumb">
        <video src="${v.src}" muted playsinline preload="metadata" aria-label="${v.title}"></video>
        <div class="ov"></div>
        <div class="play-btn"><span><img src="assets/icons/play.svg" alt=""/></span></div>
      </div>
      <div class="video-meta"><h3>${v.title}</h3><p>${v.desc}</p></div>
    </button>`).join('');
}

function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('video-frame');
  const closeBtn = document.getElementById('video-modal-close');

  const closeModal = () => {
    modal.hidden = true;
    player.pause();
    player.removeAttribute('src');
    player.load();
    document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-video]');
    if (!card) return;
    player.src = card.dataset.video;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    player.play().catch(() => { });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.classList.contains('video-modal-backdrop')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}
/* ============================================================
   Contact — Provinces + Submit
   ============================================================ */
const PROVINCES = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'];
function buildProvinces() {
  document.getElementById('provinces').innerHTML = PROVINCES.map(p => `<span>${p}</span>`).join('');
}
function initContactForm() {
  const form = document.getElementById('quote-form');
  const btn = document.getElementById('submit-btn');
  const label = document.getElementById('submit-label');
  const icon = document.getElementById('submit-icon');
  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.classList.add('sent');
    label.textContent = 'Message sent';
    icon.src = 'assets/icons/check.svg';
    setTimeout(() => {
      btn.classList.remove('sent');
      label.textContent = 'Send request';
      icon.src = 'assets/icons/send.svg';
      form.reset();
    }, 5000);
  });
}

/* ============================================================
   FAQ Chatbot Logic
   ============================================================ */
const FAQS = [
  { q: 'How do I request a quote?', a: 'Use the contact form above, WhatsApp us, or email markandsonssp@gmail.com. We reply within one business day with a clear, itemised quote.' },
  { q: 'Where are you based?', a: 'Our main headquarters is in Tzaneen, Limpopo, and we serve clients across South Africa.' },
  { q: 'How long does a project take?', a: 'Most kitchens and wardrobes take 3-6 weeks from sign-off to install. Smaller pieces (desks, TV units) can be 1-2 weeks. We confirm an exact timeline before starting.' },
  { q: 'Do you work outside my province?', a: 'Yes - we serve all 9 provinces of South Africa. For projects outside Limpopo, travel and installation logistics are included clearly in the quote.' },
  { q: 'What materials do you use?', a: 'Premium hardwoods (oak, walnut, ash), high-grade plywoods, supawood and melamine. We match the material to your budget, climate and durability needs.' },
  { q: 'Do you do custom work?', a: 'Absolutely. Every project is built bespoke to your space, design preferences and brief. Bring sketches, photos or just an idea.' },
  { q: 'Do you offer a guarantee?', a: 'Yes. All workmanship is guaranteed and we stand behind every install. We\u0027ve maintained a 99.99% client satisfaction record for 15+ years.' },
  { q: 'Can I send photos on WhatsApp?', a: 'Yes. Send photos, measurements, sketches, or inspiration pictures on WhatsApp to 079 589 8361 so we can understand the project faster.' },
  { q: 'What services do you offer?', a: 'We build custom kitchens, wardrobes, staircases, built-in cupboards, school desks, office furniture, reception desks, TV units, shop fittings, ceilings, shoe racks, and other custom woodwork.' },
  { q: 'Do you install the work?', a: 'Yes. We handle build and installation, and we plan fitting dates with you before the project starts.' },
  { q: 'Can you help with design ideas?', a: 'Yes. We can guide layout, finishes, storage ideas, and practical material choices based on your space and budget.' },
  { q: 'What details should I send for a quote?', a: 'Send your location, rough measurements, photos of the space, the service you need, preferred finish or material, and your ideal timeline.' },
  { q: 'Do you work with businesses and schools?', a: 'Yes. We work with homeowners, schools, offices, shops, developers, and government or commercial projects.' },
];
function initChatbot() {
  const toggle = document.getElementById('chat-toggle');
  const win = document.getElementById('chat-window');
  const icon = document.getElementById('chat-toggle-icon');
  const msgs = document.getElementById('chat-messages');
  const quick = document.getElementById('chat-quick');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  // Quick action buttons
  quick.innerHTML = FAQS.slice(0, 4).map(f => `<button data-q="${f.q.replace(/"/g, '&quot;')}">${f.q}</button>`).join('');
  // Initial bot greeting
  addMsg('bot', 'Hi! 👋 I\'m the Mark and Sons assistant. Pick a question below or type your own.');

  const setChatOpen = (open) => {
    win.hidden = !open;
    win.classList.toggle('is-open', open);
    icon.src = open ? 'assets/icons/close.svg' : 'assets/icons/chatbot.svg';
    toggle.setAttribute('aria-expanded', String(open));
  };

  setChatOpen(false);

  toggle.addEventListener('click', () => {
    const isOpen = !win.hidden;
    setChatOpen(!isOpen);
  });
  quick.addEventListener('click', e => {
    const b = e.target.closest('button'); if (b) answer(b.dataset.q);
  });
  send.addEventListener('click', sendInput);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendInput(); });

  function sendInput() {
    const v = input.value.trim();
    if (!v) return;
    answer(v); input.value = '';
  }
  function answer(q) {
    addMsg('user', q);
    setTimeout(() => {
      const lower = q.toLowerCase();
      let match = FAQS.find(f => f.q.toLowerCase() === lower);
      if (!match) match = FAQS.find(f => f.q.toLowerCase().split(' ').some(w => w.length > 4 && lower.includes(w)));
      const reply = match ? match.a : 'Great question — please reach out via the contact form or WhatsApp and our team will reply within one business day.';
      addMsg('bot', reply);
    }, 500);
  }
  function addMsg(from, text) {
    const el = document.createElement('div');
    el.className = 'chat-bubble ' + from;
    el.textContent = text;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }
}

/* ============================================================
   Reveal on scroll (IntersectionObserver)
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
