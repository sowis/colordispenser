import * as API from './API.mjs';
import * as languages from '/colorDispenser_js/languages.mjs';

function byte_formatting(byte) {
    const units = ['byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    let unit_count = 0;

    while (parseInt(byte / 1024) != 0) {
        byte = parseInt(byte / 1024);
        ++unit_count;
    }

    return to_string(byte) + ' ' + units[unit_count];
}

String.format = function() {
	let args = arguments;
	return args[0].replace(/{(\d+)}/g, function(match, num) {
		num = Number(num) + 1;
		return typeof(args[num]) != undefined ? args[num] : match;
    });
}

function get_process_string() {
    Promise.all([fetch(API.rest_2), fetch(API.rest_3)]).then(values => {
        const byte_string = byte_formatting(+(values[0].result));
        const process_string = languages.language_module.str_2.format(byte_string, values[1].result);
        document.querySelector('footer .process_size').textContent = process_string;
    });
}