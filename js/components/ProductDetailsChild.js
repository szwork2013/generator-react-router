'use strict';
// 商品详情
import React from 'react';
export default class ProductDetailsChild extends React.Component {
    render() {
        let content = this.props.content
        return (
            <div className="main-product-detail swiper-slide swiper-no-swiping" dangerouslySetInnerHTML={{__html:content}} />
        )
    }
};