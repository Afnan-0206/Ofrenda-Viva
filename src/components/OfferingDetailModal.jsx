import React from 'react';
import { X, Heart, Shield } from 'lucide-react';
import AltarArtwork from './AltarArtwork';

export default function OfferingDetailModal({ offering, isOpen, onClose, lang = 'en' }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !offering) return null;

  const isEs = lang === 'es';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card offering-detail-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label={isEs ? 'Cerrar ventana' : 'Close window'}
        >
          <X size={20} />
        </button>

        <div className="offering-detail-header">
          <div className="offering-detail-artwork-frame">
            <AltarArtwork name={offering.name} type={offering.name} size={105} />
          </div>
          <h2>{offering.name}</h2>
          <span className="offering-tier-badge">
            {isEs
              ? `Piso ${offering.tier || 1} del Altar`
              : `Shelf ${offering.tier || 1} on Altar`}
          </span>
        </div>

        <div className="offering-meaning-box">
          <h3>{isEs ? 'Significado y Tradición:' : 'What this offering means:'}</h3>
          <p>{offering.meaning || offering.symbolism}</p>
        </div>

        <div className="offering-cultural-note">
          <Heart size={16} className="note-heart" />
          <p>
            {isEs
              ? 'En la tradición de Día de los Muertos, los seres queridos que nos visitan se nutren del aroma, el cariño y los buenos recuerdos de estos platillos.'
              : 'In Day of the Dead tradition, visiting souls enjoy the sweet aroma and warm memories of their favorite foods after their journey home.'}
          </p>
        </div>

        <div className="guide-footer">
          <button type="button" className="btn-dash-primary" onClick={onClose}>
            {isEs ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
