import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: "20px",
    borderRadius: "0px",
  },
  media: {
    height: 210,
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
  text: {
    margin: "10px",
  },
}));

function CatergoryCards({ store }) {
  const classes = useStyles();
  return (
    <div className="game">
      {store.attributes.map((attribute, i) => (
        <Card
          key={i}
          className={classes.card}
          onClick={() => store.selectAttribute(attribute)}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={attribute.image}
              title={attribute.text}
            />
            <CardContent>
              <Typography
                className={classes.text}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {attribute.text}
              </Typography>
              <Typography
                className={classes.text}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Du har klarat {store.loggedIn.Count(attribute)} av 10
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default observer(CatergoryCards);
