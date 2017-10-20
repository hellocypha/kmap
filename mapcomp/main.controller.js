sap.ui.controller("mapcomp.main", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mapcomp.main
*/
	onInit: function() {
		
	    var oModel = new sap.ui.model.json.JSONModel();
	    oModel.loadData("./ting.json");

		this.getView().setModel(oModel, "ting");
		

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mapcomp.main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mapcomp.main
*/
	onAfterRendering: function() {
		
		var lat = 53.353851;
		var lon = 9.8692409;

	    this.getView().byId("map")._addMarker(lat, lon, "Label");


	},
	onAdd: function() {
		
		var lat = 53.353851;
		var lon = 9.8692409;

	    this.getView().byId("map")._addMarker(lat, lon, "Label");


	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mapcomp.main
*/
//	onExit: function() {
//
//	}

});