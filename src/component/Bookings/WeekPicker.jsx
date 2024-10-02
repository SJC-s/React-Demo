import {useReducer} from "react";
import reducer from "./weekReducer.js";
import getWeek from "./date-util.js";
import {FaCalendarDay, FaChevronLeft, FaChevronRight} from "react-icons/fa";

function WeekPicker({date}) {
    // date 값으로 getWeek 함수를 통해 state(week) 초기화
    const [week, dispatch] = useReducer(reducer, date, getWeek);

    function changeDate(event) {
        dispatch({
            type: "SET_DATE",
            payload: event.target.value
        })
    }

    return (
        <div>
            <p className="date-picker">
                <button className="btn" onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft/>
                    <span>PREV</span>
                </button>
                <input type="date" defaultValue={formatDate(new Date())} onChange={changeDate}/>
                {/* 입력값을 state(상태값) 관리시 : 이 예제에서는 날짜 타입으로 변환되는 문자열이 아니면 예상치 않은 결과로 보인다 */}
                <input type="text" defaultValue={formatDate(new Date())} placeholder="yyyy-MM-dd" onChange={changeDate}/>
                <button className="btn" onClick={() => dispatch({type: "TODAY"})}>
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>
                <button className="btn" onClick={() => dispatch({type: "NEXT_WEEK"})}>
                    <FaChevronRight/>
                    <span>NEXT</span>
                </button>
            </p>
            <p>
                {formatDate(week.start)} ~ {formatDate(week.end)}
            </p>
        </div>
    )
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

export default WeekPicker;