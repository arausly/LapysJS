/* Navigation JS */
    // Alternate the hyperlink destination path for the HTML document
        get.html("#nav > .nav-home", 0).setAttribute("href", "../index.html")
        get.html("#nav > .nav-download", 0).setAttribute("href", "download.html")
        get.html("#nav > .nav-documentation", 0).setAttribute("href", "documentation.html")
        get.html("#nav > .nav-components", 0).setAttribute("href", "components.html")
        get.html("#nav > .nav-class-sets", 0).setAttribute("href", "class-sets.html")
        get.html("#nav > .nav-javascript", 0).setAttribute("href", "js.html")
        get.html("#nav > .nav-themes", 0).setAttribute("href", "themes.html")
    // Close the navigation
    toggleNavItemDisplay(); toggleNavItemDisplay()

/* Notification JS */
    get.html("#title", 0).innerHTML = get.html("#notify", 0).innerHTML

    for (i = 0; i < get.html('#notify + * + #notify-level > [class*="level-"]').length; i++)
        if (get.css("opacity", get.html('#notify + * + #notify-level > [class*="level-"]'), i) == 1)
            // get.html("#messageSection", 0).style.background = 
            var backgroundColor = get.css("background-color", get.html('#notify + * + #notify-level > [class*="level-"]'), i)
                get.html("#messageSection", 0).style.background = "linear-gradient(270deg, rgba" + backgroundColor.slice(0, backgroundColor.lastIndexOf(",")).replace(".", "").replace("rgba", "").replace("rgb", "") + ", 1), " + backgroundColor + ")"