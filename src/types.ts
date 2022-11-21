 type  PokemonData = null | undefined | {
    name: string;
    image:string;
    types:string[];
    classification:string;
    maxCP: string;
    maxHP:string;
    weaknesses:string[];
}

type AsyncState<DataType> =
  | {
      status: "idle";
      data?: null;
      error?: null;
    }
  | {
      status: "pending";
      data?: null;
      error?: null;
    }
  | {
      status: "resolved";
      data: DataType;
      error: null;
    }
  | {
      status: "rejected";
      data: null;
      error: Error;
    };

type AsyncAction<DataType> =
  | { type: "pending" }
  | { type: "resolved"; data: DataType }
  | { type: "rejected"; error: Error }
  | { type?: never };


type AsyncReducer<DataType> = (state: AsyncState<DataType>, action: AsyncAction<DataType>) =>AsyncState<DataType>

  export type {
    PokemonData,
    AsyncState,
    AsyncAction,
    AsyncReducer
  }