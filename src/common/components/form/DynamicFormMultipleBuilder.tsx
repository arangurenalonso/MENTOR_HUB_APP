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
import { v4 as uuidv4 } from 'uuid';
interface DynamicFormMultipleBuilderProps<T extends FieldValues> {
  name: ArrayPath<T>;
  control: Control<T>;
  fieldsObject: FieldBaseType<T>[];
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  label?: string;
  helperText?: string;
  informationText?: string;
  valuesToSet?: any[];
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
}: // valuesToSet,
DynamicFormMultipleBuilderProps<T>) => {
  const { fields, append, remove } = useFieldArray<T>({
    control: control,
    name: name,
  });
  const handleOnAdd = (value?: any) => {
    if (value == undefined || value == null) {
      append({ id: uuidv4() } as FieldArray<T, ArrayPath<T>>);
      return;
    }
    append({ id: uuidv4(), ...value } as FieldArray<T, ArrayPath<T>>);
  };
  // useEffect(() => {
  //   if (valuesToSet) {
  //     remove();
  //     valuesToSet.forEach((value) => {
  //       handleOnAdd(value);
  //     });
  //   }
  // }, [valuesToSet]);

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
                            valueToSet:
                              item[fieldConfig.name as keyof typeof item],
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
          onClick={() => handleOnAdd(undefined)}
          startIcon={<AddIcon />}
        >
          Add More to your response
        </Button>
      </Grid>
    </Grid>
  );
};
export default DynamicFormMultipleBuilder;
