import * as utilities from '/colorDispenser_js/utilities.mjs';

const $body = document.querySelector('body');

(function main() {
    utilities.goto_main_page();

    $body.addEventListener('keydown', e=> {
        if (e.code == "Escape") { // esc 누를시 메인페이지로 감
            utilities.goto_main_page();
        }
    });
})();