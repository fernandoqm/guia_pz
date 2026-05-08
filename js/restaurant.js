/**
 * @fileoverview Individual restaurant page controller.
 * Reads restaurant config from a page-level DATA object and renders the page.
 * Each restaurant's index.html defines `window.PAGE_DATA = { restaurantId: '...' }`
 * and this script looks up the full data from RESTAURANTS.
 * @module js/restaurant
 */

'use strict';

// ── DOM Helpers ───────────────────────────────────────────────────────────────

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

// ── Utils ─────────────────────────────────────────────────────────────────────

function formatPrice(amount) {
  return `₡ ${amount.toLocaleString('es-CR')}`;
}

function buildWhatsAppUrl(phone, message) {
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
}

function buildCallUrl(phone) {
  return `tel:${phone}`;
}

function buildStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span aria-hidden="true">${i < Math.round(rating) ? '★' : '☆'}</span>`
  ).join('');
}

// ── Category accent ───────────────────────────────────────────────────────────

const CAT_COLORS = {
  'Pizzería':    'var(--color-cat-pizza)',
  'Café':        'var(--color-cat-cafe)',
  'Soda Típica': 'var(--color-cat-soda)',
  'Mariscos':    'var(--color-cat-mariscos)',
  'Steakhouse':  'var(--color-cat-steakhouse)',
  'Asiático':    'var(--color-cat-asiatic)',
  'Souvenirs':   'var(--color-cat-souvenirs)',
};

const CAT_ICONS = {
  'Pizzería':    '🍕',
  'Café':        '☕',
  'Soda Típica': '🍽️',
  'Mariscos':    '🦞',
  'Steakhouse':  '🥩',
  'Asiático':    '🍜',
  'Souvenirs':   '🛍️',
};

// ── Page Population ───────────────────────────────────────────────────────────

/**
 * Set the page <title> and meta description for SEO.
 * @param {Restaurant} r
 */
function setMeta(r) {
  document.title = `${r.name} | Guía de Restaurantes Pérez Zeledón`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = r.description;
}

/**
 * Populate the cover header section.
 * @param {Restaurant} r
 */
function populateCover(r) {
  const color     = CAT_COLORS[r.category] ?? 'var(--color-gold)';
  const icon      = CAT_ICONS[r.category]  ?? '🍴';

  // Cover image or placeholder
  const coverEl = $('#coverBg');
  if (coverEl) {
    if (r.coverImage) {
      coverEl.innerHTML =
        `<img class="restaurant-cover__bg" src="${r.coverImage}" alt="Foto de ${r.name}"
              onerror="this.parentElement.querySelector('.restaurant-cover__placeholder-bg').style.display='flex'; this.remove();">
         <div class="restaurant-cover__placeholder-bg" style="display:none;">${icon}</div>`;
    } else {
      coverEl.innerHTML =
        `<div class="restaurant-cover__placeholder-bg">${icon}</div>`;
    }
  }

  // Category badge
  const catBadge = $('#coverCategory');
  if (catBadge) {
    catBadge.textContent = `${icon} ${r.category}`;
    catBadge.style.color        = color;
    catBadge.style.borderColor  = `${color}55`;
    catBadge.style.background   = `${color}18`;
  }

  const nameEl    = $('#coverName');
  const taglineEl = $('#coverTagline');
  if (nameEl)    nameEl.textContent    = r.name;
  if (taglineEl) taglineEl.textContent = r.tagline;
}

/**
 * Populate the info strip (rating, address, schedule).
 * @param {Restaurant} r
 */
function populateInfoStrip(r) {
  const ratingEl = $('#infoRating');
  if (ratingEl) {
    ratingEl.innerHTML = `
      <div class="stars" aria-label="Calificación ${r.rating} de 5">${buildStars(r.rating)}</div>
      <strong>${r.rating}</strong>
      <span class="info-strip__rating-count">(${r.reviewCount} reseñas)</span>`;
  }

  const addrEl = $('#infoAddress');
  if (addrEl) {
    addrEl.innerHTML =
      `<span class="icon">📍</span>
       <a href="${r.mapsUrl}" target="_blank" rel="noopener">${r.address}</a>`;
  }

  const schedEl = $('#infoSchedule');
  if (schedEl) {
    schedEl.innerHTML = `<span class="icon">🕐</span><span>${r.schedule}</span>`;
  }
}

/**
 * Populate action buttons (desktop + mobile FAB).
 * @param {Restaurant} r
 */
function populateActions(r) {
  const waMsg = `Hola! Vi su menú en la Guía de Restaurantes y me gustaría hacer un pedido 😊`;

  // Desktop buttons
  const desktopActions = $('#desktopActions');
  if (desktopActions) {
    desktopActions.innerHTML = `
      <a class="btn-action btn-action--call"
         href="${buildCallUrl(r.phone)}"
         aria-label="Llamar a ${r.name}">
        📞 Llamar
      </a>
      <a class="btn-action btn-action--whatsapp"
         href="${buildWhatsAppUrl(r.whatsapp, waMsg)}"
         target="_blank" rel="noopener"
         aria-label="WhatsApp de ${r.name}">
        💬 WhatsApp
      </a>
      <a class="btn-action btn-action--maps"
         href="${r.mapsUrl}"
         target="_blank" rel="noopener"
         aria-label="Ver en Google Maps">
        🗺️ Cómo llegar
      </a>`;
  }

  // FAB (mobile)
  const fabCall = $('#fabCall');
  const fabWa   = $('#fabWhatsApp');
  if (fabCall) fabCall.href = buildCallUrl(r.phone);
  if (fabWa)   fabWa.href   = buildWhatsAppUrl(r.whatsapp, waMsg);
}

/**
 * Render the full menu from the restaurant's menu array.
 * @param {Restaurant} r
 */
function populateMenu(r) {
  const container = $('#menuContainer');
  if (!container) return;

  container.innerHTML = r.menu
    .map(cat => buildMenuCategory(cat, r))
    .join('');
}

/**
 * Build the HTML block for a single menu category.
 * @param {MenuCategory} cat
 * @param {Restaurant} r
 * @returns {string}
 */
function buildMenuCategory(cat, r) {
  const priceBadge = cat.priceLabel
    ? `<span class="menu-category__price-badge">${cat.priceLabel}</span>`
    : '';

  const items = cat.items.map(item => buildMenuItem(item, cat, r)).join('');

  return `
    <section class="menu-category animate-in" aria-labelledby="cat-${slugify(cat.category)}">
      <div class="menu-category__header">
        <span class="menu-category__icon" aria-hidden="true">${cat.icon ?? '🍴'}</span>
        <div class="menu-category__info">
          <h3 class="menu-category__name" id="cat-${slugify(cat.category)}">${cat.category}</h3>
        </div>
        ${priceBadge}
      </div>
      <ul class="menu-items-list" role="list">${items}</ul>
    </section>`;
}

/**
 * Build the HTML for a single menu item.
 * @param {MenuItem} item
 * @param {MenuCategory} cat
 * @param {Restaurant} r
 * @returns {string}
 */
function buildMenuItem(item, cat, r) {
  const priceHtml = item.price
    ? `<span class="menu-item__price">${formatPrice(item.price)}</span>`
    : '';

  const waText = cat.whatsappTemplate
    ? `${cat.whatsappTemplate} — *${item.name}*`
    : `Hola! Quisiera ordenar: *${item.name}* ${item.price ? '(₡ ' + item.price.toLocaleString('es-CR') + ')' : ''}`;

  const orderBtn = `
    <a class="btn-order"
       href="${buildWhatsAppUrl(r.whatsapp, waText)}"
       target="_blank" rel="noopener"
       aria-label="Ordenar ${item.name} por WhatsApp">
      💬 Ordenar
    </a>`;

  const desc = item.description
    ? `<p class="menu-item__desc">${item.description}</p>`
    : '';

  return `
    <li class="menu-item" role="listitem">
      <div class="menu-item__text">
        <p class="menu-item__name">${item.name}</p>
        ${desc}
      </div>
      <div class="menu-item__right">
        ${priceHtml}
        ${orderBtn}
      </div>
    </li>`;
}

// ── Scroll Effects ────────────────────────────────────────────────────────────

function initScrollEffects() {
  const cover = $('.restaurant-cover');
  if (!cover) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const bg = cover.querySelector('img');
    if (bg) bg.style.transform = `scale(1.05) translateY(${y * 0.2}px)`;
  }, { passive: true });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Expect each restaurant page to define: window.PAGE_DATA = { restaurantId: '...' }
  const config = window.PAGE_DATA;
  if (!config || !config.restaurantId) {
    console.error('[restaurant.js] window.PAGE_DATA.restaurantId is not defined.');
    return;
  }

  const restaurant = RESTAURANTS.find(r => r.id === config.restaurantId);
  if (!restaurant) {
    console.error(`[restaurant.js] No restaurant found with id: "${config.restaurantId}"`);
    return;
  }

  setMeta(restaurant);
  populateCover(restaurant);
  populateInfoStrip(restaurant);
  populateActions(restaurant);
  populateMenu(restaurant);
  initScrollEffects();
});
