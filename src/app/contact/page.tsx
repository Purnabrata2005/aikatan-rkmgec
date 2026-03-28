import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-black/40 pointer-events-none"></div>
      
      <ContactForm />
    </div>
  );
};

export default ContactPage;
