const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((err) => console.log(err));
};
const loadCategoryPets = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayAllPets(data.data))
    .catch((err) => console.log(err));
};
const displayCategories = (categories) => {
  categories.forEach((item) => {
    const { category, category_icon, id } = item;
    console.log(category);

    const categoryContainer = document.getElementById("category-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <button
            id="category-btn"
            onclick="loadCategoryPets('${category}')"
            class="border-2 border-gray-300 p-2 rounded-xl px-10 flex items-center gap-2 font-bold"
          >
            <img
              class="w-10 h-10"
              src='${category_icon}'
              alt=""
            />
            '${category}'
          </button>
    `;
    categoryContainer.appendChild(div);
  });
};

const displayAllPets = (allPets) => {
  document.getElementById("pet-card").innerHTML = "";
  allPets.forEach((pet) => {
    const {
      petId,
      breed,
      category,
      date_of_birth,
      gender,
      image,
      pet_details,
      price,
      pet_name,
      vaccinated_status,
    } = pet;

    const petCards = document.getElementById("pet-card");

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
              <img
                src='${image}'
                alt="Pet"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">'${pet_name}'</h2>
              <p class="text-sm text-gray-500 space-x-2">
                <i class="fa-solid fa-bread-slice"></i>
                <span id="petBread"> Breed: ${breed}</span>
              </p>
              <p class="text-sm text-gray-500 space-x-2">
                <i class="fa-solid fa-calendar-day"></i>
                <span id="petBread"> Birth: ${date_of_birth}</span>
              </p>
              <p class="text-sm text-gray-500 space-x-2">
                <i class="fa-solid fa-venus"></i>
                <span id="petBread"> Gender: ${gender}</span>
              </p>
              <p class="text-sm text-gray-500 space-x-2">
                <i class="fa-solid fa-dollar-sign"></i>
                <span id="petBread"> Price: ${price}</span>
              </p>
              <div class="card-actions flex justify-around mt-3">
                <button
                onclick="petModal.showModal()"
                  class="border-2 border-gray-300 p-2 rounded-xl font-bold px-5"
                >
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button
                onclick="petModal.showModal()"
                  class="border-2 border-gray-300 p-2 rounded-xl font-bold"
                >
                  Adopt
                </button>
                <button
                onclick="petModal.showModal()"
                  class="border-2 border-gray-300 p-2 rounded-xl font-bold"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
    `;
    petCards.appendChild(div);
  });
};

loadAllPets();
loadCategories();
