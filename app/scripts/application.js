define([
	'backbone',
	'communicator',
	'controllers/Service',
	'views/layout/OvationMain',
	'models/OvationData'
	],

	function( Backbone, Communicator, ServiceController, OvationMainLayout, OvationDataModel ) {
		'use strict';

		var App = new Backbone.Marionette.Application();

		/* Add initializers here */
		App.addInitializer( function () {

			Communicator.mediator.trigger("APP:START");

			var serviceController = new ServiceController();
			var dataModel = new OvationDataModel();

			var ovationMainLayout = new OvationMainLayout({
				el: '#app-layout',
				model: dataModel
			});

			ovationMainLayout.render();

		});

		return App;
	});
