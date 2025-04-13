import { useState, useEffect } from 'react';
import '../assets/Slider.css'; // Import CSS file for styling

const Slider = () => {
  const slides = [
    { url: 'https://plus.unsplash.com/premium_photo-1674641194949-e154719cdc02?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: '' },
    { url: 'https://images.unsplash.com/photo-1554941426-e9604e34bc94?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: '' },
    { url: 'https://images.unsplash.com/photo-1524680319993-fe837ad4bf2d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: '' },
    { url: 'https://images.unsplash.com/photo-1554941426-a965fb2b9258?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: '' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('left'); // Initial direction: left to right
  const [iterationCount, setIterationCount] = useState(0); // Track number of iterations in one direction
  const [isBackgroundExtended, setIsBackgroundExtended] = useState(false); // Track background extension

  // Function to go to the next slide
  const goToNextSlide = () => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Move left to right
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Move right to left
    }
  };

  // Function to go to the previous slide
  const goToPreviousSlide = () => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Move left to right
    }
  };

  // Function to toggle direction after 4 iterations
  const toggleDirection = () => {
    setDirection((prevDirection) => (prevDirection === 'left' ? 'right' : 'left'));
    setIterationCount(0); // Reset iteration count when direction changes
  };

  // Function to extend the background
  const extendBackground = () => {
    setIsBackgroundExtended(true);
  };

  // Set up automatic slide change every 2 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      goToNextSlide();

      // Increase the iteration count after moving to the next slide
      setIterationCount((prevCount) => prevCount + 1);

      // After 4 slides in one direction, change direction
      if (iterationCount === 2) {
        toggleDirection();
      }

      // Extend the background after 4 slides
      if (iterationCount === 3) {
        extendBackground();
      }
    }, 2000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(slideInterval);
  }, [currentIndex, iterationCount, direction]);

  return (
    <div className="mainContainer">
      {/* Slider Section */}
      <div className="slider-section">
        {/* Text Section */}
        <div className="text-section">
          <h2>Welcome to Our Website</h2>
          <p>Explore our latest content and stay updated with the latest news.</p>
        </div>

        {/* Slider Container */}
        <div className="slider-container">
          <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="slide">
                <img src={slide.url} alt={slide.caption} className="slider-image" />
                <div className="caption">{slide.caption}</div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button className="slider-btn prev-btn" onClick={goToPreviousSlide}>
            &#10094;
          </button>
          <button className="slider-btn next-btn" onClick={goToNextSlide}>
            &#10095;
          </button>
        </div>
      </div>

      {/* Bottom Container */}
      <div className="bottom-container">
        <div className={`background-extension ${isBackgroundExtended ? 'extended' : ''}`}></div>
      </div>
    </div>
  );
};

export default Slider;