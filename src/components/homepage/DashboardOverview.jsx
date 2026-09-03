import React, { useRef } from 'react';

const DashboardOverview = ({ setShowSignin }) => {
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
      }
  };

  return (
    <section className="dashboard-overview">
      <div className="container video-section">
        <div className="dashboard-overview__container border-2 border-dotted border-gray-400 p-2">
          <div className="video_parent rounded-lg">
            <div className="responsive-iframe">
              {/* <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/VTGsjJH-OWs?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allow="autoplay" 
                allowFullScreen>
              </iframe> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
