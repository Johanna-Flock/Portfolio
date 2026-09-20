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
            "Hallo, ich bin Johanna und liebe es, Anwendungen zu entwickeln, die schlicht, übersichtlich und funktional sind. Im technischen Support arbeite ich täglich mit Kund:innen, verstehe ihre Anliegen und suche nach der besten, möglichen Lösung für ihre Anforderungen. Mein Ziel ist es, Software bereitzustellen, die Menschen tatsächlich weiterhilft.",


        problemSolvingText:
            "In einen richtigen Flow komme ich, wenn ich für Kund:innen passgenaue Funktionen entwickeln kann. Durch Feedback und Austausch finde ich heraus, welche Bedürfnisse und Herausforderungen ein Produkt lösen soll. Gute Software beginnt für mich mit dem Verständnis der Menschen, die sie nutzen.",


        passionText:
            "Im Team überlege ich gerne, wie sich neue Funktionen oder Produkte sinnvoll in eine bestehende Architektur integrieren lassen. Besonders spannend finde ich es, wenn daraus eine elegante Lösung entsteht, die einfach und intuitiv zu bedienen ist.",

        locationText:
            "Ich lebe in Augsburg, Bayern und arbeite am liebsten hybrid.",


        skillsHeadline: "Skills",

        skillsText: "Im technischen Support wollte ich irgendwann mehr, als nur Probleme zu lösen – ich wollte selbst verstehen, entwickeln und Lösungen schaffen. So bin ich zur Webentwicklung und Programmierung gekommen. Durch meine eigenen Projekte lerne ich kontinuierlich dazu und entwickle meine Fähigkeiten immer weiter.",

        skillsOfferStart: 'Lust auf',
        skillsNews: 'etwas Neues',

        skillsCurious: "Du hast eine spannende Technologie oder ein Projekt im Kopf?",

        portfolioText: "Entdecke meine Projekte und meine Fähigkeiten in Aktion.",

        portfolioPolloLoco: "Jump-and-Run-Spiel mit objektorientiertem Ansatz. Hilf Pepe dabei, Münzen und Tabasco-Sauce zu sammeln und gegen die verrückten Hühner zu kämpfen.",

        portfolioPokedex: "Eine interaktive Pokémon-Bibliothek auf Basis der PokéAPI – entdecke, durchsuche und katalogisiere Informationen zu deinen Lieblings-Pokémon.",

        portfolioJoin: "Task-Manager nach dem Kanban-Prinzip. Erstelle und organisiere Aufgaben per Drag & Drop, weise sie Nutzer:innen zu und verwalte sie nach Kategorien.",

        portfolioDABubble: "Eine Slack-inspirierte Anwendung für moderne Teamkommunikation – mit intuitiver Oberfläche, Echtzeit-Nachrichten und übersichtlicher Organisation in verschiedenen Channels.",

        reference1Quote: "Johanna hat das Team mit ihrer großartigen Organisation und klaren Kommunikation zusammengehalten. Ohne ihr Engagement wären wir nicht so weit gekommen.",
        reference1Name: "V. Schuster - Team Partner",

        reference2Quote: "Johanna ist sehr zuverlässig und bringt immer kreative Ideen ins Team ein. Ihre Kommunikations- und Problemlösungsfähigkeiten sind eine echte Bereicherung.",
        reference2Name: "S. Müller - Team Partner",

        reference3Quote: "Die Zusammenarbeit mit Johanna war eine tolle Erfahrung. Sie geht Herausforderungen mit Begeisterung an und findet immer eine gute Lösung.",
        reference3Name: "L. Weber - Team Partner",

        contactTitle: "Kontakt",

        contactQuestion: "Lass uns etwas gemeinsam entwickeln.",

        contactText: "Ich freue mich auf neue Herausforderungen in der Frontend- und Produktentwicklung – besonders an der Schnittstelle zwischen Technik, Nutzer und Produkt.",
        contactOffer: "Du hast ein Projekt oder eine Position, bei der ich mich einbringen könnte? Ich freue mich, von dir zu hören.",

        namePlaceholder: "Dein Name",
        nameRequired: "Dein Name wird benötigt.",
        nameInvalid: "Dein Name muss mindestens 2 Zeichen enthalten.",

        emailPlaceholder: "Deine E-Mail",
        emailRequired: "Deine E-Mail wird benötigt.",
        emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",

        messagePlaceholder: "Deine Nachricht",
        messageRequired: "Deine Nachricht wird benötigt.",
        messageInvalid: "Deine Nachricht muss mindestens 10 Zeichen enthalten.",

        privacyTextStart: "Ich habe die",
        privacyPolicy: "Datenschutzerklärung",
        privacyTextEnd: "gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
        privacyError: "Bitte akzeptiere die Datenschutzerklärung.",

        sendMessage: "Nachricht senden",
    },


    en: {

        aboutTitle:
            "About Me",

        aboutText:
            "Hello, I’m Johanna, and I love developing applications that are simple, clear, and functional. In technical support, I work with customers daily, understand their needs, and look for the best possible solution to meet their requirements. My goal is to create software that genuinely helps people.",

        problemSolvingText:
            "I get into a real flow when I can develop tailored features for customers. Through feedback and collaboration, I find out which needs and challenges a product should address. For me, good software starts with understanding the people who use it.",

        passionText:
            "As part of a team, I enjoy thinking about how new features or products can be meaningfully integrated into an existing architecture. I find it especially exciting when this results in an elegant solution that is simple and intuitive to use.",


        locationText:
            "I live in Augsburg, Bavaria, and I prefer working in a hybrid setup.",





        skillsHeadline: "Skills",

        skillsText: "Through my work in technical support, I eventually wanted to do more than just solve problems – I wanted to understand, develop, and create solutions myself. That’s how I got into web development and programming. Through my own projects, I continuously learn and develop my skills further.",

        skillsOfferStart: 'Looking for',
        skillsNews: 'something new',

        skillsCurious: "Do you have an exciting technology or project in mind?",

        portfolioText: "Explore a selection of my work here -Interact with projects to see my skills in action",

        portfolioPolloLoco: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy chicken.",

        portfolioPokedex: "Based on the PokéAPI a simple library that provides and catalogues pokemon information.",
        portfolioJoin: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",

        portfolioDABubble: "This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.",

        reference1Quote: "Johanna really kept the team together with her great organization and clear communication. We wouldn't have got this far without her commitment.",
        reference1Name: "V. Schuster - Team Partner",

        reference2Quote: "Johanna is very reliable and always brings creative ideas to the team. Her communication and problem-solving skills are a real asset.",
        reference2Name: "S. Müller - Team Partner",

        reference3Quote: "Working with Johanna was a great experience. She approaches challenges with enthusiasm and always finds a good solution.",
        reference3Name: "L. Weber - Team Partner",

        contactTitle: "Contact",

        contactQuestion: "Let’s build something together",

        contactText: "I’m looking forward to new challenges in frontend and product development – especially at the intersection of technology, users, and product.",

        contactOffer: "Do you have a project or position where I could contribute? I’d love to hear from you.",


        namePlaceholder: "Your Name",
        nameRequired: "Your name is required.",
        nameInvalid: "Your name needs at least 2 characters.",

        emailPlaceholder: "Your E-Mail",
        emailRequired: "Your email is required.",
        emailInvalid: "Please enter a valid email address.",

        messagePlaceholder: "Your message",
        messageRequired: "Your message is required.",
        messageInvalid: "Your message needs at least 10 characters.",

        privacyTextStart: "I've read the",
        privacyPolicy: "privacy policy",
        privacyTextEnd: "and agree to the processing of my data as outlined.",
        privacyError: "Please accept the privacy policy.",

        sendMessage: "Send message",



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
    showReference(currentReference);
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