import type { StoreSlice } from "../types";

export type IFileState = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const createFileSlice: StoreSlice<IFileState> = (set) => ({
  file: null,
  setFile: (file: File | null) => set({ file }),
});

export default createFileSlice;
