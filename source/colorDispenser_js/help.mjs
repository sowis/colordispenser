import * as utilities from '/colorDispenser_js/utilities.mjs';

const $help = document.querySelector('.help'); // 도움말 버튼

const $help_page = document.querySelector('.help_page'); // 도움말 페이지

const $help_back = document.querySelector('.help_back'); // 뒤로가기 버튼
const $help_forward = document.querySelector('.help_forward'); // 앞으로가기 버튼

const $help_image = document.querySelector('.help_image'); // 도움말 이미지
const $help_content_cover = document.querySelector('.help_content'); // 도움말 설명

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
}