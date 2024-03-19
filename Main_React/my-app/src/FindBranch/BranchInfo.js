export const fetchAllBranches = async () => {
    try {
        const response = await fetch(`http://localhost:8080/branches`);
        if (!response.ok) {
            throw new Error('Error fetching branches');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching branches:', error);
        return [];
    }
};

export const fetchBranchById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/branches/${id}`);
        if (!response.ok) {
            throw new Error('Branch not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching branch:', error);
        return null;
    }
};