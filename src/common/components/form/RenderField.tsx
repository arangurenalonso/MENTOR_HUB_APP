import { Grid } from '@mui/material';
import {
  FieldValues,
  Control,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import SelectControlledField from '../controlledFields/select/SelectControlledField';
import TextFieldControlledField from '../controlledFields/textField/TextFieldControlledField';
import { ControlledFieldEnum } from '../controlledFields/type/controlledTypeField';
import FieldBaseType from '../controlledFields/type/fieldType';
import DynamicFormMultipleBuilderWrapped from './DynamicFormMultipleBuilderWrapped';
import RichTextEditorControlledField from '../controlledFields/richTextEditor/RichTextEditorControlledField';

type RenderFieldProps<T extends FieldValues> = {
  field: FieldBaseType<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  isFromArrayForm?: boolean;
};

const RenderField = <T extends FieldValues>({
  field,
  control,
  setValue,
  watch,
  isFromArrayForm,
}: RenderFieldProps<T>) => {
  // console.log('render'); // Este console.log solo se ejecutará si `field` cambia

  let element: JSX.Element | null = null;

  switch (field.type) {
    case ControlledFieldEnum.Array:
      element = (
        <DynamicFormMultipleBuilderWrapped<T>
          field={field}
          control={control}
          setValue={setValue}
          watch={watch}
          isFromArrayForm={isFromArrayForm}
          valuesToSet={field.valueToSet as any}
        />
      );

      break;
    case ControlledFieldEnum.InputTypeText:
      element = (
        <TextFieldControlledField
          watch={watch}
          setValue={setValue}
          control={control}
          dependentFields={field.dependentFields}
          name={field.name}
          disabled={field.disabled}
          defaultValue={field.defaultValue}
          rules={field.rules}
          label={field.label}
          helperText={field.helperText}
          informationText={field.informationText}
          isFromArrayForm={isFromArrayForm}
          // valueToSet={field.valueToSet}
          placeholder={field.placeholder}
          icon={field.icon}
        />
      );
      break;
    case ControlledFieldEnum.Select:
      element = (
        <SelectControlledField
          watch={watch}
          setValue={setValue}
          control={control}
          dependentFields={field.dependentFields}
          name={field.name}
          disabled={field.disabled}
          defaultValue={field.defaultValue}
          rules={field.rules}
          label={field.label}
          helperText={field.helperText}
          informationText={field.informationText}
          isFromArrayForm={isFromArrayForm}
          // valueToSet={field.valueToSet}
          nameSelectedOption={field.optionalName!}
          optionProps={field.optionProps!}
        />
      );
      break;
    case ControlledFieldEnum.RichTextEditor:
      element = (
        <RichTextEditorControlledField
          watch={watch}
          setValue={setValue}
          control={control}
          dependentFields={field.dependentFields}
          name={field.name}
          disabled={field.disabled}
          defaultValue={field.defaultValue}
          rules={field.rules}
          label={field.label}
          helperText={field.helperText}
          informationText={field.informationText}
          isFromArrayForm={isFromArrayForm}
          // valueToSet={field.valueToSet}
          namePlainText={field.optionalName!}
          placeholder={field.placeholder}
        />
      );
      break;
    default:
      element = null;
  }

  return (
    <Grid
      item
      xs={field.xs}
      sm={field.sm}
      md={field.md}
      lg={field.lg}
      xl={field.xl}
    >
      {element}
    </Grid>
  );
};
export default RenderField;
