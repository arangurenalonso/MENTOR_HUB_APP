import {
  FieldValues,
  Control,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import FieldBaseType from '../controlledFields/type/fieldType';
import useDependedField from '../controlledFields/useDependedField';
import DynamicFormMultipleBuilder from './DynamicFormMultipleBuilder';

interface DynamicFormMultipleBuilderProps<T extends FieldValues> {
  field: FieldBaseType<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  isFromArrayForm?: boolean;
  valuesToSet?: any[];
}

const DynamicFormMultipleBuilderWrapped = <T extends FieldValues>({
  field,
  control,
  setValue,
  watch,
  isFromArrayForm,
  valuesToSet,
}: DynamicFormMultipleBuilderProps<T>) => {
  if (isFromArrayForm) {
    return null;
  }
  const { allFieldsHaveValues } = useDependedField<T>({
    name: field.name,
    control,
    watch,
    dependentFields: field.dependentFields,
  });

  if (!allFieldsHaveValues) {
    return null;
  }

  return (
    <DynamicFormMultipleBuilder<T>
      name={field.name as any}
      fieldsObject={field.fieldArrayConfig!}
      control={control}
      setValue={setValue}
      watch={watch}
      label={field.label}
      helperText={field.helperText}
      informationText={field.informationText}
      valuesToSet={valuesToSet}
    />
  );
};
export default DynamicFormMultipleBuilderWrapped;
