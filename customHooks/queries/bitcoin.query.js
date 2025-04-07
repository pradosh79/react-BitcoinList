import { useQuery } from "@tanstack/react-query";
import { bitcoinListFn } from "../../api/functions/bitcoin.list";

export const bitcoinListQuery = () => {
  return useQuery({
    queryKey: ["BITCOIN_LIST"],
    queryFn: bitcoinListFn,
  });
};




