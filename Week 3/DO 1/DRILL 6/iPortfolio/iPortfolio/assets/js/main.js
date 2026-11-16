/**
 * Header toggle
 */
const headerToggleBtn = document.querySelector('.header-toggle');

function headerToggle() {
  document.querySelector('#header').classList.toggle('header-show');
  headerToggleBtn.classList.toggle('bi-list');
  headerToggleBtn.classList.toggle('bi-x');
}

if (headerToggleBtn) {
  headerToggleBtn.addEventListener('click', headerToggle);
}

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
 * Isotope layout and filters
 */
document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
  let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
  let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  let isotopeInstance;

  imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
    if (typeof Isotope !== 'undefined') {
      isotopeInstance = new Isotope(
        isotopeItem.querySelector('.isotope-container'),
        {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        }
      );
    }
  });

  isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
    filters.addEventListener('click', function() {
      isotopeItem.querySelector('.isotope-filters .filter-active')
        .classList.remove('filter-active');

      this.classList.add('filter-active');

      if (isotopeInstance) {
        isotopeInstance.arrange({
          filter: this.getAttribute('data-filter')
        });
      }

      if (typeof aosInit === 'function') {
        aosInit();
      }
    });
  });
});

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
 */
const navmenulinks = document.querySelectorAll('.navmenu a');

function navmenuScrollspy() {
  navmenulinks.forEach(navmenulink => {
    if (!navmenulink.hash) return;

    const section = document.querySelector(navmenulink.hash);

    if (!section) return;

    const position = window.scrollY + 200;

    if (
      position >= section.offsetTop &&
      position <= (section.offsetTop + section.offsetHeight)
    ) {
      document.querySelectorAll('.navmenu a.active').forEach(link => {
        link.classList.remove('active');
      });

      navmenulink.classList.add('active');
    } else {
      navmenulink.classList.remove('active');
    }
  });
}

window.addEventListener('load', navmenuScrollspy);
document.addEventListener('scroll', navmenuScrollspy);
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