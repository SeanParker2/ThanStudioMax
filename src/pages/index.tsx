import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const basePath = router.basePath || '';
  
  return (
    <div>
      {/* Hero Banner - 使用 object-fit 确保背景图片等比例缩放 */}
      <section className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
        <div 
          className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${basePath}/images/home_hero_banner.png), rgba(0, 0, 0, 0.3)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 text-center">追求永恒的设计价值</h1>
            <p className="text-sm sm:text-base md:text-xl max-w-2xl text-center mb-4 md:mb-8 px-2 sm:px-4">我们致力于创造具有持久价值的设计作品，融合东方美学与现代设计理念</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-white text-black font-medium rounded-md hover:bg-opacity-90 transition-all text-center">
                <Link href="/work">探索作品</Link>
              </div>
              <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-all text-center">
                <Link href="/contact">联系我们</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 品牌简介 - 取代原Home Banner，更适合移动端 */}
      <section className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">关于 Than Studio</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Than Studio 是一家位于东京的设计工作室，专注于品牌形象、空间设计和视觉创意。我们将东方美学与现代设计语言融合，为客户创造具有持久价值的设计作品。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 border-t-2 border-black">
                <h3 className="font-medium text-base sm:text-lg mb-2">品牌形象</h3>
                <p className="text-sm text-gray-600">为品牌打造独特识别符号与视觉系统</p>
              </div>
              <div className="p-4 border-t-2 border-black">
                <h3 className="font-medium text-base sm:text-lg mb-2">空间设计</h3>
                <p className="text-sm text-gray-600">创造富有情感与功能的空间体验</p>
              </div>
              <div className="p-4 border-t-2 border-black">
                <h3 className="font-medium text-base sm:text-lg mb-2">视觉创意</h3>
                <p className="text-sm text-gray-600">以创新思维打造独特视觉语言</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Work - 使用 aspect-ratio 确保作品图片等比例缩放，优化移动端显示 */}
      <section className="py-10 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">精选作品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="group relative overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                <div 
                  className="w-full aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${basePath}/images/home_work_${num}.png)`,
                  }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white text-black font-medium rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Link href={`/work/${num}`}>查看详情</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <div className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-all">
              <Link href="/work">查看更多作品</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News - 优化移动端卡片布局 */}
      <section className="py-10 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">最新动态</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            <div className="group shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 rounded-md overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <span className="text-xs sm:text-sm text-gray-400">2024年3月15日</span>
                <h3 className="text-base sm:text-lg md:text-xl font-medium mt-2 mb-3 group-hover:text-black transition-colors line-clamp-2">东京设计周展览圆满结束</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">我们很荣幸地宣布，Than Studio在东京设计周的展览取得了巨大成功，吸引了来自全球的设计爱好者和专业人士...</p>
                <div className="inline-block text-xs sm:text-sm font-medium hover:translate-x-1 transition-transform">
                  <Link href="/news/1">阅读更多 →</Link>
                </div>
              </div>
            </div>
            <div className="group shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 rounded-md overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <span className="text-xs sm:text-sm text-gray-400">2024年2月28日</span>
                <h3 className="text-base sm:text-lg md:text-xl font-medium mt-2 mb-3 group-hover:text-black transition-colors line-clamp-2">新系列家具产品发布</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">Than Studio推出全新系列家具产品，融合传统工艺与现代设计理念，为现代生活空间带来独特的美学体验...</p>
                <div className="inline-block text-xs sm:text-sm font-medium hover:translate-x-1 transition-transform">
                  <Link href="/news/2">阅读更多 →</Link>
                </div>
              </div>
            </div>
            <div className="group shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 rounded-md overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="p-4 sm:p-5 md:p-6">
                <span className="text-xs sm:text-sm text-gray-400">2024年1月10日</span>
                <h3 className="text-base sm:text-lg md:text-xl font-medium mt-2 mb-3 group-hover:text-black transition-colors line-clamp-2">工作室扩展新空间</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">为了满足不断增长的项目需求，Than Studio正式扩展了位于涩谷区的工作室空间，新增设计实验室和展示区...</p>
                <div className="inline-block text-xs sm:text-sm font-medium hover:translate-x-1 transition-transform">
                  <Link href="/news/3">阅读更多 →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members - 优化移动端显示 */}
      <section className="py-10 sm:py-16 md:py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">团队成员</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="text-center group cursor-pointer">
                <div className="relative w-full aspect-square sm:aspect-[3/4] mx-auto mb-3 overflow-hidden rounded-md shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${basePath}/images/home_teammate_${num}.png)`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-end justify-center">
                    <div className="bg-white bg-opacity-80 w-full py-2 sm:py-3 px-2 sm:px-3 transform translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-all duration-300">
                      <h3 className="text-sm sm:text-base font-medium">设计师 {num}</h3>
                      <p className="text-xs text-gray-500">{['创始人兼创意总监', '高级产品设计师', '空间设计师', '视觉设计师'][num-1]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-all">
              <Link href="/story">了解更多团队信息</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}