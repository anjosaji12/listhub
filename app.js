/* ─────────────────────────────────────────────
   ListHub – app.js
───────────────────────────────────────────── */

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

/* ── LOGIN MODAL ── */
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    loginModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (loginModal) {
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal();
  });
}
function closeModal() {
  loginModal.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && loginModal && loginModal.classList.contains('open')) closeModal();
});

/* ── SEARCH ── */
function fillSearch(text) {
  const input = document.getElementById('searchInput');
  if (input) { input.value = text; input.focus(); }
}
function doSearch() {
  const q = document.getElementById('searchInput')?.value;
  const cat = document.getElementById('searchCategory')?.value;
  const loc = document.getElementById('locationInput')?.value;
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (cat && cat !== 'all') params.set('cat', cat);
  if (loc) params.set('loc', loc);
  window.location.href = `listings.html?${params.toString()}`;
}
document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});

/* ── CITY PICKER ── */
function setCity(city) {
  const loc = document.getElementById('locationInput');
  if (loc) { loc.value = city; }
  showToast(`📍 Location set to ${city}`);
}

/* ── NAVIGATE ── */
function goTo(url) { window.location.href = url; }

/* ── TOAST ── */
function showToast(msg, icon = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon || '✅'}</span><span class="toast-text">${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── LISTINGS DATA ── */
const LISTINGS = [
  // Jobs
  { id:1, cat:'jobs', title:'Senior Software Engineer', loc:'San Francisco, CA', price:'$145,000/yr', emoji:'💻', time:'2h ago', desc:'Join our fast-growing fintech startup. We need a senior fullstack engineer with React/Node experience.', tags:['Full-time','Remote OK'] },
  { id:2, cat:'jobs', title:'UX/UI Designer', loc:'New York, NY', price:'$95,000/yr', emoji:'🎨', time:'5h ago', desc:'Lead product design for a SaaS platform. Figma expertise required. Hybrid role.', tags:['Full-time','Hybrid'] },
  { id:3, cat:'jobs', title:'Medical Assistant', loc:'Chicago, IL', price:'$48,000/yr', emoji:'🩺', time:'1d ago', desc:'Growing clinic looking for a certified medical assistant with 2+ years experience.', tags:['Full-time','On-site'] },
  { id:4, cat:'jobs', title:'Marketing Manager', loc:'Austin, TX', price:'$85,000/yr', emoji:'📊', time:'3h ago', desc:'Lead our B2B marketing campaigns. Experience with HubSpot and content strategy preferred.', tags:['Full-time','Remote'] },
  { id:5, cat:'jobs', title:'Delivery Driver', loc:'Los Angeles, CA', price:'$22/hr', emoji:'🚚', time:'6h ago', desc:'Sign on bonus available. Flexible hours, fuel reimbursement, reliable vehicle required.', tags:['Part-time','Flexible'] },
  { id:6, cat:'jobs', title:'Data Analyst', loc:'Seattle, WA', price:'$110,000/yr', emoji:'📈', time:'4h ago', desc:'Help us turn data into actionable insights. SQL, Python, and Tableau skills required.', tags:['Full-time','Remote'] },

  // Housing
  { id:7, cat:'housing', title:'Modern Studio Apartment', loc:'Brooklyn, NY', price:'$1,650/mo', emoji:'🏠', time:'1h ago', desc:'Newly renovated studio in prime Williamsburg location. Natural light, open kitchen, laundry in building.', tags:['Studio','Pets OK'] },
  { id:8, cat:'housing', title:'2BR Apartment, Great Light', loc:'Chicago, IL', price:'$1,900/mo', emoji:'🛋️', time:'3h ago', desc:'Sunny 2 bed 1 bath on the 4th floor. Hardwood floors, exposed brick, steps from the L train.', tags:['2 Bed','No Pets'] },
  { id:9, cat:'housing', title:'Private Room in Shared House', loc:'Austin, TX', price:'$850/mo', emoji:'🚪', time:'7h ago', desc:'Furnished room available in a 4-bedroom house shared with working professionals. Utilities included.', tags:['Room','Furnished'] },
  { id:10, cat:'housing', title:'Cozy Cottage for Rent', loc:'Portland, OR', price:'$2,100/mo', emoji:'🏡', time:'2d ago', desc:'Charming 1br cottage with private yard. Walking distance to cafes and transit lines.', tags:['1 Bed','Yard'] },

  // For Sale
  { id:11, cat:'forsale', title:'iPhone 15 Pro 256GB', loc:'Miami, FL', price:'$950', emoji:'📱', time:'30m ago', desc:'Excellent condition, no scratches. Natural titanium. Comes with original box and charger.', tags:['Electronics','Like New'] },
  { id:12, cat:'forsale', title:'Mid-Century Modern Sofa', loc:'Denver, CO', price:'$380', emoji:'🛋️', time:'2h ago', desc:'Beautiful walnut legs, teal upholstery. Moving sale — must go this weekend. Local pickup only.', tags:['Furniture','Pickup Only'] },
  { id:13, cat:'forsale', title:'Trek Mountain Bike 2022', loc:'Boulder, CO', price:'$650', emoji:'🚴', time:'4h ago', desc:'Trek Marlin 5, size M. Lightly used, great condition. New tires, fresh tune-up.', tags:['Bikes','Lightly Used'] },
  { id:14, cat:'forsale', title:'MacBook Pro M2, 16GB', loc:'San Jose, CA', price:'$1,200', emoji:'💻', time:'1h ago', desc:'MacBook Pro 14" M2 chip. Space gray, 1TB SSD. AppleCare until 2026.', tags:['Electronics','Excellent'] },
  { id:15, cat:'forsale', title:'PlayStation 5 Bundle', loc:'Phoenix, AZ', price:'$500', emoji:'🎮', time:'5h ago', desc:'PS5 disc edition with 2 controllers and 3 games. All original accessories included.', tags:['Gaming','Like New'] },
  { id:16, cat:'forsale', title:'Vintage Leather Jacket', loc:'Nashville, TN', price:'$180', emoji:'🧥', time:'3h ago', desc:'Genuine leather, size M. Light brown with brown buttons. 90s vintage, excellent condition.', tags:['Clothing','Vintage'] },

  // Gigs
  { id:17, cat:'gigs', title:'Website Designer Needed', loc:'Remote', price:'$500–$1,200', emoji:'🖥️', time:'1h ago', desc:'Looking for a freelancer to redesign our small business website. WordPress preferred.', tags:['Computer','Remote'] },
  { id:18, cat:'gigs', title:'Weekend Music Gig', loc:'New York, NY', price:'$300/night', emoji:'🎵', time:'3h ago', desc:'Live jazz band needed for restaurant Friday and Saturday nights. 3-hour sets, 9pm–midnight.', tags:['Creative','Weekly'] },
  { id:19, cat:'gigs', title:'Pet Sitter Wanted', loc:'Los Angeles, CA', price:'$30/visit', emoji:'🐾', time:'8h ago', desc:'Need someone to watch our golden retriever while we travel for 2 weeks in April.', tags:['Pet Care','On-site'] },
  { id:20, cat:'gigs', title:'Furniture Assembly Help', loc:'Chicago, IL', price:'$80', emoji:'🔧', time:'2h ago', desc:'Need help assembling IKEA furniture. 5 pieces total. Cash paid same day.', tags:['Labor','One-time'] },
];

/* ── FEATURED TAB SWITCHER ── */
let activeTab = 'all';
function switchTab(el, tab) {
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  activeTab = tab;
  renderFeatured();
}
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const items = activeTab === 'all' ? LISTINGS.slice(0, 8) : LISTINGS.filter(l => l.cat === activeTab).slice(0, 8);
  if (items.length === 0) {
    grid.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><h3>No listings found</h3><p>Try a different category or check back later.</p></div>`;
    return;
  }
  grid.innerHTML = items.map(item => listingCard(item)).join('');
}
function listingCard(item) {
  const badgeClass = { jobs:'badge-jobs',housing:'badge-housing',forsale:'badge-forsale',gigs:'badge-gigs',services:'badge-services' }[item.cat] || 'badge-jobs';
  const catLabel = { jobs:'Jobs',housing:'Housing',forsale:'For Sale',gigs:'Gigs',services:'Services' }[item.cat] || item.cat;
  return `
  <div class="listing-card" onclick="goToDetail(${item.id})">
    <div class="listing-img">
      <span class="listing-badge ${badgeClass}">${catLabel}</span>
      <span style="font-size:56px">${item.emoji}</span>
      <button class="listing-fav" onclick="event.stopPropagation(); toggleFav(this)" aria-label="Save listing">♡</button>
    </div>
    <div class="listing-body">
      <div class="listing-title">${item.title}</div>
      <div class="listing-meta">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${item.loc}
      </div>
      <div class="listing-price">${item.price}</div>
      <div class="listing-footer">
        <span class="listing-time">${item.time}</span>
        <span class="listing-contact">Contact →</span>
      </div>
    </div>
  </div>`;
}
function toggleFav(btn) {
  const saved = btn.innerHTML === '♡';
  btn.innerHTML = saved ? '♥' : '♡';
  btn.style.color = saved ? '#FF6B6B' : '';
  showToast(saved ? '❤️ Saved to favorites' : 'Removed from favorites');
}
function goToDetail(id) {
  window.location.href = `listing-detail.html?id=${id}`;
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();

  // Animate numbers in stats
  document.querySelectorAll('.stat-num').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
  });
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => statsObs.observe(el));

  // Animate category cards
  const catObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.cat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.5s ease';
    catObs.observe(el);
  });
});
