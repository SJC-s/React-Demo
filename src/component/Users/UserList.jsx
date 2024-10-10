import {useContext, useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";
import UserContext from "./UserContext.js";
import useFetch from "../utils/useFetch.js";

function UserList() {
    // user 상태값을 UserContext 에서 가져옴
    const {user, setUser} = useContext(UserContext)

//  fetch("http://localhost:3002/users")
    const {data:users=[], status, error} = useFetch("http://localhost:3002/users")

    useEffect(() => {
        setUser(users[0])
    }, [users, setUser]);

    // 상태값 변수
    if(status === "error") {
        return <div>오류 : {error}</div>
    }

    if(status === "loading") { // 스피너 컴포넌트 사용 가능
        // return <div>로딩중.....</div>
        return <PageSpinner/>
    }

    // 순서 6) 컴포넌트를 가지고 UI를 만듦
    return (
        <>
            {users && (<ul className="users items-list-nav">
                {users.map(u => (
                    <li key={u.id} className={u.id === user?.id ? "selected":null}>
                        <button className="btn" onClick={() => setUser(u)}>
                            {u.name}
                        </button>
                    </li>
                ))}
            </ul>)}
        </>
    )

}

export default UserList;