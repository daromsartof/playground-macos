import { create } from "zustand";
import { createSystemSlice, type SystemSlice } from "./slices/system";
import { createUserSlice, type UserSlice } from "./slices/user";

export const useStore = create<SystemSlice & UserSlice>((...a) => ({
  ...createSystemSlice(...a),
  ...createUserSlice(...a)
}));
