import { useState, useCallback } from "react";
import { Shuffle } from "lucide-react";
import AlphabetKey from "@/components/AlphabetKey";
import { LETTERS, ANIMALS_PT_BY_LETTER, getRandomAnimals, Language } from "@/data/animals";
import { ANIMALS_EN_BY_LETTER } from "@/data/animals_en";

const ROW_COLORS = [
  "bg-game-red",
  "bg-game-orange",
  "bg-game-yellow",
  "bg-game-green",
  "bg-game-blue",
  "bg-game-purple",
];

const LANG_CONFIG: Record<Language, {
  flag: string;
  speechLang: string;
  preposition: string;
  subtitle: string;
  shuffleLabel: string;
  spokenName: string;
}> = {
  pt: {
    flag: "🇧🇷",
    speechLang: "pt-BR",
    preposition: "de",
    subtitle: "Toque numa letra para ouvir o som!",
    shuffleLabel: "Trocar Animais",
    spokenName: "Português",
  },
  en: {
    flag: "🇺🇸",
    speechLang: "en-US",
    preposition: "for",
    subtitle: "Tap a letter to hear the sound!",
    shuffleLabel: "Shuffle Animals",
    spokenName: "English",
  },
};

const ANIMALS_MAP: Record<Language, Record<string, import("@/data/animals").AnimalEntry[]>> = {
  pt: ANIMALS_PT_BY_LETTER,
  en: ANIMALS_EN_BY_LETTER,
};

const Index = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("pt");
  const [currentAnimals, setCurrentAnimals] = useState(() =>
    getRandomAnimals(ANIMALS_PT_BY_LETTER)
  );

  const config = LANG_CONFIG[language];

  const speak = useCallback((text: string, lang: string) => {
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
  }, []);

  const handleKeyPress = useCallback(
    (letter: string) => {
      const animal = currentAnimals[letter];
      if (!animal) return;
      setActiveKey(letter);
      speak(
        `${letter}! ${letter} ${config.preposition} ${animal.name}`,
        config.speechLang
      );
      setTimeout(() => setActiveKey(null), 500);
    },
    [currentAnimals, speak, config]
  );

  const shuffleAnimals = useCallback(() => {
    setCurrentAnimals((prev) => getRandomAnimals(ANIMALS_MAP[language], prev));
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === "pt" ? "en" : "pt";
      const nextConfig = LANG_CONFIG[next];
      setCurrentAnimals(getRandomAnimals(ANIMALS_MAP[next]));
      // Speak the language name in the new language
      setTimeout(() => {
        speak(nextConfig.spokenName, nextConfig.speechLang);
      }, 100);
      return next;
    });
  }, [speak]);

  const rows = [
    LETTERS.slice(0, 5),
    LETTERS.slice(5, 10),
    LETTERS.slice(10, 15),
    LETTERS.slice(15, 20),
    LETTERS.slice(20, 23),
    LETTERS.slice(23, 26),
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 sm:p-6 md:p-8 select-none" onContextMenu={(e) => e.preventDefault()}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-1">
        🎵 ABC dos Animais 🎵
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-2">
        {config.subtitle}
      </p>

      <div className="flex gap-3 mb-2">
        <button
          onClick={shuffleAnimals}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm sm:text-base transition-all duration-150 ease-out key-shadow hover:-translate-y-0.5 active:translate-y-0.5 active:key-shadow-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
          {config.shuffleLabel}
        </button>
        <button
          onClick={toggleLanguage}
          aria-label="Change language"
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary text-secondary-foreground text-2xl sm:text-3xl transition-all duration-150 ease-out key-shadow hover:-translate-y-0.5 active:translate-y-0.5 active:key-shadow-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {config.flag}
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-4xl">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {row.map((letter) => {
              const animal = currentAnimals[letter];
              if (!animal) return null;
              return (
                <AlphabetKey
                  key={letter}
                  letter={letter}
                  animal={animal.name}
                  emoji={animal.emoji}
                  colorClass={ROW_COLORS[rowIndex]}
                  isActive={activeKey === letter}
                  onPress={() => handleKeyPress(letter)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
