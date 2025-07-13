import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import * as React from "react";

interface ResetPasswordEmailProps {
  passwordResetLink: string;
}

export const ResetPasswordEmail = ({
  passwordResetLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Password Reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Please reset your password.</Text>
            <Button style={button} href={passwordResetLink}>
              Reset Password
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  padding: "12px 24px",
  textDecoration: "none",
};

export default ResetPasswordEmail;
