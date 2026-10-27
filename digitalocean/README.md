# DigitalOcean Deployment & Infrastructure Guide
**Prize Track**: Best Use of DigitalOcean ($200 USD)

*Ofrenda Viva* provides production-ready deployment options across three distinct DigitalOcean products:
1. **DigitalOcean App Platform**: Zero-downtime, fully managed PaaS hosting both the React SPA and FastAPI AI runtime.
2. **DigitalOcean GPU Droplets**: High-performance open-weight model serving (Google Gemma 2:2B and 9B) with full CUDA acceleration.
3. **DigitalOcean Gradient AI Platform**: Declarative autonomous agent hosting for ancestral memory synthesis.

---

## 1. DigitalOcean App Platform (1-Click Blueprint)

The root configuration `.do/app.yaml` defines a complete multi-tier application:
- **`frontend` (Static Site)**: Builds with `npm run build` and serves `dist` globally with edge CDN caching.
- **`ai-runtime` (Python Service)**: Runs FastAPI with `uvicorn`, exposing TabPFN-3.5 and Gemma 2 endpoints.

### Deploying via `doctl` CLI:
```bash
doctl apps create --spec .do/app.yaml
```

---

## 2. DigitalOcean GPU Droplets (1-Click Gemma 2 Serving)

To serve Gemma 2:2B or 9B on dedicated Nvidia GPU hardware (L4, A10G, or H100):

1. Launch a **GPU Droplet** from the DigitalOcean control panel (select *Nvidia GPU + CUDA* image).
2. SSH into your Droplet and execute the automated setup script:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/Afnan-0206/Ofrenda-Viva/main/digitalocean/setup_gpu_droplet.sh | bash
   ```
3. The script automatically:
   - Configures Nvidia drivers and CUDA 12.
   - Installs Ollama and pulls `gemma2:2b` and `gemma2:9b`.
   - Clones the repository, installs Python dependencies (FastAPI, TabPFN), and sets up a persistent `systemd` service (`ofrenda-ai.service`).
   - Opens port `8000` with UFW firewall protection.

---

## 3. DigitalOcean Gradient AI Platform

The specification `digitalocean/gradient_agent_spec.yaml` configures an autonomous **Ancestral Archivist Agent** using Google Gemma 2:9B hosted on Gradient, with integrated tools for TabPFN anomaly detection and Arduino UNO Q telemetry.
