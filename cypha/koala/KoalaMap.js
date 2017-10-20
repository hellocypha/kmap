/*
Copyright 2017 Aksel Wienke

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
limitations under the License.
*/


sap.ui.define(['jquery.sap.global','sap/ui/core/Control','./library'],
    function(jQuery, Control, library) {
        "use strict";

        /**
         * Constructor for a Map Plot
         *
         * @class
         * Map plot provider
         *
         * @extends sap.ui.core.Control
         *
         * @author Aksel Wienke
         * @version 0.1.0
         *
         * @constructor
         * @public
         * @alias cypha.koala.KoalaMap
         *
         */

        var KoalaMap = Control.extend("cypha.koala.KoalaMap", {
                metadata: {
                    library: "cypha.koala",
                    properties: {
                        id:     { type : "string", defaultValue:"map" },
                        title:  { type : "string", defaultValue:null },
                        latitude: { type : "sap.ui.model.type.Float", defaultValue:39.7166700 },
                        longitude: { type : "sap.ui.model.type.Float", defaultValue:-8 },
                        zoom: { type: "sap.ui.model.type.Integer", defaultValue: 6 },
                        width : {type : "sap.ui.core.CSSSize", defaultValue : "450px"},
                        height: {type : "sap.ui.core.CSSSize", defaultValue : "350px"},

                        _first: { type : "boolean", defaultValue:true },
                        
                        items: {type: "any", defaultValue: null }
                    }
                }
            }
        );

        KoalaMap.prototype._drawGraph = function (iWidth, iHeight) {

//            jQuery.sap.require("sap.ui.thirdparty.d3");
//            jQuery.sap.require("bower_component.d3-tip.index");

//
            if(!iWidth) {
                this.controlWidth = this.getProperty("width");
                this.controlHeight = this.getProperty("height");
            }
            else{
                this.controlWidth = iWidth;
                this.controlHeight = iHeight;
            }
//
//            /* Controlling the oldWidth is required because of the autoresize of
//             grid controls, you don't want the graph size to jump around */
//
            if(!iWidth && this.oldWidth ){
                this.controlWidth = this.oldWidth;
                this.controlHeight = this.oldHeight;
            }
//            this.controlAspect = parseInt(this.controlWidth) / parseInt(this.controlHeight);
//
//            var aId = this.getProperty("id");
//            var hashId = "#" + aId;
//
//            this.dataset = this.getItems();
//            var data = this._getData([]);
//
//            var measure = this.dataset.getMeasureNameByIndex();
//
//            var maxValue = d3.max(data, function(d){ return d[measure]; });
//            var valueScale = d3.scale.linear()
//                .range([0, parseInt(this.controlWidth) / 5]);
//
//            valueScale.domain([0, maxValue]);
//
//            var color = d3.scale.ordinal()
//                .range(["#52a7cf", "#a3c34e", "#e1af5a", "#7ebde5", "#c388b6", "#d9bd41", "#93b9c6"
//                    , "#ccc5a8", "#52bacc", "#dbdb46", "#98aafb"]);
//
            this.markers = [];
            mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpZW5rZSIsImEiOiIxYTBkOTMyNzgyYWIyODUxYzQ5ZWFkZTMyMmJlOWM4MCJ9.Ph28z4JI_aUbmBQcG1z0DQ';
            var map = new mapboxgl.Map({
            	container: this.getProperty("id"),
            	style: 'mapbox://styles/mapbox/dark-v9',
            	center: [this.getProperty("longitude"),
                    this.getProperty("latitude")],
            	  zoom: this.getProperty("zoom"),
            });
            
            
        	map.on('load', function () {
            	map.setPaintProperty("building", 'fill-color', '#ffffff');
            	map.setPaintProperty("water", 'fill-color', '#4286f4');
        	});
            this.map = map;
//            var map = mapboxgl.Map('map').setView([this.getProperty("latitude"),
//                this.getProperty("longitude")],this.getProperty("zoom"));
//            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//            }).addTo(map);
//
//            var latLabel = this.dataset.getLabelForAxis("x");
//            var longLabel = this.dataset.getLabelForAxis("y");
//            var zLabel = this.dataset.getLabelForAxis("z");
//            for(var i = 0; i < data.length; i++){
//                var m = this._addMarker(data[i][latLabel], data[i][longLabel],
//                    data[i][zLabel], data[i][measure], map, valueScale, color);
//                this.markers.push(m);
//            }
        };

        /**
         * This function will attach a dataset your chart and redraw the control. The control
         * takes into account the old dataset in order to process transitions.
         * @param dataSet A object of the SimpleChartData type. The object should be set with at least one dimension
         *                , data and one measure. If the dataset has more then one measure it will be ignore as the
         *                chart doesn't support multiple axis.
         */
        KoalaMap.prototype.setDataSet  = function(dataSet){
            this.setProperty("items", dataSet);
        };

        KoalaMap.prototype._shouldResize = function(newWidth,oldWidth, newHeight, oldHeight){
            var raciow = ( newWidth - oldWidth) / oldWidth;
            var racioh = ( newHeight - oldHeight) / oldHeight;

            if (Math.abs(raciow) > 0.1 ||  Math.abs(racioh) > 0.1){
                return true;
            }
            else{
                return false;
            }
        };

        KoalaMap.prototype.onAfterRendering = function () {
            this._drawGraph();
        };

        KoalaMap.prototype._addMarker = function (lat, long, label){

        	var el = document.createElement('div');
//            el.className = 'marker';
//            el.style.backgroundImage =  'url(image/marker_small.png)';
            el.className = 'marker';
//            el.style.backgroundImage = 'url(https://placekitten.com/g/40/40/)';
            el.style.width = '40px';
            el.style.height = '54px';
            el.style.backgroundImage = 'url(image/marker_small.png)';
            el.style.backgroundSize = 'cover';
            el.style.backgroundRepeat = 'no-repeat';

            el.addEventListener('click', function() {
                sap.m.MessageToast.show(label);
            });
        	
        	var marker = new mapboxgl.Marker(el)
        	  .setLngLat([long, lat])
        	  .addTo(this.map);
        	
//            var marker = L.circleMarker([ lat, long ], { color: color(this.markers.length) }).addTo(map);
//            marker.setRadius(scale(value));
//            var description = this.dataset.getMeasureDescriptionByIndex();
//            var texto =  "<Strong>" + label + "</Strong> <p align=\"center\">" +
//                "<span style='color:" + color(this.markers.length) + "'>"
//                + value + " " + description + "</span></p>"
//            //marker.bindPopup(label + ": " + value) + " " + description;
//            marker.bindPopup(texto);
//            marker.on('mouseover', function(e){
//                marker.openPopup();
//            });
//            marker.on('mouseout', function (e) {
//                this.closePopup();
//            });
            return marker;
        };

        KoalaMap.prototype._getData = function(oldData){
            var aItems = this.getItems().getChartData().items;

            if(aItems.length == 0){
                return;
            }

            var data = [];
            for (var i = 0; i < aItems.length; i++) {
                var oEntry = {};
                var keys = Object.keys(aItems[i]);
                for (var j in keys) {
                    var variable = keys[j]
                    var oldObject = oldData[i];
                    if(!aItems[i][variable] && (!oldObject || !oldObject[variable]) ){
                        continue;
                    }
                    oEntry[variable] = aItems[i][variable];
                    if (oldObject && variable !== "label") {
                        oEntry["old" + variable] = oldObject[variable];
                    }
                    else if(variable != "label") {
                        oEntry["old" + variable] = "0";

                    }
                }
                data.push(oEntry);
            }
            return data;
        };

        return KoalaMap;

    }, true);