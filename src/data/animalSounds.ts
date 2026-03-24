// Maps each animal to its closest real sound file in /public/sounds/
// Available files: bat, bee, cat, chick, chicken, chipmunk, cow, cricket, dog,
// dolphin, donkey, duck, eagle, elephant, elk, frog, goat, goose, hippo, horse,
// hyena, lion, monkey, mouse, owl, parrot, peacock, penguin, pig, seal, sheep,
// silence, snake, splash, turkey, whale, wolf

export const ANIMAL_SOUND_FILES: Record<string, string> = {
  // A
  Abelha: "bee",
  Águia: "eagle",
  Aranha: "silence",
  Alce: "elk",

  // B
  Borboleta: "silence",
  Baleia: "whale",
  Burro: "donkey",
  Búfalo: "cow",
  Barata: "cricket",
  Bisão: "cow",
  Besouro: "bee",

  // C
  Cachorro: "dog",
  Cavalo: "horse",
  Coruja: "owl",
  Cobra: "snake",
  Camelo: "horse",
  Coelho: "chipmunk",
  Cisne: "goose",
  Caranguejo: "splash",
  Caracol: "silence",

  // D
  Dinossauro: "lion",
  Dromedário: "horse",
  Dodô: "turkey",
  Dálmata: "dog",

  // E
  Elefante: "elephant",
  Esquilo: "chipmunk",
  Escorpião: "silence",
  "Estrela-do-mar": "splash",

  // F
  Foca: "seal",
  Flamingo: "goose",
  Formiga: "silence",
  Frango: "chicken",

  // G
  Gato: "cat",
  Galinha: "chicken",
  Gorila: "monkey",
  Girafa: "silence",
  Golfinho: "dolphin",
  Grilo: "cricket",
  Gambá: "chipmunk",

  // H
  Hipopótamo: "hippo",
  Hamster: "mouse",
  Husky: "wolf",

  // I
  Iguana: "snake",
  Inseto: "bee",

  // J
  Jacaré: "lion",
  Joaninha: "silence",
  Javali: "pig",

  // K
  Koala: "chipmunk",
  Kanguru: "chipmunk",
  Krill: "splash",

  // L
  Leão: "lion",
  Lobo: "wolf",
  Lontra: "chipmunk",
  Lagosta: "splash",
  Lula: "splash",
  Lhama: "goat",

  // M
  Macaco: "monkey",
  Morcego: "bat",
  Minhoca: "silence",
  Mosca: "bee",
  Medusa: "splash",

  // N
  Narval: "whale",
  Nutria: "chipmunk",

  // O
  Ovelha: "sheep",
  Onça: "lion",
  Orangotango: "monkey",
  Ouriço: "chipmunk",
  Ostra: "splash",

  // P
  Pinguim: "penguin",
  Papagaio: "parrot",
  Pato: "duck",
  Porco: "pig",
  Polvo: "splash",
  Pavão: "peacock",
  Preguiça: "monkey",
  Piranha: "splash",

  // Q
  Quati: "chipmunk",
  Quetzal: "chick",

  // R
  Raposa: "dog",
  Rato: "mouse",
  Rinoceronte: "hippo",
  Ratazana: "mouse",

  // S
  Sapo: "frog",
  Sagui: "monkey",

  // T
  Tigre: "lion",
  Tubarão: "splash",
  Tartaruga: "silence",
  Tucano: "parrot",

  // U
  Urso: "lion",
  Unicórnio: "horse",

  // V
  Vaca: "cow",
  Veado: "elk",

  // W
  Wolverine: "lion",

  // X
  Xexéu: "chick",

  // Y
  Yorkshire: "dog",

  // Z
  Zebra: "horse",
  Zebu: "cow",
};

// Preload audio cache
const audioCache: Record<string, HTMLAudioElement> = {};

export function getAnimalSoundFile(animalName: string): string {
  return ANIMAL_SOUND_FILES[animalName] ?? "silence";
}

export function playAnimalSound(animalName: string): void {
  const soundFile = getAnimalSoundFile(animalName);
  const path = `/sounds/${soundFile}.mp3`;

  if (!audioCache[path]) {
    audioCache[path] = new Audio(path);
  }

  const audio = audioCache[path];
  audio.currentTime = 0;
  audio.play().catch(() => {
    const fresh = new Audio(path);
    fresh.play().catch(console.error);
  });
}
