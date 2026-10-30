type SectionTitleProps = {
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
};

export default function SectionTitle({
  title,
  highlight,
  description,
  className = "",
}: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-5 py-6 text-center">
      <h2
        className={`text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl ${className}`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-primary">{highlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}