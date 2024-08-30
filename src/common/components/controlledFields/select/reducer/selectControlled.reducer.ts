import React from 'react';

export type SelectControlledState<K> = {
  options: K[];
  loading: boolean;
  error: React.ReactNode | null;
};
export enum SelectControlledActionType {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
}
type Action<K> =
  | { type: SelectControlledActionType.FETCH_INIT }
  | { type: SelectControlledActionType.FETCH_SUCCESS; payload: K[] }
  | {
      type: SelectControlledActionType.FETCH_FAILURE;
      payload: string;
    };

export const selectControlledReducer = <K>(
  state: SelectControlledState<K>,
  action: Action<K>
): SelectControlledState<K> => {
  switch (action.type) {
    case SelectControlledActionType.FETCH_INIT:
      return { ...state, loading: true, error: null, options: [] };
    case SelectControlledActionType.FETCH_SUCCESS:
      return { ...state, loading: false, options: action.payload, error: null };
    case SelectControlledActionType.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload, options: [] };
    default:
      throw new Error('Unhandled action type');
  }
};
