import ProductDetails from '../app/ProductDetails'          //商品详情页
import UserCenter from '../app/UserCenter'                  //个人中心
import AllGoods from '../app/AllGoods'                      //全部商品
import ShoppingCart from '../app/ShoppingCart'              //购物车
import MyCollect from '../app/MyCollect'                    //收藏列表
import AddressList from '../app/Address'                    //地址列表
import AddressAdd from '../app/AddressAdd'                  //添加地址
import AddressEdit from '../app/AddressEdit'                //编辑地址
import ReturnAddress from '../app/ReturnAddress'            //退换货地址列表
import ReturnAddressAdd from '../app/ReturnAddressAdd'      //添加退换货地址
import ReturnAddressEdit from '../app/ReturnAddressEdit'    //编辑退换货地址
import Settings from '../app/Settings'                      //个人设置
import BindCashAccount from '../app/BindCashAccount'        //绑定银行卡
import BuyList from '../app/BuyList'                        //购买页面
import Buy from '../app/Buy'                                //合并付款页面
import SelectPay from '../app/SelectPay'                    //支付选择页面
export default {
    component: 'div',
    childRoutes: [{
        path: "/",
        component: ProductDetails,
    },
    {
        path: "/ProductDetails/:DetailId",
        component: ProductDetails
    },
    {
        path: "/UserCenter",
        component: UserCenter
    },
    {
        path: "/allgoods/:userId",
        component: AllGoods
    },
    {
        path: "/ShoppingCart",
        component: ShoppingCart
    },
    {
        path: "/MyCollect",
        component: MyCollect
    },
    {
        path: "/Address/:transfertype",
        component: AddressList
    },
    {
        path: "/AddressEdit/:AddressId",
        component: AddressEdit
    },
    {
        path: "/AddressAdd/:transfertype",
        component: AddressAdd
    },
    {
        path:"/ReturnAddress",
        component:ReturnAddress
    },
    {
        path:"/ReturnAddressEdit/:ReturnAddressId",
        component:ReturnAddressEdit
    },
    {
        path: "/ReturnAddressAdd",
        component: ReturnAddressAdd
    },
    {
        path:"/Settings",
        component:Settings
    },
    {
        path:"/BuyList/:buyId",
        component:BuyList
    },
    {
        path:"/Buy/:buyType",
        component:Buy
    },
    {
        path:"/SelectPay/:orderNumber",
        component:SelectPay
    },
    {
        path:"/BindCashAccount",
        component:BindCashAccount
    }]
}
