/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.CurrentUser = Backbone.Model.extend({
	url: solairis.ycl.constant.BASE_URL + '/api/currentuser'
});