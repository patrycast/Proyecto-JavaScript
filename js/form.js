const contactForm= document.getElementById("contact_form"); 
const nameInput=  document.getElementById("nombre");
const lastnameInput=  document.getElementById("apellido");
const emailInput= document.getElementById("email"); 
const celInput= document.getElementById("cel"); 
const messageInput= document.getElementById("mensaje");


const users= JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage= ()=>{
    localStorage.setItem("users", JSON.stringify(users))
}

const isEmptyInput= (input)=>{
    return !input.value.trim().length;
};

const isInRange = (input, MIN_CARACTERS, MAX_CARACTERS)=>{
    return input.value.length >= MIN_CARACTERS && input.value.length <= MAX_CARACTERS;
};

// ---regex---
const isValidEmail= (input)=>{
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input.value.trim());
};

const emailExists= (input)=>{
    return users.some(user=> user.email === input.value.trim())
}

const validatePhone= (input)=>{
    const regex = /^\d{10}$/;
    return regex.test(input.value.trim());
}

const displayError= (input, message)=>{
    const formCampo=input.parentElement;
    formCampo.classList.remove("success");
    formCampo.classList.add("error");

    const error= formCampo.querySelector("small");
    error.style.display="block";
    error.textContent= message;
};

const displaySuccess=(input)=>{
    const formCampo=input.parentElement;
    formCampo.classList.remove("error");
    formCampo.classList.add("success");

    const error= formCampo.querySelector("small");
    error.textContent=" ";
};

// __________________________________________________________

const checkInput= (input)=>{
    let valid= false;
    const MIN_CARACTERS=3;
    const MAX_CARACTERS=25;

    if(isEmptyInput(input)){
      displayError(input, "El campo no puede estar vacío");
      return;
    }

    if(!isInRange(input, MIN_CARACTERS, MAX_CARACTERS)){
        displayError(input, `El campo debe tener entre ${MIN_CARACTERS} y ${MAX_CARACTERS} caracteres`);
        return;
    }
    displaySuccess(input);
    valid= true;
    return valid;

}

// validar email
const checkEmail= (input)=>{
    let valid= false;
    if(isEmptyInput(input)){
        displayError(input, "El campo no puede estar vacío");
        return;
    };

    if(!isValidEmail(input)){
        displayError(input, "El Email no es válido");
        return;
    };

    if(emailExists(input)){
        displayError(input, "El Email ya existe");
        return;
    };

    displaySuccess(input);
    valid= true;
    return valid;

}

// validar el cel
const checkCel= (input)=>{
    let valid= false;
    if(isEmptyInput(input)){
        displayError(input, "El campo no puede estar vacío");
        return;
    }
    if(!validatePhone(input)){
        displayError(input, "El número de celular debe tener 10 dígitos");
        return;
    }

    displaySuccess(input);
    valid= true;
    return valid;
}

//validar el mensaje
const checkMessage= (input)=>{
    let valid= false;
    const MIN_CARACTERS=10;
    const MAX_CARACTERS=500;

    if(isEmptyInput(input)){
        displayError(input, "El campo no puede estar vacío");
        return;
    }
    
    if(!isInRange(input, MIN_CARACTERS, MAX_CARACTERS)){
        displayError(input, `El campo debe tener entre ${MIN_CARACTERS} y ${MAX_CARACTERS} caracteres`);
        return;
    }
    displaySuccess(input);
    valid= true;
    return valid;
}



// validar el form
const FormValidation=(e)=>{
    e.preventDefault();
    let isNameValid= checkInput(nameInput);
    let isLastNameValid= checkInput(lastnameInput); 
    let isEmailValid= checkEmail(emailInput);
    let isCelValid= checkCel(celInput); 
    let isMessageValid= checkMessage(messageInput); 

    let isValidForm= isNameValid && isLastNameValid && isEmailValid && isCelValid && isMessageValid;
    
    if(isValidForm){
        users.push({
            name: nameInput.value,
            lastname: lastnameInput.value,
            email: emailInput.value,
            cel: celInput.value,
            message: messageInput.value,
        });
        saveToLocalStorage(users)
        alert("Formulario enviado correctamente");
        contactForm.reset();
         [nameInput, lastnameInput, emailInput, celInput, messageInput].forEach((el) =>
        el.parentElement.classList.remove("success", "error")
        );
        window.location.href= "index.html#portada"
    }
}


const initForm= ()=>{
    nameInput.addEventListener("input", ()=> checkInput(nameInput));
    lastnameInput.addEventListener("input", ()=> checkInput(lastnameInput));
    emailInput.addEventListener("input", ()=> checkEmail(emailInput));
    celInput.addEventListener("input", ()=> checkCel(celInput));
    messageInput.addEventListener("input", ()=> checkMessage(messageInput));
    contactForm.addEventListener("submit", FormValidation)

  
};

initForm();


