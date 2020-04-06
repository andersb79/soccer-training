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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VideoControl from "./VideoControl";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ImageCarousel from "./ImageCarousel";

const useStyles = makeStyles((theme) => ({
  card: {
    //maxWidth: 345,
    marginTop: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
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

  function AdminItemStatusAction({ item, store }) {
    const [newComment, setNewComment] = React.useState(
      item.comment ? item.comment : ""
    );
    const updateComment = (event) => {
      setNewComment(event.target.value);
    };

    if (store.loggedIn.userName === "admin" && item.isWaitingForApproval) {
      return (
        <div>
          <TextField
            id="name"
            label="Namn"
            className={classes.textField}
            value={newComment}
            onChange={updateComment}
            margin="normal"
          />
          <StarIcon onClick={() => item.setStatus("DONE", newComment)} />
          <ThumbDownIcon
            onClick={() => item.setStatus("REJECTED", newComment)}
          />
        </div>
      );
    }

    return null;
  }

  function ItemStatusAction({ item, store }) {
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
      onChange={(isVisible) => onChange(item, isVisible)}
    >
      <Card key={item.publicId} className={classes.card}>
        {item.level === 1 && SessionCard(item)}
        {item.level !== 1 && SkillzCard(item)}
      </Card>
    </VisibilitySensor>
  ));

  function SessionCard(item) {
    return (
      <>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <Image
                cloudName="deolievif"
                publicId={item.user.profileImage}
                width="100%"
              />
            </Avatar>
          }
          title={
            <div onClick={() => store.selectProfile(item.user)}>
              {item.user.name}
            </div>
          }
          subheader={item.session.description}
        />
        <CardContent>
          <ImageCarousel list={item.imageList} />
          <Typography
            variant="overline"
            style={{ color: "gray", marginLeft: "10px" }}
          >
            {item.date}
          </Typography>
        </CardContent>
      </>
    );
  }

  function SkillzCard(item) {
    return (
      <>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <Image
                cloudName="deolievif"
                publicId={item.user.profileImage}
                width="100%"
                height="100%"
              />
            </Avatar>
          }
          action={<ItemStatusAction item={item} store={store} />}
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
          <Typography variant="overline" style={{ color: "gray" }}>
            {item.displayText} - <ThumbUpIcon onClick={item.like} />{" "}
            {item.likes} Likes{" "}
          </Typography>
          <AdminItemStatusAction item={item} store={store} />
        </CardActions>
      </>
    );
  }
}

export default observer(ItemListItem);
