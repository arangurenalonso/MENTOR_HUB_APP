import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';

type FormValues = {
  fields: { name: string; age: string }[];
};

export const Example: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      fields: [{ name: '', age: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {fields.map((item, index) => (
          <Grid item xs={12} key={item.id}>
            <Controller
              name={`fields.${index}.name`}
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name={`fields.${index}.age`}
              control={control}
              rules={{ required: 'Age is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Age"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                  type="number"
                />
              )}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => remove(index)}
              disabled={fields.length === 1} // Evita borrar el último campo
            >
              Remove
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => append({ name: '', age: '' })}
      >
        Add More
      </Button>
      <Button type="submit" variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};
