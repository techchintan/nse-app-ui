import { useQuery } from "react-query";
import { getUserProfileData } from "../services/auth/profile";

export default function useGetUserProfile() {
  const token = localStorage.getItem("token");
  return useQuery("userProfileData", async () => {
    const { data } = await getUserProfileData(token);
    return data;
  });
}
