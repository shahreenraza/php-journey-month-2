# 1. Complete Folder Structure (Annotated)

iPortfolio/
│
├── assets/                  # Contains website resources
│   │
│   ├── css/                 # Stylesheets for website design
│   ├── img/                 # Images used on the website
│   ├── js/                  # JavaScript files
│   ├── scss/                # SCSS source files
│   └── vendor/              # Third-party libraries and plugins
│
├── forms/                   # Contact form processing
│   └── contact.php          # Handles contact form submissions
│
├── Readme.txt               # Template information
├── index.html               # Main homepage
├── portfolio-details.html   # Portfolio project details
├── service-details.html     # Service details page
└── starter-page.html        # Basic starter page


## 2. Third-Party Libraries

| Library         | Purpose                          | Version |

| AOS             | Scroll animations                | Not verified |
| Bootstrap       | Responsive layout and components | 5.3.3        |
| Bootstrap Icons | Website icons                    | Not verified |
| GLightbox       | Image and media lightbox         | Not verified |
| imagesLoaded    | Detects image loading            | Not verified |
| Isotope Layout  | Portfolio filtering and layout   | Not verified |
| PHP Email Form  | Contact form processing          | Not verified |
| PureCounter     | Animated counters                | Not verified |
| Swiper          | Sliders and carousels            | Not verified |
| Typed.js        | Typing animation                 | Not verified |
| Waypoints       | Detects viewport scrolling       | Not verified |


## 3. Colour Scheme

The colour scheme is defined in the main CSS file
inside the `:root` selector.

The template uses CSS variables to manage colours.

- --background-color: #ffffff
  - Main website background.
- --default-color: #272829
  - Default text colour.
- --heading-color: #050d18
  - Heading colour.
- --accent-color: #149ddd
  - Used for buttons, links and highlights.
- --surface-color: #ffffff
  - Background of cards and boxed elements.
- --contrast-color: #ffffff
  - Text colour on contrasting backgrounds.

To change the website's main accent colour,
we can update the --accent-color variable in main.css.

## 4. Repeated HTML Blocks

After comparing `index.html` and `portfolio-details.html`, the following sections are repeated:

1. Header/Sidebar – contains the profile information and navigation menu.
2. Navigation Menu – contains links to website sections.
3. Footer – contains common footer information.
4. Scroll-to-top Button – provides quick navigation to the top.

### Future PHP Structure

- `header.php` – will contain the common header and navigation.
- `footer.php` – will contain the common footer.

These files can be included in other PHP pages to avoid repeating HTML code.

## 5. JavaScript Plugin Initialisations in main.js

The `assets/js/main.js` file initialises the following third-party plugins:

1. **AOS:** Adds animations when elements appear during scrolling. Duration is 600 ms.
2. **Typed.js:** Creates a typing animation with looping text, typing speed of 100 and back speed of 50.
3. **PureCounter:** Creates animated number counters.
4. **Waypoint:** Detects when skill items enter the viewport and animates the progress bars.
5. **GLightbox:** Opens images or media in a lightbox popup using the `.glightbox` selector.
6. **Isotope:** Arranges portfolio items and provides category-based filtering. It uses imagesLoaded to wait for images to load before arranging them.
7. **Swiper:** Creates sliders and carousels. It also supports custom pagination for swiper tabs.

These initialisations make the website more interactive and improve its visual presentation.

## 6. Three Things the Template Does Badly

### a. Empty Image Alt Attributes
Some images in `index.html`, such as the hero background and profile image, have empty `alt` attributes (`alt=""`). This can reduce accessibility because screen readers cannot describe meaningful images. Descriptive alt text should be added to informative images.

### b. Inline CSS Styling
The iframe in `index.html` uses inline CSS:

`style="border:0; width: 100%; height: 270px;"`

This mixes HTML and CSS, making the code harder to maintain. Moving these styles into `main.css` would improve code organisation and maintainability.

### c. Render-Blocking JavaScript
The template loads its vendor JavaScript files and `main.js` using ordinary script tags without `async` or `defer`.

This can block HTML parsing while scripts are downloaded and executed, potentially delaying page rendering. Using `defer` for suitable scripts can improve page-loading performance.

## 7. Estimated Hours for Client Conversion

The estimated time required to convert the iPortfolio template into a working client website is approximately **24 hours**.

| Task                                      | Estimated Hours |

| Understand template structure and setup          | 2 |
| Customise colours, fonts and layout              | 3 |
| Replace demo text and images with client content | 3 |
| Develop and configure required pages             | 4 |
| Configure contact form and backend               | 4 |
| Responsive design and device testing             | 3 |
| Bug fixing and performance optimisation          | 4 |
| Final testing and deployment                     | 1 |
| **Total**                                   | **24 hours** |

This estimate assumes that the existing template will be reused and customised rather than building the entire website from scratch. The actual time may vary depending on the client's requirements and additional features.