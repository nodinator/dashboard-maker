// import { useGetRandomQuery } from "./services/main";
import Stat from "./components/Stat";
import StatList from "./components/StatList";
import "./App.css";
import { Paper } from "@mui/material";
import { useState, useCallback } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { addComponent, selectLayout, updateLayout } from "./components/layoutSlice";

const widthOfToolbar = 300

const defaultWidthStat = 3 //turn these into an object const defaultWidth = {stat: 3, statlist: 3}
const defaultHeightStat = 2  //turn these into an object const defaultHeight = {stat: 3, statlist: 1.2}
const defaultWidthStatList = 3
const defaultHeightStatList = 3

export default function App({ onLayoutChange = () => { } }) {
  // const { data, error, isLoading } = useGetRandomQuery("number", {
  //   pollingInterval: 500,
  // });




  // BREAK OUT POPPER STATMENU INTO SEPARATE COMPONENT
  // Using menu ends up accidentally dragging that component - need to make any component with the popper open be static or isDraggable={false} until the popper is closed again
  // keep menu and actively-being-edited component in focus - everything else gets grey (could switch the popper to dialog...) https://stackoverflow.com/questions/55893565/how-to-use-backdrop-shadow-with-popper
  // apply state simplification and redux REFACTOR to statmenu

  // connect components to backend
  // make statlist component:           Title
  //                              Sandwich: 5000
  //                              Drinks:   4000

  // make it a little bit pretty
  // allow users to edit appearance (colors, fontsize)
  // make rows and columns finer grained
  // add local storage so it saves your work
  // add button to each component that lets you trash them with an "are you sure?" modal
  // add reset whole project button with confirmatin modal
  // make toolbar collapsible with a little tab and a title at the top that says "Select an element to add" or use speed dial or floating action button or dialog
  // add ability to save/export/host generated dashboard - THIS NEEDS TO GET STATE FROM ALL SMALLEST COMPONENTS
  // Add a mobile view, so they can design for narrower screens - use responsivegridlayout (comes with react-grid-layout) with breakpoints
  // look at the drag from outside example and see if you can parlay the coordinates on release into generating a new component at those coordinates - note that the red shadow that shows where it'll be placed is not appearing in firefox for me but does in their example

  const layoutToolbar = [
    { i: "stat", x: 0, y: 0, w: defaultWidthStat, h: defaultHeightStat, static: true },
    { i: "statlist", x: 0, y: defaultHeightStat + 0.5, w: defaultWidthStatList, h: defaultHeightStatList, static: true, },
  ];
  const [statCounter, setStatCounter] = useState(0)
  const [statListCounter, setStatListCounter] = useState(0)
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()

  function addStat() {
    dispatch(addComponent({ i: `stat${statCounter}`, x: 0, y: Infinity, w: defaultWidthStat, h: defaultHeightStat }))
    setStatCounter(statCounter + 1)
  }
  function addStatList() {
    dispatch(addComponent({ i: `statlist${statListCounter}`, x: 0, y: Infinity, w: defaultWidthStatList, h: defaultHeightStatList }))
    setStatListCounter(statListCounter + 1)
  }
  type item = { i: string, x: number, y: number, w: number, h: number }

  let handleDrop = (layoutItem: any) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`); //I think this is alerting with all elements not just the new one
  }

  // function handleLayoutChange(layout: any, layouts: any) {
  //   dispatch(updateLayout(layout))
  //   //HERE NEED TO SET LAYOUT USING NEW DISPATCH
  // }

  const handleLayoutChange = useCallback(
    (newLayout: any) => {
      dispatch(updateLayout(newLayout))
      onLayoutChange();
    },
    [onLayoutChange]
  );


  function createElement(item: item) {
    if (item.i.startsWith("statlist")) {
      return <Paper sx={{ p: 2 }} key={item.i}>
        <StatList />
      </Paper>
    } else if (item.i.startsWith("stat")) {
      return <Paper sx={{ p: 2 }} key={item.i}>
        <Stat />
      </Paper>
    }


  }

  return (
    <div className="App" style={{ backgroundColor: "#ebedf0" }}>
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
        </GridLayout>
        <GridLayout
          className="layout"
          layout={layout}
          cols={10}
          rowHeight={100}
          width={1000}
          isBounded={true}
          isDroppable={true}
          isResizable={true}
          style={{ marginLeft: widthOfToolbar }}
          onDrop={handleDrop}
          onLayoutChange={handleLayoutChange}
        >
          {layout.map(item => createElement(item))}

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


