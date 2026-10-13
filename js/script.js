/**
 * Updates the navigation bar's appearance based on the scroll position.
 *
 * Adds the "scrolled" class when the page is scrolled more than 30 pixels
 * and removes it when the page returns to the top.
 *
 * @returns {void}
 */
const navbar = document.querySelector(".navbar");
function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

/**
 * Observes sections while the user scrolls through the page.
 * Detects which section is currently visible in the viewport.
 * Removes the active class from all navigation links.
 * Adds the active class to the corresponding navigation link.
 * Keeps the navigation state synchronized with the current section.
 */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav_btn");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.1
});
sections.forEach(section => observer.observe(section));


/**
 * Displays a specific reference based on the given index.
 * Loads the reference text and name in the selected language.
 * Updates the reference image to match the current entry.
 * Resets and updates the colors of the navigation dots.
 * Highlights the current reference and marks previous and next entries.
 */

const references = [
    {
        quote: "reference1Quote",
        name: "reference1Name",
        image: "img/place holder 3.png"
    },
    {
        quote: "reference2Quote",
        name: "reference2Name",
        image: "img/place holder 2.png"
    },
    {
        quote: "reference3Quote",
        name: "reference3Name",
        image: "img/place holder 1.png"
    }
];

let currentReference = 0;
const referenceQuote = document.getElementById("referenceQuote");
const referenceName = document.getElementById("referenceName");
const referenceImage = document.getElementById("referenceImage");
const referenceDots = document.querySelectorAll(".reference-dot");

function showReference(index) {
    if (!referenceQuote || !referenceName || !referenceImage) {
        return;}
    const reference = references[index];
    const language = localStorage.getItem("language") || "en";
    referenceQuote.textContent = translations[language][reference.quote];
    referenceName.textContent = translations[language][reference.name];
    referenceImage.src = reference.image;
    referenceDots.forEach((dot, dotIndex) => {
        dot.classList.remove("dotblue", "dotgreen", "dotpurple");
        if (dotIndex < index) {
            dot.classList.add("dotpurple");
        } else if (dotIndex === index) {
            dot.classList.add("dotblue");
        } else {
            dot.classList.add("dotgreen");
        }
    });
}

/**
 * Advances to the next reference in the list.
 * Increases the current reference index by one.
 * Resets the index to the first reference when reaching the end.
 * Updates the displayed reference using the new index.
 */

const referenceNext = document.getElementById("referenceNext");
if (referenceNext) {
    referenceNext.addEventListener("click", function () {
        currentReference++;
        if (currentReference >= references.length) {
            currentReference = 0;
        }
        showReference(currentReference);
    });
}

/**
 * Moves to the previous reference in the list.
 * Decreases the current reference index by one.
 * Resets to the last reference when reaching the beginning.
 * Updates the displayed reference using the new index.
 */

const referencePrev = document.getElementById("referencePrev");
if (referencePrev) {
    referencePrev.addEventListener("click", function () {
        currentReference--;
        if (currentReference < 0) {
            currentReference = references.length - 1;
        }
        showReference(currentReference);
    });
}

const screenPadding = 24;
const lineGap = 40;

/**
 * Calculates the horizontal starting position of a line.
 *
 * @param {DOMRect} rect - The bounding rectangle of the parent element.
 * @param {'left' | 'right'} direction - The direction in which the line extends.
 * @param {number} positionPercent - The horizontal position in percent.
 * @returns {number} The starting position of the line in pixels.
 */

function getLineStart(rect, direction, positionPercent) {
    const position =
        positionPercent === 100
            ? direction === "left"
                ? rect.left
                : rect.right
            : rect.left + rect.width * positionPercent / 100;
    return direction === "left"
        ? position - lineGap
        : position + lineGap;
}

/**
 * Updates the width of a line based on its parent's position.
 *
 * @param {string} lineSelector - The CSS selector of the line element.
 * @param {'left' | 'right'} direction - The direction in which the line extends.
 * @param {number} positionPercent - The horizontal position in percent.
 * @returns {void}
 */

function updateLineWidth(lineSelector, direction, positionPercent) {
    const line = document.querySelector(lineSelector);
    if (!line) return;
    const parentRect = line.parentElement.getBoundingClientRect();
    const lineStart = getLineStart(parentRect, direction, positionPercent);
    const width = direction === "left"
        ? lineStart - screenPadding
        : document.documentElement.clientWidth - lineStart - screenPadding;
    line.style.width = `${Math.max(0, width)}px`;
}

/**
 * Updates all decorative lines across the different sections.
 * Sets the direction and position of each line individually.
 * Adjusts the line widths based on the current screen size.
 * Keeps the decorative elements aligned with their sections.
 */

function updateAllLines() {
    updateLineWidth('.green_line', 'left', 100);
    updateLineWidth('.blue_line', 'right', 46);
    updateLineWidth('.violet_line', 'left', 100);
    updateLineWidth('.green_line_references', 'right', 100);
    updateLineWidth('.green_line_contact', 'right', 63);
    updateLineWidth('.blue_line_contact', 'left', 100);
    updateLegalNoticeLines();
}

/**
 * Updates all decorative lines when the window size changes.
 * Also updates the lines when the page has finished loading.
 * Ensures the correct line widths are applied immediately.
 * Keeps the decorative lines responsive across different screen sizes.
 */

window.addEventListener('resize', updateAllLines);
window.addEventListener('load', updateAllLines);
updateAllLines();

/**
 * Calculates the left and right line widths around each heading.
 * Measures the exact position and width of the h5 element.
 * Leaves a fixed 40px gap between the lines and the heading.
 * Positions the lines on the left and right side of the heading.
 * Keeps both legal notice and privacy policy responsive.
 */
function updateLegalNoticeLines() {
    const heads = document.querySelectorAll('.legal_notice_head, .privacy_policy_head');
    heads.forEach(head => {
        const title = head.querySelector('h5');
        const leftLine = head.querySelector('.violet_line_legal_notice, .violet_line_privacy');
        const rightLine = head.querySelector('.violet_line_legal_notice2, .violet_line_privacy2');
        if (!title || !leftLine || !rightLine) return;
        const headRect = head.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();
        const gap = 40;
        const leftWidth = titleRect.left - headRect.left - gap;
        const rightWidth = headRect.right - titleRect.right - gap;
        leftLine.style.width = `${Math.max(0, leftWidth)}px`;
        rightLine.style.width = `${Math.max(0, rightWidth)}px`;
    });
}

/**
 * Controls the mobile navigation menu and burger button.
 * Toggles the menu open or closed when the burger button is clicked.
 * Updates the aria-expanded attribute for accessibility.
 * Closes the mobile menu when a navigation link is selected.
 * Keeps the burger button and menu overlay synchronized.
 */

const burgerMenu = document.querySelector('.burger_menu');
const mobileMenuOverlay = document.querySelector('.mobile_menu_overlay');
const mobileNavLinks = document.querySelectorAll('.mobile_nav_btn');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    mobileMenuOverlay.classList.toggle('open');
    const isOpen = burgerMenu.classList.contains('open');
    burgerMenu.setAttribute('aria-expanded', isOpen);
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('open');
        burgerMenu.setAttribute('aria-expanded', 'false');
    });

});

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-enabled");

  /**
   * Adds a visibility animation to a section when it enters the viewport.
   * The section is observed only until it becomes visible for the first time.
   *
   * @param {string} selector - The CSS selector of the section to observe.
   * @param {number} [threshold=0.15] - The proportion of the section that must
   * be visible before the animation is triggered.
   * @returns {void}
   */
  function observeSection(selector, threshold = 0.15) {
    const section = document.querySelector(selector);
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;}
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);}});},
      { threshold }
    );
    observer.observe(section);}
  observeSection(".about_section");
  observeSection(".skills_section");
  observeSection(".portfolio_section");
  observeSection(".contact_section");});