import { Container, Title, Text, Divider } from '@mantine/core';

export function LegalInformation() {
  return (
    <Container style={{ padding: '40px 0' }}>
      <Title order={1}>Legal Information</Title>

      <Text style={{ marginTop: '20px' }}>
        [Your Website Name] is operated by [Your Company Name], a company registered in [Your Country], with the following registration details:
      </Text>

      <Text>
        - Company Registration Number: [Registration Number]<br />
        - Registered Office: [Your Company Address]<br />
        - Contact Information: [Email Address], [Phone Number]
      </Text>

      <Divider my="lg" />

      <Title order={2}>Business Operations</Title>
      <Text>
        [Your Website Name] operates an online platform providing [brief description of your services, e.g., products, information, etc.]. We are committed to providing high-quality services to our users while complying with relevant laws and regulations.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Disclaimer</Title>
      <Text>
        While we strive to provide accurate and up-to-date information on this website, we make no representations or warranties regarding the completeness, accuracy, or reliability of any content on the site. The use of this website is at your own risk.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Third-Party Links</Title>
      <Text>
        This website may contain links to third-party websites. We are not responsible for the content, accuracy, or opinions expressed on third-party websites. These links are provided for convenience, and we do not endorse or assume responsibility for any content or services offered by third-party websites.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Limitation of Liability</Title>
      <Text>
        To the maximum extent permitted by law, [Your Website Name] and its affiliates are not liable for any damages or losses resulting from the use or inability to use this website, including, but not limited to, any loss of data, profits, or business opportunities.
      </Text>
    </Container>
  );
}
