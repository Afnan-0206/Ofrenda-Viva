import React, { useEffect } from 'react';
import { X, Keyboard, Sparkles, Flame, Music, Plus, Search, Eye } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose, lang = 'es' }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEs = lang === 'es';

  const shortcutsList = [
    {
      key: 'Space',
      desc: isEs ? 'Esparcir pétalos dorados de Cempasúchil' : 'Scatter golden marigold petals celebrate',
      icon: <Sparkles size={18} className="shortcut-icon-accent" />
    },
    {
      key: 'C',
      desc: isEs ? 'Encender o apagar todas las velas del altar' : 'Toggle ignite or extinguish all altar candles',
      icon: <Flame size={18} className="shortcut-icon-accent" />
    },
    {
      key: 'M',
      desc: isEs ? 'Activar o silenciar música de guitarra española' : 'Toggle ambient Spanish guitar arpeggios',
      icon: <Music size={18} className="shortcut-icon-accent" />
    },
    {
      key: 'A',
      desc: isEs ? 'Abrir diálogo para agregar un ser querido al altar' : 'Open modal to add a loved one or companion pet',
      icon: <Plus size={18} className="shortcut-icon-accent" />
    },
    {
      key: '/',
      desc: isEs ? 'Enfocar barra de búsqueda para filtrar seres queridos' : 'Focus search bar to instantly find ancestors',
      icon: <Search size={18} className="shortcut-icon-accent" />
    },
    {
      key: 'Esc',
      desc: isEs ? 'Cerrar cualquier ventana o diálogo abierto' : 'Close any open modal or dialog immediately',
      icon: <X size={18} className="shortcut-icon-accent" />
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card shortcuts-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="shortcuts-header">
          <div className="shortcuts-icon-ring">
            <Keyboard size={28} />
          </div>
          <h2>{isEs ? 'Atajos de Teclado y Gestos' : 'Keyboard Shortcuts & Quick Gestures'}</h2>
          <p className="shortcuts-subtitle">
            {isEs
              ? 'Navega y vive la experiencia del altar con fluidez total desde tu teclado.'
              : 'Navigate and interact with the memorial chamber effortlessly using your keyboard.'}
          </p>
        </div>

        <div className="shortcuts-grid">
          {shortcutsList.map((item, idx) => (
            <div key={idx} className="shortcut-item-card">
              <div className="shortcut-key-badge">
                <kbd>{item.key}</kbd>
              </div>
              <div className="shortcut-desc">
                <div className="shortcut-desc-title">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="shortcuts-footer-hint">
          <Flame size={15} className="hint-flame" />
          <span>{isEs ? 'Consejo: Puedes hacer clic directamente en las velas para encenderlas individualmente con sonido procedural de cerillo.' : 'Tip: You can click directly on any candle to light it individually with procedural match audio.'}</span>
        </div>
      </div>
    </div>
  );
}
