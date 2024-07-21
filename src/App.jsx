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
    return currentItems.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <p>{item.id}</p>
          </td>
          <td>
            <p>{item.name}</p>
          </td>
          <td>
            <p>{item.email}</p>
          </td>
          <td>
            <p>{item.role}</p>
          </td>
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
      <div className="buttons">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <div className="button-center">{currentPage}</div>
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
