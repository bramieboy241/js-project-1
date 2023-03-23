   // array errors aanmaken
   let errors = [];
   // alerts declareren
   const success = document.querySelector('#success');
   const betalingswijze = document.querySelector('#betalingswijze');
   const error = document.querySelector("#error");

   // alerts onzichtbaar maken
   success.classList.add('d-none');
   betalingswijze.classList.add('d-none');
   error.classList.add('d-none');

   // button declareren + event toevoegen
   const button = document.querySelector('#trigger');
   button.addEventListener('click', validateForm, false);

   // functie aanmaken validateForm
   function validateForm() {
     // array errors refreshen
     errors.length = 0;

     // kijken of het veld voornaam leeg is
     checkEmptyField(voornaam, "Het veld voornaam is een verplicht veld");

     // kijken of het veld naam leeg is
     checkEmptyField(naam, "Het veld naam is een verplicht veld");

     // kijken of het veld gebruikersnaam leeg is
     checkEmptyField(gebruikersnaam, "Het veld gebruikersnaam is een verplicht veld");

     // kijken of het veld adres leeg is
     checkEmptyField(adres, "Het veld adres is een verplicht veld");

     // kijken of het veld land leeg is
     checkEmptyField(land, "Het veld land is een verplicht veld")

     // kijken of het veld provincie leeg is
     checkEmptyField(provincie, "Het veld provincie is een verplicht in te vullen veld");

     if (!validateEmail(email)) {
       errors.push("E-mailadres is niet correct.");
     };

     validateWachtwoord();

     let wijze;

     wijze = validatePayment(document.querySelector("#b"));

     if(wijze == "") {
       wijze = validatePayment(document.querySelector("#o"));
     }

     if(wijze == "") {
       wijze = validatePayment(document.querySelector("#v"));
     }

     if(wijze == "") {
       wijze = validatePayment(document.querySelector("#p"));
     }

     if (wijze == "") {
       errors.push("Duid een betalingswijze aan");
     }

     checkPc(postcode)

     // kijkt of de voorwaarden is aangeduid
     if (!voorwaarden.checked) {
       errors.push("Accepteer de voorwaarde");
     }

     // kijken of errors leeg is en goede alerts tonen
     if (errors.length == 0) {
       error.classList.add("d-none");
       success.classList.remove('d-none');
       document.querySelector("#s-h4").textContent = 'Goed gedaan!';
       document.querySelector("#s-p").textContent = 'Aww yeah, je werd geregistreerd';
       betalingswijze.classList.remove("d-none");
     } else {
       success.classList.add("d-none");
       betalingswijze.classList.add("d-none");
       error.classList.remove('d-none');
       document.querySelector("#e-h4").textContent = 'Yikes, errors!';
       document.querySelector("#e-p").innerHTML = errors.join('<br>');
     }
   }

   // checkt of er lege velden zijn
   function checkEmptyField(veld, melding) {
     if (veld.value == "") {
       errors.push(melding);
     }
   }

   // validatie voor het emailadres
   function validateEmail(emailadres) {
     // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
     var validRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

     if (emailadres.value.match(validRegex)) {
       return true;
     } else {
       return false;
     }
   }

   //validatie wachtwoord
   function validateWachtwoord() {
     if (wachtwoord.value == "") {
       errors.push("Het veld wachtwoord is een verplicht in te vullen veld.");
     }
     else if (herhaalWachtwoord.value == "") {
       errors.push("Het veld herhaal wachtwoord is een verplicht in te vullen veld.");
     }
     else if (wachtwoord.value.length < 7) {
       errors.push("Het wachtwoord moet langer dan 7 tekens zijn.");
     }
     else if (wachtwoord.value != herhaalWachtwoord.value) {
       errors.push("Het wachtwoord en herhaling wachtwoord moeten hetzelfde zijn.");
     }
   }

   // validatie betalingswijze
   function validatePayment(veld) {
     // https://stackoverflow.com/questions/1423777/how-can-i-check-whether-a-radio-button-is-selected-with-javascript
     if (veld.checked == true) {
       document.querySelector("#b-h4").textContent = `Betalingswijze`;
       document.querySelector("#b-p").textContent = `Je betalingswijze is ${veld.value}`;
       return veld.value;
     }
     return "";
   }

   // validatie postcode
   function checkPc(veld) {
     if (veld.value == "") {
       errors.push("Het veld postcode is vereist.");
     }
     else if (veld.value < 1000 || veld.value > 9999) {
       errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.")
     }
   }