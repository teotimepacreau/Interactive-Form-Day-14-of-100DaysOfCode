console.log('connecté !');

/*PSEUDO CODE : avant que le formulaire soit soumis je veux :

- vérifier qu'il s'agit bien d'un email
- m'assurer de la sécurité du mdp
*/


const streetName = document.getElementById('street-name');
const cityName = document.getElementById('city-name');
const firstName = document.getElementById('prenom');
const lastName = document.getElementById('nom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorMessages = document.getElementById('errorMessages');
const errorMessageText = document.getElementById('errorMessageText');
const successMessage = document.querySelector('.success');


/*GET RADIO INPUT VALUE*/

//Find Which Radio Button is Selected and display a message. When another radio button is click again show another message.

const planContainer = document.querySelector('.radio-group');
console.log(planContainer);

let radioBtns = document.querySelectorAll('input[name="plan"]');
console.log(radioBtns);

radioBtns.forEach((radio) => {
  radio.addEventListener('change', function(){
    let selected = document.querySelector('input[name="plan"]:checked').value;
    console.log(selected);
    let planConfirmation = `
                          <div id="plan-child" class="fade-in">
                          <i class="fa-solid fa-hands-clapping"></i>
                          <p><b>${selected}</b> plan selected</p>
                          </div>
                        `
    let addedMessage = document.getElementById('plan-child');
  if (addedMessage) {
    console.log("planConfirmation already exists!")
    addedMessage.remove();
    planContainer.insertAdjacentHTML('beforeend', planConfirmation);
    setTimeout(function() {
      document.querySelector(".fade-in").classList.add("show");
    }, 1);
  } else {
    console.log("planConfirmation don't exists!")
    planContainer.insertAdjacentHTML('beforeend', planConfirmation);
    setTimeout(function() {
      document.querySelector(".fade-in").classList.add("show");
    }, 1);

  }
  })
});


/*PASSWORD VISIBILITY*/
//Au clic sur l'icône "oeil" je veux voir mon mot de passe et inversement
const showPasswordIcon = document.querySelector('.fa-eye');
console.log(showPasswordIcon);

function myFunction() {
    let x = document.getElementById("password");
    if (x.type === "password") {//recupère le type de l'input
      x.type = "text";//passe l'attribute type de l'input en text pour que les symboles soient visibles
      showPasswordIcon.classList.replace('fa-eye', 'fa-eye-low-vision');
    } else {
      x.type = "password";
      showPasswordIcon.classList.replace('fa-eye-low-vision', 'fa-eye');
    }
  }

/*ERROR ALERTS*/


const setError = (element, message) => {
  const inputControl = element.closest('.flexer');
  const errorDisplay = inputControl.querySelector('#errorMessageText');
  element.classList.add('input-error');
  errorDisplay.innerText = message;
  const errorBubble = inputControl.querySelector('.error');
  errorBubble.style.display = "flex";
  setTimeout(function() {
    errorBubble.classList.add("show");
  }, 0.5);
}

const setSuccess = element => {
  const inputControl = element.closest('.flexer');
  const errorBubble = inputControl.querySelector('.error');
  element.classList.add('input-success');
  if (errorBubble) {
    errorBubble.remove();
  }
}

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  //SUPPRIMER LES ESPACES
const streetNameValue = streetName.value.trim();//supprime les espaces
const cityNameValue = cityName.value.trim();
const firstNameValue = firstName.value.trim();
const lastNameValue = lastName.value.trim();
const emailValue = email.value.trim();
const passwordValue = password.value.trim();

  if(firstNameValue === "") {
    setError(firstName, "Firstname is required");
    console.log(setError)
  }else{
    setSuccess(firstName);
  }

  if(lastNameValue === "") {
    setError(lastName, "Lastname is required");
    console.log("lastNameValueError")
  }else{
    setSuccess(lastName);
  }

  if(emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)){
    setError(email, "Please provide a valid email");
  }
  else{
    setSuccess(email);
  }

  if(passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8){
    setError(password, "Password must be at least 8 characters");
  } else {
    setSuccess(password)
  }
}

const form = document.querySelector('#myForm');
console.log(form);
/*SUBMIT OR NOT*/ 
form.addEventListener('submit', function(e) {
  validateInputs();
  e.preventDefault();
  if (document.querySelectorAll('.input-success').length === 4) {
    // show success message and submit the form after a 5 second delay
    successMessage.style.display = "flex";
    setTimeout(function() {
      form.submit();//ATTENTION NE JAMAIS DONNER UN ID BUTTON="SUBMIT" A AUTRE CHOSE SINON CA FAIT BUGGER LE SUBMIT
    }, 5000); // submit the form after a 5 second delay
}
})