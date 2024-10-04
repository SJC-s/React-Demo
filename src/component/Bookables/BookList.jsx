import {days,sessions} from "../../static.json"
import {useEffect, useReducer,useState} from "react";
import {FaArrowRight} from "react-icons/fa";
import reducer from "./reducer.js";
import PageSpinner from "src/component/Users/PageSpinner.jsx";


function BookList() {
    // 상태를 관리할 변수들 초기값 객체
    const initState = {
        group: "Rooms",
        bookableIndex: 0,
        hasDetails: false
    }

    // state : 상태값들을 모아놓은 오브젝트
    // dispatch 현재 상태값 -> 새로운 상태값을 만든다, 이벤트 핸들러에서 실행
    // state, dispatch : useReducer 함수의 리턴 값
    // useReducer 생성하는 인자
    // 1. reducer : dispatch 에서 전달한 액션(type, payload)으로 실행할 내용을 정의
    //    - useState 에서는 이벤트에서 처리하던 동작을 모아서 현재값을 어떤 수식으로 실행할지 정의
    // 2. initState : 상태값(오브젝트)의 초기 상태
    // 3. 생략된 상태 : initState 초기값을 받아 처음한번 실행하는 초기화 함수
    const [state, dispatch] = useReducer(reducer, initState);
    const {group, bookableIndex, hasDetails} = state

    const [bookables, setBookables] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3002/bookables")
            .then(response => {
                return response.json()
            })
            .then(
                data => {
                    setBookables(data)
                    setLoading(false)
                }
            )
            .catch((error) => setError(error.message))
    }, []);

    if(error){
        return <div>오류 : {error}</div>
    }

    if(loading){
        return <span><PageSpinner/>Loading....</span>
    }

    const bookableGroup = bookables.filter(b => (b.group === group))
    const groups = [...new Set(bookables.map(b=>b.group))]


    function nextBookableIndex(){
        dispatch({
            type: "NEXT_BOOKABLE",
            payload: bookableGroup.length
        })
    }

    function changeGroup(event) {
        dispatch({
            type: "SET_GROUP",
            payload: event.target.value
        })
    }

    function changeBookableIndex(selectIndex){
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectIndex
        })
    }

    function toggleDetails() {
        dispatch({
            type: "TOGGLE_HAS_DETAILS"
        })
    }

    const bookable = bookableGroup[bookableIndex];

    return (
        <>
            <div>
                <select value={group} onChange={changeGroup}>
                    {/* eslint-disable-next-line react/jsx-key */}
                    {groups.map(g => <option value={g}>{g}</option>)}
                </select>
                <ul className="items-list-nav">
                    {bookableGroup.map((b,i) => (
                        <li key={b.id} className={i === bookableIndex ? "selected":null}>
                            <button className="btn" onClick={() => changeBookableIndex(i)}>
                                {b.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button className="btn" onClick={nextBookableIndex}>
                        <FaArrowRight/><span>Next</span>
                    </button>
                </p>
            </div>

            {/* 새로운 UI 추가 : 상세 내용 */}
            <div className="book-details">
                <div className="item">
                    <div className="item-header">
                        <h2>{bookable.title}</h2>
                        <span className="controls">
                            <label>
                                <input type="checkbox" checked={hasDetails} onChange={toggleDetails}/>
                            </label>
                        </span>
                    </div>
                    <p>{bookable.notes}</p>
                    {hasDetails && (
                        <div className="item-details">
                            <h3>사용가능한 요일과 세션</h3>
                            <div className="bookable-availability">
                                <ul>
                                    {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                                </ul>
                                <ul>
                                    {bookable.sessions.sort().map(s => <li key={s}>{sessions[s]}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BookList;