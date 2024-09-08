import { ControlledFieldEnum } from '../../../common/components/controlledFields/type/controlledTypeField';
import FieldBaseType from '../../../common/components/controlledFields/type/fieldType';
import { ProfileFormField } from '../type/course-form.type';
import TitleIcon from '@mui/icons-material/Title';
const formProfileInformation: FieldBaseType<ProfileFormField>[] = [
  {
    type: ControlledFieldEnum.InputTypeText,
    name: 'headline',
    label: 'Heading',
    placeholder:
      'Full Stack Web developer with over than 5 years of experience.',
    helperText:
      'Your headline is the first thing students will see. Make it attention-grabbing, mention your specific teaching and encourage students to read your full description.',
    rules: {
      required: 'Content is required',
      minLength: {
        value: 2,
        message: 'Content must be at least 2 characters long',
      },
      maxLength: {
        value: 60,
        message: 'Content must be less than 60 characters',
      },
      pattern: {
        value: /^[a-zA-Z0-9\s,.'-]{1,60}$/,
        message: `Heading can only contain letters, numbers, spaces, and basic punctuation (.,'-).`,
      },
    },
    icon: TitleIcon,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.RichTextEditor,
    name: 'introduction',
    optionalName: 'introductionPlainText',
    label: 'Introduce Yourself',
    placeholder: "Hello, my name is... and I'm from....",
    helperText:
      'Show potential students who you are! Share your teaching experience and passion for education and briefly mention your interests and hobbies.',
    rules: {
      required: 'Content is required',
      minLength: {
        value: 10,
        message: 'Content must be at least 10 characters long',
      },
    },
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.RichTextEditor,
    name: 'teachingExperience',
    optionalName: 'teachingExperiencePlainText',
    label: 'Teaching Experience',
    placeholder:
      'I have 5 years of teaching experience. I am TEFL Certified, and my classes are...',
    helperText:
      'Provide a detailed description of your relevant teaching experience. Include certifications, teaching methodology, education, and subject expertise.',
    rules: {
      required: 'Content is required',
      minLength: {
        value: 10,
        message: 'Content must be at least 10 characters long',
      },
    },
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  {
    type: ControlledFieldEnum.RichTextEditor,
    name: 'motivation',
    optionalName: 'motivationPlainText',
    label: 'Motivate Potential Students',
    placeholder:
      'Book your first lesson and start your learning journey today!',
    helperText:
      'Encourage students to book their first lesson. Highlight the benefits of learning with you, share your teaching philosophy, and what makes your lessons unique.',
    rules: {
      required: 'Content is required',
      minLength: {
        value: 10,
        message: 'Content must be at least 10 characters long',
      },
    },
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
];

export default formProfileInformation;
