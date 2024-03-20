import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBranchById } from './BranchInfo'; // Ensure this function is correctly implemented

function BranchDetails() {
    let { id } = useParams();
    const [branch, setBranch] = useState(null);

    useEffect(() => {
        const fetchBranch = async () => {
            const fetchedBranch = await fetchBranchById(id);
            setBranch(fetchedBranch);
        };
        fetchBranch();
    }, [id]);

    if (!branch) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{branch.name}</h2>
            <p>Address: {branch.address}</p>
            {/* Display other branch details here */}
        </div>
    );
}

export default BranchDetails;
