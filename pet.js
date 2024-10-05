const loadCategories = async (categories) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  showCategories(data.categories);
};

const showCategories = (categories) => {
  categories.forEach((categori) => {
    console.log(categori);
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



loadCategories();
