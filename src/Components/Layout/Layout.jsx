import React from "react";
import SampleSplitter from "./SampleSplitter";
import DataTable from "./DataTable";
import { useResizable } from "react-resizable-layout";
import { cn } from "../../utils/cn";
import "../../styles/Layout.css";
const Layout = () => {
  const {
    isDragging: isTerminalDragging,
    position: w1Pos,
    separatorProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true,
  });
  const {
    isDragging: isFileDragging,
    position: w2Pos,
    separatorProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 950,
    min: 50,
  });
  const {
    isDragging: isPluginDragging,
    position: w3Pos,

  } = useResizable({
    axis: "x",
    initial: 900,
    min: 50,
    reverse: true,
  });
  


  
  return (
    <div
      className={
        "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
      }
    >
      <div className={"flex grow"}>
        <div
          className={cn("shrink-0 contents", isFileDragging && "dragging")}
          style={{ width: w2Pos, fontSize: "20px" }}
        >
          <DataTable/>
          
        </div>
        <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />

        <div
          className={cn("shrink-0 contents", isPluginDragging && "dragging")}
          style={{ width: w3Pos, fontSize: "20px" }}
        >
          window 2
         
        </div>
      </div>
      <SampleSplitter
        dir={"horizontal"}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div
        className={cn(
          "shrink-0 bg-darker contents",
          isTerminalDragging && "dragging"
        )}
        style={{ height: w1Pos, fontSize: "20px" }}
      >
        window 3
       
      </div>
    </div>
  );
};

export default Layout;
