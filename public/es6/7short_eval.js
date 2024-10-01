// 단축 평가(short-circuit evaluation)
// and, or 논리 연산
let isValid = true
// 기존 방식
if(isValid) console.log("hello");
// 단축 평가식 : if 문 대신 사용
isValid && console.log("hello")

isValid=false
isValid && console.log("hello")

let a=20
console.log(isValid || a>10)  // 단축 평가 적용하여 논리연산 수행
isValid=true
console.log(isValid || a>10)
