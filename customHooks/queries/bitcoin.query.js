import { useQuery } from "@tanstack/react-query";
import { bitcoinListFn } from "../../api/functions/bitcoin.list";

export const bitcoinListQuery = (APIKey) => {
  return useQuery({
    queryKey: ["BITCOIN_LIST",APIKey],
    //queryFn: bitcoinListFn,
    queryFn: () => bitcoinListFn(APIKey),
  });
};




