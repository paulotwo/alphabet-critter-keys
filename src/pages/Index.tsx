import { useState, useCallback } from "react";
import { Shuffle, Volume2, PawPrint } from "lucide-react";
import AlphabetKey from "@/components/AlphabetKey";
import { LETTERS, getRandomAnimals } from "@/data/animals";

const ROW_COLORS = [
  "bg-game-red",
  "bg-game-orange",
  "bg-game-yellow",
  "bg-game-green",
  "bg-game-blue",
  "bg-game-purple",
];

const Index = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentAnimals, setCurrentAnimals] = useState(() => getRandomAnimals());
  const [soundMode, setSoundMode] = useState<"letter" | "animal">("letter");

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleKeyPress = useCallback(
    (letter: string) => {
      const animal = currentAnimals[letter];
      setActiveKey(letter);
      if (soundMode === "letter") {
        speak(`${letter}! ${letter} de ${animal.name}`);
      } else {
        speak(`${animal.sound}`);
      }
      setTimeout(() => setActiveKey(null), 500);
    },
    [currentAnimals, soundMode, speak]
  );

  const shuffleAnimals = useCallback(() => {
    setCurrentAnimals(getRandomAnimals());
  }, []);

  const toggleSoundMode = useCallback(() => {
    setSoundMode((prev) => (prev === "letter" ? "animal" : "letter"));
  }, []);

  // Split into rows of ~5
  const rows = [
    LETTERS.slice(0, 5),
    LETTERS.slice(5, 10),
    LETTERS.slice(10, 15),
    LETTERS.slice(15, 20),
    LETTERS.slice(20, 23),
    LETTERS.slice(23, 26),
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 sm:p-6 md:p-8 select-none">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-1">
        🎵 ABC dos Animais 🎵
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-2">
        Toque numa letra para ouvir o som!
      </p>

      <div className="flex gap-3 mb-2">
        <button
          onClick={shuffleAnimals}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm sm:text-base transition-all duration-150 ease-out key-shadow hover:-translate-y-0.5 active:translate-y-0.5 active:key-shadow-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
          Trocar Animais
        </button>
        <button
          onClick={toggleSoundMode}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm sm:text-base transition-all duration-150 ease-out key-shadow hover:-translate-y-0.5 active:translate-y-0.5 active:key-shadow-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {soundMode === "letter" ? (
            <>
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Modo: Letra
            </>
          ) : (
            <>
              <PawPrint className="w-4 h-4 sm:w-5 sm:h-5" />
              Modo: Som Animal
            </>
          )}
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
