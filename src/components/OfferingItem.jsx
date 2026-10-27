import React from 'react';
import AltarArtwork from './AltarArtwork';
import { playBellChime } from '../utils/audioSynth';

/**
 * OfferingItem — Traditional offering placed upon the altar tiers.
 * Features handcrafted Mexican folk art illustrations, tactile hover states,
 * and plays a resonant temple bell chime on interaction.
 */
export default function OfferingItem({ offering, onSelect }) {
  const handleClick = () => {
    playBellChime();
    if (onSelect) onSelect(offering);
  };

  const isCopal = offering.name.toLowerCase().includes('copal');

  return (
    <div
      className={`offering-item ${isCopal ? 'offering-copal' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={`${offering.name} — Haz clic para conocer su significado sagrado`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      <div className="offering-pedestal">
        {/* Animated Copal smoke wisps if it is incense */}
        {isCopal && (
          <div className="copal-smoke-container" aria-hidden="true">
            <span className="smoke-puff puff-1"></span>
            <span className="smoke-puff puff-2"></span>
            <span className="smoke-puff puff-3"></span>
          </div>
        )}

        <div className="offering-artwork-wrap">
          <AltarArtwork name={offering.name} type={offering.name} size={64} />
        </div>
        <span className="offering-name">{offering.name}</span>
      </div>
    </div>
  );
}
