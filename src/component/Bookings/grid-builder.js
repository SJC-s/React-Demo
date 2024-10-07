// grid(격자, 테이블)
// 행 제목 : 세션 이름들
// 열 제목 : 선택한 날 해당 주의 날짜들

// 선택한 bookable 데이터를 격자 구조로 출력할 수 있는 오브젝트 만들기
import {addDays, formatDate} from "../utils/date-utils.js";
import {sessions as sessionNames} from '../../static.json';

export function getGrid(bookable, startDate) {
    // 선택한 날짜 해당 주의 날짜들 저장한 배열 생성
    const dates = bookable.days.sort().map(d => formatDate(addDays(startDate, d)))

    // 선택한 bookable 의 sessions 숫자를 문자열 이름으로 저장한 배열 생성
    // bookable.sessions id : 3 [0, 2, 4] ['Breakfast', 'Lunch', 'Evening']
    const sessions = bookable.sessions.map(i => sessionNames[i])

    const grid = {}
    sessions.forEach(session => {
        grid[session] = {}
        dates.forEach(date => grid[session][date] = {
            session,
            date,
            bookableId : bookable.id,
            title:""
        })
    })
    // 키이름과 변수명이 같으면 생략해서 하나만 써도 된다
    return { grid, dates, sessions:sessions }
}

export function transformBookings (bookingsArray) {
    return bookingsArray.reduce((bookings, booking) => {
        const {session, date} = booking;

        if (!bookings[session]) {
            bookings[session] = {};
        }

        bookings[session][date] = booking;

        return bookings;
    }, {});
}

// ======= 테스트

// const sessionNames= [
//     "Breakfast",
//     "Morning",
//     "Lunch",
//     "Afternoon",
//     "Evening"
// ]

// const bookable =
// {
//     id: 3,
//         group: "Rooms",
//     title: "Games Room",
//     notes: "Table tennis, table football, pinball! There's also a selection of board games. Please tidy up!",
//     sessions: [
//     0,
//     2,
//     4
// ],
//     days: [
//     0,
//     2,
//     3,
//     4,
//     5,
//     6
// ]
// }
//
// const result = getGrid(bookable, new Date("2024-09-29"))
// console.log('-->', result) // grid 객체
//
// // 자바스크립트 프로퍼티 get/set : 객체.프로퍼티이름 또는 객체[프로퍼티이름]
// console.log(result.grid["Breakfast"]["2024-10-01"])