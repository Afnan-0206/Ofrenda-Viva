import React from 'react';
import AncestorCard from './AncestorCard';
import OfferingItem from './OfferingItem';
import Candle from './Candle';
import { Plus, Sparkles, Flower2 } from 'lucide-react';

/**
 * AltarStage — The 3-Tier Traditional Altar (La Ofrenda de Tres Niveles).
 * Tier 3: El Cielo (Ancestral guides & luminaries under the marigold arch)
 * Tier 2: La Tierra (Our loved ones, personal memories, and keepsakes)
 * Tier 1: El Inframundo / Purificación (Water, salt, pan de muerto, copal, and vigil candles)
 */
export default function AltarStage({
  ancestors,
  offerings,
  onSelectAncestor,
  onToggleCandle,
  onSelectOffering,
  onOpenAddAncestor,
  onOpenAddOffering,
  altarVigilLit,
  onToggleAltarVigil
}) {
  const tier3Ancestors = ancestors.filter((a) => a.tier === 3);
  const tier2Ancestors = ancestors.filter((a) => a.tier === 2 || !a.tier);
  const tier1Offerings = offerings.filter((o) => o.tier === 1);
  const tier2Offerings = offerings.filter((o) => o.tier === 2);

  return (
    <div className="altar-stage-container">
      {/* Background Arch of Marigolds (Arco de Cempasúchil) */}
      <div className="cempasuchil-arch">
        <div className="arch-left-column"></div>
        <div className="arch-top-curve">
          <div className="arch-crest">
            <Flower2 size={24} className="crest-icon" />
            <span className="arch-title">MICTLÁN &bull; ETERNO RECUERDO</span>
          </div>
        </div>
        <div className="arch-right-column"></div>
      </div>

      {/* ===================== TIER 3: EL CIELO (TOP TIER) ===================== */}
      <div className="altar-tier altar-tier-3">
        <div className="tier-header-badge">
          <span className="tier-num">Nivel III</span>
          <span className="tier-name">El Cielo &bull; Guías Ancestrales</span>
        </div>

        <div className="tier-content-shelf">
          {/* Central Eternal Vigil Candle */}
          <div className="tier-vigil-center" title="Central Altar Vigil Light">
            <Candle
              isLit={altarVigilLit}
              onToggle={onToggleAltarVigil}
              size="large"
              label="Llama Eterna"
            />
          </div>

          {/* Tier 3 Ancestor Portraits */}
          <div className="tier-items-row">
            {tier3Ancestors.map((ancestor) => (
              <AncestorCard
                key={ancestor.id}
                ancestor={ancestor}
                onSelect={onSelectAncestor}
                onToggleCandle={onToggleCandle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===================== TIER 2: LA TIERRA (MIDDLE TIER) ===================== */}
      <div className="altar-tier altar-tier-2">
        <div className="tier-header-badge">
          <span className="tier-num">Nivel II</span>
          <span className="tier-name">La Tierra &bull; Nuestros Seres Queridos</span>
        </div>

        <div className="tier-content-shelf">
          <div className="tier-items-row ancestors-grid">
            {tier2Ancestors.map((ancestor) => (
              <AncestorCard
                key={ancestor.id}
                ancestor={ancestor}
                onSelect={onSelectAncestor}
                onToggleCandle={onToggleCandle}
              />
            ))}

            {/* Quick Add Ancestor Card on Tier 2 */}
            <button
              type="button"
              className="add-ancestor-card-btn"
              onClick={onOpenAddAncestor}
              title="Add a beloved ancestor or family member to the altar"
            >
              <div className="add-card-inner">
                <div className="add-icon-ring">
                  <Plus size={26} />
                </div>
                <span className="add-card-title">Add Loved One</span>
                <span className="add-card-subtitle">Colocar en el Altar</span>
              </div>
            </button>
          </div>

          {/* Mid-tier offerings bar */}
          <div className="tier-secondary-offerings">
            {tier2Offerings.map((offering) => (
              <OfferingItem
                key={offering.id}
                offering={offering}
                onSelect={onSelectOffering}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===================== TIER 1: EL INFRAMUNDO (BASE TIER) ===================== */}
      <div className="altar-tier altar-tier-1">
        <div className="tier-header-badge">
          <span className="tier-num">Nivel I</span>
          <span className="tier-name">El Inframundo &bull; Purificación y Bienvenida</span>
        </div>

        <div className="tier-content-shelf base-shelf">
          {/* Base Row of Traditional Essential Offerings */}
          <div className="offerings-row">
            {tier1Offerings.map((offering) => (
              <OfferingItem
                key={offering.id}
                offering={offering}
                onSelect={onSelectOffering}
              />
            ))}

            {/* Quick Add Custom Offering Button */}
            <button
              type="button"
              className="add-offering-btn"
              onClick={onOpenAddOffering}
              title="Add a custom favorite food or item offering"
            >
              <Plus size={16} />
              <span>Add Offering</span>
            </button>
          </div>

          {/* Row of Votive Ground Candles */}
          <div className="altar-ground-candles">
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
            <div className="ground-calavera-cluster">
              <span className="ground-sugar-skull" title="Calavera de Azúcar">💀</span>
              <span className="ground-flower" title="Pétalos de Cempasúchil">🌼</span>
              <span className="ground-sugar-skull" title="Calavera de Azúcar">💀</span>
            </div>
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
          </div>

          {/* Golden Marigold Petal Pathway (Camino de Cempasúchil) */}
          <div className="cempasuchil-pathway" title="Camino de Cempasúchil guiding souls to the altar">
            <div className="pathway-petals">
              <span>🌼</span><span>🌸</span><span>🌼</span><span>🌼</span><span>🌸</span><span>🌼</span>
              <span>🌼</span><span>🌸</span><span>🌼</span><span>🌸</span><span>🌼</span><span>🌼</span>
            </div>
            <span className="pathway-label">Camino Dorado de Cempasúchil</span>
          </div>
        </div>
      </div>
    </div>
  );
}
