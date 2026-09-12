document.addEventListener('DOMContentLoaded', () => {
  // 1. DRAWER POP-UP LOGIC
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerMenu = document.getElementById('drawerMenu');
  const openDrawerBtn = document.getElementById('openDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawer');

  function openDrawer() {
    drawerOverlay.classList.add('active');
    drawerMenu.classList.add('active');
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('active');
    drawerMenu.classList.remove('active');
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 2. RENDER CARDS LOGIC
  const cardsContainer = document.getElementById('cardsContainer');
  const searchInput = document.getElementById('searchInput');
  const tabButtons = document.querySelectorAll('.tab-btn');

  let currentFilter = 'ALL';
  let currentSearch = '';

  function renderCards() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';

    const filteredData = scrapeButtonsData.filter(item => {
      // Filter Method
      const matchesMethod = (currentFilter === 'ALL') || 
                            (item.method === currentFilter) || 
                            (item.method === 'ANY');

      // Search Filter
      const matchesSearch = item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            item.description.toLowerCase().includes(currentSearch.toLowerCase());

      return matchesMethod && matchesSearch;
    });

    if (filteredData.length === 0) {
      cardsContainer.innerHTML = `<div style="text-align:center; color:#555; padding: 20px; font-size:0.85rem;">Tidak ada scrape ditemukan.</div>`;
      return;
    }

    filteredData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'scrape-card';

      card.innerHTML = `
        <div class="card-top">
          <span class="badge-method">${item.method}</span>
          <a href="${item.previewUrl}" class="btn-preview">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            Preview
          </a>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <p class="card-author">Oleh: ${item.author}</p>
        <a href="${item.targetUrl}" class="card-btn-action">Open
        </a>
      `;

      cardsContainer.appendChild(card);
    });
  }

  // Filter Method Event
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-method');
      renderCards();
    });
  });

  // Search Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      renderCards();
    });
  }

  // Initial Render
  renderCards();
});
