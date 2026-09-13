# Generation prompts and outputs

Supporting illustrations were generated with the built-in image tool. Accepted PNG masters remain locally in ignored `output/imagegen/`; optimized website assets are in `public/assets/`.

## Village artwork — built-in generation

This initial style concept was not used in the final site and its unused files were removed. The film uses its own actual first frame as its poster. The prompt remains as a record of the art direction.

> Use case: stylized-concept. Asset type: hero artwork for a German village's scroll-driven website; this is a stylized interpretation, not a factual reconstruction. Create one exquisitely crafted architectural miniature diorama of Heglau, a tiny Franconian farming village in Middle Franconia, Bavaria. A single cohesive elongated oval island of green landscape on a completely plain warm ivory background (#f3f0e7) with soft natural contact shadow. Viewed high from an elegant three-quarter aerial angle, realistic miniature materials, tactile matte clay, subtle tilt-shift, beautifully detailed yet restrained. Cluster of about 10 traditional small Franconian cream plaster farmhouses with steep terracotta red tiled roofs, cozy farm courtyards, mature linden trees, a gently winding small turquoise blue brook with a little wooden footbridge, a gravel lane connecting all the buildings. On the front right are neat rows of leafy green and purple cabbages in a small field. On the front left a small pottery workshop courtyard with a pottery wheel and a few terracotta vessels. Near center is a small circular stone village fountain. No church, no castle, no alpine mountains, no modern tower blocks. The entire single island comfortably framed with ample breathing room all around, all buildings and trees fully in frame. Main island occupies about 82% of image width. Wide landscape 3:2 image, high resolution. Warm late afternoon sunlight from upper left, soft long shadows. Palette: ivory #f3f0e7, leaf green #536647, moss #82946b, clay #a75136, wheat #c0a47b, muted blue stream #7dadae. Sophisticated travel editorial meets handcrafted scale model, not cartoon, not toy plastic, not oversaturated. No text, no letters, no typography, no labels, no logos, no frame, no watermark.

## Pottery — built-in generation with village style reference

Output: `output/imagegen/pottery.png`, `public/assets/pottery.webp`.

> Use case: stylized-concept. Create a NEW supporting landscape 3:2 illustration for the Heglau village website, using the attached village diorama only as style reference. Show a close-in three-quarter view of the small Franconian pottery workshop courtyard in that same handcrafted architectural miniature style, terracotta tiled roof edge, cream plaster wall, weathered wood shelves, a pottery wheel and tasteful handmade stoneware bowls and jugs with green sage and clay glazes on a workbench, climbing green plants. No people. Sunlight from upper left, warm ivory background, tactile realistic miniature materials, subtle tilt-shift, restrained colors ivory #f3f0e7, moss #536647, terracotta #a75136. Exquisite detailed travel editorial illustration. The workshop is illustrative and does not purport to depict a specific real business. Full scene composition, no text, no logos, no watermark.

## Kraut field — built-in generation with village style reference

Output: `output/imagegen/kraut.png`, `public/assets/kraut.webp`.

> Use case: stylized-concept. Create a NEW supporting landscape 3:2 illustration for the Heglau village website, using the attached village diorama only as style reference. Show a close-in three-quarter aerial view of the small cabbage farm in that same handcrafted architectural miniature style. Beautiful alternating rows of crinkly green white-cabbage plants and rich purple red-cabbage plants, some pointed cabbage. At edge of field a rustic small cream plaster Franconian farm shed with terracotta tile roof and wood crates of harvested cabbage. A small gravel lane, soft trees in the background. No people. Sunlight from upper left, warm ivory background, tactile realistic miniature materials, subtle tilt-shift, restrained colors ivory #f3f0e7, moss #536647, terracotta #a75136. Exquisite detailed travel editorial illustration. Illustrative, not depicting a specific real field. No text, no logos, no watermark.

## Grok video — browser generation

The film was generated through [Grok Imagine Agent](https://grok.com/imagine/agent), using the following prompt and refinement.

> Create exactly ONE continuous 12-second landscape video for a scroll-controlled German village website, using included account generation only, no purchases or upgrades. No audio, text, captions, logos, or cuts. A beautifully detailed architectural miniature diorama of Heglau, a tiny Franconian farming village, on a plain warm ivory background #f4f1e8. Cream plaster farmhouses, terracotta tiled roofs, green trees, turquoise brook with wooden bridge, pottery courtyard with ceramic vessels front left, circular stone fountain center, neat green and purple cabbage rows front right. No church, castle, or mountains. Warm sunlight, realistic matte miniature materials, high three-quarter aerial view. One unbroken gentle camera flight: begin with the entire diorama comfortably in frame; glide closer toward the village and stream, arc gently left past the pottery courtyard, then continue toward cabbage rows, then ease upward to reveal the same village. Preserve village geometry throughout. Calm controlled motion, ample ivory space around the island. Please generate the video now, not a storyboard.

The first result's amber background did not match the site. The following refinement was requested:

> Please make ONE improved version, using included generation only. The first result has a dark golden/brown photographic backdrop. This does not fit the site. The entire background must be a perfectly flat solid very pale warm ivory #f4f1e8, like a clean white studio cyclorama, no backdrop seams, no walls, no gradient, no gold or orange cast. The island should be an organic oval landscape with more finely detailed, realistic miniature Franconian farmhouses (about ten), green mature trees, a winding natural brook and small wooden footbridge, pottery courtyard left, green and purple cabbage field right. Sophisticated realistic architectural scale model, weathered cream plaster, fine terracotta tiles, subtle warm daylight, not chunky toy plastic. Retain one continuous 12-second gentle camera flight across the miniature, whole world to pottery to cabbage then wide again. Keep the island completely inside the frame with breathing room at all times. Render the final video now, silent, no cuts or text.

## Website encodes

The film is downloaded using the browser's supported page-assets export. The local FFmpeg pipeline selects the primary video stream, removes audio and attached thumbnails, preserves the native desktop resolution, and uses H.264 with fast-start metadata and a small GOP. The phone encode is reduced to 960 pixels wide while retaining the full landscape frame. The poster is extracted from the actual video frame zero and encoded as WebP.

Final local assets: `public/assets/heglau-flight.mp4`, `public/assets/heglau-flight-mobile.mp4`, and `public/assets/heglau-flight-poster.webp`.

The accepted source is `output/video/heglau-grok-refined.mp4` (Grok generation `dfeeed58-567a-428b-90dc-2a533d3db57d`). Its backdrop is normalized to white for seamless CSS blending with the ivory page. Run `bash scripts/encode-video.sh` to reproduce the encodes and poster. The rejected amber result was removed during cleanup; its prompt and refinement remain documented above.
