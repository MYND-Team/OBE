import collectionUrbanLiving from "./assets/collection-urban-living.jpeg";
import madeToPerform1 from "./assets/made-to-perform-1.jpeg";
import madeToPerform2 from "./assets/made-to-perform-2.jpeg";
import urbanHero from "./assets/urban-hero.jpg";
import urbanLiving1 from "./assets/urban-living-1.jpg";
import urbanLiving2 from "./assets/urban-living-2.jpg";
import urbanBedroom1 from "./assets/urban-bedroom-1.jpg";
import urbanBedroom2 from "./assets/urban-bedroom-2.jpg";
import urbanBedroom2a from "./assets/urban-bedroom2-1.jpg";
import shoreLiving1 from "./assets/shore-living-1.jpg";
import shoreLiving2 from "./assets/shore-living-2.jpg";
import shoreBedroom1 from "./assets/shore-bedroom-1.jpg";
import shoreBedroom2 from "./assets/shore-bedroom2-1.jpg";

export const images = {
  hero: urbanHero,
  intro: madeToPerform1,
  madeToPerform1,
  madeToPerform2,
  studio:
    "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1500&q=86",
  joinery:
    "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1300&q=86",
  textile:
    "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?auto=format&fit=crop&w=1300&q=86",
  walnut:
    "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=1300&q=86",
  projectOne:
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=86",
  projectTwo:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1700&q=86",
  projectThree:
    "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1500&q=86"
};

export const processSteps = [
  {
    number: "01",
    title: "Assess",
    text: "We assess the property, the location, and the guest it should win."
  },
  {
    number: "02",
    title: "Match",
    text: "We match it to the collection and guest that earns the most."
  },
  {
    number: "03",
    title: "Install",
    text: "Sourcing, delivery, assembly, styling. Handled for you."
  },
  {
    number: "04",
    title: "Photography And Go Live",
    text: "Shot to perform in search. Live in 30 days."
  }
];



const urbanRooms = [
  {
    id: "living-dining",
    label: "Living and Dining",
    images: [urbanLiving1, urbanLiving2],
    description: "An open lounge and dining setup built for comfort, good light, and a strong first photo, with a compact work corner for the guest mixing a trip with a little work.",
    details: [
      "Three seater sofa, armchair, pouf, and coffee table",
      "TV unit with a Netflix ready smart TV, plus a compact desk and chair",
      "Layered floor and pendant lighting, plants, art, and blackout lined curtains"
    ]
  },
  {
    id: "master-bedroom",
    label: "Master Bedroom",
    images: [urbanBedroom1, urbanBedroom2],
    description: "A calm primary room built around the things guests judge first, sleep and finish.",
    details: [
      "160cm bed frame with a hotel grade mattress and layered hotel linens",
      "Bedside tables and lamps, a wardrobe, and a dresser with mirror",
      "Area rug, blackout curtains, and soft styling"
    ]
  },
  {
    id: "guest-bedroom",
    label: "Second Bedroom",
    images: [urbanBedroom2a],
    description: "A flexible room package for friends, kids, or extra occupancy without making the space feel secondary.",
    details: [
      "Guest bed configuration",
      "Compact storage and side tables",
      "Durable textiles and finishing pieces"
    ]
  }
];

const shoreRooms = [
  {
    id: "living-dining",
    label: "Living & Dining Room",
    images: [shoreLiving1, shoreLiving2],
    description: "A guest-ready lounge and dining setup built around comfort, flow, and five-star first impressions.",
    details: [
      "Sofa and accent seating",
      "Dining table and chairs",
      "Coffee tables, lighting, and decor"
    ]
  },
  {
    id: "master-bedroom",
    label: "Master Bedroom",
    images: [shoreBedroom1],
    description: "A calmer primary suite with the essentials guests notice first: sleep quality, storage, and finish.",
    details: [
      "Bed frame, mattress, and linens",
      "Nightstands and layered lighting",
      "Wardrobe accents and soft styling"
    ]
  },
  {
    id: "guest-bedroom",
    label: "Guest Bedroom",
    images: [shoreBedroom2],
    description: "A flexible room package for friends, kids, or extra occupancy without making the space feel secondary.",
    details: [
      "Guest bed configuration",
      "Compact storage and side tables",
      "Durable textiles and finishing pieces"
    ]
  }
];

const genericRooms = [
  {
    id: "living-dining",
    label: "Living & Dining Room",
    images: [images.projectOne, images.projectTwo],
    description: "A guest-ready lounge and dining setup built around comfort, flow, and five-star first impressions.",
    details: ["Sofa and accent seating", "Dining table and chairs", "Coffee tables, lighting, and decor"]
  },
  {
    id: "master-bedroom",
    label: "Master Bedroom",
    images: [images.walnut, images.textile],
    description: "A calmer primary suite with the essentials guests notice first: sleep quality, storage, and finish.",
    details: ["Bed frame, mattress, and linens", "Nightstands and layered lighting", "Wardrobe accents and soft styling"]
  },
  {
    id: "guest-bedroom",
    label: "Guest Bedroom",
    images: [images.studio, images.joinery],
    description: "A flexible room package for friends, kids, or extra occupancy without making the space feel secondary.",
    details: ["Guest bed configuration", "Compact storage and side tables", "Durable textiles and finishing pieces"]
  }
];

const packageTiers = (base) => [
  { id: "standard", label: "Essential", price: `EGP ${Math.round(base * 0.66).toLocaleString()}` },
  { id: "tech", label: "Signature", price: `EGP ${Math.round(base * 1.15).toLocaleString()}` }
];

const packageTiersNoTech = (base) => [
  { id: "standard", label: "Essential", price: `EGP ${Math.round(base * 0.66).toLocaleString()}` }
];

const sharedAddOns = [
  "Appliances, from 35,000 EGP: for units that don't already have them, so owners pay only for what's missing",
  "Smart door lock, 4,500 EGP: self check-in, so guests arrive on their own time and you never hand over a key",
  "Coffee machine, 4,500 EGP: a small touch that shows up again and again in five star reviews",
  "Outdoor setup, from 22,000 EGP: turns an unused balcony, roof, or garden into a photographed, bookable feature",
  "Extra sleeping capacity: a sofa bed or added bed unlocks larger groups and a higher nightly rate",
  "Smart TV upgrade, from 15,000 EGP per TV: a larger screen with the streaming guests expect, straight out of the box",
  "Faster WiFi, mesh upgrade, 3,500 EGP: strong signal in every room, the one thing a remote worker checks before booking",
  "Premium styling layer, 15,000 EGP: the extra art, texture, and detail that make the hero photo stop the scroll"
];

export const collections = [
  {
    slug: "urban",
    name: "Urban",
    tagline: "FOR THE CITY EXPLORER",
    text: "For the international traveler here to see the city, dropping their bags between the sights, the museums, and a night out. Set up for apartments in the neighborhoods guests actually want to book.",
    image: urbanLiving1,
    packages: packageTiersNoTech(424621),
    bedroomPricing: {
      "Studio / 1 Bedroom": 289250,
      "2 Bedroom": 369750,
      "3 Bedroom": 428250
    },
    styles: [],
    bedroomOptions: ["Studio / 1 Bedroom", "2 Bedroom", "3 Bedroom"],
    addOns: sharedAddOns,
    rooms: urbanRooms
  },
  {
    slug: "shore",
    name: "Shore",
    tagline: "FOR THE GETAWAY GUEST",
    text: "For families, couples, and friend groups on an escape to the coast, who want it to feel like a holiday the second they walk in. Set up for chalets, apartments, and villas by the sea.",
    image: shoreLiving1,
    packages: packageTiersNoTech(398500),
    bedroomPricing: {
      "1 Bedroom": 249750,
      "2 Bedroom": 312950,
      "3 Bedroom": 384250
    },
    styles: [],
    bedroomOptions: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom"],
    addOns: sharedAddOns,
    rooms: shoreRooms
  },
  {
    slug: "haven",
    name: "Haven",
    tagline: "For The Family and Group",
    text: "Room for everyone.",
    image: images.projectThree,
    packages: packageTiers(512300),
    styles: [
      { id: "warm", label: "Warm", swatch: "#ad8a5f" },
      { id: "neutral", label: "Neutral", swatch: "#e5ebd8" }
    ],
    bedroomOptions: ["3 Bedroom", "4 Bedroom", "5+ Bedroom"],
    addOns: ["Bunk configurations", "Extra bedding sets", "Kid-safe furnishings"],
    rooms: genericRooms
  },
  {
    slug: "desk",
    name: "Desk",
    tagline: "For The Professional",
    text: "Built to work from, not just stay in.",
    image: images.intro,
    packages: packageTiers(361200),
    styles: [
      { id: "minimal", label: "Minimal", swatch: "#333721" },
      { id: "warm", label: "Warm", swatch: "#746f4f" }
    ],
    bedroomOptions: ["Studio", "1 Bedroom", "2 Bedroom"],
    addOns: ["Dedicated workspace setup", "High-speed router", "Ergonomic seating"],
    rooms: genericRooms
  }
];


