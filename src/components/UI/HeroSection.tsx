import Image from "next/image";
import ballImage from "../../../public/мяч.png";

export default function HeroSection() {
  return (
    <section className="relative  w-full h-[580px]  overflow-hidden bg-[#0d4a1e] mx-auto shadow-2xl">
      <div 
        className="absolute inset-0 opacity-55" 
        style={{
          background: 'repeating-linear-gradient(to bottom, #0f5222 0px, #0f5222 54px, #0d4a1e 54px, #0d4a1e 108px)'
        }}
      />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 580" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="22" width="346" height="536" fill="none" stroke="#fff" strokeWidth="2" opacity="0.30" rx="3"/>
        <line x1="22" y1="290" x2="368" y2="290" stroke="#fff" strokeWidth="1.6" opacity="0.30"/>
        <circle cx="195" cy="290" r="64" fill="none" stroke="#fff" strokeWidth="1.6" opacity="0.30"/>
        <circle cx="195" cy="290" r="4" fill="#fff" opacity="0.30"/>
        <rect x="98" y="22" width="194" height="82" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.22"/>
        <rect x="132" y="22" width="126" height="40" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.22"/>
        <rect x="98" y="476" width="194" height="82" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.22"/>
        <rect x="132" y="518" width="126" height="40" fill="none" stroke="#fff" strokeWidth="1.3" opacity="0.22"/>
      </svg>

      <div className="absolute inset-0 bg-[#041008]/50" />

      <div className="absolute top-[38px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,#1a7a35_0%,transparent_70%)] opacity-35 z-0" />

      <div className="relative z-10 flex flex-col items-center h-full pt-[52px]">

        <div className="relative w-[148px] h-[148px] rounded-full overflow-hidden bg-[#f0f0f0] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_-4px_12px_rgba(0,0,0,0.15)]">
          <Image 
            src={ballImage} 
            alt="Змагайся в турнірі"
            className="object-cover w-full h-full"
            placeholder="blur" 
          />
        </div>

        <div className="mt-[18px] text-[22px] drop-shadow-[0_2px_6px_rgba(245,200,66,0.5)]">
          🏆
        </div>

        <h1 className="mt-[10px] text-[34px] font-bold text-white tracking-[2px] text-center">
          FOOTBALL
        </h1>
        
        <p className="mt-[6px] text-[15px] font-normal text-[#5de87a] tracking-[5px] text-center">
          TOURNAMENTS
        </p>

        <div className="mt-[18px] w-[140px] h-[1px] bg-gradient-to-r from-transparent via-[#2ecc71] to-transparent opacity-70" />

        <p className="mt-[16px] text-[13px] text-[#b8dfc4] tracking-[0.5px] text-center">
          Створюй. Змагайся. Перемагай.
        </p>
      </div>
    </section>
  );
}