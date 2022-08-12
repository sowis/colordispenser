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
        $hue_chips.appendChild($hue_chip);
    }

    const $saturation_chips = document.createElement('div');
    $saturation_chips.classList.add('saturation_chips');
    for (const saturation_change of similar_colors.saturation_changes) {
        const $saturation_chip = document.createElement('div');
        $saturation_chip.classList.add('color_chip');
        $saturation_chip.style.backgroundColor = `rgb(${saturation_change.r}, ${saturation_change.g}, ${saturation_change.b})`;
        $saturation_chips.appendChild($saturation_chip);
    }

    const $intensity_chips = document.createElement('div');
    $intensity_chips.classList.add('intensity_chips');
    for (const intensity_change of similar_colors.intensity_changes) {
        const $intensity_chip = document.createElement('div');
        $intensity_chip.classList.add('color_chip');
        $intensity_chip.style.backgroundColor = `rgb(${intensity_change.r}, ${intensity_change.g}, ${intensity_change.b})`;
        $intensity_chips.appendChild($intensity_chip);
    }

    const $color_chips = document.createElement('div');
    $color_chips.classList.add('color_chips');

    $color_chips.appendChild($hue_chips);
    $color_chips.appendChild($saturation_chips);
    $color_chips.appendChild($intensity_chips);

    return $color_chips;
}

function rgb_to_hsi(rgb) {
    const rgb_max = Math.max(rgb.r, rgb.g, rgb.b);
    const rgb_min = Math.min(rgb.r, rgb.g, rgb.b);

    let i = (rgb.r + rgb.g + rgb.b) / 3;
    const s = (i == 0) ? 0 : 1 - rgb_min / i;
    let h = (180 / Math.PI) * Math.acos((rgb.r - 0.5 * rgb.g - 0.5 * rgb.b)  / Math.sqrt(rgb.r * rgb.r + rgb.g * rgb.g + rgb.b * rgb.b - rgb.r * rgb.g - rgb.r * rgb.b - rgb.g * rgb.b));

    if (rgb.b >= rgb.g) {
        h = 360 - h;
    }

    if (isNaN(h)) {
        h = 0;
    }
    
    return { h, s, i };
}

function hsi_to_rgb(hsi) {
    if (hsi.h == 0) {
        const r = hsi.i + 2 * hsi.i * hsi.s;
        const g = hsi.i - hsi.i * hsi.s;
        const b = hsi.i - hsi.i * hsi.s;
        return { r, g, b };
    }
    else if (0 < hsi.h && hsi.h < 120) {
        const r = hsi.i + hsi.i * hsi.s * Math.cos((Math.PI / 180) * hsi.h) / Math.cos((Math.PI / 180) * (60 - hsi.h));
        const g = hsi.i + hsi.i * hsi.s * (1 - Math.cos((Math.PI / 180) * hsi.h)) / Math.cos((Math.PI / 180) * (60 - hsi.h));
        const b = hsi.i - hsi.i * hsi.s;
        return { r, g, b };
    }
    else if (hsi.h == 120) {
        const r = hsi.i - hsi.i * hsi.s;
        const g = hsi.i + 2 * hsi.i * hsi.s;
        const b = hsi.i - hsi.i * hsi.s;
        return { r, g, b };
    }
    else if (120 < hsi.h && hsi.h < 240) {
        const r = hsi.i - hsi.i * hsi.s;
        const g = hsi.i + hsi.i * hsi.s * Math.cos((Math.PI / 180) * (hsi.h - 120)) / Math.cos((Math.PI / 180) * (180 - hsi.h));
        const b = hsi.i + hsi.i * hsi.s * (1 - Math.cos((Math.PI / 180) * (hsi.h - 120)) / Math.cos((Math.PI / 180) * (180 - hsi.h)));
        return { r, g, b };
    }
    else if (hsi.h == 240) {
        const r = hsi.i - hsi.i * hsi.s;
        const g = hsi.i - hsi.i * hsi.s;
        const b = hsi.i + 2 * hsi.i * hsi.s;
        return { r, g, b };
    }
    else if (240 < hsi.h && hsi.h < 360) {
        const r = hsi.i + hsi.i * hsi.s * (1 - Math.cos((Math.PI / 180) * (hsi.h - 240)) / Math.cos((Math.PI / 180) * (300 - hsi.h)));
        const g = hsi.i - hsi.i * hsi.s;
        const b = hsi.i + hsi.i * hsi.s * Math.cos((Math.PI / 180) * (hsi.h - 240)) / Math.cos((Math.PI / 180) * (300 - hsi.h));
        return { r, g, b };
    }
}

function similar_color(rgb) {
    const hsi = rgb_to_hsi(rgb);
    let hue_changes = [];
    let saturation_changes = [];
    let intensity_changes = [];

    for (let i = 0; i < recomend_number; ++i) {
        const new_hsi = { ...hsi };
        new_hsi.h += (360 / (recomend_number + 1)) * (i + 1);
        new_hsi.h %= 360;
        hue_changes.push(hsi_to_rgb(new_hsi));
    }

    for (let i = 0; i < recomend_number; ++i) {
        const new_hsi = { ...hsi };
        new_hsi.s = (1 / (recomend_number - 1)) * i;
        saturation_changes.push(hsi_to_rgb(new_hsi));
    }

    for (let i = 0; i < recomend_number; ++i) {
        const new_hsi = { ...hsi };
        new_hsi.i = (255 / (recomend_number - 1)) * i;
        intensity_changes.unshift(hsi_to_rgb(new_hsi));
    }

    return { hue_changes, saturation_changes, intensity_changes };
}