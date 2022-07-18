import React, { useEffect, useState } from 'react'
import EditUser from './EditUser';
import User from './User';


const UserList = ({user}) => {
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
    
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [responseUser, setResponseUser] = useState(null)
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(USER_API_BASE_URL , {
                    method:"GET",
                    headers: {
                        "Content-Type":"application/json",
                    },
                });
                const users = await response.json();
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();   
    }, [user , responseUser]);


    const deleteUser = async (e, id) => {
        e.preventDefault();
        fetch(USER_API_BASE_URL + "/" + id , {    
            method:"DELETE",
        }).then((res) => {
            if(users){
                setUsers((preElement) => {
                    return preElement.filter((user) => user.id !== id);
                })
            }
        })
    }


    const editUser = async (e, id) => {
        e.preventDefault();
        setUserId(id);
    }
    
    
    return (
        <>
        <div className='container mx-auto py-8 px-9'>
            <div className='flex showdow border-b'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>First Name</th>
                            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Last Name</th>
                            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Email ID</th>
                            <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
                    <tbody className='bg-white'>
                        {users?.map((user) => (
                        <User 
                        user={user} 
                        key={user.id} 
                        deleteUser={deleteUser}
                        editUser={editUser} />
                        ))}
                    </tbody>
                    )}
                </table>
            </div>
        </div>
        <EditUser userId={userId} setResponseUser={setResponseUser}/>
        </>
    )
}

export default UserList