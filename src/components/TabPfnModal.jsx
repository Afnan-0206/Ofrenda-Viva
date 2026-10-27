import React, { useState, useEffect } from 'react';
import {
  X,
  Table,
  Sparkles,
  AlertTriangle,
  BrainCircuit,
  TrendingUp,
  Upload,
  CheckCircle2,
  FileSpreadsheet,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { tabpfnAgent, HISTORICAL_EPOCHS, REGIONAL_HEALTH_INDEX } from '../utils/tabpfnAgent';

export default function TabPfnModal({
  isOpen,
  onClose,
  ancestors = [],
  onAddAncestorFromTabPfn,
  lang = 'es'
}) {
  const [activeTab, setActiveTab] = useState('forecast'); // 'forecast', 'anomalies', 'csv'
  const [features, setFeatures] = useState({
    name: 'Don Ignacio Velasco',
    birthYear: '1890',
    gender: 'M',
    state: 'Ciudad de México',
    occupation: 'Tipógrafo de gaceta',
    causeCategory: 'Spanish Flu Pandemic'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState([]);
  const [forecastResult, setForecastResult] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [anomalyResults, setAnomalyResults] = useState([]);
  const [customCsvLoaded, setCustomCsvLoaded] = useState(false);

  // Load historical CSV on mount
  useEffect(() => {
    if (isOpen) {
      fetch('/data/mexican_genealogy_historical_1880_1990.csv')
        .then(r => r.text())
        .then(text => {
          const parsed = tabpfnAgent.parseCsv(text);
          setHistoricalData(parsed);
          // Run anomaly detection across records
          const evaluated = tabpfnAgent.spotAnomaly
            ? parsed.slice(0, 15).map(r => ({ ...r, anomaly: tabpfnAgent.spotAnomaly(r) }))
            : [];
          setAnomalyResults(evaluated);
        })
        .catch(err => console.warn('Could not load historical dataset:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRunForecast = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setThinkingSteps([]);
    setForecastResult(null);

    try {
      const result = await tabpfnAgent.forecastLifespan(features, (step) => {
        setThinkingSteps(prev => [...prev, step]);
      });
      setForecastResult(result);
    } catch (err) {
      console.error('TabPFN forecast failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToAltar = () => {
    if (!forecastResult || !onAddAncestorFromTabPfn) return;
    const bYear = parseInt(features.birthYear, 10) || 1900;
    const dYear = bYear + (forecastResult.predictedLifespan || 70);

    const newAncestor = {
      name: features.name || 'Antepasado Recuperado',
      years: `${bYear} – ${dYear}`,
      relation: `Linaje de ${features.state}`,
      memory: `Predicción TabPFN-3.5: Cohorte ${forecastResult.epoch}. Esperanza calculada de ${forecastResult.predictedLifespan} años con intervalo Bayesian del 95% [${forecastResult.credibleInterval.join(' - ')}].`,
      image: '/portrait_abuela.jpg',
      favoriteFoods: ['Pan de muerto con ajonjolí', 'Chocolate de metate'],
      favoriteDrinks: ['Café de olla', 'Agua de manantial'],
      hobbies: [features.occupation || 'Oficios tradicionales'],
      biography: `Registro demográfico procesado por el modelo fundacional tabular TabPFN-3.5 de Prior Labs.`,
      tags: ['TabPFN-3.5', features.state, forecastResult.epoch]
    };

    onAddAncestorFromTabPfn(newAncestor);
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const parsed = tabpfnAgent.parseCsv(text);
        setHistoricalData(parsed);
        const evaluated = parsed.map(r => ({ ...r, anomaly: tabpfnAgent.spotAnomaly(r) }));
        setAnomalyResults(evaluated);
        setCustomCsvLoaded(true);
        setActiveTab('anomalies');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container modal-tabpfn"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="tabpfn-modal-title"
      >
        {/* Header */}
        <div className="modal-header tabpfn-header">
          <div className="tabpfn-header-title">
            <div className="badge-prior-labs">
              <Table size={16} />
              <span>Prior Labs • TabPFN-3.5</span>
            </div>
            <h2 id="tabpfn-modal-title" className="modal-title">
              Inteligencia Demográfica Ancestral & Detección de Anomalías
            </h2>
            <p className="tabpfn-header-subtitle">
              Modelo fundacional tabular para pronóstico in-context de longevidad histórica y detección de anomalías epidémicas en México (1880–1990).
            </p>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="tabpfn-nav-tabs">
          <button
            type="button"
            className={`tabpfn-tab-btn ${activeTab === 'forecast' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecast')}
          >
            <BrainCircuit size={16} />
            <span>Pronóstico con Thinking Mode</span>
          </button>

          <button
            type="button"
            className={`tabpfn-tab-btn ${activeTab === 'anomalies' ? 'active' : ''}`}
            onClick={() => setActiveTab('anomalies')}
          >
            <AlertTriangle size={16} />
            <span>Detector de Anomalías Epidémicas ({anomalyResults.filter(a => a.anomaly?.isAnomaly).length})</span>
          </button>

          <button
            type="button"
            className={`tabpfn-tab-btn ${activeTab === 'csv' ? 'active' : ''}`}
            onClick={() => setActiveTab('csv')}
          >
            <FileSpreadsheet size={16} />
            <span>Datos Históricos & Carga CSV</span>
          </button>
        </div>

        {/* Tab 1: Lifespan Forecasting */}
        {activeTab === 'forecast' && (
          <div className="tabpfn-body">
            <form onSubmit={handleRunForecast} className="tabpfn-form-grid">
              <div className="field-group">
                <label>Nombre del Antepasado</label>
                <input
                  type="text"
                  className="field-input"
                  value={features.name}
                  onChange={(e) => setFeatures({ ...features, name: e.target.value })}
                  placeholder="Ej. Doña Esperanza Morales"
                  required
                />
              </div>

              <div className="field-group">
                <label>Año de Nacimiento (1880–1990)</label>
                <input
                  type="number"
                  min="1850"
                  max="2020"
                  className="field-input"
                  value={features.birthYear}
                  onChange={(e) => setFeatures({ ...features, birthYear: e.target.value })}
                  required
                />
              </div>

              <div className="field-group">
                <label>Género</label>
                <select
                  className="field-input"
                  value={features.gender}
                  onChange={(e) => setFeatures({ ...features, gender: e.target.value })}
                >
                  <option value="F">Femenino (F)</option>
                  <option value="M">Masculino (M)</option>
                </select>
              </div>

              <div className="field-group">
                <label>Estado / Región de México</label>
                <select
                  className="field-input"
                  value={features.state}
                  onChange={(e) => setFeatures({ ...features, state: e.target.value })}
                >
                  {Object.keys(REGIONAL_HEALTH_INDEX).filter(k => k !== 'Default').map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>Ocupación Histórica</label>
                <input
                  type="text"
                  className="field-input"
                  value={features.occupation}
                  onChange={(e) => setFeatures({ ...features, occupation: e.target.value })}
                  placeholder="Ej. Tejedora, Minero, Alfarera"
                />
              </div>

              <div className="field-group">
                <label>Categoría de Causa / Contexto</label>
                <select
                  className="field-input"
                  value={features.causeCategory}
                  onChange={(e) => setFeatures({ ...features, causeCategory: e.target.value })}
                >
                  <option value="Natural Senescence">Senescencia Natural</option>
                  <option value="Spanish Flu Pandemic">Pandemia de Gripe Española (1918)</option>
                  <option value="Revolution Conflict">Conflicto Revolucionario (1910–1920)</option>
                  <option value="Asian Flu Epidemic">Epidemia Gripe Asiática (1957)</option>
                  <option value="Cardiovascular">Causa Cardiovascular</option>
                </select>
              </div>

              <div className="tabpfn-form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary tabpfn-submit-btn"
                >
                  {isLoading ? (
                    <>
                      <BrainCircuit size={18} className="spin-icon" />
                      <span>TabPFN-3.5 Razonando en Thinking Mode...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Ejecutar Predicción con TabPFN-3.5</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Thinking Mode Real-Time Log */}
            {thinkingSteps.length > 0 && (
              <div className="tabpfn-thinking-box">
                <div className="tabpfn-thinking-header">
                  <BrainCircuit size={16} />
                  <span>Traza de Inferencia Tabular: TabPFN-3.5 Thinking Mode</span>
                </div>
                <div className="tabpfn-thinking-log">
                  {thinkingSteps.map((step, idx) => (
                    <div key={idx} className="thinking-line">{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Forecast Output Card */}
            {forecastResult && (
              <div className="tabpfn-result-card">
                <div className="result-headline">
                  <div className="result-stat">
                    <span className="stat-label">Esperanza de Vida Estimada</span>
                    <span className="stat-number">{forecastResult.predictedLifespan} <span className="stat-unit">años</span></span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-label">Intervalo de Confianza Bayesiano 95%</span>
                    <span className="stat-range">[{forecastResult.credibleInterval[0]} – {forecastResult.credibleInterval[1]} años]</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-label">Cohorte Histórica</span>
                    <span className="stat-badge">{forecastResult.epoch}</span>
                  </div>
                </div>

                {/* Feature Attributions */}
                <div className="result-features-section">
                  <h4>Importancia de Características (Atención Tabular TabPFN)</h4>
                  <div className="features-bars">
                    {forecastResult.featureImportances.map((item, idx) => (
                      <div key={idx} className="feature-bar-row">
                        <span className="feature-name">{item.feature}</span>
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${Math.round(item.importance * 100)}%` }}></div>
                        </div>
                        <span className="feature-pct">{Math.round(item.importance * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="result-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleApplyToAltar}
                  >
                    <PlusCircle size={18} />
                    <span>Colocar este Antepasado en el Altar Virtual</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Historical Anomaly Spotting */}
        {activeTab === 'anomalies' && (
          <div className="tabpfn-body">
            <div className="anomalies-header-desc">
              <p>
                TabPFN-3.5 identifica automáticamente desviaciones estadísticas significativas en registros parroquiales y civiles, vinculándolas con eventos epidemiológicos e históricos de México.
              </p>
            </div>

            <div className="anomalies-list">
              {anomalyResults.map((item, idx) => {
                const isAnom = item.anomaly?.isAnomaly;
                return (
                  <div key={idx} className={`anomaly-card ${isAnom ? 'is-anomaly' : 'is-normal'}`}>
                    <div className="anomaly-card-top">
                      <div className="anomaly-person">
                        <span className="person-name">{item.name}</span>
                        <span className="person-meta">{item.state} • Nació {item.birth_year || item.birthYear} – Murió {item.death_year || item.deathYear} ({item.lifespan} años)</span>
                      </div>
                      <div className="anomaly-badge">
                        {isAnom ? (
                          <span className="badge-anomaly">
                            <AlertTriangle size={14} />
                            Anomalía ({Math.round((item.anomaly?.anomalyScore || 0) * 100)}%)
                          </span>
                        ) : (
                          <span className="badge-normal">
                            <CheckCircle2 size={14} />
                            Normal
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="anomaly-explanation">
                      <strong>{item.anomaly?.cluster}</strong>: {item.anomaly?.historicalContext || item.notes}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Dataset Explorer & Upload */}
        {activeTab === 'csv' && (
          <div className="tabpfn-body">
            <div className="csv-upload-box">
              <Upload size={32} />
              <h4>Cargar Árbol Genealógico Familiar (CSV)</h4>
              <p>Sube un archivo CSV con columnas <code>name, birth_year, death_year, state, occupation</code> para que TabPFN-3.5 detecte anomalías generacionales.</p>
              <label className="btn-upload-csv">
                <span>Seleccionar archivo CSV</span>
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              {customCsvLoaded && (
                <div className="csv-loaded-badge">
                  <CheckCircle2 size={16} />
                  <span>Archivo CSV cargado exitosamente ({historicalData.length} registros)</span>
                </div>
              )}
            </div>

            <div className="table-preview-container">
              <h4>Dataset Histórico de Referencia: México 1880–1990</h4>
              <table className="tabpfn-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Nacimiento</th>
                    <th>Defunción</th>
                    <th>Edad</th>
                    <th>Estado</th>
                    <th>Ocupación</th>
                    <th>Causa / Contexto</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.slice(0, 10).map((row, i) => (
                    <tr key={i} className={row.anomaly_flag === '1' ? 'row-highlight' : ''}>
                      <td><strong>{row.name}</strong></td>
                      <td>{row.birth_year}</td>
                      <td>{row.death_year}</td>
                      <td>{row.lifespan} años</td>
                      <td>{row.state}</td>
                      <td>{row.occupation}</td>
                      <td>{row.cause_category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
