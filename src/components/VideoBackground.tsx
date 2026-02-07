import { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  className?: string;
}

export function VideoBackground({ className }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        // Video file should be placed at: public/videos/background.mp4
        // Upload your video to GitHub and place it in the public/videos folder
        src="/videos/background.mp4"
      />
      
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md" />
      
      {/* Dark fade overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Gradient edges for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}
