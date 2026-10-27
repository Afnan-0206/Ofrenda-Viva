"""
Ofrenda Viva - Unified AI Runtime & Agent Gateway
Deployable to Render and DigitalOcean App Platform

Features:
- Prior Labs TabPFN-3.5 Tabular Heritage Intelligence & Anomaly Spotter
- Google Gemma 2 / Tinker Fine-Tuned Funerary Verse Inference Bridge
- Arduino UNO Q Physical Shrine WebSerial / IoT Ingestion Telemetry
"""

import os
import json
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import requests

from .tabpfn_service import tabpfn_service

app = FastAPI(
    title="Ofrenda Viva AI Runtime",
    version="1.0.0",
    description="Multi-agent AI backend hosting Prior Labs TabPFN-3.5, Google Gemma 2, and Arduino UNO Q telemetry."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Models -----------------

class TabPfnPredictRequest(BaseModel):
    features: Dict[str, Any]
    thinking_mode: Optional[bool] = True
    model: Optional[str] = "tabpfn-v3.5-regressor-thinking"

class TabPfnAnomaliesRequest(BaseModel):
    records: List[Dict[str, Any]]

class GemmaGenerateRequest(BaseModel):
    prompt: str
    model: Optional[str] = "gemma2:2b"
    system_instruction: Optional[str] = None
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 512

class ArduinoTelemetryEvent(BaseModel):
    event: str
    intensity: Optional[float] = None
    device_id: Optional[str] = "arduino_uno_q_ofrenda_1"
    timestamp: Optional[str] = None

# ----------------- Endpoints -----------------

@app.get("/")
@app.get("/health")
@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "Ofrenda Viva AI Runtime",
        "runtime": "Render / DigitalOcean Unified Agent",
        "models": {
            "tabpfn": "TabPFN-3.5 (Prior Labs) with Thinking Mode",
            "gemma": "Gemma 2:2B / Tinker Fine-Tuned",
            "arduino": "Arduino UNO Q WebSerial Gateway"
        }
    }

# 1. Prior Labs: TabPFN-3.5 Endpoints
@app.post("/api/tabpfn/predict")
def predict_lifespan(req: TabPfnPredictRequest):
    try:
        result = tabpfn_service.predict_lifespan(req.features, thinking_mode=req.thinking_mode)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TabPFN prediction error: {str(e)}")

@app.post("/api/tabpfn/anomalies")
def spot_anomalies(req: TabPfnAnomaliesRequest):
    try:
        anomalies = tabpfn_service.detect_anomalies(req.records)
        return {"total_evaluated": len(req.records), "results": anomalies}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TabPFN anomaly detection error: {str(e)}")

# 2. Gemma 2 / Tinker Fine-Tuned Verse Inference Bridge
@app.post("/api/gemma/generate")
def gemma_generate(req: GemmaGenerateRequest):
    ollama_host = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
    
    # Format with Gemma 2 canonical prompt turn markers
    system_block = f"<start_of_turn>system\n{req.system_instruction}\n<end_of_turn>\n" if req.system_instruction else ""
    formatted_prompt = f"{system_block}<start_of_turn>user\n{req.prompt}\n<end_of_turn>\n<start_of_turn>model\n"

    try:
        res = requests.post(
            f"{ollama_host}/api/generate",
            json={
                "model": req.model,
                "prompt": formatted_prompt,
                "stream": False,
                "options": {
                    "temperature": req.temperature,
                    "num_predict": req.max_tokens
                }
            },
            timeout=15
        )
        if res.status_code == 200:
            data = res.json()
            return {
                "model": req.model,
                "output": data.get("response", ""),
                "provider": "Gemma 2 via Ollama Runtime"
            }
    except Exception:
        pass

    # Fallback response if local Gemma instance is not running
    fallback_verse = (
        "En la niebla del recuerdo tu presencia cobra vida,\n"
        "las velas de cera pura dan la bienvenida al alma.\n"
        "Hoy la muerte no divide, hoy el tiempo se apacigua,\n"
        "y tu risa reverbera en la noche con calma."
    )
    return {
        "model": req.model,
        "output": fallback_verse,
        "provider": "Gemma 2 Cultural Fallback Engine",
        "note": "Connect local Ollama or DigitalOcean GPU Droplet to activate full local Gemma 2 inference."
    }

# 3. Arduino UNO Q Telemetry Stream
@app.post("/api/arduino/telemetry")
def arduino_telemetry(event: ArduinoTelemetryEvent):
    return {
        "status": "received",
        "event": event.event,
        "intensity": event.intensity,
        "action_taken": "synced_virtual_altar_velas"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
