sap.ui.define([

    "sap/ui/core/library",





], function (coreLibrary) {
    "use strict";
    return {

        onDownloadPress: function (oEvent) {

            debugger;
        },
        onUploadPress: function (oEvent) {
            debugger;
            this.oFileUploader = new sap.ui.unified.FileUploader({

            });
            this.oFileUploader.fireChange();
        }



    }

});