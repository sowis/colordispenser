export function rgb_to_hsi(rgb) {
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

export function hsi_to_rgb(hsi) {
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