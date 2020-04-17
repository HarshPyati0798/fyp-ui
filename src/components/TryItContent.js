import React, { Component } from 'react';
import './../styles/ContentStyles.css'
import UploadVideo from './UploadVideo';
import ResultContainer from './ResultContainer';
import axios from 'axios';


const uploadVideo = () => {

}

class Content extends Component {
    state = {}
    retrieveVideo = (file) => {
        return new Promise(resolve => {
            let input = document.createElement('input')
            input.type = 'file';
            input.accept = 'video/*';
            input.onchange = _ => {
                if (file == 'file1') {
                    this.setState({
                        file1: Array.from(input.files)
                    }, () => console.log(this.state))
                } else {
                    this.setState({
                        file2: Array.from(input.files)
                    }, () => console.log(this.state))
                }
            }
            input.click();
        })
    }

    processVideo = () => {
        const { file1, file2 } = this.state
        if (file1 != null && file2 != null) {
            const data = new FormData()
            data.append("file", file1[0])
            data.append("file2", file2[0])
            axios.post('http://localhost:5000/uploader', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                data
            })
                .then(res => {
                    console.log(res)
                })
        } else {
            alert("Ensure that you select 2 videos for comparison")
        }
    }

    render() {
        return (
            <div className="container">
                <p className="pclass">TRY IT NOW</p>
                <div className="uploadvideocontainer">
                    <UploadVideo title="Upload Video 1" uploadVideo={() => this.retrieveVideo("file1")} />
                    <UploadVideo title="Upload Video 2" uploadVideo={() => this.retrieveVideo("file2")} />
                </div>
                <button className="process" onClick={this.processVideo}>PROCESS</button>
            </div>
        );
    }
}

export default Content;