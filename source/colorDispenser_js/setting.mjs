import * as utilities from '/colorDispenser_js/utilities.mjs';

const $body = document.querySelector('body');

const $setting = document.querySelector('.setting');
const $setting_page = document.querySelector('.setting_page');

const $dark_mode_input = document.querySelector('.dark_mode_input');

export let target_format_function; // 현재 변환 형식
export let magnifier_pixel; // 돋보기 픽셀 수

/* target_format과 변환 함수를 매칭 */
const formats = {
    'hex_sharp': utilities.rgb_to_hex_string,
    'hex': utilities.rgb_to_hex_string_no_sharp,
    'rgb': utilities.rgb_to_background_string,
    'numbers': utilities.rgb_to_numbers
}

main();

function main() {
    for (const $input of document.querySelectorAll('.copy_form_input')) { // 초기 선택된 복사 형식 찾기
        if ($input.checked) {
            target_format_function = formats[selected_copy_form()];
        }
    }

    for (const $input of document.querySelectorAll('.magnifier_value_input')) { // 초기 선택된 돋보기 배율 찾기
        if ($input.checked) {
            magnifier_pixel = parseInt($input.value);
        }
    }

    event_match();
};

function event_match() {
    $setting.addEventListener('click', e => { // 설정페이지 온오프 이벤트 추가
        if ($setting_page.classList.contains('setting_page_on')) {
            utilities.goto_main_page();
        }
        else {
            utilities.goto_setting_page();
        }
    });

    for (const $input of document.querySelectorAll('.copy_form_input')) {
        $input.addEventListener('change', e => { // 폼 값이 다른걸로 바뀔시 변수 변경 이벤트 추가
            if ($input.checked) {
                target_format_function = formats[$input.value];
            }
        });
    }

    for (const $input of document.querySelectorAll('.magnifier_value_input')) {
        $input.addEventListener('change', e => { // 폼 값이 다른걸로 바뀔시 변수 변경 이벤트 추가
            if ($input.checked) {
                magnifier_pixel = parseInt($input.value);
            }
        });
    }

    $dark_mode_input.addEventListener('change', e => { 
        if ($dark_mode_input.checked) {
            dark_mode_on();
        }
        else {
            dark_mode_off();
        }
    });

    document.querySelector('.setting_page_exit').addEventListener('click', e => { // X버튼 누르면 나가기 이벤트 추가
        utilities.goto_main_page();
    });
}

function selected_copy_form() {
    for (const $input of document.querySelectorAll('.copy_form_input')) {
        if ($input.checked) {
            return $input.value;
        }
    }
}

function dark_mode_on() {
    $body.classList.add('dark_mode');
}

function dark_mode_off() {
    $body.classList.remove('dark_mode');
}