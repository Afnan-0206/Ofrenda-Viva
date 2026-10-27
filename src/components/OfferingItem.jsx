import React from 'react';
import { playBellChime } from '../utils/audioSynth';

/**
 * OfferingItem — Traditional offering placed on the ofrenda.
 * Plays gentle bell tone and reveals spiritual meaning on click/hover.
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
      title={`${offering.name} — Click to read sacred meaning`}
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

        <div className="offering-icon-wrap">
          <span className="offering-icon">{offering.icon}</span>
        </div>
        <span className="offering-name">{offering.name}</span>
      </div>
    </div>
  );
}
