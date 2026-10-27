import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

/**
 * AddOfferingModal — Place a custom offering or favorite artifact on the altar.
 */
export default function AddOfferingModal({ isOpen, onClose, onAddOffering }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🥖');
  const [meaning, setMeaning] = useState('');
  const [tier, setTier] = useState(1);

  const presetIcons = [
    { emoji: '🥖', label: 'Pan de Muerto' },
    { emoji: '💀', label: 'Calavera' },
    { emoji: '🌼', label: 'Cempasúchil' },
    { emoji: '☕', label: 'Café / Chocolate' },
    { emoji: '🍷', label: 'Vino / Mezcal' },
    { emoji: '🎸', label: 'Guitarra' },
    { emoji: '📚', label: 'Libro' },
    { emoji: '✉️', label: 'Carta' },
    { emoji: '🎨', label: 'Pincel / Arte' },
    { emoji: '🍎', label: 'Fruta' },
    { emoji: '🕯️', label: 'Veladora' },
    { emoji: '✨', label: 'Milagro' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddOffering({
      id: `offering-${Date.now()}`,
      name: name.trim(),
      icon: icon || '✨',
      meaning: meaning.trim() || 'An offering placed with deep love and memory on the altar.',
      tier: Number(tier)
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card add-offering-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="add-header">
          <span className="add-header-icon">{icon}</span>
          <h2>Añadir Ofrenda (Add Offering)</h2>
          <p className="add-subtitle">
            Offer your loved ones their favorite dishes, personal tools, or heartfelt gifts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="add-offering-form">
          <div className="form-group">
            <label htmlFor="offering-name">Offering Name / Nombre</label>
            <input
              id="offering-name"
              type="text"
              required
              placeholder="e.g. Pan de Elote, Café de Olla, Vintage Camera..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Icon / Símbolo</label>
            <div className="icon-selector-grid">
              {presetIcons.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`icon-choice-btn ${icon === p.emoji ? 'is-selected' : ''}`}
                  onClick={() => setIcon(p.emoji)}
                  title={p.label}
                >
                  {p.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="offering-tier">Altar Placement</label>
              <select
                id="offering-tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <option value={1}>Nivel I — Base (Essential Offerings)</option>
                <option value={2}>Nivel II — Tierra (Personal Keepsakes)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="offering-meaning">Spiritual Meaning / Significado</label>
            <textarea
              id="offering-meaning"
              rows={2}
              placeholder="Why was this meaningful to them? (e.g. 'He drank hot coffee every morning while watching the birds...')"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
            ></textarea>
          </div>

          <div className="add-modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary-altar"
            >
              <Plus size={16} />
              <span>Place on Altar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
