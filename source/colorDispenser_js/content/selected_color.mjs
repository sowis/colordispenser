import * as similar_color from '/colorDispenser_js/content/similar_color.mjs';
import * as palette from '/colorDispenser_js/content/palette.mjs';
import * as mouse_color from '/colorDispenser_js/content/mouse_color.mjs';
import * as utilities from '/colorDispenser_js/utilities.mjs';

const $selected_color = document.querySelector('.selected_color');
const inner_buffer = document.createElement('canvas');
const $current_image = document.querySelector('.current_image');

const $selected_color_display_r = document.querySelector('.selected_color_display_r');
const $selected_color_display_g = document.querySelector('.selected_color_display_g');
const $selected_color_display_b = document.querySelector('.selected_color_display_b');

const key_selected_color = 'selected_color';

set_selected_color({r:241, g:234, b:211}); // 선택 색 초기색상

(function main() {
    if (localStorage.getItem(key_selected_color) != null) { // 저장된 색이 있으면 불러오기
        set_selected_color(localStorage.getItem(key_selected_color));
    }
})();

$current_image.addEventListener('click', e => {
    img_color_select(e.offsetY, e.offsetX);
});

$current_image.addEventListener('mouseover', e => {
    image_to_canvas();
});

/* 선택된 색에 마우스 올리면 현재색에 올라감 */
$selected_color.addEventListener('mouseover', e => {
    mouse_color.set_mouse_color(utilities.background_string_to_rgb(e.target.style.backgroundColor));
});

/* 선택된 색 우클릭시 팔레트에 추가 */
$selected_color.addEventListener('contextmenu', e => {
    e.stopPropagation();
    e.preventDefault();

    const color = e.target.style.backgroundColor;
    palette.palette_add_backgroundColor(color);
});

/* 현재이미지 버퍼에 복사 */
function image_to_canvas() {
    inner_buffer.width = $current_image.clientWidth;
    inner_buffer.height = $current_image.clientHeight;
    const ctx = inner_buffer.getContext('2d');
    ctx.drawImage($current_image, 0, 0, $current_image.clientWidth, $current_image.clientHeight);
}

/* 이미지 클릭했을 때 색 추출 */
function img_color_select(mouse_y, mouse_x) {
    let buffer_ctx = inner_buffer.getContext('2d');
    const data = buffer_ctx.getImageData(mouse_x, mouse_y, 1, 1).data;

    const rgb = { 'r': data[0], 'g': data[1], 'b': data[2] };
    
    set_selected_color(rgb);
}

/* 선택한 색 표시 */
export function set_selected_color(rgb) {
    save_local_storage(rgb); // 로컬 스토리지에 선택한 색 저장
    $selected_color.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    $selected_color_display_r.textContent = rgb.r;
    $selected_color_display_g.textContent = rgb.g;
    $selected_color_display_b.textContent = rgb.b;

    const $new_color_chips = similar_color.create_color_chips(rgb);

    const $old_color_chips = document.querySelector('.right_aside .color_chips');
    const $color_chips_parent = $old_color_chips.parentNode;

    $color_chips_parent.insertBefore($new_color_chips, $old_color_chips);
    $color_chips_parent.removeChild($old_color_chips);
}

/* 로컬 스토리지에 저장 */
function save_local_storage(rgb) {
    localStorage.setItem(key_selected_color, JSON.stringify(rgb));
}