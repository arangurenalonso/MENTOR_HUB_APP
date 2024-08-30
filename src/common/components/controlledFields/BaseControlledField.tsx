import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  UseFormWatch,
} from 'react-hook-form';

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
}: BaseControlledFieldProps<T>) => {
  const [allFieldsHaveValues, setAllFieldsHaveValues] = useState(false);
  useEffect(() => {
    if (dependentFields) {
      const isAllDependentFieldHaveValues = dependentFields.every((dep) => {
        if (typeof dep === 'string') {
          return watch(dep) !== undefined && watch(dep) !== null;
        } else {
          return watch(dep.field) === dep.value;
        }
      });
      setAllFieldsHaveValues(isAllDependentFieldHaveValues);
    } else {
      setAllFieldsHaveValues(true);
    }
  }, [
    ...(dependentFields?.map((field) => {
      if (typeof field === 'string') {
        return watch(field);
      } else {
        return watch(field.field);
      }
    }) || []),
  ]);

  useEffect(() => {
    if (!allFieldsHaveValues) {
      control.unregister(name);
    } else {
      control.register(name);
    }
  }, [allFieldsHaveValues, control, name]);

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
      }) =>
        render({
          value,
          onChange,
          onBlur,
          name,
          ref,
          error: error,
          disabled: disabled,
        })
      }
    />
  );
};

export default BaseControlledField;
