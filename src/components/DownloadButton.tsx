'use client';

interface Props {
  imagePath: string;
  title: string;
}

export default function DownloadButton({ imagePath, title }: Props) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = `${title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-sm hover:shadow-md"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      PNG でダウンロード
    </button>
  );
}
