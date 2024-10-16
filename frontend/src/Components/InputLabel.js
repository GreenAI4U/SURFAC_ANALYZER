import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const InputLabel = ({ data, selected }) => {
    const [finalData, setFinalData] = useState(data);
    const [labels, setLabels] = useState([]);
    return (
        <div key={data["id"]} className={"relative shadow-md h-fit w-48 rounded-md border border-red-500 bg-white outline outline-[6px] transition-all duration-700 " + (selected ? "outline-white outline-offset-8" : "outline-transparent outline-offset-0")}>
            <div className="custom-drag-handle px-2 py-1 w-full h-fit flex gap-2 justify-between items-center bg-gradient-to-tr from-primary-800 to-red-500 rounded-t-[5px]">
                <div className="flex gap-1 justify-between items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-tag" viewBox="0 0 16 16">
                        <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                    </svg>
                    <p className="text-sm font-mono">Input Labels</p>
                </div>
                <div className="flex items-center gap-[6px]">
                    <div className="border border-white px-1 flex items-center justify-center rounded-full shadow-inner text-white">
                        <p className="text-xs font-mono">{finalData["labels"]}</p>
                    </div>
                    <div
                        onClick={(event) => {
                            var backspaceEventDown = new KeyboardEvent("keydown", {
                                key: "Backspace",
                                keyCode: 8,
                                which: 8,
                                code: "Backspace",
                                bubbles: true,
                            });
                            event.currentTarget.dispatchEvent(backspaceEventDown);
                        }}
                        onMouseEnter={(event) => {
                            var backspaceEventUp = new KeyboardEvent("keyup", {
                                key: "Backspace",
                                keyCode: 8,
                                which: 8,
                                code: "Backspace",
                                bubbles: true,
                            });
                            event.currentTarget.dispatchEvent(backspaceEventUp);
                        }}
                        className="border border-white p-1 rounded-full shadow-inner text-red-800 bg-white cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <hr className="border-red-500" />
            <div id={"dragAndDropContainer_" + data["id"]} className="p-2 w-full h-full bg-primary-850 flex gap-2 justify-between items-center rounded-b-[5px] cursor-default">
                <div className="h-32 w-full text-white border border-white/10 rounded-lg bg-white/10 backdrop-blur-xl inner-shadow relative flex flex-col items-center justify-center">
                    <input
                        onChange={() => {
                            const files = document.getElementById("datainput_" + data["id"]).files;
                            const totalFiles = files.length;

                            // get first 4 files and display them
                            const labelArr = [];
                            const file = files[0];
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                const contents = event.target.result;
                                labelArr.push(contents);
                                const file = files[1];
                                const reader = new FileReader();
                                reader.onload = function(event) {
                                    const contents = event.target.result;
                                    labelArr.push(contents);
                                    const file = files[2];
                                    const reader = new FileReader();
                                    reader.onload = function(event) {
                                        const contents = event.target.result;
                                        labelArr.push(contents);
                                        setLabels(labelArr);
                                        setFinalData({ labels: totalFiles, items: totalFiles, completed: finalData["completed"], inProgress: finalData["inProgress"], progress: finalData["progress"] });
                                        document.getElementById("dragAndDropContainer_" + data["id"]).classList.add("hidden");
                                        document.getElementById("previewInputData_" + data["id"]).classList.remove("hidden");
                                    };
                                    reader.readAsText(file);
                                };
                                reader.readAsText(file);
                            };
                            reader.readAsText(file);
                        }}
                        id={"datainput_" + data["id"]}
                        type="file"
                        multiple
                        name="labels"
                        accept=".txt"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                    />
                    <svg width="50px" height="50px" className="text-white" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M26.958,11.076C26.49,5.993,22.203,2,17,2c-4.379,0-8.254,2.899-9.543,7.015 c-4.26-0.262-7.875,3.381-7.418,7.728C0.419,20.357,3.661,23,7.295,23H12v6c0,0.552,0.448,1,1,1h6c0.552,0,1-0.448,1-1v-6h5.788 c2.99,0,5.684-2.097,6.139-5.053C32.449,14.557,30.11,11.584,26.958,11.076z M18,21v7h-4v-7h-2.586L16,16.414L20.586,21H18z  M25.856,21H22l-5.293-5.293c-0.391-0.391-1.024-0.391-1.414,0L10,21H7.223c-2.61,0-4.945-1.903-5.199-4.5 C1.733,13.52,4.078,11,7,11c0.345,0,0.693,0.036,1.033,0.107c0.534,0.111,1.035-0.274,1.151-0.807C9.975,6.647,13.257,4,17,4 c4.395,0,7.974,3.563,8,7.952C25.003,12.51,25.443,13,26.001,13c2.395,0.001,4.305,2.117,3.958,4.578 C29.678,19.572,27.869,21,25.856,21z" />
                    </svg>
                    <p className="text-[13px] font-mono">Drag and Drop Files</p>
                </div>
            </div>
            <div id={"previewInputData_" + data["id"]} className="hidden bg-primary-850 cursor-default rounded-b-[5px]">
                <div className="grid grid-cols-3 gap-[1px] p-1 overflow-hidden h-12">
                    {labels.map((label, index) => (
                        <p
                            key={index}
                            onClick={(event) => {
                                let target = event.target;
                                target.parentNode.classList.toggle("overflow-hidden");
                                target.classList.toggle("bg-primary-850");
                                target.classList.toggle("text-[5px]");
                                target.classList.toggle("text-[10px]");
                                target.classList.toggle("leading-[6px]");
                                target.classList.toggle("leading-[12px]");
                                target.classList.toggle("overflow-hidden");
                                target.classList.toggle("overflow-y-scroll");
                                target.classList.toggle("p-1");
                                target.classList.toggle("p-3");
                                target.classList.toggle("scale-110");
                                target.classList.toggle("absolute");
                                target.classList.toggle("top-0");
                                target.classList.toggle("left-0");
                                target.classList.toggle("h-10");
                                target.classList.toggle("h-full");
                                target.classList.toggle("w-auto");
                                target.classList.toggle("rounded-xl");
                                target.classList.toggle("rounded");
                                target.classList.toggle("z-30");
                                target.classList.toggle("custom-drag-handle");
                            }}
                            className="w-full h-10 rounded p-1 overflow-hidden text-[5px] leading-[6px] text-white/50 hover:text-white transition-all duration-300"
                        >
                            {label}
                        </p>
                    ))}
                </div>
                <p className="px-2 text-[10px] text-white font-mono opacity-90 w-48 leading-none z-0">This are the labels which will be used for training the model.</p>
                <div className="grid grid-cols-3 gap-1 p-1">
                    <div className="bg-white/10 text-white rounded-md py-2">
                        <p className="text-[10px] font-bold font-mono leading-none text-center">{finalData["items"]}</p>
                        <p className="text-[8px] font-mono leading-none text-center">items</p>
                    </div>
                    <div className="bg-white/10 text-white rounded-md py-2">
                        <p className="text-[10px] font-bold font-mono leading-none text-center">{finalData["completed"]}</p>
                        <p className="text-[8px] font-mono leading-none text-center">Completed</p>
                    </div>
                    <div className="bg-white/10 text-white rounded-md py-2">
                        <p className="text-[10px] font-bold font-mono leading-none text-center">{finalData["inProgress"]}</p>
                        <p className="text-[8px] font-mono leading-none text-center">In Progress</p>
                    </div>
                </div>
                <div className="p-1 pb-2 flex gap-1 justify-between items-center">
                    <div className="bg-white/10 h-1.5 w-full rounded-full relative">
                        <div className="absolute top-0 left-0 h-full bg-white rounded-full" style={{ width: finalData["progress"] + "%" }}></div>
                    </div>
                    <p className="text-[10px] font-mono leading-none text-center text-white"> {finalData["progress"]}% </p>
                </div>
            </div>
            <Handle type="target" position={Position.Left} isConnectable={1} className="h-3 w-3 rounded-full bg-red-200 border-[3px] -translate-x-0.5 border-red-500 top-[50px]" />
            <Handle type="source" position={Position.Right} isConnectable={1} className="h-3 w-3 rounded-full bg-red-200 border-[3px] translate-x-0.5 border-red-500 top-[50px]" />
        </div>
    );
};

export default memo(InputLabel);
