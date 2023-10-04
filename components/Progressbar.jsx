import { ArrowsRightLeftIcon, SpeakerWaveIcon, } from "@heroicons/react/24/outline";
import { max } from "lodash";
import { useState, useEffect } from "react";

export default function Progressbar() {

    const [progress,setProgress] = useState(0);

    useEffect(() => {
    let test = 0;
    const intervalId = setInterval(() => {
        const newValue = test + 1;
        setProgress(newValue);
    }, 1000);
    return () => clearInterval(intervalId);

    }, []);

    return       <input maxLength={"100"} min={"0"} max={"100"} defaultValue={progress} style={{position: 'relative', width: 100 + '%', top: 0.8 + "rem", display: "flex"}} type="range" />
}