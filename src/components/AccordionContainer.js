import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import './../styles/AccordionContainerStyles.css';
const diffData = [
    {
        "differenceNum": 1,
        "content": "The symbol from the bottom right corner in the frame from the video 1 is missing in the corresponding frame from the video 2. The red bounding box in the bottom right corner denotes this difference."
    },
    {
        "differenceNum": 2,
        "content": "The symbol from the bottom right corner in the frame from the video 1 is missing in the corresponding frame from the video 2. The red bounding box in the bottom right corner denotes this difference."
    },
    {
        "differenceNum": 3,
        "content": "The symbol from the bottom right corner in the frame from the video 1 is missing in the corresponding frame from the video 2. The red bounding box in the bottom right corner denotes this difference."
    },
    {
        "differenceNum": 4,
        "content": "The symbol from the bottom right corner in the frame from the video 1 is missing in the corresponding frame from the video 2. The red bounding box in the bottom right corner denotes this difference."
    },
    {
        "differenceNum": 5,
        "content": "The symbol from the bottom right corner in the frame from the video 1 is missing in the corresponding frame from the video 2. The red bounding box in the bottom right corner denotes this difference."
    },
    {
        "differenceNum": 6,
        "content": "The symbol from the bottom right corner in the frame from the video 1 is missing in the corresponding frame from the video 2. The red bounding box in the bottom right corner denotes this difference."
    }
];


const AccordionContainer = () => {
    return (
        <div>
            <h4 className="accordionTitle">Description of differences</h4>
            <Accordion>
                {
                    diffData.map(difference => {
                        return (
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Difference {difference.differenceNum}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        {difference.content}
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        );
                    }
                    )}
            </Accordion>
        </div>
    )
};


export default AccordionContainer;