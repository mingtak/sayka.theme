$(function(){
    $('#go_confirm_cart').click(function(e){
	e.preventDefault();
	shopCart = JSON.parse($.cookie('shopCart'))

	if(shopCart.length != 0){
            pathname = location.pathname
            if(pathname == '/'){
		location.href = '/@@confirm_cart'
	    }else{
      	        location = location.href.replace(pathname, '/@@confirm_cart')
	    }
        }else{
	    notify({
	        type: "warning",
		title: "購物車尚未有商品",
		position: {
		    x: "right",
	  	    y: "bottom"
		},
		autoHide: true,
                delay: 3000,
	    })
	}
    })
})
Vue.component('product-list', {
    template: 
    `<div class="cart-product">
        <div class="inner">
            <div class="cross-icon" v-on:click="$emit('remove')">
                <span class="icon fa fa-remove"></span>
            </div>
            <div class="image">
                <a  v-bind:href="absolute_url" class="product-thumb">    
                    <img v-bind:src="image" />
                </a>
            </div>
            <h3><a href="#">{{title}}</a></h3>
            <div class="middle" style='margin-top:35px'>
                <div class="price">NT {{sale_price}}</div>
            </div>

        </div>
    </div>`
    ,

    props: ['title','image','sale_price', 'absolute_url']
})

var itemCart = new Vue({
    el: '#item-cart',
    data: {
      product_list: [],
      number: 0,
      total_price: 0,
    },
    created: function(){
        if(!$.cookie('shopCart')){
            $.cookie('shopCart', '[]', {path: '/'})
        }
        shopCart = $.cookie('shopCart')
        shopCart = JSON.parse(shopCart)
        for(i=0; i<shopCart.length; i++){
            id = shopCart[i][0]
            amount = shopCart[i][1]
            url = location.protocol + '//' + location.host + '/shopping_listing/' + id

            $.ajax({
                type: "get",
                url: url,
                headers: {
                    'Accept': "application/json",
                  }, 
                success: function (response) {
                    title = response['title']
                    sale_price = response['sale_price']
                    image = response['image_1']['scales']["thumb"]['download']                   
                    absolute_url = response['@id']
                    product_id = response['id']
                    itemCart.product_list.push({
                        'title': title,
                        'sale_price': sale_price,
                        'image': image,
                        'amount': amount,
                        'absolute_url': absolute_url,
                        'product_id': product_id
                    })
                    itemCart.number += 1
                    itemCart.total_price += sale_price
                },
            });
        }
    },
    methods: {
        remove:function(index){
            product_index = index
            item_id = this.product_list[index].product_id
            data = {
                'item_id': item_id,
                'action': 'del'
            }
            url = location.protocol + '//' + location.host + '/cart_update'
            $.ajax({
                type: "post",
                url: url,
                data: data,
                success: function (response) {
                    sale_price = itemCart.product_list[product_index]['sale_price']
                    itemCart.number -= 1
                    itemCart.total_price -= sale_price

                    itemCart.product_list.splice(product_index, 1)
                    notify({
			type: 'warning',
			title: '刪除商品成功',
			delay: 3000,
			position: {
			    x: 'right',
			    y: 'bottom'
			},
			autoHide: true
		    })
                }
            });
        },
        add:function(item_id){
            url = location.protocol + '//' + location.host + '/shopping_listing/' + item_id
            $.ajax({
                type: "get",
                url: url,
                headers: {
                    'Accept': "application/json",
                  }, 
                success: function (response) {
                    title = response['title']
                    sale_price = response['sale_price']
                    image = response['image_1']['scales']["thumb"]['download']                   
                    absolute_url = response['@id']
                    product_id = response['id']
                    itemCart.product_list.push({
                        'title': title,
                        'sale_price': sale_price,
                        'image': image,
                        'absolute_url': absolute_url,
                        'product_id': product_id
                    })
                    itemCart.number += 1
                    itemCart.total_price += sale_price
                },
            });
        }
    }
})

