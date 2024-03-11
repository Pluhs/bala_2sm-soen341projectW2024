import React, { useState, useEffect } from 'react';
import { fetchAllUsers, deleteUser,createUser } from '../LogInForm/UserInfo';
import { useNavigate } from 'react-router-dom';
import "./Users.css";
import alert from "bootstrap/js/src/alert";


function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    let navigate = useNavigate();

    const handleViewUser = (id) => {
        navigate('/viewUser', { state: { id: id } });
    };

    const loadUsers = async () => {
        setIsLoading(true);
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSubmitNewUser = async (e) => {
        e.preventDefault();
        const isSuccess = await createUser(newUser);
        if (isSuccess) {
            setShowCreateForm(false);
            setNewUser({ name: '', email: '', password: '' }); // Reset form fields
            await loadUsers(); // Refresh the users list
        } else {
            alert("Failed to create the user.");
        }
    };

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
            <h1>ALL REGISTERED USERS: <i className="fa fa-plus" onClick={() => setShowCreateForm(!showCreateForm)}></i></h1>
            {showCreateForm && (
                <form onSubmit={handleSubmitNewUser} className="createUserForm">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <button type="submit">Create User</button>
                </form>
            )}
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
                                <button type="button" className="viewUserBtn"
                                        onClick={() => handleViewUser(user.id)}>View User
                                </button>

                                <button type="button" className="deleteUserBtn"
                                        onClick={() => handleDeleteUser(user.email)}>Delete User
                                </button>
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
