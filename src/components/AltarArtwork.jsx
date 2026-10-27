import React from 'react';

/**
 * AltarArtwork — Handcrafted, authentic Mexican folk-art vector illustrations
 * for traditional Día de los Muertos ofrenda offerings and ceremonial elements.
 * Replaces generic smartphone emojis with detailed, culturally authentic visual art.
 */

// 1. Pan de Muerto — Traditional rounded brioche bread dusted with crystalline sugar,
// with crossed bone crusts (canillas) and central skull teardrop.
export function PanDeMuertoArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art pan-de-muerto-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="panCrust" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#f3c27e" />
          <stop offset="45%" stopColor="#d48c3b" />
          <stop offset="85%" stopColor="#a35b1d" />
          <stop offset="100%" stopColor="#6e370e" />
        </radialGradient>
        <radialGradient id="panSugar" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#fffaed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e3af6a" stopOpacity="0" />
        </radialGradient>
        <filter id="breadShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#1a0c02" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Cast shadow under bread */}
      <ellipse cx="50" cy="84" rx="38" ry="10" fill="#120803" opacity="0.65" />

      {/* Main golden bread loaf */}
      <ellipse cx="50" cy="56" rx="40" ry="30" fill="url(#panCrust)" filter="url(#breadShadow)" />
      {/* Sugar dusting highlights */}
      <ellipse cx="50" cy="52" rx="36" ry="24" fill="url(#panSugar)" />

      {/* Dough bone ribbons (canillas) - Horizontal crossed bones */}
      <path
        d="M18 56 C25 50 35 52 50 56 C65 60 75 50 82 56 C85 58 85 62 81 63 C72 65 62 58 50 58 C38 58 28 65 19 63 C15 62 15 58 18 56 Z"
        fill="#f5ca8c"
        stroke="#965219"
        strokeWidth="1.2"
      />
      {/* Dough bone ribbons - Vertical crossed bones */}
      <path
        d="M50 25 C56 34 54 44 50 56 C46 68 56 78 50 85 C47 87 43 86 42 82 C40 73 47 64 47 56 C47 48 40 37 42 28 C43 24 47 23 50 25 Z"
        fill="#f7d49e"
        stroke="#965219"
        strokeWidth="1.2"
      />

      {/* Center dough ball representing the skull / tears */}
      <circle cx="50" cy="55" r="9.5" fill="#fce4b8" stroke="#874712" strokeWidth="1.5" />
      <circle cx="48" cy="53" r="7" fill="#fff5dc" opacity="0.8" />

      {/* Sparkling sugar crystals */}
      <circle cx="34" cy="46" r="1.5" fill="#ffffff" opacity="0.95" />
      <circle cx="64" cy="48" r="1.5" fill="#ffffff" opacity="0.95" />
      <circle cx="52" cy="38" r="1.2" fill="#ffffff" opacity="0.9" />
      <circle cx="43" cy="67" r="1.4" fill="#ffffff" opacity="0.9" />
      <circle cx="58" cy="65" r="1.2" fill="#ffffff" opacity="0.85" />
      <circle cx="28" cy="60" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="70" cy="62" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="48" cy="53" r="1.5" fill="#ffffff" />
    </svg>
  );
}

// 2. Calavera de Azúcar — Decorated sugar skull with piped floral eyes,
// Mexican-pink icing, marigold forehead rosette, and golden foil accents.
export function CalaveraAzucarArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art calavera-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sugarBase" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f3efe6" />
          <stop offset="100%" stopColor="#d5cebe" />
        </radialGradient>
        <filter id="skullShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#180e04" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="88" rx="30" ry="7" fill="#120803" opacity="0.5" />

      {/* Skull Base Geometry */}
      <path
        d="M26 48 C24 30 35 15 50 15 C65 15 76 30 74 48 C74 58 68 62 66 70 C65 74 63 82 50 82 C37 82 35 74 34 70 C32 62 26 58 26 48 Z"
        fill="url(#sugarBase)"
        filter="url(#skullShadow)"
        stroke="#b8ac95"
        strokeWidth="1.2"
      />

      {/* Forehead Floral Rosette (Mexican Marigold) */}
      <circle cx="50" cy="26" r="6" fill="#ff8c00" />
      <circle cx="50" cy="26" r="3.5" fill="#ffd700" />
      <circle cx="43" cy="26" r="2.5" fill="#f72585" />
      <circle cx="57" cy="26" r="2.5" fill="#f72585" />
      <circle cx="50" cy="19" r="2.5" fill="#f72585" />
      <circle cx="50" cy="33" r="2.5" fill="#2a9d8f" />

      {/* Piped Icing Eye Sockets — Deep floral scalloped orbits */}
      <ellipse cx="38" cy="45" rx="9" ry="10" fill="#1e1526" />
      <ellipse cx="62" cy="45" rx="9" ry="10" fill="#1e1526" />

      {/* Eye Socket Floral Petals around eyes */}
      <circle cx="38" cy="35" r="2" fill="#2a9d8f" />
      <circle cx="38" cy="55" r="2" fill="#2a9d8f" />
      <circle cx="28" cy="45" r="2" fill="#f72585" />
      <circle cx="48" cy="45" r="2" fill="#f72585" />
      <circle cx="31" cy="38" r="1.8" fill="#ffb703" />
      <circle cx="45" cy="38" r="1.8" fill="#ffb703" />
      <circle cx="31" cy="52" r="1.8" fill="#ffb703" />
      <circle cx="45" cy="52" r="1.8" fill="#ffb703" />

      {/* Right Eye Petals */}
      <circle cx="62" cy="35" r="2" fill="#2a9d8f" />
      <circle cx="62" cy="55" r="2" fill="#2a9d8f" />
      <circle cx="52" cy="45" r="2" fill="#f72585" />
      <circle cx="72" cy="45" r="2" fill="#f72585" />
      <circle cx="55" cy="38" r="1.8" fill="#ffb703" />
      <circle cx="69" cy="38" r="1.8" fill="#ffb703" />
      <circle cx="55" cy="52" r="1.8" fill="#ffb703" />
      <circle cx="69" cy="52" r="1.8" fill="#ffb703" />

      {/* Eye centers */}
      <circle cx="38" cy="45" r="3.5" fill="#f72585" />
      <circle cx="38" cy="45" r="1.5" fill="#ffffff" />
      <circle cx="62" cy="45" r="3.5" fill="#f72585" />
      <circle cx="62" cy="45" r="1.5" fill="#ffffff" />

      {/* Inverted Heart / Teardrop Nose */}
      <path d="M50 53 C47 57 45 61 47 63 C49 64 50 63 50 60 C50 63 51 64 53 63 C55 61 53 57 50 53 Z" fill="#1e1526" />

      {/* Cheekbone Swirls (Filigrana de azúcar) */}
      <path d="M28 58 Q32 63 36 60" stroke="#f72585" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M72 58 Q68 63 64 60" stroke="#f72585" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Decorated Teeth */}
      <rect x="42" y="70" width="4" height="6" rx="1.5" fill="#ffffff" stroke="#9e917d" strokeWidth="0.8" />
      <rect x="48" y="70" width="4" height="6" rx="1.5" fill="#ffffff" stroke="#9e917d" strokeWidth="0.8" />
      <rect x="54" y="70" width="4" height="6" rx="1.5" fill="#ffffff" stroke="#9e917d" strokeWidth="0.8" />
      <path d="M38 73 L62 73" stroke="#e63946" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// 3. Sahumador con Copal — Burnished clay chalice with glowing embers
// and rising fragrant sacred copal resin incense smoke.
export function SahumadorCopalArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art sahumador-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="clayBurnished" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a2211" />
          <stop offset="35%" stopColor="#8a4422" />
          <stop offset="70%" stopColor="#5c2c16" />
          <stop offset="100%" stopColor="#301408" />
        </linearGradient>
        <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3a8" />
          <stop offset="30%" stopColor="#ff8c00" />
          <stop offset="75%" stopColor="#c1121f" />
          <stop offset="100%" stopColor="#471408" />
        </radialGradient>
      </defs>

      {/* Smoke wisps drifting upward */}
      <g className="copal-smoke-group" opacity="0.85">
        <path
          d="M48 35 C42 27 54 20 47 12 C43 7 51 3 48 0"
          stroke="rgba(240, 235, 225, 0.55)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M54 36 C59 28 49 22 56 14 C60 9 55 4 58 1"
          stroke="rgba(255, 248, 230, 0.45)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Cast shadow under goblet */}
      <ellipse cx="50" cy="91" rx="28" ry="6" fill="#100804" opacity="0.6" />

      {/* Burnished clay pedestal base */}
      <path d="M36 88 L64 88 L58 74 L42 74 Z" fill="url(#clayBurnished)" />
      <ellipse cx="50" cy="88" rx="16" ry="3.5" fill="#301408" />

      {/* Stem with decorative clay ring */}
      <rect x="46" y="65" width="8" height="11" fill="url(#clayBurnished)" />
      <ellipse cx="50" cy="70" rx="6.5" ry="2.5" fill="#9e502a" />

      {/* Bowl / Chalice Body */}
      <path
        d="M24 45 C24 64 36 67 50 67 C64 67 76 64 76 45 Z"
        fill="url(#clayBurnished)"
        stroke="#240e05"
        strokeWidth="1.2"
      />
      {/* Chalice Top Rim */}
      <ellipse cx="50" cy="45" rx="26" ry="7.5" fill="#3d190b" stroke="#7a3a1b" strokeWidth="1" />

      {/* Pierced ventilation holes (traditional Mexican folk design) */}
      <circle cx="34" cy="54" r="2.2" fill="#1a0a03" />
      <circle cx="42" cy="58" r="2.2" fill="#1a0a03" />
      <circle cx="50" cy="59" r="2.2" fill="#1a0a03" />
      <circle cx="58" cy="58" r="2.2" fill="#1a0a03" />
      <circle cx="66" cy="54" r="2.2" fill="#1a0a03" />

      {/* Hot charcoal embers inside bowl */}
      <ellipse cx="50" cy="44" rx="21" ry="5.5" fill="url(#emberGlow)" />

      {/* Aromatic Copal Resin chunks resting on embers */}
      <polygon points="46,40 51,37 54,41 49,43" fill="#ffeaa7" stroke="#e17055" strokeWidth="0.8" />
      <polygon points="53,42 59,39 61,43 56,44" fill="#fdcb6e" stroke="#d63031" strokeWidth="0.8" />
      <polygon points="40,42 44,39 47,43 43,45" fill="#ffeaa7" stroke="#e17055" strokeWidth="0.8" />
    </svg>
  );
}

// 4. Flor de Cempasúchil — Botanical Mexican Marigold ("Flor de Veinte Pétalos")
// Layered ruffled velvety petals in rich cadmium orange and golden saffron.
export function CempasuchilFlowerArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art cempasuchil-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="marigoldCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="40%" stopColor="#ff8c00" />
          <stop offset="85%" stopColor="#d00000" />
          <stop offset="100%" stopColor="#6a040f" />
        </radialGradient>
        <filter id="flowerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#ff8c00" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Deep green calyx and leaves */}
      <path d="M50 78 L50 96" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 84 Q34 80 28 88 Q40 92 48 87" fill="#2d6a4f" />
      <path d="M50 84 Q66 80 72 88 Q60 92 52 87" fill="#1b4332" />

      {/* Flower Outer Petal Rosette (Layer 1 - Deep Cadmium Orange) */}
      <g filter="url(#flowerGlow)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="14"
            ry="33"
            transform={`rotate(${deg} 50 50)`}
            fill={i % 2 === 0 ? '#e85d04' : '#f48c06'}
            opacity="0.95"
          />
        ))}
      </g>

      {/* Mid Petal Rosette (Layer 2 - Vibrant Marigold Saffron) */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="11"
          ry="25"
          transform={`rotate(${deg} 50 50)`}
          fill={i % 2 === 0 ? '#faa307' : '#ffba08'}
        />
      ))}

      {/* Inner Petal Cluster (Layer 3 - Dense Golden Ruffles) */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => (
        <circle
          key={i}
          cx="50"
          cy="35"
          r="8"
          transform={`rotate(${deg} 50 50)`}
          fill="#ffb703"
          opacity="0.9"
        />
      ))}

      {/* Tight Center Core */}
      <circle cx="50" cy="50" r="14" fill="url(#marigoldCore)" />
      <circle cx="50" cy="50" r="7" fill="#ffe49e" opacity="0.9" />
    </svg>
  );
}

// 5. Vaso de Agua — Pure spring water in a faceted glass tumbler
// to quench the thirsty traveling spirit crossing Mictlán.
export function VasoAguaArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art vaso-agua-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a0e7e5" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#48cae4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0077b6" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="glassWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="50" cy="90" rx="26" ry="6" fill="#081420" opacity="0.5" />

      {/* Glass Body Geometry */}
      <path
        d="M28 26 L34 84 C34 88 40 90 50 90 C60 90 66 88 66 84 L72 26 Z"
        fill="rgba(255, 255, 255, 0.08)"
        stroke="url(#glassWall)"
        strokeWidth="1.6"
      />

      {/* Water Fill */}
      <path
        d="M30 42 L34 84 C34 87 41 89 50 89 C59 89 66 87 66 84 L70 42 Z"
        fill="url(#waterGrad)"
      />

      {/* Water Surface Ellipse with meniscus reflection */}
      <ellipse cx="50" cy="42" rx="20" ry="4.5" fill="#caf0f8" opacity="0.9" />
      <ellipse cx="50" cy="42" rx="17" ry="3" fill="#90e0ef" opacity="0.8" />

      {/* Glass Rim Top */}
      <ellipse cx="50" cy="26" rx="22" ry="5.5" stroke="#ffffff" strokeWidth="1.6" fill="rgba(255, 255, 255, 0.2)" />

      {/* Light Caustics / Reflections */}
      <path d="M33 34 L37 80" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      <path d="M66 36 L63 76" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="50" cy="85" rx="14" ry="3" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

// 6. Plato de Sal — Traditional clay saucer with coarse sea salt crystals
// for spiritual purification on the spirit's journey.
export function PlatoSalArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art plato-sal-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="clayPlate" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#b25d30" />
          <stop offset="70%" stopColor="#7a3416" />
          <stop offset="100%" stopColor="#451806" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="84" rx="36" ry="8" fill="#120804" opacity="0.55" />

      {/* Clay Saucer */}
      <ellipse cx="50" cy="74" rx="36" ry="12" fill="url(#clayPlate)" stroke="#451806" strokeWidth="1.5" />
      <ellipse cx="50" cy="71" rx="31" ry="9" fill="#5c260f" />

      {/* Mound of Salt Crystals */}
      <path
        d="M24 72 Q36 50 50 48 Q64 50 76 72 Q50 78 24 72 Z"
        fill="#f8f9fa"
        stroke="#dee2e6"
        strokeWidth="1"
      />

      {/* Individual glistening coarse salt facets */}
      <polygon points="46,54 52,50 56,55 50,59" fill="#ffffff" />
      <polygon points="38,62 44,58 48,63 42,67" fill="#ffffff" />
      <polygon points="54,61 60,57 65,62 59,66" fill="#e9ecef" />
      <polygon points="48,66 54,63 58,68 52,71" fill="#ffffff" />
      <polygon points="32,68 37,65 41,70 36,73" fill="#e9ecef" />
      <polygon points="62,67 67,64 71,69 66,72" fill="#dee2e6" />

      {/* Shimmer sparkle */}
      <circle cx="50" cy="53" r="1.5" fill="#ffffff" />
      <circle cx="43" cy="62" r="1.5" fill="#ffffff" />
      <circle cx="58" cy="64" r="1.2" fill="#ffffff" />
    </svg>
  );
}

// 7. Chocolate Caliente en Jarrito de Barro — Mexican hot chocolate
// in a glazed terracotta mug with cinnamon quill and rich cocoa froth.
export function ChocolateOllaArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art chocolate-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="jarritoGlaze" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#bf5727" />
          <stop offset="65%" stopColor="#873510" />
          <stop offset="100%" stopColor="#451503" />
        </radialGradient>
      </defs>

      {/* Rising Steam */}
      <path d="M46 22 Q42 14 47 7 Q51 1 48 -4" stroke="rgba(255, 240, 225, 0.45)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M54 24 Q58 16 53 9 Q49 3 53 -2" stroke="rgba(255, 240, 225, 0.35)" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Shadow */}
      <ellipse cx="48" cy="88" rx="28" ry="7" fill="#120803" opacity="0.6" />

      {/* Mug Handle (Asa de barro) */}
      <path
        d="M66 42 C82 42 84 68 64 74 L62 67 C74 63 74 48 64 48 Z"
        fill="#752c0a"
        stroke="#451503"
        strokeWidth="1.2"
      />

      {/* Jarrito Body */}
      <path
        d="M26 38 C24 55 26 78 40 84 C48 87 56 86 64 82 C74 76 74 55 72 38 Z"
        fill="url(#jarritoGlaze)"
        stroke="#381002"
        strokeWidth="1.2"
      />

      {/* Painted traditional band decoration */}
      <path d="M25 54 Q48 60 73 54" stroke="#ffb703" strokeWidth="2.5" fill="none" />
      <path d="M26 58 Q48 64 72 58" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

      {/* Top Rim */}
      <ellipse cx="49" cy="38" rx="23" ry="7" fill="#4d1a05" stroke="#943d14" strokeWidth="1.2" />

      {/* Spiced Cocoa Liquid / Froth */}
      <ellipse cx="49" cy="38" rx="20" ry="5.5" fill="#36170a" />
      <ellipse cx="49" cy="38" rx="17" ry="4" fill="#522411" />
      <circle cx="44" cy="38" r="2" fill="#753518" />
      <circle cx="53" cy="37" r="2.2" fill="#753518" />

      {/* Cinnamon Quill Stick (Canela) */}
      <line x1="38" y1="44" x2="28" y2="20" stroke="#8c4b26" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="39" y1="44" x2="29" y2="20" stroke="#b8693a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 8. Guitarra Clásica — Handcrafted acoustic Mexican cedar guitar
// to fill the sacred room with song and celebration.
export function GuitarraParachoArt({ className = '', size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`altar-art guitarra-art ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="guitarTop" cx="45%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#f5b971" />
          <stop offset="60%" stopColor="#cf7a27" />
          <stop offset="100%" stopColor="#7a3a08" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="90" rx="24" ry="6" fill="#100802" opacity="0.5" />

      {/* Guitar Headstock */}
      <path d="M46 4 L54 4 L55 18 L45 18 Z" fill="#542507" />
      {/* Tuning pegs */}
      <circle cx="43" cy="8" r="1.8" fill="#ffd700" />
      <circle cx="43" cy="14" r="1.8" fill="#ffd700" />
      <circle cx="57" cy="8" r="1.8" fill="#ffd700" />
      <circle cx="57" cy="14" r="1.8" fill="#ffd700" />

      {/* Neck & Fretboard */}
      <rect x="47.5" y="18" width="5" height="28" fill="#2b1406" />
      <line x1="47.5" y1="24" x2="52.5" y2="24" stroke="#c0c0c0" strokeWidth="0.8" />
      <line x1="47.5" y1="30" x2="52.5" y2="30" stroke="#c0c0c0" strokeWidth="0.8" />
      <line x1="47.5" y1="36" x2="52.5" y2="36" stroke="#c0c0c0" strokeWidth="0.8" />

      {/* Guitar Body (Figure-eight waist) */}
      <path
        d="M38 46 C34 46 30 52 32 60 C33 64 38 66 38 70 C36 78 30 84 38 90 C44 94 56 94 62 90 C70 84 64 78 62 70 C62 66 67 64 68 60 C70 52 66 46 62 46 Z"
        fill="url(#guitarTop)"
        stroke="#4a2104"
        strokeWidth="1.4"
      />

      {/* Soundhole with decorative rosette ring */}
      <circle cx="50" cy="58" r="8.5" fill="#140700" />
      <circle cx="50" cy="58" r="10" stroke="#ffb703" strokeWidth="1" strokeDasharray="1.5 1.5" fill="none" />

      {/* Bridge */}
      <rect x="43" y="78" width="14" height="4" rx="1" fill="#2b1406" stroke="#120601" strokeWidth="0.8" />

      {/* Strings */}
      <line x1="48.5" y1="18" x2="48.5" y2="78" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
      <line x1="50" y1="18" x2="50" y2="78" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
      <line x1="51.5" y1="18" x2="51.5" y2="78" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
    </svg>
  );
}

// Master component router for any offering
export default function AltarArtwork({ type = '', name = '', size = 56, className = '' }) {
  const key = (type || name || '').toLowerCase();

  if (key.includes('pan') || key.includes('muerto') || key.includes('bread')) {
    return <PanDeMuertoArt size={size} className={className} />;
  }
  if (key.includes('calavera') || key.includes('skull') || key.includes('azucar')) {
    return <CalaveraAzucarArt size={size} className={className} />;
  }
  if (key.includes('copal') || key.includes('sahumador') || key.includes('incense')) {
    return <SahumadorCopalArt size={size} className={className} />;
  }
  if (key.includes('cempas') || key.includes('marigold') || key.includes('flor')) {
    return <CempasuchilFlowerArt size={size} className={className} />;
  }
  if (key.includes('agua') || key.includes('water')) {
    return <VasoAguaArt size={size} className={className} />;
  }
  if (key.includes('sal') || key.includes('salt')) {
    return <PlatoSalArt size={size} className={className} />;
  }
  if (key.includes('choc') || key.includes('cafe') || key.includes('coffee') || key.includes('mole')) {
    return <ChocolateOllaArt size={size} className={className} />;
  }
  if (key.includes('guitar') || key.includes('music') || key.includes('son')) {
    return <GuitarraParachoArt size={size} className={className} />;
  }

  // Fallback to Marigold bloom
  return <CempasuchilFlowerArt size={size} className={className} />;
}
