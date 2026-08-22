/** Splits text into masked words that slide up on load, 0.1s apart. */
export default function WordReveal({ text, className = '', id }) {
  const words = text.trim().split(/\s+/)

  return (
    <h1 className={className} id={id}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-mask mr-4 last:mr-0 inline-block">
          <span className="inline-block" style={{ animationDelay: `${i * 0.1}s` }}>
            {word}
          </span>
        </span>
      ))}
    </h1>
  )
}
