import * as API from './API.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';

/* 253 GB 형식 */
function byte_formatting(byte) {
    if (isNaN(byte)) {
        return byte;
    }

    const units = ['byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    let unit_count = 0;

    while (parseInt(byte / 1024) != 0) {
        byte = parseInt(byte / 1024);
        ++unit_count;
    }

    return '' + byte + ' ' + units[unit_count];
}

/* 1,234,567 byte 형식 */
function byte_formatting_2(byte) {
    if (isNaN(byte)) {
        return byte;
    }

    return byte.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' byte';
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

export function update_process_string() {
    Promise.all([fetch(API.rest_2), fetch(API.rest_3)])
    .then(responses => Promise.all(responses.map(res => res.json()))
        .then(jsons => {
            const byte_string = byte_formatting_2(+jsons[0].result);
            const process_string = languages.language_module.str_2.format(byte_string, +jsons[1].result);
    
            document.querySelector('footer .process_size').textContent = process_string;
        })
    )
}