"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BackButtonProps {
  imageSrc?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  imageSrc = "/assets/common/left-arrow.svg",
  className = "",
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center text-lg font-bold text-gray-800 ${className}`}
    >
      <Image src={imageSrc} alt="뒤로 가기" width={20} height={20} className="mr-2" />
    </button>
  );
};

export default BackButton;
