//怎麼叫出 redux 資料的示範

import { useSelector, useDispatch } from "react-redux";
import { userSelectData, changeUserInfo } from "../slice/userSlice";
import { useState } from "react";

function Sample() {
  const data = useSelector(userSelectData);
  const userDispatch = useDispatch();
  const [name, setName] = useState("");

  const handler = (e) => {
    setName(e.target.value);
    const temp = {
      ...data,
      [e.target.name]: e.target.value,
    };
    userDispatch(changeUserInfo(temp));
  };

  return (
    <>
      <p>Sample</p>
      <input type="text" name="userName" onChange={handler} value={name} />
      {JSON.stringify(data)}
    </>
  );
}

export default Sample;
