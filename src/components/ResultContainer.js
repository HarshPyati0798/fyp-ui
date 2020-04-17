import React from 'react';
import VideoInfoInResults from './VideoInfoInResults';
import ReportSection from './ReportSection';
import AccordionContainer from './AccordionContainer';

const ResultContainer = () => (
    <div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
                <VideoInfoInResults
                    videoNum={1}
                    videoName={"first.mp4"}
                    videoSource={"first.mp4"}
                    videoLength={"6:30"}
                    videoType={"mp4"}
                    numFrames={20}
                />
                <VideoInfoInResults
                    videoNum={2}
                    videoName={"first.mp4"}
                    videoSource={"first.mp4"}
                    videoLength={"6:30"}
                    videoType={"mp4"}
                    numFrames={20}
                />
            </div>
            <ReportSection fileSize={"85 MB"} />
        </div>
        <AccordionContainer />
    </div>
);

export default ResultContainer;