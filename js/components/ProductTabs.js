'use strict';
// 商品详情tab
import React from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import { GetComment } from '../actions/ActionFuncs'
import ProductDetailsChild from './ProductDetailsChild.js';
import ProductForSale from './ProductForSale.js';
import ProductComment from './ProductComment.js';
import Swiper from 'swiper';
import '../../css/main-detailtab.css';
import '../plugins/swiper/swiper.min.css';
class ProductTabs extends React.Component {
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    componentDidUpdate(){
        let pagination = findDOMNode(this.refs.productTabsPage)
        this.productTabs = new Swiper(findDOMNode(this.refs.productTabs), {
            autoHeight: true,
            pagination: pagination,
            paginationClickable: true,
            bulletClass: "tab",
            bulletActiveClass: "cur",
            paginationBulletRender: function(index, clsName) {
                var _name, _comment_count = 1990;
                switch (index) {
                    case 0:
                        _name = "商品详情";
                        break;
                    case 1:
                        _name = "产品售后";
                        break;
                    case 2:
                        _name = "评价" + "<span>(" + _comment_count + ")</span>"
                        break;
                    default:
                        break;
                }
                return '<li class="' + clsName + '">' + _name + '</li>';
            },
            onSlideChangeEnd:(swiper)=>{
                if(swiper.activeIndex == 2){
                    let _id  = this.props.state.data.id || '1'
                    let length = this.props.state.CommentList.list.data.data.length
                    if(length){return false;}
                    $.ajax({
                        url: 'http://xds.51lianying.local/goods/comment/'+_id,
                        type: 'GET',
                        dataType: 'json',
                        data: {param1: 'value1'},
                        error:(error)=>{
                            console.error(error)
                        },
                        success:(data)=>{
                            if(parseInt(data.code)==0){
                                this.props.dispatch(GetComment(data))
                                swiper.update();
                            }
                        }
                    })
                }
            }
        })
        this.productTabs.update();
    }
    render() {

        return (
            <div className="main-module">
                <div className="main-detailtab">
                    <div className="main-tab">
                        <ul className="main-tab-page clearfix" ref="productTabsPage"></ul>
                    </div>
                    <div className="main-product-content swiper-container" ref="productTabs">
                        <div className="main-product-wrapper swiper-wrapper">
                            <ProductDetailsChild content={this.props.data.content} />
                            <ProductForSale snum={this.props.data.snum} madeby={this.props.data.made_by} expire={this.props.data.expire} maintain={this.props.data.maintain} deliver_address={this.props.data.deliver_address} />
                            <ProductComment />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail
    }
}
export default connect(select)(ProductTabs);