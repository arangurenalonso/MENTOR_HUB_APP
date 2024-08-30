import { EditorState } from 'draft-js';
import { ControlledFieldEnum } from '../../../common/components/controlledFields/type/controlledTypeField';
import FieldBaseType from '../../../common/components/controlledFields/type/fieldType';

export type CategoryType = {
  id: string;
  description: string;
};

export type SubCategoryType = {
  id: string;
  description: string;
};

export type CourseFormField = {
  category: string;
  categoryOption: CategoryType;
  subCategory: string;
  subCategoryOption: SubCategoryType;
  courseTitle: string;
  courseDescriptionPlainText: string;
  courseDescription: EditorState;
  requirements: RequirementsForm[];
};
export type RequirementsForm = {
  id: string;
  requirement: string;

  category: string;
  categoryOption: CategoryType;
  subCategory: string;
  subCategoryOption: SubCategoryType;
};

const fieldsArrayConfig: FieldBaseType<RequirementsForm>[] = [
  {
    type: ControlledFieldEnum.InputTypeText,
    name: 'requirement',
    // label: 'Course Title',
    placeholder:
      'Example: No programming experience needed. You will learn everthing you need to know',
    defaultValue: '',
    // helperText:
    //   'Your title should be a mix of attention-grabbing, informative, and optimized for search.',
    rules: {
      required: 'El contenido es requerido',
      minLength: {
        value: 2,
        message: 'El contenido debe tener al menos 2 caracteres',
      },
      maxLength: {
        value: 60,
        message: 'El contenido debe tener menos de 60 caracteres',
      },
      pattern: {
        value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
        message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
      },
    },
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.Select,
    name: 'category',
    optionalName: 'categoryOption',
    label: 'Select a category',
    helperText: 'Choose a category that best describes your course.',
    optionProps: {
      valueProperty: 'id',
      nameProperty: 'description',
      options: [
        {
          id: '69dba3a0-e4b2-460c-b008-b941d10bd82c',
          description: 'SOFTWARE DEV',
        },
        {
          id: '2e9a1d5a-18d2-4814-919a-26b7b83e2fe8',
          description: 'SECURITY',
        },
        {
          id: '276e4a89-25a8-4e94-89b4-99bf09282f4d',
          description: 'DATA & MACHINE LEARNING',
        },
        {
          id: '003056b4-daae-4a0e-aea7-e7a91259f053',
          description: 'CLOUD',
        },
        {
          id: '85dda3eb-a48e-45cd-ab96-12e518bfc26d',
          description: 'IT OPS',
        },
        {
          id: '68ff9a1c-18fd-4fa1-9197-b669273d5aeb',
          description: 'BUSINESS PROFESSIONAL',
        },
      ],
      // optionsFromApi: {
      //   baseUrl: 'http://localhost:4000',
      //   endpoint: '/api/master/category',
      //   method: 'GET',
      // },
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
];
const fieldsObject: FieldBaseType<CourseFormField>[] = [
  {
    type: ControlledFieldEnum.Array,
    fieldArrayConfig: fieldsArrayConfig,
    name: 'requirements',
    label: 'What are the requirements or prerequisites for taking your course?',
    helperText:
      'List the required skills, experience, tools or equipment learners should have prior to taking your course. If there are no requirements, use this space as an opportunity to lower the barrier for beginners.',
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.InputTypeText,
    name: 'courseTitle',
    label: 'Course Title',
    placeholder: 'Insert your course title.',
    helperText:
      'Your title should be a mix of attention-grabbing, informative, and optimized for search.',
    rules: {
      required: 'El contenido es requerido',
      minLength: {
        value: 2,
        message: 'El contenido debe tener al menos 2 caracteres',
      },
      maxLength: {
        value: 60,
        message: 'El contenido debe tener menos de 60 caracteres',
      },
      pattern: {
        value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
        message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
      },
    },
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
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
  {
    type: ControlledFieldEnum.RichTextEditor,
    name: 'courseDescription',
    optionalName: 'courseDescriptionPlainText',
    label: 'Course description',
    placeholder: "Hello, my name is... and I'm from....",
    helperText:
      'Your description should be a brief overview of what students will learn.',
    rules: {
      required: 'El contenido es requerido',
      minLength: {
        value: 10,
        message: 'El contenido debe tener al menos 10 caracteres',
      },
    },
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
];
export default fieldsObject;
