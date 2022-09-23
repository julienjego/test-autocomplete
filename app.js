const searchBox = document.querySelector("input");
const resultsList = document.querySelector("#input-results");

let cityName, option;

searchBox.addEventListener("input", () => {
    resultsList.innerHTML = "";
    cityName = searchBox.value;
    fetch(
        `https://geo.api.gouv.fr/communes?nom=${cityName}&fields=code,nom,departement,centre&boost=population&limit=10`
    )
        .then((response) => response.json())
        .then((data) => {
            for (let d of data) {
                option = document.createElement("option");
                option.innerText = `${d.nom} (${d.departement.nom})`;
                resultsList.appendChild(option);
            }
            const regexp1 = /\)$/;
            const regexp2 = /.+?(?=\()/;
            if (searchBox.value.match(regexp1)) {
                cityName = searchBox.value.match(regexp2);
                doSearch();
            }
        });
});

function doSearch() {
    fetch(
        `https://geo.api.gouv.fr/communes?nom=${cityName}&fields=code,nom,departement,centre&boost=population&limit=10`
    )
        .then((response) => response.json())
        .then((data) => {
            for (let d of data) {
                console.log(d.nom);
            }
        });
}
