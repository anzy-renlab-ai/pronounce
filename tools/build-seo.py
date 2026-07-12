#!/usr/bin/env python3
"""Generate SEO landing pages: topic collections, comparison pages, and per-word
Chinese (zh-CN) pages. Run AFTER tools/build-site.sh — this script depends on
the canonical /word/<slug>.html pages, /audio/<slug>.mp3 files, and /og/<slug>.png
cards that build-site.sh produces.

Outputs:
  docs/collection/<slug>.html       handpicked topic clusters
  docs/collection/index.html        collection landing
  docs/compare/<a>-vs-<b>.html      same-confusion pairs (groq-vs-grok, ...)
  docs/compare/index.html           compare landing
  docs/zh/word/<slug>.html          Chinese version per dict entry
  docs/zh/word/index.html           Chinese word browser
  docs/sitemap-seo.xml              sitemap for the new pages (linked from
                                    docs/sitemap-index.xml by build-site.sh)

Why a Python script instead of more bash? build-site.sh is already 2.6k lines.
Stdlib-only Python keeps the new templates readable + skip the awk gymnastics.
"""
from __future__ import annotations
import html as _html
import json
import re
import urllib.parse
from datetime import date
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DICT = REPO / "data" / "pronunciations.tsv"
DOCS = REPO / "docs"
BRAND = "Pronounce"
GH_REPO = "anzy-renlab-ai/pronounce"
SITE_URL = "https://pronounce.renlab.ai"
TODAY = date.today().isoformat()

SLUG_RE = re.compile(r"[^a-z0-9._-]")


def slugify(s: str) -> str:
    return SLUG_RE.sub("-", s.lower())


def esc(s: str) -> str:
    return _html.escape(s or "", quote=True)


def js_arg(s: str) -> str:
    """Escape for a single-quoted JS string inside a double-quoted HTML attribute.
    Escapes JS specials (\\, ') first, then attribute-breaking HTML chars — but
    NOT the single-quote (it's the JS delimiter, kept as \\')."""
    s = (s or "").replace("\\", "\\\\").replace("'", "\\'")
    return s.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


def load_entries():
    entries = []
    by_slug = {}
    for raw in DICT.read_text(encoding="utf-8").splitlines():
        if not raw or raw.startswith("#"):
            continue
        parts = raw.split("\t")
        if len(parts) < 10 or parts[0] == "word" or not parts[0].strip():
            continue
        e = {
            "word": parts[0],
            "ipa": parts[1],
            "resp": parts[2],
            "alt_ipa": parts[3],
            "alt_resp": parts[4],
            "src_url": parts[5],
            "src_label": parts[6],
            "cat": parts[7],
            "conf": parts[8],
            "notes": parts[9],
        }
        e["slug"] = slugify(e["word"])
        entries.append(e)
        by_slug[e["slug"]] = e
    return entries, by_slug


# ---------------------------------------------------------------------------
# Topic collection pages
# ---------------------------------------------------------------------------
COLLECTIONS = [
    {
        "slug": "ai-startups",
        "title": "AI Startup Pronunciation Guide",
        "h1": "How to pronounce AI startup names",
        "desc": "Names of buzzy AI companies — Anthropic, Perplexity, Cohere, and the 2024-2026 wave. Audio + IPA + sources.",
        "intro": (
            "Pitch decks, podcast intros, and recruiter outreach trip over the same "
            "names every week. This is a curated reading list of AI company brands "
            "where engineers, founders, and journalists most often disagree. Each "
            "entry links to the canonical dictionary page with audio, IPA, "
            "respelling, and a citation."
        ),
        "words": [
            "anthropic", "openai", "xai", "cohere", "ai21", "character.ai",
            "perplexity", "inflection", "adept", "magic.dev", "augment",
            "cognition", "supermaven", "plandex", "void", "manus", "mem0",
            "dria", "e2b", "composio", "exa", "tavily", "kagi", "hermes",
            "aaru", "simile", "firecrawl", "browserbase", "modular",
            "together.ai", "fireworks.ai",
        ],
    },
    {
        "slug": "llm-models",
        "title": "LLM Model Name Pronunciation",
        "h1": "How to pronounce large language model names",
        "desc": "GPT, Claude, Gemini, Llama, Mistral, Mixtral, Gemma, Qwen, DeepSeek — every major LLM name with audio + IPA.",
        "intro": (
            "Major large language model brands, ordered by which ones surface in "
            "the most papers and product launches. Several are Greek letters (Phi), "
            "Pinyin transliterations (Qwen, Baichuan), or made-up portmanteaus "
            "(Mixtral) — none read like obvious English."
        ),
        "words": [
            "gpt", "claude", "gemini", "llama", "mistral", "mixtral", "gemma",
            "phi", "qwen", "kimi", "doubao", "baichuan", "deepseek", "yi",
            "command-r", "falcon", "grok", "dbrx", "jamba", "hermes",
            "minimax",
        ],
    },
    {
        "slug": "chinese-ai-labs",
        "title": "Chinese AI Lab Pronunciation Guide",
        "h1": "How to pronounce Chinese AI lab + model names",
        "desc": "Pinyin to English: Qwen, Kimi, Doubao, Baichuan, DeepSeek, MiniMax, Manus, Kling, Yi, Trae.",
        "intro": (
            "Chinese AI labs publish weekly under names that look unfamiliar to "
            "English speakers. Each is a Pinyin transliteration with a regular "
            "Mandarin reading — once you hear it once, it sticks. We document the "
            "approximate English respelling for every major lab."
        ),
        "words": [
            "qwen", "kimi", "doubao", "baichuan", "minimax", "deepseek", "yi",
            "manus", "kling", "trae",
        ],
    },
    {
        "slug": "ai-chips",
        "title": "AI Chip Company Names — Pronunciation",
        "h1": "How to pronounce AI chip companies",
        "desc": "Groq, Cerebras, Etched, SambaNova — pronouncing the AI hardware unicorns.",
        "intro": (
            "AI inference hardware is a small market with very googleable names. "
            "Knowing how to say them right matters disproportionately when you're "
            "in the room with infra investors."
        ),
        "words": ["groq", "cerebras", "etched", "sambanova"],
    },
    {
        "slug": "coding-agents",
        "title": "AI Coding Agent + IDE Pronunciation",
        "h1": "How to pronounce AI coding agents and IDEs",
        "desc": "Devin, Cursor, Windsurf, Cline, Codeium, Aider, Plandex, v0, Bolt — every AI coding tool with audio.",
        "intro": (
            "The AI-coding-agent space ships a new product per week. Most are "
            "compounds, portmanteaus, or single syllables — but a few (Aider, "
            "Cline, Plandex, Trae) trip people up. Audio for each."
        ),
        "words": [
            "devin", "cursor", "windsurf", "bolt.new", "lovable", "v0",
            "replit", "codex", "aider", "cline", "codeium", "cody",
            "continue", "plandex", "void", "supermaven", "augment",
            "magic.dev", "sweep", "trae", "roo",
        ],
    },
    {
        "slug": "image-video-ai",
        "title": "Image + Video AI Model Pronunciation",
        "h1": "How to pronounce image + video AI models",
        "desc": "Flux, Ideogram, Kling, Pika, Luma, Runway, Sora, Midjourney, DALL-E, ComfyUI.",
        "intro": (
            "Generative media has its own pronunciation gotchas — Flux from Black "
            "Forest Labs, Kling from Kuaishou, Pika, Luma — short single-syllable "
            "names that are easy to read wrong."
        ),
        "words": [
            "flux", "ideogram", "kling", "pika", "luma", "runway", "sora",
            "midjourney", "dall-e", "comfyui",
        ],
    },
    {
        "slug": "ai-eval-observability",
        "title": "LLM Eval and Observability Tool Pronunciation",
        "h1": "How to pronounce LLM eval + observability tools",
        "desc": "Braintrust, LangSmith, Langfuse, Helicone, PostHog, Ragas — LLMOps tool names.",
        "intro": (
            "Once you're running LLM apps in production you'll hit the eval and "
            "observability layer. Most tool names compound around 'lang', 'fuse', "
            "or 'helicone' — each pronounced differently than it looks."
        ),
        "words": [
            "braintrust", "langsmith", "langfuse", "helicone", "posthog",
            "ragas", "comet", "mlflow",
        ],
    },
    {
        "slug": "vector-databases",
        "title": "Vector Database Name Pronunciation",
        "h1": "How to pronounce vector databases",
        "desc": "Pinecone, Weaviate, Qdrant, Milvus, Chroma, Marqo, Meilisearch, Typesense.",
        "intro": (
            "Vector databases became table stakes for RAG. Names range from "
            "obvious English compounds (Pinecone) to deliberate misspellings "
            "(Qdrant) to Latin (Milvus). Audio for each."
        ),
        "words": [
            "pinecone", "weaviate", "qdrant", "milvus", "chroma", "marqo",
            "meilisearch", "typesense",
        ],
    },
    {
        "slug": "ai-frameworks",
        "title": "AI Agent + LLM Framework Pronunciation",
        "h1": "How to pronounce LLM agent frameworks",
        "desc": "LangChain, LlamaIndex, DSPy, AutoGen, CrewAI, SmolAgents, Letta, Phidata.",
        "intro": (
            "Every LLM agent framework picks a name that reads ambiguously. "
            "DSPy is letter-by-letter? CrewAI is two words? Phidata is fee-data? "
            "Audio settles it."
        ),
        "words": [
            "langchain", "llamaindex", "dspy", "autogen", "crewai",
            "smolagents", "letta", "phidata", "pydantic ai", "agno",
            "instructor", "marvin", "outlines", "guardrails", "litellm",
            "haystack",
        ],
    },
    {
        "slug": "ai-search",
        "title": "AI-Powered Search Engine Pronunciation",
        "h1": "How to pronounce AI search engines",
        "desc": "Perplexity, Exa, Tavily, Kagi, Firecrawl, Browserbase — AI-native search tool names.",
        "intro": (
            "AI-native search and crawling tools share a naming convention: short "
            "and weird. Exa, Tavily, Kagi — all four-letter brands with no "
            "obvious reading."
        ),
        "words": [
            "perplexity", "exa", "tavily", "kagi", "firecrawl", "browserbase",
        ],
    },
]


# ---------------------------------------------------------------------------
# Comparison / disambiguation pairs
# ---------------------------------------------------------------------------
COMPARES = [
    {
        "pair": ("groq", "grok"),
        "title": "Groq vs Grok — same sound, different companies",
        "h1": "How to pronounce Groq vs Grok",
        "angle": (
            "Both are pronounced the same way (\"GRAHK\") but they're completely "
            "different things. Groq is an AI inference chip startup that filed "
            "the trademark in 2016. Grok is xAI's chatbot, named after Heinlein's "
            "1961 sci-fi novel <em>Stranger in a Strange Land</em>. xAI did pay "
            "Groq a settlement, but the chip company keeps the name."
        ),
    },
    {
        "pair": ("gemma", "gemini"),
        "title": "Gemma vs Gemini — Google's two model families",
        "h1": "How to pronounce Gemma vs Gemini",
        "angle": (
            "Both come from Google DeepMind. Gemma (\"JEM-uh\") is the open-weights "
            "small model family. Gemini (\"JEM-uh-nye\") is the flagship multimodal "
            "chatbot. Same Latin/zodiac root, but distinct readings — Gemma ends "
            "in a soft schwa, Gemini ends in a long <em>-nye</em>."
        ),
    },
    {
        "pair": ("kubectl", "kubernetes"),
        "title": "kubectl vs Kubernetes — settled vs contested",
        "h1": "How to pronounce kubectl vs Kubernetes",
        "angle": (
            "Kubernetes is settled (\"koo-ber-NET-eez\"). kubectl is the long-running "
            "K8s joke — Kelsey Hightower and many maintainers say \"koob-control\", "
            "the community meme is \"cube-cuddle\", and plenty of people just spell "
            "it out. We document every reading."
        ),
    },
    {
        "pair": ("doubao", "baichuan"),
        "title": "Doubao vs Baichuan — Pinyin AI lab names",
        "h1": "How to pronounce Doubao vs Baichuan",
        "angle": (
            "Two of China's most-cited AI labs. Doubao (豆包, ByteDance) is "
            "\"doh-BOW\" — the BOW as in bow-and-arrow. Baichuan (百川) is "
            "\"BYE-chwahn.\" Both follow standard Mandarin Pinyin, but English "
            "speakers tend to spell them out letter by letter instead."
        ),
    },
    {
        "pair": ("qwen", "kimi"),
        "title": "Qwen vs Kimi — Alibaba vs Moonshot",
        "h1": "How to pronounce Qwen vs Kimi",
        "angle": (
            "Two of China's top consumer chatbots. Qwen (Alibaba, 通义千问) is "
            "a single syllable \"KWEN\" — rhymes with \"when.\" Kimi (Moonshot) "
            "is two syllables \"KEE-mee.\" Both are designed to read easily in "
            "English, but Qwen routinely gets spelled out as Q-W-E-N."
        ),
    },
    {
        "pair": ("cursor", "windsurf"),
        "title": "Cursor vs Windsurf — the two AI IDEs",
        "h1": "How to pronounce Cursor vs Windsurf",
        "angle": (
            "Both names happen to be straightforward English — \"KER-ser\" and "
            "\"WIND-surf\" — but they're the most-confused pair in AI tooling. "
            "Cursor (by Anysphere) shipped first; Windsurf (by Codeium) came "
            "later. If you're saying one when you mean the other, this is the page."
        ),
    },
    {
        "pair": ("llama", "llamaindex"),
        "title": "Llama vs LlamaIndex — Meta's model vs the RAG framework",
        "h1": "How to pronounce Llama vs LlamaIndex",
        "angle": (
            "Meta's LLM Llama is \"LAH-muh\" — the animal. LlamaIndex (formerly "
            "GPT Index) is the RAG framework, also \"LAH-muh-INDEX.\" Same "
            "leading word, different scopes."
        ),
    },
    {
        "pair": ("postgres", "postgresql"),
        "title": "Postgres vs PostgreSQL — same DB, two names",
        "h1": "How to pronounce Postgres vs PostgreSQL",
        "angle": (
            "Same database. Postgres (\"POST-gress\") is the short colloquial "
            "name; PostgreSQL (\"POST-gress-Q-L\" or \"POST-gress sequel\") is "
            "the official name documented on the project site. Both readings of "
            "PostgreSQL appear in the wild — the official FAQ accepts \"post-gres-Q-L\"."
        ),
    },
    {
        "pair": ("hermes", "aaru"),
        "title": "Hermes vs Aaru — Nous Research model vs forecasting startup",
        "h1": "How to pronounce Hermes vs Aaru",
        "angle": (
            "Two AI brands with mythology origins. Hermes (\"HER-meez\") is "
            "Nous Research's open-weights LLM series — Greek messenger god. "
            "Aaru (\"AH-roo\") is the AI poll-simulation startup — Egyptian "
            "afterlife \"field of reeds.\" Both routinely mispronounced."
        ),
    },
    {
        "pair": ("claude", "gpt"),
        "title": "Claude vs GPT — the two model families",
        "h1": "How to pronounce Claude vs GPT",
        "angle": (
            "Claude (Anthropic) is the French given name \"KLOHD\" — silent <em>e</em>, "
            "rhymes with \"glowed.\" GPT (OpenAI) is always spelled out "
            "\"G-P-T\" — Generative Pretrained Transformer. Both are model "
            "families, not single models."
        ),
    },
]


# ---------------------------------------------------------------------------
# Page templates
# ---------------------------------------------------------------------------
def navbar(prefix: str) -> str:
    """Top navbar. `prefix` is the relative path to the doc root (e.g. '..')."""
    return f"""  <nav class="topbar">
    <div class="brand"><a href="{prefix}/">🔊 {BRAND}</a></div>
    <div class="links">
      <a href="{prefix}/browse">Browse all</a>
      <a href="{prefix}/collection/">Collections</a>
      <a href="{prefix}/compare/">Compare</a>
      <a href="{prefix}/quiz">Quiz</a>
      <a href="{prefix}/zh" hreflang="zh-Hans" lang="zh-Hans">中文</a>
      <a href="https://github.com/{GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>
"""


def head_common(title: str, desc: str, canonical: str, lang: str = "en",
                style_prefix: str = "..", og_image: str | None = None,
                hreflang_pairs: list[tuple[str, str]] | None = None) -> str:
    lines = [
        f'<!DOCTYPE html>',
        f'<html lang="{lang}">',
        f'<head>',
        f'  <meta charset="utf-8">',
        f'  <meta name="viewport" content="width=device-width, initial-scale=1">',
        f'  <title>{esc(title)} — {BRAND}</title>',
        f'  <meta name="description" content="{esc(desc)}">',
        f'  <link rel="canonical" href="{canonical}">',
    ]
    for hl, href in (hreflang_pairs or []):
        lines.append(f'  <link rel="alternate" hreflang="{hl}" href="{href}">')
    if og_image:
        lines += [
            f'  <meta property="og:title" content="{esc(title)}">',
            f'  <meta property="og:description" content="{esc(desc)}">',
            f'  <meta property="og:type" content="article">',
            f'  <meta property="og:url" content="{canonical}">',
            f'  <meta property="og:image" content="{og_image}">',
            f'  <meta property="og:image:width" content="1200">',
            f'  <meta property="og:image:height" content="630">',
            f'  <meta name="twitter:card" content="summary_large_image">',
            f'  <meta name="twitter:title" content="{esc(title)}">',
            f'  <meta name="twitter:description" content="{esc(desc)}">',
            f'  <meta name="twitter:image" content="{og_image}">',
        ]
    lines += [
        f'  <link rel="manifest" href="/manifest.webmanifest">',
        f'  <meta name="theme-color" content="#ff6a3d">',
        f'  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">',
        f'  <link rel="apple-touch-icon" href="/apple-touch-icon.png">',
        f'  <link rel="stylesheet" href="{style_prefix}/style.css">',
        f'  <script defer src="/_vercel/insights/script.js"></script>',
    ]
    return "\n".join(lines)


def footer(prefix: str = "..") -> str:
    return f"""  <a class="gh-float" href="https://github.com/{GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>
  <footer class="footer">
    <p>{BRAND} · MIT · <a href="https://github.com/{GH_REPO}">GitHub</a></p>
  </footer>
  <script src="{prefix}/script.js"></script>
</body>
</html>
"""


# ---------------------------------------------------------------------------
# Collection page emitter
# ---------------------------------------------------------------------------
def emit_collection(coll: dict, by_slug: dict, out_dir: Path) -> None:
    slug = coll["slug"]
    # Clean URL (Vercel cleanUrls) — the file on disk is still <slug>.html.
    canonical = f"{SITE_URL}/collection/{slug}"
    rows = []
    found_words = []
    for w in coll["words"]:
        s = slugify(w)
        e = by_slug.get(s)
        if not e:
            continue
        found_words.append(e)
        rows.append(
            f'<tr>'
            f'<td><a href="/word/{e["slug"]}">{esc(e["word"])}</a></td>'
            f'<td><button class="play-btn play-row" onclick="(new Audio(\'/audio/{e["slug"]}.mp3\')).play()" aria-label="Play {esc(e["word"])}">▶</button></td>'
            f'<td class="resp-cell">{esc(e["resp"])}</td>'
            f'<td><code>{esc(e["ipa"])}</code></td>'
            f'<td><span class="badge badge-{esc(e["cat"])}">{esc(e["cat"])}</span></td>'
            f'</tr>'
        )

    # JSON-LD: ItemList for the words, plus CollectionPage
    item_list = [
        {
            "@type": "ListItem",
            "position": i + 1,
            "name": e["word"],
            "url": f"{SITE_URL}/word/{e['slug']}",
        }
        for i, e in enumerate(found_words)
    ]
    jsonld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": f"{canonical}#page",
                "name": coll["title"],
                "description": coll["desc"],
                "url": canonical,
                "inLanguage": "en-US",
                "isPartOf": {"@type": "WebSite", "name": BRAND, "url": f"{SITE_URL}/"},
            },
            {
                "@type": "ItemList",
                "@id": f"{canonical}#list",
                "name": coll["title"],
                "numberOfItems": len(item_list),
                "itemListElement": item_list,
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": BRAND, "item": f"{SITE_URL}/"},
                    {"@type": "ListItem", "position": 2, "name": "Collections", "item": f"{SITE_URL}/collection/"},
                    {"@type": "ListItem", "position": 3, "name": coll["title"], "item": canonical},
                ],
            },
        ],
    }

    html = head_common(
        title=coll["title"],
        desc=coll["desc"],
        canonical=canonical,
        og_image=f"{SITE_URL}/og.png",
    )
    html += f'\n  <script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>\n'
    html += "</head>\n<body>\n"
    html += f'  <div class="gh-banner">⭐ <a href="https://github.com/{GH_REPO}">Star on GitHub</a> — community pronunciation dictionary</div>\n'
    html += navbar("..")
    html += f"""  <div class="container-narrow word-page">
    <p style="font-size: 13px; color: var(--muted);"><a href="/collection/">← All collections</a></p>
    <h1>{esc(coll["h1"])}</h1>
    <p class="subtitle" style="margin-bottom: 24px;">{esc(coll["desc"])}</p>
    <section class="prose">
      <p>{coll["intro"]}</p>
    </section>
    <table class="entry-table" style="width:100%; margin: 24px 0; border-collapse: collapse;">
      <thead><tr><th align="left">Word</th><th>Audio</th><th align="left">Respelling</th><th align="left">IPA</th><th align="left">Category</th></tr></thead>
      <tbody>{''.join(rows)}</tbody>
    </table>
    <section class="prose">
      <p>Tap a word to open its full dictionary entry — every page has audio, alternate readings, sources, and CLI examples.</p>
    </section>
    <section class="related" style="margin-top: 36px;">
      <h2>Other collections</h2>
      <ul>
"""
    for other in COLLECTIONS:
        if other["slug"] == slug:
            continue
        html += f'        <li><a href="/collection/{other["slug"]}">{esc(other["title"])}</a></li>\n'
    html += """      </ul>
    </section>
  </div>
"""
    html += footer("..")
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"{slug}.html").write_text(html, encoding="utf-8")


def emit_collection_index(out_dir: Path) -> None:
    canonical = f"{SITE_URL}/collection/"
    html = head_common(
        title="Pronunciation collections by topic",
        desc="Curated pronunciation guides: AI startups, LLM models, Chinese AI labs, vector databases, coding agents, and more.",
        canonical=canonical,
        og_image=f"{SITE_URL}/og.png",
    )
    html += "\n</head>\n<body>\n"
    html += f'  <div class="gh-banner">⭐ <a href="https://github.com/{GH_REPO}">Star on GitHub</a></div>\n'
    html += navbar("..")
    html += """  <div class="container-narrow word-page">
    <h1>Pronunciation collections</h1>
    <p class="subtitle">Topic-clustered guides — drop a co-worker on any of these and they'll never mispronounce another AI tool name in standup.</p>
    <section class="prose">
      <ul>
"""
    for c in COLLECTIONS:
        html += f'        <li style="margin: 14px 0;"><a href="/collection/{c["slug"]}"><strong>{esc(c["title"])}</strong></a><br><span style="color: var(--muted);">{esc(c["desc"])}</span></li>\n'
    html += """      </ul>
    </section>
  </div>
"""
    html += footer("..")
    (out_dir / "index.html").write_text(html, encoding="utf-8")


# ---------------------------------------------------------------------------
# Compare page emitter
# ---------------------------------------------------------------------------
def emit_compare(pair_cfg: dict, by_slug: dict, out_dir: Path) -> None:
    a_slug, b_slug = pair_cfg["pair"]
    a = by_slug.get(a_slug)
    b = by_slug.get(b_slug)
    if not a or not b:
        return
    pair_slug = f"{a_slug}-vs-{b_slug}"
    # Clean URL (Vercel cleanUrls) — the file on disk is still <pair>.html.
    canonical = f"{SITE_URL}/compare/{pair_slug}"

    jsonld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f"How is {a['word']} pronounced?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f"{a['word']} is pronounced \"{a['resp']}\" ({a['ipa']})." + (f" {a['notes']}" if a["notes"] else ""),
                },
            },
            {
                "@type": "Question",
                "name": f"How is {b['word']} pronounced?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f"{b['word']} is pronounced \"{b['resp']}\" ({b['ipa']})." + (f" {b['notes']}" if b["notes"] else ""),
                },
            },
            {
                "@type": "Question",
                "name": f"Are {a['word']} and {b['word']} the same?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": _html.unescape(re.sub("<[^>]+>", "", pair_cfg["angle"])),
                },
            },
        ],
    }

    desc = f"{a['word']} ({a['resp']}) vs {b['word']} ({b['resp']}) — audio comparison + when each is used."

    html = head_common(
        title=pair_cfg["title"],
        desc=desc,
        canonical=canonical,
        og_image=f"{SITE_URL}/og.png",
    )
    html += f'\n  <script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>\n'
    html += "</head>\n<body>\n"
    html += f'  <div class="gh-banner">⭐ <a href="https://github.com/{GH_REPO}">Star on GitHub</a></div>\n'
    html += navbar("..")
    html += f"""  <div class="container-narrow word-page">
    <p style="font-size: 13px; color: var(--muted);"><a href="/compare/">← All comparisons</a></p>
    <h1>{esc(pair_cfg["h1"])}</h1>
    <section class="prose">
      <p>{pair_cfg["angle"]}</p>
    </section>
    <div class="panel" style="margin-bottom: 16px;">
      <div class="panel-row">
        <button class="play-btn play-primary" onclick="(new Audio('/audio/{a['slug']}.mp3')).play()" aria-label="Play {esc(a['word'])}">▶</button>
        <span class="resp-large"><a href="/word/{a['slug']}" style="color: inherit;">{esc(a['word'])}</a></span>
        <span class="ipa">{esc(a['ipa'])}</span>
        <span style="color: var(--muted);">— {esc(a['resp'])}</span>
      </div>
    </div>
    <div class="panel" style="margin-bottom: 24px;">
      <div class="panel-row">
        <button class="play-btn play-primary" onclick="(new Audio('/audio/{b['slug']}.mp3')).play()" aria-label="Play {esc(b['word'])}">▶</button>
        <span class="resp-large"><a href="/word/{b['slug']}" style="color: inherit;">{esc(b['word'])}</a></span>
        <span class="ipa">{esc(b['ipa'])}</span>
        <span style="color: var(--muted);">— {esc(b['resp'])}</span>
      </div>
    </div>
    <section class="prose">
      <h2>Side-by-side</h2>
      <table class="entry-table" style="width:100%; border-collapse: collapse;">
        <thead><tr><th align="left"></th><th align="left">{esc(a['word'])}</th><th align="left">{esc(b['word'])}</th></tr></thead>
        <tbody>
          <tr><td><strong>IPA</strong></td><td><code>{esc(a['ipa'])}</code></td><td><code>{esc(b['ipa'])}</code></td></tr>
          <tr><td><strong>Respelling</strong></td><td>{esc(a['resp'])}</td><td>{esc(b['resp'])}</td></tr>
          <tr><td><strong>Category</strong></td><td>{esc(a['cat'])}</td><td>{esc(b['cat'])}</td></tr>
          <tr><td><strong>Confidence</strong></td><td>{esc(a['conf'])}</td><td>{esc(b['conf'])}</td></tr>
        </tbody>
      </table>
      <p>Open the full dictionary entry for sources and alternate readings: <a href="/word/{a['slug']}">{esc(a['word'])}</a> · <a href="/word/{b['slug']}">{esc(b['word'])}</a>.</p>
    </section>
    <section class="related" style="margin-top: 36px;">
      <h2>More comparisons</h2>
      <ul>
"""
    for other in COMPARES:
        oa, ob = other["pair"]
        if (oa, ob) == (a_slug, b_slug):
            continue
        html += f'        <li><a href="/compare/{oa}-vs-{ob}">{esc(other["title"])}</a></li>\n'
    html += """      </ul>
    </section>
  </div>
"""
    html += footer("..")
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"{pair_slug}.html").write_text(html, encoding="utf-8")


def emit_compare_index(out_dir: Path, by_slug: dict) -> None:
    canonical = f"{SITE_URL}/compare/"
    html = head_common(
        title="Pronunciation comparisons — same sound, different brands",
        desc="Side-by-side pronunciation pages: Groq vs Grok, Gemma vs Gemini, Qwen vs Kimi, and more.",
        canonical=canonical,
        og_image=f"{SITE_URL}/og.png",
    )
    html += "\n</head>\n<body>\n"
    html += f'  <div class="gh-banner">⭐ <a href="https://github.com/{GH_REPO}">Star on GitHub</a></div>\n'
    html += navbar("..")
    html += """  <div class="container-narrow word-page">
    <h1>Pronunciation comparisons</h1>
    <p class="subtitle">Same-sound, different-spelling pairs. Same root, different products. We document the differences.</p>
    <section class="prose">
      <ul>
"""
    for cp in COMPARES:
        a_slug, b_slug = cp["pair"]
        if a_slug not in by_slug or b_slug not in by_slug:
            continue
        html += f'        <li style="margin: 14px 0;"><a href="/compare/{a_slug}-vs-{b_slug}"><strong>{esc(cp["title"])}</strong></a></li>\n'
    html += """      </ul>
    </section>
  </div>
"""
    html += footer("..")
    (out_dir / "index.html").write_text(html, encoding="utf-8")


# ---------------------------------------------------------------------------
# Chinese per-word page emitter
# ---------------------------------------------------------------------------
def _cat_zh(cat: str) -> str:
    return {
        "project": "项目",
        "product": "产品",
        "cli-tool": "命令行工具",
        "tool": "工具",
        "cs-term": "计算机术语",
        "acronym": "缩写",
        "abbreviation": "简称",
    }.get(cat, cat)


def _conf_zh(conf: str) -> str:
    return {
        "creator-clarified": "创作者已明确",
        "community-consensus": "社区共识",
        "contested": "存在争议",
    }.get(conf, conf)


def emit_zh_word(e: dict, out_dir: Path) -> None:
    slug = e["slug"]
    # Clean URL (Vercel cleanUrls) — the file on disk is still <slug>.html.
    canonical = f"{SITE_URL}/zh/word/{slug}"
    en_url = f"{SITE_URL}/word/{slug}"
    title = f"{e['word']} 怎么读 — 中文发音指南"
    # Meta description stays Chinese-only. The `notes` field is English editorial
    # prose; appending it leaked English into the zh <meta>/og/twitter description
    # (truncated mid-sentence). Keep the description a clean, self-contained zh line.
    desc = (
        f"{e['word']} 的标准读音是「{e['resp']}」（{e['ipa']}）。"
        f"{BRAND} 收录的{_cat_zh(e['cat'])}发音，附音频、IPA 与来源。"
    )
    if len(desc) > 200:
        desc = desc[:200] + "…"

    # Alternates
    alt_html = ""
    if e["alt_resp"]:
        alts = e["alt_resp"].split("|")
        alt_ipas = e["alt_ipa"].split("|") if e["alt_ipa"] else []
        items = []
        for i, a in enumerate(alts):
            if not a:
                continue
            ai = alt_ipas[i] if i < len(alt_ipas) else ""
            items.append(
                '<li class="alt-row">'
                f'<button class="play-btn play-alt" onclick="zhSpeak(\'{js_arg(a)}\')" aria-label="播放其他读法">▶</button> '
                f'<strong>「{esc(a)}」</strong>' + (f' <code>{esc(ai)}</code>' if ai else "") + '</li>'
            )
        if items:
            alt_html = '<p>其他读法：</p><ul class="alt-list">' + "".join(items) + '</ul>'

    src_html = ""
    if e["src_url"]:
        src_html = f'<p><strong>来源：</strong><a href="{esc(e["src_url"])}" target="_blank" rel="noopener">{esc(e["src_label"] or e["src_url"])}</a></p>'

    jsonld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": f"{canonical}#webpage",
                "name": f"{e['word']} 怎么读",
                "description": f"{e['word']} 的标准读音是「{e['resp']}」（{e['ipa']}）。",
                "url": canonical,
                "inLanguage": "zh-CN",
                "isPartOf": {"@type": "WebSite", "name": BRAND, "url": f"{SITE_URL}/"},
            },
            {
                "@type": "AudioObject",
                "@id": f"{SITE_URL}/audio/{slug}.mp3#audio",
                "name": f"{e['word']} 发音",
                "description": f"{e['word']} 的标准发音 — 「{e['resp']}」。",
                "contentUrl": f"{SITE_URL}/audio/{slug}.mp3",
                "encodingFormat": "audio/mpeg",
                "inLanguage": "en-US",
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": BRAND, "item": f"{SITE_URL}/"},
                    {"@type": "ListItem", "position": 2, "name": "中文", "item": f"{SITE_URL}/zh"},
                    {"@type": "ListItem", "position": 3, "name": e["word"], "item": canonical},
                ],
            },
        ],
    }

    html = head_common(
        title=title,
        desc=desc,
        canonical=canonical,
        lang="zh-CN",
        style_prefix="../..",
        og_image=f"{SITE_URL}/og/{slug}.png",
        hreflang_pairs=[
            ("zh-CN", canonical),
            ("zh-Hans", canonical),
            ("en", en_url),
            ("x-default", en_url),
        ],
    )
    html += f'\n  <link rel="preload" as="audio" href="{SITE_URL}/audio/{slug}.mp3" type="audio/mpeg">\n'
    html += f'  <script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>\n'
    html += "</head>\n<body>\n"
    html += f'  <div class="gh-banner">⭐ <a href="https://github.com/{GH_REPO}">在 GitHub 给个 Star</a> — 社区维护的发音词典</div>\n'
    html += f"""  <nav class="topbar">
    <div class="brand"><a href="../../">🔊 {BRAND}</a></div>
    <div class="links">
      <a href="../../zh">中文首页</a>
      <a href="../../browse" hreflang="en" lang="en">Browse (EN)</a>
      <a href="../../collection/" hreflang="en" lang="en">Collections</a>
      <a href="{en_url}" hreflang="en" lang="en">English version</a>
      <a href="https://github.com/{GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="切换主题">◐</button>
    </div>
  </nav>
"""
    html += f"""  <div class="container-narrow word-page">
    <h1>{esc(e['word'])} 怎么读</h1>
    <p class="subtitle"><span class="badge badge-{esc(e['cat'])}">{esc(_cat_zh(e['cat']))}</span> <span class="badge badge-{esc(e['conf'])}">{esc(_conf_zh(e['conf']))}</span></p>
    <div class="panel">
      <div class="panel-row">
        <button class="play-btn play-primary" onclick="zhPlay('{slug}')" aria-label="播放发音（朗读 3 次）">▶</button>
        <span class="resp-large">{esc(e['resp'])}</span>
        <span class="ipa">{esc(e['ipa'])}</span>
        <button class="copy-ipa" onclick="zhCopy('{js_arg(e['ipa'])}', this)" title="复制 IPA 到剪贴板">⧉ IPA</button>
        <a class="download-mp3" href="../../audio/{slug}.mp3" download="{slug}.mp3" title="下载 macOS Samantha 朗读版 (.mp3)">mp3</a>
      </div>
    </div>
    <section class="prose">
      <p><strong>{esc(e['word'])}</strong> 在英语中的标准读法是 <strong>「{esc(e['resp'])}」</strong>（{esc(e['ipa'])}）。</p>"""
    if e["notes"]:
        html += f'\n      <p class="en-note" lang="en">{esc(e["notes"])}</p>'
    html += f"""
      {alt_html}
      {src_html}
      <p>读对项目名只是工程师文化的一部分 — 但开会时被人轻轻纠正、或者在 podcast 上被嘉宾礼貌打断的滋味，并不好受。<strong>{BRAND}</strong> 是一个开源的开发者词汇发音词典，每条都标注来源、信心等级，并且有预渲染的音频可以直接听。</p>
    </section>

    <aside class="editor-cta">
      <h2>不用查第二次 — 在编辑器里直接听</h2>
      <p>装上 <strong>Pronounce</strong> 扩展，在编辑器里<strong>悬停</strong> {esc(e['word'])}（或任意技术词）就能听到读音，附 IPA 和来源，无需离开代码。中文环境下界面自动切中文。</p>
      <div class="cta-row">
        <a class="btn" href="https://marketplace.visualstudio.com/items?itemName=sayit.pronounce">安装到 VS Code</a>
        <a class="btn secondary" href="https://open-vsx.org/extension/sayit/pronounce">Open VSX</a>
        <span class="editors">也支持 Cursor · Windsurf · VSCodium · Zed</span>
      </div>
    </aside>

    <h2>在命令行里听</h2>
    <div class="cli-howto">
      <div><span class="prompt">$</span> say-it {esc(e['word'])}<span style="color: var(--muted)">  # 主读音 × 3 次</span></div>
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: var(--muted);">
      安装 CLI：<code>git clone https://github.com/{GH_REPO}.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
    </p>
    <section class="related" style="margin-top: 36px;">
      <h2>查看英文完整词条</h2>
      <p><a href="{en_url}">→ {esc(e['word'])} on the English version</a></p>
    </section>
    <section class="related" style="margin-top: 24px;">
      <h2>更多中文词条</h2>
      <p><a href="../">← 回到中文词条索引</a></p>
    </section>
  </div>
  <script>
    // Self-contained audio helpers (no dependency on the global ENTRIES bundle).
    function zhPlay(s){{var n=0;(function go(){{if(n++>=3)return;var a=new Audio('../../audio/'+s+'.mp3');a.addEventListener('ended',go);a.play().catch(function(){{}});}})();}}
    function zhSpeak(t){{try{{var u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=0.9;speechSynthesis.cancel();speechSynthesis.speak(u);}}catch(e){{}}}}
    function zhCopy(t,btn){{if(navigator.clipboard){{navigator.clipboard.writeText(t).then(function(){{if(btn){{var o=btn.textContent;btn.textContent='已复制 ✓';setTimeout(function(){{btn.textContent=o;}},1200);}}}});}}}}
  </script>
"""
    html += footer("../..")
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"{slug}.html").write_text(html, encoding="utf-8")


def emit_zh_word_index(entries: list, out_dir: Path) -> None:
    canonical = f"{SITE_URL}/zh/word/"
    title = "全部词条 — 中文发音指南"
    desc = f"全部技术词汇的中文发音解释 — Anthropic、Cursor、Kubernetes 等 {len(entries)}+ 词条，附音频和 IPA。"
    html = head_common(
        title=title,
        desc=desc,
        canonical=canonical,
        lang="zh-CN",
        style_prefix="../..",
        og_image=f"{SITE_URL}/og.png",
        hreflang_pairs=[("en", f"{SITE_URL}/browse"), ("zh-CN", canonical)],
    )
    html += "\n</head>\n<body>\n"
    html += f'  <div class="gh-banner">⭐ <a href="https://github.com/{GH_REPO}">在 GitHub 给个 Star</a></div>\n'
    html += f"""  <nav class="topbar">
    <div class="brand"><a href="../../">🔊 {BRAND}</a></div>
    <div class="links">
      <a href="../../zh">中文首页</a>
      <a href="../../browse" hreflang="en" lang="en">Browse (EN)</a>
      <a href="https://github.com/{GH_REPO}">GitHub</a>
    </div>
  </nav>
"""
    html += f"""  <div class="container-narrow word-page">
    <h1>全部词条</h1>
    <p class="subtitle">{len(entries)} 个技术词汇 — 点击查看中文发音页（含音频）。</p>
    <input type="search" id="zh-filter" placeholder="搜索词条…" style="width: 100%; padding: 10px 14px; font-size: 16px; margin-bottom: 16px; box-sizing: border-box;">
    <ul id="zh-word-list" style="columns: 2; list-style: none; padding: 0;">
"""
    for e in sorted(entries, key=lambda x: x["word"].lower()):
        html += f'      <li style="break-inside: avoid; padding: 4px 0;"><a href="{e["slug"]}" data-word="{esc(e["word"].lower())}">{esc(e["word"])}</a> <span style="color: var(--muted); font-size: 13px;">{esc(e["resp"])}</span></li>\n'
    html += """    </ul>
    <script>
      const filter = document.getElementById('zh-filter');
      const items = document.querySelectorAll('#zh-word-list li');
      filter.addEventListener('input', () => {
        const q = filter.value.toLowerCase().trim();
        items.forEach(li => {
          const w = li.querySelector('a').dataset.word;
          li.style.display = !q || w.includes(q) ? '' : 'none';
        });
      });
    </script>
  </div>
"""
    html += footer("../..")
    (out_dir / "index.html").write_text(html, encoding="utf-8")


# ---------------------------------------------------------------------------
# Sitemap supplement
# ---------------------------------------------------------------------------
def emit_seo_sitemap(entries: list, by_slug: dict, out_path: Path) -> None:
    urls = []
    # Clean URLs only (Vercel cleanUrls: *.html 308-redirects to the
    # extensionless twin; sitemaps must never list redirecting URLs).
    urls.append((f"{SITE_URL}/collection/", "0.85", "weekly"))
    for c in COLLECTIONS:
        urls.append((f"{SITE_URL}/collection/{c['slug']}", "0.8", "weekly"))
    urls.append((f"{SITE_URL}/compare/", "0.85", "weekly"))
    for cp in COMPARES:
        a, b = cp["pair"]
        if a in by_slug and b in by_slug:
            urls.append((f"{SITE_URL}/compare/{a}-vs-{b}", "0.8", "weekly"))
    urls.append((f"{SITE_URL}/zh/word/", "0.85", "weekly"))
    for e in entries:
        urls.append((f"{SITE_URL}/zh/word/{e['slug']}", "0.7", "monthly"))
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, prio, cf in urls:
        lines.append(f'  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><changefreq>{cf}</changefreq><priority>{prio}</priority></url>')
    lines.append('</urlset>')
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def patch_sitemap_index() -> None:
    """Add sitemap-seo.xml to docs/sitemap-index.xml if not already present."""
    p = DOCS / "sitemap-index.xml"
    if not p.exists():
        return
    txt = p.read_text(encoding="utf-8")
    if "sitemap-seo.xml" in txt:
        return
    insert = f'  <sitemap><loc>{SITE_URL}/sitemap-seo.xml</loc><lastmod>{TODAY}</lastmod></sitemap>\n'
    txt = txt.replace("</sitemapindex>", insert + "</sitemapindex>")
    p.write_text(txt, encoding="utf-8")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    entries, by_slug = load_entries()
    print(f"Loaded {len(entries)} entries.")

    coll_dir = DOCS / "collection"
    comp_dir = DOCS / "compare"
    zh_word_dir = DOCS / "zh" / "word"

    for c in COLLECTIONS:
        emit_collection(c, by_slug, coll_dir)
    emit_collection_index(coll_dir)
    print(f"  → wrote {len(COLLECTIONS)} collection pages + index")

    n_comp = 0
    for cp in COMPARES:
        a, b = cp["pair"]
        if a in by_slug and b in by_slug:
            emit_compare(cp, by_slug, comp_dir)
            n_comp += 1
    emit_compare_index(comp_dir, by_slug)
    print(f"  → wrote {n_comp} comparison pages + index")

    for e in entries:
        emit_zh_word(e, zh_word_dir)
    emit_zh_word_index(entries, zh_word_dir)
    print(f"  → wrote {len(entries)} Chinese per-word pages + index")

    emit_seo_sitemap(entries, by_slug, DOCS / "sitemap-seo.xml")
    patch_sitemap_index()
    print("  → wrote sitemap-seo.xml + patched sitemap-index.xml")


if __name__ == "__main__":
    main()
