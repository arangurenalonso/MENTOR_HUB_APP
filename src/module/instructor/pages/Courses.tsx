import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import SelectControlledField from '../../../common/components/controlledFields/select/SelectControlledField';
import TextFieldControlledField from '../../../common/components/controlledFields/textField/TextFieldControlledField';
import RichTextEditorControlledField from '../../../common/components/controlledFields/RichTextEditorControlledField';
import { EditorState } from 'draft-js';

type ProfileFormValues = {
  category: string;
  categoryOption: CategoryType;
  subCategory: string;
  subCategoryOption: SubCategoryType;
  courseTitle: string;
  courseDescriptionPlainText: string;
  courseDescription: EditorState;
};

interface CategoryType {
  id: string;
  description: string;
}

interface SubCategoryType {
  id: string;
  description: string;
}
const Courses = () => {
  const { handleSubmit, control, setValue, watch } = useForm<ProfileFormValues>(
    {
      mode: 'onTouched',
    }
  );
  const onSubmit = async (data: ProfileFormValues) => {
    console.log('data', data);
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: '700px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldControlledField
              name="courseTitle"
              label="Course Title"
              control={control}
              // disabled={true}
              watch={watch}
              placeholder={`Insert your course title.`}
              helperText={`Your title should be a mix of attention-grabbing, informative, and optimized for search.`}
              setValue={setValue}
              // dependentFields={[{ field: 'category', value: 2 }]}
              rules={{
                required: 'El contenido es requerido',
                minLength: {
                  value: 2,
                  message: 'El contenido debe tener al menos 2 caracteres',
                },
                maxLength: {
                  value: 60,
                  message: 'El contenido debe tener menos d60 caracteres',
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
                  message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SelectControlledField<ProfileFormValues, CategoryType>
                  label="Select a category"
                  name="category"
                  nameSelectedOption="categoryOption"
                  watch={watch}
                  control={control}
                  setValue={setValue}
                  informationText={
                    'Each individual topic chosen should comprehensively describe your courses content without being too broad. E.g. "The Complete Tennis Course" should have "Tennis"  not "Tennis Serve" (specific, but not comprehensive) and not "Sports" (comprehensive, but not specific)'
                  }
                  // disabled={true}
                  optionProps={{
                    valueProperty: 'id',
                    nameProperty: 'description', //No se puede mandar ambos nameProperty y onFormatMenuItemLabel
                    // options: [
                    //   {
                    //     id: '69dba3a0-e4b2-460c-b008-b941d10bd82c',
                    //     description: 'SOFTWARE DEV',
                    //   },
                    //   {
                    //     id: '2e9a1d5a-18d2-4814-919a-26b7b83e2fe8',
                    //     description: 'SECURITY',
                    //   },
                    // ],
                    optionsFromApi: {
                      baseUrl: 'http://localhost:4000',
                      endpoint: '/api/master/category',
                      method: 'GET',
                    },
                    // onFormatMenuItemLabel: (value) => {
                    //   return `--- ${value.name} ---`;
                    // },
                  }}
                  valueToSet={'2e9a1d5a-18d2-4814-919a-26b7b83e2fe8'}
                  rules={{ required: 'This field is required' }}
                  helperText="AAA"
                />
              </Grid>
              <Grid item xs={6}>
                <SelectControlledField<ProfileFormValues, SubCategoryType>
                  label="Select a sub category"
                  name="subCategory"
                  nameSelectedOption="subCategoryOption"
                  watch={watch}
                  control={control}
                  setValue={setValue}
                  // disabled={true}
                  optionProps={{
                    valueProperty: 'id',
                    // nameProperty: 'description', //No se puede mandar ambos nameProperty y onFormatMenuItemLabel
                    // options: [
                    //   {
                    //     id: '69dba3a0-e4b2-460c-b008-b941d10bd82c',
                    //     description: 'SOFTWARE DEV',
                    //   },
                    //   {
                    //     id: '2e9a1d5a-18d2-4814-919a-26b7b83e2fe8',
                    //     description: 'SECURITY',
                    //   },
                    // ],
                    optionsFromApi: {
                      baseUrl: 'http://localhost:4000',
                      endpoint:
                        '/api/master/category/{{category}}/sub-categories',
                      method: 'GET',
                      valueReplacement: ['category'],
                    },
                    onFormatMenuItemLabel: (value) => {
                      return `--- ${value.description} ---`;
                    },
                  }}
                  dependentFields={['category']}
                  // valueToSet={'2e9a1d5a-18d2-4814-919a-26b7b83e2fe8'}
                  rules={{ required: 'This field is required' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <RichTextEditorControlledField<ProfileFormValues>
              dependentFields={['category']}
              watch={watch}
              label={'Course description'}
              name="courseDescription"
              namePlainText="courseDescriptionPlainText"
              // valueToSet={}
              placeholder={`Hello, my name is... and I'm from....`}
              control={control}
              setValue={setValue}
              rules={{
                required: 'El contenido es requerido',
                minLength: {
                  value: 10,
                  message: 'El contenido debe tener al menos 10 caracteres',
                },
              }}
              // informationText="This is the first thing students will see when they find your course. Write a short paragraph that describes the course and what students will learn. This will help students decide if the course is right for them."
              helperText="Your description should be a brief overview of what students will learn. It should be written in the third person."
            />
          </Grid>
        </Grid>

        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};

export default Courses;

/**
 <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldControlledField
          name="headline"
          label="Heading"
          control={control}
          // disabled={true}
          watch={watch}
          placeholder={`Full Stack Web developer with over than 5 years of experience.`}
          setValue={setValue}
          // dependentFields={[{ field: 'category', value: 2 }]}
          rules={{
            required: 'El contenido es requerido',
            minLength: {
              value: 2,
              message: 'El contenido debe tener al menos 2 caracteres',
            },
            maxLength: {
              value: 60,
              message: 'El contenido debe tener menos d60 caracteres',
            },
            pattern: {
              value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
              message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
            },
          }}
        />
        <Box sx={{ py: 1 }}></Box>
        <SelectControlledField<ProfileFormValues, CategoryType>
          label="Select a category"
          name="category"
          nameSelectedOption="categoryOption"
          watch={watch}
          control={control}
          setValue={setValue}
          // disabled={true}
          optionProps={{
            valueProperty: 'id',
            nameProperty: 'description', //No se puede mandar ambos nameProperty y onFormatMenuItemLabel
            // options: [
            //   {
            //     id: '69dba3a0-e4b2-460c-b008-b941d10bd82c',
            //     description: 'SOFTWARE DEV',
            //   },
            //   {
            //     id: '2e9a1d5a-18d2-4814-919a-26b7b83e2fe8',
            //     description: 'SECURITY',
            //   },
            // ],
            optionsFromApi: {
              baseUrl: 'http://localhost:4000',
              endpoint: '/api/master/category',
              method: 'GET',
            },
            // onFormatMenuItemLabel: (value) => {
            //   return `--- ${value.name} ---`;
            // },
          }}
          valueToSet={'2e9a1d5a-18d2-4814-919a-26b7b83e2fe8'}
          rules={{ required: 'This field is required' }}
        />

        <Box sx={{ py: 1 }}></Box>

        <SelectControlledField<ProfileFormValues, SubCategoryType>
          label="Select a sub category"
          name="subCategory"
          nameSelectedOption="subCategoryOption"
          watch={watch}
          control={control}
          setValue={setValue}
          // disabled={true}
          optionProps={{
            valueProperty: 'id',
            // nameProperty: 'description', //No se puede mandar ambos nameProperty y onFormatMenuItemLabel
            // options: [
            //   {
            //     id: '69dba3a0-e4b2-460c-b008-b941d10bd82c',
            //     description: 'SOFTWARE DEV',
            //   },
            //   {
            //     id: '2e9a1d5a-18d2-4814-919a-26b7b83e2fe8',
            //     description: 'SECURITY',
            //   },
            // ],
            optionsFromApi: {
              baseUrl: 'http://localhost:4000',
              endpoint: '/api/master/category/{{category}}/sub-categories',
              method: 'GET',
              valueReplacement: ['category'],
            },
            onFormatMenuItemLabel: (value) => {
              return `--- ${value.description} ---`;
            },
          }}
          dependentFields={['category']}
          // valueToSet={'2e9a1d5a-18d2-4814-919a-26b7b83e2fe8'}
          rules={{ required: 'This field is required' }}
        />
        <Box sx={{ py: 1 }}></Box>

        <button type="submit">Submit</button>
      </form>
 */
