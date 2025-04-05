import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Work() {
  const router = useRouter();
  const basePath = router.basePath || '';
  const [activeFilter, setActiveFilter] = useState('全部作品');
  
  const filters = [
    '全部作品', '品牌形象', '空间设计', '产品', '视觉设计', 'VI设计', '包装设计'
  ];

  const workItems = [
    { id: 1, image: `${basePath}/images/work-2.png`, category: '品牌形象', title: '品牌形象设计' },
    { id: 2, image: `${basePath}/images/work-3.png`, category: '空间设计', title: '空间设计方案' },
    { id: 3, image: `${basePath}/images/work-4.png`, category: '产品', title: '产品设计' },
    { id: 4, image: `${basePath}/images/work-5.png`, category: '视觉设计', title: '视觉设计作品' },
    { id: 5, image: `${basePath}/images/work-6.png`, category: 'VI设计', title: 'VI设计系统' },
    { id: 6, image: `${basePath}/images/work-7.png`, category: '包装设计', title: '包装设计方案' },
  ];

  const filteredWorks = activeFilter === '全部作品' 
    ? workItems 
    : workItems.filter(item => item.category === activeFilter);

  return (
    <div>
      {/* 顶部标题和筛选项 - 改进移动端展示 */}
      <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 sm:pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wider text-center mb-8 sm:mb-10">我们的作品</h1>
          
          {/* 筛选器 - 移动端使用下拉菜单，桌面端使用水平排列 */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* 移动端筛选器 */}
            <div className="sm:hidden w-full max-w-xs">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 桌面端筛选器 */}
            <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1 text-sm md:text-base font-light tracking-wide transition-all duration-300 rounded-full ${
                    activeFilter === filter 
                      ? 'bg-black text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Banner - 使用 aspect-ratio 保持图片比例 */}
      <section className="py-4 sm:py-6 md:py-8 mb-6 sm:mb-8 md:mb-10">
        <div className="mx-auto relative w-[92%] sm:w-[95%] md:w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-lg shadow-sm">
          <div
            className="absolute inset-0"
            style={{
              background: `url(${basePath}/images/work_banner.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.95)',
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-white text-center px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-2 sm:mb-3">创意无限 · 设计无界</h2>
              <p className="text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto">探索 Than Studio 的设计作品集</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Items - 使用 aspect-ratio 确保图片等比例缩放 */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4">
          {filteredWorks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">没有找到与"{activeFilter}"相关的作品</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {filteredWorks.map((work) => (
                <div key={work.id} className="group block">
                  <Link href={`/work/${work.id}`}>
                    <div className="relative overflow-hidden mb-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="w-full aspect-[4/3] relative">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${work.image})`,
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base md:text-lg font-medium group-hover:text-black transition-colors">{work.title}</h3>
                      <p className="text-xs text-gray-500 font-light">{work.category}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* 分页或加载更多 - 可选部分 */}
      {filteredWorks.length > 0 && (
        <section className="pb-16 sm:pb-20 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <button className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              加载更多作品
            </button>
          </div>
        </section>
      )}
    </div>
  );
}