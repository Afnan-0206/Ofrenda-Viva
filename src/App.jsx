import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import PapelPicado from './components/PapelPicado';
import PetalCanvas from './components/PetalCanvas';
import AltarStage from './components/AltarStage';
import MemorialModal from './components/MemorialModal';
import OfferingDetailModal from './components/OfferingDetailModal';
import AddAncestorModal from './components/AddAncestorModal';
import AddOfferingModal from './components/AddOfferingModal';
import AiSettingsModal from './components/AiSettingsModal';
import CultureGuideModal from './components/CultureGuideModal';
import ExportArchiveModal from './components/ExportArchiveModal';
import ShortcutsModal from './components/ShortcutsModal';
import { INITIAL_ANCESTORS, INITIAL_OFFERINGS } from './utils/initialData';
import { playMatchStrikeSound, playExtinguishSound, toggleAmbientSound } from './utils/audioSynth';
import { translations } from './utils/translations';
import confetti from 'canvas-confetti';
import './App.css';

export default function App() {
  // Language state (ES / EN)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('ofrenda_lang_v1') || 'es';
    } catch {
      return 'es';
    }
  });

  const t = translations[lang] || translations.es;

  // Search input ref for instant keyboard focusing
  const searchInputRef = useRef(null);

  // Load persistent ancestors or use initial demo ancestors
  const [ancestors, setAncestors] = useState(() => {
    try {
      const saved = localStorage.getItem('ofrenda_ancestors_v1');
      return saved ? JSON.parse(saved) : INITIAL_ANCESTORS;
    } catch {
      return INITIAL_ANCESTORS;
    }
  });

  // Load persistent offerings
  const [offerings, setOfferings] = useState(() => {
    try {
      const saved = localStorage.getItem('ofrenda_offerings_v1');
      return saved ? JSON.parse(saved) : INITIAL_OFFERINGS;
    } catch {
      return INITIAL_OFFERINGS;
    }
  });

  // Atmospheric settings
  const [nightMode, setNightMode] = useState(true);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [altarVigilLit, setAltarVigilLit] = useState(true);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  // Modals state
  const [selectedAncestor, setSelectedAncestor] = useState(null);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [isAddAncestorOpen, setIsAddAncestorOpen] = useState(false);
  const [isAddOfferingOpen, setIsAddOfferingOpen] = useState(false);
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);
  const [isCultureGuideOpen, setIsCultureGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Show auto-dismissing toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? '' : current));
    }, 3200);
  };

  // Toggle language
  const handleToggleLang = () => {
    const nextLang = lang === 'es' ? 'en' : 'es';
    setLang(nextLang);
    try {
      localStorage.setItem('ofrenda_lang_v1', nextLang);
    } catch {}
    showToast(nextLang === 'es' ? 'Idioma cambiado a Español' : 'Language switched to English');
  };

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ofrenda_ancestors_v1', JSON.stringify(ancestors));
    } catch (e) {
      console.warn('Could not save ancestors to localStorage', e);
    }
  }, [ancestors]);

  useEffect(() => {
    try {
      localStorage.setItem('ofrenda_offerings_v1', JSON.stringify(offerings));
    } catch (e) {
      console.warn('Could not save offerings to localStorage', e);
    }
  }, [offerings]);

  // Are all candles currently lit?
  const allCandlesLit = ancestors.every((a) => a.candleLit) && altarVigilLit;

  // Toggle all candles at once
  const handleToggleAllCandles = () => {
    const targetState = !allCandlesLit;
    if (targetState) {
      playMatchStrikeSound();
      showToast(lang === 'es' ? 'Todas las velas del altar han sido encendidas' : 'All altar vigil candles illuminated');
    } else {
      playExtinguishSound();
      showToast(lang === 'es' ? 'Velas apagadas en paz' : 'All vigil candles extinguished');
    }
    setAltarVigilLit(targetState);
    setAncestors((prev) => prev.map((a) => ({ ...a, candleLit: targetState })));
  };

  // Scatter marigold petals celebration
  const handleScatterPetals = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#ff8c00', '#ffa500', '#ffb703', '#ffd166', '#d97706']
      });
      showToast(lang === 'es' ? 'Lluvia de pétalos de cempasúchil esparcida' : 'Marigold petal shower scattered');
    } catch (e) {
      // Confetti fallback
    }
  };

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // If user is currently typing in an input or textarea
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);

      if (e.key === 'Escape') {
        if (selectedAncestor) setSelectedAncestor(null);
        if (selectedOffering) setSelectedOffering(null);
        if (isAddAncestorOpen) setIsAddAncestorOpen(false);
        if (isAddOfferingOpen) setIsAddOfferingOpen(false);
        if (isAiSettingsOpen) setIsAiSettingsOpen(false);
        if (isCultureGuideOpen) setIsCultureGuideOpen(false);
        if (isExportOpen) setIsExportOpen(false);
        if (isShortcutsOpen) setIsShortcutsOpen(false);
        return;
      }

      if (isInput) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleScatterPetals();
      } else if (e.key === 'c' || e.key === 'C') {
        handleToggleAllCandles();
      } else if (e.key === 'a' || e.key === 'A') {
        setIsAddAncestorOpen(true);
      } else if (e.key === '?' || e.key === 'h' || e.key === 'H') {
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === '/' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    selectedAncestor,
    selectedOffering,
    isAddAncestorOpen,
    isAddOfferingOpen,
    isAiSettingsOpen,
    isCultureGuideOpen,
    isExportOpen,
    isShortcutsOpen,
    allCandlesLit
  ]);

  // Compute dynamic candlelight glow based on active candles
  const litCandlesCount = ancestors.filter((a) => a.candleLit).length + (altarVigilLit ? 5 : 0);
  const glowMultiplier = Math.min(1.0, 0.35 + litCandlesCount * 0.09);

  // Toggle individual ancestor candle
  const handleToggleCandle = (ancestorId, newLitState) => {
    setAncestors((prev) =>
      prev.map((a) => (a.id === ancestorId ? { ...a, candleLit: newLitState } : a))
    );
    if (selectedAncestor && selectedAncestor.id === ancestorId) {
      setSelectedAncestor((prev) => (prev ? { ...prev, candleLit: newLitState } : null));
    }
    const ancestor = ancestors.find((a) => a.id === ancestorId);
    if (ancestor) {
      showToast(newLitState ? `🕯️ Vela encendida para ${ancestor.name}` : `💨 Vela apagada para ${ancestor.name}`);
    }
  };

  // Update ancestor data (e.g. newly composed Calaverita)
  const handleUpdateAncestor = (updated) => {
    setAncestors((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setSelectedAncestor(updated);
    showToast(`📜 Calaverita guardada para ${updated.name}!`);
  };

  // Add new ancestor
  const handleAddAncestor = (newAncestor) => {
    setAncestors((prev) => [newAncestor, ...prev]);
    handleScatterPetals();
    showToast(`🌸 ${newAncestor.name} ha sido colocado en el altar.`);
  };

  // Add new offering
  const handleAddOffering = (newOffering) => {
    setOfferings((prev) => [...prev, newOffering]);
    showToast(`✨ ${newOffering.name} colocada en la ofrenda.`);
  };

  // Restore defaults
  const handleResetData = () => {
    setAncestors(INITIAL_ANCESTORS);
    setOfferings(INITIAL_OFFERINGS);
    localStorage.removeItem('ofrenda_ancestors_v1');
    localStorage.removeItem('ofrenda_offerings_v1');
    showToast('🔄 Altar restaurado a los datos de muestra.');
  };

  // Import archive
  const handleImportData = (importedAncestors, importedOfferings) => {
    setAncestors(importedAncestors);
    if (importedOfferings) setOfferings(importedOfferings);
    showToast('📜 ¡Archivo de la ofrenda importado con éxito!');
  };

  return (
    <div
      className={`app-container ${nightMode ? 'theme-night' : 'theme-twilight'}`}
      style={{
        '--candle-glow-intensity': glowMultiplier
      }}
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="ofrenda-toast" role="status">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Background Altar Texture & Atmosphere */}
      <div className="scenic-background" aria-hidden="true">
        <div className="scenic-image-layer"></div>
        <div className="scenic-vignette"></div>
        <div className="candle-ambient-light"></div>
      </div>

      {/* Interactive floating marigold petals */}
      <PetalCanvas enabled={petalsEnabled} count={35} />

      {/* Atmospheric Papel Picado Garland */}
      <PapelPicado />

      {/* Header & Controls */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        nightMode={nightMode}
        onToggleNightMode={() => setNightMode(!nightMode)}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
        allCandlesLit={allCandlesLit}
        onToggleAllCandles={handleToggleAllCandles}
        onScatterPetals={handleScatterPetals}
        onOpenAddAncestor={() => setIsAddAncestorOpen(true)}
        onOpenAiSettings={() => setIsAiSettingsOpen(true)}
        onOpenCultureGuide={() => setIsCultureGuideOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Altar Area */}
      <main className="main-altar-canvas">
        <AltarStage
          lang={lang}
          ancestors={ancestors}
          offerings={offerings}
          onSelectAncestor={setSelectedAncestor}
          onToggleCandle={handleToggleCandle}
          onSelectOffering={setSelectedOffering}
          onOpenAddAncestor={() => setIsAddAncestorOpen(true)}
          onOpenAddOffering={() => setIsAddOfferingOpen(true)}
          altarVigilLit={altarVigilLit}
          onToggleAltarVigil={() => setAltarVigilLit(!altarVigilLit)}
          allCandlesLit={allCandlesLit}
          onToggleAllCandles={handleToggleAllCandles}
          onScatterPetals={handleScatterPetals}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          searchInputRef={searchInputRef}
        />
      </main>

      {/* Footer Cultural Citation */}
      <footer className="ofrenda-footer print-hidden">
        <div className="footer-content">
          <p className="footer-quote">{t.footerQuote}</p>
          <div className="footer-meta">
            <span>{t.footerMeta}</span>
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}
      <MemorialModal
        ancestor={selectedAncestor}
        isOpen={Boolean(selectedAncestor)}
        onClose={() => setSelectedAncestor(null)}
        onUpdateAncestor={handleUpdateAncestor}
        onToggleCandle={handleToggleCandle}
      />

      <OfferingDetailModal
        offering={selectedOffering}
        isOpen={Boolean(selectedOffering)}
        onClose={() => setSelectedOffering(null)}
      />

      <AddAncestorModal
        isOpen={isAddAncestorOpen}
        onClose={() => setIsAddAncestorOpen(false)}
        onAddAncestor={handleAddAncestor}
      />

      <AddOfferingModal
        isOpen={isAddOfferingOpen}
        onClose={() => setIsAddOfferingOpen(false)}
        onAddOffering={handleAddOffering}
      />

      <AiSettingsModal
        isOpen={isAiSettingsOpen}
        onClose={() => setIsAiSettingsOpen(false)}
      />

      <CultureGuideModal
        isOpen={isCultureGuideOpen}
        onClose={() => setIsCultureGuideOpen(false)}
      />

      <ExportArchiveModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        ancestors={ancestors}
        offerings={offerings}
        onImportData={handleImportData}
        onResetData={handleResetData}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        lang={lang}
      />
    </div>
  );
}
