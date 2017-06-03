/* Syntax */
    /* HTML Elements */
        // <body>
        var body = document.body

        // <head>
        var head = document.head
        
        // <html>
        var html = document.html
        
        // <main>
        var main = get.html("main")

/* Modification */
    // <html>
    html.dir = "ltr"
    html.translate = true
    html.version = (function() {
        if (HTMLDoctype == "<!DOCTYPE html>")
            return 5
    })()

    // <main>
    setTimeout(function() {
        main.insertAdjacentHTML("beforebegin", "<!-- Main Content -->")
    }, 100)

/* Navigation */
    // Header Navigation Panel
        // Initialization
        var nav = create("header")

        /* Insertion
                --- NOTE ---
                    Insert the Header before the first child of the <body> element.
                    It will act as the navigation for the platform.
        */
        insertBefore(
            nav,
            (function() {
                // Index all children elements of <body>.
                for (i = 0; i < body.children.length; i++)
                    // If the child does not have an ID of "header".
                    if (
                        body.children[i].id != "header" &&
                        body.children[i].id != "nav" &&
                        body.children[i].id != "tooltip" &&
                        body.children[i].localName.indexOf("script") <= -1
                    ) {
                        return body.children[i]

                        /* End
                                --- NOTE ---
                                     Stop the loop.
                        */
                        i = body.children.length
                    }
            })()
        )

        // Modification
        nav.className = (
            "cmpnt cmpnt-grp " +
            "col-grp " +
            "bdr-rd-0 " +
            "m-auto " +
            "w-100"
        )
        nav.id = "nav"
        nav.insertAdjacentHTML("beforebegin", "<!-- Header Navigation Panel -->")

        // Children
        if (get.html("#nav")) {
            // Initialization
            nav.innerHTML = (
                // Home
                '<a id="home"> Home </a>' + 
                // Download
                '<a id="download"> Download </a>' + 
                // CSS
                '<a id="css"> CSS </a>' + 
                // Javascript
                '<a id="javascript"></a>' + 
                // Components
                '<a id="components"></a>' + 
                // Documentation
                '<a id="documentation"></a>' + 
                // Themes
                '<a id="themes"> Themes </a>'
            )

            // Modification
            for (i = 0; i < nav.children.length; i++) {
                nav.children[i].className = "grid-14 nav-item"
                nav.children[i].hreflang = "html"
                nav.children[i].target = "_self"
            }

            // Styling
            css.style(
                "customStyle",

                ".grid-14",
                
                "flex-basis: 6.67% !important; " +
                "width: 6.67% !important"
            )

            // Fix and un-fix the Navigation
            var navTop = nav.offsetTop

            body.onresize = function() {
                del.inlineStyle(nav, "position")

                navTop = nav.offsetTop

                nav.style.position = "fixed"
            }

            setInterval(function() {
                // Fix
                if (window.scrollY >= navTop) {
                    body.style.paddingTop = nav.clientHeight + "px"

                    nav.style.position = "fixed"
                }

                // Un-fix
                else {
                    del.inlineStyle(body, "padding-top")

                    del.inlineStyle(nav, "position")
                }
            }, 1)

            // Definition
            nav.home = get.html("#nav #home")
            nav.download = get.html("#nav #download")
            nav.css = get.html("#nav #css")
            nav.javascript = get.html("#nav #javascript")
            nav.components = get.html("#nav #components")
            nav.documentation = get.html("#nav #documentation")
            nav.themes = get.html("#nav #themes")
        }

    // Footer
        // Initialization
        var footer = create("footer")

        /* Insertion
                --- NOTE --
                    Insert the Footer after the last child of the <body> element.
                    It will act as the footer for the platform.
        */
        insertAfter(
            footer,
            (function() {
                // Index all children elements of <body>.
                for (i = body.children.length - 1; i >= 0; i--)
                    // If the child does not have an ID of "header".
                    if (
                        body.children[i].id != "header" &&
                        body.children[i].id != "nav" &&
                        body.children[i].id != "tooltip" &&
                        body.children[i].localName.indexOf("script") <= -1
                    ) {
                        return body.children[i]

                        /* End
                                --- NOTE ---
                                     Stop the loop.
                        */
                        i = 0
                    }
            })()
        )

        // Modification
        footer.className = (
            "col-grp " +
            "fnt-sz-ss " +
            "m-auto "
        )
        footer.id = "footer"
        footer.insertAdjacentHTML("beforebegin", "<!-- Footer -->")
        footer.style = "width: 101%"

        // Children
        footer.innerHTML = (
            // Extra Options
            '<div id="extraOptions"> </div>' +

            // Sponsors
            '<div id="sponsors"> </div>' +

            // Papers
            '<div id="papers"> </div>'
        )

            // Modification
            for (i = 0; i < footer.children.length; i++)
                footer.children[i].className = "col-1 footer-section"

            // Definition
                // Extra Options
                var extra = get.html("#footer #extraOptions")

                // Sponsors
                var sponsors = get.html("#footer #sponsors")

                // Papers
                var papers = get.html("#footer #papers")

            // Children
            setTimeout(function() {
                // Extra Options
                    // Children
                    extra.innerHTML = (
                        // Documentation
                        '<a href="' + nav.documentation.href + '" hreflang="html" target="_self"> Documentation </a>' +

                        // Themes
                        '<a href="' + nav.themes.href + '" hreflang="html" target="_self"> Themes </a>' +

                        // Updates
                        '<a data-updatesLink hreflang="html" target="_self"> Updates </a>'
                    )

                    // Definition
                    extra.updates = get.html("#footer #extraOptions a[data-updatesLink]")

                // Sponsors
                    // Modification
                    sponsors.className = sponsors.className.replace("col-1", "col-2")

                    // Children
                    sponsors.innerHTML = (
                        // Git
                        '<a href="' + 'https://github.com/LapysNights/LapysJS' + '" target="_blank"> GitHub </a>'
                    )

                // Papers
                    // Children
                    papers.innerHTML = (
                        // Terms
                        '<a hreflang="html" target="_blank"> Terms </a> ' +

                        // Policy
                        '<a hreflang="html" target="_blank"> Policy </a>'
                    )
            })