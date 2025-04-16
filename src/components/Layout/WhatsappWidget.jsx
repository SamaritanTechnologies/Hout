import React from "react";
import whatsappIcon from "../../assets/whatsapp-icon.svg";

export function WhatsappWidget() {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    import.meta.env.VITE_WHATSAPP_INITIAL_MESSAGE
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed z-50 right-5 bottom-5">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="size-16" />
      </a>
    </div>
  );
}
