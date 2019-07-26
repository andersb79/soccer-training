import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Login({ store, onLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", {
    userName: undefined
  });

  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  function onClick(e) {
    e.preventDefault();
    if (store.login(userName.toLowerCase(), password)) {
      //setUserName(e.target.value);
      setLoggedIn(store.loggedIn.id);
      onLogin();
    } else {
      alert("fel användarnamn/lösenord");
    }
  }

  return (
    <div className="login">
      <img className="login-img" src="skillsta.jpg" alt="skillsta" />
      {/* <video
        id="intro"
        autoPlay
        loop
        playsInline
        preload="none"
        muted
        width="100%"
        height="100%"
        poster="https://www.dropbox.com/s/xwpgpl1pz0xv42k/intro.jpg?raw=1"
      >
        <source
          src="https://www.dropbox.com/s/j6ev3gevrqj78wx/intro.mp4?raw=1"
          type="video/mp4"
        />
      </video> */}
      <div className="login-img-wrapper">
        <Typography paragraph variant="h3">
          skillsta
        </Typography>
        <div className="login-user-name">
          <input
            placeholder="Användarnamn"
            className="login-input"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div className="login-password">
          <input
            placeholder="Lösenord"
            className="login-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={e => onClick(e)}>
          LOGIN
        </Button>
      </div>
    </div>
  );
}
