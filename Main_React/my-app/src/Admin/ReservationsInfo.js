export const fetchReservationsForUserById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}/reservations`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching reservations by email:', error);
        return [];
    }
};

export const deleteReservationById = async (userId, reservationId) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error canceling reservation');
        }
        return true;
    } catch (error) {
        console.error('Error canceling reservation:', error);
        return false;
    }
};