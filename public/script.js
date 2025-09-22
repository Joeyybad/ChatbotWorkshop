
//Recupération des données json

let data = {};

fetch("/api/data")
  .then(res => res.json())
  .then(jsonData => {
    data = jsonData;
    console.log("Données depuis MySQL :", data);
    setupOptionButtons();
  })
  .catch(err => console.error("Erreur API :", err));


const toggleButton = document.getElementById("toggleChatButton");
const chatBox = document.querySelector(".chatcontainer");
const welcomeMessage = document.querySelector(".welcomeMessage");
const chatOptions = document.getElementById("chatOptions");



//fonction pour faire apparaitre le chat

toggleButton.addEventListener("click", () => {
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";


        setTimeout(() => {
            welcomeMessage.style.display = "block";
            welcomeMessage.classList.add("show");
        }, 1000);


        setTimeout(() => {
            chatOptions.classList.add("show");
        }, 2000);

    } else {
        chatBox.style.display = "none";
        // Réinitialise pour rejouer l’animation au prochain clic
        welcomeMessage.classList.remove("show");
        chatOptions.classList.remove("show");
        welcomeMessage.style.display = "none";
    }
});

// Efface tous les messages et réinitialise le chat
const shownResponses = new Set();

document.getElementById("clearChatButton").addEventListener("click", () => {
    const chatBox = document.querySelector(".chatcontainer");
    const chat = document.getElementById("chat");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const chatOptions = document.getElementById("chatOptions");

    // Supprimer uniquement les réponses ajoutées dynamiquement
    const extraMessages = chat.querySelectorAll(".welcomeWrapper:not(#initialWelcome)");
    extraMessages.forEach(el => el.remove());

    // Masquer les éléments de base pour réinitialiser
    welcomeMessage.classList.remove("show");
    welcomeMessage.style.display = "none";
    chatOptions.classList.remove("show");

    // Réactiver les boutons
    document.querySelectorAll("#chatOptions button").forEach(btn => btn.disabled = false);
    shownResponses.clear(); // Réinitialise les réponses affichées

    // Fermer le chat
    chatBox.style.display = "none";
});

const responseDiv = document.getElementById("response");
const buttons = document.querySelectorAll("#chatOptions button");

//Fonction pour afficher la réponse
function createBotMessage(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "welcomeWrapper";

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const messageBox = document.createElement("div");
    messageBox.className = "welcomeMessage show";

    const messageText = document.createElement("div");
    messageText.className = "welcomeText";
    messageText.innerHTML = `<span>Jordan EPSI</span><div class="bodyWelcome">${message}</div>`;

    messageBox.appendChild(messageText);
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageBox);

    document.getElementById("chat").appendChild(wrapper);
}

// Associer les boutons à leurs réponses
function setupOptionButtons() {
    const buttons = document.querySelectorAll("#chatOptions button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.getAttribute("data-key");
            //eviter les doublonsx
            if (button.disabled) return;

            let message = "";

            if (key === "formation" && data.formation) {
                message = `${data.formation.diplome} (${data.formation.niveau}) à ${data.formation.lieu} avec ${data.formation.organisme}`;
            } else if (data[key]) {
                message = data[key];
            }

            if (message) {
                createBotMessage(message);
                button.disabled = true;
            }
        });
    });
}

