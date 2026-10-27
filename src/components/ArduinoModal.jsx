import React, { useState, useEffect } from 'react';
import {
  X,
  Cpu,
  Flame,
  UserCheck,
  Radio,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sliders,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { arduinoBridge } from '../utils/arduinoSerial';

export default function ArduinoModal({
  isOpen,
  onClose,
  onFlameDetected,
  onPresenceDetected,
  allCandlesLit
}) {
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connected', 'simulated'
  const [deviceLabel, setDeviceLabel] = useState('Ninguno');
  const [telemetry, setTelemetry] = useState({
    flameRaw: 120,
    flameActive: false,
    presence: false,
    copalActive: false
  });
  const [logMessages, setLogMessages] = useState([]);
  const [isWebSerialSupported, setIsWebSerialSupported] = useState(true);

  useEffect(() => {
    setIsWebSerialSupported(arduinoBridge.isWebSerialSupported());

    const unsubscribe = arduinoBridge.subscribe((event) => {
      if (event.type === 'connection') {
        setConnectionStatus(event.status);
        if (event.device) setDeviceLabel(event.device);
      } else if (event.type === 'telemetry') {
        const d = event.data;
        setTelemetry(prev => ({
          ...prev,
          flameRaw: d.flame_raw !== undefined ? d.flame_raw : prev.flameRaw,
          flameActive: d.flame_active !== undefined ? d.flame_active : (d.event === 'flame_detected' ? true : prev.flameActive),
          presence: d.presence !== undefined ? d.presence : (d.event === 'presence_detected' ? true : prev.presence)
        }));

        if (d.event === 'flame_detected') {
          if (onFlameDetected) onFlameDetected();
          addLog(`[EVENTO] ¡Llama física detectada! Intensidad: ${d.intensity || 850}. Encendiendo velas virtuales.`);
        } else if (d.event === 'presence_detected') {
          if (onPresenceDetected) onPresenceDetected();
          addLog(`[EVENTO] Presencia humana detectada a ${d.distance_cm || 40} cm. Sonando bienvenida.`);
        } else if (d.ack) {
          addLog(`[ACK ARDUINO] Comando recibido: ${d.ack}`);
        }
      } else if (event.type === 'raw') {
        addLog(`[RAW] ${event.text}`);
      }
    });

    return () => unsubscribe();
  }, [onFlameDetected, onPresenceDetected]);

  if (!isOpen) return null;

  const addLog = (msg) => {
    setLogMessages(prev => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 15)
    ]);
  };

  const handleConnectHardware = async () => {
    try {
      addLog('Iniciando handshake WebSerial a 115200 baud...');
      await arduinoBridge.connect();
      addLog('¡Conectado exitosamente al microcontrolador Arduino UNO Q!');
    } catch (err) {
      addLog(`Error al conectar hardware: ${err.message}`);
    }
  };

  const handleStartSimulation = () => {
    arduinoBridge.startSimulation();
    addLog('Simulador de hardware Arduino UNO Q activado.');
  };

  const handleDisconnect = async () => {
    await arduinoBridge.disconnect();
    setConnectionStatus('disconnected');
    setDeviceLabel('Ninguno');
    addLog('Puerto serial cerrado.');
  };

  const handleSimulateFlame = () => {
    const nextState = !telemetry.flameActive;
    arduinoBridge.triggerSimulatedFlame(nextState);
    if (nextState && onFlameDetected) onFlameDetected();
  };

  const handleSimulatePresence = () => {
    arduinoBridge.triggerSimulatedPresence(true);
    if (onPresenceDetected) onPresenceDetected();
  };

  const handleSendBurst = async () => {
    addLog('Enviando comando "offering_burst" hacia Arduino UNO Q...');
    await arduinoBridge.sendCommand({ command: 'offering_burst' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container modal-arduino"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="arduino-modal-title"
      >
        {/* Header */}
        <div className="modal-header arduino-header">
          <div className="arduino-header-title">
            <div className="badge-arduino">
              <Cpu size={16} />
              <span>Qualcomm AI Hub • Arduino UNO Q</span>
            </div>
            <h2 id="arduino-modal-title" className="modal-title">
              Agente Físico del Altar (IoT Sensor & Actuador)
            </h2>
            <p className="arduino-header-subtitle">
              Sincronización bidireccional vía WebSerial: sensores físicos de llama y presencia humana activan la ofrenda virtual en tiempo real.
            </p>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>

        <div className="arduino-body">
          {/* Connection Status Bar */}
          <div className={`arduino-status-bar status-${connectionStatus}`}>
            <div className="status-indicator">
              <span className={`status-dot dot-${connectionStatus}`}></span>
              <div>
                <strong>Estado: </strong>
                {connectionStatus === 'connected' && 'Conectado a Hardware Físico'}
                {connectionStatus === 'simulated' && 'Simulador de Hardware Activo (Modo Demo)'}
                {connectionStatus === 'disconnected' && 'Desconectado'}
              </div>
            </div>
            <div className="status-device">
              <span>Dispositivo: <strong>{deviceLabel}</strong></span>
            </div>
          </div>

          {/* Connect Action Buttons */}
          <div className="arduino-actions-row">
            {connectionStatus === 'disconnected' ? (
              <>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleConnectHardware}
                  disabled={!isWebSerialSupported}
                >
                  <Radio size={16} />
                  <span>Conectar Arduino UNO Q (WebSerial)</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleStartSimulation}
                >
                  <Zap size={16} />
                  <span>Activar Simulador de Hardware (Para Jurados)</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleDisconnect}
              >
                <RefreshCw size={16} />
                <span>Desconectar Puerto Serial</span>
              </button>
            )}
          </div>

          {/* Sensor Telemetry Gauges */}
          <div className="arduino-gauges-grid">
            {/* Gauge 1: Flame Sensor */}
            <div className={`gauge-card ${telemetry.flameActive ? 'active-flame' : ''}`}>
              <div className="gauge-icon">
                <Flame size={24} className={telemetry.flameActive ? 'flame-flicker-anim' : ''} />
              </div>
              <div className="gauge-details">
                <span className="gauge-title">Sensor de Llama (Pin A0)</span>
                <span className="gauge-value">
                  {telemetry.flameActive ? '¡Llama Encendida!' : 'Apagado / Reposo'}
                </span>
                <span className="gauge-raw">Lectura analógica ADC: {telemetry.flameRaw} / 1023</span>
              </div>
            </div>

            {/* Gauge 2: PIR Presence Sensor */}
            <div className={`gauge-card ${telemetry.presence ? 'active-presence' : ''}`}>
              <div className="gauge-icon">
                <UserCheck size={24} />
              </div>
              <div className="gauge-details">
                <span className="gauge-title">Sensor de Proximidad PIR (Pin D2)</span>
                <span className="gauge-value">
                  {telemetry.presence ? 'Persona Junto al Altar' : 'Sin Movimiento'}
                </span>
                <span className="gauge-raw">Resonancia Acústica Qualcomm AI Hub</span>
              </div>
            </div>
          </div>

          {/* Test & Simulation Triggers */}
          <div className="arduino-sim-controls">
            <h4>Pruebas Interactivas de Enlace Físico-Digital</h4>
            <div className="sim-buttons-row">
              <button
                type="button"
                className="btn-sim-trigger btn-flame"
                onClick={handleSimulateFlame}
              >
                <Flame size={16} />
                <span>{telemetry.flameActive ? 'Extinguir Llama Físicamente' : 'Encender Llama Físicamente (Fósforo)'}</span>
              </button>

              <button
                type="button"
                className="btn-sim-trigger btn-presence"
                onClick={handleSimulatePresence}
              >
                <UserCheck size={16} />
                <span>Simular Aproximación Humana al Altar</span>
              </button>

              <button
                type="button"
                className="btn-sim-trigger btn-burst"
                onClick={handleSendBurst}
              >
                <Sparkles size={16} />
                <span>Enviar Pulso de Ofrenda a Neopixeles (Pin D5)</span>
              </button>
            </div>
          </div>

          {/* Serial Terminal Log */}
          <div className="arduino-terminal-box">
            <div className="terminal-header">
              <Terminal size={14} />
              <span>Consola Serial (115200 baud • WebSerial JSON Stream)</span>
            </div>
            <div className="terminal-log">
              {logMessages.length === 0 ? (
                <div className="terminal-empty">Esperando datos de telemetría de Arduino UNO Q...</div>
              ) : (
                logMessages.map((msg, i) => <div key={i} className="terminal-line">{msg}</div>)
              )}
            </div>
          </div>

          {/* Wiring Pinout Accordion */}
          <div className="arduino-pinout-note">
            <span>
              <strong>Hardware:</strong> Arduino UNO Q con procesador Qualcomm Snapdragon. Código fuente listo en <code>arduino/ofrenda_uno_q/ofrenda_uno_q.ino</code>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
