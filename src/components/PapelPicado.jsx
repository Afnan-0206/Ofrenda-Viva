import React from 'react';

/**
 * PapelPicado — Traditional Mexican handcrafted tissue-paper banners.
 * Represents the element of Wind (Aire) on the altar, fluttering when spirits arrive.
 */
export default function PapelPicado() {
  const flags = [
    { color: '#e63946', pattern: 'skull', delay: '0s' },    // Carmine Red
    { color: '#f77f00', pattern: 'flower', delay: '0.4s' },  // Marigold Orange
    { color: '#fcbf49', pattern: 'cross', delay: '0.8s' },   // Saffron Yellow
    { color: '#2a9d8f', pattern: 'bird', delay: '0.2s' },    // Teal Turquoise
    { color: '#7209b7', pattern: 'skull', delay: '0.6s' },   // Royal Violet
    { color: '#f72585', pattern: 'flower', delay: '0.3s' },  // Mexican Hot Pink
    { color: '#4361ee', pattern: 'cross', delay: '0.7s' },   // Cobalt Blue
    { color: '#f77f00', pattern: 'skull', delay: '0.5s' }    // Amber
  ];

  return (
    <div className="papel-picado-string" aria-hidden="true">
      <div className="papel-string-line"></div>
      <div className="papel-flags-container">
        {flags.map((flag, idx) => (
          <div
            key={idx}
            className="papel-flag"
            style={{
              backgroundColor: flag.color,
              animationDelay: flag.delay
            }}
          >
            {/* Cutout shapes mimicking traditional chisel folk-art */}
            <div className="papel-cutout-top">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>

            <div className="papel-center-motif">
              {flag.pattern === 'skull' && (
                <svg viewBox="0 0 40 40" className="motif-svg">
                  <path d="M20 5 C12 5 7 11 7 19 C7 25 11 29 13 32 L27 32 C29 29 33 25 33 19 C33 11 28 5 20 5 Z" fill="white" opacity="0.85"/>
                  <circle cx="15" cy="18" r="3.5" fill={flag.color} />
                  <circle cx="25" cy="18" r="3.5" fill={flag.color} />
                  <polygon points="20,22 18,25 22,25" fill={flag.color} />
                  <line x1="16" y1="30" x2="16" y2="32" stroke={flag.color} strokeWidth="1.5" />
                  <line x1="20" y1="30" x2="20" y2="32" stroke={flag.color} strokeWidth="1.5" />
                  <line x1="24" y1="30" x2="24" y2="32" stroke={flag.color} strokeWidth="1.5" />
                </svg>
              )}
              {flag.pattern === 'flower' && (
                <svg viewBox="0 0 40 40" className="motif-svg">
                  <circle cx="20" cy="20" r="4" fill="white" opacity="0.9" />
                  <circle cx="20" cy="12" r="3" fill="white" opacity="0.85" />
                  <circle cx="20" cy="28" r="3" fill="white" opacity="0.85" />
                  <circle cx="12" cy="20" r="3" fill="white" opacity="0.85" />
                  <circle cx="28" cy="20" r="3" fill="white" opacity="0.85" />
                  <circle cx="14" cy="14" r="2.5" fill="white" opacity="0.75" />
                  <circle cx="26" cy="14" r="2.5" fill="white" opacity="0.75" />
                  <circle cx="14" cy="26" r="2.5" fill="white" opacity="0.75" />
                  <circle cx="26" cy="26" r="2.5" fill="white" opacity="0.75" />
                </svg>
              )}
              {flag.pattern === 'cross' && (
                <svg viewBox="0 0 40 40" className="motif-svg">
                  <rect x="18" y="8" width="4" height="24" rx="1" fill="white" opacity="0.85" />
                  <rect x="11" y="14" width="18" height="4" rx="1" fill="white" opacity="0.85" />
                  <circle cx="9" cy="9" r="1.5" fill="white" opacity="0.8" />
                  <circle cx="31" cy="9" r="1.5" fill="white" opacity="0.8" />
                  <circle cx="9" cy="31" r="1.5" fill="white" opacity="0.8" />
                  <circle cx="31" cy="31" r="1.5" fill="white" opacity="0.8" />
                </svg>
              )}
              {flag.pattern === 'bird' && (
                <svg viewBox="0 0 40 40" className="motif-svg">
                  <path d="M10 24 C14 20 22 16 28 12 C24 18 22 22 24 28 C19 26 15 28 10 24 Z" fill="white" opacity="0.85"/>
                  <circle cx="28" cy="14" r="1.5" fill={flag.color} />
                </svg>
              )}
            </div>

            {/* Scalloped fringed bottom border */}
            <div className="papel-fringe">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
