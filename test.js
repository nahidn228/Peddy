const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      displayAllPets(data.pets);
    })
    .catch((err) => console.log(err));
};

// sorted data

const sortData = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      const allPets = data.pets;
      const sorted = [...allPets].sort((a, b) => a.price - b.price);
      displayAllPets(sorted);
    })
    .catch((err) => console.log(err));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (btn of buttons) {
    btn.classList.remove("active");
  }
};

const setBreak = (category) => {
  document.getElementById("loader").classList.remove("hidden");
  const petCards = document.getElementById("pet-card");
  petCards.innerHTML = "";
  setTimeout(() => {
    loadCategoryPets(category);
  }, 2000);
};

const showPic = (image) => {
  console.log(image);
  const cardLikeBtnAction = document.getElementById("card-action");
  const div = document.createElement("div");
  div.innerHTML = `
  <img src='${image}' alt="">
  
  `;
  cardLikeBtnAction.appendChild(div);
};
const loadCategoryPets = (category) => {
  document.getElementById("loader").classList.add("hidden");
  console.log("2 second gone");
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${category}`);
      activeBtn.classList.add("active");
      displayAllPets(data.data);
    })
    .catch((err) => console.log(err));
};
const displayCategories = (categories) => {
  categories.forEach((item) => {
    const { category, category_icon, id } = item;
    //console.log(category);

    const categoryContainer = document.getElementById("category-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <button
            id='btn-${category}'
            onclick="setBreak('${category}')"
            class="border-2 border-gray-300 p-2 rounded-xl px-10 flex items-center gap-2 font-bold category-btn "
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

const loadPetDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  displayPetDetails(data.petData);

  //my_modal_1.showModal()
};

const displayPetDetails = (petDetails) => {
  console.log(petDetails);

  const {
    image,
    pet_name,
    breed,
    date_of_birth,
    price,
    gender,
    pet_details,
    vaccinated_status,
  } = petDetails;

  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
  
   <img src="${image}" alt="Pet" class="rounded-xl" />
          <h2 class="card-title">'${pet_name}'</h2>
         <div>
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
          <p class='text-sm text-gray-500 space-x-2'>
          <i class="fa-solid fa-syringe"></i>
          <span id="petBread">Vaccine: ${vaccinated_status}</span>
          </p>
          
         </div>
         <div class='space-y-2'>
         <h4 class="text-lg font-bold">Details Information</h4>
         <span id="petBread" class='text-sm text-gray-500'> 
         ${pet_details}
         </span>
         </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
  `;

  document.getElementById("showModalData").click();

  // "petId": 2,
  // "breed": "Siamese",
  // "category": "Cat",
  // "date_of_birth": "2022-09-05",
  // "price": 800,
  // "image": "https://i.ibb.co.com/3Wzz41D/pet-2.jpg",
  // "gender": "Female",
  // "pet_details": "This affectionate female Siamese cat is known for her vocal nature and love for attention. Born on September 5, 2022, she enjoys interactive play and snuggles. Fully vaccinated and priced at $800, she's the perfect fit for cat lovers who appreciate an intelligent, engaging, and sociable feline companion.",
  // "vaccinated_status": "Fully",
  // "pet_name": "Mia"
};

const displayAllPets = (allPets) => {
  const petCards = document.getElementById("pet-card");
  petCards.innerHTML = "";

  if (allPets.length == 0) {
    petCards.classList.remove("grid");
    petCards.innerHTML = `
    
    <div class= "flex flex-col items-center justify-center text-center space-y-4 w-2/3 mx-auto">
            <img src="./images/error.webp" alt="">
            <h4 class="text-2xl font-bold">No Information Available</h4>
            <p class="text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
              its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
    
    
    `;
    return;
  } else {
    petCards.classList.add("grid");
  }
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
              <div class="card-actions flex justify-center mt-3">
                <button
                onclick="showPic('${image}')"
                  class="border-2 border-gray-300  rounded-xl font-bold  btn-sm hover:bg-[#0E7A81] hover:text-white"
                >
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button
                onclick="countdown.showModal()"
                  class="border-2 border-gray-300  rounded-xl font-bold btn-sm hover:bg-[#0E7A81] hover:text-white"
                >
                  Adopt
                </button>
                <button
                onclick="loadPetDetails('${petId}')"
                  class="border-2 border-gray-300  rounded-xl font-bold btn-sm hover:bg-[#0E7A81] hover:text-white"
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
