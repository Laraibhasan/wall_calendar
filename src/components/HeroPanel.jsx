export default function HeroPanel() {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="calendar"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/20" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="w-3 h-3 bg-white rounded-full" />
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
  );
}