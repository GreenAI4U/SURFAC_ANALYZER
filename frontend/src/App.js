import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainingPipeline from "./Pages/trainingPipeline";
import TrainForm from "./Pages/TrainForm";

// import PredictionPipeline from "./Pages/PreditionPipeline";
import PredictionForm from "./Pages/PredictionForm";

// import TextAnotator from "./Pages/textAnotator";
// import ImageAnnotation from "./Pages/imageAnnotation";
import Navbar from "./Components/Navbar";
import ImageGallery from "./Pages/ImageGallery";

import FabricRegistration from "./Pages/FabricRegistration";
import AnnotatorAlloaction from "./Pages/AnnotatorAlloaction";
import Projects from "./Pages/Projects";
import ProjectDetails from "./Pages/ProjectDetails";
import RealtimeForm from "./Pages/RealtimeForm";
import Settings from "./Pages/Settings";
// import CustomAnnotation from "./Pages/CustomAnnotation";

export default function App() {
    const [sideBarOpen, setSideBarOpen] = useState(7);
    const [LicenseExpiration, setLicenseExpiration] = useState(true);
    let className = "w-[calc(100%-7%)] ml-[7%] w-[7%] w-[calc(100%-14%)] ml-[14%] w-[14%]";
    return (
        <Router>
            <div className="flex flex-row bg-gradient-to-br from-primary-100/50 to-white min-h-screen w-screen relative">
                <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
                <div className={`w-[calc(100%-${sideBarOpen}%)] ml-[${sideBarOpen}%] relative transition-all overflow-y-hidden`}>
                    {LicenseExpiration && (
                        <div className={`fixed bottom-0 left-0 ml-[${sideBarOpen}%] bg-gradient-to-tr from-green-800 to-green-600 text-white w-[calc(100%-${sideBarOpen}%)] z-50 p-2 text-center`}>
                            License Expiration date should be displayed Here
                            <svg onClick={()=>{
                                setLicenseExpiration(false);
                            }} className="absolute top-2 right-2 hover:bg-green-900 rounded-full cursor-pointer" width={24} height={24} viewBox="-0.18 -0.18 0.72 0.72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                                <path fill="currentColor" d="m0.219 0.177 0.106 -0.106A0.03 0.03 0 1 0 0.283 0.028L0.177 0.135 0.071 0.028A0.03 0.03 0 1 0 0.028 0.071l0.106 0.106L0.028 0.283a0.03 0.03 0 1 0 0.042 0.042l0.106 -0.106 0.106 0.106a0.03 0.03 0 1 0 0.042 -0.042L0.219 0.177z" />
                            </svg>
                        </div>
                    )}
                    <Routes>
                        <Route path="/" element={<Projects />} />
                        <Route path="/registration" element={<FabricRegistration />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
                        <Route path="/train" element={<TrainForm />} />
                        <Route path="/train-pipeline" element={<TrainingPipeline />} />
                        <Route path="/prediction" element={<PredictionForm />} />
                        <Route path="/realtime" element={<RealtimeForm />} />
                        {/* <Route path="/image-annotation" element={<ImageAnnotation />} /> */}
                        <Route path="/image-gallery" element={<ImageGallery />} />
                        <Route path="/annotator-allocation" element={<AnnotatorAlloaction />} />
                        <Route path="/setting" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
