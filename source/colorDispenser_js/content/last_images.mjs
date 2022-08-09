const max_image_count = 5;
const default_image = 'images/no_last_image.jpg';
const last_images = [];
const $last_images = document.querySelector('.last_images');

for (let i = 0; i < max_image_count; ++i) {
    last_images.push(default_image);
}

export function upload_new_image(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
        last_images.unshift(e.target.result);

        if (last_images.length > max_image_count) {
            last_images.pop();
        }

        const fragment = new DocumentFragment();
        for (const image of last_images) {
            const $last_image = document.createElement('img');
            $last_image.classList.add('last_image');
            $last_image.src = image;

            if (image != default_image) {
                $last_image.classList.add('last_image_clickable');
                $last_image.addEventListener('click', last_image_clicked);
            }
            
            fragment.appendChild($last_image);
        }

        $last_images.innerHTML = '';
        $last_images.appendChild(fragment);
    }
}

function last_image_clicked(e) {
    const $previewImage = document.querySelector('.current_image');
    $previewImage.src = e.srcElement.src;
}