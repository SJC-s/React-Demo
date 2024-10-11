import {days as daysArray, sessions as sessionsArray} from "../../static.json"
import {FaCloudUploadAlt, FaTrash, FaWindowClose} from "react-icons/fa";
import {Link} from "react-router-dom";

// BookableNew 에서는 handleSubmit(post) 함수만 전달
// BookableEdit 에서는 handleDelete, handleSubmit(patch 또는 put 수정) 함수 2개 모두 전달
export default function BookableForm({formState={} , handleDelete, handleSubmit}) {
    // state 가 undefined 일 때를 위한 초기값 필요
    const {state={},setState} = formState;
    const {title="", group="", notes=""} = state;
    const {days=[], sessions=[]} = state

    // input 요소의 value : 상태값 state 변수 <- BookableEdit 에서 useState 로 만들어진 변수
    function handleChange(e){
        // setState 로 값을 변경 -> input 요소에 변화가 보임
        // input 요소 : name, value 속성값 한쌍으로 저장 되어야 한다
        setState({
            ...state, // old state(현재 state 객체 값 복사)
            [e.target.name]: e.target.value // 이벤트 발생시킨 input 요소만 업데이트
        })
    }

    function handleChecked(e) {
        // setState 로 값을 변경
        // 많은 체크 박스 중 하나를 클릭한 것에 대한 이벤트 핸들러
        // 이벤트를 발생시킨 체크박스를 하나이고 그것에 대한 name, value, 체크여부를 저장
        const {name, value, checked} = e.target
        // 체크박스 name : 두개중 하나, days, sessions 배열 현재상태값 가져오기
        const values = new Set(state[name])
        // 클릭한 체크박스의 value 문자열을 정수로 변환하여 저장
        const intValue = parseInt(value, 10)

        // 일단 해당 intValue 를 values 배열에서 삭제하기
        values.delete(intValue)
        // 체크 상태 다시 확인하여 values 배열에 추가
        if(checked) values.add(intValue)

        //
        setState({
            ...state,
            [name]: [...values] // days 또는 session 배열을 수정
        })
    }

    // 입력할 때 바뀌는 것을 관찰
    console.log("BookableForm state---", state)


    return (
        <main className="bookables-form">
            <div className="item item-form">
                <div className="item-header">
                    <h2>{handleDelete ? "Edit" : "New"} Bookable</h2>
                </div>


                <label htmlFor="title" className="field">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />

                <label htmlFor="group" className="field">Group</label>
                <input
                    type="text"
                    name="group"
                    value={group}
                    onChange={handleChange}
                />
                <div>
                    <label htmlFor="notes" className="field">Notes</label>
                    <textarea
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="bookable-availability">
                    <ul>
                        {daysArray.map((day, i) => (
                            <li key={day}><label>
                                <input
                                    checked={days.indexOf(i) !== -1}
                                    type="checkbox"
                                    name="days"
                                    value={i}
                                    onChange={handleChecked}
                                />
                                {day}
                            </label></li>
                        ))}
                    </ul>

                    <ul>
                        {sessionsArray.map((session, i) => (
                            <li key={session}><label>
                                <input
                                    checked={sessions.indexOf(i) !== -1}
                                    type="checkbox"
                                    name="sessions"
                                    value={i}
                                    onChange={handleChecked}
                                />
                                {session}
                            </label></li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="controls">
                {handleDelete && (
                    <button className="btn btn-delete controls-alt" onClick={handleDelete}>
                        <FaTrash/><span>삭제</span>
                    </button>
                )}
                <Link className="btn" to={state.id ? `/bookables/${state.id}` : `/bookables`}>
                    <FaWindowClose/><span>닫기</span>
                </Link>
                <button className="btn" onClick={handleSubmit}>
                    <FaCloudUploadAlt/><span>저장</span>
                </button>
            </p>
        </main>
    )
}
// handleDelete, handleSubmit 함수 : 이벤트 핸들러 -> 서버의 상태를 바꾸는 fetch
// BookableForm : 새로운 예약 자원 등록에도 사용할 예정(등록과 편집)