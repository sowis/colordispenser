import * as API from './API.mjs';
import * as similar_color from './similar_color.mjs';

const target = { r: 231, g: 25, b: 177 };
console.log(target);
const hsi = similar_color.rgb_to_hsi(target);
console.log(hsi);
const result = similar_color.hsi_to_rgb(hsi);
console.log(result);