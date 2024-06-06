const contactForm = document.querySelector(".contactForm");

contactForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    const formData = new FormData(contactForm);

    const name = formData.get("nameInput");
    const phoneNumber = formData.get("nameInput");
    const email = formData.get("emailInput");
    const message = formData.get("messageInput");

    console.log(name);
    console.log(phoneNumber);
    console.log(email);
    console.log(message);
});