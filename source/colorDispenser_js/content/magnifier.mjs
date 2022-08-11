const magnifier_pixel = 15; // 돋보기 픽셀의 약수로 하기

let inner_buffer = document.createElement('canvas');
const $magnifier = document.querySelector('.magnifier');

document.querySelector('.current_image').addEventListener('mousemove', e => {
    magnification(e.offsetY, e.offsetX);
});

document.querySelector('.current_image').addEventListener('mouseover', e => {
    image_to_canvas();
});

/* 현재이미지 버퍼에 복사 */
function image_to_canvas() {
    const $image = document.querySelector('.current_image');
    inner_buffer.width = $image.clientWidth;
    inner_buffer.height = $image.clientHeight;
    const ctx = inner_buffer.getContext('2d');
    ctx.drawImage($image, 0, 0, $image.clientWidth, $image.clientHeight);
}

/* 돋보기 이미지 그리기 */
function magnification(mouse_y, mouse_x) {
    const image_width = inner_buffer.width;
    const image_height = inner_buffer.height;

    let buffer_ctx = inner_buffer.getContext('2d');
    let ctx = $magnifier.getContext('2d');
    let image_data = ctx.createImageData($magnifier.width, $magnifier.height);
    let raster = image_data.data;

    for (let offset_y = 0; offset_y < magnifier_pixel; ++offset_y) {
        for (let offset_x = 0; offset_x < magnifier_pixel; ++offset_x) {
            const original_y = mouse_y - (magnifier_pixel / 2) + offset_y;
            const original_x = mouse_x - (magnifier_pixel / 2) + offset_x;

            let mouse_color = [0, 0, 0, 0];
            if (!(original_y < 0 || original_y >= image_height || original_x < 0 || original_x >= image_width)) {
                const data = buffer_ctx.getImageData(original_x, original_y, 1, 1).data;
                mouse_color = [data[0], data[1], data[2], data[3]];
            }

            for (let magnifier_y = offset_y * ($magnifier.height / magnifier_pixel); magnifier_y < (offset_y + 1) * ($magnifier.height / magnifier_pixel); ++magnifier_y) {
                for (let magnifier_x = offset_x * ($magnifier.width / magnifier_pixel); magnifier_x < (offset_x + 1) * ($magnifier.width / magnifier_pixel); ++magnifier_x) {
                    const linear_offset = magnifier_y * $magnifier.width + magnifier_x;
                    raster[linear_offset * 4 + 0] = mouse_color[0];
                    raster[linear_offset * 4 + 1] = mouse_color[1];
                    raster[linear_offset * 4 + 2] = mouse_color[2];
                    raster[linear_offset * 4 + 3] = mouse_color[3];
                }
            }
        }
    }

    ctx.putImageData(image_data, 0, 0);
}