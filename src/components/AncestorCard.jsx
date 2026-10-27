import React from 'react';
import Candle from './Candle';
import { Sparkles, BookOpen } from 'lucide-react';
import { translations } from '../utils/translations';

/**
 * AncestorCard — Ornate framed portrait on the altar tiers.
 * Features realistic gold filigree, marigolds, dedicated candle, and remembrance trigger.
 */
export default function AncestorCard({ ancestor, onSelect, onToggleCandle, lang = 'es' }) {
  const t = translations[lang] || translations.es;

  return (
    <div
      className={`ancestor-card ${ancestor.candleLit ? 'is-vigil-active' : ''}`}
      onClick={() => onSelect(ancestor)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(ancestor);
      }}
    >
      {/* Ornate Frame Outer */}
      <div className="frame-border">
        {/* Decorative corner filigree */}
        <div className="corner-filigree top-left"></div>
        <div className="corner-filigree top-right"></div>
        <div className="corner-filigree bottom-left"></div>
        <div className="corner-filigree bottom-right"></div>

        {/* Marigold Garland Header */}
        <div className="frame-marigolds">
          <span className="flower-accent">🌼</span>
          <span className="flower-accent center-flower">🌸</span>
          <span className="flower-accent">🌼</span>
        </div>

        {/* Photograph Window */}
        <div className="photo-container">
          <img
            src={ancestor.photo}
            alt={ancestor.name}
            className="ancestor-photo"
            loading="lazy"
            onError={(e) => {
              // Fallback to stylized silhouette if image link expires
              e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div className="photo-vignette"></div>

          {/* Quick AI Calaverita Badge */}
          {ancestor.calaverita && (
            <div className="calaverita-badge" title="Has AI Remembrance Verse">
              <Sparkles size={13} />
            </div>
          )}
        </div>

        {/* Nameplate */}
        <div className="ancestor-nameplate">
          <h3 className="ancestor-name">{ancestor.name}</h3>
          <p className="ancestor-years">{ancestor.years}</p>
          <span className="ancestor-relationship">{ancestor.relationship}</span>
        </div>

        {/* Action prompt footer */}
        <div className="card-action-hint">
          <BookOpen size={13} />
          <span>{t.viewMemorial}</span>
        </div>
      </div>

      {/* Dedicated Vigil Candle in front of the frame */}
      <div className="ancestor-candle-spot">
        <Candle
          isLit={ancestor.candleLit}
          onToggle={(litState) => onToggleCandle(ancestor.id, litState)}
          size="medium"
          label=""
        />
      </div>
    </div>
  );
}
