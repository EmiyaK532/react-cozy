import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background";

// 使用React.lazy懒加载组件
const Gallery = lazy(() => import("./components/Gallery"));
const GalleryDetail = lazy(() => import("./components/gallery/detail"));

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
      // 降低滚动持续时间，减少延迟感
      duration: 0.6,
      // 使用更平滑的曲线
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      // 增大滚轮乘数，让滚动更响应
      wheelMultiplier: 1.3,
      // 增大触摸乘数，对移动端更友好
      touchMultiplier: 1.5,
      // 保持触摸同步
      syncTouch: true,
    });

    // 使用更高效的RAF循环
    let rafId: number;
    let lastTime = 0;

    function raf(time: number) {
      if (time - lastTime > 16) {
        // 约60fps，减少不必要的更新
        lenis.raf(time);
        lastTime = time;
      }
      rafId = requestAnimationFrame(raf);
    }

    // 启动RAF循环
    rafId = requestAnimationFrame(raf);

    // 修复滚动目标问题
    document.documentElement.setAttribute("data-lenis-prevent", "");
    document.body.removeAttribute("data-lenis-prevent");

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
