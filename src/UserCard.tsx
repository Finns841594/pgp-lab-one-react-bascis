import { useEffect, useState } from "react";
import { userInfo } from "./types";

// fetch data from API
const fetchUser = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data.results[0];
};

export const UserCard = () => {
  const [user, setUser] = useState<userInfo | null>(null);
  const [changeName, setChangeName] = useState<boolean>(false);

  const clickHandler = () => {
    if (changeName) {
      const firstname = document.querySelector('input[id="firstname"]') as HTMLInputElement;
      const lastname = document.querySelector('input[id="lastname"]') as HTMLInputElement;
      if (firstname && lastname) {
      setUser({
        ...user!,
        name: {
          ...user!.name,
          first: firstname.value,
          last: lastname.value,
        }
      });
      }
    }
    setChangeName(!changeName);
  };

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="usercard">
          <img src={user.picture.large} alt="user profile" />
          <h3>Address: {user.location.city} {user.location.street.name} {user.location.street.number}, {user.location.state}, {user.location.country}</h3>
          { changeName ? (
              <div className="usercard_name_edit_area">
                <h3>Name: </h3>
                <input type="text" id='firstname' defaultValue={user.name.first}></input>
                <input type="text" id='lastname' defaultValue={user.name.last}></input>
                <input type="button" value="Confirm" onClick={clickHandler}></input>
              </div>
            ) : (
              <h3 onClick={clickHandler}>Name: {user.name.first} {user.name.last}</h3>
            ) }
          <h3>Age: {user.dob.age}</h3>
          </div>
      </>
    );
  }
};