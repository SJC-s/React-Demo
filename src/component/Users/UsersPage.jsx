import UserList from "./UserList.jsx";

function UsersPage() {
    return (
        <main className="users-page">
            <h4>사용자 리스트</h4>
            {/* 사용자 이름 목록 만들기 */}
            <UserList/>
        </main>
    )
}

export default UsersPage;