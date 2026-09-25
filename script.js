document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".colors > div")];
  const sections = [...document.querySelectorAll(".palette")];
  const search = document.querySelector("#color-search");
  const navLinks = document.querySelector(".nav-links");
  const toast = document.querySelector("#toast");
  const favorites = new Set(
    JSON.parse(localStorage.getItem("palette-favorites") || "[]"),
  );
  let toastTimer;

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
    showToast(`${value} copié dans le presse-papiers`);
  };

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
      `${visible} couleur${visible > 1 ? "s" : ""}`;
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
    if (!visibleCards.length) return showToast("Aucune couleur à découvrir");
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
    showToast(`${chosen.dataset.name} vous attend`);
  });

  document.querySelector(".nav-toggle").addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelector(link.dataset.target)
        ?.closest(".palette")
        .scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("show");
    });
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

  updateResults();
});
