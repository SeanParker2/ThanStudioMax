import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Contact() {
  const router = useRouter();
  const basePath = router.basePath || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '产品咨询',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});
    
    try {
      const response = await fetch(`${basePath}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || '您的留言已成功提交，我们会尽快回复您。'
        });
        // 重置表单
        setFormData({
          name: '',
          email: '',
          subject: '产品咨询',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || '提交失败，请稍后再试。'
        });
      }
    } catch (error) {
      console.error('提交表单时出错:', error);
      setSubmitStatus({
        success: false,
        message: '网络错误，请检查您的网络连接。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* 顶部横幅 - 使用 aspect-ratio 确保图片等比例缩放 */}
      <section className="relative w-full aspect-[21/9] sm:aspect-[16/9] md:aspect-[3/1]">
        <div 
          className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${basePath}/images/contact_banner.png), rgba(0, 0, 0, 0.3)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

        </div>
      </section>

      {/* 联系我们 - 优化自适应布局 */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">与我们联系</h2>
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
              {/* 联系表单 */}
              <div className="w-full lg:w-3/5">
                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-5 sm:p-6 md:p-8 shadow-sm rounded-lg">
                  {submitStatus.message && (
                    <div className={`p-3 rounded text-sm ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名 <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm" 
                      placeholder="您的姓名"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">电子邮件 <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm" 
                      placeholder="您的电子邮件地址"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">主题</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
                    >
                      <option value="产品咨询">产品咨询</option>
                      <option value="项目合作">项目合作</option>
                      <option value="加入团队">加入团队</option>
                      <option value="其他问题">其他问题</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">消息 <span className="text-red-500">*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm resize-none" 
                      placeholder="请输入您的消息"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? '发送中...' : '发送消息'}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* 联系信息 */}
              <div className="w-full lg:w-2/5">
                <div className="bg-gray-50 p-5 sm:p-6 md:p-8 rounded-lg h-full">
                  <h3 className="text-xl font-bold mb-6">联系方式</h3>
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 bg-gray-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3 text-gray-700">
                        <p className="text-sm font-medium">地址</p>
                        <p className="text-sm mt-1">东京都涩谷区神南1-2-3 设计大厦 5F</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 bg-gray-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3 text-gray-700">
                        <p className="text-sm font-medium">电子邮件</p>
                        <p className="text-sm mt-1 break-all">info@thanstudio.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 bg-gray-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3 text-gray-700">
                        <p className="text-sm font-medium">电话</p>
                        <p className="text-sm mt-1">+81 3-1234-5678</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4">营业时间</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between text-sm">
                      <span>周一至周五</span>
                      <span>10:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>周六</span>
                      <span>11:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>周日</span>
                      <span>休息</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold mb-2">关注我们</h3>
                    <div className="flex space-x-4 mt-3">
                      <a href="#" className="text-gray-600 hover:text-black">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-black">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-black">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 地图 - 使用 aspect-ratio 确保地图等比例显示 */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10">位置</h2>
          <div className="w-full aspect-[4/3] sm:aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* 这里可以嵌入实际的地图 */}
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm md:text-base">
              <span>地图将显示在这里</span>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 - 调整为卡片式自适应布局 */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10">常见问题</h2>
          <div className="max-w-3xl mx-auto grid gap-4 md:gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">如何预约咨询？</h3>
              <p className="text-gray-600 text-sm">您可以通过电子邮件、电话或填写网站上的联系表单来预约咨询。我们的团队会在24小时内回复您，安排合适的咨询时间。</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">设计项目的一般周期是多久？</h3>
              <p className="text-gray-600 text-sm">设计项目的周期取决于项目的复杂性和规模。小型项目通常需要2-4周，中型项目需要1-2个月，大型项目可能需要3个月或更长时间。我们会在项目开始前提供详细的时间表。</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">你们提供哪些设计服务？</h3>
              <p className="text-gray-600 text-sm">我们提供品牌形象设计、平面设计、网站和移动应用UI/UX设计、产品设计、空间设计以及展览设计等服务。无论您的需求是什么，我们都能为您提供专业的设计解决方案。</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">你们接受国际项目吗？</h3>
              <p className="text-gray-600 text-sm">是的，我们接受来自世界各地的项目。我们的团队成员来自不同的文化背景，能够理解不同市场的需求。我们可以通过视频会议、电子邮件等方式与国际客户保持沟通。</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">设计修改的流程是怎样的？</h3>
              <p className="text-gray-600 text-sm">我们的设计过程包括多轮修改。在每个阶段，我们会向您展示设计成果，收集反馈，并进行必要的调整。标准服务包含2-3轮修改，如果需要更多修改，可能会产生额外费用。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}