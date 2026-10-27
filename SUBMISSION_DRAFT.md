---
title: Ofrenda Viva — Living Memorial Altar & Sanctuary of Remembrance | Ghost in the Machine
published: false
tags: devchallenge, hf26challenge, gemma, ai
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

Mexican tradition reminds us that a person experiences three deaths:
1. *The first death* is when the physical body ceases to breathe.
2. *The second death* is when the body is laid to rest in the earth.
3. *The third death*, the most final of all, is when nobody left on earth remembers your name.

For the **Ghost in the Machine** challenge, I built **Ofrenda Viva** — an authentic, candlelit virtual ofrenda and sanctuary honoring departed ancestors, family members, faithful companion pets, and historical luminaries in the sacred spirit of **Día de los Muertos** (Day of the Dead) and **Halloween**.

Rather than treating the "ghost in the machine" as something spooky or adversarial, **Ofrenda Viva** embraces the ghost as a cherished memory: a guiding ancestral spirit kept eternally alive through candlelight, marigold petals, and open-source artificial intelligence.

### Key Features:
- **The Three Sacred Tiers (La Ofrenda de Tres Niveles)**:
  - **Nivel III: El Cielo (The Heavens & Guiding Spirits)** — Sheltered beneath a botanical arch of Mexican marigolds (*Arco de Cempasúchil*), anchored by the Central Eternal Flame (*Llama Eterna*) and computing pioneer **Ada Lovelace** ("The Enchantress of Numbers" — the first ghost in our code).
  - **Nivel II: La Tierra (The Earth & Living Memory)** — Antique carved walnut and gold-leaf framed portraits of beloved family members (**Abuela Elena**, **Tío Carlos**, and your own ancestors) draped with traditional scalloped cream lace (*mantel de encaje calado*) and dedicated vigil candles.
  - **Nivel I: El Inframundo (The Roots & Purification)** — Essential ceremonial elements rendered as handcrafted Mexican folk-art vector illustrations (no generic smartphone emojis): *Pan de Muerto* (with crossed bone crusts and crystalline sugar), *Calaveras de Azúcar* (sugar skulls with royal icing piping), *Vaso de Agua* (clear spring water for thirsty travelers), *Plato de Sal* (mineral salt for spiritual purification), and *Copal & Sahumador* (clay chalice with glowing embers and wafting incense smoke).
  - **El Camino Dorado de Cempasúchil** — A scattered floor path of golden marigold petals guiding footsteps across the threshold.
- **"El Guardián del Recuerdo" (Cultural AI Chronicler & Verse Bard)**:
  - **Calaverita Literaria**: Generates authentic octosyllabic rhyming verse where *La Catrina* visits the loved one with warmth and humor.
  - **Poetic Elegy**: Weaves luminous bilingual tributes in English and Spanish.
  - **Oral History Chronicler**: Archives favorite dishes, songs, and personal philosophies into timeless family lore.
  - **Spirit Dialogue**: Lets you ask a heartfelt question and receive comfort in the ancestor's voice.
- **Acoustic Physical Modeling & Procedural Soundscape**:
  - **Karplus-Strong Plucked String Synthesis**: Spanish acoustic nylon guitar fingerpicked arpeggios physically modeled through noise-excitation delay lines and cedar soundboard resonance (Andalusian / Phrygian cadence in D minor).
  - **Match & Flame Physics**: Authentic wood-and-sulfur scrape friction followed by flame ignition catch; soft breath extinguish sound.
  - **Nocturnal Room Ambience**: Faint autumn courtyard breeze and gentle harmonic altar bell chimes.
  - **Floating Petals Particle System**: Golden *pétalos de cempasúchil* dancing across the screen on an HTML5 canvas, swirling in response to wind and mouse movement.
- **Permanent Offline Archive**:
  - Export your family's ofrenda to an open, portable JSON archive or print a physical memorial display card.

---

## Demo

- **Live Local Demo**: `http://localhost:5173/`
- **Video & Screenshots**:
  - Full walkthrough recording of candlelight lighting, petal physics, and AI Calaverita generation.
  - Interactive Memorial Modals for Abuela Elena and Ada Lovelace.
  - Sacred Offerings inspection with cultural symbolism.

---

## Code

The complete source code is available under the MIT License:
👉 **[GitHub Repository: Afnan-0206/Ofrenda-Viva](https://github.com/Afnan-0206/Ofrenda-Viva)**

### Project Stack:
- **Frontend**: React 18, Vite, Lucide Icons, Canvas-Confetti
- **Styling**: Pure Vanilla CSS design tokens with authentic carved wood grain, scalloped cream lace runners, and chiaroscuro candlelight blending
- **Audio Physics**: Web Audio API Karplus-Strong physical string synthesis and procedural room soundscape
- **AI Core**: Google Gemma 2 via local Ollama, Google Gemini API, and 100% offline traditional Folkloric Verse Bard

---

## How I Used Open Innovation & Google Gemma

### 1. Model Choice & Architecture
- **Model**: **Google Gemma 2** (open weights, available in 2B and 9B parameter variants).
- **Execution**:
  - **Local Ollama Gateway**: Connects directly to local Ollama on `http://localhost:11434` (`gemma2:2b`, `gemma2:9b`, `llama3.2`) with streaming response on the user's GPU/CPU.
  - **Google Gemini API**: Direct connection for instant live cloud generation using the user's free API key.
  - **Offline Folkloric Bard**: 100% offline rule-based Mexican verse composer for instant zero-configuration resilience during power outages.

### 2. Why Open Innovation Matters for Ofrenda Viva
In the challenge post, we are asked:
> *"Tell us where your open-based approach worked better than a closed one. Does it keep someone's data off a server they don't control? Let you fine-tune or swap models? Cost nothing to run?"*

For a memorial altar, **open-source AI is an ethical imperative**:
- **Sovereignty Over Grief**: Personal grief, intimate family photographs, and memories of deceased grandparents are sacred. Closed corporate APIs log user prompts on remote servers, retain telemetry, and could train commercial advertising models on personal sadness. Running Gemma 2 locally ensures **100% privacy on your own laptop**.
- **Runs with the Lights (and the Internet) Off**: A traditional ofrenda is visited late at night by candlelight. If an autumn storm knocks out power and internet connectivity, **Ofrenda Viva continues to run flawlessly completely offline**.
- **Permanent Longevity (Immunity to Corporate Obsolescence)**: Closed APIs deprecate endpoints, raise subscription prices, or shut down when startups run out of runway. Because Gemma 2 and our codebase are completely open, your grandchildren can run this ofrenda 50 years from now from a single USB drive.
- **Cultural Authenticity**: Open weights allow local bilingual synthesis in Spanish, English, and traditional regional folk styles (*Calaveritas Literarias*) without arbitrary corporate censorship.

---

## Cultural Significance
Mexican tradition teaches that the dead do not disappear into oblivion as long as they are kept alive in collective memory (*el recuerdo*). By giving every family an open, private, tactile sanctuary to honor their lineage, **Ofrenda Viva** uses open-source AI to preserve human stories for generations to come.
