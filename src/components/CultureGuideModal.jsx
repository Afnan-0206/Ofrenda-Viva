import React from 'react';
import { X, Sparkles, Flame, Flower2, Heart, Shield } from 'lucide-react';
import { OFRENDA_CULTURE_INFO } from '../utils/initialData';

/**
 * CultureGuideModal — Educational guide explaining the rich cultural symbolism
 * of Día de los Muertos, the 3 tiers of the altar, and why Open Innovation honors this spirit.
 */
export default function CultureGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card culture-guide-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close guide"
        >
          <X size={20} />
        </button>

        <div className="guide-header">
          <span className="guide-header-icon">🌼</span>
          <h2>{OFRENDA_CULTURE_INFO.title}</h2>
          <p className="guide-sub">{OFRENDA_CULTURE_INFO.summary}</p>
        </div>

        {/* 3 Sacred Tiers Breakdown */}
        <div className="guide-section">
          <h3>The Three Sacred Levels of the Altar</h3>
          <div className="tiers-explanation-grid">
            {OFRENDA_CULTURE_INFO.tiers.map((tier) => (
              <div key={tier.tierNumber} className="tier-info-box">
                <div className="tier-box-badge">Tier {tier.tierNumber}</div>
                <h4>{tier.name}</h4>
                <p>{tier.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The 4 Classical Elements on the Altar */}
        <div className="guide-section">
          <h3>The Four Sacred Elements (Los Cuatro Elementos)</h3>
          <div className="elements-four-grid">
            <div className="element-card">
              <span className="element-emoji">💨</span>
              <h4>Wind (Aire)</h4>
              <p>Represented by fluttering <em>Papel Picado</em> banners, signaling the arrival and joyful dance of passing spirits.</p>
            </div>
            <div className="element-card">
              <span className="element-emoji">🔥</span>
              <h4>Fire (Fuego)</h4>
              <p>Represented by flickering <em>Velas y Veladoras</em>, lighting the way through Mictlán back to the living world.</p>
            </div>
            <div className="element-card">
              <span className="element-emoji">💧</span>
              <h4>Water (Agua)</h4>
              <p>A pure vessel of spring water to quench the traveler’s thirst after crossing the nine levels of the underworld.</p>
            </div>
            <div className="element-card">
              <span className="element-emoji">🌱</span>
              <h4>Earth (Tierra)</h4>
              <p>Represented by fragrant <em>Pan de Muerto</em> and fruits of the harvest, nourishing the soul with life's sweetness.</p>
            </div>
          </div>
        </div>

        {/* Why Open-Source AI Embodies this Spirit */}
        <div className="guide-section open-ai-tribute">
          <div className="open-ai-tribute-header">
            <Shield size={20} className="tribute-shield" />
            <h3>Why Open-Source AI is the True "Ghost in the Machine"</h3>
          </div>
          <p>
            The theme of this week's challenge is <strong>Ghost in the Machine</strong>.
            In traditional folklore, a ghost is not an adversary, but a persistent memory that refuses to fade.
            By placing open-weight models (like Google Gemma 2) at the core of Ofrenda Viva,
            we ensure that our ancestors' digital voices belong entirely to us:
          </p>

          <ul className="open-ai-tribute-list">
            <li>
              <strong>Sovereignty Over Grief:</strong> Intimate stories of deceased grandparents should not be commercial training data for closed advertising empires.
            </li>
            <li>
              <strong>Offline Longevity:</strong> The software and open weights can be archived to a USB drive or local hard drive and run fifty years from now.
            </li>
            <li>
              <strong>Cultural Freedom:</strong> Open weights allow communities to fine-tune, translate, and preserve bilingual traditions like <em>Calaveritas Literarias</em> without censorship or corporate guardrail distortion.
            </li>
          </ul>
        </div>

        <div className="guide-footer">
          <button type="button" className="btn-primary-altar" onClick={onClose}>
            Back to the Altar
          </button>
        </div>
      </div>
    </div>
  );
}
