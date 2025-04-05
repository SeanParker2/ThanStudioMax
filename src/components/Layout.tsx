import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageLoader from './PageLoader';

type LayoutProps = {
  children: React.ReactNode;
  pageLoading?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, pageLoading = false }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 关闭移动菜单当路由变化时
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageLoader pageLoading={pageLoading} />
      <header className="fixed top-0 left-0 w-full h-20 bg-white bg-opacity-80 backdrop-blur-sm z-10 shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link href="/">Than Studio</Link>
          </div>
          
          {/* 移动端汉堡菜单按钮 */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单"
          >
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className={`transition-colors font-medium ${currentPath.startsWith('/work') ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
              <Link href="/work">Work</Link>
            </div>
            <div className={`transition-colors font-medium ${currentPath.startsWith('/story') ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
              <Link href="/story">Story</Link>
            </div>
            <div className={`transition-colors font-medium ${currentPath.startsWith('/contact') ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
              <Link href="/contact">Contact</Link>
            </div>
            <div className={`transition-colors font-medium ${currentPath.startsWith('/store') ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
              <Link href="/store">Store</Link>
            </div>
          </nav>
        </div>
        
        {/* 移动端导航菜单 */}
        <div className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="flex flex-col py-4 px-4 space-y-4">
            <div 
              className={`py-2 px-4 transition-colors ${currentPath.startsWith('/work') ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/work">Work</Link>
            </div>
            <div 
              className={`py-2 px-4 transition-colors ${currentPath.startsWith('/story') ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/story">Story</Link>
            </div>
            <div 
              className={`py-2 px-4 transition-colors ${currentPath.startsWith('/contact') ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/contact">Contact</Link>
            </div>
            <div 
              className={`py-2 px-4 transition-colors ${currentPath.startsWith('/store') ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/store">Store</Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <footer className="bg-black text-white py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">联系我们</h3>
            <p className="mb-2">东京都渋谷区代代木2-7-7</p>
            <p className="mb-2">contact@nippondesign.com</p>
            <p>+81 3-1234-5678</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">关注我们</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">工作机会</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">设计师</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">项目经理</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">实习生</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">订阅简报</h3>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="请输入邮箱地址" 
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">© 2024 Nippon Design Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;