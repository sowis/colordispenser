import * as image_upload from '/colorDispenser_js/content/image_upload.mjs';
import * as loading_animation from '/colorDispenser_js/loading_animation.mjs';

/* 로컬 스토리지 키 */
const key_last_images = 'last_images';
const key_last_rgbs = 'last_results';
/*******************/

const max_image_count = 5;
export const default_image = 'images/no_last_image.png';
const last_images = [];
const last_rgbs = [];
const $last_images = document.querySelector('.last_images');
const $previewImage = document.querySelector('.current_image');
const $dispenser = document.querySelector('.dispenser');

(function main() {
    if (localStorage.getItem(key_last_images) != null) { // 저장된 정보가 있으면
        const saved_last_images = JSON.parse(localStorage.getItem(key_last_images));
        const saved_last_rgbs = JSON.parse(localStorage.getItem(key_last_rgbs));

        for (let i = 0; i < max_image_count; ++i) {
            last_images.push(saved_last_images[i]);
            last_rgbs.push(saved_last_rgbs[i]);
        }
    }
    else {
        for (let i = 0; i < max_image_count; ++i) {
            last_images.push(default_image);
            last_rgbs.push([]);
        }
    }

    rendering();
})();

export function upload_new_image(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
        if (e.target.result == last_images[0]) { // 같은 이미지면 무시
            return;
        }

        /* 이전 이미지중에 같은 이미지가 있으면 삭제 */
        let same_image_index = null;
        for (let i = 1; i < max_image_count; ++i) {
            if (e.target.result == last_images[i]) {
                same_image_index = i;
                break;
            }
        }

        if (same_image_index != null) {
            last_images.splice(same_image_index, 1);
        }
        /********************************************/

        last_images.unshift(e.target.result);
        last_rgbs.unshift([]);

        if (last_images.length > max_image_count) {
            last_images.pop();
            last_rgbs.pop();
        }

        save_local_storage();
        rendering();
    }
}

/* 이미지 색 분석 결과를 이미지와 매칭시킴 */
export function upload_new_result(image, rgbs) {
    /* 이전 이미지중에 있는 결과인지 찾기 */
    let target_index = null;
    for (let i = 0; i < max_image_count; ++i) {
        if (image == last_images[i]) {
            target_index = i;
            break;
        }
    }

    if (target_index == null) {
        return;
    }
    /**************************************/

    last_rgbs[target_index] = rgbs;
    save_local_storage();
}

/* last images 를 그림 */
function rendering() {
    const fragment = new DocumentFragment();
    for (const image of last_images) {
        const $last_image = document.createElement('img');
        $last_image.classList.add('last_image');
        $last_image.src = image;

        if (image != default_image) {
            $last_image.classList.add('last_image_clickable');
            $last_image.addEventListener('click', last_image_clicked);
            $last_image.addEventListener('contextmenu', e => {
                e.stopPropagation();
                e.preventDefault();
                last_image_remove(e);
            });
        }

        /* 드래그 막기 */
        $last_image.addEventListener('dragstart', e => {
            e.stopPropagation();
            e.preventDefault();
        });
        /**************/
            
        fragment.appendChild($last_image);
    }

    $last_images.innerHTML = '';
    $last_images.appendChild(fragment);
}

function last_image_clicked(e) {
    /* 클릭된 오브젝트의 인덱스 찾기 */
    let index = null;
    for (let i = 0; i < max_image_count; ++i) {
        if (last_images[i] == e.srcElement.src) {
            index = i;
            break;
        }
    }
    /********************************/

    $previewImage.src = last_images[index]; // 메인 이미지 변경
    $dispenser.innerHTML = ''; // 결과창 초기화
    if ('r' in last_rgbs[index]) { // 저장된 결과가 있으면 보여주기
        image_upload.set_results(last_rgbs[index]);
    }
    else { // 저장된 결과가 없으면 메인 로직 재수행
        image_upload.send_file(last_images[index]);
    }

    window.scrollTo({ left: 0, top: 0, behavior: "smooth" }); // 맨 위로 스크롤
}

function last_image_remove(e) {
    let idx = -1;
    for (let target = 0; target < max_image_count; ++target) {
        if (e.srcElement.src == last_images[target]) {
            idx = target;
            break;
        }
    }

    last_images.splice(idx, 1);
    last_images.push(default_image);
    last_rgbs.splice(idx, 1);
    last_rgbs.push([]);

    save_local_storage();
    rendering();
}

function save_local_storage() {
    localStorage.setItem(key_last_images, JSON.stringify(last_images));
    localStorage.setItem(key_last_rgbs, JSON.stringify(last_rgbs));
}

export function get_most_recent_image() {
    return last_images[0];
}

export function get_most_recent_results() {
    return last_rgbs[0];
}