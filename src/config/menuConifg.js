const menuConfig = [{
    key: '/admin/home',
    icon: "kongzhitai",
    title: '控制台'
}, {
    key: '/admin/products',
    icon: "products",
    title: '商品',
    children: [{
        key: '/admin/products/category',
        icon: "category",
        title: '品类管理'
    }, {
        key: '/admin/products/product',
        icon: "product",
        title: '商品管理'
    }]
}, {
    key: '/admin/order',
    icon: "order",
    title: '订单管理',
    children: [{
        key: '/admin/order/general-order',
        icon: 'putong',
        title: '普通订单'
    }, {
        key: '/admin/order/gift-order',
        icon: 'gift-order',
        title: '礼物订单'
    }]
}];

export default menuConfig