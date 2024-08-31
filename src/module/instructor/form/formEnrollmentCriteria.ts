import { ControlledFieldEnum } from '../../../common/components/controlledFields/type/controlledTypeField';
import FieldBaseType from '../../../common/components/controlledFields/type/fieldType';
import {
  LearningObjectiveForm,
  RequirementsForm,
  IntendedLearnersForm,
  CourseFormField,
} from '../type/course.type';

const fieldsArrayLearningObjectiveConfig: FieldBaseType<LearningObjectiveForm>[] =
  [
    {
      type: ControlledFieldEnum.InputTypeText,
      name: 'description',
      placeholder: 'Example: Learn how to build a website from scratch',
      defaultValue: '',
      rules: {
        required: 'El contenido es requerido',
        minLength: {
          value: 2,
          message: 'El contenido debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 160,
          message: 'El contenido debe tener menos de 160 caracteres',
        },
        pattern: {
          value: /^[a-zA-Z0-9\s,.'-]{2,160}$/,
          message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
        },
      },
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    },
  ];
const fieldsArrayRequirementConfig: FieldBaseType<RequirementsForm>[] = [
  {
    type: ControlledFieldEnum.InputTypeText,
    name: 'description',
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
];
const fieldsArrayStudentObjectiveConfig: FieldBaseType<IntendedLearnersForm>[] =
  [
    {
      type: ControlledFieldEnum.InputTypeText,
      name: 'description',
      // label: 'Course Title',
      placeholder: 'Example: Beginner developers who want to learn React',
      defaultValue: '',
      // helperText:
      //   'Your title should be a mix of attention-grabbing, informative, and optimized for search.',
      rules: {
        required: 'El contenido es requerido',
      },
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    },
  ];
const formEnrollmentCriteria: FieldBaseType<CourseFormField>[] = [
  {
    type: ControlledFieldEnum.Array,
    fieldArrayConfig: fieldsArrayLearningObjectiveConfig,
    name: 'learningObjectives',
    label: 'Key Learning Outcomes',
    helperText:
      'Clearly outline the specific skills, knowledge, and competencies students will acquire upon completing your course. Focus on what learners will be able to achieve or accomplish as a result of their participation.',
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.Array,
    fieldArrayConfig: fieldsArrayRequirementConfig,
    name: 'requirements',
    label: 'Course Requirements and Prerequisites',
    helperText:
      'Specify any prerequisites or prior knowledge that students should have before enrolling in your course. This could include specific skills, experience levels, or necessary materials that will help students succeed.',
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.Array,
    fieldArrayConfig: fieldsArrayStudentObjectiveConfig,
    name: 'intendedLearners',
    label: 'Target Audience for Your Course',
    helperText:
      'Provide a detailed description of the students who will benefit most from this course. Specify the knowledge level, experience, and any particular characteristics that would make your course especially valuable to them.',
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
];
export default formEnrollmentCriteria;
