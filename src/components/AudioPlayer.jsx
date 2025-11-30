export function AudioPlayer({ src, title }) {
  return (
    <div className="my-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      {title && <h3 className="text-sm font-semibold mb-2">{title}</h3>}
      <audio controls className="w-full">
        <source src={src} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
