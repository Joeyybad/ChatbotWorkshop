/**
 * userAuth.js
 * ------------
 * Script front-end pour gérer l'inscription des utilisateurs.
 * 
 * Fonctionnalités principales :
 * 1. Récupère le formulaire d'inscription.
 * 2. Crée dynamiquement les div pour afficher les erreurs sous chaque champ.
 * 3. Effectue des vérifications front-end rapides sur les champs.
 * 4. Envoie les données au serveur via fetch si tout est correct.
 * 5. Affiche un message de succès ou les erreurs retournées par le serveur.
 * 6. Redirige l'utilisateur vers index.html après inscription réussie.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#registerForm');
  if (!form) return; // Sécurité si le formulaire n'existe pas

  // --- Création des div d'erreur pour chaque champ ---
  const fields = ['lastname','firstname', 'birthdate', 'city', 'password', 'confirmPassword'];
  fields.forEach(field => {
    let div = document.querySelector(`#error-${field}`);
    if (!div) {
      div = document.createElement('div');
      div.id = `error-${field}`;
      div.className = 'field-error';
      div.style.display = 'none';
      const input = form.querySelector(`[name="${field}"]`);
      input.parentNode.appendChild(div);
    }
  });

  // --- Div générale pour afficher les messages de succès ---
  let messageDiv = document.querySelector('#registerMessage');
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.id = 'registerMessage';
    messageDiv.style.display = 'none';
    form.appendChild(messageDiv);
  }

  // --- Fonction pour réinitialiser toutes les erreurs ---
  const resetErrors = () => {
    fields.forEach(f => {
      const div = document.querySelector(`#error-${f}`);
      if(div) {
        div.textContent = '';
        div.style.display = 'none';
      }
    });
    messageDiv.style.display = 'none';
  };

  // --- Fonction pour afficher une erreur sous un champ spécifique ---
  const showError = (field, message) => {
    const div = document.querySelector(`#error-${field}`);
    if(div) {
      div.textContent = message;
      div.style.display = 'block';
    }
  };

  // --- Gestion de la soumission du formulaire ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resetErrors();

    const data = {
      firstname: form.firstname.value.trim(),
      lastname: form.lastname.value.trim(),
      birthdate: form.birthdate.value.trim(),
      city: form.city.value.trim(),
      password: form.password.value.trim(),
      confirmPassword: form.confirmPassword.value.trim(),
    };

    // --- Vérifications front-end rapides ---
    if (!data.lastname) return showError('lastname', 'Le nom est requis');
    if (!data.firstname) return showError('firstname', 'Le prénom est requis');
    if (!data.birthdate) return showError('birthdate', 'La date de naissance est requise');
    if (!data.city) return showError('city', 'La ville est requise');
    if (!data.password) return showError('password', 'Le mot de passe est requis');
    if (data.password.length < 4) return showError('password', 'Le mot de passe doit contenir au moins 4 caractères');
    if (data.password !== data.confirmPassword) return showError('confirmPassword', 'Les mots de passe ne correspondent pas');

    try {
      // Retire confirmPassword pour ne pas polluer le backend
      const { confirmPassword, ...payload } = data;

      // --- Appel au serveur pour enregistrer l'utilisateur ---
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) {
        // Affiche le message d'erreur général
        messageDiv.textContent = result.message || 'Erreur lors de l’inscription.';
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#f8d7da'; // rouge clair
        messageDiv.style.color = '#721c24';
        return;
      }

      // --- Succès de l'inscription ---
      form.reset();
      messageDiv.textContent = `Bienvenue ${data.firstname}, votre numéro DIP est : ${result.numeroDIP}`;
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#d4edda'; // vert clair
      messageDiv.style.color = '#155724';

      // Masque le message après 15s
      setTimeout(() => messageDiv.style.display = 'none', 15000);

      // Redirection vers index.html après 3s
      setTimeout(() => window.location.href = '/index.html', 3000);

    } catch(err) {
      console.error(err);
      messageDiv.textContent = 'Erreur serveur, réessayez plus tard.';
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#f8d7da';
      messageDiv.style.color = '#721c24';
    }
  });

  // --- Faire disparaître les erreurs quand on clique dans un champ ---
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', resetErrors);
  });
});
