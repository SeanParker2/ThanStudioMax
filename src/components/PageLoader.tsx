import React, { useEffect, useState, useRef } from 'react';

interface PageLoaderProps {
  pageLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ pageLoading }) => {
  const [animationClass, setAnimationClass] = useState('');
  const [animationStage, setAnimationStage] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // 控制动画进入和退出
  useEffect(() => {
    if (pageLoading) {
      // 当页面开始加载时，添加进入动画类
      setAnimationClass('animate-in');
      setAnimationStage(0);
      setAnimationComplete(false);
      
      // 启动动画阶段序列 - 优化时间线使动画更加丝滑
      const stageTimers = [
        setTimeout(() => setAnimationStage(1), 900),  // 第一阶段：Logo描边 - 延长时间使过渡更平滑
        setTimeout(() => setAnimationStage(2), 2000), // 第二阶段：设计元素出现 - 增加间隔使动画更连贯
        setTimeout(() => setAnimationStage(3), 2800), // 第三阶段：文字淡入 - 延长过渡时间
        setTimeout(() => setAnimationComplete(true), 3500) // 完成状态 - 给予更多时间完成所有动画
      ];
      return () => stageTimers.forEach(timer => clearTimeout(timer));
    } else {
      // 当页面加载完成时，添加退出动画类
      setAnimationClass('animate-out');
      
      // 动画完成后清除类名 - 延长时间使退出动画更流畅
      const timer = setTimeout(() => {
        setAnimationClass('');
        setAnimationStage(0);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [pageLoading]);
  
  // 如果不需要显示加载器，则返回null
  if (!pageLoading && !animationClass) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-800 ${animationClass === 'animate-out' ? 'opacity-0' : 'opacity-100'}`} style={{perspective: '1000px'}}>
      <div 
        className="creative-loader relative w-80 h-80 flex flex-col items-center justify-center"
        style={{
          transform: `translateZ(${animationStage * 8}px) rotateX(${animationStage * 0.5}deg)`,
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* 动态SVG Logo动画 */}
        <svg 
          ref={svgRef}
          className="w-64 h-32 mb-6"
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `translateZ(${animationStage * 3}px) scale(${1 + animationStage * 0.02}) rotateY(${animationStage * 0.8}deg)`,
            transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* 背景图形 */}
          <g className="background-patterns">
            <circle 
              cx="150" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#f0f0f0" 
              strokeWidth="1"
              className={`transition-all duration-1000 ${animationStage >= 1 ? 'opacity-50' : 'opacity-0'}`}
              style={{
                transformOrigin: 'center',
                transform: `scale(${animationStage >= 1 ? 1 : 0.8})`,
                transitionDelay: '200ms',
                transition: 'all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                willChange: 'transform, opacity'
              }}
            />
            <circle 
              cx="150" 
              cy="50" 
              r="30" 
              fill="none" 
              stroke="#f0f0f0" 
              strokeWidth="1"
              className={`transition-all duration-1000 ${animationStage >= 1 ? 'opacity-50' : 'opacity-0'}`}
              style={{
                transformOrigin: 'center',
                transform: `scale(${animationStage >= 1 ? 1 : 0.8})`,
                transitionDelay: '400ms',
                transition: 'all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                willChange: 'transform, opacity'
              }}
            />
            <circle 
              cx="150" 
              cy="50" 
              r="20" 
              fill="none" 
              stroke="#f0f0f0" 
              strokeWidth="1"
              className={`transition-all duration-1000 ${animationStage >= 1 ? 'opacity-50' : 'opacity-0'}`}
              style={{
                transformOrigin: 'center',
                transform: `scale(${animationStage >= 1 ? 1 : 0.8})`,
                transitionDelay: '600ms',
                transition: 'all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                willChange: 'transform, opacity'
              }}
            />
          </g>
          
          {/* Logo文字路径 */}
          <g>
            <text 
              x="10" 
              y="65" 
              fontFamily="Arial, sans-serif" 
              fontWeight="bold" 
              fontSize="48"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
              className={`transition-all duration-1000 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: 800,
                strokeDashoffset: animationStage >= 1 ? 0 : 800,
                transition: 'stroke-dashoffset 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                willChange: 'stroke-dashoffset, opacity',
                transform: 'translateZ(0)'
              }}
            >
              Than Studio
            </text>
            
            <text 
              x="10" 
              y="65" 
              fontFamily="Arial, sans-serif" 
              fontWeight="bold" 
              fontSize="48"
              fill="#000"
              className={`transition-all duration-1000 ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transitionDelay: '500ms',
                transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)'
              }}
            >
              Than Studio
            </text>
          </g>
          
          {/* 装饰元素 */}
          <rect 
            x="10" 
            y="75" 
            width="280" 
            height="2" 
            fill="#000"
            className={`transition-all duration-1000 ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transformOrigin: 'left',
              transform: `scaleX(${animationStage >= 2 ? 1 : 0})`,
              transitionDelay: '800ms',
              transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          />
          
          <circle 
            cx="150" 
            cy="85" 
            r="3" 
            fill="#000"
            className={`transition-all duration-500 ${animationStage >= 3 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `scale(${animationStage >= 3 ? 1 : 0})`,
              transitionDelay: '1000ms',
              transition: 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity',
              transformOrigin: 'center',
              backfaceVisibility: 'hidden'
            }}
          />
        </svg>
        
        {/* 创意设计元素 */}
        <div className="design-elements absolute inset-0 pointer-events-none">
          {/* 左上角设计元素 */}
          <div 
            className={`absolute top-0 left-0 w-16 h-16 transition-all duration-700 ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate(${animationStage >= 2 ? '0, 0' : '-20px, -20px'})`,
              transitionDelay: '600ms',
              transition: 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,32 L32,0" stroke="#000" strokeWidth="1.5" strokeDasharray="45" strokeDashoffset={animationStage >= 2 ? 0 : 45} style={{transition: 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)', willChange: 'stroke-dashoffset', transform: 'translateZ(0)'}} />
              <path d="M8,32 L32,8" stroke="#000" strokeWidth="1.5" strokeDasharray="35" strokeDashoffset={animationStage >= 2 ? 0 : 35} style={{transition: 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)', transitionDelay: '200ms', willChange: 'stroke-dashoffset', transform: 'translateZ(0)'}} />
              <path d="M16,32 L32,16" stroke="#000" strokeWidth="1.5" strokeDasharray="25" strokeDashoffset={animationStage >= 2 ? 0 : 25} style={{transition: 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)', transitionDelay: '400ms', willChange: 'stroke-dashoffset', transform: 'translateZ(0)'}} />
            </svg>
          </div>
          
          {/* 右下角设计元素 */}
          <div 
            className={`absolute bottom-0 right-0 w-16 h-16 transition-all duration-700 ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate(${animationStage >= 2 ? '0, 0' : '20px, 20px'})`,
              transitionDelay: '800ms',
              transition: 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="16" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset={animationStage >= 2 ? 0 : 100} style={{transition: 'stroke-dashoffset 1s ease-in-out'}} />
              <circle cx="32" cy="32" r="8" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="50" strokeDashoffset={animationStage >= 2 ? 0 : 50} style={{transition: 'stroke-dashoffset 1s ease-in-out', transitionDelay: '300ms'}} />
            </svg>
          </div>
          
          {/* 右上角设计元素 */}
          <div 
            className={`absolute top-0 right-0 w-16 h-16 transition-all duration-700 ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate(${animationStage >= 2 ? '0, 0' : '20px, -20px'})`,
              transitionDelay: '700ms'
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="16" width="32" height="32" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="128" strokeDashoffset={animationStage >= 2 ? 0 : 128} style={{transition: 'stroke-dashoffset 1s ease-in-out'}} />
              <rect x="24" y="24" width="16" height="16" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="64" strokeDashoffset={animationStage >= 2 ? 0 : 64} style={{transition: 'stroke-dashoffset 1s ease-in-out', transitionDelay: '300ms'}} />
            </svg>
          </div>
        </div>
        
        {/* 加载文本 */}
        <div 
          className={`loader-text mt-4 flex items-center justify-center space-x-2 transition-all duration-500 ${animationStage >= 3 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="text-sm font-medium">创意设计</span>
          <span className="dot text-sm">·</span>
          <span className="text-sm font-medium">无限可能</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
