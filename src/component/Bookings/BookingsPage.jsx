import WeekPicker from "./WeekPicker.jsx";

function BookingsPage() {
    return (
        <main className="bookings-page">
            {/*
            <WeekPicker date="" day="" month=""/>
            WeekPicker 에서 받을 값이 3개 -> 함수에서 props 변수로 받거나 또는 오브젝트 분해하여 {date, day, month}
            */}
            {/* WeekPicker 에게 초기값으로 date 속성을 전달 */}
            <WeekPicker date={new Date()}/>
        </main>
    )
}

export default BookingsPage;