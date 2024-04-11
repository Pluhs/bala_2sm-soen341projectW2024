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


export const fetchReservationById = async (userId, reservationId) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching reservations by email:', error);
        return [];
    }
};
export const fetchReservationsForUserByReservationId = async (userId, reservationId) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservation');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching reservation:', error);
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
export const updateReservationById = async (userId, reservationId, updatedReservationData) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReservationData),
        });
        if (!response.ok) {
            throw new Error('Error updating reservation');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating reservation:', error);
        return null;
    }
};
export const createReservation = async (userId, reservationData) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });
        if (!response.ok) {
            throw new Error('Failed to create reservation');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating reservation:', error);
        return null;
    }
};
export const fetchCars = async () => {
    try {
        const response = await fetch('http://localhost:8080/cars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
};

