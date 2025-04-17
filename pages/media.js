
export default function Media() {
  return (
    <main className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">影音資源</h1>
      <h2 className="text-2xl font-semibold mb-4">2025-03-23 主日影音集錦</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2025-03-23_主日敬拜</h3>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/G07xP99Gerc"
              title="2025-03-23_主日敬拜"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2025-03-23_姵舒數算恩典</h3>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/xVmt_7CODLA"
              title="2025-03-23_姵舒數算恩典"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2025-03-23_若瑜數算恩典</h3>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/4UcDfkmu2FY"
              title="2025-03-23_若瑜數算恩典"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2025-03-23_主日信息</h3>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/gjmvENjzubo"
              title="2025-03-23_主日信息"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
