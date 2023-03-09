import { useGetRandomQuery } from "./services/main";
import Stat from "./components/Stat";
import StatList from "./components/StatList";
import "./App.css";
import { Container, Paper, Grid } from "@mui/material";
import { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


const widthOfToolbar = 300

const defaultWidthStat = 3 //turn these into an object const defaultWidth = {stat: 3, statlist: 3}
const defaultHeightStat = 1.2  //turn these into an object const defaultHeight = {stat: 3, statlist: 1.2}
const defaultWidthStatList = 3
const defaultHeightStatList = 3
function App() {
  // const { data, error, isLoading } = useGetRandomQuery("number", {
  //   pollingInterval: 500,
  // });



  // LOOK AT THE DRAG FROM OUTSIDE EXAMPLE AND SEE IF YOU CAN PARLAY THE COORDINATES ON RELEASE INTO GENERATING A NEW COMPONENT AT THOSE COORDINATES
  // add local storage so it saves your work
  // add button to each component that lets you trash them with an "are you sure?" modal
  // add reset button
  // make toolbar collapsible with a little tab and a title at the top that says "Select an element to add"
  // Add a mobile view, so they can design for narrower screens - use responsivegridlayout (comes with react-grid-layout) with breakpoints
  const layoutToolbar = [
    // { i: "stat", x: 0, y: 20, w: 3, h: 2, },
    // { i: "statlist", x: 0, y: 10, w: 3, h: 4, },
    // { i: "piechart", x: 0, y: 16, w: 3, h: 3, },
    { i: "stat", x: 0, y: 0, w: defaultWidthStat, h: defaultHeightStat, static: true },
    { i: "statlist", x: 0, y: 1.3, w: defaultWidthStatList, h: defaultHeightStatList, static: true, },
  ];
  const [layoutDynamic, setLayoutDynamic] = useState([{ i: "movable", x: 0, y: 1.3, w: 4, h: 3, }])
  const [statCounter, setStatCounter] = useState(0)
  const [statListCounter, setStatListCounter] = useState(0)

  function addStat() {
    setLayoutDynamic([...layoutDynamic, { i: `stat${statCounter}`, x: 0, y: Infinity, w: defaultWidthStat, h: defaultHeightStat }])
    setStatCounter(statCounter + 1)
  }
  function addStatList() {
    setLayoutDynamic([...layoutDynamic, { i: `statlist${statListCounter}`, x: 0, y: Infinity, w: defaultWidthStatList, h: defaultHeightStatList }])
    setStatListCounter(statListCounter + 1)
  }
  type item = { i: string, x: number, y: number, w: number, h: number }
  function createElement(item: item) {
    if (item.i.startsWith("statlist")) {
      return <Paper sx={{ p: 2 }} key={item.i}      >
        <StatList />
      </Paper>
    } else if (item.i.startsWith("stat")) {
      return <Paper sx={{ p: 2 }} key={item.i}      >
        <Stat />
      </Paper>
    }


  }

  return (
    <div className="App">
      <div style={{ background: "yellow", width: "200px", height: "200px" }}
        className="droppable-element" draggable={true} unselectable="on"
        onDragStart={e => e.dataTransfer.setData("text/plain", "")} >
        DisplayD&D
      </div>
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        <GridLayout
          className="layout"
          layout={layoutToolbar}
          cols={3}
          rowHeight={100}
          width={widthOfToolbar}
          isBounded={true}
          isResizable={true}
        >
          {/* <button onClick={addStat}> */}
          <Paper
            onClick={addStat}
            style={{ cursor: "pointer", }}
            sx={{ p: 2, }}
            key="stat"
          >
            <Stat />
          </Paper>
          {/* </button> */}
          <Paper
            onClick={addStatList}
            style={{ cursor: "pointer", }}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
            key="statlist"
          >
            <StatList />
          </Paper>
          {/* <div style={{ background: "green" }} key="stat">Display</div>
        <div style={{ background: "green" }} key="statlist">List Display</div>
        <div style={{ background: "green" }} key="piechart">Pie Chart Display</div> */}
        </GridLayout>
        <GridLayout
          className="layout"
          layout={layoutDynamic}
          cols={10}
          rowHeight={100}
          width={1000}
          isBounded={true}
          isResizable={true}
          style={{ marginLeft: widthOfToolbar }}
        >
          {layoutDynamic.map(item => createElement(item))}

          {/* <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
            key="movable"
          >
            <Stat />
          </Paper> */}

        </GridLayout>
      </div>
      {/* {
        error ? (
          <>Oh no, there was a loading error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <span>{data.number.first} </span>
        ) : (
          "No Data"
        )
      } */}
    </div >
  );
}

export default App;
