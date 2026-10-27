import React from 'react';
import Candle from './Candle';
import { Sparkles, BookOpen } from 'lucide-react';
import { FrameMarigoldGarland } from './CempasuchilDecorations';
import { translations } from '../utils/translations';

/**
 * AncestorCard — Ornate carved wooden & gold filigree portrait frame on the altar.
 * Features botanical marigold header, authentic vintage photo aging, dedicated votive candle,
 * and tactile remembrance trigger.
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
      {/* Ornate Frame Outer (Carved antique walnut with gold leaf accents) */}
      <div className="frame-border">
        {/* Decorative corner filigree */}
        <div className="corner-filigree top-left"></div>
        <div className="corner-filigree top-right"></div>
        <div className="corner-filigree bottom-left"></div>
        <div className="corner-filigree bottom-right"></div>

        {/* Botanical Marigold Garland Header */}
        <div className="frame-marigolds">
          <FrameMarigoldGarland />
        </div>

        {/* Photograph Window */}
        <div className="photo-container">
          <img
            src={ancestor.photo}
            alt={ancestor.name}
            className="ancestor-photo"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div className="photo-vignette"></div>
          <div className="photo-glass-reflection"></div>

          {/* Quick AI Calaverita Badge */}
          {ancestor.calaverita && (
            <div className="calaverita-badge" title="Has AI Remembrance Verse">
              <Sparkles size={13} />
            </div>
          )}
        </div>

        {/* Traditional Inscribed Brass Nameplate */}
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

      {/* Dedicated Votive Candle in front of the frame */}
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
