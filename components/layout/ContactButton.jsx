import React from 'react';
import { useRouter } from 'next/router';

function ContactButton() {
  const router = useRouter();

  return (
    <button
      className="fixed z-[1000] bottom-5 right-10 md:right-44 bg-deep uppercase rounded-md text-white text-xl px-6 py-1"
      onClick={() => router.push('/contact')}
    >
      Contact Us
    </button>
  );
}

export default ContactButton;
