# Guía de Restaurantes · Pérez Zeledón

Catálogo web estático de restaurantes locales, publicable en **GitHub Pages**. Incluye página de inicio con catálogo elegante y páginas individuales por restaurante con botones de WhatsApp y llamada.

## 🌐 Demo

> Publicar en GitHub Pages: `https://<tu-usuario>.github.io/guia_restaurantes/`

## 📁 Estructura

```
guia_restaurantes/
├── index.html                      # Catálogo principal
├── restaurantes/
│   ├── gustavos-pizzeria/index.html
│   ├── cafe-del-valle/index.html
│   └── soda-la-abuela/index.html
├── css/
│   ├── variables.css               # Design tokens
│   ├── main.css                    # Estilos catálogo
│   └── restaurant.css              # Estilos páginas individuales
├── js/
│   ├── catalog.js                  # Lógica del catálogo
│   └── restaurant.js               # Lógica páginas individuales
├── data/
│   └── restaurants.js              # ← EDITAR AQUÍ para agregar restaurantes
└── assets/
    └── covers/                     # Imágenes de portada
```

## ➕ Agregar un Restaurante

1. **Editá `data/restaurants.js`** — añadí un objeto al array `RESTAURANTS` con todos los campos.
2. **Creá su carpeta**: `restaurantes/<id-del-restaurante>/index.html`
3. **Copiá** el HTML de cualquier restaurante existente y cambiá solo el `restaurantId` en `window.PAGE_DATA`.
4. (Opcional) Añadí imagen de cover en `assets/covers/`.

Ejemplo mínimo en `data/restaurants.js`:

```js
{
  id: 'mi-restaurante',
  name: 'Mi Restaurante',
  tagline: 'El mejor de la zona',
  category: 'Pizzería',
  tags: ['Pizza', 'Para llevar'],
  rating: 4.5,
  reviewCount: 100,
  phone: '+50688888888',
  whatsapp: '50688888888',
  address: 'Dirección completa aquí',
  mapsUrl: 'https://maps.google.com/?q=...',
  schedule: 'Lun–Dom: 10:00 AM – 9:00 PM',
  description: 'Descripción breve del lugar.',
  coverImage: 'assets/covers/mi-restaurante-cover.jpg',
  accentColor: '#E8553E',
  menu: [ /* ... */ ],
}
```

## 🚀 Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "feat: initial release — guia restaurantes PZ"
git branch -M main
git remote add origin https://github.com/<usuario>/guia_restaurantes.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: main branch → / (root)** → Save.

## 🛠️ Tecnologías

- HTML5 + CSS3 Vanilla + JavaScript ES2020 (sin frameworks)
- Google Fonts: Playfair Display + Inter
- Compatible con GitHub Pages (100% estático, sin build step)

## 📄 Licencia

MIT — Libre para uso personal y comercial.
