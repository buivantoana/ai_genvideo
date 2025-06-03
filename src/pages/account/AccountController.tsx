import React, { useEffect, useState } from "react";
import AccountView from "./AccountView";
import Loading from "../../components/Loading";
import { gatAllUsers } from "../../service/auth";

type Props = {};

const AccountController = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    setLoading(true);
    try {
      let result = await gatAllUsers();
      if (result && result.length > 0) {
        setUsers(result);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <AccountView
        setLoading={setLoading}
        getAllUser={getAllUser}
        users={users}
      />
    </>
  );
};

export default AccountController;
