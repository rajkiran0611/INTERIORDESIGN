// AuraSpace Mock Database for Interior Customizations

export const WALL_COLORS = [
  { id: 'alabaster', name: 'Warm Alabaster', hex: '#f4ede4', description: 'Soft, creamy off-white with warm undertones.' },
  { id: 'sage', name: 'Soft Sage', hex: '#cfdac8', description: 'Calming, muted green reminiscent of sage leaves.' },
  { id: 'denim', name: 'Muted Denim', hex: '#c5d3e0', description: 'Cool, serene blue with slate-grey character.' },
  { id: 'terracotta', name: 'Sand Terracotta', hex: '#ebd5c1', description: 'Gentle, earthy peach that mimics sun-baked clay.' },
  { id: 'slate', name: 'Charcoal Slate', hex: '#585e66', description: 'Deep, dramatic charcoal for high contrast.' },
  { id: 'canvas', name: 'Studio White', hex: '#faf9f6', description: 'Pure, crisp white providing a clean canvas.' }
];

export const ROOM_TYPES = [
  { id: 'living', name: 'Living Room', basePrice: 1500, description: 'A cozy, open-concept space for relaxation and hosting.' },
  { id: 'bedroom', name: 'Master Bedroom', basePrice: 1200, description: 'A quiet, restful sanctuary with soft textures.' },
  { id: 'kitchen', name: 'Minimalist Kitchen', basePrice: 2400, description: 'A modern culinary space with clean lines.' }
];

export const ACCESSORIES = [
  // LIVING ROOM ACCESSORIES
  {
    id: 'nordic-sofa',
    name: 'Nordic Sofa',
    category: 'furniture',
    price: 850,
    rooms: ['living'],
    description: 'Minimalist 3-seater in textured oatmeal canvas.',
    position: { bottom: '15%', left: '20%', width: '280px', height: '120px' },
    svg: `
      <svg viewBox="0 0 280 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Main body shadow -->
        <rect x="10" y="105" width="260" height="8" rx="4" fill="rgba(0,0,0,0.15)" filter="blur(2px)" />
        <!-- Wooden legs -->
        <line x1="30" y1="95" x2="20" y2="115" stroke="#a18262" stroke-width="6" stroke-linecap="round" />
        <line x1="250" y1="95" x2="260" y2="115" stroke="#a18262" stroke-width="6" stroke-linecap="round" />
        <line x1="70" y1="95" x2="65" y2="115" stroke="#a18262" stroke-width="5" stroke-linecap="round" />
        <line x1="210" y1="95" x2="215" y2="115" stroke="#a18262" stroke-width="5" stroke-linecap="round" />
        <!-- Main Seat Frame -->
        <rect x="20" y="70" width="240" height="28" rx="6" fill="#e5e0d8" stroke="#d5cfc4" stroke-width="2" />
        <!-- Seat Cushions -->
        <rect x="25" y="52" width="112" height="22" rx="4" fill="#f0eae0" stroke="#d5cfc4" stroke-width="1.5" />
        <rect x="143" y="52" width="112" height="22" rx="4" fill="#f0eae0" stroke="#d5cfc4" stroke-width="1.5" />
        <!-- Back Cushions -->
        <rect x="25" y="18" width="112" height="38" rx="6" fill="#ece6db" stroke="#d5cfc4" stroke-width="1.5" />
        <rect x="143" y="18" width="112" height="38" rx="6" fill="#ece6db" stroke="#d5cfc4" stroke-width="1.5" />
        <!-- Armrests -->
        <rect x="12" y="38" width="16" height="50" rx="4" fill="#dcd6cb" stroke="#cfc7bc" stroke-width="1.5" />
        <rect x="252" y="38" width="16" height="50" rx="4" fill="#dcd6cb" stroke="#cfc7bc" stroke-width="1.5" />
        <!-- Accent Throw Pillow -->
        <path d="M 40 50 Q 55 35 70 50 Q 55 65 40 50" fill="#a4b4a3" opacity="0.9" />
      </svg>
    `
  },
  {
    id: 'lounge-chair',
    name: 'Woven Lounge Chair',
    category: 'furniture',
    price: 420,
    rooms: ['living', 'bedroom'],
    description: 'Sculptural accent chair with synthetic rattan weave.',
    position: { bottom: '15%', right: '15%', width: '130px', height: '120px' },
    svg: `
      <svg viewBox="0 0 130 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="65" cy="112" rx="45" ry="6" fill="rgba(0,0,0,0.12)" filter="blur(2px)" />
        <!-- Steel Frame Legs -->
        <path d="M 25 110 L 45 75 L 85 75 L 105 110" fill="none" stroke="#2c2c2c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 45 75 L 35 45 M 85 75 L 95 45" fill="none" stroke="#2c2c2c" stroke-width="4" />
        <!-- Rattan woven seat -->
        <path d="M 20 40 C 20 30, 40 35, 65 35 C 90 35, 110 30, 110 40 C 110 55, 95 80, 85 80 L 45 80 C 35 80, 20 55, 20 40 Z" fill="#d8b28a" stroke="#b08a63" stroke-width="2" />
        <!-- Woven texture mock lines -->
        <path d="M 30 45 Q 65 50 100 45" fill="none" stroke="#b08a63" stroke-width="1" />
        <path d="M 32 55 Q 65 60 98 55" fill="none" stroke="#b08a63" stroke-width="1" />
        <path d="M 36 65 Q 65 70 94 65" fill="none" stroke="#b08a63" stroke-width="1" />
        <!-- Vertical weaves -->
        <path d="M 40 40 Q 45 60 48 78" fill="none" stroke="#b08a63" stroke-width="1" />
        <path d="M 65 38 Q 65 60 65 78" fill="none" stroke="#b08a63" stroke-width="1" />
        <path d="M 90 40 Q 85 60 82 78" fill="none" stroke="#b08a63" stroke-width="1" />
        <!-- Cushion -->
        <ellipse cx="65" cy="74" rx="30" ry="8" fill="#ffffff" opacity="0.9" />
      </svg>
    `
  },
  {
    id: 'pendant-light',
    name: 'Brass Pendant Dome',
    category: 'lighting',
    price: 280,
    rooms: ['living', 'kitchen'],
    description: 'Brushed brass dome lamp casting a warm glow.',
    position: { top: '0px', left: '42%', width: '100px', height: '220px' },
    svg: `
      <svg viewBox="0 0 100 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Thin Cord -->
        <line x1="50" y1="0" x2="50" y2="130" stroke="#1e1e1e" stroke-width="2" />
        <!-- Bulb glow (Conditional layer style could enhance this) -->
        <circle cx="50" cy="148" r="28" fill="#ffeeb3" opacity="0.6" filter="blur(6px)" />
        <circle cx="50" cy="148" r="14" fill="#fff5d6" opacity="0.95" />
        <!-- Brass Dome Shade -->
        <path d="M 20 140 C 20 110, 80 110, 80 140 Z" fill="#d4af37" stroke="#b3922e" stroke-width="1" />
        <!-- Shadow Trim inside shade -->
        <path d="M 20 140 A 30 10 0 0 0 80 140 A 30 10 0 0 0 20 140 Z" fill="#b3922e" opacity="0.3" />
        <!-- Glow ray lines -->
        <line x1="50" y1="165" x2="50" y2="190" stroke="#ffd043" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.7" />
        <line x1="32" y1="160" x2="15" y2="178" stroke="#ffd043" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.7" />
        <line x1="68" y1="160" x2="85" y2="178" stroke="#ffd043" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.7" />
      </svg>
    `
  },
  {
    id: 'ficus-tree',
    name: 'Fiddle Leaf Fig',
    category: 'plants',
    price: 180,
    rooms: ['living', 'bedroom'],
    description: 'Lush green indoor tree in a textured plaster pot.',
    position: { bottom: '15%', left: '8%', width: '110px', height: '170px' },
    svg: `
      <svg viewBox="0 0 110 170" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="55" cy="162" rx="25" ry="5" fill="rgba(0,0,0,0.12)" filter="blur(1.5px)" />
        <!-- Ceramic Pot -->
        <path d="M 38 120 L 72 120 L 67 160 L 43 160 Z" fill="#ece9e2" stroke="#d5cfc5" stroke-width="2" />
        <ellipse cx="55" cy="120" rx="17" ry="3" fill="#695f54" />
        <!-- Plant Stem -->
        <path d="M 55 120 Q 52 70 58 25" fill="none" stroke="#6b5843" stroke-width="4.5" stroke-linecap="round" />
        <path d="M 54 90 Q 30 80 25 72" fill="none" stroke="#6b5843" stroke-width="3" />
        <path d="M 56 70 Q 80 60 85 52" fill="none" stroke="#6b5843" stroke-width="3" />
        <!-- Leaves -->
        <!-- Leaf 1 (Top) -->
        <path d="M 58 25 C 50 10, 66 10, 58 25 Z" fill="#3c5f43" stroke="#2a4530" stroke-width="1" />
        <path d="M 58 25 C 48 0, 68 0, 58 25" fill="#4a7051" />
        <!-- Leaf 2 (Left High) -->
        <path d="M 54 45 C 32 30, 36 55, 54 45" fill="#44664b" stroke="#2d4834" stroke-width="1" />
        <!-- Leaf 3 (Right High) -->
        <path d="M 57 55 C 80 40, 84 65, 57 55" fill="#3c5f43" stroke="#2d4834" stroke-width="1" />
        <!-- Leaf 4 (Left Low) -->
        <path d="M 25 72 C 10 55, 12 85, 25 72" fill="#4a7051" stroke="#2d4834" stroke-width="1" />
        <!-- Leaf 5 (Right Low) -->
        <path d="M 85 52 C 105 38, 102 68, 85 52" fill="#3c5f43" stroke="#2d4834" stroke-width="1" />
        <!-- Leaf 6 (Bottom Left) -->
        <path d="M 50 98 C 28 85, 34 110, 50 98" fill="#44664b" stroke="#2d4834" stroke-width="1" />
      </svg>
    `
  },
  {
    id: 'abstract-art',
    name: 'Japandi Gallery Frame',
    category: 'plants', // Using plants/decor category
    price: 195,
    rooms: ['living', 'bedroom'],
    description: 'Minimalist abstract giclee print with oak frame.',
    position: { top: '80px', left: '26%', width: '90px', height: '110px' },
    svg: `
      <svg viewBox="0 0 90 110" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Frame Shadow -->
        <rect x="4" y="4" width="84" height="104" fill="rgba(0,0,0,0.08)" rx="1" filter="blur(2px)" />
        <!-- Oak Frame -->
        <rect x="0" y="0" width="86" height="106" fill="#c3a382" stroke="#ab8c6d" stroke-width="1.5" rx="2" />
        <!-- Mat Board -->
        <rect x="6" y="6" width="74" height="94" fill="#fcfbf7" />
        <!-- Artwork Canvas Area -->
        <rect x="14" y="14" width="58" height="78" fill="#f0ebe1" />
        <!-- Abstract Shapes -->
        <circle cx="38" cy="42" r="16" fill="#c27d66" opacity="0.85" />
        <path d="M 24 74 C 24 55, 62 55, 62 74 Z" fill="#4c5c56" opacity="0.9" />
        <line x1="20" y1="35" x2="68" y2="55" stroke="#222" stroke-width="1" opacity="0.6" />
      </svg>
    `
  },

  // BEDROOM ACCESSORIES
  {
    id: 'platform-bed',
    name: 'Nordic Platform Bed',
    category: 'furniture',
    price: 1100,
    rooms: ['bedroom'],
    description: 'Solid ash platform bed with tailored linen upholstery.',
    position: { bottom: '15%', left: '15%', width: '310px', height: '135px' },
    svg: `
      <svg viewBox="0 0 310 135" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Floor Shadow -->
        <rect x="15" y="120" width="280" height="10" rx="5" fill="rgba(0,0,0,0.12)" filter="blur(2px)" />
        <!-- Wooden Base Frame & Legs -->
        <rect x="18" y="112" width="274" height="12" fill="#bc9c7c" rx="2" />
        <line x1="30" y1="124" x2="25" y2="134" stroke="#bc9c7c" stroke-width="6" stroke-linecap="round" />
        <line x1="280" y1="124" x2="285" y2="134" stroke="#bc9c7c" stroke-width="6" stroke-linecap="round" />
        <!-- Mattress and Sheets -->
        <rect x="25" y="62" width="260" height="50" rx="8" fill="#f2efe9" stroke="#dfdad1" stroke-width="1.5" />
        <!-- Folded Duvet Cover -->
        <path d="M 25 80 L 285 80 L 285 112 Q 285 114 283 114 L 27 114 Q 25 114 25 112 Z" fill="#dfdad1" />
        <!-- Duvet fold detail -->
        <rect x="25" y="76" width="260" height="8" fill="#eae5db" />
        <!-- Pillows -->
        <rect x="40" y="34" width="95" height="32" rx="6" fill="#ffffff" stroke="#dfdad1" stroke-width="1.5" />
        <rect x="175" y="34" width="95" height="32" rx="6" fill="#ffffff" stroke="#dfdad1" stroke-width="1.5" />
        <!-- Headboard (Back wall mount mock) -->
        <rect x="30" y="12" width="250" height="50" rx="4" fill="#a4b2a3" opacity="0.3" />
        <!-- Throw blanket draping -->
        <path d="M 160 80 L 270 80 Q 285 80 285 95 L 285 112 L 255 112 L 160 80 Z" fill="#697b69" opacity="0.85" />
      </svg>
    `
  },
  {
    id: 'bedside-table',
    name: 'Floating Bedside Table',
    category: 'furniture',
    price: 240,
    rooms: ['bedroom'],
    description: 'Clean circular floating bedside drawer.',
    position: { bottom: '18%', right: '12%', width: '90px', height: '110px' },
    svg: `
      <svg viewBox="0 0 90 110" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Floating Shadow -->
        <rect x="10" y="90" width="70" height="6" fill="rgba(0,0,0,0.1)" rx="3" filter="blur(2.5px)" />
        <!-- Drawer Body -->
        <rect x="5" y="45" width="80" height="40" rx="8" fill="#ece9e2" stroke="#d5cfc5" stroke-width="1.5" />
        <line x1="5" y1="65" x2="85" y2="65" stroke="#d5cfc5" stroke-width="1" />
        <!-- Metal Drawer pull -->
        <circle cx="45" cy="55" r="3" fill="#2c2c2c" />
        <circle cx="45" cy="75" r="3" fill="#2c2c2c" />
        <!-- Table Lamp sitting on top -->
        <path d="M 35 45 L 55 45 L 50 25 L 40 25 Z" fill="#cfcfc7" />
        <rect x="43" y="25" width="4" height="20" fill="#2c2c2c" />
        <!-- Shade -->
        <path d="M 30 25 L 60 25 L 65 5 L 25 5 Z" fill="#fff8e7" stroke="#ebe4d5" stroke-width="1" />
      </svg>
    `
  },
  {
    id: 'globe-sconce',
    name: 'Opal Globe Sconce',
    category: 'lighting',
    price: 155,
    rooms: ['bedroom'],
    description: 'Minimal brass wall sconce with sandblasted glass shade.',
    position: { top: '90px', left: '10%', width: '60px', height: '80px' },
    svg: `
      <svg viewBox="0 0 60 80" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Wall fixture base -->
        <circle cx="20" cy="40" r="10" fill="#c3a382" />
        <!-- Curved arm -->
        <path d="M 20 40 Q 35 40 35 30" fill="none" stroke="#c3a382" stroke-width="5" stroke-linecap="round" />
        <!-- Glow backplate -->
        <circle cx="35" cy="22" r="18" fill="#fff" opacity="0.6" filter="blur(4px)" />
        <!-- Globe shade -->
        <circle cx="35" cy="22" r="12" fill="#fffefe" stroke="#eaeaea" stroke-width="1" />
      </svg>
    `
  },

  // KITCHEN ACCESSORIES
  {
    id: 'kitchen-island',
    name: 'Marble Island Counter',
    category: 'furniture',
    price: 1450,
    rooms: ['kitchen'],
    description: 'Calacatta marble island block with solid wood cabinets.',
    position: { bottom: '15%', left: '15%', width: '310px', height: '140px' },
    svg: `
      <svg viewBox="0 0 310 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <rect x="10" y="130" width="290" height="8" rx="4" fill="rgba(0,0,0,0.12)" filter="blur(2px)" />
        <!-- Main Cabinets block (Wood) -->
        <rect x="15" y="45" width="280" height="88" fill="#8e7e72" rx="4" />
        <!-- Drawer divisions -->
        <line x1="108" y1="45" x2="108" y2="133" stroke="#716257" stroke-width="1.5" />
        <line x1="202" y1="45" x2="202" y2="133" stroke="#716257" stroke-width="1.5" />
        <!-- Minimal handles -->
        <rect x="95" y="55" width="3" height="15" rx="1" fill="#c3a382" />
        <rect x="188" y="55" width="3" height="15" rx="1" fill="#c3a382" />
        <rect x="282" y="55" width="3" height="15" rx="1" fill="#c3a382" />
        <!-- Marble Countertop -->
        <rect x="8" y="33" width="294" height="14" fill="#f5f5f5" rx="2" stroke="#e0e0e0" stroke-width="1" />
        <!-- Marble Veins -->
        <path d="M 25 36 Q 40 40 50 35 T 75 42" fill="none" stroke="#dcdcdc" stroke-width="1.5" />
        <path d="M 125 35 Q 140 45 155 35 T 195 44" fill="none" stroke="#e2e2e2" stroke-width="1.2" />
        <path d="M 225 38 Q 235 34 250 42" fill="none" stroke="#dcdcdc" stroke-width="1.5" />
        <!-- Decorative bowl on counter -->
        <path d="M 140 33 C 140 23, 170 23, 170 33 Z" fill="#bfad9b" />
        <!-- Mock fruit in bowl -->
        <circle cx="150" cy="27" r="4.5" fill="#e9a456" />
        <circle cx="158" cy="26" r="5" fill="#e9a456" />
      </svg>
    `
  },
  {
    id: 'bar-stool',
    name: 'Leather Bar Stool',
    category: 'furniture',
    price: 290,
    rooms: ['kitchen'],
    description: 'Saddle leather upholstered stool with steel legs.',
    position: { bottom: '15%', right: '15%', width: '80px', height: '120px' },
    svg: `
      <svg viewBox="0 0 80 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Floor Shadow -->
        <ellipse cx="40" cy="115" rx="28" ry="4" fill="rgba(0,0,0,0.1)" filter="blur(1px)" />
        <!-- Metal Legs -->
        <line x1="25" y1="65" x2="18" y2="114" stroke="#222" stroke-width="3" stroke-linecap="round" />
        <line x1="55" y1="65" x2="62" y2="114" stroke="#222" stroke-width="3" stroke-linecap="round" />
        <line x1="32" y1="65" x2="28" y2="114" stroke="#444" stroke-width="2" />
        <line x1="48" y1="65" x2="52" y2="114" stroke="#444" stroke-width="2" />
        <!-- Circular Footrest ring -->
        <ellipse cx="40" cy="98" rx="18" ry="4" fill="none" stroke="#222" stroke-width="2.5" />
        <!-- Wood seat support -->
        <rect x="23" y="60" width="34" height="6" fill="#8e7e72" rx="1" />
        <!-- Leather Cushion Saddle curve -->
        <path d="M 18 52 C 18 64, 62 64, 62 52 C 62 42, 18 42, 18 52 Z" fill="#9e623b" stroke="#7e4825" stroke-width="1" />
        <!-- Saddle Stitch detail -->
        <path d="M 23 50 Q 40 56 57 50" fill="none" stroke="#7e4825" stroke-width="1.5" stroke-dasharray="2 2" />
      </svg>
    `
  },
  {
    id: 'herbs-planter',
    name: 'Concrete Herb Planter',
    category: 'plants',
    price: 110,
    rooms: ['kitchen'],
    description: 'Rustic concrete herb tray with fresh organic rosemary.',
    position: { bottom: '15%', left: '5%', width: '80px', height: '110px' },
    svg: `
      <svg viewBox="0 0 80 110" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="40" cy="106" rx="20" ry="4" fill="rgba(0,0,0,0.1)" filter="blur(1px)" />
        <!-- Concrete pot -->
        <rect x="20" y="80" width="40" height="25" fill="#b0b5b2" stroke="#999f9c" stroke-width="1.5" rx="2" />
        <ellipse cx="40" cy="80" rx="20" ry="2" fill="#5f6260" />
        <!-- Rosemary herbs -->
        <!-- Stem 1 -->
        <path d="M 32 80 Q 22 50 18 35" fill="none" stroke="#4a7356" stroke-width="3" stroke-linecap="round" />
        <path d="M 25 65 L 15 60 M 23 52 L 12 48 M 20 42 L 12 36" fill="none" stroke="#4a7356" stroke-width="2.5" stroke-linecap="round" />
        <!-- Stem 2 -->
        <path d="M 40 80 Q 42 42 45 28" fill="none" stroke="#538260" stroke-width="3.5" stroke-linecap="round" />
        <path d="M 41 62 L 52 58 M 43 48 L 54 42 M 44 38 L 54 32" fill="none" stroke="#538260" stroke-width="2.5" stroke-linecap="round" />
        <!-- Stem 3 -->
        <path d="M 48 80 Q 58 52 64 38" fill="none" stroke="#4a7356" stroke-width="3" stroke-linecap="round" />
        <path d="M 53 66 L 63 62 M 56 54 L 66 48 M 60 44 L 68 38" fill="none" stroke="#4a7356" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `
  }
];
