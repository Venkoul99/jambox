import { Container, Title, Text, Divider } from '@mantine/core';

export function PrivacyProtection() {
  return (
    <Container style={{ padding: '40px 0' }}>
      <Title order={1}>Privacy Protection</Title>

      <Text style={{ marginTop: '20px' }}>
        [Your Website Name] values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our website, located at [Your Website URL].
      </Text>

      <Divider my="lg" />

      <Title order={2}>Information We Collect</Title>
      <Text>
        We may collect the following types of information:
      </Text>
      <ul>
        <li><strong>Personal Information</strong>: When you create an account or contact us, we may collect your name, email address, phone number, and other necessary details.</li>
        <li><strong>Usage Data</strong>: We automatically collect information about how you interact with our website, including your IP address, browser type, and pages visited.</li>
        <li><strong>Cookies</strong>: Our website does not use cookies to collect personal information or track your activities.</li>
      </ul>

      <Divider my="lg" />

      <Title order={2}>How We Use Your Information</Title>
      <Text>
        We use the information we collect to provide you with better services, including:
      </Text>
      <ul>
        <li>Managing your account and providing customer support</li>
        <li>Improving the functionality and usability of our website</li>
        <li>Communicating with you about updates, news, or promotions (if you opt-in)</li>
      </ul>

      <Divider my="lg" />

      <Title order={2}>Data Security</Title>
      <Text>
        We take the security of your personal information seriously. We use industry-standard encryption and security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Data Sharing</Title>
      <Text>
        We do not share, sell, or rent your personal data to third parties for their marketing purposes. We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or providing services to you, but they are obligated to keep your information confidential.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Your Rights</Title>
      <Text>
        You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us at [email address].
      </Text>

      <Divider my="lg" />

      <Title order={2}>Children's Privacy</Title>
      <Text>
        Our website is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children under 13. If we discover that we have inadvertently collected such information, we will take steps to delete it.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Changes to This Policy</Title>
      <Text>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the effective date will be updated accordingly. Please review this page periodically to stay informed about our privacy practices.
      </Text>

      <Divider my="lg" />

      <Title order={2}>Contact Us</Title>
      <Text>
        If you have any questions or concerns about this Privacy Policy, please contact us at [email address].
      </Text>
    </Container>
  );
}
