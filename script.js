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