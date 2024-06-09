import { getAnimals, updateAnimal, deleteAnimal, findAnimal } from "./tShirt.service.js";

// get a reference to the message box
const messageBox = document.querySelector("#empty-message");
// get a reference to the animal table
const animalTable = document.querySelector("#animal-list");
const tbody = document.querySelector("tbody");
const pagination = document.querySelector(".pagination");

// get a list of animals from your service
const animalList = getAnimals();
const perPage = 5;  // Number of entries per page
let entriesAmount = animalList.length;
let currentPage = 1;

drawAnimalTable(animalList);


// initiate tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// grab a reference to the modal
const modalDelete = document.querySelector("#modalDelete");
const exampleModal = new bootstrap.Modal('#exampleModal');

/**
 * Function to draw the animal table.
 * @param {Array} animals - Array of animal objects to display.
 */
function drawAnimalTable(animals) {
    tbody.replaceChildren(); // delete all content from table body    
    // if there are no animals in the list
    if (animals === undefined || animals.length === 0) {
        messageBox.classList.remove("d-none");
        animalTable.classList.add("d-none");
    } else {
        messageBox.classList.add("d-none");
        animalTable.classList.remove("d-none");
    }
    // for every animal in the list
    animals.forEach(animal => {
        // add a new row to the table element
        let newRow = document.createElement("tr");

        // add a cell for each animal property to the new row
        let newCell1 = document.createElement("td");
        newCell1.textContent = animal.name;
        newRow.appendChild(newCell1);

        let newCell2 = document.createElement("td");
        newCell2.textContent = animal.breed;
        newRow.appendChild(newCell2);

        let newCell3 = document.createElement("td");
        newCell3.textContent = animal.numberLegs;
        newRow.appendChild(newCell3);

        let newCell4 = document.createElement("td");
        newCell4.textContent = animal.numberEyes;
        newRow.appendChild(newCell4);

        let newCell5 = document.createElement("td");
        newCell5.textContent = animal.sound;
        newRow.appendChild(newCell5);

        // add an extra cell to hold the buttons
        let newCell6 = document.createElement("td");

        // create a delete button
        let newButton = document.createElement("span");
        newButton.setAttribute("type", "button");
        let icon = document.createElement("i"); // create icon
        icon.classList.add("fa-solid", "fa-trash");
        // set icon tooltips
        icon.setAttribute("data-bs-toggle", "tooltip");
        icon.setAttribute("data-bs-placement", "top");
        icon.setAttribute("data-bs-custom-class", "custom-tooltip");
        icon.setAttribute("data-bs-title", "Delete Animal");
        // bind modal to button
        newButton.setAttribute("data-bs-toggle", "modal");
        newButton.setAttribute("data-bs-target", "#exampleModal");
        // add some classes to it
        newButton.classList.add("btn", "btn-danger", "my-1", "mx-1");
        newButton.appendChild(icon);
        // add an event listener to it
        newButton.addEventListener("click", (event) => {
            event.preventDefault();
            modalDelete.addEventListener("click", (event) => {
                event.preventDefault();
                if (deleteAnimal(animal.name)) {
                    let newList = getAnimals();
                    drawAnimalTable(newList);
                    exampleModal.hide();
                } else {
                    let newCell7 = document.createElement("td");
                    newCell7.textContent = "could not update";
                    newRow.appendChild(newCell7);
                }
            })
        });

        // use the reference to the button cell to add the delete button
        newCell6.appendChild(newButton);

        // create an edit link
        let editLink = document.createElement("a");
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-file-pen");
        editIcon.setAttribute("data-bs-toggle", "tooltip");
        editIcon.setAttribute("data-bs-placement", "top");
        editIcon.setAttribute("data-bs-custom-class", "custom-tooltip");
        editIcon.setAttribute("data-bs-title", "Edit Animal");

        // add some classes to it (so it looks like a button)
        editLink.classList.add("btn", "btn-primary", "my-1", "mx-1");
        // add an icon or some text
        editLink.appendChild(editIcon);
        // set the href to point to the add page, add a GET param called name and set the animal name
        editLink.href = `../client/add.html?name=${animal.name}`;
        // use the reference to the button cell to add the edit link
        newCell6.appendChild(editLink);

        newRow.appendChild(newCell6);
        tbody.appendChild(newRow);
    });
}

/**
 * Function to get paginated data.
 * @param {Number} page - Current page number.
 * @param {Number} perPage - Number of entries per page.
 * @param {Array} data - Array of data to paginate.
 * @returns {Array} - Array of paginated data.
 */
function getPaginatedData(page, perPage, data) {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
}

