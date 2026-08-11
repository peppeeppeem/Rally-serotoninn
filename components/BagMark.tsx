export function BagMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] ${className}`} aria-hidden="true">
      {/* handle */}
      <div className="absolute left-[26%] right-[26%] top-[6%] h-[32%] rounded-t-full border-[5px] border-b-0 border-accent" />
      {/* body */}
      <div
        className="absolute left-[8%] right-[8%] top-[22%] bottom-0"
        style={{
          background: "linear-gradient(158deg,#E8432F 0%,#B02414 52%,#5A100A 100%)",
          borderRadius: "10px 10px 46% 46% / 10px 10px 22% 22%",
          boxShadow: "0 40px 70px -30px rgba(0,0,0,.6), inset 0 2px 6px rgba(255,255,255,.18)",
        }}
      />
      {/* panel */}
      <div
        className="absolute left-[22%] right-[22%] top-[34%] bottom-[16%] rounded-lg"
        style={{ background: "linear-gradient(158deg,rgba(255,255,255,.10),rgba(0,0,0,.14))" }}
      />
      {/* clasp */}
      <div className="absolute left-1/2 top-[30%] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-whisper shadow" />
      {/* logo */}
      <div
        className="absolute left-0 right-0 top-[52%] text-center display text-white"
        style={{ fontSize: "clamp(11px,2vw,15px)", letterSpacing: ".12em" }}
      >
        Rally
      </div>
    </div>
  );
}
