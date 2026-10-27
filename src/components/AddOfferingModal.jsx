import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import AltarArtwork from './AltarArtwork';

/**
 * AddOfferingModal — Place a custom offering or favorite artifact on the altar.
 */
export default function AddOfferingModal({ isOpen, onClose, onAddOffering }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [artType, setArtType] = useState('pan');
  const [meaning, setMeaning] = useState('');
  const [tier, setTier] = useState(1);

  const presetOfferings = [
    { type: 'pan', label: 'Pan de Muerto' },
    { type: 'calavera', label: 'Calavera de Azúcar' },
    { type: 'cempasuchil', label: 'Cempasúchil' },
    { type: 'chocolate', label: 'Chocolate / Café' },
    { type: 'copal', label: 'Copal & Sahumador' },
    { type: 'agua', label: 'Vaso de Agua' },
    { type: 'sal', label: 'Plato de Sal' },
    { type: 'guitarra', label: 'Guitarra & Música' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddOffering({
      id: `offering-${Date.now()}`,
      name: name.trim(),
      icon: '🌼',
      meaning: meaning.trim() || 'Ofrenda colocada con devoción, respeto y cariño en este altar.',
      tier: Number(tier)
    });

    onClose();
  };

  const handleSelectPreset = (p) => {
    setArtType(p.type);
    if (!name) setName(p.label);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card add-offering-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar diálogo"
        >
          <X size={20} />
        </button>

        <div className="add-header">
          <div className="add-offering-art-preview">
            <AltarArtwork name={artType} size={68} />
          </div>
          <h2>Colocar Ofrenda en el Altar</h2>
          <p className="add-subtitle">
            Ofrece a tus seres queridos sus platillos predilectos, bebidas o elementos sagrados.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="add-offering-form">
          <div className="form-group">
            <label htmlFor="offering-name">Nombre de la Ofrenda o Platillo</label>
            <input
              id="offering-name"
              type="text"
              required
              placeholder="Ej. Tamales de rajas, Café de olla con canela, Dulce de calabaza..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Arte Tradicional</label>
            <div className="art-selector-grid">
              {presetOfferings.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`art-choice-btn ${artType === p.type ? 'is-selected' : ''}`}
                  onClick={() => handleSelectPreset(p)}
                  title={p.label}
                >
                  <AltarArtwork name={p.type} size={36} />
                  <span className="art-choice-label">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="offering-meaning">Significado o Memoria Especial</label>
            <textarea
              id="offering-meaning"
              rows={3}
              placeholder="¿Por qué es especial esta ofrenda para tu ser querido? (Ej. 'Le encantaba prepararlo los domingos para toda la familia...')"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="input-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="offering-tier">Nivel del Altar</label>
            <select
              id="offering-tier"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="input-select"
            >
              <option value={1}>Nivel I: El Inframundo (Purificación y Elementos Vitales)</option>
              <option value={2}>Nivel II: La Tierra (Memorias Familiares y Platillos Favoritos)</option>
            </select>
          </div>

          <div className="modal-actions-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary-altar">
              <Plus size={16} />
              <span>Colocar en el Altar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
