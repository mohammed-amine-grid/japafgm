import { useReducer, useEffect } from "react";
import { AsyncAction, AsyncState, AsyncReducer } from "../types";

export default function useAsync<DataType>(
  asyncCallback: () => Promise<DataType> | undefined,
  asyncReducer: AsyncReducer<DataType>,
  deps: Array<unknown>
) {
  const [state, dispatch] = useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    const promise = asyncCallback();
    if (!promise) {
      return;
    }
    dispatch({ type: "pending" });
    promise.then(
      (data) => {
        dispatch({ type: "resolved", data });
      },
      (error) => {
        dispatch({ type: "rejected", error });
      }
    );
  }, deps);

  return state;
}
