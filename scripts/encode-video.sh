#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
source_video="${1:-output/video/heglau-grok-refined.mp4}"
# The refined source's neutral backdrop samples approximately RGB 239/235/224.
# Normalize it to white so CSS multiply matches the page's ivory exactly.
export COLOR_FILTER='colorlevels=rimax=0.937255:gimax=0.921569:bimax=0.878431'
exec bash skills/illustrated-scroll-site/scripts/encode-journey.sh \
  "$source_video" public/assets heglau-flight
