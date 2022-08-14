import * as utilities from '/colorDispenser_js/utilities.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';
import * as clipboard from '/colorDispenser_js/clipboard.mjs';

const $alert_box = document.querySelector('.alert_box');

const alert_status =  {
    0: {
        "image": "/images/alert/alert_ok.png"
    },

    1: {
        "image": "/images/alert/alert_no.png"
    },

    2: {
        "image": "/images/alert/alert_no.png"
    }
}

export function add_copy_alert(rgb) {
    const message = clipboard.formats[clipboard.target_format](rgb) + ' ' + languages.language_module.str_10;

    const $alert = document.createElement('div');
    $alert.classList.add('alert');

    const $alert_status_image = document.createElement('img');
    $alert_status_image.classList.add('alert_status_image');
    $alert_status_image.src = alert_status[0].image;

    const $alert_color = document.createElement('div');
    $alert_color.classList.add('alert_color');
    $alert_color.style.backgroundColor = utilities.rgb_to_background_string(rgb);

    const $alert_text = document.createElement('div');
    $alert_text.classList.add('alert_text');
    $alert_text.textContent = message;
    console.log(message);

    $alert.appendChild($alert_status_image);
    $alert.appendChild($alert_color);
    $alert.appendChild($alert_text);

    $alert_box.appendChild($alert);
}