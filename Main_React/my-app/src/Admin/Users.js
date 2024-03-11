import React, { useState, useEffect } from 'react';
import { fetchAllUsers, deleteUser } from '../LogInForm/UserInfo';
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true);
            const fetchedUsers = await fetchAllUsers();
            setUsers(fetchedUsers);
            setIsLoading(false);
        };
        loadUsers();
    }, []);

    const handleDeleteUser = async (email) => {
        const isSuccess = await deleteUser(email);
        if (isSuccess) {
            setUsers(users.filter(user => user.email !== email));
        } else {
            alert("Failed to delete the user.");
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="usersContainer">
            <h1>ALL REGISTERED USERS:</h1>
            {users.length > 0 ? (
                <div>
                    {users.map(user => (
                        <div key={user.id} className="usersInfoContainers">
                            <div className="leftContentUsers">
                                <b className="carInfoTxt">{user.name}</b>
                            </div>
                            <div className="rightContentUsers">
                                <b className="startDateTxt">Email: {user.email}</b>
                            </div>
                            <div className="buttonsContainerUsers">
                                <button type="button" className="viewUserBtn">View User</button>
                                <button type="button" className="deleteUserBtn" onClick={() => handleDeleteUser(user.email)}>Delete User</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default Users;
