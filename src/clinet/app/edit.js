// Import methods from animal.service.js and add.js
import { findAnimal, updateAnimal } from "./animal.service.js";
import { validateAnimalForm } from "./add.js";

// Look in the URL to see if there is a name parameter
const param = new URL(document.location).searchParams;
const name = param.get("name");
const title = document.querySelector("title"); 
const heading = document.querySelector(".heading"); 
const animalForm = document.querySelector(".addAnimalForm"); 

// if so, call  setupEditForm();
if (name) {
    setupEditForm();
}

function setupEditForm(){
    heading.textContent="Edit Animal";
    title.textContent="Edit";
    let animal = findAnimal(name);
    animalForm.animalNameInput.value= animal.name;
    animalForm.speciesInput.value = animal.species;
    animalForm.breedInput.value = animal.breed;
    animalForm.numberLegs.value = animal.numberLegs;
    animalForm.numberEyes.value = animal.numberEyes;
    animalForm.soundInput.value = animal.sound;
   
    // set name to disabled
    animalForm.animalNameInput.disabled = true;

    animalForm.addEventListener("submit", submitEditForm)
};

function submitEditForm(e) {
    e.preventDefault();
    if(validateAnimalForm(animalForm)){
        const animal = {
            name: animalForm.animalNameInput.value,
            species: animalForm.speciesInput.value,
            breed: animalForm.breedInput.value,
            numberLegs: animalForm.numberLegs.value,
            numberEyes: animalForm.numberEyes.value,
            sound: animalForm.soundInput.value,
        }
        console.log(updateAnimal(animal));
        if(updateAnimal(animal)){
            window.location.href = "list.html";
        }
    }
};