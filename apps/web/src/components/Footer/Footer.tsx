import { Container, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer style={{ padding: '20px 0' }}>
      <Container>
        <Group>
          <Link to="/terms-and-conditions">
            <Text size="sm" style={{ color: '#FF5733' }}>Terms and Conditions</Text>
          </Link>
          <Link to="/legal-information">
            <Text size="sm" style={{ color: '#FF5733' }}>Legal Information</Text>
          </Link>
          <Link to="/privacy">
            <Text size="sm" style={{ color: '#FF5733' }}>Privacy Protection</Text>
          </Link>
        </Group>
      </Container>
    </footer>
  );
}
