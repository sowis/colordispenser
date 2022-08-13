let target_format = 'hex'; // 현재 변환 형식

const $mouse_color = document.querySelector('.mouse_color');
const $selected_color = document.querySelector('.selected_color');

(function main() {
    document.querySelector('body').addEventListener('keydown', key_down);
})();

/* target_format과 변환 함수를 매칭 */
const formats = {
    'hex': function to_hex(rgb) {
        const hex = '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16);
        return hex;
    }
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
        console.log('클립보드로 복사: ' + content);
    });
}

/* 지정한 단축키가 눌렸을 때 클립보드로 복사 */
function key_down(e) {
    if (e.ctrlKey && e.key == 'x') {
        if ($mouse_color.style.backgroundColor == '') {
            return;
        }

        const rgb = background_string_to_rgb($mouse_color.style.backgroundColor);
        copy(rgb);
    }
    if (e.ctrlKey && e.key == 'c') {
        const rgb = background_string_to_rgb($selected_color.style.backgroundColor);
        copy(rgb);
    }
}

/* backgroundcolor 문자열을 {r:123, g:252, b:111} 객체로 변환 */
function background_string_to_rgb(str) {
    const middle = (str.split('(')[1]).split(')')[0];
    const arr = middle.split(',');
    const rgb = {};
    rgb.r = parseInt(arr[0]);
    rgb.g = parseInt(arr[1]);
    rgb.b = parseInt(arr[2]);
    return rgb;
}