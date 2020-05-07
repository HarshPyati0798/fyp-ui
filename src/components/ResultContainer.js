import React from 'react';
import VideoInfoInResults from './VideoInfoInResults';
import ReportSection from './ReportSection';
import AccordionContainer from './AccordionContainer';
import output from './../data/output.json'
import styles from './../styles/ResultContainer.css'
import axios from 'axios';

class ResultContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data : props.data,
            loadingCaptions: true,
            captions: [],
            firstVideoCaps: [],
            secondVideoCaps: []
        }
    }
    componentWillMount() {
        this.fetchCaptionsData()
    }

    fetchCaptionsData = () => {
        const options = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }

        const { dissimilar_image_list, boxedFramesVideoOnePath, boxedFramesVideoTwoPath } = output
        const firstVideoImages = dissimilar_image_list.map(image => `${this.formatPath(boxedFramesVideoOnePath)}${image}`)
        const secondVideoImages = dissimilar_image_list.map(image => `${this.formatPath(boxedFramesVideoTwoPath)}${image}`)
        const data = new FormData()
        data.append('image_paths', firstVideoImages)
        axios.post('http://127.0.0.1:5000/captions', data, options)
            .then(res => {
                const firstVideoCaps = res.data
                const newData = new FormData()
                newData.append("image_paths", secondVideoImages)
                axios.post('http://127.0.0.1:5000/captions', newData, options)
                    .then(newRes => {
                        const secondVideoCaps = newRes.data
                        this.setState({
                            firstVideoCaps,
                            secondVideoCaps,
                            loadingCaptions: false
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(err => console.log(err))
    }

    formatPath = (path) => {
        return path.split("\\").join('/')
    }


    render() {
        const { data, loadingCaptions, firstVideoCaps, secondVideoCaps } = this.state
        let { markedVideosPath, dissimilar_image_list, rawVideoOneFramesPath } = data
        rawVideoOneFramesPath = this.formatPath(rawVideoOneFramesPath)
        const imageList = dissimilar_image_list.map((image, index) => {
            console.log(`${rawVideoOneFramesPath}${image}`)
            return (
                <div className="imageDiff">
                    <img src={`${rawVideoOneFramesPath}${image}`} key={index} />
                </div>
            )
        })

        const captionComparisons = []
        if (!loadingCaptions) {
            for (let i = 0; i < firstVideoCaps.length; i++) {
                const caption = {}
                caption["differenceNum"] = i + 1
                for (let j = 0; j < secondVideoCaps.length; j++) {
                    if (i == j) {
                        const firstCaptionInfo = firstVideoCaps[i]
                        const secondCaptionInfo = secondVideoCaps[j]
                        caption["content"] = `In the first frame it is ${firstCaptionInfo["caption"]}, in the second frame it is ${secondCaptionInfo["caption"]}`;
                        break;
                    }
                }
                captionComparisons.push(caption)
            }
        }
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                {/* <p>Differences</p> */}
                <div className="container">
                    {imageList}
                </div>
                {loadingCaptions ? null : <AccordionContainer captionInfo={captionComparisons} />}
            </div>
        );
    }
}

export default ResultContainer;