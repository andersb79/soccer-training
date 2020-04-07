import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VideoIcon from "@material-ui/icons/VideoCall";
import VisibilitySensor from "react-visibility-sensor";
import VideoControl from "./VideoControl";
import { observer } from "mobx-react-lite";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowLeftIcon from "@material-ui/icons/ChevronLeft";
import CircularProgress from "@material-ui/core/CircularProgress";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
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
  avatar: {},
}));

function CategoryCard({ store }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      store.levels
        .filter((x) => x.isVisible)
        .map((level) => {
          onChange(level, true);
        });
    }, 1);
  });

  function processFile(e, level) {
    var file = e.target.files[0];
    setLoading(true);
    store.processFile(file, level, (text) => {
      store.selectAttribute();
      setLoading(false);
    });
  }

  function onChange(level, isVisible) {
    level.setVisibility(isVisible);
    const videoElm = document.getElementById(level.id);
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorChipEl, setAnchorChipEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(option) {
    if (option.id || option.id === 0) {
      store.setLevelFilter(option);
    }
    setAnchorEl(null);
  }

  function handleChipClick(event, object) {
    setAnchorChipEl(event.currentTarget);
  }

  function handleChipClose(option) {
    if (option.season || option.season === 0) {
      store.switchSeason(option);
    }
    setAnchorChipEl(null);
  }

  function goFullScreen(level) {
    document.getElementById(level.id).webkitEnterFullscreen();
  }

  function getAvatarColor(level) {
    if (level.category === "MEDIUM") {
      return { backgroundColor: "orange" };
    }

    if (level.category === "HARD") {
      return { backgroundColor: "red" };
    }

    return { backgroundColor: "black" };
  }

  return (
    <div className="game">
      <div onClick={() => store.selectAttribute()}>
        <ArrowLeftIcon />
        {store.selectedAttribute.text}
      </div>
      {store.filterLevelsByAttribute.map((level, i) => (
        <VisibilitySensor
          key={level.id}
          onChange={(isVisible) => onChange(level, isVisible)}
        >
          <Card key={level.level} className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Recipe"
                  style={getAvatarColor(level)}
                  className={classes.avatar}
                >
                  <span style={{ fontSize: "16px" }}>
                    {level.attributeText}
                  </span>
                </Avatar>
              }
              title={level.name}
              subheader={level.displayText}
            />

            <CardContent>
              <VideoControl store={store} settings={level} />
              <div className="card-content">
                <Typography variant="body2" color="textSecondary" component="p">
                  {level.details}
                </Typography>
              </div>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {level.isActiveSeason && (
                <CardContent>
                  <div className="card-content2">
                    <div className="fileinputs">
                      <input
                        type="file"
                        className="file"
                        onChange={(e) => processFile(e, level)}
                      />
                      <div className="fakefile">
                        <Button variant="outlined">
                          Ladda upp <VideoIcon />
                        </Button>
                        {loading && <CircularProgress />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Collapse>
          </Card>
        </VisibilitySensor>
      ))}
      <Card
        key="locked"
        style={{ marginBottom: "20px" }}
        className={classes.card}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <span style={{ fontSize: "16px" }}>
                {store.selectedAttribute.short}
              </span>
            </Avatar>
          }
          title="Låst"
          subheader=""
        />

        <CardActionArea>
          <CardMedia
            style={{ opacity: 0.5 }}
            className={classes.media}
            image="locked.jpg"
          />
          <CardContent>
            <div className="card-content">
              <Typography variant="body2" color="textSecondary" component="p">
                Klara av mer övningar för att låsa upp fler.
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default observer(CategoryCard);
