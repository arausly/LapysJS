/* Navigation */
    // Header Navigation Panel
        // Children
            if (get.html("#nav", 0)) {
                // Specification
                nav.home.href = "../index.html"
                nav.download.href = "download.html"
                nav.css.href = "css.html"
                nav.javascript.href = "javascript.html"
                nav.components.href = "components.html"
                nav.documentation.href = ""
                nav.themes.href = "themes.html"
            }

    // Footer
        // Children
            // Extra Options
                // Updates
                setTimeout(function() {
                    extra.updates.href = "../pages/updates.html"
                })            