# Thinking Machines Tinker Fine-Tuning Benchmark Report
**Project**: Ofrenda Viva  
**Task**: Authentic Mexican *Calaveritas Literarias* and Funerary Poetics in Octosyllabic Verse  
**Base Model**: Google Gemma 2 2B (`google/gemma-2-2b-it`)  
**Fine-Tuned Model**: `ofrenda-viva/gemma-2-2b-calaveritas-tinker`  
**Fine-Tuning Platform**: Thinking Machines' Tinker  

---

## 1. Executive Summary

Off-the-shelf general language models fail significantly at authentic Hispanic and Mexican folk poetics. When prompted to generate a traditional *Calaverita Literaria* (a satirical funerary poem celebrating the Day of the Dead), standard models produce irregular verse lengths (12 to 16 syllables), miss Mexican cultural idioms, and fail to maintain strict consonant rhyme schemes (`AABB` or `ABBA`).

Using **Thinking Machines' Tinker**, we fine-tuned **Google Gemma 2:2B** on a curated dataset of 1,200 authentic octosyllabic funerary stanzas.

### Headline Results:
- **Octosyllabic Meter Adherence**: Increased from **51.4%** to **94.8%** (**+43.4%** absolute gain).
- **Consonant Rhyme Accuracy**: Increased from **48.2%** to **96.4%** (**+48.2%** absolute gain).
- **Inference Latency (TTFT)**: Reduced from **940 ms** to **276 ms** (**3.4x faster**).
- **Prompt Token Efficiency**: Token consumption dropped from **842 tokens** (few-shot chain-of-thought) to **48 tokens** (zero-shot fine-tuned), yielding a **94.3% cost reduction**.

---

## 2. Quantitative Benchmark Table

| Metric | Baseline Gemma 2:2B (Few-Shot CoT) | Tinker Fine-Tuned Gemma 2:2B | Absolute Delta | Relative Improvement |
| :--- | :---: | :---: | :---: | :---: |
| **Octosyllabic Syllable Accuracy (8 Syllables)** | 51.4% | **94.8%** | +43.4% | **1.84x better** |
| **Consonant Rhyme Accuracy (ABBA / AABB)** | 48.2% | **96.4%** | +48.2% | **2.00x better** |
| **Time to First Token (TTFT)** | 940 ms | **276 ms** | -664 ms | **3.4x faster** |
| **Prompt Token Overhead** | 842 tokens | **48 tokens** | -794 tokens | **94.3% cost savings** |
| **Generation Latency (Total)** | 1.84 s | **0.54 s** | -1.30 s | **3.4x faster** |
| **Mexican Cultural Idiom Density** | 1.2 / stanza | **4.6 / stanza** | +3.4 / stanza | **3.8x richer** |

---

## 3. Qualitative Side-by-Side Comparison

### Input Prompt:
> *"Escribe una cuarteta de calaverita literaria para Don Silvano, músico campesino de vihuela."*

### Baseline Gemma 2:2B Completion:
```text
Don Silvano tocaba su vihuela con gran emoción,      (15 sílabas - Métrica errática)
pero la muerte vino de repente en la noche,          (13 sílabas - Prosaico)
se lo llevó muy triste al cementerio,                (12 sílabas - Sin rima)
y ahora toca para los fantasmas en el cielo.         (14 sílabas - Sin consonancia)
```
*Analysis*: Fails Spanish poetic meter completely. Does not follow octosyllabic rule, lacks humor, lacks Mexican cultural imagery ("La Catrina", "el fandango", "el camposanto").

### Tinker Fine-Tuned Completion:
```text
La Catrina muy catrina                               (8 sílabas - Rima A)
al fandango fue a llegar,                            (8 sílabas - Rima B)
y a Silvano en una esquina                           (8 sílabas - Rima A)
lo sacó para bailar.                                 (8 sílabas - Rima B)
```
*Analysis*: Perfect 8-8-8-8 octosyllabic meter with clean ABAB consonant rhyme, traditional irony, and vibrant Mexican imagery.

---

## 4. Fine-Tuning Hyperparameters in Tinker

```yaml
base_model: "google/gemma-2-2b-it"
method: "lora"
r: 16
lora_alpha: 32
lora_dropout: 0.05
target_modules: ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
learning_rate: 2.0e-4
batch_size: 4
gradient_accumulation_steps: 4
epochs: 3
optimizer: "adamw_torch"
lr_scheduler: "cosine"
warmup_ratio: 0.05
```

---

## 5. How to Reproduce

1. **Inspect dataset**:
   ```bash
   cat tinker/dataset/calaveritas_train.jsonl
   ```
2. **Review Tinker training configuration**:
   ```bash
   cat tinker/tinker_config.yaml
   ```
3. **Execute the benchmark evaluation harness**:
   ```bash
   python tinker/eval_benchmark.py
   ```
4. **Inspect machine-readable benchmark JSON**:
   ```bash
   cat tinker/benchmark_results.json
   ```
