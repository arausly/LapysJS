/* Navigation */
    // Header Navigation Panel
        // Children
            if (get.html("#nav", 0)) {
                // Specification
                nav.home.href = "../index.html"
                nav.download.href = "download.html"
                nav.css.href = "css.html"
                nav.javascript.href = ""
                nav.components.href = "components.html"
                nav.documentation.href = "documentation.html"
                nav.themes.href = "themes.html"
            }

    // Footer
        // Children
            // Extra Options
                // Updates
                setTimeout(function() {
                    extra.updates.href = "../pages/updates.html"
                })            