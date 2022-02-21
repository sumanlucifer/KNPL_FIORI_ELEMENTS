sap.ui.define([

    "sap/ui/core/library",
], function (coreLibrary) {
    "use strict";
    return {

        onDownloadPress: function (oEvent) {
            debugger;
            var downloadAttachmentLink = `${this.getInterface().getModel("fileService").sServiceUrl}DownloadDefectCSVSampleFiles(ID=e8a1f0d0-e157-4d4b-8bcf-27ca5e192336)/content`
            sap.m.URLHelper.redirect(downloadAttachmentLink, true);

        },
        onUploadPress: function (oEvent) {
            debugger;
            if (!this.importDialog) {
                //create instance of fragment
                this.importDialog = sap.ui.xmlfragment("com.knpl.tssportal.ext.fragment.FileUploadImport", this);
            }
            // this.getInterface().addDependent(this.importDialog);
            this.importDialog.open();


            // this.importDialog.attachAfterOpen(function () {

            //     sap.ui.getCore().byId("btnUpload").attachBrowserEvent("click", this.handleUploadPress);

            // }.bind(this));
        },

        handleUploadPress: function (oEvent) {
            debugger;
        },

        handleCancelPress: function (oEvent) {
            this.importDialog.close();
            this.importDialog.destroy();
            this.importDialog = null;
        },

    }

});