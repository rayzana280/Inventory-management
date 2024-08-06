'use client'
import {useState, useRef} from 'react';
import {Camera, CameraType} from "react-camera-pro";
import * as dotenv from 'dotenv'
dotenv.config()
import{OpenAI} from "openai"
import { Button } from '@mui/material';
//import fs from "fs";
  

interface buttonClicked {
  buttonClicked: ()=> void
}

interface readingData{
  readingData: ()=> void
}
interface props{
  buttonClicked: ()=> void,
  readingData: (string:any )=> void
}

const Takepic = ({buttonClicked, readingData}: props) => {

  

  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string | ImageData | undefined>(undefined);

//
  
function picAi(image: string | ImageData){
  const openai = new OpenAI({
    apiKey: '1234'
    , dangerouslyAllowBrowser: true 
  });

 const response = openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: 'user',
        content: [
          {
            type: "text",
            text: "Describe this image",
          },
          {
            type: "image_url",
            image_url: {
              url: `${image}`,
              detail: "low",
            }
          }
        ]
      }
    ]
  }).then(data => readingData(data.choices[0].message.content))


}


  return (
    <div>
      <Camera ref={camera} errorMessages={{}}/> 
      <Button variant="outlined" onClick={() => {
        const image = camera.current?.takePhoto();
        setImage(image)
        if (image) {
          picAi(image);
        }
        }}>take pic</Button>
      <Button variant='outlined' onClick={buttonClicked}>Turn off cam</Button>
    </div>
  )
}

export default Takepic;