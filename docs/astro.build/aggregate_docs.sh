#!/usr/bin/env bash
set -euo pipefail
shopt -s dotglob nullglob

# Recursively aggregate markdown files bottom-up
# Process directories in reverse order so children run before parents
find . -type d | sort -r | while IFS= read -r dir; do

  output="$dir/agg.md"
  # Create or truncate the aggregate file
  : > "$output"
  if [ -f "$dir/index.md" ]; then
    cat "$dir/index.md" >> "$output"
    echo -e "\n" >> "$output"
  fi

  # Append each child's aggregated content
  for sd in "$dir"/*/; do
    [ -d "$sd" ] || continue
    child_agg="$sd/agg.md"
    if [ -f "$child_agg" ]; then
      echo "# Aggregated from ${sd%/}" >> "$output"
      cat "$child_agg" >> "$output"
      echo -e "\n" >> "$output"
    fi
  done
done
