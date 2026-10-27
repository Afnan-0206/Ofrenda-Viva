import React, { useState, useEffect } from 'react';
import {
  X,
  Cpu,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
  HardDriveDownload,
  Lock
} from 'lucide-react';
import {
  AI_PROVIDERS,
  getAiConfig,
  setAiConfig,
  testOllamaConnection
} from '../utils/aiEngine';

/**
 * AiSettingsModal — Configuration for Open-Source AI (Gemma 2 / Ollama)
 * Demonstrates why open weights and local execution are indispensable for private family grief.
 */
export default function AiSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [provider, setProvider] = useState(AI_PROVIDERS.LOCAL_GEMMA);
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState('gemma2:2b');
  const [testStatus, setTestStatus] = useState(null); // null | 'testing' | 'success' | 'error'
  const [testResult, setTestResult] = useState('');
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    const config = getAiConfig();
    setProvider(config.activeProvider || AI_PROVIDERS.LOCAL_GEMMA);
    setOllamaUrl(config.ollamaUrl || 'http://localhost:11434');
    setOllamaModel(config.ollamaModel || 'gemma2:2b');
  }, [isOpen]);

  const handleSave = () => {
    setAiConfig({
      activeProvider: provider,
      ollamaUrl,
      ollamaModel
    });
    onClose();
  };

  const handleTestOllama = async () => {
    setTestStatus('testing');
    const result = await testOllamaConnection(ollamaUrl);
    if (result.success) {
      setTestStatus('success');
      setAvailableModels(result.models || []);
      setTestResult(`Connected! Found ${result.models.length} model(s): ${result.models.slice(0, 3).join(', ')}...`);
    } else {
      setTestStatus('error');
      setTestResult(`Could not reach Ollama: ${result.error}. (Falling back automatically to built-in Gemma 2 engine)`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card ai-settings-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close settings"
        >
          <X size={20} />
        </button>

        <div className="ai-settings-header">
          <div className="ai-icon-badge">
            <Cpu size={24} />
          </div>
          <div>
            <h2>Open-Source AI & Model Runtime</h2>
            <p className="ai-header-sub">
              Empowered by open-weight models (Google Gemma 2 & Ollama). Zero data sent to commercial cloud servers.
            </p>
          </div>
        </div>

        {/* ================= WHY OPEN INNOVATION MATTERS CALLOUT ================= */}
        <div className="open-innovation-banner">
          <div className="banner-top">
            <ShieldCheck size={20} className="banner-shield" />
            <h4>Why Open Innovation Matters for Ofrenda Viva</h4>
          </div>
          <p>
            Memories of departed loved ones, family grief, and ancestral stories are deeply intimate.
            Closed commercial APIs (like OpenAI or Anthropic) log prompts on remote servers, train on user inputs,
            and can lock your family's remembrances behind paywalls or discontinue services.
          </p>
          <div className="open-benefits-row">
            <div className="benefit-item">
              <Lock size={15} />
              <span>100% Private on Laptop</span>
            </div>
            <div className="benefit-item">
              <Zap size={15} />
              <span>Runs with Zero Internet</span>
            </div>
            <div className="benefit-item">
              <HardDriveDownload size={15} />
              <span>Open Forever — No API Keys</span>
            </div>
          </div>
        </div>

        {/* Provider Selection */}
        <div className="provider-selection-section">
          <h3>Select Model Runtime:</h3>

          <div className="provider-cards-grid">
            {/* Provider 1: Local Built-in Gemma 2 Engine */}
            <div
              className={`provider-card ${provider === AI_PROVIDERS.LOCAL_GEMMA ? 'is-selected' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.LOCAL_GEMMA)}
              role="button"
              tabIndex={0}
            >
              <div className="provider-card-header">
                <Zap size={18} className="provider-icon-local" />
                <span className="provider-name">Built-in Gemma 2 Open Engine</span>
                {provider === AI_PROVIDERS.LOCAL_GEMMA && <CheckCircle2 size={16} className="check-active" />}
              </div>
              <p className="provider-desc">
                Instant in-browser neural engine. Requires no software installation, zero setup, and works 100% offline right now.
              </p>
              <span className="provider-tag">Zero Configuration &bull; Recommended</span>
            </div>

            {/* Provider 2: Localhost Ollama (Gemma 2:2B / 9B) */}
            <div
              className={`provider-card ${provider === AI_PROVIDERS.OLLAMA ? 'is-selected' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.OLLAMA)}
              role="button"
              tabIndex={0}
            >
              <div className="provider-card-header">
                <Server size={18} className="provider-icon-server" />
                <span className="provider-name">Local Ollama (Gemma 2 / Llama 3)</span>
                {provider === AI_PROVIDERS.OLLAMA && <CheckCircle2 size={16} className="check-active" />}
              </div>
              <p className="provider-desc">
                Connects directly to your local Ollama instance running at localhost. Perfect if you have Gemma 2:2b, 9b or Llama 3 downloaded on your GPU.
              </p>
              <span className="provider-tag">Custom Local Hardware Inference</span>
            </div>
          </div>
        </div>

        {/* Ollama Configuration Fields (if selected) */}
        {provider === AI_PROVIDERS.OLLAMA && (
          <div className="ollama-config-panel">
            <h4>Ollama Local Endpoint Configuration:</h4>

            <div className="form-row">
              <div className="form-group flex-2">
                <label>Ollama Server URL</label>
                <input
                  type="text"
                  value={ollamaUrl}
                  onChange={(e) => setOllamaUrl(e.target.value)}
                  placeholder="http://localhost:11434"
                />
              </div>

              <div className="form-group flex-1">
                <label>Model Tag</label>
                <input
                  type="text"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                  placeholder="gemma2:2b"
                />
              </div>
            </div>

            <div className="ollama-test-row">
              <button
                type="button"
                className="btn-test-ollama"
                onClick={handleTestOllama}
                disabled={testStatus === 'testing'}
              >
                {testStatus === 'testing' ? 'Pinging Localhost...' : 'Test Ollama Connection'}
              </button>

              {testStatus === 'success' && (
                <div className="test-alert success">
                  <CheckCircle2 size={16} />
                  <span>{testResult}</span>
                </div>
              )}

              {testStatus === 'error' && (
                <div className="test-alert error">
                  <AlertCircle size={16} />
                  <span>{testResult}</span>
                </div>
              )}
            </div>

            {availableModels.length > 0 && (
              <div className="detected-models-strip">
                <span>Detected Models: </span>
                {availableModels.map((m, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="model-tag-pill"
                    onClick={() => setOllamaModel(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="ai-settings-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary-altar" onClick={handleSave}>
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
