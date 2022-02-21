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
            if (!this.importDialog) {
                //create instance of fragment
                this.importDialog = sap.ui.xmlfragment("com.knpl.tssportal.ext.fragment.FileUploadImport", this);
            }
            this.getInterface().addDependent(this.importDialog);
            this.importDialog.open();
        },

        handleCancelPress: function (oEvent) {
            this.importDialog.close();
            this.importDialog.destroy();
            this.importDialog = null;
        },

    }

});