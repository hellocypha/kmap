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

/**
 * OpenUI5 CYPHA Koala libs
 * @namespace
 * @name cypha
 */

sap.ui.define(['jquery.sap.global', 'sap/ui/core/library'], // library dependency
    function(jQuery) {

        "use strict";

        /**
         * Koala controls library.
         *
         * @namespace
         * @name cypha.koala
         * @author Aksel Wienke
         * @version 0.1.0
         * @public
         */

            // delegate further initialization of this library to the Core
        sap.ui.getCore().initLibrary({
            name : "cypha.koala",
            version: "${version}",
            dependencies : ["sap.ui.core"],
            types: [],
            interfaces: [],
            controls: [
                "cypha.koala.KoalaMap"
            ],
            elements: [
            ]
        });


        return cypha.koala;

    }, /* bExport= */ false);
