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
  Flower2,
  Sparkles
} from 'lucide-react';
import { toggleAmbientSound } from '../utils/audioSynth';

/**
 * Navbar — Atmospheric header with ambient controls, AI engine status, and altar actions.
 */
export default function Navbar({
  nightMode,
  onToggleNightMode,
  petalsEnabled,
  onTogglePetals,
  onOpenAddAncestor,
  onOpenAiSettings,
  onOpenCultureGuide,
  onOpenExport
}) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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
          <h1 className="brand-title">OFRENDA VIVA</h1>
          <span className="brand-subtitle">Ghost in the Machine &bull; Día de los Muertos AI Memorial</span>
        </div>
      </div>

      {/* Atmospheric & Action Controls */}
      <div className="navbar-controls">
        {/* Ambient Sound Toggle */}
        <button
          type="button"
          className={`nav-btn ${isAudioPlaying ? 'is-active-btn' : ''}`}
          onClick={handleToggleAudio}
          title={isAudioPlaying ? 'Mute ambient Spanish guitar' : 'Play ambient Spanish guitar arpeggios'}
          aria-label="Toggle ambient music"
        >
          {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="nav-btn-text">{isAudioPlaying ? 'Música: On' : 'Música'}</span>
        </button>

        {/* Day / Noche de Velas Toggle */}
        <button
          type="button"
          className={`nav-btn ${nightMode ? 'is-active-btn' : ''}`}
          onClick={onToggleNightMode}
          title={nightMode ? 'Switch to Twilight Mode' : 'Switch to Candlelit Midnight (Noche de Velas)'}
          aria-label="Toggle night mode"
        >
          {nightMode ? <Moon size={18} /> : <Sun size={18} />}
          <span className="nav-btn-text">{nightMode ? 'Noche' : 'Día'}</span>
        </button>

        {/* Floating Petals Toggle */}
        <button
          type="button"
          className={`nav-btn ${petalsEnabled ? 'is-active-btn' : ''}`}
          onClick={onTogglePetals}
          title="Toggle floating marigold petals"
          aria-label="Toggle petals"
        >
          <Flower2 size={18} />
          <span className="nav-btn-text">Pétalos</span>
        </button>

        {/* Culture & Symbolism Guide */}
        <button
          type="button"
          className="nav-btn"
          onClick={onOpenCultureGuide}
          title="Learn about the spiritual meaning of Día de los Muertos and the Altar"
          aria-label="Cultural Guide"
        >
          <BookOpen size={18} />
          <span className="nav-btn-text">Significado</span>
        </button>

        {/* Open AI Engine Status / Settings */}
        <button
          type="button"
          className="nav-btn ai-status-pill"
          onClick={onOpenAiSettings}
          title="Open-Source AI Settings (Gemma 2 / Ollama 100% Private)"
          aria-label="AI Engine Settings"
        >
          <Cpu size={17} className="ai-icon-pulse" />
          <span className="nav-btn-text">Open AI: Gemma 2</span>
        </button>

        {/* Permanent Archive Export */}
        <button
          type="button"
          className="nav-btn"
          onClick={onOpenExport}
          title="Backup or print this ofrenda permanently"
          aria-label="Export Archive"
        >
          <Download size={18} />
          <span className="nav-btn-text">Archivar</span>
        </button>

        {/* Add Loved One Primary Action */}
        <button
          type="button"
          className="btn-add-loved-one"
          onClick={onOpenAddAncestor}
          title="Add a beloved ancestor or luminary to your altar"
        >
          <Plus size={18} />
          <span>Add to Altar</span>
        </button>
      </div>
    </header>
  );
}
