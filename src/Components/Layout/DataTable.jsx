import React, { useState, useEffect } from 'react';
import { addData, updateData, getAllData,getCounts } from '../../api';
import "../../styles/DataTable.css";

const DataTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  });

  const [dataList, setDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [addCount, setAddCount] = useState(0); // State to store add count
  const [updateCount, setUpdateCount] = useState(0); // State to store update count
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        setDataList(data); // Update dataList with fetched data
        // Fetch counts when component mounts
        const counts = await getCounts();
        setAddCount(counts.addCount);
        setUpdateCount(counts.updateCount);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [formData]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        await updateData(formData._id, formData);
        console.log('Data updated successfully');
  
        // Update dataList with the updated data
        const updatedList = [...dataList];
        updatedList[editIndex] = formData;
        setDataList(updatedList);
  
      } else {
        const response = await addData(formData);
        setDataList([...dataList, response]); // Add new data to dataList
        console.log('Data added successfully:', response);
      }
      setFormData({ name: '', age: '' }); // Reset form fields
      setEditIndex(null); // Reset editIndex
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(dataList[index]); // Populate form fields with selected row data
  };

 

  return (
    <div>
      <div>
        <h1 className="title">Add/Edit Data</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-container">
            <label className="label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <button type="submit" className="button">
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
      <div>
        <p>Add Count: {addCount}</p>
        <p>Update Count: {updateCount}</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.age}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
