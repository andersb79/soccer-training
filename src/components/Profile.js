import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "./Card";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

function Profile({ store, onLogout }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: store.loggedIn.id,
    name: store.loggedIn.name,
    userName: store.loggedIn.userName,
    password: store.loggedIn.password,
    profileImage: store.loggedIn.profileImage,
    favoriteTeam: store.loggedIn.favoriteTeam,
    playerTeam: store.loggedIn.playerTeam,
    position: store.loggedIn.position,
    shirtNumber: store.loggedIn.shirtNumber
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function processFile(e, level) {
    var file = e.target.files[0];

    store.uploadImage(file, text => {});
  }

  function logout() {
    window.localStorage.removeItem("loggedIn");
    onLogout();
  }

  function save() {
    store.updateUser(values);
  }

  return (
    <div className="profile">
      <div className="fileinputs">
        <input type="file" className="file" onChange={e => processFile(e)} />
        <div className="fakefile">
          <Button variant="outlined">
            <ImageIcon />
          </Button>
        </div>
      </div>
      <br />
      
      <form className={classes.container} noValidate autoComplete="off">
        <Image
          cloudName="deolievif"
          publicId={store.loggedIn.profileImage}
          width="100%"
          height="100%"
        />
        <div>
        <Card user={store.loggedIn} />
        </div>
        <TextField
          id="name"
          label="Namn"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          id="password"
          type="password"
          label="Lösenord"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <TextField
          id="favoriteTeam"
          label="Favoritlag"
          className={classes.textField}
          value={values.favoriteTeam}
          onChange={handleChange("favoriteTeam")}
          margin="normal"
        />
        <TextField
          id="playerTeam"
          label="Lag"
          className={classes.textField}
          value={values.playerTeam}
          onChange={handleChange("playerTeam")}
          margin="normal"
        />
        <TextField
          id="position"
          label="Position"
          className={classes.textField}
          value={values.position}
          onChange={handleChange("position")}
          margin="normal"
        />
        <TextField
          id="shirtNumber"
          label="Tröjnummer"
          className={classes.textField}
          value={values.shirtNumber}
          onChange={handleChange("shirtNumber")}
          margin="normal"
        />
      </form>
      <Button variant="outlined" onClick={save}>
        Spara
      </Button>
      <Button variant="outlined" onClick={logout}>
        Logga ut
      </Button>
      {/* <Button variant="outlined" onClick={update}>
           Uppdatera appen
      </Button> */}
    </div>
  );
}

export default observer(Profile);
