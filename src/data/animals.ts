export interface AnimalEntry {
  name: string;
  emoji: string;
  sound: string;
}

export type Language = "pt" | "en";

// Each emoji is used ONLY ONCE across the entire alphabet
export const ANIMALS_PT_BY_LETTER: Record<string, AnimalEntry[]> = {
  A: [
    { name: "Abelha", emoji: "🐝", sound: "Bzzzz" },
    { name: "Águia", emoji: "🦅", sound: "Píííu" },
    { name: "Aranha", emoji: "🕷️", sound: "Tss tss" },
    { name: "Alce", emoji: "🫎", sound: "Buuuu" },
  ],
  B: [
    { name: "Borboleta", emoji: "🦋", sound: "Flap flap" },
    { name: "Baleia", emoji: "🐋", sound: "Uuuuoo" },
    { name: "Burro", emoji: "🫏", sound: "Ió ió" },
    { name: "Búfalo", emoji: "🐃", sound: "Muuuu" },
    { name: "Barata", emoji: "🪳", sound: "Tec tec" },
    { name: "Bisão", emoji: "🦬", sound: "Grooo" },
    { name: "Besouro", emoji: "🪲", sound: "Zzzz" },
  ],
  C: [
    { name: "Cachorro", emoji: "🐶", sound: "Au au" },
    { name: "Cavalo", emoji: "🐴", sound: "Ihhhh" },
    { name: "Coruja", emoji: "🦉", sound: "Uhu uhu" },
    { name: "Cobra", emoji: "🐍", sound: "Ssssss" },
    { name: "Camelo", emoji: "🐫", sound: "Brrr" },
    { name: "Coelho", emoji: "🐰", sound: "Fiuu fiuu" },
    { name: "Cisne", emoji: "🦢", sound: "Hãã" },
    { name: "Caranguejo", emoji: "🦀", sound: "Clique clique" },
    { name: "Caracol", emoji: "🐌", sound: "..." },
  ],
  D: [
    { name: "Dinossauro", emoji: "🦕", sound: "Roaarrr" },
    { name: "Dromedário", emoji: "🐪", sound: "Brrr" },
    { name: "Dodô", emoji: "🦤", sound: "Pó pó" },
    
  ],
  E: [
    { name: "Elefante", emoji: "🐘", sound: "Tróóó" },
    { name: "Esquilo", emoji: "🐿️", sound: "Tchip tchip" },
    { name: "Escorpião", emoji: "🦂", sound: "Tss" },
    { name: "Estrela-do-mar", emoji: "⭐", sound: "Splash" },
  ],
  F: [
    { name: "Foca", emoji: "🦭", sound: "Ork ork" },
    { name: "Flamingo", emoji: "🦩", sound: "Graaa" },
    { name: "Formiga", emoji: "🐜", sound: "Tec tec" },
    { name: "Frango", emoji: "🐓", sound: "Có có có" },
  ],
  G: [
    { name: "Gato", emoji: "🐱", sound: "Miau" },
    { name: "Galinha", emoji: "🐔", sound: "Có có có" },
    { name: "Gorila", emoji: "🦍", sound: "Uoh uoh" },
    { name: "Girafa", emoji: "🦒", sound: "Hmmm" },
    { name: "Golfinho", emoji: "🐬", sound: "Ééé ééé" },
    { name: "Grilo", emoji: "🦗", sound: "Cri cri" },
    { name: "Gambá", emoji: "🦨", sound: "Grrr" },
  ],
  H: [
    { name: "Hipopótamo", emoji: "🦛", sound: "Rooo" },
    { name: "Hamster", emoji: "🐹", sound: "Squiik" },
    { name: "Hiena", emoji: "🐕‍🦺", sound: "Hehehe" },
  ],
  I: [
    { name: "Iguana", emoji: "🦎", sound: "Hisss" },
    { name: "Inseto", emoji: "🐛", sound: "Bzzzz" },
  ],
  J: [
    { name: "Jacaré", emoji: "🐊", sound: "Snap snap" },
    { name: "Joaninha", emoji: "🐞", sound: "Bzz" },
    { name: "Javali", emoji: "🐗", sound: "Grunh" },
  ],
  K: [
    { name: "Koala", emoji: "🐨", sound: "Grrr" },
    { name: "Kanguru", emoji: "🦘", sound: "Tum tum" },
    { name: "Krill", emoji: "🦐", sound: "Splash" },
  ],
  L: [
    { name: "Leão", emoji: "🦁", sound: "Roaarrr" },
    { name: "Lobo", emoji: "🐺", sound: "Auuuu" },
    { name: "Lontra", emoji: "🦦", sound: "Squii" },
    { name: "Lagosta", emoji: "🦞", sound: "Clac clac" },
    { name: "Lula", emoji: "🦑", sound: "Splash" },
    { name: "Lhama", emoji: "🦙", sound: "Hmmm" },
  ],
  M: [
    { name: "Macaco", emoji: "🐵", sound: "Uoh uoh" },
    { name: "Morcego", emoji: "🦇", sound: "Squiik" },
    { name: "Minhoca", emoji: "🪱", sound: "..." },
    { name: "Mosca", emoji: "🪰", sound: "Bzzzz" },
    { name: "Medusa", emoji: "🪼", sound: "Blup blup" },
  ],
  N: [
    { name: "Narval", emoji: "🐳", sound: "Uuuuoo" },
    { name: "Nutria", emoji: "🦫", sound: "Squii" },
  ],
  O: [
    { name: "Ovelha", emoji: "🐑", sound: "Béééé" },
    { name: "Onça", emoji: "🐆", sound: "Grrrrau" },
    { name: "Orangotango", emoji: "🦧", sound: "Uoh uoh" },
    { name: "Ouriço", emoji: "🦔", sound: "Sniff" },
    { name: "Ostra", emoji: "🦪", sound: "Clac" },
  ],
  P: [
    { name: "Pinguim", emoji: "🐧", sound: "Wak wak" },
    { name: "Papagaio", emoji: "🦜", sound: "Louro! Louro!" },
    { name: "Pato", emoji: "🦆", sound: "Quá quá" },
    { name: "Porco", emoji: "🐷", sound: "Óinc óinc" },
    { name: "Polvo", emoji: "🐙", sound: "Blup" },
    { name: "Pavão", emoji: "🦚", sound: "Ááá" },
    { name: "Preguiça", emoji: "🦥", sound: "Ahhh" },
    { name: "Piranha", emoji: "🐟", sound: "Nhac nhac" },
  ],
  Q: [
    { name: "Quati", emoji: "🦝", sound: "Tchii" },
    { name: "Quetzal", emoji: "🐦", sound: "Kéé" },
  ],
  R: [
    { name: "Raposa", emoji: "🦊", sound: "Yap yap" },
    { name: "Rato", emoji: "🐭", sound: "Squiik" },
    { name: "Rinoceronte", emoji: "🦏", sound: "Snort" },
    { name: "Ratazana", emoji: "🐀", sound: "Squiik" },
  ],
  S: [
    { name: "Sapo", emoji: "🐸", sound: "Cróác cróác" },
    { name: "Sagui", emoji: "🐒", sound: "Tchii" },
  ],
  T: [
    { name: "Tigre", emoji: "🐯", sound: "Grrrrau" },
    { name: "Tubarão", emoji: "🦈", sound: "Splash" },
    { name: "Tartaruga", emoji: "🐢", sound: "..." },
    { name: "Tucano", emoji: "🐤", sound: "Tóó tóó" },
  ],
  U: [
    { name: "Urso", emoji: "🐻", sound: "Grrrr" },
    { name: "Unicórnio", emoji: "🦄", sound: "Nihhhh" },
  ],
  V: [
    { name: "Vaca", emoji: "🐄", sound: "Muuuu" },
    { name: "Veado", emoji: "🦌", sound: "Bram" },
  ],
  W: [
    { name: "Wolverine", emoji: "🦡", sound: "Grrrrr" },
  ],
  X: [
    { name: "Xexéu", emoji: "🐣", sound: "Tchiii" },
  ],
  Y: [
    { name: "Yorkshire", emoji: "🐩", sound: "Au au" },
  ],
  Z: [
    { name: "Zebra", emoji: "🦓", sound: "Ihhnn" },
    { name: "Zebu", emoji: "🐂", sound: "Muuuu" },
  ],
};

// Keep backward-compatible exports
export const ANIMALS_BY_LETTER = ANIMALS_PT_BY_LETTER;
export const LETTERS = Object.keys(ANIMALS_PT_BY_LETTER);

export function getRandomAnimals(
  animalsByLetter: Record<string, AnimalEntry[]>,
  previous?: Record<string, AnimalEntry>
): Record<string, AnimalEntry> {
  const result: Record<string, AnimalEntry> = {};
  const letters = Object.keys(animalsByLetter);
  for (const letter of letters) {
    const animals = animalsByLetter[letter];
    if (!animals || animals.length === 0) continue;
    if (animals.length <= 1) {
      result[letter] = animals[0];
    } else if (previous) {
      const filtered = animals.filter((a) => a.name !== previous[letter]?.name);
      result[letter] = filtered[Math.floor(Math.random() * filtered.length)];
    } else {
      result[letter] = animals[Math.floor(Math.random() * animals.length)];
    }
  }
  return result;
}
