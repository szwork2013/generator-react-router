/**
 * 全部宝贝
 */
import React,{Component} from 'react'
import {
    Link
} from 'react-router'
import {connect} from 'react-redux'
// import Recommend from '../components/Recommend'
import CopyRight from '../components/CopyRight'
import LoadMorePageData from '../event/event.LoadMorePageData'
import { 
    getGoodsList,
    getMoreGoodsList
} from '../actions/ActionFuncs'
class AllGoods extends Component {
    constructor(){
        super();
        let _this = this;
        /**
         * [url 请求url获取数据
         *  pagesize 返回的数据每一页的条数
         *  page 请求的第几页
         *  flag 请求标识，当正在请求中时该标识为false则不能再次请求
         *  noMore 请求更多标识，为true则表示没有更多数据了，不再进行请求
         *  winHeight window的窗口高度
         *  callback 回调函数，请求成功后执行]
         * @type {[type]}
         */
        this.state = {
            url: config.url + '/goods/list/',
            page:2,
            flag:true,
            noMore:false,
            callback:function(pdata){
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getMoreGoodsList(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
        };
        this.LoadMorePageData = LoadMorePageData.bind(this);
    }
    componentDidMount() {
        document.title = '全部宝贝'
        let _this = this;
        let _id = this.props.params.userId||'1';
        this.serverRequest = $.ajax({
            url: _this.state.url + _id,
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize:config.pagesize,
                page:1
            },
            beforeSend:(request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    this.props.dispatch(getGoodsList(data.data))
                    $.loading.hide()
                    // 加载更多列表
                    window.addEventListener('scroll',_this.LoadMorePageData);

                }else{
                    alert('网络错误');
                    // window.location.reload();
                }
            }
        });

    }
    componentWillUnmount() {
        this.serverRequest.abort();
        window.removeEventListener('scroll',this.LoadMorePageData);
    }
    render(){
        let _data = this.props.state
        let _HTML = ''
        let user = _data.userProfile
        if(_data.data.length){
            _HTML = _data.data.map((item,index)=>{
                let _link = '/ProductDetails/'+item.id
                return (
                    <li key={index}>
                        <Link className="gllgoods-item" to={_link}>
                            <div><img src={item.goods_images[0]||item.goods_images[1]||item.goods_images[2]} alt="" /></div>
                            <p>{item.title}</p>
                            <p>&yen;{item.min_price}~{item.max_price}</p>
                        </Link>
                    </li>
                )
            })
        }else{
            _HTML = (
                <div className="allgoods_nolist">暂时还没有商品</div>
            )
        }
        return (
            <div className="main">
                <div className="allgoods-header clearfix">
                    <img src={user.shop_logo||'/images/shop_logo.gif'} alt="" className="fl" />
                    <p className="fl">{user.shop_name}</p>
                    <div className="goods-count fr">本家有<span>{_data.data.length}</span>个宝贝</div>
                </div>
                <div className="allgoods-container">
                    <div className="allgoods-list">
                        <ul className="clearfix">
                            {_HTML}
                        </ul>
                    </div>
                </div>
                {/*<Recommend />*/}
                <CopyRight clsName={'fixed'} />
            </div>
        )
    }
}
function select(state){
    return {state:state.GoodsList};
}
export default connect(select)(AllGoods);
