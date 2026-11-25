/**
 * Catalogue Produits Decathlon Running & Kiprun
 * Projet Étudiant Decathlon The Bridge
 */

const PRODUCTS = [
  {
    id: 1,
    name: 'Kiprun KD900X.2',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Route & Compétition',
    price: 149.99,
    tag: 'Plaque Carbone',
    badge: 'Record Personnel',
    color: 'Bleu Royal / Corail Fluo',
    rating: 4.8,
    reviewsCount: 431,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    desc: 'La chaussure taillée pour battre vos records du 10 km au marathon. Intègre une plaque en fibre de carbone Pebax® et la nouvelle mousse VFOAM réactive pour un retour d’énergie optimal de +85%.',
    specs: {
      drop: '8 mm',
      weight: '215 g en 42',
      amorti: 'Mousse VFOAM dynamique',
      plaque: 'Carbone Pebax®, relance maximale'
    },
    sizes: ['40', '41', '42', '43', '44', '45'],
    keywords: ['kd900', 'carbone', 'compet', 'marathon', 'vitesse', 'chrono', 'plaque']
  },
  {
    id: 2,
    name: 'Kiprun KS900.2',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Route longue distance',
    price: 99.99,
    tag: 'Confort Premium',
    badge: 'Amorti Ultime',
    color: 'Blanc Épuré / Bleu Cobalt',
    rating: 4.7,
    reviewsCount: 842,
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
    desc: 'Conçue pour avaler les kilomètres avec un confort absolu et préserver vos articulations. Sa mousse MFOAM haute densité garantit une absorption des chocs durable jusqu’à 1 000 km.',
    specs: {
      drop: '8 mm',
      weight: '280 g en 42',
      amorti: 'MFOAM ultra-moelleuse',
      durabilite: 'Testée jusqu\'à 1000 km'
    },
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    keywords: ['ks900', 'confort', 'amorti', 'longue', 'distance', 'protection', 'genou']
  },
  {
    id: 3,
    name: 'Kiprun Jogflow 500.1',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Débutant & Footing régulier',
    price: 59.99,
    tag: 'Idéal Débutant',
    badge: 'Anti-Blessure',
    color: 'Noir / Jaune Lime',
    rating: 4.6,
    reviewsCount: 1250,
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    desc: 'Spécialement développée avec notre laboratoire SportsLab pour réduire le risque de blessures de 25% grâce au concept Flow et un drop naturel de 4mm favorisant une foulée médio-pied.',
    specs: {
      drop: '4 mm (foulée naturelle)',
      weight: '250 g en 42',
      amorti: 'Mousse EVA Flow moelleuse',
      niveau: 'Idéal reprise et sorties 1 à 3 fois / sem'
    },
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    keywords: ['jogflow', 'debutant', 'reprise', 'confortable', 'foulée', 'naturelle', 'blessure']
  },
  {
    id: 4,
    name: 'Kiprun Kipsummit WP (Trail)',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'trail',
    usage: 'Trail & Sentiers techniques',
    price: 109.99,
    tag: 'Imperméable',
    badge: 'Accroche 5mm',
    color: 'Gris Carbone / Orange Signal',
    rating: 4.9,
    reviewsCount: 312,
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    desc: 'Pour courir par tous les temps sur les sentiers boueux et rocailleux. Membrane imperméable et respirante, crampons de 5 mm en caoutchouc adhérent pour ne jamais glisser.',
    specs: {
      drop: '6 mm',
      weight: '310 g en 42',
      crampons: '5 mm gomme CrossContact',
      membrane: 'Waterproof respirante'
    },
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    keywords: ['trail', 'montagne', 'pluie', 'waterproof', 'impermeable', 'boue', 'accroche']
  },
  {
    id: 5,
    name: 'Decathlon JF 190 Grip',
    brand: 'DECATHLON',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'mixte',
    usage: 'Mixte Route & Sous-bois',
    price: 44.99,
    tag: 'Polyvalente',
    badge: 'Prix Accessible',
    color: 'Bleu Pétrole / Menthe',
    rating: 4.5,
    reviewsCount: 6871,
    img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    desc: 'Vous passez du bitume aux allées forestières ? Cette chaussure hybride offre le compromis parfait entre amorti souple sur route et semelle crantée pour les parcs et sentiers.',
    specs: {
      drop: '6 mm',
      weight: '240 g en 42',
      terrain: 'Polyvalence bitume / terre battue',
      entretien: 'Lavable facilement'
    },
    sizes: ['37', '38', '39', '40', '41', '42', '43', '44'],
    keywords: ['mixte', 'chemin', 'parc', 'polyvalent', 'pas cher', 'grip']
  },
  {
    id: 6,
    name: 'Kiprun Kipride Max',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Amorti Max Route & Semi',
    price: 139.99,
    tag: 'Max Cushion',
    badge: 'Effet Rebond',
    color: 'Bleu Outremer / Blanc / Orange',
    rating: 4.8,
    reviewsCount: 520,
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    desc: 'L\'amorti maximal façon rocker pour une transition talon-pointe ultra fluide. Idéale pour les coureurs cherchant à préserver leurs jambes sur de gros volumes d\'entraînement.',
    specs: {
      drop: '6 mm (semelle incurvée rocker)',
      weight: '265 g en 42',
      technologie: 'Mousse double densité & géométrie dynamique',
      confort: 'Chausson enveloppant sans coutures'
    },
    sizes: ['40', '41', '42', '43', '44', '45'],
    keywords: ['max', 'cushion', 'rebond', 'rocker', 'kipride', 'semi']
  },
  {
    id: 7,
    name: 'Veste Coupe-Vent Run 500',
    brand: 'KIPRUN',
    type: 'Vêtements',
    category: 'Vêtements',
    terrain: 'route',
    usage: 'Protection Vent & Bruine',
    price: 39.99,
    tag: 'Ultra-Légère',
    badge: 'Déperlante',
    color: 'Bleu Nuit Kiprun',
    rating: 4.7,
    reviewsCount: 915,
    img: 'https://images.unsplash.com/photo-1506629905607-d9d8b4c95cfb?auto=format&fit=crop&w=800&q=80',
    desc: 'Une veste ultra-compacte qui se replie dans sa propre poche. Tissu coupe-vent déperlant avec aérations découpées au laser sous les bras pour évacuer la chaleur.',
    specs: {
      poids: '98 g',
      poches: '1 poche poitrine zippée sécurisée smartphone',
      visibilite: 'Détails rétro-réfléchissants 360°'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    keywords: ['veste', 'coupe-vent', 'pluie', 'vent', 'froid', 'leger', 'textile']
  },
  {
    id: 8,
    name: 'T-Shirt Respirant Run 900',
    brand: 'KIPRUN',
    type: 'Vêtements',
    category: 'Vêtements',
    terrain: 'route',
    usage: 'Sorties Chaudes & Intenses',
    price: 24.99,
    tag: 'Anti-Irritation',
    badge: 'Séchage Flash',
    color: 'Blanc Éclair / Bleu',
    rating: 4.8,
    reviewsCount: 1420,
    img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    desc: 'Le t-shirt des compétiteurs. Assemblage thermo-collé pour éliminer les frottements sur les tétons et le torse. Maille micro-perforée ultra respirante.',
    specs: {
      confort: 'Coutures plates thermo-collées',
      respirabilite: 'Zones aérées dos et côtés',
      matiere: 'Polyester recyclé technique'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    keywords: ['tshirt', 'maillot', 'haut', 'respirant', 'chaleur', 'ete', 'frottement']
  },
  {
    id: 9,
    name: 'Short 2-en-1 Kiprun Marathon',
    brand: 'KIPRUN',
    type: 'Vêtements',
    category: 'Vêtements',
    terrain: 'route',
    usage: 'Sorties Longues & Marathon',
    price: 29.99,
    tag: 'Ceinture Intégrée',
    badge: 'Anti-Échauffement',
    color: 'Noir Carbone',
    rating: 4.7,
    reviewsCount: 780,
    img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    desc: 'Short intégrant un cuissard moulant anti-frottements et une ceinture multi-poches pouvant accueillir un flasque de 250ml, des gels, vos clés et votre smartphone sans ballotter.',
    specs: {
      poches: '5 poches intégrées à la taille',
      cuissard: 'Maintien musculaire doux anti-irritation',
      tissu: 'Extensible 4 directions'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    keywords: ['short', 'cuissard', 'marathon', 'gel', 'ceinture', 'poches']
  },
  {
    id: 10,
    name: 'Montre GPS Cardio Kiprun 500',
    brand: 'KIPRUN',
    type: 'Accessoires',
    category: 'Accessoires',
    terrain: 'route',
    usage: 'Suivi Performance & Allure',
    price: 89.99,
    tag: 'Autonomie 18h GPS',
    badge: 'Connexion Strava',
    color: 'Noir / Écran Haute Visibilité',
    rating: 4.6,
    reviewsCount: 960,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    desc: 'Mesurez votre vitesse en temps réel, allure moyenne, distance, cardio au poignet et fractionnés programmables. Synchronisation automatique en Bluetooth avec Decathlon Hub et Strava.',
    specs: {
      autonomie: '18 h en mode GPS complet, 5 jours en montre',
      capteur: 'Cardiofréquencemètre optique au poignet',
      etancheite: 'Étanche 50 m (5 ATM)'
    },
    sizes: ['Taille Unique Réglable'],
    keywords: ['montre', 'gps', 'cardio', 'strava', 'allure', 'fractionne', 'distance', 'vitesse']
  },
  {
    id: 11,
    name: 'Lampe Frontale Run Light 250',
    brand: 'KIPRUN',
    type: 'Accessoires',
    category: 'Accessoires',
    terrain: 'trail',
    usage: 'Course Nocturne & Aube',
    price: 29.99,
    tag: '250 Lumens',
    badge: 'Rechargeable USB-C',
    color: 'Noir / Réflecteur Rouge',
    rating: 4.8,
    reviewsCount: 1180,
    img: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    desc: 'Éclaire parfaitement votre chemin jusqu’à 40 mètres devant vous. Faisceau large orientable avec LED rouge de sécurité à l’arrière pour être vu des véhicules.',
    specs: {
      puissance: '250 lumens (3 modes : éco, moyen, fort)',
      autonomie: 'Jusqu\'à 9 h d\'éclairage',
      poids: '75 g seulement'
    },
    sizes: ['Taille Unique Ajustable'],
    keywords: ['lampe', 'frontale', 'nuit', 'lumiere', 'visibilite', 'hiver', 'securite']
  },
  {
    id: 12,
    name: 'Chaussettes Anti-Ampoules Kiprun 900 (Pack de 2)',
    brand: 'KIPRUN',
    type: 'Accessoires',
    category: 'Accessoires',
    terrain: 'route',
    usage: 'Toutes distances',
    price: 14.99,
    tag: 'Anti-Frottement',
    badge: 'Fil PTFE Anti-Cloque',
    color: 'Blanc / Bleu Cobalt',
    rating: 4.9,
    reviewsCount: 3450,
    img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
    desc: 'Tricotées avec un fil spécial anti-frottement sur le talon et la pointe. Maintien élastique de la voûte plantaire pour empêcher la chaussette de tourner dans la chaussure.',
    specs: {
      technologie: 'Fil technique à faible coefficient de friction',
      composition: 'Respirante avec canaux de ventilation',
      lot: 'Vendu par lot de 2 paires'
    },
    sizes: ['35/38', '39/42', '43/46'],
    keywords: ['chaussettes', 'ampoules', 'cloque', 'pieds', 'frottement', 'protection']
  },
  {
    id: 13,
    name: 'Kiprun Jogflow 190.1',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Course occasionnelle (1x/sem)',
    price: 29.99,
    tag: 'Premier Prix Technique',
    badge: 'Best-Seller',
    color: 'Bleu Denim / Gris Cendre',
    rating: 4.6,
    reviewsCount: 8925,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    desc: 'La chaussure idéale et accessible pour démarrer la course à pied sur route. Conçue pour offrir un amorti souple en mousse EVA absorbant les chocs répétés.',
    specs: {
      drop: '6 mm',
      weight: '235 g en 42',
      amorti: 'Mousse EVA moelleuse',
      usage: 'Jusqu\'à 1 sortie de 5 à 10 km par semaine'
    },
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    keywords: ['jogflow', '190', 'debutant', 'pas cher', 'occasionnel', 'reprise', '30 euros']
  },
  {
    id: 14,
    name: 'Kiprun Kipcore',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Route polyvalente',
    price: 69.99,
    tag: 'Polyvalence Route',
    badge: 'Équilibre Parfait',
    color: 'Vert Sauge / Blanc / Émeraude',
    rating: 4.7,
    reviewsCount: 2688,
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
    desc: 'La chaussure d\'entraînement polyvalente par excellence. Conçue pour vous accompagner sur 2 à 3 sorties par semaine avec un excellent maintien de cheville et un dynamisme naturel.',
    specs: {
      drop: '8 mm',
      weight: '260 g en 42',
      amorti: 'Mousse Kalensole réactive',
      relance: 'Dynamisme +15% sur impulsion'
    },
    sizes: ['39', '40', '41', '42', '43', '44', '45', '46'],
    keywords: ['kipcore', 'polyvalente', 'regulier', 'entrainement', 'maintien', '70 euros']
  },
  {
    id: 15,
    name: 'Kiprun Kipstorm Interval',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'route',
    usage: 'Fractionné & Tempo Run',
    price: 109.99,
    tag: 'Fractionné & Vitesse',
    badge: 'Relance Explosive',
    color: 'Blanc Éclair / Jaune Fluo / Nuit',
    rating: 4.8,
    reviewsCount: 697,
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    desc: 'Spécialement optimisée pour vos séances de fractionné, séries de 400m à 1000m et sorties tempo. Tige respirante ultra-légère et retour d\'énergie immédiat.',
    specs: {
      drop: '6 mm',
      weight: '210 g en 42',
      amorti: 'Mousse haute réactivité VFOAM Lite',
      tige: 'Mesh aéré mono-filament'
    },
    sizes: ['40', '41', '42', '43', '44', '45'],
    keywords: ['kipstorm', 'interval', 'fractionne', 'vitesse', 'vma', 'piste', 'tempo']
  },
  {
    id: 16,
    name: 'Kiprun Kipcore Gravel',
    brand: 'KIPRUN',
    type: 'Chaussures',
    category: 'Chaussures',
    terrain: 'mixte',
    usage: 'Route, Graviers & Parcs',
    price: 59.99,
    tag: 'Gravel & Chemins',
    badge: 'Semelle Polyvalente',
    color: 'Sable / Craie / Orange Brûlé',
    rating: 4.6,
    reviewsCount: 340,
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    desc: 'Inspirée du monde du gravel : une chaussure à l\'aise sur le bitume, les sentiers forestiers damés et les graviers grâce à ses crampons bas multi-angles.',
    specs: {
      drop: '7 mm',
      weight: '270 g en 42',
      crampons: '2.5 mm profil bas polyvalent',
      renforts: 'Pare-pierres léger à l\'avant-pied'
    },
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    keywords: ['gravel', 'mixte', 'chemin', 'gravier', 'parc', 'polyvalent', 'nature']
  }
];

// Photos produits : place tes photos dans assets/products/ sous le nom product-<id>.jpg
// (ex. product-1.jpg pour la KD900X.2). Si le fichier est absent, l'ancienne image en ligne sert de secours.
PRODUCTS.forEach(p => {
  p.imgFallback = p.img;
  p.img = `assets/products/product-${p.id}.jpg`;
  // Photos 2 et 3 (optionnelles) : product-<id>-2.jpg et product-<id>-3.jpg
  p.gallery = [2, 3].map(n => `assets/products/product-${p.id}-${n}.jpg`);
  // Produits sans photo adaptée pour l'instant : visuel neutre plutôt qu'une mauvaise photo
  if ([4, 5, 16].includes(p.id)) p.imgFallback = 'assets/products/placeholder.svg';
});

// Helper pour retrouver un produit par son nom ou mot clé
function findProductByQuery(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return null;
  return PRODUCTS.find(p => 
    p.name.toLowerCase().includes(q) ||
    p.keywords.some(k => q.includes(k) || k.includes(q))
  );
}

// Formatage des prix en euros
function formatPrice(val) {
  return Number(val).toFixed(2).replace('.', ',') + ' €';
}
