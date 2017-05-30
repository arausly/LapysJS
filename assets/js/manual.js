/* HTML Elements */
for (i = 0; i < get.html("*").length; i++)
    if (get.css("user-select", get.html("*", i)) == "none")
        set.attr(get.html("*", i), "unselectable", "on")

/* Linking */
    // Quick Links
        // Initialization
        var aside = create("aside")

        // Definition
        var article = get.html("#content")

        /* Insertion
                --- NOTE ---
                    Insert the aside content as the quick access
                    navigation for the page.
        */
        main.appendChild(aside)

        // Modification
            // Main Content
            set.class(main, "col-grp")

            // Article
            if (article)
                set.class(article, "col-7 grid-2")

            // Quick Links
            aside.className = "col-3 grid-9"
            aside.id = "navLinks"
            aside.insertAdjacentHTML("beforebegin", "<!-- Quick Links -->")

        // Children
        if (get.html("#content")) {
            // Initialization
                // Header and List
                aside.innerHTML = (
                    '<!-- Header -->' +
                    '<h2 id="navLinksHeader"> Navigation </h2>' +

                    '<!-- Navigation -->' +
                    '<ul class="l-s-none" id="navLinksList">' +
                        '<!-- List Items -->' +
                    '</ul>'
                )

                // Positioning
                setInterval(function() {
                    if (
                        (get.html("#nav").getBoundingClientRect().top + get.html("#nav").clientHeight) >
                        get.html("#navLinksHeader").getBoundingClientRect().top
                    ) {
                        get.html("#navLinksList").style.position = "fixed"
                        get.html("#navLinksList").style.top = "45px"
                    }

                    else {
                        get.html("#navLinksList").style.position = "static"
                        del.inlineStyle(get.html("#navLinksList"), "top")
                    }
                }, 1)

                // List Items
                    // Index all headers within the Article
                    for (i = 0; i < get.html('#content [data-header]', '_array').length; i++) {
                        // Modification
                        get.html('#content [data-header]', i).id = (
                            deleteSpecialCharacters(
                                get.html('#content [data-header]', i).innerText.toLowerCase()
                            ) +
                            deleteSpecialCharacters(
                                parseString(Math.random() * 10)
                            )
                        )

                        // Insertion
                        get.html('#navLinks ul').innerHTML += (
                            '<li>' +
                                '<a ' +
                                    'class="link"' +
                                    'data-index="' + i + '"' +
                                    'href="#' + get.html('#content [data-header]', i).id + '" ' +
                                    'hreflang="html" ' +
                                    'target="_self"' +
                                '> ' +
                                    get.html('#content [data-header]', i).innerText +
                                ' </a>' +
                            ' </li>'
                        )

                        // If the Header indexed exists
                        if (get.html('#content [data-header]', (i + 1))) {
                            // Index all SubHeader within the Article
                            for (j = 0; j < get.html('#content [data-subheader]', '_array').length; j++) {
                                // Insertion
                                if (
                                    get.html('#content [data-subheader]', j).nodeIndex > get.html('#content [data-header]', i).nodeIndex &&
                                    get.html('#content [data-subheader]', j).nodeIndex < get.html('#content [data-header]', (i + 1)).nodeIndex
                                ) {
                                    // Place the SubHeader within an item in the Header list
                                    for (k = 0; k < get.html('#navLinks ul li', '_array').length; k++) {
                                        // Modification
                                        get.html('#content [data-subheader]', j).id = (
                                            deleteSpecialCharacters(
                                                get.html('#content [data-subheader]', j).innerText.toLowerCase()
                                            ) +
                                            deleteSpecialCharacters(
                                                parseString(Math.random() * 10)
                                            )
                                        )

                                        // Insertion
                                        get.html('#navLinks ul li', k).innerHTML += (
                                            '<a ' +
                                                'class="sub-link"' +
                                                'data-index="' + i + '"' +
                                                'href="#' + get.html('#content [data-subheader]', j).id + '" ' +
                                                'hreflang="html" ' +
                                                'target="_self"' +
                                            '> ' +
                                                '<small> ' +
                                                    get.html('#content [data-subheader]', j).innerText +
                                                ' </small>' +
                                            ' </a>'
                                        )
                                    }
                                }
                            }
                        }
                    }
        }

        // Display & Focus
            for (i = 0; i < get.html("#navLinks ul li .link", "_array").length; i++) {
                // Add the events
                set.event(
                    get.html("#navLinks ul li .link", i),
                    "blur",
                    hideSubLinks
                )

                set.event(
                    get.html("#navLinks ul li .link", i),
                    "focus",
                    showSubLinks
                )
            }

            for (i = 0; i < get.html("#navLinks ul li .sub-link", "_array").length; i++) {
                // Add the events
                set.event(
                    get.html("#navLinks ul li .sub-link", i),
                    "focus",
                    showLink
                )
            }

            // "Focus" on links when the SubLink is focused.
            function showLink() {
                for (i = 0; i < get.html("#navLinks ul li .link", "_array").length; i++)
                    if (get.attr(this, "data-index") == get.attr(get.html("#navLinks ul li .link", i), "data-index")) {
                        set.attr(get.html("#navLinks ul li .link", i), "psd-focus")

                        for (j = 0; j < get.html("#navLinks ul li .sub-link", "_array").length; j++) {
                            get.html("#navLinks ul li .sub-link", j).style.filter = "none"
                        }
                    }
            }

            // Hide SubLinks with the same index as the Link interacted.
            function hideSubLinks() {
                del.attr(this, "psd-focus")

                for (i = 0; i < get.html('#navLinks ul li .sub-link', '_array').length; i++) {
                    if (get.attr(this, "data-index") == get.attr(get.html('#navLinks ul li .sub-link', i), "data-index")) {
                        get.html('#navLinks ul li .sub-link', i).style.filter = "grayscale(1)"
                        get.html('#navLinks ul li .sub-link', i).style.height = 0
                        get.html('#navLinks ul li .sub-link', i).style.opacity = 0
                        del.inlineStyle(get.html('#navLinks ul li .sub-link', i), "outline")
                    }
                }
            }

            // Display SubLinks with the same index as the Link interacted.
            function showSubLinks() {
                set.attr(this, "psd-focus")

                for (j = 0; j < get.html('#navLinks ul li .sub-link', '_array').length; j++) {
                    if (get.attr(this, "data-index") == get.attr(get.html('#navLinks ul li .sub-link', j), "data-index")) {
                        get.html('#navLinks ul li .sub-link', j).style.filter = "none"
                        get.html('#navLinks ul li .sub-link', j).style.height = "initial"
                        get.html('#navLinks ul li .sub-link', j).style.opacity = 1
                        get.html('#navLinks ul li .sub-link', j).style.outline = 0
                    }
                }
            }

        // Organization
            // Definition
            var characters = [
                " ",
                "?", ">", "<", "/", ".", ",", "'", '"', ":", ";", "}", "{", "]", "[", "|", "\\", "+", "_", ")", "(", "*", "&", "^", "%", "$", "#", "@", "!", "~", "=", "-",
                "0", "9", "8", "7", "6", "5", "4", "3", "2", "1",
                 "`",
                "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A",
                "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"
            ]

            // Index all characters
            for (i = 0; i < characters.length; i++)
                // Index all list items
                for (j = 0; j < get.html("#navLinks ul li .link", "_array").length; j++) {
                    // Check if the character and the 1st character of the item match
                    if (get.html("#navLinks ul li .link", j).innerText.replace(" ", "").toString()[0] == characters[i])
                        insertBefore(
                            get.html("#navLinks ul li .link", j),
                            get.html("#navLinks ul li .link", 0)
                        )
                }

/* Code */
    // Initialization
    var code = get.html(".code", "_array"),
        codeButtonEditBin = false,
        codeButtonToggleBin = false

    // Children
    for (i = 0; i < code.length; i++) {
        // Code Buttons
        code[i].insertAdjacentHTML('beforebegin', '<div class="code-buttons"> </div>')
            
            // Insertion
            get.html('.code-buttons', i).innerHTML = (
                // Toggle
                '<button class="toggle-code" data-index="' + i + '" value="Toggle Code"> </button>' +

                // Edit
                '<button class="edit-code" data-index="' + i + '" value="Edit Code"> </button>' +

                // Copy
                '<button class="copy-code" data-index="' + i + '" value="Copy Code"> </button>'
            )

            // Children
                // Modification
                for (j = 0; j < get.html('[class*="-code"]', '_array').length; j++)
                    get.html('[class*="-code"]', j).innerHTML = ' ' + get.html('[class*="-code"]', j).value + ' '

                // Events
                    // Toggle
                    for (j = 0; j < get.html(".code-buttons .toggle-code", "_array").length; j++) {
                        get.html(".code-buttons .toggle-code", j).onclick = function() {
                            if (!bin) {
                                get.html(".code-editor", get.attr(this, "data-index")).style.display = "block"
                                get.html(".code-editor", get.attr(this, "data-index")).style.opacity = 1
                            } else {
                                get.html(".code-editor", get.attr(this, "data-index")).style.display = "none"
                                get.html(".code-editor", get.attr(this, "data-index")).style.opacity = 0
                            }

                            bin = !bin
                        }
                    }

                    // Edit
                    for (j = 0; j < get.html(".code-buttons .edit-code", "_array").length; j++) {
                        get.html(".code-buttons .edit-code", j).onclick = function() {
                            if (!bin) {
                                get.html(".code-content", get.attr(this, "data-index")).style.display = "block"
                                get.html(".code-content", get.attr(this, "data-index")).style.opacity = 1
                            } else {
                                get.html(".code-content", get.attr(this, "data-index")).style.display = "none"
                                get.html(".code-content", get.attr(this, "data-index")).style.opacity = 0
                            }

                            bin = !bin
                        }
                    }

                    // Copy
                    for (j = 0; j < get.html(".code-buttons .copy-code", "_array").length; j++)
                        get.html(".code-buttons .copy-code", j).onclick = function() {
                            get.html(".code-content", get.attr(this, "data-index")).select()

                            document.execCommand("copy")

                            get.html(".code-content", get.attr(this, "data-index")).blur()
                        }

        // Code Preview
        if (code[i].children[0]) {
            set.attr(
                code[i].children[0],
                "data-index",
                i
            )
            set.class(code[i].children[0], "code-preview")
        }

        // Code Editor
        code[i].insertAdjacentHTML('afterbegin', '<div class="code-editor" data-index="' + i + '"> </div>')

        // Code Content
        code[i].insertAdjacentHTML('beforeend', '<textarea class="code-content" data-index="' + i + '" rows="3" spellcheck="false"> </textarea>')
    }

    // Definition
    var codeEditor = get.html(".code-editor", "_array"),
        codePreview = get.html(".code-preview", "_array"),
        codeContent = get.html(".code-content", "_array")

        // Code Content
        for (i = 0; i < codeContent.length; i++) {
            // Add the events
            if (!codePreview[i].hasAttribute("no-edit"))
                codeContent[i].oninput = function() {
                    // Modification
                        // Code Preview
                        for (i = 0; i < codePreview.length; i++)
                            codePreview[i].innerHTML = this.value

                        // Code Editor
                        for (i = 0; i < codeEditor.length; i++)
                            codeEditor[i].innerHTML = codifyHTML(parseString(this.value).replace("\n", "").replace(/    /g, ""))

                        // Code Content
                        this.value = this.value
                }

                else
                    get.html('.code-buttons .edit-code[data-index="' + i + '"]').style.display = "none"

            // Copy Code Preview's HTML
            codeContent[i].value = codePreview[i].innerHTML.replace("\n", "").replace(/    /g, "")
        }

        // Code Preview
        for (i = 0; i < codePreview.length; i++)
            // Copy Code Preview's HTML
            if (!codePreview[i].hasAttribute("no-edit"))
                codePreview[i].innerHTML = codePreview[i].innerHTML

        // Code Editor
        for (i = 0; i < codeEditor.length; i++)
            // HTML Syntax
            if (codePreview[i].className.indexOf("html") >= 0) {
                // Copy Code Preview's Parsed HTML
                codeEditor[i].innerHTML = parseString(codePreview[i].innerHTML.replace("\n", "").replace(/    /g, ""))

                // Codify
                codeEditor[i].innerHTML = codifyHTML(codeEditor[i].innerHTML)
            }

/* Functions */
    // Code Editor
        // HTML
        function codifyHTML(string) {
            return (string
                // Quotes
                    // Replace all quotes
                    ).replace(/'/g, '"'
                
                // Attribute Content
                    // Replace all "'"
                    ).replace(/"/g, '"<_span>'
                    // Replace all "='"
                    ).replace(/="<_span>/g, '<span class="code-color-default">=<_span><span class="code-color-yellow">"'
                    // Replace all "'<_span>"
                    ).replace(/"<_span>/g, '"</span>'
                
                // Elements
                    // Replace all "<"
                    ).replace(/&lt;/g, '<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>'
                    // Replace all ">"
                    ).replace(/&gt;/g, '<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> '

                    // Comments
                        // Replace all "<"
                        ).replace(
                            /<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>!--/g,
                            '<span class="code-color-comment">&lt;!--'
                        // Replace all ">"
                        ).replace(
                            /--<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> /g,
                            '--&gt;</span>'

                    // Replace all "<!"
                    ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>!/g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;!</span>'
                    // Replace all "</"
                    ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>\//g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;/</span>'
                    // Replace all "<"
                    ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>/g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;</span>'
                    // Replace all ">"
                    ).replace(/<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> /g, '<span class="code-color-default">&gt;</span> </span> <span class="code-color-default"> '
                // Attribute Name
                    // Replace all "alt="
                    ).replace(/alt<span class="code-color-default">=/g, '<span class="code-color-green">alt</span><span class="code-color-default">='
                    // Replace all "class="
                    ).replace(/class<span class="code-color-default">=/g, '<span class="code-color-blue">class</span><span class="code-color-default">='
                    // Replace all "colspan="
                    ).replace(/colspan<span class="code-color-default">=/g, '<span class="code-color-green">colspan</span><span class="code-color-default">='
                    // Replace all "content="
                    ).replace(/content<span class="code-color-default">=/g, '<span class="code-color-green">content</span><span class="code-color-default">='
                    // Replace all "data-drpdwn="
                    ).replace(/data-drpdwn<span class="code-color-default">=/g, '<span class="code-color-green">data-drpdwn</span><span class="code-color-default">='
                    // Replace all "data-event="
                    ).replace(/data-event<span class="code-color-default">=/g, '<span class="code-color-green">data-event</span><span class="code-color-default">='
                    // Replace all "data-id="
                    ).replace(/data-id<span class="code-color-default">=/g, '<span class="code-color-green">data-id</span><span class="code-color-default">='
                    // Replace all "data-index="
                    ).replace(/data-index<span class="code-color-default">=/g, '<span class="code-color-green">data-index</span><span class="code-color-default">='
                    // Replace all "data-quantity="
                    ).replace(/data-quantity<span class="code-color-default">=/g, '<span class="code-color-green">data-quantity</span><span class="code-color-default">='
                    // Replace all "data-title="
                    ).replace(/data-title<span class="code-color-default">=/g, '<span class="code-color-green">data-title</span><span class="code-color-default">='
                    // Replace all "href="
                    ).replace(/href<span class="code-color-default">=/g, '<span class="code-color-green">href</span><span class="code-color-default">='
                    // Replace all "i="
                    ).replace(/i<span class="code-color-default">=/g, '<span class="code-color-orange">i</span><span class="code-color-default">='
                    // Replace all "id="
                    ).replace(/id<span class="code-color-default">=/g, '<span class="code-color-orange">id</span><span class="code-color-default">='
                    // Replace all "name="
                    ).replace(/name<span class="code-color-default">=/g, '<span class="code-color-green">name</span><span class="code-color-default">='
                    // Replace all "no-psd="
                    ).replace(/no-psd<span class="code-color-default">=/g, '<span class="code-color-green">no-psd</span><span class="code-color-default">='
                    // Replace all "placeholder="
                    ).replace(/placeholder<span class="code-color-default">=/g, '<span class="code-color-green">placeholder</span><span class="code-color-default">='
                    // Replace all "psd-disabled="
                    ).replace(/psd-disabled<span class="code-color-default">=/g, '<span class="code-color-green">psd-disabled</span><span class="code-color-default">='
                    // Replace all "psd-focus="
                    ).replace(/psd-focus<span class="code-color-default">=/g, '<span class="code-color-green">psd-focus</span><span class="code-color-default">='
                    // Replace all "small="
                    ).replace(/small<span class="code-color-default">=/g, '<span class="code-color-green">small</span><span class="code-color-default">='
                    // Replace all "target-densitydpi="
                    ).replace(/target-densitydpi<span class="code-color-default">=/g, '<span class="code-color-green">target-densitydpi</span><span class="code-color-default">='
                    // Replace all "type="
                    ).replace(/type<span class="code-color-default">=/g, '<span class="code-color-green">type</span><span class="code-color-default">='
                    // Replace all "src="
                    ).replace(/src<span class="code-color-default">=/g, '<span class="code-color-green">src</span><span class="code-color-default">='
                    // Replace all "style="
                    ).replace(/style<span class="code-color-default">=/g, '<span class="code-color-blue">style<_span><span class="code-color-default">='
                    // Replace all "value="
                    ).replace(/value<span class="code-color-default">=/g, '<span class="code-color-green">value</span><span class="code-color-default">='
                    // Replace all "1="
                    ).replace(/1<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">1</span><span class="code-color-default">='
                    // Replace all "2="
                    ).replace(/2<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">2</span><span class="code-color-default">='
                    // Replace all "3="
                    ).replace(/3<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">3</span><span class="code-color-default">='
                    // Replace all "4="
                    ).replace(/4<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">4</span><span class="code-color-default">='
                    // Replace all "5="
                    ).replace(/5<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">5</span><span class="code-color-default">='
                // Inline Styles
                    // Replace all "style='"
                    ).replace(
                        /<span class="code-color-blue">style<_span><span class="code-color-default">=<_span><span class="code-color-yellow">"/g,
                        '<span class="code-color-blue">style</span><span class="code-color-default">=</span><span class="code-color-yellow">"<span class="code-color-blue">'
                    // Replace all ":"
                    ).replace(/:/g, '<span class="code-color-default">:</span><span class="code-color-green">'
                    // Replace all "%;"
                    ).replace(/%;/g, '<span class="code-color-red">%</span>;'
                    // Replace all ";'"
                    ).replace(/;"/g, '</span><span class="code-color-default">;</span></span>"'
                    // Replace all "; "
                    ).replace(/; /g, '</span><span class="code-color-default">;</span> '
                // Empty Attributes
                    // Replace all "=''"
                    ).replace(/<span class="code-color-default">=<_span><span class="code-color-yellow">""/g, ''
                // Attribute Assignment Operator
                    // Replace all "="
                    ).replace(/<span class="code-color-default">=<_span>/g, '<span class="code-color-default">=</span>'
                // Numbers
                    // Replace all "0"
                    ).replace(/0/g, '<span class="code-number">0</span>'
                    // Replace all "1"
                    ).replace(/1/g, '<span class="code-number">1</span>'
                    // Replace all "2"
                    ).replace(/2/g, '<span class="code-number">2</span>'
                    // Replace all "3"
                    ).replace(/3/g, '<span class="code-number">3</span>'
                    // Replace all "4"
                    ).replace(/4/g, '<span class="code-number">4</span>'
                    // Replace all "5"
                    ).replace(/5/g, '<span class="code-number">5</span>'
                    // Replace all "6"
                    ).replace(/6/g, '<span class="code-number">6</span>'
                    // Replace all "7"
                    ).replace(/7/g, '<span class="code-number">7</span>'
                    // Replace all "8"
                    ).replace(/8/g, '<span class="code-number">8</span>'
                    // Replace all "9"
                    ).replace(/9/g, '<span class="code-number">9</span>'
                // Special Strings
                    // Replace all "deg"
                    ).replace(/deg/g, '<span class="code-string">deg</span>'
                    // Replace all "px"
                    ).replace(/px/g, '<span class="code-string">px</span>'
                    // Replace all "rgba"
                    ).replace(/rgba/g, '<span class="code-string">rgba</span>'
                // Special Characters
                    // Replace all ","
                    ).replace(/,/g, '<span class="code-color-default">,</span>'
                    // Replace all "."
                    ).replace(/[.]/g, '<span class="code-color-default">.</span>'
                )
        }

        // All Languages
        function codify(string) {
            // Code for the editor
            return (string).replace(
                // New Line
                /_n_/g, '\n'
                // Lesser Than
                ).replace(/_lt_/g, '&lt;'
                // Greater Than
                ).replace(/_gt_/g, '&gt;'
                // Double Quotes
                ).replace(/_q_/g, '"'
                // Tab Spacing
                ).replace(/_t_/g, '<span class="code-tab">    </span>'
            )
        }

    // Delete Special Characters
    function deleteSpecialCharacters(string) {
        return string.replace(
            /~/g, '').replace(
            /`/g, '').replace(
            /!/g, '').replace(
            /@/g, '').replace(
            /#/g, '').replace(
            /[$]/g, '').replace(
            /%/g, '').replace(
            /\^/g, '').replace(
            /&/g, '').replace(
            /[*]/g, '').replace(
            /[(]/g, '').replace(
            /[)]/g, '').replace(
            /-/g, '').replace(
            /[+]/g, '').replace(
            /_/g, '').replace(
            /=/g, '').replace(
            /\//g, '').replace(
            /[[]/g, '').replace(
            /]/g, '').replace(
            /{/g, '').replace(
            /}/g, '').replace(
            /[|]/g, '').replace(
            /\\/g, '').replace(
            /:/g, '').replace(
            /;/g, '').replace(
            /"/g, '').replace(
            /'/g, '').replace(
            /</g, '').replace(
            /,/g, '').replace(
            />/g, '').replace(
            /[?]/g, '').replace(
            /[.]/g, '').replace(
            /\n/g, '').replace(
            /\r/g, '').replace(
            /\t/g, '').replace(
            / /g, ''
        )
    }