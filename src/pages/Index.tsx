import { useState, useCallback } from "react";
import AlphabetKey from "@/components/AlphabetKey";

const ALPHABET_DATA: { letter: string; animal: string; emoji: string }[] = [
  { letter: "A", animal: "Abelha", emoji: "🐝" },
  { letter: "B", animal: "Borboleta", emoji: "🦋" },
  { letter: "C", animal: "Cachorro", emoji: "🐶" },
  { letter: "D", animal: "Dinossauro", emoji: "🦕" },
  { letter: "E", animal: "Elefante", emoji: "🐘" },
  { letter: "F", animal: "Foca", emoji: "🦭" },
  { letter: "G", animal: "Gato", emoji: "🐱" },
  { letter: "H", animal: "Hipopótamo", emoji: "🦛" },
  { letter: "I", animal: "Iguana", emoji: "🦎" },
  { letter: "J", animal: "Jacaré", emoji: "🐊" },
  { letter: "K", animal: "Koala", emoji: "🐨" },
  { letter: "L", animal: "Leão", emoji: "🦁" },
  { letter: "M", animal: "Macaco", emoji: "🐵" },
  { letter: "N", animal: "Narval", emoji: "🐳" },
  { letter: "O", animal: "Ovelha", emoji: "🐑" },
  { letter: "P", animal: "Pinguim", emoji: "🐧" },
  { letter: "Q", animal: "Quati", emoji: "🦝" },
  { letter: "R", animal: "Raposa", emoji: "🦊" },
  { letter: "S", animal: "Sapo", emoji: "🐸" },
  { letter: "T", animal: "Tartaruga", emoji: "🐢" },
  { letter: "U", animal: "Urso", emoji: "🐻" },
  { letter: "V", animal: "Vaca", emoji: "🐄" },
  { letter: "W", animal: "Wombat", emoji: "🐻" },
  { letter: "X", animal: "Xexéu", emoji: "🐦" },
  { letter: "Y", animal: "Yak", emoji: "🐃" },
  { letter: "Z", animal: "Zebra", emoji: "🦓" },
];

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

  const speakLetter = useCallback((letter: string, animal: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${letter}! ${letter} de ${animal}`
    );
    utterance.lang = "pt-BR";
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleKeyPress = useCallback(
    (letter: string, animal: string) => {
      setActiveKey(letter);
      speakLetter(letter, animal);
      setTimeout(() => setActiveKey(null), 500);
    },
    [speakLetter]
  );

  // Split into rows of ~5-7
  const rows = [
    ALPHABET_DATA.slice(0, 5),   // A-E
    ALPHABET_DATA.slice(5, 10),  // F-J
    ALPHABET_DATA.slice(10, 15), // K-O
    ALPHABET_DATA.slice(15, 20), // P-T
    ALPHABET_DATA.slice(20, 23), // U-W
    ALPHABET_DATA.slice(23, 26), // X-Z
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 sm:p-6 md:p-8 select-none">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
        🎵 ABC dos Animais 🎵
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-4">
        Toque numa letra para ouvir o som!
      </p>

      <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-4xl">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {row.map(({ letter, animal, emoji }) => (
              <AlphabetKey
                key={letter}
                letter={letter}
                animal={animal}
                emoji={emoji}
                colorClass={ROW_COLORS[rowIndex]}
                isActive={activeKey === letter}
                onPress={() => handleKeyPress(letter, animal)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
