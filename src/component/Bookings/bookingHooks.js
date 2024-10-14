import {formatDate} from "../utils/date-utils.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getGrid, transformBookings} from "./grid-builder.js";
import loadData, {createItem, deleteItem, editItem} from "../utils/api.js";
import {useMemo} from "react";

export function useBookings(bookableId, startDate, endDate) {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const urlRoot = "http://localhost:3002/bookings";

    const queryString = `bookableId=${bookableId}` +
        `&date_gte=${start}&date_lte=${end}`;

    const query = useQuery(
        ["bookings", bookableId, start, end],
        () => loadData(`${urlRoot}?${queryString}`)
    );
    console.log("-******-",query.data)
    return {
        bookings: query.data ? transformBookings(query.data) : {},
        ...query
    };
}

export function useGrid (bookable, startDate) {
    return useMemo(
        () => bookable ? getGrid(bookable, startDate) : {},
        [bookable, startDate]
    );
}

// 새로운 예약을 추가하는 함수를 리턴
export function useCreateBooking (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        item => createItem("http://localhost:3002/bookings", item),
        {
            onSuccess: (booking) => {
                queryClient.invalidateQueries(key);   // key 값의 데이터를 무효화(이 데이터는 더이상 최신화 보장을 못함)
                const bookings = queryClient.getQueryData(key) || []; // key에 해당하는 캐시값을 가져오기는 가능
                queryClient.setQueryData(key, [...bookings, booking]); // key 값의 데이터를 변경
            }
        }
    );

    return {
        createBooking: mutation.mutate,
        isCreating: mutation.isLoading
    };
}

export function useUpdateBooking (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        item => editItem(`http://localhost:3002/bookings/${item.id}`, item),
        {
            onSuccess: (booking) => {
                queryClient.invalidateQueries(key);
                const bookings = queryClient.getQueryData(key) || [];
                const bookingIndex = bookings.findIndex(b => b.id === booking.id);
                bookings[bookingIndex] = booking;
                queryClient.setQueryData(key, bookings);
            }
        }
    );

    return {
        updateBooking: mutation.mutate,
        isUpdating: mutation.isLoading
    };
}

export function useDeleteBooking (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        id => deleteItem(`http://localhost:3002/bookings/${id}`),
        {
            onSuccess: (resp, id) => {
                queryClient.invalidateQueries(key);
                const bookings = queryClient.getQueryData(key) || [];
                queryClient.setQueryData(key, bookings.filter(b => b.id !== id))
            }
        }
    );

    return {
        deleteBooking: mutation.mutate,
        isDeleting: mutation.isLoading
    };
}