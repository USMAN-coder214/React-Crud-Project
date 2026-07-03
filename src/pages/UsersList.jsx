import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from "primereact/button";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await api.get("/users");
    console.log(res);
    setUsers(res.data);
  };
  useEffect(() => {
    fetchUsers();
  });

  const actionTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"

        className="p-button-sm p-button-warning  mr-2"
        onClick={()=>navigate(`/edit/${rowData.id}`)}
      />
      <Button icon="pi pi-trash" 
      className="p-button-sm p-button-danger"
       />
    </>
   );

  return (
    <div >
      <div className="flex justify-content-end mb-2">
        
        <Button
          label="Add User"
          icon="pi pi-plus"
          size="small"
          onClick={() => navigate("/add")}
        />
      </div>
      <DataTable
        value={users}
        showGridlines
        stripedRows
        paginator
        rows={5}
        size="small"
        filterDisplay="row"
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search "
          sortable
        ></Column>
        <Column
          field="username"
          header="UserName"
          filter
          filterPlaceholder="Search "
          sortable
        ></Column>
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search "
          sortable
        ></Column>
        <Column
          field="age"
          header="Age"
          filter
          filterPlaceholder="Search "
          sortable
        ></Column>
        <Column
          header="Action"
          body={actionTemplate}
          style={{ width: "13%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
