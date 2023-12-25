import type { ITestState, StoreSlice } from "../types";

const createTestSlice: StoreSlice<ITestState> = (set) => ({
  isTest: false,
  setIsTest: () => set({ isTest: true }),
});

export default createTestSlice;
