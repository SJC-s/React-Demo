import {bookables} from "../../static.json"
import {useState} from "react";
import {FaArrowRight} from "react-icons/fa";

function BookList() {
    console.log(bookables)
    const [group, setGroup] = useState("Rooms")
    const bookableGroup = bookables.filter(b => (b.group === group))
    const groups = ["Rooms", "Kit"]

    // 상태값 관리를 해야할 변수 bookableIndex
    // setBookableIndex : useState 가 리턴해주는 메소드(값 변경 메소드)
    const [bookableIndex, setBookableIndex] = useState(0)

    function nextBookableIndex(){
        setBookableIndex((i) => (i+1) % bookableGroup.length)
        // 상태값 변경 메소드의 인자 i : bookableIndex 값
    }

    return (
        <div>
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
                {groups.map(g => <option value={g}>{g}</option>)}
            </select>
            <ul className="items-list-nav">
                {bookableGroup.map((b,i) => (
                    <li key={b.id} className={i === bookableIndex ? "selected":null}>
                        <button className="btn" onClick={() => setBookableIndex(i)}>
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
    )
}

export default BookList;