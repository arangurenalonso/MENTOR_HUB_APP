import { useEffect, useState } from 'react';
import { FieldValues, Control, UseFormWatch, Path } from 'react-hook-form';
import { DependentField } from './BaseControlledField';

type UseDependedFieldProp<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
};
const useDependedField = <T extends FieldValues>({
  dependentFields,
  watch,
  control,
  name,
}: UseDependedFieldProp<T>) => {
  const [allFieldsHaveValues, setAllFieldsHaveValues] = useState(false);
  useEffect(() => {
    if (dependentFields) {
      const isAllDependentFieldHaveValues = dependentFields.every((dep) => {
        if (typeof dep === 'string') {
          return (
            watch(dep) !== undefined && watch(dep) !== null && watch(dep) !== ''
          );
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

  return {
    allFieldsHaveValues,
  };
};

export default useDependedField;
