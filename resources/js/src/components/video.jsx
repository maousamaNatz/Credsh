import React, { useRef, useEffect, useState, useCallback } from "react";

export const VideoWithFallback = ({
    videoSrc,
    imageSrc,
    options = {},
    onReady = () => {},
    onPlay = () => {},
    onPause = () => {},
    onEnded = () => {},
    onError = () => {},
}) => {
    const videoRef = useRef(null);
    const observerRef = useRef(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [buffering, setBuffering] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            // Set video attributes based on options
            Object.entries(options).forEach(([key, value]) => {
                videoElement[key] = value;
            });

            // Handle video events
            const handleLoadedData = () => {
                setIsVideoLoaded(true);
                onReady();
            };

            const handlePlay = () => {
                onPlay();
            };

            const handlePause = () => {
                onPause();
            };

            const handleEnded = () => {
                onEnded();
            };

            const handleError = (error) => {
                console.error("Video error:", error);
                setHasError(true);
                onError(error);
            };

            const handleWaiting = () => setBuffering(true);
            const handleCanPlay = () => setBuffering(false);

            videoElement.addEventListener('loadeddata', handleLoadedData);
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);
            videoElement.addEventListener('ended', handleEnded);
            videoElement.addEventListener('error', handleError);
            videoElement.addEventListener('waiting', handleWaiting);
            videoElement.addEventListener('canplay', handleCanPlay);

            // Intersection Observer for scroll behavior
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    setIsVideoVisible(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        videoElement.play().catch(() => {});
                    } else {
                        videoElement.pause();
                    }
                },
                {
                    threshold: [0, 0.1, 0.5, 1],
                    rootMargin: '0px'
                }
            );

            observerRef.current.observe(videoElement);

            // Cleanup
            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);
                videoElement.removeEventListener('ended', handleEnded);
                videoElement.removeEventListener('error', handleError);
                videoElement.removeEventListener('waiting', handleWaiting);
                videoElement.removeEventListener('canplay', handleCanPlay);
                observerRef.current?.disconnect();
            };
        }
    }, [videoSrc, options, onReady, onPlay, onPause, onEnded, onError]);

    if (hasError && imageSrc) {
        return (
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover'
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                    isVideoVisible && isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
            >
                {buffering && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: "brightness(0.6)",
                    }}
                    src={videoSrc}
                    playsInline
                />
            </div>
            <img
                src={imageSrc}
                alt="Background fallback"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isVideoVisible && isVideoLoaded ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0.6)" }}
            />
        </div>
    );
};

export default VideoWithFallback;
