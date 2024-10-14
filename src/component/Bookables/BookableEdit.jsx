import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import loadData, {editItem, deleteItem, createItem} from "../utils/api.js";
import {useEffect, useState} from "react";
import BookableForm from "./BookableForm.jsx";
import PageSpinner from "../UI/PageSpinner.jsx";

// 수정(편집) 화면에는 현재 데이터 값(예약자원) 전달
export default function BookableEdit() {
    const {id} = useParams()
    const queryClient = useQueryClient()
    // 훅은 top 위치에서 선언하기
    const navigate = useNavigate()


    // 하나의 예약 자원을 fetch -> key 값이 문자열, id 정수값 요소를 갖는 배열
    const {data, status, isLoading} = useQuery(
        ["bookable", id],
        () => loadData(`http://localhost:3002/bookables/${id}`),
        {
            initialData: queryClient.getQueriesData("bookables")?.find(
                b => b.id === parseInt(id, 10)
            )
        }
        // initialData : 설정 옵션(캐시 만료, 데이터 읽기 지연 혹은 오류 문제를 해결하는 초기값)
        // fetch 문제 : "bookables" 이름의 캐쉬값을 가져와서 id 와 같은 것으로 data 에 저장
    )

    /* -- 수업
    // 삭제 처리 커스텀 훅
function useDeleteBookable () {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        bookable => deleteItem(`http://localhost:3002/bookables/${bookable.id}`),
        {
            // onSuccess : 첫번째 인자는 서버에서 보낸 응답. 두번째 인자는 실행함수로 보낸 데이터
            onSuccess: (response, bookable) => {
                // 현재 cache 에서 key 이름 "bookables" 가져오기
                // 낙관적 업데이트 : DELETE 요청을 성공했으니 캐쉬를 바로 업데이트
                const bookables = queryClient.getQueryData("bookables") || [];
                console.log("useDeleteBookable bookable",bookable)
                // 삭제한 bookable 만 제외 filter 하여 bookables 업데이트
                queryClient.setQueryData(
                    "bookables",
                    bookables.filter(b => b.id !== bookable.id)
                );
                // 삭제된 bookable 그룹의 첫번쨰 항목으로 url 바꾸기
                navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`);
            }
        }
    );
    // 리턴 받은 mutation 객체 중 필요한 값만 모아서 객체 생성하여 리턴
    return {
        deleteBookable: mutation.mutate,
        status:mutation.status,
        isDeleteError: mutation.isError,
        deleteError: mutation.error
    };
}
function getIdForFirstInGroup (bookables, excludedBookable) {
    // 삭제된 excludedBookable 의 id, group 저장
    const {id, group} = excludedBookable;
    // bookables 에서 삭제된 group 과 같은 첫번째 id 찾기
    const bookableInGroup = bookables.find(b => b.group === group && b.id !== id);
    // id 리턴
    return bookableInGroup?.id;
}
    * */

    const {mutate:deleteBookable} = useMutation(
        /* deleteBookable 이 실행할 인자값과 실행할 비동기 함수 */
        () =>deleteItem(`http://localhost:3002/bookables/${id}`),
        {
            onSuccess: () =>{
                navigate(`/bookables/${queryClient.getQueriesData('bookables')[0][1].filter(b => b.group === data?.group)[0].id}`)
            }
        }
    )

    const [state, setState] = useState()
    useEffect(() => {
        if(data) {
            setState(data)
        }
    }, [data]);

    if(isLoading) {
        return <PageSpinner/>
    }


    // url 변경하는 네비게이트 함수를 리턴
    function handleSubmit() {
        const result = editItem(`http://localhost:3002/bookables/${id}`, state)
        navigate(`/bookables/${id}`)
    }

    function handleDelete() {
        // const result = deleteItem(`http://localhost:3002/bookables/${id}`)
        // navigate(`/bookables/${id}`) // 삭제 후 삭제된 bookable 의 그룹 첫번째 값으로 이동
        deleteBookable(state)
    }

    // state : 화면에 보여질 값들을 저장
    return (
        status ==="success" &&
        <BookableForm formState={{state, setState}} handleDelete={handleDelete} handleSubmit={handleSubmit}/>
    )
}