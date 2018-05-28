from plone.app.layout.viewlets import common as base
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone import api
import json

LIMIT = 10


class CartIcon(base.ViewletBase):
    def cart_data(self):
        request = self.request
        cookie = request.cookies.get('itemInCart', '[]')
        json_cookie = json.loads(cookie)
        data = {}
        total_amount = 0
        try:
            for item in json_cookie:
                item_id = item[0]
                brain = api.content.find(id=item_id, portal_type='Product')[0]
                name = brain.Title
                obj = brain.getObject()
                sale = obj.salePrice
                amount = item[1]

                total_amount += sale * amount
                data[item_id] = {
                    'name': name,
                    'object': obj,
                    'sale': sale,
                    'amount': amount
                }
        except:
            import pdb;pdb.set_trace()

        self.total_amount = total_amount

        return data
        

class NewsScroll(base.ViewletBase):
    def catch_news(self):
        portal = api.portal.get()
        result = api.content.find(context=portal['91cb8fe65c7165b0805e'], portal_type='Youtube', 
            sort_order='descending', sort_on='created', sort_limit=3)
        return result


class Banner(base.ViewletBase):
    def catch_banner(self):
        portal = api.portal.get()
        result = api.content.find(portal_type='Cover')
        return result


class NewsEvent(base.ViewletBase):
    def catch_news(self):
        portal = api.portal.get()
        result_event = api.content.find(context=portal['event_info']['event_news'], sort_limit=5)
        event_list = []
        for item in result_event:
	    if api.content.get_state(obj=item.getObject()) == 'published':
                title = item.Title
                date = item.getObject().creation_date.utcdatetime().strftime('%Y-%m-%d')
                url = item.getObject().absolute_url()
                event_list.append([title, date, url])
        return event_list


class Gallery(base.ViewletBase):
    def update(self):
        request = self.request
        portal = api.portal.get()
        gallery_brains = api.content.find(context=portal['gallery'], port_type='Image')
        self.gallery_brains = gallery_brains


class HeaderUserInfo(base.ViewletBase):
    def update(self):
        if(not api.user.is_anonymous()):
	    self.anonymouse = False
            user = api.user.get_current()
 	    self.user_id = user.id
            if('Manager' in user.getRoles()):
	        self.isManager = True
	    else:
		self.isManager = False
        else:
	    self.anonymouse = True
        

