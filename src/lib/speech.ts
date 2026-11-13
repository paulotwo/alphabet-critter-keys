import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { isNative } from "@/lib/platform";

// Narração. No site usa a Web Speech API; no app usa o TTS do sistema pelo
// plugin, porque o WebView do Android não implementa `speechSynthesis`.

const hasWebSpeech = () => typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Carrega a lista de vozes assim que a tela inicial monta (não exige gesto do
 * usuário). Devolve a função que desfaz a escuta.
 */
export function preloadVoices(): () => void {
  if (isNative || !hasWebSpeech()) return () => {};
  const load = () => {
    window.speechSynthesis.getVoices();
  };
  load();
  window.speechSynthesis.addEventListener("voiceschanged", load);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
}

/**
 * Fala muda disparada no toque do botão de começar: os navegadores bloqueiam
 * `speechSynthesis.speak()` fora de um gesto do usuário. No app não há o que
 * destravar.
 */
export function unlockSpeech(): void {
  if (isNative || !hasWebSpeech()) return;
  window.speechSynthesis.cancel();
  const warmup = new SpeechSynthesisUtterance(" ");
  warmup.volume = 0;
  window.speechSynthesis.speak(warmup);
}

/** Interrompe a fala em andamento (app em segundo plano, saída do teclado). */
export function stopSpeech(): void {
  try {
    if (isNative) {
      TextToSpeech.stop().catch(() => {});
    } else if (hasWebSpeech()) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // Fala indisponível: nada a interromper
  }
}

async function speakNative(text: string, lang: string): Promise<void> {
  try {
    await TextToSpeech.stop();
    await TextToSpeech.speak({ text, lang, rate: 0.9, pitch: 1.05 });
  } catch {
    // Sem voz para o idioma, ou fala interrompida pela seguinte: segue em silêncio
  }
}

function speakWeb(text: string, lang: string): void {
  if (!hasWebSpeech()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const langPrefix = lang.toLowerCase().replace("_", "-");
  const preferredVoice =
    voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix)) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix.split("-")[0]));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
    utterance.lang = preferredVoice.lang;
  } else {
    utterance.lang = lang;
  }

  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

/** Fala `text` no idioma `lang` (BCP-47, ex.: "pt-BR"), cortando a fala anterior. */
export function speak(text: string, lang: string): void {
  if (isNative) void speakNative(text, lang);
  else speakWeb(text, lang);
}
