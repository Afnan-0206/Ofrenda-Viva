import React, { useState } from 'react';
import { X, Upload, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';
import { generateRemembrance } from '../utils/aiEngine';

/**
 * AddAncestorModal — Dialog to place a new beloved person or luminary onto the altar.
 */
export default function AddAncestorModal({ isOpen, onClose, onAddAncestor }) {
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

  // Preset culturally evocative avatars
  const avatarPresets = [
    { label: 'Abuela', url: '/portrait_abuela.jpg' },
    { label: 'Ada Lovelace', url: '/portrait_ada.jpg' },
    { label: 'Elder Gentleman', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { label: 'Cherished Elder', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
    { label: 'Musical Soul', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
  ];

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
      photo: photoUrl || avatarPresets[0].url,
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
            Bring the spirit of an ancestor, family member, or fallen luminary to your virtual ofrenda.
          </p>
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
                placeholder="e.g. Abuelito Manuel, Frida, Alan..."
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
                placeholder="e.g. Beloved Grandfather, Mentor, Sister..."
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
                <option value={2}>Nivel II — La Tierra (Family & Friends)</option>
                <option value={3}>Nivel III — El Cielo (Guiding Souls)</option>
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

            {/* Presets */}
            <div className="avatar-presets-strip">
              <span className="presets-label">Or pick an avatar:</span>
              <div className="presets-list">
                {avatarPresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`preset-thumb-btn ${photoUrl === preset.url ? 'is-selected' : ''}`}
                    onClick={() => setPhotoUrl(preset.url)}
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} />
                  </button>
                ))}
              </div>
            </div>
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
