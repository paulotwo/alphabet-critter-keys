import { useEffect } from "react";
import { Language } from "@/data/animals";
import LanguageSelector from "@/components/LanguageSelector";
import { isNative } from "@/lib/platform";
import { preloadVoices, unlockSpeech } from "@/lib/speech";

import { Share2 } from "lucide-react";

interface SplashScreenProps {
  language: Language;
  title: string;
  onChangeLanguage: (lang: Language) => void;
  startLabel: string;
  onStart: () => void;
  onShare: () => void;
}

const DECO_EMOJIS = ["🐘", "🦁", "🐬", "🦜", "🐸", "🦋", "🐧", "🦊"];

const SplashScreen = ({ language, title, onChangeLanguage, startLabel, onStart, onShare }: SplashScreenProps) => {
  // Pre-load voice list as soon as the splash screen mounts (no user gesture needed)
  useEffect(() => preloadVoices(), []);

  const handleStart = () => {
    // Fire a silent utterance on the user-gesture click to fully warm up the TTS engine
    unlockSpeech();

    // Request fullscreen only when NOT running as an installed PWA
    // (no app nativo a tela é da casca Android)
    const isPwa =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (!isNative && !isPwa && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    onStart();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Language selector top-right */}
      <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] right-4 z-20 flex items-center gap-2">
        <button
          onClick={onShare}
          className="rounded-xl bg-card/80 backdrop-blur px-3 py-2 text-lg transition-transform hover:scale-105 active:scale-95 shadow"
          title="Share"
        >
          <Share2 size={20} className="text-foreground" />
        </button>
        <LanguageSelector language={language} onChangeLanguage={onChangeLanguage} />
      </div>

      {/* Decorative animal row */}
      <div className="flex gap-3 text-4xl sm:text-5xl" aria-hidden="true">
        {DECO_EMOJIS.slice(0, 4).map((emoji, i) => (
          <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{emoji}</span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground text-center leading-tight">
        🎵 {title} 🎵
      </h1>

      {/* Decorative animal row (bottom) */}
      <div className="flex gap-3 text-4xl sm:text-5xl" aria-hidden="true">
        {DECO_EMOJIS.slice(4).map((emoji, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        className="mt-4 px-10 py-5 rounded-2xl bg-game-green text-white text-2xl sm:text-3xl font-extrabold tracking-wide shadow-lg transition-all duration-150 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-1 active:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {startLabel}
      </button>
    </div>
  );
};

export default SplashScreen;