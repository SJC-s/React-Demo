import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import loadData from "../utils/api.js";
import {useEffect, useState} from "react";
import BookableForm from "./BookableForm.jsx";
import PageSpinner from "../UI/PageSpinner.jsx";

// 수정(편집) 화면에는 현재 데이터 값(예약자원) 전달
export default function BookableEdit() {
    const {id} = useParams()
    const queryClient = useQueryClient()


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

    const [state, setState] = useState()
    useEffect(() => {
        if(data) {
            setState(data)
        }
    }, [data]);

    if(isLoading) {
        return <PageSpinner/>
    }

    // state : 화면에 보여질 값들을 저장
    return (
        status ==="success" && <BookableForm formState={{state, setState}}/>
    )
}