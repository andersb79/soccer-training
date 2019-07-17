import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Image, Video } from "cloudinary-react";
import VisibilitySensor from "react-visibility-sensor";
import StarIcon from "@material-ui/icons/Star";
import PullToRefresh from "pulltorefreshjs";
import ReactDOMServer from "react-dom/server";

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
  if (isVisible) {
    document.getElementById(item.publicId).play();
  } else {
    document.getElementById(item.publicId).pause();
  }
}

function onChangeRefresh(store, isVisible) {
  if(isVisible) {
    store.refresh();
  }
}

function handleRefresh(store) {
  // do some async code here
  const success = store.refresh();
}

function ItemList({ store }) {
  const classes = useStyles();

  useEffect(() => {
    // PullToRefresh.init({
    //   mainElement: ".item-list",
    //   onRefresh() {
    //     handleRefresh(store);
    //   },
    //   iconArrow: ReactDOMServer.renderToString(<StarIcon />),
    //   iconRefreshing: ReactDOMServer.renderToString(<StarIcon />)
    // });
  }, []);

  return (
    <div className="item-container">
      <div className="item-list">
        <VisibilitySensor offset={{top:80}} onChange={isVisible => onChangeRefresh(store, isVisible)}>
          <div className="refresh-div">dra för att ladda</div>
        </VisibilitySensor>
        {store.items.map((item, i) => (
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
                action={item.isDone && <StarIcon />}
                title={item.user.name}
                subheader={item.game.name}
              />
              <CardContent>
                <Video
                  id={item.publicId}
                  cloudName="deolievif"
                  publicId={item.publicId}
                  width="100%"
                  height="100%"
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster={item.poster}
                />
              </CardContent>
            </Card>
          </VisibilitySensor>
        ))}
      </div>
    </div>
  );
}

export default observer(ItemList);