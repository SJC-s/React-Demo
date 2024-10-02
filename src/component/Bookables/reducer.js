// state : 상태값 오브젝트(현재 상태값)
// action : 오브젝트는 무엇을 어떻게 변경할 것인가
// 리턴 : 새로운 상태값
export default function reducer(state, action){
    switch (action.type){
        case "SET_GROUP":               /* 개발자가 정함(소문자 가능)*/
            return{
                ...state,               /* 기존 state 값을 오브젝트 복사 */
                group:action.payload,   /* 그룹을 payload 값으로 변경*/
                bookableIndex: 0
            }

        case "SET_BOOKABLE":
            return{
                ...state,
                bookableIndex: action.payload   /* 선택 인덱스를 payload 값으로 변경 */
            }

        case "TOGGLE_HAS_DETAILS":
            return{
                ...state,
                hasDetails: !state.hasDetails   /* hasDetail : not 연산 */
            }

        case "NEXT_BOOKABLE":
        {
            // const count = state.bookables.filter(
            // b=> b.group === state.group).length;
            return{
                ...state,
                bookableIndex: (state.bookableIndex +1) % action.payload
            };
        }

        default:    //꼭 필요함.
            return state;

    }
}