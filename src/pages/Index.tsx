
import React, { useState } from 'react';
import { PreviewSection } from '@/components/PreviewSection';
import { ControlPanel } from '@/components/ControlPanel';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [webcamStream, setWebcamStream] = useState<MediaStream | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // Here you would typically send the image to your face detection service
      toast({
        title: "Image uploaded successfully",
        description: "Face detection will be implemented in the next iteration",
      });
    } catch (error) {
      toast({
        title: "Error uploading image",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleWebcam = async () => {
    try {
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        setWebcamStream(undefined);
        toast({
          title: "Camera stopped",
        });
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setWebcamStream(stream);
        toast({
          title: "Camera started",
          description: "Face detection will be implemented in the next iteration",
        });
      }
    } catch (error) {
      toast({
        title: "Camera error",
        description: "Please make sure you have a working camera",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (selectedImage) {
      const a = document.createElement('a');
      a.href = selectedImage;
      a.download = 'processed-image.png';
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight animate-fadeIn">
            Face Detection App
          </h1>
          <p className="text-muted-foreground animate-fadeIn">
            Upload an image or use your webcam to detect faces in real-time
          </p>
        </div>

        <PreviewSection
          imageUrl={selectedImage}
          videoStream={webcamStream}
          isProcessing={isProcessing}
        />

        <ControlPanel
          onImageUpload={handleImageUpload}
          onWebcamToggle={toggleWebcam}
          onDownload={handleDownload}
          isWebcamActive={!!webcamStream}
          canDownload={!!selectedImage}
        />
      </div>
    </div>
  );
};

export default Index;
