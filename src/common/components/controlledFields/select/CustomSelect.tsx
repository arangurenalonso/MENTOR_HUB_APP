import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  Box,
  useTheme,
  IconButton,
  useMediaQuery,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { FocusEventHandler, useEffect, useReducer } from 'react';
import {
  SelectActionType,
  selectReducer,
  SelectState,
} from './reducer/select.reducer';
import SearchComponent from '../../SearchComponent';
import ClearIcon from '@mui/icons-material/Clear';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

interface CustomSelectProps<T> {
  label?: string;
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  options: T[];
  valueProperty: keyof T;
  value: T[keyof T];

  name?: string;
  inputRef?: React.Ref<HTMLSelectElement>;
  // valueToSet?: T[keyof T];

  valueToSet?: T[CustomSelectProps<T>['valueProperty']];
  onFormatValue: (option: T) => string;
  onChange: (value?: T[keyof T], selectedOption?: T) => void;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const INITIAL_STATE: SelectState<any> = {
  internalValue: undefined,
  internalOptions: [],
  originalOptions: [],
  searchTerm: '',
  isOpenSelect: false,
  isXsScreen: false,
  isModalOpen: false,
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomSelect = <T extends { [key: string]: any }>({
  label,
  error,
  errorMessage,
  disabled,
  options,
  valueProperty,
  // nameProperty,
  value,
  name,
  inputRef,
  valueToSet,
  onFormatValue,
  onChange,
  onBlur,
}: CustomSelectProps<T>) => {
  const [
    {
      internalValue,
      internalOptions,
      originalOptions,
      isOpenSelect,
      isXsScreen,
      isModalOpen,
    },
    dispatch,
  ] = useReducer(selectReducer<T>, INITIAL_STATE);

  const theme = useTheme();

  const xsScreenMatch = useMediaQuery(theme.breakpoints.only('xs'));

  useEffect(() => {
    dispatch({ type: SelectActionType.SET_XS_SCREEN, payload: xsScreenMatch });
  }, [xsScreenMatch]);

  useEffect(() => {
    dispatch({ type: SelectActionType.SET_VALUE, payload: value });
  }, [value]);

  useEffect(() => {
    if (valueToSet !== undefined && valueToSet !== null) {
      if (options.length > 0) {
        const firstOption = options[0];
        const valuePropertyType = typeof firstOption[valueProperty];
        const valueToSetType = typeof valueToSet;
        if (valuePropertyType !== valueToSetType) {
          console.log('Error', {
            valueToSet,
            valueToSetType,
            valuePropertyType,
          });

          throw new Error(
            `Type Mismatch Error: The type of 'valueToSet' (${valueToSetType}) does not match the expected type based on the 'valueProperty' of the options (${valuePropertyType}). Please ensure that the 'valueToSet' is of the correct type to match the selected property in the provided options array.`
          );
        }
      }
      dispatch({
        type: SelectActionType.SET_VALUE_TO_SET,
        payload: valueToSet,
      });
    }
  }, [valueToSet]);

  useEffect(() => {
    dispatch({
      type: SelectActionType.SET_OPTIONS,
      payload: { options, valueProperty: valueProperty },
    });
  }, [options]);

  const handleOnChange = (e: SelectChangeEvent<T[keyof T] | null>) => {
    const selectedValue = e.target.value as T[keyof T];
    const selectedOption = internalOptions.find(
      (option) => option[valueProperty] === selectedValue
    ) as T;

    dispatch({ type: SelectActionType.SET_VALUE, payload: selectedValue });

    onChange(selectedValue, selectedOption);
  };
  const handleOnChangeSerch = (searchTerm: string) => {
    dispatch({
      type: SelectActionType.SET_SEARCH_TERM,
      payload: { searchTerm, onFormatValue },
    });
  };

  const handleOpen = () => {
    dispatch({ type: SelectActionType.SET_OPEN_SELECT });
  };

  const handleClose = () => {
    dispatch({ type: SelectActionType.SET_CLOSE_SELECT });
  };
  const handleReset = () => {
    dispatch({ type: SelectActionType.RESET_SELECT });

    onChange(undefined, undefined);
  };
  return (
    <>
      <FormControl fullWidth error={error} disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={internalValue ?? ''}
          onChange={handleOnChange}
          onBlur={onBlur}
          label={label}
          onOpen={handleOpen}
          onClose={handleClose}
          open={isOpenSelect}
          inputRef={inputRef}
          name={name}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Ajustar la altura del menú si es necesario
                overflow: 'auto',
              },
            },
            // style: {
            //     zIndex: zIndexMenuDesplegable
            // },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return <em>Select an option</em>; // Cambia este mensaje por el que prefieras
            }
            const optionLabelText = () => {
              const selectedOption = originalOptions.find(
                (option) => option[valueProperty] === selected
              );
              return selectedOption ? onFormatValue(selectedOption) : selected;
            };

            return (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {optionLabelText()}
                </Box>
                <IconButton
                  aria-label="Clear"
                  edge="end"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onClick={handleReset}
                >
                  <ClearIcon color="error" />
                </IconButton>
              </Box>
            );
          }}
        >
          {originalOptions.length === 0 && (
            <MenuItem value="">No hay opciones disponibles</MenuItem>
          )}
          {originalOptions.length > 5 && (
            <Box
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: theme.palette.background.paper,
                zIndex: 1,
              }}
            >
              <SearchComponent onChange={handleOnChangeSerch} />
            </Box>
          )}
          {internalOptions.map((option: T) => (
            <MenuItem
              key={option[valueProperty] as string}
              value={option[valueProperty]}
            >
              {onFormatValue(option)}
            </MenuItem>
          ))}
        </Select>
        {errorMessage && (
          <FormHelperText sx={{ color: theme.palette.error.light }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        fullScreen={isXsScreen}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            maxHeight: '95%', // Limita la altura al 90% de la pantalla
            width: '95%', // Si también deseas controlar el ancho, puedes ajustar esto
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {label}
            </Box>
            <IconButton
              aria-label="Clear"
              edge="end"
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={handleClose}
            >
              <ClearIcon color="error" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          {originalOptions.length > 5 && (
            <Box
              style={{
                position: 'sticky',
                top: 0,

                backgroundColor: theme.palette.background.paper,
                zIndex: 1,
              }}
              sx={{ py: 1, width: '100%' }}
            >
              <SearchComponent onChange={handleOnChangeSerch} />
            </Box>
          )}
          {internalOptions.map((option: T) => (
            <MenuItem
              key={option[valueProperty] as string}
              value={option[valueProperty]}
              onClick={() => {
                handleOnChange({
                  target: { value: option[valueProperty] },
                } as SelectChangeEvent<T[keyof T]>);
                handleClose();
              }}
            >
              {onFormatValue(option)}
            </MenuItem>
          ))}
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default CustomSelect;
