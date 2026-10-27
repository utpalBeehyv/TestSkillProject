#!/usr/bin/env sh
# Installs the frontend pack's workflow skills and agents for the current user.
# Re-run after moving or updating the pack. A changed file is backed up to <file>.bak first.
set -eu

PACK_ROOT=$(cd "$(dirname "$0")/.." && (pwd -W 2>/dev/null || pwd))
CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
PACK_ROOT_SED=$(printf '%s' "$PACK_ROOT" | sed 's/[&#\\]/\\&/g')

install_file() {
  src=$1
  dest=$2
  mkdir -p "$(dirname "$dest")"
  tmp="$dest.tmp.$$"
  sed "s#{{PACK_ROOT}}#$PACK_ROOT_SED#g" "$src" > "$tmp"
  if [ -f "$dest" ] && ! cmp -s "$tmp" "$dest"; then
    cp "$dest" "$dest.bak"
    echo "backed up $dest"
  fi
  mv "$tmp" "$dest"
  echo "installed $dest"
}

for dir in "$PACK_ROOT"/install/skills/*/; do
  name=$(basename "$dir")
  install_file "$dir/SKILL.md" "$CLAUDE_DIR/skills/$name/SKILL.md"
done

for file in "$PACK_ROOT"/agents/*.md; do
  install_file "$file" "$CLAUDE_DIR/agents/$(basename "$file")"
done

echo "Pack root: $PACK_ROOT"
