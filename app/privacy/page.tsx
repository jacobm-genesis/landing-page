import type { Metadata } from "next";
import Link from "next/link";
import { company, ContactDetails, LegalPage, type LegalSection } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Genesis Home Buyers LLC",
  description: "How Genesis Home Buyers LLC collects, uses, and protects your information, including our SMS text messaging practices.",
};

const sections: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: (
      <>
        <p>When you request a cash offer or otherwise contact us, you may give us:</p>
        <ul>
          <li>Your name, email address, and mobile phone number</li>
          <li>Your property address and details you share about the property or your situation</li>
          <li>Anything else you choose to tell us by phone, text, or email</li>
        </ul>
        <p>When you visit our website, basic technical information such as your IP address, browser type, device type, and pages visited may be collected automatically by our website host for security and performance purposes.</p>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <ul>
        <li>To review your property and prepare a cash offer</li>
        <li>To contact you by phone, email, or text message about your request, offer, and closing</li>
        <li>To answer your questions and provide customer support</li>
        <li>To operate, secure, and improve our website</li>
        <li>To comply with legal obligations</li>
      </ul>
    ),
  },
  {
    heading: "SMS / Text Messaging",
    body: (
      <>
        <p>If you provide your mobile number and consent to receive text messages, {company} may send you SMS messages about your property inquiry, including offer updates, appointment scheduling and reminders, and follow-up on your request.</p>
        <ul>
          <li><strong>Consent:</strong> You opt in by submitting your mobile number through our website form or by texting us first. Consent to receive text messages is not a condition of selling your property or of any purchase.</li>
          <li><strong>Message frequency:</strong> Message frequency varies based on your inquiry.</li>
          <li><strong>Costs:</strong> Message and data rates may apply according to your mobile carrier plan.</li>
          <li><strong>Opt out:</strong> Reply <strong>STOP</strong> to any message at any time to unsubscribe. You will receive one final message confirming you have been unsubscribed, and no further messages will be sent.</li>
          <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance, or contact us using the details below.</li>
          <li><strong>Carriers:</strong> Mobile carriers are not liable for delayed or undelivered messages.</li>
        </ul>
        <p>Full text messaging program terms are in our <Link href="/terms" className="text-accent-700 underline underline-offset-4">Terms &amp; Conditions</Link>.</p>
        <p><strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> Text messaging originator opt-in data and consent are excluded from all information sharing described in this policy and will not be shared with any third parties.</p>
      </>
    ),
  },
  {
    heading: "How We Share Information",
    body: (
      <>
        <p>We do not sell or rent your personal information. We share it only as follows:</p>
        <ul>
          <li><strong>Service providers</strong> that help us run our business, such as website hosting, customer relationship management, and messaging platforms. They may use your information only to provide services to us and must protect it.</li>
          <li><strong>Closing partners</strong> such as title companies and closing attorneys, only when you choose to move forward with a sale and only as needed to complete it.</li>
          <li><strong>Legal requirements</strong>, when required by law, subpoena, or court order, or to protect our rights, property, or safety or that of others.</li>
        </ul>
        <p>None of the sharing above includes mobile phone numbers or SMS opt-in data for marketing or promotional purposes.</p>
      </>
    ),
  },
  {
    heading: "Data Retention",
    body: <p>We keep your information only as long as needed to respond to your inquiry, complete any transaction, and meet our legal, tax, and record-keeping obligations. After that, we delete it or keep it in a form that no longer identifies you.</p>,
  },
  {
    heading: "How We Protect Your Information",
    body: <p>We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.</p>,
  },
  {
    heading: "Your Choices",
    body: (
      <ul>
        <li>Reply <strong>STOP</strong> to opt out of text messages at any time.</li>
        <li>Click “unsubscribe” in any marketing email, or ask us to stop emailing you.</li>
        <li>Contact us to request access to, correction of, or deletion of your personal information. Depending on where you live, you may have additional rights under state law, and we will honor requests as required.</li>
      </ul>
    ),
  },
  {
    heading: "Children’s Privacy",
    body: <p>Our website and services are not directed to children under 18, and we do not knowingly collect personal information from children.</p>,
  },
  {
    heading: "Changes to This Policy",
    body: <p>We may update this policy from time to time. The updated version will be posted on this page with a new effective date.</p>,
  },
  {
    heading: "Contact Us",
    body: (
      <>
        <p>If you have questions about this policy or our text messaging program, contact us:</p>
        <ContactDetails />
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="September 30, 2026"
      intro={<>{company} (“Genesis,” “we,” “us”) respects your privacy. This policy explains what information we collect when you use our website or communicate with us, including by text message, and how we use and protect it.</>}
      sections={sections}
    />
  );
}
