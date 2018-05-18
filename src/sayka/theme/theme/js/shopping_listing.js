$(function(){
    $('.cart-btn, .add-to-cart').click(function(e){
        e.preventDefault();
        item_id = $(this).data('item_id')
        item_url = $(this).data('item_url')
        if(item_url){
            url = item_url + '/@@cart_update'
        }else{
            url = location.href.replace('shopping_listing', 'cart_update')
        }
        data = {
            'item_id': item_id,
            'action': 'add'
        }
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function (response) {
                if(response == 'Add Success'){
                    itemCart.add(item_id)
                    notify({
                        type: "success", //alert | success | error | warning | info
                        title: "新增商品成功",
                        position: {
                            x: "right", //right | left | center
                            y: "bottom" //top | bottom | center
                        },
                        autoHide: true, //true | false
                        delay: 3000, //number ms
                    });
                }else if(response == 'Item exist'){
                    notify({
                        type: "warning", //alert | success | error | warning | info
                        title: "商品以再購物車內",
                        position: {
                            x: "right", //right | left | center
                            y: "bottom" //top | bottom | center
                        },
                        autoHide: true, //true | false
                        delay: 3000, //number ms
                    });
                }
            }
        });
    })
    $('.confirm_del').click(function(){
        item_id = $(this).data('item_id')
        url = location.href.replace('@@confirm_cart', 'cart_update')
        data = {
            'item_id': item_id,
            'action': 'del'
        }
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function (response) {
                if(response == 'remove success'){
                    location.reload()
                    notify({
                         type: 'success',
                         title: '刪除商品成功',
                         autoHide: true,
                         delay: 3000,
                         positon: {
                             x: 'right',
                             y: 'bottom'
                         }
                     })
                 }
            }
        });
    })

    $('.number_update').change(function(){
	item_id = $(this).data('item_id')
	number = $(this).val()
	data = {
	    'item_id': item_id,
	    'number': number,
	    'action': 'update'
	}
	url = location.href.replace('@@confirm_cart', 'cart_update')

	$.ajax({
	    type: 'post',
	    url: url,
	    data: data,
	    success: function(response){
		$('#total_price').html(response)
	    }
	})
    })
})
