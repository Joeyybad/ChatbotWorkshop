
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

    } else {
        chatBox.style.display = "none";

        // Réinitialise le contenu pour rejouer les animations au prochain clic
        resetChat();
    }
});

// function pour faire reset le chat 
function resetChat() {
    const chat = document.getElementById("chat");

    // Supprimer tous les messages sauf le "welcome" initial
    const extraMessages = chat.querySelectorAll(".welcomeWrapper:not(#initialWelcome), .botMessage, .userMessage");
    extraMessages.forEach(el => el.remove());

    // Réinitialiser le message de bienvenue
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.style.display = "none";
    welcomeMessage.classList.remove("show");
    welcomeMessage.classList.remove("animate-fade-in-up");

    // Rejouer l'animation au prochain affichage
    setTimeout(() => {
        welcomeMessage.style.display = "block";
        welcomeMessage.classList.add("animate-fade-in-up");
        welcomeMessage.classList.add("show");
    }, 100);
}

// Efface tous les messages et réinitialise le chat
const shownResponses = new Set();

document.getElementById("clearChatButton").addEventListener("click", () => {
    const chat = document.getElementById("chat");
    const welcomeMessage = document.getElementById("welcomeMessage");

    // Supprimer uniquement les messages ajoutés dynamiquement
    const extraMessages = chat.querySelectorAll(".welcomeWrapper:not(#initialWelcome), .botMessage, .userMessage");
    extraMessages.forEach(el => el.remove());

    // Vider aussi les résultats de recherche
    document.getElementById("searchResults").innerHTML = "";

    // Réinitialiser le message de bienvenue
    welcomeMessage.style.display = "none";
    welcomeMessage.classList.remove("show", "animate-fade-in-up");

    setTimeout(() => {
        welcomeMessage.style.display = "block";
        welcomeMessage.classList.add("animate-fade-in-up", "show");
    }, 100);

    // Réactiver les boutons si jamais tu en réutilises
    document.querySelectorAll("#chatOptions button").forEach(btn => btn.disabled = false);
    shownResponses.clear();
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
    const chatOptions = document.getElementById("chatOptions");
    chatOptions.innerHTML = ""; // Vide le conteneur avant d'ajouter

    // data est un objet { titre1: texte1, titre2: texte2, ... }
    Object.keys(data).forEach(key => {
        const buttonDiv = document.createElement("div");
        buttonDiv.className = "chatOptionsDiv";

        const button = document.createElement("button");
        button.className = "chatOptions";
        button.setAttribute("data-key", key);
        button.textContent = key; // afficher le titre

        buttonDiv.appendChild(button);
        chatOptions.appendChild(buttonDiv);

        // Event listener pour chaque bouton
        button.addEventListener("click", () => {
            if (button.disabled) return; // éviter les doublons
            const message = data[key];
            if (message) createBotMessage(message);
            button.disabled = true;
        });
    });
}

// bouton pour la recherche 
const searchInput = document.getElementById("chatSearchInput");
const searchButton = document.getElementById("chatSearchButton");
const searchResults = document.getElementById("searchResults");

searchButton.addEventListener("click", async () => {
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    searchResults.innerHTML = ""; // vide les anciennes propositions

    try {
        // Récupère les titres correspondant au mot-clé
        const res = await fetch(`/api/search-titles?keyword=${encodeURIComponent(keyword)}`);
        const titles = await res.json();

        if (titles.length === 0) {
            createBotMessage("Aucun résultat trouvé pour votre recherche.");
        } else {
            titles.forEach(titre => {
                const bubble = document.createElement("div");
                bubble.className = "searchBubble";
                bubble.textContent = titre;

                bubble.addEventListener("click", async () => {
                    // Récupère le texte complet pour ce titre
                    const res2 = await fetch(`/api/get-text?titre=${encodeURIComponent(titre)}`);
                    const data = await res2.json();
                    createBotMessage(typeof data.texte === "string" ? data.texte : JSON.stringify(data.texte));
                    searchResults.innerHTML = ""; // vide les propositions après sélection
                });

                searchResults.appendChild(bubble);
            });
        }
    } catch (err) {
        console.error(err);
        createBotMessage("Erreur lors de la recherche.");
    }
});
