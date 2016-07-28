import React,{Component} from 'react'
export default class PaySuccess extends Component{

    componentDidMount(){
        if(this.props.params.payStatus == 1){
            document.title = '支付成功'
        }else{
            document.title = '支付失败'
        }
        $.loading.hide();
        var c = 10;
        var timer = setInterval(()=>{
            if(c <= 0){
                clearInterval(timer)
                timer = null;
                window.location.hash = '#/UserCenter'
            }else{
                c--;
            }
        },1000)
    }
    componentWillUnmount() {
        
    }
    render(){
        let status = this.props.params.payStatus || 0
        return (
            <div className="main">
                {status == 1 ? (
                    <div className="main-notes">
                        <h1>支付成功</h1>
                    </div>
                ) : (
                    <div className="main-notes fail">
                        <h1>支付失败</h1>
                    </div>
                )}
                <div className="main-pay-note">
                    <p>搜索关注 “我要联赢” 微信公众号随时跟踪订单进度</p>
                    <p>
                        <img src="images/code.jpg" alt="" />
                    </p>
                </div>
                <p className="main-pay-tel">联系客服：<a href="tel://4006728266">4006728266</a></p>
                <div className="main-logo"></div>
            </div>
        )
    }
}