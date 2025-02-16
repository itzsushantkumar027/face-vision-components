
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
    <Card className="p-6 mt-6 animate-slideIn">
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="neo-button flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
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
          className="neo-button flex items-center gap-2"
        >
          {isWebcamActive ? (
            <>
              <Square className="w-4 h-4" />
              Stop Camera
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              Start Camera
            </>
          )}
        </Button>

        {canDownload && (
          <Button
            onClick={onDownload}
            className="neo-button flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        )}
      </div>
    </Card>
  );
};
