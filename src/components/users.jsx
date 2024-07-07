import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import Login from '../pages/login';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
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

    return (
        <>
        { userLoggedIn ? 
            <>
                <div className='admincontainer'>
                    <div className='bookstablecontainer'>
                        <div className='elibraryadmin'>
                            <p><strong>Users</strong></p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Student Number</th>
                                        <th>Program</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.student_number}</td>
                                        <td>{user.program}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
            </>
            :
            <Login />
        }
        </>
    );
}

export default UserAdmin;
