// Web Audio API procedural sound generator for Ofrenda Viva
// 100% offline, zero audio asset downloads, works in any browser

let audioCtx = null;
let ambientGain = null;
let isAmbientPlaying = false;
let ambientInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Sound of striking a match and candle flame igniting
 */
export function playMatchStrikeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Friction noise (match scrape)
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2500, now);
  filter.Q.setValueAtTime(3, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

  noiseSource.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);

  // 2. Flame ignition 'whoosh'
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

  oscGain.gain.setValueAtTime(0.01, now);
  oscGain.gain.setValueAtTime(0.3, now + 0.1);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now + 0.08);
  osc.stop(now + 0.45);
}

/**
 * Sound of gently blowing out a candle
 */
export function playExtinguishSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.28);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
}

/**
 * Plays a resonant chime / bell tone (for offerings and prayers)
 */
export function playBellChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = [587.33, 880, 1174.66]; // D5, A5, D6 - traditional spiritual bell frequencies

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const amp = 0.15 / (idx + 1);
    gain.gain.setValueAtTime(amp, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 2.6);
  });
}

/**
 * Play an acoustic nylon guitar arpeggio note (Spanish / Flamenco soul)
 */
function playGuitarNote(ctx, freq, startTime, duration = 2.0) {
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Warm acoustic pluck harmonics
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, startTime);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2200, startTime);
  filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

  gain.gain.setValueAtTime(0.12, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ambientGain || ctx.destination);

  osc.start(startTime);
  osc2.start(startTime);
  osc.stop(startTime + duration + 0.1);
  osc2.stop(startTime + duration + 0.1);
}

/**
 * Toggle gentle ambient acoustic guitar & nocturnal candlelit background sound
 */
export function toggleAmbientSound(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isAmbientPlaying) {
    if (ambientGain) {
      ambientGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    }
    clearInterval(ambientInterval);
    isAmbientPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  }

  ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.5);
  ambientGain.connect(ctx.destination);

  isAmbientPlaying = true;
  if (onStateChange) onStateChange(true);

  // Traditional Spanish phrygian / Andalusian cadence: Dm, C, Bb, A
  const chords = [
    [146.83, 220.00, 293.66, 349.23, 440.00], // D minor
    [130.81, 196.00, 261.63, 329.63, 392.00], // C major
    [116.54, 174.61, 233.08, 293.66, 349.23], // Bb major
    [110.00, 164.81, 220.00, 277.18, 329.63]  // A major (Resolution)
  ];

  let chordIndex = 0;

  const playSequence = () => {
    if (!isAmbientPlaying) return;
    const now = ctx.currentTime;
    const chord = chords[chordIndex % chords.length];
    chordIndex++;

    chord.forEach((freq, noteIdx) => {
      // Gentle fingerpicked arpeggio
      playGuitarNote(ctx, freq, now + noteIdx * 0.45, 3.5);
    });
  };

  playSequence();
  ambientInterval = setInterval(playSequence, 4500);

  return true;
}

export function isAmbientActive() {
  return isAmbientPlaying;
}
