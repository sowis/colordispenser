import * as API from './API.mjs';

async function get_total_throughput_size() {
    const { result } = await fetch(API.rest_2);
    return result;
}

async function get_total_throughtput_count() {
    const { result } = await fetch(API.rest_3);
    return result;
}

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
    Promise.all([get_total_throughput_size(), get_total_throughtput_count()]).then(values => {
        const byte_string = byte_formatting(values[0]);
        const process_string = "총 " + byte_string + ", " + values[1] + " 개의 이미지 처리";
        document.querySelector('footer .process_size').textContent = process_string;
    });
}

get_process_string();