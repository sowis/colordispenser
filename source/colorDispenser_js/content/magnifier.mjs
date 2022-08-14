import * as palette from '/colorDispenser_js/content/palette.mjs';
import * as mouse_color from '/colorDispenser_js/content/mouse_color.mjs';

const magnifier_pixel = 30; // 돋보기 픽셀의 약수로 하기

let inner_buffer = document.createElement('canvas');
const $magnifier = document.querySelector('.magnifier');
const $current_image = document.querySelector('.current_image');

$current_image.addEventListener('mousemove', e => {
    magnification(e.offsetY, e.offsetX);
});

$current_image.addEventListener('mouseover', e => {
    image_to_canvas();
});

/* 이미지 우클릭시 그 색상 팔레트로 감 */
$current_image.addEventListener('contextmenu', e => {
    e.stopPropagation();
    e.preventDefault();

    let buffer_ctx = inner_buffer.getContext('2d');
    const data = buffer_ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    const rgb = {r: data[0], g: data[1], b: data[2]};
    palette.palette_add_rgb(rgb);
});

/* 아무 키나 눌렀을 때 이미지를 버퍼로 복사. f10등으로 화면 크기가 변하는 경우를 대응하기 위해 */
document.querySelector('body').addEventListener('keyup', e => {
    image_to_canvas();
});

/* 현재이미지 버퍼에 복사 */
function image_to_canvas() {
    inner_buffer.width = $current_image.clientWidth;
    inner_buffer.height = $current_image.clientHeight;
    const ctx = inner_buffer.getContext('2d');
    ctx.drawImage($current_image, 0, 0, $current_image.clientWidth, $current_image.clientHeight);
}

/* 돋보기 이미지 그리기 */
function magnification(mouse_y, mouse_x) {
    const image_width = inner_buffer.width;
    const image_height = inner_buffer.height;

    let buffer_ctx = inner_buffer.getContext('2d');
    let ctx = $magnifier.getContext('2d');
    let image_data = ctx.createImageData($magnifier.width, $magnifier.height);
    let raster = image_data.data;

    /* 이미지 위의 현재 마우스 위치 색을 $mouse_color 에 그리기 */
    const data = buffer_ctx.getImageData(mouse_x, mouse_y, 1, 1).data;
    mouse_color.set_mouse_color({r: data[0], g:data[1], b:data[2]});
    /************************************************/

    for (let offset_y = 0; offset_y < magnifier_pixel; ++offset_y) {
        for (let offset_x = 0; offset_x < magnifier_pixel; ++offset_x) {
            const original_y = mouse_y - (magnifier_pixel / 2) + offset_y;
            const original_x = mouse_x - (magnifier_pixel / 2) + offset_x;

            let around_color = [0, 0, 0, 0];
            if (!(original_y < 0 || original_y >= image_height || original_x < 0 || original_x >= image_width)) {
                const data = buffer_ctx.getImageData(original_x, original_y, 1, 1).data;
                around_color = [data[0], data[1], data[2], data[3]];
            }

            for (let magnifier_y = offset_y * ($magnifier.height / magnifier_pixel); magnifier_y < (offset_y + 1) * ($magnifier.height / magnifier_pixel); ++magnifier_y) {
                for (let magnifier_x = offset_x * ($magnifier.width / magnifier_pixel); magnifier_x < (offset_x + 1) * ($magnifier.width / magnifier_pixel); ++magnifier_x) {
                    const linear_offset = magnifier_y * $magnifier.width + magnifier_x;
                    raster[linear_offset * 4 + 0] = around_color[0];
                    raster[linear_offset * 4 + 1] = around_color[1];
                    raster[linear_offset * 4 + 2] = around_color[2];
                    raster[linear_offset * 4 + 3] = around_color[3];
                }
            }
        }
    }

    ctx.putImageData(image_data, 0, 0);
}