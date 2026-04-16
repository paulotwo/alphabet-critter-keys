import { useState, useCallback } from "react";
import { Shuffle, Share2 } from "lucide-react";
import AlphabetKey from "@/components/AlphabetKey";
import LanguageSelector from "@/components/LanguageSelector";
import SplashScreen from "@/components/SplashScreen";
import { LETTERS, ANIMALS_PT_BY_LETTER, getRandomAnimals, Language, AnimalEntry } from "@/data/animals";
import { ANIMALS_EN_BY_LETTER } from "@/data/animals_en";
import { ANIMALS_ES_BY_LETTER } from "@/data/animals_es";
import { ANIMALS_FR_BY_LETTER } from "@/data/animals_fr";
import { ANIMALS_IT_BY_LETTER } from "@/data/animals_it";
import { ANIMALS_DE_BY_LETTER } from "@/data/animals_de";

const ROW_COLORS = [
  "bg-game-red",
  "bg-game-orange",
  "bg-game-yellow",
  "bg-game-green",
  "bg-game-blue",
  "bg-game-purple",
];

const LANG_CONFIG: Record<Language, {
  speechLang: string;
  preposition: string;
  subtitle: string;
  shuffleLabel: string;
  spokenName: string;
  startLabel: string;
  shareText: string;
}> = {
  pt: {
    speechLang: "pt-BR",
    preposition: "de",
    subtitle: "Toque numa letra para ouvir o som!",
    shuffleLabel: "Trocar Animais",
    spokenName: "Português",
    startLabel: "Começar!",
    shareText: "Venha aprender o alfabeto com animais! 🎵🐾",
  },
  en: {
    speechLang: "en-US",
    preposition: "for",
    subtitle: "Tap a letter to hear the sound!",
    shuffleLabel: "Shuffle Animals",
    spokenName: "English",
    startLabel: "Start!",
    shareText: "Come learn the alphabet with animals! 🎵🐾",
  },
  es: {
    speechLang: "es-ES",
    preposition: "de",
    subtitle: "¡Toca una letra para escuchar el sonido!",
    shuffleLabel: "Cambiar Animales",
    spokenName: "Español",
    startLabel: "¡Empezar!",
    shareText: "¡Ven a aprender el alfabeto con animales! 🎵🐾",
  },
  fr: {
    speechLang: "fr-FR",
    preposition: "de",
    subtitle: "Touche une lettre pour entendre le son !",
    shuffleLabel: "Changer Animaux",
    spokenName: "Français",
    startLabel: "Commencer !",
    shareText: "Viens apprendre l'alphabet avec des animaux ! 🎵🐾",
  },
  it: {
    speechLang: "it-IT",
    preposition: "di",
    subtitle: "Tocca una lettera per sentire il suono!",
    shuffleLabel: "Cambia Animali",
    spokenName: "Italiano",
    startLabel: "Inizia!",
    shareText: "Vieni a imparare l'alfabeto con gli animali! 🎵🐾",
  },
  de: {
    speechLang: "de-DE",
    preposition: "wie",
    subtitle: "Tippe auf einen Buchstaben, um den Klang zu hören!",
    shuffleLabel: "Tiere wechseln",
    spokenName: "Deutsch",
    startLabel: "Los geht's!",
    shareText: "Komm und lerne das Alphabet mit Tieren! 🎵🐾",
  },
};

const ANIMALS_MAP: Record<Language, Record<string, AnimalEntry[]>> = {
  pt: ANIMALS_PT_BY_LETTER,
  en: ANIMALS_EN_BY_LETTER,
  es: ANIMALS_ES_BY_LETTER,
  fr: ANIMALS_FR_BY_LETTER,
  it: ANIMALS_IT_BY_LETTER,
  de: ANIMALS_DE_BY_LETTER,
};

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
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

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "ABC dos Animais",
      text: config.shareText,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    }
  }, [config.shareText]);

  const handleChangeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    setCurrentAnimals(getRandomAnimals(ANIMALS_MAP[newLang]));
    const nextConfig = LANG_CONFIG[newLang];
    setTimeout(() => {
      speak(nextConfig.spokenName, nextConfig.speechLang);
    }, 100);
  }, [speak]);

  const rows = [
    LETTERS.slice(0, 5),
    LETTERS.slice(5, 10),
    LETTERS.slice(10, 15),
    LETTERS.slice(15, 20),
    LETTERS.slice(20, 23),
    LETTERS.slice(23, 26),
  ];

  if (showSplash) {
    return (
      <SplashScreen
        language={language}
        onChangeLanguage={handleChangeLanguage}
        startLabel={config.startLabel}
        onStart={() => setShowSplash(false)}
        onShare={handleShare}
      />
    );
  }

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
          onClick={handleShare}
          className="rounded-xl bg-card/80 backdrop-blur px-3 py-2 text-lg transition-transform hover:scale-105 active:scale-95 shadow"
          title="Share"
        >
          <Share2 size={20} className="text-foreground" />
        </button>
        <LanguageSelector language={language} onChangeLanguage={handleChangeLanguage} />
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
