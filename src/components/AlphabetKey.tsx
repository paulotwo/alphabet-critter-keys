import { memo } from "react";

interface AlphabetKeyProps {
  letter: string;
  animal: string;
  emoji: string;
  colorClass: string;
  isActive: boolean;
  onPress: () => void;
}

const AlphabetKey = memo(
  ({ letter, animal, emoji, colorClass, isActive, onPress }: AlphabetKeyProps) => {
    return (
      <button
        onClick={onPress}
        aria-label={`${letter} de ${animal}`}
        className={`
          ${colorClass} 
          relative flex flex-col items-center justify-center
          w-14 h-16 sm:w-20 sm:h-24 md:w-24 md:h-28
          rounded-lg cursor-pointer
          transition-all duration-150 ease-out
          ${isActive ? "key-shadow-pressed translate-y-1 animate-bounce-press" : "key-shadow hover:-translate-y-0.5"}
          active:key-shadow-pressed active:translate-y-1
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        `}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl leading-none select-none">
          {emoji}
        </span>
        <span
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-none mt-0.5 drop-shadow-sm"
          style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        >
          {letter}
        </span>
        <span
          className="absolute -bottom-5 text-[10px] sm:text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
        >
          {animal}
        </span>
      </button>
    );
  }
);

AlphabetKey.displayName = "AlphabetKey";

export default AlphabetKey;
