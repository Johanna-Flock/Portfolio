// Für das automatische Scrollen

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


//für die Referenzen-Slider

const references = [
    {
        quote: "Michael really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
        name: "V. Schuster - Team Partner",
        image: "img/place holder 3.png"
    },
    {
        quote: "Johanna is very reliable and always brings creative ideas to the team. Her communication and problem-solving skills are a real asset.",
        name: "S. Müller - Team Partner",
        image: "img/place holder 2.png"
    },
    {
        quote: "Working with Johanna was a great experience. She approaches challenges with enthusiasm and always finds a good solution.",
        name: "L. Weber - Team Partner",
        image: "img/place holder 1.png"
    }
];

let currentReference = 0;

const referenceQuote = document.getElementById("referenceQuote");
const referenceName = document.getElementById("referenceName");
const referenceImage = document.getElementById("referenceImage");
const referenceDots = document.querySelectorAll(".dotblue, .dotgreen");

function showReference(index) {
    const reference = references[index];
    referenceQuote.textContent = reference.quote;
    referenceName.textContent = reference.name;
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

document.getElementById("referenceNext").addEventListener("click", function () {
    currentReference++;
    if (currentReference >= references.length) {
        currentReference = 0;
    }
    showReference(currentReference);
});


document.getElementById("referencePrev").addEventListener("click", function () {
    currentReference--;
    if (currentReference < 0) {
        currentReference = references.length - 1;
    }
    showReference(currentReference);
});


//
// Übersetzungen
//

const translations = {

    de: {
        aboutTitle: "Über mich",

        aboutText:
            "Hey, ich bin Johanna! Ich bin leidenschaftliche Frontend-Entwicklerin und liebe es, schöne und funktionale Webseiten zu erstellen. Meine Reise mit dem Programmieren begann, als ich erkannt habe, wie viel Kraft darin steckt, Ideen durch Code zum Leben zu erwecken. Ich lasse mich ständig von der sich weiterentwickelnden Welt der Webtechnologien und den kreativen Lösungen anderer Entwickler inspirieren.",


        locationText:
            "Ich lebe in Augsburg, Bayern. Ich arbeite sehr gerne auch remote.",


        problemSolvingText:
            "Ich liebe es, Probleme zu lösen und innovative Lösungen zu entwickeln, die für Nutzer gut gestaltet, barrierefrei und genau auf ihre Bedürfnisse abgestimmt sind.",


        passionText:
            "Meine große Leidenschaft ist es, benutzerfreundliche und zugängliche Webseiten zu erstellen. Deshalb schätze ich den Kontakt mit Nutzern und entwickle Lösungen, die ihre Erwartungen erfüllen."

    },


    en: {

        aboutTitle:
            "About Me",

        aboutText:
            "Hey there, I'm Johanna! I'm a passionate frontend developer who loves creating beautiful and functional websites. My journey in coding started when I realized the power of turning ideas into reality through code. I'm constantly inspired by the ever-evolving world of web technologies and the creative solutions developers come up with.",


        locationText:
            "I am located in Augsburg, Bavaria. I am happy to work remotely.",


        problemSolvingText:
            "I love solving problems and creating innovative solutions that are well designed for users, accessible and meet their needs exactly.",


        passionText:
            "My big passion is to create user-friendly and accessible websites. Therefore, I appreciate being in contact with users and developing solutions that meet their expectations."

    }

};

//
// Sprache setzen
//

function setLanguage(language) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element => {
        const key = element.dataset.i18n;
        // Prüfen, ob Übersetzung existiert
        if (translations[language][key]) {
            // Falls es ein Input/textarea mit Placeholder ist
            if (element.placeholder !== undefined && element.tagName !== "BUTTON") {
                element.placeholder = translations[language][key];
            } 
            // Normaler Text
            else {
                element.textContent = translations[language][key];
            }
        }

    });

    // Sprache speichern
    localStorage.setItem("language", language);
}


//
// Sprache beim Laden bestimmen
//

const savedLanguage = localStorage.getItem("language") || "en";
setLanguage(savedLanguage);


//
// Sprachbuttons
//

const languageButtons = document.querySelectorAll(".language_btn");
languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        const language = button.dataset.language;
        setLanguage(language);
        // Aktiven Button wechseln
        languageButtons.forEach(btn => {
            btn.classList.remove("active_language_button");
        });
        button.classList.add("active_language_button");

    });

});


//
// Aktiven Sprachbutton beim Laden setzen
//

languageButtons.forEach(button => {

    if (button.dataset.language === savedLanguage) {
        button.classList.add("active_language_button");
    } 
    
    else {
        button.classList.remove("active_language_button");
    }

});


///Lines
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


function updateAllLines() {

    // Hero
    updateLineWidth('.green_line', 'left', 100);

    // Skills
    updateLineWidth('.blue_line', 'right', 46);

    // Portfolio
    updateLineWidth('.violet_line', 'left', 100);

    // Contact
    updateLineWidth('.green_line_contact', 'right', 63);
    updateLineWidth('.blue_line_contact', 'left', 100);

    // Legal Notice
    updateLineWidth('.violet_line_legal_notice', 'left', 63);
    updateLineWidth('.violet_line_legal_notice2', 'right', 63);
}


window.addEventListener('resize', updateAllLines);
window.addEventListener('load', updateAllLines);

updateAllLines();