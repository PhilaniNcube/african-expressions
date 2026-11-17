import type { CSSProperties } from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  render,
} from 'react-email';

const colors = {
  accent: '#a09258',
  dark: '#5c501e',
  deep: '#414042',
  page: '#f4f3ef',
  card: '#faf9f5',
  border: '#e5e1d6',
  muted: '#77766e',
  white: '#ffffff',
};

export type ContactNotificationProps = {
  name: string;
  email: string;
  number: string;
  message: string;
  submittedAt: string;
};

/**
 * Notification email for a contact form submission.
 *
 * Kept to inline styles and table-based components (React Email) so it renders
 * consistently in Gmail, Outlook and Apple Mail. Colours mirror the website's
 * Tailwind theme (deep #414042, accent #a09258).
 */
export function ContactNotificationEmail({
  name,
  email,
  number,
  message,
  submittedAt,
}: ContactNotificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{`New contact message from ${name}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>African Expressions</Text>
            <Text style={tagline}>Website contact form</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>New contact message</Heading>
            <Text style={intro}>
              Someone sent a message through the contact form on
              africanexpressions.co.za.
            </Text>

            <Section style={details}>
              <Text style={fieldLabel}>Name</Text>
              <Text style={fieldValue}>{name}</Text>

              <Hr style={divider} />

              <Text style={fieldLabel}>Email</Text>
              <Text style={fieldValue}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>

              <Hr style={divider} />

              <Text style={fieldLabel}>Phone</Text>
              <Text style={fieldValue}>{number}</Text>
            </Section>

            <Text style={messageLabel}>Message</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Button href={`mailto:${email}`} style={button}>
              Reply to sender
            </Button>

            <Hr style={footerDivider} />
            <Text style={footer}>
              Sent from the African Expressions website contact form on{' '}
              {submittedAt}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export async function renderContactNotification(props: ContactNotificationProps) {
  const html = await render(<ContactNotificationEmail {...props} />);

  // Built by hand rather than derived from the HTML so the message keeps its
  // paragraph breaks in plain-text email clients.
  const text = [
    'African Expressions - website contact form',
    '',
    `New contact message from ${props.name}`,
    '',
    `Name: ${props.name}`,
    `Email: ${props.email}`,
    `Phone: ${props.number}`,
    '',
    'Message:',
    props.message,
    '',
    `Sent on ${props.submittedAt}.`,
  ].join('\n');

  return { html, text };
}

const body: CSSProperties = {
  backgroundColor: colors.page,
  fontFamily: 'Helvetica, Arial, sans-serif',
  margin: 0,
  padding: '32px 12px',
};

const container: CSSProperties = {
  backgroundColor: colors.white,
  border: `1px solid ${colors.border}`,
  borderRadius: '10px',
  margin: '0 auto',
  maxWidth: '600px',
  overflow: 'hidden',
  width: '100%',
};

const header: CSSProperties = {
  backgroundColor: colors.deep,
  borderTop: `4px solid ${colors.accent}`,
  padding: '28px 40px',
};

const brand: CSSProperties = {
  color: colors.white,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '22px',
  letterSpacing: '1px',
  lineHeight: '28px',
  margin: 0,
};

const tagline: CSSProperties = {
  color: colors.accent,
  fontSize: '12px',
  letterSpacing: '2px',
  lineHeight: '16px',
  margin: '6px 0 0',
  textTransform: 'uppercase',
};

const content: CSSProperties = {
  padding: '32px 40px 36px',
};

const heading: CSSProperties = {
  color: colors.deep,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '24px',
  fontWeight: 400,
  lineHeight: '30px',
  margin: '0 0 8px',
};

const intro: CSSProperties = {
  color: colors.muted,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 24px',
};

const details: CSSProperties = {
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '20px 24px',
};

const fieldLabel: CSSProperties = {
  color: colors.muted,
  fontSize: '11px',
  letterSpacing: '1.5px',
  lineHeight: '16px',
  margin: '0 0 4px',
  textTransform: 'uppercase',
};

const fieldValue: CSSProperties = {
  color: colors.deep,
  fontSize: '15px',
  lineHeight: '22px',
  margin: 0,
};

const link: CSSProperties = {
  color: colors.dark,
  textDecoration: 'underline',
};

const divider: CSSProperties = {
  borderColor: colors.border,
  margin: '14px 0',
};

const messageLabel: CSSProperties = {
  ...fieldLabel,
  margin: '26px 0 6px',
};

const messageBox: CSSProperties = {
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderLeft: `3px solid ${colors.accent}`,
  borderRadius: '6px',
  margin: '0 0 26px',
  padding: '18px 22px',
};

const messageText: CSSProperties = {
  color: colors.deep,
  fontSize: '15px',
  lineHeight: '24px',
  margin: 0,
  whiteSpace: 'pre-wrap',
};

const button: CSSProperties = {
  backgroundColor: colors.accent,
  borderRadius: '4px',
  color: colors.white,
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  lineHeight: '20px',
  padding: '12px 26px',
  textDecoration: 'none',
};

const footerDivider: CSSProperties = {
  borderColor: colors.border,
  margin: '28px 0 16px',
};

const footer: CSSProperties = {
  color: colors.muted,
  fontSize: '12px',
  lineHeight: '18px',
  margin: 0,
};
