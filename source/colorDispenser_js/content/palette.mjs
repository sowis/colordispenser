import * as selected_color from '/colorDispenser_js/content/selected_color.mjs';

const palette_chip_default_color = '#00aa00';

const $palette = document.querySelector('.palette');
const palette_chip_count = $palette.children.length;

const palette_colors = []; // 색(backgroundColor)
const validations = []; // 활성화/비활성화
const last_use_time = []; // 마지막으로 사용한 시간
const $palette_chips = [];

(function main() {
    palette_init();
    palette_event_link();
})();

function palette_init() {
    for (const $palette_chip of $palette.children) {
        $palette_chip.style.backgroundColor = palette_chip_default_color;
        palette_colors.push($palette_chip.style.backgroundColor);
        validations.push(false);
        last_use_time.push(new Date());
        $palette_chips.push($palette_chip);
    }
}

function palette_event_link() {
    for (const $palette_chip of $palette.children) {
        $palette_chip.addEventListener('click', palette_chip_click);
        $palette_chip.addEventListener('contextmenu', palette_chip_disable);
    }
}

/* 팔레트 칩 클릭시 선택된 색으로 지정 */
function palette_chip_click(e) {
    e.stopPropagation();
    e.preventDefault();

    const idx = $palette_chips.indexOf(e.srcElement);
    if (validations[idx] === false) { // 사용되고 있지 않은 칩이면 무시
        return;
    }

    last_use_time[idx] = new Date();
    selected_color.set_selected_color(background_string_to_rgb(palette_colors[idx]));
}

/* 팔레트 칩에서 우클릭시 그 칩은 초기상태로 돌아감 */
function palette_chip_disable(e) {
    e.stopPropagation();
    e.preventDefault();

    const idx = $palette_chips.indexOf(e.srcElement);
    validations[idx] = false;
    last_use_time[idx] = new Date();
    $palette_chips[idx].style.backgroundColor = palette_chip_default_color;
    palette_colors[idx] = $palette_chips[idx].style.backgroundColor;
}

function background_string_to_rgb(str) {
    const middle = (str.split('(')[1]).split(')')[0];
    const arr = middle.split(',');
    const rgb = {};
    rgb.r = parseInt(arr[0]);
    rgb.g = parseInt(arr[1]);
    rgb.b = parseInt(arr[2]);
    return rgb;
}