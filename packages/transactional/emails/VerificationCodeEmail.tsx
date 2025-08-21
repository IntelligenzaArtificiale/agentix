import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import type { SendMailOptions } from "nodemailer";
import type { ComponentProps } from "react";
import { sendEmail } from "../helpers/sendEmail";
import { Logo } from "./components/Logo";
import {
  codeStyle,
  container,
  footerText,
  heading,
  hr,
  main,
  paragraph,
} from "./styles";

interface Props {
  code: string;
}

export const VerificationCodeEmail = ({ code }: Props) => (
  <Html>
    <Head />
    <Preview>Il tuo codice di accesso per Agentix</Preview>
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Heading style={heading}>Il tuo codice di accesso per Agentix</Heading>
        <code style={codeStyle}>{code}</code>
        <Text style={paragraph}>
          Questo codice sarà valido solo per la prossima ora.
        </Text>
        <Hr style={hr} />
        <Text style={footerText}>Agentix - Costruisci più velocemente, converti in modo più intelligente</Text>
      </Container>
    </Body>
  </Html>
);

VerificationCodeEmail.PreviewProps = {
  code: "free-rrree-free-rrree",
} as Props;

export default VerificationCodeEmail;

export const sendVerificationCodeEmail = async ({
  to,
  ...props
}: Pick<SendMailOptions, "to"> &
  ComponentProps<typeof VerificationCodeEmail>) =>
  sendEmail({
    to,
    subject: "Il tuo codice di accesso per Agentix",
    html: await render(<VerificationCodeEmail {...props} />),
  });
