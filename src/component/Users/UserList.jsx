import {users} from "../../static.json"
import {useState} from "react";

function UserList() {

    const [userIndex, setUserIndex] = useState(0);

    return (
        <ul className="items-list-nav">
            {users.map((u,i) => (
                <li key={u.id} className={i === userIndex ? "selected":null}>
                    <button className="btn" onClick={() => setUserIndex(i)}>
                        {u.name}
                    </button>
                </li>
            ))}
        </ul>
    )

}

export default UserList;