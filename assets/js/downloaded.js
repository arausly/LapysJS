/* Navigation JS */
    // Alternate the hyperlink destination path for the HTML document
        attr(get.html("#nav > .nav-home", 0), "href", "../index.html")
        attr(get.html("#nav > .nav-download", 0), "href", "download.html")
        attr(get.html("#nav > .nav-documentation", 0), "href", "documentation.html")
        attr(get.html("#nav > .nav-components", 0), "href", "components.html")
        attr(get.html("#nav > .nav-class-sets", 0), "href", "class-sets.html")
        attr(get.html("#nav > .nav-javascript", 0), "href", "js.html")
        attr(get.html("#nav > .nav-themes", 0), "href", "themes.html")

    // Close the navigation
    toggleNavItemDisplay()
    toggleNavItemDisplay()