import {useContext, useEffect, useState} from "react";
import UserContext from "../Users/UserContext.js";
import {FaEdit} from "react-icons/fa";
import {formatDate, formatDateDay} from "../utils/date-utils.js";
import {useCreateBooking, useDeleteBooking, useUpdateBooking} from "./bookingHooks.js";
import BookingForm from "./BookingForm.jsx";
import Booking from "./Booking.jsx";

export default function BookingDetails({week, booking, bookable}) {
    // 현재 picker 선택한 사용자 가져오기
    const {user, setUser} = useContext(UserContext);
    // 현재 picker 선택한 사용자와 예약자가 같은지 판단
    const isBooker = booking && user && (booking.bookerId === parseInt(user.id, 10))

    const [isEditing, setEditing] = useState();
    // useMutation 에서 찾게될 key 값(배열)
    const key = ["bookings", bookable.id, formatDate(week.start), formatDate(week.end)];
    const {createBooking, isCreating} = useCreateBooking(key);
    const {updateBooking, isUpdating} = useUpdateBooking(key);
    const {deleteBooking, isDeleting} = useDeleteBooking(key);

    useEffect(() => {
        setEditing(booking && booking.id === undefined)
    }, [booking])

    // form 에서 저장버튼 클릭에 대한 핸들러
    function handleSave(item) {  // item : form 의 state 값
        setEditing(false)
        if(item.id === undefined) {   // 예약 추가
            createBooking({...item, bookerId:user.id}) // 예약할 사용자 id 추가
        } else {   // 예약 수정
            updateBooking(item)
        }
    }

    function handleDelete(item) {
        if(confirm("예약을 취소하겠습니까?")) {
            setEditing(false)
            deleteBooking(item.id)
        }
    }


    // booking 객체 구조 분해하여 변수 설정, Grid 에서 한 칸을 선택해야 booking 객체가 만들어짐 -> undefined 값은 구조 분해 오류 발생
    // const {title, date, session, notes} = booking
    return (
        <div className="booking-details">
            <h2>예약 상세보기 {isBooker && (<span className="controls">
                <button className="btn" onClick={() => setEditing(v=> !v)}>
                    <FaEdit/>
                </button>
            </span> )}</h2>
            {isCreating || isUpdating || isDeleting ? (
                <div className="booking-details-fields">
                    <p>Saving....</p>
                </div>
            ): isEditing ? (
               <BookingForm booking={booking} bookable={bookable} onSave={handleSave} onDelete={handleDelete} />
            ): booking ? (
               <Booking booking={booking} bookable={bookable}/>
            ):
                (<div className="booking-details-fields">Select a booking or a booking slot</div>)}
        </div>
    )
}