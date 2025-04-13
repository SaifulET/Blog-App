import { useState } from "react";
import "../assets/VideoPlayer.css";
import ReactPlayer from "react-player"
import { TypeAnimation } from 'react-type-animation';



const videos = [
  { id: 1, src: "https://youtu.be/rQJmDWB9Zwk?si=RL_IMFplDACm9iJ0", title: "Ai" },
  { id: 2, src: "https://youtu.be/0tZFQs7qBfQ?si=IiS2hcsrjbC2jjg5", title: "Web" },
  { id: 3, src: "https://youtu.be/Oa0ZHfcalCM?si=_CXbuJ10s2PZ_1ea", title: "ML" },
  { id: 4, src: "https://youtu.be/QJn28fFKUR0?si=JqejrqPk3zCAMNTe", title: "BlockChain" },
];

const VideoPlayer = () => {


  
  const [activeVideoId, setActiveVideoId] = useState(null);
  
  return (
    <div className="video-container pb-5">
      <div className="heading">
         <TypeAnimation
  sequence={[
    'Trending ',
    500,
    'Trending Tech  ', //  Continuing previous Text
    500,
    'Trending ',
    500,
    '',
  ]}
  style={{ fontSize: '2em' }}
  repeat={Infinity}
/></div>
      <div className="video-grid pb-5">
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <ReactPlayer
            url={video.src}
            playing={activeVideoId === video.id}
            muted={activeVideoId !== video.id}
            loop
            controls
            width="100%"
            height="100%"
            className="video-thumb"
            onPlay={() => setActiveVideoId(video.id)}
          />
          <p className="video-title">{video.title}</p>
        </div>
      ))}
    </div>




   
   
      
    </div>
  );
};

export default VideoPlayer;