import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../Services/axiosInterceptor';

const UpdateIntern = () => {
  const { id } = useParams();
  const [intern, setIntern] = useState({
    name: '',
    email: '',
    verificationId: '',
    // Add more fields as necessary
  });
  console.log('Intern ID:', id);

  useEffect(() => {
    const fetchInternData = async () => {
      try {
        const response = await axios.get(`/api/auth/interns-registered/${id}`);
        console.log('Intern data:', response);
        setIntern(response.data); // Set intern data to state
        
      } catch (error) {
        console.error('Error fetching intern data:', error);
      }
    };

    if (id) {
      fetchInternData();
    }

  }, []); // Add internId to the dependency array

  const handleUpdateIntern = async () => {
    try {
      const response = await axios.patch(`interns-registered/${id}`, intern);
      console.log('Intern data updated:', response.data);
      alert('Updated successfully')
    } catch (error) {
      console.error('Error updating intern data:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Update Intern Data</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={intern.name}
          onChange={(e) => setIntern({ ...intern, name: e.target.value })}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={intern.email}
          onChange={(e) => setIntern({ ...intern, email: e.target.value })}
        />
      </div>
      <div>
        <label>Verification Id:</label>
        <input
          type="text"
          value={intern.verificationId}
          onChange={(e) => setIntern({ ...intern, verificationId: e.target.value })}
        />
      </div>
      {/* Add more input fields for other data */}
      <button onClick={handleUpdateIntern}>Update</button>
    </div>
  );
};

export default UpdateIntern;
