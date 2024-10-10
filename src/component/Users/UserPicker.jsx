import {useContext, useEffect, useState} from "react";
import Spinner from "../UI/Spinner.jsx";
import UserContext from "./UserContext.js";
import useFetch from "../utils/useFetch.js";

export default function UserPicker(){
    // const [user, setUser] = useState(null)
    // UserContext 를 통해 관리로 변경
    // user 상태값을 가져오기 위해 useContext hook 사용 해야함
    const {user, setUser} = useContext(UserContext)
//  "http://localhost:3002/users",  setUser(data[0])
    const {data:users=[], status, error} = useFetch("http://localhost:3002/users")

    useEffect(() => {
        setUser(users[0])
    }, [users, setUser]);

    if(status === "loading") {
        return <Spinner/>
    }

    function handleSelect(e){
        // 문자열
        const selectedId = e.target.value
        // u.id : 정수
        const selectedUser = users.find(u=> u.id === parseInt(selectedId, 10))
        //선택된 객체를 users 에서 가져오기
        console.log('-Picker select-', selectedUser)
        // setUser(users[selectedId-1])
        setUser(selectedUser)
    }
    if (users === null){
        return <Spinner/>
    }
    return (
        /* 순서 2) value : users[0] 설정(선택을 바꾸는 이벤트는 handleSelect 처리) */
        <select
            className="user-picker"
            onChange={handleSelect} value={user?.id}>
            {users.map(u =>
                <option key={u.id} value={u.id}>{u.name}</option>
            )}
        </select>
    );
}