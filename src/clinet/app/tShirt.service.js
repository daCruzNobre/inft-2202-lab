/*
 *
 */
export function findAnimal(animalName) {
    const animals = getAnimals();      
    return animals.find(animal =>{ return animal.name.toLowerCase() === animalName.toLowerCase();});
}

/*
*
*/
export function updateAnimal(animal) {
    // get a list of animals
    const animals = getAnimals();
    // find the index of the animal we're trying to update   
    let animalIndex = animals.findIndex(animal =>{ return animal.name.toLowerCase() === animal.name.toLowerCase();});
    // if the animal doesn't exist, return false
    if(animalIndex === -1){
        return false;
    }else{
        // use the index to update the fields for the selected animal
        animals[animalIndex] = animal;            
        // put the new list back into storage       
        localStorage.setItem("animal", JSON.stringify(animals));
        // return true if everything is good
        return true;
        
    }
    
}

/*
*
*/
export function deleteAnimal(animalName) {
    // get a list of animals
    const animals = getAnimals();
    // find the index of the animal we're trying to delete
    let animalIndex = animals.findIndex(animal => { return animal.name.toLowerCase() === animalName.toLowerCase();});   
    // if the animal doesn't exist, return false
    if(animalIndex === -1){
        return false;
    }else{       
        // cut the selected animal out of the list
        animals.splice(animalIndex, 1)   
        // put the new list back into storage        
        localStorage.setItem("animal", JSON.stringify(animals));        
        // return true if everything is good
        return true;
    }
}



export function getAnimals() {
    let animals = localStorage.getItem('animal');
    // Check if there is a animal array in the storage
    if(animals){
        animals = JSON.parse(animals);
    } else{
        animals = [];
    }

    return animals;
}

export function saveAnimal(animal){
    const animals = getAnimals();
    if (animals.find(a => a.name == animal.name)) {
        return false;
    }
    
    animals.push(animal);
    localStorage.setItem("animal", JSON.stringify(animals));
    return true;
}