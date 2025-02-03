import { Container, Title, Text, Divider } from '@mantine/core';

export function TermsAndConditions() {
  return (
    <Container style={{ padding: '40px 0' }}>
      <Title order={1}>Terms and Conditions</Title>

      <Text style={{ marginTop: '20px' }}>
        Welcome to [Your Website Name]. These Terms and Conditions ("Terms") govern your use of our website, located at [Your Website URL], and any related services or products (collectively, "the Services"). By accessing or using our website, you agree to comply with these Terms. If you do not agree to these Terms, you may not use the Services.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Intellectual Property</Title>
      <Text>
        All content on this website, including but not limited to text, images, logos, graphics, videos, and software, is the property of [Your Website Name] or its licensors and is protected by copyright laws. You may not reproduce, modify, or distribute any content from this site without prior written permission from [Your Website Name].
      </Text>

      <Divider my="lg" />

      <Title order={2}>Use of Services</Title>
      <Text>
        You agree to use the Services only for lawful purposes. You are prohibited from using the website in any way that could damage, disable, overburden, or impair the Services, or interfere with the enjoyment of the website by other users.
      </Text>

      <Divider my="lg" />

      <Title order={2}>User Responsibilities</Title>
      <Text>
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Limitation of Liability</Title>
      <Text>
        To the fullest extent permitted by applicable law, Jambox will not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the website, even if [Your Website Name] has been advised of the possibility of such damages.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Changes to Terms</Title>
      <Text>
        [Your Website Name] reserves the right to modify or replace these Terms at any time. We will post the updated Terms on this page and notify you of any significant changes.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Governing Law</Title>
      <Text>
        These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles.
      </Text>
    </Container>
  );
}
