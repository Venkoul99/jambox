import { Container, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer style={{ padding: '20px 0' }}>
      <Container>
        <Group>
          <Link to="/terms-and-conditions">
            <Text size="sm">Terms and Conditions</Text>
          </Link>
          <Link to="/legal-information">
            <Text size="sm">Legal Information</Text>
          </Link>
          <Link to="/privacy">
            <Text size="sm">Privacy Protection</Text>
          </Link>
        </Group>
      </Container>
    </footer>
  );
}
