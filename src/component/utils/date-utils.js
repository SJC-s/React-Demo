export default function getWeek(forDate, daysOffset=0) {
    // 다음 주, 이전 주 offset 으로 날짜 변경
    const date = addDays(forDate, daysOffset);
    // start, end 를 계산하기 위해 요일이 필요
    // '화'요일 : 2 리턴, 지금 날짜 해당 주의 start : -2, end : : 6-2
    const day = date.getDay();

    return {
        date,
        start: addDays(date, -day),        // 해당 주의 일요일 날짜
        end: addDays(date, 6-day)    // 해당 주의 토요일 날짜
    }
}

export function addDays(forDate, offset) {
    const date = new Date(forDate.getTime());
    // 원하는 날짜만큼 + or - 계산하여 새로운 날짜 저장
    date.setDate(date.getDate() + offset);
    return date;
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');


    return [year, month, day].join('-');
}

export function formatDateDay(date){
    const days = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const dayName = days[date.getDay()];
    // 요일 0,1,2,3 -> 문자열 요일 이름으로 바꾸기

    return formatDate(date) + " " + dayName
}

// 객체에 날짜를 key로 할 때 yyyy-mm-dd (표준시, 시차 발생)
export function shortISO (date) {
    return date.toISOString().split("T")[0];
}

// 테스트
// let result = getWeek(new Date());
// console.log(result);
//
// result = getWeek(new Date(), 7);
// console.log(result);
//
// result = getWeek(new Date(), -7);
// console.log(result);
//
// result = getWeek(new Date('2024-11-06'));
// console.log(result);