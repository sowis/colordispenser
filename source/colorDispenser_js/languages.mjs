const language_path = "/language/";

let current_module_path = language_path + "english.json";
export let language_module;

(function main() {
    set_default_language();

    fetch(current_module_path)
    .then(res => res.json())
    .then(language_change);
})();

function language_change(target_module) {
    language_module = target_module;
    document.querySelector('.help').textContent = language_module.str_3;
    document.querySelector('.last_image_description').textContent = language_module.str_4;
    document.querySelector('.selected_color_description').textContent = language_module.str_5;
}

function set_default_language() {
    const current_language = (navigator.language).toLowerCase();
    if (current_language.startsWith("ko")) {
        current_module_path = language_path + "한국어.json";
    }
    else {
        current_module_path = language_path + "english.json";
    }

    current_module_path = language_path + "english.json";
}