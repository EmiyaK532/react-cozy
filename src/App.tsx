import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background";

// 使用React.lazy懒加载组件
const Gallery = lazy(() => import("./components/Gallery"));
const GalleryDetail = lazy(() => import("./components/GalleryDetail"));

// 加载指示器组件
const LoadingIndicator = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    // 优化Lenis初始化
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      // 仅使用有效的Lenis选项
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: true,
    });

    // 使用更高效的RAF循环
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    // 启动RAF循环
    rafId = requestAnimationFrame(raf);

    // 清理函数
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Background />
      <div className="relative min-h-screen">
        <Suspense fallback={<LoadingIndicator />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/gallery/:id" element={<GalleryDetail />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
