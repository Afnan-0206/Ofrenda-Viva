import React, { useState } from 'react';
import Candle from './Candle';
import { generateRemembrance } from '../utils/aiEngine';
import {
  X,
  Sparkles,
  Heart,
  Music,
  Utensils,
  BookOpen,
  MessageSquare,
  Copy,
  Check,
  ShieldCheck,
  Feather
} from 'lucide-react';

/**
 * MemorialModal — Deep remembrance view and Open-Source AI Chronicler.
 * Generates Calaveritas Literarias, elegies, oral history, and ancestral dialogue.
 */
export default function MemorialModal({
  ancestor,
  isOpen,
  onClose,
  onUpdateAncestor,
  onToggleCandle
}) {
  if (!isOpen || !ancestor) return null;

  const [activeTab, setActiveTab] = useState('calaverita'); // 'calaverita' | 'elegy' | 'story' | 'dialogue'
  const [language, setLanguage] = useState('es');
  const [dialogueQuery, setDialogueQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState(ancestor.calaverita || '');
  const [activeProviderName, setActiveProviderName] = useState('Gemma 2 Open Neural Engine');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type = activeTab) => {
    setIsGenerating(true);
    try {
      const response = await generateRemembrance({
        ancestor,
        type,
        userPrompt: dialogueQuery,
        language
      });
      setGeneratedText(response.content);
      setActiveProviderName(response.provider);

      // Auto-save calaverita to ancestor profile if generated
      if (type === 'calaverita') {
        onUpdateAncestor({
          ...ancestor,
          calaverita: response.content
        });
      }
    } catch (err) {
      console.error('Error generating verse:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card memorial-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close memorial dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header & Ancestor Profile */}
        <div className="memorial-header">
          <div className="memorial-portrait-wrap">
            <img
              src={ancestor.photo}
              alt={ancestor.name}
              className="memorial-portrait-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="memorial-candle-overlay">
              <Candle
                isLit={ancestor.candleLit}
                onToggle={(lit) => onToggleCandle(ancestor.id, lit)}
                size="medium"
              />
            </div>
          </div>

          <div className="memorial-titles">
            <span className="memorial-tier-badge">Altar Nivel {ancestor.tier || 2}</span>
            <h2 className="memorial-name">{ancestor.name}</h2>
            <p className="memorial-years">{ancestor.years}</p>
            <p className="memorial-relation">{ancestor.relationship}</p>
          </div>
        </div>

        {/* Story & Favorite Offerings Strip */}
        <div className="memorial-bio-section">
          <p className="memorial-story">"{ancestor.story}"</p>

          <div className="memorial-favorites-grid">
            {ancestor.favoriteFoods && (
              <div className="fav-pill">
                <Utensils size={14} className="fav-icon" />
                <div>
                  <span className="fav-label">Favorite Foods:</span>
                  <span className="fav-value">{ancestor.favoriteFoods}</span>
                </div>
              </div>
            )}
            {ancestor.favoriteMusic && (
              <div className="fav-pill">
                <Music size={14} className="fav-icon" />
                <div>
                  <span className="fav-label">Beloved Melodies:</span>
                  <span className="fav-value">{ancestor.favoriteMusic}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= AI CHRONICLER SECTION ================= */}
        <div className="ai-chronicler-section">
          <div className="chronicler-header">
            <div className="chronicler-title-group">
              <Sparkles size={18} className="chronicler-sparkle" />
              <h3 className="chronicler-title">El Guardián del Recuerdo</h3>
              <span className="chronicler-badge">Open-Source AI</span>
            </div>

            {/* Language switch */}
            <div className="language-selector">
              <button
                type="button"
                className={`lang-btn ${language === 'es' ? 'is-active' : ''}`}
                onClick={() => setLanguage('es')}
              >
                Español
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'bilingual' ? 'is-active' : ''}`}
                onClick={() => setLanguage('bilingual')}
              >
                Bilingual
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'is-active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                English
              </button>
            </div>
          </div>

          {/* Chronicler Tabs */}
          <div className="chronicler-tabs">
            <button
              type="button"
              className={`chronicler-tab ${activeTab === 'calaverita' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab('calaverita');
                handleGenerate('calaverita');
              }}
            >
              <Feather size={14} />
              <span>Calaverita Literaria</span>
            </button>

            <button
              type="button"
              className={`chronicler-tab ${activeTab === 'elegy' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab('elegy');
                handleGenerate('elegy');
              }}
            >
              <Heart size={14} />
              <span>Poetic Elegy</span>
            </button>

            <button
              type="button"
              className={`chronicler-tab ${activeTab === 'story' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab('story');
                handleGenerate('story');
              }}
            >
              <BookOpen size={14} />
              <span>Oral History</span>
            </button>

            <button
              type="button"
              className={`chronicler-tab ${activeTab === 'dialogue' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('dialogue')}
            >
              <MessageSquare size={14} />
              <span>Spirit Dialogue</span>
            </button>
          </div>

          {/* Dialogue Query Input (when dialogue tab is active) */}
          {activeTab === 'dialogue' && (
            <div className="dialogue-input-box">
              <input
                type="text"
                placeholder={`Ask ${ancestor.name} a question (e.g., "What advice do you give me today?")...`}
                value={dialogueQuery}
                onChange={(e) => setDialogueQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate('dialogue');
                }}
                className="dialogue-input"
              />
              <button
                type="button"
                className="dialogue-send-btn"
                onClick={() => handleGenerate('dialogue')}
                disabled={isGenerating}
              >
                <Sparkles size={16} />
                <span>Ask Soul</span>
              </button>
            </div>
          )}

          {/* Generated Verse Box */}
          <div className="verse-display-card">
            {isGenerating ? (
              <div className="generating-state">
                <div className="flame-spinner"></div>
                <p>Consulting open weights & weaving remembrance verses...</p>
                <span className="generating-sub">Running 100% locally on your machine</span>
              </div>
            ) : (
              <>
                <pre className="verse-text">{generatedText || 'Click generate to craft a personalized verse.'}</pre>

                <div className="verse-actions-bar">
                  <div className="privacy-indicator">
                    <ShieldCheck size={14} className="privacy-icon" />
                    <span>{activeProviderName} &bull; Never transmitted to third-party servers</span>
                  </div>

                  <div className="verse-buttons">
                    <button
                      type="button"
                      className="verse-btn"
                      onClick={() => handleGenerate(activeTab)}
                      title="Re-generate verse"
                    >
                      <Sparkles size={14} />
                      <span>Re-compose</span>
                    </button>
                    <button
                      type="button"
                      className="verse-btn"
                      onClick={handleCopy}
                      title="Copy verse text"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
