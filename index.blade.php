<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no,minimal-ui">
    <meta name="hotcss" content="design-width=640,initial-dpr=1">
    <title>商品详情</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/main-title.css">
    <link rel="stylesheet" href="/css/main-price.css">
    <link rel="stylesheet" href="/css/main-sku.css">
    <link rel="stylesheet" href="/css/main-images.css">
    <link rel="stylesheet" href="/css/main-detailtab.css">
    <link rel="stylesheet" href="/css/main-description.css">
    <link rel="stylesheet" href="/css/main-usercenter.css">
    <link rel="stylesheet" href="/css/main-shopcart.css">
    <link rel="stylesheet" href="/css/main-settings.css">
    <link rel="stylesheet" href="/css/main-rate.css">
    <link rel="stylesheet" href="/css/main-pay.css">
    <link rel="stylesheet" href="/css/main-order.css">
    <link rel="stylesheet" href="/css/main-comment.css">
    <link rel="stylesheet" href="/css/main-collect.css">
    <link rel="stylesheet" href="/css/main-buylist.css">
    <link rel="stylesheet" href="/css/main-buy.css">
    <link rel="stylesheet" href="/css/main-allgoods.css">
    <link rel="stylesheet" href="/css/main-address.css">
    <link rel="stylesheet" href="/css/main-account.css">
    <link rel="stylesheet" href="/js/plugins/swiper/swiper.min.css">
    <script src="/js/plugins/hotcss/hotcss.js"></script>
</head>
<body>
    <div id="mobi_page_loading">
        <div class="page-loader page-loader-circularSquare"></div>
    </div>
    <div id="app"></div>
    <div id="sku"></div>
    <script>
        window.config = {};
        @if (config('app.env') == 'local')
        window.config.url = 'http://xds.51lianying.local';
        // window.config.url = 'http://test.api.51lianying.com';
        @else (config('app.env') == 'test')
        window.config.url = 'http://test.api.51lianying.com';
        @endif

        // 扩展store.min.js实现本地储存对象字符串
        config.setStorage = function(objName,key,val){
            var _data = {};
            _data[objName] = {};
            _data[objName].data = store.get(objName)||{};
            _data[objName].data[key] = val;
            store.set(objName,_data[objName].data);
        };
        // 比较两个对象是否相同
        config.isObjectValueEqual = function(a,b){
            var a = JSON.stringify(a),
                b = JSON.stringify(b);
            return a===b
        };
    </script>
    <script src="/js/plugins/jquery/jquery-1.12.4.min.js"></script>
    <script src="/js/plugins/store-localstorage/store.min.js"></script>
    <script src="/js/common/jquery.common.js"></script>
    <script src="/js/common/LoginAuthorization.js"></script>
    <script src="/dist/js/app/bundle.js"></script>

    <!--<script src="/dist/js/app/bundle.js"></script>
    <script src="/js/plugins/react/react.min.js"></script>
    <script src="/dist/js/app/bundle.js"></script>
    <script src="/js/plugins/react/react.min.js"></script>
    <script src="/js/plugins/react/react-dom.min.js"></script>
    <script src="/js/plugins/react/react-router.min.js"></script>
    <script src="/js/plugins/react/browser.min.js"></script>
    <script src="/js/plugins/jquery/jquery-1.12.4.min.js"></script>
    <script src="/js/plugins/store-localstorage/store.min.js"></script>
    <script src="/js/plugins/swiper/swiper.min.js"></script>
    <script src="/js/common/LoginAuthorization.js"></script>
    <script src="/js/app/Product.js" type="text/babel"></script> -->

    <!-- <script src="/js/analysis.js"></script>
     <script>
        $(function(){
            LYA({
                action: ['user_visit', 'common'],
                debug: true,
                param: {
                    buy_id: 1,
                    goods_id: 1,
                    come_from: 'xds'
                }
            });
        })
    </script> -->
</body>
</html>