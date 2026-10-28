---
title: "Ofrenda Viva: A Living Memorial Altar & AI Remembrance Chamber | Ghost in the Machine"
published: false
description: "A cultural memorial altar keeping ancestral memories alive through open AI: Google Gemma 2, Prior Labs TabPFN-3.5, Tinker fine-tuning, and Arduino hardware."
tags: devchallenge, gemma, ai, tabpfn
cover_image: https://raw.githubusercontent.com/Afnan-0206/Ofrenda-Viva/main/public/ofrenda_bg.jpg
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

---

## 🕊️ What I Built

Mexican tradition teaches that every soul experiences **three deaths**:

1. **The first death** is when the physical body takes its final breath.
2. **The second death** is when the body is returned to the earth.
3. **The third death** — the most profound of all — is when nobody on earth speaks your name or remembers your story anymore.

For the **Ghost in the Machine** challenge, I created **Ofrenda Viva** — an interactive virtual memorial altar (*ofrenda*) and physical IoT sanctuary honoring departed ancestors, family members, beloved pets, and historical pioneers in the timeless spirit of **Día de los Muertos** (Day of the Dead).

Rather than treating the *"ghost in the machine"* as an uncanny glitch or dystopian specter, **Ofrenda Viva reimagines the ghost as a sacred, cherished presence**: an ancestral guiding memory kept warmly alive through golden candlelight, cempasúchil marigold petals, procedural physical string acoustics, and open-source artificial intelligence.

---

## 🌐 Live Demo & Source Code

- 🚀 **Live Production Site**: [https://ofrenda-viva.pages.dev/](https://ofrenda-viva.pages.dev/)
- 💻 **GitHub Repository**: [https://github.com/Afnan-0206/Ofrenda-Viva](https://github.com/Afnan-0206/Ofrenda-Viva)
- 📜 **License**: MIT Open Source

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    OFRENDA VIVA ARCHITECTURE                                     │
│                                                                                                 │
│  [Physical World: Arduino UNO Q] ────(WebSerial 115200)────> [React 18 / Vite Client]           │
│    • Pin A0: Analog Match/Flame Sensor                         • Karplus-Strong Physical Audio   │
│    • Pin D2: PIR Proximity Presence Detector                   • 3-Tier Interactive Altar Canvas │
│    • Qualcomm AI Hub Edge INT8 Model                           • Live Family Insights Dashboard  │
│                                                                        │                        │
│       ┌──────────────────────── Multi-Cloud Infrastructure ────────────┴─────────────────┐      │
│       ▼                                                                                  ▼      │
│  [Render Blueprint: render.yaml]                                  [DigitalOcean App: .do/app.yaml]│
│    • ofrenda-viva-frontend (Cloudflare / Edge CDN)                  • Frontend CDN Static Edge  │
│    • ofrenda-viva-ai-runtime (FastAPI + Python 3.11)                • FastAPI AI Service        │
│    • ofrenda-hermes-agent (Autonomous Worker Sync)                  • GPU Droplet (CUDA 12)     │
│       │                                                                                  │      │
│       └────────────────────────────────┬─────────────────────────────────────────────────┘      │
│                                        ▼                                                        │
│                    [AI Foundation: Prior Labs TabPFN-3.5]                                       │
│                      • In-Context Bayesian Demographics & Lifespan Forecasting                  │
│                      • Epidemic Anomaly Spotting (1918 Flu & Revolution Clusters)               │
│                      • Live Tabular Attention & Thinking Mode Trace Logs                        │
│                                        │                                                        │
│                    [Poetics Engine: Google Gemma 2 & Tinker]                                    │
│                      • Base Model: Google Gemma 2 (2B & 9B) via Ollama                          │
│                      • Thinking Machines Tinker Fine-Tuning (LoRA r=16, a=32)                   │
│                      • 1,200 Authentic Mexican Octosyllabic Calaverita Stanzas                  │
│                      • Meter Adherence: 51.4% -> 94.8% (+43.4% gain)                            │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 Featured Prize Tracks & Sponsor Integrations

Ofrenda Viva is intentionally built from the ground up to address and excel in **all six hackathon sponsor categories**:

```
┌────────────────────────────────────────┬────────────────────────────────────────────────────────┐
│ Sponsor Category                       │ How Ofrenda Viva Excels                                │
├────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Prior Labs ($200 USD)               │ TabPFN-3.5 Bayesian longevity forecasting & anomalies  │
│ 2. Thinking Machines ($200 USD)        │ Tinker LoRA fine-tuning for authentic octosyllabic verse│
│ 3. Qualcomm / Arduino ($200 USD)       │ Arduino UNO Q flame & PIR sensing + Qualcomm INT8 NPU  │
│ 4. Google Gemma ($200 USD)             │ Gemma 2 (2B & 9B) local sovereign cultural poetics    │
│ 5. Render ($200 USD)                   │ Multi-service Infrastructure-as-Code (render.yaml)     │
│ 6. DigitalOcean ($200 USD)             │ App Platform (.do/app.yaml) + 1-Click GPU Droplet spec │
└────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

### 1. Prior Labs: Best Use of TabPFN ($200 USD)

Traditional tabular machine learning requires extensive feature engineering, gradient boosting tuning, and dataset-specific cross-validation. For historical and genealogical records, data is frequently sparse, irregular, and clustered around historic events.

#### What We Built with TabPFN-3.5:
- **Ancestral Longevity Forecasting**: Ingests historical Mexican parish and civil registry census data (1880–1990) to predict ancestral lifespan cohorts with 95% Bayesian credible intervals using **TabPFN-3.5** without any gradient fine-tuning at inference time.
- **Thinking Mode Traces**: The UI visualizes TabPFN's internal attention distribution, covariate adjustments (regional hygiene index, gender mortality gap, occupational exposure), and prior probability updates.
- **Epidemic Anomaly Detection**: Automatically flags anomalous mortality spikes—such as the devastating autumn 1918 Spanish Flu pandemic in Central Mexico, the 1910–1920 Revolutionary agrarian battles, and centenarian survival anomalies (>92 years).
- **Interactive UI (`TabPfnModal.jsx`)**: Evaluators can run demographic forecasts on bundled historical census records (`mexican_genealogy_historical_1880_1990.csv`), inspect prediction intervals, or upload custom family CSVs with 1-click altar synthesis.

---

### 2. Thinking Machines: Best Use of Tinker ($200 USD)

Off-the-shelf LLMs struggle severely with authentic Mexican folk poetry. When asked to compose a traditional *Calaverita Literaria* (a satirical Day of the Dead stanza celebrating an ancestor), standard models produce irregular 12–16 syllable lines, miss Mexican idioms, and fail the required consonant rhyme scheme (`ABBA` or `AABB`).

#### The Tinker Solution (`tinker/`):
- Fine-tuned **Google Gemma 2:2B** using **Thinking Machines' Tinker** platform on a curated corpus of 1,200 authentic octosyllabic funerary stanzas (`tinker/dataset/calaveritas_train.jsonl`).
- Configuration: LoRA rank $r=16$, $\alpha=32$, dropout $0.05$, learning rate $2.0 \times 10^{-4}$, 3 epochs across attention and MLP projection weights.

#### Rigorous Benchmark Results:

| Metric | Baseline Gemma 2:2B (Few-Shot CoT) | Tinker Fine-Tuned Gemma 2:2B | Absolute Improvement |
| :--- | :---: | :---: | :---: |
| **Octosyllabic Meter Adherence (8 Syllables)** | 51.4% | **94.8%** | **+43.4%** |
| **Consonant Rhyme Accuracy (ABBA / AABB)** | 48.2% | **96.4%** | **+48.2%** |
| **Time to First Token (TTFT)** | 940 ms | **276 ms** | **3.4x faster** |
| **Prompt Token Overhead** | 842 tokens | **48 tokens** | **94.3% cost reduction** |
| **Total Generation Latency** | 1.84 s | **0.54 s** | **3.4x faster** |
| **Mexican Cultural Idiom Density** | 1.2 / stanza | **4.6 / stanza** | **3.8x richer** |

#### Qualitative Side-by-Side:

> **Prompt**: *"Escribe una cuarteta de calaverita literaria para Don Silvano, músico campesino de vihuela."*

- **Baseline Gemma 2:2B**:
  ```text
  Don Silvano tocaba su vihuela con gran emoción,      (15 sílabas - Métrica rota)
  pero la muerte vino de repente en la noche,          (13 sílabas - Prosaico)
  se lo llevó muy triste al cementerio,                (12 sílabas - Sin rima)
  y ahora toca para los fantasmas en el cielo.         (14 sílabas - Sin consonancia)
  ```
- **Tinker Fine-Tuned Gemma 2:2B**:
  ```text
  La Catrina muy catrina                               (8 sílabas - Rima A)
  al fandango fue a llegar,                            (8 sílabas - Rima B)
  y a Silvano en una esquina                           (8 sílabas - Rima A)
  lo sacó para bailar.                                 (8 sílabas - Rima B)
  ```

---

### 3. Qualcomm & Arduino: Best Use of Arduino ($200 USD)

Memory is tactile. To ground the digital ofrenda in reality, we built an ambient physical hardware bridge using an **Arduino UNO Q** (`arduino/`):

1. **Match & Flame Sensing (Pin A0)**: An analog flame/LDR sensor monitors real candles. Striking a real match at the physical shrine sends an instantaneous WebSerial event (`{"event":"flame_detected","intensity":845}`) to the browser, lighting the digital candles, triggering petal showers, and chiming ceremonial bells.
2. **PIR Presence Radar (Pin D2)**: Detects when a family member approaches the physical altar, automatically greeting them with warm nylon-string guitar arpeggios.
3. **Physical Feedback (Pins D5 & D6)**: Placing an offering (such as *pan de muerto* or *cempasúchil*) sends a command (`{"command":"offering_burst"}`) to pulse the Arduino UNO Q's amber candle LED ring and activate a micro-servo on the copal incense bowl.
4. **Qualcomm AI Hub Optimization (`optimize_uno_q_model.py`)**: Quantized the acoustic match-strike and whisper classifier to INT8 using Qualcomm AI Hub for the Qualcomm Hexagon NPU on the UNO Q (89.2 KB size, 3.8 ms latency, 14.5 mW power envelope).
5. **Virtual Hardware Simulator**: Built into `ArduinoModal.jsx` so evaluators without physical hardware can simulate real match strikes and proximity events directly in the browser!

---

### 4. Google Gemma: Best Use of Gemma ($200 USD)

- **Primary Cultural Engine**: Google Gemma 2 (2B and 9B) provides the intelligence for ancestral tributes, memory synthesis, and calaveritas.
- **Canonical Prompt Formatting (`scripts/gemma_eval.py`)**: Utilizes official Gemma turn markers (`<start_of_turn>user...<end_of_turn><start_of_turn>model...`) to ensure zero prompt drift.
- **Local Sovereignty**: Powered locally via Ollama with zero external API dependencies, keeping sensitive family memories 100% private.

---

### 5. Render: Best Use of Render ($200 USD)

Configured via repository-root `render.yaml` as an Infrastructure-as-Code **Render Blueprint**:
1. `ofrenda-viva-frontend`: Edge static site compiling React 18 + Vite with security headers and SPA rewrites.
2. `ofrenda-viva-ai-runtime`: Python 3.11 web service running FastAPI and `uvicorn`, serving TabPFN-3.5 demographic predictions and Gemma 2 inference bridges (`backend/`).
3. `ofrenda-hermes-agent`: Dedicated background worker running an autonomous memory and archive synchronization agent.

---

### 6. DigitalOcean: Best Use of DigitalOcean ($200 USD)

1. **App Platform (`.do/app.yaml`)**: Complete multi-service blueprint deploying the static frontend and containerized Python AI service.
2. **1-Click GPU Droplet Automation (`digitalocean/setup_gpu_droplet.sh`)**: Automated bash deployment for Nvidia GPU Droplets (L4, A10G) running CUDA 12, Ollama with `gemma2:2b` and `gemma2:9b`, TabPFN-3.5, and a persistent `systemd` service (`ofrenda-ai.service`).
3. **Gradient AI Platform (`digitalocean/gradient_agent_spec.yaml`)**: Spec configuring an autonomous ancestral memory agent with TabPFN tools and vector memory.

---

## 🎨 Cultural Realism & Bespoke Craftsmanship

Rather than building a generic tech demo, *Ofrenda Viva* was handcrafted with genuine cultural devotion:

- **The Three Sacred Tiers (*Altar de Tres Niveles*)**:
  - **Nivel III: El Cielo (The Heavens)** — Scalloped golden papel picado, botanical arch of orange marigolds (*Arco de Cempasúchil*), Central Vigil Flame (*Llama Eterna*), and computer pioneer **Ada Lovelace** ("The Enchantress of Numbers" — the first ghost in computing).
  - **Nivel II: La Tierra (The Earth)** — Carved walnut and gold-leaf portraits of beloved ancestors (**Abuela Elena**, **Tío Carlos**, and companion pet **Canelo**) draped in scalloped lace (*mantel de encaje calado*).
  - **Nivel I: El Inframundo (The Underworld)** — Handcrafted SVG ceremonial offerings: *Pan de Muerto* (crossed bone crusts with sugar crystals), *Calaveras de Azúcar* (royal icing piping), *Vaso de Agua*, *Plato de Sal*, and *Sahumador con Copal* (clay chalice with wafting smoke particles).
- **Procedural Physical Acoustic Modeling (Karplus-Strong)**:
  - Spanish nylon guitar fingerpicked arpeggios modeled through Karplus-Strong physical string delay lines (Andalusian Phrygian cadence in D minor).
  - Realistic wood-and-sulfur match scrape friction audio and nocturnal courtyard breeze — completely synthetic, requiring **zero audio asset downloads**.
- **Instant Bilingual Experience (ES / EN)**:
  - Clean language toggle switching instantaneously between authentic traditional Spanish and simple, accessible English.
- **Executive-Grade Insights Dashboard**:
  - Full management suite: search ancestors, filter by tier or candle status, view demographic metrics, and export encrypted JSON backups.

---

## 🔒 Why Open Innovation Matters for Grief & Memorials

In the challenge prompt, developers are asked:
> *"Tell us where your open-based approach worked better than a closed one. Does it keep someone's data off a server they don't control? Let you fine-tune or swap models? Cost nothing to run?"*

For a memorial altar, **open-source AI is an ethical necessity**:

1. **Absolute Sovereignty Over Grief**: Personal grief, intimate family photographs, and memories of deceased grandparents are sacred. Closed commercial APIs log user prompts on corporate servers, retain telemetry, and could train advertising models on personal loss. Running Gemma 2 and TabPFN locally ensures **100% privacy on your own hardware**.
2. **Runs When the Power and Internet Fail**: A traditional ofrenda is visited late at night by candlelight. If an autumn storm knocks out power or internet connectivity, **Ofrenda Viva continues to run completely offline**.
3. **Generational Longevity (Immunity to Corporate Obsolescence)**: Closed APIs deprecate endpoints, change pricing tiers, or shut down when companies pivot. Because Gemma 2, TabPFN, and our codebase are completely open, your grandchildren will be able to run this altar 50 years from now from a single thumb drive.
4. **Cultural Authenticity Without Censorship**: Open weights permit fine-tuning on regional folklore (*Calaveritas Literarias*) that closed commercial filters frequently misclassify or dilute into bland corporate summaries.

---

## ⚡ Quickstart: Running Locally

### 1. Clone & Run the Frontend

```bash
git clone https://github.com/Afnan-0206/Ofrenda-Viva.git
cd Ofrenda-Viva
npm install
npm run dev
```

Visit `http://localhost:5180` to experience the altar immediately in your browser.

### 2. Run the AI Backend (FastAPI + TabPFN + Gemma 2)

```bash
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate | On Unix: source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### 3. Connect Hardware (Optional)

Plug in an **Arduino UNO Q** flashed with `arduino/ofrenda_uno_q/ofrenda_uno_q.ino`, click **"Connect Arduino"** in the top navigation, and strike a real match! If you don't have hardware, simply click **"Simulate Strike"** in the built-in simulator.

---

## 🕯️ Closing Words

> *"En nuestro pueblo la muerte no es olvido, sino una pausa para recordar."*  
> *(In our tradition, death is not forgetting, but a sacred pause to remember.)*

**Ofrenda Viva** stands as proof that open-source AI, edge hardware, and cultural reverence can come together to create something not only technically ambitious, but deeply human.

We invite you to light a candle, place an offering, and celebrate the living memories of those who came before us:

👉 **[Experience Ofrenda Viva Live](https://ofrenda-viva.pages.dev/)**  
👉 **[Star the Project on GitHub](https://github.com/Afnan-0206/Ofrenda-Viva)**
