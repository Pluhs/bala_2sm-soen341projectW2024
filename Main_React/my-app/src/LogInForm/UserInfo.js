export const fetchAllUsers = async () => {
    try {
        const response = await fetch(`http://localhost:8080/users`);
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const fetchUserById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

export const fetchUserReservationById = async (userId,reservationId) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/reservations/${reservationId}`);
        if (!response.ok) {
            throw new Error('Reservation not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Reservation:', error);
        return null;
    }
};
export const createUser = async (userData) => {
    try {
        const response = await fetch(`http://localhost:8080/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Error creating user');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Error updating user');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};

export const deleteUser = async (email) => {
    try {
        const queryParams = new URLSearchParams({email}).toString();
        const response = await fetch(`http://localhost:8080/users/delete-by-email?${queryParams}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Failed to delete user with response status:', response.status);
            throw new Error('Error deleting user');
        }
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
};

