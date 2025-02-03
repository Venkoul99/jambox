import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message);
    }
  };

  return (
    <Container
      size="xs"
      my={5}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px'
      }}
    >
      <Paper shadow="xl" withBorder radius="md" p="xl" style={{ width: '100%' }}>
        <Title order={2} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Login
        </Title>

        {errorMessage && (
          <Text color="red" style={{ textAlign: "center" }} mb="md" size="md">
            {errorMessage}
          </Text>
        )}

        <Stack gap="lg">

          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%' }}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            onClick={handleSubmit}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              fontWeight: 600,
            }}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
