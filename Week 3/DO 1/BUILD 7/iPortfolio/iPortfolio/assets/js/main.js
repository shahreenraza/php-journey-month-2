/**
 * Header toggle and mobile navigation
 */
const headerToggleBtn = document.querySelector('.header-toggle');
const header = document.querySelector('#header');

if (headerToggleBtn && header) {
  headerToggleBtn.addEventListener('click', function () {
    header.classList.toggle('header-show');

    const isOpen = header.classList.contains('header-show');

    headerToggleBtn.innerHTML = isOpen
      ? `<svg width="24" height="24" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
           <path d="M18 6 6 18M6 6l12 12"/>
         </svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
           <path d="M4 6h16M4 12h16M4 18h16"/>
         </svg>`;
  });
}

/**
 * Close mobile menu after clicking a navigation link
 */
document.querySelectorAll('#navmenu a').forEach(link => {
  link.addEventListener('click', function () {
    if (header && header.classList.contains('header-show')) {
      header.classList.remove('header-show');

      if (headerToggleBtn) {
        headerToggleBtn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`;
      }
    }
  });
});

/**
 * Toggle mobile navigation dropdowns
 */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(button => {

  button.addEventListener('click', function (e) {
    e.preventDefault();

    this.parentNode.classList.toggle('active');
    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');

    e.stopImmediatePropagation();
  });

});


/**
 * Hide mobile nav when clicking a nav link
 */
document.querySelectorAll('#navmenu a').forEach(navmenu => {
  navmenu.addEventListener('click', () => {
    if (document.querySelector('.header-show')) {
      headerToggle();
    }
  });
});

/**
 * Toggle mobile nav dropdowns
 */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
  navmenu.addEventListener('click', function(e) {
    e.preventDefault();
    this.parentNode.classList.toggle('active');
    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
    e.stopImmediatePropagation();
  });
});

/**
 * Preloader
 */
const preloader = document.querySelector('#preloader');

if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove();
  });
}

/**
 * Scroll top button
 */
const scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }
}

if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

/**
 * Animation on scroll
 */
function aosInit() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
}

window.addEventListener('load', aosInit);

/**
 * Typed text
 */
const selectTyped = document.querySelector('.typed');

if (selectTyped && typeof Typed !== 'undefined') {
  let typed_strings = selectTyped.getAttribute('data-typed-items');
  typed_strings = typed_strings.split(',');

  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

/**
 * Pure Counter
 */
if (typeof PureCounter !== 'undefined') {
  new PureCounter();
}

/**
 * Skills animation
 */
document.querySelectorAll('.skills-animation').forEach((item) => {
  if (typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');

        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }
});

/**
 * GLightbox
 */
if (typeof GLightbox !== 'undefined') {
  const glightbox = GLightbox({
    selector: '.glightbox'
  });
}

/**
 * Swiper initialisation removed.
 * The Testimonials section was removed, so there are no remaining
 * slider elements to initialise with Splide.
 */

/**
 * Correct scrolling position for hash links
 */
window.addEventListener('load', function() {
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);

    if (section) {
      setTimeout(() => {
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;

        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});


/**
 * Nav menu scrollspy
 * Only handles links to sections on the current page.
 */
const navmenulinks = document.querySelectorAll('.navmenu a');

function navmenuScrollspy() {

  navmenulinks.forEach(link => {

    const href = link.getAttribute('href');

    // Ignore links to other HTML pages
    if (!href || !href.startsWith('#')) {
      return;
    }

    const section = document.querySelector(href);

    if (!section) return;

    const position = window.scrollY + 200;

    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {

      document.querySelectorAll('.navmenu a.active').forEach(item => {
        item.classList.remove('active');
      });

      link.classList.add('active');

    }

  });

}

window.addEventListener('load', navmenuScrollspy);
window.addEventListener('scroll', navmenuScrollspy);

/**
 * Initialise Splide slider
 */
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('#featured-projects');

  if (slider && typeof Splide !== 'undefined') {
    new Splide(slider, {
      type: 'loop',
      perPage: 2,
      perMove: 1,
      gap: '20px',
      autoplay: true,
      interval: 3000,
      breakpoints: {
        768: {
          perPage: 1
        }
      }
    }).mount();
  }
});

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("php/contact.php", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      alert(result.message);

      if (result.status === "success") {
        contactForm.reset();
      }

    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  });
}
// Portfolio filtering
document.addEventListener('DOMContentLoaded', function () {

  const container = document.querySelector('.portfolio-container');

  if (!container || typeof Isotope === 'undefined') return;

  // Get existing Isotope instance or create one
  let iso = Isotope.data(container);

  if (!iso) {
    iso = new Isotope(container, {
      itemSelector: '.portfolio-item',
      layoutMode: 'masonry'
    });
  }

  document.querySelectorAll('.portfolio-filters li').forEach(button => {

    button.addEventListener('click', function () {

      document.querySelector('.portfolio-filters .filter-active')
        ?.classList.remove('filter-active');

      this.classList.add('filter-active');

      iso.arrange({
        filter: this.getAttribute('data-filter')
      });

    });

  });

});