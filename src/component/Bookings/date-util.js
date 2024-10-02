export default function getWeek(forDate, daysOffset=0) {
    // 다음 주, 이전 주 offset 으로 날짜 변경
    forDate = addDays(forDate, daysOffset);
    // start, end 를 계산하기 위해 요일이 필요
    // '화'요일 : 2 리턴, 지금 날짜 해당 주의 start : -2, end : : 6-2
    const day = forDate.getDay();

    return {
        date: forDate,
        start: addDays(forDate, -day),        // 해당 주의 일요일 날짜
        end: addDays(forDate, 6-day)    // 해당 주의 토요일 날짜
    }
}

function addDays(forDate, offset) {
    const date = new Date(forDate.getTime());
    // 원하는 날짜만큼 + or - 계산하여 새로운 날짜 저장
    date.setDate(date.getDate() + offset);
    return date;
}

let result = getWeek(new Date());
console.log(result);

result = getWeek(new Date(), 7);
console.log(result);

result = getWeek(new Date(), -7);
console.log(result);

result = getWeek(new Date('2024-11-06'));
console.log(result);