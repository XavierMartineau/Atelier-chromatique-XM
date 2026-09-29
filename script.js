document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`colors.json?version=${Date.now()}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Impossible de charger colors.json");
  const paletteData = await response.json();
  const paletteList = document.querySelector("#palette-list");
  const navLinks = document.querySelector(".nav-links");
  const categoryDefinitions = [
    { id: "jewel", fr: "Bijoux", en: "Jewel", hue: 345 },
    { id: "metallic", fr: "Métalliques", en: "Metallic", hue: 210 },
    { id: "pastel", fr: "Pastels", en: "Pastel", hue: 35 },
    { id: "other", fr: "Autres", en: "Other", hue: 270 },
    { id: "ocean", fr: "Océans", en: "Oceans", hue: 195 },
    { id: "forest", fr: "Forêts", en: "Forest", hue: 125 },
    { id: "sunset", fr: "Couchers de soleil", en: "Sunset", hue: 18 },
    { id: "neon", fr: "Néons", en: "Neon", hue: 285 },
    { id: "earth", fr: "Terres", en: "Earth", hue: 28 },
    { id: "monochrome", fr: "Monochromes", en: "Monochrome", hue: 220 },
    { id: "retro", fr: "Rétro", en: "Retro", hue: 55 },
    { id: "floral", fr: "Floraux", en: "Floral", hue: 310 },
  ];
  const paletteLabels = Object.fromEntries(
    categoryDefinitions.map((category, index) => [
      category.id,
      {
        fr: `Palette ${index + 1} : ${category.fr}`,
        en: `Palette ${index + 1}: ${category.en}`,
      },
    ]),
  );
  const navGroups = [
    {
      fr: "Ambiances",
      en: "Moods",
      categories: ["jewel", "sunset", "neon", "retro"],
    },
    {
      fr: "Nature",
      en: "Nature",
      categories: ["ocean", "forest", "earth", "floral"],
    },
    {
      fr: "Styles",
      en: "Styles",
      categories: ["metallic", "pastel", "monochrome", "other"],
    },
  ];
  const generatedNames = {
    jewel: {
      colors: [
        "Ruby",
        "Garnet",
        "Crimson",
        "Burgundy",
        "Sapphire",
        "Cobalt",
        "Amethyst",
        "Violet",
        "Emerald",
        "Jade",
        "Malachite",
        "Turquoise",
        "Obsidian",
        "Onyx",
        "Raspberry",
        "Plum",
        "Wine",
        "Topaz",
        "Citrine",
        "Peridot",
      ],
      modifiers: [
        "Royal",
        "Velvet",
        "Deep",
        "Lustrous",
        "Regal",
        "Rich",
        "Midnight",
        "Burnished",
        "Vivid",
        "Dark",
        "Radiant",
        "Imperial",
        "Saturated",
        "Classic",
        "Jewel",
        "Bold",
        "Majestic",
        "Brilliant",
        "Dramatic",
        "Luxe",
      ],
    },
    metallic: {
      colors: [
        "Silver",
        "Platinum",
        "Chrome",
        "Steel",
        "Titanium",
        "Gold",
        "Brass",
        "Bronze",
        "Copper",
        "Rose Gold",
        "Pewter",
        "Iron",
        "Graphite",
        "Mercury",
        "Nickel",
        "Aluminium",
        "Tin",
        "Gunmetal",
        "Champagne",
        "Copper",
      ],
      modifiers: [
        "Polished",
        "Antique",
        "Brushed",
        "Liquid",
        "Soft",
        "Warm",
        "Cool",
        "Aged",
        "Satin",
        "Hammered",
        "Matte",
        "Gleaming",
        "Forged",
        "Classic",
        "Refined",
        "Burnished",
        "Industrial",
        "Luminous",
        "Smoked",
        "Luxury",
      ],
    },
    pastel: {
      colors: [
        "Blush",
        "Rose",
        "Peach",
        "Apricot",
        "Lemon",
        "Buttercup",
        "Mint",
        "Sage",
        "Seafoam",
        "Powder Blue",
        "Sky Blue",
        "Periwinkle",
        "Lilac",
        "Lavender",
        "Orchid",
        "Cream",
        "Ivory",
        "Vanilla",
        "Pistachio",
        "Mauve",
      ],
      modifiers: [
        "Soft",
        "Powder",
        "Dreamy",
        "Delicate",
        "Gentle",
        "Airy",
        "Whisper",
        "Pale",
        "Light",
        "Tender",
        "Cloud",
        "Frosted",
        "Misty",
        "Calm",
        "Fresh",
        "Subtle",
        "Quiet",
        "Spring",
        "Sweet",
        "Barely There",
      ],
    },
    other: {
      colors: [
        "Coral",
        "Terracotta",
        "Ochre",
        "Saffron",
        "Mustard",
        "Teal",
        "Denim",
        "Indigo",
        "Mauve",
        "Plum",
        "Charcoal",
        "Slate",
        "Olive",
        "Khaki",
        "Sand",
        "Taupe",
        "Cocoa",
        "Espresso",
        "Snow",
        "Ink",
      ],
      modifiers: [
        "Warm",
        "Cool",
        "Muted",
        "Dusty",
        "Natural",
        "Earthy",
        "Urban",
        "Coastal",
        "Rustic",
        "Modern",
        "Smoky",
        "Weathered",
        "Soft",
        "Deep",
        "Neutral",
        "Classic",
        "Sunlit",
        "Shadow",
        "Dusk",
        "Dawn",
      ],
    },
    ocean: {
      colors: [
        "Lagoon",
        "Aqua",
        "Turquoise",
        "Teal",
        "Sea Glass",
        "Azure",
        "Cerulean",
        "Cyan",
        "Harbor",
        "Navy",
        "Marine",
        "Atlantic",
        "Pacific",
        "Tidepool",
        "Wave",
        "Reef",
        "Deep Sea",
        "Foam",
        "Driftwood",
        "Seashell",
      ],
      modifiers: [
        "Calm",
        "Deep",
        "Tropical",
        "Coastal",
        "Crystal",
        "Stormy",
        "Clear",
        "Sunlit",
        "Moonlit",
        "Saltwater",
        "Misty",
        "Open",
        "Cold",
        "Wild",
        "Silent",
        "Blue",
        "Rolling",
        "Hidden",
        "Shimmering",
        "Endless",
      ],
    },
    forest: {
      colors: [
        "Pine",
        "Moss",
        "Fern",
        "Basil",
        "Sage",
        "Olive",
        "Laurel",
        "Juniper",
        "Cedar",
        "Spruce",
        "Evergreen",
        "Meadow",
        "Moss",
        "Lichen",
        "Willow",
        "Clover",
        "Bamboo",
        "Avocado",
        "Leaf",
        "Canopy",
      ],
      modifiers: [
        "Ancient",
        "Wild",
        "Deep",
        "Misty",
        "Hidden",
        "Quiet",
        "Forest",
        "Woodland",
        "Fresh",
        "Shadow",
        "Sunlit",
        "Rainy",
        "Natural",
        "Verdant",
        "Mossy",
        "Cool",
        "Earthy",
        "Whispering",
        "Secret",
        "Twilight",
      ],
    },
    sunset: {
      colors: [
        "Coral",
        "Tangerine",
        "Peach",
        "Apricot",
        "Papaya",
        "Orange",
        "Vermilion",
        "Scarlet",
        "Flame",
        "Rose",
        "Magenta",
        "Fuchsia",
        "Blush",
        "Honey",
        "Amber",
        "Gold",
        "Sienna",
        "Rust",
        "Mauve",
        "Twilight",
      ],
      modifiers: [
        "Golden",
        "Burning",
        "Last Light",
        "Evening",
        "Summer",
        "Desert",
        "Horizon",
        "Warm",
        "Glowing",
        "Dusk",
        "Radiant",
        "Skyline",
        "Afterglow",
        "Blazing",
        "Soft",
        "Copper",
        "Vivid",
        "Clouded",
        "Fading",
        "Twilight",
      ],
    },
    neon: {
      colors: [
        "Electric Blue",
        "Laser Cyan",
        "Aqua",
        "Lime",
        "Chartreuse",
        "Acid Green",
        "Yellow",
        "Orange",
        "Hot Orange",
        "Red",
        "Hot Pink",
        "Fuchsia",
        "Magenta",
        "Purple",
        "Violet",
        "Ultraviolet",
        "Laser Blue",
        "Mint",
        "Toxic Green",
        "Plasma",
      ],
      modifiers: [
        "Electric",
        "Hyper",
        "Laser",
        "Cyber",
        "Glow",
        "Ultra",
        "Vivid",
        "Acid",
        "Digital",
        "Radiant",
        "Fluorescent",
        "Arcade",
        "Future",
        "Pulse",
        "Hyperlight",
        "Nightlife",
        "Charged",
        "Synthetic",
        "High Voltage",
        "Cosmic",
      ],
    },
    earth: {
      colors: [
        "Sand",
        "Beige",
        "Camel",
        "Caramel",
        "Ochre",
        "Clay",
        "Terracotta",
        "Rust",
        "Brick",
        "Canyon",
        "Umber",
        "Sienna",
        "Chestnut",
        "Walnut",
        "Bark",
        "Mushroom",
        "Stone",
        "Granite",
        "Dust",
        "Soil",
      ],
      modifiers: [
        "Desert",
        "Natural",
        "Dry",
        "Sunbaked",
        "Warm",
        "Raw",
        "Rustic",
        "Hearth",
        "Autumn",
        "Mountain",
        "Canyon",
        "Clay",
        "Grounded",
        "Earthy",
        "Weathered",
        "Harvest",
        "Ancient",
        "Organic",
        "Quiet",
        "Wild",
      ],
    },
    monochrome: {
      colors: [
        "Snow",
        "Pearl",
        "Ivory",
        "Ash",
        "Silver",
        "Dove",
        "Pewter",
        "Smoke",
        "Slate",
        "Graphite",
        "Charcoal",
        "Ink",
        "Onyx",
        "Obsidian",
        "Black",
        "White",
        "Fog",
        "Cloud",
        "Stone",
        "Shadow",
      ],
      modifiers: [
        "Soft",
        "Cool",
        "Warm",
        "Pale",
        "Deep",
        "Muted",
        "Quiet",
        "Misty",
        "Smooth",
        "Classic",
        "Modern",
        "Velvet",
        "Matte",
        "Polished",
        "Smoky",
        "Dramatic",
        "Minimal",
        "Clean",
        "Gentle",
        "True",
      ],
    },
    retro: {
      colors: [
        "Avocado",
        "Mustard",
        "Harvest Gold",
        "Burnt Orange",
        "Pumpkin",
        "Rust",
        "Brick",
        "Coral",
        "Salmon",
        "Dusty Rose",
        "Mauve",
        "Lavender",
        "Teal",
        "Petrol",
        "Denim",
        "Olive",
        "Pistachio",
        "Cream",
        "Cocoa",
        "Chocolate",
      ],
      modifiers: [
        "Vintage",
        "Classic",
        "Faded",
        "Old School",
        "70s",
        "Midcentury",
        "Groovy",
        "Nostalgic",
        "Muted",
        "Warm",
        "Dusty",
        "Analog",
        "Sunday",
        "Record Shop",
        "Velvet",
        "Folk",
        "Retro",
        "Golden Age",
        "Throwback",
        "Heritage",
      ],
    },
    floral: {
      colors: [
        "Rose",
        "Peony",
        "Fuchsia",
        "Magenta",
        "Orchid",
        "Lilac",
        "Lavender",
        "Violet",
        "Iris",
        "Poppy",
        "Dahlia",
        "Tulip",
        "Marigold",
        "Buttercup",
        "Daffodil",
        "Jasmine",
        "Mint",
        "Sage",
        "Petal",
        "Blossom",
      ],
      modifiers: [
        "Wild",
        "Spring",
        "Garden",
        "Fresh",
        "Soft",
        "Tropical",
        "Delicate",
        "Blooming",
        "Fragrant",
        "Morning",
        "Botanical",
        "Dewy",
        "Pastel",
        "Velvet",
        "Secret",
        "Summer",
        "Meadow",
        "Romantic",
        "Petal",
        "Enchanted",
      ],
    },
  };
  const standardColorNames = [
    ["Black", "#000000"],
    ["White", "#FFFFFF"],
    ["Red", "#FF0000"],
    ["Green", "#008000"],
    ["Blue", "#0000FF"],
    ["Yellow", "#FFFF00"],
    ["Cyan", "#00FFFF"],
    ["Magenta", "#FF00FF"],
    ["Orange", "#FFA500"],
    ["Purple", "#800080"],
    ["Pink", "#FFC0CB"],
    ["Brown", "#A52A2A"],
    ["Gray", "#808080"],
    ["Silver", "#C0C0C0"],
    ["Gold", "#FFD700"],
    ["Navy", "#000080"],
    ["Teal", "#008080"],
    ["Olive", "#808000"],
    ["Maroon", "#800000"],
    ["Lime", "#00FF00"],
    ["Aqua", "#00FFFF"],
    ["Fuchsia", "#FF00FF"],
    ["Crimson", "#DC143C"],
    ["Coral", "#FF7F50"],
    ["Salmon", "#FA8072"],
    ["Tomato", "#FF6347"],
    ["Chocolate", "#D2691E"],
    ["Tan", "#D2B48C"],
    ["Beige", "#F5F5DC"],
    ["Khaki", "#F0E68C"],
    ["Lavender", "#E6E6FA"],
    ["Violet", "#EE82EE"],
    ["Indigo", "#4B0082"],
    ["Orchid", "#DA70D6"],
    ["Plum", "#DDA0DD"],
    ["Turquoise", "#40E0D0"],
    ["Aquamarine", "#7FFFD4"],
    ["SkyBlue", "#87CEEB"],
    ["RoyalBlue", "#4169E1"],
    ["SteelBlue", "#4682B4"],
    ["ForestGreen", "#228B22"],
    ["SeaGreen", "#2E8B57"],
    ["DarkGreen", "#006400"],
    ["DarkRed", "#8B0000"],
    ["DarkOrange", "#FF8C00"],
    ["DarkBlue", "#00008B"],
    ["MidnightBlue", "#191970"],
    ["RebeccaPurple", "#663399"],
    ["Chartreuse", "#7FFF00"],
  ];
  const hexToRgb = (hex) =>
    hex
      .slice(1)
      .match(/.{2}/g)
      .map((channel) => parseInt(channel, 16));
  const nearestStandardColorName = (hex) => {
    const [red, green, blue] = hexToRgb(hex);
    return standardColorNames.reduce(
      (nearest, [name, standardHex]) => {
        const [standardRed, standardGreen, standardBlue] =
          hexToRgb(standardHex);
        const distance =
          (red - standardRed) ** 2 +
          (green - standardGreen) ** 2 +
          (blue - standardBlue) ** 2;
        return distance < nearest.distance ? { name, distance } : nearest;
      },
      { name: "Black", distance: Number.POSITIVE_INFINITY },
    ).name;
  };
  const generatedHex = (hue, saturation, lightness) => {
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const section = hue / 60;
    const x = chroma * (1 - Math.abs((section % 2) - 1));
    const match = lightness - chroma / 2;
    const rgb =
      section < 1
        ? [chroma, x, 0]
        : section < 2
          ? [x, chroma, 0]
          : section < 3
            ? [0, chroma, x]
            : section < 4
              ? [0, x, chroma]
              : section < 5
                ? [x, 0, chroma]
                : [chroma, 0, x];
    return `#${rgb
      .map((value) =>
        Math.round((value + match) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")}`.toUpperCase();
  };
  const baseColorCount = paletteData.length;
  const targetColorCount = 1000;
  for (let index = baseColorCount; index < targetColorCount; index += 1) {
    const category = categoryDefinitions[index % categoryDefinitions.length];
    const sequence = Math.floor(
      (index - baseColorCount) / categoryDefinitions.length,
    );
    const saturation =
      category.id === "monochrome" ? 6 + (sequence % 8) : 48 + (sequence % 38);
    const lightness =
      category.id === "neon" ? 42 + (sequence % 20) : 28 + (sequence % 48);
    const names = generatedNames[category.id];
    const colorName = names.colors[sequence % names.colors.length];
    const modifier =
      names.modifiers[
        Math.floor(sequence / names.colors.length) % names.modifiers.length
      ];
    const normalizedColorName = colorName.toLowerCase();
    const normalizedModifier = modifier.toLowerCase();
    paletteData.push({
      category: category.id,
      name:
        normalizedColorName === normalizedModifier ||
        normalizedColorName.startsWith(`${normalizedModifier} `)
          ? colorName
          : `${modifier} ${colorName}`,
      code: generatedHex(
        (category.hue + sequence * 11) % 360,
        saturation / 100,
        lightness / 100,
      ),
    });
  }
  const categoriesById = Object.fromEntries(
    categoryDefinitions.map((category) => [category.id, category]),
  );
  navLinks.innerHTML = `${navGroups
    .map(
      (group, groupIndex) => `<li class="nav-group">
        <button class="nav-group-toggle" type="button" aria-expanded="false" aria-controls="nav-submenu-${groupIndex}">
          <span data-fr="${group.fr}" data-en="${group.en}">${group.fr}</span><span aria-hidden="true">⌄</span>
        </button>
        <div class="nav-submenu" id="nav-submenu-${groupIndex}">
          ${group.categories
            .map((categoryId) => {
              const category = categoriesById[categoryId];
              return `<a href="#${category.id}" data-target=".colors.${category.id}" data-fr="${category.fr}" data-en="${category.en}">${category.fr}</a>`;
            })
            .join("")}
        </div>
      </li>`,
    )
    .join(
      "",
    )}<li><a href="#creative-tools" data-fr="Studio" data-en="Studio">Studio</a></li>`;
  const categoryFilter = document.querySelector("#category-filter");
  categoryFilter.innerHTML = `<option value="all" data-fr="Toutes" data-en="All">Toutes</option>${categoryDefinitions
    .map(
      (category) =>
        `<option value="${category.id}" data-fr="${category.fr}" data-en="${category.en}">${category.fr}</option>`,
    )
    .join("")}`;

  const colorsByCategory = Object.groupBy
    ? Object.groupBy(paletteData, (color) => color.category)
    : paletteData.reduce((groups, color) => {
        (groups[color.category] ||= []).push(color);
        return groups;
      }, {});
  Object.entries(paletteLabels).forEach(([category, labels]) => {
    const section = document.createElement("section");
    section.className = "palette";
    section.id = category;
    const title = document.createElement("h2");
    title.dataset.fr = labels.fr;
    title.dataset.en = labels.en;
    title.textContent = labels.fr;
    const colors = document.createElement("div");
    colors.className = `colors ${category}`;
    const colorFragment = document.createDocumentFragment();
    (colorsByCategory[category] || []).forEach(({ name, code }) => {
      const card = document.createElement("div");
      card.dataset.name = name;
      const codeElement = document.createElement("span");
      codeElement.dataset.code = code;
      codeElement.textContent = code;
      card.append(codeElement);
      colorFragment.append(card);
    });
    colors.append(colorFragment);
    section.append(title, colors);
    paletteList.append(section);
  });

  const cards = [...document.querySelectorAll(".colors > div")];
  const sections = [...document.querySelectorAll(".palette")];
  const search = document.querySelector("#color-search");
  const toast = document.querySelector("#toast");
  const favorites = new Set(
    JSON.parse(localStorage.getItem("palette-favorites") || "[]"),
  );
  let accountProfile = JSON.parse(
    localStorage.getItem("palette-account") || "null",
  );
  let accountSession = localStorage.getItem("palette-session");
  if (!accountProfile || accountProfile.username !== accountSession) {
    accountSession = null;
    localStorage.removeItem("palette-session");
  }
  let currentLanguage = localStorage.getItem("palette-language") || "fr";
  const manualSelection = new Map();
  let savedPalettes = JSON.parse(
    localStorage.getItem("palette-collections") || "[]",
  );
  let manualMode = false;
  let favoritesCollapsed = false;
  let toastTimer;

  const applyLanguage = (language) => {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-fr][data-en]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    const input = document.querySelector("#color-search");
    input.placeholder =
      input.dataset[`placeholder${language === "fr" ? "Fr" : "En"}`];
    document.querySelector("#language-toggle").textContent =
      language === "fr" ? "EN" : "FR";
    refreshAccountButton();
    localStorage.setItem("palette-language", language);
  };

  const refreshAccountButton = () => {
    const button = document.querySelector("#account-toggle");
    button.textContent =
      accountSession || (currentLanguage === "fr" ? "Se connecter" : "Sign in");
    button.title = accountSession
      ? currentLanguage === "fr"
        ? "Se déconnecter"
        : "Sign out"
      : currentLanguage === "fr"
        ? "Créer ou ouvrir un compte local"
        : "Create or open a local account";
  };

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = value;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
    }
    showToast(
      currentLanguage === "fr"
        ? `${value} copié dans le presse-papiers`
        : `${value} copied to clipboard`,
    );
  };

  const downloadFile = (filename, content, type) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const createAseFile = (colors) => {
    const bytes = [];
    const pushU16 = (value) => bytes.push((value >> 8) & 255, value & 255);
    const pushU32 = (value) =>
      bytes.push(
        (value >>> 24) & 255,
        (value >>> 16) & 255,
        (value >>> 8) & 255,
        value & 255,
      );
    const pushF32 = (value) =>
      new Uint8Array(new Float32Array([value]).buffer)
        .reverse()
        .forEach((byte) => bytes.push(byte));
    const pushText = (value) =>
      [...value].forEach((character) => pushU16(character.charCodeAt(0)));
    pushText("ASEF");
    pushU16(1);
    pushU16(0);
    pushU32(colors.length);
    colors.forEach((hex, index) => {
      const payload = [];
      const addU16 = (value) => payload.push((value >> 8) & 255, value & 255);
      const addF32 = (value) =>
        new Uint8Array(new Float32Array([value]).buffer)
          .reverse()
          .forEach((byte) => payload.push(byte));
      const name = `Palette ${index + 1}`;
      addU16(name.length + 1);
      [...name].forEach((character) => addU16(character.charCodeAt(0)));
      addU16(0);
      [..."RGB "].forEach((character) => addU16(character.charCodeAt(0)));
      addU16(0);
      const rgb = hex
        .slice(1)
        .match(/.{2}/g)
        .map((channel) => parseInt(channel, 16) / 255);
      addF32(rgb[0]);
      addF32(rgb[1]);
      addF32(rgb[2]);
      addU16(0);
      pushU16(0x0001);
      pushU32(payload.length);
      payload.forEach((byte) => bytes.push(byte));
    });
    return new Uint8Array(bytes);
  };

  const hexToHsl = (hex) => {
    const [red, green, blue] = hex
      .slice(1)
      .match(/.{2}/g)
      .map((channel) => parseInt(channel, 16) / 255);
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 0;
    if (delta) {
      if (max === red) hue = 60 * (((green - blue) / delta) % 6);
      else if (max === green) hue = 60 * ((blue - red) / delta + 2);
      else hue = 60 * ((red - green) / delta + 4);
    }
    if (hue < 0) hue += 360;
    const lightness = (max + min) / 2;
    const saturation =
      delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    return [hue, saturation * 100, lightness * 100];
  };

  const randomPalette = (mode = "random", lockedColors = []) => {
    const baseHue = Math.floor(Math.random() * 360);
    const offsets = {
      random: [0, 31, 62, 93, 124],
      analogous: [0, 20, 40, 60, 80],
      complementary: [0, 180, 30, 210, 330],
      triadic: [0, 120, 240, 60, 180],
      monochromatic: [0, 0, 0, 0, 0],
    }[mode] || [0, 31, 62, 93, 124];
    return Array.from({ length: 5 }, (_, index) => {
      if (lockedColors[index]) return lockedColors[index];
      const hue =
        (baseHue + offsets[index] + Math.floor(Math.random() * 10)) % 360;
      const saturation =
        mode === "monochromatic"
          ? 48 + index * 7
          : 54 + Math.floor(Math.random() * 29);
      const lightness =
        mode === "monochromatic"
          ? 28 + index * 11
          : 30 + Math.floor(Math.random() * 42);
      return hslToHex(hue, saturation, lightness);
    });
  };

  const hslToHex = (hue, saturation, lightness) => {
    saturation /= 100;
    lightness /= 100;
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const section = hue / 60;
    const x = chroma * (1 - Math.abs((section % 2) - 1));
    const match = lightness - chroma / 2;
    const rgb =
      section < 1
        ? [chroma, x, 0]
        : section < 2
          ? [x, chroma, 0]
          : section < 3
            ? [0, chroma, x]
            : section < 4
              ? [0, x, chroma]
              : section < 5
                ? [x, 0, chroma]
                : [chroma, 0, x];
    return `#${rgb
      .map((value) =>
        Math.round((value + match) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")}`.toUpperCase();
  };

  const contrastRatio = (foreground, background) => {
    const luminance = (hex) => {
      const channels = hex
        .slice(1)
        .match(/.{2}/g)
        .map((channel) => parseInt(channel, 16) / 255)
        .map((channel) =>
          channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4,
        );
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const light = luminance(foreground);
    const dark = luminance(background);
    return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
  };

  const updateContrast = () => {
    const foreground = document.querySelector("#contrast-foreground").value;
    const background = document.querySelector("#contrast-background").value;
    const ratio = contrastRatio(foreground, background);
    const status = document.querySelector("#contrast-status");
    const passesAA = ratio >= 4.5;
    const passesAAA = ratio >= 7;
    document.querySelector("#contrast-preview").style.color = foreground;
    document.querySelector("#contrast-preview").style.backgroundColor =
      background;
    document.querySelector("#contrast-ratio").textContent =
      `${ratio.toFixed(2)}:1`;
    status.textContent =
      currentLanguage === "fr"
        ? `${passesAAA ? "AAA" : passesAA ? "AA" : "À renforcer"} · ${passesAA ? "Texte courant OK" : "Choisis des teintes plus contrastées"}`
        : `${passesAAA ? "AAA" : passesAA ? "AA" : "Needs work"} · ${passesAA ? "Body text passes" : "Choose more contrasting shades"}`;
    status.className = passesAA ? "contrast-pass" : "contrast-fail";
  };

  document
    .querySelectorAll("#contrast-foreground, #contrast-background")
    .forEach((input) => input.addEventListener("input", updateContrast));
  document.querySelector("#swap-contrast").addEventListener("click", () => {
    const foreground = document.querySelector("#contrast-foreground");
    const background = document.querySelector("#contrast-background");
    [foreground.value, background.value] = [background.value, foreground.value];
    updateContrast();
  });

  const updateInspiration = () => {
    const preview = document.querySelector("#inspiration-preview");
    generatedColors.forEach((color, index) =>
      preview.style.setProperty(`--inspire-${index + 1}`, color),
    );
    preview.dataset.mode = document.querySelector("#inspiration-mode").value;
  };
  const updateAccessibility = () => {
    const passing = generatedColors.filter(
      (color) =>
        Math.max(
          contrastRatio(color, "#FFFFFF"),
          contrastRatio(color, "#000000"),
        ) >= 4.5,
    ).length;
    document.querySelector("#accessibility-summary").textContent =
      currentLanguage === "fr"
        ? `${passing}/5 couleurs ont un contraste AA avec du texte noir ou blanc.`
        : `${passing}/5 colors pass AA with black or white text.`;
  };
  document
    .querySelector("#inspiration-mode")
    .addEventListener("change", updateInspiration);
  document.querySelector("#vision-mode").addEventListener("change", (event) => {
    document.body.className = document.body.className.replace(
      /vision-\S+/g,
      "",
    );
    if (event.target.value !== "normal")
      document.body.classList.add(`vision-${event.target.value}`);
  });
  document
    .querySelector("#suggest-accessible")
    .addEventListener("click", () => {
      const color =
        generatedColors.find(
          (item) =>
            Math.max(
              contrastRatio(item, "#FFFFFF"),
              contrastRatio(item, "#000000"),
            ) >= 4.5,
        ) || "#16243B";
      copyText(color);
      showToast(
        currentLanguage === "fr"
          ? `Suggestion accessible : ${color}`
          : `Accessible suggestion: ${color}`,
      );
    });

  const renderColorStrip = (container, colors) => {
    const preview = container.querySelector(".image-preview");
    container.innerHTML = "";
    if (preview) container.append(preview);
    colors.forEach((color, index) => {
      const isGenerated = container.id === "generated-palette";
      const chip = document.createElement("button");
      chip.className = isGenerated ? "generated-color" : "image-color";
      chip.type = "button";
      chip.style.backgroundColor = color;
      chip.textContent = color;
      chip.title = isGenerated
        ? `Copier ${color}. Double-cliquer pour verrouiller.`
        : `Copier ${color}`;
      chip.addEventListener("click", () => copyText(color));
      if (isGenerated) {
        chip.classList.toggle("is-locked", Boolean(lockedGenerated[index]));
        chip.addEventListener("dblclick", (event) => {
          event.preventDefault();
          lockedGenerated[index] = lockedGenerated[index] ? null : color;
          chip.classList.toggle("is-locked", Boolean(lockedGenerated[index]));
          showToast(
            lockedGenerated[index]
              ? `Couleur ${index + 1} verrouillée`
              : `Couleur ${index + 1} libérée`,
          );
        });
      }
      container.append(chip);
    });
  };

  const renderManualPalette = () => {
    const container = document.querySelector("#manual-colors");
    container.innerHTML = "";
    if (!manualSelection.size) {
      container.innerHTML = `<span class="manual-empty">${currentLanguage === "fr" ? "Ta palette est vide" : "Your palette is empty"}</span>`;
      return;
    }
    manualSelection.forEach(({ name, code }) => {
      const chip = document.createElement("button");
      chip.className = "manual-chip";
      chip.type = "button";
      chip.draggable = true;
      chip.style.backgroundColor = code;
      chip.textContent = code;
      chip.title =
        currentLanguage === "fr" ? `Retirer ${name}` : `Remove ${name}`;
      chip.addEventListener("click", () => {
        manualSelection.delete(code);
        document.querySelectorAll(".colors > div").forEach((card) => {
          if (
            card.querySelector("[data-code]").dataset.code.toUpperCase() ===
            code
          )
            card.classList.remove("manual-selected");
        });
        renderManualPalette();
      });
      chip.addEventListener("dragstart", () => {
        chip.classList.add("is-dragging");
        draggedManualCode = code;
      });
      chip.addEventListener("dragend", () =>
        chip.classList.remove("is-dragging"),
      );
      chip.addEventListener("dragover", (event) => event.preventDefault());
      chip.addEventListener("drop", (event) => {
        event.preventDefault();
        const entries = [...manualSelection.entries()];
        const from = entries.findIndex(
          ([entryCode]) => entryCode === draggedManualCode,
        );
        const to = entries.findIndex(([entryCode]) => entryCode === code);
        if (from < 0 || to < 0 || from === to) return;
        const [moved] = entries.splice(from, 1);
        entries.splice(to, 0, moved);
        manualSelection.clear();
        entries.forEach(([entryCode, entry]) =>
          manualSelection.set(entryCode, entry),
        );
        renderManualPalette();
      });
      container.append(chip);
    });
  };

  let draggedManualCode = null;
  const renderSavedPalettes = () => {
    const wrapper = document.querySelector("#saved-palettes");
    const list = document.querySelector("#saved-palette-list");
    wrapper.hidden = savedPalettes.length === 0;
    list.innerHTML = "";
    savedPalettes.forEach((palette, index) => {
      const row = document.createElement("div");
      row.className = "saved-palette-row";
      const load = document.createElement("button");
      load.className = "saved-palette-preview";
      load.type = "button";
      load.style.background = `linear-gradient(90deg, ${palette.colors.map((color) => color.code).join(",")})`;
      load.textContent = palette.name;
      load.title = palette.notes || palette.name;
      load.addEventListener("click", () => {
        manualSelection.clear();
        palette.colors.forEach((color) =>
          manualSelection.set(color.code, color),
        );
        document.querySelectorAll(".colors > div").forEach((card) => {
          const code = card
            .querySelector("[data-code]")
            .dataset.code.toUpperCase();
          card.classList.toggle("manual-selected", manualSelection.has(code));
        });
        document.querySelector("#palette-name").value = palette.name;
        document.querySelector("#palette-notes").value = palette.notes || "";
        renderManualPalette();
        showToast(
          currentLanguage === "fr" ? "Palette chargée" : "Palette loaded",
        );
      });
      const remove = document.createElement("button");
      remove.className = "saved-palette-remove";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", "Supprimer la palette");
      remove.addEventListener("click", () => {
        savedPalettes.splice(index, 1);
        localStorage.setItem(
          "palette-collections",
          JSON.stringify(savedPalettes),
        );
        renderSavedPalettes();
      });
      row.append(load, remove);
      list.append(row);
    });
  };

  const renderFavorites = () => {
    const dock = document.querySelector("#favorites-dock");
    const container = document.querySelector("#favorite-colors");
    const count = document.querySelector("#favorites-count");
    const favoriteCards = cards.filter((card) =>
      favorites.has(card.dataset.favoriteKey),
    );
    dock.hidden = favoriteCards.length === 0;
    dock.classList.toggle(
      "is-collapsed",
      favoritesCollapsed && favoriteCards.length > 0,
    );
    count.textContent =
      currentLanguage === "fr"
        ? `${favoriteCards.length} couleur${favoriteCards.length > 1 ? "s" : ""}`
        : `${favoriteCards.length} color${favoriteCards.length > 1 ? "s" : ""}`;
    container.innerHTML = "";
    favoriteCards.forEach((card) => {
      const code = card.querySelector("[data-code]").dataset.code.toUpperCase();
      const chip = document.createElement("button");
      chip.className = "favorite-color";
      chip.type = "button";
      chip.style.backgroundColor = code;
      chip.textContent = code;
      chip.title =
        currentLanguage === "fr"
          ? `Supprimer ${code} des favoris`
          : `Remove ${code} from favorites`;
      chip.setAttribute("aria-label", chip.title);
      chip.addEventListener("click", () => {
        favorites.delete(card.dataset.favoriteKey);
        localStorage.setItem(
          "palette-favorites",
          JSON.stringify([...favorites]),
        );
        card.querySelector(".favorite-btn")?.classList.remove("is-favorite");
        renderFavorites();
        showToast(
          currentLanguage === "fr"
            ? `${code} supprimée des favoris`
            : `${code} removed from favorites`,
        );
      });
      container.append(chip);
    });
  };

  document.querySelector("#favorites-toggle").addEventListener("click", () => {
    favoritesCollapsed = !favoritesCollapsed;
    const dock = document.querySelector("#favorites-dock");
    const toggle = document.querySelector("#favorites-toggle");
    dock.classList.toggle("is-collapsed", favoritesCollapsed);
    toggle.setAttribute("aria-expanded", String(!favoritesCollapsed));
    toggle.setAttribute(
      "aria-label",
      favoritesCollapsed ? "Ouvrir les favoris" : "Fermer les favoris",
    );
    toggle.textContent = favoritesCollapsed ? "⌄" : "⌃";
  });

  const generatedPalette = document.querySelector("#generated-palette");
  const generatedGradient = document.querySelector("#generated-gradient");
  const harmonyMode = document.querySelector("#harmony-mode");
  const generatedHistory = document.querySelector("#generated-history");
  const historyList = document.querySelector("#history-list");
  let generatedColors = randomPalette();
  const lockedGenerated = [null, null, null, null, null];
  try {
    const sharedPalette = new URLSearchParams(location.hash.slice(1)).get(
      "palette",
    );
    if (sharedPalette) {
      const parsedPalette = JSON.parse(atob(sharedPalette));
      if (Array.isArray(parsedPalette) && parsedPalette.length === 5)
        generatedColors = parsedPalette;
    }
  } catch {
    // Ignore malformed shared palette links.
  }
  let paletteHistory = JSON.parse(
    localStorage.getItem("palette-history") || "[]",
  ).filter((palette) => Array.isArray(palette) && palette.length === 5);
  const renderGeneratedGradient = () => {
    generatedGradient.style.minHeight = "46px";
    generatedGradient.style.background = `linear-gradient(110deg, ${generatedColors.join(", ")})`;
  };
  const renderGeneratedHistory = () => {
    generatedHistory.hidden = paletteHistory.length === 0;
    historyList.innerHTML = "";
    paletteHistory.forEach((palette, index) => {
      const item = document.createElement("div");
      item.className = "history-item";
      const button = document.createElement("button");
      button.className = "history-palette";
      button.type = "button";
      button.style.background = `linear-gradient(110deg, ${palette.join(", ")})`;
      button.title = `${currentLanguage === "fr" ? "Restaurer" : "Restore"} ${palette.join(", ")}`;
      button.setAttribute(
        "aria-label",
        `${currentLanguage === "fr" ? "Restaurer la palette" : "Restore palette"} ${index + 1}`,
      );
      button.addEventListener("click", () => {
        generatedColors = [...palette];
        renderColorStrip(generatedPalette, generatedColors);
        renderGeneratedGradient();
        updateInspiration();
        updateAccessibility();
        showToast(
          currentLanguage === "fr" ? "Palette restaurée" : "Palette restored",
        );
      });
      const remove = document.createElement("button");
      remove.className = "history-remove";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute(
        "aria-label",
        currentLanguage === "fr"
          ? `Supprimer la palette ${index + 1}`
          : `Delete palette ${index + 1}`,
      );
      remove.title = remove.getAttribute("aria-label");
      remove.addEventListener("click", () => {
        paletteHistory.splice(index, 1);
        localStorage.setItem("palette-history", JSON.stringify(paletteHistory));
        renderGeneratedHistory();
        showToast(
          currentLanguage === "fr" ? "Palette supprimée" : "Palette deleted",
        );
      });
      item.append(button, remove);
      historyList.append(item);
    });
  };
  const rememberGeneratedPalette = (palette) => {
    paletteHistory = [
      palette,
      ...paletteHistory.filter((item) => item.join() !== palette.join()),
    ].slice(0, 5);
    localStorage.setItem("palette-history", JSON.stringify(paletteHistory));
    renderGeneratedHistory();
  };
  document.querySelector("#generate-palette").addEventListener("click", () => {
    generatedColors = randomPalette(harmonyMode.value, lockedGenerated);
    renderColorStrip(generatedPalette, generatedColors);
    renderGeneratedGradient();
    updateInspiration();
    updateAccessibility();
    rememberGeneratedPalette(generatedColors);
    showToast(
      currentLanguage === "fr"
        ? "Une nouvelle palette vient d’apparaître"
        : "A new palette just appeared",
    );
  });
  document
    .querySelector("#copy-generated-palette")
    .addEventListener("click", () => copyText(generatedColors.join("\n")));
  const exportTrigger = document.querySelector("#export-trigger");
  const exportOptions = document.querySelector("#export-options");
  const closeExportMenu = () => {
    exportOptions.hidden = true;
    exportTrigger.setAttribute("aria-expanded", "false");
  };
  exportTrigger.addEventListener("click", () => {
    exportOptions.hidden = !exportOptions.hidden;
    exportTrigger.setAttribute("aria-expanded", String(!exportOptions.hidden));
  });
  document.querySelectorAll("#export-options button").forEach((button) => {
    button.addEventListener("click", closeExportMenu);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".export-menu")) closeExportMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeExportMenu();
  });
  document
    .querySelector("#export-css-palette")
    .addEventListener("click", () => {
      const content = `:root {\n${generatedColors.map((color, index) => `  --color-${index + 1}: ${color};`).join("\n")}\n}\n`;
      downloadFile("ma-palette.css", content, "text/css");
      showToast(
        currentLanguage === "fr"
          ? "Variables CSS téléchargées"
          : "CSS variables downloaded",
      );
    });
  document
    .querySelector("#export-png-palette")
    .addEventListener("click", () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1400;
      canvas.height = 360;
      const context = canvas.getContext("2d");
      const width = canvas.width / generatedColors.length;
      generatedColors.forEach((color, index) => {
        context.fillStyle = color;
        context.fillRect(index * width, 0, width, canvas.height);
        context.fillStyle = "#FFFFFF";
        context.font = "700 24px sans-serif";
        context.fillText(color, index * width + 24, canvas.height - 28);
      });
      canvas.toBlob((blob) => {
        if (blob) downloadFile("ma-palette.png", blob, "image/png");
      }, "image/png");
      showToast(
        currentLanguage === "fr"
          ? "Palette PNG téléchargée"
          : "PNG palette downloaded",
      );
    });
  document
    .querySelector("#export-json-palette")
    .addEventListener("click", () => {
      downloadFile(
        "ma-palette.json",
        JSON.stringify(
          { name: "Atelier Chromatique", colors: generatedColors },
          null,
          2,
        ),
        "application/json",
      );
      showToast(
        currentLanguage === "fr"
          ? "Palette JSON téléchargée"
          : "JSON palette downloaded",
      );
    });
  document
    .querySelector("#export-tailwind-palette")
    .addEventListener("click", () => {
      const content = `export default {\n  theme: {\n    extend: {\n      colors: {\n        palette: {\n${generatedColors.map((color, index) => `          ${index + 1}: "${color}",`).join("\n")}\n        }\n      }\n    }\n  }\n};\n`;
      downloadFile("ma-palette.tailwind.js", content, "text/javascript");
      showToast(
        currentLanguage === "fr"
          ? "Palette Tailwind téléchargée"
          : "Tailwind palette downloaded",
      );
    });
  document
    .querySelector("#export-ase-palette")
    .addEventListener("click", () => {
      downloadFile(
        "ma-palette.ase",
        createAseFile(generatedColors),
        "application/octet-stream",
      );
      showToast(
        currentLanguage === "fr"
          ? "Palette ASE téléchargée"
          : "ASE palette downloaded",
      );
    });
  document
    .querySelector("#share-palette")
    .addEventListener("click", async () => {
      const encoded = btoa(JSON.stringify(generatedColors));
      const url = `${location.origin}${location.pathname}#palette=${encoded}`;
      if (navigator.share) await navigator.share({ title: "Ma palette", url });
      else await copyText(url);
      showToast(
        currentLanguage === "fr"
          ? "Lien de palette prêt à partager"
          : "Palette link ready to share",
      );
    });
  const gradientToggle = document.querySelector("#gradient-toggle");
  gradientToggle.addEventListener("click", () => {
    generatedGradient.hidden = !generatedGradient.hidden;
    gradientToggle.setAttribute(
      "aria-expanded",
      String(!generatedGradient.hidden),
    );
    if (!generatedGradient.hidden) renderGeneratedGradient();
  });
  renderColorStrip(generatedPalette, generatedColors);
  renderGeneratedGradient();
  updateInspiration();
  updateAccessibility();
  rememberGeneratedPalette(generatedColors);

  const imageInput = document.querySelector("#image-input");
  const imageResult = document.querySelector("#image-result");
  const imageColors = document.querySelector("#image-colors");
  const clearImage = document.querySelector("#clear-image");
  imageInput.addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 60;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0, size, size);
      const pixels = context.getImageData(0, 0, size, size).data;
      const buckets = new Map();
      for (let index = 0; index < pixels.length; index += 16) {
        if (pixels[index + 3] < 180) continue;
        const color = [pixels[index], pixels[index + 1], pixels[index + 2]].map(
          (value) => Math.round(value / 32) * 32,
        );
        const key = color.map((value) => Math.min(value, 255)).join(",");
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }
      const colors = [...buckets.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) =>
          `#${key
            .split(",")
            .map((value) => Number(value).toString(16).padStart(2, "0"))
            .join("")}`.toUpperCase(),
        );
      while (colors.length < 5) {
        colors.push(
          colors[colors.length % Math.max(colors.length, 1)] || "#000000",
        );
      }
      imageResult.classList.add("has-colors");
      clearImage.hidden = false;
      imageResult.innerHTML = `<img class="image-preview" src="${URL.createObjectURL(file)}" alt="Image importée" />`;
      renderColorStrip(imageColors, colors);
      showToast(
        currentLanguage === "fr"
          ? `${colors.length} couleurs extraites de l’image`
          : `${colors.length} colors extracted from the image`,
      );
    };
    image.src = URL.createObjectURL(file);
  });
  clearImage.addEventListener("click", () => {
    imageInput.value = "";
    clearImage.hidden = true;
    imageResult.classList.remove("has-colors");
    imageResult.innerHTML = `<span data-fr="Aucune image choisie pour le moment." data-en="No image selected yet.">${currentLanguage === "fr" ? "Aucune image choisie pour le moment." : "No image selected yet."}</span>`;
    imageColors.innerHTML = "";
  });

  cards.forEach((card, index) => {
    const name = card.dataset.name || "Couleur";
    const codeElement = card.querySelector("[data-code]");
    const code = codeElement.dataset.code.toUpperCase();
    const category = card.closest(".colors").classList[1];
    const [hue, saturation, lightness] = hexToHsl(code);
    card.dataset.category = category;
    card.dataset.hue = hue;
    card.dataset.saturation = saturation;
    card.dataset.lightness = lightness;
    card.dataset.contrast = Math.max(
      contrastRatio(code, "#FFFFFF"),
      contrastRatio(code, "#000000"),
    );
    card.style.backgroundColor = code;
    card.setAttribute("title", `Copier ${code}`);
    codeElement.textContent = code;
    codeElement.setAttribute("aria-label", `Code ${code}`);
    card.insertAdjacentHTML(
      "afterbegin",
      `<strong class="color-name">${name}</strong>`,
    );
    const favorite = document.createElement("button");
    favorite.className = "favorite-btn";
    favorite.type = "button";
    favorite.setAttribute("aria-label", `Ajouter ${name} aux favoris`);
    favorite.textContent = "★";
    favorite.classList.toggle("is-favorite", favorites.has(`${name}-${code}`));
    card.append(favorite);
    card.dataset.index = index;
    card.dataset.favoriteKey = `${name}-${code}`;
    card.style.setProperty("--card-index", index % 12);
  });
  paletteList.addEventListener("click", (event) => {
    const card = event.target.closest(".colors > div");
    if (!card || !paletteList.contains(card)) return;
    const code = card.querySelector("[data-code]").dataset.code.toUpperCase();
    const name = card.dataset.name || "Couleur";
    const favorite = event.target.closest(".favorite-btn");
    if (favorite) {
      const key = `${name}-${code}`;
      if (favorites.has(key)) favorites.delete(key);
      else favorites.add(key);
      favorite.classList.toggle("is-favorite", favorites.has(key));
      localStorage.setItem("palette-favorites", JSON.stringify([...favorites]));
      renderFavorites();
      showToast(
        favorites.has(key)
          ? `${name} ajouté aux favoris`
          : `${name} retiré des favoris`,
      );
      return;
    }
    if (manualMode) {
      if (manualSelection.has(code)) manualSelection.delete(code);
      else manualSelection.set(code, { name, code });
      card.classList.toggle("manual-selected", manualSelection.has(code));
      renderManualPalette();
      return;
    }
    copyText(code);
    card.classList.add("copied");
    setTimeout(() => card.classList.remove("copied"), 500);
  });
  renderFavorites();

  const accountDialog = document.querySelector("#account-dialog");
  const accountForm = document.querySelector("#account-form");
  const accountFeedback = document.querySelector("#account-feedback");
  const panda = document.querySelector("#panda");
  const usernameInput = document.querySelector("#account-username");
  const passwordInput = document.querySelector("#account-password");
  usernameInput.addEventListener("focus", () => {
    panda.classList.add("is-watching");
    panda.classList.remove("is-password");
  });
  passwordInput.addEventListener("focus", () => {
    panda.classList.add("is-password");
    panda.classList.remove("is-watching");
  });
  const hashPassword = async (password) => {
    const bytes = new TextEncoder().encode(password);
    if (globalThis.crypto?.subtle) {
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      return [...new Uint8Array(digest)]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    }
    let hash = 2166136261;
    bytes.forEach((byte) => {
      hash ^= byte;
      hash = Math.imul(hash, 16777619);
    });
    return (hash >>> 0).toString(16).padStart(8, "0");
  };
  const updateAccountDialog = () => {
    const hasProfile = Boolean(accountProfile);
    document.querySelector("#account-title").textContent = hasProfile
      ? currentLanguage === "fr"
        ? "Ouvrir ma session"
        : "Sign in"
      : currentLanguage === "fr"
        ? "Créer un compte local"
        : "Create a local account";
    document.querySelector("#account-submit").textContent = hasProfile
      ? currentLanguage === "fr"
        ? "Se connecter"
        : "Sign in"
      : currentLanguage === "fr"
        ? "Créer mon compte"
        : "Create my account";
    document.querySelector("#account-password").autocomplete = hasProfile
      ? "current-password"
      : "new-password";
  };
  document.querySelector("#account-toggle").addEventListener("click", () => {
    if (accountSession) {
      accountSession = null;
      localStorage.removeItem("palette-session");
      refreshAccountButton();
      showToast(currentLanguage === "fr" ? "Session fermée" : "Signed out");
      return;
    }
    accountForm.reset();
    accountFeedback.textContent = "";
    updateAccountDialog();
    accountDialog.showModal();
  });
  document
    .querySelector("#account-cancel")
    .addEventListener("click", () => accountDialog.close());
  accountForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#account-username").value.trim();
    const passwordHash = await hashPassword(
      document.querySelector("#account-password").value,
    );
    if (!accountProfile) {
      accountProfile = { username, passwordHash };
      localStorage.setItem("palette-account", JSON.stringify(accountProfile));
    } else if (
      username !== accountProfile.username ||
      passwordHash !== accountProfile.passwordHash
    ) {
      accountFeedback.textContent =
        currentLanguage === "fr"
          ? "Nom d’utilisateur ou mot de passe incorrect."
          : "Incorrect username or password.";
      return;
    }
    if (document.querySelector("#remember-account").checked) {
      accountSession = username;
      localStorage.setItem("palette-session", username);
    } else {
      accountSession = null;
      localStorage.removeItem("palette-session");
    }
    refreshAccountButton();
    accountDialog.close();
    showToast(
      currentLanguage === "fr"
        ? `Bienvenue ${username}`
        : `Welcome ${username}`,
    );
  });

  document.querySelector("#manual-toggle").addEventListener("click", () => {
    manualMode = !manualMode;
    document
      .querySelector("#manual-builder")
      .classList.toggle("is-active", manualMode);
    document
      .querySelector("#manual-toggle")
      .classList.toggle("is-active", manualMode);
    document.querySelector("#manual-status").textContent = manualMode
      ? currentLanguage === "fr"
        ? "Mode actif : clique sur les couleurs à ajouter."
        : "Active mode: click colors to add them."
      : currentLanguage === "fr"
        ? "Active la sélection manuelle puis clique sur les couleurs à garder."
        : "Turn on manual selection, then click the colors you want to keep.";
    showToast(
      manualMode
        ? currentLanguage === "fr"
          ? "Sélection manuelle activée"
          : "Manual selection enabled"
        : currentLanguage === "fr"
          ? "Sélection manuelle désactivée"
          : "Manual selection disabled",
    );
  });
  document.querySelector("#clear-manual").addEventListener("click", () => {
    manualSelection.clear();
    document
      .querySelectorAll(".manual-selected")
      .forEach((card) => card.classList.remove("manual-selected"));
    renderManualPalette();
  });
  document.querySelector("#save-palette").addEventListener("click", () => {
    if (!manualSelection.size)
      return showToast(
        currentLanguage === "fr"
          ? "Ajoute d’abord des couleurs"
          : "Add colors first",
      );
    const name =
      document.querySelector("#palette-name").value.trim() ||
      `Palette ${savedPalettes.length + 1}`;
    const notes = document.querySelector("#palette-notes").value.trim();
    const colors = [...manualSelection.values()];
    savedPalettes = [
      { name, notes, colors, updatedAt: new Date().toISOString() },
      ...savedPalettes.filter((palette) => palette.name !== name),
    ].slice(0, 12);
    localStorage.setItem("palette-collections", JSON.stringify(savedPalettes));
    renderSavedPalettes();
    showToast(
      currentLanguage === "fr" ? "Palette sauvegardée" : "Palette saved",
    );
  });
  document.querySelector("#export-custom-btn").addEventListener("click", () => {
    if (!manualSelection.size)
      return showToast(
        currentLanguage === "fr"
          ? "Ajoute d’abord des couleurs"
          : "Add colors first",
      );
    const content = [...manualSelection.values()]
      .map(({ name, code }) => `${name}: ${code}`)
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    link.download = "ma-palette.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(
      currentLanguage === "fr"
        ? "Ta palette a été exportée"
        : "Your palette was exported",
    );
  });
  renderManualPalette();
  renderSavedPalettes();

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealObserver.unobserve(entry.target);
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
          entry.target
            .querySelector(".colors")
            ?.classList.toggle("is-visible", entry.isIntersecting);
        }),
      { threshold: 0.08 },
    );
    sections.forEach((section) => revealObserver.observe(section));
  } else {
    sections.forEach((section) => {
      section.classList.add("is-visible");
      section.querySelector(".colors")?.classList.add("is-visible");
    });
  }

  sections.forEach((section) => {
    const title = section.querySelector("h2");
    if (!title) return;
    const paletteColors = section.querySelector(".colors");
    const updatePaletteHeight = () => {
      section.style.setProperty(
        "--palette-height",
        `${paletteColors.scrollHeight + 16}px`,
      );
    };
    updatePaletteHeight();
    window.addEventListener("resize", updatePaletteHeight, { passive: true });
    const heading = document.createElement("div");
    heading.className = "palette-heading";
    const toggle = document.createElement("button");
    toggle.className = "palette-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute(
      "aria-label",
      currentLanguage === "fr" ? "Réduire la palette" : "Collapse palette",
    );
    const arrow = document.createElement("span");
    arrow.className = "palette-arrow";
    arrow.textContent = "⌃";
    const hint = document.createElement("span");
    hint.className = "palette-hint";
    hint.textContent = currentLanguage === "fr" ? "Fermer" : "Collapse";
    toggle.title =
      currentLanguage === "fr"
        ? "Ouvrir ou fermer la palette"
        : "Open or close palette";
    title.parentNode.insertBefore(heading, title);
    heading.append(toggle);
    toggle.append(title, hint, arrow);
    toggle.addEventListener("click", () => {
      updatePaletteHeight();
      const collapsed = section.classList.toggle("is-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      arrow.textContent = collapsed ? "⌄" : "⌃";
      hint.textContent = collapsed
        ? currentLanguage === "fr"
          ? "Ouvrir"
          : "Open"
        : currentLanguage === "fr"
          ? "Fermer"
          : "Collapse";
      toggle.setAttribute(
        "aria-label",
        collapsed
          ? currentLanguage === "fr"
            ? "Ouvrir la palette"
            : "Open palette"
          : currentLanguage === "fr"
            ? "Réduire la palette"
            : "Collapse palette",
      );
      requestAnimationFrame(updatePaletteHeight);
    });
  });

  const updateResults = () => {
    const query = search.value.trim().toLowerCase();
    const category = document.querySelector("#category-filter").value;
    const temperature = document.querySelector("#temperature-filter").value;
    const brightness = document.querySelector("#brightness-filter").value;
    const minimumSaturation = Number(
      document.querySelector("#saturation-filter").value,
    );
    const minimumContrast = Number(
      document.querySelector("#contrast-filter").value,
    );
    let visible = 0;
    sections.forEach((section) => {
      const sectionCards = [...section.querySelectorAll(".colors > div")];
      let sectionVisible = 0;
      sectionCards.forEach((card) => {
        const hue = Number(card.dataset.hue);
        const lightness = Number(card.dataset.lightness);
        const matchesSearch =
          `${card.dataset.name} ${card.querySelector("[data-code]").dataset.code}`
            .toLowerCase()
            .includes(query);
        const matchesCategory =
          category === "all" || card.dataset.category === category;
        const matchesTemperature =
          temperature === "all" ||
          (temperature === "warm" && (hue < 70 || hue >= 300)) ||
          (temperature === "cool" && hue >= 70 && hue < 300);
        const matchesBrightness =
          brightness === "all" ||
          (brightness === "light" && lightness >= 55) ||
          (brightness === "dark" && lightness < 55);
        const matches =
          matchesSearch &&
          matchesCategory &&
          matchesTemperature &&
          matchesBrightness &&
          Number(card.dataset.saturation) >= minimumSaturation &&
          Number(card.dataset.contrast) >= minimumContrast;
        card.classList.toggle("is-hidden", !matches);
        if (matches) {
          visible += 1;
          sectionVisible += 1;
        }
      });
      section.hidden = sectionVisible === 0;
    });
    document.querySelector("#results-count").textContent =
      currentLanguage === "fr"
        ? `${visible} couleur${visible > 1 ? "s" : ""}`
        : `${visible} color${visible > 1 ? "s" : ""}`;
    document
      .querySelector("#empty-state")
      .classList.toggle("is-visible", visible === 0);
  };

  document.querySelector("#total-colors").textContent = paletteData.length;
  search.addEventListener("input", updateResults);
  const refreshFilters = () => {
    document.querySelector("#saturation-value").textContent =
      `${document.querySelector("#saturation-filter").value}%`;
    document.querySelector("#contrast-filter-value").textContent =
      `${document.querySelector("#contrast-filter").value}:1`;
    updateResults();
  };
  document
    .querySelectorAll("#smart-filters select, #smart-filters input")
    .forEach((control) => {
      control.addEventListener("input", refreshFilters);
      control.addEventListener("change", refreshFilters);
    });
  document.querySelector("#reset-filters").addEventListener("click", () => {
    document.querySelector("#category-filter").value = "all";
    document.querySelector("#temperature-filter").value = "all";
    document.querySelector("#brightness-filter").value = "all";
    document.querySelector("#saturation-filter").value = "0";
    document.querySelector("#contrast-filter").value = "1";
    document.querySelector("#saturation-value").textContent = "0%";
    document.querySelector("#contrast-filter-value").textContent = "1:1";
    updateResults();
  });
  const searchPanelToggle = document.querySelector("#search-panel-toggle");
  const setSearchPanelCollapsed = (collapsed) => {
    document.body.classList.toggle("search-panel-collapsed", collapsed);
    searchPanelToggle.setAttribute("aria-expanded", String(!collapsed));
    searchPanelToggle.setAttribute(
      "aria-label",
      collapsed
        ? "Ouvrir la barre de recherche"
        : "Fermer la barre de recherche",
    );
    searchPanelToggle.title = collapsed
      ? "Ouvrir la barre de recherche"
      : "Fermer la barre de recherche";
    searchPanelToggle.textContent = collapsed ? "⌄" : "⌃";
    localStorage.setItem("palette-search-panel-collapsed", String(collapsed));
  };
  searchPanelToggle.addEventListener("click", () => {
    setSearchPanelCollapsed(
      !document.body.classList.contains("search-panel-collapsed"),
    );
  });
  setSearchPanelCollapsed(
    localStorage.getItem("palette-search-panel-collapsed") === "true",
  );
  document.querySelector("#surprise-btn").addEventListener("click", () => {
    const visibleCards = cards.filter(
      (card) => !card.classList.contains("is-hidden"),
    );
    if (!visibleCards.length)
      return showToast(
        currentLanguage === "fr"
          ? "Aucune couleur à découvrir"
          : "No color to discover",
      );
    const chosen =
      visibleCards[Math.floor(Math.random() * visibleCards.length)];
    chosen.scrollIntoView({ behavior: "smooth", block: "center" });
    chosen.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.08)" },
        { transform: "scale(1)" },
      ],
      { duration: 600 },
    );
    showToast(
      currentLanguage === "fr"
        ? `${chosen.dataset.name} vous attend`
        : `${chosen.dataset.name} is waiting for you`,
    );
  });

  const navToggle = document.querySelector(".nav-toggle");
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    navToggle.textContent = isOpen ? "×" : "☰";
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );
  });
  document.querySelectorAll(".nav-group-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const group = toggle.closest(".nav-group");
      document.querySelectorAll(".nav-group.is-open").forEach((openGroup) => {
        if (openGroup !== group) {
          openGroup.classList.remove("is-open");
          openGroup
            .querySelector(".nav-group-toggle")
            .setAttribute("aria-expanded", "false");
        }
      });
      const isOpen = group.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });
  const homeLogo = document.querySelector("#home-logo");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  homeLogo.addEventListener("click", scrollToTop);
  homeLogo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToTop();
    }
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.dataset.target
        ? document.querySelector(link.dataset.target)?.closest(".palette")
        : document.querySelector(link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("show");
      navToggle.textContent = "☰";
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Ouvrir le menu");
      document.querySelectorAll(".nav-group.is-open").forEach((group) => {
        group.classList.remove("is-open");
        group
          .querySelector(".nav-group-toggle")
          .setAttribute("aria-expanded", "false");
      });
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".navbar")) {
      navLinks.classList.remove("show");
      navToggle.textContent = "☰";
      navToggle.setAttribute("aria-expanded", "false");
      document.querySelectorAll(".nav-group.is-open").forEach((group) => {
        group.classList.remove("is-open");
        group
          .querySelector(".nav-group-toggle")
          .setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    navLinks.classList.remove("show");
    navToggle.textContent = "☰";
    navToggle.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".nav-group.is-open").forEach((group) => {
      group.classList.remove("is-open");
      group
        .querySelector(".nav-group-toggle")
        .setAttribute("aria-expanded", "false");
    });
  });
  document.querySelectorAll(".tool-panel, .manual-builder").forEach((panel) => {
    const heading = panel.classList.contains("manual-builder")
      ? panel.firstElementChild
      : panel.querySelector(".tool-heading");
    if (!heading) return;
    heading.classList.add("panel-heading");
    const content = document.createElement("div");
    content.className = "panel-content";
    while (heading.nextElementSibling)
      content.append(heading.nextElementSibling);
    panel.append(content);
    const updateContentHeight = () => {
      panel.style.setProperty(
        "--panel-content-height",
        `${content.scrollHeight}px`,
      );
    };
    updateContentHeight();
    window.addEventListener("resize", updateContentHeight, { passive: true });
    const toggle = document.createElement("button");
    toggle.className = "panel-toggle";
    toggle.type = "button";
    const panelKey = panel.classList.contains("manual-builder")
      ? "manual-builder"
      : [...panel.classList].find((name) => name.endsWith("-tool")) || "panel";
    panel.dataset.panelKey = panelKey;
    toggle.dataset.panelKey = panelKey;
    content.id = `panel-content-${panelKey}`;
    toggle.setAttribute("aria-controls", content.id);
    toggle.textContent = "⌃";
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fermer cette section");
    heading.append(toggle);
    const storageKey = `palette-panel-${panelKey}`;
    const collapsePanel = (collapsed) => {
      panel.classList.toggle("is-collapsed", collapsed);
      toggle.textContent = collapsed ? "⌄" : "⌃";
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute(
        "aria-label",
        collapsed ? "Ouvrir cette section" : "Fermer cette section",
      );
      localStorage.setItem(storageKey, String(collapsed));
    };
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      collapsePanel(!panel.classList.contains("is-collapsed"));
    });
    if (localStorage.getItem(storageKey) === "true") collapsePanel(true);
  });

  document.querySelector("#language-toggle").addEventListener("click", () => {
    applyLanguage(currentLanguage === "fr" ? "en" : "fr");
    showToast(currentLanguage === "fr" ? "Français activé" : "English enabled");
  });

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "palette-theme",
      document.body.classList.contains("dark") ? "dark" : "light",
    );
  });
  if (localStorage.getItem("palette-theme") === "dark")
    document.body.classList.add("dark");

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select")) return;
    if (event.key.toLowerCase() === "g")
      document.querySelector("#generate-palette").click();
    if (event.key.toLowerCase() === "c")
      document.querySelector("#copy-generated-palette").click();
    if (event.key.toLowerCase() === "e")
      document.querySelector("#export-css-palette").click();
    if (event.key.toLowerCase() === "f")
      document
        .querySelector("#smart-filters")
        .scrollIntoView({ behavior: "smooth", block: "center" });
  });

  applyLanguage(currentLanguage);
  updateContrast();
  updateResults();
});
