import {createContext} from "react";

// 컨텍스트 생성하기
const UserContext = createContext();
export default UserContext;

/*
사용자의 상태는 애플리케이션 컴포넌트 계층 맨 위에 위치한다.
중간 컴포넌트를 통해 전달하지 않고 (중간 컴포넌트 중에는 사용자의 상태와 상관 없는, 관심 없는 컴포넌트가 많기 때문)
여러 위치에 흩어져 있는 사용자 상태에 관심있는 컴포넌트와 공유한다.
* */