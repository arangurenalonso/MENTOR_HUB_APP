import { FieldValues, Path, PathValue, useForm } from 'react-hook-form';
import FieldBaseType, {
  LineBreakType,
} from '../controlledFields/type/fieldType';
import Grid from '@mui/material/Grid2';
import { Fragment } from 'react/jsx-runtime';
import RenderField from './RenderField';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { ControlledFieldEnum } from '../controlledFields/type/controlledTypeField';

interface DinamicallyFormBuilderProps<T extends FieldValues> {
  fieldsObject: (FieldBaseType<T> | LineBreakType)[];
  valuesToSet?: Partial<T> | null;
}

function DinamicallyFormBuilderComponent<T extends FieldValues>(
  { fieldsObject, valuesToSet }: DinamicallyFormBuilderProps<T>,
  ref: React.Ref<any>
) {
  const { handleSubmit, control, setValue, watch, reset } = useForm<T>({
    mode: 'onTouched',
  });
  useEffect(() => {
    if (valuesToSet) {
      reset(valuesToSet as T);
    } else {
      fieldsObject.forEach((field) => {
        if (field.type != ControlledFieldEnum.LineBreak) {
          setValue(field.name as Path<T>, undefined as PathValue<T, Path<T>>);
        }
      });
    }
  }, [valuesToSet]);

  const updatedFieldsObject = useMemo(() => {
    return fieldsObject.map((field) => {
      // const valueToSet = valuesToSet?.[field.name as keyof T];
      return {
        ...field,
        // valueToSet: valueToSet ?? field.valueToSet,
      };
    });
  }, [valuesToSet]);

  useImperativeHandle(ref, () => ({
    submit: (
      onSubmit: (data: T, onAfterSubmit?: () => void) => void,
      onAfterSubmit?: () => void
    ) => {
      console.log('watch', watch());

      handleSubmit((data) => {
        onSubmit(data, onAfterSubmit);
      })();
    },
  }));

  return (
    <Grid container spacing={1} rowSpacing={3}>
      {updatedFieldsObject.map((fieldConfig, index) => (
        <Fragment key={index}>
          <RenderField<T>
            field={fieldConfig}
            control={control}
            setValue={setValue}
            watch={watch}
          />
        </Fragment>
      ))}
    </Grid>
  );
}

// Forward the ref while keeping the generic type declaration in the component
const DinamicallyFormBuilder = forwardRef(DinamicallyFormBuilderComponent) as <
  T extends FieldValues
>(
  props: DinamicallyFormBuilderProps<T> & { ref?: React.Ref<any> }
) => ReturnType<typeof DinamicallyFormBuilderComponent>;

export default DinamicallyFormBuilder;
