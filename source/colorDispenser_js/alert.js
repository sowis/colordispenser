import * as utilities from '/colorDispenser_js/utilities.js';
import * as languages from '/colorDispenser_js/languages.js';
import * as setting from '/colorDispenser_js/setting.js';

const $alert_box = document.querySelector('.alert_box');
const alert_timeout = 1500; // 알림 보여주는 시간(ms)

const alert_status =  {
    0: {
        "image": "/images/alert/alert_ok.png"
    },

    1: {
        "image": "/images/alert/alert_notice.png"
    },

    2: {
        "image": "/images/alert/alert_no.png"
    }
}

export function add_copy_alert(rgb) {
    const message = setting.target_format_function(rgb) + ' ' + languages.language_module.str_10;

    /* $alert 만들기 */
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

    $alert.appendChild($alert_status_image);
    $alert.appendChild($alert_color);
    $alert.appendChild($alert_text);
    /***************/

    $alert_box.insertBefore($alert, $alert_box.firstChild); // 알림 보여주기
    setTimeout(alert_remove, alert_timeout, $alert); // 일정시간 후 알림 삭제
}

export function add_message_alert(status, message) {
    /* $alert 만들기 */
    const $alert = document.createElement('div');
    $alert.classList.add('alert');
    
    const $alert_status_image = document.createElement('img');
    $alert_status_image.classList.add('alert_status_image');
    $alert_status_image.src = alert_status[+status].image;

    const $alert_text = document.createElement('div');
    $alert_text.classList.add('alert_text');
    $alert_text.textContent = message;

    $alert.appendChild($alert_status_image);
    $alert.appendChild($alert_text);
    /***************/

    $alert_box.insertBefore($alert, $alert_box.firstChild); // 알림 보여주기
    setTimeout(alert_remove, alert_timeout, $alert); // 일정시간 후 알림 삭제
}

function alert_remove($alert) {
    $alert.parentNode.removeChild($alert);
}