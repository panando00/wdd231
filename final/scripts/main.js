
const nav = document.getElementById('primary-nav');
const btn = document.querySelector('.menu-btn');
if (btn) btn.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  nav.style.display = open ? 'none' : 'block';
});
const nowYear = document.getElementById('year');
if (nowYear) nowYear.textContent = new Date().getFullYear();
const videoLink = document.getElementById('videoLink');
if (videoLink) videoLink.href = '#';
const here = document.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav]').forEach(a => {
  const key = a.dataset.nav;
  const map = {home:'index.html', products:'products.html', about:'about.html'};
  if (map[key] === here) a.setAttribute('aria-current', 'page');
});
const visitMsg = document.getElementById('visitMessage');
if (visitMsg) {
  const last = localStorage.getItem('mls:lastVisit');
  const now = Date.now();
  if (!last) visitMsg.textContent = 'Welcome! Let us know if you need any help.';
  else {
    const days = Math.floor((now - Number(last)) / 86400000);
    visitMsg.textContent = days < 1 ? 'Back so soon! Awesome!' : `You last visited ${days} day${days===1?'':'s'} ago.`;
  }
  localStorage.setItem('mls:lastVisit', String(now));
}
async function getProducts() {
  const key = 'mls:products';
  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);
  try {
    const res = await fetch('data/products.json', {cache:'no-store'});
    if (!res.ok) throw new Error('bad');
    const data = await res.json();
    sessionStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (e) {
    const s = document.getElementById('status');
    if (s) s.textContent = 'Unable to load products. Please try again later.';
    return [];
  }
}
function renderCards(items, mount) {
  mount.innerHTML = items.map(p => `
    <article class="card" data-id="${p.id}">
      <img src="${p.image}" width="480" height="320" loading="lazy" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toFixed(2)} <span class="badge">${p.category}</span></p>
      <p>${p.desc}</p>
      <p><button class="btn btn-primary" data-learn="${p.id}">Learn More</button></p>
    </article>
  `).join('');
}
function wireModals() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  const content = document.getElementById('modalContent');
  document.addEventListener('click', e => {
    const id = e.target?.dataset?.learn;
    if (id) {
      const card = document.querySelector(`[data-id="${id}"]`);
      const title = card.querySelector('h3').textContent;
      const img = card.querySelector('img').outerHTML;
      const price = card.querySelector('.price').textContent;
      const desc = card.querySelector('p:nth-of-type(2)').textContent;
      content.innerHTML = `<h2 id="modalTitle">${title}</h2>${img}<p><strong>${price}</strong></p><p>${desc}</p>`;
      modal.setAttribute('aria-hidden','false');
      modal.querySelector('.modal__close')?.focus();
    }
    if (e.target.matches('[data-close]')) modal.setAttribute('aria-hidden','true');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') modal.setAttribute('aria-hidden','true');
  });
}
function initFilters(all, grid) {
  const q = document.getElementById('q');
  const category = document.getElementById('category');
  const sort = document.getElementById('sort');
  const controls = document.getElementById('controls');
  if (!controls) return;
  const saved = JSON.parse(localStorage.getItem('mls:filters') || '{}');
  if (saved.q) q.value = saved.q;
  if (saved.category) category.value = saved.category;
  if (saved.sort) sort.value = saved.sort;
  function apply() {
    let list = [...all];
    const text = q.value.trim().toLowerCase();
    if (text) list = list.filter(p => [p.name,p.desc,p.category].join(' ').toLowerCase().includes(text));
    if (category.value !== 'all') list = list.filter(p => p.category === category.value);
    const sorts = {
      'name-asc': (a,b)=>a.name.localeCompare(b.name),
      'price-asc': (a,b)=>a.price-b.price,
      'price-desc': (a,b)=>b.price-a.price,
      'rating-desc': (a,b)=>b.rating-a.rating
    };
    list.sort(sorts[sort.value]);
    renderCards(list, grid);
    localStorage.setItem('mls:filters', JSON.stringify({q:q.value,category:category.value,sort:sort.value}));
  }
  controls.addEventListener('input', apply);
  controls.addEventListener('reset', () => { setTimeout(() => { localStorage.removeItem('mls:filters'); apply(); }, 0); });
  apply();
}
const featured = document.getElementById('featuredGrid');
if (featured) getProducts().then(d => renderCards(d.slice(0,3), featured));
const grid = document.getElementById('productsGrid');
if (grid) {
  const status = document.getElementById('status');
  if (status) status.textContent = 'Loading products…';
  getProducts().then(d => {
    renderCards(d, grid);
    wireModals();
    initFilters(d, grid);
    if (status) status.textContent = '';
  });
}
const thanks = document.getElementById('thankyouText');
if (thanks) {
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  if (name) thanks.textContent = `Thank you, ${name}. We’ll reply to your message shortly.`;
}
