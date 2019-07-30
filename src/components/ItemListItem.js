import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Image } from "cloudinary-react";
import VisibilitySensor from "react-visibility-sensor";
import StarIcon from "@material-ui/icons/Star";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VideoControl from "./VideoControl";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 345,
    marginTop: "10px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function onChange(item, isVisible) {
  item.setVisibility(isVisible);
  const videoElm = document.getElementById(item.id);
  if (videoElm) {
    if (isVisible) {
      videoElm.play();
    } else {
      videoElm.pause();
    }
  } else {
    console.log("not found");
  }
}

function ItemListItem({ store }) {
  const classes = useStyles();

  function ItemStatusAction({ item }) {
    if (item.isDone) {
      const style = { color: "green" };
      if (item.game.category === "MEDIUM") {
        style.color = "orange";
      }
      if (item.game.category === "HARD") {
        style.color = "red";
      }

      return <StarIcon style={style} />;
    }
    if (item.isRejected) {
      return <ThumbDownIcon />;
    }

    return <AccountCircleIcon />;
  }

  if (store.filteredItems.length === 0) {
    return (
      <div className="banner">
        <div className="banner-text">
          <span>Du kan fortfarande bli först. Välj en utmaning</span>
        </div>
      </div>
    );
  }

  return store.filteredItems.map((item, i) => (
    <VisibilitySensor
      key={item.publicId}
      onChange={isVisible => onChange(item, isVisible)}
    >
      <Card key={item.publicId} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <Image
                cloudName="deolievif"
                publicId={item.user.profileImage}
                width="100%"
                height="100%"
              />
            </Avatar>
          }
          action={<ItemStatusAction item={item} />}
          title={
            <div onClick={() => store.selectProfile(item.user)}>
              {item.user.name}
            </div>
          }
          subheader={`${item.game.attributeText} - ${item.game.name}`}
        />
        <CardContent>
          {item.fileType === "video" && (
            <VideoControl store={store} settings={item} />
          )}
          {item.fileType === "image" && (
            <Image
              cloudName="deolievif"
              publicId={item.publicId}
              width="100%"
              height="100%"
            />
          )}

          {item.hasComment && (
            <div className="comments">
              <Typography
                variant="overline"
                style={{ color: "gray", fontSize: "10px" }}
              >
                Från tränaren:
              </Typography>
              <Typography variant="subtitle2">{item.comment}</Typography>
            </div>
          )}
        </CardContent>

        <CardActions>
          <Typography
            onClick={() => store.refresh()}
            variant="overline"
            style={{ color: "gray" }}
          >
            {item.displayText}
          </Typography>
        </CardActions>
      </Card>
    </VisibilitySensor>
  ));
}

export default observer(ItemListItem);
