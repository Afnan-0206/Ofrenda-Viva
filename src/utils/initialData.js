// Initial sample data for Ofrenda Viva

export const INITIAL_ANCESTORS = [
  {
    id: 'ancestor-1',
    name: 'Abuela Elena',
    years: '1932 — 2018',
    relationship: 'Beloved Grandmother (Abuelita)',
    photo: '/portrait_abuela.jpg',
    tier: 2, // Middle tier
    candleLit: true,
    story: 'Matriarch of our kitchen and heartbeat of our home. She woke before dawn to brew café de olla with cinnamon and taught three generations how to love fiercely through her slow-simmered mole negro.',
    favoriteFoods: 'Mole poblano con arroz, pan dulce recién horneado, café de olla',
    favoriteMusic: 'Bésame Mucho by Consuelo Velázquez, sones jarochos',
    quirk: 'She never used a measuring spoon — everything was measured "con el ojo y con el corazón".',
    calaverita: `Estaba la flaca Catrina
rondando por la cocina,
buscando a Elena con fervor,
para pedirle un mole con amor.

"¡Ay Elenita, no te me escondas!",
decía la muerte entre las sombras,
"que con tu sazón de café y canela,
hasta el Mictlán entero se desvela!"

Hoy en el altar su vela está encendida,
su risa franca nunca será perdida:
Abuelita sabia, reina de nuestro hogar,
en cada pétalo de cempasúchil te volvemos a abrazar.`
  },
  {
    id: 'ancestor-2',
    name: 'Ada Lovelace',
    years: '1815 — 1852',
    relationship: 'Ancestor of Computing ("The Enchantress of Numbers")',
    photo: '/portrait_ada.jpg',
    tier: 3, // Top tier
    candleLit: true,
    story: 'Mathematician and writer who envisioned computer algorithms a century before the first electronic computer was built. She perceived that the Analytical Engine could compose elaborate pieces of music and art, planting the very seed of the Ghost in the Machine.',
    favoriteFoods: 'Strong Earl Grey tea, roasted chestnuts, warm plum pudding',
    favoriteMusic: 'Harp sonatas, classical piano nocturnes',
    quirk: 'Spoke of "poetical science" and predicted computers would one day weave algorithms like a loom weaves silk.',
    calaverita: `The skeletal Catrina came tapping in the night,
To find Ada Lovelace working by candlelight.
"Step away from the machine, dear Countess," she smiled,
"For the calculus of eternity has just been compiled!"

Ada laughed gently, setting down her pen,
"Algorithms never die, they just loop again!"
Now on our ofrenda her logic burns bright:
The first ghost in our code, our guiding eternal light!`
  },
  {
    id: 'ancestor-3',
    name: 'Tío Carlos',
    years: '1952 — 2021',
    relationship: 'Beloved Uncle & Guitarist',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    tier: 2, // Middle tier
    candleLit: true,
    story: 'Master carpenter, acoustic guitarist, and king of tall tales. He could fix any broken chair in the neighborhood and always knew the right chord to make a quiet room burst into laughter.',
    favoriteFoods: 'Tamales de rajas con queso, mezcal artesanal, pan de muerto',
    favoriteMusic: 'La Llorona, flamenco arpeggios, Carlos Santana',
    quirk: 'Kept a spare guitar pick tucked behind his ear even when sleeping.',
    calaverita: `Venía la parca cantando un huapango,
buscando a Don Carlos por todo el fandango.
"¡Saca la guitarra, amigo carpintero,
que hoy armamos serenata en el camposanto entero!"

Carlos afinó la sexta cuerda con primor,
y le cantó a la huesuda coplas de amor.
Brinda con mezcal la noche otoñal:
¡Tu guitarra sigue viva en este memorial!`
  }
];

export const INITIAL_OFFERINGS = [
  {
    id: 'offering-pan',
    name: 'Pan de Muerto',
    icon: '🥖',
    meaning: 'The round sweet bread dusted with sugar. The circular shape represents the cycle of life and death; the bone-shaped cross crusts represent the four cardinal directions and departed souls.',
    tier: 1
  },
  {
    id: 'offering-calavera',
    name: 'Calaveras de Azúcar',
    icon: '💀',
    meaning: 'Sugar skulls decorated with bright icing foil. They celebrate that death is not bitter, but part of life’s sweetness.',
    tier: 1
  },
  {
    id: 'offering-agua',
    name: 'Vaso de Agua',
    icon: '💧',
    meaning: 'A vessel of pure spring water to quench the thirst of tired spirits after their long, arduous journey across Mictlán to visit us.',
    tier: 1
  },
  {
    id: 'offering-sal',
    name: 'Plato de Sal',
    icon: '🧂',
    meaning: 'Salt is the element of spiritual purification. It prevents the traveling soul from being corrupted or lost on their journey.',
    tier: 1
  },
  {
    id: 'offering-copal',
    name: 'Copal & Sahumador',
    icon: '💨',
    meaning: 'Ancient sacred aromatic copal tree resin burned on hot embers. Its rising incense cleanses the space of negative energies and carries prayers directly to the heavens.',
    tier: 1
  },
  {
    id: 'offering-cempasuchil',
    name: 'Flor de Cempasúchil',
    icon: '🌼',
    meaning: 'The vibrant golden Aztec marigold, "flor de veinte pétalos". Its radiant golden hue and intense scent are believed to guide souls home through the dark.',
    tier: 2
  },
  {
    id: 'offering-chocolate',
    name: 'Chocolate Caliente',
    icon: '☕',
    meaning: 'Traditional hot chocolate prepared with water or milk and cinnamon, offering warmth and comfort to returning family members.',
    tier: 2
  },
  {
    id: 'offering-guitarra',
    name: 'Guitarra & Música',
    icon: '🎸',
    meaning: 'Musical instruments to welcome spirits with their favorite melodies, ensuring the altar is filled with joy rather than sadness.',
    tier: 2
  }
];

export const OFRENDA_CULTURE_INFO = {
  title: 'El Significado Sagrado de la Ofrenda (Día de los Muertos)',
  summary: 'Día de los Muertos (November 1 & 2) is not Mexican Halloween — it is an ancient Mesoamerican and Mexican celebration of family love that defies mortality.',
  tiers: [
    {
      tierNumber: 3,
      name: 'El Cielo (The Heavens / Transcendence)',
      description: 'The highest tier honors the spiritual realm, ancient ancestors, saints, or guiding luminaries who came before us.'
    },
    {
      tierNumber: 2,
      name: 'La Tierra (The Earth / Living Memory)',
      description: 'The middle tier belongs to our immediate loved ones — parents, grandparents, siblings, dear friends — adorned with their portraits, personal keepsakes, and favorite dishes.'
    },
    {
      tierNumber: 1,
      name: 'El Inframundo / Purificación (The Earthly Roots & Purification)',
      description: 'The base tier contains the vital elements that allow the journey: water for thirst, salt for purification, pan de muerto for nourishment, and copal incense to cleanse the threshold.'
    }
  ],
  whyOpenInnovation: [
    {
      title: 'Sacred Privacy for Family Memories',
      detail: 'Personal grief, family portraits, and oral histories should never be harvested, analyzed, or trained on by corporate cloud surveillance. Running open-weight models (Gemma 2) keeps your loved ones’ stories 100% on your laptop.'
    },
    {
      title: 'Works When the Power & Internet are Off',
      detail: 'A true memorial altar should work by candlelight during an autumn thunderstorm without an internet connection. Open-source local inference guarantees your altar runs forever, completely offline.'
    },
    {
      title: 'Zero Risk of Service Discontinuation',
      detail: 'Proprietary APIs shut down, change pricing, or delete old endpoints. Open-source code and open weights remain yours to compile and run 50 years from now.'
    }
  ]
};
