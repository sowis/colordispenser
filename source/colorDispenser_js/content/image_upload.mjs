import * as last_images from './last_images.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';
import * as API from '/colorDispenser_js/API.mjs';
import * as similar_color from '/colorDispenser_js/content/similar_color.mjs';

const accpet_file_type = ['image/png', 'image/jpeg'];

const $file_upload_button = document.querySelector('.file_upload_button');
const $current_image = document.querySelector('.current_image');

$file_upload_button.accept = accpet_file_type.join(', ');
$file_upload_button.addEventListener('change', upload_event);

/* 업로드 버튼으로 업로드시 메인 미리보기 이미지 표시 */
function upload_event(e) {
    if($file_upload_button.files && $file_upload_button.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL($file_upload_button.files[0]);
        reader.onload = e => {
            $current_image.src = e.target.result;

            send_file();

            last_images.upload_new_image($file_upload_button.files);
        }
    }
}

/* 메인 로직 수행 후 대표 색 & 추천 색 표시 */
function send_file() {
    let data = new FormData();
    data.append('file', $file_upload_button.files[0]);
    fetch(API.rest_1, { method: 'POST', body: data })
    .then(res => res.json())
    .then(res => {
        let $results = document.createDocumentFragment();

        for (const rgb of res) {
            const $result = create_result(rgb);
            $results.appendChild($result);
        }

        const $dispenser = document.querySelector('.dispenser');
        $dispenser.innerHTML = '';
        $dispenser.appendChild($results);
    });
}

/* $result 생성 */
function create_result(rgb) {
    const $result = document.createElement('div');
    $result.classList.add('result');

    const $result_color = document.createElement('div');
    $result_color.classList.add('result_color');
    $result_color.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    const $color_chips = similar_color.create_color_chips(rgb);
    
    $result.appendChild($result_color);
    $result.appendChild($color_chips);

    return $result;
}

// 메인 이미지 드래그 방지
$current_image.addEventListener('dragstart', e => {
    e.stopPropagation();
    e.preventDefault();
});

/* 메인 이미지 드래그 이펙트 */
$current_image.addEventListener('dragenter', e => {
    e.stopPropagation();
    e.preventDefault();
    $current_image.classList.add('current_image_dragover');
});

$current_image.addEventListener('dragover', e => {
    e.stopPropagation();
    e.preventDefault();
});

$current_image.addEventListener('dragleave', e => {
    e.stopPropagation();
    e.preventDefault();
    $current_image.classList.remove('current_image_dragover');
});
/********************************/

/* 이미지를 드래그&드롭 했을 때 */
$current_image.addEventListener('drop', e => {
    e.stopPropagation();
    e.preventDefault();
    $current_image.classList.remove('current_image_dragover');

    const files = e.target.files || e.dataTransfer.files;
 
    if (files.length > 1) {
        alert(languages.language_module.str_1);
        return;
    }
    
    /* 받아들일 수 없는 형식 걸러내기 */
    if (accpet_file_type.indexOf(files[0].type) == -1) {
        alert(languages.language_module.str_6);
        return;
    }
    /**********************************/

    /* 업로드 버튼으로 업로드한 효과 내기 */
    $file_upload_button.files = files;
    upload_event();
    /**************************************/
});
/********************************/