/* backgroundcolor 문자열을 {r:123, g:252, b:111} 객체로 변환 */
export function background_string_to_rgb(str) {
    const middle = (str.split('(')[1]).split(')')[0];
    const arr = middle.split(',');
    const rgb = {};
    rgb.r = parseInt(arr[0]);
    rgb.g = parseInt(arr[1]);
    rgb.b = parseInt(arr[2]);
    return rgb;
}

/* rgb 객체를 rgb(255, 1, 235) 형태로 변환 */
export function rgb_to_background_string(rgb) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

/* rgb 객체를 #1A3EBD 형태로 변환 */
export function rgb_to_hex_string(rgb) {
    return '#' + rgb.r.toString(16).padStart(2, '0').toUpperCase() + rgb.g.toString(16).padStart(2, '0').toUpperCase() + rgb.b.toString(16).padStart(2, '0').toUpperCase();
}

/* rgb 객체를 #1A3EBD 형태로 변환 */
export function rgb_to_hex_string_no_sharp(rgb) {
    return rgb.r.toString(16).padStart(2, '0').toUpperCase() + rgb.g.toString(16).padStart(2, '0').toUpperCase() + rgb.b.toString(16).padStart(2, '0').toUpperCase();
}

/* rgb 객체를 123, 123, 123 형태로 변환 */
export function rgb_to_numbers(rgb) {
    return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

const $main_page = document.querySelector('.main');
const $setting_page = document.querySelector('.setting_page');
const $help_page = document.querySelector('.help_page');

const $setting_button = document.querySelector('.setting');
const $help_button = document.querySelector('.help');

/* 메인페이지, 설정페이지, 도움말 페이지 등 모든 페이지 off */
function all_page_off() {
    $setting_page.classList.remove('setting_page_on');
    $help_page.classList.remove('help_page_on');
    $main_page.classList.remove('main_page_on');

    $setting_button.classList.remove('setting_button_on');
    $help_button.classList.remove('help_button_on');
}

export function goto_main_page() {
    all_page_off();
    $main_page.classList.add('main_page_on');
}

export function goto_setting_page() {
    all_page_off();
    $setting_page.classList.add('setting_page_on');
    $setting_button.classList.add('setting_button_on');
}

export function goto_help_page() {
    all_page_off();
    $help_page.classList.add('help_page_on');
    $help_button.classList.add('help_button_on');
}

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