import { RecordRTCPromisesHandler } from 'recordrtc';

export enum VideoRecorderStatusEnum {
  INIT = 'Init',
  PREPARING_TO_RECORD = 'PREPARING_TO_RECORD',
  RECORDING = 'Recording',
  PAUSE = 'Pause',
  STOP = 'Stop',
  ERROR = 'Error',
}

// Definir el estado para el VideoRecorder
export type VideoRecorderInitialState = {
  status: VideoRecorderStatusEnum;
  recorder: RecordRTCPromisesHandler | null;
  recordedBlob: Blob | null;
  recordedUrlBlob: string | null;
  countdown: number | null;
  error: string | null;
};

// Definir los tipos de acciones para el reducer
export enum VideoRecorderActionType {
  PREPARING_TO_RECORD = 'PREPARING_TO_RECORD',
  REDUCE_COUNT_DOWN = 'REDUCE_COUNT_DOWN',
  RECORDING = 'START_RECORDING',
  PAUSE_RECORDING = 'PAUSE_RECORDING',
  RESUME = 'RESUME',
  STOP_RECORDING = 'STOP_RECORDING',
  RESTART = 'RESTART',
  RECORDING_FAILURE = 'RECORDING_FAILURE',
}

type Action =
  | {
      type: VideoRecorderActionType.PREPARING_TO_RECORD;
    }
  | {
      type: VideoRecorderActionType.REDUCE_COUNT_DOWN;
    }
  | {
      type: VideoRecorderActionType.RECORDING;
      payload: { recorder: RecordRTCPromisesHandler };
    }
  | {
      type: VideoRecorderActionType.PAUSE_RECORDING;
    }
  | {
      type: VideoRecorderActionType.RESUME;
    }
  | { type: VideoRecorderActionType.STOP_RECORDING; payload: { blob: Blob } }
  | { type: VideoRecorderActionType.RESTART }
  | { type: VideoRecorderActionType.RECORDING_FAILURE; payload: string };

// El reducer que manejará los diferentes estados de la grabación
export const videoRecorderReducer = (
  state: VideoRecorderInitialState,
  action: Action
): VideoRecorderInitialState => {
  switch (action.type) {
    case VideoRecorderActionType.PREPARING_TO_RECORD:
      return {
        ...state,
        status: VideoRecorderStatusEnum.PREPARING_TO_RECORD,
        countdown: 3,
      };
    case VideoRecorderActionType.REDUCE_COUNT_DOWN:
      return {
        ...state,
        countdown: (state?.countdown || 3) - 1,
      };
    case VideoRecorderActionType.RECORDING:
      const { recorder } = action.payload;
      return {
        ...state,
        status: VideoRecorderStatusEnum.RECORDING,
        recorder: recorder,
        recordedBlob: null,
        recordedUrlBlob: null,
        countdown: null,
        error: null,
      };
    case VideoRecorderActionType.PAUSE_RECORDING:
      return {
        ...state,
        status: VideoRecorderStatusEnum.PAUSE,
      };
    case VideoRecorderActionType.RESUME:
      return {
        ...state,
        status: VideoRecorderStatusEnum.RECORDING,
      };
    case VideoRecorderActionType.STOP_RECORDING:
      const { blob } = action.payload;

      const blobUrl = URL.createObjectURL(blob);
      return {
        ...state,
        status: VideoRecorderStatusEnum.STOP,
        recorder: null,
        recordedBlob: blob,
        recordedUrlBlob: blobUrl,
        countdown: null,
        error: null,
      };
    case VideoRecorderActionType.RESTART:
      if (state.recordedUrlBlob) {
        URL.revokeObjectURL(state.recordedUrlBlob);
      }
      return {
        ...state,
        status: VideoRecorderStatusEnum.INIT,
        recorder: null,
        recordedBlob: null,
        recordedUrlBlob: null,
        countdown: null,
        error: null,
      };
    case VideoRecorderActionType.RECORDING_FAILURE:
      if (state.recordedUrlBlob) {
        URL.revokeObjectURL(state.recordedUrlBlob);
      }
      return {
        ...state,
        status: VideoRecorderStatusEnum.ERROR,
        recorder: null,
        recordedBlob: null,
        recordedUrlBlob: null,
        countdown: null,
        error: action.payload,
      };
    default:
      throw new Error('Unhandled action type');
  }
};
