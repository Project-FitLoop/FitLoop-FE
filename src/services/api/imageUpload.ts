import { instance } from "@/config/apiConfig";

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  try {
    const response = await instance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrls;
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    alert("이미지 업로드 중 오류가 발생했습니다.");
    return [];
  }
};
