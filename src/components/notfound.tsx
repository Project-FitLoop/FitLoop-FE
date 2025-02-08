"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const NotFoundAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/404.json") // public 폴더에서 JSON 불러오기
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  if (!animationData) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: "400px", height: "400px" }} // 크기 조절
      />
    </div>
  );
};

export default NotFoundAnimation;
