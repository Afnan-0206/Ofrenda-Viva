import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import AltarArtwork from './AltarArtwork';

export default function AddOfferingModal({ isOpen, onClose, onAddOffering, lang = 'en' }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEs = lang === 'es';

  const [name, setName] = useState('');
  const [artType, setArtType] = useState('pan');
  const [meaning, setMeaning] = useState('');
  const [tier, setTier] = useState(1);

  const presetOfferings = [
    { type: 'pan', label: isEs ? 'Pan de Muerto' : 'Sweet Bread' },
    { type: 'calavera', label: isEs ? 'Calavera de Azúcar' : 'Sugar Skull' },
    { type: 'cempasuchil', label: isEs ? 'Flor de Cempasúchil' : 'Yellow Marigold' },
    { type: 'chocolate', label: isEs ? 'Chocolate Caliente' : 'Hot Chocolate' },
    { type: 'copal', label: isEs ? 'Incienso Copal' : 'Sweet Incense' },
    { type: 'agua', label: isEs ? 'Vaso de Agua' : 'Glass of Water' },
    { type: 'sal', label: isEs ? 'Plato de Sal' : 'Bowl of Salt' },
    { type: 'guitarra', label: isEs ? 'Guitarra & Música' : 'Acoustic Guitar' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddOffering({
      id: `offering-${Date.now()}`,
      name: name.trim(),
      icon: '🌼',
      meaning: meaning.trim() || (isEs ? 'Ofrenda colocada con cariño en este altar.' : 'Placed with love and care on this family altar.'),
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
          aria-label={isEs ? 'Cerrar' : 'Close'}
        >
          <X size={20} />
        </button>

        <div className="add-header">
          <div className="add-offering-art-preview">
            <AltarArtwork name={artType} size={68} />
          </div>
          <h2>{isEs ? 'Colocar Comida u Ofrenda' : 'Add Food or Gift to the Altar'}</h2>
          <p className="add-subtitle">
            {isEs
              ? 'Ofrece a tus seres queridos sus platillos, bebidas o dulces preferidos.'
              : 'Leave their favorite food, drink, or a special gift on the altar.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="add-offering-form">
          <div className="form-group">
            <label htmlFor="offering-name">
              {isEs ? 'Nombre del platillo o regalo *' : 'Name of Food, Drink, or Gift *'}
            </label>
            <input
              id="offering-name"
              type="text"
              required
              placeholder={isEs ? 'Ej. Tamales, café con canela, chocolate...' : 'e.g. Grandma’s Apple Pie, Hot Cocoa, Sweet Bread...'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </div>

          <div className="form-group">
            <label>{isEs ? 'Elige una ilustración' : 'Choose an Item'}</label>
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
            <label htmlFor="offering-meaning">
              {isEs ? '¿Por qué es especial este platillo o regalo?' : 'Why is this special to them? (Optional)'}
            </label>
            <textarea
              id="offering-meaning"
              rows={3}
              placeholder={
                isEs
                  ? 'Ej. Le encantaba prepararlo los domingos para toda la familia...'
                  : 'e.g. They loved baking this on Sunday mornings for the whole family...'
              }
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="input-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="offering-tier">
              {isEs ? 'Piso en el Altar' : 'Shelf on Altar'}
            </label>
            <select
              id="offering-tier"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="input-select"
            >
              <option value={1}>
                {isEs ? 'Piso Inferior (Agua, pan y elementos tradicionales)' : 'Bottom Shelf (Water, bread & traditional gifts)'}
              </option>
              <option value={2}>
                {isEs ? 'Piso Medio (Platillos y comidas favoritas de la familia)' : 'Middle Shelf (Personal favorite family dishes & treats)'}
              </option>
            </select>
          </div>

          <div className="modal-actions-footer">
            <button type="button" className="btn-dash-secondary" onClick={onClose}>
              {isEs ? 'Cancelar' : 'Cancel'}
            </button>
            <button type="submit" className="btn-dash-primary">
              <Plus size={16} />
              <span>{isEs ? '+ Colocar en el Altar' : '+ Put on Altar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
