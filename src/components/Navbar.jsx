import React, { useState } from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Cpu,
  Plus,
  BookOpen,
  Download,
  Sparkles,
  Flower2,
  Keyboard,
  Languages
} from 'lucide-react';
import { toggleAmbientSound } from '../utils/audioSynth';
import { translations } from '../utils/translations';

/**
 * Navbar — Atmospheric header with ambient controls, candle mass actions, and altar triggers.
 */
export default function Navbar({
  lang = 'es',
  onToggleLang,
  nightMode,
  onToggleNightMode,
  petalsEnabled,
  onTogglePetals,
  allCandlesLit,
  onToggleAllCandles,
  onScatterPetals,
  onOpenAddAncestor,
  onOpenAiSettings,
  onOpenCultureGuide,
  onOpenExport,
  onOpenShortcuts
}) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const t = translations[lang] || translations.es;

  const handleToggleAudio = () => {
    toggleAmbientSound((newState) => {
      setIsAudioPlaying(newState);
    });
  };

  return (
    <header className="navbar-header">
      {/* Brand & Theme Title */}
      <div className="brand-group">
        <div className="brand-emblem" aria-hidden="true">
          <Flame size={24} className="emblem-flame" />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">{t.brandTitle}</h1>
          <span className="brand-subtitle">{t.brandSubtitle}</span>
        </div>
      </div>

      {/* Atmospheric & Action Controls */}
      <div className="navbar-controls">
        {/* Language Switcher ES / EN */}
        <button
          type="button"
          className="nav-btn lang-pill"
          onClick={onToggleLang}
          title={lang === 'es' ? 'Cambiar a Inglés (Switch to English)' : 'Switch to Spanish (Cambiar a Español)'}
          aria-label="Toggle language"
        >
          <Languages size={16} />
          <span className="nav-btn-text">{lang === 'es' ? 'ES' : 'EN'}</span>
        </button>

        {/* Light All / Extinguish All Candles Quick Button */}
        <button
          type="button"
          className={`nav-btn ${allCandlesLit ? 'is-active-btn' : ''}`}
          onClick={onToggleAllCandles}
          title={allCandlesLit ? 'Apagar velas [C]' : 'Encender velas [C]'}
          aria-label="Toggle all candles"
        >
          <Flame size={17} />
          <span className="nav-btn-text">{allCandlesLit ? t.candlesLit : t.candlesDark}</span>
        </button>

        {/* Ambient Sound Toggle */}
        <button
          type="button"
          className={`nav-btn ${isAudioPlaying ? 'is-active-btn' : ''}`}
          onClick={handleToggleAudio}
          title="Música de guitarra española [M]"
          aria-label="Toggle ambient music"
        >
          {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="nav-btn-text">{isAudioPlaying ? t.musicOn : t.musicOff}</span>
          {isAudioPlaying && (
            <span className="audio-equalizer" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
          )}
        </button>

        {/* Day / Noche de Velas Toggle */}
        <button
          type="button"
          className={`nav-btn ${nightMode ? 'is-active-btn' : ''}`}
          onClick={onToggleNightMode}
          title={nightMode ? 'Modo Día' : 'Noche de Velas'}
          aria-label="Toggle night mode"
        >
          {nightMode ? <Moon size={18} /> : <Sun size={18} />}
          <span className="nav-btn-text">{nightMode ? t.night : t.day}</span>
        </button>

        {/* Floating Petals Toggle & Scatter Button */}
        <button
          type="button"
          className={`nav-btn ${petalsEnabled ? 'is-active-btn' : ''}`}
          onClick={onScatterPetals}
          title="Lluvia de pétalos de Cempasúchil [Space]"
          aria-label="Scatter petals"
        >
          <Flower2 size={18} />
          <span className="nav-btn-text">{t.petals}</span>
        </button>

        {/* Culture & Symbolism Guide */}
        <button
          type="button"
          className="nav-btn"
          onClick={onOpenCultureGuide}
          title="Significado del Altar de Muertos"
          aria-label="Cultural Guide"
        >
          <BookOpen size={18} />
          <span className="nav-btn-text">{t.significado}</span>
        </button>

        {/* Keyboard Shortcuts Guide */}
        <button
          type="button"
          className="nav-btn"
          onClick={onOpenShortcuts}
          title="Atajos de Teclado [?]"
          aria-label="Keyboard Shortcuts"
        >
          <Keyboard size={17} />
          <span className="nav-btn-text">{t.shortcuts}</span>
        </button>

        {/* Open AI Engine Status / Settings */}
        <button
          type="button"
          className="nav-btn ai-status-pill"
          onClick={onOpenAiSettings}
          title="Configuración de IA Abierta (Gemma 2 / Ollama)"
          aria-label="AI Engine Settings"
        >
          <Cpu size={17} className="ai-icon-pulse" />
          <span className="nav-btn-text">{t.aiStatus}</span>
        </button>

        {/* Permanent Archive Export */}
        <button
          type="button"
          className="nav-btn"
          onClick={onOpenExport}
          title="Guardar o imprimir ofrenda"
          aria-label="Export Archive"
        >
          <Download size={18} />
          <span className="nav-btn-text">{t.archivar}</span>
        </button>

        {/* Add Loved One Primary Action */}
        <button
          type="button"
          className="btn-add-loved-one"
          onClick={onOpenAddAncestor}
          title="Colocar un ser querido en el altar [A]"
        >
          <Plus size={18} />
          <span>{t.addToAltar}</span>
        </button>
      </div>
    </header>
  );
}
