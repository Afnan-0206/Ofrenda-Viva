import React, { useState } from 'react';
import AncestorCard from './AncestorCard';
import OfferingItem from './OfferingItem';
import Candle from './Candle';
import { CalaveraAzucarArt, CempasuchilFlowerArt } from './AltarArtwork';
import { BotanicalMarigoldArch, BotanicalPetalFloorPath } from './CempasuchilDecorations';
import {
  Plus,
  Flame,
  Search,
  X,
  Flower2,
  Sparkles
} from 'lucide-react';
import { translations } from '../utils/translations';

/**
 * AltarStage — The 3-Tier Traditional Mexican Altar (La Ofrenda de Tres Niveles).
 * Tier 3: El Cielo (Ancestral guides & luminaries under the botanical marigold arch)
 * Tier 2: La Tierra (Our loved ones, personal memories, pets, and keepsakes draped in lace)
 * Tier 1: El Inframundo / Purificación (Water, salt, pan de muerto, copal, and vigil candles)
 */
export default function AltarStage({
  lang = 'es',
  ancestors,
  offerings,
  onSelectAncestor,
  onToggleCandle,
  onSelectOffering,
  onOpenAddAncestor,
  onOpenAddOffering,
  altarVigilLit,
  onToggleAltarVigil,
  onToggleAllCandles,
  onScatterPetals,
  allCandlesLit,
  searchInputRef
}) {
  const t = translations[lang] || translations.es;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'tier3' | 'tier2' | 'pets' | 'lit'

  // Filter ancestors based on search & category
  const filteredAncestors = ancestors.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      (a.relationship && a.relationship.toLowerCase().includes(q)) ||
      (a.story && a.story.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (activeFilter === 'tier3') return a.tier === 3;
    if (activeFilter === 'tier2') return a.tier === 2 || !a.tier;
    if (activeFilter === 'pets') {
      const rel = (a.relationship || '').toLowerCase();
      return (
        rel.includes('pet') ||
        rel.includes('perro') ||
        rel.includes('gato') ||
        rel.includes('mascota') ||
        rel.includes('companion') ||
        rel.includes('fiel')
      );
    }
    if (activeFilter === 'lit') return a.candleLit;

    return true;
  });

  const tier3Ancestors = filteredAncestors.filter((a) => a.tier === 3);
  const tier2Ancestors = filteredAncestors.filter((a) => a.tier === 2 || !a.tier);
  const tier1Offerings = offerings.filter((o) => o.tier === 1);
  const tier2Offerings = offerings.filter((o) => o.tier === 2);

  return (
    <div className="altar-stage-container">
      {/* Reverent Altar Dedication & Gentle Sanctuary Inscription */}
      <div className="altar-dedication-wrap">
        <div className="altar-dedication-content">
          <div className="dedication-title-row">
            <h2 className="altar-sacred-title">{t.welcomeTitle}</h2>
          </div>
          <p className="altar-sacred-desc">{t.welcomeDesc}</p>

          <div className="altar-reverent-actions">
            <button
              type="button"
              className={`reverent-action-btn ${allCandlesLit ? 'active' : ''}`}
              onClick={onToggleAllCandles}
              title="Encender o apagar todas las velas [C]"
            >
              <Flame size={15} />
              <span>{allCandlesLit ? t.btnExtinguishAll : t.btnLightAll}</span>
            </button>

            <button
              type="button"
              className="reverent-action-btn"
              onClick={onScatterPetals}
              title="Esparcir pétalos de Cempasúchil [Space]"
            >
              <Flower2 size={15} />
              <span>{t.btnScatterPetals}</span>
            </button>

            <button
              type="button"
              className="reverent-action-btn primary"
              onClick={onOpenAddAncestor}
              title="Colocar a un ser querido o mascota en el altar [A]"
            >
              <Plus size={15} />
              <span>{t.btnAddLovedOne}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Altar Search & Category Filter Bar */}
      <div className="altar-filter-bar">
        <div className="filter-search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Limpiar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-categories-wrap">
          <button
            type="button"
            className={`filter-cat-pill ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {t.filterAll}
          </button>
          <button
            type="button"
            className={`filter-cat-pill ${activeFilter === 'tier3' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('tier3')}
          >
            {t.filterLuminaries}
          </button>
          <button
            type="button"
            className={`filter-cat-pill ${activeFilter === 'tier2' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('tier2')}
          >
            {t.filterFamily}
          </button>
          <button
            type="button"
            className={`filter-cat-pill ${activeFilter === 'pets' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('pets')}
          >
            {t.filterPets}
          </button>
          <button
            type="button"
            className={`filter-cat-pill ${activeFilter === 'lit' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('lit')}
          >
            {t.filterLit}
          </button>
        </div>
      </div>

      {/* Realistic Botanical Arch of Marigolds (Arco de Cempasúchil) */}
      <BotanicalMarigoldArch title={t.mictlanArch} />

      {/* If search query has 0 matches */}
      {filteredAncestors.length === 0 && (
        <div className="no-matches-banner">
          <p>{t.noMatchesFound}</p>
          <button
            type="button"
            className="clear-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          >
            {t.clearFilters}
          </button>
        </div>
      )}

      {/* ===================== TIER 3: EL CIELO (TOP TIER) ===================== */}
      {(tier3Ancestors.length > 0 || (activeFilter === 'all' && !searchQuery)) && (
        <div className="altar-tier altar-tier-3">
          <div className="tier-header-badge">
            <span className="tier-num">{t.nivel3Badge}</span>
            <span className="tier-name">{t.nivel3Title}</span>
          </div>

          <div className="tier-content-shelf">
            {/* Scalloped Traditional Cream Lace Runner */}
            <div className="altar-lace-runner" aria-hidden="true"></div>

            {/* Central Eternal Vigil Candle */}
            <div className="tier-vigil-center" title="Llama Eterna / Central Altar Vigil">
              <Candle
                isLit={altarVigilLit}
                onToggle={onToggleAltarVigil}
                size="large"
                label={t.llamaEterna}
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
                  lang={lang}
                />
              ))}
            </div>

            {/* Carved Wood Shelf Lip */}
            <div className="altar-shelf-edge" aria-hidden="true"></div>
          </div>
        </div>
      )}

      {/* ===================== TIER 2: LA TIERRA (MIDDLE TIER) ===================== */}
      {(tier2Ancestors.length > 0 || (activeFilter === 'all' && !searchQuery)) && (
        <div className="altar-tier altar-tier-2">
          <div className="tier-header-badge">
            <span className="tier-num">{t.nivel2Badge}</span>
            <span className="tier-name">{t.nivel2Title}</span>
          </div>

          <div className="tier-content-shelf">
            {/* Scalloped Traditional Cream Lace Runner */}
            <div className="altar-lace-runner" aria-hidden="true"></div>

            <div className="tier-items-row ancestors-grid">
              {tier2Ancestors.map((ancestor) => (
                <AncestorCard
                  key={ancestor.id}
                  ancestor={ancestor}
                  onSelect={onSelectAncestor}
                  onToggleCandle={onToggleCandle}
                  lang={lang}
                />
              ))}

              {/* Add Loved One Card on Tier 2 */}
              <button
                type="button"
                className="add-ancestor-card-btn"
                onClick={onOpenAddAncestor}
                title="Colocar un ser querido, familiar o mascota en el altar"
              >
                <div className="add-card-inner">
                  <div className="add-icon-ring">
                    <Plus size={24} />
                  </div>
                  <span className="add-card-title">{t.addLovedOneCard}</span>
                  <span className="add-card-subtitle">{t.addLovedOneSub}</span>
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

            {/* Carved Wood Shelf Lip */}
            <div className="altar-shelf-edge" aria-hidden="true"></div>
          </div>
        </div>
      )}

      {/* ===================== TIER 1: EL INFRAMUNDO (BASE TIER) ===================== */}
      <div className="altar-tier altar-tier-1">
        <div className="tier-header-badge">
          <span className="tier-num">{t.nivel1Badge}</span>
          <span className="tier-name">{t.nivel1Title}</span>
        </div>

        <div className="tier-content-shelf base-shelf">
          {/* Scalloped Traditional Cream Lace Runner */}
          <div className="altar-lace-runner" aria-hidden="true"></div>

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
              title="Agregar una ofrenda o platillo especial"
            >
              <Plus size={16} />
              <span>{t.addOfferingBtn}</span>
            </button>
          </div>

          {/* Row of Authentic Votive Ground Candles & Handcrafted Sugar Skulls */}
          <div className="altar-ground-candles">
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />

            <div className="ground-calavera-cluster" title="Calaveras de azúcar y flores al pie del altar">
              <CalaveraAzucarArt size={36} />
              <CempasuchilFlowerArt size={32} />
              <CalaveraAzucarArt size={36} />
            </div>

            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
            <Candle size="small" glass={true} isLit={altarVigilLit} onToggle={onToggleAltarVigil} />
          </div>

          {/* Golden Marigold Petal Pathway across the Floor (Camino de Cempasúchil) */}
          <BotanicalPetalFloorPath onClick={onScatterPetals} label={t.caminoPetals} />
        </div>
      </div>
    </div>
  );
}
