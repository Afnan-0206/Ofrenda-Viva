# 🕯️ Ofrenda Viva — Living Memorial Altar & Remembrance Chamber
> **Ghost in the Machine** &bull; Hacktoberfest 2026 Open-Source AI Challenge (Week 4)

[![Theme: Ghost in the Machine](https://img.shields.io/badge/Theme-Ghost_in_the_Machine-ff8c00.svg)](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)
[![AI: Google Gemma 2](https://img.shields.io/badge/Open_AI-Google_Gemma_2-ffb703.svg)](https://ai.google.dev/gemma)
[![Inference: 100% Local & Private](https://img.shields.io/badge/Privacy-100%25_Local_on_Device-4ade80.svg)](#why-open-innovation-matters)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An interactive, candlelit 3D virtual ofrenda honoring departed ancestors and luminaries in the sacred spirit of **Día de los Muertos** (Day of the Dead) and **Halloween**. Powered by 100% private, local open-source AI (**Google Gemma 2** and Ollama) for composing authentic *Calaveritas Literarias*, poetic elegies, oral history archives, and spiritual dialogue.

---

## 🌟 What is Ofrenda Viva?

In Mexican and Mesoamerican tradition, Día de los Muertos (November 1 & 2) is not a mournful time, but a vibrant family reunion bridging the thin veil between the living and the dead. 

**Ofrenda Viva** is an atmospheric digital altar that preserves family memories, honors our lineage, and brings the "Ghost in the Machine" to life through open-source AI:

1. **The Three Sacred Tiers (La Ofrenda de Tres Niveles)**:
   - **Nivel III: El Cielo (The Heavens & Guiding Spirits)** — Sheltered beneath the golden arch of marigolds (*Arco de Cempasúchil*), anchored by the Central Eternal Flame (*Llama Eterna*) and computing pioneer **Ada Lovelace** ("The Enchantress of Numbers" — the first ghost in our code).
   - **Nivel II: La Tierra (The Earth & Cherished Loved Ones)** — Baroque gold-framed portraits of beloved family members (**Abuela Elena**, **Tío Carlos**, and your own ancestors) with dedicated individual vigil candles.
   - **Nivel I: El Inframundo (The Roots & Purification)** — The essential welcoming elements: *Pan de Muerto* (sweetness of life), *Calaveras de Azúcar* (sugar skulls), *Vaso de Agua* (quenches the traveling soul's thirst), *Plato de Sal* (spiritual purification), and *Copal & Sahumador* (sacred incense guiding prayers upward with animated smoke).
   - **El Camino Dorado de Cempasúchil** — A glowing path of marigold petals guiding spirits across the threshold.

2. **"El Guardián del Recuerdo" (Open-Source AI Chronicler)**:
   - **Calaverita Literaria**: Crafts traditional, witty octosyllabic verse celebrating the ancestor's humor, favorite dishes, and affectionate encounters with *La Catrina*.
   - **Poetic Elegy**: Composes reverent bilingual eulogies and tributes.
   - **Oral History Chronicler**: Weaves favorite dishes, melodies, and quirks into enduring family lore.
   - **Spirit Dialogue**: Allows users to ask their loved ones heartfelt questions and receive warm, comforting answers in their voice.

3. **Atmospheric Physics & Sound (Zero External Assets)**:
   - **Interactive Candle Physics**: Every candle on the altar can be lit or extinguished. The ambient lighting of the entire room dynamically warms and glows based on the number of active flames.
   - **Procedural Web Audio Synthesizer**: Realistic match strikes, flame ignitions, bell chimes, and nocturnal Spanish flamenco guitar arpeggios synthesized directly in code (no MP3 downloads or network requests required).
   - **Wind & Marigold Petal Physics**: HTML5 Canvas particle system of golden *pétalos de cempasúchil* dancing across the screen and swirling with mouse breezes.
   - **Papel Picado Banners**: Swaying tissue paper bunting with traditional skull and floral cutouts.
   - **Day & Night Mode (Noche de Velas)**: Switch between golden twilight and deep starry midnight.

4. **Permanent Offline Archive (Sovereignty Over Memory)**:
   - Export your family's ofrenda to an open, portable JSON archive or print a physical memorial display card.

---

## 🧠 How It's Built & Why Open Innovation Matters

### 1. Which Open-Source AI is Used?
- **Model**: **Google Gemma 2** (open weights, available in 2B and 9B parameter variants).
- **Local Inference Options**:
  - **Zero-Latency In-Browser Neural Engine**: Prompt-engineered token synthesis based on Gemma 2 open instruction patterns that executes immediately on any device with zero setup.
  - **Local Ollama Gateway**: Direct integration with `http://localhost:11434` for running local quantized Gemma 2 models (`gemma2:2b`, `gemma2:9b`, `llama3.2`) on your own GPU/CPU.
  - **Zero Third-Party Cloud APIs**: No data is sent to OpenAI, Anthropic, or proprietary cloud providers.

### 2. Why Open Innovation Matters for Ofrenda Viva
In the challenge post, we are asked:
> *"Tell us where your open-based approach worked better than a closed one. Does it keep someone's data off a server they don't control? Let you fine-tune or swap models? Cost nothing to run?"*

For a memorial altar, **open-source AI is not just a technical choice; it is an ethical imperative**:
- **Sovereignty Over Grief**: Personal grief, intimate family photographs, voice recordings, and memories of deceased grandparents are sacred. Closed corporate APIs log user prompts on remote servers, retain telemetry, and could train commercial advertising models on your personal sadness. Running Gemma 2 locally ensures **100% privacy on your own laptop**.
- **Runs with the Lights (and the Internet) Off**: A traditional ofrenda is visited late at night by candlelight. If an autumn storm knocks out power and internet connectivity, **Ofrenda Viva continues to run flawlessly completely offline**.
- **Permanent Longevity (Immunity to Corporate Obsolescence)**: Closed APIs deprecate endpoints, raise subscription prices, or shut down when startups run out of runway. Because Gemma 2 and our codebase are completely open, your grandchildren can run this ofrenda 50 years from now from a single USB drive.
- **Cultural Authenticity**: Open weights allow local bilingual synthesis in Spanish, English, and traditional regional folk styles (*Calaveritas Literarias*) without arbitrary corporate censorship.

---

## 🏆 Prize Categories

This project is entered into:
1. **Overall Hacktoberfest Week 4 Winner: Ghost in the Machine**
2. **Best Use of Gemma** — Powered by the Google Gemma 2 open-weight model family.
3. **Best Use of Render** — Designed for instantaneous one-click deployment on Render static web services.
4. **Best Use of a .tech Domain** — Ideal for deployment on an archival domain like `ofrendaviva.tech`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- (Optional) [Ollama](https://ollama.com/) if you wish to run local Ollama models (`ollama run gemma2:2b`).

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/your-username/ofrenda-viva.git
cd ofrenda-viva

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open `http://localhost:5180/` in your browser.

### Build for Production
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.

---

## 🎨 Cultural Guide & The Three Deaths
Mexican tradition teaches that every person experiences three deaths:
1. *The first death* is when the physical body ceases to breathe.
2. *The second death* is when the body is laid to rest in the earth.
3. *The third death*, the most final of all, is when nobody left on earth remembers your name.

By combining the timeless customs of Día de los Muertos with the permanence of open-source AI, **Ofrenda Viva** ensures our loved ones live forever.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
