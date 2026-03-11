#!/usr/bin/env bash

URL="http://localhost:3000"

echo "Sending 2 concurrent requests to $URL..."
echo ""

START=$(date +%s%3N)

{ T1=$(date +%s%3N)
  curl -s "$URL" > /dev/null
  T2=$(date +%s%3N)
  DUR=$(( T2 - T1 ))
  printf "Request 1 finished in %dms (%.2fs)\n" "$DUR" "$(awk "BEGIN{printf \"%.2f\",$DUR/1000}")"; } &

{ T1=$(date +%s%3N)
  curl -s "$URL" > /dev/null
  T2=$(date +%s%3N)
  DUR=$(( T2 - T1 ))
  printf "Request 2 finished in %dms (%.2fs)\n" "$DUR" "$(awk "BEGIN{printf \"%.2f\",$DUR/1000}")"; } &

wait

END=$(date +%s%3N)
TOTAL=$(( END - START ))
printf "\nTotal wall-clock time: %dms (%.2fs)\n" "$TOTAL" "$(awk "BEGIN{printf \"%.2f\",$TOTAL/1000}")"