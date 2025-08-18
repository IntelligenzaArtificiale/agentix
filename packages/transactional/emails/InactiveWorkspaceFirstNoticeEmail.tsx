import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import { env } from "@typebot.io/env";
import type { SendMailOptions } from "nodemailer";
import type { ComponentProps } from "react";
import { sendEmail } from "../helpers/sendEmail";
import { link } from "../marketing/styles";
import { Logo } from "./components/Logo";
import { container, footerText, hr, main, paragraph } from "./styles";

interface Props {
  workspaceId: string;
  workspaceName: string;
}

export const InactiveWorkspaceFirstNoticeEmail = ({
  workspaceId,
  workspaceName,
}: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Text style={paragraph}>
          Sono passati almeno 60+ giorni da quando lo spazio di lavoro{" "}
          <strong>{workspaceName}</strong>{" "}
          è stato inattivo. Significa che non hai effettuato l’accesso o che i
          tuoi typebot non hanno ricevuto traffico negli ultimi 60 giorni. <br />
          <br />
          <strong>
            Lo abbiamo automaticamente programmato per l’eliminazione tra 30 giorni.
          </strong>{" "}
          Tutti i suoi typebot e i risultati raccolti saranno eliminati in modo permanente.
        </Text>
        <Text>
          Ricevi questa email perché sei un amministratore di quello
          spazio di lavoro.
        </Text>
        <Text style={paragraph}>
          Per mantenere attivo il tuo spazio di lavoro, ti basta{" "}
          <Link
            href={`${env.NEXTAUTH_URL}/typebots?workspaceId=${workspaceId}`}
          >
            accedere al tuo account Typebot
          </Link>{" "}
          e verrà nuovamente contrassegnato come attivo.
        </Text>
        <Text style={paragraph}>
          Questa può essere una buona occasione per riscoprire Typebot! Da quando
          hai effettuato l’ultimo accesso sono state aggiunte molte nuove
          funzionalità, inclusi nuovi blocchi, più integrazioni con l’IA e molte
          altre migliorie.
        </Text>
        <Hr style={hr} />
        <Text style={footerText}>Agentix - Costruisci più velocemente, chatta in modo più intelligente</Text>
        <Link
          href="{{unsubscribe}}"
          target="_blank"
          style={{ ...link, color: "#898989", fontSize: "12px" }}
        >
          Annulla iscrizione
        </Link>
      </Container>
    </Body>
  </Html>
);


InactiveWorkspaceFirstNoticeEmail.PreviewProps = {
  workspaceName: "My Workspace",
} as Props;

export default InactiveWorkspaceFirstNoticeEmail;

export const sendInactiveWorkspaceFirstNoticeEmail = async ({
  to,
  ...props
}: Pick<SendMailOptions, "to"> &
  ComponentProps<typeof InactiveWorkspaceFirstNoticeEmail>) =>
  sendEmail({
    to,
    subject: `Your '${props.workspaceName}' workspace in Attio is inactive and will be deleted soon`,
    html: await render(<InactiveWorkspaceFirstNoticeEmail {...props} />),
  });
