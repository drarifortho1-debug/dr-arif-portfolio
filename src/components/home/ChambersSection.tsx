import { Badge } from "../shared/badge";
import ChamberCard from "../shared/chambar-card";

export default function ChambersSection() {
  const mainPhone = "+8801612371696";
  const altPhone = "+8801858405083";

  return (
    <section className="bg-slate-50/50 py-24 md:py-32 border-t border-slate-100">
      <div className="max-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 mb-16 text-left">
          <div className="space-y-4 max-w-xl">
            <Badge text="চেম্বার ও সময়সূচি" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              সরাসরি সাক্ষাৎ ও সিরিয়াল
            </h2>
          </div>
          <p className="text-base font-medium text-slate-600 max-w-xs md:text-right leading-relaxed text-left">
            রোগীদের সুবিধার্থে ৩টি ভিন্ন লোকেশনে এবং সুনির্দিষ্ট সময়ে চেম্বার
            পরিচালনা করা হচ্ছে।
          </p>
        </div>
   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <ChamberCard
            name="কুমিল্লা ট্রমা সেন্টার"
            logo="/cumilla-logo.png"
            address="রুম ৭০৬,  ৭ম তলা (লিফট-৬), নতুন ভবন, রাণীর বাজার রোড, কান্দিরপাড়, কুমিল্লা"
            days="শনিবার থেকে বুধবার"
            time="দুপুর ২:০০ — বিকেল ৫:০০"
            offDays="বৃহস্পতি ও শুক্রবার বন্ধ"
            mapUrl="https://www.google.com/maps/place/Cumilla+Trauma+Centre/@23.4596351,91.1759144,17z/data=!3m1!4b1!4m6!3m5!1s0x37547f26759e8171:0x66e643556d5d8d8c!8m2!3d23.4596351!4d91.1784893!16s%2Fg%2F11r8y2fh0?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
            className="bg-red-600/15"
            logoClassName="-ml-3.5"
            scheduleClassName="bg-red-50"
            phone1={mainPhone}
            phone2={altPhone}
            buttonClassName="bg-red-400 text-white"
          />

          <ChamberCard
            name="পপূলার ডায়াগনস্টিক সেন্টার"
            logo="/popular-logo.png"
            address="রুম ৫১২, ৫ম তলা (লিফট-৪), হাউজ নাম্বার ৫৭, লাকসাম রোড, রামঘাট, কান্দিরপাড়, কুমিল্লা "
            days="শনিবার থেকে বুধবার"
            time="বিকেল ৫:০০ — রাত ৮:০০"
            offDays="বৃহস্পতি ও শুক্রবার বন্ধ"
            mapUrl="https://www.google.com/maps/place/Popular+Diagnostic+Centre,+Cumilla+Branch/@23.459514,91.1760966,17z/data=!4m6!3m5!1s0x37547f00462f8599:0x42aa888ebbe8dc!8m2!3d23.459514!4d91.1806027!16s%2Fg%2F11z4hvvkr6?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
            className="bg-green-600/15"
            logoClassName="-ml-0.5"
            phone1={mainPhone}
            phone2={altPhone}
            scheduleClassName="bg-green-50"
            buttonClassName="bg-green-700 text-white"
          />

          <ChamberCard
            name="ডক্টর’স পয়েন্ট ডায়াগনস্টিক সেন্টার"
            logo="/doctorspoint-logo.png"
            address="কালিকাপুর বাজার, বুড়িচং, কুমিল্লা"
            days="শুধুমাত্র শুক্রবার"
            time="সকাল ৮:০০ — রাত ৮:০০"
            offDays="শনিবার থেকে বৃহস্পতিবার "
            mapUrl="https://www.google.com/maps/place/Doctor's+Point+Diagnostic+%26+Consultation+Center/@23.5493469,88.8710592,8z/data=!4m6!3m5!1s0x375479003a0ff267:0x9c96e045ab925b3b!8m2!3d23.5493469!4d91.1781881!16s%2Fg%2F11z059n1m1?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
            phone1={mainPhone}
            className="bg-blue-light/15"
            scheduleClassName="bg-blue-50"
            buttonClassName="bg-blue-light text-white"
          />
        </div>
      </div>
    </section>
  );
}
