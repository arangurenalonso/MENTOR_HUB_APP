import { Grid, Button, FormHelperText } from '@mui/material';
import {
  FieldValues,
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
  ArrayPath,
  FieldArray,
} from 'react-hook-form';
import RenderField from './RenderField';
import FieldBaseType from '../controlledFields/type/fieldType';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import LayoutRenderDynamicFormMultipleBuilder from './components/LayoutRenderDynamicFormMultipleBuilder';
import CustomInputLabel from '../controlledFields/common/CustomInputLabel';

interface DynamicFormMultipleBuilderProps<T extends FieldValues> {
  name: ArrayPath<T>; // Nombre del campo array en el formulario principal
  control: Control<T>; // Control principal del formulario
  fieldsObject: FieldBaseType<T>[]; // Campos a replicar en el array
  setValue: UseFormSetValue<T>; // Función para establecer valores en el formulario
  watch: UseFormWatch<T>; // Función para observar cambios en el formulario
  label?: string;
  helperText?: string;
  informationText?: string;
}

const DynamicFormMultipleBuilder = <T extends FieldValues>({
  name,
  control,
  fieldsObject,
  setValue,
  watch,
  label,
  informationText,
  helperText,
}: DynamicFormMultipleBuilderProps<T>) => {
  const { fields, append, remove } = useFieldArray<T>({
    control: control,
    // keyName: 'id',
    name: name, // TypeScript necesita que el tipo sea ArrayPath<T>
  });
  const handleOnAdd = () => {
    append({} as FieldArray<T, ArrayPath<T>>);
  };
  useEffect(() => {
    if (fields?.length == 0) {
      handleOnAdd();
    }
  }, [fields.length]);
  const handleOnDelete = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  return (
    <Grid container>
      {label && (
        <Grid item xs={12}>
          <CustomInputLabel
            label={label}
            labelStyles={{ fontWeight: 800 }}
            informationText={informationText}
          />
          <FormHelperText>{helperText} </FormHelperText>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {fields.map((item, index) => {
            return (
              <Grid item xs={12} key={item.id}>
                <LayoutRenderDynamicFormMultipleBuilder
                  onRemove={(index) => {
                    handleOnDelete(index);
                  }}
                  index={index}
                  showButtonDelete={fields.length > 1}
                >
                  <Grid container spacing={1}>
                    {fieldsObject.map((fieldConfig) => {
                      return (
                        <RenderField<T>
                          isFromArrayForm={true}
                          key={fieldConfig.name as string}
                          field={{
                            ...fieldConfig,
                            name: `${name}.${index}.${fieldConfig.name}` as any,
                            optionalName: fieldConfig.optionalName
                              ? (`${name}.${index}.${fieldConfig.optionalName}` as any)
                              : undefined,
                            dependentFields: fieldConfig.dependentFields?.map(
                              (x) => {
                                if (typeof x === 'string') {
                                  return `${name}.${index}.${x}` as any;
                                } else {
                                  return {
                                    field: `${name}.${index}.${x.field}` as any,
                                    value: x.value,
                                  };
                                }
                              }
                            ),
                            // @ts-ignore
                            optionProps: fieldConfig.optionProps
                              ? {
                                  ...fieldConfig.optionProps,
                                  optionsFromApi: fieldConfig.optionProps
                                    .optionsFromApi
                                    ? {
                                        ...fieldConfig.optionProps
                                          .optionsFromApi,
                                        valueReplacement:
                                          fieldConfig.optionProps.optionsFromApi.valueReplacement?.map(
                                            ({ variableReplace, field }) => {
                                              return {
                                                variableReplace:
                                                  variableReplace,
                                                field:
                                                  `${name}.${index}.${field}` as any,
                                              };
                                            }
                                          ),
                                      }
                                    : undefined,
                                }
                              : undefined,
                          }}
                          control={control}
                          setValue={setValue}
                          watch={watch}
                        />
                      );
                    })}
                  </Grid>
                </LayoutRenderDynamicFormMultipleBuilder>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleOnAdd()}
          startIcon={<AddIcon />}
        >
          Add More to your response
        </Button>
      </Grid>
    </Grid>
  );
};
export default DynamicFormMultipleBuilder;
