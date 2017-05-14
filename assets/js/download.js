/* Download JS */
    // Alternate the tooltip message when a section is hovered
    get.html("#customDownload", 0).onmouseover = function() {
        get.html("#screentip", 0).innerHTML = " Choose the specifics of Lapys JS you want "
    }
    get.html("#defaultDownload", 0).onmouseover = function() {
        get.html("#screentip", 0).innerHTML = " Get the hard, raw code for Lapys JS. "
    }

/* Navigation JS */
    // Alternate the hyperlink destination path for the HTML document
        attr(get.html("#nav > .nav-home", 0), "href", "../index.html")
        attr(get.html("#nav > .nav-download", 0), "href", "#")
        attr(get.html("#nav > .nav-documentation", 0), "href", "documentation.html")
        attr(get.html("#nav > .nav-components", 0), "href", "components.html")
        attr(get.html("#nav > .nav-class-sets", 0), "href", "class-sets.html")
        attr(get.html("#nav > .nav-javascript", 0), "href", "js.html")
        attr(get.html("#nav > .nav-themes", 0), "href", "themes.html")

    // Go to the Downloaded page after downloading the framework
        get.html("#defaultDownload", 0).onclick = function() {
            goTo("downloaded.html")
        }
    
    // Close the navigation
    toggleNavItemDisplay()
    toggleNavItemDisplay()