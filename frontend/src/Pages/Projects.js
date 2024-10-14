import React, { useState, useEffect } from "react";

const Projects = () => {
    const [fabric, setFabric] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/projectDetails")
            .then((res) => res.json())
            .then((data) => {
                setFabric(data["data"]);
            });
    }, []);
    return (
        <div className="text-white max-w-full h-full m-5 ">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search project..."
                        className="bg-white shadow-xl shadow-primary-100/25 border border-primary-700 rounded-lg p-1 pb-2 px-4 pl-8 w-64 outline-none text-black focus:outline-4 focus:outline-primary-700/25 focus:outline-offset-0 placeholder:text-black"
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                        }}
                    />
                    <svg viewBox="0 0 0.68 0.68" className="w-4 h-4 text-black absolute top-1/2 left-2 -translate-y-1/2">
                        <path fillRule="evenodd" fill="currentColor" d="M.664.635.457.428A.26.26 0 0 0 .52.259a.26.26 0 0 0-.26-.26.26.26 0 0 0-.184.076A.26.26 0 0 0 0 .259c0 .143.117.26.26.26A.26.26 0 0 0 .429.456l.207.207zM.26.479a.22.22 0 0 1-.22-.22.22.22 0 0 1 .064-.156A.22.22 0 0 1 .26.039c.121 0 .22.099.22.22s-.099.22-.22.22" />
                    </svg>
                </div>
                <div
                    onClick={() => {
                        window.location.href = "/registration";
                    }}
                    className="flex items-center gap-2 bg-gradient-to-tr from-green-600 to-green-500 rounded-lg p-1.5 px-4 cursor-pointer"
                >
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                    <p>Add new project</p>
                </div>
            </div>
            <div className="grid grid-cols-5 mt-5 gap-4">
                {fabric.map((item, index) => {
                    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return (
                            <a href={"/project/" + item.id}>
                                <div key={index} className="w-full border-2 border-primary-700 shadow-xl shadow-primary-100 outline outline-4 outline-transparent hover:outline-primary-600/50 outline-offset-4 cursor-pointer hover:scale-95 transition-all rounded-lg overflow-hidden">
                                    <img
                                        src={process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[0]}
                                        onMouseEnter={(event) => {
                                            let imageCount = item.sampleImages?.length;
                                            window.imageRotator = setInterval(() => {
                                                let index = Math.floor(Math.random() * imageCount);
                                                event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[index];
                                            }, 1000);
                                        }}
                                        onMouseLeave={(event) => {
                                            event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[0];
                                            clearInterval(window.imageRotator);
                                        }}
                                        onError={(event) => {
                                            let imageCount = item.sampleImages?.length;
                                            let index = Math.floor(Math.random() * imageCount);
                                            event.target.src = process.env.REACT_APP_SERVER + "/static/" + item.sampleImages?.[index];
                                        }}
                                        className="w-full h-auto aspect-square object-cover border-b-2 border-primary-700"
                                        alt=""
                                    />
                                    <div className="p-2 bg-gradient-to-br from-primary-600 to-primary-400 text-white">
                                        <h1 className="font-bold">
                                            <span className="font-normal opacity-80">Title :</span> {item.name}
                                        </h1>
                                        <h1 className="font-bold">
                                            <span className="font-normal opacity-80">Dataset :</span> {item.datasetCount}
                                        </h1>
                                        <h1 className="font-bold">
                                            <span className="font-normal opacity-80">Model :</span> {item.modelCount}
                                        </h1>
                                    </div>
                                </div>
                            </a>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Projects;
