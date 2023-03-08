import { useGetRandomQuery } from "./services/main";
import Stat from "./components/Stat";
import "./App.css";
import { Container, Paper, Grid } from "@mui/material";
import GridLayout from "react-grid-layout";

function App() {
  const { data, error, isLoading } = useGetRandomQuery("number", {
    pollingInterval: 500,
  });

  // SET IT UP WITH THREE STAT COMPONENTS AND PLAY AROUND WITH BASIC SETTINGS -- add bounding box, add grab bars to resize - CAN YOU USE MUI BASED COMPONENTS INSTEAD OF DIVS?

  // ADD BUTTON THAT CREATES A NEW STAT COMPONENT IN THE GRID
  // LOOK AT THE DRAG FROM OUTSIDE EXAMPLE AND SEE IF YOU CAN PARLAY THE COORDINATES ON RELEASE INTO GENERATING A NEW COMPONENT AT THOSE COORDINATES
  const layout = [
    { i: "stat", x: 0, y: 0, w: 3, h: 2, },
    { i: "statlist", x: 0, y: 2, w: 3, h: 4, },
    { i: "piechart", x: 0, y: 6, w: 3, h: 3, },
    { i: "paper", x: 3, y: 6, w: 3, h: 3, },

  ];

  return (
    <div className="App">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={90}
        width={1200}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Stat />
        </Paper>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
          key="paper"
        >
          <Stat />
        </Paper>
        <div style={{ background: "green" }} key="stat">Display</div>
        <div style={{ background: "green" }} key="statlist">List Display</div>
        <div style={{ background: "green" }} key="piechart">Pie Chart Display</div>
      </GridLayout>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Stat />
          </Paper>
        </Grid>
      </Container>
      {error ? (
        <>Oh no, there was a loading error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <span>{data.number.first} </span>
      ) : (
        "No Data"
      )}
    </div>
  );
}

export default App;
