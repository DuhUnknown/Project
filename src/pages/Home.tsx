import React, { useEffect, useState } from "react";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  // check if the user is logged in
  // you can replace this with your own logic
  const checkLogin = () => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  };

  // call the checkLogin function on mount
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {loggedIn && <p>Welcome back!</p>}
    </div>
  );
}

export default Home;
