// Code X Admin Dashboard - Shared State & LocalStorage Engine
const DB_KEYS = {
    USERS: 'codex_admin_users',
    POSTS: 'codex_admin_posts',
    EMPLOYEES: 'codex_admin_employees',
    COMMENTS: 'codex_admin_comments',
    SITE_CONFIG: 'codex_admin_site_config',
    CURRENT_USER: 'codex_admin_current_user',
    ROLE: 'codex_admin_role'
};

function hashPassword(pwd) {
    let hash = 0;
    for (let i = 0; i < pwd.length; i++) {
        hash = ((hash << 5) - hash) + pwd.charCodeAt(i);
        hash |= 0;
    }
    return 'sha256_' + Math.abs(hash).toString(16) + '_enc';
}

const DEFAULT_USERS = [
    {
        id: 'u1',
        name: 'عبدالهادي خليل ابودراز (كرم)',
        email: 'admin@codex.platform',
        password: hashPassword('123456'),
        title: 'مهندس برمجيات & مدير النظام الرئيسي',
        bio: 'مؤسس منصة Code X التقنية، خبير تطوير واجهات وتطبيقات ذكية.',
        whatsapp: '970599137164',
        avatar: 'ك ر',
        friends: ['u2', 'u3']
    },
    {
        id: 'u2',
        name: 'أحمد إسماعيل أبو تير',
        email: 'ahmed@codex.platform',
        password: hashPassword('123456'),
        title: 'منسق احتفالات ومحتوى تقني',
        bio: 'متخصص في إدارة الفعاليات وتوثيق البيانات البرمجية.',
        whatsapp: '970599000111',
        avatar: 'أ ت',
        friends: ['u1', 'u4']
    },
    {
        id: 'u3',
        name: 'راندا سامي',
        email: 'randa@codex.platform',
        password: hashPassword('123456'),
        title: 'مصممة واجهات ومحتوى معرفي',
        bio: 'خبرة واسعة في هندسة تجربة المستخدم UI/UX.',
        whatsapp: '970599222333',
        avatar: 'ر س',
        friends: ['u1']
    }
];

const DEFAULT_POSTS = [
    {
        id: 'p1',
        authorId: 'u1',
        category: 'تكنولوجيا المعلومات والبرمجة',
        title: 'هندسة واجهات المستخدم الحديثة باستخدام Tailwind CSS',
        content: 'كيفية بناء أنظمة تصميم متجاوبة وسريعة الاستجابة مع دعم الوضع المظلم وواجهات الزجاج الشفاف Glassmorphism.',
        createdAt: 'منذ ساعتين',
        likes: ['u2', 'u3'],
        shares: 5
    },
    {
        id: 'p2',
        authorId: 'u2',
        category: 'الأعمال الذكية وإدارة البيانات',
        title: 'أهمية أنظمة إدارة المحتوى وقواعد بيانات LocalStorage',
        content: 'استعراض آليات الحفظ المحلي وإدارة الحالة في تطبيقات الويب من الجانب البرمجي البحت.',
        createdAt: 'منذ 5 ساعات',
        likes: ['u1'],
        shares: 3
    }
];

const DEFAULT_COMMENTS = [
    { id: 'c1', postId: 'p1', userId: 'u2', text: 'شرح ممتاز جداً ومفيد لتطوير الواجهات.', createdAt: 'منذ ساعة' },
    { id: 'c2', postId: 'p2', userId: 'u3', text: 'معلومات قيمة وأسلوب عرض احترافي.', createdAt: 'منذ 3 ساعات' }
];

const DEFAULT_EMPLOYEES = [
    { id: 'e1', name: 'م. طارق السالم', role: 'مشرف النظام التقني', department: 'تطوير البرمجيات', status: 'نشط' },
    { id: 'e2', name: 'أ. ريم الحربي', role: 'مسؤولة الجودة ومراجعة المحتوى', department: 'الجودة والرقابة', status: 'نشط' }
];

const DEFAULT_SITE_CONFIG = {
    brandName: 'Code X',
    brandSubtitle: 'منصة تبادل الخبرات التقنية',
    primaryColor: 'from-blue-600 via-sky-500 to-cyan-400',
    headerStyle: 'sticky top-0 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm',
    showSections: {
        comments: true,
        posts: true,
        users: true,
        friends: true,
        employees: true
    },
    customPages: [
        { id: 'custom_1', title: 'دليل المطورين', slug: 'developers.html', content: 'هذه صفحة مخصصة لدليل المطورين والمستندات التقنية.' }
    ],
    customNavItems: [
        { title: 'دليل المطورين', url: 'developers.html' }
    ]
};

function initDB() {
    if (!localStorage.getItem(DB_KEYS.USERS)) localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    if (!localStorage.getItem(DB_KEYS.POSTS)) localStorage.setItem(DB_KEYS.POSTS, JSON.stringify(DEFAULT_POSTS));
    if (!localStorage.getItem(DB_KEYS.COMMENTS)) localStorage.setItem(DB_KEYS.COMMENTS, JSON.stringify(DEFAULT_COMMENTS));
    if (!localStorage.getItem(DB_KEYS.EMPLOYEES)) localStorage.setItem(DB_KEYS.EMPLOYEES, JSON.stringify(DEFAULT_EMPLOYEES));
    if (!localStorage.getItem(DB_KEYS.SITE_CONFIG)) localStorage.setItem(DB_KEYS.SITE_CONFIG, JSON.stringify(DEFAULT_SITE_CONFIG));
    if (!localStorage.getItem(DB_KEYS.CURRENT_USER)) localStorage.setItem(DB_KEYS.CURRENT_USER, 'u1');
    if (!localStorage.getItem(DB_KEYS.ROLE)) localStorage.setItem(DB_KEYS.ROLE, 'admin'); // الافتراضي مدير للوحة التحكم
}

initDB();

const Store = {
    getUsers: () => JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]'),
    saveUsers: (d) => localStorage.setItem(DB_KEYS.USERS, JSON.stringify(d)),
    getPosts: () => JSON.parse(localStorage.getItem(DB_KEYS.POSTS) || '[]'),
    savePosts: (d) => localStorage.setItem(DB_KEYS.POSTS, JSON.stringify(d)),
    getComments: () => JSON.parse(localStorage.getItem(DB_KEYS.COMMENTS) || '[]'),
    saveComments: (d) => localStorage.setItem(DB_KEYS.COMMENTS, JSON.stringify(d)),
    getEmployees: () => JSON.parse(localStorage.getItem(DB_KEYS.EMPLOYEES) || '[]'),
    saveEmployees: (d) => localStorage.setItem(DB_KEYS.EMPLOYEES, JSON.stringify(d)),
    getConfig: () => JSON.parse(localStorage.getItem(DB_KEYS.SITE_CONFIG) || JSON.stringify(DEFAULT_SITE_CONFIG)),
    saveConfig: (d) => localStorage.setItem(DB_KEYS.SITE_CONFIG, JSON.stringify(d)),
    getCurrentUser: () => {
        const users = Store.getUsers();
        const id = localStorage.getItem(DB_KEYS.CURRENT_USER) || 'u1';
        return users.find(u => u.id === id) || users[0];
    },
    getRole: () => localStorage.getItem(DB_KEYS.ROLE) || 'admin',
    setRole: (r) => localStorage.setItem(DB_KEYS.ROLE, r)
};

function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 left-5 z-50 flex flex-col gap-2';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'error' ? 'bg-rose-600 text-white' : 'bg-gradient-to-l from-blue-600 via-sky-500 to-cyan-400 text-white';
    toast.className = `${bg} px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2.5 transition-all duration-300 transform translate-y-2 opacity-0 border border-white/25`;
    toast.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation text-lg' : 'fa-circle-check text-lg text-emerald-200'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove('translate-y-2', 'opacity-0'));
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Render Admin Control Panel Shell & Sidebar
function renderAdminShell(activeTab) {
    const config = Store.getConfig();
    const user = Store.getCurrentUser();
    const role = Store.getRole();

    const headerEl = document.getElementById('admin-header');
    if (headerEl) {
        headerEl.innerHTML = `
        <header class="${config.headerStyle} z-40 sticky top-0">
            <div class="max-w-[1500px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${config.primaryColor} text-white flex items-center justify-center font-black text-xl shadow-lg shadow-sky-200">
                        <i class="fa-solid fa-code"></i>
                    </div>
                    <div>
                        <span class="text-2xl font-black bg-gradient-to-l from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">${config.brandName}</span>
                        <span class="block text-[11px] text-sky-600 font-bold">${config.brandSubtitle} - لوحة التحكم الإدارية</span>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-50 border border-sky-100 text-xs font-bold text-slate-700">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>${user.name} (${role === 'admin' ? 'مدير النظام' : 'مستخدم'})</span>
                    </div>
                    <button onclick="toggleMobileMenu()" class="lg:hidden p-2.5 rounded-xl bg-sky-50 text-blue-600 border border-sky-200">
                        <i class="fa-solid fa-bars text-xl" id="mobile-menu-icon"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-sky-100 px-4 py-4 space-y-2 shadow-xl">
                ${getNavLinksHTML(activeTab, true)}
            </div>
        </header>`;
    }

    const sidebarEl = document.getElementById('admin-sidebar');
    if (sidebarEl) {
        sidebarEl.innerHTML = `
        <div class="bg-white/90 backdrop-blur-sm rounded-3xl border border-sky-100 p-5 shadow-sm space-y-6 sticky top-28">
            <div class="p-4 rounded-2xl bg-gradient-to-bl from-blue-600 via-sky-500 to-cyan-500 text-white shadow-md">
                <p class="text-xs font-bold text-sky-100">أدوات الإدارة والتحكم</p>
                <p class="text-sm font-black mt-0.5">معيار SRS 830 IEEE</p>
            </div>
            <nav class="space-y-1.5">
                ${getNavLinksHTML(activeTab, false)}
            </nav>
            <div class="pt-4 border-t border-sky-100">
                <div class="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs space-y-2">
                    <p class="font-bold text-slate-800">وضع الصلاحية:</p>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="switchRole('admin')" class="py-1.5 px-2 rounded-xl font-bold transition ${role === 'admin' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 border'}">مدير</button>
                        <button onclick="switchRole('user')" class="py-1.5 px-2 rounded-xl font-bold transition ${role === 'user' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 border'}">مستخدم</button>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

function getNavLinksHTML(activeTab, isMobile) {
    const items = [
        { id: 'comments', href: 'comments.html', icon: 'fa-comments', label: 'إدارة التعليقات' },
        { id: 'posts', href: 'posts.html', icon: 'fa-newspaper', label: 'إدارة المنشورات' },
        { id: 'users', href: 'users.html', icon: 'fa-users-gear', label: 'إدارة المستخدمين' },
        { id: 'friends', href: 'friends.html', icon: 'fa-user-group', label: 'الصداقات والتواصل' },
        { id: 'structure', href: 'structure.html', icon: 'fa-sitemap', label: 'إدارة هيكلة الموقع' }
    ];

    return items.map(item => `
        <a href="${item.href}" class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition ${activeTab === item.id ? 'bg-gradient-to-l from-blue-600 to-sky-500 text-white shadow-md shadow-sky-200' : 'text-slate-700 hover:bg-sky-50 hover:text-blue-700'}">
            <i class="fa-solid ${item.icon} w-5 text-center"></i>
            <span>${item.label}</span>
        </a>
    `).join('');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function switchRole(role) {
    Store.setRole(role);
    showToast(`تم تبديل الصلاحية إلى: ${role === 'admin' ? 'مدير النظام' : 'مستخدم'}`);
    setTimeout(() => window.location.reload(), 400);
}
