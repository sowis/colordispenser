import * as last_images from './last_images.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';
import * as API from '/colorDispenser_js/API.mjs';
import * as similar_color from '/colorDispenser_js/content/similar_color.mjs';
import * as footer from '/colorDispenser_js/footer.mjs';
import * as selected_color from '/colorDispenser_js/content/selected_color.mjs';
import * as utilities from '/colorDispenser_js/utilities.mjs';
import * as palette from '/colorDispenser_js/content/palette.mjs';
import * as loading_animation from '/colorDispenser_js/loading_animation.mjs';
import * as alerts from '/colorDispenser_js/alert.mjs';

const accpet_file_type = ['image/png', 'image/jpeg']; // 받아들이는 파일 형식

const $file_upload_button = document.querySelector('.file_upload_button');
const $current_image = document.querySelector('.current_image');
const $dispenser = document.querySelector('.dispenser');

$file_upload_button.accept = accpet_file_type.join(', ');
$file_upload_button.addEventListener('change', upload_event);

let current_image = $current_image.src;

(function main() {
    if (last_images.get_most_recent_image() != last_images.default_image) { // 저장된 상태가 있으면 불러오기
        $current_image.src = last_images.get_most_recent_image();
        set_results(last_images.get_most_recent_results());
        current_image = $current_image.src;
    }
})();

/* 업로드시 파일 전송 */
function upload_event(e) {
    const reader = new FileReader();

    reader.addEventListener('load', e => {
        $current_image.src = e.target.result;
        current_image = $file_upload_button.files[0];

        last_images.upload_new_image($file_upload_button.files);

        send_file(e.target.result);
    });

    reader.readAsDataURL($file_upload_button.files[0]);
}

/* 메인 로직 수행 후 대표 색 & 추천 색 표시, 총 처리량 업데이트, 이전 이미지 업데이트 */
function send_file(image) {
    let data = new FormData();
    data.append('file', $file_upload_button.files[0]);

    $dispenser.innerHTML = '';
    $dispenser.appendChild(loading_animation.create_loading_animation());

    fetch(API.rest_1, { method: 'POST', body: data })
    .then(res => res.json())
    .then(res => {
        last_images.upload_new_result(image, res); // 이미지와 결과를 매칭해서 저장

        if ($file_upload_button.files[0] != current_image) { // 다른 이미지로 넘어갔으면 무시
            return;
        }

        set_results(res); // 결과 출력

        footer.update_process_string();
        alerts.add_message_alert(0, languages.language_module.str_23); // 알림 메시지
    })
    .catch(err => { // 오류 발생시
        if ($file_upload_button.files[0] != current_image) { // 다른 이미지로 넘어갔으면 무시
            return;
        }
        
        alerts.add_message_alert(2, languages.language_module.str_24); // 알림 메시지
    });
}

/* rgb 배열을 받아 결과로 출력 */
export function set_results(rgbs) {
    $dispenser.innerHTML = '';
    $dispenser.appendChild(create_results(rgbs));
}

/* rgb 배열로 $result document fragment 생성 */
function create_results(rgbs) {
    let $results = document.createDocumentFragment();

    for (const rgb of res) {
        const $result = create_result(rgb);
        $results.appendChild($result);
    }

    return $results;
}

/* $result 생성 */
function create_result(rgb) {
    const $result = document.createElement('div');
    $result.classList.add('result');

    const $result_color = document.createElement('div');
    $result_color.classList.add('result_color');
    $result_color.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    $result_color.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        selected_color.set_selected_color(utilities.background_string_to_rgb($result_color.style.backgroundColor));
    });

    $result_color.addEventListener('contextmenu', e => {
        e.stopPropagation();
        e.preventDefault();
        palette.palette_add_backgroundColor($result_color.style.backgroundColor);
    });

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