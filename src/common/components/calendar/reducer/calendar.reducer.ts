export interface Slots {
  [key: string]: boolean;
}

export interface CalendarState {
  isDragging: boolean;
  initialSlots: Slots;
  internalSlots: Slots;
  wasPreviouslySelected?: boolean;
  dayOfWeekSelected?: string;
}

export const INITIAL_CALENDAR_STATE: CalendarState = {
  isDragging: false,
  initialSlots: {},
  internalSlots: {},
  wasPreviouslySelected: undefined,
  dayOfWeekSelected: undefined,
};
export enum CaledendarActionType {
  ON_MOUSE_DOWN = 'ON_MOUSE_DOWN',
  ON_MOUSE_UP = 'ON_MOUSE_UP',
  SET_SLOTS = 'SET_SLOTS',
  SET_AVAILABLE_SLOTS = 'SET_AVAILABLE_SLOTS',
  RESET = 'RESET',
}

type CalendarAction =
  | {
      type: CaledendarActionType.ON_MOUSE_DOWN;
      payload: {
        startTimeSelected: string;
        finalTimeSelected: string;
        dayOfWeekSelected: string;
      };
    }
  | {
      type: CaledendarActionType.ON_MOUSE_UP;
      payload: {};
    }
  | {
      type: CaledendarActionType.SET_SLOTS;
      payload: Slots;
    }
  | {
      type: CaledendarActionType.SET_AVAILABLE_SLOTS;
      payload: { startTime: string; finalTime: string; dayOfWeek: string };
    }
  | {
      type: CaledendarActionType.RESET;
      payload: {};
    };

export const calendarReducer = (
  state: CalendarState,
  action: CalendarAction
): CalendarState => {
  switch (action.type) {
    case CaledendarActionType.ON_MOUSE_DOWN:
      const { startTimeSelected, finalTimeSelected, dayOfWeekSelected } =
        action.payload;
      const keySelected = `${dayOfWeekSelected}_${startTimeSelected}_${finalTimeSelected}`;
      const wasPreviouslySelected = state.internalSlots[keySelected];
      return {
        ...state,
        isDragging: true,
        dayOfWeekSelected,
        wasPreviouslySelected,
      };
    case CaledendarActionType.ON_MOUSE_UP:
      return { ...state, isDragging: false };
    case CaledendarActionType.SET_SLOTS:
      const slots = action.payload;
      return {
        ...state,
        initialSlots: slots,
        internalSlots: slots,
      };
    case CaledendarActionType.SET_AVAILABLE_SLOTS:
      if (!state.isDragging) {
        return state;
      }
      const { dayOfWeek, startTime, finalTime } = action.payload;
      const key = `${
        state.dayOfWeekSelected || dayOfWeek
      }_${startTime}_${finalTime}`;
      return {
        ...state,
        internalSlots: {
          ...state.internalSlots,
          [key]: !state.wasPreviouslySelected,
        },
      };
    case CaledendarActionType.RESET:
      return {
        ...state,
        internalSlots: state.initialSlots,
      };

    default:
      return state;
  }
};
