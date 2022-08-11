import * as last_images from './last_images.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';
import * as API from '/colorDispenser_js/API.mjs';
import * as similar_color from '/colorDispenser_js/content/similar_color.mjs';

const $file_upload_button = document.querySelector('.file_upload_button');
const $current_image = document.querySelector('.current_image');

$file_upload_button.addEventListener('change', upload_event());

// 업로드 버튼으로 업로드시 메인 미리보기 이미지 표시
function upload_event(e) {
    if($file_upload_button.files && $file_upload_button.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL($file_upload_button.files[0]);
        reader.onload = e => {
            if ($current_image.src == e.target.result) { // 같은 이미지면 무시
                return;
            }

            $current_image.src = e.target.result;

            //send_file();
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

        let $dispenser = document.querySelector('.dispenser');
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

    const $color_chips = similar_color.create_similar_colors(rgb);
    
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

    $file_upload_button.files = files;
    upload_event();
    last_images.upload_new_image(files);
});
/********************************/