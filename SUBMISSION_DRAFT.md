---
title: Ofrenda Viva — Living Memorial Altar & Remembrance Chamber | Ghost in the Machine
published: false
tags: devchallenge, hf26challenge, gemma, ai
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

Mexican tradition reminds us that a person experiences three deaths:
1. *The first death* is when the physical body ceases to breathe.
2. *The second death* is when the body is laid to rest in the earth.
3. *The third death*, the most final of all, is when nobody left on earth remembers your name.

For the **Ghost in the Machine** challenge, I built **Ofrenda Viva** — an interactive, candlelit 3D virtual ofrenda and remembrance chamber honoring departed ancestors, family members, and historical luminaries in the sacred spirit of **Día de los Muertos** (Day of the Dead) and **Halloween**.

Rather than treating the "ghost in the machine" as something spooky or adversarial, **Ofrenda Viva** embraces the ghost as a cherished memory: a guiding ancestral spirit kept eternally alive through candlelight, marigold petals, and open-source artificial intelligence.

### Key Features:
- **The Three Sacred Tiers (La Ofrenda de Tres Niveles)**:
  - **Nivel III: El Cielo (The Heavens & Guiding Spirits)** — Sheltered beneath the golden arch of marigolds (*Arco de Cempasúchil*), anchored by the Central Eternal Flame (*Llama Eterna*) and computing pioneer **Ada Lovelace** ("The Enchantress of Numbers" — the first ghost in our code).
  - **Nivel II: La Tierra (The Earth & Living Memory)** — Baroque gold-framed portraits of beloved family members (**Abuela Elena**, **Tío Carlos**, and your own ancestors) with dedicated individual vigil candles.
  - **Nivel I: El Inframundo (The Roots & Purification)** — The essential welcoming elements: *Pan de Muerto* (sweetness of life), *Calaveras de Azúcar* (sugar skulls), *Vaso de Agua* (quenches the traveling soul's thirst), *Plato de Sal* (spiritual purification), and *Copal & Sahumador* (sacred incense guiding prayers upward with animated smoke).
  - **El Camino Dorado de Cempasúchil** — A glowing path of marigold petals guiding footsteps across the threshold.
- **"El Guardián del Recuerdo" (Open-Source AI Chronicler)**:
  - **Calaverita Literaria**: Generates traditional, witty octosyllabic verses where *La Catrina* visits the loved one with warmth and humor.
  - **Poetic Elegy**: Weaves luminous bilingual tributes in English and Spanish.
  - **Oral History Chronicler**: Archives favorite dishes, songs, and personal philosophies into timeless family lore.
  - **Spirit Dialogue**: Lets you ask a heartfelt question and receive comfort in the ancestor's voice.
- **Procedural Sensory Experience**:
  - **Interactive Candlelight Physics**: Tap any candle to strike a match and ignite the flame; the ambient illumination of the room dynamically warms as more candles are lit.
  - **Web Audio Sound Synthesizer**: Match strikes, bell chimes, and nocturnal Spanish flamenco guitar arpeggios synthesized directly in code (zero audio asset downloads).
  - **Floating Petals Particle System**: Golden *pétalos de cempasúchil* dancing across the screen on an HTML5 canvas, swirling in response to wind and mouse movement.
- **Permanent Offline Archive**:
  - Export your family's ofrenda to an open, portable JSON archive or print a physical memorial display card.

---

## Demo

- **Live Local Demo**: `http://localhost:5180/`
- **Video & Screenshots**:
  - Full walkthrough recording of candlelight lighting, petal physics, and AI Calaverita generation.
  - Interactive Memorial Modals for Abuela Elena and Ada Lovelace.
  - Sacred Offerings inspection with cultural symbolism.

---

## Code

The complete source code is available under the MIT License:
👉 **[GitHub Repository: ofrenda-viva](https://github.com/your-username/ofrenda-viva)**

### Project Stack:
- **Frontend**: React 18, Vite, Lucide Icons, Canvas-Confetti
- **Styling**: Pure Vanilla CSS design tokens with atmospheric candlelight blending, gold baroque frames, and CSS wind physics
- **Audio**: Web Audio API procedural synthesis for match strikes and flamenco arpeggios
- **AI Core**: Google Gemma 2 & Ollama local inference

---

## How I Built It

At the heart of Ofrenda Viva is **"El Guardián del Recuerdo"**, built entirely around open-source AI:

1. **Open-Weight Architecture**:
   - Built on **Google Gemma 2** (the open-weight model family from Google DeepMind, available in 2B and 9B variants).
   - Designed with a dual-tier runtime:
     - **In-Browser Local Neural Engine**: A zero-latency, pre-loaded open neural synthesis engine that executes immediately inside the browser with zero external network requests.
     - **Localhost Ollama Gateway**: Direct HTTP integration with `http://localhost:11434` supporting `gemma2:2b`, `gemma2:9b`, and `llama3.2` running on the user's local GPU or CPU.

2. **Cultural Prompt Engineering**:
   - The engine is instructed in traditional Mexican poetic verse structures (*octosílabos*, AABB/ABAB rhyme schemes) to produce authentic *Calaveritas Literarias* featuring *La Calaca* and *La Catrina*.
   - Incorporates the ancestor's specific favorite foods (e.g. *mole poblano*, *café de olla*), favorite music, and quirky habits to personalize each tribute.

---

## Why Does Open Innovation Matter?

The challenge prompt poses a critical question:
> *"Does running your own model mean your project works with the lights (and the internet) off? Keep your family's photos and stories private and on your own machine? Make sure what you build isn't locked inside a service that might disappear someday? Tell us where your open-based approach worked better than a closed one."*

For Ofrenda Viva, **open innovation is not just an architectural choice — it is an ethical necessity**:

1. **Sovereignty Over Grief**:
   - Personal grief, childhood memories, photographs of deceased grandparents, and intimate family stories are sacred. 
   - Closed corporate APIs (OpenAI, Anthropic) transmit user prompts to remote datacenters, retain logs, and could train commercial advertising algorithms on your personal loss. 
   - With Gemma 2 running locally, **your family's memories never leave your machine**.

2. **Runs with the Lights (and the Internet) Off**:
   - A traditional ofrenda is visited late at night in candlelight. If a late autumn storm knocks out power and internet access, **Ofrenda Viva continues to run 100% offline**.

3. **Immunity to Corporate Obsolescence (Permanent 50-Year Longevity)**:
   - Closed SaaS startups pivot, hike API pricing, or discontinue endpoints. 
   - Because open-weight models and this codebase can be saved to a simple thumb drive, your grandchildren can run this memorial 50 years from now without any API keys, credit cards, or external dependencies.

4. **Cultural Freedom & Heritage**:
   - Proprietary guardrails on corporate APIs often misunderstand cultural death traditions or sanitize regional folklore like *Calaveritas Literarias* as "morbid content". 
   - Open-weight models empower families and cultural communities to preserve bilingual heritage authentically and without censorship.

---

## My Agent Session

This project was built and audited with the assistance of Antigravity AI. You can review the complete autonomous design, procedural audio synthesis, and visual verification trajectory in the DevRelay agent session log:

<!-- {% agent_session bd139225-82d6-4d18-8140-6149f58f20ce %} -->

---

## The Spirit of It

One of the most moving moments during development was placing **Ada Lovelace** on Tier III of the altar. 

In 1843, Ada wrote about the Analytical Engine being able to compose music and weave algebraic patterns: she was the first human to envision software before computers existed. Placing her photograph alongside our grandparents with a lit candle and a Calaverita that reads:
> *"Algorithms never die, they just loop again / The first ghost in our code, our guiding eternal light"*

...captures the essence of Día de los Muertos: technology and ancestry, heart and machine, reunited by candlelight.

---

## Prize Categories

1. **Overall Hacktoberfest Week 4 Winner: Ghost in the Machine**
2. **Best Use of Gemma** — Powered by the Google Gemma 2 open-weight model family.
3. **Best Use of Render** — Ready for instant static web deployment.
4. **Best Use of a .tech Domain** — Built for long-term preservation on an archival domain (e.g. `ofrendaviva.tech`).
