import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import {
  TextInput,
  Textarea,
  Button,
  Text,
  Grid,
  Paper,
  Title,
  Image,
  FileButton,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import artistApi from '@/api/artist-api';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export default function CreateArtistTable() {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [artistName, setArtistName] = useState(state?.name || '');
  const [artistBio, setArtistBio] = useState(state?.bio || '');
  const [artistImage, setArtistImage] = useState(state?.image || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  let edit = false;

  if (state?.bio !== undefined) {
    edit = true;
  }

  const handleImageChange = async (file: File) => {
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5,
          useWebWorker: true,
          maxIteration: 10,
        };
        const compressedFile = await imageCompression(file, options);
        const compressedBase64 = await imageCompression.getDataUrlFromFile(compressedFile);

        setArtistImage(compressedBase64);
      } catch (error) {
        console.error('Error while compressing the image:', error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!artistName) {
      setErrorMessage('Please fill in artist name.');
      return;
    }

    if (!artistBio) {
      setErrorMessage('Please fill in artist bio');
      return;
    }

    if (artistBio.length < 5) {
      setErrorMessage('Minimum characters for artist bio is 5.');
      return;
    }

    if (!artistImage) {
      setErrorMessage('Please, submit image for the artist.');
      return;
    }

    let artistData;

    try {
      if (edit) {
        artistData = {
          name: artistName,
          bio: artistBio,
          image: artistImage,
        };

        await artistApi.update(state.id, artistData);
      } else {
        artistData = {
          name: artistName,
          bio: artistBio,
          image: artistImage,
        };

        await artistApi.create(artistData);
      }

      navigate('/');
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid
      justify="center"
      style={{
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40px',
        maxWidth: '800px',
      }}
    >
      <Grid.Col span={12}>
        <Paper withBorder shadow="md" radius="md" p="lg">
          <Title order={3} style={{ textAlign: 'center' }} mb="lg">
            {state?.name ? `Edit ${state.name}` : 'Create new artist'}
          </Title>

          {errorMessage && (
            <Text color="red" style={{ textAlign: 'center' }} mb="md" size="md">
              {errorMessage}
            </Text>
          )}

          <TextInput
            label="Artist Name"
            placeholder="Enter the name"
            value={artistName}
            onChange={(e) => setArtistName(e.currentTarget.value)}
            required
            mb="md"
          />
          <Text>Artist bio</Text>
          <ReactQuill
            value={artistBio}
            onChange={setArtistBio}
            theme="snow"
            style={{ height: '200px', width: '100%', marginBottom: '150px' }}
          />

          <FileButton onChange={(file) => {
            setFile(file);
            if (file) {
              handleImageChange(file);
            }
          }} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>

          {artistImage && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Image
                src={artistImage}
                alt="Arist Image Preview"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="filled"
            color="blue"
            mt="md"
          >
            Submit Article
          </Button>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
