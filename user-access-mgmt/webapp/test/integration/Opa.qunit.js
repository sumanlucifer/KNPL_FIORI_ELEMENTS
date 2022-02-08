sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/knpl/useraccessmgmt/test/integration/pages/MainListReport' ,
        'com/knpl/useraccessmgmt/test/integration/pages/MainObjectPage',
        'com/knpl/useraccessmgmt/test/integration/OpaJourney'
    ],
    function(JourneyRunner, MainListReport, MainObjectPage, Journey) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/knpl/useraccessmgmt') + '/index.html'
        });

        
        JourneyRunner.run(
            {
                pages: { onTheMainPage: MainListReport, onTheDetailPage: MainObjectPage }
            },
            Journey.run
        );
        
    }
);