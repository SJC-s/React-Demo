import BookList from "./BookList.jsx";

function BookablePage(){
    return (
        <>
            <h4>예약 가능 현황</h4>
            <main className="bookables-page">
                <BookList/>
            </main>
        </>
    )
}

export default BookablePage;