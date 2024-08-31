import { FieldValues, useForm } from 'react-hook-form';
import FieldBaseType from '../controlledFields/type/fieldType';
import { Grid } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import RenderField from './RenderField';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';

interface DinamicallyFormBuilderProps<T extends FieldValues> {
  fieldsObject: FieldBaseType<T>[];
  valuesToSet?: Partial<T>;
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
    submit: (onSubmit: (data: T) => void) => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form>
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
    </form>
  );
}

// Forward the ref while keeping the generic type declaration in the component
const DinamicallyFormBuilder = forwardRef(DinamicallyFormBuilderComponent) as <
  T extends FieldValues
>(
  props: DinamicallyFormBuilderProps<T> & { ref?: React.Ref<any> }
) => ReturnType<typeof DinamicallyFormBuilderComponent>;

export default DinamicallyFormBuilder;
