import React from "react";
import Information from "@/ui/components/personInfo/information";

const PersonInfoPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[color:var(--bg-white)]"
    >
      <div className="w-full max-w-[400px]">
        <Information />
      </div>
    </div>
  );
};

export default PersonInfoPage;
