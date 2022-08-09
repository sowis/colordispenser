import * as API from './API.mjs';

function byte_formatting(byte) {
    const units = ['byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    let unit_count = 0;

    while (parseInt(byte / 1024) != 0) {
        byte = parseInt(byte / 1024);
        ++unit_count;
    }

    return to_string(byte) + ' ' + units[unit_count];
}

function get_process_string() {
    Promise.all([fetch(API.rest_2), fetch(API.rest_3)]).then(values => {
        const byte_string = byte_formatting(+(values[0].result));
        const process_string = "총 " + byte_string + ", " + values[1].result + " 개의 이미지 처리";
        document.querySelector('footer .process_size').textContent = process_string;
    });
}

//get_process_string();