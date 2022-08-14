import * as utilities from '/colorDispenser_js/utilities.mjs';
import * as alert from '/colordispenser_js/alert.mjs';

export let target_format = 'hex'; // 현재 변환 형식

const $mouse_color = document.querySelector('.mouse_color');
const $selected_color = document.querySelector('.selected_color');

(function main() {
    document.querySelector('body').addEventListener('keydown', key_down);
})();

/* target_format과 변환 함수를 매칭 */
export const formats = {
    'hex': utilities.rgb_to_hex_string
}

// rgb 를 target_format 에 맞게 클립보드로 복사
function copy(rgb) {
    const conversion_function = formats[target_format]; // 변환 함수
    const content = conversion_function(rgb); // 형식에 맞게 변환

    let promise;
    if (navigator.clipboard && window.isSecureContext) {
        promise = navigator.clipboard.writeText(content);
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        promise =  new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }

    promise.then(() => { // 복사 성공시
        alert.add_copy_alert(rgb);
    });
}

/* 지정한 단축키가 눌렸을 때 클립보드로 복사 */
function key_down(e) {
    if (e.ctrlKey && e.key == 'x') {
        if ($mouse_color.style.backgroundColor == '') {
            return;
        }

        const rgb = utilities.background_string_to_rgb($mouse_color.style.backgroundColor);
        copy(rgb);
    }
    if (e.ctrlKey && e.key == 'c') {
        const rgb = utilities.background_string_to_rgb($selected_color.style.backgroundColor);
        copy(rgb);
    }
}