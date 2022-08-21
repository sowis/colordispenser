import * as utilities from '/colorDispenser_js/utilities.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';

const help_resources = [
    { "img": "/images/help/0.png", "str": "str_15" },
    { "img": "/images/help/1.png", "str": "str_16" },
    { "img": "/images/help/2.png", "str": "str_17" },
    { "img": "/images/help/3.png", "str": "str_18" },
    { "img": "/images/help/4.png", "str": "str_19" },
    { "img": "/images/help/5.png", "str": "str_20" }
];

const $body = document.querySelector('body');
const $help = document.querySelector('.help'); // 도움말 버튼

const $help_page = document.querySelector('.help_page'); // 도움말 페이지

const $help_back = document.querySelector('.help_back'); // 뒤로가기 버튼
const $help_forward = document.querySelector('.help_forward'); // 앞으로가기 버튼

const $help_image = document.querySelector('.help_image'); // 도움말 이미지
const $help_content = document.querySelector('.help_content'); // 도움말 설명

export let current_page = 0;

(function main() {
    event_match();
})();

function event_match() {
    $help.addEventListener('click', e => {
        if ($help_page.classList.contains('help_page_on')) {
            utilities.goto_main_page();
        }
        else {
            utilities.goto_help_page();
        }
    });

    document.querySelector('.help_exit').addEventListener('click', e => { // X버튼 누르면 나가기 이벤트 추가
        utilities.goto_main_page();
    });

    $body.addEventListener('keydown', e => { // 설정페이지가 열린상태에서 방향키로 페이지 넘어갈 수 있게 하기
        if ($help_page.classList.contains('help_page_on') == false) {
            return;
        }

        if (e.code == "ArrowRight") {
            to_next_page();
        }
        else if (e.code == "ArrowLeft") {
            to_last_page();
        }
    })
}

/* 이미지, 설명 및 앞뒤 버튼 이벤트 설정 */
export function set_help_page(page) {
    $help_image.src = help_resources[page].img;
    $help_content.innerHTML = languages.language_module[help_resources[page].str];

    $help_back.classList.remove('help_button_disabled');
    $help_forward.classList.remove('help_button_disabled');

    $help_back.addEventListener('click',  to_last_page);
    $help_forward.addEventListener('click', to_next_page);

    if (page == 0) {
        $help_back.classList.add('help_button_disabled');
        $help_back.removeEventListener('click', to_last_page);
    }

    if (page == help_resources.length - 1) {
        $help_forward.classList.add('help_button_disabled');
        $help_forward.removeEventListener('click', to_next_page);
    }
}

function to_next_page() {
    if (current_page == help_resources.length - 1) {
        return;
    }

    set_help_page(current_page + 1);
    ++current_page;
}

function to_last_page() {
    if (current_page == 0) {
        return;
    }
    
    set_help_page(current_page - 1);
    --current_page;
}