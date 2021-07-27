// @flow
import { useReducer, useEffect } from "react";
import type { AvailableProvider } from "./types";
import { getProviders } from "./index";
import sortProvidersByWeight from "./sortProvidersByWeight";

type State = {
  isLoading: boolean,
  error: ?Error,
  providers: ?Array<AvailableProvider>,
};

type ActionType =
  | { type: "SAVE_DATA", payload: $PropertyType<State, "providers"> }
  | { type: "SAVE_ERROR", payload: $PropertyType<State, "error"> };

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "SAVE_DATA":
      return { error: null, providers: action.payload, isLoading: false };
    case "SAVE_ERROR":
      return { error: action.payload, providers: null, isLoading: false };
    default:
      throw new Error("Uncorrect action type");
  }
};

export const initialState = { isLoading: true, error: null, providers: null };

const filterDisabledProviders = (provider: AvailableProvider) =>
  !process.env.SWAP_DISABLED_PROVIDERS?.includes(provider.provider);

export const useSwapProviders = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const saveProviders = async () => {
      try {
        const allProviders = await getProviders();
        const providers = allProviders
          .filter(filterDisabledProviders)
          .sort(sortProvidersByWeight);

        if (isMounted) dispatch({ type: "SAVE_DATA", payload: providers });
      } catch (error) {
        if (isMounted) dispatch({ type: "SAVE_ERROR", payload: error });
      }
    };

    saveProviders();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};