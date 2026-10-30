import { MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

type ContactSettings = {
  phoneNumber: string;
  phoneEnabled: boolean;
  whatsappNumber: string;
  whatsappEnabled: boolean;
};

type FloatingContactButtonsProps = {
  settings: ContactSettings;
};

const normalizePhone = (value: string) => value.replace(/\D/g, '');

const normalizeWhatsApp = (raw: string) => {
  const digits = normalizePhone(raw);
  if (!digits) return '';
  return digits.startsWith('91') ? digits : `91${digits}`;
};

const buttonBase =
  'group relative flex items-center justify-center rounded-full border border-white/30 bg-slate-900 text-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export function FloatingContactButtons({ settings }: FloatingContactButtonsProps) {
  const phoneHref = settings.phoneEnabled ? `tel:${normalizePhone(settings.phoneNumber)}` : '#';
  const whatsappNumber = normalizeWhatsApp(settings.whatsappNumber);
  const whatsappHref = settings.whatsappEnabled && whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#';

  const action = (href: string, label: string, icon: ReactNode, enabled: boolean) => ({
    href,
    label,
    icon,
    enabled,
  });

  const items = [
    action(phoneHref, 'Call GATE Degree College', <Phone size={18} />, settings.phoneEnabled),
    action(whatsappHref, 'Contact GATE Degree College on WhatsApp', <MessageCircle size={18} />, settings.whatsappEnabled && !!whatsappNumber),
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 sm:bottom-20 sm:right-5">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.enabled ? item.href : undefined}
          aria-label={item.label}
          aria-disabled={!item.enabled}
          tabIndex={item.enabled ? 0 : -1}
          title={item.label}
          className={`${buttonBase} h-12 w-12 sm:h-14 sm:w-14 ${!item.enabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          onClick={(event) => {
            if (!item.enabled) event.preventDefault();
          }}
        >
          <span className="flex items-center justify-center">{item.icon}</span>
          <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 rounded-full bg-slate-900 px-3 py-1 text-xs text-white shadow-lg group-hover:block md:block">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}

export default FloatingContactButtons;
