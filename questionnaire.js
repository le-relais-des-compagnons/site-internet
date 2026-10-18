(() => {
  const form = document.getElementById('enquete');
  const msg = document.getElementById('message-envoi');
  if (!form || !msg) return;

  const cfg = window.RELAIS_CONFIG;
  const bouton = form.querySelector('button[type=submit]');

  function afficherMessage(texte, succes = false) {
    msg.textContent = texte;
    msg.style.display = 'block';
    msg.style.padding = '16px 18px';
    msg.style.margin = '0 0 20px';
    msg.style.borderRadius = '14px';
    msg.style.fontWeight = '700';
    msg.style.border = succes ? '2px solid #5f8731' : '2px solid #b98637';
    msg.style.backgroundColor = succes ? '#eff6e6' : '#fff6e5';
    msg.style.color = succes ? '#41641f' : '#80531a';
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function getTrimmed(formData, key) {
    return (formData.get(key) || '').toString().trim();
  }

  function hasUsefulContent(payload) {
    return Boolean(
      payload.animaux ||
      payload.nombre !== null ||
      payload.trajet ||
      payload.interets.length ||
      payload.saison ||
      payload.achat ||
      payload.frequence ||
      payload.besoins ||
      payload.email ||
      payload.nom ||
      payload.recontact
    );
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
    afficherMessage('Le questionnaire sera disponible après la mise en service.');
    return;
  }

  const db = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const d = new FormData(form);
    const payload = {
      commune: getTrimmed(d, 'commune'),
      animaux: getTrimmed(d, 'animaux'),
      nombre: getTrimmed(d, 'nombre') ? Number(getTrimmed(d, 'nombre')) : null,
      trajet: getTrimmed(d, 'trajet'),
      interets: d.getAll('interets'),
      saison: getTrimmed(d, 'saison'),
      achat: getTrimmed(d, 'achat'),
      frequence: getTrimmed(d, 'frequence'),
      besoins: getTrimmed(d, 'besoins'),
      email: getTrimmed(d, 'email'),
      nom: getTrimmed(d, 'nom'),
      recontact: getTrimmed(d, 'recontact') === 'oui'
    };

    if (!payload.commune) {
      afficherMessage('Merci d’indiquer votre commune avant l’envoi.');
      document.getElementById('commune')?.focus();
      return;
    }

    if (!hasUsefulContent(payload)) {
      afficherMessage('Merci de renseigner au moins un élément utile en plus de la commune avant d’envoyer vos réponses.');
      return;
    }

    if (payload.email && !payload.recontact) {
      afficherMessage('Pour laisser une adresse mail, cochez la case de demande de réponse.');
      return;
    }

    if (payload.recontact && !payload.email) {
      afficherMessage('Si vous souhaitez être recontacté, merci d’indiquer votre adresse mail.');
      document.getElementById('email')?.focus();
      return;
    }

    try {
      bouton.disabled = true;
      bouton.textContent = 'Envoi en cours…';

      const { error } = await db.from('questionnaires').insert(payload);

      if (error) {
        afficherMessage('L’envoi a échoué. Veuillez réessayer ultérieurement.');
        bouton.disabled = false;
        bouton.textContent = 'Envoyer mes réponses';
        return;
      }

      form.reset();
      afficherMessage('✓ Merci ! Vos réponses ont bien été enregistrées.', true);
      bouton.disabled = false;
      bouton.textContent = 'Envoyer mes réponses';
    } catch (erreur) {
      afficherMessage('Une erreur de connexion est survenue. Veuillez réessayer ultérieurement.');
      bouton.disabled = false;
      bouton.textContent = 'Envoyer mes réponses';
    }
  });
})();
