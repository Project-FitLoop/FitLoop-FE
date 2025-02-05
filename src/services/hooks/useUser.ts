import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/services/api/user";
import { useEffect } from "react";

export const useUserInfo = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      console.error("사용자 정보 가져오기 실패:", error);
    }
  }, [error]);

  return { data, error, isLoading };
};
