/**
 * @fileoverview Catalog page controller.
 * Renders restaurant cards from data and handles search/filter UI.
 * @module js/catalog
 */

'use strict';

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_ICONS = {
  'Pizzería':     '🍕',
  'Café':         '☕',
  'Soda Típica':  '🍽️',
  'Mariscos':     '🦞',
  'Steakhouse':   '🥩',
  'Asiático':     '🍜',
  'Panadería':    '🥖',
  'Heladería':    '🍦',
  'Souvenirs':    '🛍️',
};

const CATEGORY_COLORS = {
  'Pizzería':     '--color-cat-pizza',
  'Café':         '--color-cat-cafe',
  'Soda Típica':  '--color-cat-soda',
  'Mariscos':     '--color-cat-mariscos',
  'Steakhouse':   '--color-cat-steakhouse',
  'Asiático':     '--color-cat-asiatic',
  'Souvenirs':    '--color-cat-souvenirs',
};

// ── State ─────────────────────────────────────────────────────────────────────

let currentCategory = 'Todos';
let currentQuery    = '';

// ── DOM Helpers ───────────────────────────────────────────────────────────────

/**
 * @param {string} selector
 * @param {Document|Element} [ctx=document]
 * @returns {Element|null}
 */
const $ = (selector, ctx = document) => ctx.querySelector(selector);

/**
 * @param {string} selector
 * @param {Document|Element} [ctx=document]
 * @returns {NodeList}
 */
const $$ = (selector, ctx = document) => ctx.querySelectorAll(selector);

// ── Utils ─────────────────────────────────────────────────────────────────────

/**
 * Format a Costa Rican colón price.
 * @param {number} amount
 * @returns {string}
 */
function formatPrice(amount) {
  return `₡ ${amount.toLocaleString('es-CR')}`;
}

/**
 * Generate star HTML string from a numeric rating.
 * @param {number} rating
 * @returns {string}
 */
function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star" aria-hidden="true">${i < Math.round(rating) ? '★' : '☆'}</span>`
  ).join('');
}

/**
 * Get the CSS variable for a category accent color.
 * @param {string} category
 * @returns {string}
 */
function getCategoryColor(category) {
  const varName = CATEGORY_COLORS[category];
  return varName ? `var(${varName})` : 'var(--color-gold)';
}

// ── Filtering ─────────────────────────────────────────────────────────────────

/**
 * Returns the filtered list of restaurants based on current state.
 * @returns {Restaurant[]}
 */
function getFilteredRestaurants() {
  const q = currentQuery.toLowerCase().trim();

  return RESTAURANTS.filter(r => {
    const matchCategory =
      currentCategory === 'Todos' || r.category === currentCategory;

    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.tagline.toLowerCase().includes(q);

    return matchCategory && matchSearch;
  });
}

// ── Rendering ─────────────────────────────────────────────────────────────────

/**
 * Build the HTML for a single restaurant card.
 * @param {Restaurant} restaurant
 * @param {number} index - Used for staggered animation delay
 * @returns {string}
 */
function buildRestaurantCard(restaurant, index) {
  const {
    id, name, tagline, category, tags, rating,
    reviewCount, coverImage, schedule,
  } = restaurant;

  const icon  = CATEGORY_ICONS[category] || '🍴';
  const color = getCategoryColor(category);
  const delay = Math.min(index * 0.07, 0.6);

  // Build image or placeholder
  const coverHtml = coverImage
    ? `<img class="restaurant-card__image"
            src="${coverImage}"
            alt="Foto de ${name}"
            loading="lazy"
            onerror="this.parentElement.innerHTML='<div class=\\'restaurant-card__image-placeholder\\'>${icon}</div>'">`
    : `<div class="restaurant-card__image-placeholder">${icon}</div>`;

  // Build tag pills (max 3)
  const tagPills = tags
    .slice(0, 3)
    .map(t => `<span class="tag-pill">${t}</span>`)
    .join('');

  return `
    <article
      class="restaurant-card"
      role="button"
      tabindex="0"
      aria-label="Ver restaurante ${name}"
      onclick="navigateTo('${id}/index.html')"
      onkeydown="if(event.key==='Enter'){navigateTo('${id}/index.html')}"
      style="animation-delay:${delay}s"
    >
      <div class="restaurant-card__image-wrap">
        ${coverHtml}
        <span
          class="restaurant-card__badge"
          style="color:${color}; border-color:${color}40;"
        >${icon} ${category}</span>
        <div class="restaurant-card__rating-badge" aria-label="Calificación ${rating} de 5">
          ★ ${rating}
        </div>
      </div>

      <div class="restaurant-card__body">
        <h3 class="restaurant-card__name">${name}</h3>
        <p class="restaurant-card__tagline">${tagline}</p>
        <div class="restaurant-card__tags" aria-label="Etiquetas">${tagPills}</div>
      </div>

      <div class="restaurant-card__footer">
        <p class="restaurant-card__schedule" aria-label="Horario">
          <span aria-hidden="true">🕐</span>
          ${schedule.split('|')[0].trim()}
        </p>
        <span class="btn-view" aria-hidden="true">
          Ver menú
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </article>`;
}

/**
 * Render (or re-render) the grid of restaurant cards.
 */
function renderCatalog() {
  const grid      = $('#catalogGrid');
  const noResults = $('#noResults');
  const countEl   = $('#resultCount');
  const filtered  = getFilteredRestaurants();

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.add('visible');
    if (countEl) countEl.textContent = '0';
    return;
  }

  noResults.classList.remove('visible');
  grid.innerHTML = filtered.map(buildRestaurantCard).join('');
  if (countEl) countEl.textContent = String(filtered.length);
}

// ── Filter Chips ──────────────────────────────────────────────────────────────

/**
 * Derive unique categories from the data and build filter chip buttons.
 */
function buildFilterChips() {
  const container = $('#filterChips');
  if (!container) return;

  const categories = ['Todos', ...new Set(RESTAURANTS.map(r => r.category))];

  container.innerHTML = categories
    .map(cat => {
      const icon  = CATEGORY_ICONS[cat] ?? '🍴';
      const label = cat === 'Todos' ? `${icon} Todos` : `${CATEGORY_ICONS[cat] || ''} ${cat}`;
      return `
        <button
          class="filter-chip${cat === 'Todos' ? ' active' : ''}"
          data-category="${cat}"
          aria-pressed="${cat === 'Todos'}"
        >${label}</button>`;
    })
    .join('');

  container.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    currentCategory = chip.dataset.category;

    $$('.filter-chip', container).forEach(c => {
      c.classList.toggle('active', c === chip);
      c.setAttribute('aria-pressed', String(c === chip));
    });

    renderCatalog();
  });
}

// ── Search ────────────────────────────────────────────────────────────────────

/**
 * Wire up the hero search input.
 */
function initSearch() {
  const input = $('#searchInput');
  const btn   = $('#searchBtn');
  if (!input) return;

  const doSearch = () => {
    currentQuery = input.value;
    renderCatalog();

    // Scroll to catalog
    const cat = $('#catalogSection');
    if (cat) cat.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  input.addEventListener('input',  () => { currentQuery = input.value; renderCatalog(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  if (btn) btn.addEventListener('click', doSearch);
}

// ── Scroll Effects ────────────────────────────────────────────────────────────

function initScrollEffects() {
  const navbar = $('.navbar');
  if (!navbar) return;

  const handler = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// ── Navigation ────────────────────────────────────────────────────────────────

/**
 * Navigate to a relative URL from the site root.
 * @param {string} path
 */
function navigateTo(path) {
  window.location.href = path;
}

// ── Stats Counter ─────────────────────────────────────────────────────────────

function initStats() {
  const totalEl = $('#statTotal');
  if (totalEl) totalEl.textContent = RESTAURANTS.length;
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  buildFilterChips();
  initSearch();
  renderCatalog();
  initStats();
});
