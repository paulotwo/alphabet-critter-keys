import { beforeEach, describe, expect, it, vi } from "vitest";

const platform = vi.hoisted(() => ({ isNative: false }));
const tts = vi.hoisted(() => ({
  stop: vi.fn(() => Promise.resolve()),
  speak: vi.fn(() => Promise.resolve()),
}));

vi.mock("@/lib/platform", () => platform);
vi.mock("@capacitor-community/text-to-speech", () => ({ TextToSpeech: tts }));

import { preloadVoices, speak, stopSpeech, unlockSpeech } from "@/lib/speech";

class FakeUtterance {
  lang = "";
  voice: unknown = null;
  volume = 1;
  rate = 1;
  pitch = 1;
  constructor(public text: string) {}
}

const synth = {
  cancel: vi.fn(),
  speak: vi.fn(),
  getVoices: vi.fn(() => [{ lang: "pt-BR" }, { lang: "fr-CA" }]),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  platform.isNative = false;
  vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
});

describe("speech no site", () => {
  it("fala pela Web Speech API com a voz do idioma", () => {
    speak("A de Abelha", "pt-BR");
    expect(synth.cancel).toHaveBeenCalled();
    const utterance = synth.speak.mock.calls[0][0] as FakeUtterance;
    expect(utterance.text).toBe("A de Abelha");
    expect(utterance.lang).toBe("pt-BR");
    expect(tts.speak).not.toHaveBeenCalled();
  });

  it("aceita uma voz de outra região do mesmo idioma", () => {
    speak("Français", "fr-FR");
    expect((synth.speak.mock.calls[0][0] as FakeUtterance).lang).toBe("fr-CA");
  });

  it("destrava a fala com uma elocução muda", () => {
    unlockSpeech();
    expect((synth.speak.mock.calls[0][0] as FakeUtterance).volume).toBe(0);
  });
});

describe("speech no app nativo", () => {
  beforeEach(() => {
    platform.isNative = true;
    // O WebView do Android não tem speechSynthesis
    Reflect.deleteProperty(window, "speechSynthesis");
  });

  it("fala pelo TTS do sistema, cortando a fala anterior", async () => {
    speak("A de Abelha", "pt-BR");
    await vi.waitFor(() => expect(tts.speak).toHaveBeenCalled());
    expect(tts.stop).toHaveBeenCalled();
    expect(tts.speak).toHaveBeenCalledWith(expect.objectContaining({ text: "A de Abelha", lang: "pt-BR" }));
  });

  it("não quebra quando o idioma não tem voz instalada", async () => {
    tts.speak.mockRejectedValueOnce(new Error("lang not supported"));
    expect(() => speak("A wie Affe", "de-DE")).not.toThrow();
    await vi.waitFor(() => expect(tts.speak).toHaveBeenCalled());
  });

  it("não toca em speechSynthesis", () => {
    expect(() => {
      preloadVoices()();
      unlockSpeech();
      stopSpeech();
    }).not.toThrow();
    expect(tts.stop).toHaveBeenCalledTimes(1);
  });
});
