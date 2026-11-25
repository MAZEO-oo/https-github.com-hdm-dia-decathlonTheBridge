/**
 * Application Principale Decathlon Running
 * Projet Étudiant Decathlon The Bridge
 */

class DecathlonApp {
  constructor() {
    this.currentView = 'home';
    this.cart = this.loadCart();
    this.selectedCategory = 'Tous';
    this.selectedTerrain = 'tous';
    this.priceFilter = 'tous';
    this.searchQuery = '';
    this.currentSort = 'relevance';
    this.activeProductId = null;

    this.init();
  }

  init() {
    this.updateCartBadge();
    this.renderView('home');
    this.bindGlobalEvents();
  }

  loadCart() {
    try {
      return JSON.parse(localStorage.getItem('decathlon_runCart') || '[]');
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem('decathlon_runCart', JSON.stringify(this.cart));
    this.updateCartBadge();
  }

  updateCartBadge() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
    }
  }

  showToast(message) {
    const existing = document.querySelector('.toast-notice');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = `<span>✓</span> <div>${message}</div>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  addToCart(productId, size = '42') {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const existing = this.cart.find(item => item.id === productId && item.size === size);
    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({ id: productId, qty: 1, size: size });
    }

    this.saveCart();
    this.showToast(`<strong>${prod.name}</strong> ajouté au panier !`);
  }

  removeFromCart(productId, size) {
    this.cart = this.cart.filter(item => !(item.id === productId && item.size === size));
    this.saveCart();
    if (this.currentView === 'cart') this.renderCartView();
  }

  updateQty(productId, size, delta) {
    const item = this.cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(productId, size);
      return;
    }

    this.saveCart();
    if (this.currentView === 'cart') this.renderCartView();
  }

  bindGlobalEvents() {
    // Header search
    const headerSearch = document.getElementById('headerSearchInput');
    if (headerSearch) {
      headerSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (this.currentView !== 'catalogue') {
          this.showView('catalogue');
        } else {
          this.renderCatalogueGrid();
        }
      });
    }

    // Hero search
    const heroInput = document.getElementById('heroSearchInput');
    const heroBtn = document.getElementById('btnHeroAsk');
    if (heroBtn && heroInput) {
      const triggerHero = () => {
        const val = heroInput.value.trim();
        if (window.maxBot) {
          window.maxBot.openWithQuery(val || 'Je cherche des conseils pour courir');
        }
      };
      heroBtn.addEventListener('click', triggerHero);
      heroInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') triggerHero();
      });
    }
  }

  showView(viewName, param = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentView = viewName;
    this.renderView(viewName, param);

    // Mise à jour de l'état actif dans la nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });
  }

  renderView(viewName, param) {
    const main = document.getElementById('mainApp');
    if (!main) return;

    if (viewName === 'home') {
      main.innerHTML = this.getHomeHTML();
      this.renderHomeFeatured();
    } else if (viewName === 'catalogue') {
      main.innerHTML = this.getCatalogueHTML();
      this.initCatalogueFilters();
      this.renderCatalogueGrid();
    } else if (viewName === 'product-detail') {
      this.activeProductId = param;
      main.innerHTML = this.getProductDetailHTML(param);
    } else if (viewName === 'cart') {
      main.innerHTML = this.getCartHTML();
    } else if (viewName === 'conseils') {
      main.innerHTML = this.getConseilsHTML();
    } else if (viewName === 'shipping') {
      main.innerHTML = this.getShippingHTML();
    } else if (viewName === 'about') {
      main.innerHTML = this.getAboutHTML();
    }
  }

  // =========================================================================
  // VUES HTML
  // =========================================================================

  getHomeHTML() {
    return `
      <!-- HERO PRINCIPAL AVEC INTÉGRATION DIRECTE MAX -->
      <section class="hero-section">
        <div class="wrap hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="pulse-dot"></span> DECATHLON RUNNING x THE BRIDGE
            </div>
            <h1 class="hero-title">
              Chaque foulée<br><span>vous rapproche.</span>
            </h1>
            <p class="hero-description">
              Le bon équipement fait toute la différence. Posez votre question à <strong>Max</strong>, notre assistant IA expert, ou explorez notre sélection Kiprun testée sur route et sentiers.
            </p>

            <!-- Barre interactive connectée au Chatbot Max -->
            <div class="hero-assistant-box">
              <div class="hero-input-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B6085" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                <input id="heroSearchInput" placeholder="Ex: Chaussure avec amorti pour débuter, semi-marathon, pluie..." aria-label="Posez votre question à Max">
              </div>
              <button class="btn-hero-ask" id="btnHeroAsk">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 4h14v12H10l-5 4z"></path></svg>
                Parler à Max
              </button>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-image-card">
              <img src="assets/hero-runner.webp" alt="Coureur Decathlon Kiprun" onerror="this.src='https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80'">
              <div class="hero-card-floating">
                <div class="floating-text">
                  <b>Nouvelle Gamme Kiprun 2026</b>
                  <span>Plaque carbone & Mousse VFOAM</span>
                </div>
                <button class="btn-primary" style="padding:8px 16px;font-size:13px;" onclick="window.app.showView('catalogue')">Découvrir →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3 CARTES SCÉNARIOS RAPIDES (Directement reprises du prototype Max) -->
      <section class="quick-scenarios-section wrap">
        <div class="section-head">
          <div>
            <span class="section-tag">Diagnostics Express avec Max</span>
            <h2 class="section-title">Quel est votre besoin aujourd'hui ?</h2>
          </div>
          <button class="btn-outline" onclick="window.maxBot.toggleChat(true)">Ouvrir l'assistant →</button>
        </div>

        <div class="quick-cards-grid">
          <div class="quick-card card-blue" onclick="window.maxBot.openWithQuery('Bien choisir mes chaussures')">
            <div class="quick-card-text">
              <h3>Bien choisir<br>mes chaussures</h3>
              <span>Questionnaire en 5 étapes →</span>
            </div>
            <img src="assets/card-shoes.webp" class="quick-card-img" alt="Chaussure running" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80'">
          </div>

          <div class="quick-card card-purple" onclick="window.maxBot.openWithQuery('Comment bien se préparer ?')">
            <div class="quick-card-text">
              <h3>Comment bien<br>se préparer ?</h3>
              <span>Équipement & météo →</span>
            </div>
            <img src="assets/card-prep.png" class="quick-card-img" alt="Préparation running" onerror="this.src='https://images.unsplash.com/photo-1506629905607-d9d8b4c95cfb?auto=format&fit=crop&w=300&q=80'">
          </div>

          <div class="quick-card card-mint" onclick="window.maxBot.openWithQuery('Des conseils pour progresser ?')">
            <div class="quick-card-text">
              <h3>Des conseils pour<br>progresser ?</h3>
              <span>Allure & plans fractionnés →</span>
            </div>
            <img src="assets/card-prog.webp" class="quick-card-img" alt="Progression running" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80'">
          </div>
        </div>
      </section>

      <!-- TERRAINS ET PRATIQUES -->
      <section class="wrap" style="margin-top:40px;">
        <div class="section-head">
          <div>
            <span class="section-tag">Explorez vos terrains</span>
            <h2 class="section-title">Trouvez votre foulée</h2>
          </div>
          <button class="btn-outline" onclick="window.app.showView('catalogue')">Tout le catalogue →</button>
        </div>

        <div class="tiles-grid">
          <div class="terrain-tile" onclick="window.app.filterByTerrain('route')">
            <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80" alt="Route">
            <h3>Route & Bitume</h3>
            <span>Performance et relance →</span>
          </div>

          <div class="terrain-tile" onclick="window.app.filterByTerrain('trail')">
            <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80" alt="Trail">
            <h3>Trail & Sentiers</h3>
            <span>Accroche et protection →</span>
          </div>

          <div class="terrain-tile" onclick="window.app.filterByTerrain('mixte')">
            <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=700&q=80" alt="Débuter">
            <h3>Reprise & Mixte</h3>
            <span>Confort et plaisir à votre rythme →</span>
          </div>

          <div class="terrain-tile" onclick="window.app.showCategory('Accessoires')">
            <img src="https://images.unsplash.com/photo-1506629905607-d9d8b4c95cfb?auto=format&fit=crop&w=700&q=80" alt="Équipement">
            <h3>Accessoires & Tech</h3>
            <span>Montres GPS, lampes, textile →</span>
          </div>
        </div>
      </section>

      <!-- EDITORIAL CONSEIL DECATHLON -->
      <section class="editorial-section wrap">
        <div class="editorial-box">
          <div class="editorial-img-col">
            <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80" alt="Conseil foulée Decathlon">
          </div>
          <div class="editorial-content">
            <span class="section-tag">L'expertise SportsLab Decathlon</span>
            <h2>Une chaussure pensée pour chaque morphologie.</h2>
            <p>
              Votre fréquence de course, votre type de terrain et vos sensations : trois repères simples pour choisir sans hésiter. Nos ingénieurs et nos athlètes partenaires conçoivent des chaussures qui protègent votre corps tout en boostant votre chrono.
            </p>
            <div style="display:flex;gap:14px;flex-wrap:wrap;">
              <button class="btn-primary" onclick="window.app.showView('conseils')">Lire nos conseils foulée</button>
              <button class="btn-outline" onclick="window.maxBot.openWithQuery('Comment bien choisir mes chaussures ?')">Questionner Max</button>
            </div>
          </div>
        </div>
      </section>

      <!-- PRODUITS PHARES / BEST-SELLERS -->
      <section class="wrap" style="margin-bottom:60px;">
        <div class="section-head">
          <div>
            <span class="section-tag">Sélection du moment</span>
            <h2 class="section-title">Les incontournables Kiprun</h2>
          </div>
          <button class="btn-outline" onclick="window.app.showView('catalogue')">Voir les ${PRODUCTS.length} produits →</button>
        </div>
        <div class="products-grid" id="homeFeaturedGrid"></div>
      </section>

      <!-- BÉNÉFICES CLIENTS DECATHLON -->
      <section class="benefits-section">
        <div class="wrap benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <h4>Garantie & Test 365 jours</h4>
              <p>Essayez votre équipement sur vos parcours réels. Retour gratuit pendant 1 an si vous n'êtes pas convaincu.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div>
              <h4>Livraison offerte dès 49€</h4>
              <p>Expédition soignée en 24h ouvrées chez vous ou retrait offert en magasin sous 1 heure.</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div>
              <h4>Conseils d'experts & IA Max</h4>
              <p>Nos conseillers en magasin et Max en ligne vous accompagnent pour chaque kilomètre.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderHomeFeatured() {
    const grid = document.getElementById('homeFeaturedGrid');
    if (!grid) return;
    const featured = PRODUCTS.slice(0, 4);
    grid.innerHTML = featured.map(p => this.createProductCardHTML(p)).join('');
  }

  createProductCardHTML(p) {
    return `
      <article class="product-card">
        <span class="product-badge-tag">${p.tag}</span>
        <div class="product-img-box" onclick="window.app.showView('product-detail', ${p.id})">
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${p.imgFallback}'">
        </div>
        <div class="product-body">
          <div class="product-brand">${p.brand} · ${p.usage}</div>
          <h3 class="product-title" onclick="window.app.showView('product-detail', ${p.id})">${p.name}</h3>
          <div class="product-meta">${p.color}</div>
          <div class="product-rating">
            ★ ★ ★ ★ ★ <span>(${p.reviewsCount} avis)</span>
          </div>
          <div class="product-price-row">
            <div class="product-price">${formatPrice(p.price)}</div>
            <button class="btn-add-cart" onclick="window.app.addToCart(${p.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Ajouter
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // =========================================================================
  // VUE CATALOGUE
  // =========================================================================

  getCatalogueHTML() {
    return `
      <div class="page-banner">
        <div class="wrap">
          <div class="breadcrumb">
            <a href="#" onclick="window.app.showView('home')">Accueil</a> / <span>Catalogue Running</span>
          </div>
          <h1 class="page-title">Équipement Running & Kiprun</h1>
        </div>
      </div>

      <div class="wrap catalogue-layout">
        <!-- BARRE LATÉRALE DES FILTRES -->
        <aside class="catalogue-sidebar">
          <div class="filter-group">
            <h4 class="filter-title">Catégories</h4>
            ${['Tous', 'Chaussures', 'Vêtements', 'Accessoires'].map(cat => `
              <label class="filter-option">
                <input type="radio" name="catFilter" value="${cat}" ${this.selectedCategory === cat ? 'checked' : ''} onchange="window.app.setCategory('${cat}')">
                ${cat}
              </label>
            `).join('')}
          </div>

          <div class="filter-group">
            <h4 class="filter-title">Terrain</h4>
            <label class="filter-option">
              <input type="radio" name="terrainFilter" value="tous" ${this.selectedTerrain === 'tous' ? 'checked' : ''} onchange="window.app.setTerrain('tous')">
              Tous les terrains
            </label>
            <label class="filter-option">
              <input type="radio" name="terrainFilter" value="route" ${this.selectedTerrain === 'route' ? 'checked' : ''} onchange="window.app.setTerrain('route')">
              Route & Bitume
            </label>
            <label class="filter-option">
              <input type="radio" name="terrainFilter" value="trail" ${this.selectedTerrain === 'trail' ? 'checked' : ''} onchange="window.app.setTerrain('trail')">
              Trail & Nature
            </label>
            <label class="filter-option">
              <input type="radio" name="terrainFilter" value="mixte" ${this.selectedTerrain === 'mixte' ? 'checked' : ''} onchange="window.app.setTerrain('mixte')">
              Mixte & Parcs
            </label>
          </div>

          <div class="filter-group">
            <h4 class="filter-title">Budget</h4>
            <label class="filter-option">
              <input type="radio" name="priceFilter" value="tous" ${this.priceFilter === 'tous' ? 'checked' : ''} onchange="window.app.setPriceFilter('tous')">
              Tous les prix
            </label>
            <label class="filter-option">
              <input type="radio" name="priceFilter" value="under50" ${this.priceFilter === 'under50' ? 'checked' : ''} onchange="window.app.setPriceFilter('under50')">
              Moins de 50 €
            </label>
            <label class="filter-option">
              <input type="radio" name="priceFilter" value="50to100" ${this.priceFilter === '50to100' ? 'checked' : ''} onchange="window.app.setPriceFilter('50to100')">
              50 € à 100 €
            </label>
            <label class="filter-option">
              <input type="radio" name="priceFilter" value="over100" ${this.priceFilter === 'over100' ? 'checked' : ''} onchange="window.app.setPriceFilter('over100')">
              Plus de 100 € (Plaque carbone / Gore-Tex)
            </label>
          </div>

          <!-- Encadré incitatif vers Max -->
          <div style="background:var(--blue-soft);padding:16px;border-radius:var(--radius-md);margin-top:20px;border:1px solid #C6D1F9;">
            <div style="font-weight:750;font-size:13.5px;color:var(--blue-primary);margin-bottom:6px;">Besoin d'un filtre personnalisé ?</div>
            <p style="font-size:12px;color:var(--text-muted);line-height:1.4;margin-bottom:12px;">Max analyse votre foulée et vos sorties en 30 secondes.</p>
            <button class="btn-primary" style="width:100%;font-size:12.5px;padding:8px;" onclick="window.maxBot.openWithQuery('Trouver ma paire de chaussures idéale')">Demander à Max</button>
          </div>
        </aside>

        <!-- GRILLE DE RÉSULTATS -->
        <div>
          <div class="catalogue-top-bar">
            <div class="catalogue-count" id="catalogueCountLabel">Chargement...</div>
            <div class="catalogue-sort">
              <select id="catalogueSortSelect" onchange="window.app.setSort(this.value)">
                <option value="relevance">Trier par : Pertinence Decathlon</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Meilleures notes d'avis</option>
              </select>
            </div>
          </div>

          <div class="products-grid" id="catalogueProductsGrid"></div>
        </div>
      </div>
    `;
  }

  initCatalogueFilters() {
    // Écouteur pour le tri
    const select = document.getElementById('catalogueSortSelect');
    if (select) select.value = this.currentSort;
  }

  setCategory(cat) {
    this.selectedCategory = cat;
    this.renderCatalogueGrid();
  }

  setTerrain(terrain) {
    this.selectedTerrain = terrain;
    this.renderCatalogueGrid();
  }

  setPriceFilter(price) {
    this.priceFilter = price;
    this.renderCatalogueGrid();
  }

  setSort(sort) {
    this.currentSort = sort;
    this.renderCatalogueGrid();
  }

  filterByTerrain(terrain) {
    this.selectedTerrain = terrain;
    this.selectedCategory = 'Chaussures';
    this.showView('catalogue');
  }

  showCategory(category) {
    this.selectedCategory = category;
    this.selectedTerrain = 'tous';
    this.showView('catalogue');
  }

  getFilteredProducts() {
    return PRODUCTS.filter(p => {
      // Catégorie
      if (this.selectedCategory !== 'Tous' && p.category !== this.selectedCategory) return false;
      // Terrain
      if (this.selectedTerrain !== 'tous' && p.terrain !== this.selectedTerrain) return false;
      // Budget
      if (this.priceFilter === 'under50' && p.price >= 50) return false;
      if (this.priceFilter === '50to100' && (p.price < 50 || p.price > 100)) return false;
      if (this.priceFilter === 'over100' && p.price <= 100) return false;
      // Recherche
      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.desc.toLowerCase().includes(q);
        const matchesKeywords = p.keywords.some(k => k.includes(q));
        if (!matchesName && !matchesDesc && !matchesKeywords) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.currentSort === 'price-asc') return a.price - b.price;
      if (this.currentSort === 'price-desc') return b.price - a.price;
      if (this.currentSort === 'rating') return b.rating - a.rating;
      return a.id - b.id; // pertinence
    });
  }

  renderCatalogueGrid() {
    const grid = document.getElementById('catalogueProductsGrid');
    const label = document.getElementById('catalogueCountLabel');
    if (!grid) return;

    const items = this.getFilteredProducts();
    if (label) label.textContent = `${items.length} produit${items.length > 1 ? 's' : ''} trouvé${items.length > 1 ? 's' : ''}`;

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;background:#fff;border-radius:var(--radius-md);border:1px solid var(--border-color);">
          <h3 style="font-size:20px;color:var(--blue-dark);margin-bottom:8px;">Aucun produit ne correspond exactement à vos filtres</h3>
          <p style="color:var(--text-muted);margin-bottom:20px;">Essayez d'élargir votre sélection ou demandez directement à Max.</p>
          <button class="btn-primary" onclick="window.app.resetFilters()">Réinitialiser les filtres</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(p => this.createProductCardHTML(p)).join('');
  }

  resetFilters() {
    this.selectedCategory = 'Tous';
    this.selectedTerrain = 'tous';
    this.priceFilter = 'tous';
    this.searchQuery = '';
    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) searchInput.value = '';
    this.showView('catalogue');
  }

  // =========================================================================
  // FICHE DÉTAIL PRODUIT
  // =========================================================================

  getProductDetailHTML(productId) {
    const p = PRODUCTS.find(x => x.id === productId) || PRODUCTS[0];
    let specsHtml = '';
    if (p.specs) {
      specsHtml = Object.entries(p.specs).map(([key, val]) => `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:13.5px;">
          <span style="color:var(--text-muted);text-transform:capitalize;">${key}</span>
          <strong style="color:var(--text-main);">${val}</strong>
        </div>
      `).join('');
    }

    return `
      <div class="page-banner" style="padding:24px 0;">
        <div class="wrap">
          <div class="breadcrumb">
            <a href="#" onclick="window.app.showView('home')">Accueil</a> / 
            <a href="#" onclick="window.app.showView('catalogue')">${p.category}</a> / 
            <span>${p.name}</span>
          </div>
        </div>
      </div>

      <div class="wrap detail-grid">
        <div class="detail-media">
          <div class="detail-gallery">
            <img id="detailMainImg" src="${p.img}" alt="${p.name}" onerror="this.onerror=null;this.src='${p.imgFallback}'">
          </div>
          <div class="detail-thumbs">
            <img src="${p.img}" alt="${p.name} - vue 1" class="active" onerror="this.onerror=null;this.src='${p.imgFallback}'" onclick="window.app.setDetailImage(this)">
            ${p.gallery.map((g, i) => `<img src="${g}" alt="${p.name} - vue ${i + 2}" onerror="this.remove()" onclick="window.app.setDetailImage(this)">`).join('')}
          </div>
        </div>

        <div class="detail-info">
          <div class="detail-eyebrow">${p.brand} · ${p.usage}</div>
          <h1 class="detail-title">${p.name}</h1>
          <div class="product-rating" style="font-size:14px;margin-bottom:14px;">
            ★ ★ ★ ★ ★ <span style="font-weight:600;color:var(--text-muted);">${p.rating} / 5 (${p.reviewsCount} avis vérifiés)</span>
          </div>
          <div class="detail-price">${formatPrice(p.price)}</div>
          <p class="detail-desc">${p.desc}</p>

          <div class="size-selector-title">Sélectionnez votre pointure / taille :</div>
          <div class="sizes-row" id="productSizeSelector">
            ${p.sizes.map((s, idx) => `
              <button class="size-pill ${idx === 2 ? 'selected' : ''}" onclick="window.app.selectSize(this)">${s}</button>
            `).join('')}
          </div>

          <div style="display:flex;gap:12px;margin-bottom:18px;">
            <button class="btn-primary" style="flex:1;justify-content:center;font-size:16px;height:52px;" onclick="window.app.addCurrentToCart(${p.id})">
              Ajouter au panier · ${formatPrice(p.price)}
            </button>
          </div>

          <!-- BOUTON DÉDIÉ MAX DANS LA FICHE PRODUIT -->
          <button class="btn-ask-max-about-prod" onclick="window.maxBot.openWithQuery('Donne-moi ton avis d\\'expert sur le modèle ${p.name}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h14v12H10l-5 4z"></path></svg>
            Demander l'avis d'expert de Max sur ce modèle
          </button>

          <!-- SPÉCIFICATIONS TECHNIQUES SPORTSLAB -->
          <div style="background:var(--blue-subtle);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:20px;margin-top:24px;">
            <h4 style="font-size:14.5px;font-weight:800;margin-bottom:12px;color:var(--blue-dark);">Caractéristiques & Laboratoire SportsLab</h4>
            ${specsHtml}
            <div style="margin-top:14px;font-size:12.5px;color:#10B981;font-weight:600;display:flex;align-items:center;gap:6px;">
              <span>●</span> En stock magasin & expédié sous 24h
            </div>
          </div>
        </div>
      </div>
    `;
  }

  selectSize(btn) {
    document.querySelectorAll('#productSizeSelector .size-pill').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  addCurrentToCart(productId) {
    const selected = document.querySelector('#productSizeSelector .size-pill.selected');
    const size = selected ? selected.textContent.trim() : '42';
    this.addToCart(productId, size);
  }

  showProductDetail(productId) {
    this.showView('product-detail', productId);
  }

  // =========================================================================
  // PANIER & COMMANDE SIMULÉE
  // =========================================================================

  getCartHTML() {
    if (this.cart.length === 0) {
      return `
        <div class="wrap" style="text-align:center;padding:100px 20px;">
          <div class="hero-badge" style="margin-bottom:14px;">Votre sélection</div>
          <h1 style="color:var(--blue-primary);font-size:36px;font-weight:900;margin-bottom:12px;">Votre panier est vide</h1>
          <p style="color:var(--text-muted);font-size:16px;margin-bottom:28px;">Votre prochaine séance commence par le bon équipement.</p>
          <button class="btn-primary" onclick="window.app.showView('catalogue')">Découvrir le catalogue</button>
        </div>
      `;
    }

    const subtotal = this.cart.reduce((sum, item) => {
      const prod = PRODUCTS.find(p => p.id === item.id);
      return sum + (prod ? prod.price * item.qty : 0);
    }, 0);

    const isShippingFree = subtotal >= 49.00;
    const shippingCost = isShippingFree ? 0 : 4.99;
    const total = subtotal + shippingCost;
    const remainingForFree = Math.max(0, 49.00 - subtotal);

    return `
      <div class="page-banner">
        <div class="wrap">
          <div class="breadcrumb">
            <a href="#" onclick="window.app.showView('home')">Accueil</a> / <span>Panier</span>
          </div>
          <h1 class="page-title">Mon Panier (${this.cart.reduce((a, b) => a + b.qty, 0)} articles)</h1>
        </div>
      </div>

      <div class="wrap cart-layout">
        <!-- LISTE DES ARTICLES -->
        <div class="cart-items-list">
          <!-- Barre d'incitation livraison offerte -->
          <div style="background:${isShippingFree ? '#ECFDF5' : 'var(--blue-soft)'};padding:14px 18px;border-radius:var(--radius-sm);margin-bottom:20px;font-size:13.5px;color:${isShippingFree ? '#065F46' : 'var(--blue-primary)'};font-weight:600;">
            ${isShippingFree 
              ? '🎉 Félicitations ! La livraison vous est offerte !' 
              : `Plus que <strong>${formatPrice(remainingForFree)}</strong> pour bénéficier de la livraison offerte !`}
          </div>

          ${this.cart.map(item => {
            const prod = PRODUCTS.find(p => p.id === item.id);
            if (!prod) return '';
            return `
              <div class="cart-item-row">
                <img src="${prod.img}" class="cart-item-img" alt="${prod.name}">
                <div class="cart-item-info">
                  <h4>${prod.name}</h4>
                  <div style="font-size:12.5px;color:var(--text-muted);">Taille / Pointure : <strong>${item.size}</strong></div>
                  <div style="font-size:14px;font-weight:800;color:var(--blue-primary);margin-top:4px;">${formatPrice(prod.price)}</div>
                  <div class="cart-item-qty">
                    <button class="qty-btn" onclick="window.app.updateQty(${prod.id}, '${item.size}', -1)">−</button>
                    <span style="font-weight:700;font-size:14px;">${item.qty}</span>
                    <button class="qty-btn" onclick="window.app.updateQty(${prod.id}, '${item.size}', 1)">+</button>
                    <button style="color:#EF4444;font-size:12.5px;margin-left:14px;text-decoration:underline;" onclick="window.app.removeFromCart(${prod.id}, '${item.size}')">Supprimer</button>
                  </div>
                </div>
                <div style="font-size:16px;font-weight:850;color:var(--text-main);">
                  ${formatPrice(prod.price * item.qty)}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- RÉCAPITULATIF COMMANDE -->
        <aside class="cart-summary-box">
          <h3 class="summary-title">Récapitulatif</h3>
          <div class="summary-line">
            <span>Sous-total</span>
            <strong>${formatPrice(subtotal)}</strong>
          </div>
          <div class="summary-line">
            <span>Livraison standard</span>
            <span>${isShippingFree ? '<strong style="color:#10B981">Offerte</strong>' : formatPrice(shippingCost)}</span>
          </div>
          <div class="summary-line total">
            <span>Total estimé TTC</span>
            <span>${formatPrice(total)}</span>
          </div>

          <button class="btn-primary" style="width:100%;height:50px;justify-content:center;margin-top:20px;font-size:15px;" onclick="window.app.openCheckoutModal()">
            Valider ma commande
          </button>
          
          <div style="font-size:12px;color:var(--text-muted);text-align:center;margin-top:16px;">
            🔒 Projet de démonstration étudiant · Aucun paiement réel requis
          </div>
        </aside>
      </div>
    `;
  }

  renderCartView() {
    this.renderView('cart');
  }

  openCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'config-modal-backdrop open';
    modal.id = 'checkoutModalBackdrop';
    modal.innerHTML = `
      <div class="config-modal-card" style="max-width:480px;text-align:center;padding:36px 28px;">
        <div style="width:64px;height:64px;background:var(--mint-light);color:#065F46;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:28px;">
          ✓
        </div>
        <div class="section-tag" style="margin-bottom:6px;">Commande Démo Validée</div>
        <h2 style="font-size:26px;font-weight:900;color:var(--blue-dark);margin-bottom:12px;">Merci pour votre confiance !</h2>
        <p style="font-size:14px;color:var(--text-muted);line-height:1.6;margin-bottom:24px;">
          Votre commande a été simulée avec succès pour le jury The Bridge. Vos articles Kiprun sont prêts pour l'entraînement !
        </p>
        <button class="btn-primary" style="width:100%;justify-content:center;" onclick="window.app.finishCheckout()">
          Retour à la boutique
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  finishCheckout() {
    const modal = document.getElementById('checkoutModalBackdrop');
    if (modal) modal.remove();
    this.cart = [];
    this.saveCart();
    this.showView('home');
    this.showToast('Commande confirmée avec succès !');
  }

  // =========================================================================
  // PAGES CONSEILS / SAV / À PROPOS
  // =========================================================================

  setDetailImage(thumb) {
    const main = document.getElementById('detailMainImg');
    if (main) main.src = thumb.src;
    document.querySelectorAll('.detail-thumbs img').forEach(i => i.classList.remove('active'));
    thumb.classList.add('active');
  }

  getConseilsHTML() {
    return `
      <div class="page-banner">
        <div class="wrap">
          <div class="breadcrumb"><a href="#" onclick="window.app.showView('home')">Accueil</a> / <span>Conseils</span></div>
          <h1 class="page-title">Le guide du coureur Decathlon</h1>
        </div>
      </div>
      <div class="wrap" style="padding:48px 0;">
        <div class="editorial-box">
          <div class="editorial-img-col">
            <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80" alt="Conseils">
          </div>
          <div class="editorial-content">
            <span class="section-tag">Guide Foulée</span>
            <h2>Comment bien choisir ses chaussures ?</h2>
            <p>
              1. <strong>Identifiez votre terrain</strong> : bitume (besoin d'amorti souple), sentiers (besoin de crampons et stabilité) ou mixte.<br><br>
              2. <strong>Définissez votre volume</strong> : courir 1 fois par semaine (privilégiez la Jogflow 500) vs courir 3 fois ou préparer un marathon (privilégiez la KS900 ou la KD900X à plaque carbone).<br><br>
              3. <strong>Prenez 1 pointure au-dessus</strong> : le pied gonfle naturellement pendant l'effort de course à pied.
            </p>
            <button class="btn-primary" onclick="window.maxBot.openWithQuery('Je veux des conseils pour progresser en running')">Poser une question spécifique à Max</button>
          </div>
        </div>
      </div>
    `;
  }

  getShippingHTML() {
    return `
      <div class="page-banner">
        <div class="wrap">
          <div class="breadcrumb"><a href="#" onclick="window.app.showView('home')">Accueil</a> / <span>Livraison & SAV</span></div>
          <h1 class="page-title">Livraison, Retours & SAV</h1>
        </div>
      </div>
      <div class="wrap" style="padding:48px 0;">
        <div class="benefits-grid" style="margin-bottom:48px;">
          <div class="benefit-card">
            <div class="benefit-icon">🚚</div>
            <div>
              <h4>Livraison Standard & Express</h4>
              <p>Offerte dès 49€ d'achat. Colissimo ou Mondial Relay sous 48 à 72h ouvrées.</p>
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🏬</div>
            <div>
              <h4>Click & Collect 1h</h4>
              <p>Commandez en ligne et retirez gratuitement vos articles dans votre magasin Decathlon.</p>
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔄</div>
            <div>
              <h4>365 Jours pour changer d'avis</h4>
              <p>Retours et échanges 100% gratuits en magasin ou par étiquette prépayée.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getAboutHTML() {
    return `
      <div class="page-banner">
        <div class="wrap">
          <div class="breadcrumb"><a href="#" onclick="window.app.showView('home')">Accueil</a> / <span>À propos</span></div>
          <h1 class="page-title">À propos de Decathlon Running & The Bridge</h1>
        </div>
      </div>
      <div class="wrap" style="padding:48px 0;max-width:860px;">
        <div style="background:#fff;padding:36px;border-radius:var(--radius-lg);border:1px solid var(--border-color);line-height:1.7;">
          <h2 style="color:var(--blue-primary);margin-bottom:14px;">Le sport, accessible à toutes et tous</h2>
          <p style="color:var(--text-muted);margin-bottom:18px;">
            Ce projet étudiant est réalisé dans le cadre de <strong>The Bridge</strong> pour réinventer l'expérience client digitale chez Decathlon.
          </p>
          <p style="color:var(--text-muted);margin-bottom:18px;">
            En associant un site e-commerce de haute performance à <strong>Max</strong>, un assistant conversationnel nouvelle génération propulsé par des modèles de langage (LLM), nous apportons le niveau d'écoute et de recommandation d'un vendeur en magasin directement sur le web.
          </p>
          <button class="btn-primary" onclick="window.app.showView('catalogue')">Visiter la boutique</button>
        </div>
      </div>
    `;
  }
}

// Initialisation globale
window.DecathlonApp = DecathlonApp;
