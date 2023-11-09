import { Modal, Box, Container, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Loading from './Loading';

const ImageCropper = ({ open, onClose, setImage }) => {
  const [error, setError] = useState('');
  const [cropper, setCropper] = useState();
  const [fileData, setFileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState();

  const handleSelectImageFile = async (event) => {
    setError('');
    const file = event.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        setFileData(file);
        let uploadingFile = file;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadingFile);
        fileReader.addEventListener('load', async function () {
          if (this.result) {
            const image = new Image();
            image.src = this.result;
            setSelectedImage(this.result);
          }
          event.target.value = '';
        });
      } catch (e) {
        setLoading(false);
        setError('Error loading file. Try again.');
      }
    }
  };

  const handleCropperSave = async () => {
    //setLoading(true);
    const result = await getCropData();
    if (result) {
      onClose();
    }
    // setLoading(false);
    setSelectedImage('');
  };

  const getCropData = async () => {
    if (typeof cropper !== 'undefined') {
      const croppedOptions = {
        minWidth: 256,
        minHeight: 256,
        maxWidth: 1024,
        maxHeight: 1024,
        imageSmoothingQuality: 'high',
      };
      try {
        const blob = await new Promise((resolve) =>
          cropper.getCroppedCanvas(croppedOptions).toBlob(resolve),
        );
        await onBlob(blob);
      } catch (e) {
        setError('Image error. Please try another image.');
        return false;
      }
      return true;
    }
    return false;
  };

  const onBlob = async (blob) => {
    const maxSizeMB = 1;
    const compressOptions = {
      maxSizeMB,
      useWebWorker: true,
    };

    let uploadingFile = new File([blob], fileData.name, fileData);
    if (uploadingFile.size > 1024 * 1024 * maxSizeMB) {
      const imageCompression = (await import('browser-image-compression'))
        .default;
      const compressedBlob = await imageCompression(
        uploadingFile,
        compressOptions,
      );
      // noinspection JSCheckFunctionSignatures
      uploadingFile = new File(
        [compressedBlob],
        uploadingFile.name,
        uploadingFile,
      );
    }
    uploadImage(uploadingFile);
  };

  const uploadImage = (imageFile) => {
    setImage(imageFile);
    //setLoading(false);
    return true;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal addImage">
        {error && <p>{error}</p>}
        {!selectedImage ? (
          <>
            <Typography variant="h5" gutterBottom>
              Select image file
            </Typography>
            <Container className="fileButtons">
              <input
                accept="image/jpeg"
                id="select-image-button"
                type="file"
                className="selectFile"
                onChange={handleSelectImageFile}
              />
              <label htmlFor="select-image-button" className="selectFileButton">
                Select image
              </label>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                label="Close popup"
                onClick={onClose}
                className="closeBtn"
              >
                Close
              </Button>
            </Container>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Crop the image
            </Typography>

            <Cropper
              src={selectedImage}
              className="cropperModule"
              viewMode={1}
              dragMode="crop"
              initialAspectRatio={1.0}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              autoCropArea={0.95}
              aspectRatio={1.0}
              background={false}
              cropBoxMovable={true}
              cropBoxResizable={true}
              toggleDragModeOnDblclick={false}
              zoomOnWheel={true}
              guides={false}
              onInitialized={(instance) => {
                setCropper(instance);
                setLoading(false);
              }}
            />

            <Loading loading={loading} size={50} />

            <Container className="cropperBtns">
              <Button
                className="cropperBtn"
                onClick={handleCropperSave}
                fullWidth
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className="cropperBtn"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedImage('');
                }}
              >
                Back
              </Button>
            </Container>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ImageCropper;
