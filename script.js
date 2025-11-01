// AutoBahn Specials - script.js

const listingsData = [
  {
    id: "car-1",
    type: "car",
    title: "2008 Mercedes-Benz R 350",
    price: 9000,
    currency: "€",
    km: 120000,
    gearbox: "Automático",
    location: "Mallorca, ES",
    tags: ["Usado", "Familiar"],
    description:
      "Cómodo familiar con amplio espacio y buen mantenimiento. En muy buenas condiciones.",
  },
  {
    id: "car-2",
    type: "car",
    title: "2014 MINI Cooper D Cabrio",
    price: 14900,
    currency: "€",
    km: 72000,
    gearbox: "Automático",
    location: "Barcelona, ES",
    tags: ["Usado", "Convertible"],
    description: "Divertido y económico cabrio perfecto para ciudad y escapadas.",
  },
  {
    id: "part-1",
    type: "part",
    title: "Discos de freno OEM (juego) - Mercedes R-Class",
    price: 120,
    currency: "€",
    condition: "Nuevo",
    location: "Madrid, ES",
    tags: ["Nuevo", "Frenos"],
    description: "Repuesto OEM de alta calidad. Juego delantero completo.",
  },
  {
    id: "part-2",
    type: "part",
    title: "Faro usado - Mini Cooper R56",
    price: 65,
    currency: "€",
    condition: "Usado",
    location: "Valencia, ES",
    tags: ["Usado", "Iluminación"],
    description: "Con leves marcas pero totalmente funcional. Sin bombillas.",
  },
];

const listingsContainer = document.getElementById("listings");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const detailPanel = document.getElementById("detailPanel");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

let currentFilter = "all";

function renderListings(data) {
  listingsContainer.innerHTML = "";

  if (data.length === 0) {
    listingsContainer.innerHTML = `<p style="text-align:center;color:#6b7280;">No hay resultados — prueba con otros filtros.</p>`;
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-img">Imagen de ${item.title}</div>
      <div class="card-body">
        <h3>${item.title}</h3>
        <div class="meta">${item.type === "car" ? `${item.km.toLocaleString()} km • ${item.gearbox}` : item.condition}</div>
        <div class="price">${item.currency}${item.price.toLocaleString()}</div>
        <div class="tags">${item.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        <button data-id="${item.id}">Ver</button>
      </div>
    `;

    listingsContainer.appendChild(card);
  });

  document.querySelectorAll(".card button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const item = listingsData.find((x) => x.id === id);
      showDetail(item);
    });
  });
}

function filterListings() {
  const query = searchInput.value.toLowerCase();
  const filtered = listingsData.filter((item) => {
    const matchQuery =
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    const matchType = currentFilter === "all" || item.type === currentFilter;
    return matchQuery && matchType;
  });
  renderListings(filtered);
}

function showDetail(item) {
  detailContent.innerHTML = `
    <h2>${item.title}</h2>
    <p class="price">${item.currency}${item.price.toLocaleString()}</p>
    <p>${item.type === "car" ? `${item.km.toLocaleString()} km • ${item.gearbox}` : item.condition}</p>
    <p style="margin-top:1rem;">${item.description}</p>
    <p style="margin-top:1rem;color:#6b7280;font-size:0.9rem;">Ubicación: ${item.location}</p>
    <div style="margin-top:1rem;">
      ${item.tags.map((t) => `<span class='tag'>${t}</span>`).join(" ")}
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:0.5rem;">
      <button style="flex:1;background:#4f46e5;color:white;border:none;padding:0.5rem 1rem;border-radius:0.5rem;cursor:pointer;">Contactar</button>
      <button style="flex:1;border:1px solid #d1d5db;padding:0.5rem 1rem;border-radius:0.5rem;cursor:pointer;">Compartir</button>
    </div>
  `;

  detailPanel.classList.remove("hidden");
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    filterListings();
  });
});

searchInput.addEventListener("input", filterListings);
closeDetail.addEventListener("click", () => detailPanel.classList.add("hidden"));

renderListings(listingsData);
