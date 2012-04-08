/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.CurrentUser = Backbone.Model.extend({
	url: YCLConstants.BASE_URL + '/api/currentuser'
});