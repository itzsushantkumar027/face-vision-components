import React, { useState } from 'react';
import { PreviewSection } from '@/components/PreviewSection';
import { ControlPanel } from '@/components/ControlPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [webcamStream, setWebcamStream] = useState<MediaStream | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      
      // Simulate processing
      setTimeout(() => {
        toast({
          title: "Processing complete",
          description: "Match found! Redirecting...",
        });
        setTimeout(() => navigate('/success'), 1500);
      }, 2000);
      
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
          description: "Processing video feed...",
        });
        
        // Simulate processing and navigate after 3 seconds
        setTimeout(() => {
          toast({
            title: "Match found!",
            description: "Redirecting to results...",
          });
          setTimeout(() => navigate('/success'), 1500);
        }, 3000);
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto relative">
        <ThemeToggle />
        
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12 space-y-6 relative"
        >
          <h1 className="text-6xl font-bold tracking-tight">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="gradient-text inline-flex items-center gap-2"
            >
              Face Detection <Sparkles className="w-8 h-8" />
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-foreground"
            >
              App
            </motion.span>
          </h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-lg max-w-md mx-auto"
          >
            Upload an image or use your webcam to detect faces in real-time
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute -z-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <PreviewSection
              imageUrl={selectedImage}
              videoStream={webcamStream}
              isProcessing={isProcessing}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ControlPanel
              onImageUpload={handleImageUpload}
              onWebcamToggle={toggleWebcam}
              onDownload={handleDownload}
              isWebcamActive={!!webcamStream}
              canDownload={!!selectedImage}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
