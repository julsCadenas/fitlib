import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import Login from '../pages/login';
import UserModal from './usermodal';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const { userLoggedIn } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'Users');
                const usersSnapshot = await getDocs(usersCollection);
                const userList = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            const user = users.find(user => user.id === selectedUserId);
            setSelectedUser(user);
        } else {
            setSelectedUser(null);
        }
    }, [selectedUserId, users]);

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
    };

    return (
        <>
            { userLoggedIn ? 
                <div className='userscontainer'>
                    <h2>User Admin Panel</h2>
                    <select value={selectedUserId} onChange={(e) => handleUserSelect(e.target.value)}>
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.id}</option>
                        ))}
                    </select>
                    {selectedUser && (
                        <div>
                            <h3>User Details</h3>
                            <p>Name: {selectedUser.name}</p>
                            <p>Student Number: {selectedUser.student_number}</p>
                            <p>Program: {selectedUser.program}</p>
                        </div>
                    )}
                </div>
                :
                <Login />
            }
        </>
    );
};

export default UserAdmin;
