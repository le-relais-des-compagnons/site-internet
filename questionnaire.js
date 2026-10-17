(() => {
  const form = document.getElementById('enquete');
  const msg = document.getElementById('message-envoi');
  const cfg = window.RELAIS_CONFIG;
  const bouton = form.querySelector('button[type=submit]');

  function afficherMessage(texte, succes = false) {
    msg.textContent = texte;
    msg.style.display = 'block';
    msg.style.padding = '20px';
    msg.style.margin = '20px 0';
    msg.style.borderRadius = '10px';
    msg.style.fontWeight = 'bold';
    msg.style.fontSize = '18px';
    msg.style.border = succes
      ? '2px solid #238636'
      : '2px solid #b45309';
    msg.style.backgroundColor = succes
      ? '#e8f7ec'
      : '#fff3df';
    msg.style.color = succes
      ? '#17632a'
      : '#854d0e';

    msg.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  if (
    !cfg ||
    !cfg.supabaseUrl ||
    !cfg.supabaseUrl.startsWith('https://') ||
    !cfg.supabaseAnonKey ||
    cfg.supabaseAnonKey === 'A_CONFIGURER' ||
    !window.supabase
  ) {
    bouton.disabled = true;
    afficherMessage(
      'Le questionnaire sera disponible après la mise en service.'
    );
    return;
  }

  const db = window.supabase.createClient(
    cfg.supabaseUrl,
    cfg.supabaseAnonKey
  );

  form.addEventListener('submit', async e => {
    e.preventDefault();

    bouton.disabled = true;
    msg.textContent = 'Envoi en cours…';

    const d = new FormData(form);
    const get = k => (d.get(k) || '').toString().trim();

    const payload = {
      commune: get('commune'),
      animaux: get('animaux'),
      nombre: get('nombre') ? Number(get('nombre')) : null,
      trajet: get('trajet'),
      interets: d.getAll('interets'),
      saison: get('saison'),
      achat: get('achat'),
      frequence: get('frequence'),
      besoins: get('besoins'),
      email: get('email'),
      nom: get('nom'),
      recontact: get('recontact') === 'oui'
    };

    if (payload.email && !payload.recontact) {
      afficherMessage(
        'Pour laisser une adresse mail, cochez la case de demande de réponse.'
      );
      bouton.disabled = false;
      return;
    }

    try {
      const { error } = await db
        .from('questionnaires')
        .insert(payload);

      if (error) {
        afficherMessage(
          'L’envoi a échoué. Veuillez réessayer ultérieurement.'
        );
        bouton.disabled = false;
        return;
      }

      form.reset();

      afficherMessage(
        '✓ Merci ! Vos réponses ont bien été enregistrées.',
        true
      );

      bouton.disabled = false;

    } catch (erreur) {
      afficherMessage(
        'Une erreur de connexion est survenue. Veuillez réessayer ultérieurement.'
      );
      bouton.disabled = false;
    }
  });
})();
