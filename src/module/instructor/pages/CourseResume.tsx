import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CourseType } from '../../../store/course/course.type';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RichTextEditorView from '../../../common/components/controlledFields/richTextEditor/RichTextEditor/RichTextEditorView';
import { Close, Videocam } from '@mui/icons-material';
import { useState } from 'react';
type CourseResumeProps = {
  course: CourseType;
};
const CourseResume = ({ course }: CourseResumeProps) => {
  const [open, setOpen] = useState(false);

  // Maneja la apertura y cierre del modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: 'primary.main',
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  component="img"
                  src={course!.imgUrl!}
                  alt="Cropped Image"
                  sx={{
                    width: '100%',
                    objectFit: 'contain',
                    border: '2px solid #333',
                    borderRadius: 2,
                  }}
                />
              </Grid>
              <Grid
                size={{ xs: 12, md: 8 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', lineHeight: 1 }}
                  >
                    {course?.title}
                  </Typography>
                  <Typography variant="overline">
                    Created by <strong>{course?.instructor?.name}</strong>
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }} gap={2}>
                    {course.level.description && (
                      <Chip
                        label={course.level.description}
                        size="small"
                        color="primary"
                      />
                    )}
                    {course.subCategory.category.description && (
                      <Chip
                        label={course.subCategory.category.description}
                        color="primary"
                        size="small"
                      />
                    )}
                    {course.subCategory.description && (
                      <Chip
                        label={course.subCategory.description}
                        color="primary"
                        size="small"
                      />
                    )}
                  </Box>
                  <Box
                    sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button
                      endIcon={<Videocam />}
                      onClick={handleClickOpen}
                      variant="outlined"
                    >
                      Preview Course
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Description.
          </Typography>
          <RichTextEditorView content={course.description} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            What you'll learn?
          </Typography>
          <List>
            {course.learningObjectives?.map((item) => (
              <ListItem key={item.id} sx={{ p: 0, pl: 2 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={item.description}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'textPrimary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Who is this course for?
          </Typography>
          <List>
            {course.intendedLearners?.map((item) => (
              <ListItem key={item.id} sx={{ p: 0, pl: 2 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={item.description}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'textPrimary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Requirements and Prerequisites.
          </Typography>
          <List>
            {course.requirements?.map((item) => (
              <ListItem key={item.id} sx={{ p: 0, pl: 2 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={item.description}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'textPrimary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      {/* Aquí agregamos el modal */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={true}
        PaperProps={{
          sx: {
            width: '95%', // Hace que el ancho sea del 95% de la ventana
            maxWidth: 'md', // Limita el ancho máximo al tamaño 'md' (960px)
            height: 'auto',
            maxHeight: '95%', // Limita la altura al 95% de la ventana
          },
        }}

        //   open={open} onClose={handleClose} maxWidth="md" fullWidth
      >
        <DialogTitle
          sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          Preview Course
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 1 }}>
          <Box
            component="video"
            src={course.promotionalVideoUrl || undefined}
            controls
            sx={{
              width: '100%',
              maxWidth: 'md',
              minHeight: 200,
              objectFit: 'contain',
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CourseResume;
