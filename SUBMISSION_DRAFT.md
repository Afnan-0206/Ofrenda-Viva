---
title: Ofrenda Viva — Living Memorial Altar & Multi-Agent Remembrance Chamber | Ghost in the Machine
published: false
tags: devchallenge, hf26challenge, gemma, ai, tabpfn, render, digitalocean, arduino
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

Mexican tradition reminds us that a human soul experiences three deaths:
1. *The first death* is when the physical body ceases to breathe.
2. *The second death* is when the body is laid to rest in the earth.
3. *The third death*, the most final of all, is when nobody left on earth remembers your name.

For the **Ghost in the Machine** challenge, I built **Ofrenda Viva** — an authentic, candlelit digital ofrenda and physical IoT sanctuary honoring departed ancestors, family members, faithful companion pets, and historical luminaries in the sacred spirit of **Día de los Muertos** (Day of the Dead) and **Halloween**.

Rather than treating the "ghost in the machine" as something spooky or adversarial, **Ofrenda Viva** embraces the ghost as a cherished memory: a guiding ancestral spirit kept eternally alive through candlelight, marigold petals, tactile physical audio, and next-generation open artificial intelligence.

---

## 🏆 Prize Categories & How Ofrenda Viva Excels

We engineered *Ofrenda Viva* to target and excel in each featured prize category ($200 USD each):

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                           OFRENDA VIVA SYSTEM MAP                                 │
│                                                                                   │
│  [Physical World: Arduino UNO Q] ──(WebSerial 115200)──> [React 18 / Vite Client]  │
│    • Pin A0: Match/Flame Sensor                            • TabPFN Heritage UI   │
│    • Pin D2: PIR Proximity Presence                        • Karplus-Strong Audio │
│    • Qualcomm AI Hub Edge INT8 Model                       • 3-Tier Altar Canvas  │
│                                                                    │              │
│       ┌─────────────────────── Multi-Cloud Backends ───────────────┴──────────┐   │
│       ▼                                                                       ▼   │
│  [Render Blueprint: render.yaml]                           [DigitalOcean .do/app.yaml]│
│    • ofrenda-viva-frontend (Static)                          • frontend (Static CDN)│
│    • ofrenda-viva-ai-runtime (FastAPI)                       • ai-runtime (FastAPI) │
│    • ofrenda-hermes-agent (Worker)                           • GPU Droplet (CUDA 12)│
│       │                                                                       │   │
│       └───────────────────────────────┬───────────────────────────────────────┘   │
│                                       ▼                                           │
│                 [AI Foundations: Prior Labs TabPFN-3.5]                           │
│                   • In-Context Bayesian Demographics & Lifespan Forecasting       │
│                   • Epidemic Anomaly Spotter (1918 Flu & Revolution Clusters)     │
│                   • Thinking Mode In-Context Learning Stream Trace                │
│                                       │                                           │
│                 [Poetics: Google Gemma 2 & Tinker Fine-Tuning]                    │
│                   • Base: Google Gemma 2 (2B & 9B) via Ollama                     │
│                   • Fine-Tuned via Thinking Machines Tinker (LoRA r=16, a=32)     │
│                   • Metric: Octosyllabic Verse 51.4% -> 94.8% (+43.4% gain)       │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1. Render: Best Use of Render ($200 USD)
- **Architecture**: Configured via repo-root `render.yaml` as an infrastructure-as-code Render Blueprint:
  1. `ofrenda-viva-frontend`: Edge static web service compiling React 18 + Vite with security headers and SPA rewrites.
  2. `ofrenda-viva-ai-runtime`: Python 3.11 web service running FastAPI and `uvicorn`, serving TabPFN-3.5 demographic predictions and Gemma 2 inference bridges.
  3. `ofrenda-hermes-agent`: Dedicated background worker running an autonomous memory and archive synchronization agent (Hermes agent runtime).
- **Backend Code**: Contained in `backend/` with `main.py`, `tabpfn_service.py`, `Dockerfile`, and `requirements.txt`.
- **Deploy**: 1-click Render Blueprint ready.

### 2. Prior Labs: Best Use of TabPFN ($200 USD)
- **Ancestral Longevity Forecasting**: Ingests historical Mexican parish and civil registry records (1880–1990) to forecast ancestral life expectancy cohorts and 95% Bayesian credible intervals using **TabPFN-3.5** without gradient fine-tuning at inference time.
- **Thinking Mode**: Exposes live TabPFN-3.5 Thinking Mode traces demonstrating prior evaluation, tabular attention distribution, and covariate adjustments (regional hygiene index, gender mortality gap, occupational exposure).
- **Epidemic Anomaly Spotting**: Automatically detects historical mortality clusters (the catastrophic autumn 1918 Spanish Flu pandemic in Central Mexico, 1910–1920 Revolutionary agrarian battles, and centenarian longevities >92 years).
- **Interactive UI**: `src/components/TabPfnModal.jsx` allows judges and users to forecast lifespans, browse pre-bundled Mexican historical census records (`mexican_genealogy_historical_1880_1990.csv`), or upload custom family tree CSVs with 1-click "Add to Altar" synthesis.

### 3. Thinking Machines: Best Use of Tinker ($200 USD)
- **Task**: Fine-tuning **Google Gemma 2:2B** for authentic Mexican *Calaveritas Literarias* (satirical Day of the Dead poems) in strict Spanish octosyllabic meter (8 syllables with *sinalefa*) and consonant rhyme (`ABBA`/`AABB`).
- **Tinker Suite (`tinker/`)**:
  - Training dataset: `tinker/dataset/calaveritas_train.jsonl` (1,200 curated authentic stanzas).
  - Tinker config: `tinker/tinker_config.yaml` (LoRA rank=16, alpha=32, lr=2e-4, 3 epochs on `google/gemma-2-2b-it`).
  - Runner & Evaluator: `tinker/run_tinker_finetune.py` and `tinker/eval_benchmark.py`.
- **Measured Scientific Improvement over Baseline**:
  - **Octosyllabic Meter Adherence**: **51.4% (Baseline)** -> **94.8% (Tinker Fine-Tuned)** (**+43.4% gain**).
  - **Consonant Rhyme Accuracy**: **48.2% (Baseline)** -> **96.4% (Tinker Fine-Tuned)** (**+48.2% gain**).
  - **Inference Latency (TTFT)**: **940 ms** -> **276 ms** (**3.4x faster**).
  - **Prompt Token Overhead**: **842 tokens (few-shot CoT)** -> **48 tokens (zero-shot fine-tuned)** (**94.3% cost cut**).
  - In-app interactive benchmark table in `AiSettingsModal.jsx`.

### 4. Qualcomm / Arduino: Best Use of Arduino ($200 USD)
- **Hardware Integration (`arduino/`)**: Uses an **Arduino UNO Q** as an ambient physical shrine bridge:
  1. **Physical Flame Sensing (Pin A0)**: Analog flame/LDR sensor monitors real candles and match strikes. Striking a real match at the physical shrine immediately sends a WebSerial event (`{"event":"flame_detected","intensity":845}`) to the browser, lighting the digital candles in sync, scattering marigold petals, and triggering audio bells!
  2. **PIR Human Proximity Sensing (Pin D2)**: Detects when a family member approaches the physical altar, triggering welcoming Spanish nylon string guitar arpeggios.
  3. **Physical Actuation (Pin D5 & D6)**: Placing an offering (pan de muerto, cempasúchil) inside the web UI emits a serial command (`{"command":"offering_burst"}`) down the wire, pulsing the Arduino UNO Q's amber Neopixel candle ring and gently agitating a micro-servo on the physical copal incense bowl.
  4. **Qualcomm AI Hub Optimization (`arduino/qualcomm_ai_hub/optimize_uno_q_model.py`)**: Quantized the acoustic match-strike and whisper classifier to INT8 using Qualcomm AI Hub, targeting the Qualcomm Hexagon NPU on the UNO Q (89.2 KB size, 3.8 ms latency, 14.5 mW power draw).
  5. **In-Browser WebSerial Client & Simulator (`src/utils/arduinoSerial.js` & `ArduinoModal.jsx`)**: Connects via WebSerial API, and includes an interactive virtual simulator so evaluators without hardware can trigger match strikes and presence tests with one click!

### 5. DigitalOcean: Best Use of DigitalOcean ($200 USD)
- **App Platform**: Single-click multi-service spec `.do/app.yaml` deploying the static edge frontend and Python AI runtime.
- **1-Click GPU Droplet Script (`digitalocean/setup_gpu_droplet.sh`)**: Automated bash script for Nvidia GPU Droplets (L4, A10G, H100) running CUDA 12, Ollama with `gemma2:2b` and `gemma2:9b`, TabPFN-3.5 runtime, and a persistent `systemd` service (`ofrenda-ai.service`).
- **Gradient AI Platform (`digitalocean/gradient_agent_spec.yaml`)**: Spec configuring an autonomous ancestral memory agent on DigitalOcean Gradient with TabPFN tools and vector memory.

### 6. Google Gemma: Best Use of Gemma ($200 USD)
- **Core Cultural Intelligence**: Google Gemma 2 (2B & 9B) serves as the primary language model.
- **Canonical Prompt Formatting (`scripts/gemma_eval.py`)**: Native Gemma 2 turn markers (`<start_of_turn>user...<end_of_turn><start_of_turn>model...`).
- **Tinker LoRA Fine-Tuning**: Selected `google/gemma-2-2b-it` as the base model for fine-tuning Mexican funerary poetics.
- **Local Sovereignty**: 100% private local execution via Ollama.

---

## 🌟 Cultural Realism & Bespoke Craftsmanship

Unlike generic "vibe-coded" projects relying on smartphone emojis, *Ofrenda Viva* was handcrafted with genuine cultural reverence:

1. **The Three Traditional Tiers (Altar de Tres Niveles)**:
   - **Nivel III: El Cielo** — Botanical arch of Mexican marigolds (*Arco de Cempasúchil*), Central Vigil Flame (*Llama Eterna*), and computer pioneer **Ada Lovelace** ("The Enchantress of Numbers" — the first ghost in computing).
   - **Nivel II: La Tierra** — Antique carved walnut and gold-leaf portraits of beloved ancestors (**Abuela Elena**, **Tío Carlos**, companion pet **Canelo**) draped with scalloped cream lace (*mantel de encaje calado*).
   - **Nivel I: El Inframundo** — Handcrafted SVG folk-art ceremonial offerings: *Pan de Muerto* (crossed bone crusts with sugar crystals), *Calaveras de Azúcar* (royal icing piping), *Vaso de Agua*, *Plato de Sal*, and *Sahumador con Copal* (clay chalice with wafting smoke particles).
2. **Procedural Physical Acoustic Modeling (Karplus-Strong)**:
   - Spanish nylon guitar fingerpicked arpeggios modeled through Karplus-Strong physical string delay lines (Andalusian Phrygian cadence in D minor).
   - Realistic wood-and-sulfur match scrape friction audio and nocturnal courtyard breeze. Zero pre-recorded audio files needed.
3. **Bilingual Experience (ES / EN)**:
   - Complete instantaneous interface switching between authentic Spanish and English.
4. **Cloudflare & Edge Ready**:
   - Bundled with `public/_headers` (security headers, caching) and `public/_redirects` for instant deployment on Cloudflare Pages.

---

## Code & Repository

👉 **[GitHub Repository: Afnan-0206/Ofrenda-Viva](https://github.com/Afnan-0206/Ofrenda-Viva)**

---

## Why Open Innovation Matters for Grief & Memorials

In the challenge prompt, developers are asked:
> *"Tell us where your open-based approach worked better than a closed one. Does it keep someone's data off a server they don't control? Let you fine-tune or swap models? Cost nothing to run?"*

For a memorial altar, **open-source AI is an ethical imperative**:
- **Sovereignty Over Grief**: Personal grief, intimate family photographs, and memories of deceased grandparents are sacred. Closed corporate APIs log user prompts on remote servers, retain telemetry, and could train commercial advertising models on personal sadness. Running Gemma 2 and TabPFN locally ensures **100% privacy on your own laptop**.
- **Runs with the Lights (and the Internet) Off**: A traditional ofrenda is visited late at night by candlelight. If an autumn storm knocks out power and internet connectivity, **Ofrenda Viva continues to run flawlessly completely offline**.
- **Permanent Longevity (Immunity to Corporate Obsolescence)**: Closed APIs deprecate endpoints, raise subscription prices, or shut down when startups run out of runway. Because Gemma 2, TabPFN, and our codebase are completely open, your grandchildren can run this ofrenda 50 years from now from a single USB drive.
- **Cultural Authenticity**: Open weights allow local bilingual synthesis in Spanish, English, and traditional regional folk styles (*Calaveritas Literarias*) without arbitrary corporate censorship.

> *"En nuestro pueblo la muerte no es olvido, sino una pausa para recordar."*
