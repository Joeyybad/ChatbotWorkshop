const toggleButton = document.getElementById("toggleChatButton");
const chatBox = document.querySelector(".chatcontainer");
const welcomeMessage = document.querySelector(".welcomeMessage");
const chatOptions = document.getElementById("chatOptions");



//<------- fonction pour faire apparaitre le chat ------->

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

//<------- fonction pour reset le chat ------->

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

//<----- Efface tous les messages et réinitialise le chat ------>

const shownResponses = new Set();

document.getElementById("clearChatButton").addEventListener("click", () => {
    const chat = document.getElementById("chat");
    const welcomeMessage = document.getElementById("welcomeMessage");

    // Supprimer uniquement les messages ajoutés dynamiquement
    const extraMessages = chat.querySelectorAll(".welcomeWrapper:not(#initialWelcome), .botMessage, .userMessage, .searchBubble");
    extraMessages.forEach(el => el.remove());
    

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

//<------- Fonction pour afficher la réponse ------->

function createBotMessage(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "welcomeWrapper";

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const messageBox = document.createElement("div");
    messageBox.className = "welcomeMessage show";

    const messageText = document.createElement("div");
    messageText.className = "welcomeText";
    messageText.innerHTML = `<div class="bodyWelcome">${message}</div>`;

    messageBox.appendChild(messageText);
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageBox);

    document.getElementById("chat").appendChild(wrapper);
}

//Fonction pour afficher les messages de l'utilisateur
function createUserMessage(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "welcomeWrapper userMessageWrapper"; // ajout d'une classe spéciale

    const messageBox = document.createElement("div");
    messageBox.className = "welcomeMessage show";

    const messageText = document.createElement("div");
    messageText.className = "welcomeText";
    messageText.innerHTML = `<div class="bodyWelcome">${message}</div>`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    // Ordre inversé : message puis avatar
    messageBox.appendChild(messageText);
    wrapper.appendChild(messageBox);
    wrapper.appendChild(avatar);

    document.getElementById("chat").appendChild(wrapper);
}

const searchForm = document.getElementById("chatSearchForm");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // évite le rechargement de la page
});

// bouton pour la recherche 
const searchInput = document.getElementById("chatSearchInput");
const searchButton = document.getElementById("chatSearchButton");

searchButton.addEventListener("click", async () => {
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    document.querySelectorAll(".searchBubble").forEach(b => b.remove()); // supprimer les anciennes propositions
    createUserMessage(keyword);

    try {
        // Récupère les titres correspondant au mot-clé
        const res = await fetch(`/api/search-titles?keyword=${encodeURIComponent(keyword)}`);
        const titles = await res.json();

        if (titles.length === 0) {
            createBotMessage("Aucun résultat trouvé pour votre recherche.");
        } else {
            titles.forEach(item => {
                const bubble = document.createElement("div");
                bubble.className = "searchBubble";
                bubble.textContent = item.titre;

                bubble.addEventListener("click", async () => {
                    const message = "Je veux lire '" + item.titre + "'";
                    createUserMessage(message);
                    // Récupère le texte complet pour ce titre
                    const res2 = await fetch(`/api/get-text?id=${encodeURIComponent(item.id)}`);
                    const data = await res2.json();
                    createBotMessage(typeof data.texte === "string" ? data.texte : JSON.stringify(data.texte));
                    document.querySelectorAll(".searchBubble").forEach(b => b.remove());
                });

                document.getElementById("chat").appendChild(bubble);
            });
        }
    } catch (err) {
        console.error(err);
        createBotMessage("Erreur lors de la recherche.");
    }
});
