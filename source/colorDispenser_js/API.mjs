const colorDispenser = "api/colorDispenser"; // 메인 로직
// POST, body에 이미지 파일 담아 전송
// 반환값은 json, 객체 프로퍼티는 다음과 같다
// colorCount: 나뉘어진 색의 개수
// color_0 ~ N(colorCount): { red, green, blue } 로 이루어진 객체
// ex) { colorCount: 3, { red: 123, green: 122, blue: 52 }, { red: 63, green: 1, blue:221 }, { red: 12, green: 92, blue: 162 } };

const totalThroughputSize = "api/totalThroughputSize"; // 처리한 이미지 총 용량
// GET
// 반환값은 json
// 프로퍼티로 totalThroughputSize: 처리한 이미지 총 용량(byte) 를 가진다
// ex) { totalThroughputSize: 28371625 };

const totalThroughputCount = "api/totalThroughputCount"; // 처리한 이미지 총 개수
// GET
// 반환값은 json
// 프로퍼티로 totalThroughputCount: 처리한 이미지 총 개수 를 가진다
// ex) { totalThroughputCount: 1523 };

