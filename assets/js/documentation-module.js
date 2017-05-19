/* Code Editor JS
         --- NOTE ---
            Allocate proper syntax coloring for each code editor.
*/
    // HTML
    function codifyHTML(element) {
        element.innerHTML = parseString(
            element.innerHTML
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

                // Replace all "</"
                ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>\//g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;/</span>'
                // Replace all "<"
                ).replace(/<_span> <span class="code-color-red"> <span class="code-color-default">&lt;<_span>/g, '</span> <span class="code-color-red"> <span class="code-color-default">&lt;</span>'
                // Replace all ">"
                ).replace(/<span class="code-color-default">&gt;<_span> <_span> <span class="code-color-default"> /g, '<span class="code-color-default">&gt;</span> </span> <span class="code-color-default"> '
            // Attribute Name
                // Replace all "class="
                ).replace(/class<span class="code-color-default">=/g, '<span class="code-color-blue">class</span><span class="code-color-default">='
                // Replace all "colspan="
                ).replace(/colspan<span class="code-color-default">=/g, '<span class="code-color-green">colspan</span><span class="code-color-default">='
                // Replace all "data-drpdwn="
                ).replace(/data-drpdwn<span class="code-color-default">=/g, '<span class="code-color-green">data-drpdwn</span><span class="code-color-default">='
                // Replace all "data-event="
                ).replace(/data-event<span class="code-color-default">=/g, '<span class="code-color-green">data-event</span><span class="code-color-default">='
                // Replace all "data-quantity="
                ).replace(/data-quantity<span class="code-color-default">=/g, '<span class="code-color-green">data-quantity</span><span class="code-color-default">='
                // Replace all "data-title="
                ).replace(/data-title<span class="code-color-default">=/g, '<span class="code-color-green">data-title</span><span class="code-color-default">='
                // Replace all "href="
                ).replace(/href<span class="code-color-default">=/g, '<span class="code-color-green">href</span><span class="code-color-default">='
                // Replace all "id="
                ).replace(/id<span class="code-color-default">=/g, '<span class="code-color-orange">id</span><span class="code-color-default">='
                // Replace all "placeholder="
                ).replace(/placeholder<span class="code-color-default">=/g, '<span class="code-color-green">placeholder</span><span class="code-color-default">='
                // Replace all "psd-disabled="
                ).replace(/psd-disabled<span class="code-color-default">=/g, '<span class="code-color-green">psd-disabled</span><span class="code-color-default">='
                // Replace all "psd-focus="
                ).replace(/psd-focus<span class="code-color-default">=/g, '<span class="code-color-green">psd-focus</span><span class="code-color-default">='
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
        /* --- NOTE ---
                Run the general syntax coloring and parsing.
        */
        codify(element)
    }

    // All Languages
    function codify(element) {
        // Code for the editor
        element.innerHTML = element.innerHTML.replace(
            // New Line
            /~break~/g, '\n'
            // Lesser Than
            ).replace(/~lessthan~/g, '&lt;'
            // Greater Than
            ).replace(/~greatthan~/g, '&gt;'
            // Double Quotes
            ).replace(/~quote~/g, '"'
            // Tab Spacing
            ).replace(/~tab~/g, '<span class="code-tab">    </span>'
        )

        // Code for the content and preview
            // Content
            get.html('.code-preview[data-index="' + get.attr(element, 'data-index') + '"]', 0).innerHTML = get.html('.code-preview[data-index="' + get.attr(element, 'data-index') + '"]', 0).innerHTML.replace(
                // Remove Line Break
                /~break~/g, ''
                // Remove Less Than
                ).replace(/~lessthan~/g, ''
                // Remove Greater Than
                ).replace(/~greatthan~/g, ''
                // Remove Tab Spacing
                ).replace(/~quote~/g, ''
                // Remove Tab Spacing
                ).replace(/~tab~/g, ''
            )

            // Preview
            get.html('.code-content[data-index="' + get.attr(element, 'data-index') + '"]', 0).value = get.html('.code-preview[data-index="' + get.attr(element, 'data-index') + '"]', 0).innerHTML.replace(
                // Remove all tab spacing
                /    /g, '').replace(
                // Remove all "=''"
                /=""/g, ''
            )
    }