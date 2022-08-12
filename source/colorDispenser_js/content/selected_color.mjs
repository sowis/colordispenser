import * as similar_color from '/colorDispenser_js/content/similar_color.mjs';

const $selected_color = document.querySelector('.selected_color');
const inner_buffer = document.createElement('canvas');

document.querySelector('.current_image').addEventListener('click', e => {
    img_color_select(e.offsetY, e.offsetX);
});

document.querySelector('.current_image').addEventListener('mouseover', e => {
    image_to_canvas();
});

/* 현재이미지 버퍼에 복사 */
function image_to_canvas() {
    const $image = document.querySelector('.current_image');
    inner_buffer.width = $image.clientWidth;
    inner_buffer.height = $image.clientHeight;
    const ctx = inner_buffer.getContext('2d');
    ctx.drawImage($image, 0, 0, $image.clientWidth, $image.clientHeight);
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