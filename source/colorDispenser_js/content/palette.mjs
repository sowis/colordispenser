import * as selected_color from '/colorDispenser_js/content/selected_color.mjs';
import * as utilities from '/colorDispenser_js/utilities.mjs';
import * as mouse_color from '/colorDispenser_js/content/mouse_color.mjs';

const palette_chip_default_color = 'rgba(0, 0, 0, 0)'; // 팔레트 초기 색
const void_palette_image = '/images/void_palette.png';

const $palette = document.querySelector('.palette');
const $palette_clear_button = document.querySelector('.palette_clear_button');
const palette_chip_count = $palette.children.length;

const palette_colors = []; // 색(backgroundColor)
const validations = []; // 활성화/비활성화
const last_use_time = []; // 마지막으로 사용한 시간
const $palette_chips = []; // 팔레트 칩 DOM

(function main() {
    palette_init();
    palette_event_link();
})();

function palette_init() {
    for (const $palette_chip of $palette.children) {
        $palette_chip.style.backgroundColor = palette_chip_default_color;
        $palette_chip.style.backgroundImage = `url(${void_palette_image})`;
        palette_colors.push($palette_chip.style.backgroundColor);
        validations.push(false);
        last_use_time.push(new Date());
        $palette_chips.push($palette_chip);
    }
}

function palette_event_link() {
    for (const $palette_chip of $palette.children) {
        $palette_chip.addEventListener('click', palette_chip_click);
        $palette_chip.addEventListener('contextmenu', e => {
            e.stopPropagation();
            e.preventDefault();
            const idx = $palette_chips.indexOf(e.target);
            palette_chip_disable(idx);
        });

        $palette_chip.addEventListener('mouseover', palette_chip_mouse_in);

        $palette_clear_button.addEventListener('click', palette_clear);
    }
}

export function palette_add_rgb(rgb) {
    const backgroundColor = utilities.rgb_to_background_string(rgb);
    palette_add_backgroundColor(backgroundColor);
}

/* 팔레트에 새 색상 추가 */
export function palette_add_backgroundColor(backgroundColor) {
    const color = backgroundColor;

    /* 중복 색상인지 검사 */
    for (let target = 0; target < palette_chip_count; ++target) {
        if (validations[target] && palette_colors[target] == color) { // 중복 색상이 있으면
            if ($palette_chips[target].classList.contains('palette_chip_clickable_rotate')) { // 이미 회전중이면 return
                return;
            }

            $palette_chips[target].classList.remove('palette_chip_clickable_rotate'); // 회전 후 종료
            $palette_chips[target].classList.add('palette_chip_clickable_rotate');
            setTimeout(e => {
                $palette_chips[target].classList.remove('palette_chip_clickable_rotate');
            }, 400);

            return;
        }
    }
    /**********************/

    /* 빈 팔레트 공간이 있는지 검사 */
    let idx = -1;
    for (let target = 0; target < palette_chip_count; ++target) {
        if (validations[target] == false) {
            idx = target;
            break;
        }
    }
    /*******************************/

    /* 비어있는 팔레트 공간이 없으면 가장 오래전에 사용한 팔레트 칩 찾기 */
    if (idx == -1) {
        let old_idx = 0;
        let old_time = last_use_time[old_idx];

        for (let target = 0; target < palette_chip_count; ++target) { // 가장 오래전에 사용한 팔레트 칩 찾기
            if (last_use_time[target] < old_time) {
                old_idx = target;
                old_time = last_use_time[target];
            }
        }

        idx = old_idx;
    }
    /********************************************************************/

    palette_colors[idx] = color;
    validations[idx] = true;
    last_use_time[idx] = new Date();
    $palette_chips[idx].style.backgroundColor = color;
    $palette_chips[idx].style.backgroundImage = '';
    $palette_chips[idx].classList.add('palette_chip_clickable');
    $palette_chips[idx].classList.add('palette_chip_clickable_rotate');
    setTimeout(e => {
        $palette_chips[idx].classList.remove('palette_chip_clickable_rotate');
    }, 400);
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
    selected_color.set_selected_color(utilities.background_string_to_rgb(palette_colors[idx]));
}

/* 칩에 마우스 올리면 현재색으로 표시 */
function palette_chip_mouse_in(e) {
    mouse_color.set_mouse_color(utilities.background_string_to_rgb(e.target.style.backgroundColor));
}

/* 팔레트 칩에서 우클릭시 그 칩은 초기상태로 돌아감 */
function palette_chip_disable(idx) {
    validations[idx] = false;
    last_use_time[idx] = new Date();
    $palette_chips[idx].style.backgroundImage = `url(${void_palette_image})`;
    $palette_chips[idx].style.backgroundColor = palette_chip_default_color;
    $palette_chips[idx].classList.remove('palette_chip_clickable');
    palette_colors[idx] = palette_chip_default_color;
    $palette_chips[idx].classList.add('palette_chip_shake');
    setTimeout(e => {
        $palette_chips[idx].classList.remove('palette_chip_shake');
    }, 300);
}

/* 팔레트 전부 초기화 */
export function palette_clear() {
    for (let idx = 0; idx < palette_chip_count; ++idx) {
        palette_chip_disable(idx);
    }
}