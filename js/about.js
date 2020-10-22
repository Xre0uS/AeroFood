"use strict";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tab-group').className = 'ready';

    var tabHeaders = document.getElementsByClassName('tab-header');

    for (var i = 0; i < tabHeaders.length; i++)
    {
        tabHeaders[i].addEventListener('click', activateTab);
    }

    function activateTab(event)
    {
        var myID = this.id,
            contentID = myID.replace('header', 'content');

        deactivateAllTabs();    

        document.getElementById(myID).className = 'tab-header active';
        document.getElementById(contentID).className = 'tab-content active';    
    }

    function deactivateAllTabs()
    {
        document.getElementById('tab-header-1').className = 'tab-header';
        document.getElementById('tab-header-2').className = 'tab-header';
        document.getElementById('tab-header-3').className = 'tab-header';
        document.getElementById('tab-header-4').className = 'tab-header';
        document.getElementById('tab-content-1').className = 'tab-content';
        document.getElementById('tab-content-2').className = 'tab-content';
        document.getElementById('tab-content-3').className = 'tab-content';
        document.getElementById('tab-content-4').className = 'tab-content';
    }

})