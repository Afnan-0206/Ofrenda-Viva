import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import PapelPicado from './components/PapelPicado';
import PetalCanvas from './components/PetalCanvas';
import AltarStage from './components/AltarStage';
import DashboardView from './components/DashboardView';
import MemorialModal from './components/MemorialModal';
import OfferingDetailModal from './components/OfferingDetailModal';
import AddAncestorModal from './components/AddAncestorModal';
import AddOfferingModal from './components/AddOfferingModal';
import AiSettingsModal from './components/AiSettingsModal';
import CultureGuideModal from './components/CultureGuideModal';
import ExportArchiveModal from './components/ExportArchiveModal';
import ShortcutsModal from './components/ShortcutsModal';
import TabPfnModal from './components/TabPfnModal';
import ArduinoModal from './components/ArduinoModal';
import { INITIAL_ANCESTORS, INITIAL_OFFERINGS } from './utils/initialData';
import { playMatchStrikeSound, playExtinguishSound, toggleAmbientSound, playSpanishGuitarArpeggio } from './utils/audioSynth';
import { arduinoBridge } from './utils/arduinoSerial';
import { translations } from './utils/translations';
import confetti from 'canvas-confetti';
import './App.css';

export default function App() {
  // Language state (defaults to simple English)
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('ofrenda_lang_v1');
      return saved === 'es' ? 'es' : 'en';
    } catch {
      return 'en';
    }
  });

  const t = translations[lang] || translations.en;

  // Active view: 'altar' | 'dashboard' | 'culture'
  const [currentView, setCurrentView] = useState('altar');

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
  const [isTabPfnOpen, setIsTabPfnOpen] = useState(false);
  const [isArduinoOpen, setIsArduinoOpen] = useState(false);
  const [arduinoConnected, setArduinoConnected] = useState(false);

  // Subscribe to Arduino UNO Q WebSerial events
  useEffect(() => {
    const unsubscribe = arduinoBridge.subscribe((event) => {
      if (event.type === 'connection') {
        setArduinoConnected(event.status === 'connected' || event.status === 'simulated');
      } else if (event.type === 'telemetry') {
        const d = event.data;
        if (d.event === 'flame_detected') {
          setAltarVigilLit(true);
          setAncestors((prev) => prev.map((a) => ({ ...a, candleLit: true })));
          playMatchStrikeSound();
          showToast(lang === 'es' ? '¡Llama detectada por el sensor! Velas encendidas.' : 'Flame detected! Altar lit.');
        } else if (d.event === 'presence_detected') {
          playSpanishGuitarArpeggio();
          showToast(lang === 'es' ? 'Presencia detectada junto al altar.' : 'Presence detected at the memorial shrine.');
        }
      }
    });
    return () => unsubscribe();
  }, [lang]);

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
      showToast(lang === 'es' ? 'Todas las velas del altar han sido encendidas' : 'All altar candles illuminated');
    } else {
      playExtinguishSound();
      showToast(lang === 'es' ? 'Velas apagadas con respeto' : 'All candles extinguished');
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
      showToast(lang === 'es' ? 'Lluvia de flores de cempasúchil esparcida' : 'Marigold flower shower scattered');
    } catch (e) {
      // Confetti fallback
    }
  };

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
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

  const litCount = ancestors.filter((a) => a.candleLit).length;

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
        currentView={currentView}
        onViewChange={(view) => {
          if (view === 'culture') {
            setIsCultureGuideOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
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
        onOpenArduino={() => setIsArduinoOpen(true)}
        arduinoConnected={arduinoConnected}
        litCandlesCount={litCount}
        totalAncestorsCount={ancestors.length}
      />

      {/* Main View Area */}
      <main className="main-altar-canvas">
        {currentView === 'altar' ? (
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
        ) : (
          <DashboardView
            lang={lang}
            ancestors={ancestors}
            offerings={offerings}
            onSelectAncestor={setSelectedAncestor}
            onToggleCandle={handleToggleCandle}
            onToggleAllCandles={handleToggleAllCandles}
            allCandlesLit={allCandlesLit}
            onOpenAddAncestor={() => setIsAddAncestorOpen(true)}
            onOpenAddOffering={() => setIsAddOfferingOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            onAddAncestorFromTabPfn={(newAncestor) => {
              handleAddAncestor(newAncestor);
            }}
            arduinoConnected={arduinoConnected}
          />
        )}
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
        lang={lang}
      />

      <OfferingDetailModal
        offering={selectedOffering}
        isOpen={Boolean(selectedOffering)}
        onClose={() => setSelectedOffering(null)}
        lang={lang}
      />

      <AddAncestorModal
        isOpen={isAddAncestorOpen}
        onClose={() => setIsAddAncestorOpen(false)}
        onAddAncestor={handleAddAncestor}
        lang={lang}
      />

      <AddOfferingModal
        isOpen={isAddOfferingOpen}
        onClose={() => setIsAddOfferingOpen(false)}
        onAddOffering={handleAddOffering}
        lang={lang}
      />

      <AiSettingsModal
        isOpen={isAiSettingsOpen}
        onClose={() => setIsAiSettingsOpen(false)}
        lang={lang}
      />

      <CultureGuideModal
        isOpen={isCultureGuideOpen}
        onClose={() => setIsCultureGuideOpen(false)}
        lang={lang}
      />

      <ExportArchiveModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        ancestors={ancestors}
        offerings={offerings}
        onImportData={handleImportData}
        onResetData={handleResetData}
        lang={lang}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        lang={lang}
      />

      <TabPfnModal
        isOpen={isTabPfnOpen}
        onClose={() => setIsTabPfnOpen(false)}
        ancestors={ancestors}
        onAddAncestorFromTabPfn={(newAncestor) => {
          handleAddAncestor(newAncestor);
          showToast(lang === 'es' ? 'Antepasado añadido al altar' : 'Ancestor added to altar');
        }}
        lang={lang}
      />

      <ArduinoModal
        isOpen={isArduinoOpen}
        onClose={() => setIsArduinoOpen(false)}
        allCandlesLit={allCandlesLit}
        onFlameDetected={() => {
          setAltarVigilLit(true);
          setAncestors((prev) => prev.map((a) => ({ ...a, candleLit: true })));
          playMatchStrikeSound();
        }}
        onPresenceDetected={() => {
          playSpanishGuitarArpeggio();
        }}
      />
    </div>
  );
}
