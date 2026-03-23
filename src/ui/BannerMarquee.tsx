export default function BannerMarquee(props: { text: string }) {
  const items = Array.from({ length: 15 }, (_, index) => index);
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="animate-marquee py-12 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={index} className="mx-10 text-lg font-bold">
            {props.text}
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 py-12 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={index} className="mx-10 text-lg font-bold">
            {props.text}
          </span>
        ))}
      </div>
    </div>
  );
}
