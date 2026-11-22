// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Année du pied de page
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Formulaire : ouvre la messagerie avec la demande pré-remplie
const form = document.getElementById('contact-form');
if (form) {
  const note = document.getElementById('form-note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const empty = !f.value.trim();
      f.classList.toggle('invalid', empty);
      if (empty) ok = false;
    });
    if (!ok) {
      note.textContent = 'Merci d\'indiquer votre nom et votre téléphone.';
      note.classList.add('error');
      return;
    }
    note.classList.remove('error');
    const d = new FormData(form);
    const subject = `Demande de rendez-vous – ${d.get('objet')}`;
    const body =
      `Nom : ${d.get('nom')}\n` +
      `Téléphone : ${d.get('tel')}\n` +
      `E-mail : ${d.get('email') || '-'}\n` +
      `Objet : ${d.get('objet')}\n\n` +
      `${d.get('message') || ''}`;
    window.location.href =
      `mailto:hmitaxis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Votre messagerie s\'est ouverte : il ne reste qu\'à envoyer le message.';
  });
}

// Fond photo du bandeau : activé seulement si l'image existe
const hero = document.querySelector('.hero');
if (hero) {
  const bg = new Image();
  bg.onload = () => hero.classList.add('hero--photo');
  bg.src = 'assets/fond-paris-900.jpg';
}
