import { FieldValues, useForm } from 'react-hook-form';
import FieldBaseType from '../controlledFields/type/fieldType';
import { Button, Grid } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import RenderField from './RenderField';
import { useMemo } from 'react';

interface DinamicallyFormBuilderProps<T extends FieldValues> {
  fieldsObject: FieldBaseType<T>[];
  valuesToSet?: Partial<T>;
}

const DinamicallyFormBuilder = <T extends FieldValues>({
  fieldsObject,
  valuesToSet,
}: DinamicallyFormBuilderProps<T>) => {
  const { handleSubmit, control, setValue, watch } = useForm<T>({
    mode: 'onTouched',
  });

  const updatedFieldsObject = useMemo(() => {
    console.log('AAAAA');

    return fieldsObject.map((field) => {
      const valueToSet = valuesToSet?.[field.name as keyof T];
      return {
        ...field,
        valueToSet: valueToSet ?? field.valueToSet,
      };
    });
  }, [valuesToSet]);

  const onSubmit = async (data: T) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DinamicallyFormBuilder;
