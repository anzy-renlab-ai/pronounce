import csv, json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
TSV = REPO / "data" / "pronunciations.tsv"
OUT = REPO / "docs" / "v2" / "data.js"

# confidence rename: TSV uses creator-clarified/community-consensus/contested
# prototype uses creator/community/contested
CONF_MAP = {
    "creator-clarified": "creator",
    "community-consensus": "community",
    "contested": "contested",
}

# strip None to compact JSON
def compact(d):
    return {k: v for k, v in d.items() if v is not None}


def slugify(word):
    return re.sub(r"[^a-z0-9._-]", "-", word.lower())


def split_alts(alt_resp):
    return [part.strip() for part in alt_resp.split("|") if part.strip()]


def entry_from_cells(cells):
    word, ipa, resp, alt_ipa, alt_resp, src_url, src_label, cat, conf, notes = cells
    alts = split_alts(alt_resp)
    return compact({
        "w": word,
        "slug": slugify(word),
        "ipa": ipa,
        "resp": resp,
        "alts": alts,
        "alt": alts[0] if alts else None,
        "conf": CONF_MAP.get(conf, "community"),
        "src": src_label or None,
        "url": src_url or None,
        "cat": cat,
        "notes": notes or None,
    })


def load_rows(path=TSV):
    rows = []
    with open(path) as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            cells = line.rstrip("\n").split("\t")
            if cells[0] == "word":
                continue
            if len(cells) < 10:
                continue
            if not cells[0] or not cells[2]:
                continue
            rows.append(entry_from_cells(cells))
    return rows

# FAMOUS = top 8 creator-clarified, picked for cultural cachet
HERO = ["GIF", "JSON", "GNU", "etcd", "PostgreSQL", "LaTeX", "Django", "Debian",
        "nginx", "YAML", "TOML", "Tcl", "awk", "Dijkstra"]


def build_famous(rows):
    hero_set = {h.lower() for h in HERO}
    famous = []
    for r in rows:
        if r["w"].lower() in hero_set and r["conf"] == "creator":
            famous.append({
                "w": r["w"],
                "said": r["resp"],
                "src": r.get("src") or "—",
                "url": r.get("url") or "#",
            })
    return famous[:8]  # cap

# FAQS — keep prototype's set
faqs = [
    {"q": "Why not just listen to a YouTube video?",
     "a": "Because you'd have to hunt for the clip, unmute, wait, rewind. <code>say-it kubectl</code> plays the right reading three times in 4 seconds. The site is here for when you're not at a terminal."},
    {"q": "Why is the browser audio different from the CLI?",
     "a": "The site plays the committed canonical MP3 first and uses Web Speech only as a fallback if playback fails. The CLI passes the same English-like respelling to the detected OS TTS backend."},
    {"q": "How is this different from a regular pronunciation dictionary?",
     "a": "This one's for the names engineers actually use — <code>kubectl</code>, <code>nginx</code>, <code>Pydantic</code>, <code>Knative</code>, <code>Ghostty</code>, <code>YAML</code>. Webster doesn't cover them; this does, with confidence tagging and a citable source where one exists."},
    {"q": "Why is GIF \"jif\" here? I always say \"gif\".",
     "a": "Both are real. The dictionary picks the creator's stated reading as primary (\"jif\", per Wilhite at the 2013 Webby Awards) and surfaces \"gif\" as the alternate. Same pattern for SQL, JSON, char, regex."},
    {"q": "Windows or Linux support?",
     "a": "Shipped. The one Bash CLI detects macOS <code>say</code>, Linux <code>espeak-ng</code> or <code>espeak</code>, and Windows PowerShell <code>System.Speech</code>."},
    {"q": "How do I add a missing project?",
     "a": "Open a PR adding a row to <code>data/pronunciations.tsv</code>. See <code>CONTRIBUTING.md</code> for column format."},
]

eggs = [
    {"id": "palette",  "label": "⌘K — command palette"},
    {"id": "slash",    "label": "/  — focus the search"},
    {"id": "logo",     "label": "Click the logo (×3)"},
    {"id": "hero",     "label": "Click the giant word"},
    {"id": "konami",   "label": "↑↑↓↓←→←→ — secret mode"},
    {"id": "jiffy",    "label": "Type \"jif\" or \"gif\" anywhere"},
    {"id": "mark",     "label": "Click the giant footer mark"},
    {"id": "year",     "label": "Click the footer year"},
    {"id": "install",  "label": "Click the install line"},
    {"id": "famous",   "label": "Click a famous moment"},
    {"id": "ipa",      "label": "Click an IPA phoneme"},
    {"id": "quiz",     "label": "Pick the correct quiz answer"},
]

def write_data(rows, out=OUT):
    dict_entries = [compact(r) for r in rows]
    famous = build_famous(rows)
    with open(out, "w") as f:
        f.write("// Auto-generated from data/pronunciations.tsv at build time.\n")
        f.write("// DO NOT EDIT by hand — re-run tools/build-v2-data.py.\n\n")
        f.write(f"window.DICT_ALL = {json.dumps(dict_entries, ensure_ascii=False)};\n\n")
        # Curated DICT for WordGrid — top 24 by mix of contested + creator-clarified
        curated_words = [
            "kubectl", "nginx", "GIF", "JSON", "YAML", "TOML", "Ghostty", "wagmi",
            "Pydantic", "Knative", "GNU", "etcd", "Dijkstra", "Logseq", "Affine",
            "tldraw", "Excalidraw", "Tcl", "awk", "SQL", "sudo", "Keras", "QUIC", "viem",
        ]
        curated_set = {w.lower() for w in curated_words}
        curated = []
        by_w = {r["w"].lower(): compact(r) for r in rows}
        for w in curated_words:
            if w.lower() in by_w:
                curated.append(by_w[w.lower()])
        f.write(f"window.DICT = {json.dumps(curated, ensure_ascii=False)};\n\n")
        f.write(f"window.FAMOUS = {json.dumps(famous, ensure_ascii=False)};\n\n")
        f.write(f"window.FAQS = {json.dumps(faqs, ensure_ascii=False)};\n\n")
        f.write(f"window.EGGS = {json.dumps(eggs, ensure_ascii=False)};\n")
    return len(dict_entries), len(curated), len(famous)


def main():
    counts = write_data(load_rows())
    print(f"wrote {counts[0]} ALL + {counts[1]} curated DICT + {counts[2]} FAMOUS → {OUT}")


if __name__ == "__main__":
    main()
