import type { StateCreator } from "zustand";
import type { getState, setState } from ".";
import type { IFileState } from "./slices/createFileSlice";

export type IGetState = typeof getState;
export type ISetState = typeof setState;

export interface ITestState {
  isTest: boolean;
  setIsTest: () => void;
}

export type IState = ITestState & IFileState;

export type StoreSlice<T> = StateCreator<
  IState,
  [["zustand/devtools", never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];
