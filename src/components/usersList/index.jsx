import React, { useState, useEffect } from "react";
import styles from "./usersList.module.sass";
function UsersList() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(5);

  useEffect(() => {
    fetch(
      `https://randomuser.me/api/?results=${results}&page=${currentPage}&seed=${"abc"}`
    )
      .then((response) => response.json())
      .then(
        ({ results }) => {
          setIsFetching(true);
          setUsers(results);
        },

        (isError) => {
          setIsFetching(true);
          setIsError(isError);
        }
      );
  }, [currentPage, results]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const addResults = () => {
    setResults(results + 1);
  };

  if (isError) {
    return <div>{isError.message}</div>;
  } else if (!isFetching) {
    return <div>Waiting...</div>;
  } else {
    return (
      <div className={styles.container}>
        <ul>
          {users.map((u) => (
            <li key={u.login} className={styles.user_item}>
              <img src={u.picture.large} alt="user_photo" />
              <span>
                {u.name.first} {u.name.last}
              </span>

              <span>Email: {u.email}</span>
              <span>Login: {u.login.username}</span>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={prevPage}>Prev</button>
          <button onClick={nextPage}>Next</button>
          <button onClick={addResults}>add Results</button>
        </div>
      </div>
    );
  }
}

export default UsersList;
