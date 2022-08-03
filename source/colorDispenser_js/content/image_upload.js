document.querySelector('.file_upload_button').addEventListener('change', upload_event());

function upload_event(e) {
    const $input = document.querySelector('.file_upload_button');
    if($input.files && $input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
            const previewImage = document.querySelector('.current_image');
            previewImage.src = e.target.result;
        }

        reader.readAsDataURL($input.files[0]);
    }
}

document.querySelector('.current_image').addEventListener('dragenter', e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('a');
    document.querySelector('.current_image').classList.add('.current_image_dragover');
});

document.querySelector('.current_image').addEventListener('dragover', e => {
    e.stopPropagation();
    e.preventDefault();
});

document.querySelector('.current_image').addEventListener('dragleave', e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('b');
    document.querySelector('.current_image').classList.remove('.current_image_dragover');
});

document.querySelector('.current_image').addEventListener('drop', e => {
    e.stopPropagation();
    e.preventDefault();
    console.log('c');
    document.querySelector('.current_image').classList.remove('.current_image_dragover');

    const files = e.target.files || e.dataTransfer.files;
 
    if (files.length > 1) {
        alert('하나의 이미지만 업로드 할 수 있습니다');
        return;
    }

    document.querySelector('.file_upload_button').files = files;
    upload_event();
});