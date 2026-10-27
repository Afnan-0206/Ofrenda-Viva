import React, { useState, useEffect } from 'react';
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
import { INITIAL_ANCESTORS, INITIAL_OFFERINGS } from './utils/initialData';
import confetti from 'canvas-confetti';
import './App.css';

export default function App() {
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

  // Modals state
  const [selectedAncestor, setSelectedAncestor] = useState(null);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [isAddAncestorOpen, setIsAddAncestorOpen] = useState(false);
  const [isAddOfferingOpen, setIsAddOfferingOpen] = useState(false);
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);
  const [isCultureGuideOpen, setIsCultureGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

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

  // Compute dynamic candlelight glow based on active candles
  const litCandlesCount = ancestors.filter((a) => a.candleLit).length + (altarVigilLit ? 5 : 0);
  const glowMultiplier = Math.min(1.0, 0.4 + litCandlesCount * 0.08);

  // Toggle individual ancestor candle
  const handleToggleCandle = (ancestorId, newLitState) => {
    setAncestors((prev) =>
      prev.map((a) => (a.id === ancestorId ? { ...a, candleLit: newLitState } : a))
    );
    if (selectedAncestor && selectedAncestor.id === ancestorId) {
      setSelectedAncestor((prev) => (prev ? { ...prev, candleLit: newLitState } : null));
    }
  };

  // Update ancestor data (e.g. newly composed Calaverita)
  const handleUpdateAncestor = (updated) => {
    setAncestors((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setSelectedAncestor(updated);
  };

  // Add new ancestor
  const handleAddAncestor = (newAncestor) => {
    setAncestors((prev) => [newAncestor, ...prev]);

    // Marigold petal celebration burst
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff8c00', '#ffa500', '#ffb703', '#ffd166', '#e63946']
      });
    } catch (e) {
      // Confetti optional
    }
  };

  // Add new offering
  const handleAddOffering = (newOffering) => {
    setOfferings((prev) => [...prev, newOffering]);
  };

  // Restore defaults
  const handleResetData = () => {
    setAncestors(INITIAL_ANCESTORS);
    setOfferings(INITIAL_OFFERINGS);
    localStorage.removeItem('ofrenda_ancestors_v1');
    localStorage.removeItem('ofrenda_offerings_v1');
  };

  // Import archive
  const handleImportData = (importedAncestors, importedOfferings) => {
    setAncestors(importedAncestors);
    if (importedOfferings) setOfferings(importedOfferings);
  };

  return (
    <div
      className={`app-container ${nightMode ? 'theme-night' : 'theme-twilight'}`}
      style={{
        '--candle-glow-intensity': glowMultiplier
      }}
    >
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
        nightMode={nightMode}
        onToggleNightMode={() => setNightMode(!nightMode)}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
        onOpenAddAncestor={() => setIsAddAncestorOpen(true)}
        onOpenAiSettings={() => setIsAiSettingsOpen(true)}
        onOpenCultureGuide={() => setIsCultureGuideOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Altar Area */}
      <main className="main-altar-canvas">
        <AltarStage
          ancestors={ancestors}
          offerings={offerings}
          onSelectAncestor={setSelectedAncestor}
          onToggleCandle={handleToggleCandle}
          onSelectOffering={setSelectedOffering}
          onOpenAddAncestor={() => setIsAddAncestorOpen(true)}
          onOpenAddOffering={() => setIsAddOfferingOpen(true)}
          altarVigilLit={altarVigilLit}
          onToggleAltarVigil={() => setAltarVigilLit(!altarVigilLit)}
        />
      </main>

      {/* Footer Cultural Citation */}
      <footer className="ofrenda-footer print-hidden">
        <div className="footer-content">
          <p className="footer-quote">
            "Hay tres muertes: la primera es cuando el cuerpo cesa de respirar; la segunda es cuando es llevado a la tierra; y la tercera, la más definitiva, es cuando nadie en el mundo te recuerda."
          </p>
          <div className="footer-meta">
            <span>Ofrenda Viva &bull; Hacktoberfest 2026: Ghost in the Machine</span>
            <span className="dot-sep">&bull;</span>
            <span>Powered by Open-Weight AI (Gemma 2) &bull; 100% Private on Device</span>
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
    </div>
  );
}
