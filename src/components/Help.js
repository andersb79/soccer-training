import React from "react";
import { observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import VideoIcon from "@material-ui/icons/VideoCall";
import PersonIcon from "@material-ui/icons/Person";
import TabletIcon from "@material-ui/icons/Tablet";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function Help({ store }) {
  function update() {
    document.location.reload();
  }

  function startColor(count) {
    store.setColorCount(count);
    store.setRunningApp("COLOR");
  }

  return (
    <Paper className="help">
      <Typography paragraph>
        Här hittar du hjälp med hur appen fungerar.
      </Typography>
      <Typography paragraph>
        Du kollar just nu på{" "}
        <span style={{ color: "red" }}>
          {store.viewSeasonObject.friendlyName}
        </span>
      </Typography>
      <Typography paragraph>Visa annan säsong:</Typography>

      <ButtonGroup color="primary" aria-label="Outlined primary button group">
        {store.seasonsWithoutView.map(season => (
          <Button
            key={season.season}
            onClick={() => store.switchSeason(season)}
          >
            {season.friendlyName}
          </Button>
        ))}
      </ButtonGroup>
      <Typography paragraph />
      <Typography paragraph>
        Varje säsong har 16 utmaningar. Man väljer vilken utmaning som helst,
        man behöver inte göra dem i ordning. Utmaning filmar man sen i
        horisontellt läge med kameran. När man är nöjd så klickar man på ladda
        upp på den utmaningen man gjort. Filmen hamnar då för utvärdering, den
        är då bara synlig för dig. Om den blir godkänd så kommer den synas för
        övriga deltagare.
      </Typography>

      <Typography paragraph>
        Tänk på att ni kan filma er själva genom att sätta upp kameran
        någonstanns , sen sätter ni igång med utmaningen. När ni är klara
        stänger ni av videon och klipper början och slutet som ni inte vill ha
        med. Det kan ni enkelt göra i bilderappen. Sen går ni in och laddar upp
        den på rätt utmaning. På så sätt behöver ni inte hjälp med att någon
        filmar er.
      </Typography>

      <Typography paragraph>
        Utmaningarna är i fyra kategorier.
      </Typography>

      <Typography paragraph>
        BAL = BALL MASTERY. Här gäller det att kunna klara av att hantera bollen på ett smidigt sätt.
      </Typography>

      <Typography paragraph>
        THE - THECNICAL. Här är det mycket kickningar och trix.
      </Typography>

      <Typography paragraph>
        DRI - DRIBBLE. Här gäller det att få till olika finter och driva bollen
      </Typography>

      <Typography paragraph>
        PSY - PHYSICAL. Här handlar det om att bli starkare, men även en del skottövningar som kräver styrka och teknik.
      </Typography>

      <Typography variant="h6" paragraph>
        <HomeIcon /> Hem
      </Typography>

      <div style={{ margin: "10px" }}>
        <Typography paragraph>
          Här visas flödet med alla säsongens användaruppladde filmer.
        </Typography>
        <Typography paragraph>
          <AccountCircleIcon />
          Under utvärdering för att se om man klarat det.
        </Typography>
        <Typography paragraph>
          <StarIcon />
          Klarad utmaning
        </Typography>
        <Typography paragraph>
          <ThumbDownIcon />
          Utmaning misslyckad. Bara att försöka igen. Kanske hade du inte flytet
          i utmaningen, eller missförtått något. Kontrollera videon och
          instruktionerna och försök igen.
        </Typography>
        <Typography paragraph>
          Om du klickar på personens namn så kan du se profilen.
        </Typography>
        <Typography paragraph>
          Klicka på videon för att se den i helskärm.
        </Typography>
      </div>

      <Typography variant="h6" paragraph>
        <StarIcon /> Utmaningar
      </Typography>

      <div style={{ margin: "10px" }}>
        <Typography paragraph>
          Här visas flödet med alla säsongens utmaningar. Det finns 3 olika
          nivåer. Lätt, medium, svår.
        </Typography>
        
        <Typography paragraph>
          <VideoIcon />
          Klicka på denna för att ladda upp en film. Filma alltid i horisontellt
          läge.
        </Typography>
      </div>

      <Typography variant="h6" paragraph>
        <StarIcon /> Topplistan
      </Typography>

      <div style={{ margin: "10px" }}>
        <Typography paragraph>
          Varje säsong består av maximalt 200 poäng. Här visas vem som fått
          flest poäng.
        </Typography>
      </div>

      <Typography variant="h6" paragraph>
        <PersonIcon /> Profil
      </Typography>

      <div style={{ margin: "10px" }}>
        <Typography paragraph>
          Här kan du ladda upp din profilbild och andra användarinställningar.
        </Typography>
      </div>

      <Typography variant="h6" paragraph>
        <TabletIcon /> Verktyg
      </Typography>

      {/* <Button variant="outlined" onClick={() => store.setRunningApp("NUMBER")}>
        Nummer
      </Button>

      <Button variant="outlined" onClick={() => startColor(2)}>
        Color 2 färger
      </Button>

      <Button variant="outlined" onClick={() => startColor(4)}>
        Color 4 färger
      </Button> */}

      <Typography paragraph>
        Om det finns nya uppdateringar kan du uppdatera här.
      </Typography>

      <Button variant="outlined" onClick={update}>
        Uppdatera appen
      </Button>
    </Paper>
  );
}

export default observer(Help);
