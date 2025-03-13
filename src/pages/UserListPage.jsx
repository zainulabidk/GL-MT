import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersStart } from "../features/userSlice";
import { DataGrid } from "@mui/x-data-grid";

const UserListPage = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, [dispatch]);

  const columns = [
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        loading={isLoading}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default UserListPage;