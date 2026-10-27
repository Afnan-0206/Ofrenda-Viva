#!/usr/bin/env bash
# ==============================================================================
# DigitalOcean 1-Click GPU Droplet Automated Setup Script
# Project: Ofrenda Viva - Gemma 2 & TabPFN Edge Inference Host
# Target: DigitalOcean GPU Droplet (Nvidia H100, L4, or A10G)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo " DigitalOcean GPU Droplet Provisioning: Gemma 2 & TabPFN Runtime"
echo "======================================================================"

# 1. Update OS and Install Base Tools
echo "[1/5] Updating base packages..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl wget git build-essential python3-pip python3-venv ufw

# 2. Verify Nvidia CUDA Drivers
echo "[2/5] Verifying Nvidia GPU Drivers..."
if command -v nvidia-smi &> /dev/null; then
    nvidia-smi
else
    echo "Warning: nvidia-smi not found. Installing Nvidia CUDA drivers..."
    apt-get install -y nvidia-driver-535 nvidia-utils-535
fi

# 3. Install Ollama for Accelerated Gemma 2 Serving
echo "[3/5] Installing Ollama high-performance inference engine..."
curl -fsSL https://ollama.com/install.sh | sh

# Configure Ollama systemd service to bind publicly or securely
systemctl daemon-reload
systemctl enable ollama
systemctl restart ollama
sleep 3

# Pull Google Gemma 2 2B and 9B models
echo "[3/5 b] Pulling Google Gemma 2 models..."
ollama pull gemma2:2b
ollama pull gemma2:9b

# 4. Clone and Configure Ofrenda Viva Backend
echo "[4/5] Setting up Ofrenda Viva AI Runtime..."
INSTALL_DIR="/opt/ofrenda-viva"
if [ ! -d "$INSTALL_DIR" ]; then
    git clone https://github.com/Afnan-0206/Ofrenda-Viva.git "$INSTALL_DIR"
fi

cd "$INSTALL_DIR"
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
pip install tabpfn tabpfn-client

# 5. Create Systemd Service for AI Runtime
echo "[5/5] Creating systemd service for Ofrenda Viva..."
cat <<EOF > /etc/systemd/system/ofrenda-ai.service
[Unit]
Description=Ofrenda Viva Unified AI Runtime (TabPFN + Gemma 2)
After=network.target ollama.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/ofrenda-viva
ExecStart=/opt/ofrenda-viva/venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=3
Environment="OLLAMA_HOST=http://127.0.0.1:11434"
Environment="TABPFN_MODEL=tabpfn-v3.5-regressor-thinking"

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable ofrenda-ai
systemctl restart ofrenda-ai

# Configure Firewall
ufw allow 8000/tcp comment 'Ofrenda AI Runtime'
ufw allow 22/tcp comment 'SSH'

echo "======================================================================"
echo " DigitalOcean GPU Droplet Setup Complete!"
echo " AI Runtime is active at: http://$(curl -s ifconfig.me):8000"
echo " Health check: http://$(curl -s ifconfig.me):8000/health"
echo "======================================================================"
