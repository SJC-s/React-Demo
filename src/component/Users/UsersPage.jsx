import UsersList from "./UserList.jsx";
import UserDetails from "./UserDetails.jsx";

function UsersPage () {
    // const [user, setUser] = useState(null); -> UserContext 사용하므로 필요 없음
    return (
        <main className="users-page">
            <UsersList/>
            <UserDetails/>
        </main>
    )
}

export default UsersPage;