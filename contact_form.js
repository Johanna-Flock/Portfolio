async function sendMail() {

     if(
        !validateName() ||
        !validateEmail() ||
        !validateMessage()
    ){return;}
    

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const response = await fetch("contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.success){
        alert("Nachricht gesendet!");
    }else{
        alert("Fehler.");
    }
}


//Valisierung der Formulardaten

const nameInput = document.getElementById("name");
nameInput.addEventListener("blur", validateName);

function validateName(){
    const value = document.getElementById("name").value.trim();
    if(value.length < 2){
        nameInput.classList.add("error");
        return false;
    }
    nameInput.classList.remove("error");
    return true; 
}


const emailInput = document.getElementById("email");
emailInput.addEventListener("blur", validateEmail);

function validateEmail(){
    const email = document.getElementById("email").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(email)){
        emailInput.classList.add("error");
        return false;
    }
    emailInput.classList.remove("error");
    return true;
}

const messageInput = document.getElementById("message");
messageInput.addEventListener("blur", validateMessage);

function validateMessage(){
    const message = document.getElementById("message").value.trim();
    if(message.length < 10){
        messageInput.classList.add("error");
        return false;
    
    }
    messageInput.classList.remove("error");
    return true;
}

