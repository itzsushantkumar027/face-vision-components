
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, RefreshCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Success = () => {
  const [matchPercent] = useState(() => Math.floor(Math.random() * 31) + 70); // Random number between 70-100
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6 flex items-center justify-center">
      <Card className="max-w-lg w-full p-8 text-center space-y-8 animate-fadeIn">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="gradient-text">Match Found!</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            We've analyzed your face and found a match
          </p>
        </div>

        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-muted fill-none stroke-[8]"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-primary fill-none stroke-[8]"
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * matchPercent) / 100}
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold gradient-text">
              {matchPercent}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl text-muted-foreground">
            {matchPercent >= 90
              ? "Incredible! It's almost a perfect match!"
              : matchPercent >= 80
              ? "Great! We found a strong match!"
              : "Good! We found a decent match!"}
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="neo-button flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="neo-button flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Success;
