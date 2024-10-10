import { useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner.jsx";
import loadData from "../utils/api.js";
import useFetch from "../utils/useFetch.js";

// bookables : 전체 목록, bookable : 목록 중에 선택한 객체를 컴포넌트 프롭으로 받음
//자식 컴포넌트에서 부모컴포넌트가 전달한 state 변수를 props 로 받음.
export default function BookablesList ({bookable, setBookable}) {
// "http://localhost:3002/bookables"
// 커스텀 훅 호출 : useFetch 리턴받은 객체를 구조 분해하여 저장, data 프로퍼티는 변수명 bookables(data 값이 없으면 [] 배열로 초기화)
    const {data:bookables=[], status, error} = useFetch("http://localhost:3002/bookables")

    // 현재 컴포넌트의 bookable 인자는 select 로 선택하는 그룹값을 포함
    // 페이지전환으로 처음 컴포넌트가 호출되면 ?. 조건에 따라 group : undefined
    // 아래 useEffect 에서 setBookable 실행(초기화) 되면 group, bookablesInGroup 2개의 값이 결정된다
    const group = bookable?.group;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    // bookables 를 fetch 한 후에 새로운 그룹이 있을 경우 실행 필요
    const groups = [...new Set(bookables.map(b => b.group))];

    // 데이터를 fetch 한 후에 설정되는 초기화
    useEffect(() => {
        setBookable(bookables[0])
    }, [bookables, setBookable]);
    // 의존성 배열은 useEffect 안에서 사용한 변수, 함수 모두 포함하는 것이 규칙

    if(status === "error") {
        return <p>{error.message}</p>
    }

    if(status === "loading") {
        return <p><Spinner/>Loading bookables....</p>
    }

    function changeGroup (e) {
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === e.target.value
        );
        setBookable(bookablesInSelectedGroup[0]);
    }

    function nextBookable () {
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        setBookable(nextBookable);
    }

    return (
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g => <option value={g} key={g}>{g}</option>)}
            </select>

            <ul className="bookables items-list-nav">
                {/* 기존 코드 (b,i) 인자를 받아서 i 인덱스 상태를 변경함 */}
                {bookablesInGroup.map(b => (
                    <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
                        {/* 순서 2) 재렌더링 css 변경, bookable : 새로운 상태값 */}
                        <button className="btn"  onClick={() => setBookable(b)}>
                        {/* 순서 1) bookable 상태 변경 */}
                            {b.title}
                        </button>
                    </li>
                ))}
            </ul>
            <p>
                <button className="btn" onClick={nextBookable} autoFocus>
                    <FaArrowRight/>
                    <span>Next</span>
                </button>
            </p>
        </div>
    );
}