import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Img,
  Tailwind,
  Hr,
  Link,
} from "@react-email/components";

interface PasswordResetProps {
  resetLink: string;
}

export function PasswordReset({ resetLink }: PasswordResetProps) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white rounded-lg shadow-md max-w-md mx-auto my-8">
            {/* Header with Logo */}
            <Section className="bg-indigo-600 text-center py-6 rounded-t-lg">
              <Img
                src="https://via.placeholder.com/150x50.png?text=Your+Logo"
                alt="YourAppName Logo"
                width="150"
                height="50"
                className="mx-auto"
              />
            </Section>

            {/* Main Content */}
            <Section className="px-6 py-8">
              <Heading className="text-2xl font-bold text-gray-800 text-center mb-4">
                Password Reset Request
              </Heading>
              <Text className="text-gray-600 text-base leading-relaxed mb-4">
                Hello,
              </Text>
              <Text className="text-gray-600 text-base leading-relaxed mb-6">
                We have received a request to reset your password. Click the
                button below to reset it:
              </Text>
              <Button
                href={resetLink}
                className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md block text-center mx-auto"
              >
                Reset Password
              </Button>
              <Text className="text-gray-500 text-sm leading-relaxed mt-6">
                This link will expire in 1 hour for security reasons. If you
                didn’t request a password reset, please ignore this email or
                contact our support team.
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200" />
            <Section className="px-6 py-4 text-center">
              <Text className="text-gray-500 text-sm mb-2">
                © 2025 Kanban Board. All rights reserved.
              </Text>
              <Link
                href="https://your-app.com/support"
                className="text-indigo-600 text-sm underline"
              >
                Contact Support
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
