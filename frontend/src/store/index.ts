/* eslint-disable @typescript-eslint/unbound-method */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Types
import type { IState } from "./types";
import createTestSlice from "./slices/createTestSlice";
import createFileSlice from "./slices/createFileSlice";

const useSlice = create<IState>()(
  devtools(
    (...a) => ({
      ...createTestSlice(...a),
      ...createFileSlice(...a),
    }),
    { name: "nezuko-client" },
  ),
);

export const getState = useSlice.getState;

export const setState = useSlice.setState;

export default useSlice;
