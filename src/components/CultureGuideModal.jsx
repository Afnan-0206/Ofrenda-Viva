import React from 'react';
import { X, Flame, Flower2, Heart, Shield, Wind, Droplet, Sprout } from 'lucide-react';
import { OFRENDA_CULTURE_INFO } from '../utils/initialData';
import { MiniMarigold } from './CempasuchilDecorations';

/**
 * CultureGuideModal — Educational guide explaining the rich cultural symbolism
 * of Día de los Muertos, the 3 tiers of the altar, and why Open Innovation honors this spirit.
 */
export default function CultureGuideModal({ isOpen, onClose }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card culture-guide-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar guía cultural"
        >
          <X size={20} />
        </button>

        <div className="guide-header">
          <div className="guide-header-icon-wrap">
            <MiniMarigold size={36} color="#ff8c00" />
          </div>
          <h2>{OFRENDA_CULTURE_INFO.title}</h2>
          <p className="guide-sub">{OFRENDA_CULTURE_INFO.summary}</p>
        </div>

        {/* 3 Sacred Tiers Breakdown */}
        <div className="guide-section">
          <h3>Los Tres Niveles Sagrados del Altar de Muertos</h3>
          <div className="tiers-explanation-grid">
            {OFRENDA_CULTURE_INFO.tiers.map((tier) => (
              <div key={tier.tierNumber} className="tier-info-box">
                <div className="tier-box-badge">Nivel {tier.tierNumber}</div>
                <h4>{tier.name}</h4>
                <p>{tier.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The 4 Classical Elements on the Altar */}
        <div className="guide-section">
          <h3>Los Cuatro Elementos Sagrados (Los Cuatro Elementos)</h3>
          <div className="elements-four-grid">
            <div className="element-card">
              <div className="element-icon-circle wind">
                <Wind size={22} />
              </div>
              <h4>Viento (Aire)</h4>
              <p>Representado por el <em>Papel Picado</em> que ondea suavemente al llegar los espíritus a la casa.</p>
            </div>

            <div className="element-card">
              <div className="element-icon-circle fire">
                <Flame size={22} />
              </div>
              <h4>Fuego (Fuego)</h4>
              <p>Representado por las <em>Velas y Veladoras</em> que iluminan el camino a través del Mictlán.</p>
            </div>

            <div className="element-card">
              <div className="element-icon-circle water">
                <Droplet size={22} />
              </div>
              <h4>Agua (Agua)</h4>
              <p>Un vaso de agua pura para saciar la sed del viajero tras su largo trayecto espiritual.</p>
            </div>

            <div className="element-card">
              <div className="element-icon-circle earth">
                <Sprout size={22} />
              </div>
              <h4>Tierra (Tierra)</h4>
              <p>Representada por el <em>Pan de Muerto</em> y los frutos de la cosecha que celebran la dulzura de la vida.</p>
            </div>
          </div>
        </div>

        {/* Why Open Innovation Embodies this Spirit */}
        <div className="guide-section open-ai-tribute">
          <div className="open-ai-tribute-header">
            <Shield size={20} className="tribute-shield" />
            <h3>Por qué la Innovación Abierta Honra la Memoria</h3>
          </div>
          <p>
            En nuestra tradición, el "fantasma" no es algo temible, sino un recuerdo amado que se niega a desaparecer.
            Al fundamentar Ofrenda Viva en modelos y formatos abiertos, aseguramos que la memoria de nuestros antepasados
            nos pertenezca plenamente:
          </p>

          <ul className="open-ai-tribute-list">
            <li>
              <strong>Soberanía y Privacidad del Duelo:</strong> Las historias íntimas y retratos familiares nunca deben alimentar modelos comerciales de publicidad corporativa.
            </li>
            <li>
              <strong>Longevidad Fuera de Línea:</strong> Una ofrenda funciona a la luz de las velas cuando una tormenta apaga el internet. El software y los datos locales permanecen accesibles durante décadas.
            </li>
            <li>
              <strong>Preservación Cultural Auténtica:</strong> La rima y las tradiciones orales pertenecen a las familias y a los pueblos, no a algoritmos cerrados.
            </li>
          </ul>
        </div>

        <div className="guide-footer">
          <button type="button" className="btn-primary-altar" onClick={onClose}>
            Entendido con Gratitud
          </button>
        </div>
      </div>
    </div>
  );
}
