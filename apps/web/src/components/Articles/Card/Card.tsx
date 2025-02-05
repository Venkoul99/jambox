import { Image, Card as MantineCard, Text, Group, ActionIcon, Modal, Button } from '@mantine/core';
import { AuthContext } from '@/context/authContext';
import { Edit, Trash } from 'tabler-icons-react';
import { useContext, useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import articleApi from '@/api/articles-api';
import { useDisclosure } from '@mantine/hooks';
import { ensureLinksOpenInNewTab } from '@/tools/ensureLinkOpensInNewTab';


interface CardProps {
  id?: string;
  article: string;
  content: string;
  shortContent: string;
  image: string;
  isSingle: boolean;
}

export default function Card(props: CardProps) {
  const { isAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.id) {
      navigate('/admin/create-new-article', {
        state: {
          id: props.id,
          article: props.article,
          content: props.content,
          image: props.image,
        },
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.id) {
      try {
        await articleApi.remove(props.id);
        navigate('/');
      } catch (err) {
        const error = err as Error;
        setErrorMessage(error.message)
      }
    }
  };

  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/article/${props.id}`);
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
            {props.article}
          </span>
        </Text>

        <div>
          {/* {props.shortContent && !props.isSingle ? (
            <Text className={styles.description}>
              <span dangerouslySetInnerHTML={{ __html: ensureLinksOpenInNewTab(props.shortContent) }} />
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
          ) : ( */}
          <Text className={styles.description}>
            <span dangerouslySetInnerHTML={{ __html: ensureLinksOpenInNewTab(props.content) }} />
          </Text>
          {/* )} */}
        </div>
      </MantineCard>
    </div >
  );
}
