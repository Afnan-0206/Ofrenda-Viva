import React, { useState, useEffect } from 'react';
import {
  X,
  Cpu,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
  Key,
  Feather
} from 'lucide-react';
import {
  AI_PROVIDERS,
  getAiConfig,
  setAiConfig,
  testOllamaConnection
} from '../utils/aiEngine';

/**
 * AiSettingsModal — Configuration for Cultural AI Chronicler
 * Offers transparent choices: Local Ollama (Google Gemma 2), Live Google Gemini API,
 * or 100% Offline Traditional Folkloric Verse Bard.
 */
export default function AiSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [provider, setProvider] = useState(AI_PROVIDERS.FOLKLORIC_ENGINE);
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState('gemma2:2b');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('gemini-1.5-flash');
  const [testStatus, setTestStatus] = useState(null); // null | 'testing' | 'success' | 'error'
  const [testResult, setTestResult] = useState('');
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const config = getAiConfig();
    setProvider(config.activeProvider || AI_PROVIDERS.FOLKLORIC_ENGINE);
    setOllamaUrl(config.ollamaUrl || 'http://localhost:11434');
    setOllamaModel(config.ollamaModel || 'gemma2:2b');
    setGeminiApiKey(config.geminiApiKey || '');
    setGeminiModel(config.geminiModel || 'gemini-1.5-flash');

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSave = () => {
    setAiConfig({
      activeProvider: provider,
      ollamaUrl,
      ollamaModel,
      geminiApiKey,
      geminiModel
    });
    onClose();
  };

  const handleTestOllama = async () => {
    setTestStatus('testing');
    const result = await testOllamaConnection(ollamaUrl);
    if (result.success) {
      setTestStatus('success');
      setAvailableModels(result.models || []);
      setTestResult(`Conectado exitosamente. Se encontraron ${result.models.length} modelo(s) disponibles.`);
    } else {
      setTestStatus('error');
      setTestResult(`No se pudo conectar a Ollama (${result.error}). Si no tienes Ollama encendido, puedes usar el Bardo Folclórico sin conexión.`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card ai-settings-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar configuración"
        >
          <X size={20} />
        </button>

        <div className="ai-settings-header">
          <div className="ai-icon-badge">
            <Cpu size={24} />
          </div>
          <div>
            <h2>Motor de Inteligencia y Cronista Cultural</h2>
            <p className="ai-header-sub">
              Elige cómo deseas componer las Calaveritas Literarias, elegías y diálogos de memoria.
            </p>
          </div>
        </div>

        {/* ================= WHY OPEN INNOVATION MATTERS CALLOUT ================= */}
        <div className="open-innovation-banner">
          <div className="banner-top">
            <ShieldCheck size={20} className="banner-shield" />
            <h4>Soberanía sobre el Duelo y la Memoria Familiar</h4>
          </div>
          <p>
            Las fotografías de nuestros abuelos, sus anécdotas y nuestro dolor son sagrados.
            Al admitir <strong>Ollama local (Gemma 2)</strong> y un <strong>Bardo Folclórico 100% offline</strong>,
            garantizamos que tus recuerdos nunca se envíen a servidores publicitarios y funcionen aunque se corte el internet.
          </p>
        </div>

        {/* ================= PROVIDER SELECTOR ================= */}
        <div className="provider-selection-section">
          <h3>Selecciona el Modo de Generación:</h3>

          <div className="provider-cards-grid">
            {/* Choice 1: Folkloric Offline Engine */}
            <div
              className={`provider-card ${provider === AI_PROVIDERS.FOLKLORIC_ENGINE ? 'is-active' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.FOLKLORIC_ENGINE)}
              role="button"
              tabIndex={0}
            >
              <div className="provider-card-top">
                <span className="provider-badge offline">100% Offline</span>
                <Feather size={20} className="provider-icon" />
              </div>
              <h4>Bardo Folclórico Tradicional</h4>
              <p>
                Generador poético algorítmico basado en coplas y décimas mexicanas auténticas.
                Funciona al instante sin descargas, sin GPU y sin conexión.
              </p>
              <span className="provider-status-tag">✨ Siempre Listo • Cero Configuración</span>
            </div>

            {/* Choice 2: Local Ollama (Gemma 2) */}
            <div
              className={`provider-card ${provider === AI_PROVIDERS.OLLAMA ? 'is-active' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.OLLAMA)}
              role="button"
              tabIndex={0}
            >
              <div className="provider-card-top">
                <span className="provider-badge local">IA Abierta Local</span>
                <Server size={20} className="provider-icon" />
              </div>
              <h4>Ollama Local (Google Gemma 2)</h4>
              <p>
                Ejecuta modelos de pesos abiertos (Gemma 2:2b / 9b, Llama 3.2) directamente en tu propia
                computadora. Máxima privacidad con inferencia de lenguaje real.
              </p>
              <span className="provider-status-tag">🔒 100% Privado en tu GPU/CPU</span>
            </div>

            {/* Choice 3: Google Gemini API */}
            <div
              className={`provider-card ${provider === AI_PROVIDERS.GEMINI_API ? 'is-active' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.GEMINI_API)}
              role="button"
              tabIndex={0}
            >
              <div className="provider-card-top">
                <span className="provider-badge cloud">API en Vivo</span>
                <Zap size={20} className="provider-icon" />
              </div>
              <h4>Google Gemini API (Nube)</h4>
              <p>
                Conecta tu clave gratuita de Google AI Studio para generar versos con
                Gemini 1.5 Flash sin instalar software adicional.
              </p>
              <span className="provider-status-tag">⚡ Inferencia en la Nube</span>
            </div>
          </div>
        </div>

        {/* ================= OLLAMA CONFIGURATION FIELDS ================= */}
        {provider === AI_PROVIDERS.OLLAMA && (
          <div className="config-fields-panel">
            <h4>Configuración del Servidor Ollama</h4>
            <div className="form-group">
              <label htmlFor="ollama-url">URL de Ollama:</label>
              <input
                id="ollama-url"
                type="text"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                placeholder="http://localhost:11434"
                className="input-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ollama-model">Modelo de Ollama:</label>
              {availableModels.length > 0 ? (
                <select
                  id="ollama-model"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                  className="input-select"
                >
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="ollama-model"
                  type="text"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                  placeholder="gemma2:2b, gemma2:9b, llama3.2"
                  className="input-text"
                />
              )}
            </div>

            <div className="test-connection-row">
              <button
                type="button"
                className="btn-test-connection"
                onClick={handleTestOllama}
                disabled={testStatus === 'testing'}
              >
                {testStatus === 'testing' ? 'Probando conexión...' : 'Probar Conexión con Ollama'}
              </button>

              {testStatus === 'success' && (
                <div className="test-result success">
                  <CheckCircle2 size={16} />
                  <span>{testResult}</span>
                </div>
              )}
              {testStatus === 'error' && (
                <div className="test-result error">
                  <AlertCircle size={16} />
                  <span>{testResult}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= GEMINI API CONFIGURATION FIELDS ================= */}
        {provider === AI_PROVIDERS.GEMINI_API && (
          <div className="config-fields-panel">
            <h4>Configuración de Google Gemini API</h4>
            <div className="form-group">
              <label htmlFor="gemini-key">Clave de API de Google Gemini (AI Studio):</label>
              <input
                id="gemini-key"
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="input-text"
              />
              <span className="field-hint">
                Tu clave se guarda únicamente en el localStorage de tu navegador.
              </span>
            </div>
          </div>
        )}

        <div className="modal-actions-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-primary-altar" onClick={handleSave}>
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
