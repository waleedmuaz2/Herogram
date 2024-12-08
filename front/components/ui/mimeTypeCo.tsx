import Image from 'next/image';
export function renderMedia(mediaUrl: string, mimeType: string) {
    const formattedUrl = mediaUrl.replace(/\\/g, '/').replace(/\/\//g, '/');
  
    switch (mimeType) {
      case 'image/jpeg':
      case 'image/png':
        return <Image src={formattedUrl} alt="Post image" width={500} height={500} className="w-full h-auto" />;
      case 'video/mp4':
        return (
          <video className="w-full aspect-video" width={500}
            height={500} controls>
            <source src={formattedUrl} type={mimeType} />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <p>Unsupported media type</p>;
    }
  }