// Maps each animal to its closest real sound file in /public/sounds/
// Available files: bat, bee, cat, chick, chicken, chipmunk, cow, cricket, dog,
// dolphin, donkey, duck, eagle, elephant, elk, frog, goat, goose, hippo, horse,
// hyena, lion, monkey, mouse, owl, parrot, peacock, penguin, pig, seal, sheep,
// silence, snake, splash, turkey, whale, wolf

export const ANIMAL_SOUND_FILES: Record<string, string> = {
  // A
  Abelha: "bee",
  Arara: "parrot",
  Águia: "eagle",
  Anta: "hippo",
  Aranha: "silence",
  Avestruz: "turkey",
  Alpaca: "goat",
  Alce: "elk",
  Antílope: "goat",
  Anchova: "splash",

  // B
  Borboleta: "silence",
  Baleia: "whale",
  Burro: "donkey",
  Búfalo: "cow",
  "Beija-flor": "bee",
  Barata: "cricket",
  "Bicho-preguiça": "monkey",
  Boto: "dolphin",
  Bisão: "cow",
  Besouro: "bee",

  // C
  Cachorro: "dog",
  Cavalo: "horse",
  Coruja: "owl",
  Cobra: "snake",
  Camelo: "horse",
  Coelho: "chipmunk",
  Capivara: "chipmunk",
  Cisne: "goose",
  Caranguejo: "splash",
  Caracol: "silence",

  // D
  Dinossauro: "lion",
  "Dragão-de-komodo": "snake",
  Doninha: "chipmunk",
  Dromedário: "horse",
  Dourado: "splash",
  Dálmata: "dog",
  Dugongo: "whale",
  Dodô: "turkey",
  "Dente-de-sabre": "lion",
  Dingo: "dog",

  // E
  Elefante: "elephant",
  Esquilo: "chipmunk",
  Ema: "turkey",
  Escorpião: "silence",
  "Estrela-do-mar": "splash",
  Égua: "horse",
  Enguia: "splash",
  Escaravelho: "bee",
  Emu: "turkey",
  Ermitão: "splash",

  // F
  Foca: "seal",
  Flamingo: "goose",
  Formiga: "silence",
  Falcão: "eagle",
  Furão: "chipmunk",
  Frango: "chicken",
  Faisão: "chicken",
  Fossa: "cat",
  

  // G
  Gato: "cat",
  Galinha: "chicken",
  Gorila: "monkey",
  Girafa: "silence",
  Golfinho: "dolphin",
  Grilo: "cricket",
  Ganso: "goose",
  Gambá: "chipmunk",
  Gaivota: "eagle",
  Gecko: "cricket",

  // H
  Hipopótamo: "hippo",
  Hamster: "mouse",
  Hiena: "hyena",
  Harpia: "eagle",
  Héron: "eagle",
  Haddock: "splash",
  "Homem-aranha": "silence",
  Husky: "wolf",
  Hipocampo: "splash",
  Hurón: "mouse",

  // I
  Iguana: "snake",
  Íbis: "eagle",
  Inseto: "bee",
  Impala: "goat",
  Irara: "chipmunk",
  Iaque: "cow",
  Igapó: "splash",
  Inhambu: "chick",
  Iraúna: "chick",
  Iguanodonte: "lion",

  // J
  Jacaré: "lion",
  Jaguatirica: "lion",
  Jabuti: "silence",
  Jiboia: "snake",
  Joaninha: "silence",
  Javali: "pig",
  Jacamim: "chick",
  Jaçanã: "chick",
  Jaratataca: "chipmunk",
  Jumento: "donkey",

  // K
  Koala: "chipmunk",
  Kiwi: "chick",
  Kudu: "elk",
  Kinkaju: "monkey",
  Kanguru: "chipmunk",
  "King cobra": "snake",
  Kakapo: "owl",
  Krill: "splash",
  Komondor: "dog",
  Klipspringer: "goat",

  // L
  Leão: "lion",
  Lobo: "wolf",
  Lagarto: "snake",
  Lhama: "goat",
  Lontra: "chipmunk",
  Libélula: "bee",
  Lagosta: "splash",
  Lêmure: "monkey",
  Lula: "splash",
  Leopardo: "lion",

  // M
  Macaco: "monkey",
  Morcego: "bat",
  Morsa: "seal",
  Minhoca: "silence",
  Mariposa: "silence",
  Mula: "donkey",
  Mosca: "bee",
  "Mico-leão": "monkey",
  Medusa: "splash",
  Mantarraia: "splash",

  // N
  Narval: "whale",
  Naja: "snake",
  Nhandu: "silence",
  Nutria: "chipmunk",
  Nandaia: "parrot",
  Numbat: "chipmunk",
  "Neon tetra": "splash",
  Nightjar: "owl",
  Newt: "silence",
  Nauplius: "splash",

  // O
  Ovelha: "sheep",
  Onça: "lion",
  Orangotango: "monkey",
  Ornitorrinco: "chipmunk",
  Ouriço: "chipmunk",
  Orca: "dolphin",
  Ostra: "splash",
  "Olho-de-boi": "splash",
  Órix: "elk",
  Okapi: "horse",

  // P
  Pinguim: "penguin",
  Papagaio: "parrot",
  Pato: "duck",
  Porco: "pig",
  Polvo: "splash",
  Pantera: "lion",
  Pavão: "peacock",
  Piranha: "splash",
  Periquito: "parrot",
  Preguiça: "monkey",

  // Q
  Quati: "chipmunk",
  "Quero-quero": "chick",
  Quetzal: "chick",
  Quilha: "splash",
  Quokka: "chipmunk",
  Quagga: "horse",
  Quartinha: "cricket",
  Quelea: "chick",
  Quivi: "chick",

  // R
  Raposa: "dog",
  Rato: "mouse",
  Rinoceronte: "hippo",
  Rã: "frog",
  Rouxinol: "chick",
  Raia: "splash",
  Robalo: "splash",
  Rena: "elk",
  Rottweiler: "dog",
  Ratazana: "mouse",

  // S
  Sapo: "frog",
  Serpente: "snake",
  Suricato: "chipmunk",
  Salmão: "splash",
  Sabiá: "chick",
  Sardinha: "splash",
  Sagui: "monkey",
  Surucucu: "snake",
  Salamandra: "silence",
  Siri: "splash",

  // T
  Tartaruga: "silence",
  Tigre: "lion",
  Tucano: "parrot",
  Tubarão: "splash",
  Tatu: "chipmunk",
  Tamanduá: "chipmunk",
  Toupeira: "mouse",
  Tarântula: "silence",
  "Tico-tico": "chick",
  "Tamandua-mirim": "chipmunk",

  // U
  Urso: "lion",
  Urubu: "eagle",
  Urutau: "owl",
  Unicórnio: "horse",
  Uacari: "monkey",
  Urraca: "eagle",
  Uirapuru: "chick",
  Urutu: "snake",
  Uma: "horse",
  Urial: "sheep",

  // V
  Vaca: "cow",
  Veado: "elk",
  Vespa: "bee",
  Víbora: "snake",
  Vagalume: "silence",
  "Viúva-negra": "silence",
  Vicunha: "goat",
  Voador: "splash",
  Vulture: "eagle",
  Vison: "chipmunk",

  // W
  Wombat: "chipmunk",
  Wallaby: "chipmunk",
  Wapiiti: "elk",
  Wolverine: "lion",
  Whippet: "dog",
  Warthog: "pig",
  Weaver: "chick",
  Woodpecker: "chick",
  "Whale shark": "splash",
  "Wolf spider": "silence",

  // X
  Xexéu: "chick",
  Xaréu: "splash",
  Xereta: "chipmunk",
  Xiphias: "splash",
  Xenops: "chick",
  Xandu: "silence",
  "Xié-xié": "splash",
  "Xaréu-azul": "splash",
  Xénopo: "frog",
  Xerimbabo: "chick",

  // Y
  Yak: "cow",
  Yorkshire: "dog",
  "Yellow tang": "splash",
  Yapok: "chipmunk",
  Yellowjacket: "bee",
  "Yeti crab": "splash",
  Yarará: "snake",
  Yacaré: "lion",
  Yuhina: "chick",
  "Yak-tibetano": "cow",

  // Z
  Zebra: "horse",
  Zebu: "cow",
  Zorrilho: "chipmunk",
  Zangão: "bee",
  Zunzum: "bee",
  Zaragueta: "splash",
  Zabelê: "chick",
  Zagaia: "splash",
  "Zogue-zogue": "monkey",
  Zonotrichia: "chick",
};

// Preload audio cache
const audioCache: Record<string, HTMLAudioElement> = {};

export function getAnimalSoundFile(animalName: string): string {
  return ANIMAL_SOUND_FILES[animalName] ?? "silence";
}

export function playAnimalSound(animalName: string): void {
  const soundFile = getAnimalSoundFile(animalName);
  const path = `/sounds/${soundFile}.mp3`;
  
  // Reuse cached audio or create new
  if (!audioCache[path]) {
    audioCache[path] = new Audio(path);
  }
  
  const audio = audioCache[path];
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Fallback: create fresh audio element
    const fresh = new Audio(path);
    fresh.play().catch(console.error);
  });
}
