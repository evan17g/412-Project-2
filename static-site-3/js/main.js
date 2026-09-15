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

const methods = {
  retrieval: {
    number: '01',
    title: 'Retrieval practice',
    description: 'Close your notes and bring the answer back from memory. Flashcards, practice questions, and blank-page summaries all turn studying into a useful act of recall.',
    action: 'After reading, write everything you remember before checking the page.'
  },
  spacing: {
    number: '02',
    title: 'Spaced practice',
    description: 'Return to an idea across several days instead of placing all your effort in one long session. Forgetting a little makes each return more valuable.',
    action: 'Schedule three short reviews: today, in two days, and again next week.'
  },
  interleaving: {
    number: '03',
    title: 'Interleaving',
    description: 'Mix related topics or problem types so you practice choosing the right approach, not just repeating the same steps in a predictable block.',
    action: 'Mix five old questions with five new ones instead of sorting by chapter.'
  },
  elaboration: {
    number: '04',
    title: 'Elaboration',
    description: 'Ask how, why, and when an idea works. Explanations create more links around a memory and make it easier to recognize later.',
    action: 'Complete the sentence: “This matters because…” and add a real example.'
  }
};

const number = document.querySelector('#method-number');
const title = document.querySelector('#method-title');
const description = document.querySelector('#method-description');
const action = document.querySelector('#method-action');

document.querySelectorAll('.method-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const method = methods[tab.dataset.method];
    number.textContent = method.number;
    title.textContent = method.title;
    description.textContent = method.description;
    action.textContent = method.action;
    document.querySelectorAll('.method-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
  });
});
