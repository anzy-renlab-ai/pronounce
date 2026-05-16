# bash completion for say-it
# Install: source this file in your ~/.bashrc, e.g.:
#   source /path/to/say-it/completions/say-it.bash
# Or copy into /usr/local/etc/bash_completion.d/

_say_it_words() {
  local dict
  for c in "$SAY_IT_DICT" "$HOME/.config/say-it/pronunciations.local.tsv" \
           "$HOME/.local/share/say-it/pronunciations.tsv"; do
    [[ -n "$c" && -f "$c" ]] && { dict="$c"; break; }
  done
  [[ -z "$dict" ]] && return 0
  awk -F'\t' '!/^#/ && NF>=2 && $1 != "" && $1 != "word" { print $1 }' "$dict" 2>/dev/null
}

_say_it_complete() {
  local cur prev opts subcommands words
  COMPREPLY=()
  cur="${COMP_WORDS[COMP_CWORD]}"
  prev="${COMP_WORDS[COMP_CWORD-1]}"

  subcommands="list search random daily quiz compare tweet stats config update"
  opts="-v --voice -n --times -r --rate -o --output --alt --all --solo --no-dict --why --json --md --copy -q --quiet -l --list -h --help -V --version"

  # First word: suggest subcommands + words
  if [[ $COMP_CWORD -eq 1 ]]; then
    words="$(_say_it_words)"
    COMPREPLY=( $(compgen -W "$subcommands $opts $words" -- "$cur") )
    return 0
  fi

  # After --voice, suggest macOS voices
  if [[ "$prev" == "-v" || "$prev" == "--voice" ]]; then
    voices="$(say -v '?' 2>/dev/null | awk '$1 !~ /^\(/ {print $1}')"
    COMPREPLY=( $(compgen -W "$voices" -- "$cur") )
    return 0
  fi

  # After list, suggest --category
  if [[ "$prev" == "list" ]]; then
    COMPREPLY=( $(compgen -W "--category" -- "$cur") )
    return 0
  fi

  # After --category, suggest known categories
  if [[ "$prev" == "--category" ]]; then
    COMPREPLY=( $(compgen -W "product project cli-tool tool cs-term acronym abbreviation" -- "$cur") )
    return 0
  fi

  # After compare/tweet, suggest dict words
  if [[ "$prev" == "compare" || "$prev" == "tweet" || "$prev" == "search" ]]; then
    words="$(_say_it_words)"
    COMPREPLY=( $(compgen -W "$words" -- "$cur") )
    return 0
  fi

  # Default: dict words
  words="$(_say_it_words)"
  COMPREPLY=( $(compgen -W "$words" -- "$cur") )
}

complete -F _say_it_complete say-it
