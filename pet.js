const loadCategories = async (categories) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  showCategories(data.categories);
};

const showCategories = (categories) => {
  categories.forEach((categori) => {
    //console.log(categori);
    const { category, category_icon } = categori;

    const categoryContainer = document.getElementById("category-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <button
            id="category-btn"
            onclick="toggleButton()"
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

const loadAllPets = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  showAllPets(data.pets);
};

const showAllPets = (pets) => {
  pets.forEach((pet) => {
    console.log(pet);

    // breed: "French Bulldog";
    // category: "Dog";
    // date_of_birth: "2023-07-20";
    // gender: "Male";
    // image: "https://i.ibb.co.com/47Sxf3X/pet-11.jpg";
    // petId: 11;
    // pet_details: "This adorable male French Bulldog, born on July 20, 2023, is known for his playful and affectionate nature. Fully vaccinated and priced at $2500, he makes a perfect companion for apartment living.";
    // pet_name: "Ollie";
    // price: 2500;
    // vaccinated_status: "Fully";

    const {
      
      breed,
      category,
      date_of_birth,
      gender,
      image,
      pet_details,
      price,
      pet_name,
      vaccinated_status
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
                  class="border-2 border-gray-300 p-2 rounded-xl font-bold px-5"
                >
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button
                  class="border-2 border-gray-300 p-2 rounded-xl font-bold"
                >
                  Adopt
                </button>
                <button
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
