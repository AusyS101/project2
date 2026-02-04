const animalTitle = document.querySelector("#animal");
const animalImage = document.querySelector("#pic");
const animalFacts = document.querySelector("#lister");
const button = document.querySelector("#pickanimalbutton");

//Bin URL
const BIN_URL = "https://api.jsonbin.io/v3/b/698042e2ae596e708f0ac7cb";

function fetchAnimals () {
    return fetch(BIN_URL)
    .then(response => response.json())
    .then(data => data.record.animals)
    .catch(err => {
        console.error("Error fetching animals:", err);
        return [];
    });
}

function getRandomAnimal (animals) {
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
}

function displayAnimal (animal) {
    animalTitle.textContent = animal.name;
    animalImage.src = animal.image;

    animalFacts.innerHTML = "";
    animal.facts.forEach((fact, index) => {
        const li = document.createElement("li");
        li.textContent = `Fact ${index + 1}: ${fact}`;
        animalFacts.appendChild(li);
    });
}

button.addEventListener("click", () => {
    fetchAnimals().then(animals => {
        if (animals.length > 0) {
            const animal = getRandomAnimal(animals);
            displayAnimal(animal);
        } else {
            animalTitle.textContent = "No animals found!";
            animalImage.src = "";
            animalFacts.innerHTML = ""
        }
    });
});