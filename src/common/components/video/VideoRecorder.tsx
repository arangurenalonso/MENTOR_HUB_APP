import { useReducer, useEffect, useRef } from 'react';
import { RecordRTCPromisesHandler } from 'recordrtc';
import useMediaDevices from '../../../hooks/useMediaDevices';
import { Typography, Box, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PlayArrow, Stop, Pause, Replay } from '@mui/icons-material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
  VideoRecorderInitialState,
  VideoRecorderStatusEnum,
  videoRecorderReducer,
  VideoRecorderActionType,
} from './video-recorder.reducer';

const initialState: VideoRecorderInitialState = {
  status: VideoRecorderStatusEnum.INIT,
  recorder: null,
  recordedBlob: null,
  recordedUrlBlob: null,
  countdown: null,
  error: null,
};

type VideoRecorderProps = {
  onChange: (file?: File | null | undefined) => void;
};

const VideoRecorder = ({ onChange }: VideoRecorderProps) => {
  const {
    stream,
    //  permissionGranted
  } = useMediaDevices();
  const [
    { status, recorder, recordedBlob, recordedUrlBlob, countdown, error },
    dispatch,
  ] = useReducer(videoRecorderReducer, initialState);

  const videoRef = useRef<HTMLVideoElement>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const theme = useTheme();

  useEffect(() => {
    if (countdown === 0) {
      if (countdownIntervalRef?.current) {
        clearInterval(countdownIntervalRef.current);
      }
      initiateRecording();
    }
  }, [countdown]);

  useEffect(() => {
    return () => {
      cleanObjects();
    };
  }, []);

  useEffect(() => {
    if (!recordedBlob) {
      onChange(null);
      return;
    }
    const file = new File([recordedBlob], 'recorded-video.mp4', {
      type: 'video/mp4',
      lastModified: Date.now(),
    });

    onChange(file);
  }, [recordedBlob]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [recordedUrlBlob]);
  const cleanObjects = async () => {
    if (recorder) {
      await recorder.destroy();
    }
    if (recordedUrlBlob) {
      URL.revokeObjectURL(recordedUrlBlob);
    }
    if (countdownIntervalRef?.current) {
      clearInterval(countdownIntervalRef.current);
    }
  };
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  const startRecording = async () => {
    if (stream) {
      dispatch({
        type: VideoRecorderActionType.PREPARING_TO_RECORD,
      });
      countdownIntervalRef.current = window.setInterval(() => {
        dispatch({
          type: VideoRecorderActionType.REDUCE_COUNT_DOWN,
        });
      }, 1000);
    }
  };
  const initiateRecording = async () => {
    console.log('initiateRecording');

    try {
      if (stream) {
        const newRecorder = new RecordRTCPromisesHandler(stream, {
          type: 'video',
          mimeType: 'video/mp4',
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
          disableLogs: true,
        });
        await newRecorder.startRecording();
        dispatch({
          type: VideoRecorderActionType.RECORDING,
          payload: { recorder: newRecorder },
        });
      }
    } catch (error) {
      await cleanObjects();
      dispatch({
        type: VideoRecorderActionType.RECORDING_FAILURE,
        payload: 'Error starting the recording.',
      });
    }
  };
  // Pausar la grabación
  const pauseRecording = async () => {
    if (recorder) {
      await recorder.pauseRecording();
      dispatch({
        type: VideoRecorderActionType.PAUSE_RECORDING,
      });
    }
  };

  // Reanudar la grabación
  const resumeRecording = async () => {
    if (recorder) {
      await recorder.resumeRecording();
      dispatch({
        type: VideoRecorderActionType.RESUME,
      });
    }
  };

  // Detener la grabación
  const stopRecording = async () => {
    try {
      if (recorder) {
        await recorder.stopRecording();

        const blob = await recorder.getBlob();
        await recorder.destroy();

        const correctedBlob = new Blob([blob], { type: 'video/mp4' });

        dispatch({
          type: VideoRecorderActionType.STOP_RECORDING,
          payload: { blob: correctedBlob },
        });
      }
    } catch (error) {
      await cleanObjects();
      dispatch({
        type: VideoRecorderActionType.RECORDING_FAILURE,
        payload: 'Error stopping the recording.',
      });
    }
  };

  // Descargar la grabación
  // const downloadRecording = () => {
  //   if (recordedUrlBlob) {
  //     const link = document.createElement('a');
  //     link.href = recordedUrlBlob;
  //     link.download = 'recording.webm';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  const restartRecording = () => {
    dispatch({
      type: VideoRecorderActionType.RESTART,
    });
  };
  return (
    <Grid container rowGap={1}>
      <Grid
        size={12}
        sx={{
          border: '2px solid black',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative',
          lineHeight: 0,
        }}
      >
        {status === VideoRecorderStatusEnum.RECORDING && (
          <RadioButtonCheckedIcon
            color="error"
            fontSize="large"
            sx={{ position: 'absolute', top: 0, right: 0, m: 2 }}
          />
        )}
        {recordedUrlBlob && (
          <video
            src={recordedUrlBlob}
            controls
            style={{
              width: '100%',
            }}
          />
        )}
        {!recordedUrlBlob && (
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: '100%',
            }}
          />
        )}
        {status === VideoRecorderStatusEnum.PREPARING_TO_RECORD && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: theme.palette.primary.main,
              opacity: 0.5,
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h1"
              sx={{ color: 'white', opacity: 1, fontWeight: 'bold' }}
            >
              {countdown}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid size={12}>
        {status === VideoRecorderStatusEnum.INIT && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={startRecording}
              color="primary"
              startIcon={<PlayArrow />}
            >
              Start recording
            </Button>
          </Box>
        )}
        {status === VideoRecorderStatusEnum.RECORDING && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={pauseRecording}
              startIcon={<Pause />}
            >
              Pause
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={stopRecording}
              startIcon={<Stop />}
            >
              Stop
            </Button>
          </Box>
        )}
        {status === VideoRecorderStatusEnum.PAUSE && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={resumeRecording}
              startIcon={<PlayArrow />}
            >
              Resume
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={stopRecording}
              startIcon={<Stop />}
            >
              Stop
            </Button>
          </Box>
        )}
        {status === VideoRecorderStatusEnum.STOP && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={restartRecording}
              startIcon={<Replay />}
            >
              Re-record
            </Button>
          </Box>
        )}
      </Grid>
      {error && (
        <Grid size={12}>
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoRecorder;
