const formElement = document.getElementById("form");
const inputElements = document.querySelectorAll(".form__input");

const validationExpressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letters and spaces, can include accents.
    lastname: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letters and spaces, can include accents.
    password: /^.{4,12}$/, // 4 to 12 characters.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Email format.
}

const fieldValidity = {
    name: false,
    lastname: false,
    password: false,
    email: false,
}

const errorMessages = {
    name: "The name must be between 3 and 16 characters long and can only contain letters.",
    lastname: "The last name must be between 3 and 16 characters long and can only contain letters.",
    email: "Looks like this is not a valid email.",
    password: "The password must be between 4 and 12 characters long."
}

const validateInputs = (event) => {
    switch(event.target.name) {
        case "name":
            validateField(validationExpressions.name, event.target, "name");
        break;
        case "lastname":
            validateField(validationExpressions.lastname, event.target, "lastname");
        break;
        case "email":
            validateField(validationExpressions.email, event.target, "email");
        break;
        case "password":
            validateField(validationExpressions.password, event.target, "password");
        break;
    }
}

const updateClassList = (element, classToAdd, classToRemove) => {
    element.classList.add(classToAdd);
    element.classList.remove(classToRemove);
}

const validateField = (expression, inputElement, fieldName) => {
    const emptyFieldError = "This field cannot be empty.";
    const errorElement = document.querySelector(`#group__${fieldName} .form__input-error`);

    if(inputElement.value.trim() === "") {
        updateClassList(document.getElementById(`group__${fieldName}`), "form__group-incorrect", "form__group-correct");
        errorElement.classList.add("form__input-error-active");
        errorElement.textContent = emptyFieldError;
        fieldValidity[fieldName] = false;
    } else if(!expression.test(inputElement.value)) {
        updateClassList(document.getElementById(`group__${fieldName}`), "form__group-incorrect", "form__group-correct");
        errorElement.classList.add("form__input-error-active");
        errorElement.textContent = errorMessages[fieldName];
        fieldValidity[fieldName] = false;
    } else {
        updateClassList(document.getElementById(`group__${fieldName}`), "form__group-correct", "form__group-incorrect");
        errorElement.classList.remove("form__input-error-active");
        fieldValidity[fieldName] = true;
    }
}

inputElements.forEach((inputElement) => {
    inputElement.addEventListener("keyup", validateInputs);
    inputElement.addEventListener("blur", validateInputs);
});

formElement.addEventListener("submit", (e) => {
    const allFieldsValid = fieldValidity.name && fieldValidity.lastname && fieldValidity.email && fieldValidity.password;
    e.preventDefault();
    
    if(allFieldsValid) {
        formElement.reset();
        document.querySelectorAll(".form__group").forEach((element) => {
            element.classList.remove("form__group-correct");
        });
        alert("The form has been successfully submitted.");
    } else {
        alert("The form is not complete.");
    }
});
console.log(allFieldsValid);