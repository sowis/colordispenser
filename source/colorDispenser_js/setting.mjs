const $setting = document.querySelector('.setting');
const $setting_page = document.querySelector('.setting_page');

let is_setting_page_on = false;

(function main() {
    $setting.addEventListener('click', e => {
        console.log('a');
        if (is_setting_page_on) {
            setting_page_off();
            is_setting_page_on = false;
        }
        else {
            setting_page_on();
            is_setting_page_on = true;
        }
    });
})();

function setting_page_on() {
    $setting_page.classList.add('setting_page_on');
}

function setting_page_off() {
    $setting_page.classList.remove('setting_page_on');
}