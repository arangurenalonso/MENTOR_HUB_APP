import VideoRecorder from '../../../common/components/video/VideoRecorder';
import ImageSelector from '../../../common/components/image/ImageSelector';

const HomePage = () => {
  const onChangeVideo = async (videoFile?: File | null) => {
    console.log('videoFile', videoFile);
    // const formData = new FormData();
    // formData.append('video', videoBlob, 'prueba.mp4');

    // try {
    //   const response = await axios.put(
    //     'http://localhost:4000/api/course/aaaa/promotional-video',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   );
    //   console.log('Video uploaded successfully:', response.data);
    // } catch (error) {
    //   console.error('Error uploading video:', error);
    // }
  };
  const onChangeImg = async (imgfile?: File | null) => {
    console.log('imgfile', imgfile);

    // try {
    //   const formData = new FormData();
    //   formData.append('img', file);
    //   // const response = await axios.post(
    //   //   'http://localhost:4000/api/course/image-upload',
    //   //   formData,
    //   //   {
    //   //     headers: {
    //   //       'Content-Type': 'multipart/form-data',
    //   //     },
    //   //   }
    //   // );

    //   // console.log('Image uploaded successfully:', response.data);
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // }
  };
  return (
    <div>
      MAIN PAGE
      <VideoRecorder onChange={onChangeVideo} />
      <ImageSelector onChange={onChangeImg} />
    </div>
  );
};

export default HomePage;
