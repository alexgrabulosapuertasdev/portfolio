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
    'ES': './files/Curriculum(ES) -  Álex Grabulosa Puertas.pdf',
    'EN': './files/Curriculum(EN) -  Alex Grabulosa Puertas.pdf',
};
languagesItem.forEach(languageItem => {
    const { language } = languageItem.dataset;

    languageItem.addEventListener('click', async () => {
        const res = await fetch(`./languages/${language}.json`).then(res => res.json());
        
        for (const textToChange of textsToChange) {
            const { section, value } = textToChange.dataset;

            if (textToChange.hasAttribute('placeholder')) {
                textToChange.setAttribute('placeholder', res[section][value]);
                continue;
            }

            if (textToChange.hasAttribute('value')) {
                textToChange.setAttribute('value', res[section][value]);
                continue;
            }

            textToChange.innerHTML = res[section][value];
        }

        const headerTitleLength = headerTitle.innerText.length;
        rootStyles.setProperty('--header-title-length', headerTitleLength + 1);

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
