import * as API from '/colorDispenser_js/API.mjs';
import * as footer from '/colorDispenser_js/footer.mjs';
import * as help from '/colorDispenser_js/help.mjs';

const language_path = "/language/";
const $language = document.querySelector('.language');
const languages = await (await fetch(API.rest_4)).json();

let current_module_path = language_path + "english.json";
export let language_module;

const language_module_cache = {};

(function main() {
    set_default_language();

    fetch(current_module_path)
    .then(res => res.json())
    .then(target_module => {
        language_module_cache[current_module_path] = target_module;
        language_change(target_module);
    });
})();

function language_change(target_module) {
    language_module = target_module;
    document.querySelector('html').lang = language_module.code;
    document.querySelector('.help').textContent = language_module.str_3;
    document.querySelector('.last_image_description').textContent = language_module.str_4;
    document.querySelector('.selected_color_description').textContent = language_module.str_5;
    document.querySelector('.palette_description').textContent = language_module.str_7;
    document.querySelector('.magnifier_description').textContent = language_module.str_8;
    document.querySelector('.mouse_color_description').textContent = language_module.str_9;
    document.querySelector('.palette_clear_button').textContent = language_module.str_11;
    document.querySelector('.setting').textContent = language_module.str_12;
    document.querySelector('.copy_form_description').textContent = language_module.str_13;
    document.querySelector('.magnifier_value_description').textContent = language_module.str_14;
    document.querySelector('.setting_page_description').textContent = language_module.str_12;
    document.querySelector('.help_description').textContent = language_module.str_3;
    document.querySelector('.dark_mode_description').textContent = language_module.str_21;

    footer.update_process_string();
    help.set_help_page(help.current_page);
    create_language_navigation();
}

function set_default_language() {
    const current_language = (navigator.language).toLowerCase();
    if (current_language.startsWith("ko")) {
        current_module_path = language_path + "?????????.json";
    }
    else if (current_language.startsWith("jp")) {
        current_module_path = language_path + "?????????.json";
    }
    else if (current_language.startsWith("cn")) {
        current_module_path = language_path + "??????(??????).json";
    }
    else if (current_language.startsWith("es")) {
        current_module_path = language_path + "espa??ol.json";
    }
    else if (current_language.startsWith("fr")) {
        current_module_path = language_path + "fran??ais.json";
    }
    else if (current_language.startsWith("de")) {
        current_module_path = language_path + "Deutsche.json";
    }
    else if (current_language.startsWith("ru")) {
        current_module_path = language_path + "??????????????.json";
    }
    else {
        current_module_path = language_path + "english.json";
    }
}

async function create_language_navigation() {
    const $language_discription = document.createElement('span');
    $language_discription.classList.add('language_discription');
    $language_discription.textContent = language_module.str_0;

    const $language_items = document.createElement('div');
    $language_items.classList.add('language_items');

    let language_number = 1;
    for (const language of languages) {
        const $language_item = document.createElement('div');
        $language_item.classList.add('language_item');
        $language_item.classList.add('language_' + language_number.toString());
        $language_item.textContent = language;

        if ($language_item.textContent == $language_discription.textContent) { // ?????? ????????? ????????? ????????? ???????????? ??????
            $language_item.style.color = 'var(--selected-language-color)';
        }

        $language_item.addEventListener('click', async e => { // ????????? ?????? ?????? ????????? ??????
            current_module_path = language_path + language + '.json';

            let target_module;
            if (current_module_path in language_module_cache) { // ?????? ??????
                target_module = language_module_cache[current_module_path];
            }
            else {
                target_module = await (await fetch(current_module_path)).json();
                language_module_cache[current_module_path] = target_module
            }

            language_change(target_module);
        });

        $language_items.appendChild($language_item);
        ++language_number;
    }

    $language.innerHTML = '';
    $language.appendChild($language_discription);
    $language.appendChild($language_items);
}