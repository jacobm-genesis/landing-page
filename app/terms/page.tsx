import type { Metadata } from "next";
import Link from "next/link";
import { company, contact, ContactDetails, LegalPage, type LegalSection } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Genesis Home Buyers LLC",
  description: "Terms for using the Genesis Home Buyers LLC website and our SMS text messaging program.",
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of These Terms",
    body: <p>By using our website, submitting a request for an offer, or opting in to text messages from {company}, you agree to these Terms &amp; Conditions and to our <Link href="/privacy" className="text-accent-700 underline underline-offset-4">Privacy Policy</Link>. If you do not agree, please do not use our website or services.</p>,
  },
  {
    heading: "Our Services",
    body: (
      <>
        <p>{company} buys residential real estate directly from homeowners. Requesting an offer is free and creates no obligation for you or for us.</p>
        <p>Any offer we make is an estimate based on the information available at the time and is not binding until both parties sign a written purchase agreement. Nothing on this website is legal, tax, or financial advice; we encourage you to consult your own advisors before selling your property.</p>
      </>
    ),
  },
  {
    heading: "SMS Text Messaging Program",
    body: (
      <>
        <p><strong>Program description:</strong> When you opt in, {company} will send you text messages, which may be sent using automated technology. These include messages about your property inquiry (such as offer updates, appointment scheduling and reminders, and follow-up on your request) and marketing and promotional messages about our home-buying services.</p>
        <ul>
          <li><strong>How to opt in:</strong> Check one or both of the optional text message consent boxes (one for non-marketing messages about your inquiry, one for marketing messages) when you submit the offer form on our website, or text us first. We send marketing messages only to people who checked the marketing box. Consent is not required to request an offer and is not a condition of any sale or purchase.</li>
          <li><strong>Message frequency:</strong> Message frequency varies based on your inquiry.</li>
          <li><strong>Costs:</strong> Message and data rates may apply according to your mobile carrier plan.</li>
          <li><strong>How to opt out:</strong> Text <strong>STOP</strong> to any message to cancel. You will receive one final confirmation message, and then no further messages will be sent. To rejoin, text <strong>START</strong> or opt in again on our website.</li>
          <li><strong>Help:</strong> Text <strong>HELP</strong> to any message for assistance, email <a href={`mailto:${contact.email}`} className="text-accent-700 underline underline-offset-4">{contact.email}</a>, or call <a href={contact.phoneHref} className="text-accent-700 underline underline-offset-4">{contact.phone}</a>.</li>
          <li><strong>Carriers:</strong> Mobile carriers are not liable for delayed or undelivered messages.</li>
          <li><strong>Eligibility:</strong> You must be at least 18 years old and the account holder of the mobile number, or have the account holder’s permission, to opt in.</li>
        </ul>
        <p><strong>Privacy:</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. See our <Link href="/privacy" className="text-accent-700 underline underline-offset-4">Privacy Policy</Link> for details.</p>
      </>
    ),
  },
  {
    heading: "Your Information",
    body: <p>You agree that the information you provide to us is accurate and that you are authorized to share it, including information about the property. Our <Link href="/privacy" className="text-accent-700 underline underline-offset-4">Privacy Policy</Link> explains how we collect, use, and protect it.</p>,
  },
  {
    heading: "Use of This Website",
    body: <p>You agree not to misuse our website, including by submitting false information, interfering with its operation, or attempting to access it by automated means. The content, logo, and design of this website belong to {company} and may not be copied without our permission.</p>,
  },
  {
    heading: "Disclaimers and Limitation of Liability",
    body: (
      <>
        <p>Our website and its content are provided “as is” without warranties of any kind. We do our best to keep information accurate but do not guarantee it is complete or current.</p>
        <p>To the fullest extent permitted by law, {company} is not liable for any indirect, incidental, or consequential damages arising from your use of our website or text messaging program.</p>
      </>
    ),
  },
  {
    heading: "Governing Law",
    body: <p>These terms are governed by the laws of the State of Florida, without regard to its conflict of law rules.</p>,
  },
  {
    heading: "Changes to These Terms",
    body: <p>We may update these terms from time to time. The updated version will be posted on this page with a new effective date. Continuing to use our website or text messaging program after an update means you accept the new terms.</p>,
  },
  {
    heading: "Contact Us",
    body: (
      <>
        <p>Questions about these terms or our text messaging program? Contact us:</p>
        <ContactDetails />
      </>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      effectiveDate="September 30, 2026"
      intro={<>These terms govern your use of the {company} website and our SMS text messaging program. Please read them carefully.</>}
      sections={sections}
    />
  );
}
