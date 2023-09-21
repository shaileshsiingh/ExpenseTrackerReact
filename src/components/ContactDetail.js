import React, { useState } from 'react';
import axios from 'axios'

const ContactDetail = () => {
  const [fullName, setFullName] = useState('')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')

  const handleUpdate = () => {
    const apiKey = 'AIzaSyAJZVlkJOe9LtVdhe7_OVHR62Ml-5IlnRo'
  
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`
  
    const requestData = {
      displayName: fullName,
      photoUrl: profilePhotoUrl,
      returnSecureToken: true,
    };
  
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log('User details updated successfully:', response.data)
      })
      .catch((error) => {
        console.error('Error updating user details:', error)
      });
  };
  

  return (
    <>
      <div>
        <div>Contact Details</div>
        <button>Cancel</button>
      </div>
      <div>
        <div>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          Profile Photo URL:
          <input type="text" value={profilePhotoUrl} onChange={(e) => setProfilePhotoUrl(e.target.value)} />
        </div>
      </div>
      <button type="submit" onClick={handleUpdate}>
        Update
      </button>
    </>
  );
};

export default ContactDetail;
