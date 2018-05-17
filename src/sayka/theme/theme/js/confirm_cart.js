$(document).ready(function () {
    $('.confirm_del').click(function(){
        item_id = $(this).data()['item_id']
        data = {
            'item_id': item_id,
            'action': 'del'
        }
        url = location.href.replace('confirm_cart', 'cart_update')
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function (response) {
                if(response == 'remove success'){
                    location.reload()
                }
            }
        });
    })
    $('.number_update').change(function (e) { 
        item_id = $(this).data()['item_id']
        number = $(this).val()
        data = {
            'item_id': item_id,
            'number': number,
            'action': 'update'
        }
        url = location.href.replace('confirm_cart', 'cart_update')
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function (response) {
                if(response == 'update success'){
                }
            }
        });
    });
});