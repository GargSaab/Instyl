import React, { useEffect, useState } from "react";

const getUID = (props) => {
  const [uid, setUID] = useState("");
  const UID = async () => {
    const UID = await AsyncStorage.getItem("UID");
    return UID;
  };
  useEffect(() => {
    UID().then((res) => setUID(res));
  }, []);

  return uid;
};

export default getUID;
