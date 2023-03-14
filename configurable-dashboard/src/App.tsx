import { useGetRandomQuery, useGetPartsQuery } from "./services/main";
// import { useQueries } from 'react-query';

import Stat from "./components/Stat";
import StatList from "./components/StatList";
import "./App.css";
import { Paper, Backdrop } from "@mui/material";
import { useState } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { selectLayout, layoutAdded, layoutUpdated } from "./components/layoutSlice";
import { selectStylingAndData, initialState, stylingComponentAdded } from "./components/stylingAndDataSlice";

const widthOfToolbar = 300

const defaultWidthStat = 20 //turn these into an object const defaultWidth = {stat: 3, statlist: 3}
const defaultHeightStat = 10  //turn these into an object const defaultHeight = {stat: 3, statlist: 1.2}
const defaultWidthStatList = 20
const defaultHeightStatList = 15

export default function App() {
  // const { data, error, isLoading } = useGetRandomQuery("number", {
  //   pollingInterval: 1000,
  // });
  // try {
  //   console.log(data.number.first)
  // } catch (e) {
  //   console.log(e)
  // }
  // const queries = useQueries([
  //   {
  //     queryKey: ['pokemon', 'pikachu'],
  //     queryFn: useGetPartsQuery,
  //     pollingInterval: 3000
  //   },
  //   {
  //     queryKey: ['number'],
  //     queryFn: useGetRandomQuery,
  //     pollingInterval: 5000
  //   },
  // ]);

  // const { data, } = useGetPartsQuery({
  //   pollingInterval: 1000,
  // });
  // try {
  //   console.log(data)
  // } catch (e) {
  //   console.log(e)
  // }


  // connect components to backend - FIRST create a bunch of fake data for a company to be accessed by API; it should be realistic and better than "sandwiches"
  // USE RESPONSIVE GRID - CURRENT HARDCODING OF GRID WIDTH IS TERRIBLE
  // possibly (first research how slices should be engineered) combine stylinganddata and layout states so that all state for any given component is part of the same object - good practice if nothing else -compare before and after

  // REFACTORING LINKS: https://levelup.gitconnected.com/refactoring-a-complex-react-component-5-best-practices-to-write-efficient-and-readable-components-b0d06f4f22b4
  // SEE THIS COMMENT: https://medium.com/@kevin.dalman/your-refactor-started-well-but-stopped-short-of-being-optimal-b15524b0b4c6
  // refactor Stat.tsx especially - lots of repetition in the popper

  // make statlist component:           Title
  //                              Sandwich: 5000
  //                              Drinks:   4000
  // replace all "any" types
  // add local storage
  // read up on react-redux optimization:            https://somebody32.github.io/9              https://medium.com/@lavrton/optimizing-react-redux-store-for-high-performance-updates-3ae6f7f1e4c1#.3ltrwmn3z
  // add reset whole project button with confirmation modal
  // add ability to save/export/host generated dashboard - THIS NEEDS TO GET STATE FROM ALL SMALLEST COMPONENTS
  // Add a mobile view, so they can design for narrower screens - use responsivegridlayout (comes with react-grid-layout) with breakpoints
  // look at the drag from outside example and see if you can parlay the coordinates on release into generating a new component at those coordinates - note that the red shadow that shows where it'll be placed is not appearing in firefox for me but does in their example
  // make cursor context sensitive - when the popper menu is open, moving components is not allowed, so the cursor should reflect that. 
  // break out file structure into features like redux docs?



  // MEH:
  // add confirmation modal: "are you sure you want to delete this component?"
  // make toolbar collapsible with a little tab and a title at the top that says "Select an element to add" or use speed dial or floating action button or dialog


  const layoutToolbar = [
    { i: "stat", x: 0, y: 0, w: defaultWidthStat, h: defaultHeightStat, static: true },
    { i: "statlist", x: 0, y: defaultHeightStat + 0.5, w: defaultWidthStatList, h: defaultHeightStatList, static: true, },
  ];
  const [statCounter, setStatCounter] = useState(2)
  const [statListCounter, setStatListCounter] = useState(2)
  const layout = useSelector(selectLayout)
  const isOpen = useSelector((state: any) => //should use RootState here instead any
    state.stylingAndData.some((stylingAndData: any) => stylingAndData.isOpen === true)
  )
  const styling = useSelector(selectStylingAndData)
  const dispatch = useDispatch()

  function addStat() {
    dispatch(layoutAdded({ i: `stat${statCounter}`, x: 0, y: Infinity, w: defaultWidthStat, h: defaultHeightStat }))
    dispatch(stylingComponentAdded({ ...initialState[0], id: `stat${statCounter}` }))
    setStatCounter(statCounter => statCounter + 1)
  }
  function addStatList() {
    dispatch(layoutAdded({ i: `statlist${statListCounter}`, x: 0, y: Infinity, w: defaultWidthStatList, h: defaultHeightStatList }))
    setStatListCounter(statListCounter + 1)
  }
  type item = { i: string, x: number, y: number, w: number, h: number }





  function handleLayoutChange(newLayout: any) {
    dispatch(layoutUpdated(newLayout))
  }

  const PaperProps = {
    sx: { p: 1, display: "flex", flexDirection: "column", justifyContent: "center", cursor: "move", }
  }


  // <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
  function createElement(item: item) {
    if (item.i.startsWith("statlist")) {
      return <Paper sx={{ p: 2 }} key={item.i}>
        <StatList />
      </Paper>
    } else if (item.i.startsWith("stat")) {
      return <Paper sx={{ ...PaperProps.sx, zIndex: styling.find(component => component.id === item.i)?.isOpen ? 3 : 2 }} key={item.i}>
        <Stat statId={item.i} toolbar={true} />
      </Paper>
    }


  }


  let handleDrop = (layoutItem: any) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`); //I think this is alerting with all elements not just the new one
  }

  return (
    <>
      <div className="App" style={{ backgroundColor: "#ebedf0", minHeight: "100vh" }}>
        {/* <div style={{ background: "yellow", width: "200px", height: "200px" }}
          className="droppable-element" draggable={true} unselectable="on"
          onDragStart={e => e.dataTransfer.setData("text/plain", "")} >
          DisplayD&D
        </div> */}
        <div style={{ display: "flex", flex: 1, flexDirection: "row", }}>
          <Backdrop open={isOpen} sx={{ zIndex: 3 }} />

          <div style={{ display: "flex", flex: "0 0 auto", flexDirection: "column", width: widthOfToolbar, backgroundColor: "#747F92", minHeight: "100vh" }}          >
            <ReactGridLayout
              className="layout"
              layout={layoutToolbar}
              cols={20}
              rowHeight={10}
              isBounded={true}
              isResizable={true}
              allowOverlap={false}
              width={widthOfToolbar}
            >

              {/* <button onClick={addStat}> */}
              <Paper
                onClick={addStat}
                style={{ cursor: "pointer", }}
                {...PaperProps}
                key="stat"
              >
                <Stat statId={"stat1"} toolbar={false} />
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
            </ReactGridLayout>
          </div>

          <ReactGridLayout
            className="layout"
            layout={layout}
            cols={88}
            rowHeight={10}
            width={1300}
            allowOverlap={false}
            isBounded={true}
            isDroppable={true}
            isDraggable={!isOpen}
            isResizable={true}
            onDrop={handleDrop}
            onLayoutChange={handleLayoutChange}
            style={{ minHeight: "100vh" }}
          // compactType={null}
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

          </ReactGridLayout>
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
    </>
  );
}


