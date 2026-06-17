export default function Loading() {
  return (
    <div className="flex flex-col h-full min-h-[150vh] px-4 py-6 w-full">
      {/* Скелетон для заголовка */}
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-6"></div>
      
      {/* Скелетони для карток (імітуємо 8 штук, щоб розтягнути сторінку вниз) */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-24 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}