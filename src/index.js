const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const error = document.querySelector(".error");

const apiKey =
  "live_TziuycWEj2WE6BOPwhJ5cY6bz2X8qb25n1lv2G2sCFnxVGgRFM0OalXl4tG4StRH";

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" style="max-height: 600px;">
    <h2>${cat.name}</h2>
    <p><strong>Description:</strong> ${cat.description}</p>
    <p><strong>Temperament:</strong> ${cat.temperament}</p>
  `;
}

function handleError(errorMsg) {
  error.textContent = errorMsg;
  error.classList.add("show");
}

function fetchBreeds() {
  return fetch("https://api.thecatapi.com/v1/breeds", {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch breed list.");
      }
      return response.json();
    })
    .then((breeds) =>
      breeds.map((breed) => ({ id: breed.id, name: breed.name }))
    )
    .catch((error) => {
      handleError(error.message);
      console.error(error);
    });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch cat information.");
      }
      return response.json();
    })
    .then((data) => {
      const catData = data[0];
      const breed = catData.breeds[0];
      const cat = {
        url: catData.url,
        name: breed.name,
        description: breed.description,
        temperament: breed.temperament,
      };
      return cat;
    })
    .catch((error) => {
      handleError(error.message);
      console.error(error);
    });
}

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;

  catInfo.style.display = "none";
  loader.style.display = "block";

  fetchCatByBreed(selectedBreedId).then((cat) => {
    // Wyświetlenie informacji o kocie
    displayCatInfo(cat);

    loader.style.display = "none";

    // Wyświetlenie div.cat-info
    catInfo.style.display = "block";
  });
});

loader.style.display = "block";

fetchBreeds().then((breeds) => {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  loader.style.display = "none";
});
