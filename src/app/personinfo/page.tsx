import React from "react";
import Information from "@/ui/components/personInfo/information";

const PersonInfoPage: React.FC = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Information />
    </div>
  );
};

export default PersonInfoPage;
