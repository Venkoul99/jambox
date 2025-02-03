import { Image, Card as MantineCard, Text, Group, ActionIcon, Modal, Button } from '@mantine/core';
import { AuthContext } from '@/context/authContext';
import { Edit, Trash } from 'tabler-icons-react';
import { useContext, useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import artistApi from '@/api/artist-api';
import { useDisclosure } from '@mantine/hooks';

interface CardProps {
  id?: string;
  name: string;
  bio: string;
  shortBio: string;
  image: string;
  isSingle: boolean;
}

export default function ArtistCard(props: CardProps) {
  const { isAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.id) {
      navigate('/admin/create-new-artist', {
        state: {
          id: props.id,
          name: props.name,
          bio: props.bio,
          image: props.image,
        },
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.id) {
      try {
        await artistApi.remove(props.id);
        navigate('/');
      } catch (err) {
        const error = err as Error;
        setErrorMessage(error.message)
      }
    }
  };

  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/artists/${props.id}`);
  };

  return (
    <div className={`${styles.container} ${styles.single}`}>
      {errorMessage && (
        <Text color="red" style={{ textAlign: 'center' }} mb="md" size="md">
          {errorMessage}
        </Text>
      )}

      <Modal opened={opened} onClose={close} title="Confirm Deletion" centered>
        <Text size="md">
          Are you sure you want to delete this article? This action cannot be undone.
        </Text>

        <Group mt="md">
          <Button color="red" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outline" onClick={close}>No, Cancel</Button>
        </Group>
      </Modal>

      <MantineCard className={styles.card} withBorder shadow="sm" radius="см">

        {isAuthenticated && props.isSingle ? (
          <Group className={styles.actionGroup}>
            <ActionIcon size="md" color="blue" variant="light" >
              <Edit onClick={handleEdit} size={16} />
            </ActionIcon>
            <ActionIcon size="md" color="red" variant="light" >
              <Trash onClick={open} size={16} />
            </ActionIcon>
          </Group>
        ) : ''}

        <div className={styles.imageContainer}>
          <Image
            src={props.image}
            alt="Card Image"
            radius="sm"
            fit="contain"
            className={styles.image}
          />
        </div>

        <Text className={styles.title}>
          <span
            onClick={handleViewMore}
            className={styles.clickableTitle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleViewMore;
              }
            }}
          >
            {props.name}
          </span>
        </Text>

        <div>
          {props.shortBio && !props.isSingle ? (
            <Text className={styles.description}>
              {props.shortBio}
              {' '}
              <span
                role="button"
                tabIndex={0}
                onClick={handleViewMore}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleViewMore;
                  }
                }}
                style={{
                  color: '#db9d00',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                View More
              </span>
            </Text>
          ) : (
            <Text className={styles.description}>{props.bio}</Text>
          )}
        </div>
      </MantineCard>
    </div >
  );
}
