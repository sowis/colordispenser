import * as utilities from '/colorDispenser_js/utilities.mjs';

const $setting = document.querySelector('.setting');
const $setting_page = document.querySelector('.setting_page');

let is_setting_page_on = false;
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
        console.log('a');
        if (is_setting_page_on) {
            setting_page_off();
            is_setting_page_on = false;
        }
        else {
            setting_page_on();
            is_setting_page_on = true;
        }
    });

    for (const $input of document.querySelectorAll('.copy_form_input')) {
        $input.addEventListener('change', e => { // 다른걸로 바뀔시 변수 변경 이벤트 추가
            if ($input.checked) {
                target_format_function = formats[$input.value];
            }
        });
    }

    for (const $input of document.querySelectorAll('.magnifier_value_input')) {
        $input.addEventListener('change', e => { // 다른걸로 바뀔시 변수 변경 이벤트 추가
            if ($input.checked) {
                magnifier_pixel = parseInt($input.value);
            }
        });
    }

    document.querySelector('.setting_page_exit').addEventListener('click', e => { // X버튼 누르면 나가기 이벤트 추가
        setting_page_off(); 
        is_setting_page_on = false;
    });
}

function setting_page_on() {
    $setting_page.classList.add('setting_page_on');
}

function setting_page_off() {
    $setting_page.classList.remove('setting_page_on');
}

function selected_copy_form() {
    for (const $input of document.querySelectorAll('.copy_form_input')) {
        if ($input.checked) {
            return $input.value;
        }
    }
}