// Web Audio API — Authentic Procedural Physical Acoustic Soundscape
// Employs the Karplus-Strong physical string synthesis algorithm for realistic
// plucked Spanish nylon guitar notes, natural match strikes, prayer bell harmonics,
// and soothing nocturnal candlelit room ambience. 100% offline, zero audio downloads.

let audioCtx = null;
let ambientGain = null;
let isAmbientPlaying = false;
let ambientInterval = null;
let breezeSource = null;
let emberInterval = null;

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
 * Karplus-Strong Physical Plucked String Synthesizer
 * Simulates the true physics of a plucked nylon guitar string vibrating inside a wooden acoustic chamber.
 */
function createKarplusStrongBuffer(ctx, frequency, duration = 3.2, damping = 0.991) {
  const sampleRate = ctx.sampleRate;
  const totalSamples = Math.floor(sampleRate * duration);
  const period = Math.floor(sampleRate / frequency);

  const buffer = ctx.createBuffer(1, totalSamples, sampleRate);
  const channelData = buffer.getChannelData(0);

  // 1. Initial excitation noise burst (finger plucking the string)
  for (let i = 0; i < period; i++) {
    // Triangular noise distribution for warmer nylon string feel rather than harsh steel
    channelData[i] = (Math.random() + Math.random() - 1.0) * 0.9;
  }

  // 2. Karplus-Strong feedback loop with low-pass loss filter
  let previous = channelData[period - 1];
  for (let i = period; i < totalSamples; i++) {
    const current = channelData[i - period];
    // Low-pass filter (averaging adjacent samples) with damping
    const filtered = (current + previous) * 0.5 * damping;
    channelData[i] = filtered;
    previous = current;
  }

  return buffer;
}

/**
 * Play a fingerpicked acoustic guitar note with Karplus-Strong physical modeling
 */
function playAcousticGuitarNote(ctx, frequency, startTime, volume = 0.18, destination = null) {
  const dest = destination || ambientGain || ctx.destination;
  const buffer = createKarplusStrongBuffer(ctx, frequency, 3.5, 0.992);

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Body resonance filter (simulates hollow wooden cedar/spruce guitar soundboard)
  const bodyFilter = ctx.createBiquadFilter();
  bodyFilter.type = 'peaking';
  bodyFilter.frequency.setValueAtTime(220, startTime); // Guitar soundboard air resonance
  bodyFilter.Q.setValueAtTime(1.8, startTime);
  bodyFilter.gain.setValueAtTime(4.0, startTime);

  // Gentle high-cut to impart warm nylon wood character
  const highCut = ctx.createBiquadFilter();
  highCut.type = 'lowpass';
  highCut.frequency.setValueAtTime(3200, startTime);

  // Expression gain
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(volume, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.2);

  source.connect(bodyFilter);
  bodyFilter.connect(highCut);
  highCut.connect(gainNode);
  gainNode.connect(dest);

  source.start(startTime);
}

/**
 * Sound of striking a wooden match against friction strip and flame ignition
 */
export function playMatchStrikeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Wood & sulfur friction scrape
  const scrapeLength = Math.floor(ctx.sampleRate * 0.12);
  const scrapeBuffer = ctx.createBuffer(1, scrapeLength, ctx.sampleRate);
  const scrapeData = scrapeBuffer.getChannelData(0);
  for (let i = 0; i < scrapeLength; i++) {
    scrapeData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (scrapeLength * 0.35));
  }
  const scrapeSource = ctx.createBufferSource();
  scrapeSource.buffer = scrapeBuffer;

  const scrapeFilter = ctx.createBiquadFilter();
  scrapeFilter.type = 'bandpass';
  scrapeFilter.frequency.setValueAtTime(2800, now);
  scrapeFilter.Q.setValueAtTime(4, now);

  const scrapeGain = ctx.createGain();
  scrapeGain.gain.setValueAtTime(0.35, now);
  scrapeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

  scrapeSource.connect(scrapeFilter);
  scrapeFilter.connect(scrapeGain);
  scrapeGain.connect(ctx.destination);
  scrapeSource.start(now);

  // 2. Soft flame ignition catch
  const flameOsc = ctx.createOscillator();
  const flameGain = ctx.createGain();
  flameOsc.type = 'sine';
  flameOsc.frequency.setValueAtTime(160, now + 0.06);
  flameOsc.frequency.exponentialRampToValueAtTime(55, now + 0.32);

  flameGain.gain.setValueAtTime(0.001, now);
  flameGain.gain.setValueAtTime(0.25, now + 0.08);
  flameGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.38);

  flameOsc.connect(flameGain);
  flameGain.connect(ctx.destination);
  flameOsc.start(now + 0.06);
  flameOsc.stop(now + 0.4);
}

/**
 * Sound of softly extinguishing a candle
 */
export function playExtinguishSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const puffLength = Math.floor(ctx.sampleRate * 0.25);
  const puffBuffer = ctx.createBuffer(1, puffLength, ctx.sampleRate);
  const puffData = puffBuffer.getChannelData(0);
  for (let i = 0; i < puffLength; i++) {
    puffData[i] = (Math.random() * 2 - 1) * Math.sin((i / puffLength) * Math.PI);
  }
  const source = ctx.createBufferSource();
  source.buffer = puffBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(650, now);
  filter.frequency.exponentialRampToValueAtTime(120, now + 0.22);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
}

/**
 * Resonant Temple / Church Bell Chime (for offerings and prayers)
 * Multi-harmonic bell spectrum based on authentic Mexican bronze altar bells.
 */
export function playBellChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Fundamental and natural overtones (D5, A5, D6, F#6)
  const partials = [
    { freq: 587.33, amp: 0.18, decay: 3.2 },
    { freq: 880.00, amp: 0.14, decay: 2.6 },
    { freq: 1174.66, amp: 0.11, decay: 2.2 },
    { freq: 1479.98, amp: 0.06, decay: 1.6 }
  ];

  partials.forEach((p) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(p.freq, now);

    gain.gain.setValueAtTime(p.amp, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + p.decay + 0.1);
  });
}

/**
 * Start quiet nocturnal ambient breeze generator
 */
function startNocturnalBreeze(ctx, masterGain) {
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Very deep bandpass filter for distant nocturnal courtyard breeze
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(280, ctx.currentTime);
  filter.Q.setValueAtTime(0.9, ctx.currentTime);

  const breezeGain = ctx.createGain();
  breezeGain.gain.setValueAtTime(0.025, ctx.currentTime);

  whiteNoise.connect(filter);
  filter.connect(breezeGain);
  breezeGain.connect(masterGain);
  whiteNoise.start();

  return whiteNoise;
}

/**
 * Toggle gentle ambient acoustic guitar & nocturnal room atmosphere
 */
export function toggleAmbientSound(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isAmbientPlaying) {
    if (ambientGain) {
      ambientGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    }
    clearInterval(ambientInterval);
    clearInterval(emberInterval);
    if (breezeSource) {
      try {
        breezeSource.stop(ctx.currentTime + 1.2);
      } catch {}
      breezeSource = null;
    }
    isAmbientPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  }

  ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.8);
  ambientGain.connect(ctx.destination);

  isAmbientPlaying = true;
  if (onStateChange) onStateChange(true);

  // Start background room air
  breezeSource = startNocturnalBreeze(ctx, ambientGain);

  // Traditional Spanish Phrygian / Andalusian Cadence chords:
  // D minor -> C major -> Bb major -> A major (Solemn, beautiful, reflective)
  const chords = [
    [146.83, 220.00, 293.66, 349.23, 440.00], // D minor (D3, A3, D4, F4, A4)
    [130.81, 196.00, 261.63, 329.63, 392.00], // C major (C3, G3, C4, E4, G4)
    [116.54, 174.61, 233.08, 293.66, 349.23], // Bb major (Bb2, F3, Bb3, D4, F4)
    [110.00, 164.81, 220.00, 277.18, 329.63]  // A major (A2, E3, A3, C#4, E4)
  ];

  let chordIndex = 0;

  const playSequence = () => {
    if (!isAmbientPlaying) return;
    const now = ctx.currentTime;
    const chord = chords[chordIndex % chords.length];
    chordIndex++;

    // Fingerpicked arpeggio rhythm (p-i-m-a pattern)
    chord.forEach((freq, idx) => {
      const delay = idx * 0.42;
      playAcousticGuitarNote(ctx, freq, now + delay, 0.16, ambientGain);
    });
  };

  playSequence();
  ambientInterval = setInterval(playSequence, 4600);

  return true;
}

export function isAmbientActive() {
  return isAmbientPlaying;
}
