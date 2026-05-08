/**
 * @fileoverview Restaurant data — single source of truth.
 * To add a new restaurant, append a new object to the RESTAURANTS array.
 * @module data/restaurants
 */

"use strict";

/** @typedef {Object} MenuItem
 * @property {string} name
 * @property {string} [description]
 * @property {number} [price]
 */

/** @typedef {Object} MenuCategory
 * @property {string} category
 * @property {string} [icon]
 * @property {MenuItem[]} items
 */

/** @typedef {Object} Restaurant
 * @property {string} id           - URL-friendly slug (used for folder name)
 * @property {string} name
 * @property {string} tagline
 * @property {string} category     - Main category key
 * @property {string[]} tags       - Additional descriptors
 * @property {number} rating       - 1–5
 * @property {number} reviewCount
 * @property {string} phone        - Full international format e.g. +50688047044
 * @property {string} whatsapp     - Same format as phone (no + for WA links)
 * @property {string} address
 * @property {string} mapsUrl
 * @property {string} schedule
 * @property {string} description
 * @property {string} coverImage   - Relative path from site root
 * @property {string} logoImage    - Relative path from site root
 * @property {string} accentColor  - CSS var or hex
 * @property {MenuCategory[]} menu
 */

/** @type {Restaurant[]} */
const RESTAURANTS = [
  {
    id: "pizzeria-bella-vita",
    name: "Pizzería Bella Vita",
    tagline: "Auténtica pizza artesanal desde 1995",
    category: "Pizzería",
    tags: ["Pizza", "Italiana", "Para llevar", "Delivery"],
    rating: 4.8,
    reviewCount: 312,
    phone: "+50685646198",
    whatsapp: "50685646198",
    address: "Centro Comercial El Palí, Pérez Zeledón, San José",
    mapsUrl: "https://maps.google.com/?q=Perez+Zeledon+Costa+Rica",
    schedule: "Lunes–Domingo: 11:00 AM – 10:00 PM",
    description:
      "La pizzería más querida de Pérez Zeledón. Masa artesanal, ingredientes frescos y el auténtico sabor italiano que nos ha acompañado por casi 30 años.",
    coverImage: "../assets/covers/gustavos-cover.jpg",
    logoImage: "../assets/logos/gustavos-logo.png",
    accentColor: "#E8553E",
    menu: [
      {
        category: "GIGANTE — 16 Porciones",
        icon: "🍕",
        priceLabel: "₡ 12.000",
        whatsappTemplate: "Hola! Quiero ordenar: *PIZZA GIGANTE 16 porciones*",
        items: [
          {
            name: "Bella Vita",
            description: "Jamón, Salame, Tocineta, Chile, Cebolla, Hongos",
          },
          {
            name: "Super Carne",
            description: "Jamón, Salame, Tocineta, Carne Molida",
          },
          {
            name: "Suprema Pollo",
            description: "Jamón, Pollo, Carne Molida, Tocineta",
          },
          {
            name: "Mexicana",
            description: "Carne Molida, Tocineta, Cebolla, Jalapeño",
          },
          {
            name: "Americana",
            description: "Peperone, Hongos, Extra Queso Mozzarella",
          },
          {
            name: "Clásica",
            description: "Jamón, Hongos, Extra Queso Mozzarella",
          },
          {
            name: "Hawaiana",
            description: "Jamón, Piña, Extra Queso Mozzarella",
          },
          {
            name: "Margarita",
            description: "Salsa de tomate, Doble Extra Queso Mozzarella",
          },
          {
            name: "Italiana",
            description: "Tomate Fresco, Albahaca, Ajo, Hongos",
          },
          {
            name: "Vegetariana",
            description:
              "Tomate Fresco, Brócoli, Hongos, Chile, Cebolla, Ajo, Albahaca",
          },
          {
            name: "Charly's",
            description:
              "Jamón, Peperone, Carne Molida, Salame, Tocineta, Hongos, Chile, Cebolla",
          },
        ],
      },
      {
        category: "TAMAÑOS DISPONIBLES",
        icon: "📏",
        items: [
          { name: "Pequeña", description: "6 Porciones", price: 6000 },
          { name: "Mediana", description: "8 Porciones", price: 7000 },
          { name: "Grande", description: "10 Porciones", price: 9000 },
          { name: "Familiar", description: "12 Porciones", price: 10000 },
          { name: "Gigante", description: "16 Porciones", price: 12000 },
          { name: "Monster", description: "20 Porciones", price: 15000 },
        ],
      },
      {
        category: "REFRESCOS",
        icon: "🥤",
        items: [
          { name: "Refresco 350 ml", price: 800 },
          { name: "Refresco 500 ml", price: 1000 },
          { name: "Refresco 600 ml", price: 1200 },
          { name: "Refresco 1.5 L", price: 2000 },
          { name: "Refresco 2.5 L", price: 2500 },
        ],
      },
    ],
  },

  {
    id: "cafe-del-valle",
    name: "Café del Valle",
    tagline: "Café de especialidad y repostería artesanal",
    category: "Café",
    tags: ["Café", "Desayunos", "Repostería", "Ambiente acogedor"],
    rating: 4.9,
    reviewCount: 187,
    phone: "+50685646198",
    whatsapp: "50685646198",
    address: "Av. Central, frente al Parque, Pérez Zeledón",
    mapsUrl: "https://maps.google.com/?q=Perez+Zeledon+Costa+Rica",
    schedule: "Lunes–Sábado: 7:00 AM – 7:00 PM  |  Domingo: 8:00 AM – 2:00 PM",
    description:
      "El rincón perfecto para comenzar el día. Café de especialidad costarricense, tostado local, combinado con repostería artesanal hecha cada mañana.",
    coverImage: "../assets/covers/cafe-cover.jpg",
    logoImage: "../assets/logos/cafe-logo.png",
    accentColor: "#8B5E3C",
    menu: [
      {
        category: "CAFÉS DE ESPECIALIDAD",
        icon: "☕",
        items: [
          {
            name: "Espresso",
            description: "Café puro costarricense, tueste oscuro",
            price: 1500,
          },
          {
            name: "Cappuccino",
            description: "Espresso, leche vaporizada y espuma",
            price: 2200,
          },
          {
            name: "Latte de Vainilla",
            description: "Espresso, leche y sirope de vainilla",
            price: 2500,
          },
          {
            name: "Cold Brew",
            description: "Infusión en frío por 18 horas",
            price: 2800,
          },
          {
            name: "Flat White",
            description: "Ratio corto, microespuma aterciopelada",
            price: 2300,
          },
          {
            name: "Café Frío de Temporada",
            description: "Pregunta por nuestra creación del mes",
            price: 3000,
          },
        ],
      },
      {
        category: "DESAYUNOS",
        icon: "🥐",
        items: [
          {
            name: "Gallo Pinto Completo",
            description: "Gallo pinto, huevos, natilla, plátano maduro, café",
            price: 4500,
          },
          {
            name: "Tostadas Francesas",
            description: "Brioche, canela, maple, frutos rojos",
            price: 3800,
          },
          {
            name: "Bowl de Granola",
            description:
              "Granola artesanal, yogur griego, miel de abeja, frutas",
            price: 3500,
          },
          {
            name: "Sándwich de Desayuno",
            description: "Pan artesanal, huevo, queso, jamón curado",
            price: 4000,
          },
        ],
      },
      {
        category: "REPOSTERÍA",
        icon: "🧁",
        items: [
          { name: "Croissant de Mantequilla", price: 1800 },
          { name: "Cheesecake de Maracuyá", price: 2500 },
          { name: "Brownie de Chocolate Belga", price: 2200 },
          { name: "Palmier de Canela", price: 1500 },
          {
            name: "Muffin del Día",
            description: "Receta rotativa cada semana",
            price: 1600,
          },
        ],
      },
    ],
  },

  {
    id: "soda-la-abuela",
    name: "Soda La Abuela",
    tagline: "Comida casera costarricense de toda la vida",
    category: "Soda Típica",
    tags: ["Casado", "Comida Típica", "Económico", "Almuerzo"],
    rating: 4.7,
    reviewCount: 524,
    phone: "+50685646198",
    whatsapp: "50685646198",
    address: "Barrio El Carmen, 100m Sur del ICE, Pérez Zeledón",
    mapsUrl: "https://maps.google.com/?q=Perez+Zeledon+Costa+Rica",
    schedule: "Lunes–Viernes: 6:00 AM – 3:00 PM  |  Sábado: 6:00 AM – 1:00 PM",
    description:
      "La soda de toda la vida, donde la abuela manda. Recetas heredadas, sabores auténticos y el amor de la cocina costarricense en cada plato.",
    coverImage: "../assets/covers/soda-cover.jpg",
    logoImage: "../assets/logos/soda-logo.png",
    accentColor: "#4A9EFF",
    menu: [
      {
        category: "DESAYUNOS",
        icon: "🌅",
        items: [
          {
            name: "Gallo Pinto con Huevos",
            description: "Pinto, 2 huevos al gusto, pan, café o fresco natural",
            price: 2800,
          },
          {
            name: "Tamal Asado",
            description: "Con natilla y café chorreado",
            price: 1500,
          },
          {
            name: "Tortillas con Queso",
            description: "Recién hechas, queso tierno local",
            price: 1800,
          },
          {
            name: "Chorreadas",
            description: "Chorreadas de maíz con natilla",
            price: 2000,
          },
        ],
      },
      {
        category: "ALMUERZOS — CASADO DEL DÍA",
        icon: "🍽️",
        items: [
          {
            name: "Casado de Carne",
            description:
              "Arroz, frijoles, ensalada, picadillo, plátano y carne asada",
            price: 3500,
          },
          {
            name: "Casado de Pollo",
            description:
              "Arroz, frijoles, ensalada, picadillo, plátano y pollo guisado",
            price: 3200,
          },
          {
            name: "Casado de Pescado",
            description:
              "Arroz, frijoles, ensalada, plátano y filete de tilapia",
            price: 3800,
          },
          {
            name: "Casado Vegetariano",
            description:
              "Arroz, frijoles, ensalada, picadillo de papa, guiso de vegetales",
            price: 3000,
          },
        ],
      },
      {
        category: "FRESCOS NATURALES",
        icon: "🥤",
        items: [
          { name: "Fresco de Cas", price: 800 },
          { name: "Fresco de Chayote", price: 800 },
          { name: "Horchata", price: 800 },
          { name: "Agua de Pipa", price: 1200 },
        ],
      },
    ],
  },

  {
    id: "arte-tico-souvenirs",
    name: "Arte Tico Souvenirs",
    tagline: "El mejor recuerdo de Costa Rica",
    category: "Souvenirs",
    tags: ["Regalos", "Artesanía", "Típico"],
    rating: 5.0,
    reviewCount: 42,
    phone: "+50685646198",
    whatsapp: "50685646198",
    address: "Frente al parque de Pérez Zeledón",
    mapsUrl: "https://maps.google.com/?q=Perez+Zeledon+Costa+Rica",
    schedule: "Lunes–Sábado: 9:00 AM – 6:00 PM  |  Domingo: Cerrado",
    description: "Una hermosa tienda con productos hechos por artesanos locales. Lleve consigo un pedazo de nuestra tierra, desde café de especialidad hasta artesanías hechas a mano.",
    coverImage: "../assets/covers/arte-tico-cover.png", 
    logoImage: "",
    accentColor: "#a065db",
    menu: [
      {
        category: "ARTESANÍAS NACIONALES",
        icon: "🏺",
        items: [
          {
            name: "Mascarada Tradicional",
            description: "Máscara típica costarricense en miniatura hecha y pintada a mano.",
            price: 8500
          },
          {
            name: "Carreta Típica",
            description: "Carreta Sarchiseña en madera, varios tamaños y diseños.",
            price: 12000
          },
          {
            name: "Vasija Chorotega",
            description: "Réplica de cerámica indígena en barro cocido.",
            price: 15500
          }
        ]
      },
      {
        category: "TEXTILES Y ROPA",
        icon: "👕",
        items: [
          {
            name: "Camiseta Pura Vida",
            description: "100% algodón, diseño exclusivo con flora y fauna nacional.",
            price: 10000
          },
          {
            name: "Bolsa de Tela Reutilizable",
            description: "Tote bag con perezosos y tucanes bordados.",
            price: 4500
          },
          {
            name: "Gorras Costa Rica",
            description: "Gorras ajustables bordadas.",
            price: 6000
          }
        ]
      },
      {
        category: "SABORES DE COSTA RICA",
        icon: "🍫",
        items: [
          {
            name: "Café de Especialidad PZ",
            description: "Bolsa de 340g, tueste oscuro o medio.",
            price: 5500
          },
          {
            name: "Chocolates Britt",
            description: "Granos de café cubiertos con chocolate oscuro.",
            price: 3800
          },
          {
            name: "Salsa Lizano Famosa",
            description: "El sabor de Costa Rica en presentación de viaje (280ml).",
            price: 1500
          }
        ]
      }
    ]
  }
];

// ── Exports ──────────────────────────────────────────────────────────────────
// Works in both browser (global) and module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RESTAURANTS };
} else {
  window.RESTAURANTS = RESTAURANTS;
}
