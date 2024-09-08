import { Area, Point } from 'react-easy-crop';

export enum ImageStatusEnum {
  INIT = 'Init',
  IMAGE_SELECTED = 'IMAGE_SELECTED',
  CROPPPING = 'CROPPPING',
  FINISH = 'FINISH',
  ERROR = 'Error',
}

export interface ImageInitialStateType {
  status: ImageStatusEnum;
  selectedImage: File | null;
  previewUrl: string | null;
  crop: { x: number; y: number };
  zoom: number;
  croppedAreaPixels: any;
  croppedImage: string | null;
}

export const initialImageInitialState: ImageInitialStateType = {
  status: ImageStatusEnum.INIT,
  selectedImage: null,
  previewUrl: null,
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: null,
  croppedImage: null,
};
export enum ImageActionType {
  SELECT_IMAGE = 'SELECT_IMAGE',
  SET_CROP = 'SET_CROP',
  SET_ZOOM = 'SET_ZOOM',
  SET_CROPPED_AREA_PIXELS = 'SET_CROPPED_AREA_PIXELS',
  SET_CROPPED_IMAGE = 'SET_CROPPED_IMAGE',
  RESET = 'RESET',
}

type ImageSelectorAction =
  | {
      type: ImageActionType.SELECT_IMAGE;
      payload: { file: File };
    }
  | {
      type: ImageActionType.SET_CROP;
      payload: { crop: Point };
    }
  | {
      type: ImageActionType.SET_ZOOM;
      payload: { zoom: number };
    }
  | {
      type: ImageActionType.SET_CROPPED_AREA_PIXELS;
      payload: { croppedAreaPixels: Area };
    }
  | {
      type: ImageActionType.SET_CROPPED_IMAGE;
      payload: { croppedImg: string };
    }
  | {
      type: ImageActionType.RESET;
    };
export const imageReducer = (
  state: ImageInitialStateType,
  action: ImageSelectorAction
): ImageInitialStateType => {
  switch (action.type) {
    case ImageActionType.SELECT_IMAGE:
      const { file } = action.payload;
      return {
        ...state,
        status: ImageStatusEnum.IMAGE_SELECTED,
        selectedImage: file,
        previewUrl: URL.createObjectURL(file),
      };
    case ImageActionType.SET_CROP:
      const { crop } = action.payload;
      return {
        ...state,
        status: ImageStatusEnum.CROPPPING,
        crop: crop,
      };
    case ImageActionType.SET_ZOOM:
      const { zoom } = action.payload;
      return {
        ...state,
        status: ImageStatusEnum.CROPPPING,
        zoom: zoom,
      };
    case ImageActionType.SET_CROPPED_AREA_PIXELS:
      const { croppedAreaPixels } = action.payload;
      return {
        ...state,
        croppedAreaPixels: croppedAreaPixels,
      };
    case ImageActionType.SET_CROPPED_IMAGE:
      const { croppedImg } = action.payload;
      return {
        ...state,
        status: ImageStatusEnum.FINISH,
        croppedImage: croppedImg,
      };
    case ImageActionType.RESET:
      return {
        ...initialImageInitialState,
      };

    default:
      throw new Error('Unhandled action type');
  }
};
