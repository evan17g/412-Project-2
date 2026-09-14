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

const stops = {
  checkin: { number: '01', title: 'Check-in', description: 'The airline prints a bag tag with a unique identifier and routing information. The tag helps the system know where this bag needs to go.', note: 'The barcode is the bag’s travel passport.' },
  screening: { number: '02', title: 'Screening', description: 'The bag enters a security screening process. Automated equipment and trained operators help identify items that need a closer look.', note: 'Safety checks happen before the bag reaches the aircraft.' },
  sorting: { number: '03', title: 'Sorting', description: 'Scanners read the tag and control software directs the bag through conveyors, merges, diverters, or other sorting equipment.', note: 'One scan can change the bag’s entire route.' },
  makeup: { number: '04', title: 'Make-up', description: 'Bags for the same flight gather in a make-up area. Teams organize them into carts or containers for the ramp journey.', note: 'The flight becomes a physical collection of bags.' },
  loading: { number: '05', title: 'Loading', description: 'The bag travels airside and is loaded into the aircraft, often with other bags headed to the same destination.', note: 'Timing matters: every connection has a deadline.' },
  reclaim: { number: '06', title: 'Reclaim', description: 'After arrival and unloading, the bag joins the arrivals system and reaches a carousel, where passenger and baggage are reunited.', note: 'The last scan is a visual one: “That’s mine.”' }
};

const stopNumber = document.querySelector('#stop-number');
const stopTitle = document.querySelector('#stop-title');
const stopDescription = document.querySelector('#stop-description');
const stopNote = document.querySelector('#stop-note');
const progress = document.querySelector('.line-progress');

document.querySelectorAll('.route-stop').forEach((button, index) => {
  button.addEventListener('click', () => {
    const stop = stops[button.dataset.stop];
    stopNumber.textContent = stop.number;
    stopTitle.textContent = stop.title;
    stopDescription.textContent = stop.description;
    stopNote.textContent = stop.note;
    progress.style.width = `${(index / 5) * 100}%`;
    document.querySelectorAll('.route-stop').forEach((item) => item.classList.toggle('active', item === button));
  });
});
