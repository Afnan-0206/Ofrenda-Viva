import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Plus,
  BookOpen,
  Languages,
  LayoutDashboard,
  Layers,
  Settings,
  Download,
  Keyboard,
  Flower2,
  Cpu,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { toggleAmbientSound } from '../utils/audioSynth';
import { translations } from '../utils/translations';

export default function Navbar({
  currentView = 'altar',
  onViewChange,
  lang = 'en',
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
  onOpenShortcuts,
  onOpenArduino,
  arduinoConnected = false,
  litCandlesCount = 0,
  totalAncestorsCount = 0
}) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const toolsMenuRef = useRef(null);
  const t = translations[lang] || translations.en;

  // Handle outside click for tools dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleToggleAudio = () => {
    toggleAmbientSound((newState) => {
      setIsAudioPlaying(newState);
    });
  };

  return (
    <header className="navbar-header">
      {/* Left: Brand Identity */}
      <div className="brand-group" onClick={() => onViewChange && onViewChange('altar')} style={{ cursor: 'pointer' }}>
        <div className="brand-emblem" aria-hidden="true">
          <Flame size={22} className="emblem-flame" />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">{t.brandTitle}</h1>
          <span className="brand-subtitle">{t.brandSubtitle}</span>
        </div>
      </div>

      {/* Center: Main View Switcher Tabs */}
      <nav className="nav-view-tabs" aria-label="Main Navigation">
        <button
          type="button"
          className={`nav-tab-item ${currentView === 'altar' ? 'active' : ''}`}
          onClick={() => onViewChange && onViewChange('altar')}
        >
          <Layers size={17} />
          <span>{t.navAltar}</span>
        </button>

        <button
          type="button"
          className={`nav-tab-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onViewChange && onViewChange('dashboard')}
        >
          <LayoutDashboard size={17} />
          <span>{t.navDashboard}</span>
          {totalAncestorsCount > 0 && (
            <span className="nav-tab-badge">{totalAncestorsCount}</span>
          )}
        </button>

        <button
          type="button"
          className={`nav-tab-item ${currentView === 'culture' ? 'active' : ''}`}
          onClick={() => {
            if (onViewChange) onViewChange('culture');
            if (onOpenCultureGuide) onOpenCultureGuide();
          }}
        >
          <BookOpen size={17} />
          <span>{t.navTraditions}</span>
        </button>
      </nav>

      {/* Right: Actions, Utilities & Language */}
      <div className="navbar-controls">
        {/* Candle Vigil Quick Toggle */}
        <button
          type="button"
          className={`nav-action-pill ${allCandlesLit ? 'is-active-btn' : ''}`}
          onClick={onToggleAllCandles}
          title={allCandlesLit ? 'Apagar velas [C]' : 'Encender todas las velas [C]'}
          aria-label="Toggle all candles"
        >
          <Flame size={16} />
          <span className="nav-btn-text">
            {allCandlesLit ? t.candlesLit : t.candlesDark}
          </span>
          <span className="pill-counter">
            {litCandlesCount}/{totalAncestorsCount}
          </span>
        </button>

        {/* Ambient Spanish Guitar Sound */}
        <button
          type="button"
          className={`nav-icon-btn ${isAudioPlaying ? 'active' : ''}`}
          onClick={handleToggleAudio}
          title={isAudioPlaying ? 'Música activa [M]' : 'Activar guitarra acústica [M]'}
          aria-label="Toggle music"
        >
          {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {isAudioPlaying && (
            <span className="audio-equalizer" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
          )}
        </button>

        {/* Marigold Petals Scatter */}
        <button
          type="button"
          className="nav-icon-btn"
          onClick={onScatterPetals}
          title="Esparcir flores de Cempasúchil [Space]"
          aria-label="Scatter petals"
        >
          <Flower2 size={18} />
        </button>

        {/* Night / Day Lighting */}
        <button
          type="button"
          className="nav-icon-btn"
          onClick={onToggleNightMode}
          title={nightMode ? 'Cambiar a Luz de Día' : 'Cambiar a Noche de Velas'}
          aria-label="Toggle lighting"
        >
          {nightMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* More Tools Dropdown */}
        <div className="tools-dropdown-wrapper" ref={toolsMenuRef}>
          <button
            type="button"
            className={`nav-action-pill tools-trigger ${toolsDropdownOpen ? 'open' : ''}`}
            onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
            aria-label="Menu de herramientas"
          >
            <Settings size={16} />
            <span className="nav-btn-text">{t.toolsMenu}</span>
            <ChevronDown size={14} className={`chevron ${toolsDropdownOpen ? 'rotated' : ''}`} />
          </button>

          {toolsDropdownOpen && (
            <div className="tools-dropdown-menu">
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setToolsDropdownOpen(false);
                  onOpenExport();
                }}
              >
                <Download size={16} />
                <div className="dropdown-item-text">
                  <span>{t.archivar}</span>
                  <small>{lang === 'es' ? 'Guardar y respaldar datos' : 'Download and restore records'}</small>
                </div>
              </button>

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setToolsDropdownOpen(false);
                  onOpenAiSettings();
                }}
              >
                <Sparkles size={16} />
                <div className="dropdown-item-text">
                  <span>{t.aiStatus}</span>
                  <small>{lang === 'es' ? 'Escribir poemas y recuerdos' : 'Write poems and memories'}</small>
                </div>
              </button>

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setToolsDropdownOpen(false);
                  onOpenArduino();
                }}
              >
                <Cpu size={16} />
                <div className="dropdown-item-text">
                  <span>{lang === 'es' ? 'Sensor de Vela Real' : 'Real Candle Sensor'}</span>
                  <small>{arduinoConnected ? (lang === 'es' ? 'Conectado' : 'Connected') : (lang === 'es' ? 'Modo de prueba listo' : 'Ready to test')}</small>
                </div>
              </button>

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setToolsDropdownOpen(false);
                  onOpenShortcuts();
                }}
              >
                <Keyboard size={16} />
                <div className="dropdown-item-text">
                  <span>{t.shortcuts}</span>
                  <small>[?] / [Space] / [C] / [A]</small>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Primary CTA: Add Loved One */}
        <button
          type="button"
          className="btn-add-loved-one"
          onClick={onOpenAddAncestor}
          title="Agregar a un ser querido al altar [A]"
        >
          <Plus size={16} />
          <span>{t.navAddLovedOne}</span>
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          className="nav-action-pill lang-pill"
          onClick={onToggleLang}
          title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          aria-label="Toggle language"
        >
          <Languages size={15} />
          <span>{lang === 'es' ? 'ES' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
}
