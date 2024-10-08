import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";

// bookables : 전체 목록, bookable : 목록 중에 선택한 객체를 컴포넌트 프롭으로 받음
export default function BookablesList ({bookable, bookables,getUrl}) {

    const group = bookable?.group;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];

    // url로 네비게이션을 할 수 있는 함수를 리턴한다.
    const navigate = useNavigate();

    function changeGroup (e) {
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === e.target.value
        );
        // setBookable(bookablesInSelectedGroup[0]);
        navigate(getUrl(bookablesInSelectedGroup[0].id)); //  navigate(`/bookables/${bookablesInSelectedGroup[0].id}`);
        // 단순히 상태값을 바꾸는 것이 아니고 새로운 url 로 요청을 보낸다.
    }

    function nextBookable () {
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        // setBookable(nextBookable);
        navigate(getUrl(nextBookable.id));
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
                        <Link to={getUrl(b.id)} className="btn" replace={true}>
                            {/* 순서1) b.id 값을 경로 파라미터로 하여 새로운 요청 보내기 */}
                            {b.title}
                        </Link>
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