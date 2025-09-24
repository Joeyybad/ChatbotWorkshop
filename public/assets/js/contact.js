document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('#contact form');

    // Vérifie s'il existe déjà un div d'erreur
    let errorDiv = form.querySelector('.form-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.display = 'none';
        form.appendChild(errorDiv);
    }

    const resetError = () => {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        resetError();

        const data = {
            lastname: form.lastname.value.trim(),
            name: form.name.value.trim(),
            NumeroDIP: form.NumeroDIP.value.trim(),
            sujet: form.sujet.value.trim(),
            message: form.message.value.trim()
        };

        try {
            const res = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const contentType = res.headers.get('content-type') || '';
            let result;

            if (contentType.includes('application/json')) {
                result = await res.json(); // body lu une seule fois
            } else {
                const text = await res.text();
                throw new Error(text);
            }

            if (!result.success) {
                errorDiv.textContent = result.error;
                errorDiv.style.display = 'block';
            } else {
                form.reset();
                messageDiv.textContent = `Merci ${data.name} pour votre contribution !`;
                messageDiv.style.display = 'block';
                messageDiv.style.backgroundColor = '#d4edda'; // vert clair
                messageDiv.style.color = '#155724';

                // disparaît au bout de 5 secondes
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }

        } catch (err) {
            console.error(err);
            errorDiv.textContent = err.message || 'Une erreur est survenue, réessayez plus tard.';
            errorDiv.style.display = 'block';
        }
    });


    // Faire disparaître l'erreur quand on clique dans un champ
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', resetError);
    });

    // Croix de fermeture si elle existe dans l'article
    const closeBtn = document.querySelector('#contact .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', resetError);
    }
    const messageDiv = document.querySelector('#contactMessage');

});
