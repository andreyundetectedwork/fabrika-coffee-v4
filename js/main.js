document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Custom Cursor & Parallax (Wow-moments) ---
    const cursor = document.getElementById('customCursor');
    const glassWrapper = document.getElementById('glassParallax');

    window.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }

        if (glassWrapper && window.innerWidth > 1024) {
            const rect = glassWrapper.getBoundingClientRect();
            const xCenter = rect.left + rect.width / 2;
            const yCenter = rect.top + rect.height / 2;
            const deltaX = (e.clientX - xCenter) * 0.03;
            const deltaY = (e.clientY - yCenter) * 0.03;
            glassWrapper.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
    });

    // --- 2. Mobile Burger Menu ---
    const burger = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const mobLinks = document.querySelectorAll('.mob-link');

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });

        mobLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
    }

    // --- 3. Menu Category Switcher (Chips) ---
    const chips = document.querySelectorAll('.chip-btn');
    const categories = document.querySelectorAll('.menu-category-content');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const targetCat = chip.getAttribute('data-category');

            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Synchronize active states across desktop & mobile chips if duplicate
            chips.forEach(c => {
                if (c.getAttribute('data-category') === targetCat) {
                    c.classList.add('active');
                }
            });

            categories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === `cat-${targetCat}`) {
                    cat.classList.add('active');
                }
            });
        });
    });

    // --- 4. Interactive Highlight Dish on Hover over Menu Items ---
    const menuItems = document.querySelectorAll('.menu-items-list');
    const highlightImg = document.getElementById('highlightImg');
    const highlightName = document.getElementById('highlightName');
    const highlightDesc = document.getElementById('highlightDesc');
    const highlightPrice = document.querySelector('.highlight-price');

    // Sample fallback images mapping or keeping img_04 for highlight
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const name = item.getAttribute('data-item-name');
            const desc = item.getAttribute('data-item-desc');
            const price = item.getAttribute('data-item-price');

            if (name && highlightName) highlightName.textContent = name;
            if (highlightDesc) highlightDesc.textContent = desc || '';
            if (price && highlightPrice) highlightPrice.textContent = price;
        });
    });

    // --- 5. Interactive Locations Switcher ---
    const locItems = document.querySelectorAll('.loc-item');
    locItems.forEach(loc => {
        loc.addEventListener('click', () => {
            locItems.forEach(l => l.classList.remove('active'));
            loc.classList.add('active');
            const mapUrl = loc.getAttribute('data-map');
            if (mapUrl) {
                window.open(mapUrl, '_blank');
            }
        });
    });

    // --- 6. Multi-language Translation Engine ---
    const translations = {
        sr: {
            nav_about: "O nama",
            nav_menu: "Meni",
            nav_contact: "Lokacije",
            hero_eyebrow: "Specijalitet kafe u Crnoj Gori",
            hero_title: "Vrhunska kafandžijska umetnost",
            hero_subtitle: "5 lokacija u Podgorici i Herceg-Novom",
            hero_cta_primary: "Naruči preko Glova",
            hero_cta_secondary: "Pogledaj Instagram",
            hero_status: "5 lokacija u Crnoj Gori",
            about_heading: "Naša filozofija i pristup",
            about_body: "Fabrika Coffee donosi beskompromisni pristup vrhunskom espresu, probranom zrnevlju i modernim metodama pripreme kafe kao što su V60, Nitro i Cold Brew. Naš prostor odlikuje toplo žuto svetlo, pažljivo odabrana zrna 100% arabike, kao i pažljivo praćeni mikrolotovi iz Kolumbije i Kenije. Svaka šoljica kafe je rezultat posvećenog rada naših barista i ljubavi prema zanatu.",
            menu_cat_drinks: "Kafa & Napici",
            menu_cat_food: "Hrana & Peciva",
            menu_cat_beans: "Kafa u Zrnu & Hario",
            highlight_title: "Specijalitet kuće",
            sub_flavored: "Kafa sa ukusima i ledena kafa",
            sub_filter: "Filter kafa i nitro",
            sub_teas: "Čajevi",
            sub_soft: "Bezalkoholna pića i sokovi",
            sub_alcohol: "Alkoholna pića i vino",
            sub_addons: "Dodaci",
            sub_sandwiches: "Sendviči",
            sub_cakes: "Kolači",
            sub_pastries: "Peciva i kroasani",
            sub_beans: "KAFA U ZRNU",
            sub_hario: "HARIO PROIZVODI",
            contact_heading: "Naše lokacije",
            contact_body: "Posetite nas na nekoj od 5 lokacija u Podgorici i Herceg-Novom. Uživajte u našoj kafi na licu mesta ili naručite dostavu putem Glova.",
            delivery_title: "Brza dostava & Kontakt",
            delivery_subtitle: "Naručite odmah ili nas kontaktirajte",
            social_label: "Pratite nas",
            footer_copyright: "© Fabrika Coffee. Sva prava zadržana."
        },
        en: {
            nav_about: "About",
            nav_menu: "Menu",
            nav_contact: "Locations",
            hero_eyebrow: "Specialty Coffee in Montenegro",
            hero_title: "Uncompromising Coffee Craft",
            hero_subtitle: "5 locations across Podgorica and Herceg-Novi",
            hero_cta_primary: "Order via Glovo",
            hero_cta_secondary: "Visit Instagram",
            hero_status: "5 locations across Montenegro",
            about_heading: "Our Philosophy & Craft",
            about_body: "Fabrika Coffee brings an uncompromising approach to premium espresso, carefully selected beans, and modern brewing methods including V60, Nitro, and Cold Brew. Our space is defined by warm yellow lighting, 100% specialty Arabica beans, and carefully tracked micro-lots from Colombia and Kenya. Every cup reflects the dedication of our baristas and our true passion for the craft.",
            menu_cat_drinks: "Coffee & Drinks",
            menu_cat_food: "Food & Pastries",
            menu_cat_beans: "Coffee Beans & Equipment",
            highlight_title: "House Specialty",
            sub_flavored: "Flavored & Iced Coffee",
            sub_filter: "Filter Coffee & Nitro",
            sub_teas: "Teas",
            sub_soft: "Soft Drinks & Juices",
            sub_alcohol: "Alcoholic Drinks & Wine",
            sub_addons: "Add-ons",
            sub_sandwiches: "Sandwiches",
            sub_cakes: "Cakes",
            sub_pastries: "Pastries & Croissants",
            sub_beans: "COFFEE BEANS",
            sub_hario: "HARIO PRODUCTS",
            contact_heading: "Our Locations",
            contact_body: "Visit us at any of our 5 locations across Podgorica and Herceg-Novi. Enjoy our coffee on-site or order delivery via Glovo.",
            delivery_title: "Fast Delivery & Contact",
            delivery_subtitle: "Order now or get in touch",
            social_label: "Follow us",
            footer_copyright: "© Fabrika Coffee. All rights reserved."
        },
        ru: {
            nav_about: "О нас",
            nav_menu: "Меню",
            nav_contact: "Локации",
            hero_eyebrow: "Спешелти кофе в Черногории",
            hero_title: "Бескомпромиссное кофейное ремесло",
            hero_subtitle: "5 локаций в Подгорице и Херцег-Нови",
            hero_cta_primary: "Заказать через Glovo",
            hero_cta_secondary: "Открыть Instagram",
            hero_status: "5 локаций в Черногории",
            about_heading: "Наша философия и подход",
            about_body: "Fabrika Coffee воплощает бескомпромиссный подход к премиальному эспрессо, отборному зерну и современным методам альтернативного заваривания, таким как V60, Nitro и Cold Brew. Наше пространство оформлено в мягких жёлтых тонах и создаёт уютную атмосферу, где каждый гость может насладиться 100% арабикой и микролотами из Колумбии и Кении. Каждая чашка — это результат мастерства наших бариста и подлинной страсти к своему делу.",
            menu_cat_drinks: "Кофе и напитки",
            menu_cat_food: "Еда и выпечка",
            menu_cat_beans: "Зерновой кофе и оборудование",
            highlight_title: "Специалитет",
            sub_flavored: "Кофе с сиропами и Айс-кофе",
            sub_filter: "Фильтр-кофе и нитро",
            sub_teas: "Чай",
            sub_soft: "Безалкогольные напитки и соки",
            sub_alcohol: "Алкогольные напитки и вино",
            sub_addons: "Добавки к кофе",
            sub_sandwiches: "Сэндвичи",
            sub_cakes: "Десерты",
            sub_pastries: "Выпечка и круассаны",
            sub_beans: "КОФЕ В ЗЁРНАХ",
            sub_hario: "ОБОРУДОВАНИЕ HARIO",
            contact_heading: "Наши локации",
            contact_body: "Посетите любую из наших 5 локаций в Подгорице и Херцег-Нови. Вы можете заказать кофе с собой, насладиться им в уютной атмосфере или оформить доставку через Glovo.",
            delivery_title: "Быстрая доставка и контакты",
            delivery_subtitle: "Закажите онлайн или свяжитесь с нами",
            social_label: "Мы в соцсетях",
            footer_copyright: "© Fabrika Coffee. Все права защищены."
        }
    };

    const langButtons = document.querySelectorAll('.lang-btn');

    function setLanguage(lang) {
        const dict = translations[lang];
        if (!dict) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        localStorage.setItem('fabrika_lang', lang);
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('fabrika_lang') || 'sr';
    setLanguage(savedLang);
});
