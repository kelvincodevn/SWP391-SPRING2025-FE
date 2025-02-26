import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import { format } from 'date-fns';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [editProfileData, setEditProfileData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProfileData(response.data);
                setEditProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleEditChange = (e) => {
        setEditProfileData({
            ...editProfileData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleEditSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await api.put('/user/profile', editProfileData, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });
    //         setProfileData(editProfileData);
    //         setIsEditing(false);
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const { createdDate, ...updatedProfileData } = editProfileData;
            if (updatedProfileData.dob) {
                updatedProfileData.dob = format(new Date(updatedProfileData.dob), "yyyy-MM-dd'T'00:00:00");
            }
    
            await api.put('/user/profile', updatedProfileData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setProfileData(editProfileData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profileData) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Profile Settings</h2>
                    {isEditing ? (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={editProfileData.fullName}
                                    onChange={handleEditChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editProfileData.email}
                                    onChange={handleEditChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={editProfileData.dob || ''}
                                    onChange={handleEditChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={editProfileData.phone || ''}
                                    onChange={handleEditChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={editProfileData.gender || ''}
                                    onChange={handleEditChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <p><strong>Full Name:</strong> {profileData.fullName}</p>
                            <p><strong>Email:</strong> {profileData.email}</p>
                            <p><strong>Date of Birth:</strong> {profileData.dob || 'Not specified'}</p>
                            <p><strong>Phone:</strong> {profileData.phone || 'Not specified'}</p>
                            <p><strong>Gender:</strong> {profileData.gender || 'Not specified'}</p>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Edit Profile</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;