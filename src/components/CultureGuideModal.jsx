import React from 'react';
import { X, Flame, Flower2, Heart, Shield, Wind, Droplet, Sprout } from 'lucide-react';
import { MiniMarigold } from './CempasuchilDecorations';

export default function CultureGuideModal({ isOpen, onClose, lang = 'en' }) {
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

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card culture-guide-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label={isEs ? 'Cerrar guía' : 'Close guide'}
        >
          <X size={20} />
        </button>

        <div className="guide-header">
          <div className="guide-header-icon-wrap">
            <MiniMarigold size={36} color="#ff8c00" />
          </div>
          <h2>
            {isEs
              ? 'Cómo Funciona la Tradición del Altar de Muertos'
              : 'How the Day of the Dead Altar Works'}
          </h2>
          <p className="guide-sub">
            {isEs
              ? 'El Día de los Muertos es una celebración cálida y alegre para recordar a los familiares, amigos y mascotas que han partido.'
              : 'Day of the Dead is a warm, joyful Mexican tradition to remember and celebrate family members, dear friends, and faithful pets.'}
          </p>
        </div>

        {/* 3 Shelves Breakdown */}
        <div className="guide-section">
          <h3>
            {isEs
              ? 'Los Tres Pisos del Altar'
              : 'The Three Shelves of the Altar'}
          </h3>
          <div className="tiers-explanation-grid">
            <div className="tier-info-box">
              <div className="tier-box-badge">{isEs ? 'Piso Superior' : 'Top Shelf'}</div>
              <h4>{isEs ? 'Guías y Maestros' : 'Guiding Lights & Heroes'}</h4>
              <p>
                {isEs
                  ? 'Dedicado a los antepasados mayores, héroes o personas que nos inspiraron con su ejemplo y sabiduría.'
                  : 'Honors ancient ancestors, teachers, or historical pioneers who guide us with their wisdom.'}
              </p>
            </div>

            <div className="tier-info-box">
              <div className="tier-box-badge">{isEs ? 'Piso Medio' : 'Middle Shelf'}</div>
              <h4>{isEs ? 'Familiares, Amigos y Mascotas' : 'Family, Friends & Pets'}</h4>
              <p>
                {isEs
                  ? 'El corazón del altar: fotos de abuelos, padres, hermanos, amigos y mascotas queridas, con sus comidas y gustos favoritos.'
                  : 'The heart of the altar: photos of parents, grandparents, friends, and pets, along with their favorite foods and treats.'}
              </p>
            </div>

            <div className="tier-info-box">
              <div className="tier-box-badge">{isEs ? 'Piso Inferior' : 'Bottom Shelf'}</div>
              <h4>{isEs ? 'Comida, Agua y Velas' : 'Food, Water & Candles'}</h4>
              <p>
                {isEs
                  ? 'Los elementos esenciales para recibir a las visitas: agua fresca, sal, pan dulce y velas encendidas para alumbrar el camino.'
                  : 'Traditional welcoming gifts: fresh water, bread, salt, fruit, and warm candlelight to guide the way home.'}
              </p>
            </div>
          </div>
        </div>

        {/* The 4 Classical Elements */}
        <div className="guide-section">
          <h3>
            {isEs
              ? 'Los Cuatro Elementos Naturales'
              : 'The Four Natural Elements on the Altar'}
          </h3>
          <div className="elements-four-grid">
            <div className="element-card">
              <div className="element-icon-circle wind">
                <Wind size={22} />
              </div>
              <h4>{isEs ? 'Viento (Aire)' : 'Wind (Air)'}</h4>
              <p>
                {isEs
                  ? 'Banderitas de papel picado que se mueven con la brisa para avisar que las almas han llegado.'
                  : 'Colorful cut-paper banners that flutter gently in the breeze when loved ones arrive.'}
              </p>
            </div>

            <div className="element-card">
              <div className="element-icon-circle fire">
                <Flame size={22} />
              </div>
              <h4>{isEs ? 'Fuego (Velas)' : 'Fire (Candles)'}</h4>
              <p>
                {isEs
                  ? 'Velas encendidas que dan luz y calor para guiar el camino de regreso a casa.'
                  : 'Glowing candles that provide light and warmth so visiting souls find their way home.'}
              </p>
            </div>

            <div className="element-card">
              <div className="element-icon-circle water">
                <Droplet size={22} />
              </div>
              <h4>{isEs ? 'Agua' : 'Water'}</h4>
              <p>
                {isEs
                  ? 'Un vaso con agua limpia para calmar la sed después de un largo viaje.'
                  : 'A glass of fresh, clean water to quench their thirst after a long journey.'}
              </p>
            </div>

            <div className="element-card">
              <div className="element-icon-circle earth">
                <Sprout size={22} />
              </div>
              <h4>{isEs ? 'Tierra (Comida)' : 'Earth (Food)'}</h4>
              <p>
                {isEs
                  ? 'Pan de muerto, frutas y platillos caseros para celebrar la alegría de la vida.'
                  : 'Sweet bread (Pan de Muerto) and fruit to celebrate the sweetness of life together.'}
              </p>
            </div>
          </div>
        </div>

        {/* Simple Privacy Note */}
        <div className="guide-section open-ai-tribute">
          <div className="open-ai-tribute-header">
            <Shield size={20} className="tribute-shield" />
            <h3>{isEs ? '100% Privado en tu Computadora' : '100% Private on Your Device'}</h3>
          </div>
          <p>
            {isEs
              ? 'Tus fotos familiares, nombres e historias se guardan únicamente en tu navegador. Nadie más puede verlas ni utilizarlas.'
              : 'Your family photos, names, and memories stay right here in your browser. Nothing is sent to public corporate servers or trackers.'}
          </p>
        </div>

        <div className="guide-footer">
          <button type="button" className="btn-dash-primary" onClick={onClose}>
            {isEs ? 'Entendido' : 'Got It, Thanks!'}
          </button>
        </div>
      </div>
    </div>
  );
}
