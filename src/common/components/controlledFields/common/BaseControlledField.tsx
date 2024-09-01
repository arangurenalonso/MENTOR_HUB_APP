import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  UseFormWatch,
} from 'react-hook-form';
import useDependedField from './useDependedField';
import { useEffect } from 'react';

export type DependentField<T extends FieldValues> =
  | Path<T>
  | { field: Path<T>; value: any };

type BaseControlledFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  defaultValue?: any;
  rules?: any;
  disabled?: boolean;
  render: (props: {
    value: any;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
    error: FieldError | undefined;
    disabled?: boolean;
  }) => React.ReactElement;
  valueToSet?: any;
};

const BaseControlledField = <T extends FieldValues>({
  name,
  control,
  watch,
  dependentFields,
  defaultValue,
  rules,
  disabled,
  render,
  valueToSet,
}: BaseControlledFieldProps<T>) => {
  const { allFieldsHaveValues } = useDependedField<T>({
    name,
    control,
    watch,
    dependentFields,
  });

  if (!allFieldsHaveValues) {
    return null;
  }

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      control={control}
      disabled={disabled}
      render={({
        field: { value, onChange, onBlur, name, ref },
        fieldState: { error },
      }) => {
        useEffect(() => {
          if (valueToSet) {
            onChange(valueToSet);
          }
        }, [valueToSet]);
        return render({
          value,
          onChange,
          onBlur,
          name,
          ref,
          error: error,
          disabled: disabled,
        });
      }}
    />
  );
};

export default BaseControlledField;
