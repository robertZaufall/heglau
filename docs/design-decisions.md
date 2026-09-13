# Heglau design decisions

A quiet, welcoming German village portrait, with a miniature landscape and editorial typography. The palette combines ivory `#f4f1e8`, forest `#304b39`, moss `#82946b`, clay `#a35d43` and brook `#7dadae`. The five beats are village, history, pottery, cabbage tradition and visiting.

The camera journey uses one continuous 12-second take. Scroll position drives actual video time in both directions; a Blob source and coalesced seeks keep rapid movement manageable. The true first-frame poster stays visible until decoded frames paint. The fallback animates the same still illustration. Reduced motion keeps a static image and skips the initial video download.

The film was generated with Grok. Built-in image generation supplied the pottery and field illustrations. The film's first frame supplies its matching poster. A measured color correction normalizes the pale studio backdrop for blending with the site's ivory background.

Phones receive a lighter landscape encode fitted below the tallest chapter copy. No portrait generation or center crop is implied. Short landscape viewports use normal vertical scrolling. Native dialogs and ordinary links keep details accessible outside the media.

The workflow is maintained in `skills/illustrated-scroll-site/`. Media masters remain local, and the public build contains only delivery assets. Illustrations do not claim to reconstruct real buildings or businesses. Testing limitations are recorded separately.
