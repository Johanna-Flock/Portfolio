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
        return;
    }
    const reference = references[index];
    const language = localStorage.getItem("language") || "en";
    referenceQuote.textContent =
        translations[language][reference.quote];
    referenceName.textContent =
        translations[language][reference.name];
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

document.getElementById("referenceNext").addEventListener("click", function () {
    currentReference++;
    if (currentReference >= references.length) {
        currentReference = 0;
    }
    showReference(currentReference);
});

/**
 * Moves to the previous reference in the list.
 * Decreases the current reference index by one.
 * Resets to the last reference when reaching the beginning.
 * Updates the displayed reference using the new index.
 */

document.getElementById("referencePrev").addEventListener("click", function () {
    currentReference--;
    if (currentReference < 0) {
        currentReference = references.length - 1;
    }
    showReference(currentReference);
});

/**
 * Updates the width of a decorative line based on its position.
 * Calculates the available space between the line and the screen edge.
 * Supports positioning the line from either the left or right side.
 * Uses the given percentage to determine the line's starting position.
 * Prevents the line from extending beyond the screen boundaries.
 */

const screenPadding = 24;
const lineGap = 40;

function updateLineWidth(lineSelector, direction, positionPercent) {
    const line = document.querySelector(lineSelector);
    if (!line) return;
    const parent = line.parentElement;
    const parentRect = parent.getBoundingClientRect();
    let lineStart;
    if (direction === 'left') {
        if (positionPercent === 100) {
            lineStart = parentRect.left - lineGap;
        } else {
            lineStart =
                parentRect.left +
                (parentRect.width * positionPercent / 100) -
                lineGap;
        }

        const width = Math.max(
            0,
            lineStart - screenPadding
        );
        line.style.width = `${width}px`;
    }

    if (direction === 'right') {
        if (positionPercent === 100) {
            lineStart = parentRect.right + lineGap;
        } else {
            lineStart =
                parentRect.left +
                (parentRect.width * positionPercent / 100) +
                lineGap;
        }

        const width = Math.max(
            0,
            window.innerWidth - lineStart - screenPadding
        );

        line.style.width = `${width}px`;
    }
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
    updateLineWidth('.violet_line_legal_notice', 'left', 63);
    updateLineWidth('.violet_line_legal_notice2', 'right', 63);
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