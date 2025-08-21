import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
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
  url: string;
  code: string;
}
export const LoginCodeEmail = ({ url, code }: Props) => (
  <Html>
    <Head />
    <Preview>Il tuo codice di accesso per Agentix</Preview>
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Heading style={heading}>Il tuo codice di accesso per Agentix</Heading>
        <code style={codeStyle}>{code}</code>
        <Text style={paragraph}>
          Questo codice sarà valido solo per i prossimi 5 minuti.
        </Text>
        <Text style={paragraph}>
          Puoi anche accedere <Link href={url}>cliccando qui</Link>.
        </Text>
        <Hr style={hr} />
        <Text style={footerText}>Agentix - Costruisci più velocemente, converti in modo più intelligente</Text>
      </Container>
    </Body>
  </Html>
);

LoginCodeEmail.PreviewProps = {
  url: "agentix.intelligenzaartificialeitalia.net",
  code: "654778",
} as Props;

export default LoginCodeEmail;

export const sendLoginCodeEmail = async ({
  to,
  ...props
}: Pick<SendMailOptions, "to"> & ComponentProps<typeof LoginCodeEmail>) =>
  sendEmail({
    to,
    subject: "Accedi ad Agentix",
    html: await render(<LoginCodeEmail {...props} />),
  });
