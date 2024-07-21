import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = () => {
    return currentItems.map((item, idx) => {
      return (
        <tr key={idx}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
        </tr>
      );
    });
  };

  const pageNumbers = Math.ceil(employees.length / itemsPerPage);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await res.json();
      // console.log(data);
      setEmployees(data);
    } catch (error) {
      console.error(error);
      alert("failed to fetch data");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="app-container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button className="button-center">{currentPage}</button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageNumbers))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
