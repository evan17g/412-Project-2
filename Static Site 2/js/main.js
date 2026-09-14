const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
  menuToggle.querySelector('span').textContent = isOpen ? '+' : '×';
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('is-open');
    if (menuToggle) menuToggle.querySelector('span').textContent = '+';
  });
});

const positions = [
  { title: 'First position', note: 'B♭', description: 'The slide is all the way in. Use this home base to tune your first B♭ and listen for a centered, ringing sound.' },
  { title: 'Second position', note: 'A', description: 'Move the slide a short distance out. Keep the motion relaxed and let your ears guide the exact pitch.' },
  { title: 'Third position', note: 'A♭', description: 'A little farther still. Mark this spot by feel, then return to first position without lifting your shoulders.' },
  { title: 'Fourth position', note: 'G', description: 'The slide reaches about halfway out. Keep your right hand light so the instrument stays steady.' },
  { title: 'Fifth position', note: 'G♭', description: 'Extend beyond the middle. Slow practice makes this distance feel natural and repeatable.' },
  { title: 'Sixth position', note: 'F', description: 'Reach toward the end of the slide. Keep the bell still while only the slide arm travels.' },
  { title: 'Seventh position', note: 'E', description: 'The slide is fully extended. Leave yourself room to move and check the pitch with a tuner.' }
];

const number = document.querySelector('#position-number');
const title = document.querySelector('#position-title');
const description = document.querySelector('#position-description');
const note = document.querySelector('#position-note');
const handle = document.querySelector('.slide-handle');

function showPosition(position) {
  const selected = positions[position - 1];
  number.textContent = String(position).padStart(2, '0');
  title.textContent = selected.title;
  description.textContent = selected.description;
  note.textContent = selected.note;
  handle.style.left = `${(position - 1) * 14.25}%`;
  document.querySelectorAll('.position-dot').forEach((dot) => {
    const active = Number(dot.dataset.position) === position;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-pressed', String(active));
  });
}

document.querySelectorAll('.position-dot').forEach((dot) => {
  dot.addEventListener('click', () => showPosition(Number(dot.dataset.position)));
});
