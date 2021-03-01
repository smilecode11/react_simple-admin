const menuConfig = [{
    key: '/home',
    icon: "kongzhitai",
    title: '控制台'
}, {
    key: '/products',
    icon: "products",
    title: '商品',
    children: [{
        key: '/products/category',
        icon: "category",
        title: '品类管理'
    }, {
        key: '/products/product',
        icon: "product",
        title: '商品管理'
    }]
}, {
    key: '/order',
    icon: "order",
    title: '订单管理',
    children: [{
        key: '/order/general-order',
        icon: 'putong',
        title: '普通订单'
    }, {
        key: '/order/gift-order',
        icon: 'gift-order',
        title: '礼物订单'
    }]
}, {
    key: '/settings',
    icon: 'kongzhitai',
    title: "设置中心"
}];

export default menuConfig