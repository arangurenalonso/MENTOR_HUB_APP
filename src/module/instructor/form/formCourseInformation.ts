import { ControlledFieldEnum } from '../../../common/components/controlledFields/type/controlledTypeField';
import FieldBaseType from '../../../common/components/controlledFields/type/fieldType';
import { CourseFormField } from '../type/course.type';

const formCourseInformation: FieldBaseType<CourseFormField>[] = [
  // {
  //   type: ControlledFieldEnum.InputTypeText,
  //   name: 'courseTitle',
  //   label: 'Course Title',
  //   placeholder: 'Insert your course title.',
  //   helperText:
  //     'Your title should be a mix of attention-grabbing, informative, and optimized for search.',
  //   rules: {
  //     required: 'El contenido es requerido',
  //     minLength: {
  //       value: 2,
  //       message: 'El contenido debe tener al menos 2 caracteres',
  //     },
  //     maxLength: {
  //       value: 60,
  //       message: 'El contenido debe tener menos de 60 caracteres',
  //     },
  //     pattern: {
  //       value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
  //       message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
  //     },
  //   },
  //   xs: 12,
  //   sm: 12,
  //   md: 12,
  //   lg: 12,
  //   xl: 12,
  // },
  {
    type: ControlledFieldEnum.Select,
    name: 'category',
    optionalName: 'categoryOption',
    label: 'Select a category',
    helperText: 'Choose a category that best describes your course.',
    optionProps: {
      valueProperty: 'id',
      nameProperty: 'description',
      optionsFromApi: {
        baseUrl: 'http://localhost:4000',
        endpoint: '/api/master/category',
        method: 'GET',
      },
    },
    rules: { required: 'This field is required' },
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6,
  },

  {
    type: ControlledFieldEnum.Select,
    name: 'subCategory',
    optionalName: 'subCategoryOption',
    label: 'Select a sub category',
    helperText: 'Select a sub-category based on your selected category.',
    optionProps: {
      valueProperty: 'id',
      optionsFromApi: {
        baseUrl: 'http://localhost:4000',
        endpoint: '/api/master/category/{{category}}/sub-categories',
        method: 'GET',
        valueReplacement: [{ variableReplace: 'category', field: 'category' }],
      },
      onFormatMenuItemLabel: (value) => `--- ${value.description} ---`,
    },
    dependentFields: ['category'],
    rules: { required: 'This field is required' },
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6,
  },
  // {
  //   type: ControlledFieldEnum.RichTextEditor,
  //   name: 'courseDescription',
  //   optionalName: 'courseDescriptionPlainText',
  //   label: 'Course description',
  //   placeholder: "Hello, my name is... and I'm from....",
  //   helperText:
  //     'Your description should be a brief overview of what students will learn.',
  //   rules: {
  //     required: 'El contenido es requerido',
  //     minLength: {
  //       value: 10,
  //       message: 'El contenido debe tener al menos 10 caracteres',
  //     },
  //   },
  //   xs: 12,
  //   sm: 12,
  //   md: 12,
  //   lg: 12,
  //   xl: 12,
  // },
];
export default formCourseInformation;
