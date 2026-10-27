import React from 'react';
import { X, Heart, Shield } from 'lucide-react';
import AltarArtwork from './AltarArtwork';

/**
 * OfferingDetailModal — Cultural insight into the spiritual purpose of each altar offering.
 */
export default function OfferingDetailModal({ offering, isOpen, onClose }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !offering) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card offering-detail-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          <X size={20} />
        </button>

        <div className="offering-detail-header">
          <div className="offering-detail-artwork-frame">
            <AltarArtwork name={offering.name} type={offering.name} size={105} />
          </div>
          <h2>{offering.name}</h2>
          <span className="offering-tier-badge">Colocado en el Nivel {offering.tier || 1}</span>
        </div>

        <div className="offering-meaning-box">
          <h3>Significado Espiritual y Simbolismo:</h3>
          <p>{offering.meaning}</p>
        </div>

        <div className="offering-cultural-note">
          <Heart size={16} className="note-heart" />
          <p>
            En la cosmovisión mesoamericana, las almas que nos visitan no consumen físicamente los alimentos;
            se nutren de su esencia sutil (*el aroma y la devoción*) tras su largo viaje por el Mictlán.
          </p>
        </div>

        <div className="guide-footer">
          <button type="button" className="btn-primary-altar" onClick={onClose}>
            Honrado con Amor y Respeto
          </button>
        </div>
      </div>
    </div>
  );
}
