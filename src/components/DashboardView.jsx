import React, { useState } from 'react';
import {
  Users,
  Flame,
  Flower2,
  Calendar,
  Search,
  Plus,
  Sparkles,
  Cpu,
  Radio,
  Clock,
  Shield,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { translations } from '../utils/translations';
import { tabpfnAgent, HISTORICAL_EPOCHS, REGIONAL_HEALTH_INDEX } from '../utils/tabpfnAgent';
import { arduinoBridge } from '../utils/arduinoSerial';

export default function DashboardView({
  lang = 'en',
  ancestors = [],
  offerings = [],
  onSelectAncestor,
  onToggleCandle,
  onToggleAllCandles,
  allCandlesLit,
  onOpenAddAncestor,
  onOpenAddOffering,
  onOpenExport,
  onAddAncestorFromTabPfn,
  arduinoConnected = false
}) {
  const t = translations[lang] || translations.en;

  // Active sub-tab inside Dashboard
  const [activeTab, setActiveTab] = useState('registry'); // 'registry' | 'genealogy' | 'sensors' | 'offerings'

  // Registry search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'tier3' | 'tier2' | 'pets' | 'lit'

  // History & Life Calculator state
  const [genForm, setGenForm] = useState({
    name: 'Don Ignacio Velasco',
    birthYear: '1898',
    gender: 'M',
    state: 'Ciudad de México',
    occupation: lang === 'es' ? 'Tipógrafo de gaceta' : 'Newspaper printer',
    causeCategory: 'Natural causes'
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [genealogyResult, setGenealogyResult] = useState(null);
  const [genStatusMessage, setGenStatusMessage] = useState('');

  // Hardware simulator triggers
  const [simMessage, setSimMessage] = useState('');

  // Metrics
  const totalAncestors = ancestors.length;
  const litCount = ancestors.filter((a) => a.candleLit).length;
  const luminariesCount = ancestors.filter((a) => a.tier === 3).length;
  const familyCount = ancestors.filter((a) => a.tier === 2 || !a.tier).length;
  const petCount = ancestors.filter((a) => {
    const rel = (a.relationship || '').toLowerCase();
    return rel.includes('pet') || rel.includes('mascota') || rel.includes('perro') || rel.includes('gato');
  }).length;

  // Calculate timeline range
  const yearsList = ancestors
    .map((a) => {
      const match = (a.years || '').match(/\b(18\d{2}|19\d{2}|20\d{2})\b/g);
      return match ? match.map(Number) : [];
    })
    .flat()
    .filter(Boolean);
  const minYear = yearsList.length > 0 ? Math.min(...yearsList) : 1890;
  const maxYear = yearsList.length > 0 ? Math.max(...yearsList) : 2024;

  // Filter registry
  const filteredAncestors = ancestors.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      (a.relationship && a.relationship.toLowerCase().includes(q)) ||
      (a.story && a.story.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (filterCategory === 'tier3') return a.tier === 3;
    if (filterCategory === 'tier2') return a.tier === 2 || !a.tier;
    if (filterCategory === 'pets') {
      const rel = (a.relationship || '').toLowerCase();
      return (
        rel.includes('pet') ||
        rel.includes('perro') ||
        rel.includes('gato') ||
        rel.includes('mascota')
      );
    }
    if (filterCategory === 'lit') return a.candleLit;

    return true;
  });

  // Handle Genealogy calculation
  const handleRunGenealogy = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setGenealogyResult(null);
    setGenStatusMessage(lang === 'es' ? 'Consultando datos históricos...' : 'Looking up historical records...');

    try {
      const result = await tabpfnAgent.forecastLifespan(genForm, (step) => {
        setGenStatusMessage(step);
      });
      setGenealogyResult(result);
      setGenStatusMessage(
        lang === 'es' ? '¡Consulta histórica lista!' : 'Historical life lookup ready!'
      );
    } catch (err) {
      console.error('History lookup error:', err);
      setGenStatusMessage(lang === 'es' ? 'Error al consultar.' : 'Lookup error.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleApplyGenealogyToAltar = () => {
    if (!genealogyResult || !onAddAncestorFromTabPfn) return;
    const bYear = parseInt(genForm.birthYear, 10) || 1900;
    const dYear = bYear + (genealogyResult.predictedLifespan || 70);

    const newAncestor = {
      name: genForm.name || (lang === 'es' ? 'Antepasado Familiar' : 'Family Ancestor'),
      years: `${bYear} – ${dYear}`,
      relationship: lang === 'es' ? `Linaje de ${genForm.state}` : `Family from ${genForm.state}`,
      story:
        lang === 'es'
          ? `Registro histórico: Periodo ${genealogyResult.epoch}. Esperanza calculada de ${genealogyResult.predictedLifespan} años. Oficio: ${genForm.occupation}.`
          : `Historical record: Lived in the ${genealogyResult.epoch} era. Average life length of ${genealogyResult.predictedLifespan} years. Trade: ${genForm.occupation}.`,
      photo: '/portrait_abuela.jpg',
      favoriteFoods: 'Pan de muerto con canela',
      favoriteMusic: 'Guitarra tradicional',
      candleLit: true,
      tier: 2
    };

    onAddAncestorFromTabPfn(newAncestor);
    setActiveTab('registry');
  };

  // Trigger simulated flame
  const handleSimulateFlame = () => {
    arduinoBridge.simulateFlameEvent();
    setSimMessage(
      lang === 'es'
        ? '¡Llama simulada detectada! Velas del altar encendidas.'
        : 'Flame detected! Digital altar candles turned on.'
    );
    setTimeout(() => setSimMessage(''), 4000);
  };

  // Trigger simulated presence
  const handleSimulatePresence = () => {
    arduinoBridge.simulatePresenceEvent();
    setSimMessage(
      lang === 'es'
        ? '¡Alguien se acercó al altar! Sonando bienvenida.'
        : 'Someone stepped up to the altar! Playing acoustic guitar.'
    );
    setTimeout(() => setSimMessage(''), 4000);
  };

  return (
    <div className="dashboard-container">
      {/* Top Overview Header */}
      <div className="dashboard-header-card">
        <div className="dashboard-header-info">
          <div className="dashboard-badge-row">
            <span className="dashboard-status-chip">
              <span className="status-dot-pulse"></span>
              {lang === 'es' ? 'Altar Activo' : 'Family Altar Live'}
            </span>
            <span className="dashboard-mode-chip">
              {arduinoConnected
                ? (lang === 'es' ? 'Sensor Físico Conectado' : 'Real Sensor Connected')
                : (lang === 'es' ? 'Guardado Privado en tu Equipo' : 'Saved Privately on This Device')}
            </span>
          </div>
          <h2 className="dashboard-main-title">{t.dashTitle}</h2>
          <p className="dashboard-main-subtitle">{t.dashSubtitle}</p>
        </div>

        <div className="dashboard-header-actions">
          <button
            type="button"
            className="btn-dash-primary"
            onClick={onOpenAddAncestor}
          >
            <Plus size={16} />
            <span>{t.btnAddLovedOne}</span>
          </button>

          <button
            type="button"
            className="btn-dash-secondary"
            onClick={onOpenExport}
          >
            <FileSpreadsheet size={16} />
            <span>{t.archivar}</span>
          </button>
        </div>
      </div>

      {/* 4 Simple Key Metric Cards */}
      <div className="dashboard-kpi-grid">
        {/* Metric 1: People on Altar */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t.metricLovedOnes}</span>
            <div className="kpi-icon-wrap gold">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{totalAncestors}</span>
            <span className="kpi-trend">
              {luminariesCount} {lang === 'es' ? 'guías' : 'guides'} • {familyCount} {lang === 'es' ? 'familia' : 'family'}
            </span>
          </div>
          <span className="kpi-caption">{t.metricLovedOnesSub}</span>
        </div>

        {/* Metric 2: Lit Candles */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t.metricVigils}</span>
            <div className="kpi-icon-wrap orange">
              <Flame size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">
              {litCount} <span className="kpi-sub-number">/ {totalAncestors}</span>
            </span>
            <button
              type="button"
              className={`kpi-quick-toggle ${allCandlesLit ? 'active' : ''}`}
              onClick={onToggleAllCandles}
              title={allCandlesLit ? t.btnExtinguishAll : t.btnLightAll}
            >
              <Flame size={14} />
              <span>{allCandlesLit ? (lang === 'es' ? 'Apagar' : 'Turn Off') : (lang === 'es' ? 'Encender' : 'Light All')}</span>
            </button>
          </div>
          <span className="kpi-caption">{t.metricVigilsSub}</span>
        </div>

        {/* Metric 3: Food & Gifts */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t.metricOfferings}</span>
            <div className="kpi-icon-wrap rose">
              <Flower2 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{offerings.length}</span>
            <button
              type="button"
              className="kpi-quick-toggle"
              onClick={onOpenAddOffering}
            >
              <Plus size={14} />
              <span>{lang === 'es' ? 'Agregar' : '+ Add Food'}</span>
            </button>
          </div>
          <span className="kpi-caption">{t.metricOfferingsSub}</span>
        </div>

        {/* Metric 4: Years Covered */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{t.metricTimeline}</span>
            <div className="kpi-icon-wrap blue">
              <Calendar size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number range">{minYear} – {maxYear}</span>
            <span className="kpi-trend">
              {maxYear - minYear} {lang === 'es' ? 'años' : 'years'}
            </span>
          </div>
          <span className="kpi-caption">{t.metricTimelineSub}</span>
        </div>
      </div>

      {/* Dashboard Sub-tabs */}
      <div className="dashboard-nav-tabs">
        <button
          type="button"
          className={`dash-tab-btn ${activeTab === 'registry' ? 'active' : ''}`}
          onClick={() => setActiveTab('registry')}
        >
          <Users size={16} />
          <span>{t.tabRegistry}</span>
          <span className="tab-count-badge">{ancestors.length}</span>
        </button>

        <button
          type="button"
          className={`dash-tab-btn ${activeTab === 'genealogy' ? 'active' : ''}`}
          onClick={() => setActiveTab('genealogy')}
        >
          <TrendingUp size={16} />
          <span>{t.tabGenealogy}</span>
        </button>

        <button
          type="button"
          className={`dash-tab-btn ${activeTab === 'sensors' ? 'active' : ''}`}
          onClick={() => setActiveTab('sensors')}
        >
          <Radio size={16} />
          <span>{t.tabSensors}</span>
          {arduinoConnected && <span className="tab-status-dot online"></span>}
        </button>

        <button
          type="button"
          className={`dash-tab-btn ${activeTab === 'offerings' ? 'active' : ''}`}
          onClick={() => setActiveTab('offerings')}
        >
          <Flower2 size={16} />
          <span>{t.tabOfferings}</span>
        </button>
      </div>

      {/* ================= TAB 1: REGISTRY ================= */}
      {activeTab === 'registry' && (
        <div className="dashboard-tab-content">
          {/* Filter & Search Bar */}
          <div className="registry-filter-bar">
            <div className="registry-search-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="registry-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>

            <div className="registry-filter-pills">
              <button
                type="button"
                className={`filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCategory('all')}
              >
                {t.filterAll} ({ancestors.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${filterCategory === 'tier3' ? 'active' : ''}`}
                onClick={() => setFilterCategory('tier3')}
              >
                {t.filterLuminaries} ({luminariesCount})
              </button>
              <button
                type="button"
                className={`filter-pill ${filterCategory === 'tier2' ? 'active' : ''}`}
                onClick={() => setFilterCategory('tier2')}
              >
                {t.filterFamily} ({familyCount})
              </button>
              <button
                type="button"
                className={`filter-pill ${filterCategory === 'pets' ? 'active' : ''}`}
                onClick={() => setFilterCategory('pets')}
              >
                {t.filterPets} ({petCount})
              </button>
              <button
                type="button"
                className={`filter-pill ${filterCategory === 'lit' ? 'active' : ''}`}
                onClick={() => setFilterCategory('lit')}
              >
                {t.filterLit} ({litCount})
              </button>
            </div>
          </div>

          {/* Registry Data Table */}
          <div className="registry-table-wrapper">
            <table className="registry-table">
              <thead>
                <tr>
                  <th>{t.colName}</th>
                  <th>{t.colRelation}</th>
                  <th>{t.colYears}</th>
                  <th>{t.colTier}</th>
                  <th>{t.colVigil}</th>
                  <th style={{ textAlign: 'right' }}>{t.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAncestors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-table-cell">
                      <p>{t.noMatchesFound}</p>
                      <button
                        type="button"
                        className="btn-dash-secondary"
                        style={{ marginTop: '0.8rem' }}
                        onClick={() => {
                          setSearchQuery('');
                          setFilterCategory('all');
                        }}
                      >
                        {t.clearFilters}
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredAncestors.map((ancestor) => (
                    <tr key={ancestor.id} className="registry-table-row">
                      {/* Name & Avatar */}
                      <td className="cell-person">
                        <div
                          className={`person-avatar-wrap ${ancestor.candleLit ? 'is-lit' : ''}`}
                          onClick={() => onSelectAncestor(ancestor)}
                        >
                          <img
                            src={ancestor.photo || ancestor.image}
                            alt={ancestor.name}
                            className="person-avatar-img"
                            onError={(e) => {
                              e.target.src = '/portrait_abuela.jpg';
                            }}
                          />
                          {ancestor.candleLit && (
                            <span className="avatar-lit-halo" title="Candle is Lit">🕯️</span>
                          )}
                        </div>
                        <div className="person-text-info">
                          <button
                            type="button"
                            className="person-name-link"
                            onClick={() => onSelectAncestor(ancestor)}
                          >
                            {ancestor.name}
                          </button>
                          {ancestor.story && (
                            <span className="person-epitaph">
                              {ancestor.story.slice(0, 60)}...
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Relationship */}
                      <td>
                        <span className="relation-tag">
                          {ancestor.relationship || (lang === 'es' ? 'Familiar' : 'Family')}
                        </span>
                      </td>

                      {/* Years */}
                      <td>
                        <span className="years-text">{ancestor.years || '—'}</span>
                      </td>

                      {/* Shelf Badge */}
                      <td>
                        <span
                          className={`tier-badge-pill ${
                            ancestor.tier === 3 ? 'tier-3' : 'tier-2'
                          }`}
                        >
                          {ancestor.tier === 3
                            ? (lang === 'es' ? 'Piso Superior • Guías' : 'Top Shelf • Guides')
                            : (lang === 'es' ? 'Piso Medio • Familia' : 'Middle Shelf • Family')}
                        </span>
                      </td>

                      {/* Candle Switch */}
                      <td>
                        <button
                          type="button"
                          className={`candle-switch-btn ${ancestor.candleLit ? 'is-lit' : ''}`}
                          onClick={() => onToggleCandle(ancestor.id, !ancestor.candleLit)}
                          title={
                            ancestor.candleLit
                              ? (lang === 'es' ? 'Apagar vela' : 'Turn off candle')
                              : (lang === 'es' ? 'Encender vela' : 'Light candle')
                          }
                        >
                          <Flame size={14} />
                          <span>
                            {ancestor.candleLit
                              ? (lang === 'es' ? 'Encendida' : 'On')
                              : (lang === 'es' ? 'Apagada' : 'Off')}
                          </span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-table-action"
                          onClick={() => onSelectAncestor(ancestor)}
                        >
                          <span>{t.btnViewStory}</span>
                          <ArrowRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 2: HISTORY & LIFE TOOL ================= */}
      {activeTab === 'genealogy' && (
        <div className="dashboard-tab-content">
          <div className="genealogy-panel-grid">
            {/* Left: Input Form */}
            <div className="genealogy-card">
              <div className="genealogy-card-header">
                <div className="icon-badge">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="section-title">{t.genealogyTitle}</h3>
                  <p className="section-subtitle">{t.genealogyDesc}</p>
                </div>
              </div>

              <form onSubmit={handleRunGenealogy} className="genealogy-form">
                <div className="form-group">
                  <label>{t.inputName}</label>
                  <input
                    type="text"
                    value={genForm.name}
                    onChange={(e) => setGenForm({ ...genForm, name: e.target.value })}
                    placeholder="e.g. Manuel, Carmen, Rosa..."
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>{t.inputBirthYear}</label>
                    <input
                      type="number"
                      min="1880"
                      max="1990"
                      value={genForm.birthYear}
                      onChange={(e) => setGenForm({ ...genForm, birthYear: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t.inputGender}</label>
                    <select
                      value={genForm.gender}
                      onChange={(e) => setGenForm({ ...genForm, gender: e.target.value })}
                    >
                      <option value="M">{lang === 'es' ? 'Hombre' : 'Male'}</option>
                      <option value="F">{lang === 'es' ? 'Mujer' : 'Female'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>{t.inputRegion}</label>
                    <select
                      value={genForm.state}
                      onChange={(e) => setGenForm({ ...genForm, state: e.target.value })}
                    >
                      <option value="Ciudad de México">Ciudad de México</option>
                      <option value="Puebla">Puebla</option>
                      <option value="Michoacán">Michoacán</option>
                      <option value="Oaxaca">Oaxaca</option>
                      <option value="Jalisco">Jalisco</option>
                      <option value="Veracruz">Veracruz</option>
                      <option value="Zacatecas">Zacatecas</option>
                      <option value="Guanajuato">Guanajuato</option>
                      <option value="Chiapas">Chiapas</option>
                      <option value="Yucatán">Yucatán</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{t.inputOccupation}</label>
                    <input
                      type="text"
                      value={genForm.occupation}
                      onChange={(e) => setGenForm({ ...genForm, occupation: e.target.value })}
                      placeholder="e.g. Farmer, Teacher, Carpenter..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="btn-dash-primary full-width"
                >
                  <Sparkles size={16} />
                  <span>
                    {isCalculating
                      ? (lang === 'es' ? 'Consultando datos...' : 'Checking records...')
                      : t.btnAnalyze}
                  </span>
                </button>

                {genStatusMessage && (
                  <p className="genealogy-status-note">{genStatusMessage}</p>
                )}
              </form>
            </div>

            {/* Right: Results or Guide */}
            <div className="genealogy-card result-side">
              {genealogyResult ? (
                <div className="genealogy-results-view">
                  <div className="result-header">
                    <span className="result-chip">
                      {lang === 'es' ? 'Resultado Histórico' : 'Historical Result'}
                    </span>
                    <h4>{genForm.name}</h4>
                  </div>

                  <div className="result-stats-row">
                    <div className="result-stat-box">
                      <span className="stat-label">{t.resultExpectedAge}</span>
                      <span className="stat-big-val">
                        {genealogyResult.predictedLifespan}{' '}
                        <span className="stat-unit">{lang === 'es' ? 'años' : 'years'}</span>
                      </span>
                      <span className="stat-range">
                        {lang === 'es' ? 'Rango típico' : 'Typical range'}:{' '}
                        {genealogyResult.credibleInterval?.join(' – ') || '55 – 78'} {lang === 'es' ? 'años' : 'years'}
                      </span>
                    </div>

                    <div className="result-stat-box">
                      <span className="stat-label">{t.resultEpoch}</span>
                      <span className="stat-medium-val">{genealogyResult.epoch}</span>
                      <span className="stat-range">
                        {lang === 'es' ? 'Lugar' : 'Region'}: {genForm.state}
                      </span>
                    </div>
                  </div>

                  <div className="result-context-box">
                    <h5>{t.resultEvents}</h5>
                    <p>
                      {lang === 'es'
                        ? `Nacido en ${genForm.birthYear} durante ${genealogyResult.epoch}. En este tiempo, las familias en ${genForm.state} y personas con el oficio de ${genForm.occupation} vivieron importantes cambios en la comunidad.`
                        : `Born in ${genForm.birthYear} during the ${genealogyResult.epoch} time period. During these decades, families in ${genForm.state} working in ${genForm.occupation} witnessed major historic changes in daily community life.`}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn-dash-primary"
                    onClick={handleApplyGenealogyToAltar}
                  >
                    <Plus size={16} />
                    <span>{t.btnApplyAltar}</span>
                  </button>
                </div>
              ) : (
                <div className="genealogy-empty-guide">
                  <div className="empty-icon-circle">
                    <Calendar size={32} />
                  </div>
                  <h4>
                    {lang === 'es'
                      ? 'Explora la historia de tus familiares'
                      : 'Explore your family’s life history'}
                  </h4>
                  <p>
                    {lang === 'es'
                      ? 'Escribe los datos a la izquierda para ver cuántos años solían vivir las personas en esa época y cómo era la vida entonces.'
                      : 'Enter their birth year and trade on the left to see how long people typically lived back then and what daily life was like.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SMART HARDWARE SENSORS ================= */}
      {activeTab === 'sensors' && (
        <div className="dashboard-tab-content">
          <div className="sensors-panel-grid">
            <div className="sensor-card">
              <div className="sensor-card-header">
                <div className="icon-badge">
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 className="section-title">{t.sensorTitle}</h3>
                  <p className="section-subtitle">{t.sensorDesc}</p>
                </div>
              </div>

              {simMessage && (
                <div className="sensor-alert-box">
                  <span>{simMessage}</span>
                </div>
              )}

              <div className="sensor-status-indicator">
                <div className={`status-pill-big ${arduinoConnected ? 'online' : 'simulated'}`}>
                  <span className="dot"></span>
                  <span>
                    {arduinoConnected
                      ? (lang === 'es' ? 'Sensor USB Conectado' : 'Real USB Sensor Connected')
                      : (lang === 'es' ? 'Modo de Prueba Listo' : 'Testing Mode Ready')}
                  </span>
                </div>
              </div>

              <div className="sensor-telemetry-grid">
                <div className="telemetry-item">
                  <div className="telemetry-label">
                    <Flame size={16} />
                    <span>{lang === 'es' ? 'Sensor de Llama Real' : 'Real Flame Sensor'}</span>
                  </div>
                  <span className="telemetry-state active">
                    {lang === 'es' ? 'Vigilando' : 'Watching'}
                  </span>
                </div>

                <div className="telemetry-item">
                  <div className="telemetry-label">
                    <Radio size={16} />
                    <span>{lang === 'es' ? 'Sensor de Presencia' : 'Room Proximity Sensor'}</span>
                  </div>
                  <span className="telemetry-state active">
                    {lang === 'es' ? 'Listo' : 'Ready'}
                  </span>
                </div>
              </div>

              <div className="sensor-actions-row">
                <button
                  type="button"
                  className="btn-dash-primary"
                  onClick={handleSimulateFlame}
                >
                  <Flame size={16} />
                  <span>{t.btnSimulateFlame}</span>
                </button>

                <button
                  type="button"
                  className="btn-dash-secondary"
                  onClick={handleSimulatePresence}
                >
                  <Radio size={16} />
                  <span>{t.btnSimulatePresence}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: OFFERINGS & FOOD ================= */}
      {activeTab === 'offerings' && (
        <div className="dashboard-tab-content">
          <div className="offerings-panel">
            <div className="offerings-panel-header">
              <div>
                <h3 className="section-title">{t.offeringsTitle}</h3>
                <p className="section-subtitle">{t.offeringsSubtitle}</p>
              </div>
              <button
                type="button"
                className="btn-dash-primary"
                onClick={onOpenAddOffering}
              >
                <Plus size={16} />
                <span>{lang === 'es' ? '+ Agregar Comida u Ofrenda' : '+ Add Food or Gift'}</span>
              </button>
            </div>

            <div className="offerings-inventory-grid">
              {offerings.map((offering) => (
                <div key={offering.id} className="offering-inventory-card">
                  <div className="offering-art-wrap">
                    <img
                      src={offering.image || '/cempasuchil.png'}
                      alt={offering.name}
                      onError={(e) => {
                        e.target.src = '/cempasuchil.png';
                      }}
                    />
                  </div>
                  <div className="offering-card-body">
                    <div className="offering-tier-badge">
                      {offering.tier === 1
                        ? (lang === 'es' ? 'Piso Inferior • Tradición' : 'Bottom Shelf • Tradition')
                        : (lang === 'es' ? 'Piso Medio • Recuerdos' : 'Middle Shelf • Memories')}
                    </div>
                    <h4>{offering.name}</h4>
                    <p className="offering-symbolism">{offering.meaning || offering.symbolism}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
