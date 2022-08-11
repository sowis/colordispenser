// 웹 루트 = source 폴더라고 생각하면 됨

export const rest_1 = "/api/rest_1"; 
// 메인 로직
// POST, body에 이미지 파일 담아 전송
// 반환값은 { r, g, b } 로 이루어진 객체들의 배열
// ex) [{ r: 123, g: 122, b: 52 }, { r: 63, g: 1, b: 221 }, { r: 12, g: 92, b: 162 }];

export const rest_2 = "/api/rest_2"; 
// 처리한 이미지 총 용량
// GET
// 반환값은 json
// 프로퍼티로 result: 처리한 이미지 총 용량(byte) 를 가진다
// ex) { result: 28371625 };

export const rest_3 = "/api/rest_3"; 
// 처리한 이미지 총 개수
// GET
// 반환값은 json
// 프로퍼티로 result: 처리한 이미지 총 개수 를 가진다
// ex) { result: 1523 };

export const rest_4 = "/api/rest_4";
// language 폴더에 있는 파일 이름 배열 (.json 확장자는 제외)
// GET
// 반환값은 배열
// ex) [ 한국어, english ];