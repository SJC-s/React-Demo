import {useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";

function UserList({user, setUser}) {
    const [users, setUsers] = useState(null); //  순서4) fetch 결과 상태값 저장
    // fetch 중 오류 발생시 또는 로딩 중의 상태값
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // index 를 사용하면 이벤트 핸들러가 아닌 곳에서 상태 변경 함수를 실행
    // 그래서 index 를 사용하지 않도록 리팩토링
    // setUser(users?.[userIndex])

    // API 서비스 제공하는 서버로부터 데이터 가져오기
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3002/users").then(response => { // 순서 1)
            return response.json();
        }).then(data => {  // 순서2) users 배열이 data로 저장
            console.log(data);
            setUsers(data); // 순서3) 상태 users 변경
            setLoading(false)
        }).catch(error => {setError(error.message);})
    }, []);
    // [data] : 의존값, 없으면 컴포넌트 실행될 때 처음 1번만 useEffect 동작, 있으면 data 값이 변경될 때마다 useEffect 실행
    // 상태값 변수
    if(error) {
        return <div>오류 : {error}</div>
    }

    if(loading) { // 스피너 컴포넌트 사용 가능
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
            {/*<UserDetails user={user}/>*/}
            {/* UserDetails 로 컴포넌트 분리 */}
    {/*        {user && (<div className="item user">
                <div className="item-header">
                    <h2>{user.name}</h2>
                </div>
                <div className="user-details">
                    <h3>{user.title}</h3>
                    <p>{user.notes}</p>
                </div>
            </div>)}*/}
        </>
    )

}

export default UserList;