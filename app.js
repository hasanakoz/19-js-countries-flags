//*=========================================================
//*                     FLAG-APP
//*=========================================================

const url2 = "https://restcountries.com/v3.1/all";
fetch(url2)
  .then((res) => {
    if (!res.ok) {
      renderError(`Something went wrong: ${res.status}`);
      throw new Error();
    }
    return res.json();
  })
  .then((d) => renderCountryNames(d))
  .catch((err) => console.log(err));

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
  <h2>Countries cannot be fetched</h2>
  <img src = "./img/404.png"/>`;
};

const select = document.querySelector("select");

function renderCountryNames(d) {
  for (let i = 0; i < d.length; i++) {
    let {
      name: { common },
    } = d[i];
    let textNode = document.createTextNode(common);
    let option = document.createElement("option");
    select.appendChild(option);
    option.appendChild(textNode);
  }
}

select.addEventListener("change", (e) => {
  fetchCountryByName(e.target.value);
});

const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));

  const renderError = () => {
    const countryDiv = document.querySelector(".countries");
    countryDiv.innerHTML += `
    <h2>Countries cannot be fetched</h2>
    <img src = "./img/404.png"/>`;
  };

  const renderCountries = (data) => {
    const countryDiv = document.querySelector(".countries");
    console.log(data);
    const {
      capital,
      currencies,
      flags: { svg },
      languages,
      name: { common },
      region,
    } = data[0];
    countryDiv.innerHTML = `
      <div class="card mx-auto m-5 shadow-lg" style="width: 18rem;">
        <img src="${svg}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${common}</h5>
          <p class="card-text">${region}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><i class = "fas fa-lg fa-landmark"></i>${capital}</li>
          <li class="list-group-item"><i class="fa-solid fa-comments"></i>${Object.values(
            languages
          )}</li>
          <li class="list-group-item">
          <i class="fas fa-lg fa-money-bill-wave"></i>
            ${Object.values(currencies).map(
              (item) => Object.values(item) + " "
            )}
          </li>
        </ul>
      </div>`;
  };
};

// fetchCountryByName("turkey");
