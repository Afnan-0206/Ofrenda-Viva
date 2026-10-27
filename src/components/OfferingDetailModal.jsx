import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';

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
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="offering-detail-header">
          <span className="offering-detail-big-icon">{offering.icon}</span>
          <h2>{offering.name}</h2>
          <span className="offering-tier-badge">Placed on Nivel {offering.tier || 1}</span>
        </div>

        <div className="offering-meaning-box">
          <h3>Spiritual Meaning & Symbolism:</h3>
          <p>{offering.meaning}</p>
        </div>

        <div className="offering-cultural-note">
          <Heart size={16} className="note-heart" />
          <p>
            In indigenous tradition, returning souls do not physically consume the offerings; they absorb their
            spiritual essence (el aroma y la devoción) after traveling through Mictlán.
          </p>
        </div>

        <div className="guide-footer">
          <button type="button" className="btn-primary-altar" onClick={onClose}>
            Honored with Love
          </button>
        </div>
      </div>
    </div>
  );
}
