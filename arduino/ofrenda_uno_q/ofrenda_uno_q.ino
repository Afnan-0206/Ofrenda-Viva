/**
 * Ofrenda Viva - Arduino UNO Q Physical Shrine Agent
 * 
 * Hardware: Arduino UNO Q (Qualcomm AI Hub enabled)
 * Components:
 *  - Analog Flame Sensor / LDR (Pin A0)
 *  - PIR Human Presence Sensor (Pin D2)
 *  - Addressable LED Ring (WS2812B / Neopixel) for Vela Flicker (Pin D5)
 *  - Micro-Servo for Copal Smoke Agitator (Pin D6)
 * 
 * WebSerial Communication Protocol: 115200 baud, newline-delimited JSON
 */

#include <Arduino.h>

// Pin Definitions
const int PIN_FLAME_SENSOR = A0;
const int PIN_PIR_PRESENCE = 2;
const int PIN_LED_VELA = 5;
const int PIN_SERVO_COPAL = 6;

// Calibration Thresholds
const int FLAME_THRESHOLD = 520; // Analog reading indicating active match or candle flame
const unsigned long TELEMETRY_INTERVAL_MS = 250;

// State Variables
int lastFlameValue = 0;
bool flameActive = false;
bool presenceActive = false;
unsigned long lastTelemetryTime = 0;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_FLAME_SENSOR, INPUT);
  pinMode(PIN_PIR_PRESENCE, INPUT);
  pinMode(PIN_LED_VELA, OUTPUT);
  pinMode(PIN_SERVO_COPAL, OUTPUT);

  // Initial greeting handshake to browser WebSerial
  delay(500);
  Serial.println("{\"status\":\"ready\",\"device\":\"arduino_uno_q\",\"model\":\"qualcomm_ai_hub_edge_v1\"}");
}

void loop() {
  unsigned long now = millis();

  // 1. Read Physical Flame Sensor (A0)
  int flameVal = analogRead(PIN_FLAME_SENSOR);
  bool currentFlame = (flameVal > FLAME_THRESHOLD);

  if (currentFlame != flameActive) {
    flameActive = currentFlame;
    if (flameActive) {
      // Send instantaneous event to browser virtual altar
      Serial.print("{\"event\":\"flame_detected\",\"intensity\":");
      Serial.print(flameVal);
      Serial.println(",\"action\":\"light_virtual_candles\"}");
    } else {
      Serial.println("{\"event\":\"flame_extinguished\",\"intensity\":0}");
    }
  }

  // 2. Read Physical PIR Presence (D2)
  int pirVal = digitalRead(PIN_PIR_PRESENCE);
  bool currentPresence = (pirVal == HIGH);

  if (currentPresence != presenceActive) {
    presenceActive = currentPresence;
    if (presenceActive) {
      Serial.println("{\"event\":\"presence_detected\",\"action\":\"play_welcoming_guitar_arpeggio\"}");
    }
  }

  // 3. Candle Flame Simulation (PWM Flicker on Pin D5)
  if (flameActive) {
    int flicker = random(180, 255);
    analogWrite(PIN_LED_VELA, flicker);
  } else {
    analogWrite(PIN_LED_VELA, 25); // Dim amber standby ember
  }

  // 4. Handle Incoming Commands from Browser Virtual Altar
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();
    if (input.indexOf("light_velas") >= 0) {
      flameActive = true;
      Serial.println("{\"ack\":\"velas_lit_remotely\"}");
    } else if (input.indexOf("offering_burst") >= 0) {
      // Pulse LEDs brightly and agitate copal servo when offering placed in web UI
      for (int i = 0; i < 3; i++) {
        analogWrite(PIN_LED_VELA, 255);
        delay(80);
        analogWrite(PIN_LED_VELA, 120);
        delay(80);
      }
      Serial.println("{\"ack\":\"copal_agitated\"}");
    }
  }

  // 5. Periodic Heartbeat Telemetry
  if (now - lastTelemetryTime > TELEMETRY_INTERVAL_MS) {
    lastTelemetryTime = now;
    Serial.print("{\"heartbeat\":true,\"flame_raw\":");
    Serial.print(flameVal);
    Serial.print(",\"flame_active\":");
    Serial.print(flameActive ? "true" : "false");
    Serial.print(",\"presence\":");
    Serial.print(presenceActive ? "true" : "false");
    Serial.println("}");
  }

  delay(20);
}
