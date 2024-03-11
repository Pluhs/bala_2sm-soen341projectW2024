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

