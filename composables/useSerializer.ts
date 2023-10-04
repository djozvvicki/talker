import { Serializer } from "@vueuse/core";
import type { Nullable } from "~/types/global";

export const useSerializer = <T>(): Serializer<Nullable<T>> => {
  return {
    read: (raw: string) => {
      return JSON.parse(raw) as Nullable<T>;
    },
    write: (val) => {
      return JSON.stringify(val);
    },
  };
};
