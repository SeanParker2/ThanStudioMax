import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Story() {
  const router = useRouter();
  const basePath = router.basePath || '';
  const [activeTab, setActiveTab] = useState('关于我们');
  
  return (
    <div>
      {/* 顶部横幅 - 使用 aspect-ratio 确保图片等比例缩放 */}
      <section className="relative w-full aspect-[21/9] sm:aspect-[16/9] md:aspect-[3/1]">
        <div 
          className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${basePath}/images/story_banner.png), rgba(0, 0, 0, 0.3)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
      </section>

      {/* 选项卡导航 - 移动端友好的交互 */}
      <section className="border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar py-3">
            {['关于我们', '发展历程', '核心优势', '团队文化'].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap px-3 sm:px-5 py-2 text-sm font-medium ${
                  activeTab === tab 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 关于我们 - 调整为自适应布局和等比例图片 */}
      <section 
        className={`py-10 sm:py-16 md:py-20 ${activeTab !== '关于我们' ? 'hidden' : ''}`}
        id="关于我们"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">关于我们</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-4 md:mb-6">Than Studio，东京设计工作室</h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                Than Studio 成立于2015年，是一家位于东京的设计工作室。我们专注于品牌形象、空间设计、产品设计和视觉设计等领域，为客户提供全方位的设计解决方案。
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                我们的设计理念源于对日本传统美学的理解和现代设计语言的融合，追求简约而不简单的设计表达，注重细节和用户体验。
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Than Studio 团队由来自不同文化背景的设计师组成，这使我们能够从多元视角思考问题，为客户创造独特而有价值的设计作品。
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url(${basePath}/images/story-2.png)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 发展历程 - 调整为移动端友好的布局 */}
      <section 
        className={`py-10 sm:py-16 md:py-20 bg-gray-50 ${activeTab !== '发展历程' ? 'hidden' : ''}`}
        id="发展历程"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">发展历程</h2>
          
          {/* 桌面端时间轴 */}
          <div className="relative hidden md:block">
            {/* 时间轴线 */}
            <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-1/2 transform -translate-y-1/2"></div>
            
            {/* 时间点 */}
            <div className="relative flex justify-between">
              {/* 2015年 */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-black rounded-full mb-4 z-10"></div>
                <div className="text-lg font-medium">2015年</div>
                <div className="text-sm text-gray-600 mt-2">公司成立</div>
              </div>
              
              {/* 2018年 */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-black rounded-full mb-4 z-10"></div>
                <div className="text-lg font-medium">2018年</div>
                <div className="text-sm text-gray-600 mt-2">业务扩展</div>
              </div>
              
              {/* 2021年 */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-black rounded-full mb-4 z-10"></div>
                <div className="text-lg font-medium">2021年</div>
                <div className="text-sm text-gray-600 mt-2">新工作室</div>
              </div>
              
              {/* 2024年 */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-black rounded-full mb-4 z-10"></div>
                <div className="text-lg font-medium">2024年</div>
                <div className="text-sm text-gray-600 mt-2">国际拓展</div>
              </div>
            </div>
          </div>
          
          {/* 移动端时间轴 - 垂直布局 */}
          <div className="md:hidden">
            <div className="relative">
              {/* 垂直时间轴线 */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-10">
                {/* 2015年 */}
                <div className="flex items-start pl-12 relative">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-black rounded-full z-10"></div>
                  <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                    <div className="text-lg font-medium">2015年</div>
                    <div className="text-sm text-gray-600 mt-1">公司成立</div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Than Studio 在东京涩谷区成立，初期专注于品牌形象设计服务。
                    </p>
                  </div>
                </div>
                
                {/* 2018年 */}
                <div className="flex items-start pl-12 relative">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-black rounded-full z-10"></div>
                  <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                    <div className="text-lg font-medium">2018年</div>
                    <div className="text-sm text-gray-600 mt-1">业务扩展</div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      业务范围扩展至空间设计和产品设计，团队规模扩大一倍。
                    </p>
                  </div>
                </div>
                
                {/* 2021年 */}
                <div className="flex items-start pl-12 relative">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-black rounded-full z-10"></div>
                  <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                    <div className="text-lg font-medium">2021年</div>
                    <div className="text-sm text-gray-600 mt-1">新工作室</div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      搬迁至更大的工作室空间，增设产品展示区和材料实验室。
                    </p>
                  </div>
                </div>
                
                {/* 2024年 */}
                <div className="flex items-start pl-12 relative">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-black rounded-full z-10"></div>
                  <div className="bg-white p-4 rounded-lg shadow-sm w-full">
                    <div className="text-lg font-medium">2024年</div>
                    <div className="text-sm text-gray-600 mt-1">国际拓展</div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      开始面向国际市场提供服务，与多家国际品牌建立合作关系。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心优势 - 调整为自适应栅格 */}
      <section 
        className={`py-10 sm:py-16 md:py-20 ${activeTab !== '核心优势' ? 'hidden' : ''}`}
        id="核心优势"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">核心优势</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-4 md:mb-6 flex justify-center">
                <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">创新思维</h3>
              <p className="text-gray-600 text-sm md:text-base text-center">我们不断探索新的设计方法和理念，为客户带来前沿的设计解决方案，让品牌在竞争中脱颖而出。</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-4 md:mb-6 flex justify-center">
                <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">专业团队</h3>
              <p className="text-gray-600 text-sm md:text-base text-center">我们拥有一支经验丰富、专业素养高的设计团队，每位成员都在各自领域拥有深厚的专业知识和丰富的项目经验。</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 sm:col-span-2 md:col-span-1">
              <div className="mb-4 md:mb-6 flex justify-center">
                <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99504C21.9983 6.40285 21.3658 4.87588 20.24 3.75004C19.1142 2.62419 17.5872 1.9917 15.995 1.9917C14.4028 1.9917 12.8758 2.62419 11.75 3.75004L5 10.5V19H13.5L20.24 12.24Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 8L2 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 15H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">用户体验</h3>
              <p className="text-gray-600 text-sm md:text-base text-center">我们始终将用户体验放在首位，通过深入的用户研究和测试，确保我们的设计不仅美观，而且实用、易用。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 团队文化 - 调整为自适应栅格和等比例图片 */}
      <section 
        className={`py-10 sm:py-16 md:py-20 bg-gray-50 ${activeTab !== '团队文化' ? 'hidden' : ''}`}
        id="团队文化"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">团队文化</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-white p-5 md:p-6 shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">共同创造</h3>
              <p className="text-gray-600 mb-0 text-sm md:text-base">我们鼓励团队成员之间的合作与交流，相信集体的智慧和创造力能够产生更优秀的设计作品。每个项目都是团队共同努力的成果。</p>
            </div>
            <div className="bg-white p-5 md:p-6 shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">追求卓越</h3>
              <p className="text-gray-600 mb-0 text-sm md:text-base">我们对设计品质有着极高的要求，不断挑战自我，精益求精，追求每一个细节的完美，为客户提供最优质的设计服务。</p>
            </div>
            <div className="bg-white p-5 md:p-6 shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">开放创新</h3>
              <p className="text-gray-600 mb-0 text-sm md:text-base">我们保持开放的心态，欢迎新的想法和观点，鼓励团队成员勇于尝试新的设计方法和技术，推动设计创新。</p>
            </div>
            <div className="bg-white p-5 md:p-6 shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">尊重多元</h3>
              <p className="text-gray-600 mb-0 text-sm md:text-base">我们尊重每个人的独特性和创造力，鼓励多元化的思维和表达方式，相信多样性能够带来更丰富的设计灵感和创意。</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            <div className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${basePath}/images/story-3.png)`,
                }}
              ></div>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${basePath}/images/story-4.png)`,
                }}
              ></div>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${basePath}/images/story-5.png)`,
                }}
              ></div>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${basePath}/images/story-6.png)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}