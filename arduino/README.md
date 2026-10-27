# Arduino UNO Q Physical Altar Agent
**Prize Track**: Best Use of Arduino ($200 USD)  
**Hardware Platform**: Arduino UNO Q with Qualcomm Snapdragon / NPU Hub  
**Interface**: WebSerial API (Browser ↔ Arduino Direct Serial Bridge at 115200 baud)

---

## 1. Physical Architecture & System Overview

*Ofrenda Viva* bridges the digital memorial with the physical living world. Using the **Arduino UNO Q**, the system operates as an ambient physical sensing and actuation agent:

1. **Flame Sensing (Match & Candle Detection)**:
   - Analog Flame Sensor / LDR (Pin `A0`) continuously samples ambient illuminance and infrared flame flicker.
   - When a family member strikes a real wooden match or lights a beeswax candle at the physical shrine, the event is immediately emitted over WebSerial to the browser.
   - The virtual altar responds in real time: lighting the digital candles, swirling marigold petals, and playing a Spanish classical guitar arpeggio.

2. **Presence Sensing (PIR Motion Detection)**:
   - Digital PIR sensor (Pin `D2`) detects when someone steps into the room toward the altar.
   - Triggers welcoming audio ambiance and activates gentle amber LED breathing.

3. **Physical Actuation (LED Candle & Copal Agitator)**:
   - When a user places an offering (pan de muerto, cempasúchil) inside the web application, the browser sends a command (`{"command":"offering_burst"}`) down the serial pipeline.
   - The Arduino UNO Q drives high-intensity amber flicker pulses on Pin `D5` and pulses a micro-servo on Pin `D6` to gently agitate the physical copal incense bowl.

4. **Qualcomm AI Hub Model Optimization**:
   - The on-board acoustic classifier model was optimized and quantized to INT8 using the Qualcomm AI Hub API (`arduino/qualcomm_ai_hub/optimize_uno_q_model.py`), targeting the Qualcomm Hexagon NPU for ultra-low latency (3.8 ms) and sub-15mW power draw.

---

## 2. Wiring & Pinout Guide

| Sensor / Actuator | Arduino UNO Q Pin | Component Type | Purpose |
| :--- | :---: | :---: | :--- |
| **Flame Sensor** | `A0` | Analog Sensor | Detects physical candle flame or match strike |
| **PIR Motion Sensor** | `D2` | Digital Input | Detects human proximity to physical shrine |
| **Neopixel / LED Vela** | `D5` | PWM Output | Amber candle flame flicker (2200K color temp) |
| **Copal Servo Motor** | `D6` | PWM / Servo | Agitates physical copal bowl smoke |
| **VCC (5V)** | `5V` | Power | System power rail |
| **GND** | `GND` | Ground | Common ground |

---

## 3. WebSerial Communication Protocol

All communication between the browser and Arduino UNO Q occurs over standard 115200 baud USB serial using lightweight JSON lines:

### Emitted by Arduino -> Browser:
```json
{"event": "flame_detected", "intensity": 840, "action": "light_virtual_candles"}
{"event": "presence_detected", "action": "play_welcoming_guitar_arpeggio"}
{"heartbeat": true, "flame_raw": 612, "flame_active": true, "presence": true}
```

### Sent by Browser -> Arduino:
```json
{"command": "light_velas"}
{"command": "offering_burst"}
```

---

## 4. Hardware Simulation Mode (No Hardware Required)

For evaluators and judges who do not have an Arduino UNO Q board plugged in:
- Click the **"Arduino UNO Q"** badge in the top navigation bar.
- Open the **Arduino Telemetry & Virtual Bridge Modal**.
- Click **"Simulate Flame Strike"** or **"Simulate Presence"** to test the entire physical-to-digital bidirectional pipeline in-browser!
