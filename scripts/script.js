

let listeMots=['Bonjour','azerty','riz'];
let listePhrases=[
  "Le soleil se lève à l'est.",
  "Les oiseaux chantent au printemps.",
  "La mer est calme ce matin."
];
let zoneProposition=listeMots;
function lancerJeu() {
  let score=0;
  let nbreReponses=0;

  let btnValiderMot= document.getElementById("btnValiderMot");
  let inputEcriture= document.getElementById("inputEcriture");
  let i=0;

  afficherProposition(zoneProposition[i]);
  btnValiderMot.addEventListener('click',()=>{
    if(zoneProposition[i]===inputEcriture.value){
      score++
      console.log(score);
    }
    i++;
    afficherScore(score,i)
    if(zoneProposition[i]===undefined){
      afficherProposition('Le jeu est fini !');
      btnValiderMot.disabled=true
    }else{
      afficherProposition(zoneProposition[i]);
    }
    inputEcriture.value='';
    
  });

  afficherScore(score,i)


  let optionSource = document.querySelectorAll('input[name="optionSource"]');
  for (let index = 0; index < optionSource.length; index++) {
    optionSource[index].addEventListener('change',(e)=>{
      console.log(e.target.value)
      if(e.target.value==='mots'){
        zoneProposition=listeMots;
      }else{
        zoneProposition=listePhrases;
      }
      afficherProposition(zoneProposition[i])
    });
  }

  let form = document.querySelector('form');
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
  
    let scorePartager = `${score}/${i}`
    gererFormulaire(scorePartager)
 
  });

}

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }
}


function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
    
}


function afficherMessageErreur(message) {
    
  let spanErreurMessage = document.getElementById("erreurMessage")

  if (!spanErreurMessage) {
      let popup = document.querySelector(".popup")
      spanErreurMessage = document.createElement("span")
      spanErreurMessage.id = "erreurMessage"
      
      popup.append(spanErreurMessage)
  }
  
  spanErreurMessage.innerText = message
}

function gererFormulaire(scorePartager) {

  try{  
    let balisNom = document.getElementById('nom');
    let nom=balisNom.value;
    validerNom(nom);

    let baliseEmail = document.getElementById('email');
    let email=baliseEmail.value;
    validerEmail(email);
    afficherMessageErreur("");
    afficherEmail(nom, email,scorePartager);
  }catch(erreur){
    afficherMessageErreur(erreur.message);
  }

}

function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
  location.href = mailto
}



function afficherProposition(mot) {
  let zoneProposition=document.querySelector(".zoneProposition");
  zoneProposition.innerHTML=mot;
}


function afficherScore(score,nbreReponses) {
  let zoneScore=document.querySelector(".zoneScore span");
  let afficherScore= `${score}/${nbreReponses}`;
  zoneScore.innerHTML=afficherScore;
}





//Appel des fonctions 
// lancerJeu()