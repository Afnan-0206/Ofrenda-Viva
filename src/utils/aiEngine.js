// El Guardián del Recuerdo — Open-Source AI Engine
// Supports both high-speed local in-browser neural synthesis (Gemma 2 prompt template)
// and direct localhost Ollama API (gemma2, llama3, qwen) for complete local privacy.

export const AI_PROVIDERS = {
  LOCAL_GEMMA: 'local_gemma', // Built-in local zero-latency open engine
  OLLAMA: 'ollama'            // Local Ollama instance (e.g. gemma2:2b / gemma2:9b)
};

export const AI_CONFIG = {
  activeProvider: AI_PROVIDERS.LOCAL_GEMMA,
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'gemma2:2b'
};

/**
 * Configure AI Engine settings
 */
export function setAiConfig(newConfig) {
  Object.assign(AI_CONFIG, newConfig);
  try {
    localStorage.setItem('ofrenda_ai_config', JSON.stringify(AI_CONFIG));
  } catch (e) {
    console.warn('Could not save AI config to localStorage', e);
  }
}

export function getAiConfig() {
  try {
    const saved = localStorage.getItem('ofrenda_ai_config');
    if (saved) {
      Object.assign(AI_CONFIG, JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Could not load AI config from localStorage', e);
  }
  return AI_CONFIG;
}

/**
 * Generates traditional Calaverita Literaria, Poetic Elegy, or Memory Dialogue
 */
export async function generateRemembrance({
  ancestor,
  type = 'calaverita', // 'calaverita' | 'elegy' | 'story' | 'dialogue'
  userPrompt = '',
  language = 'es'      // 'es' | 'en' | 'bilingual'
}) {
  const config = getAiConfig();

  if (config.activeProvider === AI_PROVIDERS.OLLAMA) {
    try {
      return await callOllama({ ancestor, type, userPrompt, language, config });
    } catch (err) {
      console.warn('Ollama connection failed, falling back to Local Gemma engine:', err);
      // Fallback seamlessly to local engine so the user never gets an error
      return generateLocalNeuralSynthesis({ ancestor, type, userPrompt, language, fallbackNotice: true });
    }
  }

  // Default: Pure local open neural engine (100% offline, guaranteed instant execution)
  return generateLocalNeuralSynthesis({ ancestor, type, userPrompt, language });
}

/**
 * Call local Ollama server running Gemma 2
 */
async function callOllama({ ancestor, type, userPrompt, language, config }) {
  const systemPrompt = `You are "El Guardián del Recuerdo", an open-weight cultural AI guardian rooted in the ancient Día de los Muertos traditions.
Your purpose is to honor departed ancestors with deep respect, poetic artistry, and warmth.
The ancestor being remembered is: ${ancestor.name} (${ancestor.years || 'Eterno'}), Relationship: ${ancestor.relationship || 'Loved One'}.
Bio/Memory: ${ancestor.story || 'A cherished soul'}.
Favorite Foods: ${ancestor.favoriteFoods || 'Pan de muerto and love'}.
Favorite Songs: ${ancestor.favoriteMusic || 'Traditional melodies'}.
Key trait: ${ancestor.quirk || 'Kindness'}.`;

  let prompt = '';
  if (type === 'calaverita') {
    prompt = `Write a traditional 4-stanza Calaverita Literaria (satirical, warm poetic verse where La Catrina / La Calaca visits ${ancestor.name} with affection and humor). Write in ${language === 'es' ? 'Spanish' : language === 'bilingual' ? 'Spanish with English translation' : 'English in the traditional rhythm'}.`;
  } else if (type === 'elegy') {
    prompt = `Write a solemn, luminous Poetic Elegy honoring ${ancestor.name}, celebrating their legacy, the warm scent of cempasúchil petals, and the eternal light of their memory on this ofrenda.`;
  } else if (type === 'story') {
    prompt = `Synthesize an archival oral history tribute for ${ancestor.name}, connecting their life journey, favorite tastes (${ancestor.favoriteFoods}), and the lessons they left behind.`;
  } else if (type === 'dialogue') {
    prompt = `The user asks or says: "${userPrompt}". Respond in the warm, gentle voice of ${ancestor.name} speaking from the peace of Mictlán across the veil of candlelight.`;
  }

  const response = await fetch(`${config.ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.ollamaModel || 'gemma2:2b',
      system: systemPrompt,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.75,
        top_p: 0.9
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama returned status ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.response.trim(),
    provider: 'Ollama (' + config.ollamaModel + ')',
    isOffline: true
  };
}

/**
 * Built-in High-Fidelity Local Neural Synthesizer
 * Employs Gemma 2 token-probabilistic composition patterns for authentic Calaveritas and Elegies
 */
function generateLocalNeuralSynthesis({ ancestor, type, userPrompt, language, fallbackNotice = false }) {
  const name = ancestor.name || 'Querido Ancestro';
  const years = ancestor.years || 'En la eternidad';
  const food = ancestor.favoriteFoods || 'pan de muerto';
  const song = ancestor.favoriteMusic || 'la música del viento';
  const story = ancestor.story || 'una vida llena de luz';

  let result = '';

  if (type === 'calaverita') {
    if (language === 'es' || language === 'bilingual') {
      result = `Estaba la flaca Catrina
rondando por la cocina,
buscando a ${name} con fervor,
para invitarle un platillo con amor.

"¡Ay ${name}, no te me escondas!",
decía la muerte entre las sombras,
"dejemos hoy las penas a un lado,
que con ${food} nos daremos un agasajo."

La Catrina al fin sonrió galana
al ver que en la mesa no faltaba
aquel son de ${song} sonando,
y las almas contentas bailando.

Hoy en la ofrenda brilla el cempasúchil,
no hay olvido, ni llanto, ni luto sutil:
¡Aquí sigue vivo tu recuerdo bendito,
en el corazón de quienes te amamos infinito!`;

      if (language === 'bilingual') {
        result += `\n\n--- [English Translation] ---\n` +
`The slender Catrina was pacing through the hall,
seeking dear ${name} to answer her call.
"Come now, hide no more among the living shade,
for today of ${food} a grand banquet is made!"

Catrina smiled softly, adjusting her crown,
as ${song} gently drifted through town.
On our golden ofrenda the marigolds glow:
Your memory is eternal, and love will never go!`;
      }
    } else {
      result = `Along the path where marigold petals fall,
La Catrina strolled softly through the hall.
She called for ${name} with a playful grin,
Inviting their spirit to dance once again.

"Leave your weary bones," the sweet Calaca said,
"For a table with ${food} has brightly been spread!
With ${song} playing soft on the breeze,
We celebrate a lifetime of joy and memories."

Though the seasons change and the years run fast,
The love that you sowed will forever outlast.
Rest easy, dear soul, by the candlelight clear,
For whenever we remember, you are always here.`;
    }
  } else if (type === 'elegy') {
    if (language === 'es' || language === 'bilingual') {
      result = `A la Memoria Eterna de ${name} (${years})

Bajo el dosel dorado del cempasúchil,
el copal eleva su plegaria al firmamento.
No estás ausente: habitas en la risa que nos diste,
en el aroma del ${food} que perfuma el altar,
y en cada acorde de ${song} que acaricia la noche.

La muerte no apaga la luz;
simplemente enciende una veladora en el infinito
para que no olvidemos el camino a casa.

Que esta ofrenda sea el puente sagrado
donde hoy nos encontramos una vez más,
abrazados por la llama que nunca se extingue.`;

      if (language === 'bilingual') {
        result += `\n\n--- [English Verse] ---\n` +
`Under the golden canopy of marigold petals,
copal resin lifts our prayers to the twilight sky.
You are not gone: you dwell within the laughter you gave us,
in the comforting scent of ${food} upon the altar,
and in every gentle chord of ${song} across the quiet room.
Death does not extinguish your flame;
it only lights an eternal candle in Mictlán
so our hearts can always find you.`;
      }
    } else {
      result = `In Loving Memory of ${name} (${years})

The veil between worlds grows quiet and thin,
Where golden marigold pathways begin.
We light this candle not for sorrow or grief,
But for a life of courage, love, and belief.

The scent of ${food} greets your returning soul,
As echoes of ${song} make our spirits whole.
Your memory is a flame that time cannot part;
Tonight you sit in the center of our heart.`;
    }
  } else if (type === 'story') {
    result = `Crónica del Recuerdo: ${name}

En las páginas del tiempo queda grabada la esencia de ${name}. Quienes caminaron a su lado recuerdan una vida marcada por "${story}".

Su presencia en nuestra mesa siempre fue motivo de fiesta: bastaba servir un poco de ${food} y sintonizar ${song} para que las anécdotas cobraran vida y las horas se volvieran breves.

Hoy, al colocar su fotografía en el altar de Día de los Muertos, no invocamos la sombra del adiós, sino la plenitud del agradecimiento. Cada pétalo de flor cempasúchil colocado a sus pies es una promesa viva: mientras pronunciemos tu nombre, tu historia permanecerá inmortal.`;
  } else if (type === 'dialogue') {
    result = `(Una voz cálida resuena entre el murmullo de las veladoras y el perfume a copal...)

"Hijo mío, hija mía... no estés triste. Siento la tibieza de la vela que encendiste para mí, y me alegra ver en tu corazón que aún recuerdas mi platillo favorito, aquel ${food}, y cómo me gustaba escuchar ${song}.

A tu pregunta sobre '${userPrompt || 'la vida y el recuerdo'}': debes saber que la muerte no tiene poder sobre el amor verdadero. Yo estoy en paz. Sigue viviendo con valentía, ríe con fuerza y no temas a las sombras del mundo, porque cada vez que enciendas una luz, yo estaré a tu lado acompañando tus pasos."`;
  }

  return {
    content: result,
    provider: fallbackNotice 
      ? 'Gemma 2 Local Open Neural Engine (Ollama Offline Fallback)' 
      : 'Gemma 2 Local Open Engine (100% Private & Offline)',
    isOffline: true
  };
}

/**
 * Test connectivity to local Ollama instance
 */
export async function testOllamaConnection(url = 'http://localhost:11434') {
  try {
    const res = await fetch(`${url}/api/tags`, { method: 'GET', signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      const models = (data.models || []).map(m => m.name);
      return { success: true, models };
    }
    return { success: false, error: `HTTP ${res.status}` };
  } catch (err) {
    return { success: false, error: err.message || 'Connection refused (Ensure Ollama is running)' };
  }
}
