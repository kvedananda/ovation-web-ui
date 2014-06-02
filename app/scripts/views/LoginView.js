define([
	'backbone',
	'hbs!tmpl/LoginViewTemplate',
	'ovationService',
	'jqueryValidate'
	],
	function( Backbone, LoginViewTemplate, OvationService ){
		'use strict';

		return Backbone.View.extend({

			template: LoginViewTemplate,
			className: 'login-view',

			initialize: function() {
				this.$el.append(this.template());
			},

			onShow: function() {
				var self = this;
				this.$el.find('.login-form:first').validate({
					submitHandler: function(form) {
						self.$el.find('.alert').hide();
						var formArray = $(form).serializeArray(),
							form = _.reduce(formArray, function(tmpObj, value) {
								tmpObj[value.name] = value.value;
								return tmpObj;
							}, {}),
							request = OvationService.login(form['login-form-email'], form['login-form-password']);
						request.error(function(response) {
							if(response.status === 401) {
								self.$el.find('.alert').show();
							}
						});
					}
				});
			}

		});
	});
