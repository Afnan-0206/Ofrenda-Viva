import React, { useState } from 'react';
import { X, Upload, Sparkles, Wand2 } from 'lucide-react';
import { generateRemembrance } from '../utils/aiEngine';
import { ANCESTOR_PRESETS } from '../utils/initialData';

/**
 * AddAncestorModal — Place a new beloved person, pet, or luminary onto the altar.
 * Features instant archetype presets, custom photo uploads, and automatic open AI Calaveritas.
 */
export default function AddAncestorModal({ isOpen, onClose, onAddAncestor }) {
  // Global Esc key listener
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
  const [years, setYears] = useState('');
  const [relationship, setRelationship] = useState('');
  const [story, setStory] = useState('');
  const [favoriteFoods, setFavoriteFoods] = useState('');
  const [favoriteMusic, setFavoriteMusic] = useState('');
  const [tier, setTier] = useState(2);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Apply archetype preset
  const handleApplyPreset = (preset) => {
    setRelationship(preset.relation);
    setStory(preset.story);
    setFavoriteFoods(preset.foods);
    setFavoriteMusic(preset.music);
    setPhotoUrl(preset.photo);
    if (!name) {
      setName(preset.title.split(' ')[0]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsGenerating(true);

    const newAncestor = {
      id: `ancestor-${Date.now()}`,
      name: name.trim(),
      years: years.trim() || 'Eterno',
      relationship: relationship.trim() || 'Loved One',
      story: story.trim() || 'Recordado con amor y respeto en esta ofrenda.',
      favoriteFoods: favoriteFoods.trim() || 'Pan de muerto y flores',
      favoriteMusic: favoriteMusic.trim() || 'La música del viento',
      photo: photoUrl || '/portrait_abuela.jpg',
      tier: Number(tier),
      candleLit: true
    };

    try {
      // Auto-compose inaugural Calaverita with open AI
      const calaveritaRes = await generateRemembrance({
        ancestor: newAncestor,
        type: 'calaverita',
        language: 'es'
      });
      newAncestor.calaverita = calaveritaRes.content;
    } catch (err) {
      console.warn('Could not auto-generate calaverita:', err);
    }

    onAddAncestor(newAncestor);
    setIsGenerating(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card add-ancestor-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="add-header">
          <span className="add-header-icon">🕯️</span>
          <h2>Colocar en el Altar (Add Loved One)</h2>
          <p className="add-subtitle">
            Honor a departed family member, faithful companion pet, or inspiring luminary.
          </p>
        </div>

        {/* Quick Presets Strip */}
        <div className="quick-presets-box">
          <div className="presets-box-title">
            <Wand2 size={14} className="wand-icon" />
            <span>Quick Presets (Click to autofill archetype):</span>
          </div>
          <div className="preset-buttons-row">
            {ANCESTOR_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-chip-btn"
                onClick={() => handleApplyPreset(p)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="add-ancestor-form">
          {/* Row 1: Name and Years */}
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="name-input">Name / Nombre *</label>
              <input
                id="name-input"
                type="text"
                required
                placeholder="e.g. Abuelito Manuel, Luna, Frida..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="years-input">Years / Años</label>
              <input
                id="years-input"
                type="text"
                placeholder="e.g. 1935 — 2016"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Relationship and Tier */}
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="relation-input">Relationship / Parentesco</label>
              <input
                id="relation-input"
                type="text"
                placeholder="e.g. Beloved Grandfather, Faithful Pet, Sister..."
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="tier-select">Altar Tier / Nivel</label>
              <select
                id="tier-select"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <option value={2}>Nivel II — La Tierra (Family, Pets & Friends)</option>
                <option value={3}>Nivel III — El Cielo (Guiding Souls & Mentors)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Portrait Upload or URL */}
          <div className="form-group">
            <label>Portrait / Fotografía</label>
            <div className="photo-picker-row">
              <label className="file-upload-btn">
                <Upload size={16} />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="url"
                placeholder="Or paste an image URL..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="photo-url-input"
              />
            </div>

            {photoUrl && (
              <div className="photo-preview-strip">
                <span>Selected Photo:</span>
                <img src={photoUrl} alt="Preview" className="preview-mini-thumb" />
              </div>
            )}
          </div>

          {/* Row 4: Bio / Memories */}
          <div className="form-group">
            <label htmlFor="story-input">Memory & Life Story / Crónica de Vida</label>
            <textarea
              id="story-input"
              rows={3}
              placeholder="What made them unforgettable? Their wisdom, laughter, or favorite saying..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></textarea>
          </div>

          {/* Row 5: Favorites (Foods & Songs) */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="foods-input">Favorite Foods / Comida Favorita</label>
              <input
                id="foods-input"
                type="text"
                placeholder="e.g. Tamales, mole, pan dulce, café..."
                value={favoriteFoods}
                onChange={(e) => setFavoriteFoods(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="music-input">Favorite Songs / Música Preferida</label>
              <input
                id="music-input"
                type="text"
                placeholder="e.g. Cielito Lindo, classical guitar..."
                value={favoriteMusic}
                onChange={(e) => setFavoriteMusic(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
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
              disabled={isGenerating}
            >
              <Sparkles size={16} />
              <span>{isGenerating ? 'Weaving Calaverita...' : 'Place Upon the Altar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
