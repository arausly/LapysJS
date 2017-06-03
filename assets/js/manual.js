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
                    // Index all list items
                    for (k = 0; k < get.html("#navLinks ul li .link", "_array").length; k++)
                        // Check if the character and the 1st character of the item match
                        if (get.html("#navLinks ul li .link", k).innerText.replace(" ", "").toString()[0] == characters[i])
                            insertBefore(
                            get.html("#navLinks ul li .link", k),
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
            // If "no-edit" is enabled
            if (!codePreview[i].hasAttribute("no-edit"))
                // Add the events
                codeContent[i].oninput = function() {
                    // Modification
                        // Code Preview
                        codePreview[get.attr(this, "data-index")].innerHTML = this.value

                        // Code Editor
                            // HTML Syntax
                            if (codePreview[get.attr(this, "data-index")].className.indexOf("html") >= 0)
                            codeEditor[get.attr(this, "data-index")].innerHTML = codifyHTML(parseString(this.value).replace(/    /g, ""))

                            // Javascript Syntax
                            else if (codePreview[get.attr(this, "data-index")].className.indexOf("javascript") >= 0)
                                codeEditor[get.attr(this, "data-index")].innerHTML = codifyJavascript(parseString(this.value).replace(/    /g, ""))

                        // Code Content
                        this.value = this.value
                }

            // else if "no-edit" is undefined
            else {
                // Hide the Code Content
                codeContent[i].style.left = "-1000px"
                codeContent[i].style.position = "fixed"
                
                // Hide the Edit Code Button
                get.html('.code-buttons .edit-code[data-index="' + i + '"]').style.display = "none"

                // If "show-toggle" is enabled
                if (codePreview[i].hasAttribute("show-edit")) {
                    codeContent[i].style.display = "block"
                    codeContent[i].style.opacity = 1
                }
            }

            // Copy Code Preview's HTML
            codeContent[i].value = codePreview[i].innerHTML.replace("\n", "").replace(/    /g, "")
        }

        // Code Preview
        for (i = 0; i < codePreview.length; i++) {
            codePreview[i].innerHTML = codePreview[i].innerHTML

            // If "no-copy" is enabled
            if (codePreview[i].hasAttribute("no-copy"))
                // Hide the Copy Code Button
                get.html('.code-buttons .copy-code[data-index="' + i + '"]').style.display = "none"

            // If "no-preview" is enabled
            if (codePreview[i].hasAttribute("no-preview"))
                // Hide the Code Preview
                codePreview[i].style.display = "none"
        }

        // Code Editor
        for (i = 0; i < codeEditor.length; i++) {
            // Copy Code Preview's Parsed HTML
            codeEditor[i].innerHTML = parseString(codePreview[i].innerHTML.replace("\n", "").replace(/    /g, ""))

            // If "no-toggle" is enabled
            if (codePreview[i].hasAttribute("no-toggle")) {
                // Hide the Code Editor
                codeEditor[i].style.display = "none"

                // Hide the Toggle Code Button
                get.html('.code-buttons .toggle-code[data-index="' + i + '"]').style.display = "none"

                // If "show-toggle" is enabled
                if (codePreview[i].hasAttribute("show-toggle")) {
                    codeEditor[i].style.display = "block"
                    codeEditor[i].style.opacity = 1
                }
            }

            // Syntax Coloring
                // HTML
                if (codePreview[i].className.indexOf("html") >= 0)
                    codeEditor[i].innerHTML = codifyHTML(codeEditor[i].innerHTML)

                // Javascript
                else if (codePreview[i].className.indexOf("javascript") >= 0)
                    codeEditor[i].innerHTML = codifyJavascript(codeEditor[i].innerHTML)
        }

/* Functions */
    // Code Editor
        // HTML
        function codifyHTML(string) {
            return (string
                // Quotes
                    // '
                    ).replace(/'/g, '"'
                
                // Attribute Content
                    // "
                    ).replace(/"/g, '"<_span>'
                    // ="
                    ).replace(/="<_span>/g, '<span class="code-color-default">=<_span><span class="code-color-yellow">"'
                    // <_span>
                    ).replace(/"<_span>/g, '"</span>'
                
                // Elements
                    // <
                    ).replace(/&lt;/g, '<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>'
                    // >
                    ).replace(/&gt;/g, '<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> '

                    // Comments
                        // <
                        ).replace(
                            /<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>!--/g,
                            '<span class="code-color-comment">&lt;!--'
                        // >
                        ).replace(
                            /--<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> /g,
                            '--&gt;</span>'

                    // <!
                    ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>!/g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;!</span>'
                    // </
                    ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>\//g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;/</span>'
                    // <
                    ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>/g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;</span>'
                    // >
                    ).replace(/<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> /g, '<span class="code-color-default">&gt;</span> </span> <span class="code-color-default"> '
                
                // Attribute Name
                    // accesskey=
                    ).replace(/accesskey<span class="code-color-default">=/g, '<span class="code-color-green">accesskey</span><span class="code-color-default">='
                    // alt=
                    ).replace(/alt<span class="code-color-default">=/g, '<span class="code-color-green">alt</span><span class="code-color-default">='
                    // async=
                    ).replace(/async<span class="code-color-default">=/g, '<span class="code-color-green">async</span><span class="code-color-default">='
                    // b=
                    ).replace(/b<span class="code-color-default">=/g, '<span class="code-color-green">b</span><span class="code-color-default">='
                    // big=
                    ).replace(/big<span class="code-color-default">=/g, '<span class="code-color-green">big</span><span class="code-color-default">='
                    // class=
                    ).replace(/class<span class="code-color-default">=/g, '<span class="code-color-blue">class</span><span class="code-color-default">='
                    // colspan=
                    ).replace(/colspan<span class="code-color-default">=/g, '<span class="code-color-green">colspan</span><span class="code-color-default">='
                    // content=
                    ).replace(/content<span class="code-color-default">=/g, '<span class="code-color-green">content</span><span class="code-color-default">='
                    // data-drpdwn=
                    ).replace(/data-drpdwn<span class="code-color-default">=/g, '<span class="code-color-green">data-drpdwn</span><span class="code-color-default">='
                    // data-event=
                    ).replace(/data-event<span class="code-color-default">=/g, '<span class="code-color-green">data-event</span><span class="code-color-default">='
                    // data-header=
                    ).replace(/data-header<span class="code-color-default">=/g, '<span class="code-color-green">data-header</span><span class="code-color-default">='
                    // data-id=
                    ).replace(/data-id<span class="code-color-default">=/g, '<span class="code-color-green">data-id</span><span class="code-color-default">='
                    // data-index=
                    ).replace(/data-index<span class="code-color-default">=/g, '<span class="code-color-green">data-index</span><span class="code-color-default">='
                    // data-key=
                    ).replace(/data-key<span class="code-color-default">=/g, '<span class="code-color-green">data-key</span><span class="code-color-default">='
                    // data-quantity=
                    ).replace(/data-quantity<span class="code-color-default">=/g, '<span class="code-color-green">data-quantity</span><span class="code-color-default">='
                    // data-subheader=
                    ).replace(/data-subheader<span class="code-color-default">=/g, '<span class="code-color-green">data-subheader</span><span class="code-color-default">='
                    // data-subsubheader=
                    ).replace(/data-subsubheader<span class="code-color-default">=/g, '<span class="code-color-green">data-subsubheader</span><span class="code-color-default">='
                    // data-title=
                    ).replace(/data-title<span class="code-color-default">=/g, '<span class="code-color-green">data-title</span><span class="code-color-default">='
                    // href=
                    ).replace(/href<span class="code-color-default">=/g, '<span class="code-color-green">href</span><span class="code-color-default">='
                    // i=
                    ).replace(/i<span class="code-color-default">=/g, '<span class="code-color-green">i</span><span class="code-color-default">='
                    // id=
                    ).replace(/id<span class="code-color-default">=/g, '<span class="code-color-orange">id</span><span class="code-color-default">='
                    // language=
                    ).replace(/language<span class="code-color-default">=/g, '<span class="code-color-orange">language</span><span class="code-color-default">='
                    // media=
                    ).replace(/media<span class="code-color-default">=/g, '<span class="code-color-green">media</span><span class="code-color-default">='
                    // name=
                    ).replace(/name<span class="code-color-default">=/g, '<span class="code-color-green">name</span><span class="code-color-default">='
                    // no-before=
                    ).replace(/no-before<span class="code-color-default">=/g, '<span class="code-color-green">no-before</span><span class="code-color-default">='
                    // no-copy=
                    ).replace(/no-copy<span class="code-color-default">=/g, '<span class="code-color-green">no-copy</span><span class="code-color-default">='
                    // no-preview=
                    ).replace(/no-preview<span class="code-color-default">=/g, '<span class="code-color-green">no-preview</span><span class="code-color-default">='
                    // no-psd=
                    ).replace(/no-psd<span class="code-color-default">=/g, '<span class="code-color-green">no-psd</span><span class="code-color-default">='
                    // placeholder=
                    ).replace(/placeholder<span class="code-color-default">=/g, '<span class="code-color-green">placeholder</span><span class="code-color-default">='
                    // psd-disabled=
                    ).replace(/psd-disabled<span class="code-color-default">=/g, '<span class="code-color-green">psd-disabled</span><span class="code-color-default">='
                    // psd-focus=
                    ).replace(/psd-focus<span class="code-color-default">=/g, '<span class="code-color-green">psd-focus</span><span class="code-color-default">='
                    // q=
                    ).replace(/q<span class="code-color-default">=/g, '<span class="code-color-green">q</span><span class="code-color-default">='
                    // rel=
                    ).replace(/rel<span class="code-color-default">=/g, '<span class="code-color-green">rel</span><span class="code-color-default">='
                    // show-preview=
                    ).replace(/show-preview<span class="code-color-default">=/g, '<span class="code-color-green">show-preview</span><span class="code-color-default">='
                    // show-toggle=
                    ).replace(/show-toggle<span class="code-color-default">=/g, '<span class="code-color-green">show-toggle</span><span class="code-color-default">='
                    // small=
                    ).replace(/small<span class="code-color-default">=/g, '<span class="code-color-green">small</span><span class="code-color-default">='
                    // src=
                    ).replace(/src<span class="code-color-default">=/g, '<span class="code-color-green">src</span><span class="code-color-default">='
                    // style=
                    ).replace(/style<span class="code-color-default">=/g, '<span class="code-color-blue">style<_span><span class="code-color-default">='
                    // target-densitydpi=
                    ).replace(/target-densitydpi<span class="code-color-default">=/g, '<span class="code-color-green">target-densitydpi</span><span class="code-color-default">='
                    // translate=
                    ).replace(/translate<span class="code-color-default">=/g, '<span class="code-color-green">translate</span><span class="code-color-default">='
                    // type=
                    ).replace(/type<span class="code-color-default">=/g, '<span class="code-color-green">type</span><span class="code-color-default">='
                    // u=
                    ).replace(/u<span class="code-color-default">=/g, '<span class="code-color-green">u</span><span class="code-color-default">='
                    // value=
                    ).replace(/value<span class="code-color-default">=/g, '<span class="code-color-green">value</span><span class="code-color-default">='
                    // 1=
                    ).replace(/1<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">1</span><span class="code-color-default">='
                    // 2=
                    ).replace(/2<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">2</span><span class="code-color-default">='
                    // 3=
                    ).replace(/3<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">3</span><span class="code-color-default">='
                    // 4=
                    ).replace(/4<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">4</span><span class="code-color-default">='
                    // 5=
                    ).replace(/5<span class="code-color-default">=/g, '<span class="code-color-green code-color-override">5</span><span class="code-color-default">='
                
                // Inline Styles
                    // style="
                    ).replace(
                        /<span class="code-color-blue">style<_span><span class="code-color-default">=<_span><span class="code-color-yellow">"/g,
                        '<span class="code-color-blue">style</span><span class="code-color-default">=</span><span class="code-color-yellow">"<span class="code-color-blue">'
                    // :
                    ).replace(/:/g, '<span class="code-color-default">:</span><span class="code-color-green">'
                    // %;
                    ).replace(/%;/g, '<span class="code-color-red">%</span>;'
                    // ;"
                    ).replace(/;"/g, '</span><span class="code-color-default">;</span></span>"'
                    // ;
                    ).replace(/; /g, '</span><span class="code-color-default">;</span> '
                
                // Empty Attributes
                    // ="
                    ).replace(/<span class="code-color-default">=<_span><span class="code-color-yellow">""/g, ''
                
                // Attribute Assignment Operator
                    // =
                    ).replace(/<span class="code-color-default">=<_span>/g, '<span class="code-color-default">=</span>'
                
                // Numbers
                    // 0
                    ).replace(/0/g, '<span class="code-number">0</span>'
                    // 1
                    ).replace(/1/g, '<span class="code-number">1</span>'
                    // 2
                    ).replace(/2/g, '<span class="code-number">2</span>'
                    // 3
                    ).replace(/3/g, '<span class="code-number">3</span>'
                    // 4
                    ).replace(/4/g, '<span class="code-number">4</span>'
                    // 5
                    ).replace(/5/g, '<span class="code-number">5</span>'
                    // 6
                    ).replace(/6/g, '<span class="code-number">6</span>'
                    // 7
                    ).replace(/7/g, '<span class="code-number">7</span>'
                    // 8
                    ).replace(/8/g, '<span class="code-number">8</span>'
                    // 9
                    ).replace(/9/g, '<span class="code-number">9</span>'

                // Special Strings
                    // deg
                    ).replace(/deg/g, '<span class="code-string">deg</span>'
                    // px
                    ).replace(/px/g, '<span class="code-string">px</span>'
                    // rgba
                    ).replace(/rgba/g, '<span class="code-string">rgba</span>'
                
                // Special Characters
                    // ,
                    ).replace(/,/g, '<span class="code-color-default">,</span>'
                    // .
                    ).replace(/[.]/g, '<span class="code-color-default">.</span>'
                    // Lesser Than
                    ).replace(/_lt_/g, '&lt;'
                    // Greater Than
                    ).replace(/_gt_/g, '&gt;'
                    // _q_
                    ).replace(/_q_/g, '<span class="code-color-default">"</span>'
                )

                codify(string)
        }

        // Javascript
        function codifyJavascript(string) {
            return (string

            // Color Control
                // End
                ).replace(/_end_/g, '</span>'

            // Replace Special Characters
                // '
                    ).replace(/'/g, '"'
                // "
                    ).replace(/"/g, '_first_"'
                    ).replace(/([^"]*"[^"]*)"/gm, '$1_last_"</span>'
                    ).replace(/_first_"/g, '<span class="code-color-yellow">"'
                    ).replace(/_first__last_"/g, '"</span>'

                // +
                ).replace(/[+]/g, '<span class="code-color-red">+</span>'
                // -
                    ).replace(/ -/g, '<span class="code-color-red"> -</span>'
                    ).replace(/- /g, '<span class="code-color-red">- </span>'
                // *
                ).replace(/ \* /g, '<span class="code-color-red"> * </span>'
                // /
                ).replace(/ \/ /g, '<span class="code-color-red"> / </span>'
                // <
                ).replace(/ \< /g, '<span class="code-color-red"> < </span>'
                // >
                ).replace(/ \> /g, '<span class="code-color-red"> > </span>'
                // %
                ).replace(/[%]/g, '<span class="code-color-red">%</span>'
                // !
                ).replace(/[!]/g, '<span class="code-color-red">!</span>'
                // =
                    ).replace(/\ =/g, '<span class="code-color-red"> =</span>'
                    ).replace(/\= /g, '<span class="code-color-red">= </span>'

            // Comments
                // Single-Line Comments
                ).replace(/\/\//g, '<span class="code-color-comment">//'
                // Multi-Line Comments
                    // /*
                    ).replace(/\/\*/g, '<span class="code-color-comment">/*'
                    // */
                    ).replace(/\*\//g, '*/</span>'

            // Replace Keywords
                // do
                ).replace(/do/g, '<span class="code-color-red">do</span>'
                // if
                ).replace(/if/g, '<span class="code-color-red">if</span>'
                // else
                ).replace(/else/g, '<span class="code-color-red">else</span>'
                // for
                ).replace(/for/g, '<span class="code-color-red">for</span>'
                // return
                ).replace(/return/g, '<span class="code-color-red">return</span>'
                // while
                ).replace(/while/g, '<span class="code-color-red">while</span>'

            // Javascript Objects
                // document.
                ).replace(/<span class="code-color-red">do<\/span>cument[.]/g, '<span class="code-color-blue">document</span>.'
                    // .getElementsByClassName
                    ).replace(/[.]getElementsByClassName/g, '.<span class="code-color-green">getElementsByClassName</span>'
                    // .getElementById
                    ).replace(/[.]getElementById/g, '.<span class="code-color-green">getElementById</span>'
                    // .getElementsByTagName
                    ).replace(/[.]getElementsByTagName/g, '.<span class="code-color-green">getElementsByTagName</span>'
                    // .querySelectorAll
                    ).replace(/[.]querySelectorAll/g, '.<span class="code-color-green">querySelectorAll</span>'

            // LapysJS Syntax
                // Functions
                    // create(
                    ).replace(/create\(/g, '<span class="code-color-blue">create</span>('
                    // css.
                    ).replace(/css[.]/g, '<span class="code-color-blue">css</span>.'
                        // .add
                        ).replace(/[.]add/g, '.<span class="code-color-green">add</span>'
                        // .style
                        ).replace(/[.]style/g, '.<span class="code-color-green">style</span>'
                    // del.
                    ).replace(/del[.]/g, '<span class="code-color-blue">del</span>.'
                        // .attr
                        ).replace(/[.]attr/g, '.<span class="code-color-green">attr</span>'
                        // .class
                        ).replace(/[.]class/g, '.<span class="code-color-green">class</span>'
                        // .event
                        ).replace(/[.]event/g, '.<span class="code-color-green">event</span>'
                        // .link
                        ).replace(/[.]link/g, '.<span class="code-color-green">link</span>'
                        // .html
                        ).replace(/[.]html/g, '.<span class="code-color-green">html</span>'
                        // .inlineStyle
                        ).replace(/[.]inlineStyle/g, '.<span class="code-color-green">inlineStyle</span>'
                        // .style
                        ).replace(/[.]style/g, '.<span class="code-color-green">style</span>'
                    // file.
                    ).replace(/file[.]/g, '<span class="code-color-blue">file</span>.'
                        // .close
                        ).replace(/[.]close/g, '.<span class="code-color-green">close</span>'
                        // .open
                        ).replace(/[.]open/g, '.<span class="code-color-green">open</span>'
                        // .read
                        ).replace(/[.]read/g, '.<span class="code-color-green">read</span>'
                        // .write
                        ).replace(/[.]write/g, '.<span class="code-color-green">write</span>'
                    // insertAfter(
                    ).replace(/insertAfter\(/g, '<span class="code-color-green">insertAfter</span>('
                    // insertBefore(
                    ).replace(/insertBe<span class="code-color-red">for<\/span>e\(/g, '<span class="code-color-green">insertBefore</span>('
                    // get.
                    ).replace(/get[.]/g, '<span class="code-color-blue">get</span>.'
                        // .attr
                        ).replace(/[.]attr/g, '.<span class="code-color-green">attr</span>'
                        // .class
                        ).replace(/[.]class/g, '.<span class="code-color-green">class</span>'
                        // .css
                        ).replace(/[.]css/g, '.<span class="code-color-green">css</span>'
                        // .html
                        ).replace(/[.]html/g, '.<span class="code-color-green">html</span>'
                    // goTo(
                    ).replace(/goTo\(/g, '<span class="code-color-green">goTo</span>('
                    // js.
                    ).replace(/js[.]/g, '<span class="code-color-blue">js</span>.'
                        // .add
                        ).replace(/[.]add/g, '.<span class="code-color-green">add</span>'
                        // .script
                        ).replace(/[.]script/g, '.<span class="code-color-green">script</span>'
                    // log(
                    ).replace(/log\(/g, '<span class="code-color-green">log</span>('
                    // parseBool(
                    ).replace(/parseBool\(/g, '<span class="code-color-green">parseBool</span>('

            // Functions
                    // (
                    ).replace(/\(/g, '<span class="code-color-default">(</span><span class="code-color-orange code-color-override">'
                    // )
                    ).replace(/\)/g, '</span><span class="code-color-default">)</span>'

            // Numbers
                // 0
                ).replace(/0/g, '<span class="code-number">0</span>'
                // 1
                ).replace(/1/g, '<span class="code-number">1</span>'
                // 2
                ).replace(/2/g, '<span class="code-number">2</span>'
                // 3
                ).replace(/3/g, '<span class="code-number">3</span>'
                // 4
                ).replace(/4/g, '<span class="code-number">4</span>'
                // 5
                ).replace(/5/g, '<span class="code-number">5</span>'
                // 6
                ).replace(/6/g, '<span class="code-number">6</span>'
                // 7
                ).replace(/7/g, '<span class="code-number">7</span>'
                // 8
                ).replace(/8/g, '<span class="code-number">8</span>'
                // 9
                ).replace(/9/g, '<span class="code-number">9</span>'

            // Special Characters
                // ,
                ).replace(/,/g, '<span class="code-color-default">,</span>'
                // .
                ).replace(/[.]/g, '<span class="code-color-default">.</span>'
                // _q_
                ).replace(/_q_/g, '<span class="code-color-default">"</span>'
            )

            codify(string)
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