import {useReducer} from "react";
import reducer from "./weekReducer.js";
import getWeek from "../utils/date-utils.js";
import {FaCalendarDay, FaChevronLeft, FaChevronRight, FaCalendarCheck} from "react-icons/fa";
import {formatDate} from "../utils/date-utils.js";
import {useRef} from "react";

function WeekPicker({week, dispatch}) {

    //* go 버튼 추가 : useRef 새로이 사용한 훅
    // input 요소 값을 state 로 관리하면 바로 set 함수 실행해서 잘못된 출력 발생
    // 사용자가 버튼을 눌렀을 때 함수를 실행하도록 합니다
    // useRef : document.getElementById() 와 같은 동작을 할 수 있도록 함
    //   (리턴객체 참조 변수 textboxRef 설정한 input 요소에 대해 동작)
    const textboxRef = useRef();

    function goToDate () {
        dispatch({
            type: "SET_DATE",
            payload: textboxRef.current.value
            /* document.getElementById().value 역할 - get, set 가능 */
        });
    }

    return (
        <div>
            <p className="date-picker">
                <button className="btn" onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft/>
                    <span>PREV</span>
                </button>
                {/* 입력값을 state(상태값) 관리시 : 이 예제에서는 날짜 타입으로 변환되는 문자열이 아니면 예상치 않은 결과로 보인다 */}
                <input type="text" ref={textboxRef} defaultValue={formatDate(new Date())} placeholder="yyyy-MM-dd"/> {/* useRef 참조되는 input 객체 */}
                <button className="go btn" onClick={goToDate}>
                    <FaCalendarCheck/>
                    <span>Go</span>
                </button>
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

export default WeekPicker;