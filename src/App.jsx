import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HeroSection from "./components/Herosection/herosection";
import Navbar from "./components/Navbar/nabar";
import Menu from "./components/Background/menu";
import Loading from "./components/Loading/Loading";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import NotFound from "./components/NotFound/NotFound";
import { useVideoLoader } from "./components/Loading/VideoLoader";
import back from "./assets/back.mp4";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { isVideoLoaded } = useVideoLoader(back);

  useEffect(() => {
    // Simulate realistic loading with different phases
    const loadingPhases = [
      { progress: 15, delay: 300 },
      { progress: 30, delay: 400 },
      { progress: 50, delay: 500 },
      { progress: 70, delay: 600 },
      { progress: 85, delay: 500 },
      { progress: 95, delay: 400 },
      { progress: 100, delay: 200 }
    ];

    let currentPhase = 0;
    
    const updateProgress = () => {
      if (currentPhase < loadingPhases.length) {
        const phase = loadingPhases[currentPhase];
        setLoadingProgress(phase.progress);
        currentPhase++;
        
        if (currentPhase < loadingPhases.length) {
          setTimeout(updateProgress, phase.delay);
        }
      }
    };

    // Start loading after a brief delay
    setTimeout(updateProgress, 200);

    // Ensure loading completes within 5 seconds maximum
    const maxLoadingTime = setTimeout(() => {
      setLoadingProgress(100);
    }, 5000);

    return () => {
      clearTimeout(maxLoadingTime);
    };
  }, []);

  // Update progress when video is loaded
  useEffect(() => {
    if (isVideoLoaded && loadingProgress < 100) {
      setLoadingProgress(100);
    }
  }, [isVideoLoaded, loadingProgress]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Loading 
        progress={loadingProgress} 
        onComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
