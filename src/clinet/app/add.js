import { getAnimals } from "./tShirt.service.js";
import { saveAnimal } from "./tShirt.service.js";



const addAnimalForm = document.querySelector(".addAnimalForm");
const errorParagraph = document.querySelectorAll(".error");
const title = document.querySelector("h1");
let param = new URL(document.location).searchParams;
let name = param.get("name");

if (!name){
    addAnimalForm.addEventListener("submit", submitAnimalForm)
}

export function validateAnimalForm(addAnimalForm){
    let isValid = true;  
    // validate the values in each form
    // search for animals with the same name in the array
   
    if(addAnimalForm.animalNameInput.value === "" || addAnimalForm.animalNameInput.value === null){
        errorParagraph[0].textContent = "Please, enter a valid name";
        errorParagraph[0].classList.remove("d-none");
        isValid = false;
    };
    if(addAnimalForm.speciesInput.value === "" || addAnimalForm.speciesInput.value === null){
        errorParagraph[1].textContent = "Please, enter a valid species";
        errorParagraph[1].classList.remove("d-none");
        isValid = false;
    };
    if(addAnimalForm.breedInput.value === "" || addAnimalForm.breedInput.value === null){
        errorParagraph[2].textContent = "Please, enter a valid breed";
        errorParagraph[2].classList.remove("d-none");
        isValid = false;
    };
    // check if the value is numeric -- check if the result conversion from string to number is NaN
    if(addAnimalForm.numberLegs.value === "" || isNaN(Number(addAnimalForm.numberLegs.value)) || addAnimalForm.numberLegs.value < 0){ 
        errorParagraph[3].textContent = "Please, enter a valid number of legs";
        errorParagraph[3].classList.remove("d-none");
        isValid = false;
    };
    if(addAnimalForm.numberEyes.value === "" || isNaN(Number(addAnimalForm.numberEyes.value)) || addAnimalForm.numberEyes.value < 0){
        errorParagraph[4].textContent = "Please, enter a valid number of eyes";
        errorParagraph[4].classList.remove("d-none");
        isValid = false;
    };    
    if(addAnimalForm.soundInput.value === "" || addAnimalForm.soundInput.value === null){
        errorParagraph[5].textContent = "Please, enter a valid sound";
        errorParagraph[5].classList.remove("d-none");
        isValid = false;
    };
    
    return isValid;
}


function submitAnimalForm(event) {
    event.preventDefault();
    let valid = validateAnimalForm(addAnimalForm);
    if (valid) {
        // Create a new animal object from form info
        const newAnimal = {
            name: addAnimalForm.animalNameInput.value,
            species: addAnimalForm.speciesInput.value,
            breed: addAnimalForm.breedInput.value,
            numberLegs: addAnimalForm.numberLegs.value,
            numberEyes: addAnimalForm.numberEyes.value,
            sound: addAnimalForm.soundInput.value,
        };
        let validName = saveAnimal(newAnimal)
        if(validName){
            event.target.reset();
        }else{
            console.log("Animal with that name already exists");
            errorParagraph[0].textContent = "Animal with that name already exists";
            errorParagraph[0].classList.remove("d-none");
        };
    } else {
        // if its not valid, stop submission and print errors
        const errorPara = document.createElement('p');
        errorPara.classList.add("text-danger");
        errorPara.textContent = "Oops, something went wrong...";
        title.parentNode.insertBefore(errorPara, title.nextSibling);
    }
};
