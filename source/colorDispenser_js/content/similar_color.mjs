import * as selected_color from '/colorDispenser_js/content/selected_color.mjs';
import * as palette from '/colorDispenser_js/content/palette.mjs';
import * as utilities from '/colorDispenser_js/utilities.mjs';
import * as mouse_color from '/colorDispenser_js/content/mouse_color.mjs';

// h: 0~360
// s: 0~1
// i: 0~255

const recomend_number = 6;

export function create_color_chips(rgb) {
    const similar_colors = similar_color(rgb);

    const $hue_chips = document.createElement('div');
    $hue_chips.classList.add('hue_chips');
    for (const hue_change of similar_colors.hue_changes) {
        const $hue_chip = document.createElement('div');
        $hue_chip.classList.add('color_chip');
        $hue_chip.style.backgroundColor = `rgb(${hue_change.r}, ${hue_change.g}, ${hue_change.b})`;
        $hue_chip.addEventListener('mouseenter', chip_mouse_enter);
        $hue_chip.addEventListener('click', chip_click);
        $hue_chip.addEventListener('contextmenu', chip_rightclick);
        $hue_chips.appendChild($hue_chip);
    }

    const $saturation_chips = document.createElement('div');
    $saturation_chips.classList.add('saturation_chips');
    for (const saturation_change of similar_colors.saturation_changes) {
        const $saturation_chip = document.createElement('div');
        $saturation_chip.classList.add('color_chip');
        $saturation_chip.style.backgroundColor = `rgb(${saturation_change.r}, ${saturation_change.g}, ${saturation_change.b})`;
        $saturation_chip.addEventListener('mouseenter', chip_mouse_enter);
        $saturation_chip.addEventListener('click', chip_click);
        $saturation_chip.addEventListener('contextmenu', chip_rightclick);
        $saturation_chips.appendChild($saturation_chip);
    }

    const $intensity_chips = document.createElement('div');
    $intensity_chips.classList.add('intensity_chips');
    for (const intensity_change of similar_colors.intensity_changes) {
        const $intensity_chip = document.createElement('div');
        $intensity_chip.classList.add('color_chip');
        $intensity_chip.style.backgroundColor = `rgb(${intensity_change.r}, ${intensity_change.g}, ${intensity_change.b})`;
        $intensity_chip.addEventListener('mouseenter', chip_mouse_enter);
        $intensity_chip.addEventListener('click', chip_click);
        $intensity_chip.addEventListener('contextmenu', chip_rightclick);
        $intensity_chips.appendChild($intensity_chip);
    }

    const $color_chips = document.createElement('div');
    $color_chips.classList.add('color_chips');

    $color_chips.appendChild($hue_chips);
    $color_chips.appendChild($saturation_chips);
    $color_chips.appendChild($intensity_chips);

    return $color_chips;
}

/* ?????? ????????? ???????????? ??? ????????? ??????????????? ?????? */
function chip_mouse_enter(e) {
    mouse_color.set_mouse_color(utilities.background_string_to_rgb(e.target.style.backgroundColor));
}

/* ??? ????????? ????????? ????????? ????????? */
function chip_click(e) {
    const rgb = utilities.background_string_to_rgb(e.target.style.backgroundColor);
    selected_color.set_selected_color(rgb);
}

/* ??? ???????????? ???????????? ??? */
function chip_rightclick(e) {
    e.stopPropagation();
    e.preventDefault();

    const color = e.target.style.backgroundColor;
    palette.palette_add_backgroundColor(color);
}

function similar_color(rgb) {
    const hsi = utilities.rgb_to_hsi(rgb);
    let hue_changes = [];
    let saturation_changes = [];
    let intensity_changes = [];

    for (let i = 0; i < recomend_number; ++i) {
        const new_hsi = { ...hsi };
        new_hsi.h += (360 / (recomend_number + 1)) * (i + 1);
        new_hsi.h %= 360;
        hue_changes.push(utilities.hsi_to_rgb(new_hsi));
    }

    for (let i = 0; i < recomend_number; ++i) {
        const new_hsi = { ...hsi };
        new_hsi.s = (1 / (recomend_number - 1)) * i;
        saturation_changes.push(utilities.hsi_to_rgb(new_hsi));
    }

    for (let i = 0; i < recomend_number; ++i) {
        const new_hsi = { ...hsi };
        new_hsi.i = (255 / (recomend_number - 1)) * i;
        intensity_changes.unshift(utilities.hsi_to_rgb(new_hsi));
    }

    return { hue_changes, saturation_changes, intensity_changes };
}