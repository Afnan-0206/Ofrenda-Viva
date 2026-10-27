import React, { useState, useRef } from 'react';
import AncestorCard from './AncestorCard';
import OfferingItem from './OfferingItem';
import Candle from './Candle';
import {
  Plus,
  Sparkles,
  Flower2,
  Flame,
  Heart,
  BookOpen,
  Search,
  X,
  Filter,
  Keyboard
} from 'lucide-react';
import { translations } from '../utils/translations';

/**
 * AltarStage — The 3-Tier Traditional Altar (La Ofrenda de Tres Niveles).
 * Tier 3: El Cielo (Ancestral guides & luminaries under the marigold arch)
 * Tier 2: La Tierra (Our loved ones, personal memories, pets, and keepsakes)
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
  onOpenShortcuts,
  searchInputRef
}) {
  const t = translations[lang] || translations.es;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'tier3' | 'tier2' | 'pets' | 'lit'

  // Filter ancestors based on search & category
  const filteredAncestors = ancestors.filter((a) => {
    // Search match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      (a.relationship && a.relationship.toLowerCase().includes(q)) ||
      (a.story && a.story.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    // Category match
    if (activeFilter === 'tier3') return a.tier === 3;
    if (activeFilter === 'tier2') return a.tier === 2 || !a.tier;
    if (activeFilter === 'pets') {
      const rel = (a.relationship || '').toLowerCase();
      return rel.includes('pet') || rel.includes('perro') || rel.includes('gato') || rel.includes('mascota') || rel.includes('companion') || rel.includes('fiel');
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
      {/* Interactive Guidance & Quick Actions Banner */}
      <div className="welcome-banner-wrap">
        <div className="welcome-banner-card">
          <div className="welcome-banner-text">
            <span className="welcome-icon">🕯️</span>
            <div>
              <h3>{t.welcomeTitle}</h3>
              <p>{t.welcomeDesc}</p>
            </div>
          </div>

          <div className="welcome-quick-actions">
            <button
              type="button"
              className="quick-action-pill highlight"
              onClick={onToggleAllCandles}
              title="Toggle all candles [C]"
            >
              <Flame size={14} />
              <span>{allCandlesLit ? t.btnExtinguishAll : t.btnLightAll}</span>
            </button>

            <button
              type="button"
              className="quick-action-pill"
              onClick={onScatterPetals}
              title="Scatter marigolds [Space]"
            >
              <Flower2 size={14} />
              <span>{t.btnScatterPetals}</span>
            </button>

            <button
              type="button"
              className="quick-action-pill primary"
              onClick={onOpenAddAncestor}
              title="Add a beloved one [A]"
            >
              <Plus size={14} />
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
              title="Clear search"
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

      {/* Background Arch of Marigolds (Arco de Cempasúchil) */}
      <div className="cempasuchil-arch">
        <div className="arch-garland-left">🌼 🌸 🌼 🌸 🌼</div>
        <div className="arch-crest">
          <Flower2 size={24} className="crest-icon" />
          <span className="arch-title">{t.mictlanArch}</span>
          <Flower2 size={24} className="crest-icon" />
        </div>
        <div className="arch-garland-right">🌼 🌸 🌼 🌸 🌼</div>
      </div>

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

              {/* Quick Add Ancestor Card on Tier 2 */}
              <button
                type="button"
                className="add-ancestor-card-btn"
                onClick={onOpenAddAncestor}
                title="Add a beloved ancestor, pet, or family member to the altar"
              >
                <div className="add-card-inner">
                  <div className="add-icon-ring">
                    <Plus size={26} />
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
              <span>{t.addOfferingBtn}</span>
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
          <div
            className="cempasuchil-pathway"
            onClick={onScatterPetals}
            title="Click to scatter glowing cempasúchil petals!"
            role="button"
            tabIndex={0}
          >
            <div className="pathway-petals">
              <span>🌼</span><span>🌸</span><span>🌼</span><span>🌼</span><span>🌸</span><span>🌼</span>
              <span>🌼</span><span>🌸</span><span>🌼</span><span>🌸</span><span>🌼</span><span>🌼</span>
            </div>
            <span className="pathway-label">{t.caminoPetals}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
