import type { paths } from "@reservoir0x/reservoir-sdk";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { MAX_SELECTED_ITEMS } from "@/hooks/useNftSelection";
import { useUIStore } from "@/providers/UIStoreProvider";
import { XIcon } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { Badge, Button } from "@realms-world/ui";

type L1orL2Tokens =
  | NonNullable<
      paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"]["tokens"]
    >
  | RouterOutputs["erc721Tokens"]["all"]["items"];

export const NftActions = ({
  selectedTokenIds,
  selectBatchNfts,
  totalSelectedNfts,
  tokens,
  deselectAllNfts,
}: {
  selectedTokenIds: string[];
  selectBatchNfts: (tokens: L1orL2Tokens) => void;
  totalSelectedNfts: number;
  tokens: L1orL2Tokens;
  deselectAllNfts: () => void;
}) => {
  const { toggleNftBridge, setNftBridgeModalProps } = useUIStore(
    (state) => state,
  );
  const isAllSelected =
    totalSelectedNfts === MAX_SELECTED_ITEMS ||
    totalSelectedNfts === tokens?.length;
  const hasMoreThanMaxSelectNfts = (tokens?.length ?? 0) > MAX_SELECTED_ITEMS;
  return (
    <div className="my-2 flex w-full justify-between">
      <div className="flex items-center gap-x-4">
        <span className="text-lg">Actions:</span>
        <Button
          onClick={() => {
            setNftBridgeModalProps({
              selectedTokenIds: selectedTokenIds,
              sourceChain: SUPPORTED_L1_CHAIN_ID,
            });
            toggleNftBridge();
            /*writeAsync({
                tokenIds: selectedTokenIds.map((id) => BigInt(id)),
                l2Address,
              })*/
          }}
          disabled={totalSelectedNfts < 1}
        >
          Bridge
        </Button>
      </div>
      <div className="flex items-center gap-x-4">
        <Badge variant={"outline"} className="h-6 font-bold">
          {totalSelectedNfts} Realms
        </Badge>

        {isAllSelected ? (
          <Button
            variant={"secondary"}
            className="flex"
            onClick={deselectAllNfts}
            size="sm"
          >
            Deselect All
            <XIcon className="ml-2" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              selectBatchNfts(tokens ?? []);
            }}
            color="default"
            size="sm"
          >
            <span>
              {hasMoreThanMaxSelectNfts ? "Select 30 Max" : "Select All"}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};