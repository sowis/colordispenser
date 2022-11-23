import * as utilities from '/colorDispenser_js/utilities.js';
import * as alert from '/colorDispenser_js/alert.js';
import * as palette from '/colorDispenser_js/content/palette.js';
import * as setting from '/colorDispenser_js/setting.js';

const $mouse_color = document.querySelector('.mouse_color');
const $selected_color = document.querySelector('.selected_color');

(function main() {
    document.querySelector('body').addEventListener('keydown', key_down);
})();

// rgb 를 target_format 에 맞게 클립보드로 복사
function copy(rgb) {
    const conversion_function = setting.target_format_function; // 변환 함수
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

/* 지정한 단축키가 눌렸을 때 */
function key_down(e) {
    if (e.ctrlKey && e.key == 'x') { // ctrl + x: mouse_color 복사
        if ($mouse_color.style.backgroundColor == '') {
            return;
        }

        const rgb = utilities.background_string_to_rgb($mouse_color.style.backgroundColor);
        copy(rgb);
    }
    else if (e.ctrlKey && e.key == 'c') { // ctrl + c: selected_color 복사
        const rgb = utilities.background_string_to_rgb($selected_color.style.backgroundColor);
        copy(rgb);
    }
    else if (e.ctrlKey && e.key == 'q') { // ctrl + q: 팔레트 초기화
        palette.palette_clear();
    }
}