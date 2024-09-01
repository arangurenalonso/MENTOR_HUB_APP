import {
  RegisterOptions,
  FieldValues,
  FieldPathValue,
  Path,
} from 'react-hook-form';
import { ControlledFieldEnum } from './controlledTypeField';
import { ElementType } from 'react';
import { OptionProperties } from '../select/SelectControlledField';
import { DependentField } from '../common/BaseControlledField';

type FieldBaseType<T extends FieldValues, K = any> = {
  type: ControlledFieldEnum;

  dependentFields?: DependentField<T>[];
  name: Path<T>;
  disabled?: boolean;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  //Etiqueta del campo
  label?: string;
  helperText?: string;
  informationText?: string;

  //Values to set
  valueToSet?: any;

  //Valores Opcionales dependiendo del tipo de campo
  optionalName?: Path<T>;
  placeholder?: string | null;
  icon?: ElementType;

  //Valores para setear el tamaño del campos
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;

  // Propiedades específicas para Select
  optionProps?: OptionProperties<T, K>;

  fieldArrayConfig?: any;
};
export default FieldBaseType;
