import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";
import UserPicker from "./component/Users/UserPicker.jsx";
import BookingsPage from "./component/Bookings/BookingsPage.jsx";
import BookablesPage from "./component/Bookables/BookablesPage.jsx";
import UsersPage from "./component/Users/UsersPage.jsx";
import {useState} from "react";
import UserContext from "./component/Users/UserContext.js";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
  const [user, setUser] = useState();
  console.log('-App user -', user)
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{user,setUser}}>
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/bookings" className="btn btn-header">
                    <FaCalendarAlt/>
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookables" className="btn btn-header">
                    <FaDoorOpen/>
                    <span>Bookables</span>
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="btn btn-header">
                    <FaUsers/>
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <UserPicker/>
          </header>
        </div>
        <Routes>
          <Route path="/bookings" element={<BookingsPage/>}/>
          {/* url 경로를 확장하기 위하여 path 수정, BookablesPage 에서 세부적인 처리와 정의 */}
          <Route path="/bookables/*" element={<BookablesPage/>}/>
          <Route path="/users" element={<UsersPage/>}/>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
      </QueryClientProvider>
  )
}

export default App
