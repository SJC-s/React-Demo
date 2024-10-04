import BookablesView from "./BookablesView.jsx";

function BookablesPage(){
    return (
        <>
            <h4>예약 가능 현황</h4>
            <main className="bookables-page">
                <BookablesView/>
            </main>
        </>
    )
}

export default BookablesPage;