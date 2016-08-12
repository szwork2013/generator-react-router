
;(function(window,undefined,$){
    $.extend({
        /**
         * @ 非微信中存储token
         * @ author xiege
         */
        setTokenForPC:function(token,userInfo){
            if(store.enabled){
                var tradeStore = store.get('trade');
                if(!tradeStore){
                    config.setStorage('trade','token',token);
                    config.setStorage('trade','userinfo',userInfo);
                    config.setStorage('trade','time',new Date().getTime());
                }else{
                    config.setStorage('trade','token',token)
                    config.setStorage('trade','time',new Date().getTime());
                }
            }else {
                console.error('This browser does not supports localStorage')
            }
        },
        /**
         * 更新PC端token，防止页面报错
         */
        refreshToken:function(callback){
            $.ajax({
                url: config.url + '/auth/refresh',
                type: 'GET',
                dataType: 'json',
                data: {},
                error:function(error){
                    if(error.status === 401 && error.responseJSON.code === 1){
                        alert('刷新token失败，请重新登录');
                        var _hash = window.location.hash;
                        _hash = _hash.replace('#','').replace(/\?.{1,}/gi,'');
                        window.location.hash = '#/Register' + _hash;
                    }
                },
                beforeSend:function(request){
                    config.setRequestHeader(request);
                },
                success:function(data){
                    if(parseInt(data.code) === 0){
                        config.setStorage('trade','time',new Date().getTime());
                        config.setStorage('trade','token',data.data.token);
                        config.setStorage('trade','userinfo',data.data.user);
                        config.head = data.data.token;
                        callback && callback(data.data)
                    };
                    if(parseInt(data.code) === 1){
                        alert('刷新token失败，请重新登录');
                        var _hash = window.location.hash;
                        _hash = _hash.replace('#','').replace(/\?.{1,}/gi,'');
                        window.location.hash = '#/Register' + _hash;
                        
                    }
                }
            })
        },
        /**
         * [tips 提示消息框]
         * @param  {[type]} data [显示内容]
         * @param  {[type]} time [显示时间后立即隐藏]
         * @return {[type]}      [description]
         */
        tips:function(data,time,callback){
            var _HTML = '<div class="pop-error" id="pop-error">'+data+'</div>'
            if($('#pop-error').length === 0){
                $('body').append(_HTML);
            }
            var $pop = $('#pop-error')
            var _width = $pop.outerWidth(true);
            $pop.css({
                'margin-left': -(_width/2)
            });
            setTimeout(function(){
                $pop.animate({
                    opacity:0
                },(time||1200), function() {
                    if(callback && (typeof(callback) == 'function')){
                        callback()
                    }
                    $pop.remove();
                });
            },(time||1200))
        },
        /**
         * [confirm 确认弹窗]
         * @param  {[type]} opts [传递的参数集合，defaults设置有默认值]
         * @return {[type]}      [description]
         */
        confirm:function(opts){
            var defaults = $.extend(true, {}, {
                titleclsName:'', // 当传入了title值时，这里传递值才会生效
                contentclsName:'',
                remove:true,
                init:null,  //初始化函数
                title:'', // 不传值则不显示
                content:'确认信息', // 传递显示的内容
                time:0, // 默认为0，不传值则不开启确认键计时
                CancelBtn:null, // 取消键的回调函数
                okBtn:null // 确认键的回调函数
            },opts);
            var _HTML = '<div class="pop-confirm ask" id="pop-confirm">'
                        +'<div class="pop-container">'
                            +'<div class="pop-main">'
                                +'<i class="pop-btn-close"></i>'
                                +'<div class="pop-content '+defaults.contentclsName+'">'+defaults.content+'</div>'
                                +'<div class="pop-btns clearfix">'
                                    +'<span class="pop-btn-cancle fl">取消</span>'
                                    +'<span class="pop-btn-ok fr">确认</span>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>';
            if(defaults.title != ''){
                _HTML = '<div class="pop-confirm ask" id="pop-confirm">'
                        +'<div class="pop-container">'
                            +'<div class="pop-main">'
                                +'<i class="pop-btn-close"></i>'
                                +'<div class="pop-title '+defaults.titleclsName+'">'+defaults.title+'</div>'
                                +'<div class="pop-content '+defaults.contentclsName+'">'+defaults.content+'</div>'
                                +'<div class="pop-btns clearfix">'
                                    +'<span class="pop-btn-cancle fl">取消</span>'
                                    +'<span class="pop-btn-ok disabled fr">确认</span>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>';
            }
            // 插入dom
            if($('#pop-confirm').length === 0){
                $('body').append(_HTML)
            }
            var $pop = $('#pop-confirm'),
                _height = $pop.find('.pop-main').height();
            if(defaults.init && (typeof(defaults.init) === 'function')){
                defaults.init($pop)
            }
            // 居中
            $pop.find('.pop-main').css({
                'margin-top': -(_height/2)
            });
            // 取消
            $pop.on('click touchend', '.pop-btn-close,.pop-btn-cancle', function(event) {
                if(defaults.CancelBtn && typeof defaults.CancelBtn === 'function'){
                    defaults.CancelBtn();
                };
                $pop.remove();
                return false;
            });
            // 确定
            $pop.on('click touchend', '.pop-btn-ok', function(event) {
                if(defaults.okBtn && typeof defaults.okBtn === 'function'&&!$(this).hasClass('disabled')){
                    defaults.okBtn($pop);
                    if(defaults.remove){$pop.remove();}
                };
                return false;
            });
            // 计时
            if(defaults.time){
                var _time = defaults.time;
                var timer = setInterval(function(){
                    if(_time==0){
                        clearInterval(timer);
                        timer=null;
                        $pop.find('.pop-btn-ok').html('确认').removeClass('disabled');
                    }else{
                        $pop.find('.pop-btn-ok').html('确认('+(_time--)+')');
                    }
                },1000)
            }else{
                $pop.find('.pop-btn-ok').removeClass('disabled');
            }
        },
        /**
         * [loading 页面加载]
         * @type {Object}
         */
        loading:{
            show:function(){
                if(!$('#mobi_page_loading').length){
                    $('body').append('<div id="mobi_page_loading"></div>')
                }else{
                    $('#mobi_page_loading').show();
                }

            },
            hide:function(){
                $('#mobi_page_loading').remove();
            }
        }
    });

})(window,undefined,jQuery)
