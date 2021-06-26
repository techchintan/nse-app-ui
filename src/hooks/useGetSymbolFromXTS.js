import { useQuery } from "react-query";
import { callMasterAPI } from "../services/XTSConnection";

export default function useGetSymbolFromXTS(symbols = null) {
  return useQuery("getSymbolFromXTS", async () => {
    if (symbols) {
      const { data } = await callMasterAPI(symbols);
      return data;
    } else {
      return null;
    }
  });
}
