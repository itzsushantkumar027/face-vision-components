
import React from 'react';
import { Card } from './ui/card';

interface PreviewSectionProps {
  imageUrl?: string;
  videoStream?: MediaStream;
  isProcessing: boolean;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  imageUrl,
  videoStream,
  isProcessing,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden animate-fadeIn hover:scale-[1.01] transition-transform duration-300">
      <div className="aspect-video relative bg-muted/30">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        ) : videoStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            {isProcessing ? (
              <div className="animate-pulse">Processing...</div>
            ) : (
              <p className="text-lg">Upload an image or start webcam to begin</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
