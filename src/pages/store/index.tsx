import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// 商品类型定义
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew: boolean;
  isHot: boolean;
  description?: string;
};

export default function Store() {
  const router = useRouter();
  const basePath = router.basePath || '';
  
  const [activeCategory, setActiveCategory] = useState('全部商品');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 商品分类
  const categories = [
    { id: 'all', name: '全部商品', icon: `${basePath}/logo/icon-all.png`, activeIcon: `${basePath}/logo/icon-all1.png` },
    { id: 'new', name: '新品上市', icon: `${basePath}/logo/icon-new.png`, activeIcon: `${basePath}/logo/icon-new1.png` },
    { id: 'hot', name: '热销商品', icon: `${basePath}/logo/icon-hot.png`, activeIcon: `${basePath}/logo/icon-hot1.png` },
    { id: 'furniture', name: '家具', icon: '', activeIcon: '' },
    { id: 'lighting', name: '灯具', icon: '', activeIcon: '' },
    { id: 'decoration', name: '装饰品', icon: '', activeIcon: '' },
    { id: 'tableware', name: '餐具', icon: '', activeIcon: '' },
    { id: 'textile', name: '纺织品', icon: '', activeIcon: '' },
  ];

  // 商品数据
  const products: Product[] = [
    { 
      id: 1, 
      name: '极简风格座椅', 
      price: 1299, 
      image: `${basePath}/images/store-2.png`, 
      category: 'furniture', 
      isNew: true, 
      isHot: false,
      description: '采用优质实木和高弹性海绵制作，符合人体工学设计，给您带来舒适的坐感体验。简约的北欧风格设计，适合各种家居环境。'
    },
    { 
      id: 2, 
      name: '原木餐桌', 
      price: 2499, 
      image: `${basePath}/images/store-3.png`, 
      category: 'furniture', 
      isNew: false, 
      isHot: true,
      description: '选用天然原木材质，经过精细打磨和防腐处理，质感细腻，纹理自然。宽敞的桌面设计，满足4-6人同时用餐的需求。'
    },
    { 
      id: 3, 
      name: '北欧风格吊灯', 
      price: 899, 
      image: `${basePath}/images/store-4.png`, 
      category: 'lighting', 
      isNew: true, 
      isHot: true,
      description: '简约现代的北欧设计风格，金属材质灯架配合优质亚克力灯罩，光线柔和不刺眼。适合客厅、餐厅等多种场景使用。'
    },
    { 
      id: 4, 
      name: '日式陶瓷花瓶', 
      price: 399, 
      image: `${basePath}/images/store-5.png`, 
      category: 'decoration', 
      isNew: false, 
      isHot: false,
      description: '传统日式工艺制作，每一件都是独特的手工艺术品。釉面光滑细腻，色彩典雅，是点缀家居空间的理想选择。'
    },
    { 
      id: 5, 
      name: '手工编织抱枕', 
      price: 199, 
      image: `${basePath}/images/store-6.png`, 
      category: 'textile', 
      isNew: false, 
      isHot: true,
      description: '采用优质棉麻材质，手工编织而成，触感柔软舒适。几何图案设计，为您的沙发、床铺增添温馨感。'
    },
    { 
      id: 6, 
      name: '简约餐盘套装', 
      price: 599, 
      image: `${basePath}/images/store-7.png`, 
      category: 'tableware', 
      isNew: true, 
      isHot: false,
      description: '高品质陶瓷材质，健康环保。简约的设计风格，白色为主调，适合各种餐桌风格。套装包含6个餐盘、6个汤碗和6个小碟。'
    },
    { 
      id: 7, 
      name: '实木边几', 
      price: 899, 
      image: `${basePath}/images/store-8.png`, 
      category: 'furniture', 
      isNew: false, 
      isHot: false,
      description: '采用优质白橡木制作，结构稳固，承重能力强。简洁的线条设计，彰显现代感，是客厅、卧室的实用家具。'
    },
    { 
      id: 8, 
      name: '日式茶杯套装', 
      price: 299, 
      image: `${basePath}/images/store-2.png`, 
      category: 'tableware', 
      isNew: true, 
      isHot: true,
      description: '传统日式风格设计，精选优质陶瓷材质，手感细腻。套装包含4个茶杯和1个茶壶，适合家庭或小型聚会使用。'
    },
  ];

  // 根据分类和搜索过滤商品
  const filteredProducts = products.filter(product => {
    // 分类过滤
    const categoryMatch = 
      activeCategory === '全部商品' ||
      (activeCategory === '新品上市' && product.isNew) ||
      (activeCategory === '热销商品' && product.isHot) ||
      product.category === categories.find(cat => cat.name === activeCategory)?.id;
    
    // 搜索过滤
    const searchMatch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索逻辑已经在filteredProducts中实现
  };

  return (
    <div>
      {/* 顶部横幅 */}
      <section className="relative w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <div 
          className="absolute left-0 top-0 w-full h-full"
          style={{
            background: `url(${basePath}/images/store.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center">设计商店</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl text-center mb-6 sm:mb-8">精选设计产品，为您的生活空间注入艺术气息</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* 移动端分类选择器 */}
          <div className="block lg:hidden mb-8">
            <div className="bg-white p-4 shadow-sm rounded-md">
              <select 
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧分类导航 - 桌面端 */}
            <div className="hidden lg:block w-full lg:w-1/5">
              <div className="bg-white p-6 shadow-sm rounded-md">
                <h2 className="text-xl font-bold mb-6">商品分类</h2>
                <ul className="space-y-4">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`flex items-center w-full py-2 px-3 rounded-md transition-colors ${activeCategory === category.name ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => setActiveCategory(category.name)}
                      >
                        {category.icon && (
                          <Image 
                            src={activeCategory === category.name ? category.activeIcon : category.icon} 
                            alt={category.name} 
                            width={20} 
                            height={20} 
                            className="mr-3"
                          />
                        )}
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 右侧商品展示 */}
            <div className="w-full lg:w-4/5">
              {/* 搜索栏 */}
              <div className="bg-white p-4 sm:p-6 shadow-sm mb-6 sm:mb-8 rounded-md">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="搜索商品..."
                    className="flex-grow px-3 sm:px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-3 sm:px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <Image src={`${basePath}/logo/icon-search2.png`} alt="搜索" width={16} height={16} className="sm:w-5 sm:h-5" />
                  </button>
                </form>
              </div>

              {/* 商品列表 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white shadow-sm group overflow-hidden rounded-md cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <div 
                        className="w-full h-[200px] sm:h-[240px] md:h-[280px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${product.image})`,
                        }}
                      ></div>
                      {product.isNew && (
                        <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded">
                          新品
                        </div>
                      )}
                      {product.isHot && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          热销
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex justify-center items-center opacity-0 group-hover:opacity-100">
                        <button 
                          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setShowModal(true);
                          }}
                        >
                          查看详情
                        </button>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 truncate">{product.name}</h3>
                      <p className="text-red-600 font-bold">¥{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 无商品提示 */}
              {filteredProducts.length === 0 && (
                <div className="bg-white p-6 sm:p-8 shadow-sm text-center rounded-md">
                  <p className="text-gray-500 text-sm sm:text-base">没有找到符合条件的商品</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 商品详情弹窗 */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* 背景遮罩 */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowModal(false)}
            ></div>

            {/* 弹窗内容 */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="sr-only">关闭</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <div 
                    className="w-full h-[250px] sm:h-[350px] bg-cover bg-center rounded-md transition-transform duration-500 hover:scale-105"
                    style={{
                      backgroundImage: `url(${selectedProduct.image})`,
                    }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                    <div className="flex items-center mb-4">
                      <p className="text-red-600 text-xl font-bold">¥{selectedProduct.price}</p>
                      {selectedProduct.isNew && (
                        <span className="ml-3 bg-black text-white text-xs px-2 py-1 rounded">新品</span>
                      )}
                      {selectedProduct.isHot && (
                        <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded">热销</span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">商品分类</h4>
                      <p className="text-gray-700 capitalize">
                        {categories.find(cat => cat.id === selectedProduct.category)?.name || selectedProduct.category}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">商品描述</h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-700 whitespace-pre-line">{selectedProduct.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">配送信息</h4>
                      <div className="text-gray-700">
                        <p className="flex items-center mb-1">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          全国顺丰快递，预计3-5天送达
                        </p>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          满1000元免运费
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="tel:400-888-8888" 
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      电话咨询
                    </a>
                    <a 
                      href={`mailto:sales@thanstudio.com?subject=咨询：${selectedProduct.name}&body=您好，我对${selectedProduct.name}（价格：¥${selectedProduct.price}）有兴趣，请提供更多信息。`} 
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      邮件咨询
                    </a>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      返回列表
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}