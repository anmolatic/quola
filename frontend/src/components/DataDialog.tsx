import type { DataPayload } from "@/types";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Props = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  ocrData: DataPayload | null;
};

const DataDialog: React.FC<Props> = ({ ocrData, open, handleOpenChange }) => {
  if (!ocrData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Data</DialogTitle>
          <DialogDescription>
            Based on your uploaded image, we have extracted the following data.
            Some Data might not reflect accurately you can update it manually
            later.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          {Object.entries(ocrData).map(([key, value]) => {
            let customKey = key;

            if (key === "thaiIdNumber") {
              customKey = "Identification Number";
            }

            return (
              <div
                className="grid cursor-pointer grid-cols-2 items-center gap-4 rounded-md border-[1px] p-2 font-mono text-gray-500 transition-all duration-100 hover:bg-slate-500 hover:text-white"
                key={customKey}
              >
                <div className=" text-sm font-medium capitalize ">
                  {customKey}
                </div>
                <div className="text-center text-sm font-medium">{value}</div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataDialog;
