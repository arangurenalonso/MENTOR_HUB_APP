export interface SelectState<T> {
  internalValue: T[keyof T] | null | undefined;
  originalOptions: T[];
  internalOptions: T[];
  searchTerm: string;
  isOpenSelect: boolean;
  isXsScreen: boolean;
  isModalOpen: boolean;
}

export enum SelectActionType {
  SET_VALUE = 'SET_VALUE',
  SET_OPTIONS = 'SET_OPTIONS',
  SET_SEARCH_TERM = 'SET_SEARCH_TERM',
  SET_OPEN_SELECT = 'SET_OPEN_SELECT',
  SET_CLOSE_SELECT = 'SET_CLOSE_SELECT',
  RESET_SELECT = 'RESET_SELECT',
  SET_XS_SCREEN = 'SET_XS_SCREEN',
}

type SelectAction<T> =
  | {
      type: SelectActionType.SET_VALUE;
      payload: {
        value?: T[keyof T] | null | undefined;
        searchKey: keyof T;
      };
    }
  | {
      type: SelectActionType.SET_OPTIONS;
      payload: { options: T[]; valueProperty: keyof T };
    }
  | {
      type: SelectActionType.SET_SEARCH_TERM;
      payload: { searchTerm: string; onFormatValue: (option: T) => string };
    }
  | { type: SelectActionType.SET_OPEN_SELECT }
  | { type: SelectActionType.SET_CLOSE_SELECT }
  | { type: SelectActionType.RESET_SELECT }
  | { type: SelectActionType.SET_XS_SCREEN; payload: boolean };

export const selectReducer = <T extends Record<string, any>>(
  state: SelectState<T>,
  action: SelectAction<T>
): SelectState<T> => {
  switch (action.type) {
    case SelectActionType.SET_VALUE:
      const { value, searchKey } = action.payload;
      const existSelection = state.internalOptions.find(
        (option) => option[searchKey] === value
      ) as T;
      if (existSelection) {
        return { ...state, internalValue: value };
      }
      return { ...state, internalValue: undefined };
    case SelectActionType.SET_OPTIONS:
      const actualValue = state.internalValue;
      const { options, valueProperty } = action.payload;

      const autoValue =
        options.length === 1 ? options[0][valueProperty] : undefined;

      if (autoValue !== undefined) {
        return {
          ...state,
          internalOptions: options,
          internalValue: autoValue,
        };
      }

      const isValueInOptions = options.some(
        (option) => option[valueProperty] === actualValue
      );

      return {
        ...state,
        internalOptions: options,
        originalOptions: options,
        internalValue: isValueInOptions ? state.internalValue : undefined,
      };
    case SelectActionType.SET_SEARCH_TERM:
      const { searchTerm, onFormatValue } = action.payload;

      const filteredInternalOptions = state.originalOptions.filter((option) => {
        return onFormatValue(option)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      return {
        ...state,
        searchTerm: searchTerm,
        internalOptions: filteredInternalOptions,
        internalValue: undefined,
      };

    case SelectActionType.SET_OPEN_SELECT:
      if (state.isXsScreen) {
        return { ...state, isModalOpen: true };
      }
      return { ...state, isOpenSelect: true };
    case SelectActionType.SET_CLOSE_SELECT:
      return {
        ...state,
        isOpenSelect: false,
        isModalOpen: false,
        searchTerm: '',
        internalOptions: state.originalOptions,
      };
    case SelectActionType.RESET_SELECT:
      return {
        ...state,
        internalValue: undefined,
        searchTerm: '',
        isOpenSelect: false,
        internalOptions: state.originalOptions,
      };
    case SelectActionType.SET_XS_SCREEN:
      const isSelectOpen = state.isOpenSelect || state.isModalOpen;
      if (action.payload) {
        return {
          ...state,
          isXsScreen: action.payload,
          isModalOpen: isSelectOpen,
          isOpenSelect: false,
        };
      }
      return {
        ...state,
        isXsScreen: action.payload,
        isModalOpen: false,
        isOpenSelect: isSelectOpen,
      };
    default:
      return state;
  }
};
