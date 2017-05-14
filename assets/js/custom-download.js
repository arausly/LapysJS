/* Main Content JS */
    // Create an "all" selection option
    for (i = 0; i < get.html(".all").length; i++) {
        get.html(".all", i).onclick = function() {
            // Check and uncheck checkboxes via header checkboxes
            if (!bin) {
                for (i = 0; i < (get.html(this.parentNode.parentNode.tagName.toLowerCase() + '.accr.section#' + this.parentNode.parentNode.getAttribute("id") + ' > .accr-c input[type="checkbox"')).length; i++) {
                    if (!this.checked)
                        this.checked = true
                    
                    get.html(this.parentNode.parentNode.tagName.toLowerCase() + '.accr.section#' + this.parentNode.parentNode.getAttribute("id") + ' > .accr-c input[type="checkbox"', i).checked = true
                }
            } else {
                for (i = 0; i < (get.html(this.parentNode.parentNode.tagName.toLowerCase() + '.accr.section#' + this.parentNode.parentNode.getAttribute("id") + ' > .accr-c input[type="checkbox"')).length; i++) {
                    if (this.checked)
                        this.checked = false
                    
                    get.html(this.parentNode.parentNode.tagName.toLowerCase() + '.accr.section#' + this.parentNode.parentNode.getAttribute("id") + ' > .accr-c input[type="checkbox"', i).checked = false
                }
            }

            bin = !bin
        }
    }
    
    // Automate the checkboxes with labels
    for (i = 0; i < get.html("label").length; i++) {
        attr(get.html("label", i), "data-index", i)
        attr(get.html('input[type="checkbox"]:not(.all)', i), 'data-index', i)

        get.html("label", i).onclick = function() {
            get.html('input[type="checkbox"][data-index="' + get.attr(this, "data-index") + '"]', 0).checked = !(
                get.html('input[type="checkbox"][data-index="' + get.attr(this, "data-index") + '"]', 0).checked
            )
        }
    }

    // Tooltip JS
    for (i = 0; i < get.html("label").length; i++) {
        // Hide their custom tooltips
        get.html("label", i).dataset.title += " _hidden"

        // Show the tooltip
        addEvent(get.html("label", i), "mouseover", showTooltip)
        function showTooltip() {
            get.html("#screentip", 0).innerHTML = " " + this.getAttribute("data-title").slice(0, -7)
            get.html("#screentip", 0).style.opacity = ".825"
        }

        // Hide the tooltip
        addEvent(get.html("label", i), "mouseleave", hideTooltip)
        function hideTooltip() {
            get.html("#screentip", 0).style.opacity = "0"
        }
    }

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