export const fetchUserById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};