// 文档加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化Swiper滑动
    initSwiper();
    
    // 导航栏激活状态
    initNavigation();
    
    // 平滑滚动
    initSmoothScroll();
});

// 初始化Swiper轮播
function initSwiper() {
    new Swiper('.swiper', {
        // 基本配置
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        grabCursor: true,
        
        // 分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        
        // 导航按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // 响应式配置
        breakpoints: {
            // >= 576px
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
}

// 导航栏激活状态
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // 滚动事件监听
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        // 检查当前滚动位置处于哪个区域
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // 更新导航栏激活状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 70px的偏移量，以防止目标被顶部导航遮挡
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 动态加载文章数据的函数（可以在未来扩展）
function loadArticles(articles) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    // 清空现有的轮播项
    swiperWrapper.innerHTML = '';
    
    // 添加文章到轮播
    articles.forEach(article => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide article-card';
        
        slide.innerHTML = `
            <div class="article-img">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <a href="${article.link}" class="read-more">阅读全文</a>
            </div>
        `;
        
        swiperWrapper.appendChild(slide);
    });
    
    // 重新初始化Swiper
    initSwiper();
}

// 根据当前URL的hash更新UI
function updateUIFromHash() {
    const hash = window.location.hash;
    if (hash) {
        // 移除所有导航链接的激活状态
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        
        // 为当前hash对应的导航链接添加激活状态
        const activeLink = document.querySelector(`nav ul li a[href="${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// 页面加载和hash变化时更新UI
window.addEventListener('load', updateUIFromHash);
window.addEventListener('hashchange', updateUIFromHash); 