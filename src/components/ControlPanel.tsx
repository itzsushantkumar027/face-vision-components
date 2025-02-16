
import React from 'react';
import { Button } from './ui/button';
import { Camera, Upload, Download, Play, Square } from 'lucide-react';
import { Card } from './ui/card';

interface ControlPanelProps {
  onImageUpload: (file: File) => void;
  onWebcamToggle: () => void;
  onDownload?: () => void;
  isWebcamActive: boolean;
  canDownload: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onImageUpload,
  onWebcamToggle,
  onDownload,
  isWebcamActive,
  canDownload,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <Card className="p-8 animate-slideIn hover:scale-[1.01] transition-transform duration-300">
      <div className="flex flex-wrap gap-6 justify-center">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="neo-button flex items-center gap-3 text-lg"
        >
          <Upload className="w-5 h-5" />
          Upload Image
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <Button
          onClick={onWebcamToggle}
          className="neo-button flex items-center gap-3 text-lg"
        >
          {isWebcamActive ? (
            <>
              <Square className="w-5 h-5" />
              Stop Camera
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              Start Camera
            </>
          )}
        </Button>

        {canDownload && (
          <Button
            onClick={onDownload}
            className="neo-button flex items-center gap-3 text-lg"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>
        )}
      </div>
    </Card>
  );
};
