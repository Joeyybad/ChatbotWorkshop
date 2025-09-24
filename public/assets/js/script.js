const toggleButton = document.getElementById("toggleChatButton");
const chatBox = document.querySelector(".chatcontainer");
const welcomeMessage = document.querySelector(".welcomeMessage");
const chatOptions = document.getElementById("chatOptions");

window.addEventListener("DOMContentLoaded", loadFamilles); // on charge les familles + articles au démarrage de la page

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


// Fonction pour faire le choix entre la liste des catégories ou des récents 
const tabCategories = document.getElementById("tabCategories");
const tabRecent = document.getElementById("tabRecent");

const categoriesView = document.getElementById("categoriesView");           // ton affichage catégories
const articlesRecentView = document.getElementById("articlesRecentView"); // articles d'une famille

// Gestion du clic sur Catégories
tabCategories.addEventListener("click", () => {
    tabCategories.classList.add("active");
    tabRecent.classList.remove("active");
    document.getElementById("majorBibliotheque").textContent = "Bibliothèque";

    categoriesView.classList.remove("hidden");
    articlesRecentView.classList.add("hidden");
    loadFamilles();
});

// Gestion du clic sur Récent
tabRecent.addEventListener("click", () => {
    tabRecent.classList.add("active");
    tabCategories.classList.remove("active");

    categoriesView.classList.add("hidden");
    articlesRecentView.classList.remove("hidden");
    loadRecentArticle();
});


// Fonction pour afficher la liste des familles avec articles
async function loadFamilles() {
    const res = await fetch("/api/familles-articles");
    const familles = await res.json();

    const grid = document.getElementById("familles-grid");
    const articlesView = document.getElementById("articles-view");
    const articlesBtn = document.getElementById("articles-btn");

    grid.innerHTML = "";
    familles.forEach(f => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h4>${f.famille}</h4>
        <span class="badge">${f.count} articles</span>
        `;
        card.addEventListener("click", () => showArticles(f));
        grid.appendChild(card);
    });

    function showArticles(famille) {
        grid.classList.add("hidden");
        articlesView.classList.remove("hidden");
        articlesBtn.classList.remove("hidden");
        // on select l'element avec l'id "majorBibliotheque", on le change
        const major = document.getElementById("majorBibliotheque");
        major.textContent = famille.famille;

        articlesView.innerHTML = `
            ${famille.articles.map(a => `<p data-id="${a.id}" class="article-item">${a.titre}</p>`).join("")}
        `;
        articlesBtn.innerHTML = `<button id="backBtn">⬅ Retour</button>`;

        document.getElementById("backBtn").addEventListener("click", () => {
            articlesView.classList.add("hidden");
            articlesBtn.classList.add("hidden");
            grid.classList.remove("hidden");
            // On remet le titre par défaut
            major.textContent = "Bibliothèque";
        });

        // Ajout des événements click sur chaque article
        document.querySelectorAll(".article-item").forEach(item => {
            item.addEventListener("click", async () => {
                const id = item.getAttribute("data-id");

                // On appelle ton API pour récupérer le texte complet
                const res = await fetch(`/api/get-text?id=${id}`);
                const data = await res.json();

                // On affiche le contenu de l'article
                articlesView.innerHTML = `<p>${data.texte}</p>`;
                articlesBtn.innerHTML = `<button id="backArticlesBtn">⬅ Retour</button>`;

                
                major.textContent = item.textContent;

                // Bouton retour aux articles
                document.getElementById("backArticlesBtn").addEventListener("click", () => {
                    showArticles(famille); // on recharge la liste d'articles
                });
            });
        });
    }
}

// Fonction pour afficher la liste des 50 articles les plus récents
async function loadRecentArticle() {
    const res = await fetch("/api/select-titre-updated");
    const articles = await res.json();
    const articlesRecentListe = document.getElementById("articlesRecentListe");
    const articlesView = document.getElementById("articles-view-recent");
    const articlesBtn = document.getElementById("articles-btn-recent");
    document.getElementById("majorBibliotheque").textContent = "Bibliothèque";

    articlesRecentListe.classList.remove("hidden");
    articlesRecentView.classList.remove("hidden");
    articlesView.classList.add("hidden");
    articlesBtn.classList.add("hidden");

    articlesRecentListe.innerHTML = "";
    articles.forEach(a => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h5>${a.titre}</h5>
        <p>${timeAgo(a.updated_at)}</p>
        `;
        card.addEventListener("click", () => showArticles(a));
        articlesRecentListe.appendChild(card);
    });


    async function showArticles(aricle) {
        articlesRecentListe.classList.add("hidden");
        articlesView.classList.remove("hidden");
        articlesBtn.classList.remove("hidden");
        // on select l'element avec l'id "majorBibliotheque", on le change
        const major = document.getElementById("majorBibliotheque");
        major.textContent = aricle.titre;

        // On appelle ton API pour récupérer le texte complet
        const resArticle = await fetch(`/api/get-text?id=${aricle.id}`);
        const dataArticle = await resArticle.json();
        // On affiche le contenu de l'article
        articlesView.innerHTML = `<p>${dataArticle.texte}</p>`;
        articlesBtn.innerHTML = `<button id="backArticlesBtn-recent">⬅ Retour</button>`;

        // Bouton retour aux articles
        document.getElementById("backArticlesBtn-recent").addEventListener("click", () => {
            console.log("fdsfsdfsfsdf");
            loadRecentArticle(); // on recharge la liste d'articles
        });
    }    
}

//fonction pour donner les différences entre maintenant et une date (utc)
function timeAgo(dateUTC) {
    const now = new Date();
    const date = new Date(dateUTC);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        an: 31536000,
        mois: 2592000,
        jour: 86400,
        heure: 3600,
        minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1) {
        return `il y a ${count} ${unit}${count > 1 ? "s" : ""}`;
        }
    }
    return "à l'instant";
}



