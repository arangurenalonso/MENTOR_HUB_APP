import { ChangeEvent, useCallback, useEffect, useReducer, useRef } from 'react';
import { Box, Grid, Typography, Slider, IconButton } from '@mui/material';
import CropIcon from '@mui/icons-material/Crop';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from './utils/image.utils';
import { PhotoCamera } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  imageReducer,
  initialImageInitialState,
  ImageActionType,
  ImageStatusEnum,
} from './image-selector.reducer';
import ImagePlaceholder from './ImagePlaceholder';
type ImageSelectorProps = {
  onChange: (file?: File | null | undefined) => void;
};

const ImageSelector = ({ onChange }: ImageSelectorProps) => {
  const [state, dispatch] = useReducer(imageReducer, initialImageInitialState);
  const {
    status,
    selectedImage,
    previewUrl,
    crop,
    zoom,
    croppedAreaPixels,
    croppedImage,
  } = state;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null); // Referencia al enlace de descarga

  useEffect(() => {
    if (!croppedImage) {
      onChange(null);
      return;
    }
    handleOnChange();
  }, [croppedImage]);
  useEffect(() => {
    if (previewUrl === null) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [previewUrl]);
  // Manejar la selección de imagen
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Entro');

    const file = event.target.files?.[0] || null;
    if (file) {
      dispatch({ type: ImageActionType.SELECT_IMAGE, payload: { file: file } });
    }
  };

  // Obtener el área recortada
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      dispatch({
        type: ImageActionType.SET_CROPPED_AREA_PIXELS,
        payload: { croppedAreaPixels },
      });
    },
    []
  );

  // Manejar la confirmación del recorte
  const handleCrop = async () => {
    if (!previewUrl || !croppedAreaPixels) return;

    try {
      const croppedImg = await getCroppedImg(previewUrl, croppedAreaPixels);
      dispatch({
        type: ImageActionType.SET_CROPPED_IMAGE,
        payload: { croppedImg: croppedImg },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnClickImagePlaceholder = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const restart = () => {
    dispatch({
      type: ImageActionType.RESET,
    });
  };
  const handleOnChange = async () => {
    if (!croppedImage || !selectedImage) return;
    const blob = await fetch(croppedImage).then((res) => res.blob());
    const originalFileName = selectedImage.name;
    const mimeType = selectedImage.type;

    const file = new File([blob], originalFileName, {
      type: mimeType,
      lastModified: Date.now(),
    });
    onChange(file);
    const url = URL.createObjectURL(blob);
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = originalFileName;
    }
  };
  return (
    <>
      <Grid container>
        <Grid item xs>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              {croppedImage ? (
                <Box
                  component="img"
                  src={croppedImage}
                  alt="Cropped Image"
                  sx={{
                    width: '100%',
                    minHeight: 200,
                    maxHeight: 400,
                    objectFit: 'contain',
                    border: '2px solid #333',
                    borderRadius: 2,
                  }}
                />
              ) : previewUrl ? (
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 375,
                        backgroundColor: '#333',
                      }}
                    >
                      <Cropper
                        image={previewUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={750 / 422}
                        onCropChange={(crop) => {
                          dispatch({
                            type: ImageActionType.SET_CROP,
                            payload: { crop: crop },
                          });
                        }}
                        onZoomChange={(zoom) => {
                          dispatch({
                            type: ImageActionType.SET_ZOOM,
                            payload: { zoom: zoom },
                          });
                        }}
                        onCropComplete={onCropComplete}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography>Zoom</Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e, zoomValue) =>
                        dispatch({
                          type: ImageActionType.SET_ZOOM,
                          payload: { zoom: Number(zoomValue) },
                        })
                      }
                    />
                  </Grid>
                </Grid>
              ) : (
                <ImagePlaceholder onCLick={handleOnClickImagePlaceholder} />
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {status === ImageStatusEnum.INIT && (
              <IconButton
                color="success"
                onClick={handleOnClickImagePlaceholder}
              >
                <PhotoCamera />
              </IconButton>
            )}
            {status === ImageStatusEnum.CROPPPING && (
              <IconButton color="success" onClick={handleCrop}>
                <CropIcon />
              </IconButton>
            )}
            {(status === ImageStatusEnum.CROPPPING ||
              status === ImageStatusEnum.FINISH) && (
              <IconButton color="warning" onClick={restart}>
                <RestartAltIcon />
              </IconButton>
            )}

            {/* <Button variant="contained" color="primary">
              <a
                ref={downloadLinkRef}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Descargar Imagen
              </a>
            </Button> */}
          </Box>
        </Grid>
      </Grid>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
        ref={fileInputRef} // Referencia al input de archivo
      />
    </>
  );
};

export default ImageSelector;
