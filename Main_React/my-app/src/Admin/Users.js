import React, {useState, useEffect} from 'react';
import {fetchAllUsers, deleteUser, createUser, updateUser} from '../LogInForm/UserInfo';
import {useNavigate} from 'react-router-dom';
import "./Users.css";


function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUser, setNewUser] = useState({name: '', email: '', password: ''});
    let navigate = useNavigate();
    const [editingUser, setEditingUser] = useState(null);
    const [iconRotation, setIconRotation] = useState(0);


    const handleViewUser = (id) => {
        navigate('/viewUser', {state: {id: id}});
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
            setNewUser({name: '', email: '', password: ''});
            await loadUsers();
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
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        await updateUser(editingUser.id, editingUser);
        await loadUsers();
        setEditingUser(null);
    };

    const toggleNewUsers = () => {
        setShowCreateForm(!showCreateForm);
        setIconRotation(iconRotation === 0 ? -135 : 0);
    }


    if (isLoading) return <div className="centered-container">Loading...</div>;

    return (
        <div className="usersContainer">
            <h1>ALL REGISTERED USERS: <i className="fa fa-plus" onClick={toggleNewUsers} style={{
                transform: `rotate(${iconRotation}deg)`,
                transition: 'transform 0.65s ease'
            }}></i></h1>
            {showCreateForm && (
                <form onSubmit={handleSubmitNewUser} className="createUserForm">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    />
                    <button type="submit">Create User</button>
                </form>
            )}
            {editingUser && (
                <form onSubmit={handleSaveEdit} className="createUserForm">
                    <div className="static-info-container">
                        <label>Old Username: {editingUser.name}</label>
                    </div>
                    <div className="static-info-container"><label>Email: {editingUser.email}</label></div>
                    <div className="input-icon-container">
                        <i className="fa-solid fa-user input-icon"></i>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        />
                    </div>
                    <div className="form-buttons-container">
                        <button type="submit" className="viewUserBtn">Save Changes</button>
                        <button type="button" onClick={() => setEditingUser(null)} className="cancelBtn">Cancel</button>
                    </div>
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
                                <i className="fas fa-edit" onClick={() => setEditingUser(user)}></i>
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
