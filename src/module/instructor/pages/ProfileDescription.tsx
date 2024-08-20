import { useForm } from 'react-hook-form';
import RichTextEditorControlledField from '../../../common/components/controlledFields/RichTextEditorControlledField';

type ProfileFormValues = {
  contentJson: string;
  content: string;
};

const ProfileDescription = () => {
  // const [editorContent, setEditorContent] = useState('');

  const {
    handleSubmit,
    control,
    setValue,
    // formState: { errors },
    // watch,
    // register,
  } = useForm<ProfileFormValues>({
    mode: 'onTouched',
    defaultValues: {
      contentJson: '',
      content: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // data.content será el texto plano validado que puedes procesar o convertir a JSON si es necesario.
  };
  // console.log('watch(content)', watch('content'));
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RichTextEditorControlledField<ProfileFormValues>
          name="content"
          nameForJson="contentJson"
          control={control}
          setValue={setValue}
          rules={{
            required: 'El contenido es requerido',
            minLength: {
              value: 10,
              message: 'El contenido debe tener al menos 10 caracteres',
            },
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <Typography variant="h4">Profile Descrition</Typography>
      <Typography variant="subtitle1">
        This info will go on your public profile. Write in the language you'll
        teaching.
      </Typography>
      <Typography variant="h5">1. Introduce Yourself</Typography>
      <Typography variant="subtitle2">
        Show potencial students who you are! Share your teaching experience and
        passion for education and briefly mention your interests and hobbies.
      </Typography>
      <RichTextEditor
        placeholder={`Hello, my name is... and I'm from....`}
        onChange={(content) => setEditorContent(content)}
      />
      <Typography variant="h5">2. Teaching experience</Typography>
      <Typography variant="subtitle2">
        Provide a detailed description of your relevant teaching
        experience.include certifications, teaching methodology, education, and
        subject expertise.
      </Typography>
      <RichTextEditor
        placeholder={`I have 5 years of teaching experience. I'm TEFL Certified, and my classes are.....`}
        onChange={(content) => setEditorContent(content)}
      />
      <Typography variant="h5">3. Motivate potential students</Typography>
      <Typography variant="subtitle2">
        Encorage students to book their first lesson. Highlight the benefits of
        learning with you.
      </Typography>
      <RichTextEditor
        placeholder={`I have 5 years of teaching experience. I'm TEFL Certified, and my classes are.....`}
        onChange={(content) => setEditorContent(content)}
      /> */}
      {/* <Typography variant="h5">4. Write a catchy headline</Typography>
      <Typography variant="subtitle2">
        Your headline is the first thing students will see. Make it
        attention-grabbing, mention your specific teaching and encourage
        students to read your full description.
      </Typography>
      <RichTextEditor
        placeholder={`Certified tutor with 5 years of experience.....`}
        onChange={(content) => setEditorContent(content)}
      />
      <RichTextEditorView content={editorContent} /> */}
    </>
  );
};

export default ProfileDescription;
