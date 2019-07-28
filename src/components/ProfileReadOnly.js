import React from "react";
import { observer } from "mobx-react";
import { Image } from "cloudinary-react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import VideoList from "./VideoList";
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

function ProfileReadOnly({ store }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: store.selectedProfile.id,
    name: store.selectedProfile.name,
    userName: store.selectedProfile.userName,
    password: store.selectedProfile.password,
    profileImage: store.selectedProfile.profileImage,
    favoriteTeam: store.selectedProfile.favoriteTeam,
    playerTeam: store.selectedProfile.playerTeam,
    position: store.selectedProfile.position,
    shirtNumber: store.selectedProfile.shirtNumber
  });

  return (
    <div className="profileReadOnly">
      <div>
        <div className="left">
          <ArrowBackIosIcon onClick={() => store.selectProfile()} />
        </div>
        <div className="right">{store.selectedProfile.name}</div>
      </div>

      <form className={classes.container} noValidate autoComplete="off">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267.3 427.3">
      <clipPath id="svgPath">
        <path
          fill="#000"
          d="M265.3 53.9a33.3 33.3 0 0 1-17.8-5.5 32 32 0 0 1-13.7-22.9c-.2-1.1-.4-2.3-.4-3.4 0-1.3-1-1.5-1.8-1.9a163 163 0 0 0-31-11.6A257.3 257.3 0 0 0 133.7 0a254.9 254.9 0 0 0-67.1 8.7 170 170 0 0 0-31 11.6c-.8.4-1.8.6-1.8 1.9 0 1.1-.2 2.3-.4 3.4a32.4 32.4 0 0 1-13.7 22.9A33.8 33.8 0 0 1 2 53.9c-1.5.1-2.1.4-2 2v293.9c0 3.3 0 6.6.4 9.9a22 22 0 0 0 7.9 14.4c3.8 3.2 8.3 5.3 13 6.8 12.4 3.9 24.8 7.5 37.2 11.5a388.7 388.7 0 0 1 50 19.4 88.7 88.7 0 0 1 25 15.5v.1-.1c7.2-7 16.1-11.3 25-15.5a427 427 0 0 1 50-19.4l37.2-11.5c4.7-1.5 9.1-3.5 13-6.8 4.5-3.8 7.2-8.5 7.9-14.4.4-3.3.4-6.6.4-9.9V231.6 60.5v-4.6c.4-1.6-.3-1.9-1.7-2z"
        />
      </clipPath>
    </svg>
      <Card user={store.selectedProfile} />
        <Image
          cloudName="deolievif"
          publicId={store.selectedProfile.profileImage}
          width="100%"
          height="100%"
        />
        <TextField
          disabled
          id="standard-name"
          label="Namn"
          className={classes.textField}
          value={values.name}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Favoritlag"
          className={classes.textField}
          value={values.favoriteTeam}
          disabled
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Lag"
          className={classes.textField}
          value={values.playerTeam}
          disabled
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Position"
          className={classes.textField}
          value={values.position}
          disabled
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Tröjnummer"
          className={classes.textField}
          value={values.shirtNumber}
          disabled
          margin="normal"
        />
        {/* <VideoList store={store} user={store.selectedProfile} /> */}
      </form>
    </div>
  );
}

export default observer(ProfileReadOnly);
