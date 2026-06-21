import { User, MessageCircle, Phone, Film } from "lucide-react";

const actions = [
  { icon: <User className="w-5 h-5" />, label: "যোগাযোগ করুন", href: "/chambers", color: "bg-primary text-white hover:bg-primary-dark" },
  { icon: <MessageCircle className="w-5 h-5" />, label: "হোয়াটসঅ্যাপ", href: "#", color: "bg-accent text-white hover:bg-accent-dark" },
  { icon: <Phone className="w-5 h-5" />, label: "কল করুন", href: "tel:+8801858405083", color: "bg-foreground text-white hover:bg-black" },
  { icon: <Film className="w-5 h-5" />, label: "ইউটিউব", href: "#", color: "bg-red-600 text-white hover:bg-red-700" },
];

export default function QuickActions() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {actions.map((a, i) => (
          <a
            key={i}
            href={a.href}
            className={`${a.color} flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-200 shadow-lg hover:-translate-y-0.5 active:scale-95 snap-start shrink-0`}
          >
            {a.icon}
            {a.label}
          </a>
        ))}
      </div>
    </section>
  );
}
