sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/knpl/tss/useraccessmgmt/test/integration/pages/MainListReport' ,
        'com/knpl/tss/useraccessmgmt/test/integration/pages/MainObjectPage',
        'com/knpl/tss/useraccessmgmt/test/integration/OpaJourney'
    ],
    function(JourneyRunner, MainListReport, MainObjectPage, Journey) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/knpl/tss/useraccessmgmt') + '/index.html'
        });

        
        JourneyRunner.run(
            {
                pages: { onTheMainPage: MainListReport, onTheDetailPage: MainObjectPage }
            },
            Journey.run
        );
        
    }
);