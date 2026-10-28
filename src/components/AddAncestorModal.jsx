import React, { useState } from 'react';
import { X, Upload, Sparkles, Wand2, Flame } from 'lucide-react';
import { generateRemembrance } from '../utils/aiEngine';
import { ANCESTOR_PRESETS } from '../utils/initialData';
import { MiniMarigold } from './CempasuchilDecorations';

export default function AddAncestorModal({ isOpen, onClose, onAddAncestor, lang = 'en' }) {
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
      years: years.trim() || (isEs ? 'Recuerdo Eterno' : 'Always Remembered'),
      relationship: relationship.trim() || (isEs ? 'Ser Querido' : 'Loved One'),
      story: story.trim() || (isEs ? 'Recordado con amor en este altar.' : 'Lovingly remembered on this family altar.'),
      favoriteFoods: favoriteFoods.trim() || (isEs ? 'Comida casera y flores' : 'Favorite homemade treats and flowers'),
      favoriteMusic: favoriteMusic.trim() || (isEs ? 'Música tradicional' : 'Gentle acoustic music'),
      photo: photoUrl || '/portrait_abuela.jpg',
      tier: Number(tier),
      candleLit: true
    };

    try {
      const calaveritaRes = await generateRemembrance({
        ancestor: newAncestor,
        type: 'calaverita',
        language: isEs ? 'es' : 'en'
      });
      newAncestor.calaverita = calaveritaRes.content;
    } catch (err) {
      console.warn('Could not auto-generate verse:', err);
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
          aria-label={isEs ? 'Cerrar' : 'Close'}
        >
          <X size={20} />
        </button>

        <div className="add-header">
          <div className="add-header-icon-wrap">
            <MiniMarigold size={36} color="#ff8c00" />
          </div>
          <h2>{isEs ? 'Agregar al Altar' : 'Add Someone to the Altar'}</h2>
          <p className="add-subtitle">
            {isEs
              ? 'Honra a un familiar, amigo, fiel mascota o guía especial con una foto y recuerdos.'
              : 'Honor a family member, friend, beloved pet, or guide with a photo and memories.'}
          </p>
        </div>

        {/* Quick Presets Strip */}
        <div className="quick-presets-box">
          <div className="presets-box-title">
            <Wand2 size={14} className="wand-icon" />
            <span>{isEs ? 'Ejemplos rápidos (Haz clic para rellenar):' : 'Quick Examples (Click to autofill):'}</span>
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
              <label htmlFor="name-input">{isEs ? 'Nombre *' : 'Name *'}</label>
              <input
                id="name-input"
                type="text"
                required
                placeholder={isEs ? 'Ej. Abuela Elena, Carlos, Canelo...' : 'e.g. Grandma Rose, Uncle John, Buddy...'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="years-input">{isEs ? 'Años de vida' : 'Years Lived'}</label>
              <input
                id="years-input"
                type="text"
                placeholder="e.g. 1935 — 2016"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Relationship and Shelf */}
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="relation-input">{isEs ? 'Parentesco o Relación' : 'Relationship'}</label>
              <input
                id="relation-input"
                type="text"
                placeholder={isEs ? 'Ej. Abuela querida, Mejor amigo, Perrito fiel...' : 'e.g. Grandmother, Best Friend, Golden Retriever...'}
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="tier-select">{isEs ? 'Piso en el Altar' : 'Shelf on Altar'}</label>
              <select
                id="tier-select"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <option value={2}>
                  {isEs ? 'Piso Medio — Familia, Amigos y Mascotas' : 'Middle Shelf — Family, Friends & Pets'}
                </option>
                <option value={3}>
                  {isEs ? 'Piso Superior — Guías y Maestros' : 'Top Shelf — Role Models & Guides'}
                </option>
              </select>
            </div>
          </div>

          {/* Row 3: Portrait Upload or URL */}
          <div className="form-group">
            <label>{isEs ? 'Fotografía' : 'Photo'}</label>
            <div className="photo-picker-row">
              <label className="file-upload-btn">
                <Upload size={16} />
                <span>{isEs ? 'Subir Foto' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="url"
                placeholder={isEs ? 'O pega el enlace de una imagen...' : 'Or paste a photo link (URL)...'}
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="photo-url-input"
              />
            </div>

            {photoUrl && (
              <div className="photo-preview-strip">
                <span>{isEs ? 'Foto elegida:' : 'Selected Photo:'}</span>
                <img src={photoUrl} alt="Preview" className="preview-mini-thumb" />
              </div>
            )}
          </div>

          {/* Row 4: Bio / Memories */}
          <div className="form-group">
            <label htmlFor="story-input">
              {isEs ? 'Historia o recuerdo especial' : 'Short Story or Memory'}
            </label>
            <textarea
              id="story-input"
              rows={3}
              placeholder={
                isEs
                  ? '¿Qué los hacía inolvidables? Su calidez, su risa o su frase favorita...'
                  : 'What made them special? Their kindness, favorite jokes, or words of wisdom...'
              }
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></textarea>
          </div>

          {/* Row 5: Favorites (Foods & Songs) */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="foods-input">
                {isEs ? 'Comidas o dulces favoritos' : 'Favorite Foods or Treats'}
              </label>
              <input
                id="foods-input"
                type="text"
                placeholder={isEs ? 'Ej. Tamales, café de olla, pan dulce...' : 'e.g. Apple pie, hot chocolate, roast chicken...'}
                value={favoriteFoods}
                onChange={(e) => setFavoriteFoods(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="music-input">
                {isEs ? 'Música o canciones favoritas' : 'Favorite Songs or Music'}
              </label>
              <input
                id="music-input"
                type="text"
                placeholder={isEs ? 'Ej. Cielito Lindo, guitarra española...' : 'e.g. Classic acoustic guitar, jazz, folk...'}
                value={favoriteMusic}
                onChange={(e) => setFavoriteMusic(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="add-modal-actions">
            <button
              type="button"
              className="btn-dash-secondary"
              onClick={onClose}
            >
              {isEs ? 'Cancelar' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="btn-dash-primary"
              disabled={isGenerating}
            >
              <Sparkles size={16} />
              <span>
                {isGenerating
                  ? (isEs ? 'Preparando recuerdo...' : 'Adding to altar...')
                  : (isEs ? '+ Colocar en el Altar' : '+ Put on Altar')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
