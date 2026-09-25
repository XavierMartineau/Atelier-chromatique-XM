document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".colors > div")];
  const sections = [...document.querySelectorAll(".palette")];
  const search = document.querySelector("#color-search");
  const navLinks = document.querySelector(".nav-links");
  const toast = document.querySelector("#toast");
  const favorites = new Set(
    JSON.parse(localStorage.getItem("palette-favorites") || "[]"),
  );
  let currentLanguage = localStorage.getItem("palette-language") || "fr";
  const manualSelection = new Map();
  let manualMode = false;
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
    localStorage.setItem("palette-language", language);
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

  const randomPalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    return Array.from({ length: 5 }, (_, index) => {
      const hue = (baseHue + index * 31 + Math.floor(Math.random() * 16)) % 360;
      const saturation = 54 + Math.floor(Math.random() * 29);
      const lightness = 30 + Math.floor(Math.random() * 42);
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

  const renderColorStrip = (container, colors) => {
    const preview = container.querySelector(".image-preview");
    container.innerHTML = "";
    if (preview) container.append(preview);
    colors.forEach((color) => {
      const chip = document.createElement("button");
      chip.className =
        container.id === "generated-palette"
          ? "generated-color"
          : "image-color";
      chip.type = "button";
      chip.style.backgroundColor = color;
      chip.textContent = color;
      chip.title = `Copier ${color}`;
      chip.addEventListener("click", () => copyText(color));
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
      container.append(chip);
    });
  };

  const generatedPalette = document.querySelector("#generated-palette");
  document.querySelector("#generate-palette").addEventListener("click", () => {
    renderColorStrip(generatedPalette, randomPalette());
    showToast(
      currentLanguage === "fr"
        ? "Une nouvelle palette vient d’apparaître"
        : "A new palette just appeared",
    );
  });
  renderColorStrip(generatedPalette, randomPalette());

  document.querySelector("#image-input").addEventListener("change", (event) => {
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
      const imageResult = document.querySelector("#image-result");
      imageResult.classList.add("has-colors");
      imageResult.innerHTML = `<img class="image-preview" src="${URL.createObjectURL(file)}" alt="Image importée" />`;
      renderColorStrip(imageResult, colors);
      showToast(
        currentLanguage === "fr"
          ? `${colors.length} couleurs extraites de l’image`
          : `${colors.length} colors extracted from the image`,
      );
    };
    image.src = URL.createObjectURL(file);
  });

  cards.forEach((card, index) => {
    const name = card.dataset.name || "Couleur";
    const codeElement = card.querySelector("[data-code]");
    const code = codeElement.dataset.code.toUpperCase();
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
    card.addEventListener("click", (event) => {
      if (event.target === favorite) return;
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
    favorite.addEventListener("click", (event) => {
      event.stopPropagation();
      const key = `${name}-${code}`;
      if (favorites.has(key)) favorites.delete(key);
      else favorites.add(key);
      favorite.classList.toggle("is-favorite", favorites.has(key));
      localStorage.setItem("palette-favorites", JSON.stringify([...favorites]));
      showToast(
        favorites.has(key)
          ? `${name} ajouté aux favoris`
          : `${name} retiré des favoris`,
      );
    });
    card.dataset.index = index;
    card.style.setProperty("--card-index", index % 12);
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

  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) revealObserver.unobserve(entry.target);
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
    { threshold: 0.08 },
  );
  sections.forEach((section) => revealObserver.observe(section));

  const updateResults = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    sections.forEach((section) => {
      const sectionCards = [...section.querySelectorAll(".colors > div")];
      let sectionVisible = 0;
      sectionCards.forEach((card) => {
        const matches =
          `${card.dataset.name} ${card.querySelector("[data-code]").dataset.code}`
            .toLowerCase()
            .includes(query);
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

  document.querySelector("#total-colors").textContent = cards.length;
  search.addEventListener("input", updateResults);
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

  document.querySelector(".nav-toggle").addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.dataset.target
        ? document.querySelector(link.dataset.target)?.closest(".palette")
        : document.querySelector(link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("show");
    });
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

  document.querySelector("#export-btn").addEventListener("click", () => {
    const codes = cards
      .map((card) =>
        card.querySelector("[data-code]").dataset.code.toUpperCase(),
      )
      .join("\n");
    const blob = new Blob([codes], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "atelier-chromatique.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("Palette exportée");
  });

  applyLanguage(currentLanguage);
  updateResults();
});
