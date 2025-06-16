import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const carRef = useRef(null);

  useEffect(() => {
    const car = carRef.current;

    gsap.to(car, {
      rotation: 360,
      duration: 5,
      ease: "linear",
      repeat: -1,
      transformOrigin: "400px 300px", // mərkəz nöqtəsi
    });
  }, []);

  return (
    <svg
      viewBox="0 0 800 600"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#3F51B5" }}
    >
      {/* Dairə mərkəzi */}
      <circle cx="400" cy="300" r="130" stroke="#fff" strokeWidth="2" fill="none" />

      {/* Car qrupu */}
      <g ref={carRef} fill="#fff" transform="translate(400,300)">
        {/* Maşını yuxarı radius qədər yerləşdiririk */}
        <g transform="translate(0, -130)">
          <path
            d="M45.6,16.9l0-11.4c0-3-1.5-5.5-4.5-5.5L3.5,0C0.5,0,0,1.5,0,4.5l0,13.4c0,3,0.5,4.5,3.5,4.5l37.6,0
              C44.1,22.4,45.6,19.9,45.6,16.9z M31.9,21.4l-23.3,0l2.2-2.6l14.1,0L31.9,21.4z M34.2,21c-3.8-1-7.3-3.1-7.3-3.1l0-13.4l7.3-3.1
              C34.2,1.4,37.1,11.9,34.2,21z M6.9,1.5c0-0.9,2.3,3.1,2.3,3.1l0,13.4c0,0-0.7,1.5-2.3,3.1C5.8,19.3,5.1,5.8,6.9,1.5z M24.9,3.9
              l-14.1,0L8.6,1.3l23.3,0L24.9,3.9z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Loader;
