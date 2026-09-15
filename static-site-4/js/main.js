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

const signals = {
  eyes: {
    title: 'Change your distance',
    description: 'Use the 20–20–20 idea as a gentle prompt: about every 20 minutes, look at something around 20 feet away for 20 seconds.',
    action: 'Set your screen at a comfortable arm’s length and soften your gaze.'
  },
  sleep: {
    title: 'Create a landing',
    description: 'A screen can keep your attention activated when your day needs to slow down. A consistent wind-down cue helps separate “online” from “rest.”',
    action: 'Choose a final check-in time, then charge your device away from the bed.'
  },
  body: {
    title: 'Change position',
    description: 'No single posture is perfect for hours. Regular movement helps interrupt stiffness and gives your eyes and muscles a new task.',
    action: 'Stand up, roll your shoulders, and walk for two minutes between tasks.'
  },
  noise: {
    title: 'Reduce the noise',
    description: 'Notifications and quick app-switching can make attention feel scattered. Fewer interruptions create more room for sustained focus.',
    action: 'Turn off nonessential alerts and keep one device-free pocket in your day.'
  }
};

const title = document.querySelector('#signal-title');
const description = document.querySelector('#signal-description');
const action = document.querySelector('#signal-action');

document.querySelectorAll('.signal-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const signal = signals[tab.dataset.signal];
    title.textContent = signal.title;
    description.textContent = signal.description;
    action.textContent = signal.action;
    document.querySelectorAll('.signal-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
  });
});
