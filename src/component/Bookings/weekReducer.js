import getWeek from "./date-util.js";

export default function reducer(state, action) {
    switch (action.type) {
        /* 지정된 날짜 기준 +- 7 */
        case "NEXT_WEEK" :
            return getWeek(state.date,  7);
        case "PREV_WEEK" :
            return getWeek(state.date,  -7);
        /* 오늘 날짜 */
        case "TODAY" :
            return getWeek(new Date());
        /* 임의의 날짜 : action.payload */
        case "SET_DATE" :
            return getWeek(new Date(action.payload));
        default:
            // return state;
            throw new Error(`알 수  없는 action type: ${action.type}`);
    }
}
/*
return : getWeek 메소드로 변경된 state.date 를 구함
state(오브젝트) : date(선택날짜), start(date 해당 주 시작 날짜), end(마지막 날짜)
getWeek 메소드 : 다른 컴포넌트에서도 실행
 */