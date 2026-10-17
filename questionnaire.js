(() => {
  const form = document.getElementById('enquete');
  const msg = document.getElementById('message-envoi');
  const cfg = window.RELAIS_CONFIG;

  if (
    !cfg ||
    !cfg.supabaseUrl.startsWith('https://') ||
    cfg.supabaseAnonKey === 'A_CONFIGURER'
  ) {
    form.querySelector('button[type=submit]').disabled = true;
    msg.textContent = 'Le questionnaire sera disponible après la mise en service.';
    return;
  }

  const db = window.supabase.createClient(
    cfg.supabaseUrl,
    cfg.supabaseAnonKey
  );

  function afficherMessage(texte) {
    msg.textContent = texte;
    msg.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const b = form.querySelector('button[type=submit]');
    b.disabled = true;
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
      b.disabled = false;
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
        b.disabled = false;
        return;
      }

      form.reset();

      afficherMessage(
        'Merci ! Vos réponses ont bien été enregistrées.'
      );

      b.disabled = false;

    } catch (erreur) {
      afficherMessage(
        'Une erreur de connexion est survenue. Veuillez réessayer ultérieurement.'
      );
      b.disabled = false;
    }
  });
})();
