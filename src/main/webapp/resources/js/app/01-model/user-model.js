/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.User = Backbone.Model.extend({
	idAttribute: "userId",
	urlRoot: solairis.ycl.constant.BASE_URL + '/api/user'
});