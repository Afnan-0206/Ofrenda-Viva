import React from 'react';
import { playMatchStrikeSound, playExtinguishSound } from '../utils/audioSynth';

/**
 * Interactive Candle / Veladora component
 * Click to light or extinguish, with procedural match audio and atmospheric flame physics.
 */
export default function Candle({
  isLit = true,
  onToggle,
  size = 'medium', // 'small' | 'medium' | 'large'
  label = '',
  glass = true,
  className = ''
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onToggle) {
      if (!isLit) {
        playMatchStrikeSound();
      } else {
        playExtinguishSound();
      }
      onToggle(!isLit);
    }
  };

  return (
    <div
      className={`candle-wrapper candle-${size} ${isLit ? 'is-lit' : 'is-dark'} ${className}`}
      onClick={handleClick}
      title={isLit ? 'Click to extinguish candle' : 'Click to light vigil candle'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
    >
      {/* Light aura / volumetric glow */}
      {isLit && <div className="candle-aura"></div>}

      {/* Flame assembly */}
      <div className="candle-flame-container">
        {isLit ? (
          <div className="flame-element">
            <div className="flame-outer"></div>
            <div className="flame-core"></div>
            <div className="flame-blue-base"></div>
          </div>
        ) : (
          <div className="smoke-wisp"></div>
        )}
      </div>

      {/* Wick */}
      <div className="candle-wick"></div>

      {/* Wax Body or Glass Votive */}
      <div className={`candle-body ${glass ? 'candle-glass' : 'candle-wax'}`}>
        <div className="wax-fill"></div>
        {glass && <div className="glass-reflection"></div>}
      </div>

      {label && <span className="candle-label">{label}</span>}
    </div>
  );
}
