/* Icon JS */
    // Icons
        // Index all ".icon" class elements
        for (i = 0; i < get.html('.icon').length; i++) {
            // Identify each icon
            attr(get.html('.icon', i), "data-index", i)

            // Append a <div> showing the class value of the icon within
            get.html('.icon', i).insertAdjacentHTML(
                'beforeend',
                '<div> .' + get.attr(get.html('.icon *:first-child[class*="icn"]', i), 'class') + ' </div>'
            )

            // Place a <textarea> element containing their class values to be copied
            get.html('.icon', i).insertAdjacentHTML(
                'afterend',
                '<textarea class="icon-class-value" data-index="' + i + '"><span class="' + get.attr(get.html('.icon *:first-child[class*="icn"]', i), 'class') + '"> </span></textarea>'
            )

            // Add the event
            addEvent(get.html(".icon", i), "click", copyClass)

            // Copy the class value
            function copyClass() {
                // Select the <textarea> containing the class value
                get.html('.icon-class-value[data-index="' + get.attr(this, 'data-index') + '"]', 0).select()

                // Copy the content
                document.execCommand('copy')

                // Un-select the <textarea> containing the class value
                get.html('.icon-class-value[data-index="' + get.attr(this, 'data-index') + '"]', 0).blur()
            }
        }

    // Icon Search
        // Show focus range on the field and the frame
        get.html(".icon-search", 0).onblur = function() {
            get.html(".icon-frame", 0).style.outline = "0"
        }
        get.html(".icon-search", 0).onfocus = function() {
            get.html(".icon-frame", 0).style.outline = "1px solid #0023FF"
        }

        // Contain the icon frame on input
        get.html(".icon-search", 0).oninput = function() {
            get.html(".icon-frame", 0).scrollTop = iconFrameScrollTop

            get.html(".icon-frame", 0).style.height = iconFrameCSSHeight
        }

        // Index for icons every half second
        setInterval(function() {
            // If the field has a value
            if (get.html('.icon-search', 0).value != '')
                // Index all icon class values
                for (i = 0; i < get.html('.icon *:last-child:not([class*="icn"])').length; i++)
                    // If there's no match between the class values and the field's value, hide the icon
                    if (get.html('.icon *:last-child:not([class*="icn"])', i).innerText.toLowerCase().replace(/ /g, "").indexOf(get.html('.icon-search', 0).value.toLowerCase().replace(/ /g, "")) <=
                        -1)
                        get.html('.icon *:last-child:not([class*="icn"])', i).parentNode.style.display = 'none'
                    // If there's a match between the class values and the field's value, show the icon
                    else
                        get.html('.icon *:last-child:not([class*="icn"])', i).parentNode.style.display = 'inline-block'
            // If the field does not have a value, show all icons
            else
                for (i = 0; i < get.html('.icon *:last-child:not([class*="icn"])').length; i++)
                    get.html('.icon *:last-child:not([class*="icn"])', i).parentNode.style.display = 'inline-block'
        }, 500)

    // Icon Frame Button
        // Store the button's position on the page
        var iconFrameExpandOffsetLeft = get.html(".icon-frame-expand", 0).offsetLeft + "px",
            iconFrameExpandOffsetTop = get.html(".icon-frame-expand", 0).offsetTop + "px"

        // Store the icon frame's height
        var iconFrameCSSHeight = get.css("height", get.html(".icon-frame", 0))

        // Get the icon frame's vertical scroll position
        var iconFrameScrollTop = get.html(".icon-frame", 0).scrollTop

        // Open or close the icon frame
        get.html(".icon-frame-expand", 0).onclick = function() {
            // Open the frame
            if (!bin) {
                // Update the icon frame's vertical scroll position
                iconFrameScrollTop = get.html(".icon-frame", 0).scrollTop

                get.html(".icon-frame", 0).style.height = get.html(".icon-frame", 0).scrollHeight + "px"
            }
            // Contain the frame
            else {
                get.html(".icon-frame", 0).scrollTop = iconFrameScrollTop

                get.html(".icon-frame", 0).style.height = iconFrameCSSHeight
            }

            bin = !bin
        }

        // Position the button
        setInterval(function() {
            if (window.scrollY >= get.html(".icon-frame", 0).offsetTop &&
                window.scrollY <= (get.html(".icon-frame", 0).offsetTop + get.html(".icon-frame", 0).clientHeight) &&
                get.html(".icon-frame", 0).clientHeight >= 340) {
                get.html(".icon-frame-expand", 0).style.left = iconFrameExpandOffsetLeft
                get.html(".icon-frame-expand", 0).style.position = "fixed"
                get.html(".icon-frame-expand", 0).style.top = iconFrameExpandOffsetTop
            } else 
                get.html(".icon-frame-expand", 0).style.position = "static"
        }, 1)

/* Example JS */
    // Index all "code" class elements
    for (i = 0; i < get.html('.code').length; i++) {
        /* --- NOTE ---
                Insert a <div> with a class of "code-editor"
                and
                an index before the code preview
        */
        get.html('.code', i).insertAdjacentHTML(
            'afterbegin',
            '<div class="code-editor" data-index="' + i + '"> ' +
                parseString(get.html(".code", i).innerHTML).replace("\n", "") +
            ' </div>'
        )
        
        /* --- NOTE --- 
                Insert buttons to alternate & interact with code
                before the <div> with a class of "code-editor"
        */
        get.html('.code-editor', i).insertAdjacentHTML(
            'beforebegin',
            // Copy Code Button
            '<button class="code-button code-copy-button" data-index="' + i + '"> Copy Code </button>' +
            // Toggle Code Button
            '<button class="code-button code-toggle-button" data-index="' + i + '"> Toggle Code </button>'
        )
        
        /* --- NOTE ---
                Give the code preview a class of "code-preview"
                and
                an index
        */
            // class
            attr(
                get.html('.code > div:last-of-type', i), "class",
                "code-preview"
            )
            // data-index
            attr(get.html('.code > div:last-of-type', i), "data-index", i)

        /* --- NOTE ---
                Insert a <textarea> with a class of "code-content"
                and
                an index after the code preview
        */
        get.html(".code", i).insertAdjacentHTML(
            'beforeend',
            '<textarea class="code-content" data-index="' + i + '">' +
                parseString(get.html('.code', i).innerHTML) +
            '</textarea>'
        )
    }

    // Code Buttons
        // Copy
        for (i = 0; i < get.html('.code-copy-button').length; i++)
            // Add the event
            get.html('.code-copy-button', i).onclick = function() {
                // Copy the preview code within the <textarea>
                get.html('.code-content[data-index="' + get.attr(this, "data-index") + '"]', 0).select()

                document.execCommand("copy")

                get.html('.code-content[data-index="' + get.attr(this, "data-index") + '"]', 0).blur()
            }

        // Toggle
        for (i = 0; i < get.html('.code-toggle-button').length; i++)
            // Add the event
            get.html('.code-toggle-button', i).onclick = function() {
                if (!bin) {
                    // Show the code editor
                    get.html('.code-editor[data-index="' + get.attr(this, "data-index") + '"]', 0).style.height = get.html('.code-editor[data-index="' + get.attr(this, "data-index") + '"]', 0).scrollHeight + "px"
                    get.html('.code-editor[data-index="' + get.attr(this, "data-index") + '"]', 0).style.padding = "10px"
                } else {
                    get.html('.code-editor[data-index="' + get.attr(this, "data-index") + '"]', 0).style.height = "0"
                    get.html('.code-editor[data-index="' + get.attr(this, "data-index") + '"]', 0).style.padding = "0 10px"
                }

                bin = !bin
            }

    // Editor
        // Allocate proper syntax coloring for each code editor
        for (i = 0; i < get.html(".code-editor").length; i++)
            // HTML
            if (get.class(get.html(".code-preview", i).parentNode).value.indexOf("html") >= 0)
                codifyHTML(get.html(".code-editor", i))

/* Aside JS */
    // Index all "header" class elements
    for (i = 0; i < get.html('#main > .section > .header').length; i++) {
        // Create a unique ID for all elements
        attr(
            get.html("#main > .section > .header", i), "id",
            get.html("#main > .section > .header", i).textContent.replace(/ /g, "").replace(/[(]/, "").replace(/[)]/, "").replace(/[&]/g, "").toLowerCase()
        )

        // Set a border-bottom for all elements
        attr(get.html("#main > .section > .header", i), "hr")

        // Create a list item for every ".header" class found within the "#main-nav" element
        get.html('#main-nav', 0).insertAdjacentHTML(
            'beforeend',
            '<li data-title="' + get.html('#main > .section > .header', i).innerHTML + '" id="' + get.attr(get.html('#main > .section > .header', i), "id") + '"> ' +
                '<a href="#' + get.attr(get.html('#main > .section > .header', i), 'id') + '" hreflang="html" target="_self">' +
                    get.html('#main > .section > .header', i).textContent +
                '</a>' +
            ' </li>'
        )
    }

    /* --- NOTE ---
            When the vertical scroll of the document lands on a section
            highlight its referenced navigation list item.
    */
    setInterval(function() {
        for (i = 0; i < get.html("#main > .section > .header").length; i++)
            if (window.scrollY > (get.html("#main > .section > .header", i).parentNode.offsetTop) &&
                window.scrollY < (get.html("#main > .section > .header", i).parentNode.offsetTop + get.html("#main > .section > .header", i).parentNode.clientHeight))
                attr(
                    get.html("#doc-nav li#" + get.attr(get.html("#main > .section > .header", i), "id"), 0),
                    "psd-hover"
                )
            else
                del.attr(
                    get.html("#doc-nav li#" + get.attr(get.html("#main > .section > .header", i), "id"), 0),
                    "psd-hover"
                )
    }, 1000)

    // Order each list lexicographically (alphabetically)
    var characters = [
        "?", ">", "<", "/", ".", ",", "'", '"', ":", ";", "}", "{", "]", "[", "|", "\\", "+", "_", ")", "(", "*", "&", "^", "%", "$", "#", "@", "!", "~", "=", "-",
        "0", "9", "8", "7", "6", "5", "4", "3", "2", "1",
         "`",
        "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A",
        "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"
    ]
        // Index all characters
        for (i = 0; i < characters.length; i++)
            // Index all list items
            for (j = 0; j < get.html('#main-nav li').length; j++)
                // If the character and the first character of the list at set index match
                if (get.html('#main-nav li', j).textContent.replace(" ", "").toString()[1] == characters[i])
                    get.html('#main-nav li', j).parentNode.insertBefore(get.html('#main-nav li', j), get.html('#main-nav li', 0))

    // Cover all list items within a unordered list element
    get.html('#main-nav', 0).innerHTML = (
        '<ul class="l-s-none" id="doc-nav"> ' +
            get.html('#main-nav', 0).innerHTML +
        ' </ul>'
    )

    /* Style the unordered list based on scroll position
            --- NOTE ---
                Run this continuously in-case
                of changes made to the document styling
                (such as resizing).
    */
    setInterval(function() {
        get.html('#doc-nav', 0).style.maxHeight = device.availHeight - (device.availHeight  * (25 / 100)) + "px"
        get.html('#doc-nav', 0).style.right = (get.html('#main-nav', 0).clientWidth * (5 / 100)) + "px"
        get.html('#doc-nav', 0).style.width = (get.html('#main-nav', 0).clientWidth - (get.html('#main-nav', 0).clientWidth * (10 / 100))) + "px"

        if (window.scrollY >= (get.html("#intro", 0).clientHeight || 300)) {
            get.html('#doc-nav', 0).style.padding = "10px 0"
            get.html('#doc-nav', 0).style.position = "fixed"
            get.html('#doc-nav', 0).style.top = "50px"
        } else {
            get.html('#doc-nav', 0).style.padding = "10px 5%"
            get.html('#doc-nav', 0).style.position = "relative"
            get.html('#doc-nav', 0).style.top = "0"
        }
    }, 1)

/* Navigation JS */
    // Alternate the hyperlink destination path for the HTML document
        attr(get.html("#nav > .nav-home", 0), "href", "../index.html")
        attr(get.html("#nav > .nav-download", 0), "href", "download.html")
        del.attr(get.html("#nav > .nav-documentation", 0), "href")
        attr(get.html("#nav > .nav-components", 0), "href", "components.html")
        attr(get.html("#nav > .nav-class-sets", 0), "href", "class-sets.html")
        attr(get.html("#nav > .nav-javascript", 0), "href", "js.html")
        attr(get.html("#nav > .nav-themes", 0), "href", "themes.html")
    
    // Close the navigation
    toggleNavItemDisplay()
    toggleNavItemDisplay()