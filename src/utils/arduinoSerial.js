/**
 * WebSerial API Client for Arduino UNO Q Physical Shrine Agent
 * 
 * Enables direct bidirectional serial communication between the browser
 * and the Arduino UNO Q microcontroller at 115200 baud.
 * 
 * Features:
 * - Native WebSerial API port request & stream reader
 * - Automatic JSON line delimiter parsing
 * - Virtual Hardware Simulator for evaluation without physical board
 * - Flame and presence event dispatching
 */

class ArduinoUnoQBridge {
  constructor() {
    this.port = null;
    this.reader = null;
    this.writer = null;
    this.isConnected = false;
    this.isSimulated = false;
    this.listeners = new Set();
    this.simTimer = null;
    this.lastFlameState = false;
    this.lastPresenceState = false;
  }

  isWebSerialSupported() {
    return typeof navigator !== 'undefined' && 'serial' in navigator;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  emit(data) {
    this.listeners.forEach(cb => {
      try { cb(data); } catch (e) { console.error('Serial subscriber error:', e); }
    });
  }

  /**
   * Connect to real Arduino UNO Q via WebSerial
   */
  async connect() {
    if (!this.isWebSerialSupported()) {
      throw new Error('WebSerial API is not supported in this browser. Use Chrome, Edge, or Opera.');
    }

    try {
      this.port = await navigator.serial.requestPort({
        filters: [{ usbVendorId: 0x2341 }] // Arduino VID (or all if unspecified)
      });
      await this.port.open({ baudRate: 115200 });
      this.isConnected = true;
      this.isSimulated = false;

      this.readLoop();
      this.emit({ type: 'connection', status: 'connected', device: 'Arduino UNO Q (Physical)' });
      return true;
    } catch (err) {
      this.isConnected = false;
      throw err;
    }
  }

  /**
   * Continuous read loop for incoming serial lines
   */
  async readLoop() {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
    this.reader = textDecoder.readable.getReader();

    let buffer = '';
    try {
      while (true) {
        const { value, done } = await this.reader.read();
        if (done) break;
        if (value) {
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop(); // Keep incomplete chunk in buffer

          for (const line of lines) {
            const cleanLine = line.trim();
            if (!cleanLine) continue;
            try {
              const parsed = JSON.parse(cleanLine);
              this.emit({ type: 'telemetry', data: parsed });
            } catch {
              this.emit({ type: 'raw', text: cleanLine });
            }
          }
        }
      }
    } catch (err) {
      console.warn('WebSerial stream closed or disconnected:', err);
    } finally {
      this.reader.releaseLock();
    }
  }

  /**
   * Send JSON command to Arduino
   */
  async sendCommand(commandObj) {
    const jsonStr = JSON.stringify(commandObj) + '\n';
    if (this.isConnected && this.port && this.port.writable) {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
      const writer = textEncoder.writable.getWriter();
      await writer.write(jsonStr);
      writer.releaseLock();
    } else if (this.isSimulated) {
      // Echo acknowledgment in simulation
      this.emit({
        type: 'telemetry',
        data: { ack: commandObj.command, simulated: true, timestamp: Date.now() }
      });
    }
  }

  /**
   * Activate in-browser hardware simulator for judges / demo
   */
  startSimulation() {
    this.isSimulated = true;
    this.isConnected = true;
    this.emit({ type: 'connection', status: 'simulated', device: 'Arduino UNO Q (Hardware Simulator)' });

    // Periodic heartbeat simulation
    if (this.simTimer) clearInterval(this.simTimer);
    this.simTimer = setInterval(() => {
      this.emit({
        type: 'telemetry',
        data: {
          heartbeat: true,
          flame_raw: this.lastFlameState ? 780 : 120,
          flame_active: this.lastFlameState,
          presence: this.lastPresenceState,
          simulated: true
        }
      });
    }, 1000);
  }

  /**
   * Trigger simulated flame strike (lighting candle or match)
   */
  triggerSimulatedFlame(active = true) {
    this.lastFlameState = active;
    this.emit({
      type: 'telemetry',
      data: {
        event: active ? 'flame_detected' : 'flame_extinguished',
        intensity: active ? 845 : 0,
        action: active ? 'light_virtual_candles' : 'none',
        simulated: true
      }
    });
  }

  /**
   * Trigger simulated presence detection (person walking up to altar)
   */
  triggerSimulatedPresence(active = true) {
    this.lastPresenceState = active;
    if (active) {
      this.emit({
        type: 'telemetry',
        data: {
          event: 'presence_detected',
          distance_cm: 38,
          action: 'play_welcoming_guitar_arpeggio',
          simulated: true
        }
      });
    }
  }

  /**
   * Disconnect port or stop simulation
   */
  async disconnect() {
    if (this.simTimer) {
      clearInterval(this.simTimer);
      this.simTimer = null;
    }
    if (this.reader) {
      try { await this.reader.cancel(); } catch {}
    }
    if (this.port) {
      try { await this.port.close(); } catch {}
    }
    this.isConnected = false;
    this.isSimulated = false;
    this.emit({ type: 'connection', status: 'disconnected' });
  }
}

export const arduinoBridge = new ArduinoUnoQBridge();
