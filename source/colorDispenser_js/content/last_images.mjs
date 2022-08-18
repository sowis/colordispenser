const max_image_count = 5;
const default_image = 'images/no_last_image.png';
const last_images = [];
const $last_images = document.querySelector('.last_images');

(function main() {
    for (let i = 0; i < max_image_count; ++i) {
        last_images.push(default_image);
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

        if (last_images.length > max_image_count) {
            last_images.pop();
        }

        rendering();
    }
}

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
    const $previewImage = document.querySelector('.current_image');
    $previewImage.src = e.srcElement.src;
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
    rendering();
}