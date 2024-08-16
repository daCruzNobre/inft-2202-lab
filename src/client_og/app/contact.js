const contactForm = document.querySelector(".contactForm");
const errorParagraph = document.querySelectorAll(".error")

function validateContactForm(contactForm){
    let isValid = true;  
    // validate the values in the form
    //regex to match look if there is number in the array
    const namePatterm = /^[A-Za-z\s]+$/;
    if(!namePatterm.test(contactForm.nameInput.value.trim())){
        errorParagraph[0].textContent = "Please, enter a valid name";
        errorParagraph[0].classList.remove("d-none");
        isValid = false;
    }else{
        errorParagraph[0].classList.add("d-none");    
    }; 
    if(isNaN(Number(contactForm.phoneNumberInput.value))){
        errorParagraph[1].textContent = "Please, enter a phone number";
        errorParagraph[1].classList.remove("d-none");
        isValid = false;
    }else{
        errorParagraph[1].classList.add("d-none");
    };
    
    return isValid;
}


contactForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    let valid = validateContactForm(contactForm);
    if(valid){

        const formData = new FormData(contactForm);
    
        const name = formData.get("nameInput");
        const phoneNumber = formData.get("nameInput");
        const email = formData.get("emailInput");
        const message = formData.get("messageInput");
    
        console.log(name);
        console.log(phoneNumber);
        console.log(email);
        console.log(message);
    }
});