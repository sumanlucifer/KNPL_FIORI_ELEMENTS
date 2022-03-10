sap.ui.define([
    "sap/ui/core/Component",
    "sap/m/MessageToast",
], function (Component, MessageToast) {
    "use strict";
    return {

        onDownloadPress: function () {
            var downloadAttachmentLink = `${this.getInterface().getModel("fileService").sServiceUrl}DownloadDefectCSVSampleFiles(ID=e8a1f0d0-e157-4d4b-8bcf-27ca5e192336)/content`
            sap.m.URLHelper.redirect(downloadAttachmentLink, true);

        },

        onUploadPress: function () {
            if (!this.oListView) {
                this.oListView = this._view;
            }
            if (!this.oListController) {
                this.oListController = this._controller;
            }
            if (!this.importDialog) {
                //create instance of fragment
                this.importDialog = sap.ui.xmlfragment("com.knpl.tss.tssportal.ext.fragment.FileUploadImport", this);
            }
            this.importDialog.setModel(this.oListView.getModel("i18n"));
            this.oListView.addDependent(this.importDialog);
            this.importDialog.open();
        },

        handleCancelPress: function (oEvent) {
            this.importDialog.close();
            this.importDialog.destroy();
            this.importDialog = null;
        },

        handleUploadComplete: function (oEvent) {
            var oResourceBundle = this.oListView.getModel("i18n").getResourceBundle();
            var oResponse = oEvent.getParameters("response");
            if (oResponse) {
                if (oResponse.status === 204) {
                    sap.m.MessageToast.show(oResourceBundle.getText("fileUploadSuccessMsg"));
                    this.getInterface().refresh(true);
                } else {
                    var oJSONResponse = JSON.parse(oResponse.responseRaw);
                    sap.m.MessageBox.error(oJSONResponse.error.message);
                }
            }
            sap.ui.core.BusyIndicator.hide();
            this.importDialog.destroy();
            this.importDialog = null;
        },
        onUploadFileTypeMis: function () {

            MessageToast.show("Kindly upload a file of type CSV,Not allowed to upload xlsx, pdf, jpeg");


        },

        handleUploadPress: function (oEvent) {
            //perform upload
            var oResourceBundle = this.oListView.getModel("i18n").getResourceBundle();
            var oFileUploader = sap.ui.getCore().byId("fupImport");

            //check file has been entered
            var sFile = oFileUploader.getValue();
            if (!sFile) {
                sap.m.MessageToast.show(oResourceBundle.getText("fileSelectionValidationMsg"));
                return;
            }
            else {
                //Add header parameters to file uploader.
                var oDataModel = this.oListView.getModel("fileService");
                // var oFile = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];

                /* var sTokenForUpload = oDataModel.getSecurityToken();
                var oHeaderParameter = new sap.ui.unified.FileUploaderParameter({
                    name: "X-CSRF-Token",
                    value: sTokenForUpload
                }); */

                var oHeaderSlug = new sap.ui.unified.FileUploaderParameter({
                    name: "SLUG",
                    value: sFile
                });

                //Header parameter need to be removed then added.
                // oFileUploader.removeAllHeaderParameters();
                // oFileUploader.addHeaderParameter(oHeaderParameter);

                oFileUploader.addHeaderParameter(oHeaderSlug);

                // HTTP request Parameter changed from default .i.e. POST to PUT
                oFileUploader.setHttpRequestMethod("PUT");

                //set upload url
                var sUrl = oDataModel.sServiceUrl + "UploadDefectFiles(ID=e8a1f0d0-e157-4d4b-8bcf-27ca5e192336)/content";
                oFileUploader.setUploadUrl(sUrl);
                oFileUploader.upload();
                sap.ui.core.BusyIndicator.show(0);
                this.importDialog.close();
            }
        }
    }
});