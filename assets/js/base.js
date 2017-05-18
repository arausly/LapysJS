/* Global Object */
window.name = get.html("title", 0).textContent

/* Document JS */
    document.dir = "ltr"
    
/* HTML Elements JS */
    // <html> Attributes
    document.html.description = "Front-End Design and Development Framework | "
    document.html.lang = "en"
    document.html.translate = true
    document.html.version = (
        function() {
            if (HTMLDoctype == "<!DOCTYPE html>")
                return "5.0+"
            else 
                return "5.0 below"
        }
    )()

/* Navigation JS */
var nav = get.html("#nav", 0),
itemIndex = 0

    // Implement the navigation content's components via javascript
    nav.insertAdjacentHTML('afterbegin',
        // Ribbon
        '<div> &#9776; </div>' +
        /* Links
                --- FORMAT ---
                    <a class="nav-*" data-title="<<name>>_right" href="<<link>>" hreflang="html" target="_self">
                        <span> <<name>> </span>
                        <span class="icn-"> <<icon>> </span>
                    </a>
        */
        '<a class="nav-home" data-title="Home_bottom_right" href="index.html" hreflang="html" target="_self"> <span> Home </span> <span> &#9751; </span> </a>' +
        '<a class="nav-download" data-title="Download_bottom_right" href="download.html" hreflang="html" target="_self"> <span> Download </span> <span> &darr; </span> </a>' +
        '<a class="nav-documentation" data-title="Documentation_bottom_right" href="documentation.html" hreflang="html" target="_self"> <span> Documentation </span> <span> </span> </a>' +
        '<a class="nav-components" data-title="Components_bottom_right" href="components.html" hreflang="html" target="_self"> <span> Components </span> <span> &#9728; </span> </a>' +
        '<a class="nav-class-sets" data-title="Class Sets_bottom_right" href="class-sets.html" hreflang="html" target="_self"> <span> CSS </span> <span> { </span> </a>' +
        '<a class="nav-javascript" data-title="Javascript_bottom_right" href="js.html" hreflang="html" target="_self"> <span> Javascript </span> <span> ( </span> </a>' +
        '<a class="nav-themes" data-title="Themes_bottom_right" href="themes.html" hreflang="html" target="_self"> <span> Themes </span> <span> &#9732; </span> </a>'
    )

    // Display active and inactive Navigation Items
    for (i = 0; i < get.html("#nav > a").length; i++)
        if (get.attr(get.html("#nav > a", i), "href").indexOf(file.name) >= 0)
            attr(get.html("#nav > a", i), "psd-hide")

    // Navigation Display Toggle Function
    addEvent(get.html("#nav > div", 0), "click", toggleNavItemDisplay)
    addEvent(document.body, "keydown", toggleNavItemDisplayFunction)

    // Display all navigation items
    function toggleNavItemDisplay() {
        if (!bin) {
            get.html("#nav", 0).setAttribute("data-show", "")
          
            for (i = 0; i < get.html('#nav > [class*="nav-"]').length; i++) {
                get.html('#nav > [class*="nav-"]')[i].style.borderRightWidth = "5px"
                get.html('#nav > [class*="nav-"]')[i].style.left = "0"
            }
        } else {
            get.html("#nav", 0).removeAttribute("data-show")
            
            for (i = 0; i < get.html('#nav > [class*="nav-"]').length; i++)
                get.html('#nav > [class*="nav-"]')[i].removeAttribute("style")
        }

        bin = !bin
    }

    // Display all navigation items on keyboard input
    function toggleNavItemDisplayFunction() {
        // Shift Key
        if (window.event.which == 16)
            toggleNavItemDisplay()
    }

    // Display all navigation items on time intervals
    setInterval(function() {
        var typing = typing || false
        if (!typing) {
            var itemDisplayInterval = setInterval(function () {
                get.html("#nav", 0).setAttribute("data-show", "")

                if (itemIndex == get.html('#nav > [class*="nav-"]').length)
                    itemIndex = 0

                get.html('#nav > [class*="nav-"]')[itemIndex].style.borderRightWidth = "5px"
                get.html('#nav > [class*="nav-"]')[itemIndex].style.left = "0"

                if (get.html('#nav > [class*="nav-"]')[itemIndex - 1] != undefined)
                    get.html('#nav > [class*="nav-"]')[itemIndex - 1].removeAttribute("style")
                else
                    get.html('#nav > [class*="nav-"]')[get.html('#nav > [class*="nav-"]').length - 1].removeAttribute("style")

                if (itemIndex != get.html('#nav > [class*="nav-"]').length)
                    itemIndex++
            }, 1000)

            setTimeout(function() {
                clearInterval(itemDisplayInterval)
                
                get.html("#nav", 0).removeAttribute("data-show")
                
                for (i = 0; i < get.html('#nav > [class*="nav-"]').length; i++)
                    get.html('#nav > [class*="nav-"]', i).removeAttribute("style")

                get.html('#nav > [class*="nav-"]', get.html('#nav > [class*="nav-"]').length - 1).removeAttribute("style")
            }, 7500)
        }
    }, 60000)

    // Navigation Items
        // Hide the current page's navigation item reference
        for (i = 0; i < get.html("#nav a").length; i++)
            if (
                // If <title> inner HTML
                (
                    get.html("title", 0).innerText.toLowerCase().indexOf(
                        get.html("#nav a", i).innerText.toLowerCase()) >=
                0) ||
                // or document URL pathway
                (
                    location.href.slice(
                        location.href.lastIndexOf("/") + 1,
                        location.href.lastIndexOf(".")
                    ).toLowerCase().indexOf(
                        get.html("#nav a", i).innerText.toLowerCase()) >=
                0)
                // has a navigation item's text content within their text content
                // hide the navigation item
            )
                attr(get.html("#nav a", i), "psd-hide")

    // Navigation Width
        // Expand the width
        get.html("#nav", 0).onmouseenter = function() {
            for (i = 0; i < get.html('#nav > [class*="nav-"]').length; i++)
                if (get.css("left", get.html('#nav > [class*="nav-"]'), i) != "0px")
                    var show = false

            if (!show)
                this.setAttribute("data-show", "")
        }

        // Reset the width
        get.html("#nav", 0).onmouseleave = function() {
            for (i = 0; i < get.html('#nav > [class*="nav-"]').length; i++)
                    get.html('#nav > [class*="nav-"]')[i].removeAttribute("style")
                
            for (i = 0; i < get.html('#nav > [class*="nav-"]').length; i++)
                if (get.css("left", get.html('#nav > [class*="nav-"]'), i) == "0px")
                    var show = true

            if (show)
                this.removeAttribute("data-show")
        }

/* Notifications JS */
var notify = get.html("#notify", 0)
    // Notification Message
    notify.innerHTML = " Lapys JS is now up and running! "

    // Implement the notification bar's components via javascript
    notify.insertAdjacentHTML('afterend', 
        // Notification Clip
        '<div id="notify-ribbon"> &#9776; </div>' +

        // Notification Levels
        '<div id="notify-level">' +
            /* Level and Type of Message
                --- FORMAT ---
                    <a class="level-<<name>>" data-title="<<comment>>_bottom_left" href="updates.html" hreflang="html" style="margin-right: <<+35>>px">
                --- NOTE ---
                    The class "o-1" is applied for the level of message being relayed.
                    The class "p-e-n" is applied for the level of message not being relayed.
            */
            '<a class="level-info p-e-n" data-title="Yo, check this out_left_top" href="updates.html" hreflang="html" style="margin-right: 0"> </a>' +
            '<a class="level-valid o-1" data-title="Awesome updates available!_left_top" href="updates.html" hreflang="html" style="margin-right: 35px"> </a>' +
            '<a class="level-warn p-e-n" data-title="You might wanna see this&hellip;_left_top" href="updates.html" hreflang="html" style="margin-right: 70px"> </a>' +
        '</div>'
    )

    // Add the events
    addEvent(notify, "dblclick", toggleNotification)
    addEvent(get.html("#notify-ribbon", 0), "click", toggleNotification)
    
    // Display the notification bar
    function toggleNotification() {
        if (!bin) {
            notify.style.top = "0"
            get.html("#notify-ribbon", 0).style.top = "-35px"
        } else {
            notify.style.top = "-40px"
            get.html("#notify-ribbon", 0).style.top = "0"
        }
        
        bin = !bin
    }