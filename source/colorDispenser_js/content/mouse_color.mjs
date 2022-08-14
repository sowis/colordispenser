import * as utilities from '/colorDispenser_js/utilities.mjs';

const $mouse_color_display_r = document.querySelector('.mouse_color_display_r');
const $mouse_color_display_g = document.querySelector('.mouse_color_display_g');
const $mouse_color_display_b = document.querySelector('.mouse_color_display_b');

const $mouse_color = document.querySelector('.mouse_color');

export function set_mouse_color(rgb) {
    $mouse_color.style.backgroundColor = utilities.rgb_to_background_string(rgb);
    $mouse_color_display_r.textContent = rgb.r;
    $mouse_color_display_g.textContent = rgb.g;
    $mouse_color_display_b.textContent = rgb.b;
}