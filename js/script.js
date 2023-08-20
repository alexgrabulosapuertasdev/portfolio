const menu = document.getElementById('menu');
const menuToogle = document.getElementById('menu__toggle');
const menuToggleIcon = document.getElementById('menu__toggle-icon');
menuToogle.addEventListener('click', () => {
    menu.classList.toggle('menu--active');
    menuToggleIcon.classList.toggle('menu__toggle-icon--active');
});

const colorsItems = document.querySelectorAll('.colors__item');
const rootStyles = document.documentElement.style;
colorsItems.forEach(colorItem => {
    const { color } = colorItem.dataset;

    colorItem.addEventListener('click', () => {
        rootStyles.setProperty('--primary-color', color);
    });
});

const languagesItem = document.querySelectorAll('.languages__item');
const textsToChange = document.querySelectorAll('[data-section]');
const headerTitle = document.getElementById('header__title');
const aboutCurriculum = document.getElementById('about__curriculum');
const CURRICULUM_LINKS = {
    ES: './files/Curriculum(ES) -  Álex Grabulosa Puertas.pdf',
    EN: './files/Curriculum(EN) -  Alex Grabulosa Puertas.pdf',
};
const texts = {
    ES: {},
    EN: {},
};
async function fetchTexts() {
    texts.ES = await fetch('./languages/es.json').then(res => res.json());
    texts.EN = await fetch('./languages/en.json').then(res => res.json());
}
fetchTexts();
languagesItem.forEach(languageItem => {
    const { language } = languageItem.dataset;

    languageItem.addEventListener('click', async () => {
        for (const textToChange of textsToChange) {
            const { section, value } = textToChange.dataset;
            const text = texts[language.toUpperCase()][section][value];

            if (textToChange.hasAttribute('placeholder')) {
                textToChange.setAttribute('placeholder', text);
                continue;
            }

            if (textToChange.hasAttribute('value')) {
                textToChange.setAttribute('value', text);
                continue;
            }

            textToChange.innerHTML = text;
        }

        const headerTitleLength = headerTitle.innerText.length;
        rootStyles.setProperty('--header-title-length', headerTitleLength);

        aboutCurriculum.setAttribute('href', CURRICULUM_LINKS[language.toUpperCase()]);
    });
});

const body = document.body;
const themesItems = document.querySelectorAll('.themes__item');
themesItems.forEach(themeItem => {
    const { theme } = themeItem.dataset;

    themeItem.addEventListener('click', () => {
        if (theme === 'dark') {
            body.classList.remove('light');
        }

        if (theme === 'light') {
            body.classList.add('light');
        }
    });
});
