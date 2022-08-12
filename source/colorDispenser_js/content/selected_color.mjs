import * as similar_color from '/colorDispenser_js/content/similar_color.mjs';
import * as palette from '/colorDispenser_js/content/palette.mjs';

const $selected_color = document.querySelector('.selected_color');
const inner_buffer = document.createElement('canvas');
const $current_image = document.querySelector('.current_image');

$current_image.addEventListener('click', e => {
    img_color_select(e.offsetY, e.offsetX);
});

$current_image.addEventListener('mouseover', e => {
    image_to_canvas();
});

/* 선택된 색에 마우스 올리면 현재색에 올라감 */
$selected_color.addEventListener('mouseover', e => {
    document.querySelector('.mouse_color').style.backgroundColor = e.target.style.backgroundColor;
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
    $selected_color.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    const $new_color_chips = similar_color.create_color_chips(rgb);

    const $old_color_chips = document.querySelector('.right_aside .color_chips');
    const $color_chips_parent = $old_color_chips.parentNode;

    $color_chips_parent.insertBefore($new_color_chips, $old_color_chips);
    $color_chips_parent.removeChild($old_color_chips);
}