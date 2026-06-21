import { FileText, Clock } from "lucide-react";

const blogs = [
  {
    title: "হাঁটু ব্যথার কারণ ও আধুনিক চিকিৎসা ব্যবস্থা",
    excerpt:
      "হাঁটু ব্যথার বিভিন্ন কারণ ও তার আধুনিক চিকিৎসা পদ্ধতি সম্পর্কে বিস্তারিত আলোচনা...",
    content: `হাঁটু ব্যথা একটি খুব সাধারণ সমস্যা যা যেকোনো বয়সের মানুষকে প্রভাবিত করতে পারে। তবে বয়স বাড়ার সাথে সাথে এই সমস্যা আরও বেড়ে যায়।

হাঁটু ব্যথার প্রধান কারণসমূহ:
১. অস্টিওআর্থাইটিস (Osteoarthritis)
২. রিউমাটয়েড আর্থাইটিস (Rheumatoid Arthritis)
৩. ইনজুরি ও ফ্র্যাকচার
৪. মেনিস্কাস টিয়ার
৫. লিগামেন্ট ইনজুরি
৬. টেন্ডিনাইটিস

আধুনিক চিকিৎসা ব্যবস্থা:
- PRP থেরাপি
- ওজোন থেরাপি
- আর্থ্রোস্কোপিক সার্জারি
- ফিজিওথেরাপি ও রিহ্যাবিলিটেশন`,
    date: "১৫ জুন, ২০২৬",
    readTime: "৫ মিনিট",
    category: "হাঁটু ব্যথা",
  },
  {
    title: "কোমর ব্যথার ঘরোয়া প্রতিকার এবং কখন ডাক্তার দেখাবেন",
    excerpt: "কোমর ব্যথা থেকে মুক্তির উপায় এবং কখন বিশেষজ্ঞের পরামর্শ নেয়া জরুরি...",
    content: `কোমর ব্যথা (Back pain) বর্তমান সময়ে একটি অত্যন্ত সাধারণ সমস্যা।

ঘরোয়া প্রতিকার:
১. পর্যাপ্ত বিশ্রাম নিন
২. ঠান্ডা বা গরম সেঁক দিন
৩. হালকা স্ট্রেচিং ও ব্যায়াম করুন
৪. সঠিক ভঙ্গিমায় বসুন ও শোবেন

কখন ডাক্তার দেখাবেন:
- ব্যথা ২-৩ সপ্তাহের বেশি স্থায়ী হলে
- ব্যথা পায়ে ছড়িয়ে পড়লে`,
    date: "৮ জুন, ২০২৬",
    readTime: "৭ মিনিট",
    category: "কোমর ব্যথা",
  },
  {
    title: "হাড় ক্ষয় রোধে করণীয় ও সঠিক খাদ্য তালিকা",
    excerpt: "অস্টিওপোরোসিস প্রতিরোধে খাদ্যাভ্যাস ও জীবনযাত্রায় প্রয়োজনীয় পরিবর্তন...",
    content: `হাড় ক্ষয় (Osteoporosis) একটি নীরব রোগ।

হাড় মজবুত রাখতে:
ক্যালসিয়াম সমৃদ্ধ খাবার: দুধ ও দুগ্ধজাত পণ্য, ছোট মাছ, শাক-সবজি
ভিটামিন ডি-এর উৎস: সূর্যের আলো, ডিমের কুসুম

করণীয়:
১. নিয়মিত ব্যায়াম
২. ধূমপান ও মদ্যপান পরিহার
৩. পর্যাপ্ত ক্যালসিয়াম ও ভিটামিন ডি গ্রহণ`,
    date: "১ জুন, ২০২৬",
    readTime: "৬ মিনিট",
    category: "হাড় ক্ষয়",
  },
  {
    title: "কাঁধের ব্যথা ও ফ্রোজেন শোল্ডার: কারণ ও চিকিৎসা",
    excerpt: "ফ্রোজেন শোল্ডার বা আঠালো ক্যাপসুলাইটিসের আধুনিক চিকিৎসা।",
    content: `ফ্রোজেন শোল্ডার (Adhesive Capsulitis) এমন একটি অবস্থা যেখানে কাঁধের জয়েন্ট শক্ত হয়ে যায়।

কারণ: দীর্ঘদিন কাঁধ না নাড়ানো, ডায়াবেটিস
চিকিৎসা: ফিজিওথেরাপি, ওষুধ ও ইনজেকশন, PRP থেরাপি`,
    date: "২৫ মে, ২০২৬",
    readTime: "৪ মিনিট",
    category: "কাঁধের সমস্যা",
  },
  {
    title: "স্পোর্টস ইনজুরি: খেলার আঘাত থেকে ফিরে আসার উপায়",
    excerpt: "সঠিক চিকিৎসা ও রিহ্যাবিলিটেশনের মাধ্যমে খেলোয়াড়রা দ্রুত মাঠে ফিরতে পারেন।",
    content: `স্পোর্টস ইনজুরি বিভিন্ন ধরনের হতে পারে।

সাধারণ ইনজুরি: স্প্রেইন ও স্ট্রেইন, ফ্র্যাকচার, ACL tear
চিকিৎসা: RICE, ফিজিওথেরাপি, PRP থেরাপি`,
    date: "১৮ মে, ২০২৬",
    readTime: "৫ মিনিট",
    category: "স্পোর্টস ইনজুরি",
  },
  {
    title: "মেরুদন্ডের যত্ন: সুস্থ স্পাইনের জন্য প্রয়োজনীয় টিপস",
    excerpt: "সুস্থ মেরুদন্ডের জন্য সঠিক ভঙ্গিমা, নিয়মিত ব্যায়াম এবং সুষম খাদ্যাভ্যাস।",
    content: `মেরুদন্ড (Spine) আমাদের শরীরের প্রধান স্তম্ভ।

সঠিক ভঙ্গিমা: বসার সময় পিঠ সোজা রাখুন
ব্যায়াম: সাঁতার, ওয়াকিং, যোগব্যায়াম
সতর্কতা: ভারী ওজন বহন এড়িয়ে চলুন`,
    date: "১০ মে, ২০২৬",
    readTime: "৬ মিনিট",
    category: "মেরুদন্ড",
  },
  {
    title: "বাত ব্যথা: আধুনিক চিকিৎসা ও জীবনযাত্রার পরিবর্তন",
    excerpt: "আধুনিক চিকিৎসা ও জীবনযাত্রার পরিবর্তনের মাধ্যমে আর্থ্রাইটিস নিয়ন্ত্রণ সম্ভব।",
    content: `বাত ব্যথা (Arthritis) একটি প্রদাহজনিত রোগ।

প্রকারভেদ: অস্টিওআর্থাইটিস, রিউমাটয়েড আর্থাইটিস, গাউট
চিকিৎসা: ওষুধ, ফিজিওথেরাপি, PRP থেরাপি
খাদ্যাভ্যাস: ওমেগা-৩ ফ্যাটি অ্যাসিড সমৃদ্ধ খাবার`,
    date: "৩ মে, ২০২৬",
    readTime: "৭ মিনিট",
    category: "বাত ব্যথা",
  },
];

export default function BlogList() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((b, i) => (
            <article
              key={i}
              className="bg-surface rounded-2xl md:rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm group card-hover"
            >
              <div className="h-44 md:h-48 bg-surface-muted relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted/20" />
                </div>
                <span className="absolute top-3 left-3 bg-surface/90 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-primary/10">
                  {b.category}
                </span>
              </div>
              <div className="p-5 md:p-6 flex flex-col">
                <div className="flex items-center gap-3 text-[10px] text-muted mb-2">
                  <span>{b.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {b.readTime}
                  </span>
                </div>
                <h2 className="font-bold text-foreground text-sm md:text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {b.title}
                </h2>
                <p className="text-xs md:text-sm text-muted mb-4 line-clamp-2 flex-1">{b.excerpt}</p>
                <details className="group/details">
                  <summary className="inline-flex items-center gap-1 text-primary text-xs font-semibold cursor-pointer hover:gap-2 transition-all list-none">
                    বিস্তারিত পড়ুন
                    <svg
                      className="w-3 h-3 group-open/details:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-3 text-xs md:text-sm text-muted leading-relaxed whitespace-pre-line border-t border-slate-200/60 pt-3">
                    {b.content}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
