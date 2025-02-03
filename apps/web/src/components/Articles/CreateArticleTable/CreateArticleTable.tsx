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
import articleApi from '@/api/articles-api';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateArticleTable() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState(state?.article || '');
  const [articleContent, setArticleContent] = useState(state?.content || '');
  const [articleImage, setArticleImage] = useState(state?.image || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  let edit = false;

  if (state?.article !== undefined) {
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

        setArticleImage(compressedBase64);
      } catch (error) {
        console.error('Error while compressing the image:', error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!articleTitle) {
      setErrorMessage('Please fill in article title.');
      return;
    }

    if (articleTitle.length < 3) {
      setErrorMessage('Minimum characters for article title is 3.');
      return;
    }

    if (!articleContent) {
      setErrorMessage('Please fill in article content');
      return;
    }

    if (articleContent.length < 5) {
      setErrorMessage('Minimum characters for article content is 5.');
      return;
    }

    if (!articleImage) {
      setErrorMessage('Please, submit image for the article.');
      return;
    }

    let articleData;

    try {
      if (edit) {
        articleData = {
          article: articleTitle,
          content: articleContent,
          image: articleImage,
        };

        await articleApi.update(state.id, articleData);
      } else {
        articleData = {
          article: articleTitle,
          content: articleContent,
          image: articleImage,
        };

        await articleApi.create(articleData);
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
      {/* Article Form */}
      <Grid.Col span={12}>
        <Paper withBorder shadow="md" radius="md" p="lg">
          <Title order={3} style={{ textAlign: 'center' }} mb="lg">
            Create a New Article
          </Title>

          {errorMessage && (
            <Text color="red" style={{ textAlign: 'center' }} mb="md" size="md">
              {errorMessage}
            </Text>
          )}

          <TextInput
            label="Article Title"
            placeholder="Enter the title"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.currentTarget.value)}
            required
            mb="md"
          />
          <Textarea
            label="Content"
            placeholder="Write your article content"
            value={articleContent}
            onChange={(e) => setArticleContent(e.currentTarget.value)}
            required
            autosize
            minRows={4}
            mb="md"
          />

          <FileButton onChange={(file) => {
            setFile(file);
            if (file) {
              handleImageChange(file);
            }
          }} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>

          {articleImage && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Image
                src={articleImage}
                alt="Article Image Preview"
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
