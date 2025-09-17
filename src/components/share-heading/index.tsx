type ShareHeadingType = {
  title: string;
  subTitle: string;
};

export default function ShareHeading({ title, subTitle }: ShareHeadingType) {
  return (
    <>
      <span className="uppercase text-accent font-semibold leading-4">
        {subTitle}
      </span>
      <h2 className="text-primary font-bold text-4xl italic">{title}</h2>
    </>
  );
}
