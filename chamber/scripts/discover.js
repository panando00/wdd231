const grid = document.querySelector('#discoverGrid');
const visitMsg = document.querySelector('#visitMessage');

function daysBetween(now, then) {
  const msPerDay = 86400000;
  return Math.floor((now - then) / msPerDay);
}

(function handleVisits() {
  const key = 'mgc_last_visit';
  const now = Date.now();
  const prev = Number(localStorage.getItem(key));
  if (!prev) {
    visitMsg.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const days = daysBetween(now, prev);
    if (days < 1) {
      visitMsg.textContent = 'Back so soon! Awesome!';
    } else {
      visitMsg.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }
  localStorage.setItem(key, String(now));
})();

async function loadDiscover() {
  try {
    const resp = await fetch('data/discover.json');
    if (!resp.ok) throw new Error('Network error');
    const items = await resp.json();
    const frag = document.createDocumentFragment();
    items.slice(0, 8).forEach((item, idx) => {
      const card = document.createElement('article');
      card.className = `card poi-${idx + 1}`;
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.alt}" width="${item.width}" height="${item.height}" loading="lazy">
          <figcaption>${item.caption}</figcaption>
        </figure>
        <div class="details">
          <p>${item.description}</p>
          <address>${item.address}</address>
          <a class="btn" href="${item.url}" target="_blank" rel="noopener">Learn More</a>
        </div>
      `;
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  } catch (err) {
    grid.innerHTML = '<p>Unable to load discover items right now.</p>';
  }
}

loadDiscover();

