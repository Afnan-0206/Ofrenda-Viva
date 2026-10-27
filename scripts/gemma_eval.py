#!/usr/bin/env python3
"""
Google Gemma 2 Local Inference & Prompt Evaluation Harness
Project: Ofrenda Viva

Validates prompt templating with Gemma 2 canonical tokens:
<start_of_turn>user\n...<end_of_turn>\n<start_of_turn>model\n
"""

import os
import sys
import json
import requests

def test_gemma_generation(model="gemma2:2b", ollama_host="http://localhost:11434"):
    print("=" * 65)
    print(f" Google Gemma 2 Evaluation Harness: {model}")
    print("=" * 65)

    system_instruction = (
        "Eres el Bardo Ancestral de Ofrenda Viva. Compón versos funerarios y "
        "calaveritas tradicionales mexicanas en versos octosílabos para recordar a los difuntos."
    )
    user_prompt = "Compón un epitafio breve para Doña Concepción, panadera de muertos de Puebla."

    # Format using Gemma 2 canonical turn structure
    formatted_prompt = (
        f"<start_of_turn>system\n{system_instruction}\n<end_of_turn>\n"
        f"<start_of_turn>user\n{user_prompt}\n<end_of_turn>\n"
        f"<start_of_turn>model\n"
    )

    print(f"[*] Target Model: {model}")
    print(f"[*] Prompt Formatted with Gemma 2 Control Tokens.")
    print("[*] Connecting to local Ollama inference engine...")

    try:
        res = requests.post(
            f"{ollama_host}/api/generate",
            json={
                "model": model,
                "prompt": formatted_prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "num_predict": 256
                }
            },
            timeout=10
        )
        if res.status_code == 200:
            output = res.json().get("response", "")
            print("\n[✓] Gemma 2 Local Inference Successful!\n")
            print("--- Output from Gemma 2 ---")
            print(output)
            print("---------------------------")
            return True
    except Exception as e:
        print(f"\n[!] Ollama not reachable on {ollama_host} ({e}).")
        print("[i] Showing simulated Gemma 2 canonical completion:")
        print("---------------------------")
        print("El aroma de azahar y trigo en flor\nguía tus pasos de vuelta a este hogar,\nConcepción, en tus manos hubo amor,\ny hoy tu memoria vuelve a perfumar.")
        print("---------------------------")
        return False

if __name__ == "__main__":
    model = sys.argv[1] if len(sys.argv) > 1 else "gemma2:2b"
    test_gemma_generation(model)
