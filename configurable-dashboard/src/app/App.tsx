import PollServer from "./api";
import PieChart from "../features/pie/PieChart";
import Component from "./Component";
import StatList from "../features/statlist/StatList";
import "./App.css"
import { Paper, Backdrop } from "@mui/material";
import { useState } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { selectLayout, layoutAdded, layoutUpdated } from "./layoutSlice";
import { selectStylingAndData, initialState, stylingComponentAdded } from "./stylingAndDataSlice";
// import { Responsive, WidthProvider } from "react-grid-layout";

// const ResponsiveGridLayout = WidthProvider(Responsive);

const widthOfToolbar = 300
const width = 20   //default component dimensions
const height = { stat: 10, statlist: 15, pie: 26 }

export default function App() {

  const [statCounter, setStatCounter] = useState(2)
  const [statListCounter, setStatListCounter] = useState(2)
  const [pieCounter, setPieCounter] = useState(2)

  const dispatch = useDispatch()
  PollServer()



  const layoutToolbar = [
    { i: "stat", x: 0, y: 0, w: width, h: height.stat, static: true },
    { i: "statlist", x: 0, y: height.stat + 0.5, w: width, h: height.statlist, static: true, },
    { i: "pie", x: 0, y: height.stat + height.statlist + 1, w: width, h: height.pie, static: true, },

  ];

  const layout = useSelector(selectLayout)
  const isOpen = useSelector((state: any) => //should use RootState here instead of any
    state.stylingAndData.some((stylingAndData: any) => stylingAndData.isOpen === true)
  )
  const styling = useSelector(selectStylingAndData)

  function addStat() {
    dispatch(layoutAdded({ i: `stat${statCounter}`, x: 0, y: Infinity, w: width, h: height.stat }))
    dispatch(stylingComponentAdded({ ...initialState[0], id: `stat${statCounter}` }))
    setStatCounter(statCounter => statCounter + 1)
  }
  function addStatList() {
    dispatch(layoutAdded({ i: `statlist${statListCounter}`, x: 0, y: Infinity, w: width, h: height.statlist }))
    setStatListCounter(statListCounter + 1)
  }
  function addPie() {
    dispatch(layoutAdded({ i: `pie${pieCounter}`, x: 0, y: Infinity, w: width, h: height.pie }))
    setPieCounter(pieCounter + 1)
  }


  function handleLayoutChange(newLayout: any) {
    dispatch(layoutUpdated(newLayout))
  }

  const PaperProps = {
    sx: { p: 1, display: "flex", flexDirection: "column", justifyContent: "center", cursor: "move", }
  }

  // <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

  type item = { i: string, x: number, y: number, w: number, h: number }

  //SHOULD BE ABLE TO SIMPLIFY THE BELOW, SINCE THEY ALL USE COMPONENT NOW
  function createElement(item: item) {
    // if (item.i.startsWith("statlist")) {
    //   return <Paper sx={{ p: 2 }} key={item.i}>
    //     <StatList />
    //   </Paper>
    // } else 
    // if (item.i.startsWith("stat")) {
    return <Paper sx={{ ...PaperProps.sx, zIndex: styling.find(component => component.id === item.i)?.isOpen ? 3 : 2 }} key={item.i}>
      <Component statId={item.i} toolbar={true} />
    </Paper>
    // }
    //  else if (item.i.startsWith("pie")) {
    //   return <Paper sx={{ ...PaperProps.sx, zIndex: styling.find(component => component.id === item.i)?.isOpen ? 3 : 2 }} key={item.i}>
    //     <PieChart title="My Pie Chart" legendTitle="Legend" data={{ labels: ["V6", "V8", "V10"], data: [30, 40, 20] }} />
    //   </Paper>
    // }
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
              <Paper
                onClick={addStat}
                style={{ cursor: "pointer", }}
                {...PaperProps}
                key="stat"
              >
                <Component statId={"stat1"} toolbar={false} />
              </Paper>
              {/* <Paper
                onClick={addStatList}
                style={{ cursor: "pointer", }}
                sx={{ p: 2, display: "flex", flexDirection: "column", height: 240, }}
                key="statlist"
              >
                <StatList />
              </Paper>
              <Paper
                onClick={addPie}
                style={{ cursor: "pointer", }}
                sx={{ p: 2, display: "flex", flexDirection: "column", height: 240, }}
                key="pie"
              >
                <PieChart title="My Pie Chart" legendTitle="Legend" data={{ labels: ["V6", "V8", "V10"], data: [30, 40, 20] }} />
              </Paper> */}
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
          </ReactGridLayout>
        </div>
      </div >
    </>
  );
}


