const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

// Unikalny klucz API
const apiKey =
  'live_TziuycWEj2WE6BOPwhJ5cY6bz2X8qb25n1lv2G2sCFnxVGgRFM0OalXl4tG4StRH';

// Funkcja do wyświetlania informacji o kocie
function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image">
    <h2>${cat.name}</h2>
    <p><strong>Description:</strong> ${cat.description}</p>
    <p><strong>Temperament:</strong> ${cat.temperament}</p>
  `;
}

// Funkcja obsługująca błąd
function handleError(errorMsg) {
  error.textContent = errorMsg;
  error.classList.add('show');
}

// Funkcja do pobierania listy ras
function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breed list.');
      }
      return response.json();
    })
    .then(breeds => breeds.map(breed => ({ id: breed.id, name: breed.name })))
    .catch(error => {
      handleError(error.message);
      console.error(error);
    });
}

// Funkcja do pobierania informacji o kocie na podstawie rasy
function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat information.');
      }
      return response.json();
    })
    .then(data => {
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
    .catch(error => {
      handleError(error.message);
      console.error(error);
    });
}

// Obsługa zdarzenia wyboru opcji w select.breed-select
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  // Ukrycie div.cat-info i wyświetlenie p.loader
  catInfo.style.display = 'none';
  loader.style.display = 'block';

  // Wysłanie żądania HTTP, aby pobrać informacje o kocie
  fetchCatByBreed(selectedBreedId).then(cat => {
    // Wyświetlenie informacji o kocie
    displayCatInfo(cat);

    // Ukrycie p.loader
    loader.style.display = 'none';

    // Wyświetlenie div.cat-info
    catInfo.style.display = 'block';
  });
});

// Inicjalizacja strony
loader.style.display = 'block';

// Wysłanie żądania HTTP, aby pobrać listę ras
fetchBreeds().then(breeds => {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  // Wyświetlenie select.breed-select
  breedSelect.style.display = 'block';

  // Ukrycie p.loader
  loader.style.display = 'none';
});
