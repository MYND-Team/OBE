import collectionUrbanLiving from "./assets/collection-urban-living.jpeg";
import madeToPerform1 from "./assets/made-to-perform-1.jpeg";
import madeToPerform2 from "./assets/made-to-perform-2.jpeg";
import urbanHero from "./assets/urban-hero.png";
import urbanLiving1 from "./assets/urban-living-1.png";
import urbanLiving2 from "./assets/urban-living-2.png";
import urbanBedroom1 from "./assets/urban-bedroom-1.png";
import urbanBedroom2 from "./assets/urban-bedroom-2.png";
import urbanBedroom2a from "./assets/urban-bedroom2-1.png";
import shoreLiving1 from "./assets/shore-living-1.png";
import shoreLiving2 from "./assets/shore-living-2.png";
import shoreBedroom1 from "./assets/shore-bedroom-1.png";
import shoreBedroom2 from "./assets/shore-bedroom2-1.png";

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

export const products = [
  {
    slug: "elysian-lounge",
    name: "Elysian Lounge",
    type: "Low lounge chair",
    price: "$6,800",
    hero:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1900&q=88",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1300&q=86",
    detail:
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1300&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=86"
    ],
    material: "Oiled walnut, mohair velvet, hand-tied webbing",
    dimensions: "32 in W x 34 in D x 28 in H",
    lead: "A quiet lounge form with generous negative space, sculpted arms, and a low-slung silhouette made for reading rooms and softened architecture.",
    palette: ["Walnut", "Moss mohair", "Saddle leather"],
    edition: "Made to order in 10 weeks"
  },
  {
    slug: "monolith-dining-table",
    name: "Monolith Table",
    type: "Dining table",
    price: "$14,200",
    hero:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1900&q=88",
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1300&q=86",
    detail:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1300&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=86"
    ],
    material: "Smoked oak, bronze keys, matte hardwax finish",
    dimensions: "108 in W x 42 in D x 29 in H",
    lead: "A monumental dining plane balanced by softened edges, butterfly joinery, and a bronze shadow line running through the base.",
    palette: ["Smoked oak", "Bronze", "Natural oil"],
    edition: "Numbered studio edition"
  },
  {
    slug: "arcadia-sofa",
    name: "Arcadia Sofa",
    type: "Modular sofa",
    price: "$11,900",
    hero:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1900&q=88",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1300&q=86",
    detail:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1300&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=86"
    ],
    material: "Belgian linen, feather blend, kiln-dried ash",
    dimensions: "118 in W x 39 in D x 30 in H",
    lead: "A modular seating system with tailored proportions, feather-soft comfort, and architectural seams that hold the form with precision.",
    palette: ["Bone linen", "Ash", "Oxide piping"],
    edition: "Configurable by module"
  },
  {
    slug: "stretto-console",
    name: "Stretto Console",
    type: "Entry console",
    price: "$8,450",
    hero:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1900&q=88",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1300&q=86",
    detail:
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1300&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=86"
    ],
    material: "Ebonized oak, travertine shelf, leather-lined drawers",
    dimensions: "72 in W x 16 in D x 32 in H",
    lead: "A narrow console designed as an architectural threshold, with concealed drawers and a travertine shelf that appears to float.",
    palette: ["Ebonized oak", "Travertine", "Chestnut leather"],
    edition: "Bespoke dimensions available"
  }
];

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

export const materials = [
  {
    title: "Smoked Oak",
    image:
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=86",
    text: "Fumed for depth, finished to keep the pore visible and the hand present."
  },
  {
    title: "Mohair Velvet",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=86",
    text: "Dense, luminous upholstery with a low nap and restrained color shift."
  },
  {
    title: "Stone Inlay",
    image:
      "https://images.unsplash.com/photo-1523413307857-ef24c53571ae?auto=format&fit=crop&w=1200&q=86",
    text: "Honed stone and architectural insets calibrated to sit flush with the timber."
  }
];

const urbanRooms = [
  {
    id: "living-dining",
    label: "Living & Dining",
    images: [urbanLiving1, urbanLiving2],
    description: "An open lounge and dining setup built for comfort, good light, and a strong first photo, with a compact work corner for the guest mixing a trip with a little work.",
    details: [
      "Three-seater sofa, armchair, pouf, coffee table",
      "TV unit with a Netflix-ready smart TV",
      "Compact desk and chair",
      "Layered floor & pendant lighting, plants, art",
      "Blackout-lined curtains"
    ]
  },
  {
    id: "master-bedroom",
    label: "Master Bedroom",
    images: [urbanBedroom1, urbanBedroom2],
    description: "A calm primary room built around the things guests judge first: sleep and finish.",
    details: [
      "160cm bed frame with hotel-grade mattress and layered hotel linens",
      "Bedside tables, lamps, wardrobe, dresser with mirror",
      "Area rug, blackout curtains, and soft styling"
    ]
  },
  {
    id: "second-bedroom",
    label: "Second Bedroom",
    images: [urbanBedroom2a],
    description: "A flexible second room for a friend, a partner, or a solo guest.",
    details: [
      "Bed frame with quality mattress and full linens",
      "Storage, side tables, and soft styling"
    ]
  }
];

const shoreRooms = [
  {
    id: "living-dining",
    label: "Living & Dining",
    images: [shoreLiving1, shoreLiving2],
    description: "A relaxed, open living and dining area that feels like a holiday the moment you walk in — built for groups, couples, and families.",
    details: [
      "Lounge seating, dining table and chairs",
      "Coffee table, smart TV unit",
      "Coastal-inspired lighting, art, and styling",
      "Blackout curtains"
    ]
  },
  {
    id: "master-bedroom",
    label: "Master Bedroom",
    images: [shoreBedroom1],
    description: "A restful primary suite with a coastal finish, layered linens, and everything guests expect at a high-performing getaway property.",
    details: [
      "King bed frame with hotel-grade mattress and linens",
      "Bedside tables, lamps, wardrobe",
      "Area rug, blackout curtains, soft styling"
    ]
  },
  {
    id: "second-bedroom",
    label: "Second Bedroom",
    images: [shoreBedroom2],
    description: "A flexible additional room that handles friends, couples, or kids without feeling secondary.",
    details: [
      "Bed frame with quality mattress and full linens",
      "Storage, side tables, and soft styling"
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
  { id: "standard", label: "Standard", price: `EGP ${Math.round(base * 0.66).toLocaleString()}` },
  { id: "tech", label: "Tech-enabled", price: `EGP ${Math.round(base * 1.15).toLocaleString()}` }
];

const sharedAddOns = [
  "Appliances — for units that don't already have them",
  "Smart door lock — self check-in, no key handover",
  "Coffee machine — a touch that shows in five-star reviews",
  "Outdoor setup — turns a balcony or garden into a bookable feature",
  "Extra sleeping capacity — unlocks larger groups and higher nightly rate",
  "Smart TV upgrade — larger screen with streaming, out of the box",
  "Faster WiFi — strong signal in every room",
  "Premium styling layer — the detail that makes the hero photo stop the scroll"
];

export const collections = [
  {
    slug: "urban",
    name: "Urban",
    tagline: "FOR THE CITY EXPLORER",
    text: "For the international traveler here to see the city, dropping their bags between the sights, the museums, and a night out. Set up for apartments in the neighborhoods guests actually want to book.",
    image: urbanLiving1,
    packages: packageTiers(424621),
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
    packages: packageTiers(398500),
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

export const projects = [
  {
    title: "Hudson Loft",
    location: "New York",
    image: images.projectOne
  },
  {
    title: "Cedar House",
    location: "Pacific Northwest",
    image: images.projectTwo
  },
  {
    title: "Rue Saint-Honore",
    location: "Paris",
    image: images.projectThree
  }
];
