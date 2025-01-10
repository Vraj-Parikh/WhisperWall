import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PlaidVerifyIdentityEmailProps {
  username: string;
  verificationCode: string;
}

const VerificationEmailTemplate = ({
  username,
  verificationCode,
}: PlaidVerifyIdentityEmailProps) => {
  const contactEmail =
    process.env.NEXT_PUBLIC_NODEMAILER_USER || "vrajparikh151@gmail.com";
  const logoURL = process.env.NEXT_PUBLIC_EMAIL_LOGO_SRC;
  console.log(logoURL);
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={tertiary}>Verify Your Identity</Text>
          <Text style={primary}>Hello {username},</Text>
          <Text style={secondary}>
            Enter the following code to finish your registration.
          </Text>
          <Section style={codeContainer}>
            <Text style={code}>{verificationCode}</Text>
          </Section>
          <Text style={paragraph}>Not expecting this email?</Text>
          <Text style={paragraph}>
            Contact{" "}
            <Link href={contactEmail} style={link}>
              {contactEmail}
            </Link>{" "}
            if you did not request this code.
          </Text>
        </Container>
        <Text style={footer}>Securely powered by Whisper Wall.</Text>
      </Body>
    </Html>
  );
};

//TODO doubt
VerificationEmailTemplate.PreviewProps = {
  verificationCode: "144833",
} as PlaidVerifyIdentityEmailProps;

export default VerificationEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "10px",
  boxShadow: "0 5px 10px rgba(20,50,70,.2)",
  marginTop: "20px",
  maxWidth: "360px",
  margin: "0 auto",
  padding: "40px 40px 40px 40px",
};

const tertiary = {
  color: "#0a85ea",
  fontSize: "18px",
  fontWeight: 700,
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  height: "16px",
  letterSpacing: "0",
  lineHeight: "16px",
  margin: "16px 8px 8px 8px",
  textTransform: "uppercase" as const,
  textAlign: "center" as const,
};

const secondary = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: "24px",
  marginBottom: "0",
  marginTop: "0",
  // textAlign: "center" as const,
};
const primary = {
  color: "#000",
  display: "block",
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: "28px",
  marginBottom: "0",
  marginTop: "24px",
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#444",
  fontSize: "12px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  letterSpacing: "0",
  lineHeight: "23px",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};

const link = {
  color: "#444",
  textDecoration: "underline",
};

const footer = {
  color: "#000",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0",
  lineHeight: "23px",
  margin: "0",
  marginTop: "20px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
};
