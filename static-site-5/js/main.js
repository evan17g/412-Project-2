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

const eras = {
  gatherers: { title: 'Gatherers', description: 'Human communities were never “just surviving.” They developed tools, stories, social systems, art, and sophisticated ecological knowledge while moving through changing landscapes.', note: 'Key idea: cooperation is an old technology.' },
  farmers: { title: 'Farmers', description: 'Cultivation and domestication emerged independently in several parts of the world. Farming supported new forms of settlement, while also bringing new labor, health, and resource challenges.', note: 'Key idea: abundance can also create new dependencies.' },
  cities: { title: 'City builders', description: 'Cities gathered people, goods, beliefs, and institutions into dense networks. Writing and record-keeping helped coordinate complexity across time and distance.', note: 'Key idea: infrastructure is collective memory.' },
  connected: { title: 'Connected people', description: 'Industrial and digital systems accelerated movement, production, communication, and change. They also made distant choices increasingly connected to one another.', note: 'Key idea: our tools reshape the questions we ask.' }
};

const eraTitle = document.querySelector('#era-title');
const eraDescription = document.querySelector('#era-description');
const eraNote = document.querySelector('#era-note');

document.querySelectorAll('.era-button').forEach((button) => {
  button.addEventListener('click', () => {
    const era = eras[button.dataset.era];
    eraTitle.textContent = era.title;
    eraDescription.textContent = era.description;
    eraNote.textContent = era.note;
    document.querySelectorAll('.era-card').forEach((card) => {
      card.classList.toggle('selected', card.dataset.era === button.dataset.era);
    });
  });
});
