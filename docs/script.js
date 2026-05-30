// say-it dictionary — generated from data/pronunciations.tsv. Do not hand-edit.
const ENTRIES = [
  { w: "kubectl", ipa: "/ˈkuːb kənˌtroʊl/", r: "koob control", aIpa: "/ˈkjuːb kʌtəl/|/ˌkjuːb siː tiː ˈɛl/", aR: "cube cuddle|kube C T L", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "K8s community readings vary widely. \"koob-control\" is heard from Kelsey Hightower and many maintainers; \"cube-cuddle\" is the running meme; some say it letter-by-letter." },
  { w: "nginx", ipa: "/ˈɛn dʒɪnˈɛks/", r: "engine X", aIpa: "", aR: "", url: "https://nginx.org/en/", srcLabel: "NGINX official", cat: "product", conf: "creator-clarified", notes: "\"engine-x\" is the documented reading from the official site." },
  { w: "GIF", ipa: "/dʒɪf/", r: "jif", aIpa: "", aR: "", url: "https://www.nytimes.com/2013/05/22/business/media/creator-of-the-gif-says-its-pronounced-jif.html", srcLabel: "Steve Wilhite, NYT (2013)", cat: "acronym", conf: "creator-clarified", notes: "Wilhite (creator): \"It's pronounced JIF, not GIF.\" Community remains split." },
  { w: "JSON", ipa: "/ˈdʒeɪsən/", r: "jay son", aIpa: "/ˈdʒiːˌsɒn/", aR: "jee son", url: "https://en.wikipedia.org/wiki/JSON#Pronunciation", srcLabel: "Wikipedia § Pronunciation", cat: "acronym", conf: "contested", notes: "Crockford uses \"JAY-son\"; \"JEE-son\" is also widespread. Wikipedia notes the variance." },
  { w: "SQL", ipa: "/ˈsiːkwəl/", r: "sequel", aIpa: "/ˌɛs kjuː ˈɛl/", aR: "S Q L", url: "https://en.wikipedia.org/wiki/SQL#Pronunciation", srcLabel: "Wikipedia § Pronunciation", cat: "acronym", conf: "contested", notes: "ANSI: \"S-Q-L\"; practitioner: \"sequel\" (heir to IBM SEQUEL)." },
  { w: "GUI", ipa: "/ˈɡuːi/", r: "gooey", aIpa: "/ˌdʒiː juː ˈaɪ/|/ɡwi/", aR: "G U I|gwee", url: "https://en.wikipedia.org/wiki/Graphical_user_interface", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"GOOEY\" is mainstream (matches Mandarin 故意 sound); \"G-U-I\" letter-by-letter is RMS/old-school; \"gwee\" is rare." },
  { w: "GNU", ipa: "/ɡnuː/", r: "guh new", aIpa: "", aR: "", url: "https://www.gnu.org/gnu/pronunciation.html", srcLabel: "GNU Project official", cat: "project", conf: "creator-clarified", notes: "One syllable, hard G, rhymes with \"new\". Page is a dedicated pronunciation FAQ." },
  { w: "Kubernetes", ipa: "/ˌkuːbərˈnɛtiːz/", r: "koober netteez", aIpa: "", aR: "", url: "https://kubernetes.io/", srcLabel: "K8s docs", cat: "product", conf: "community-consensus", notes: "\"koo-ber-NET-eez\". From Greek κυβερνήτης (helmsman)." },
  { w: "k8s", ipa: "/keɪts/", r: "kates", aIpa: "/ˌkeɪ eɪ ɛs/", aR: "K eight S", url: "", srcLabel: "dev community", cat: "abbreviation", conf: "community-consensus", notes: "\"kates\" (8 letters between K and s) — community shorthand." },
  { w: "helm", ipa: "/hɛlm/", r: "helm", aIpa: "", aR: "", url: "https://helm.sh/", srcLabel: "Helm docs", cat: "tool", conf: "community-consensus", notes: "\"helm\" (the steering wheel)." },
  { w: "Istio", ipa: "/ˈɪstioʊ/", r: "iss tee oh", aIpa: "", aR: "", url: "https://istio.io/", srcLabel: "Istio docs", cat: "product", conf: "community-consensus", notes: "\"ISS-tee-oh\". Greek for \"to sail\"." },
  { w: "Envoy", ipa: "/ˈɛnˌvɔɪ/", r: "en voy", aIpa: "", aR: "", url: "https://www.envoyproxy.io/", srcLabel: "Envoy docs", cat: "product", conf: "community-consensus", notes: "\"EN-voy\"." },
  { w: "Prometheus", ipa: "/prəˈmiːθiəs/", r: "pro mee thee us", aIpa: "", aR: "", url: "https://prometheus.io/", srcLabel: "Prometheus docs", cat: "product", conf: "community-consensus", notes: "\"pro-MEE-thee-uss\"." },
  { w: "Grafana", ipa: "/ɡrəˈfɑːnə/", r: "gra fah na", aIpa: "", aR: "", url: "https://grafana.com/", srcLabel: "Grafana site", cat: "product", conf: "community-consensus", notes: "\"gra-FAH-na\" is the most common community reading." },
  { w: "Terraform", ipa: "/ˈtɛrəˌfɔːrm/", r: "terra form", aIpa: "", aR: "", url: "https://www.terraform.io/", srcLabel: "HashiCorp docs", cat: "tool", conf: "community-consensus", notes: "\"TERR-uh-form\"." },
  { w: "Argo", ipa: "/ˈɑːrɡoʊ/", r: "ar go", aIpa: "", aR: "", url: "https://argoproj.github.io/", srcLabel: "Argo project", cat: "product", conf: "community-consensus", notes: "\"AR-go\"." },
  { w: "Knative", ipa: "/ˈkeɪˌneɪtɪv/", r: "kay native", aIpa: "", aR: "", url: "https://knative.dev/", srcLabel: "knative.dev", cat: "product", conf: "community-consensus", notes: "\"KAY-native\" — the K is voiced, like saying the letter K then \"native\". Maintainer usage in talks (CNCF / KubeCon sessions); no official FAQ entry on knative.dev as of this writing." },
  { w: "Cassandra", ipa: "/kəˈsændrə/", r: "kuh sandra", aIpa: "", aR: "", url: "https://cassandra.apache.org/", srcLabel: "Apache Cassandra", cat: "product", conf: "community-consensus", notes: "\"kuh-SAN-druh\"." },
  { w: "Redis", ipa: "/ˈrɛdɪs/", r: "red iss", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Redis", srcLabel: "Wikipedia § Redis", cat: "product", conf: "community-consensus", notes: "\"RED-iss\". Wikipedia opens with 'Redis (/ˈrɛdɪs/)' citing the Redis FAQ; Salvatore Sanfilippo (antirez, creator) uses the same reading in screencasts." },
  { w: "Ceph", ipa: "/sɛf/", r: "seff", aIpa: "", aR: "", url: "https://ceph.io/en/", srcLabel: "Ceph docs", cat: "product", conf: "community-consensus", notes: "One syllable: \"seff\"." },
  { w: "etcd", ipa: "/ˌɛt siː ˈdiː/", r: "et C D", aIpa: "", aR: "", url: "https://etcd.io/docs/v3.5/faq/", srcLabel: "etcd FAQ", cat: "product", conf: "creator-clarified", notes: "Project FAQ documents \"et-cetera-distributed\"." },
  { w: "containerd", ipa: "/kənˈteɪnər diː/", r: "container D", aIpa: "", aR: "", url: "https://containerd.io/", srcLabel: "containerd", cat: "product", conf: "community-consensus", notes: "\"container-D\" (the D is for \"daemon\")." },
  { w: "runc", ipa: "/rʌn ˈsiː/", r: "run C", aIpa: "", aR: "", url: "https://github.com/opencontainers/runc", srcLabel: "OCI runc", cat: "tool", conf: "community-consensus", notes: "\"run-C\"." },
  { w: "Podman", ipa: "/ˈpɑːdmən/", r: "pod man", aIpa: "", aR: "", url: "https://podman.io/", srcLabel: "Podman site", cat: "tool", conf: "community-consensus", notes: "\"POD-man\"." },
  { w: "PostgreSQL", ipa: "/ˈpoʊstɡrɛs kjuː ˈɛl/", r: "post gress Q L", aIpa: "", aR: "", url: "https://www.postgresql.org/docs/current/faq.html", srcLabel: "PostgreSQL FAQ", cat: "product", conf: "creator-clarified", notes: "FAQ documents \"post-gres-Q-L\" as official." },
  { w: "Postgres", ipa: "/ˈpoʊstɡrɛs/", r: "post gress", aIpa: "", aR: "", url: "https://www.postgresql.org/docs/current/faq.html", srcLabel: "PostgreSQL FAQ", cat: "product", conf: "creator-clarified", notes: "\"POST-gress\"." },
  { w: "SQLite", ipa: "/ˌɛs kjuː ɛl ˈaɪt/", r: "S Q L ite", aIpa: "/ˈsiːkwəl laɪt/", aR: "sequel ite", url: "https://www.sqlite.org/famous.html", srcLabel: "SQLite docs", cat: "product", conf: "community-consensus", notes: "\"S-Q-L-ite\" preferred (per project lore)." },
  { w: "MySQL", ipa: "/ˌmaɪ ɛs kjuː ˈɛl/", r: "my S Q L", aIpa: "", aR: "", url: "https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html", srcLabel: "MySQL docs", cat: "product", conf: "creator-clarified", notes: "Official: \"my-S-Q-L\". \"my-sequel\" is common informal." },
  { w: "MongoDB", ipa: "/ˈmɒŋɡoʊ diː biː/", r: "mongo D B", aIpa: "", aR: "", url: "https://www.mongodb.com/", srcLabel: "MongoDB site", cat: "product", conf: "community-consensus", notes: "\"MONG-oh-D-B\"." },
  { w: "ScyllaDB", ipa: "/ˈsɪlə diː biː/", r: "silla D B", aIpa: "", aR: "", url: "https://www.scylladb.com/", srcLabel: "ScyllaDB", cat: "product", conf: "community-consensus", notes: "\"SILL-uh-D-B\"." },
  { w: "ClickHouse", ipa: "/ˈklɪkˌhaʊs/", r: "click house", aIpa: "", aR: "", url: "https://clickhouse.com/", srcLabel: "ClickHouse", cat: "product", conf: "community-consensus", notes: "\"CLICK-house\"." },
  { w: "DuckDB", ipa: "/ˈdʌk diː biː/", r: "duck D B", aIpa: "", aR: "", url: "https://duckdb.org/", srcLabel: "DuckDB", cat: "product", conf: "community-consensus", notes: "\"DUCK-D-B\"." },
  { w: "Linux", ipa: "/ˈlɪnəks/", r: "linnix", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Linux#Pronunciation", srcLabel: "Wikipedia § Pronunciation", cat: "product", conf: "community-consensus", notes: "Linus's own pronunciation is \"LIN-ux\" (short I, schwa). Wikipedia documents the variants." },
  { w: "Debian", ipa: "/ˈdɛbiən/", r: "deb ee un", aIpa: "", aR: "", url: "https://www.debian.org/intro/about", srcLabel: "Debian about", cat: "product", conf: "creator-clarified", notes: "\"DEB-ee-uhn\" — portmanteau of Debra + Ian Murdock, documented on the about page." },
  { w: "Ubuntu", ipa: "/ʊˈbʊntuː/", r: "oo boon too", aIpa: "", aR: "", url: "https://ubuntu.com/", srcLabel: "Ubuntu", cat: "product", conf: "community-consensus", notes: "\"oo-BOON-too\" (Zulu)." },
  { w: "Arch", ipa: "/ɑːrtʃ/", r: "arch", aIpa: "", aR: "", url: "https://archlinux.org/", srcLabel: "Arch Linux", cat: "product", conf: "community-consensus", notes: "\"arch\" (one syllable)." },
  { w: "Nix", ipa: "/nɪks/", r: "nicks", aIpa: "", aR: "", url: "https://nixos.org/", srcLabel: "NixOS", cat: "product", conf: "community-consensus", notes: "\"nicks\"." },
  { w: "Django", ipa: "/ˈdʒæŋɡoʊ/", r: "jang go", aIpa: "", aR: "", url: "https://www.djangoproject.com/foundation/faq/", srcLabel: "Django FAQ", cat: "product", conf: "creator-clarified", notes: "FAQ documents \"JANG-go\" — silent D, like jazz guitarist Django Reinhardt." },
  { w: "Vue", ipa: "/vjuː/", r: "view", aIpa: "", aR: "", url: "https://github.com/vuejs/vue#readme", srcLabel: "Vue README", cat: "product", conf: "creator-clarified", notes: "\"view\". Vue 2 project README states verbatim: 'Vue (pronounced /vjuː/, like view)'. Same reading echoed on en.wikipedia.org/wiki/Vue.js." },
  { w: "Vite", ipa: "/viːt/", r: "veet", aIpa: "", aR: "", url: "https://github.com/vitejs/vite#readme", srcLabel: "Vite README", cat: "product", conf: "creator-clarified", notes: "\"veet\". Project README states verbatim: 'Vite (French word for \"quick\", pronounced /viːt/, like \"veet\")'. README also links an mp3 of the pronunciation." },
  { w: "Pydantic", ipa: "/paɪˈdæntɪk/", r: "pie dantick", aIpa: "", aR: "", url: "https://docs.pydantic.dev/", srcLabel: "Pydantic docs", cat: "product", conf: "community-consensus", notes: "\"pie-DAN-tic\" — \"py\" pronounced \"pie\" (as in Python), then \"dantic\". Heard from Samuel Colvin (creator) in Talk Python To Me / FastAPI talks; no official FAQ entry on docs.pydantic.dev as of this writing." },
  { w: "Bun", ipa: "/bʌn/", r: "bun", aIpa: "", aR: "", url: "https://bun.sh/", srcLabel: "Bun docs", cat: "product", conf: "community-consensus", notes: "\"bun\" — like the bread." },
  { w: "Deno", ipa: "/ˈdiːnoʊ/", r: "dee no", aIpa: "", aR: "", url: "https://deno.com/", srcLabel: "Deno docs", cat: "product", conf: "community-consensus", notes: "\"DEE-no\"." },
  { w: "Hugo", ipa: "/ˈhjuːɡoʊ/", r: "hue go", aIpa: "", aR: "", url: "https://gohugo.io/", srcLabel: "Hugo", cat: "product", conf: "community-consensus", notes: "\"HUE-go\"." },
  { w: "Hono", ipa: "/ˈhoʊnoʊ/", r: "ho no", aIpa: "", aR: "", url: "https://hono.dev/", srcLabel: "Hono docs", cat: "product", conf: "community-consensus", notes: "Japanese for \"flame\": \"HOH-no\"." },
  { w: "Caddy", ipa: "/ˈkædi/", r: "caddy", aIpa: "", aR: "", url: "https://caddyserver.com/", srcLabel: "Caddy", cat: "product", conf: "community-consensus", notes: "\"CAD-ee\"." },
  { w: "Svelte", ipa: "/svɛlt/", r: "svelt", aIpa: "", aR: "", url: "https://svelte.dev/", srcLabel: "Svelte", cat: "product", conf: "community-consensus", notes: "\"svelt\" — one syllable." },
  { w: "Astro", ipa: "/ˈæstroʊ/", r: "astro", aIpa: "", aR: "", url: "https://astro.build/", srcLabel: "Astro", cat: "product", conf: "community-consensus", notes: "\"ASS-tro\"." },
  { w: "Pinia", ipa: "/ˈpiːnjə/", r: "pee nya", aIpa: "", aR: "", url: "https://pinia.vuejs.org/", srcLabel: "Pinia docs", cat: "product", conf: "community-consensus", notes: "\"PEE-nya\"." },
  { w: "LaTeX", ipa: "/ˈleɪtɛk/", r: "lay tek", aIpa: "", aR: "", url: "https://www.latex-project.org/about/", srcLabel: "LaTeX project", cat: "tool", conf: "creator-clarified", notes: "Lamport: \"lay-tek\" (or \"lah-tek\"); never \"lay-teks\". Documented on the about page." },
  { w: "TeX", ipa: "/tɛk/", r: "tek", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/TeX#Pronunciation_and_spelling", srcLabel: "Wikipedia § Pronunciation", cat: "tool", conf: "creator-clarified", notes: "Knuth: like \"tech\" — the X is a Greek chi." },
  { w: "char", ipa: "/tʃɑːr/", r: "char", aIpa: "/kɛər/|/kɑːr/", aR: "care|car", url: "", srcLabel: "dev community", cat: "cs-term", conf: "contested", notes: "\"char\" (rhymes with \"car\") in C/C++ camp; \"care\" and \"kar\" also used." },
  { w: "regex", ipa: "/ˈrɛdʒɛks/", r: "rej eks", aIpa: "/ˈrɛɡɛks/", aR: "reg eks", url: "", srcLabel: "dev community", cat: "cs-term", conf: "contested", notes: "\"REJ-eks\" (most common) vs \"REG-eks\"." },
  { w: "sudo", ipa: "/ˈsuːduː/", r: "soo doo", aIpa: "/ˈsuːdoʊ/", aR: "soo doh", url: "https://en.wikipedia.org/wiki/Sudo", srcLabel: "Wikipedia", cat: "cli-tool", conf: "contested", notes: "\"soo-doo\" (substitute-user-do, Bourne convention) vs \"soo-doh\"." },
  { w: "tmux", ipa: "/ˌtiː ˈmʌks/", r: "T mux", aIpa: "/ˈtiːmʌks/", aR: "tee mucks", url: "", srcLabel: "dev community", cat: "tool", conf: "contested", notes: "\"T-mux\" or \"TEE-mucks\"." },
  { w: "chmod", ipa: "/ˌtʃiː ˈmɒd/", r: "C H mod", aIpa: "/ˈtʃæmɒd/", aR: "chuh mod", url: "", srcLabel: "dev community", cat: "cli-tool", conf: "contested", notes: "\"CH-mod\" or \"chuh-MOD\"." },
  { w: "emacs", ipa: "/ˈiːmæks/", r: "ee max", aIpa: "", aR: "", url: "https://www.gnu.org/software/emacs/", srcLabel: "GNU Emacs", cat: "tool", conf: "community-consensus", notes: "\"EE-max\"." },
  { w: "zsh", ipa: "/ˌziː ˈʃɛl/", r: "Z shell", aIpa: "", aR: "", url: "https://zsh.sourceforge.io/", srcLabel: "zsh docs", cat: "tool", conf: "community-consensus", notes: "\"Z-shell\"." },
  { w: "WYSIWYG", ipa: "/ˈwɪziwɪɡ/", r: "whizzy wig", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/WYSIWYG", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"WIZ-ee-wig\"." },
  { w: "ASCII", ipa: "/ˈæski/", r: "ass key", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/ASCII", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"ASS-key\"." },
  { w: "Azure", ipa: "/ˈæʒər/", r: "azh er", aIpa: "", aR: "", url: "https://azure.microsoft.com/", srcLabel: "Microsoft", cat: "product", conf: "community-consensus", notes: "\"AZH-er\"." },
  { w: "AWS", ipa: "/ˌeɪ dʌbljuː ˈɛs/", r: "A W S", aIpa: "", aR: "", url: "https://aws.amazon.com/", srcLabel: "Amazon", cat: "product", conf: "community-consensus", notes: "\"A-W-S\" letter-by-letter." },
  { w: "GCP", ipa: "/ˌdʒiː siː ˈpiː/", r: "G C P", aIpa: "", aR: "", url: "https://cloud.google.com/", srcLabel: "Google Cloud", cat: "product", conf: "community-consensus", notes: "\"G-C-P\"." },
  { w: "SaaS", ipa: "/sæs/", r: "sass", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Software_as_a_service", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"sass\"." },
  { w: "PaaS", ipa: "/pæs/", r: "pass", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Platform_as_a_service", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"pass\"." },
  { w: "Numpy", ipa: "/ˈnʌmpaɪ/", r: "num pie", aIpa: "", aR: "", url: "https://numpy.org/", srcLabel: "NumPy docs", cat: "product", conf: "community-consensus", notes: "\"NUM-pie\"." },
  { w: "SciPy", ipa: "/ˈsaɪpaɪ/", r: "sigh pie", aIpa: "", aR: "", url: "https://scipy.org/", srcLabel: "SciPy docs", cat: "product", conf: "community-consensus", notes: "\"SIGH-pie\"." },
  { w: "Jupyter", ipa: "/ˈdʒuːpɪtər/", r: "joo pi ter", aIpa: "", aR: "", url: "https://jupyter.org/", srcLabel: "Jupyter docs", cat: "product", conf: "community-consensus", notes: "\"JOO-pi-tur\" — named after Jupiter (planet) + Julia, Python, R." },
  { w: "pandas", ipa: "/ˈpændəz/", r: "pandas", aIpa: "", aR: "", url: "https://pandas.pydata.org/", srcLabel: "pandas docs", cat: "product", conf: "community-consensus", notes: "\"PAN-duhz\"." },
  { w: "PyTorch", ipa: "/ˈpaɪtɔːrtʃ/", r: "pie torch", aIpa: "", aR: "", url: "https://pytorch.org/", srcLabel: "PyTorch", cat: "product", conf: "community-consensus", notes: "\"PIE-torch\"." },
  { w: "NaN", ipa: "/næn/", r: "nan", aIpa: "/ˌɛn eɪ ˈɛn/", aR: "N A N", url: "https://en.wikipedia.org/wiki/NaN", srcLabel: "Wikipedia", cat: "cs-term", conf: "contested", notes: "\"nan\" (rhymes with \"can\") or \"N-A-N\"." },
  { w: "enum", ipa: "/ˈiːnəm/", r: "ee num", aIpa: "", aR: "", url: "", srcLabel: "dev community", cat: "cs-term", conf: "community-consensus", notes: "\"EE-num\"." },
  { w: "Anthropic", ipa: "/ˌænθrəˈpɪk/", r: "anth row pick", aIpa: "", aR: "", url: "https://www.anthropic.com/", srcLabel: "Anthropic", cat: "product", conf: "community-consensus", notes: "\"an-THROW-pick\" — heard from Anthropic communications." },
  { w: "OpenAI", ipa: "/ˈoʊpən eɪ aɪ/", r: "open A I", aIpa: "", aR: "", url: "https://openai.com/", srcLabel: "OpenAI", cat: "product", conf: "community-consensus", notes: "\"OH-pen A-I\" letter-by-letter." },
  { w: "Claude", ipa: "/klɔːd/", r: "clawed", aIpa: "", aR: "", url: "https://www.anthropic.com/claude", srcLabel: "Anthropic", cat: "product", conf: "community-consensus", notes: "One syllable, rhymes with \"fraud\". Anthropic's LLM family." },
  { w: "Cohere", ipa: "/koʊˈhɪər/", r: "co here", aIpa: "", aR: "", url: "https://cohere.com/", srcLabel: "Cohere", cat: "product", conf: "community-consensus", notes: "\"co-HEER\", like the verb \"cohere\"." },
  { w: "Mistral", ipa: "/mɪˈstrɑːl/", r: "mis trahl", aIpa: "", aR: "", url: "https://mistral.ai/", srcLabel: "Mistral AI", cat: "product", conf: "community-consensus", notes: "\"miss-TRAL\" (French style; the wind)." },
  { w: "Ollama", ipa: "/oʊˈlɑːmə/", r: "oh la ma", aIpa: "", aR: "", url: "https://ollama.com/", srcLabel: "Ollama project", cat: "product", conf: "community-consensus", notes: "\"oh-LAH-mah\" — common community reading." },
  { w: "LangChain", ipa: "/ˈlæŋtʃeɪn/", r: "lang chain", aIpa: "", aR: "", url: "https://www.langchain.com/", srcLabel: "LangChain", cat: "product", conf: "community-consensus", notes: "\"LANG-chain\"." },
  { w: "LlamaIndex", ipa: "/ˈlɑːməˌɪndɛks/", r: "llama index", aIpa: "", aR: "", url: "https://www.llamaindex.ai/", srcLabel: "LlamaIndex", cat: "product", conf: "community-consensus", notes: "\"LLAH-mah index\"." },
  { w: "HuggingFace", ipa: "/ˈhʌɡɪŋˌfeɪs/", r: "hugging face", aIpa: "", aR: "", url: "https://huggingface.co/", srcLabel: "Hugging Face", cat: "product", conf: "community-consensus", notes: "\"HUGGING face\" — like the emoji." },
  { w: "vLLM", ipa: "/ˌviː ɛl ɛl ˈɛm/", r: "V L L M", aIpa: "", aR: "", url: "https://github.com/vllm-project/vllm", srcLabel: "vLLM", cat: "product", conf: "community-consensus", notes: "\"V-L-L-M\" letter-by-letter." },
  { w: "JAX", ipa: "/dʒæks/", r: "jacks", aIpa: "", aR: "", url: "https://jax.readthedocs.io/", srcLabel: "JAX docs", cat: "product", conf: "community-consensus", notes: "\"jacks\", one syllable. Google's autograd library." },
  { w: "Mojo", ipa: "/ˈmoʊdʒoʊ/", r: "mo jo", aIpa: "", aR: "", url: "https://www.modular.com/mojo", srcLabel: "Modular", cat: "product", conf: "community-consensus", notes: "\"MOH-joe\"." },
  { w: "DSPy", ipa: "/ˌdiː ɛs ˈpaɪ/", r: "D S pie", aIpa: "", aR: "", url: "https://dspy.ai/", srcLabel: "DSPy", cat: "product", conf: "community-consensus", notes: "\"D-S-py\" — Stanford framework." },
  { w: "Pinecone", ipa: "/ˈpaɪnˌkoʊn/", r: "pine cone", aIpa: "", aR: "", url: "https://www.pinecone.io/", srcLabel: "Pinecone", cat: "product", conf: "community-consensus", notes: "\"PINE-cone\". Vector DB." },
  { w: "Weaviate", ipa: "/ˈwiːviˌeɪt/", r: "wee vee ate", aIpa: "", aR: "", url: "https://weaviate.io/", srcLabel: "Weaviate", cat: "product", conf: "community-consensus", notes: "\"WEE-vee-ate\" — common community reading." },
  { w: "Milvus", ipa: "/ˈmɪlvəs/", r: "mill vus", aIpa: "", aR: "", url: "https://milvus.io/", srcLabel: "Milvus", cat: "product", conf: "community-consensus", notes: "\"MILL-vuhs\"." },
  { w: "Qdrant", ipa: "/ˈkwɒdrənt/", r: "quadrant", aIpa: "", aR: "", url: "https://qdrant.tech/", srcLabel: "Qdrant", cat: "product", conf: "community-consensus", notes: "\"QUADRANT\" — common reading; project FAQ TBD as a citable source." },
  { w: "Chroma", ipa: "/ˈkroʊmə/", r: "chroma", aIpa: "", aR: "", url: "https://www.trychroma.com/", srcLabel: "Chroma", cat: "product", conf: "community-consensus", notes: "\"KROH-mah\". Vector DB." },
  { w: "Modal", ipa: "/ˈmoʊdl̩/", r: "moh dl", aIpa: "", aR: "", url: "https://modal.com/", srcLabel: "Modal", cat: "product", conf: "community-consensus", notes: "\"MOH-dul\"." },
  { w: "Replicate", ipa: "/ˈrɛplɪˌkeɪt/", r: "rep li kate", aIpa: "", aR: "", url: "https://replicate.com/", srcLabel: "Replicate", cat: "product", conf: "community-consensus", notes: "\"REP-li-kate\"." },
  { w: "Next.js", ipa: "/ˈnɛkst dʒeɪ ɛs/", r: "next J S", aIpa: "", aR: "", url: "https://nextjs.org/", srcLabel: "Vercel", cat: "product", conf: "community-consensus", notes: "\"NEXT-J-S\"." },
  { w: "Nuxt", ipa: "/nʌkst/", r: "nukst", aIpa: "", aR: "", url: "https://nuxt.com/", srcLabel: "Nuxt", cat: "product", conf: "community-consensus", notes: "\"nukst\" — one syllable." },
  { w: "Remix", ipa: "/ˈriːmɪks/", r: "ree mix", aIpa: "", aR: "", url: "https://remix.run/", srcLabel: "Remix", cat: "product", conf: "community-consensus", notes: "\"REE-mix\"." },
  { w: "Qwik", ipa: "/kwɪk/", r: "quick", aIpa: "", aR: "", url: "https://qwik.dev/", srcLabel: "Qwik", cat: "product", conf: "community-consensus", notes: "\"quick\" — yes, intentional. Heard from creator Misko Hevery." },
  { w: "SolidJS", ipa: "/ˈsɒlɪd dʒeɪ ɛs/", r: "solid J S", aIpa: "", aR: "", url: "https://www.solidjs.com/", srcLabel: "SolidJS", cat: "product", conf: "community-consensus", notes: "\"SOLID-J-S\"." },
  { w: "Tailwind", ipa: "/ˈteɪlˌwɪnd/", r: "tail wind", aIpa: "", aR: "", url: "https://tailwindcss.com/", srcLabel: "Tailwind CSS", cat: "product", conf: "community-consensus", notes: "\"TAIL-wind\"." },
  { w: "shadcn", ipa: "/ˌʃæd siː ˈɛn/", r: "shad C N", aIpa: "", aR: "", url: "https://ui.shadcn.com/", srcLabel: "shadcn/ui", cat: "product", conf: "community-consensus", notes: "\"shad-C-N\" — common community reading; creator clarification TBD as a citable source." },
  { w: "tRPC", ipa: "/ˌtiː ɑːr piː ˈsiː/", r: "T R P C", aIpa: "", aR: "", url: "https://trpc.io/", srcLabel: "tRPC", cat: "product", conf: "community-consensus", notes: "\"T-R-P-C\"." },
  { w: "Zod", ipa: "/zɒd/", r: "zod", aIpa: "", aR: "", url: "https://zod.dev/", srcLabel: "Zod", cat: "product", conf: "community-consensus", notes: "\"zod\" — one syllable." },
  { w: "Zustand", ipa: "/ˈtsuːʃtʌnt/", r: "tsu shtund", aIpa: "", aR: "", url: "https://zustand.docs.pmnd.rs/", srcLabel: "Poimandres", cat: "product", conf: "community-consensus", notes: "German for \"state\": \"TSOO-shtund\" in German; most English speakers say \"ZOO-stund\". Creator clarification TBD." },
  { w: "Drizzle", ipa: "/ˈdrɪzəl/", r: "drizzle", aIpa: "", aR: "", url: "https://orm.drizzle.team/", srcLabel: "Drizzle ORM", cat: "product", conf: "community-consensus", notes: "\"DRIZ-l\"." },
  { w: "Prisma", ipa: "/ˈprɪzmə/", r: "prizma", aIpa: "", aR: "", url: "https://www.prisma.io/", srcLabel: "Prisma", cat: "product", conf: "community-consensus", notes: "\"PRIZ-muh\"." },
  { w: "NestJS", ipa: "/ˌnɛst dʒeɪ ˈɛs/", r: "nest J S", aIpa: "", aR: "", url: "https://nestjs.com/", srcLabel: "NestJS", cat: "product", conf: "community-consensus", notes: "\"NEST-J-S\"." },
  { w: "FastAPI", ipa: "/ˌfæst eɪ piː ˈaɪ/", r: "fast A P I", aIpa: "", aR: "", url: "https://fastapi.tiangolo.com/", srcLabel: "FastAPI", cat: "product", conf: "community-consensus", notes: "\"fast-A-P-I\"." },
  { w: "Vercel", ipa: "/vɜːrˈsɛl/", r: "ver SELL", aIpa: "", aR: "", url: "https://vercel.com/", srcLabel: "Vercel", cat: "product", conf: "community-consensus", notes: "\"vur-SELL\" — heard from Vercel communications." },
  { w: "Netlify", ipa: "/ˈnɛtlɪˌfaɪ/", r: "net li fy", aIpa: "", aR: "", url: "https://www.netlify.com/", srcLabel: "Netlify", cat: "product", conf: "community-consensus", notes: "\"NET-li-fy\"." },
  { w: "Cloudflare", ipa: "/ˈklaʊdˌflɛər/", r: "cloud flair", aIpa: "", aR: "", url: "https://www.cloudflare.com/", srcLabel: "Cloudflare", cat: "product", conf: "community-consensus", notes: "\"CLOUD-flair\"." },
  { w: "HashiCorp", ipa: "/ˈhæʃiˌkɔːrp/", r: "hashy corp", aIpa: "", aR: "", url: "https://www.hashicorp.com/", srcLabel: "HashiCorp", cat: "product", conf: "community-consensus", notes: "\"HASH-ee-corp\"." },
  { w: "Datadog", ipa: "/ˈdætəˌdɔːɡ/", r: "data dog", aIpa: "", aR: "", url: "https://www.datadoghq.com/", srcLabel: "Datadog", cat: "product", conf: "community-consensus", notes: "\"DATA-dog\"." },
  { w: "Stripe", ipa: "/straɪp/", r: "stripe", aIpa: "", aR: "", url: "https://stripe.com/", srcLabel: "Stripe", cat: "product", conf: "community-consensus", notes: "\"stripe\" — one syllable." },
  { w: "Notion", ipa: "/ˈnoʊʃən/", r: "no shun", aIpa: "", aR: "", url: "https://www.notion.so/", srcLabel: "Notion", cat: "product", conf: "community-consensus", notes: "\"NO-shun\" (like the noun)." },
  { w: "Linear", ipa: "/ˈlɪniər/", r: "lin ee ar", aIpa: "", aR: "", url: "https://linear.app/", srcLabel: "Linear", cat: "product", conf: "community-consensus", notes: "\"LIN-ee-ar\"." },
  { w: "Snowflake", ipa: "/ˈsnoʊˌfleɪk/", r: "snow flake", aIpa: "", aR: "", url: "https://www.snowflake.com/", srcLabel: "Snowflake", cat: "product", conf: "community-consensus", notes: "\"SNOW-flake\"." },
  { w: "Databricks", ipa: "/ˈdætəˌbrɪks/", r: "data bricks", aIpa: "", aR: "", url: "https://www.databricks.com/", srcLabel: "Databricks", cat: "product", conf: "community-consensus", notes: "\"DATA-bricks\"." },
  { w: "Palantir", ipa: "/ˈpælənˌtɪər/", r: "pal an teer", aIpa: "", aR: "", url: "https://www.palantir.com/", srcLabel: "Palantir", cat: "product", conf: "community-consensus", notes: "\"PAL-an-teer\" — from Tolkien's seeing-stones." },
  { w: "Atlassian", ipa: "/ætˈlæsiən/", r: "at lass ee an", aIpa: "", aR: "", url: "https://www.atlassian.com/", srcLabel: "Atlassian", cat: "product", conf: "community-consensus", notes: "\"at-LASS-ee-an\"." },
  { w: "Splunk", ipa: "/splʌŋk/", r: "splunk", aIpa: "", aR: "", url: "https://www.splunk.com/", srcLabel: "Splunk", cat: "product", conf: "community-consensus", notes: "\"splunk\" — rhymes with \"drunk\"." },
  { w: "Cilium", ipa: "/ˈsɪliəm/", r: "silly um", aIpa: "", aR: "", url: "https://cilium.io/", srcLabel: "Cilium", cat: "product", conf: "community-consensus", notes: "\"SIL-ee-um\" — Latin for eyelash." },
  { w: "Linkerd", ipa: "/ˈlɪŋkərdiː/", r: "linker D", aIpa: "", aR: "", url: "https://linkerd.io/", srcLabel: "Linkerd", cat: "product", conf: "community-consensus", notes: "\"LINKER-D\"." },
  { w: "Crossplane", ipa: "/ˈkrɒsˌpleɪn/", r: "cross plane", aIpa: "", aR: "", url: "https://www.crossplane.io/", srcLabel: "Crossplane", cat: "product", conf: "community-consensus", notes: "\"CROSS-plane\"." },
  { w: "Karpenter", ipa: "/ˈkɑːrpəntər/", r: "carpenter", aIpa: "", aR: "", url: "https://karpenter.sh/", srcLabel: "Karpenter", cat: "product", conf: "community-consensus", notes: "\"CARPENTER\" — like the trade." },
  { w: "Velero", ipa: "/vəˈlɛəroʊ/", r: "veh lair oh", aIpa: "", aR: "", url: "https://velero.io/", srcLabel: "Velero", cat: "product", conf: "community-consensus", notes: "\"vuh-LAIR-oh\"." },
  { w: "Falco", ipa: "/ˈfælkoʊ/", r: "fal co", aIpa: "", aR: "", url: "https://falco.org/", srcLabel: "Falco", cat: "product", conf: "community-consensus", notes: "\"FAL-co\"." },
  { w: "Trivy", ipa: "/ˈtrɪvi/", r: "trivy", aIpa: "", aR: "", url: "https://trivy.dev/", srcLabel: "Trivy", cat: "product", conf: "community-consensus", notes: "\"TRIV-ee\"." },
  { w: "Kyverno", ipa: "/kaɪˈvɜːrnoʊ/", r: "kai verno", aIpa: "", aR: "", url: "https://kyverno.io/", srcLabel: "Kyverno", cat: "product", conf: "community-consensus", notes: "\"kai-VER-no\"." },
  { w: "OPA", ipa: "/ˌoʊ piː ˈeɪ/", r: "O P A", aIpa: "", aR: "", url: "https://www.openpolicyagent.org/", srcLabel: "OPA project", cat: "abbreviation", conf: "community-consensus", notes: "\"O-P-A\" letter-by-letter." },
  { w: "ArgoCD", ipa: "/ˈɑːrɡoʊ siː diː/", r: "argo C D", aIpa: "", aR: "", url: "https://argoproj.github.io/cd/", srcLabel: "Argo CD", cat: "product", conf: "community-consensus", notes: "\"AR-go-C-D\"." },
  { w: "FluxCD", ipa: "/ˈflʌks siː diː/", r: "flux C D", aIpa: "", aR: "", url: "https://fluxcd.io/", srcLabel: "Flux CD", cat: "product", conf: "community-consensus", notes: "\"FLUX-C-D\"." },
  { w: "Tekton", ipa: "/ˈtɛktən/", r: "tek ton", aIpa: "", aR: "", url: "https://tekton.dev/", srcLabel: "Tekton", cat: "product", conf: "community-consensus", notes: "\"TEK-tun\"." },
  { w: "Neovim", ipa: "/ˈniːoʊˌvɪm/", r: "nee oh vim", aIpa: "", aR: "", url: "https://neovim.io/", srcLabel: "Neovim", cat: "tool", conf: "community-consensus", notes: "\"NEE-oh-vim\" is the most common community reading." },
  { w: "Helix", ipa: "/ˈhiːlɪks/", r: "hee licks", aIpa: "", aR: "", url: "https://helix-editor.com/", srcLabel: "Helix", cat: "tool", conf: "community-consensus", notes: "\"HEE-licks\"." },
  { w: "Zed", ipa: "/zɛd/", r: "zed", aIpa: "", aR: "", url: "https://zed.dev/", srcLabel: "Zed", cat: "tool", conf: "community-consensus", notes: "\"zed\" — the letter." },
  { w: "Cursor", ipa: "/ˈkɜːrsər/", r: "cur sir", aIpa: "", aR: "", url: "https://cursor.com/", srcLabel: "Cursor", cat: "tool", conf: "community-consensus", notes: "\"CUR-sir\"." },
  { w: "IntelliJ", ipa: "/ɪnˈtɛlədʒeɪ/", r: "in tell i J", aIpa: "", aR: "", url: "https://www.jetbrains.com/idea/", srcLabel: "JetBrains", cat: "tool", conf: "community-consensus", notes: "\"in-TELL-i-J\"." },
  { w: "ripgrep", ipa: "/ˈrɪpɡrɛp/", r: "rip grep", aIpa: "", aR: "", url: "https://github.com/BurntSushi/ripgrep", srcLabel: "BurntSushi", cat: "tool", conf: "community-consensus", notes: "\"RIP-grep\" (the `rg` command)." },
  { w: "fzf", ipa: "/ˌɛf ziː ˈɛf/", r: "F Z F", aIpa: "", aR: "", url: "https://github.com/junegunn/fzf", srcLabel: "junegunn/fzf", cat: "tool", conf: "community-consensus", notes: "\"F-Z-F\" letter-by-letter." },
  { w: "eza", ipa: "/ˈiːzə/", r: "ee zah", aIpa: "", aR: "", url: "https://eza.rocks/", srcLabel: "eza", cat: "tool", conf: "community-consensus", notes: "\"EE-zah\" (ls replacement)." },
  { w: "k9s", ipa: "/ˈkeɪ naɪnz/", r: "K nines", aIpa: "", aR: "", url: "https://k9scli.io/", srcLabel: "k9s", cat: "tool", conf: "community-consensus", notes: "\"K-nines\" — K8s TUI." },
  { w: "k3s", ipa: "/ˌkeɪ θriː ˈɛs/", r: "K three S", aIpa: "", aR: "", url: "https://k3s.io/", srcLabel: "Rancher", cat: "product", conf: "community-consensus", notes: "\"K-three-S\" (lightweight K8s)." },
  { w: "Elasticsearch", ipa: "/ɪˈlæstɪkˌsɜːrtʃ/", r: "elastic search", aIpa: "", aR: "", url: "https://www.elastic.co/", srcLabel: "Elastic", cat: "product", conf: "community-consensus", notes: "\"e-LAS-tic-search\"." },
  { w: "Lucene", ipa: "/luːˈsiːn/", r: "loo seen", aIpa: "", aR: "", url: "https://lucene.apache.org/", srcLabel: "Apache Lucene", cat: "product", conf: "community-consensus", notes: "\"loo-SEEN\"." },
  { w: "Solr", ipa: "/ˈsɒlər/", r: "sol er", aIpa: "", aR: "", url: "https://solr.apache.org/", srcLabel: "Apache Solr", cat: "product", conf: "community-consensus", notes: "\"SOL-er\"." },
  { w: "Meilisearch", ipa: "/ˌmeɪli ˈsɜːrtʃ/", r: "may lee search", aIpa: "", aR: "", url: "https://www.meilisearch.com/", srcLabel: "Meilisearch", cat: "product", conf: "community-consensus", notes: "\"MAY-lee-search\"." },
  { w: "Typesense", ipa: "/ˈtaɪpˌsɛns/", r: "type sense", aIpa: "", aR: "", url: "https://typesense.org/", srcLabel: "Typesense", cat: "product", conf: "community-consensus", notes: "\"TYPE-sense\"." },
  { w: "Algolia", ipa: "/ælˈɡoʊliə/", r: "al go lia", aIpa: "", aR: "", url: "https://www.algolia.com/", srcLabel: "Algolia", cat: "product", conf: "community-consensus", notes: "\"al-GO-lia\"." },
  { w: "Neo4j", ipa: "/ˌniːoʊ ˌfɔːr ˈdʒeɪ/", r: "nee oh four J", aIpa: "", aR: "", url: "https://neo4j.com/", srcLabel: "Neo4j", cat: "product", conf: "community-consensus", notes: "\"NEE-oh-FOUR-J\"." },
  { w: "CockroachDB", ipa: "/ˈkɒkroʊtʃ diː biː/", r: "cockroach D B", aIpa: "", aR: "", url: "https://www.cockroachlabs.com/", srcLabel: "Cockroach Labs", cat: "product", conf: "community-consensus", notes: "\"COCK-roach-D-B\"." },
  { w: "Elixir", ipa: "/ɪˈlɪksər/", r: "ee lik sir", aIpa: "", aR: "", url: "https://elixir-lang.org/", srcLabel: "Elixir", cat: "product", conf: "community-consensus", notes: "\"ee-LIK-sir\"." },
  { w: "Erlang", ipa: "/ˈɜːrlæŋ/", r: "er lang", aIpa: "", aR: "", url: "https://www.erlang.org/", srcLabel: "Erlang", cat: "product", conf: "community-consensus", notes: "\"ER-lang\"." },
  { w: "Haskell", ipa: "/ˈhæskəl/", r: "haskel", aIpa: "", aR: "", url: "https://www.haskell.org/", srcLabel: "Haskell", cat: "product", conf: "community-consensus", notes: "\"HAS-kell\"." },
  { w: "Scala", ipa: "/ˈskɑːlə/", r: "skah la", aIpa: "", aR: "", url: "https://www.scala-lang.org/", srcLabel: "Scala", cat: "product", conf: "community-consensus", notes: "\"SKAH-lah\"." },
  { w: "Kotlin", ipa: "/ˈkɒtlɪn/", r: "cot lin", aIpa: "", aR: "", url: "https://kotlinlang.org/", srcLabel: "Kotlin", cat: "product", conf: "community-consensus", notes: "\"COT-lin\" — short O." },
  { w: "Julia", ipa: "/ˈdʒuːliə/", r: "joo lia", aIpa: "", aR: "", url: "https://julialang.org/", srcLabel: "Julia", cat: "product", conf: "community-consensus", notes: "\"JOO-lee-uh\"." },
  { w: "Clojure", ipa: "/ˈkloʊʒər/", r: "closure", aIpa: "", aR: "", url: "https://clojure.org/", srcLabel: "Clojure", cat: "product", conf: "community-consensus", notes: "Rich Hickey has said it sounds like \"closure\". Community reading." },
  { w: "OCaml", ipa: "/oʊˈkæməl/", r: "oh camel", aIpa: "", aR: "", url: "https://ocaml.org/", srcLabel: "OCaml", cat: "product", conf: "community-consensus", notes: "\"OH-camel\"." },
  { w: "Lua", ipa: "/ˈluːə/", r: "loo ah", aIpa: "", aR: "", url: "https://www.lua.org/about.html", srcLabel: "Lua about", cat: "product", conf: "creator-clarified", notes: "\"LOO-ah\" — Portuguese for \"moon\". Documented on the about page." },
  { w: "Zig", ipa: "/zɪɡ/", r: "zig", aIpa: "", aR: "", url: "https://ziglang.org/", srcLabel: "Zig", cat: "product", conf: "community-consensus", notes: "\"zig\" — one syllable." },
  { w: "uv", ipa: "/ˌjuː ˈviː/", r: "you V", aIpa: "", aR: "", url: "https://github.com/astral-sh/uv", srcLabel: "Astral", cat: "tool", conf: "community-consensus", notes: "\"U-V\" — Astral's Python installer/resolver." },
  { w: "ruff", ipa: "/rʌf/", r: "ruff", aIpa: "", aR: "", url: "https://docs.astral.sh/ruff/", srcLabel: "Astral", cat: "tool", conf: "community-consensus", notes: "\"ruff\" — like a dog bark." },
  { w: "mypy", ipa: "/ˈmaɪpaɪ/", r: "my pie", aIpa: "", aR: "", url: "https://mypy.readthedocs.io/", srcLabel: "mypy", cat: "tool", conf: "community-consensus", notes: "\"MY-pie\" — Python type checker." },
  { w: "Biome", ipa: "/baɪˈoʊm/", r: "bye ohm", aIpa: "", aR: "", url: "https://biomejs.dev/", srcLabel: "Biome", cat: "tool", conf: "community-consensus", notes: "\"BYE-ohm\"." },
  { w: "Bazel", ipa: "/ˈbeɪzəl/", r: "bay zel", aIpa: "", aR: "", url: "https://bazel.build/", srcLabel: "Bazel", cat: "tool", conf: "community-consensus", notes: "\"BAY-zel\"." },
  { w: "Gradle", ipa: "/ˈɡreɪdəl/", r: "gray del", aIpa: "", aR: "", url: "https://gradle.org/", srcLabel: "Gradle", cat: "tool", conf: "community-consensus", notes: "\"GRAY-del\"." },
  { w: "Cargo", ipa: "/ˈkɑːrɡoʊ/", r: "car go", aIpa: "", aR: "", url: "https://doc.rust-lang.org/cargo/", srcLabel: "Rust", cat: "tool", conf: "community-consensus", notes: "\"CAR-go\" — Rust's package manager." },
  { w: "pnpm", ipa: "/ˌpiː ɛn piː ˈɛm/", r: "P N P M", aIpa: "", aR: "", url: "https://pnpm.io/", srcLabel: "pnpm", cat: "tool", conf: "community-consensus", notes: "\"P-N-P-M\" letter-by-letter." },
  { w: "nmap", ipa: "/ˈɛnˌmæp/", r: "en map", aIpa: "", aR: "", url: "https://nmap.org/", srcLabel: "Nmap", cat: "tool", conf: "community-consensus", notes: "\"EN-map\" — common community reading." },
  { w: "curl", ipa: "/kɜːrl/", r: "curl", aIpa: "", aR: "", url: "https://curl.se/", srcLabel: "curl", cat: "tool", conf: "community-consensus", notes: "\"curl\" — one syllable." },
  { w: "wget", ipa: "/ˈdʌbljuː ɡɛt/", r: "double-you get", aIpa: "", aR: "", url: "https://www.gnu.org/software/wget/", srcLabel: "GNU Wget", cat: "tool", conf: "community-consensus", notes: "\"W-get\" (double-you-get)." },
  { w: "SSH", ipa: "/ˌɛs ɛs ˈeɪtʃ/", r: "S S H", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Secure_Shell", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "\"S-S-H\" letter-by-letter." },
  { w: "rsync", ipa: "/ˈɑːrˌsɪŋk/", r: "R sync", aIpa: "", aR: "", url: "https://rsync.samba.org/", srcLabel: "rsync", cat: "tool", conf: "community-consensus", notes: "\"R-sync\"." },
  { w: "htop", ipa: "/ˈeɪtʃˌtɒp/", r: "H top", aIpa: "", aR: "", url: "https://htop.dev/", srcLabel: "htop", cat: "tool", conf: "community-consensus", notes: "\"H-top\"." },
  { w: "LLM", ipa: "/ˌɛl ɛl ˈɛm/", r: "L L M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Large_language_model", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"L-L-M\" letter-by-letter — Large Language Model." },
  { w: "RAG", ipa: "/ræɡ/", r: "rag", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"rag\" (rhymes with \"bag\") — Retrieval-Augmented Generation." },
  { w: "MCP", ipa: "/ˌɛm siː ˈpiː/", r: "M C P", aIpa: "", aR: "", url: "https://modelcontextprotocol.io/", srcLabel: "Model Context Protocol", cat: "abbreviation", conf: "community-consensus", notes: "\"M-C-P\" letter-by-letter — Model Context Protocol (Anthropic)." },
  { w: "LLaMA", ipa: "/ˈlɑːmə/", r: "llama", aIpa: "", aR: "", url: "https://www.llama.com/", srcLabel: "Meta Llama", cat: "product", conf: "community-consensus", notes: "\"LLAH-mah\" — same as the animal. Not letter-by-letter." },
  { w: "DALL-E", ipa: "/ˈdɒli/", r: "dolly", aIpa: "/ˌdiː eɪ ɛl ˈiː/", aR: "D A L L E", url: "https://openai.com/dall-e-2", srcLabel: "OpenAI DALL-E", cat: "product", conf: "community-consensus", notes: "\"DOLL-ee\" (portmanteau of Dalí + WALL-E); some say it letter-by-letter." },
  { w: "Gemini", ipa: "/ˈdʒɛmɪnaɪ/", r: "jem in eye", aIpa: "", aR: "", url: "https://gemini.google.com/", srcLabel: "Google Gemini", cat: "product", conf: "community-consensus", notes: "\"JEM-in-eye\" — like the zodiac sign." },
  { w: "GPT", ipa: "/ˌdʒiː piː ˈtiː/", r: "G P T", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Generative_pre-trained_transformer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"G-P-T\" letter-by-letter — Generative Pre-trained Transformer." },
  { w: "Sora", ipa: "/ˈsɔːrə/", r: "sor ah", aIpa: "", aR: "", url: "https://openai.com/sora", srcLabel: "OpenAI Sora", cat: "product", conf: "community-consensus", notes: "\"SOR-ah\" — OpenAI's video model." },
  { w: "Midjourney", ipa: "/ˈmɪdˌdʒɜːrni/", r: "mid journey", aIpa: "", aR: "", url: "https://www.midjourney.com/", srcLabel: "Midjourney", cat: "product", conf: "community-consensus", notes: "\"MID-journey\" — two clear syllables." },
  { w: "Codex", ipa: "/ˈkoʊdɛks/", r: "co decks", aIpa: "", aR: "", url: "https://openai.com/codex", srcLabel: "OpenAI Codex", cat: "product", conf: "community-consensus", notes: "\"CO-decks\" — same as the manuscript term." },
  { w: "HTMX", ipa: "/ˌeɪtʃ tiː ɛm ˈɛks/", r: "H T M X", aIpa: "", aR: "", url: "https://htmx.org/", srcLabel: "htmx", cat: "tool", conf: "community-consensus", notes: "\"H-T-M-X\" letter-by-letter." },
  { w: "WebAssembly", ipa: "/ˈwɛbəˌsɛmbli/", r: "web assembly", aIpa: "", aR: "", url: "https://webassembly.org/", srcLabel: "WebAssembly", cat: "tool", conf: "community-consensus", notes: "\"WEB-assembly\" — two-word reading." },
  { w: "Wasm", ipa: "/ˈwɒzəm/", r: "wozum", aIpa: "/ˈwɑːsəm/", aR: "wahsum", url: "https://webassembly.org/", srcLabel: "WebAssembly", cat: "abbreviation", conf: "contested", notes: "\"WOZ-um\" is most common; \"WAHS-um\" also heard." },
  { w: "GraphQL", ipa: "/ˌɡræf kjuː ˈɛl/", r: "graph Q L", aIpa: "", aR: "", url: "https://graphql.org/", srcLabel: "GraphQL", cat: "tool", conf: "community-consensus", notes: "\"graph-Q-L\" — not \"graph quill\"." },
  { w: "gRPC", ipa: "/ˌdʒiː ɑːr piː ˈsiː/", r: "G R P C", aIpa: "", aR: "", url: "https://grpc.io/", srcLabel: "gRPC", cat: "tool", conf: "community-consensus", notes: "\"G-R-P-C\" letter-by-letter. (Some say \"gee-R-P-C\" stressing initial g.)" },
  { w: "REST", ipa: "/rɛst/", r: "rest", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/REST", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"rest\" — one syllable." },
  { w: "OAuth", ipa: "/ˈoʊɔːθ/", r: "oh awth", aIpa: "/ˌoʊ ˈɔːθ/", aR: "O auth", url: "https://oauth.net/", srcLabel: "OAuth", cat: "acronym", conf: "contested", notes: "\"OH-awth\" most common; \"O-auth\" letter-by-O-then-auth also heard." },
  { w: "JWT", ipa: "/dʒɒt/", r: "jot", aIpa: "/ˌdʒeɪ dʌbljuː ˈtiː/", aR: "J W T", url: "https://datatracker.ietf.org/doc/html/rfc7519", srcLabel: "IETF RFC 7519", cat: "acronym", conf: "contested", notes: "\"jot\" (RFC pronunciation per Section 1) — but letter-by-letter \"J-W-T\" dominates in spoken practice." },
  { w: "SAML", ipa: "/ˈsæməl/", r: "sam ul", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"SAM-ul\" — like the name Samuel." },
  { w: "DNS", ipa: "/ˌdiː ɛn ˈɛs/", r: "D N S", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Domain_Name_System", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "\"D-N-S\" letter-by-letter." },
  { w: "CIDR", ipa: "/ˈsaɪdər/", r: "cider", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing", srcLabel: "Wikipedia", cat: "acronym", conf: "creator-clarified", notes: "\"cider\" — like the apple drink. Documented in CIDR specs." },
  { w: "Gleam", ipa: "/ɡliːm/", r: "gleem", aIpa: "", aR: "", url: "https://gleam.run/", srcLabel: "Gleam", cat: "product", conf: "community-consensus", notes: "\"gleem\" — one syllable, like the verb." },
  { w: "Roc", ipa: "/rɒk/", r: "rock", aIpa: "", aR: "", url: "https://www.roc-lang.org/", srcLabel: "Roc", cat: "product", conf: "community-consensus", notes: "\"rock\" — one syllable, named after the mythical bird." },
  { w: "Carbon", ipa: "/ˈkɑːrbən/", r: "carbon", aIpa: "", aR: "", url: "https://github.com/carbon-language", srcLabel: "Carbon", cat: "product", conf: "community-consensus", notes: "\"CAR-bun\" — like the element." },
  { w: "V", ipa: "/viː/", r: "V", aIpa: "", aR: "", url: "https://github.com/vlang/v", srcLabel: "V (vlang) repo", cat: "product", conf: "community-consensus", notes: "\"V\" — just the letter." },
  { w: "Odin", ipa: "/ˈoʊdɪn/", r: "oh din", aIpa: "", aR: "", url: "https://odin-lang.org/", srcLabel: "Odin", cat: "product", conf: "community-consensus", notes: "\"OH-din\" — like the Norse god." },
  { w: "Racket", ipa: "/ˈrækɪt/", r: "rack et", aIpa: "", aR: "", url: "https://racket-lang.org/", srcLabel: "Racket", cat: "product", conf: "community-consensus", notes: "\"RACK-et\" — like the tennis equipment." },
  { w: "Webpack", ipa: "/ˈwɛbˌpæk/", r: "web pack", aIpa: "", aR: "", url: "https://webpack.js.org/", srcLabel: "Webpack", cat: "tool", conf: "community-consensus", notes: "\"WEB-pack\" — two-syllable." },
  { w: "Babel", ipa: "/ˈbæbəl/", r: "bab ul", aIpa: "", aR: "", url: "https://babeljs.io/", srcLabel: "Babel", cat: "tool", conf: "community-consensus", notes: "\"BAB-ul\" — like the biblical tower." },
  { w: "ESLint", ipa: "/ˌiː ɛs ˈlɪnt/", r: "E S lint", aIpa: "", aR: "", url: "https://eslint.org/", srcLabel: "ESLint", cat: "tool", conf: "community-consensus", notes: "\"E-S-lint\"." },
  { w: "Prettier", ipa: "/ˈprɪtiər/", r: "pretty er", aIpa: "", aR: "", url: "https://prettier.io/", srcLabel: "Prettier", cat: "tool", conf: "community-consensus", notes: "\"PRETTY-er\" — comparative of \"pretty\"." },
  { w: "Turbo", ipa: "/ˈtɜːrboʊ/", r: "turbo", aIpa: "", aR: "", url: "https://turbo.build/", srcLabel: "Turbo", cat: "tool", conf: "community-consensus", notes: "\"TUR-bo\"." },
  { w: "Nx", ipa: "/ˌɛn ˈɛks/", r: "N X", aIpa: "", aR: "", url: "https://nx.dev/", srcLabel: "Nx", cat: "tool", conf: "community-consensus", notes: "\"N-X\" letter-by-letter." },
  { w: "Lerna", ipa: "/ˈlɜːrnə/", r: "lurn ah", aIpa: "", aR: "", url: "https://lerna.js.org/", srcLabel: "Lerna", cat: "tool", conf: "community-consensus", notes: "\"LURN-ah\"." },
  { w: "Storybook", ipa: "/ˈstɔːriˌbʊk/", r: "story book", aIpa: "", aR: "", url: "https://storybook.js.org/", srcLabel: "Storybook", cat: "tool", conf: "community-consensus", notes: "\"STORY-book\"." },
  { w: "Playwright", ipa: "/ˈpleɪˌraɪt/", r: "play right", aIpa: "", aR: "", url: "https://playwright.dev/", srcLabel: "Playwright", cat: "tool", conf: "community-consensus", notes: "\"PLAY-rite\" — like the theatrical term." },
  { w: "Cypress", ipa: "/ˈsaɪprəs/", r: "sigh press", aIpa: "", aR: "", url: "https://www.cypress.io/", srcLabel: "Cypress", cat: "tool", conf: "community-consensus", notes: "\"SIGH-press\" — like the tree." },
  { w: "Vitest", ipa: "/ˈviːtɛst/", r: "vee test", aIpa: "", aR: "", url: "https://vitest.dev/", srcLabel: "Vitest", cat: "tool", conf: "community-consensus", notes: "\"VEE-test\" — from Vite." },
  { w: "Jest", ipa: "/dʒɛst/", r: "jest", aIpa: "", aR: "", url: "https://jestjs.io/", srcLabel: "Jest", cat: "tool", conf: "community-consensus", notes: "\"jest\" — one syllable." },
  { w: "Heroku", ipa: "/həˈroʊkuː/", r: "her oh koo", aIpa: "", aR: "", url: "https://www.heroku.com/", srcLabel: "Heroku", cat: "product", conf: "community-consensus", notes: "\"her-OH-koo\"." },
  { w: "Sourcegraph", ipa: "/ˈsɔːrsˌɡræf/", r: "source graph", aIpa: "", aR: "", url: "https://sourcegraph.com/", srcLabel: "Sourcegraph", cat: "product", conf: "community-consensus", notes: "\"SOURCE-graph\"." },
  { w: "Codeium", ipa: "/ˈkoʊdiəm/", r: "co dee um", aIpa: "", aR: "", url: "https://codeium.com/", srcLabel: "Codeium", cat: "product", conf: "community-consensus", notes: "\"KOH-dee-um\"." },
  { w: "Replit", ipa: "/ˈrɛplɪt/", r: "rep lit", aIpa: "", aR: "", url: "https://replit.com/", srcLabel: "Replit", cat: "product", conf: "community-consensus", notes: "\"REP-lit\"." },
  { w: "Hasura", ipa: "/həˈsʊrə/", r: "huh sue rah", aIpa: "", aR: "", url: "https://hasura.io/", srcLabel: "Hasura", cat: "product", conf: "community-consensus", notes: "\"huh-SOO-rah\"." },
  { w: "Auth0", ipa: "/ˌɔːθ ˈziːroʊ/", r: "auth zero", aIpa: "", aR: "", url: "https://auth0.com/", srcLabel: "Auth0", cat: "product", conf: "community-consensus", notes: "\"auth-zero\"." },
  { w: "Clerk", ipa: "/klɜːrk/", r: "clerk", aIpa: "", aR: "", url: "https://clerk.com/", srcLabel: "Clerk", cat: "product", conf: "community-consensus", notes: "\"clerk\" — one syllable." },
  { w: "Supabase", ipa: "/ˈsuːpəˌbeɪs/", r: "super base", aIpa: "", aR: "", url: "https://supabase.com/", srcLabel: "Supabase", cat: "product", conf: "community-consensus", notes: "\"SOO-puh-base\"." },
  { w: "Twilio", ipa: "/ˈtwɪlioʊ/", r: "twill ee oh", aIpa: "", aR: "", url: "https://www.twilio.com/", srcLabel: "Twilio", cat: "product", conf: "community-consensus", notes: "\"TWILL-ee-oh\"." },
  { w: "Plaid", ipa: "/plæd/", r: "plad", aIpa: "", aR: "", url: "https://plaid.com/", srcLabel: "Plaid", cat: "product", conf: "community-consensus", notes: "\"plad\" — one syllable, like the fabric." },
  { w: "Memcached", ipa: "/ˌmɛm ˈkæʃt/", r: "mem cashed", aIpa: "", aR: "", url: "https://memcached.org/", srcLabel: "Memcached", cat: "product", conf: "community-consensus", notes: "\"mem-CASHED\" — past tense of cache." },
  { w: "Valkey", ipa: "/ˈvælki/", r: "val key", aIpa: "", aR: "", url: "https://valkey.io/", srcLabel: "Valkey", cat: "product", conf: "community-consensus", notes: "\"VAL-key\"." },
  { w: "Aerospike", ipa: "/ˈɛəroʊˌspaɪk/", r: "air oh spike", aIpa: "", aR: "", url: "https://aerospike.com/", srcLabel: "Aerospike", cat: "product", conf: "community-consensus", notes: "\"AIR-oh-spike\"." },
  { w: "SurrealDB", ipa: "/səˈriːəl diː biː/", r: "sir ee al D B", aIpa: "", aR: "", url: "https://surrealdb.com/", srcLabel: "SurrealDB", cat: "product", conf: "community-consensus", notes: "\"sir-EE-uhl-D-B\"." },
  { w: "Materialize", ipa: "/məˈtɪriəˌlaɪz/", r: "muh tear ee al ize", aIpa: "", aR: "", url: "https://materialize.com/", srcLabel: "Materialize", cat: "product", conf: "community-consensus", notes: "\"muh-TEER-ee-uh-lize\"." },
  { w: "Kafka", ipa: "/ˈkɑːfkə/", r: "kaf kah", aIpa: "", aR: "", url: "https://kafka.apache.org/", srcLabel: "Apache Kafka", cat: "product", conf: "community-consensus", notes: "\"KAHF-kah\" — named after the writer." },
  { w: "Pulsar", ipa: "/ˈpʌlsɑːr/", r: "pul sar", aIpa: "", aR: "", url: "https://pulsar.apache.org/", srcLabel: "Apache Pulsar", cat: "product", conf: "community-consensus", notes: "\"PUL-sar\"." },
  { w: "RabbitMQ", ipa: "/ˈræbɪt ɛm kjuː/", r: "rabbit M Q", aIpa: "", aR: "", url: "https://www.rabbitmq.com/", srcLabel: "RabbitMQ", cat: "product", conf: "community-consensus", notes: "\"RABBIT-M-Q\"." },
  { w: "NATS", ipa: "/næts/", r: "nats", aIpa: "", aR: "", url: "https://nats.io/", srcLabel: "NATS", cat: "product", conf: "community-consensus", notes: "\"nats\" — rhymes with \"bats\"." },
  { w: "Docker", ipa: "/ˈdɒkər/", r: "dock er", aIpa: "", aR: "", url: "https://www.docker.com/", srcLabel: "Docker", cat: "product", conf: "community-consensus", notes: "\"DOCK-er\" — like the dock worker." },
  { w: "Jenkins", ipa: "/ˈdʒɛŋkɪnz/", r: "jen kinz", aIpa: "", aR: "", url: "https://www.jenkins.io/", srcLabel: "Jenkins", cat: "product", conf: "community-consensus", notes: "\"JEN-kinz\" — like the surname." },
  { w: "GitHub", ipa: "/ˈɡɪtˌhʌb/", r: "git hub", aIpa: "", aR: "", url: "https://github.com/", srcLabel: "GitHub", cat: "product", conf: "community-consensus", notes: "\"GIT-hub\"." },
  { w: "GitLab", ipa: "/ˈɡɪtˌlæb/", r: "git lab", aIpa: "", aR: "", url: "https://about.gitlab.com/", srcLabel: "GitLab", cat: "product", conf: "community-consensus", notes: "\"GIT-lab\"." },
  { w: "CircleCI", ipa: "/ˈsɜːrkəl siː aɪ/", r: "circle C I", aIpa: "", aR: "", url: "https://circleci.com/", srcLabel: "CircleCI", cat: "product", conf: "community-consensus", notes: "\"CIRCLE-C-I\"." },
  { w: "Aider", ipa: "/ˈeɪdər/", r: "ay der", aIpa: "", aR: "", url: "https://aider.chat/", srcLabel: "Aider docs", cat: "product", conf: "community-consensus", notes: "\"AY-der\" — like the noun." },
  { w: "Cline", ipa: "/klaɪn/", r: "kline", aIpa: "", aR: "", url: "https://cline.bot/", srcLabel: "Cline", cat: "product", conf: "community-consensus", notes: "\"kline\" — one syllable, from \"Claude line\"." },
  { w: "Marimo", ipa: "/məˈriːmoʊ/", r: "muh ree mo", aIpa: "", aR: "", url: "https://marimo.io/", srcLabel: "Marimo", cat: "product", conf: "community-consensus", notes: "\"mar-EE-mo\" — Japanese for the moss balls." },
  { w: "Letta", ipa: "/ˈlɛtə/", r: "let ah", aIpa: "", aR: "", url: "https://www.letta.com/", srcLabel: "Letta (formerly MemGPT)", cat: "product", conf: "community-consensus", notes: "\"LET-ah\" — short E." },
  { w: "AutoGen", ipa: "/ˈɔːtoʊdʒɛn/", r: "auto jen", aIpa: "", aR: "", url: "https://microsoft.github.io/autogen/", srcLabel: "Microsoft AutoGen", cat: "product", conf: "community-consensus", notes: "\"AUTO-jen\" — like \"auto-generate\"." },
  { w: "CrewAI", ipa: "/ˌkruː eɪ ˈaɪ/", r: "crew A I", aIpa: "", aR: "", url: "https://www.crewai.com/", srcLabel: "CrewAI", cat: "product", conf: "community-consensus", notes: "\"crew-A-I\"." },
  { w: "LiteLLM", ipa: "/ˈlaɪt ɛl ɛl ɛm/", r: "light L L M", aIpa: "", aR: "", url: "https://www.litellm.ai/", srcLabel: "LiteLLM", cat: "product", conf: "community-consensus", notes: "\"LIGHT-L-L-M\"." },
  { w: "Marqo", ipa: "/ˈmɑːrkoʊ/", r: "mar ko", aIpa: "", aR: "", url: "https://www.marqo.ai/", srcLabel: "Marqo", cat: "product", conf: "community-consensus", notes: "\"MAR-ko\"." },
  { w: "Tanstack", ipa: "/ˈtænˌstæk/", r: "tan stack", aIpa: "", aR: "", url: "https://tanstack.com/", srcLabel: "TanStack", cat: "product", conf: "community-consensus", notes: "\"TAN-stack\" — TypeScript + Stack." },
  { w: "Jotai", ipa: "/ˈdʒoʊtaɪ/", r: "jo tie", aIpa: "", aR: "", url: "https://jotai.org/", srcLabel: "Jotai docs", cat: "product", conf: "creator-clarified", notes: "Japanese for \"state\": \"JOH-tie\"." },
  { w: "Valtio", ipa: "/ˈvɑːltioʊ/", r: "val tee oh", aIpa: "", aR: "", url: "https://valtio.dev/", srcLabel: "Valtio docs", cat: "product", conf: "creator-clarified", notes: "Finnish for \"state\": \"VAHL-tee-oh\"." },
  { w: "Recoil", ipa: "/ˈriːkɔɪl/", r: "ree coil", aIpa: "", aR: "", url: "https://recoiljs.org/", srcLabel: "Recoil", cat: "product", conf: "community-consensus", notes: "\"REE-coil\"." },
  { w: "Million.js", ipa: "/ˈmɪljən dʒeɪ ɛs/", r: "million J S", aIpa: "", aR: "", url: "https://million.dev/", srcLabel: "Million", cat: "product", conf: "community-consensus", notes: "\"MILLION-J-S\"." },
  { w: "Preact", ipa: "/ˈpriːækt/", r: "pre act", aIpa: "", aR: "", url: "https://preactjs.com/", srcLabel: "Preact", cat: "product", conf: "community-consensus", notes: "\"PREE-act\"." },
  { w: "Mantine", ipa: "/ˈmæntaɪn/", r: "man tine", aIpa: "", aR: "", url: "https://mantine.dev/", srcLabel: "Mantine", cat: "product", conf: "community-consensus", notes: "\"MAN-tine\"." },
  { w: "Chakra", ipa: "/ˈtʃækrə/", r: "chak rah", aIpa: "", aR: "", url: "https://chakra-ui.com/", srcLabel: "Chakra UI", cat: "product", conf: "community-consensus", notes: "\"CHAK-rah\"." },
  { w: "DaisyUI", ipa: "/ˈdeɪzi juː aɪ/", r: "daisy U I", aIpa: "", aR: "", url: "https://daisyui.com/", srcLabel: "daisyUI", cat: "product", conf: "community-consensus", notes: "\"DAISY-U-I\"." },
  { w: "esbuild", ipa: "/ˌiː ɛs ˈbɪld/", r: "E S build", aIpa: "", aR: "", url: "https://esbuild.github.io/", srcLabel: "esbuild", cat: "tool", conf: "community-consensus", notes: "\"E-S-build\"." },
  { w: "SWC", ipa: "/ˌɛs dʌbljuː ˈsiː/", r: "S W C", aIpa: "", aR: "", url: "https://swc.rs/", srcLabel: "SWC", cat: "tool", conf: "community-consensus", notes: "\"S-W-C\" letter-by-letter (stands for \"Speedy Web Compiler\")." },
  { w: "Turbopack", ipa: "/ˈtɜːrboʊˌpæk/", r: "turbo pack", aIpa: "", aR: "", url: "https://turbo.build/pack", srcLabel: "Turbopack", cat: "tool", conf: "community-consensus", notes: "\"TURBO-pack\"." },
  { w: "Rspack", ipa: "/ˌɑːr ɛs ˈpæk/", r: "R S pack", aIpa: "", aR: "", url: "https://rspack.dev/", srcLabel: "Rspack", cat: "tool", conf: "community-consensus", notes: "\"R-S-pack\"." },
  { w: "Oxc", ipa: "/ˌoʊ ɛks ˈsiː/", r: "O X C", aIpa: "", aR: "", url: "https://oxc.rs/", srcLabel: "Oxc", cat: "tool", conf: "community-consensus", notes: "\"O-X-C\" letter-by-letter." },
  { w: "Pulumi", ipa: "/puːˈluːmi/", r: "poo loo mee", aIpa: "", aR: "", url: "https://www.pulumi.com/", srcLabel: "Pulumi", cat: "product", conf: "community-consensus", notes: "\"poo-LOO-mee\" — Hawaiian for \"feather\"." },
  { w: "Dapr", ipa: "/ˈdæpər/", r: "dap er", aIpa: "", aR: "", url: "https://dapr.io/", srcLabel: "Dapr", cat: "product", conf: "creator-clarified", notes: "\"DAP-er\" — like the adjective dapper. Distributed Application Runtime." },
  { w: "Backstage", ipa: "/ˈbækˌsteɪdʒ/", r: "back stage", aIpa: "", aR: "", url: "https://backstage.io/", srcLabel: "Backstage", cat: "product", conf: "community-consensus", notes: "\"BACK-stage\" — like the theater term." },
  { w: "Traefik", ipa: "/ˈtræfɪk/", r: "traffic", aIpa: "", aR: "", url: "https://traefik.io/", srcLabel: "Traefik", cat: "product", conf: "creator-clarified", notes: "\"TRAFFIC\" — exactly like the word." },
  { w: "WireGuard", ipa: "/ˈwaɪərˌɡɑːrd/", r: "wire guard", aIpa: "", aR: "", url: "https://www.wireguard.com/", srcLabel: "WireGuard", cat: "product", conf: "community-consensus", notes: "\"WIRE-guard\"." },
  { w: "Wezterm", ipa: "/ˈwɛzˌtɜːrm/", r: "wez term", aIpa: "", aR: "", url: "https://wezfurlong.org/wezterm/", srcLabel: "WezTerm", cat: "tool", conf: "creator-clarified", notes: "Named after Wez Furlong: \"WEZ-term\"." },
  { w: "Alacritty", ipa: "/əˈlækrɪti/", r: "uh lack ri tee", aIpa: "", aR: "", url: "https://alacritty.org/", srcLabel: "Alacritty", cat: "tool", conf: "community-consensus", notes: "\"uh-LACK-ri-tee\"." },
  { w: "Kitty", ipa: "/ˈkɪti/", r: "kit ee", aIpa: "", aR: "", url: "https://sw.kovidgoyal.net/kitty/", srcLabel: "kitty", cat: "tool", conf: "community-consensus", notes: "\"KIT-ee\" — like the cat." },
  { w: "Zellij", ipa: "/zɛˈliːʒ/", r: "zell eezh", aIpa: "", aR: "", url: "https://zellij.dev/", srcLabel: "Zellij", cat: "tool", conf: "community-consensus", notes: "\"zell-EEZH\" — Arabic, the tessellated tiles." },
  { w: "Lazygit", ipa: "/ˈleɪziˌɡɪt/", r: "lay zee git", aIpa: "", aR: "", url: "https://github.com/jesseduffield/lazygit", srcLabel: "lazygit", cat: "tool", conf: "community-consensus", notes: "\"LAY-zee-git\"." },
  { w: "Lazydocker", ipa: "/ˈleɪziˌdɒkər/", r: "lay zee docker", aIpa: "", aR: "", url: "https://github.com/jesseduffield/lazydocker", srcLabel: "lazydocker", cat: "tool", conf: "community-consensus", notes: "\"LAY-zee-docker\"." },
  { w: "Lazyvim", ipa: "/ˈleɪziˌvɪm/", r: "lay zee vim", aIpa: "", aR: "", url: "https://www.lazyvim.org/", srcLabel: "LazyVim", cat: "tool", conf: "community-consensus", notes: "\"LAY-zee-vim\"." },
  { w: "just", ipa: "/dʒʌst/", r: "just", aIpa: "", aR: "", url: "https://just.systems/", srcLabel: "just", cat: "tool", conf: "community-consensus", notes: "\"just\" — exactly like the adverb." },
  { w: "Tigerbeetle", ipa: "/ˈtaɪɡərˌbiːtəl/", r: "tiger beetle", aIpa: "", aR: "", url: "https://tigerbeetle.com/", srcLabel: "TigerBeetle", cat: "product", conf: "community-consensus", notes: "\"TIGER-beetle\"." },
  { w: "Dragonfly", ipa: "/ˈdræɡənˌflaɪ/", r: "dragon fly", aIpa: "", aR: "", url: "https://www.dragonflydb.io/", srcLabel: "Dragonfly", cat: "product", conf: "community-consensus", notes: "\"DRAGON-fly\" — full word, then DB." },
  { w: "Garnet", ipa: "/ˈɡɑːrnɪt/", r: "gar net", aIpa: "", aR: "", url: "https://microsoft.github.io/garnet/", srcLabel: "Microsoft Garnet", cat: "product", conf: "community-consensus", notes: "\"GAR-net\" — like the gemstone." },
  { w: "ImmuDB", ipa: "/ˈɪmjuː diː biː/", r: "im you D B", aIpa: "", aR: "", url: "https://www.immudb.io/", srcLabel: "Immudb", cat: "product", conf: "community-consensus", notes: "\"IM-you-D-B\"." },
  { w: "EdgeDB", ipa: "/ˈɛdʒ diː biː/", r: "edge D B", aIpa: "", aR: "", url: "https://www.edgedb.com/", srcLabel: "EdgeDB", cat: "product", conf: "community-consensus", notes: "\"EDGE-D-B\"." },
  { w: "RisingWave", ipa: "/ˈraɪzɪŋˌweɪv/", r: "rising wave", aIpa: "", aR: "", url: "https://www.risingwave.com/", srcLabel: "RisingWave", cat: "product", conf: "community-consensus", notes: "\"RISING-wave\"." },
  { w: "TimescaleDB", ipa: "/ˈtaɪmˌskeɪl diː biː/", r: "time scale D B", aIpa: "", aR: "", url: "https://www.timescale.com/", srcLabel: "Timescale", cat: "product", conf: "community-consensus", notes: "\"TIME-scale-D-B\"." },
  { w: "InfluxDB", ipa: "/ˈɪnflʌks diː biː/", r: "in flux D B", aIpa: "", aR: "", url: "https://www.influxdata.com/", srcLabel: "InfluxDB", cat: "product", conf: "community-consensus", notes: "\"IN-flux-D-B\"." },
  { w: "Sentry", ipa: "/ˈsɛntri/", r: "sentry", aIpa: "", aR: "", url: "https://sentry.io/", srcLabel: "Sentry", cat: "product", conf: "community-consensus", notes: "\"SEN-tree\"." },
  { w: "Honeycomb", ipa: "/ˈhʌniˌkoʊm/", r: "honey comb", aIpa: "", aR: "", url: "https://www.honeycomb.io/", srcLabel: "Honeycomb", cat: "product", conf: "community-consensus", notes: "\"HONEY-comb\"." },
  { w: "Jaeger", ipa: "/ˈjeɪɡər/", r: "yay ger", aIpa: "", aR: "", url: "https://www.jaegertracing.io/", srcLabel: "Jaeger", cat: "product", conf: "community-consensus", notes: "\"YAY-ger\" — German pronunciation; some say \"JAY-ger\" too." },
  { w: "Loki", ipa: "/ˈloʊki/", r: "low key", aIpa: "", aR: "", url: "https://grafana.com/oss/loki/", srcLabel: "Grafana Loki", cat: "product", conf: "community-consensus", notes: "\"LOW-key\" — Norse god name." },
  { w: "Tempo", ipa: "/ˈtɛmpoʊ/", r: "tem po", aIpa: "", aR: "", url: "https://grafana.com/oss/tempo/", srcLabel: "Grafana Tempo", cat: "product", conf: "community-consensus", notes: "\"TEM-po\" — like the music term." },
  { w: "Vector", ipa: "/ˈvɛktər/", r: "vec tor", aIpa: "", aR: "", url: "https://vector.dev/", srcLabel: "Vector", cat: "product", conf: "community-consensus", notes: "\"VEC-tor\" — like the noun." },
  { w: "Fluentd", ipa: "/ˈfluːənt diː/", r: "fluent D", aIpa: "", aR: "", url: "https://www.fluentd.org/", srcLabel: "Fluentd", cat: "product", conf: "community-consensus", notes: "\"FLUENT-D\"." },
  { w: "API", ipa: "/ˌeɪ piː ˈaɪ/", r: "A P I", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/API", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"A-P-I\" letter-by-letter." },
  { w: "CDN", ipa: "/ˌsiː diː ˈɛn/", r: "C D N", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Content_delivery_network", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"C-D-N\"." },
  { w: "CRUD", ipa: "/krʌd/", r: "krud", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Create,_read,_update_and_delete", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"krud\" — one syllable." },
  { w: "ETL", ipa: "/ˌiː tiː ˈɛl/", r: "E T L", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Extract,_transform,_load", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"E-T-L\"." },
  { w: "JIT", ipa: "/dʒɪt/", r: "jit", aIpa: "/ˌdʒeɪ aɪ ˈtiː/", aR: "J I T", url: "https://en.wikipedia.org/wiki/Just-in-time_compilation", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"jit\" (one syllable) or \"J-I-T\"." },
  { w: "ORM", ipa: "/ˌoʊ ɑːr ˈɛm/", r: "O R M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"O-R-M\"." },
  { w: "SRE", ipa: "/ˌɛs ɑːr ˈiː/", r: "S R E", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Site_reliability_engineering", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"S-R-E\"." },
  { w: "TLDR", ipa: "/ˌtiː ɛl diː ˈɑːr/", r: "T L D R", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/TL;DR", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"T-L-D-R\" — \"too long, didn't read\"." },
  { w: "LGTM", ipa: "/ˌɛl dʒiː tiː ˈɛm/", r: "L G T M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Looks_good_to_me", srcLabel: "dev community", cat: "acronym", conf: "community-consensus", notes: "\"L-G-T-M\" — \"looks good to me\"." },
  { w: "DRY", ipa: "/draɪ/", r: "dry", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Don%27t_repeat_yourself", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"dry\" — one syllable." },
  { w: "KISS", ipa: "/kɪs/", r: "kiss", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/KISS_principle", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"kiss\" — like the verb." },
  { w: "YAGNI", ipa: "/ˈjæɡni/", r: "yag nee", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"YAG-nee\"." },
  { w: "POSIX", ipa: "/ˈpɑːzɪks/", r: "pa zicks", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/POSIX", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"PAH-zicks\"." },
  { w: "Restic", ipa: "/ˈrɛstɪk/", r: "res tic", aIpa: "", aR: "", url: "https://restic.net/", srcLabel: "restic", cat: "tool", conf: "community-consensus", notes: "\"RES-tic\"." },
  { w: "Renovate", ipa: "/ˈrɛnəveɪt/", r: "ren oh vate", aIpa: "", aR: "", url: "https://www.mend.io/renovate/", srcLabel: "Renovate", cat: "tool", conf: "community-consensus", notes: "\"REN-oh-vate\"." },
  { w: "Daytona", ipa: "/deɪˈtoʊnə/", r: "day toh nah", aIpa: "", aR: "", url: "https://www.daytona.io/", srcLabel: "Daytona", cat: "product", conf: "community-consensus", notes: "\"day-TOH-nah\"." },
  { w: "Coolify", ipa: "/ˈkuːlɪfaɪ/", r: "cool i fy", aIpa: "", aR: "", url: "https://coolify.io/", srcLabel: "Coolify", cat: "product", conf: "community-consensus", notes: "\"COOL-i-fy\"." },
  { w: "Bytebase", ipa: "/ˈbaɪtˌbeɪs/", r: "byte base", aIpa: "", aR: "", url: "https://www.bytebase.com/", srcLabel: "Bytebase", cat: "product", conf: "community-consensus", notes: "\"BYTE-base\"." },
  { w: "Bolt", ipa: "/boʊlt/", r: "bolt", aIpa: "", aR: "", url: "https://bolt.new/", srcLabel: "Bolt.new", cat: "product", conf: "community-consensus", notes: "\"bolt\" — one syllable." },
  { w: "Tabby", ipa: "/ˈtæbi/", r: "tab ee", aIpa: "", aR: "", url: "https://tabby.sh/", srcLabel: "Tabby", cat: "tool", conf: "community-consensus", notes: "\"TAB-ee\"." },
  { w: "Tantivy", ipa: "/ˈtæntɪvi/", r: "tan ti vee", aIpa: "", aR: "", url: "https://github.com/quickwit-oss/tantivy", srcLabel: "Tantivy", cat: "product", conf: "community-consensus", notes: "\"TAN-ti-vee\"." },
  { w: "Cody", ipa: "/ˈkoʊdi/", r: "co dee", aIpa: "", aR: "", url: "https://sourcegraph.com/cody", srcLabel: "Sourcegraph Cody", cat: "product", conf: "community-consensus", notes: "\"KOH-dee\"." },
  { w: "Continue", ipa: "/kənˈtɪnjuː/", r: "continue", aIpa: "", aR: "", url: "https://www.continue.dev/", srcLabel: "Continue.dev", cat: "product", conf: "community-consensus", notes: "\"con-TIN-yoo\" — exactly like the verb." },
  { w: "Bolt.new", ipa: "/ˈboʊlt njuː/", r: "bolt new", aIpa: "", aR: "", url: "https://bolt.new/", srcLabel: "Bolt.new", cat: "product", conf: "community-consensus", notes: "\"BOLT-new\" — two words." },
  { w: "Agno", ipa: "/ˈæɡnoʊ/", r: "ag no", aIpa: "", aR: "", url: "https://docs.agno.com/", srcLabel: "Agno docs", cat: "product", conf: "community-consensus", notes: "\"AG-no\" — Python agent framework." },
  { w: "smolagents", ipa: "/ˈsmoʊlˌeɪdʒənts/", r: "smol agents", aIpa: "", aR: "", url: "https://huggingface.co/docs/smolagents/", srcLabel: "HuggingFace smolagents", cat: "product", conf: "community-consensus", notes: "\"SMOL-agents\" — Hugging Face tiny agent lib." },
  { w: "Outlines", ipa: "/ˈaʊtˌlaɪnz/", r: "out lines", aIpa: "", aR: "", url: "https://dottxt-ai.github.io/outlines/", srcLabel: "Outlines", cat: "product", conf: "community-consensus", notes: "\"OUT-lines\" — structured LLM generation." },
  { w: "Instructor", ipa: "/ɪnˈstrʌktər/", r: "in struk ter", aIpa: "", aR: "", url: "https://python.useinstructor.com/", srcLabel: "Instructor", cat: "product", conf: "community-consensus", notes: "\"in-STRUCK-tor\" — structured outputs for OpenAI/Anthropic." },
  { w: "Guardrails", ipa: "/ˈɡɑːrdˌreɪlz/", r: "guard rails", aIpa: "", aR: "", url: "https://www.guardrailsai.com/", srcLabel: "Guardrails AI", cat: "product", conf: "community-consensus", notes: "\"GUARD-rails\" — LLM validation framework." },
  { w: "Marvin", ipa: "/ˈmɑːrvɪn/", r: "mar vin", aIpa: "", aR: "", url: "https://www.askmarvin.ai/", srcLabel: "Marvin", cat: "product", conf: "community-consensus", notes: "\"MAR-vin\" — Prefect's AI engineering toolkit." },
  { w: "Phidata", ipa: "/ˈfaɪˌdeɪtə/", r: "fie data", aIpa: "", aR: "", url: "https://www.phidata.com/", srcLabel: "Phidata", cat: "product", conf: "community-consensus", notes: "\"FYE-data\" — agent framework now rebranded as Agno." },
  { w: "Haystack", ipa: "/ˈheɪˌstæk/", r: "hay stack", aIpa: "", aR: "", url: "https://haystack.deepset.ai/", srcLabel: "Haystack", cat: "product", conf: "community-consensus", notes: "\"HAY-stack\" — Deepset's NLP framework." },
  { w: "RAGAS", ipa: "/ˈræɡəs/", r: "rag us", aIpa: "", aR: "", url: "https://docs.ragas.io/", srcLabel: "Ragas", cat: "product", conf: "community-consensus", notes: "\"RAG-us\" — RAG evaluation library." },
  { w: "Pydantic AI", ipa: "/paɪˈdæntɪk eɪ aɪ/", r: "pie dantick A I", aIpa: "", aR: "", url: "https://ai.pydantic.dev/", srcLabel: "Pydantic AI", cat: "product", conf: "community-consensus", notes: "\"pie-DAN-tick A-I\" — same maker as Pydantic." },
  { w: "Windsurf", ipa: "/ˈwɪndˌsɜːrf/", r: "wind surf", aIpa: "", aR: "", url: "https://codeium.com/windsurf", srcLabel: "Codeium Windsurf", cat: "product", conf: "community-consensus", notes: "\"WIND-surf\" — Codeium's AI IDE." },
  { w: "Lovable", ipa: "/ˈlʌvəbəl/", r: "love a bul", aIpa: "", aR: "", url: "https://lovable.dev/", srcLabel: "Lovable", cat: "product", conf: "community-consensus", notes: "\"LUV-uh-bul\" — AI app builder." },
  { w: "v0", ipa: "/ˌviː ˈzɪəroʊ/", r: "V zero", aIpa: "", aR: "", url: "https://v0.dev/", srcLabel: "Vercel v0", cat: "product", conf: "community-consensus", notes: "\"V-zero\" — Vercel's AI UI generator." },
  { w: "n8n", ipa: "/ˌɛn ˈeɪt ɛn/", r: "N eight N", aIpa: "", aR: "", url: "https://n8n.io/", srcLabel: "n8n", cat: "product", conf: "creator-clarified", notes: "\"N-eight-N\" — workflow automation. Documented as \"nodemation\"." },
  { w: "Tabnine", ipa: "/ˈtæbnaɪn/", r: "tab nine", aIpa: "", aR: "", url: "https://www.tabnine.com/", srcLabel: "Tabnine", cat: "product", conf: "community-consensus", notes: "\"TAB-nine\" — AI completion.\"" },
  { w: "Roo", ipa: "/ruː/", r: "roo", aIpa: "", aR: "", url: "https://github.com/RooVetGit/Roo-Cline", srcLabel: "Roo Code", cat: "product", conf: "community-consensus", notes: "\"roo\" — fork of Cline." },
  { w: "Crystal", ipa: "/ˈkrɪstəl/", r: "crys tul", aIpa: "", aR: "", url: "https://crystal-lang.org/", srcLabel: "Crystal", cat: "product", conf: "community-consensus", notes: "\"CRIS-tul\" — Ruby-like compiled lang." },
  { w: "Nim", ipa: "/nɪm/", r: "nim", aIpa: "", aR: "", url: "https://nim-lang.org/", srcLabel: "Nim", cat: "product", conf: "community-consensus", notes: "\"nim\" — one syllable." },
  { w: "Lean", ipa: "/liːn/", r: "leen", aIpa: "", aR: "", url: "https://lean-lang.org/", srcLabel: "Lean", cat: "product", conf: "community-consensus", notes: "\"leen\" — theorem prover and language." },
  { w: "Idris", ipa: "/ˈɪdrɪs/", r: "id riss", aIpa: "", aR: "", url: "https://www.idris-lang.org/", srcLabel: "Idris", cat: "product", conf: "community-consensus", notes: "\"ID-riss\" — dependently-typed lang." },
  { w: "Coq", ipa: "/kɒk/", r: "kok", aIpa: "", aR: "", url: "https://rocq-prover.org/", srcLabel: "Rocq (formerly Coq)", cat: "product", conf: "community-consensus", notes: "\"kok\" — proof assistant. Now renamed Rocq." },
  { w: "Agda", ipa: "/ˈæɡdə/", r: "ag duh", aIpa: "", aR: "", url: "https://wiki.portal.chalmers.se/agda/", srcLabel: "Agda", cat: "product", conf: "community-consensus", notes: "\"AG-duh\" — dependently-typed lang." },
  { w: "F#", ipa: "/ˌɛf ˈʃɑːrp/", r: "F sharp", aIpa: "", aR: "", url: "https://fsharp.org/", srcLabel: "F#", cat: "product", conf: "community-consensus", notes: "\"F-sharp\" — like the musical note." },
  { w: "ReScript", ipa: "/ˈriːˌskrɪpt/", r: "ree script", aIpa: "", aR: "", url: "https://rescript-lang.org/", srcLabel: "ReScript", cat: "product", conf: "community-consensus", notes: "\"REE-script\" — typed JS lang." },
  { w: "Dart", ipa: "/dɑːrt/", r: "dart", aIpa: "", aR: "", url: "https://dart.dev/", srcLabel: "Dart", cat: "product", conf: "community-consensus", notes: "\"dart\" — Google's language for Flutter." },
  { w: "Flutter", ipa: "/ˈflʌtər/", r: "flutter", aIpa: "", aR: "", url: "https://flutter.dev/", srcLabel: "Flutter", cat: "product", conf: "community-consensus", notes: "\"FLUT-er\" — cross-platform UI toolkit." },
  { w: "Pony", ipa: "/ˈpoʊni/", r: "po nee", aIpa: "", aR: "", url: "https://www.ponylang.io/", srcLabel: "Pony", cat: "product", conf: "community-consensus", notes: "\"POH-nee\" — actor-model lang." },
  { w: "PlanetScale", ipa: "/ˈplænɪtˌskeɪl/", r: "planet scale", aIpa: "", aR: "", url: "https://planetscale.com/", srcLabel: "PlanetScale", cat: "product", conf: "community-consensus", notes: "\"PLANET-scale\" — MySQL-compatible serverless DB." },
  { w: "Neon", ipa: "/ˈniːɒn/", r: "nee on", aIpa: "", aR: "", url: "https://neon.tech/", srcLabel: "Neon", cat: "product", conf: "community-consensus", notes: "\"NEE-on\" — serverless Postgres." },
  { w: "Turso", ipa: "/ˈtɜːrsoʊ/", r: "tur so", aIpa: "", aR: "", url: "https://turso.tech/", srcLabel: "Turso", cat: "product", conf: "community-consensus", notes: "\"TUR-so\" — edge SQLite." },
  { w: "libSQL", ipa: "/ˌlɪb ɛs kjuː ˈɛl/", r: "lib S Q L", aIpa: "", aR: "", url: "https://github.com/tursodatabase/libsql", srcLabel: "libSQL", cat: "product", conf: "community-consensus", notes: "\"LIB-S-Q-L\" — Turso's SQLite fork." },
  { w: "Dgraph", ipa: "/ˈdiːˌɡræf/", r: "D graph", aIpa: "", aR: "", url: "https://dgraph.io/", srcLabel: "Dgraph", cat: "product", conf: "community-consensus", notes: "\"D-graph\" — graph DB." },
  { w: "FaunaDB", ipa: "/ˈfɔːnə diː biː/", r: "faw na D B", aIpa: "", aR: "", url: "https://fauna.com/", srcLabel: "Fauna", cat: "product", conf: "community-consensus", notes: "\"FAW-na-D-B\" — serverless DB." },
  { w: "OpenSearch", ipa: "/ˈoʊpənˌsɜːrtʃ/", r: "open search", aIpa: "", aR: "", url: "https://opensearch.org/", srcLabel: "OpenSearch", cat: "product", conf: "community-consensus", notes: "\"OPEN-search\" — Elasticsearch fork by AWS." },
  { w: "Spanner", ipa: "/ˈspænər/", r: "span ner", aIpa: "", aR: "", url: "https://cloud.google.com/spanner", srcLabel: "Google Spanner", cat: "product", conf: "community-consensus", notes: "\"SPAN-er\" — Google's global SQL DB." },
  { w: "Bigtable", ipa: "/ˈbɪɡˌteɪbəl/", r: "big table", aIpa: "", aR: "", url: "https://cloud.google.com/bigtable", srcLabel: "Bigtable", cat: "product", conf: "community-consensus", notes: "\"BIG-table\"." },
  { w: "DynamoDB", ipa: "/daɪˈnæmoʊ diː biː/", r: "die namo D B", aIpa: "", aR: "", url: "https://aws.amazon.com/dynamodb/", srcLabel: "AWS DynamoDB", cat: "product", conf: "community-consensus", notes: "\"die-NAM-oh-D-B\"." },
  { w: "Rollup", ipa: "/ˈroʊlˌʌp/", r: "roll up", aIpa: "", aR: "", url: "https://rollupjs.org/", srcLabel: "Rollup", cat: "tool", conf: "community-consensus", notes: "\"ROLL-up\"." },
  { w: "Parcel", ipa: "/ˈpɑːrsəl/", r: "par sul", aIpa: "", aR: "", url: "https://parceljs.org/", srcLabel: "Parcel", cat: "tool", conf: "community-consensus", notes: "\"PAR-sul\"." },
  { w: "Tsup", ipa: "/ˌtiː ˈsʌp/", r: "T sup", aIpa: "", aR: "", url: "https://tsup.egoist.dev/", srcLabel: "tsup", cat: "tool", conf: "community-consensus", notes: "\"T-sup\" — esbuild-based bundler." },
  { w: "Tsx", ipa: "/ˌtiː ɛs ˈɛks/", r: "T S X", aIpa: "", aR: "", url: "https://tsx.is/", srcLabel: "tsx", cat: "tool", conf: "community-consensus", notes: "\"T-S-X\" — TypeScript execute." },
  { w: "Vinxi", ipa: "/ˈvɪŋksi/", r: "vink see", aIpa: "", aR: "", url: "https://vinxi.vercel.app/", srcLabel: "Vinxi", cat: "tool", conf: "community-consensus", notes: "\"VINK-see\" — full-stack JS framework toolkit." },
  { w: "Capacitor", ipa: "/kəˈpæsɪtər/", r: "cuh pass i ter", aIpa: "", aR: "", url: "https://capacitorjs.com/", srcLabel: "Capacitor", cat: "tool", conf: "community-consensus", notes: "\"kuh-PASS-i-ter\" — Ionic's native runtime." },
  { w: "Ionic", ipa: "/aɪˈɒnɪk/", r: "eye on ick", aIpa: "", aR: "", url: "https://ionic.io/", srcLabel: "Ionic", cat: "product", conf: "community-consensus", notes: "\"eye-ON-ick\"." },
  { w: "Expo", ipa: "/ˈɛkspoʊ/", r: "ex po", aIpa: "", aR: "", url: "https://expo.dev/", srcLabel: "Expo", cat: "product", conf: "community-consensus", notes: "\"EX-po\" — React Native toolchain." },
  { w: "NativeScript", ipa: "/ˈneɪtɪvˌskrɪpt/", r: "native script", aIpa: "", aR: "", url: "https://nativescript.org/", srcLabel: "NativeScript", cat: "product", conf: "community-consensus", notes: "\"NATIVE-script\"." },
  { w: "Three.js", ipa: "/ˈθriː dʒeɪ ɛs/", r: "three J S", aIpa: "", aR: "", url: "https://threejs.org/", srcLabel: "Three.js", cat: "product", conf: "community-consensus", notes: "\"three-J-S\" — WebGL 3D lib." },
  { w: "Babylon.js", ipa: "/ˈbæbɪlɒn dʒeɪ ɛs/", r: "babylon J S", aIpa: "", aR: "", url: "https://www.babylonjs.com/", srcLabel: "Babylon.js", cat: "product", conf: "community-consensus", notes: "\"BAB-i-lon-J-S\"." },
  { w: "PixiJS", ipa: "/ˈpɪksi dʒeɪ ɛs/", r: "pixie J S", aIpa: "", aR: "", url: "https://pixijs.com/", srcLabel: "PixiJS", cat: "product", conf: "community-consensus", notes: "\"PIX-ee-J-S\"." },
  { w: "Skia", ipa: "/ˈskiːə/", r: "skee uh", aIpa: "", aR: "", url: "https://skia.org/", srcLabel: "Skia", cat: "product", conf: "community-consensus", notes: "\"SKEE-uh\" — Google's graphics lib." },
  { w: "Manim", ipa: "/ˈmænɪm/", r: "man im", aIpa: "", aR: "", url: "https://www.manim.community/", srcLabel: "Manim", cat: "product", conf: "community-consensus", notes: "\"MAN-im\" — math animation engine, 3Blue1Brown." },
  { w: "p5.js", ipa: "/ˌpiː faɪv dʒeɪ ˈɛs/", r: "P five J S", aIpa: "", aR: "", url: "https://p5js.org/", srcLabel: "p5.js", cat: "product", conf: "community-consensus", notes: "\"P-five-J-S\" — Processing for JS." },
  { w: "D3", ipa: "/ˌdiː ˈθriː/", r: "D three", aIpa: "", aR: "", url: "https://d3js.org/", srcLabel: "D3", cat: "product", conf: "community-consensus", notes: "\"D-three\" — data visualization lib." },
  { w: "scikit-learn", ipa: "/ˈsaɪkɪt lɜːrn/", r: "sai kit learn", aIpa: "", aR: "", url: "https://scikit-learn.org/", srcLabel: "scikit-learn", cat: "product", conf: "community-consensus", notes: "\"SCI-kit-learn\"." },
  { w: "Polars", ipa: "/ˈpoʊlərz/", r: "po lerz", aIpa: "", aR: "", url: "https://pola.rs/", srcLabel: "Polars", cat: "product", conf: "community-consensus", notes: "\"POH-lerz\" — Rust-backed DataFrame lib." },
  { w: "Dask", ipa: "/dæsk/", r: "dask", aIpa: "", aR: "", url: "https://www.dask.org/", srcLabel: "Dask", cat: "product", conf: "community-consensus", notes: "\"dask\" — parallel Python compute." },
  { w: "Ray", ipa: "/reɪ/", r: "ray", aIpa: "", aR: "", url: "https://www.ray.io/", srcLabel: "Ray", cat: "product", conf: "community-consensus", notes: "\"ray\" — Anyscale's distributed compute." },
  { w: "Modin", ipa: "/ˈmoʊdɪn/", r: "mo din", aIpa: "", aR: "", url: "https://modin.readthedocs.io/", srcLabel: "Modin", cat: "product", conf: "community-consensus", notes: "\"MO-din\" — drop-in pandas replacement." },
  { w: "Spark", ipa: "/spɑːrk/", r: "spark", aIpa: "", aR: "", url: "https://spark.apache.org/", srcLabel: "Apache Spark", cat: "product", conf: "community-consensus", notes: "\"spark\" — distributed compute." },
  { w: "Flink", ipa: "/flɪŋk/", r: "flink", aIpa: "", aR: "", url: "https://flink.apache.org/", srcLabel: "Apache Flink", cat: "product", conf: "community-consensus", notes: "\"flink\" — stream processing." },
  { w: "Beam", ipa: "/biːm/", r: "beem", aIpa: "", aR: "", url: "https://beam.apache.org/", srcLabel: "Apache Beam", cat: "product", conf: "community-consensus", notes: "\"beem\" — unified batch+stream model." },
  { w: "Tailscale", ipa: "/ˈteɪlˌskeɪl/", r: "tail scale", aIpa: "", aR: "", url: "https://tailscale.com/", srcLabel: "Tailscale", cat: "product", conf: "community-consensus", notes: "\"TAIL-scale\" — mesh VPN." },
  { w: "Wireshark", ipa: "/ˈwaɪərˌʃɑːrk/", r: "wire shark", aIpa: "", aR: "", url: "https://www.wireshark.org/", srcLabel: "Wireshark", cat: "tool", conf: "community-consensus", notes: "\"WIRE-shark\"." },
  { w: "HAProxy", ipa: "/ˌeɪtʃ eɪ ˈprɒksi/", r: "H A proxy", aIpa: "", aR: "", url: "https://www.haproxy.org/", srcLabel: "HAProxy", cat: "product", conf: "community-consensus", notes: "\"H-A-proxy\"." },
  { w: "Alpine.js", ipa: "/ˈælpaɪn dʒeɪ ɛs/", r: "al pine J S", aIpa: "", aR: "", url: "https://alpinejs.dev/", srcLabel: "Alpine.js", cat: "product", conf: "community-consensus", notes: "\"AL-pine-J-S\"." },
  { w: "Phoenix", ipa: "/ˈfiːnɪks/", r: "fee nix", aIpa: "", aR: "", url: "https://www.phoenixframework.org/", srcLabel: "Phoenix", cat: "product", conf: "community-consensus", notes: "\"FEE-nix\" — Elixir web framework." },
  { w: "Rails", ipa: "/reɪlz/", r: "rails", aIpa: "", aR: "", url: "https://rubyonrails.org/", srcLabel: "Ruby on Rails", cat: "product", conf: "community-consensus", notes: "\"rails\" — Ruby on Rails." },
  { w: "Laravel", ipa: "/ˈlærəˌvɛl/", r: "lar a vel", aIpa: "", aR: "", url: "https://laravel.com/", srcLabel: "Laravel", cat: "product", conf: "community-consensus", notes: "\"LAR-uh-vel\"." },
  { w: "Symfony", ipa: "/ˈsɪmfəni/", r: "sim fo nee", aIpa: "", aR: "", url: "https://symfony.com/", srcLabel: "Symfony", cat: "product", conf: "community-consensus", notes: "\"SIM-fuh-nee\" — like symphony." },
  { w: "Sinatra", ipa: "/sɪˈnɑːtrə/", r: "sin ah tra", aIpa: "", aR: "", url: "http://sinatrarb.com/", srcLabel: "Sinatra", cat: "product", conf: "community-consensus", notes: "\"sin-AH-tra\" — Ruby micro framework." },
  { w: "Flask", ipa: "/flæsk/", r: "flask", aIpa: "", aR: "", url: "https://flask.palletsprojects.com/", srcLabel: "Flask", cat: "product", conf: "community-consensus", notes: "\"flask\" — Python microframework." },
  { w: "Starlette", ipa: "/stɑːrˈlɛt/", r: "star let", aIpa: "", aR: "", url: "https://www.starlette.io/", srcLabel: "Starlette", cat: "product", conf: "community-consensus", notes: "\"star-LET\" — ASGI framework." },
  { w: "Litestar", ipa: "/ˈlaɪtˌstɑːr/", r: "lite star", aIpa: "", aR: "", url: "https://litestar.dev/", srcLabel: "Litestar", cat: "product", conf: "community-consensus", notes: "\"LITE-star\"." },
  { w: "Sanic", ipa: "/ˈsɒnɪk/", r: "son ick", aIpa: "", aR: "", url: "https://sanic.dev/", srcLabel: "Sanic", cat: "product", conf: "community-consensus", notes: "\"SON-ick\" — Python async framework." },
  { w: "Express", ipa: "/ɪkˈsprɛs/", r: "ex press", aIpa: "", aR: "", url: "https://expressjs.com/", srcLabel: "Express", cat: "product", conf: "community-consensus", notes: "\"ex-PRESS\" — Node.js framework." },
  { w: "Koa", ipa: "/ˈkoʊə/", r: "ko ah", aIpa: "", aR: "", url: "https://koajs.com/", srcLabel: "Koa", cat: "product", conf: "community-consensus", notes: "\"KO-ah\"." },
  { w: "Fastify", ipa: "/ˈfæstɪfaɪ/", r: "fast i fye", aIpa: "", aR: "", url: "https://fastify.dev/", srcLabel: "Fastify", cat: "product", conf: "community-consensus", notes: "\"FAST-i-fye\"." },
  { w: "Hapi", ipa: "/ˈhæpi/", r: "happy", aIpa: "", aR: "", url: "https://hapi.dev/", srcLabel: "hapi", cat: "product", conf: "community-consensus", notes: "\"HAP-ee\" — like \"happy\"." },
  { w: "Echo", ipa: "/ˈɛkoʊ/", r: "ek oh", aIpa: "", aR: "", url: "https://echo.labstack.com/", srcLabel: "Echo", cat: "product", conf: "community-consensus", notes: "\"EK-oh\" — Go framework." },
  { w: "Fiber", ipa: "/ˈfaɪbər/", r: "fi ber", aIpa: "", aR: "", url: "https://gofiber.io/", srcLabel: "Fiber", cat: "product", conf: "community-consensus", notes: "\"FYE-ber\" — Go Express-like framework." },
  { w: "Gin", ipa: "/dʒɪn/", r: "jin", aIpa: "", aR: "", url: "https://gin-gonic.com/", srcLabel: "Gin", cat: "product", conf: "community-consensus", notes: "\"jin\" — Go web framework." },
  { w: "Chi", ipa: "/tʃaɪ/", r: "chai", aIpa: "", aR: "", url: "https://go-chi.io/", srcLabel: "chi", cat: "product", conf: "community-consensus", notes: "\"chai\" — Go router." },
  { w: "GORM", ipa: "/ɡɔːrm/", r: "gorm", aIpa: "", aR: "", url: "https://gorm.io/", srcLabel: "GORM", cat: "tool", conf: "community-consensus", notes: "\"gorm\" — Go ORM." },
  { w: "Cobra", ipa: "/ˈkoʊbrə/", r: "ko bra", aIpa: "", aR: "", url: "https://cobra.dev/", srcLabel: "Cobra", cat: "tool", conf: "community-consensus", notes: "\"KO-bra\" — Go CLI library." },
  { w: "Viper", ipa: "/ˈvaɪpər/", r: "vy per", aIpa: "", aR: "", url: "https://github.com/spf13/viper", srcLabel: "Viper", cat: "tool", conf: "community-consensus", notes: "\"VYE-per\" — Go config library." },
  { w: "SOLID", ipa: "/ˈsɒlɪd/", r: "solid", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/SOLID", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"SOL-id\" — OOP design principles." },
  { w: "TDD", ipa: "/ˌtiː diː ˈdiː/", r: "T D D", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Test-driven_development", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"T-D-D\" — Test Driven Development." },
  { w: "BDD", ipa: "/ˌbiː diː ˈdiː/", r: "B D D", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Behavior-driven_development", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"B-D-D\" — Behavior Driven Development." },
  { w: "CI/CD", ipa: "/ˌsiː aɪ siː ˈdiː/", r: "C I C D", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/CI/CD", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"C-I-C-D\" — letter-by-letter." },
  { w: "MVP", ipa: "/ˌɛm viː ˈpiː/", r: "M V P", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Minimum_viable_product", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"M-V-P\" — Minimum Viable Product." },
  { w: "MVC", ipa: "/ˌɛm viː ˈsiː/", r: "M V C", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"M-V-C\"." },
  { w: "MVVM", ipa: "/ˌɛm viː viː ˈɛm/", r: "M V V M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"M-V-V-M\"." },
  { w: "OOP", ipa: "/ˌoʊ oʊ ˈpiː/", r: "O O P", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Object-oriented_programming", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"O-O-P\" letter-by-letter." },
  { w: "FP", ipa: "/ˌɛf ˈpiː/", r: "F P", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Functional_programming", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"F-P\" — Functional Programming." },
  { w: "DDD", ipa: "/ˌdiː diː ˈdiː/", r: "D D D", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Domain-driven_design", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"D-D-D\" — Domain-Driven Design." },
  { w: "CQRS", ipa: "/ˌsiː kjuː ɑːr ˈɛs/", r: "C Q R S", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Command%E2%80%93query_separation", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"C-Q-R-S\" — Command Query Responsibility Segregation." },
  { w: "monad", ipa: "/ˈmɒnæd/", r: "mon ad", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Monad_(functional_programming)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"MON-ad\"." },
  { w: "functor", ipa: "/ˈfʌŋktər/", r: "funk ter", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Functor", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"FUNK-ter\"." },
  { w: "idempotent", ipa: "/ˌaɪdɛmˈpoʊtənt/", r: "eye dem po tent", aIpa: "/ˌɪdɛmˈpoʊtənt/", aR: "id em po tent", url: "https://en.wikipedia.org/wiki/Idempotence", srcLabel: "Wikipedia", cat: "cs-term", conf: "contested", notes: "\"eye-dem-PO-tent\" vs \"id-em-PO-tent\"." },
  { w: "lambda", ipa: "/ˈlæmdə/", r: "lam da", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Lambda_calculus", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"LAM-duh\"." },
  { w: "closure", ipa: "/ˈkloʊʒər/", r: "clo zure", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Closure_(computer_programming)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"CLO-zhur\"." },
  { w: "mutex", ipa: "/ˈmjuːˌtɛks/", r: "myoo tex", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Lock_(computer_science)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"MYOO-tex\" — mutual exclusion." },
  { w: "semaphore", ipa: "/ˈsɛməˌfɔːr/", r: "sem a for", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Semaphore_(programming)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"SEM-uh-for\"." },
  { w: "async", ipa: "/ˈeɪsɪŋk/", r: "a sink", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"AY-sink\"." },
  { w: "coroutine", ipa: "/ˌkoʊˈruːtiːn/", r: "co roo teen", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Coroutine", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"co-ROO-teen\"." },
  { w: "RSA", ipa: "/ˌɑːr ɛs ˈeɪ/", r: "R S A", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/RSA_(cryptosystem)", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"R-S-A\"." },
  { w: "AES", ipa: "/ˌeɪ iː ˈɛs/", r: "A E S", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Advanced_Encryption_Standard", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"A-E-S\"." },
  { w: "SHA", ipa: "/ʃɑː/", r: "shah", aIpa: "/ˌɛs eɪtʃ ˈeɪ/", aR: "S H A", url: "https://en.wikipedia.org/wiki/Secure_Hash_Algorithms", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"shah\" or letter-by-letter \"S-H-A\"." },
  { w: "TLS", ipa: "/ˌtiː ɛl ˈɛs/", r: "T L S", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Transport_Layer_Security", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"T-L-S\"." },
  { w: "PGP", ipa: "/ˌpiː dʒiː ˈpiː/", r: "P G P", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Pretty_Good_Privacy", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"P-G-P\"." },
  { w: "GPG", ipa: "/ˌdʒiː piː ˈdʒiː/", r: "G P G", aIpa: "", aR: "", url: "https://gnupg.org/", srcLabel: "GnuPG", cat: "abbreviation", conf: "community-consensus", notes: "\"G-P-G\"." },
  { w: "WebRTC", ipa: "/wɛb ɑːr tiː ˈsiː/", r: "web R T C", aIpa: "", aR: "", url: "https://webrtc.org/", srcLabel: "WebRTC", cat: "tool", conf: "community-consensus", notes: "\"web-R-T-C\"." },
  { w: "WebGPU", ipa: "/wɛb dʒiː piː ˈjuː/", r: "web G P U", aIpa: "", aR: "", url: "https://www.w3.org/TR/webgpu/", srcLabel: "W3C WebGPU", cat: "tool", conf: "community-consensus", notes: "\"web-G-P-U\"." },
  { w: "WASI", ipa: "/ˈwɑːzi/", r: "wah zee", aIpa: "", aR: "", url: "https://wasi.dev/", srcLabel: "WASI", cat: "abbreviation", conf: "community-consensus", notes: "\"WAH-zee\" — WebAssembly System Interface." },
  { w: "IPFS", ipa: "/ˌaɪ piː ɛf ˈɛs/", r: "I P F S", aIpa: "", aR: "", url: "https://ipfs.tech/", srcLabel: "IPFS", cat: "abbreviation", conf: "community-consensus", notes: "\"I-P-F-S\"." },
  { w: "Solidity", ipa: "/səˈlɪdɪti/", r: "so lid i tee", aIpa: "", aR: "", url: "https://soliditylang.org/", srcLabel: "Solidity", cat: "product", conf: "community-consensus", notes: "\"sol-LID-i-tee\"." },
  { w: "Ethereum", ipa: "/ɪˈθɪriəm/", r: "e thee ree um", aIpa: "", aR: "", url: "https://ethereum.org/", srcLabel: "Ethereum", cat: "product", conf: "community-consensus", notes: "\"e-THEE-ree-um\"." },
  { w: "Fleet", ipa: "/fliːt/", r: "fleet", aIpa: "", aR: "", url: "https://www.jetbrains.com/fleet/", srcLabel: "JetBrains Fleet", cat: "tool", conf: "community-consensus", notes: "\"fleet\"." },
  { w: "Lapce", ipa: "/læps/", r: "lapss", aIpa: "", aR: "", url: "https://lapce.dev/", srcLabel: "Lapce", cat: "tool", conf: "community-consensus", notes: "\"LAPSS\" — Rust editor." },
  { w: "Sublime", ipa: "/səˈblaɪm/", r: "sub lime", aIpa: "", aR: "", url: "https://www.sublimetext.com/", srcLabel: "Sublime Text", cat: "tool", conf: "community-consensus", notes: "\"sub-LIME\"." },
  { w: "VSCode", ipa: "/ˌviː ɛs ˈkoʊd/", r: "V S code", aIpa: "", aR: "", url: "https://code.visualstudio.com/", srcLabel: "VS Code", cat: "tool", conf: "community-consensus", notes: "\"V-S-code\"." },
  { w: "Raycast", ipa: "/ˈreɪˌkæst/", r: "ray cast", aIpa: "", aR: "", url: "https://www.raycast.com/", srcLabel: "Raycast", cat: "product", conf: "community-consensus", notes: "\"RAY-cast\"." },
  { w: "Alfred", ipa: "/ˈælfrɛd/", r: "al fred", aIpa: "", aR: "", url: "https://www.alfredapp.com/", srcLabel: "Alfred", cat: "product", conf: "community-consensus", notes: "\"AL-fred\"." },
  { w: "Homebrew", ipa: "/ˈhoʊmˌbruː/", r: "home brew", aIpa: "", aR: "", url: "https://brew.sh/", srcLabel: "Homebrew", cat: "tool", conf: "community-consensus", notes: "\"HOME-brew\"." },
  { w: "Fedora", ipa: "/fəˈdɔːrə/", r: "fuh dora", aIpa: "", aR: "", url: "https://fedoraproject.org/", srcLabel: "Fedora", cat: "product", conf: "community-consensus", notes: "\"fuh-DOR-uh\"." },
  { w: "CentOS", ipa: "/ˌsɛnt ˈoʊ ɛs/", r: "cent O S", aIpa: "", aR: "", url: "https://www.centos.org/", srcLabel: "CentOS", cat: "product", conf: "community-consensus", notes: "\"cent-O-S\"." },
  { w: "RHEL", ipa: "/rɛl/", r: "rell", aIpa: "", aR: "", url: "https://www.redhat.com/", srcLabel: "Red Hat", cat: "product", conf: "community-consensus", notes: "\"rell\" — Red Hat Enterprise Linux." },
  { w: "Manjaro", ipa: "/mənˈdʒɑːroʊ/", r: "mun jar oh", aIpa: "", aR: "", url: "https://manjaro.org/", srcLabel: "Manjaro", cat: "product", conf: "community-consensus", notes: "\"mun-JAR-oh\"." },
  { w: "FreeBSD", ipa: "/ˌfriː biː ɛs ˈdiː/", r: "free B S D", aIpa: "", aR: "", url: "https://www.freebsd.org/", srcLabel: "FreeBSD", cat: "product", conf: "community-consensus", notes: "\"free-B-S-D\"." },
  { w: "Puppeteer", ipa: "/ˌpʌpɪˈtɪər/", r: "puppy teer", aIpa: "", aR: "", url: "https://pptr.dev/", srcLabel: "Puppeteer", cat: "tool", conf: "community-consensus", notes: "\"PUP-uh-teer\"." },
  { w: "OpenTelemetry", ipa: "/ˌoʊpən tɛlɪˈmɛtri/", r: "open tel em e tree", aIpa: "", aR: "", url: "https://opentelemetry.io/", srcLabel: "OpenTelemetry", cat: "product", conf: "community-consensus", notes: "\"open-tel-EM-e-tree\"." },
  { w: "OTEL", ipa: "/ˈoʊtəl/", r: "oh tul", aIpa: "", aR: "", url: "https://opentelemetry.io/", srcLabel: "OpenTelemetry", cat: "abbreviation", conf: "community-consensus", notes: "\"OH-tul\" — short for OpenTelemetry." },
  { w: "eBPF", ipa: "/ˌiː biː piː ˈɛf/", r: "E B P F", aIpa: "", aR: "", url: "https://ebpf.io/", srcLabel: "eBPF", cat: "abbreviation", conf: "community-consensus", notes: "\"E-B-P-F\" letter-by-letter." },
  { w: "Calico", ipa: "/ˈkælɪkoʊ/", r: "cal i co", aIpa: "", aR: "", url: "https://www.tigera.io/project-calico/", srcLabel: "Tigera Calico", cat: "product", conf: "community-consensus", notes: "\"CAL-i-co\"." },
  { w: "Flannel", ipa: "/ˈflænəl/", r: "flan ul", aIpa: "", aR: "", url: "https://github.com/flannel-io/flannel", srcLabel: "Flannel", cat: "product", conf: "community-consensus", notes: "\"FLAN-ul\"." },
  { w: "CoreDNS", ipa: "/ˌkɔːr diː ɛn ˈɛs/", r: "core D N S", aIpa: "", aR: "", url: "https://coredns.io/", srcLabel: "CoreDNS", cat: "product", conf: "community-consensus", notes: "\"CORE-D-N-S\"." },
  { w: "OPA Gatekeeper", ipa: "/ˌoʊ piː eɪ ˈɡeɪtˌkiːpər/", r: "O P A gate keeper", aIpa: "", aR: "", url: "https://open-policy-agent.github.io/gatekeeper/", srcLabel: "OPA Gatekeeper", cat: "product", conf: "community-consensus", notes: "\"O-P-A GATE-keeper\"." },
  { w: "Vault", ipa: "/vɔːlt/", r: "vault", aIpa: "", aR: "", url: "https://www.vaultproject.io/", srcLabel: "HashiCorp Vault", cat: "product", conf: "community-consensus", notes: "\"vault\"." },
  { w: "Consul", ipa: "/ˈkɒnsəl/", r: "con sul", aIpa: "", aR: "", url: "https://www.consul.io/", srcLabel: "HashiCorp Consul", cat: "product", conf: "community-consensus", notes: "\"CON-sul\"." },
  { w: "Nomad", ipa: "/ˈnoʊmæd/", r: "no mad", aIpa: "", aR: "", url: "https://www.nomadproject.io/", srcLabel: "HashiCorp Nomad", cat: "product", conf: "community-consensus", notes: "\"NO-mad\"." },
  { w: "Packer", ipa: "/ˈpækər/", r: "pack er", aIpa: "", aR: "", url: "https://www.packer.io/", srcLabel: "HashiCorp Packer", cat: "product", conf: "community-consensus", notes: "\"PACK-er\"." },
  { w: "Triton", ipa: "/ˈtraɪtən/", r: "try ton", aIpa: "", aR: "", url: "https://developer.nvidia.com/triton-inference-server", srcLabel: "NVIDIA Triton", cat: "product", conf: "community-consensus", notes: "\"TRY-ton\" — NVIDIA inference server." },
  { w: "TensorRT", ipa: "/ˈtɛnsərˈɑːr tiː/", r: "tensor R T", aIpa: "", aR: "", url: "https://developer.nvidia.com/tensorrt", srcLabel: "NVIDIA TensorRT", cat: "product", conf: "community-consensus", notes: "\"TENSOR-R-T\"." },
  { w: "CUDA", ipa: "/ˈkuːdə/", r: "koo da", aIpa: "", aR: "", url: "https://developer.nvidia.com/cuda-zone", srcLabel: "NVIDIA CUDA", cat: "product", conf: "community-consensus", notes: "\"KOO-duh\"." },
  { w: "ONNX", ipa: "/ˈɒnɪks/", r: "on nix", aIpa: "", aR: "", url: "https://onnx.ai/", srcLabel: "ONNX", cat: "abbreviation", conf: "community-consensus", notes: "\"ON-nix\"." },
  { w: "Triton (OpenAI)", ipa: "/ˈtraɪtən/", r: "try ton", aIpa: "", aR: "", url: "https://triton-lang.org/", srcLabel: "OpenAI Triton", cat: "product", conf: "community-consensus", notes: "\"TRY-ton\" — Python GPU kernel DSL." },
  { w: "MLflow", ipa: "/ˌɛm ɛl ˈfloʊ/", r: "M L flow", aIpa: "", aR: "", url: "https://mlflow.org/", srcLabel: "MLflow", cat: "product", conf: "community-consensus", notes: "\"M-L-flow\"." },
  { w: "DVC", ipa: "/ˌdiː viː ˈsiː/", r: "D V C", aIpa: "", aR: "", url: "https://dvc.org/", srcLabel: "DVC", cat: "abbreviation", conf: "community-consensus", notes: "\"D-V-C\" — Data Version Control." },
  { w: "Weights & Biases", ipa: "/weɪts ænd ˈbaɪəsɪz/", r: "weights and biases", aIpa: "", aR: "", url: "https://wandb.ai/", srcLabel: "wandb", cat: "product", conf: "community-consensus", notes: "\"weights-and-BYE-uh-siz\"." },
  { w: "Comet", ipa: "/ˈkɒmət/", r: "com et", aIpa: "", aR: "", url: "https://www.comet.com/", srcLabel: "Comet ML", cat: "product", conf: "community-consensus", notes: "\"COM-et\"." },
  { w: "Redux", ipa: "/ˈriːdʌks/", r: "ree dux", aIpa: "", aR: "", url: "https://redux.js.org/", srcLabel: "Redux", cat: "product", conf: "community-consensus", notes: "\"REE-dux\"." },
  { w: "MobX", ipa: "/ˌɛm ˈɒb ɛks/", r: "mob X", aIpa: "", aR: "", url: "https://mobx.js.org/", srcLabel: "MobX", cat: "product", conf: "community-consensus", notes: "\"MOB-X\"." },
  { w: "Effector", ipa: "/ɪˈfɛktər/", r: "ef fect er", aIpa: "", aR: "", url: "https://effector.dev/", srcLabel: "Effector", cat: "product", conf: "community-consensus", notes: "\"ef-FECT-er\"." },
  { w: "XState", ipa: "/ˌɛks ˈsteɪt/", r: "X state", aIpa: "", aR: "", url: "https://stately.ai/docs/xstate", srcLabel: "XState", cat: "product", conf: "community-consensus", notes: "\"X-STATE\"." },
  { w: "Lit", ipa: "/lɪt/", r: "lit", aIpa: "", aR: "", url: "https://lit.dev/", srcLabel: "Lit", cat: "product", conf: "community-consensus", notes: "\"lit\" — Google's web components lib." },
  { w: "Stencil", ipa: "/ˈstɛnsəl/", r: "sten sil", aIpa: "", aR: "", url: "https://stenciljs.com/", srcLabel: "Stencil", cat: "product", conf: "community-consensus", notes: "\"STEN-sil\"." },
  { w: "Turborepo", ipa: "/ˈtɜːrboʊˌrɛpoʊ/", r: "tur bo re po", aIpa: "", aR: "", url: "https://turborepo.com/", srcLabel: "Turborepo", cat: "product", conf: "community-consensus", notes: "\"TUR-bo-re-po\"." },
  { w: "Lage", ipa: "/leɪdʒ/", r: "layj", aIpa: "", aR: "", url: "https://microsoft.github.io/lage/", srcLabel: "Microsoft Lage", cat: "tool", conf: "community-consensus", notes: "\"layj\" — JS task runner." },
  { w: "Moon", ipa: "/muːn/", r: "moon", aIpa: "", aR: "", url: "https://moonrepo.dev/", srcLabel: "Moon", cat: "tool", conf: "community-consensus", notes: "\"moon\" — Rust-based build system." },
  { w: "Buck2", ipa: "/bʌk tuː/", r: "buck two", aIpa: "", aR: "", url: "https://buck2.build/", srcLabel: "Buck2", cat: "tool", conf: "community-consensus", notes: "\"BUCK-two\" — Meta's build system." },
  { w: "CUDA Toolkit", ipa: "/ˈkuːdə ˈtuːlˌkɪt/", r: "koo da tool kit", aIpa: "", aR: "", url: "https://developer.nvidia.com/cuda-toolkit", srcLabel: "NVIDIA", cat: "product", conf: "community-consensus", notes: "\"KOO-duh tool-kit\"." },
  { w: "Megatron", ipa: "/ˈmɛɡəˌtrɒn/", r: "meg a tron", aIpa: "", aR: "", url: "https://github.com/NVIDIA/Megatron-LM", srcLabel: "NVIDIA Megatron", cat: "product", conf: "community-consensus", notes: "\"MEG-uh-tron\" — large-scale training framework." },
  { w: "DeepSpeed", ipa: "/ˈdiːpˌspiːd/", r: "deep speed", aIpa: "", aR: "", url: "https://www.deepspeed.ai/", srcLabel: "Microsoft DeepSpeed", cat: "product", conf: "community-consensus", notes: "\"DEEP-speed\"." },
  { w: "Axolotl", ipa: "/ˈæksəlɒtl/", r: "ak so lot ul", aIpa: "", aR: "", url: "https://axolotl.ai/", srcLabel: "Axolotl", cat: "product", conf: "community-consensus", notes: "\"AK-so-lot-ul\" — fine-tuning framework." },
  { w: "Unsloth", ipa: "/ʌnˈslɒθ/", r: "un sloth", aIpa: "", aR: "", url: "https://unsloth.ai/", srcLabel: "Unsloth", cat: "product", conf: "community-consensus", notes: "\"un-SLOTH\" — fast LLM fine-tuning." },
  { w: "Devin", ipa: "/ˈdɛvɪn/", r: "dev in", aIpa: "", aR: "", url: "https://www.cognition.ai/", srcLabel: "Cognition Devin", cat: "product", conf: "community-consensus", notes: "\"DEV-in\" — AI software engineer." },
  { w: "Sweep", ipa: "/swiːp/", r: "sweep", aIpa: "", aR: "", url: "https://docs.sweep.dev/", srcLabel: "Sweep", cat: "product", conf: "community-consensus", notes: "\"sweep\" — AI code review." },
  { w: "Magnitude", ipa: "/ˈmæɡnɪˌtjuːd/", r: "mag ni tude", aIpa: "", aR: "", url: "https://app.magnitude.run/", srcLabel: "Magnitude", cat: "product", conf: "community-consensus", notes: "\"MAG-ni-tude\" — agent testing platform." },
  { w: "Bun Test", ipa: "/bʌn tɛst/", r: "bun test", aIpa: "", aR: "", url: "https://bun.sh/docs/cli/test", srcLabel: "Bun Test", cat: "tool", conf: "community-consensus", notes: "\"BUN-test\"." },
  { w: "Mocha", ipa: "/ˈmoʊkə/", r: "mo ka", aIpa: "", aR: "", url: "https://mochajs.org/", srcLabel: "Mocha", cat: "product", conf: "community-consensus", notes: "\"MO-ka\" — like the coffee." },
  { w: "Chai", ipa: "/tʃaɪ/", r: "chai", aIpa: "", aR: "", url: "https://www.chaijs.com/", srcLabel: "Chai", cat: "tool", conf: "community-consensus", notes: "\"chai\" — like the tea." },
  { w: "Selenium", ipa: "/səˈliːniəm/", r: "se lee nee um", aIpa: "", aR: "", url: "https://www.selenium.dev/", srcLabel: "Selenium", cat: "tool", conf: "community-consensus", notes: "\"se-LEE-nee-um\" — like the element." },
  { w: "JUnit", ipa: "/ˌdʒeɪ ˈjuːnɪt/", r: "J unit", aIpa: "", aR: "", url: "https://junit.org/", srcLabel: "JUnit", cat: "tool", conf: "community-consensus", notes: "\"J-unit\"." },
  { w: "pytest", ipa: "/ˈpaɪtɛst/", r: "pie test", aIpa: "", aR: "", url: "https://docs.pytest.org/", srcLabel: "pytest", cat: "tool", conf: "community-consensus", notes: "\"PIE-test\"." },
  { w: "recursion", ipa: "/rɪˈkɜːrʒən/", r: "re curr zhun", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Recursion_(computer_science)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"re-CUR-zhun\"." },
  { w: "polymorphism", ipa: "/ˌpɒliˈmɔːrfɪzəm/", r: "pol ee mor fizm", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Polymorphism_(computer_science)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"pol-ee-MOR-fizm\"." },
  { w: "encapsulation", ipa: "/ɪnˌkæpsjʊˈleɪʃən/", r: "en cap soo lay shun", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"en-cap-soo-LAY-shun\"." },
  { w: "iterator", ipa: "/ˈɪtəˌreɪtər/", r: "it er ay ter", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Iterator", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"IT-er-AY-ter\"." },
  { w: "generator", ipa: "/ˈdʒɛnəˌreɪtər/", r: "jen er ay ter", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Generator_(computer_programming)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"JEN-er-AY-ter\"." },
  { w: "MessagePack", ipa: "/ˈmɛsɪdʒˌpæk/", r: "message pack", aIpa: "", aR: "", url: "https://msgpack.org/", srcLabel: "MessagePack", cat: "product", conf: "community-consensus", notes: "\"MESSAGE-pack\"." },
  { w: "Avro", ipa: "/ˈævroʊ/", r: "av ro", aIpa: "", aR: "", url: "https://avro.apache.org/", srcLabel: "Apache Avro", cat: "product", conf: "community-consensus", notes: "\"AV-ro\"." },
  { w: "Parquet", ipa: "/pɑːrˈkeɪ/", r: "par kay", aIpa: "", aR: "", url: "https://parquet.apache.org/", srcLabel: "Apache Parquet", cat: "product", conf: "community-consensus", notes: "\"par-KAY\" — like the floor." },
  { w: "Arrow", ipa: "/ˈæroʊ/", r: "arrow", aIpa: "", aR: "", url: "https://arrow.apache.org/", srcLabel: "Apache Arrow", cat: "product", conf: "community-consensus", notes: "\"AR-row\"." },
  { w: "Iceberg", ipa: "/ˈaɪsˌbɜːrɡ/", r: "ice berg", aIpa: "", aR: "", url: "https://iceberg.apache.org/", srcLabel: "Apache Iceberg", cat: "product", conf: "community-consensus", notes: "\"ICE-berg\"." },
  { w: "Hudi", ipa: "/ˈhuːdi/", r: "who dee", aIpa: "", aR: "", url: "https://hudi.apache.org/", srcLabel: "Apache Hudi", cat: "product", conf: "community-consensus", notes: "\"HOO-dee\"." },
  { w: "Delta Lake", ipa: "/ˈdɛltə leɪk/", r: "del ta lake", aIpa: "", aR: "", url: "https://delta.io/", srcLabel: "Delta Lake", cat: "product", conf: "community-consensus", notes: "\"DEL-ta lake\"." },
  { w: "Unity", ipa: "/ˈjuːnɪti/", r: "you ni tee", aIpa: "", aR: "", url: "https://unity.com/", srcLabel: "Unity", cat: "product", conf: "community-consensus", notes: "\"YOU-ni-tee\"." },
  { w: "Godot", ipa: "/ˈɡɒdoʊ/", r: "god oh", aIpa: "", aR: "", url: "https://godotengine.org/", srcLabel: "Godot", cat: "product", conf: "creator-clarified", notes: "\"GOD-oh\" per project FAQ. \"GOD-ot\" also widespread." },
  { w: "Unreal", ipa: "/ʌnˈriːəl/", r: "un real", aIpa: "", aR: "", url: "https://www.unrealengine.com/", srcLabel: "Epic Games", cat: "product", conf: "community-consensus", notes: "\"un-REAL\"." },
  { w: "Bevy", ipa: "/ˈbɛvi/", r: "bevy", aIpa: "", aR: "", url: "https://bevyengine.org/", srcLabel: "Bevy", cat: "product", conf: "community-consensus", notes: "\"BEV-ee\" — Rust game engine." },
  { w: "OIDC", ipa: "/ˌoʊ aɪ diː ˈsiː/", r: "O I D C", aIpa: "", aR: "", url: "https://openid.net/connect/", srcLabel: "OpenID Connect", cat: "abbreviation", conf: "community-consensus", notes: "\"O-I-D-C\"." },
  { w: "FIDO", ipa: "/ˈfaɪdoʊ/", r: "fie doh", aIpa: "", aR: "", url: "https://fidoalliance.org/", srcLabel: "FIDO Alliance", cat: "acronym", conf: "community-consensus", notes: "\"FYE-doh\"." },
  { w: "WebAuthn", ipa: "/ˈwɛb ɔːθən/", r: "web auth en", aIpa: "", aR: "", url: "https://www.w3.org/TR/webauthn-2/", srcLabel: "W3C WebAuthn", cat: "abbreviation", conf: "community-consensus", notes: "\"WEB-AUTH-en\"." },
  { w: "Passkey", ipa: "/ˈpæsˌkiː/", r: "pass key", aIpa: "", aR: "", url: "https://fidoalliance.org/passkeys/", srcLabel: "FIDO Alliance", cat: "product", conf: "community-consensus", notes: "\"PASS-key\"." },
  { w: "Tauri", ipa: "/ˈtaʊri/", r: "tau ree", aIpa: "", aR: "", url: "https://tauri.app/", srcLabel: "Tauri", cat: "product", conf: "community-consensus", notes: "\"TAU-ree\" — Rust desktop framework." },
  { w: "Electron", ipa: "/ɪˈlɛktrɒn/", r: "e lec tron", aIpa: "", aR: "", url: "https://www.electronjs.org/", srcLabel: "Electron", cat: "product", conf: "community-consensus", notes: "\"e-LEC-tron\"." },
  { w: "Wails", ipa: "/weɪlz/", r: "wails", aIpa: "", aR: "", url: "https://wails.io/", srcLabel: "Wails", cat: "product", conf: "community-consensus", notes: "\"wails\" — Go desktop framework." },
  { w: "Workers", ipa: "/ˈwɜːrkərz/", r: "work ers", aIpa: "", aR: "", url: "https://workers.cloudflare.com/", srcLabel: "Cloudflare Workers", cat: "product", conf: "community-consensus", notes: "\"WORK-ers\"." },
  { w: "Fastly", ipa: "/ˈfæstli/", r: "fast lee", aIpa: "", aR: "", url: "https://www.fastly.com/", srcLabel: "Fastly", cat: "product", conf: "community-consensus", notes: "\"FAST-lee\"." },
  { w: "Fly.io", ipa: "/ˌflaɪ doʊt ˈaɪ oʊ/", r: "fly dot io", aIpa: "", aR: "", url: "https://fly.io/", srcLabel: "Fly.io", cat: "product", conf: "community-consensus", notes: "\"FLY-dot-I-O\"." },
  { w: "Render", ipa: "/ˈrɛndər/", r: "ren der", aIpa: "", aR: "", url: "https://render.com/", srcLabel: "Render", cat: "product", conf: "community-consensus", notes: "\"REN-der\"." },
  { w: "Railway", ipa: "/ˈreɪlˌweɪ/", r: "rail way", aIpa: "", aR: "", url: "https://railway.app/", srcLabel: "Railway", cat: "product", conf: "community-consensus", notes: "\"RAIL-way\"." },
  { w: "Hadoop", ipa: "/həˈduːp/", r: "huh doop", aIpa: "", aR: "", url: "https://hadoop.apache.org/", srcLabel: "Apache Hadoop", cat: "product", conf: "community-consensus", notes: "\"huh-DOOP\"." },
  { w: "Hive", ipa: "/haɪv/", r: "hive", aIpa: "", aR: "", url: "https://hive.apache.org/", srcLabel: "Apache Hive", cat: "product", conf: "community-consensus", notes: "\"hive\"." },
  { w: "Airflow", ipa: "/ˈɛərˌfloʊ/", r: "air flow", aIpa: "", aR: "", url: "https://airflow.apache.org/", srcLabel: "Apache Airflow", cat: "product", conf: "community-consensus", notes: "\"AIR-flow\"." },
  { w: "Dagster", ipa: "/ˈdæɡstər/", r: "dag ster", aIpa: "", aR: "", url: "https://dagster.io/", srcLabel: "Dagster", cat: "product", conf: "community-consensus", notes: "\"DAG-ster\"." },
  { w: "Prefect", ipa: "/ˈpriːˌfɛkt/", r: "pree fekt", aIpa: "", aR: "", url: "https://www.prefect.io/", srcLabel: "Prefect", cat: "product", conf: "community-consensus", notes: "\"PREE-fekt\"." },
  { w: "Mage", ipa: "/meɪdʒ/", r: "mayj", aIpa: "", aR: "", url: "https://www.mage.ai/", srcLabel: "Mage", cat: "product", conf: "community-consensus", notes: "\"mayj\" — orchestration tool." },
  { w: "Maven", ipa: "/ˈmeɪvən/", r: "may ven", aIpa: "", aR: "", url: "https://maven.apache.org/", srcLabel: "Apache Maven", cat: "tool", conf: "community-consensus", notes: "\"MAY-ven\"." },
  { w: "Quarkus", ipa: "/ˈkwɑːrkəs/", r: "quar kus", aIpa: "", aR: "", url: "https://quarkus.io/", srcLabel: "Quarkus", cat: "product", conf: "community-consensus", notes: "\"QUAR-kus\"." },
  { w: "Micronaut", ipa: "/ˈmaɪkroʊnɔːt/", r: "my kro nawt", aIpa: "", aR: "", url: "https://micronaut.io/", srcLabel: "Micronaut", cat: "product", conf: "community-consensus", notes: "\"MY-kro-nawt\"." },
  { w: "GraalVM", ipa: "/ˈɡrɑːl viː ɛm/", r: "grahl V M", aIpa: "", aR: "", url: "https://www.graalvm.org/", srcLabel: "GraalVM", cat: "product", conf: "community-consensus", notes: "\"GRAHL-V-M\"." },
  { w: "JVM", ipa: "/ˌdʒeɪ viː ˈɛm/", r: "J V M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Java_virtual_machine", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "\"J-V-M\"." },
  { w: "Blazor", ipa: "/ˈbleɪzər/", r: "blay zer", aIpa: "", aR: "", url: "https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor", srcLabel: "Microsoft Blazor", cat: "product", conf: "community-consensus", notes: "\"BLAY-zer\"." },
  { w: "MAUI", ipa: "/ˈmaʊi/", r: "maw ee", aIpa: "", aR: "", url: "https://dotnet.microsoft.com/apps/maui", srcLabel: "Microsoft MAUI", cat: "abbreviation", conf: "community-consensus", notes: "\".NET MAW-ee\"." },
  { w: "WinUI", ipa: "/ˌwɪn juː ˈaɪ/", r: "win U I", aIpa: "", aR: "", url: "https://learn.microsoft.com/windows/apps/winui/", srcLabel: "Microsoft WinUI", cat: "abbreviation", conf: "community-consensus", notes: "\"WIN-U-I\"." },
  { w: "React", ipa: "/riˈækt/", r: "ree akt", aIpa: "", aR: "", url: "https://react.dev/", srcLabel: "React", cat: "product", conf: "community-consensus", notes: "\"ree-AKT\"." },
  { w: "Angular", ipa: "/ˈæŋɡjələr/", r: "ang you lar", aIpa: "", aR: "", url: "https://angular.dev/", srcLabel: "Angular", cat: "product", conf: "community-consensus", notes: "\"ANG-yuh-ler\"." },
  { w: "Ember", ipa: "/ˈɛmbər/", r: "em ber", aIpa: "", aR: "", url: "https://emberjs.com/", srcLabel: "Ember.js", cat: "product", conf: "community-consensus", notes: "\"EM-ber\"." },
  { w: "Marko", ipa: "/ˈmɑːrkoʊ/", r: "mar ko", aIpa: "", aR: "", url: "https://markojs.com/", srcLabel: "Marko", cat: "product", conf: "community-consensus", notes: "\"MAR-koh\"." },
  { w: "Axum", ipa: "/ˈæksəm/", r: "ax um", aIpa: "", aR: "", url: "https://github.com/tokio-rs/axum", srcLabel: "Tokio Axum", cat: "product", conf: "community-consensus", notes: "\"AX-um\"." },
  { w: "Actix", ipa: "/ˈæktɪks/", r: "ak tix", aIpa: "", aR: "", url: "https://actix.rs/", srcLabel: "Actix", cat: "product", conf: "community-consensus", notes: "\"AK-tix\"." },
  { w: "Tokio", ipa: "/ˈtoʊkjoʊ/", r: "to kyo", aIpa: "", aR: "", url: "https://tokio.rs/", srcLabel: "Tokio", cat: "product", conf: "community-consensus", notes: "\"TOH-kyo\" — like the city." },
  { w: "Tonic", ipa: "/ˈtɒnɪk/", r: "ton ik", aIpa: "", aR: "", url: "https://github.com/hyperium/tonic", srcLabel: "Tonic", cat: "product", conf: "community-consensus", notes: "\"TON-ik\" — Rust gRPC." },
  { w: "Hyper", ipa: "/ˈhaɪpər/", r: "hy per", aIpa: "", aR: "", url: "https://hyper.rs/", srcLabel: "Hyper", cat: "product", conf: "community-consensus", notes: "\"HY-per\" — Rust HTTP." },
  { w: "Diesel", ipa: "/ˈdiːzəl/", r: "dee zul", aIpa: "", aR: "", url: "https://diesel.rs/", srcLabel: "Diesel", cat: "tool", conf: "community-consensus", notes: "\"DEE-zul\" — Rust ORM." },
  { w: "SeaORM", ipa: "/ˈsiː ɔːrm/", r: "C O R M", aIpa: "", aR: "", url: "https://www.sea-ql.org/SeaORM/", srcLabel: "SeaORM", cat: "tool", conf: "community-consensus", notes: "\"SEA-orm\"." },
  { w: "Leptos", ipa: "/ˈlɛptɒs/", r: "lep toss", aIpa: "", aR: "", url: "https://leptos.dev/", srcLabel: "Leptos", cat: "product", conf: "community-consensus", notes: "\"LEP-toss\" — Rust web framework." },
  { w: "Dioxus", ipa: "/daɪˈɒksəs/", r: "die ox us", aIpa: "", aR: "", url: "https://dioxuslabs.com/", srcLabel: "Dioxus", cat: "product", conf: "community-consensus", notes: "\"die-OX-us\"." },
  { w: "Quartz", ipa: "/kwɔːrts/", r: "quartz", aIpa: "", aR: "", url: "https://quartz.jzhao.xyz/", srcLabel: "Quartz", cat: "product", conf: "community-consensus", notes: "\"quartz\" — static site gen for digital gardens." },
  { w: "Eleventy", ipa: "/ɪˈlɛvənti/", r: "e lev en tee", aIpa: "", aR: "", url: "https://www.11ty.dev/", srcLabel: "Eleventy", cat: "product", conf: "community-consensus", notes: "\"e-LEV-en-tee\" — aka 11ty." },
  { w: "Jekyll", ipa: "/ˈdʒɛkəl/", r: "jek ul", aIpa: "", aR: "", url: "https://jekyllrb.com/", srcLabel: "Jekyll", cat: "product", conf: "community-consensus", notes: "\"JEK-ul\"." },
  { w: "Gatsby", ipa: "/ˈɡætsbi/", r: "gats bee", aIpa: "", aR: "", url: "https://www.gatsbyjs.com/", srcLabel: "Gatsby", cat: "product", conf: "community-consensus", notes: "\"GATS-bee\"." },
  { w: "Pelican", ipa: "/ˈpɛlɪkən/", r: "pel i kun", aIpa: "", aR: "", url: "https://getpelican.com/", srcLabel: "Pelican", cat: "product", conf: "community-consensus", notes: "\"PEL-i-kun\"." },
  { w: "hermes", ipa: "/ˈhɜːr miːz/", r: "HER meez", aIpa: "", aR: "", url: "https://huggingface.co/NousResearch", srcLabel: "Nous Research HF", cat: "product", conf: "community-consensus", notes: "Nous Research's open-source LLM series. Greek messenger god — \"HER-meez.\"" },
  { w: "aaru", ipa: "/ˈɑː ruː/", r: "AH roo", aIpa: "", aR: "", url: "https://aaru.com/", srcLabel: "Aaru official", cat: "project", conf: "community-consensus", notes: "AI poll-simulation startup. Egyptian afterlife \"field of reeds\" — \"AH-roo.\"" },
  { w: "simile", ipa: "/ˈsɪ mə li/", r: "SIM uh lee", aIpa: "/ˈsɪm aɪl/", aR: "SIM ile", url: "https://www.merriam-webster.com/dictionary/simile", srcLabel: "Merriam-Webster", cat: "cs-term", conf: "community-consensus", notes: "Literary figure of speech, three syllables \"SIM-uh-lee.\" Frequently mispronounced \"sigh-MILE.\"" },
  { w: "xai", ipa: "/ˌɛks eɪ ˈaɪ/", r: "X A I", aIpa: "", aR: "", url: "https://x.ai/", srcLabel: "xAI official", cat: "project", conf: "community-consensus", notes: "Elon Musk's AI company. Spell out the letters: \"X-A-I.\" Not \"zai.\"" },
  { w: "ai21", ipa: "/ˌeɪ aɪ ˈtwɛn ti wʌn/", r: "A I twenty one", aIpa: "", aR: "", url: "https://www.ai21.com/", srcLabel: "AI21 Labs", cat: "project", conf: "community-consensus", notes: "Tel Aviv AI lab. \"A-I twenty-one.\"" },
  { w: "inflection", ipa: "/ɪn ˈflɛk ʃən/", r: "in FLEK shun", aIpa: "", aR: "", url: "https://inflection.ai/", srcLabel: "Inflection AI", cat: "project", conf: "community-consensus", notes: "AI company behind Pi. Standard English noun: \"in-FLEK-shun.\"" },
  { w: "adept", ipa: "/ə ˈdɛpt/", r: "uh DEPT", aIpa: "", aR: "", url: "https://www.adept.ai/", srcLabel: "Adept AI", cat: "project", conf: "community-consensus", notes: "AI agents company. \"uh-DEPT\" — stress on second syllable." },
  { w: "character.ai", ipa: "/ˈkær ɪk tər eɪ aɪ/", r: "KAIR ik ter A I", aIpa: "", aR: "", url: "https://character.ai/", srcLabel: "Character.AI", cat: "project", conf: "community-consensus", notes: "\"KAIR-ik-ter dot A-I.\" Letters at the end." },
  { w: "perplexity", ipa: "/pər ˈplɛk sə ti/", r: "per PLEK suh tee", aIpa: "", aR: "", url: "https://www.perplexity.ai/", srcLabel: "Perplexity AI", cat: "project", conf: "community-consensus", notes: "\"per-PLEK-suh-tee\" — same as the English noun." },
  { w: "cerebras", ipa: "/sə ˈriː brəs/", r: "suh REE bruhs", aIpa: "", aR: "", url: "https://www.cerebras.net/", srcLabel: "Cerebras Systems", cat: "project", conf: "community-consensus", notes: "Wafer-scale AI chip company. \"suh-REE-bruhs.\"" },
  { w: "etched", ipa: "/ɛtʃt/", r: "echt", aIpa: "", aR: "", url: "https://www.etched.com/", srcLabel: "Etched", cat: "project", conf: "community-consensus", notes: "Transformer ASIC chip startup. Past tense of \"etch\" — single syllable." },
  { w: "sambanova", ipa: "/ˌsæm bə ˈnoʊ və/", r: "sam buh NO vuh", aIpa: "", aR: "", url: "https://sambanova.ai/", srcLabel: "SambaNova", cat: "project", conf: "community-consensus", notes: "AI chip + platform company. \"sam-buh-NO-vuh.\"" },
  { w: "together.ai", ipa: "/tə ˈɡɛð ər eɪ aɪ/", r: "tuh GETH er A I", aIpa: "", aR: "", url: "https://www.together.ai/", srcLabel: "Together AI", cat: "project", conf: "community-consensus", notes: "Inference platform. \"tuh-GETH-er dot A-I.\"" },
  { w: "fireworks.ai", ipa: "/ˈfaɪər wɜːrks eɪ aɪ/", r: "FIRE works A I", aIpa: "", aR: "", url: "https://fireworks.ai/", srcLabel: "Fireworks AI", cat: "project", conf: "community-consensus", notes: "Fast inference platform. Compound \"fire-works.\"" },
  { w: "modular", ipa: "/ˈmɒ dʒə lər/", r: "MOJ uh ler", aIpa: "", aR: "", url: "https://www.modular.com/", srcLabel: "Modular", cat: "project", conf: "community-consensus", notes: "Mojo's parent company. Standard English \"modular.\"" },
  { w: "nous", ipa: "/naʊs/", r: "nowss", aIpa: "/nuːs/", aR: "noose", url: "https://nousresearch.com/", srcLabel: "Nous Research", cat: "project", conf: "contested", notes: "Greek philosophical \"intellect.\" Modern English \"NOWSS\" (rhymes with house); classical \"NOOS.\"" },
  { w: "manus", ipa: "/ˈmɑː nəs/", r: "MAH nuhs", aIpa: "", aR: "", url: "https://manus.im/", srcLabel: "Manus AI", cat: "product", conf: "community-consensus", notes: "General-purpose AI agent. Latin for \"hand\" — \"MAH-nuhs.\"" },
  { w: "cognition", ipa: "/kɒɡ ˈnɪ ʃən/", r: "kog NISH un", aIpa: "", aR: "", url: "https://www.cognition.ai/", srcLabel: "Cognition AI", cat: "project", conf: "community-consensus", notes: "Devin's parent company. English noun \"kog-NISH-un.\"" },
  { w: "magic.dev", ipa: "/ˈmæ dʒɪk dɛv/", r: "MAJ ik dev", aIpa: "", aR: "", url: "https://magic.dev/", srcLabel: "Magic Dev", cat: "project", conf: "community-consensus", notes: "Long-context code-model lab. Same as the English word + dev." },
  { w: "augment", ipa: "/ɔːɡ ˈmɛnt/", r: "awg MENT", aIpa: "", aR: "", url: "https://www.augmentcode.com/", srcLabel: "Augment Code", cat: "project", conf: "community-consensus", notes: "AI coding assistant. Stress on second syllable." },
  { w: "supermaven", ipa: "/ˌsuː pər ˈmeɪ vən/", r: "soo per MAY vun", aIpa: "", aR: "", url: "https://supermaven.com/", srcLabel: "Supermaven", cat: "project", conf: "community-consensus", notes: "Fast code completion. \"soo-per-MAY-vun\" (maven = expert)." },
  { w: "plandex", ipa: "/ˈplæn dɛks/", r: "PLAN deks", aIpa: "", aR: "", url: "https://github.com/plandex-ai/plandex", srcLabel: "Plandex repo", cat: "project", conf: "community-consensus", notes: "Terminal AI coding agent. \"PLAN-deks.\"" },
  { w: "void", ipa: "/vɔɪd/", r: "void", aIpa: "", aR: "", url: "https://voideditor.com/", srcLabel: "Void Editor", cat: "project", conf: "community-consensus", notes: "Open-source Cursor alternative. Standard \"VOYD.\"" },
  { w: "composio", ipa: "/kəm ˈpoʊ zi oʊ/", r: "kum POE zee oh", aIpa: "", aR: "", url: "https://composio.dev/", srcLabel: "Composio", cat: "project", conf: "community-consensus", notes: "Tool-use platform for AI agents. \"kum-POE-zee-oh.\"" },
  { w: "e2b", ipa: "/ˌiː tuː ˈbiː/", r: "E two B", aIpa: "", aR: "", url: "https://e2b.dev/", srcLabel: "E2B", cat: "project", conf: "community-consensus", notes: "AI code-execution sandboxes. \"E-two-B.\"" },
  { w: "mem0", ipa: "/ˌmɛm ˈzɪər oʊ/", r: "mem ZEE roh", aIpa: "", aR: "", url: "https://mem0.ai/", srcLabel: "Mem0", cat: "project", conf: "community-consensus", notes: "Memory layer for AI agents. \"mem-ZERO\" — the digit zero." },
  { w: "dria", ipa: "/ˈdriː ə/", r: "DREE uh", aIpa: "", aR: "", url: "https://dria.co/", srcLabel: "Dria", cat: "project", conf: "community-consensus", notes: "Decentralized knowledge network. \"DREE-uh.\"" },
  { w: "firecrawl", ipa: "/ˈfaɪər krɔːl/", r: "FIRE krawl", aIpa: "", aR: "", url: "https://www.firecrawl.dev/", srcLabel: "Firecrawl", cat: "project", conf: "community-consensus", notes: "Web-crawling API for LLMs. Compound \"fire-crawl.\"" },
  { w: "browserbase", ipa: "/ˈbraʊ zər beɪs/", r: "BROW zer base", aIpa: "", aR: "", url: "https://www.browserbase.com/", srcLabel: "Browserbase", cat: "project", conf: "community-consensus", notes: "Cloud headless-browser platform. Compound \"browser-base.\"" },
  { w: "exa", ipa: "/ˈɛk sə/", r: "EK suh", aIpa: "", aR: "", url: "https://exa.ai/", srcLabel: "Exa", cat: "project", conf: "community-consensus", notes: "Neural search API (formerly Metaphor). \"EK-suh.\"" },
  { w: "tavily", ipa: "/ˈtæ və li/", r: "TAV uh lee", aIpa: "", aR: "", url: "https://tavily.com/", srcLabel: "Tavily", cat: "project", conf: "community-consensus", notes: "AI-optimized search API. \"TAV-uh-lee.\"" },
  { w: "groq", ipa: "/ɡrɒk/", r: "grahk", aIpa: "", aR: "", url: "https://groq.com/", srcLabel: "Groq", cat: "project", conf: "creator-clarified", notes: "LPU inference chip company. Filed trademark before xAI's Grok — both read \"GRAHK.\"" },
  { w: "kagi", ipa: "/ˈkɑː ɡi/", r: "KAH gee", aIpa: "", aR: "", url: "https://kagi.com/", srcLabel: "Kagi Search", cat: "project", conf: "community-consensus", notes: "Paid privacy search engine. Japanese for \"key\" — \"KAH-gee\" (hard g)." },
  { w: "qwen", ipa: "/kwɛn/", r: "kwen", aIpa: "", aR: "", url: "https://huggingface.co/Qwen", srcLabel: "Alibaba Qwen HF", cat: "product", conf: "creator-clarified", notes: "Alibaba's open LLM family. Single syllable \"KWEN\" — short for 通义千问." },
  { w: "kimi", ipa: "/ˈkiː mi/", r: "KEE mee", aIpa: "", aR: "", url: "https://www.moonshot.cn/", srcLabel: "Moonshot AI", cat: "product", conf: "community-consensus", notes: "Moonshot AI's chatbot. \"KEE-mee.\"" },
  { w: "doubao", ipa: "/doʊ ˈbaʊ/", r: "doh BOW", aIpa: "", aR: "", url: "https://www.doubao.com/", srcLabel: "Doubao official", cat: "product", conf: "community-consensus", notes: "ByteDance chatbot 豆包. Pinyin dòu-bāo → \"doh-BOW\" (bow as in bow-and-arrow)." },
  { w: "minimax", ipa: "/ˈmɪ ni mæks/", r: "MIN ee maks", aIpa: "", aR: "", url: "https://www.minimaxi.com/", srcLabel: "MiniMax", cat: "project", conf: "community-consensus", notes: "Shanghai AI lab. Same as the game-theory term." },
  { w: "baichuan", ipa: "/baɪ ˈtʃwɑːn/", r: "BYE chwahn", aIpa: "", aR: "", url: "https://www.baichuan-ai.com/", srcLabel: "Baichuan AI", cat: "project", conf: "community-consensus", notes: "Chinese LLM lab 百川. Pinyin bǎi-chuān → \"BYE-chwahn.\"" },
  { w: "gemma", ipa: "/ˈdʒɛ mə/", r: "JEM uh", aIpa: "", aR: "", url: "https://ai.google.dev/gemma", srcLabel: "Google Gemma", cat: "product", conf: "community-consensus", notes: "Google's open-weights model. \"JEM-uh\" — distinct from Gemini." },
  { w: "phi", ipa: "/faɪ/", r: "fai", aIpa: "/fiː/", aR: "fee", url: "https://huggingface.co/microsoft/phi-3", srcLabel: "Microsoft Phi", cat: "product", conf: "contested", notes: "Microsoft's small-model series. Greek letter φ — US \"FAI\"; British/math \"FEE.\"" },
  { w: "jamba", ipa: "/ˈdʒæm bə/", r: "JAM buh", aIpa: "", aR: "", url: "https://www.ai21.com/jamba", srcLabel: "AI21 Jamba", cat: "product", conf: "community-consensus", notes: "AI21's hybrid SSM-Transformer. \"JAM-buh.\"" },
  { w: "dbrx", ipa: "/ˌdiː biː ɑːr ˈɛks/", r: "D B R X", aIpa: "", aR: "", url: "https://www.databricks.com/blog/introducing-dbrx-new-state-art-open-llm", srcLabel: "Databricks DBRX", cat: "product", conf: "community-consensus", notes: "Databricks' MoE LLM. Spelled out \"D-B-R-X.\"" },
  { w: "mixtral", ipa: "/mɪks ˈtrɑːl/", r: "miks TRAHL", aIpa: "", aR: "", url: "https://mistral.ai/news/mixtral-of-experts/", srcLabel: "Mistral AI", cat: "product", conf: "community-consensus", notes: "Mistral's MoE model. Portmanteau \"mixture\" + \"Mistral.\"" },
  { w: "command-r", ipa: "/kə ˈmænd ɑːr/", r: "kuh MAND R", aIpa: "", aR: "", url: "https://cohere.com/blog/command-r", srcLabel: "Cohere", cat: "product", conf: "community-consensus", notes: "Cohere's retrieval LLM. \"Command R\" — R as a letter." },
  { w: "falcon", ipa: "/ˈfæl kən/", r: "FAL kuhn", aIpa: "", aR: "", url: "https://falconllm.tii.ae/", srcLabel: "TII Falcon", cat: "product", conf: "community-consensus", notes: "TII's open LLM. Same as the bird." },
  { w: "grok", ipa: "/ɡrɒk/", r: "grahk", aIpa: "", aR: "", url: "https://x.ai/", srcLabel: "xAI Grok", cat: "product", conf: "community-consensus", notes: "xAI's chatbot. Heinlein coined word — \"GRAHK.\" Homophone of chip company Groq." },
  { w: "deepseek", ipa: "/ˈdiːp siːk/", r: "DEEP seek", aIpa: "", aR: "", url: "https://www.deepseek.com/", srcLabel: "DeepSeek", cat: "product", conf: "community-consensus", notes: "Chinese AI lab + LLM. Compound \"deep-seek.\"" },
  { w: "yi", ipa: "/iː/", r: "ee", aIpa: "", aR: "", url: "https://01.ai/", srcLabel: "01.AI", cat: "product", conf: "community-consensus", notes: "01.AI's LLM. Pinyin yī → single \"EE\" sound (Chinese \"one\")." },
  { w: "flux", ipa: "/flʌks/", r: "fluks", aIpa: "", aR: "", url: "https://blackforestlabs.ai/", srcLabel: "Black Forest Labs", cat: "product", conf: "community-consensus", notes: "BFL's image model. Standard English \"FLUKS.\"" },
  { w: "ideogram", ipa: "/ˈaɪ di ə græm/", r: "EYE dee uh gram", aIpa: "", aR: "", url: "https://ideogram.ai/", srcLabel: "Ideogram", cat: "product", conf: "community-consensus", notes: "Image gen with strong typography. \"EYE-dee-uh-gram.\"" },
  { w: "kling", ipa: "/klɪŋ/", r: "kling", aIpa: "", aR: "", url: "https://kling.kuaishou.com/", srcLabel: "Kuaishou Kling", cat: "product", conf: "community-consensus", notes: "Kuaishou's video model. Single syllable \"KLING.\"" },
  { w: "pika", ipa: "/ˈpiː kə/", r: "PEE kuh", aIpa: "", aR: "", url: "https://pika.art/", srcLabel: "Pika Labs", cat: "product", conf: "community-consensus", notes: "AI video startup. \"PEE-kuh\" (like Pikachu without -chu)." },
  { w: "luma", ipa: "/ˈluː mə/", r: "LOO muh", aIpa: "", aR: "", url: "https://lumalabs.ai/", srcLabel: "Luma AI", cat: "product", conf: "community-consensus", notes: "3D/video lab (Dream Machine). \"LOO-muh.\"" },
  { w: "runway", ipa: "/ˈrʌn weɪ/", r: "RUN way", aIpa: "", aR: "", url: "https://runwayml.com/", srcLabel: "Runway", cat: "project", conf: "community-consensus", notes: "Generative video startup. Same as the English word." },
  { w: "suno", ipa: "/ˈsuː noʊ/", r: "SOO noh", aIpa: "", aR: "", url: "https://suno.com/", srcLabel: "Suno", cat: "product", conf: "community-consensus", notes: "AI music generation. \"SOO-noh.\"" },
  { w: "udio", ipa: "/ˈuː di oʊ/", r: "OO dee oh", aIpa: "", aR: "", url: "https://www.udio.com/", srcLabel: "Udio", cat: "product", conf: "community-consensus", notes: "AI music app. \"OO-dee-oh.\"" },
  { w: "elevenlabs", ipa: "/ɪ ˈlɛ vən læbz/", r: "ih LEV un labs", aIpa: "", aR: "", url: "https://elevenlabs.io/", srcLabel: "ElevenLabs", cat: "project", conf: "community-consensus", notes: "AI voice synthesis. \"ih-LEV-un-labs.\"" },
  { w: "comfyui", ipa: "/ˈkʌm fi juː aɪ/", r: "KUM fee U I", aIpa: "", aR: "", url: "https://www.comfy.org/", srcLabel: "ComfyUI", cat: "tool", conf: "community-consensus", notes: "Node-based UI for Stable Diffusion. \"KUM-fee U-I\" (letters for UI)." },
  { w: "braintrust", ipa: "/ˈbreɪn trʌst/", r: "BRAIN trust", aIpa: "", aR: "", url: "https://www.braintrust.dev/", srcLabel: "Braintrust", cat: "tool", conf: "community-consensus", notes: "LLM eval platform. Compound \"brain-trust.\"" },
  { w: "langsmith", ipa: "/ˈlæŋ smɪθ/", r: "LANG smith", aIpa: "", aR: "", url: "https://www.langchain.com/langsmith", srcLabel: "LangSmith", cat: "tool", conf: "community-consensus", notes: "LangChain's eval/observability platform. \"LANG-smith.\"" },
  { w: "langfuse", ipa: "/ˈlæŋ fjuːz/", r: "LANG fyooz", aIpa: "", aR: "", url: "https://langfuse.com/", srcLabel: "Langfuse", cat: "tool", conf: "community-consensus", notes: "Open-source LLM observability. \"LANG-fyooz.\"" },
  { w: "helicone", ipa: "/ˈhɛ lɪ koʊn/", r: "HEL ih kohn", aIpa: "", aR: "", url: "https://www.helicone.ai/", srcLabel: "Helicone", cat: "tool", conf: "community-consensus", notes: "LLM observability proxy. \"HEL-ih-kohn.\"" },
  { w: "posthog", ipa: "/ˈpoʊst hɒɡ/", r: "POST hog", aIpa: "", aR: "", url: "https://posthog.com/", srcLabel: "PostHog", cat: "tool", conf: "community-consensus", notes: "Open-source product analytics. Compound \"post-hog.\"" },
  { w: "sglang", ipa: "/ˌɛs dʒiː ˈlæŋ/", r: "S G lang", aIpa: "", aR: "", url: "https://github.com/sgl-project/sglang", srcLabel: "SGLang GitHub", cat: "tool", conf: "community-consensus", notes: "Fast LLM serving runtime. \"S-G-lang\" (structured-generation language)." },
  { w: "trae", ipa: "/treɪ/", r: "tray", aIpa: "", aR: "", url: "https://www.trae.ai/", srcLabel: "Trae", cat: "product", conf: "community-consensus", notes: "ByteDance's AI code IDE. Single syllable \"TRAY.\"" },
  { w: "dia", ipa: "/ˈdiː ə/", r: "DEE uh", aIpa: "", aR: "", url: "https://www.diabrowser.com/", srcLabel: "The Browser Company", cat: "product", conf: "community-consensus", notes: "The Browser Company's AI browser. \"DEE-uh.\"" },
  { w: "tome", ipa: "/toʊm/", r: "tome", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AI presentation builder (consumer product wound down 2024-2025). \"TOHM\" — rhymes with home." },
  { w: "gamma", ipa: "/ˈɡæ mə/", r: "GAM uh", aIpa: "", aR: "", url: "https://gamma.app/", srcLabel: "Gamma", cat: "product", conf: "community-consensus", notes: "AI deck/site builder. Greek letter γ — \"GAM-uh.\"" },
  { w: "descript", ipa: "/dɪ ˈskrɪpt/", r: "dih SKRIPT", aIpa: "", aR: "", url: "https://www.descript.com/", srcLabel: "Descript", cat: "product", conf: "community-consensus", notes: "AI audio/video editor. \"dih-SKRIPT\" — stress on second syllable." },
  { w: "figma", ipa: "/ˈfɪɡ mə/", r: "FIG muh", aIpa: "", aR: "", url: "https://www.figma.com/", srcLabel: "Figma", cat: "product", conf: "community-consensus", notes: "Design tool. \"FIG-muh\" (hard G). Not \"FEE-gma.\"" },
  { w: "framer", ipa: "/ˈfreɪ mər/", r: "FRAY mer", aIpa: "", aR: "", url: "https://www.framer.com/", srcLabel: "Framer", cat: "product", conf: "community-consensus", notes: "Web design + code tool. \"FRAY-mer.\"" },
  { w: "nushell", ipa: "/ˈnuː ʃɛl/", r: "NOO shell", aIpa: "", aR: "", url: "https://www.nushell.sh/", srcLabel: "Nushell", cat: "cli-tool", conf: "community-consensus", notes: "Structured-data shell. \"NOO-shell\" — letter \"Nu\" + shell." },
  { w: "fish", ipa: "/fɪʃ/", r: "fish", aIpa: "", aR: "", url: "https://fishshell.com/", srcLabel: "fish shell", cat: "cli-tool", conf: "community-consensus", notes: "Friendly Interactive SHell. Same as the animal." },
  { w: "starship", ipa: "/ˈstɑːr ʃɪp/", r: "STAR ship", aIpa: "", aR: "", url: "https://starship.rs/", srcLabel: "Starship", cat: "cli-tool", conf: "community-consensus", notes: "Cross-shell prompt. Standard compound \"star-ship.\"" },
  { w: "atuin", ipa: "/ˈeɪ tuː ɪn/", r: "AY too in", aIpa: "/ə ˈtuː ɪn/", aR: "uh TOO in", url: "https://atuin.sh/", srcLabel: "Atuin", cat: "cli-tool", conf: "contested", notes: "Shell history manager. Aztec turtle deity — \"AY-too-in\" common." },
  { w: "jujutsu", ipa: "/dʒuː ˈdʒʊt suː/", r: "joo JUT soo", aIpa: "", aR: "", url: "https://github.com/jj-vcs/jj", srcLabel: "jj VCS GitHub", cat: "cli-tool", conf: "community-consensus", notes: "Git-compatible VCS (jj). Japanese \"gentle art\" — \"joo-JUT-soo.\"" },
  { w: "sapling", ipa: "/ˈsæp lɪŋ/", r: "SAP ling", aIpa: "", aR: "", url: "https://sapling-scm.com/", srcLabel: "Sapling SCM", cat: "cli-tool", conf: "community-consensus", notes: "Meta's VCS. Same as the young tree." },
  { w: "moe", ipa: "/ˌɛm oʊ ˈiː/", r: "M O E", aIpa: "/moʊ/", aR: "moh", url: "https://huggingface.co/blog/moe", srcLabel: "HuggingFace MoE blog", cat: "acronym", conf: "contested", notes: "Mixture of Experts. Spelled \"M-O-E\" in papers; some pronounce it \"MOH\" like the Three Stooges character." },
  { w: "rlhf", ipa: "/ˌɑːr ɛl eɪtʃ ˈɛf/", r: "R L H F", aIpa: "", aR: "", url: "https://openai.com/research/learning-from-human-preferences", srcLabel: "OpenAI research", cat: "acronym", conf: "community-consensus", notes: "Reinforcement Learning from Human Feedback. Always spelled out." },
  { w: "agi", ipa: "/ˌeɪ dʒiː ˈaɪ/", r: "A G I", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Artificial_general_intelligence", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Artificial General Intelligence. Letters \"A-G-I.\"" },
  { w: "HTTP", ipa: "/ˌeɪtʃ tiː tiː ˈpiː/", r: "H T T P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"H-T-T-P\". Never one syllable." },
  { w: "HTTPS", ipa: "/ˌeɪtʃ tiː tiː piː ˈɛs/", r: "H T T P S", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"H-T-T-P-S\"." },
  { w: "TCP", ipa: "/ˌtiː siː ˈpiː/", r: "T C P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"T-C-P\". Transmission Control Protocol." },
  { w: "UDP", ipa: "/ˌjuː diː ˈpiː/", r: "U D P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"U-D-P\". User Datagram Protocol." },
  { w: "SSL", ipa: "/ˌɛs ɛs ˈɛl/", r: "S S L", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-S-L\". Deprecated in favor of TLS but term persists." },
  { w: "QUIC", ipa: "/kwɪk/", r: "quick", aIpa: "", aR: "", url: "https://datatracker.ietf.org/doc/html/rfc9000", srcLabel: "IETF RFC 9000", cat: "acronym", conf: "creator-clarified", notes: "IETF + Google docs: \"quick\". From \"Quick UDP Internet Connections\"." },
  { w: "CORS", ipa: "/kɔːrz/", r: "cores", aIpa: "/ˌsiː oʊ ɑːr ˈɛs/", aR: "C O R S", url: "https://fetch.spec.whatwg.org/", srcLabel: "WHATWG Fetch", cat: "acronym", conf: "community-consensus", notes: "\"cores\"; rhymes with \"doors\". Cross-Origin Resource Sharing." },
  { w: "CSRF", ipa: "/ˈsiː sɜːrf/", r: "sea surf", aIpa: "/ˌsiː ɛs ɑːr ˈɛf/", aR: "C S R F", url: "https://owasp.org/www-community/attacks/csrf", srcLabel: "OWASP", cat: "acronym", conf: "contested", notes: "OWASP-favored \"sea-surf\"; letter-by-letter common too." },
  { w: "XSS", ipa: "/ˌɛks ɛs ˈɛs/", r: "X S S", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"X-S-S\". Cross-Site Scripting." },
  { w: "YAML", ipa: "/ˈjæməl/", r: "yam ul", aIpa: "", aR: "", url: "https://yaml.org/", srcLabel: "yaml.org", cat: "acronym", conf: "creator-clarified", notes: "yaml.org tagline historically read \"YAML Ain't Markup Language\" and FAQ stated \"rhymes with camel\". \"YAM-uhl\"." },
  { w: "TOML", ipa: "/toʊml/", r: "tohml", aIpa: "", aR: "", url: "https://toml.io/", srcLabel: "toml.io", cat: "acronym", conf: "creator-clarified", notes: "Tom Preston-Werner (creator): \"rhymes with knoll/troll/roll\"." },
  { w: "SDK", ipa: "/ˌɛs diː ˈkeɪ/", r: "S D K", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-D-K\". Software Development Kit." },
  { w: "CLI", ipa: "/ˌsiː ɛl ˈaɪ/", r: "C L I", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-L-I\". Command Line Interface." },
  { w: "URL", ipa: "/ˌjuː ɑːr ˈɛl/", r: "U R L", aIpa: "/ɜːrl/", aR: "earl", url: "", srcLabel: "W3C / community", cat: "acronym", conf: "contested", notes: "Letter-by-letter dominant; Tim Berners-Lee uses \"earl\" but it never stuck." },
  { w: "URI", ipa: "/ˌjuː ɑːr ˈaɪ/", r: "U R I", aIpa: "/ˈjʊəri/", aR: "yoo ree", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "Letter-by-letter dominant; \"yoo-ree\" rare." },
  { w: "UUID", ipa: "/ˌjuː juː aɪ ˈdiː/", r: "U U I D", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"U-U-I-D\". Universally Unique Identifier." },
  { w: "GUID", ipa: "/ɡwɪd/", r: "gwid", aIpa: "/ˌdʒiː juː aɪ ˈdiː/", aR: "G U I D", url: "", srcLabel: "Microsoft (historical)", cat: "acronym", conf: "contested", notes: "Microsoft \"gwid\"; non-MS world tends letter-by-letter." },
  { w: "HTML", ipa: "/ˌeɪtʃ tiː ɛm ˈɛl/", r: "H T M L", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"H-T-M-L\"." },
  { w: "CSS", ipa: "/ˌsiː ɛs ˈɛs/", r: "C S S", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-S-S\"." },
  { w: "XML", ipa: "/ˌɛks ɛm ˈɛl/", r: "X M L", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"X-M-L\"." },
  { w: "WebSocket", ipa: "/ˈwɛb sɒkɪt/", r: "web socket", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "\"web-SOCK-it\". Two words." },
  { w: "NoSQL", ipa: "/ˌnoʊ ˌɛs kjuː ˈɛl/", r: "no S Q L", aIpa: "/ˌnoʊ ˈsiːkwəl/", aR: "no sequel", url: "https://en.wikipedia.org/wiki/NoSQL", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"no-S-Q-L\" dominant; \"no-sequel\" parallels SQL→sequel reading." },
  { w: "Sass", ipa: "/sæs/", r: "sass", aIpa: "", aR: "", url: "https://sass-lang.com/", srcLabel: "Sass docs", cat: "tool", conf: "community-consensus", notes: "English word \"sass\". CSS preprocessor." },
  { w: "SCSS", ipa: "/ˌɛs siː ɛs ˈɛs/", r: "S C S S", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-C-S-S\". \"Sassy CSS\" recursive expansion." },
  { w: "Less", ipa: "/lɛs/", r: "less", aIpa: "", aR: "", url: "https://lesscss.org/", srcLabel: "Less docs", cat: "tool", conf: "community-consensus", notes: "English word \"less\". CSS preprocessor." },
  { w: "OpenID", ipa: "/ˈoʊpən aɪ ˈdiː/", r: "open I D", aIpa: "", aR: "", url: "https://openid.net/", srcLabel: "OpenID Foundation", cat: "acronym", conf: "community-consensus", notes: "\"OPEN I-D\"." },
  { w: "OAuth2", ipa: "/oʊˈɔːθ tuː/", r: "oh auth two", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"oh-AUTH two\". Same prefix as OAuth." },
  { w: "VPN", ipa: "/ˌviː piː ˈɛn/", r: "V P N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"V-P-N\". Virtual Private Network." },
  { w: "TensorFlow", ipa: "/ˈtɛnsər floʊ/", r: "tenser flow", aIpa: "", aR: "", url: "https://www.tensorflow.org/", srcLabel: "TensorFlow docs", cat: "product", conf: "community-consensus", notes: "\"TEN-sir-flow\". Google ML framework." },
  { w: "Keras", ipa: "/ˈkɛrəs/", r: "KAIR uss", aIpa: "", aR: "", url: "https://keras.io/", srcLabel: "Keras docs", cat: "product", conf: "creator-clarified", notes: "François Chollet (creator): \"KEHR-uss\", rhymes with \"Aaron\"." },
  { w: "YOLO", ipa: "/ˈjoʊ loʊ/", r: "yoh loh", aIpa: "", aR: "", url: "https://arxiv.org/abs/1506.02640", srcLabel: "YOLO paper", cat: "product", conf: "community-consensus", notes: "\"YOH-loh\" — You Only Look Once. Same as the slang." },
  { w: "Whisper", ipa: "/ˈwɪspər/", r: "whisper", aIpa: "", aR: "", url: "https://openai.com/research/whisper", srcLabel: "OpenAI", cat: "product", conf: "community-consensus", notes: "English word \"whisper\". OpenAI speech-to-text." },
  { w: "Mermaid", ipa: "/ˈmɜːr meɪd/", r: "mermaid", aIpa: "", aR: "", url: "https://mermaid.js.org/", srcLabel: "Mermaid docs", cat: "tool", conf: "community-consensus", notes: "English word. Diagram-as-code framework." },
  { w: "Excalidraw", ipa: "/ɛkˈskælɪ drɔː/", r: "ex CAL i draw", aIpa: "", aR: "", url: "https://excalidraw.com/", srcLabel: "Excalidraw", cat: "tool", conf: "community-consensus", notes: "\"ex-CAL-i-draw\". King Arthur sword + \"draw\"." },
  { w: "tldraw", ipa: "/ˌtiː ɛl ˈdrɔː/", r: "T L draw", aIpa: "", aR: "", url: "https://tldraw.dev/", srcLabel: "tldraw", cat: "tool", conf: "creator-clarified", notes: "Letters \"T-L\" then \"draw\". Steve Ruiz (creator) confirmed." },
  { w: "Logseq", ipa: "/lɒɡˈsiːk/", r: "log seek", aIpa: "", aR: "", url: "https://logseq.com/", srcLabel: "Logseq", cat: "product", conf: "creator-clarified", notes: "\"log-SEEK\"; log + sequence. Knowledge-graph notes." },
  { w: "AppFlowy", ipa: "/æpˈfloʊi/", r: "app FLOH ee", aIpa: "", aR: "", url: "https://appflowy.io/", srcLabel: "AppFlowy", cat: "product", conf: "community-consensus", notes: "\"app-FLOH-ee\". Notion alternative." },
  { w: "Affine", ipa: "/əˈfaɪn/", r: "uh fine", aIpa: "/ˈæfaɪn/", aR: "AF fyne", url: "https://affine.pro/", srcLabel: "Affine (Toeverything)", cat: "product", conf: "contested", notes: "Toeverything launches with \"a-FINE\"; math/CS reading \"AF-fine\" also heard." },
  { w: "Anytype", ipa: "/ˈɛni taɪp/", r: "enny type", aIpa: "", aR: "", url: "https://anytype.io/", srcLabel: "Anytype", cat: "product", conf: "community-consensus", notes: "\"ENNY-type\". Local-first P2P knowledge tool." },
  { w: "Gitea", ipa: "/ɡɪˈteɪ ə/", r: "gi TAY uh", aIpa: "", aR: "", url: "https://docs.gitea.com/", srcLabel: "Gitea docs", cat: "product", conf: "community-consensus", notes: "\"gi-TAY-uh\". Self-hosted Git service." },
  { w: "Forgejo", ipa: "/fɔːrˈdʒeɪ joʊ/", r: "for JAY yo", aIpa: "", aR: "", url: "https://forgejo.org/", srcLabel: "Forgejo", cat: "product", conf: "community-consensus", notes: "Esperanto-style; \"for-JAY-yo\". Gitea fork." },
  { w: "Slidev", ipa: "/ˈslaɪ dɛv/", r: "SLIE dev", aIpa: "", aR: "", url: "https://sli.dev/", srcLabel: "Slidev", cat: "tool", conf: "creator-clarified", notes: "Anthony Fu (creator): \"SLIE-dev\"; slide + dev." },
  { w: "Yazi", ipa: "/ˈjɑː ziː/", r: "YAH zee", aIpa: "", aR: "", url: "https://yazi-rs.github.io/", srcLabel: "Yazi docs", cat: "cli-tool", conf: "community-consensus", notes: "Chinese 鸭子 (duck). \"YAH-zee\". Terminal file manager." },
  { w: "Ghostty", ipa: "/ˈɡoʊsti/", r: "ghost ee", aIpa: "", aR: "", url: "https://ghostty.org/", srcLabel: "Ghostty", cat: "product", conf: "creator-clarified", notes: "Mitchell Hashimoto (creator): \"GHOST-ee\". GPU terminal." },
  { w: "viem", ipa: "/viːm/", r: "veem", aIpa: "", aR: "", url: "https://viem.sh/", srcLabel: "viem docs", cat: "tool", conf: "creator-clarified", notes: "One syllable, \"veem\". TypeScript Ethereum library." },
  { w: "wagmi", ipa: "/ˈwæɡ mi/", r: "WAG mee", aIpa: "", aR: "", url: "https://wagmi.sh/", srcLabel: "wagmi docs", cat: "tool", conf: "community-consensus", notes: "\"WAG-mee\". \"We are all gonna make it\" — React hooks for Ethereum." },
  { w: "Streamlit", ipa: "/ˈstriːm lɪt/", r: "STREEM lit", aIpa: "", aR: "", url: "https://streamlit.io/", srcLabel: "Streamlit", cat: "product", conf: "community-consensus", notes: "\"STREEM-lit\". Python data-app framework." },
  { w: "Gradio", ipa: "/ˈɡreɪ di oʊ/", r: "GRAY dee oh", aIpa: "", aR: "", url: "https://gradio.app/", srcLabel: "Gradio", cat: "product", conf: "community-consensus", notes: "\"GRAY-dee-oh\". HF Spaces default UI." },
  { w: "Coqui", ipa: "/ˈkoʊ kiː/", r: "KO kee", aIpa: "", aR: "", url: "https://coqui.ai/", srcLabel: "Coqui", cat: "product", conf: "community-consensus", notes: "Puerto Rican coquí frog; \"KO-kee\". Open TTS." },
  { w: "Vicuna", ipa: "/vɪˈkuː njə/", r: "vi KOON yah", aIpa: "", aR: "", url: "https://lmsys.org/", srcLabel: "LMSYS", cat: "product", conf: "community-consensus", notes: "South American camelid; \"vih-KOON-yah\". LMSYS fine-tune." },
  { w: "LLaVA", ipa: "/ˈlɑː vɑː/", r: "LAH vah", aIpa: "", aR: "", url: "https://llava-vl.github.io/", srcLabel: "LLaVA", cat: "product", conf: "community-consensus", notes: "\"LAH-vah\" like \"lava\". Large Language-and-Vision Assistant." },
  { w: "LoRA", ipa: "/ˈlɔːr ə/", r: "LOR ah", aIpa: "", aR: "", url: "https://arxiv.org/abs/2106.09685", srcLabel: "LoRA paper", cat: "cs-term", conf: "community-consensus", notes: "\"LOR-uh\". Low-Rank Adaptation." },
  { w: "QLoRA", ipa: "/ˌkjuː ˈlɔːr ə/", r: "Q LOR ah", aIpa: "", aR: "", url: "https://arxiv.org/abs/2305.14314", srcLabel: "QLoRA paper", cat: "cs-term", conf: "community-consensus", notes: "\"Q-LOR-uh\". Quantized LoRA." },
  { w: "PEFT", ipa: "/pɛft/", r: "peft", aIpa: "", aR: "", url: "https://huggingface.co/docs/peft", srcLabel: "PEFT docs", cat: "tool", conf: "community-consensus", notes: "\"peft\". Parameter-Efficient Fine-Tuning." },
  { w: "HTTPie", ipa: "/ˌeɪtʃ tiː tiː piː ˈaɪ/", r: "H T T P aye", aIpa: "", aR: "", url: "https://httpie.io/docs/cli", srcLabel: "HTTPie docs", cat: "cli-tool", conf: "creator-clarified", notes: "\"aitch-tee-tee-pie\" — like the suffix \"-ie\" in English." },
  { w: "Bruno", ipa: "/ˈbruː noʊ/", r: "BROO no", aIpa: "", aR: "", url: "https://www.usebruno.com/", srcLabel: "Bruno", cat: "tool", conf: "community-consensus", notes: "\"BROO-noh\". Git-friendly API client." },
  { w: "Hoppscotch", ipa: "/ˈhɒp skɒtʃ/", r: "HOP skotch", aIpa: "", aR: "", url: "https://hoppscotch.io/", srcLabel: "Hoppscotch", cat: "tool", conf: "community-consensus", notes: "\"HOP-skotch\"; the playground game. API client." },
  { w: "Dify", ipa: "/ˈdiː faɪ/", r: "DEE fye", aIpa: "", aR: "", url: "https://dify.ai/", srcLabel: "Dify", cat: "product", conf: "community-consensus", notes: "\"DEE-fye\"; do + ify. LLM app platform." },
  { w: "Hunyuan", ipa: "/ˌhuːn juˈɑːn/", r: "hoon yoo en", aIpa: "", aR: "", url: "https://hunyuan.tencent.com/", srcLabel: "Tencent Hunyuan", cat: "product", conf: "community-consensus", notes: "Tencent 混元 \"hùn yuán\"; approximated \"HOON-yoo-en\"." },
  { w: "Dijkstra", ipa: "/ˈdaɪk strɑː/", r: "DIKE strah", aIpa: "", aR: "", url: "https://www.cs.utexas.edu/users/EWD/", srcLabel: "Edsger Dijkstra archive", cat: "cs-term", conf: "creator-clarified", notes: "Dutch: \"DIKE-strah\". Edsger himself corrected English speakers many times." },
  { w: "trie", ipa: "/triː/", r: "tree", aIpa: "/traɪ/", aR: "try", url: "https://en.wikipedia.org/wiki/Trie", srcLabel: "Knuth TAOCP", cat: "cs-term", conf: "contested", notes: "Knuth (creator): \"tree\" (from \"retrieval\"). Most engineers say \"try\" to disambiguate from binary tree." },
  { w: "DAG", ipa: "/dæɡ/", r: "dag", aIpa: "/ˌdiː eɪ ˈdʒiː/", aR: "D A G", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"dag\" common in pipeline tools (Airflow, dagster); letter-by-letter \"D-A-G\" in CS papers." },
  { w: "CRDT", ipa: "/ˌsiː ɑːr diː ˈtiː/", r: "C R D T", aIpa: "", aR: "", url: "https://crdt.tech/", srcLabel: "crdt.tech", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-R-D-T\". Conflict-free Replicated Data Type." },
  { w: "ACID", ipa: "/ˈæsɪd/", r: "acid", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/ACID", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"acid\" — the word. Atomicity, Consistency, Isolation, Durability." },
  { w: "BASE", ipa: "/beɪs/", r: "base", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Eventual_consistency", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"base\" — the word. Basically Available, Soft state, Eventual consistency." },
  { w: "CAP", ipa: "/kæp/", r: "cap", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/CAP_theorem", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"cap\" — the word. CAP theorem: Consistency, Availability, Partition tolerance." },
  { w: "REPL", ipa: "/ˈrɛpəl/", r: "reh pəl", aIpa: "/ˌɑːr iː piː ˈɛl/", aR: "R E P L", url: "https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"REP-uhl\" common in Lisp/Clojure; letter-by-letter common elsewhere. Read-Eval-Print Loop." },
  { w: "FIFO", ipa: "/ˈfaɪ foʊ/", r: "FYE foh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"FYE-foh\". First In First Out." },
  { w: "LIFO", ipa: "/ˈlaɪ foʊ/", r: "LIE foh", aIpa: "/ˈliː foʊ/", aR: "LEE foh", url: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"LIE-foh\" common in US; \"LEE-foh\" also heard. Last In First Out." },
  { w: "LRU", ipa: "/ˌɛl ɑːr ˈjuː/", r: "L R U", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"L-R-U\". Least Recently Used." },
  { w: "AOT", ipa: "/ˌeɪ oʊ ˈtiː/", r: "A O T", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Ahead-of-time_compilation", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"A-O-T\". Ahead-of-Time compilation. Counterpart to JIT." },
  { w: "NAT", ipa: "/næt/", r: "nat", aIpa: "/ˌɛn eɪ ˈtiː/", aR: "N A T", url: "https://en.wikipedia.org/wiki/Network_address_translation", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"nat\" the word common; \"N-A-T\" also heard. Network Address Translation." },
  { w: "DHCP", ipa: "/ˌdiː eɪtʃ siː ˈpiː/", r: "D H C P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"D-H-C-P\"." },
  { w: "BGP", ipa: "/ˌbiː dʒiː ˈpiː/", r: "B G P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"B-G-P\". Border Gateway Protocol." },
  { w: "OSPF", ipa: "/ˌoʊ ɛs piː ˈɛf/", r: "O S P F", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"O-S-P-F\". Open Shortest Path First." },
  { w: "WAN", ipa: "/wæn/", r: "wan", aIpa: "/ˌdʌbəl juː eɪ ˈɛn/", aR: "double you A N", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"wan\" rhymes with \"pan\". Wide Area Network." },
  { w: "LAN", ipa: "/læn/", r: "lan", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"lan\" rhymes with \"pan\". Local Area Network." },
  { w: "ICMP", ipa: "/ˌaɪ siː ɛm ˈpiː/", r: "I C M P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"I-C-M-P\". Internet Control Message Protocol." },
  { w: "ARP", ipa: "/ɑːrp/", r: "arp", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"arp\" the word. Address Resolution Protocol." },
  { w: "MTU", ipa: "/ˌɛm tiː ˈjuː/", r: "M T U", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"M-T-U\". Maximum Transmission Unit." },
  { w: "mTLS", ipa: "/ˌɛm tiː ɛl ˈɛs/", r: "m T L S", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"m-T-L-S\". Mutual TLS." },
  { w: "OWASP", ipa: "/ˈoʊ wæsp/", r: "oh wasp", aIpa: "", aR: "", url: "https://owasp.org/", srcLabel: "OWASP", cat: "acronym", conf: "creator-clarified", notes: "\"oh-WASP\". Open Worldwide Application Security Project." },
  { w: "SBOM", ipa: "/ˈɛs bɒm/", r: "S bom", aIpa: "/ˌɛs biː oʊ ˈɛm/", aR: "S B O M", url: "https://www.cisa.gov/sbom", srcLabel: "CISA", cat: "acronym", conf: "contested", notes: "\"S-bom\" common; letter-by-letter also heard. Software Bill of Materials." },
  { w: "CVE", ipa: "/ˌsiː viː ˈiː/", r: "C V E", aIpa: "", aR: "", url: "https://www.cve.org/", srcLabel: "MITRE CVE", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-V-E\". Common Vulnerabilities and Exposures." },
  { w: "CVSS", ipa: "/ˌsiː viː ɛs ˈɛs/", r: "C V S S", aIpa: "", aR: "", url: "https://www.first.org/cvss/", srcLabel: "FIRST CVSS", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-V-S-S\"." },
  { w: "MFA", ipa: "/ˌɛm ɛf ˈeɪ/", r: "M F A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"M-F-A\". Multi-Factor Authentication." },
  { w: "2FA", ipa: "/ˌtuː ɛf ˈeɪ/", r: "two F A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"two-F-A\". Two-Factor Authentication." },
  { w: "SSO", ipa: "/ˌɛs ɛs ˈoʊ/", r: "S S O", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-S-O\". Single Sign-On." },
  { w: "RBAC", ipa: "/ˈɑːr bæk/", r: "R back", aIpa: "/ˌɑːr biː eɪ ˈsiː/", aR: "R B A C", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"R-back\" common in Kubernetes; letter-by-letter in enterprise. Role-Based Access Control." },
  { w: "WAF", ipa: "/wɑːf/", r: "waff", aIpa: "/ˌdʌbəl juː eɪ ˈɛf/", aR: "double you A F", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"waff\" common; rhymes with \"Jeff\". Web Application Firewall." },
  { w: "SIEM", ipa: "/siːm/", r: "seem", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"seem\" — like the word. Security Information and Event Management." },
  { w: "HIPAA", ipa: "/ˈhɪpə/", r: "HIP uh", aIpa: "", aR: "", url: "https://www.hhs.gov/hipaa/", srcLabel: "HHS.gov", cat: "acronym", conf: "community-consensus", notes: "\"HIP-uh\". One P only in pronunciation. Health Insurance Portability and Accountability Act." },
  { w: "GDPR", ipa: "/ˌdʒiː diː piː ˈɑːr/", r: "G D P R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"G-D-P-R\"." },
  { w: "nonce", ipa: "/nɒns/", r: "nonce", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"nonce\" — single syllable. \"Number used Once\". Common in crypto." },
  { w: "GPU", ipa: "/ˌdʒiː piː ˈjuː/", r: "G P U", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"G-P-U\". Graphics Processing Unit." },
  { w: "CPU", ipa: "/ˌsiː piː ˈjuː/", r: "C P U", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-P-U\"." },
  { w: "TPU", ipa: "/ˌtiː piː ˈjuː/", r: "T P U", aIpa: "", aR: "", url: "https://cloud.google.com/tpu", srcLabel: "Google Cloud", cat: "acronym", conf: "community-consensus", notes: "Letters \"T-P-U\". Tensor Processing Unit." },
  { w: "NPU", ipa: "/ˌɛn piː ˈjuː/", r: "N P U", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"N-P-U\". Neural Processing Unit." },
  { w: "ASIC", ipa: "/ˈeɪ sɪk/", r: "AY sik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"AY-sik\". Application-Specific Integrated Circuit." },
  { w: "FPGA", ipa: "/ˌɛf piː dʒiː ˈeɪ/", r: "F P G A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"F-P-G-A\"." },
  { w: "SIMD", ipa: "/sɪmd/", r: "simd", aIpa: "/ˌɛs aɪ ɛm ˈdiː/", aR: "S I M D", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"simd\" one syllable common; letter-by-letter also heard. Single Instruction Multiple Data." },
  { w: "DRAM", ipa: "/ˈdiːræm/", r: "DEE ram", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"DEE-ram\". Dynamic RAM." },
  { w: "SRAM", ipa: "/ˈɛsræm/", r: "S ram", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"S-ram\". Static RAM." },
  { w: "NVMe", ipa: "/ˌɛn viː ɛm ˈiː/", r: "N V M E", aIpa: "/ˈɛnvi ɛm iː/", aR: "ENVY M E", url: "https://nvmexpress.org/", srcLabel: "NVM Express", cat: "acronym", conf: "contested", notes: "Letter-by-letter dominant; \"envy-M-E\" rare. Non-Volatile Memory Express." },
  { w: "RAID", ipa: "/reɪd/", r: "raid", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"raid\" the word. Redundant Array of Independent Disks." },
  { w: "DMA", ipa: "/ˌdiː ɛm ˈeɪ/", r: "D M A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"D-M-A\". Direct Memory Access." },
  { w: "ECC", ipa: "/ˌiː siː ˈsiː/", r: "E C C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"E-C-C\". Error-Correcting Code." },
  { w: "GitOps", ipa: "/ˈɡɪt ɒps/", r: "git ops", aIpa: "", aR: "", url: "https://www.gitops.tech/", srcLabel: "gitops.tech", cat: "acronym", conf: "community-consensus", notes: "\"git-ops\"." },
  { w: "DevOps", ipa: "/ˈdɛv ɒps/", r: "dev ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"dev-ops\"." },
  { w: "MLOps", ipa: "/ˌɛm ɛl ˈɒps/", r: "M L ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"M-L ops\"." },
  { w: "LLMOps", ipa: "/ˌɛl ɛl ɛm ˈɒps/", r: "L L M ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"L-L-M ops\"." },
  { w: "FinOps", ipa: "/ˈfɪn ɒps/", r: "fin ops", aIpa: "", aR: "", url: "https://www.finops.org/", srcLabel: "FinOps Foundation", cat: "acronym", conf: "community-consensus", notes: "\"fin-ops\". Financial operations for cloud." },
  { w: "SOA", ipa: "/ˌɛs oʊ ˈeɪ/", r: "S O A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-O-A\". Service-Oriented Architecture." },
  { w: "ELT", ipa: "/ˌiː ɛl ˈtiː/", r: "E L T", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"E-L-T\". Extract, Load, Transform. Successor to ETL." },
  { w: "CNN", ipa: "/ˌsiː ɛn ˈɛn/", r: "C N N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-N-N\". Convolutional Neural Network." },
  { w: "RNN", ipa: "/ˌɑːr ɛn ˈɛn/", r: "R N N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"R-N-N\". Recurrent Neural Network." },
  { w: "LSTM", ipa: "/ˌɛl ɛs tiː ˈɛm/", r: "L S T M", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"L-S-T-M\". Long Short-Term Memory." },
  { w: "GRU", ipa: "/ˌdʒiː ɑːr ˈjuː/", r: "G R U", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"G-R-U\". Gated Recurrent Unit." },
  { w: "GAN", ipa: "/ɡæn/", r: "gan", aIpa: "/ˌdʒiː eɪ ˈɛn/", aR: "G A N", url: "https://arxiv.org/abs/1406.2661", srcLabel: "Goodfellow et al.", cat: "acronym", conf: "community-consensus", notes: "\"gan\" the word common; letters in formal contexts. Generative Adversarial Network." },
  { w: "VAE", ipa: "/ˌviː eɪ ˈiː/", r: "V A E", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"V-A-E\". Variational Autoencoder." },
  { w: "ReLU", ipa: "/ˈreɪ luː/", r: "RAY loo", aIpa: "/ˈrɛ luː/", aR: "REH loo", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "\"RAY-loo\" common in US; \"REH-loo\" also heard. Rectified Linear Unit." },
  { w: "GeLU", ipa: "/ˈdʒɛ luː/", r: "JELL oo", aIpa: "/ˌdʒiː ɛl ˈjuː/", aR: "G E L U", url: "https://arxiv.org/abs/1606.08415", srcLabel: "Hendrycks & Gimpel", cat: "cs-term", conf: "contested", notes: "\"JELL-oo\" common; \"G-E-L-U\" also heard. Gaussian Error Linear Unit." },
  { w: "SwiGLU", ipa: "/ˈswiː ɡluː/", r: "swee gloo", aIpa: "", aR: "", url: "https://arxiv.org/abs/2002.05202", srcLabel: "Shazeer", cat: "cs-term", conf: "community-consensus", notes: "\"swee-GLOO\". Swish-Gated Linear Unit." },
  { w: "RoPE", ipa: "/roʊp/", r: "rope", aIpa: "", aR: "", url: "https://arxiv.org/abs/2104.09864", srcLabel: "RoFormer paper", cat: "cs-term", conf: "community-consensus", notes: "\"rope\" the word. Rotary Position Embedding." },
  { w: "tanh", ipa: "/tæntʃ/", r: "tanch", aIpa: "/ˌtiː eɪ ɛn ˈeɪtʃ/", aR: "T A N H", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "\"tanch\" rhymes with \"ranch\" common; \"T-A-N-H\" letters also heard. Hyperbolic tangent." },
  { w: "softmax", ipa: "/ˈsɒft mæks/", r: "soft max", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"soft-MAX\"." },
  { w: "DPO", ipa: "/ˌdiː piː ˈoʊ/", r: "D P O", aIpa: "", aR: "", url: "https://arxiv.org/abs/2305.18290", srcLabel: "DPO paper", cat: "acronym", conf: "community-consensus", notes: "Letters \"D-P-O\". Direct Preference Optimization." },
  { w: "PPO", ipa: "/ˌpiː piː ˈoʊ/", r: "P P O", aIpa: "", aR: "", url: "https://arxiv.org/abs/1707.06347", srcLabel: "PPO paper", cat: "acronym", conf: "community-consensus", notes: "Letters \"P-P-O\". Proximal Policy Optimization." },
  { w: "GRPO", ipa: "/ˌdʒiː ɑːr piː ˈoʊ/", r: "G R P O", aIpa: "", aR: "", url: "https://arxiv.org/abs/2402.03300", srcLabel: "DeepSeekMath paper", cat: "acronym", conf: "community-consensus", notes: "Letters \"G-R-P-O\". Group Relative Policy Optimization." },
  { w: "Faiss", ipa: "/feɪs/", r: "face", aIpa: "/faɪs/", aR: "fyce", url: "https://github.com/facebookresearch/faiss", srcLabel: "Meta AI", cat: "tool", conf: "contested", notes: "\"face\" common (FB AI Similarity Search); \"fice\" also heard." },
  { w: "C++", ipa: "/ˌsiː plʌs ˈplʌs/", r: "C plus plus", aIpa: "", aR: "", url: "https://isocpp.org/", srcLabel: "ISO C++", cat: "product", conf: "community-consensus", notes: "\"C-plus-plus\"." },
  { w: "C#", ipa: "/ˌsiː ˈʃɑːrp/", r: "C sharp", aIpa: "", aR: "", url: "https://learn.microsoft.com/dotnet/csharp/", srcLabel: "Microsoft Learn", cat: "product", conf: "community-consensus", notes: "\"C-sharp\"." },
  { w: "TypeScript", ipa: "/ˈtaɪpˌskrɪpt/", r: "TYPE script", aIpa: "", aR: "", url: "https://www.typescriptlang.org/", srcLabel: "TypeScript docs", cat: "product", conf: "community-consensus", notes: "\"TYPE-script\"." },
  { w: "JavaScript", ipa: "/ˈdʒɑːvə skrɪpt/", r: "JAH vah script", aIpa: "", aR: "", url: "https://tc39.es/", srcLabel: "TC39", cat: "product", conf: "community-consensus", notes: "\"JAH-vuh-script\"." },
  { w: "Tcl", ipa: "/ˈtɪkəl/", r: "tickle", aIpa: "", aR: "", url: "https://www.tcl-lang.org/", srcLabel: "Tcl official", cat: "product", conf: "creator-clarified", notes: "John Ousterhout (creator): \"tickle\". Official Tcl Developer Xchange confirms." },
  { w: "awk", ipa: "/ɔːk/", r: "auk", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/AWK#Origin_of_the_name", srcLabel: "Wikipedia § Origin of the name", cat: "cli-tool", conf: "creator-clarified", notes: "\"auk\" — like the seabird, rhymes with \"hawk\". Named after creators' initials (Aho/Weinberger/Kernighan); pronunciation confirmed in original AWK book." },
  { w: "Perl", ipa: "/pɜːrl/", r: "purl", aIpa: "", aR: "", url: "https://www.perl.org/", srcLabel: "perl.org", cat: "product", conf: "community-consensus", notes: "\"purl\" — homophone of \"pearl\"." },
  { w: "Lisp", ipa: "/lɪsp/", r: "lisp", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "\"lisp\" the word." },
  { w: "Scheme", ipa: "/skiːm/", r: "skeem", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "\"skeem\" — like the word \"scheme\"." },
  { w: "Prolog", ipa: "/ˈproʊ lɒɡ/", r: "PRO log", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "\"PRO-log\"." },
  { w: "PHP", ipa: "/ˌpiː eɪtʃ ˈpiː/", r: "P H P", aIpa: "", aR: "", url: "https://www.php.net/", srcLabel: "PHP.net", cat: "product", conf: "community-consensus", notes: "Letters \"P-H-P\"." },
  { w: "IDE", ipa: "/ˌaɪ diː ˈiː/", r: "I D E", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"I-D-E\". Integrated Development Environment." },
  { w: "RFC", ipa: "/ˌɑːr ɛf ˈsiː/", r: "R F C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"R-F-C\". Request For Comments." },
  { w: "Bash", ipa: "/bæʃ/", r: "bash", aIpa: "", aR: "", url: "https://www.gnu.org/software/bash/", srcLabel: "GNU Bash", cat: "product", conf: "community-consensus", notes: "\"bash\" the word. Bourne-Again Shell." },
  { w: "Swift", ipa: "/swɪft/", r: "swift", aIpa: "", aR: "", url: "https://www.swift.org/", srcLabel: "Swift.org", cat: "product", conf: "community-consensus", notes: "\"swift\" the word. Apple language." },
  { w: "Rust", ipa: "/rʌst/", r: "rust", aIpa: "", aR: "", url: "https://www.rust-lang.org/", srcLabel: "Rust", cat: "product", conf: "community-consensus", notes: "\"rust\" the word." },
  { w: "Go", ipa: "/ɡoʊ/", r: "go", aIpa: "/ˈɡoʊ læŋ/", aR: "go lang", url: "https://go.dev/", srcLabel: "Go", cat: "product", conf: "community-consensus", notes: "\"go\" the word; \"Golang\" common in writing/SEO but pronounced \"Go\"." },
  { w: "Ruby", ipa: "/ˈruːbi/", r: "ruby", aIpa: "", aR: "", url: "https://www.ruby-lang.org/", srcLabel: "Ruby", cat: "product", conf: "community-consensus", notes: "\"ruby\" the word." },
  { w: "npm", ipa: "/ˌɛn piː ˈɛm/", r: "N P M", aIpa: "", aR: "", url: "https://docs.npmjs.com/about-npm", srcLabel: "npm docs", cat: "cli-tool", conf: "community-consensus", notes: "Letters \"N-P-M\". Officially lowercase, not an acronym." },
  { w: "yarn", ipa: "/jɑːrn/", r: "yarn", aIpa: "", aR: "", url: "https://yarnpkg.com/", srcLabel: "Yarn docs", cat: "cli-tool", conf: "community-consensus", notes: "\"yarn\" the word." },
  { w: "SPA", ipa: "/ˌɛs piː ˈeɪ/", r: "S P A", aIpa: "/spɑː/", aR: "spah", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "Letter-by-letter dominant; \"spa\" the word also heard. Single-Page Application." },
  { w: "PWA", ipa: "/ˌpiː dʌbəl juː ˈeɪ/", r: "P W A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"P-W-A\". Progressive Web App." },
  { w: "SSR", ipa: "/ˌɛs ɛs ˈɑːr/", r: "S S R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-S-R\". Server-Side Rendering." },
  { w: "CSR", ipa: "/ˌsiː ɛs ˈɑːr/", r: "C S R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-S-R\". Client-Side Rendering." },
  { w: "SSG", ipa: "/ˌɛs ɛs ˈdʒiː/", r: "S S G", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-S-G\". Static Site Generation." },
  { w: "ISR", ipa: "/ˌaɪ ɛs ˈɑːr/", r: "I S R", aIpa: "", aR: "", url: "https://nextjs.org/docs/", srcLabel: "Next.js docs", cat: "acronym", conf: "community-consensus", notes: "Letters \"I-S-R\". Incremental Static Regeneration." },
  { w: "DOM", ipa: "/dɒm/", r: "dom", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"dom\" rhymes with \"mom\". Document Object Model." },
  { w: "AST", ipa: "/ˌeɪ ɛs ˈtiː/", r: "A S T", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"A-S-T\". Abstract Syntax Tree." },
  { w: "V8", ipa: "/ˌviː ˈeɪt/", r: "V eight", aIpa: "", aR: "", url: "https://v8.dev/", srcLabel: "V8", cat: "tool", conf: "community-consensus", notes: "\"V-eight\". Google JS engine." },
  { w: "BFF", ipa: "/ˌbiː ɛf ˈɛf/", r: "B F F", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"B-F-F\". Backend For Frontend." },
  { w: "JPA", ipa: "/ˌdʒeɪ piː ˈeɪ/", r: "J P A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"J-P-A\". Java Persistence API." },
  { w: "JDBC", ipa: "/ˌdʒeɪ diː biː ˈsiː/", r: "J D B C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"J-D-B-C\". Java Database Connectivity." },
  { w: "POJO", ipa: "/ˈpoʊ dʒoʊ/", r: "POE joh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Plain_old_Java_object", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"POH-joh\". Plain Old Java Object." },
  { w: "DTO", ipa: "/ˌdiː tiː ˈoʊ/", r: "D T O", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"D-T-O\". Data Transfer Object." },
  { w: "Adam", ipa: "/ˈæ dəm/", r: "adam", aIpa: "", aR: "", url: "https://arxiv.org/abs/1412.6980", srcLabel: "Adam paper", cat: "cs-term", conf: "community-consensus", notes: "\"AD-uhm\" — name. Adaptive Moment Estimation." },
  { w: "AdamW", ipa: "/ˈæ dəm ˈdʌbəl juː/", r: "adam W", aIpa: "", aR: "", url: "https://arxiv.org/abs/1711.05101", srcLabel: "AdamW paper", cat: "cs-term", conf: "community-consensus", notes: "\"AD-uhm W\" — Adam with decoupled Weight decay." },
  { w: "Transformer", ipa: "/trænsˈfɔːr mər/", r: "trans former", aIpa: "", aR: "", url: "https://arxiv.org/abs/1706.03762", srcLabel: "Attention paper", cat: "cs-term", conf: "community-consensus", notes: "\"trans-FOR-mer\" — the architecture, not the toy." },
  { w: "BERT", ipa: "/bɜːrt/", r: "burt", aIpa: "", aR: "", url: "https://arxiv.org/abs/1810.04805", srcLabel: "BERT paper", cat: "product", conf: "community-consensus", notes: "\"burt\" — like the name. Bidirectional Encoder Representations from Transformers." },
  { w: "T5", ipa: "/ˌtiː ˈfaɪv/", r: "T five", aIpa: "", aR: "", url: "https://arxiv.org/abs/1910.10683", srcLabel: "T5 paper", cat: "product", conf: "community-consensus", notes: "\"T-five\". Text-to-Text Transfer Transformer." },
  { w: "PaLM", ipa: "/pɑːm/", r: "pom", aIpa: "/ˌpiː eɪ ɛl ˈɛm/", aR: "P A L M", url: "https://arxiv.org/abs/2204.02311", srcLabel: "PaLM paper", cat: "product", conf: "contested", notes: "Google brand: \"pom\" (palm tree); letter-by-letter also heard. Pathways Language Model." },
  { w: "SAM", ipa: "/sæm/", r: "sam", aIpa: "", aR: "", url: "https://segment-anything.com/", srcLabel: "Meta SAM", cat: "product", conf: "community-consensus", notes: "\"sam\" — name. Segment Anything Model." },
  { w: "CLIP", ipa: "/klɪp/", r: "clip", aIpa: "", aR: "", url: "https://openai.com/research/clip", srcLabel: "OpenAI CLIP", cat: "product", conf: "community-consensus", notes: "\"clip\" the word. Contrastive Language-Image Pre-training." },
  { w: "DINO", ipa: "/ˈdiː noʊ/", r: "DEE noh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2104.14294", srcLabel: "DINO paper", cat: "product", conf: "community-consensus", notes: "\"DEE-noh\". Self-DIstillation with NO labels." },
  { w: "ColBERT", ipa: "/kɒlˈbɜːrt/", r: "col BURT", aIpa: "", aR: "", url: "https://arxiv.org/abs/2004.12832", srcLabel: "ColBERT paper", cat: "product", conf: "community-consensus", notes: "\"col-BURT\" — like Stephen Colbert. Contextualized Late interaction over BERT." },
  { w: "HNSW", ipa: "/ˌeɪtʃ ɛn ɛs ˈdʌbəl juː/", r: "H N S W", aIpa: "", aR: "", url: "https://arxiv.org/abs/1603.09320", srcLabel: "HNSW paper", cat: "cs-term", conf: "community-consensus", notes: "Letters \"H-N-S-W\". Hierarchical Navigable Small World." },
  { w: "Karpathy", ipa: "/kɑːrˈpɑː θi/", r: "kar PAH thee", aIpa: "", aR: "", url: "https://karpathy.ai/", srcLabel: "karpathy.ai", cat: "product", conf: "community-consensus", notes: "\"kar-PAH-thee\". Andrej Karpathy." },
  { w: "EVM", ipa: "/ˌiː viː ˈɛm/", r: "E V M", aIpa: "", aR: "", url: "https://ethereum.org/en/developers/docs/evm/", srcLabel: "ethereum.org", cat: "acronym", conf: "community-consensus", notes: "Letters \"E-V-M\". Ethereum Virtual Machine." },
  { w: "ABI", ipa: "/ˌeɪ biː ˈaɪ/", r: "A B I", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"A-B-I\". Application Binary Interface." },
  { w: "dApp", ipa: "/ˈdiː æp/", r: "D app", aIpa: "", aR: "", url: "https://ethereum.org/en/dapps/", srcLabel: "ethereum.org", cat: "acronym", conf: "community-consensus", notes: "\"D-app\". Decentralized App." },
  { w: "ENS", ipa: "/ˌiː ɛn ˈɛs/", r: "E N S", aIpa: "", aR: "", url: "https://ens.domains/", srcLabel: "ENS", cat: "product", conf: "community-consensus", notes: "Letters \"E-N-S\". Ethereum Name Service." },
  { w: "SLA", ipa: "/ˌɛs ɛl ˈeɪ/", r: "S L A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-L-A\". Service Level Agreement." },
  { w: "SLO", ipa: "/ˌɛs ɛl ˈoʊ/", r: "S L O", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-L-O\". Service Level Objective." },
  { w: "SLI", ipa: "/ˌɛs ɛl ˈaɪ/", r: "S L I", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-L-I\". Service Level Indicator." },
  { w: "KPI", ipa: "/ˌkeɪ piː ˈaɪ/", r: "K P I", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"K-P-I\"." },
  { w: "MTTR", ipa: "/ˌɛm tiː tiː ˈɑːr/", r: "M T T R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"M-T-T-R\". Mean Time To Recovery." },
  { w: "MTBF", ipa: "/ˌɛm tiː biː ˈɛf/", r: "M T B F", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"M-T-B-F\". Mean Time Between Failures." },
  { w: "uvicorn", ipa: "/ˌjuː viː ˈkɔːrn/", r: "yoo vee corn", aIpa: "", aR: "", url: "https://www.uvicorn.org/", srcLabel: "Uvicorn docs", cat: "tool", conf: "community-consensus", notes: "\"yoo-vee-CORN\". Python ASGI server." },
  { w: "gunicorn", ipa: "/ˈɡʌn i kɔːrn/", r: "GUN i corn", aIpa: "", aR: "", url: "https://gunicorn.org/", srcLabel: "Gunicorn", cat: "tool", conf: "community-consensus", notes: "\"GUN-uh-corn\" — like a unicorn with a gun. Green Unicorn." },
  { w: "WSGI", ipa: "/ˈwɪz ɡi/", r: "WIZ gee", aIpa: "/ˌdʌbəl juː ɛs dʒiː ˈaɪ/", aR: "double you S G I", url: "https://wsgi.readthedocs.io/", srcLabel: "WSGI docs", cat: "acronym", conf: "contested", notes: "\"WIZ-gee\" common; letter-by-letter also heard. Web Server Gateway Interface." },
  { w: "WebKit", ipa: "/ˈwɛb kɪt/", r: "web kit", aIpa: "", aR: "", url: "https://webkit.org/", srcLabel: "WebKit", cat: "product", conf: "community-consensus", notes: "\"web-KIT\". Apple browser engine." },
  { w: "Big-O", ipa: "/ˌbɪɡ ˈoʊ/", r: "big oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Big_O_notation", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"big-OH\". Asymptotic upper bound notation." },
  { w: "pub/sub", ipa: "/ˈpʌb sʌb/", r: "pub sub", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"pub-SUB\". Publish/Subscribe pattern." },
  { w: "OOM", ipa: "/ˌoʊ oʊ ˈɛm/", r: "O O M", aIpa: "/uːm/", aR: "oom", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "Letters dominant; \"oom\" rare. Out Of Memory." },
  { w: "i18n", ipa: "/ˌaɪ eɪˈtiːn ɛn/", r: "eye eighteen N", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Internationalization_and_localization", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "\"eye-eighteen-N\". 18 letters between i and n in \"internationalization\"." },
  { w: "l10n", ipa: "/ˌɛl tɛn ˈɛn/", r: "L ten N", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Internationalization_and_localization", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "\"L-ten-N\". 10 letters between L and n in \"localization\"." },
  { w: "a11y", ipa: "/ˌeɪ ɪˈlɛvən waɪ/", r: "A eleven Y", aIpa: "", aR: "", url: "https://www.a11yproject.com/", srcLabel: "A11y Project", cat: "abbreviation", conf: "creator-clarified", notes: "\"A-eleven-Y\". 11 letters between a and y in \"accessibility\"." },
  { w: "e2e", ipa: "/ˌiː tuː ˈiː/", r: "E two E", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "\"E-two-E\". End-to-end (testing)." },
  { w: "m17n", ipa: "/ˌɛm sɛvənˈtiːn ɛn/", r: "M seventeen N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "\"M-seventeen-N\". 17 letters between m and n in \"multilingualization\"." },
  { w: "s11n", ipa: "/ˌɛs ɪˈlɛvən ɛn/", r: "S eleven N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "\"S-eleven-N\". Serialization." },
  { w: "p13n", ipa: "/ˌpiː θɜːrˈtiːn ɛn/", r: "P thirteen N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "\"P-thirteen-N\". Personalization." },
  { w: "g11n", ipa: "/ˌdʒiː ɪˈlɛvən ɛn/", r: "G eleven N", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "\"G-eleven-N\". Globalization (umbrella for i18n + l10n)." },
  { w: "Hopper", ipa: "/ˈhɒpər/", r: "HOP er", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Hopper_(microarchitecture)", srcLabel: "NVIDIA Hopper", cat: "product", conf: "community-consensus", notes: "\"HOP-er\". NVIDIA H100/H200 architecture, named after Grace Hopper." },
  { w: "Blackwell", ipa: "/ˈblæk wɛl/", r: "BLACK well", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Blackwell_(microarchitecture)", srcLabel: "NVIDIA Blackwell", cat: "product", conf: "community-consensus", notes: "\"BLACK-well\". NVIDIA B100/B200 architecture, named after mathematician David Blackwell." },
  { w: "Lovelace", ipa: "/ˈlʌv leɪs/", r: "LUV lace", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Ada_Lovelace_(microarchitecture)", srcLabel: "NVIDIA Ada Lovelace", cat: "product", conf: "community-consensus", notes: "\"LUV-lace\" (RTX 40-series), after Ada Lovelace." },
  { w: "Ampere", ipa: "/ˈæm pɪər/", r: "AM peer", aIpa: "/ˈæm pɛər/", aR: "AM pair", url: "https://en.wikipedia.org/wiki/Ampere_(microarchitecture)", srcLabel: "NVIDIA Ampere", cat: "product", conf: "contested", notes: "US: \"AM-peer\"; UK: \"AM-pair\". RTX 30-series + A100." },
  { w: "Volta", ipa: "/ˈvoʊl tə/", r: "VOLE ta", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Volta_(microarchitecture)", srcLabel: "NVIDIA Volta", cat: "product", conf: "community-consensus", notes: "\"VOLE-ta\". V100. Named after Alessandro Volta." },
  { w: "Pascal", ipa: "/pæˈskæl/", r: "pas KAL", aIpa: "/ˈpæs kəl/", aR: "PAS kuhl", url: "https://en.wikipedia.org/wiki/Pascal_(microarchitecture)", srcLabel: "NVIDIA Pascal", cat: "product", conf: "contested", notes: "Programming-language origin \"PAS-kuhl\"; NVIDIA uses \"pas-KAL\" in talks. After Blaise Pascal." },
  { w: "Grace", ipa: "/ɡreɪs/", r: "grace", aIpa: "", aR: "", url: "https://www.nvidia.com/en-us/data-center/grace-cpu/", srcLabel: "NVIDIA Grace", cat: "product", conf: "community-consensus", notes: "\"grace\" the word. NVIDIA ARM CPU, named after Grace Hopper." },
  { w: "Turing", ipa: "/ˈtʊər ɪŋ/", r: "TURE ing", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Turing_(microarchitecture)", srcLabel: "NVIDIA Turing", cat: "product", conf: "community-consensus", notes: "\"TURE-ing\" (rhymes with \"during\"). RTX 20-series. After Alan Turing." },
  { w: "Heartbleed", ipa: "/ˈhɑːrt bliːd/", r: "heart bleed", aIpa: "", aR: "", url: "https://heartbleed.com/", srcLabel: "heartbleed.com", cat: "cs-term", conf: "community-consensus", notes: "\"heart-bleed\". CVE-2014-0160. OpenSSL bug." },
  { w: "Shellshock", ipa: "/ˈʃɛl ʃɒk/", r: "shell shock", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Shellshock_(software_bug)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"shell-shock\". CVE-2014-6271. Bash bug." },
  { w: "Log4Shell", ipa: "/ˌlɒɡ fɔːr ˈʃɛl/", r: "log four shell", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Log4Shell", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"log-four-shell\". CVE-2021-44228. log4j RCE." },
  { w: "Spectre", ipa: "/ˈspɛk tər/", r: "SPEK ter", aIpa: "", aR: "", url: "https://spectreattack.com/", srcLabel: "spectreattack.com", cat: "cs-term", conf: "community-consensus", notes: "\"SPEK-ter\". CPU side-channel vuln (2018)." },
  { w: "Meltdown", ipa: "/ˈmɛlt daʊn/", r: "melt down", aIpa: "", aR: "", url: "https://meltdownattack.com/", srcLabel: "meltdownattack.com", cat: "cs-term", conf: "community-consensus", notes: "\"melt-down\". CPU vuln paired with Spectre." },
  { w: "Druid", ipa: "/ˈdruː ɪd/", r: "DROO id", aIpa: "", aR: "", url: "https://druid.apache.org/", srcLabel: "Apache Druid", cat: "product", conf: "community-consensus", notes: "\"DROO-id\". Real-time analytics DB." },
  { w: "Pinot", ipa: "/ˈpiː noʊ/", r: "PEE noh", aIpa: "", aR: "", url: "https://pinot.apache.org/", srcLabel: "Apache Pinot", cat: "product", conf: "community-consensus", notes: "\"PEE-noh\" (like the wine). Real-time OLAP store." },
  { w: "TiDB", ipa: "/ˌtiː aɪ diː ˈbiː/", r: "T I D B", aIpa: "", aR: "", url: "https://www.pingcap.com/tidb/", srcLabel: "PingCAP TiDB", cat: "product", conf: "community-consensus", notes: "Letters \"T-I-D-B\". Hybrid SQL by PingCAP." },
  { w: "YugabyteDB", ipa: "/ˈjuː ɡə baɪt diː biː/", r: "YOO guh bite D B", aIpa: "", aR: "", url: "https://www.yugabyte.com/", srcLabel: "Yugabyte", cat: "product", conf: "community-consensus", notes: "\"YOO-guh-bite-D-B\". Distributed SQL." },
  { w: "StarRocks", ipa: "/ˈstɑːr rɒks/", r: "star rocks", aIpa: "", aR: "", url: "https://www.starrocks.io/", srcLabel: "StarRocks", cat: "product", conf: "community-consensus", notes: "\"star-rocks\". OLAP database." },
  { w: "Doris", ipa: "/ˈdɔːr ɪs/", r: "DOR is", aIpa: "", aR: "", url: "https://doris.apache.org/", srcLabel: "Apache Doris", cat: "product", conf: "community-consensus", notes: "\"DOR-is\". MPP analytical DB." },
  { w: "Hardhat", ipa: "/ˈhɑːrd hæt/", r: "hard hat", aIpa: "", aR: "", url: "https://hardhat.org/", srcLabel: "Hardhat", cat: "tool", conf: "community-consensus", notes: "\"hard-hat\". Ethereum development environment." },
  { w: "Foundry", ipa: "/ˈfaʊn dri/", r: "FOUN dree", aIpa: "", aR: "", url: "https://getfoundry.sh/", srcLabel: "Foundry", cat: "tool", conf: "community-consensus", notes: "\"FOUN-dree\". Solidity smart contract toolkit." },
  { w: "Anvil", ipa: "/ˈæn vɪl/", r: "AN vil", aIpa: "", aR: "", url: "https://book.getfoundry.sh/anvil/", srcLabel: "Foundry Anvil", cat: "tool", conf: "community-consensus", notes: "\"AN-vil\". Foundry local Ethereum node." },
  { w: "Solana", ipa: "/səˈlɑː nə/", r: "suh LAH nuh", aIpa: "", aR: "", url: "https://solana.com/", srcLabel: "Solana", cat: "product", conf: "community-consensus", notes: "\"suh-LAH-nuh\". L1 blockchain." },
  { w: "WHATWG", ipa: "/ˈwɒt wɪɡ/", r: "WAT wig", aIpa: "/ˌdʌbəl juː eɪtʃ eɪ tiː ˌdʌbəl juː ˈdʒiː/", aR: "W H A T W G", url: "https://whatwg.org/", srcLabel: "WHATWG", cat: "acronym", conf: "contested", notes: "\"WHAT-wig\" common; letter-by-letter also heard. Web Hypertext Application Technology Working Group." },
  { w: "ECMA", ipa: "/ˈɛk mə/", r: "EK ma", aIpa: "/ˌiː siː ɛm ˈeɪ/", aR: "E C M A", url: "https://ecma-international.org/", srcLabel: "Ecma International", cat: "acronym", conf: "contested", notes: "\"EK-ma\" (one word) is the org's own usage; letter-by-letter also common. European Computer Manufacturers Association (legacy name)." },
  { w: "IETF", ipa: "/ˌaɪ iː tiː ˈɛf/", r: "I E T F", aIpa: "", aR: "", url: "https://www.ietf.org/", srcLabel: "IETF", cat: "acronym", conf: "community-consensus", notes: "Letters \"I-E-T-F\". Internet Engineering Task Force." },
  { w: "Raft", ipa: "/ræft/", r: "raft", aIpa: "", aR: "", url: "https://raft.github.io/", srcLabel: "raft.github.io", cat: "cs-term", conf: "creator-clarified", notes: "\"raft\" the word. Consensus algorithm by Diego Ongaro + John Ousterhout, intended as \"more understandable than Paxos\"." },
  { w: "Paxos", ipa: "/ˈpæk soʊs/", r: "PAK sose", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Paxos_(computer_science)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"PAK-sose\" — after the Greek island. Leslie Lamport's consensus algorithm." },
  { w: "gossip", ipa: "/ˈɡɒs ɪp/", r: "gossip", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Gossip_protocol", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "English word. Epidemic/anti-entropy protocol family." },
  { w: "Byzantine", ipa: "/bɪˈzæn tiːn/", r: "biz AN teen", aIpa: "/ˈbɪz ən taɪn/", aR: "BIZ un tine", url: "https://lamport.azurewebsites.net/pubs/byz.pdf", srcLabel: "Lamport 1982", cat: "cs-term", conf: "contested", notes: "\"biz-AN-teen\" US default; \"BIZ-un-tine\" UK / older usage. Byzantine fault tolerance." },
  { w: "quorum", ipa: "/ˈkwɔːr əm/", r: "QUOR um", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"QUOR-um\". Latin for the minimum number required." },
  { w: "Lamport", ipa: "/ˈlæm pɔːrt/", r: "LAM port", aIpa: "", aR: "", url: "https://lamport.azurewebsites.net/", srcLabel: "Leslie Lamport site", cat: "cs-term", conf: "creator-clarified", notes: "\"LAM-port\". Leslie Lamport — distributed-systems pioneer." },
  { w: "Saga", ipa: "/ˈsɑː ɡə/", r: "SAH guh", aIpa: "", aR: "", url: "https://microservices.io/patterns/data/saga.html", srcLabel: "microservices.io", cat: "cs-term", conf: "community-consensus", notes: "\"SAH-guh\". Long-running distributed transaction pattern." },
  { w: "HLC", ipa: "/ˌeɪtʃ ɛl ˈsiː/", r: "H L C", aIpa: "", aR: "", url: "https://cse.buffalo.edu/tech-reports/2014-04.pdf", srcLabel: "Kulkarni et al. 2014", cat: "acronym", conf: "community-consensus", notes: "Letters \"H-L-C\". Hybrid Logical Clock." },
  { w: "vector clock", ipa: "/ˈvɛk tər klɒk/", r: "VEK ter clock", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Vector_clock", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"VEK-ter clock\". Logical-time data structure." },
  { w: "Ed25519", ipa: "/ˌiː diː ˌtwɛnti faɪv faɪv ˌwʌn ˈnaɪn/", r: "E D twenty-five five one nine", aIpa: "", aR: "", url: "https://ed25519.cr.yp.to/", srcLabel: "ed25519.cr.yp.to", cat: "cs-term", conf: "community-consensus", notes: "\"E-D-twenty-five-five-one-nine\". EdDSA over Curve25519." },
  { w: "ChaCha20", ipa: "/ˌtʃɑː tʃɑː ˈtwɛn ti/", r: "CHA cha twenty", aIpa: "", aR: "", url: "https://datatracker.ietf.org/doc/html/rfc7539", srcLabel: "RFC 7539", cat: "cs-term", conf: "community-consensus", notes: "\"CHA-cha twenty\". Bernstein stream cipher." },
  { w: "Poly1305", ipa: "/ˈpɒl iː ˌθɜːrˌtiːn ˌoʊ ˈfaɪv/", r: "PA lee thirteen oh five", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Bernstein MAC; usually said \"Polly-thirteen-oh-five\"." },
  { w: "X25519", ipa: "/ˌɛks ˌtwɛnti faɪv faɪv ˌwʌn ˈnaɪn/", r: "X twenty-five five one nine", aIpa: "", aR: "", url: "https://datatracker.ietf.org/doc/html/rfc7748", srcLabel: "RFC 7748", cat: "cs-term", conf: "community-consensus", notes: "\"X-twenty-five-five-one-nine\". DH on Curve25519." },
  { w: "OAEP", ipa: "/ˌoʊ eɪ iː ˈpiː/", r: "O A E P", aIpa: "/ˈweɪ ɛp/", aR: "WAY ep", url: "https://datatracker.ietf.org/doc/html/rfc8017", srcLabel: "RFC 8017", cat: "acronym", conf: "contested", notes: "Letter-by-letter dominant; some crypto folks say \"WAY-ep\". Optimal Asymmetric Encryption Padding." },
  { w: "scrypt", ipa: "/ɛs ˈkrɪpt/", r: "S crypt", aIpa: "", aR: "", url: "https://www.tarsnap.com/scrypt.html", srcLabel: "Colin Percival (creator)", cat: "cs-term", conf: "creator-clarified", notes: "Creator Colin Percival: \"ess-crypt\" (S then crypt). \"script\" is common but not the intent." },
  { w: "argon2", ipa: "/ˈɑːr ɡən tuː/", r: "AR gon two", aIpa: "", aR: "", url: "https://www.password-hashing.net/", srcLabel: "Password Hashing Competition", cat: "cs-term", conf: "community-consensus", notes: "\"AR-gon-two\". 2015 PHC winner." },
  { w: "bcrypt", ipa: "/ˈbiː krɪpt/", r: "B crypt", aIpa: "", aR: "", url: "https://www.usenix.org/legacy/events/usenix99/provos/provos_html/", srcLabel: "Provos & Mazières 1999", cat: "cs-term", conf: "community-consensus", notes: "\"B-crypt\" — B for Blowfish + crypt." },
  { w: "EC2", ipa: "/ˌiː tuː ˈsiː/", r: "E two C", aIpa: "", aR: "", url: "https://aws.amazon.com/ec2/", srcLabel: "AWS EC2", cat: "product", conf: "community-consensus", notes: "\"E-two-C\". Elastic Compute Cloud." },
  { w: "S3", ipa: "/ˌɛs ˈθriː/", r: "S three", aIpa: "", aR: "", url: "https://aws.amazon.com/s3/", srcLabel: "AWS S3", cat: "product", conf: "community-consensus", notes: "\"S-three\". Simple Storage Service." },
  { w: "RDS", ipa: "/ˌɑːr diː ˈɛs/", r: "R D S", aIpa: "", aR: "", url: "https://aws.amazon.com/rds/", srcLabel: "AWS RDS", cat: "product", conf: "community-consensus", notes: "Letters \"R-D-S\". Relational Database Service." },
  { w: "IAM", ipa: "/ˌaɪ eɪ ˈɛm/", r: "I A M", aIpa: "", aR: "", url: "https://docs.aws.amazon.com/iam/", srcLabel: "AWS IAM", cat: "product", conf: "community-consensus", notes: "Letters \"I-A-M\". Identity and Access Management." },
  { w: "KMS", ipa: "/ˌkeɪ ɛm ˈɛs/", r: "K M S", aIpa: "", aR: "", url: "https://aws.amazon.com/kms/", srcLabel: "AWS KMS", cat: "product", conf: "community-consensus", notes: "Letters \"K-M-S\". Key Management Service." },
  { w: "EKS", ipa: "/ˌiː keɪ ˈɛs/", r: "E K S", aIpa: "", aR: "", url: "https://aws.amazon.com/eks/", srcLabel: "AWS EKS", cat: "product", conf: "community-consensus", notes: "Letters \"E-K-S\". AWS managed Kubernetes." },
  { w: "ECS", ipa: "/ˌiː siː ˈɛs/", r: "E C S", aIpa: "", aR: "", url: "https://aws.amazon.com/ecs/", srcLabel: "AWS ECS", cat: "product", conf: "community-consensus", notes: "Letters \"E-C-S\". Elastic Container Service." },
  { w: "GKE", ipa: "/ˌdʒiː keɪ ˈiː/", r: "G K E", aIpa: "", aR: "", url: "https://cloud.google.com/kubernetes-engine", srcLabel: "Google GKE", cat: "product", conf: "community-consensus", notes: "Letters \"G-K-E\". Google Kubernetes Engine." },
  { w: "AKS", ipa: "/ˌeɪ keɪ ˈɛs/", r: "A K S", aIpa: "", aR: "", url: "https://learn.microsoft.com/en-us/azure/aks/", srcLabel: "Azure AKS", cat: "product", conf: "community-consensus", notes: "Letters \"A-K-S\". Azure Kubernetes Service." },
  { w: "Route53", ipa: "/ruːt ˌfɪf ti ˈθriː/", r: "root fifty-three", aIpa: "/raʊt ˌfɪf ti ˈθriː/", aR: "rowt fifty-three", url: "https://aws.amazon.com/route53/", srcLabel: "AWS Route 53", cat: "product", conf: "contested", notes: "US tech \"root\"; UK / general \"rowt\". Port 53 = DNS." },
  { w: "io_uring", ipa: "/ˌaɪ oʊ ˈrɪŋ/", r: "I O ring", aIpa: "", aR: "", url: "https://kernel.dk/io_uring.pdf", srcLabel: "Jens Axboe paper", cat: "cs-term", conf: "creator-clarified", notes: "Jens Axboe (creator): \"I-O ring\" — letters I and O then the word \"ring\". The underscore is silent; the \"u\" is the start of \"uring\" → \"ring\". Async I/O syscall API." },
  { w: "Btrfs", ipa: "/ˈbʌt ər ɛf ɛs/", r: "BUTTER F S", aIpa: "/ˌbiː tiː ɑːr ɛf ˈɛs/", aR: "B T R F S", url: "https://btrfs.readthedocs.io/", srcLabel: "Btrfs docs", cat: "product", conf: "contested", notes: "Chris Mason / kernel folks: \"butter-F-S\" (B-Tree File System). Letter-by-letter also common." },
  { w: "ZFS", ipa: "/ˌziː ɛf ˈɛs/", r: "Z F S", aIpa: "", aR: "", url: "https://openzfs.org/", srcLabel: "OpenZFS", cat: "product", conf: "community-consensus", notes: "Letters \"Z-F-S\". Originally Zettabyte File System." },
  { w: "cgroups", ipa: "/ˈsiː ɡruːps/", r: "C groups", aIpa: "", aR: "", url: "https://docs.kernel.org/admin-guide/cgroup-v2.html", srcLabel: "Linux kernel docs", cat: "cs-term", conf: "community-consensus", notes: "\"C-groups\". Control groups — Linux resource isolation." },
  { w: "strace", ipa: "/ˌɛs ˈtreɪs/", r: "S trace", aIpa: "", aR: "", url: "https://strace.io/", srcLabel: "strace.io", cat: "tool", conf: "community-consensus", notes: "\"S-trace\" — system call trace." },
  { w: "ltrace", ipa: "/ˌɛl ˈtreɪs/", r: "L trace", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "\"L-trace\" — library-call trace." },
  { w: "syscall", ipa: "/ˈsɪs kɔːl/", r: "SIS call", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"SIS-call\". System call." },
  { w: "DeepSeek-R1", ipa: "/ˌdiːp siːk ˌɑːr ˈwʌn/", r: "deep seek R one", aIpa: "", aR: "", url: "https://www.deepseek.com/", srcLabel: "DeepSeek", cat: "product", conf: "community-consensus", notes: "\"deep-seek R-one\". DeepSeek's reasoning model." },
  { w: "R1", ipa: "/ˌɑːr ˈwʌn/", r: "R one", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "\"R-one\". Generic short form, usually DeepSeek-R1." },
  { w: "o1", ipa: "/ˌoʊ ˈwʌn/", r: "O one", aIpa: "", aR: "", url: "https://openai.com/o1/", srcLabel: "OpenAI o1", cat: "product", conf: "community-consensus", notes: "\"O-one\". OpenAI reasoning model." },
  { w: "o3", ipa: "/ˌoʊ ˈθriː/", r: "O three", aIpa: "", aR: "", url: "https://openai.com/o3/", srcLabel: "OpenAI o3", cat: "product", conf: "community-consensus", notes: "\"O-three\". OpenAI reasoning model." },
  { w: "Sonnet", ipa: "/ˈsɒn ɪt/", r: "SON it", aIpa: "", aR: "", url: "https://www.anthropic.com/claude", srcLabel: "Anthropic Claude", cat: "product", conf: "community-consensus", notes: "\"SON-it\" — like the poem. Anthropic's mid-tier Claude." },
  { w: "Opus", ipa: "/ˈoʊ pəs/", r: "OH pus", aIpa: "", aR: "", url: "https://www.anthropic.com/claude", srcLabel: "Anthropic Claude", cat: "product", conf: "community-consensus", notes: "\"OH-pus\" — Latin for \"work\". Anthropic's frontier tier." },
  { w: "Haiku", ipa: "/ˈhaɪ kuː/", r: "HIGH koo", aIpa: "", aR: "", url: "https://www.anthropic.com/claude", srcLabel: "Anthropic Claude", cat: "product", conf: "community-consensus", notes: "\"HIGH-koo\" — Japanese poetic form. Anthropic's fast tier." },
  { w: "alpha", ipa: "/ˈæl fə/", r: "AL fuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"AL-fuh\". Greek α. Standard release-channel naming + math." },
  { w: "beta", ipa: "/ˈbeɪ tə/", r: "BAY tuh", aIpa: "/ˈbiː tə/", aR: "BEE tuh", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "US: \"BAY-tuh\". UK: \"BEE-tuh\". Greek β. Release channel + Bayes notation." },
  { w: "delta", ipa: "/ˈdɛl tə/", r: "DEL tuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"DEL-tuh\". Greek δ. Diff/change semantics + git-delta pager." },
  { w: "epsilon", ipa: "/ˈɛp sə lɒn/", r: "EP suh lon", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"EP-suh-lon\". Greek ε. Floating-point epsilon, ε-greedy." },
  { w: "mu", ipa: "/mjuː/", r: "myoo", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"myoo\". Greek μ. Statistical mean." },
  { w: "sigma", ipa: "/ˈsɪɡ mə/", r: "SIG muh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"SIG-muh\". Greek σ. Standard deviation, sum operator." },
  { w: "pi", ipa: "/paɪ/", r: "pye", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"pye\". Greek π. 3.14159… Also Raspberry Pi." },
  { w: "theta", ipa: "/ˈθeɪ tə/", r: "THAY tuh", aIpa: "/ˈθiː tə/", aR: "THEE tuh", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "US: \"THAY-tuh\". UK: \"THEE-tuh\". Greek θ. Angles + ML params." },
  { w: "kappa", ipa: "/ˈkæp ə/", r: "KAP uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"KAP-uh\". Greek κ. Twitch chat meme + Cohen's kappa." },
  { w: "zoxide", ipa: "/ˈzoʊk saɪd/", r: "ZOAK side", aIpa: "", aR: "", url: "https://github.com/ajeetdsouza/zoxide", srcLabel: "ajeetdsouza/zoxide", cat: "cli-tool", conf: "community-consensus", notes: "\"ZOAK-side\" — like zinc oxide. Smarter `cd`." },
  { w: "bat", ipa: "/bæt/", r: "bat", aIpa: "", aR: "", url: "https://github.com/sharkdp/bat", srcLabel: "sharkdp/bat", cat: "cli-tool", conf: "community-consensus", notes: "English \"bat\". cat clone with syntax highlighting." },
  { w: "hyperfine", ipa: "/ˈhaɪ pər faɪn/", r: "HYPER fyne", aIpa: "", aR: "", url: "https://github.com/sharkdp/hyperfine", srcLabel: "sharkdp/hyperfine", cat: "cli-tool", conf: "community-consensus", notes: "\"HYPER-fyne\". CLI benchmarking tool." },
  { w: "tokei", ipa: "/toʊˈkeɪ/", r: "toh KAY", aIpa: "", aR: "", url: "https://github.com/XAMPPRocky/tokei", srcLabel: "XAMPPRocky/tokei", cat: "cli-tool", conf: "community-consensus", notes: "\"toh-KAY\". Japanese 時計 (clock). Counts lines of code." },
  { w: "tealdeer", ipa: "/ˈtiːl dɪər/", r: "TEAL deer", aIpa: "", aR: "", url: "https://dbrgn.github.io/tealdeer/", srcLabel: "tealdeer docs", cat: "cli-tool", conf: "community-consensus", notes: "\"TEAL-deer\". tldr client written in Rust." },
  { w: "difftastic", ipa: "/dɪfˈtæs tɪk/", r: "diff TAS tik", aIpa: "", aR: "", url: "https://difftastic.wilfred.me.uk/", srcLabel: "difftastic docs", cat: "cli-tool", conf: "community-consensus", notes: "\"diff-TAS-tik\". Structural diff." },
  { w: "jq", ipa: "/ˌdʒeɪ ˈkjuː/", r: "J Q", aIpa: "", aR: "", url: "https://jqlang.org/", srcLabel: "jq docs", cat: "cli-tool", conf: "community-consensus", notes: "Letters \"J-Q\". JSON processor." },
  { w: "yq", ipa: "/ˌwaɪ ˈkjuː/", r: "Y Q", aIpa: "", aR: "", url: "https://github.com/mikefarah/yq", srcLabel: "mikefarah/yq", cat: "cli-tool", conf: "community-consensus", notes: "Letters \"Y-Q\". YAML/JSON/XML processor (jq spinoff)." },
  { w: "Cosmos", ipa: "/ˈkɒz məs/", r: "COZ mus", aIpa: "", aR: "", url: "https://cosmos.network/", srcLabel: "cosmos.network", cat: "product", conf: "community-consensus", notes: "\"KOZ-mus\". L1 blockchain." },
  { w: "Polkadot", ipa: "/ˈpoʊl kə dɒt/", r: "POLE kuh dot", aIpa: "", aR: "", url: "https://polkadot.network/", srcLabel: "polkadot.network", cat: "product", conf: "community-consensus", notes: "\"POLE-kuh-dot\" — the dance/pattern." },
  { w: "Cardano", ipa: "/kɑːrˈdɑː noʊ/", r: "kar DAH no", aIpa: "", aR: "", url: "https://cardano.org/", srcLabel: "cardano.org", cat: "product", conf: "community-consensus", notes: "\"kar-DAH-no\". After Gerolamo Cardano (mathematician)." },
  { w: "Avalanche", ipa: "/ˈæv ə læntʃ/", r: "AV uh lanch", aIpa: "", aR: "", url: "https://www.avax.network/", srcLabel: "avalanche", cat: "product", conf: "community-consensus", notes: "\"AV-uh-lanch\". L1 blockchain." },
  { w: "Aptos", ipa: "/ˈæp tɒs/", r: "AP toss", aIpa: "", aR: "", url: "https://aptos.dev/", srcLabel: "aptos.dev", cat: "product", conf: "community-consensus", notes: "\"AP-toss\". Move-based L1." },
  { w: "Sui", ipa: "/swiː/", r: "swee", aIpa: "", aR: "", url: "https://sui.io/", srcLabel: "sui.io", cat: "product", conf: "community-consensus", notes: "\"swee\" — like the wind. Move-based L1." },
  { w: "Optimism", ipa: "/ˈɒp tə mɪz əm/", r: "OP tih miz um", aIpa: "", aR: "", url: "https://www.optimism.io/", srcLabel: "optimism.io", cat: "product", conf: "community-consensus", notes: "\"OP-tih-miz-um\". Ethereum L2 rollup." },
  { w: "Arbitrum", ipa: "/ˈɑːr bɪ trəm/", r: "AR bih trum", aIpa: "/ɑːrˈbɪ trəm/", aR: "ar BIT rum", url: "https://arbitrum.io/", srcLabel: "arbitrum.io", cat: "product", conf: "contested", notes: "\"AR-bih-trum\" (Offchain Labs) common; \"ar-BIT-rum\" also heard." },
  { w: "Wasmtime", ipa: "/ˈwɒz əm taɪm/", r: "WOZ um time", aIpa: "", aR: "", url: "https://wasmtime.dev/", srcLabel: "wasmtime.dev", cat: "product", conf: "community-consensus", notes: "\"WOZ-um-time\" — wasm + time. WebAssembly runtime." },
  { w: "Snowpack", ipa: "/ˈsnoʊ pæk/", r: "SNOW pak", aIpa: "", aR: "", url: "https://www.snowpack.dev/", srcLabel: "snowpack.dev", cat: "product", conf: "community-consensus", notes: "\"SNOW-pak\". ESM build tool (now archived but vocabulary lives on)." },
  { w: "WireMock", ipa: "/ˈwaɪər mɒk/", r: "WYE er mok", aIpa: "", aR: "", url: "https://wiremock.org/", srcLabel: "wiremock.org", cat: "product", conf: "community-consensus", notes: "\"WIRE-mok\". HTTP API mocking server." },
  { w: "Trino", ipa: "/ˈtriː noʊ/", r: "TREE noh", aIpa: "", aR: "", url: "https://trino.io/", srcLabel: "trino.io", cat: "product", conf: "community-consensus", notes: "\"TREE-noh\". Forked from PrestoSQL in 2020." },
  { w: "Skopeo", ipa: "/skoʊˈpeɪ oʊ/", r: "skoh PAY oh", aIpa: "", aR: "", url: "https://github.com/containers/skopeo", srcLabel: "containers/skopeo", cat: "cli-tool", conf: "community-consensus", notes: "\"skoh-PAY-oh\". From Greek σκοπέω \"to look at\". OCI image inspector." },
  { w: "Buildah", ipa: "/ˈbɪl də/", r: "BIL duh", aIpa: "", aR: "", url: "https://buildah.io/", srcLabel: "buildah.io", cat: "cli-tool", conf: "creator-clarified", notes: "\"BIL-duh\" — Boston-accent \"builder\". Dan Walsh (creator) has confirmed in multiple talks." },
  { w: "cert-manager", ipa: "/sɜːrt ˈmæn ə dʒər/", r: "sert MAN uh jer", aIpa: "", aR: "", url: "https://cert-manager.io/", srcLabel: "cert-manager.io", cat: "product", conf: "community-consensus", notes: "\"sert MAN-uh-jer\". K8s X.509 cert lifecycle. CNCF graduated." },
  { w: "Verdaccio", ipa: "/vɛrˈdɑː tʃoʊ/", r: "ver DAH cho", aIpa: "", aR: "", url: "https://verdaccio.org/", srcLabel: "verdaccio.org", cat: "product", conf: "community-consensus", notes: "\"ver-DAH-cho\" — Italian. Named after the verdaccio fresco green-grey underpainting. npm registry proxy." },
  { w: "Tika", ipa: "/ˈtiː kə/", r: "TEE kuh", aIpa: "", aR: "", url: "https://tika.apache.org/", srcLabel: "tika.apache.org", cat: "product", conf: "community-consensus", notes: "\"TEE-kuh\". Apache content-extraction toolkit." },
  { w: "Vagrant", ipa: "/ˈveɪ ɡrənt/", r: "VAY grunt", aIpa: "", aR: "", url: "https://www.vagrantup.com/", srcLabel: "HashiCorp", cat: "product", conf: "community-consensus", notes: "\"VAY-grunt\" — the English word. HashiCorp VM dev environments." },
  { w: "KEDA", ipa: "/ˈkeɪ də/", r: "KAY duh", aIpa: "", aR: "", url: "https://keda.sh/", srcLabel: "keda.sh", cat: "product", conf: "community-consensus", notes: "\"KAY-duh\". Kubernetes Event-Driven Autoscaling. CNCF graduated." },
  { w: "Theia", ipa: "/ˈθiː ə/", r: "THEE uh", aIpa: "", aR: "", url: "https://theia-ide.org/", srcLabel: "theia-ide.org", cat: "product", conf: "community-consensus", notes: "\"THEE-uh\" — Greek titaness. Eclipse cloud IDE framework." },
  { w: "Plausible", ipa: "/ˈplɔː zə bəl/", r: "PLAW zuh bul", aIpa: "", aR: "", url: "https://plausible.io/", srcLabel: "plausible.io", cat: "product", conf: "community-consensus", notes: "\"PLAW-zuh-bul\" — the English word. Privacy-respecting web analytics." },
  { w: "Pinokio", ipa: "/pɪˈnoʊ ki oʊ/", r: "pih NO kee oh", aIpa: "", aR: "", url: "https://pinokio.computer/", srcLabel: "pinokio.computer", cat: "product", conf: "community-consensus", notes: "\"pih-NO-kee-oh\" — like Pinocchio (the puppet) but spelled with k. Local AI app launcher." },
  { w: "Aviary", ipa: "/ˈeɪ vi ɛr i/", r: "AY vee air ee", aIpa: "", aR: "", url: "https://aviary.fun/", srcLabel: "aviary.fun", cat: "product", conf: "community-consensus", notes: "\"AY-vee-air-ee\" — the English word for a bird enclosure." },
  { w: "GTM", ipa: "/ˌdʒiː tiː ˈɛm/", r: "G T M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Go-to-market_strategy", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"G-T-M\". Go-To-Market." },
  { w: "PLG", ipa: "/ˌpiː ɛl ˈdʒiː/", r: "P L G", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Product-led_growth", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"P-L-G\". Product-Led Growth." },
  { w: "SLG", ipa: "/ˌɛs ɛl ˈdʒiː/", r: "S L G", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-L-G\". Sales-Led Growth." },
  { w: "prosumer", ipa: "/proʊˈsuː mər/", r: "proh SOO mer", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Prosumer", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"proh-SOO-mer\". Portmanteau of professional + consumer." },
  { w: "TAM", ipa: "/tæm/", r: "tam", aIpa: "/ˌtiː eɪ ˈɛm/", aR: "T A M", url: "https://en.wikipedia.org/wiki/Total_addressable_market", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"tam\" (rhymes with ham) is standard in VC/PM; some say \"T-A-M\". Total Addressable Market." },
  { w: "SOM", ipa: "/sɒm/", r: "som", aIpa: "/ˌɛs oʊ ˈɛm/", aR: "S O M", url: "https://en.wikipedia.org/wiki/Total_addressable_market", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"som\" (rhymes with bomb) common; some say \"S-O-M\". Serviceable Obtainable Market." },
  { w: "CAC", ipa: "/ˌsiː eɪ ˈsiː/", r: "C A C", aIpa: "/kæk/", aR: "cack", url: "https://en.wikipedia.org/wiki/Customer_acquisition_cost", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "\"C-A-C\" letter-by-letter dominant in tech; \"cack\" (rhymes with back) sometimes heard. Customer Acquisition Cost." },
  { w: "LTV", ipa: "/ˌɛl tiː ˈviː/", r: "L T V", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Customer_lifetime_value", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"L-T-V\". Lifetime Value." },
  { w: "ARR", ipa: "/ˌeɪ ɑːr ˈɑːr/", r: "A R R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"A-R-R\". Annual Recurring Revenue." },
  { w: "MRR", ipa: "/ˌɛm ɑːr ˈɑːr/", r: "M R R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"M-R-R\". Monthly Recurring Revenue." },
  { w: "NRR", ipa: "/ˌɛn ɑːr ˈɑːr/", r: "N R R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"N-R-R\". Net Revenue Retention." },
  { w: "GRR", ipa: "/ˌdʒiː ɑːr ˈɑːr/", r: "G R R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"G-R-R\". Gross Revenue Retention." },
  { w: "ICP", ipa: "/ˌaɪ siː ˈpiː/", r: "I C P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"I-C-P\". Ideal Customer Profile." },
  { w: "NPS", ipa: "/ˌɛn piː ˈɛs/", r: "N P S", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Net_promoter_score", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"N-P-S\". Net Promoter Score." },
  { w: "OKR", ipa: "/ˌoʊ keɪ ˈɑːr/", r: "O K R", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Objectives_and_key_results", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"O-K-R\". Objectives and Key Results." },
  { w: "ROI", ipa: "/ˌɑːr oʊ ˈaɪ/", r: "R O I", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"R-O-I\". Return On Investment." },
  { w: "DAU", ipa: "/ˌdiː eɪ ˈjuː/", r: "D A U", aIpa: "/daʊ/", aR: "dow", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"D-A-U\" letter-by-letter most common in West; \"dow\" (rhymes with cow) heard in some East Asian / consumer-app circles. Daily Active Users." },
  { w: "MAU", ipa: "/ˌɛm eɪ ˈjuː/", r: "M A U", aIpa: "/maʊ/", aR: "mow", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"M-A-U\" letters dominant; \"mow\" (rhymes with cow) heard. Monthly Active Users." },
  { w: "B2B", ipa: "/ˌbiː tə ˈbiː/", r: "B to B", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"B-to-B\". Business-to-Business." },
  { w: "B2C", ipa: "/ˌbiː tə ˈsiː/", r: "B to C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"B-to-C\". Business-to-Consumer." },
  { w: "D2C", ipa: "/ˌdiː tə ˈsiː/", r: "D to C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"D-to-C\". Direct-to-Consumer." },
  { w: "B2B2C", ipa: "/ˌbiː tə ˌbiː tə ˈsiː/", r: "B to B to C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"B-to-B-to-C\". Business sells to business that sells to consumer." },
  { w: "IaaS", ipa: "/ˈaɪ ɑːz/", r: "EYE az", aIpa: "/ˌaɪ eɪ eɪ ˈɛs/", aR: "I A A S", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"EYE-az\" common; \"I-A-A-S\" also heard. Infrastructure as a Service." },
  { w: "freemium", ipa: "/ˈfriː mi əm/", r: "FREE mee um", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Freemium", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"FREE-mee-um\". Free + premium pricing." },
  { w: "churn", ipa: "/tʃɜːrn/", r: "chern", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"chern\" — rhymes with burn. Customer attrition rate." },
  { w: "cohort", ipa: "/ˈkoʊ hɔːrt/", r: "KOH hort", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"KOH-hort\". A group of users tracked together over time." },
  { w: "funnel", ipa: "/ˈfʌn əl/", r: "FUH nul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"FUH-nul\". Visitor → user → paying customer conversion stages." },
  { w: "scrum", ipa: "/skrʌm/", r: "scrum", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Scrum_(software_development)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"scrum\" — borrowed from rugby (scrummage). Iterative dev framework." },
  { w: "kanban", ipa: "/ˈkɑːn bɑːn/", r: "KAHN bahn", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Kanban_(development)", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "\"KAHN-bahn\" — Japanese 看板 (signboard). Visual workflow management." },
  { w: "sprint", ipa: "/sprɪnt/", r: "sprint", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"sprint\" — fixed-length scrum iteration (typically 1-4 weeks)." },
  { w: "backlog", ipa: "/ˈbæk lɔːɡ/", r: "BAK log", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"BAK-log\". Prioritized list of work items." },
  { w: "retro", ipa: "/ˈrɛ troʊ/", r: "REH troh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"REH-troh\". Short for \"retrospective\" — end-of-sprint review." },
  { w: "standup", ipa: "/ˈstænd ʌp/", r: "STAND up", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"STAND-up\". Daily 15-min team sync." },
  { w: "epic", ipa: "/ˈɛp ɪk/", r: "EH pik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"EH-pik\" — multi-sprint feature container in Jira/Linear." },
  { w: "QBR", ipa: "/ˌkjuː biː ˈɑːr/", r: "Q B R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"Q-B-R\". Quarterly Business Review." },
  { w: "PoC", ipa: "/ˌpiː oʊ ˈsiː/", r: "P O C", aIpa: "/pɒk/", aR: "pock", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"P-O-C\" letter-by-letter common; \"pock\" (rhymes with rock) heard in sales/SE. Proof of Concept." },
  { w: "PoV", ipa: "/ˌpiː oʊ ˈviː/", r: "P O V", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"P-O-V\". Proof of Value (a deeper, contract-stage PoC)." },
  { w: "ABM", ipa: "/ˌeɪ biː ˈɛm/", r: "A B M", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Account-based_marketing", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Letters \"A-B-M\". Account-Based Marketing." },
  { w: "moat", ipa: "/moʊt/", r: "moht", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"moht\" — rhymes with boat. Sustainable competitive advantage (Warren Buffett)." },
  { w: "flywheel", ipa: "/ˈflaɪ wiːl/", r: "FLY wheel", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"FLY-wheel\". Self-reinforcing growth loop (Jim Collins / Bezos)." },
  { w: "COGS", ipa: "/kɒɡz/", r: "kogs", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Cost_of_goods_sold", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"kogs\" — rhymes with logs. Cost of Goods Sold." },
  { w: "CRM", ipa: "/ˌsiː ɑːr ˈɛm/", r: "C R M", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-R-M\". Customer Relationship Management." },
  { w: "ERP", ipa: "/ˌiː ɑːr ˈpiː/", r: "E R P", aIpa: "/ɜːrp/", aR: "urp", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"E-R-P\" letter-by-letter standard; \"urp\" (rhymes with burp) heard in some industries. Enterprise Resource Planning." },
  { w: "EBITDA", ipa: "/ˈiː bɪt dɑː/", r: "EE bit dah", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/EBITDA", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"EE-bit-dah\". Earnings Before Interest, Taxes, Depreciation, Amortization." },
  { w: "SOC2", ipa: "/ˌsɒk ˈtuː/", r: "sock two", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/System_and_Organization_Controls", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"sock-two\". AICPA service-organization audit standard." },
  { w: "SOX", ipa: "/sɒks/", r: "sox", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Sarbanes%E2%80%93Oxley_Act", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "\"sox\" — rhymes with box. Sarbanes-Oxley Act (US public-company compliance)." },
  { w: "SEO", ipa: "/ˌɛs iː ˈoʊ/", r: "S E O", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-E-O\". Search Engine Optimization." },
  { w: "SEM", ipa: "/ˌɛs iː ˈɛm/", r: "S E M", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"S-E-M\". Search Engine Marketing (paid ads)." },
  { w: "CTR", ipa: "/ˌsiː tiː ˈɑːr/", r: "C T R", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-T-R\". Click-Through Rate." },
  { w: "CPC", ipa: "/ˌsiː piː ˈsiː/", r: "C P C", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-P-C\". Cost Per Click." },
  { w: "CPM", ipa: "/ˌsiː piː ˈɛm/", r: "C P M", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"C-P-M\". Cost Per Mille (per 1000 impressions)." },
  { w: "ROAS", ipa: "/ˈroʊ æs/", r: "ROW ass", aIpa: "/ˌɑːr oʊ eɪ ˈɛs/", aR: "R O A S", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"ROW-as\" most common in performance marketing; some spell out. Return On Ad Spend." },
  { w: "MoM", ipa: "/ˌɛm oʊ ˈɛm/", r: "M O M", aIpa: "/mɒm/", aR: "mom", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"M-O-M\" letters common in dashboards; \"mom\" (rhymes with bomb) sometimes spoken. Month-over-Month." },
  { w: "YoY", ipa: "/ˌwaɪ oʊ ˈwaɪ/", r: "Y O Y", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"Y-O-Y\". Year-over-Year." },
  { w: "QoQ", ipa: "/ˌkjuː oʊ ˈkjuː/", r: "Q O Q", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"Q-O-Q\". Quarter-over-Quarter." },
  { w: "NDA", ipa: "/ˌɛn diː ˈeɪ/", r: "N D A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"N-D-A\". Non-Disclosure Agreement." },
  { w: "MSA", ipa: "/ˌɛm ɛs ˈeɪ/", r: "M S A", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"M-S-A\". Master Service Agreement." },
  { w: "SOW", ipa: "/saʊ/", r: "sow", aIpa: "/ˌɛs oʊ ˈdʌb əl juː/", aR: "S O W", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"sow\" (rhymes with cow) — standard in consulting/sales. Some spell out. Statement of Work." },
  { w: "RFP", ipa: "/ˌɑːr ɛf ˈpiː/", r: "R F P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"R-F-P\". Request For Proposal." },
  { w: "NLP", ipa: "/ˌɛn ɛl ˈpiː/", r: "N L P", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Letters \"N-L-P\". Natural Language Processing (also Neuro-Linguistic Programming, same pronunciation)." },
  { w: "PII", ipa: "/ˌpiː aɪ ˈaɪ/", r: "P I I", aIpa: "/paɪ/", aR: "pie", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "\"P-I-I\" letter-by-letter standard in compliance/legal; \"pie\" sometimes heard casually. Personally Identifiable Information." },
  { w: "anaconda", ipa: "/ˌænəˈkɑːndə/", r: "anna konda", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Python distro; \"AN-uh-KON-duh\", like the snake." },
  { w: "ansible", ipa: "/ˈænsɪbəl/", r: "ann sih bull", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Red Hat automation; \"AN-si-buhl\", from the sci-fi FTL communicator." },
  { w: "cache", ipa: "/kæʃ/", r: "cash", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Rhymes with \"cash\", not \"cash-AY\"." },
  { w: "chown", ipa: "/tʃaʊn/", r: "choun", aIpa: "/ˌtʃ ˈoʊn/", aR: "ch own", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "\"change owner\"; rhymes-with-\"clown\" or spelled \"CH-own\"." },
  { w: "chroot", ipa: "/ˈtʃruːt/", r: "ch root", aIpa: "/ˌtʃeɪndʒ ruːt/", aR: "change root", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "\"change root\"; \"ch-root\" or said as \"change-root\"." },
  { w: "clang", ipa: "/klæŋ/", r: "klang", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "LLVM C/C++ compiler; rhymes with the sound \"clang\"." },
  { w: "cmake", ipa: "/ˈsiːmeɪk/", r: "see make", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Build tool; \"see-make\"." },
  { w: "conda", ipa: "/ˈkɑːndə/", r: "kon duh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Python package/env manager; \"KON-duh\"." },
  { w: "couchbase", ipa: "/ˈkaʊtʃbeɪs/", r: "couch base", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Document database; \"couch-base\"." },
  { w: "cron", ipa: "/krɑːn/", r: "kron", aIpa: "/kroʊn/", aR: "krohn", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "Scheduler; \"kron\" (rhymes \"on\") common, some \"krohn\". From Greek chronos." },
  { w: "crontab", ipa: "/ˈkrɑːntæb/", r: "kron tab", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cli-tool", conf: "community-consensus", notes: "\"cron table\"." },
  { w: "daemon", ipa: "/ˈdiːmən/", r: "dee mun", aIpa: "/ˈdeɪmən/", aR: "day mun", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Background process; classic \"DEE-mun\" vs \"DAY-mun\" split." },
  { w: "deque", ipa: "/dɛk/", r: "deck", aIpa: "/ˌdiː kjuː/", aR: "dee cue", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Double-ended queue; \"deck\" common, \"D-Q\" also heard." },
  { w: "epoll", ipa: "/ˈiː pɒl/", r: "ee poll", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Linux I/O event notification; \"e-poll\"." },
  { w: "fsck", ipa: "/ˌɛf ɛs siː ˈkeɪ/", r: "eff ess see kay", aIpa: "/fsʌk/", aR: "fsuck", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "Filesystem check; spelled out, or the infamous \"F-suck\" joke." },
  { w: "gcc", ipa: "/ˌdʒiː siː ˈsiː/", r: "jee see see", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "GNU Compiler Collection; letter-by-letter." },
  { w: "gdb", ipa: "/ˌdʒiː diː ˈbiː/", r: "jee dee bee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "GNU Debugger; letters." },
  { w: "gem", ipa: "/dʒɛm/", r: "jem", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cli-tool", conf: "community-consensus", notes: "RubyGems CLI; like \"gem\" (jewel)." },
  { w: "golang", ipa: "/ˈɡoʊlæŋ/", r: "go lang", aIpa: "", aR: "", url: "https://go.dev/", srcLabel: "Go project", cat: "project", conf: "community-consensus", notes: "The Go language; \"go-lang\". Officially just \"Go\"." },
  { w: "grub", ipa: "/ɡrʌb/", r: "grub", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "GRUB bootloader; like the food." },
  { w: "initrd", ipa: "/ɪˈnɪt ɑːr diː/", r: "in it ar dee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "initial RAM disk; \"init-R-D\"." },
  { w: "kernel", ipa: "/ˈkɜːrnəl/", r: "kur nul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Homophone of \"colonel\"." },
  { w: "kibana", ipa: "/kɪˈbɑːnə/", r: "kih bah nuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Elastic dashboard; \"kih-BAH-nuh\"." },
  { w: "kubeadm", ipa: "/ˌkuːb ˈædmɪn/", r: "koob admin", aIpa: "/ˌkuːb eɪ diː ɛ ˈɛm/", aR: "koob ay dee ee em", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "K8s bootstrap tool; \"kube-admin\" or \"kube-A-D-M\"." },
  { w: "llvm", ipa: "/ˌɛl ɛl viː ˈɛm/", r: "ell ell vee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Compiler infrastructure; letters. No longer an acronym officially." },
  { w: "malloc", ipa: "/ˈmælɒk/", r: "mal ock", aIpa: "/ˈɛm əˌlɒk/", aR: "em alock", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Memory allocate; \"MAL-ock\" common." },
  { w: "mariadb", ipa: "/məˈriːə diː biː/", r: "muh ree uh dee bee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "MySQL fork; \"Maria-D-B\", named after Maria Widenius." },
  { w: "matplotlib", ipa: "/ˈmæt plɒt lɪb/", r: "mat plot lib", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Python plotting library; \"mat-plot-lib\"." },
  { w: "mmap", ipa: "/ˈɛm mæp/", r: "em map", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Memory map syscall; \"em-map\"." },
  { w: "niche", ipa: "/niːʃ/", r: "neesh", aIpa: "/nɪtʃ/", aR: "nitch", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "\"neesh\" and \"nitch\" both accepted." },
  { w: "nuget", ipa: "/ˈnuː ɡɛt/", r: "new get", aIpa: "/ˈnʌɡɪt/", aR: "nugget", url: "https://learn.microsoft.com/nuget/", srcLabel: "Microsoft", cat: "tool", conf: "contested", notes: ".NET package manager; Microsoft says \"New Get\", but \"nugget\" is widespread." },
  { w: "protobuf", ipa: "/ˈproʊtoʊ bʌf/", r: "pro toe buff", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Protocol Buffers; \"proto-buff\"." },
  { w: "psql", ipa: "/ˌpiː ɛs kjuː ˈɛl/", r: "pee ess cue ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cli-tool", conf: "community-consensus", notes: "Postgres CLI; usually letters \"P-S-Q-L\"." },
  { w: "pypi", ipa: "/ˈpaɪ piː ˈaɪ/", r: "pie pee eye", aIpa: "", aR: "", url: "https://pypi.org/", srcLabel: "PyPI", cat: "product", conf: "community-consensus", notes: "Python Package Index; \"Pie-P-I\", not \"pie-pie\" (avoids clash with PyPy)." },
  { w: "queue", ipa: "/kjuː/", r: "cue", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Pronounced just \"Q\"; the \"ueue\" is silent." },
  { w: "rake", ipa: "/reɪk/", r: "rake", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cli-tool", conf: "community-consensus", notes: "Ruby build tool; like a garden rake." },
  { w: "regexp", ipa: "/ˈrɛɡ ɛksp/", r: "reg exp", aIpa: "/ˌrɛɡ ɛks ˈpiː/", aR: "reg eks pee", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Regular expression; \"reg-exp\" or \"reg-E-X-P\"." },
  { w: "sbt", ipa: "/ˌɛs biː ˈtiː/", r: "ess bee tee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Scala Build Tool; letters." },
  { w: "schema", ipa: "/ˈskiːmə/", r: "skee muh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"SKEE-muh\"; plural \"schemas\" or \"schemata\"." },
  { w: "scp", ipa: "/ˌɛs siː ˈpiː/", r: "ess see pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cli-tool", conf: "community-consensus", notes: "Secure copy; letters." },
  { w: "sed", ipa: "/sɛd/", r: "sed", aIpa: "/ˌɛs iː ˈdiː/", aR: "ess ee dee", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "Stream editor; \"sed\" (said) common, also \"S-E-D\"." },
  { w: "segue", ipa: "/ˈsɛɡweɪ/", r: "seg way", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Like \"Segway\"; common in iOS storyboard work." },
  { w: "struct", ipa: "/strʌkt/", r: "struckt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Structure; rhymes with \"duct\"." },
  { w: "tuple", ipa: "/ˈtuːpəl/", r: "too pul", aIpa: "/ˈtʌpəl/", aR: "tup ul", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "\"TOO-pul\" and \"TUH-pul\" both common; UK often \"TYOO-pul\"." },
  { w: "vim", ipa: "/vɪm/", r: "vim", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "The editor; \"vim\" like \"vim and vigor\", not \"V-I-M\"." },
  { w: "zookeeper", ipa: "/ˈzuː kiːpər/", r: "zoo kee per", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Apache coordination service; \"zoo-keeper\"." },
  { w: "alsa", ipa: "/ˈælsə/", r: "al suh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Advanced Linux Sound Architecture; \"AL-suh\"." },
  { w: "asciidoc", ipa: "/ˈæski dɒk/", r: "ask ee dock", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "\"ASK-ee-dock\"." },
  { w: "cosign", ipa: "/ˈkoʊ saɪn/", r: "co sine", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Sigstore signing tool; \"co-sign\"." },
  { w: "dovecot", ipa: "/ˈdʌvkɒt/", r: "duv cot", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "IMAP/POP3 server; \"DUV-cot\" (dove + cote)." },
  { w: "exim", ipa: "/ˈɛksɪm/", r: "eks im", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Mail transfer agent; \"EKS-im\"." },
  { w: "firecracker", ipa: "/ˈfaɪərˌkrækər/", r: "fire cracker", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS microVM monitor; like the firework." },
  { w: "fulcio", ipa: "/ˈfʊlsi oʊ/", r: "fool see oh", aIpa: "/ˈfʊlki oʊ/", aR: "fool kee oh", url: "", srcLabel: "", cat: "tool", conf: "contested", notes: "Sigstore CA; \"FULL-see-oh\" common, some \"FULL-kee-oh\"." },
  { w: "gentoo", ipa: "/ˈdʒɛntuː/", r: "jen too", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Linux distro; \"JEN-too\", after the penguin." },
  { w: "gnome", ipa: "/ɡəˈnoʊm/", r: "guh nome", aIpa: "/noʊm/", aR: "nome", url: "", srcLabel: "", cat: "product", conf: "contested", notes: "Desktop environment; officially \"guh-NOME\" (hard G), many say \"nome\"." },
  { w: "graylog", ipa: "/ˈɡreɪ lɒɡ/", r: "gray log", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Log management; \"gray-log\"." },
  { w: "guix", ipa: "/ɡiːks/", r: "geeks", aIpa: "", aR: "", url: "https://guix.gnu.org/", srcLabel: "GNU Guix", cat: "product", conf: "creator-clarified", notes: "GNU package manager; pronounced \"geeks\"." },
  { w: "gvisor", ipa: "/ˈdʒiː vaɪzər/", r: "jee visor", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Google container sandbox; \"G-visor\"." },
  { w: "hyprland", ipa: "/ˈhaɪpər lænd/", r: "hyper land", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Wayland compositor; \"hyper-land\"." },
  { w: "kakoune", ipa: "/kæˈkuːn/", r: "kah koon", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Modal code editor; \"kah-KOON\"." },
  { w: "kaniko", ipa: "/kəˈniːkoʊ/", r: "kah nee ko", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "In-cluster image builder; \"kah-NEE-ko\"." },
  { w: "kde", ipa: "/ˌkeɪ diː ˈiː/", r: "kay dee ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Desktop environment; letters \"K-D-E\"." },
  { w: "keepalived", ipa: "/ˌkiːp əˈlaɪvd/", r: "keep a lived", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "VRRP/load-balance daemon; \"keep-alive-d\"." },
  { w: "keydb", ipa: "/ˈkiː diː biː/", r: "key dee bee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Multithreaded Redis fork; \"Key-D-B\"." },
  { w: "mastodon", ipa: "/ˈmæstədɒn/", r: "mass tuh don", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Federated social network; like the extinct animal." },
  { w: "matrix", ipa: "/ˈmeɪtrɪks/", r: "may tricks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Decentralized chat protocol; like the movie." },
  { w: "mesa", ipa: "/ˈmeɪsə/", r: "may suh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "OpenGL/Vulkan implementation; \"MAY-suh\" (Spanish for table)." },
  { w: "mesos", ipa: "/ˈmiːsoʊs/", r: "mee sose", aIpa: "/ˈmɛsoʊs/", aR: "mess ose", url: "", srcLabel: "", cat: "product", conf: "contested", notes: "Apache cluster manager; \"MEE-sose\" vs \"MEH-sose\"." },
  { w: "mimir", ipa: "/ˈmiːmɪr/", r: "mee meer", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Grafana metrics store; \"MEE-meer\", from Norse mythology." },
  { w: "mkdocs", ipa: "/ˌɛm keɪ ˈdɒks/", r: "em kay docks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Static docs generator; \"M-K-docs\"." },
  { w: "ngrok", ipa: "/ˈɛn ɡrɒk/", r: "en grok", aIpa: "/ˈɛn rɒk/", aR: "en rock", url: "", srcLabel: "", cat: "tool", conf: "contested", notes: "Tunneling tool; \"en-grok\" or \"en-rock\"." },
  { w: "nixos", ipa: "/ˈnɪks oʊ ɛs/", r: "niks oh ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Declarative Linux distro; \"Nix-O-S\"." },
  { w: "openshift", ipa: "/ˈoʊpən ʃɪft/", r: "open shift", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Red Hat Kubernetes platform; \"open-shift\"." },
  { w: "opensuse", ipa: "/ˌoʊpən ˈsuːzə/", r: "open soo zuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Linux distro; \"open-SOO-zuh\"." },
  { w: "opentofu", ipa: "/ˈoʊpən toʊfuː/", r: "open tofu", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Terraform fork; \"open-tofu\"." },
  { w: "pandoc", ipa: "/ˈpæn dɒk/", r: "pan dock", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Universal document converter; \"PAN-dock\"." },
  { w: "pipewire", ipa: "/ˈpaɪp waɪər/", r: "pipe wire", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Linux audio/video server; \"pipe-wire\"." },
  { w: "postfix", ipa: "/ˈpoʊst fɪks/", r: "post fix", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Mail transfer agent; \"post-fix\"." },
  { w: "pulseaudio", ipa: "/ˈpʌls ˌɔːdi oʊ/", r: "pulse audio", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Linux sound server; \"pulse-audio\"." },
  { w: "pyroscope", ipa: "/ˈpaɪroʊ skoʊp/", r: "pie ro scope", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Continuous profiling; \"PIE-ro-scope\"." },
  { w: "qt", ipa: "/kjuːt/", r: "cute", aIpa: "/ˌkjuː ˈtiː/", aR: "cue tee", url: "https://www.qt.io/", srcLabel: "Qt Company", cat: "tool", conf: "creator-clarified", notes: "GUI framework; officially \"cute\", though many say \"Q-T\"." },
  { w: "quarto", ipa: "/ˈkwɑːrtoʊ/", r: "kwar toe", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Scientific publishing system; \"KWAR-toe\"." },
  { w: "quay", ipa: "/kiː/", r: "key", aIpa: "", aR: "", url: "https://quay.io/", srcLabel: "Red Hat Quay", cat: "product", conf: "creator-clarified", notes: "Container registry; pronounced \"key\" (like the dock)." },
  { w: "rancher", ipa: "/ˈræntʃər/", r: "ran cher", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Kubernetes management platform; like a cattle \"rancher\"." },
  { w: "rekor", ipa: "/ˈriːkɔːr/", r: "ree core", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Sigstore transparency log; \"REE-core\" (record)." },
  { w: "scylla", ipa: "/ˈsɪlə/", r: "sill uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Cassandra-compatible database; \"SIL-uh\", from Greek myth." },
  { w: "sequel", ipa: "/ˈsiːkwəl/", r: "see kwul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Common spoken reading of \"SQL\"; \"SEE-kwul\" vs spelled \"S-Q-L\"." },
  { w: "sigstore", ipa: "/ˈsɪɡ stɔːr/", r: "sig store", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Software signing project; \"sig-store\"." },
  { w: "slsa", ipa: "/ˈsælsə/", r: "salsa", aIpa: "", aR: "", url: "https://slsa.dev/", srcLabel: "SLSA", cat: "abbreviation", conf: "creator-clarified", notes: "Supply-chain security framework; pronounced \"salsa\"." },
  { w: "sphinx", ipa: "/sfɪŋks/", r: "sfinks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Documentation generator; like the Egyptian sphinx." },
  { w: "squid", ipa: "/skwɪd/", r: "skwid", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Caching proxy; like the sea animal." },
  { w: "suse", ipa: "/ˈsuːzə/", r: "soo zuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Linux vendor; \"SOO-zuh\"." },
  { w: "sway", ipa: "/sweɪ/", r: "sway", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "i3-compatible Wayland window manager; \"sway\"." },
  { w: "synapse", ipa: "/ˈsɪnæps/", r: "sin aps", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Matrix homeserver; like the neural \"synapse\"." },
  { w: "talos", ipa: "/ˈteɪlɒs/", r: "tay loss", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Talos Linux; \"TAY-loss\", the bronze giant of Greek myth." },
  { w: "thanos", ipa: "/ˈθænɒs/", r: "than oss", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Prometheus long-term storage; \"THAN-oss\", like the Marvel villain." },
  { w: "varnish", ipa: "/ˈvɑːrnɪʃ/", r: "var nish", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "HTTP caching reverse proxy; like wood \"varnish\"." },
  { w: "victoriametrics", ipa: "/vɪkˈtɔːriə ˈmɛtrɪks/", r: "victoria metrics", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Time-series database; \"Victoria-metrics\"." },
  { w: "vulkan", ipa: "/ˈvʌlkən/", r: "vul kun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Graphics API; \"VUL-kun\" (like Star Trek Vulcan)." },
  { w: "wayland", ipa: "/ˈweɪlænd/", r: "way land", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Display server protocol; \"WAY-land\"." },
  { w: "xfce", ipa: "/ˌɛks ɛf siː ˈiː/", r: "eks eff see ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Lightweight desktop environment; letters \"X-F-C-E\"." },
  { w: "zipkin", ipa: "/ˈzɪpkɪn/", r: "zip kin", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Distributed tracing system; \"ZIP-kin\"." },
  { w: "zola", ipa: "/ˈzoʊlə/", r: "zoh luh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Rust static site generator; \"ZOH-luh\"." },
  { w: "bulma", ipa: "/ˈbʊlmə/", r: "bull muh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "CSS framework; \"BULL-muh\", named after the Dragon Ball character." },
  { w: "celery", ipa: "/ˈsɛləri/", r: "sell er ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Python distributed task queue; like the vegetable." },
  { w: "directus", ipa: "/dɪˈrɛktəs/", r: "dih rek tus", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Headless CMS; \"dih-REK-tus\"." },
  { w: "knex", ipa: "/kəˈnɛks/", r: "kuh nex", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "SQL query builder; \"kuh-NEX\", like the toy K'NEX." },
  { w: "kysely", ipa: "/ˈkiːsəli/", r: "kee suh lee", aIpa: "/kaɪˈsɛli/", aR: "kai sell ee", url: "", srcLabel: "", cat: "tool", conf: "contested", notes: "TypeScript query builder; Finnish for \"query\". Readings vary." },
  { w: "mongoose", ipa: "/ˈmɒŋɡuːs/", r: "mong goose", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "MongoDB ODM; like the animal." },
  { w: "payloadcms", ipa: "/ˈpeɪloʊd ɛs ɛm ɛs/", r: "pay load ess em ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Headless CMS; \"Payload-C-M-S\"." },
  { w: "sequelize", ipa: "/ˈsiːkwəlaɪz/", r: "see kwul ize", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Node.js ORM; \"sequel-ize\"." },
  { w: "strapi", ipa: "/ˈstrɑːpi/", r: "strah pee", aIpa: "/ˈstræpi/", aR: "strap ee", url: "", srcLabel: "", cat: "product", conf: "contested", notes: "Headless CMS; \"STRAH-pee\" vs \"STRAP-ee\"." },
  { w: "sveltekit", ipa: "/ˈsvɛlt kɪt/", r: "svelt kit", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Svelte (\"svelt\") app framework + kit." },
  { w: "zapier", ipa: "/ˈzæpiər/", r: "zap ee er", aIpa: "", aR: "", url: "https://zapier.com/", srcLabel: "Zapier", cat: "product", conf: "creator-clarified", notes: "Automation platform; rhymes with \"happier\", not \"zay-pier\"." },
  { w: "torvalds", ipa: "/ˈtɔːrvɔːldz/", r: "tor valdz", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Linus Torvalds (Linux, Git). First name is \"LEE-nus\", not \"LYE-nus\"." },
  { w: "guido", ipa: "/ˈɣiːdoʊ/", r: "ghee doh", aIpa: "/ˈɡwiːdoʊ/", aR: "gwee doh", url: "", srcLabel: "", cat: "person", conf: "contested", notes: "Guido van Rossum (Python). Dutch \"GHEE-doh\"; often anglicized \"GWEE-doh\"." },
  { w: "stroustrup", ipa: "/ˈstroʊstrʊp/", r: "strow strup", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Bjarne (\"bee-YAR-neh\") Stroustrup, creator of C++." },
  { w: "matsumoto", ipa: "/ˌmætsuˈmoʊtoʊ/", r: "mat soo mo toe", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Yukihiro Matsumoto (Ruby), aka \"Matz\"." },
  { w: "matz", ipa: "/mæts/", r: "mats", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Yukihiro Matsumoto's handle; creator of Ruby." },
  { w: "hejlsberg", ipa: "/ˈhaɪlzbɜːrɡ/", r: "hilez berg", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Anders Hejlsberg (Turbo Pascal, C#, TypeScript). Danish." },
  { w: "hickey", ipa: "/ˈhɪki/", r: "hick ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Rich Hickey, creator of Clojure." },
  { w: "valim", ipa: "/vɐˈlĩ/", r: "vah leem", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "José (\"zhoo-ZEH\") Valim, creator of Elixir. Portuguese." },
  { w: "dahl", ipa: "/dɑːl/", r: "dahl", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Ryan Dahl, creator of Node.js and Deno." },
  { w: "hykes", ipa: "/haɪks/", r: "hikes", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Solomon Hykes, creator of Docker." },
  { w: "knuth", ipa: "/kəˈnuːθ/", r: "kuh nooth", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Donald Knuth (TAOCP, TeX); \"Ka-NOOTH\"." },
  { w: "kernighan", ipa: "/ˈkɜːrnɪhæn/", r: "kur nih han", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Brian Kernighan (C, Unix, \"K\" in K&R and AWK)." },
  { w: "ritchie", ipa: "/ˈrɪtʃi/", r: "rich ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Dennis Ritchie, creator of C and co-creator of Unix." },
  { w: "liskov", ipa: "/ˈlɪskɒv/", r: "liss kov", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Barbara Liskov (Liskov Substitution Principle)." },
  { w: "cerf", ipa: "/sɜːrf/", r: "surf", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Vint Cerf, co-designer of TCP/IP; \"surf\"." },
  { w: "lecun", ipa: "/ləˈkʌn/", r: "luh cun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Yann (\"yahn\") LeCun, deep-learning pioneer. French." },
  { w: "bengio", ipa: "/bɛnˈʒioʊ/", r: "ben zhee oh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Yoshua Bengio, deep-learning pioneer. French-Canadian." },
  { w: "sutskever", ipa: "/ˈsʌtskɪvər/", r: "suts kih ver", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Ilya (\"ill-YAH\") Sutskever, OpenAI co-founder." },
  { w: "hassabis", ipa: "/həˈsæbɪs/", r: "huh sab iss", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Demis Hassabis, co-founder of DeepMind." },
  { w: "hinton", ipa: "/ˈhɪntən/", r: "hin tun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Geoffrey Hinton, \"godfather of deep learning\"." },
  { w: "buterin", ipa: "/ˈbjuːtərɪn/", r: "byoo ter in", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Vitalik (\"VEE-tah-leek\") Buterin, co-founder of Ethereum." },
  { w: "vogels", ipa: "/ˈvoʊɡəlz/", r: "voh gels", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Werner Vogels, Amazon CTO. Dutch." },
  { w: "raadt", ipa: "/də ˈrɑːt/", r: "duh raht", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Theo de Raadt, founder of OpenBSD and OpenSSH." },
  { w: "poettering", ipa: "/ˈpœtərɪŋ/", r: "pet er ing", aIpa: "/ˈpoʊətərɪŋ/", aR: "poh eh ter ing", url: "", srcLabel: "", cat: "person", conf: "contested", notes: "Lennart Poettering (systemd, PulseAudio). German." },
  { w: "bellard", ipa: "/bɛˈlɑːr/", r: "bell ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Fabrice (\"fah-BREES\") Bellard (FFmpeg, QEMU, QuickJS). French." },
  { w: "heinemeier", ipa: "/ˈhaɪnəmaɪər/", r: "hine my er", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "David Heinemeier Hansson (DHH), creator of Ruby on Rails." },
  { w: "otwell", ipa: "/ˈɒtwɛl/", r: "ot well", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Taylor Otwell, creator of Laravel." },
  { w: "tiangolo", ipa: "/tjɑːnˈɡoʊloʊ/", r: "tyahn go lo", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Sebastián Ramírez (handle \"tiangolo\"), creator of FastAPI." },
  { w: "lerdorf", ipa: "/ˈlɜːrdɔːrf/", r: "lur dorf", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Rasmus Lerdorf, creator of PHP." },
  { w: "nakamoto", ipa: "/ˌnɑːkəˈmoʊtoʊ/", r: "nah kah mo toe", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Satoshi Nakamoto, pseudonymous creator of Bitcoin." },
  { w: "alpaca", ipa: "/ælˈpækə/", r: "al pack uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Stanford instruction-tuned LLaMA; like the animal." },
  { w: "altair", ipa: "/ælˈtɛər/", r: "al tair", aIpa: "/ælˈtaɪər/", aR: "al tire", url: "", srcLabel: "", cat: "tool", conf: "contested", notes: "Python declarative viz library; \"al-TAIR\" or \"al-TYRE\", from the star." },
  { w: "automatic1111", ipa: "/ˌɔːtəˈmætɪk ɪˈlɛvən ɪˈlɛvən/", r: "automatic eleven eleven", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Stable Diffusion WebUI; \"automatic-eleven-eleven\"." },
  { w: "bark", ipa: "/bɑːrk/", r: "bark", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Suno text-to-audio model; like a dog bark." },
  { w: "bentoml", ipa: "/ˈbɛntoʊ ɛm ɛl/", r: "bento em ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Model serving framework; \"Bento-M-L\"." },
  { w: "bokeh", ipa: "/ˈboʊkeɪ/", r: "boh kay", aIpa: "/ˈboʊkə/", aR: "boh kuh", url: "", srcLabel: "", cat: "tool", conf: "contested", notes: "Python interactive viz library; from the photography term (Japanese)." },
  { w: "catboost", ipa: "/ˈkæt buːst/", r: "cat boost", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Gradient boosting library; \"cat-boost\" (categorical boosting)." },
  { w: "colab", ipa: "/ˈkoʊlæb/", r: "co lab", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Google Colaboratory notebooks; \"co-lab\"." },
  { w: "coreml", ipa: "/ˈkɔːr ɛm ɛl/", r: "core em ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Apple on-device ML framework; \"Core-M-L\"." },
  { w: "deberta", ipa: "/diːˈbɜːrtə/", r: "dee bur tuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Decoding-enhanced BERT; \"dee-BER-tuh\"." },
  { w: "diffusers", ipa: "/dɪˈfjuːzərz/", r: "dih fyoo zers", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Hugging Face diffusion-models library." },
  { w: "einops", ipa: "/ˈaɪnɒps/", r: "eyen ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Tensor-rearrangement library; \"EIN-ops\" (Einstein ops)." },
  { w: "flax", ipa: "/flæks/", r: "flaks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "JAX neural-network library; like the plant \"flax\"." },
  { w: "flowise", ipa: "/ˈfloʊwaɪz/", r: "flo wize", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Visual LLM-flow builder; \"flow-wise\"." },
  { w: "fooocus", ipa: "/ˈfoʊkəs/", r: "focus", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Image-generation UI; pronounced \"focus\" (spelled with three o's)." },
  { w: "gensim", ipa: "/ˈdʒɛnsɪm/", r: "jen sim", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Topic-modeling library; \"JEN-sim\"." },
  { w: "ggml", ipa: "/ˌdʒiː dʒiː ɛm ˈɛl/", r: "jee jee em ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Tensor library behind llama.cpp; letters \"G-G-M-L\"." },
  { w: "gguf", ipa: "/ˌdʒiː dʒiː juː ˈɛf/", r: "jee jee you eff", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Quantized-model file format; letters \"G-G-U-F\"." },
  { w: "invokeai", ipa: "/ɪnˈvoʊk eɪ aɪ/", r: "in voke ay eye", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Stable Diffusion creative toolkit; \"Invoke-A-I\"." },
  { w: "kaggle", ipa: "/ˈkæɡəl/", r: "kag ul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Data-science competition platform; \"KAG-ul\"." },
  { w: "kubeflow", ipa: "/ˈkuːb floʊ/", r: "koob flow", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "ML toolkit on Kubernetes; \"kube-flow\"." },
  { w: "lancedb", ipa: "/ˈlæns diː biː/", r: "lance dee bee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Embedded vector database; \"Lance-D-B\"." },
  { w: "langflow", ipa: "/ˈlæŋ floʊ/", r: "lang flow", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "LangChain visual builder; \"lang-flow\"." },
  { w: "langgraph", ipa: "/ˈlæŋ ɡræf/", r: "lang graf", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "LangChain stateful agent framework; \"lang-graph\"." },
  { w: "lightgbm", ipa: "/ˈlaɪt dʒiː biː ɛm/", r: "light jee bee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Microsoft gradient boosting; \"Light-G-B-M\"." },
  { w: "llamafile", ipa: "/ˈlɑːmə faɪl/", r: "lah muh file", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Single-file LLM executable; \"llama-file\"." },
  { w: "mamba", ipa: "/ˈmæmbə/", r: "mam buh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "State-space sequence model; like the snake." },
  { w: "mlx", ipa: "/ˌɛm ɛl ˈɛks/", r: "em ell eks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Apple Silicon array/ML framework; letters \"M-L-X\"." },
  { w: "nltk", ipa: "/ˌɛn ɛl tiː ˈkeɪ/", r: "en ell tee kay", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Natural Language Toolkit; letters." },
  { w: "olmo", ipa: "/ˈoʊlmoʊ/", r: "ol mo", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AllenAI fully-open LLM; \"OL-mo\"." },
  { w: "openvino", ipa: "/ˌoʊpən ˈviːnoʊ/", r: "open vee no", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Intel inference toolkit; \"open-VEE-no\"." },
  { w: "pgvector", ipa: "/ˌpiː dʒiː ˈvɛktər/", r: "pee jee vector", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Postgres vector-search extension; \"P-G-vector\"." },
  { w: "piper", ipa: "/ˈpaɪpər/", r: "pipe er", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Fast local neural TTS; \"PIPE-er\"." },
  { w: "plotly", ipa: "/ˈplɒtli/", r: "plot lee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Interactive plotting library; \"PLOT-lee\"." },
  { w: "pythia", ipa: "/ˈpɪθiə/", r: "pith ee uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "EleutherAI model suite; \"PITH-ee-uh\", the Oracle of Delphi." },
  { w: "roberta", ipa: "/roʊˈbɜːrtə/", r: "ro bur tuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Robustly-optimized BERT; \"ro-BER-tuh\"." },
  { w: "rwkv", ipa: "/ˌɑːr dʌbəljuː keɪ ˈviː/", r: "ar double you kay vee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "RNN-with-transformer-strength model; usually letters, some say \"RWa-Kuv\"." },
  { w: "safetensors", ipa: "/ˈseɪf tɛnsərz/", r: "safe tensors", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Safe model-weight serialization format; \"safe-tensors\"." },
  { w: "scikit", ipa: "/ˈsaɪ kɪt/", r: "sigh kit", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "As in scikit-learn; \"sci-kit\" (SciPy toolkit)." },
  { w: "seaborn", ipa: "/ˈsiːbɔːrn/", r: "see born", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Statistical viz library on matplotlib; \"SEE-born\"." },
  { w: "sklearn", ipa: "/ˌɛs keɪ ˈlɜːrn/", r: "ess kay learn", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "scikit-learn import alias; \"S-K-learn\"." },
  { w: "spacy", ipa: "/ˈspeɪsi/", r: "spay see", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Industrial NLP library; \"spay-see\" (spaCy)." },
  { w: "tokenizers", ipa: "/ˈtoʊkənaɪzərz/", r: "toke en eye zers", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Hugging Face fast-tokenizers library." },
  { w: "vespa", ipa: "/ˈvɛspə/", r: "vess puh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Search + vector engine; \"VESS-puh\", like the scooter." },
  { w: "vits", ipa: "/vɪts/", r: "vits", aIpa: "/ˌviː aɪ tiː ˈɛs/", aR: "vee eye tee ess", url: "", srcLabel: "", cat: "product", conf: "contested", notes: "End-to-end TTS model; \"vits\" or spelled out." },
  { w: "wandb", ipa: "/ˌdʌbəljuː ænd ˈbiː/", r: "double you and bee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Weights & Biases; \"W-and-B\" or \"wand-B\"." },
  { w: "xgboost", ipa: "/ˌɛks dʒiː ˈbuːst/", r: "eks jee boost", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Scalable gradient boosting; \"X-G-boost\"." },
  { w: "abbeel", ipa: "/ˈɑːbiːl/", r: "ah beel", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Pieter Abbeel, robotics/RL researcher (Berkeley, Covariant)." },
  { w: "altman", ipa: "/ˈɔːltmən/", r: "alt mun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Sam Altman, CEO of OpenAI; \"ALT-mun\"." },
  { w: "amodei", ipa: "/ˌɑːmoʊˈdeɪ/", r: "ah mo day", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Dario Amodei, CEO of Anthropic; \"ah-mo-DAY\". Italian." },
  { w: "bahdanau", ipa: "/ˌbɑːdɑːˈnaʊ/", r: "bah dah now", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Dzmitry Bahdanau, co-author of neural attention." },
  { w: "brockman", ipa: "/ˈbrɒkmən/", r: "brock mun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Greg Brockman, co-founder & president of OpenAI." },
  { w: "chollet", ipa: "/ʃɔːˈleɪ/", r: "show lay", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "François Chollet, creator of Keras; \"show-LAY\". French." },
  { w: "devlin", ipa: "/ˈdɛvlɪn/", r: "dev lin", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Jacob Devlin, lead author of BERT." },
  { w: "goodfellow", ipa: "/ˈɡʊdfɛloʊ/", r: "good fellow", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Ian Goodfellow, inventor of GANs." },
  { w: "hochreiter", ipa: "/ˈhɔːxraɪtər/", r: "hoke ry ter", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Sepp Hochreiter, co-inventor of LSTM. German." },
  { w: "howard", ipa: "/ˈhaʊərd/", r: "how erd", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Jeremy Howard, co-founder of fast.ai." },
  { w: "huang", ipa: "/hwɑːŋ/", r: "hwang", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Jensen Huang, co-founder & CEO of NVIDIA; \"hwang\"." },
  { w: "kingma", ipa: "/ˈkɪŋmə/", r: "king muh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Diederik Kingma, co-author of Adam and the VAE." },
  { w: "krizhevsky", ipa: "/krɪˈʒɛfski/", r: "krih zhef skee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Alex Krizhevsky, lead author of AlexNet." },
  { w: "mikolov", ipa: "/ˈmiːkəlɒf/", r: "mee koh lof", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Tomáš Mikolov, creator of word2vec. Czech." },
  { w: "mnih", ipa: "/məˈniː/", r: "muh nee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Volodymyr Mnih, lead author of the DQN / Atari paper." },
  { w: "ng", ipa: "/ɪŋ/", r: "ing", aIpa: "/ˌɛn ˈdʒiː/", aR: "en jee", url: "", srcLabel: "", cat: "person", conf: "contested", notes: "Andrew Ng (Coursera, deeplearning.ai); roughly \"ng/ing\", often spelled \"N-G\"." },
  { w: "polosukhin", ipa: "/ˌpɒloʊˈsuːkɪn/", r: "po lo soo kin", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Illia Polosukhin, co-author of \"Attention Is All You Need\"." },
  { w: "raffel", ipa: "/ˈræfəl/", r: "raf ul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Colin Raffel, lead author of T5." },
  { w: "ramesh", ipa: "/ˈrɑːmɛʃ/", r: "rah mesh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Aditya Ramesh, creator of DALL·E." },
  { w: "rombach", ipa: "/ˈrɒmbɑːx/", r: "rom bahk", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Robin Rombach, lead author of Stable Diffusion / latent diffusion. German." },
  { w: "schmidhuber", ipa: "/ˈʃmɪthuːbər/", r: "shmit hoo ber", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Jürgen Schmidhuber, co-inventor of LSTM. German." },
  { w: "shazeer", ipa: "/ʃəˈzɪər/", r: "shuh zeer", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Noam (\"NOH-um\") Shazeer, Transformer co-author, founder of Character.AI." },
  { w: "szegedy", ipa: "/ˈsɛɡɛdi/", r: "seg eh dee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Christian Szegedy (Inception, adversarial examples). Hungarian." },
  { w: "uszkoreit", ipa: "/ˈuːʃkɔːraɪt/", r: "oosh kor ite", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Jakob Uszkoreit, co-author of the Transformer. German." },
  { w: "vaswani", ipa: "/vəˈswɑːni/", r: "vuh swah nee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Ashish Vaswani, lead author of \"Attention Is All You Need\"." },
  { w: "vinyals", ipa: "/viˈɲals/", r: "vin yals", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Oriol (\"oh-ree-OL\") Vinyals, DeepMind (Seq2Seq, AlphaStar). Catalan." },
  { w: "wojciech", ipa: "/ˈvɔɪtɛx/", r: "voy tekh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Polish first name (e.g. Wojciech Zaremba, OpenAI); \"VOY-tekh\"." },
  { w: "zaremba", ipa: "/zəˈrɛmbə/", r: "zuh rem buh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "person", conf: "community-consensus", notes: "Wojciech Zaremba, co-founder of OpenAI. Polish." },
  { w: "glm", ipa: "/ˌdʒiː ɛl ˈɛm/", r: "jee ell em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Zhipu AI's General Language Model family; letters \"G-L-M\"." },
  { w: "zhipu", ipa: "/ˈdʒiː puː/", r: "jee poo", aIpa: "/ˈʒiː puː/", aR: "zhee poo", url: "", srcLabel: "", cat: "product", conf: "contested", notes: "Zhipu AI (智谱), maker of GLM/ChatGLM; pinyin \"Zhì-pǔ\", roughly \"jee-poo\"." },
  { w: "ernie", ipa: "/ˈɜːrni/", r: "er nee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Baidu's ERNIE LLM; \"ER-nee\", a play on BERT (Bert & Ernie)." },
  { w: "internlm", ipa: "/ˌɪntɜːrn ɛl ˈɛm/", r: "intern ell em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Shanghai AI Lab's open LLM; \"intern-L-M\"." },
  { w: "moonshot", ipa: "/ˈmuːnʃɒt/", r: "moon shot", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Moonshot AI (月之暗面), maker of Kimi; \"moon-shot\"." },
  { w: "openhands", ipa: "/ˈoʊpən hændz/", r: "open hands", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open-source coding agent (formerly OpenDevin); \"open-hands\"." },
  { w: "opendevin", ipa: "/ˈoʊpən ˌdɛvɪn/", r: "open dev in", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Former name of OpenHands; \"open-DEV-in\"." },
  { w: "goose", ipa: "/ɡuːs/", r: "goose", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Block's open-source AI agent; like the bird." },
  { w: "serde", ipa: "/sɜːrˈdiː/", r: "sir dee", aIpa: "/ˈsɜːrdi/", aR: "ser dee", url: "", srcLabel: "", cat: "tool", conf: "contested", notes: "Rust serialization framework; \"sir-DEE\" (serialize/deserialize), some say \"SER-dee\"." },
  { w: "yew", ipa: "/juː/", r: "you", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Rust/WASM front-end framework; \"you\", like the yew tree." },
  { w: "clap", ipa: "/klæp/", r: "clap", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Rust Command Line Argument Parser; \"clap\", like applause." },
  { w: "rayon", ipa: "/ˈreɪɒn/", r: "ray on", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Rust data-parallelism library; \"RAY-on\", like the fabric." },
  { w: "wasmer", ipa: "/ˈwɑːzmər/", r: "wahz mer", aIpa: "/ˈwæzmər/", aR: "waz mer", url: "", srcLabel: "", cat: "product", conf: "contested", notes: "WebAssembly runtime; \"WAHZ-mer\" (wasm + -er)." },
  { w: "elysia", ipa: "/ɛˈlɪziə/", r: "eh lih zee uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Bun web framework; \"eh-LIH-zee-uh\"." },
  { w: "effect", ipa: "/ɪˈfɛkt/", r: "ih fekt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Effect-TS library; just \"effect\"." },
  { w: "nitro", ipa: "/ˈnaɪtroʊ/", r: "ny tro", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "UnJS server engine (powers Nuxt); \"NY-tro\"." },
  { w: "valibot", ipa: "/ˈvælɪbɒt/", r: "val ih bot", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Schema validation library; \"VAL-ih-bot\"." },
  { w: "million", ipa: "/ˈmɪljən/", r: "mill yun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Million.js — React optimizing compiler; \"MIL-yun\"." },
  { w: "rolldown", ipa: "/ˈroʊldaʊn/", r: "roll down", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Rust-based bundler (Vite's future core); \"roll-down\"." },
  { w: "convex", ipa: "/ˈkɒnvɛks/", r: "kon veks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Reactive backend platform; \"KON-veks\"." },
  { w: "xata", ipa: "/ˈzɑːtə/", r: "zah tah", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Serverless database platform; \"ZAH-tah\"." },
  { w: "axiom", ipa: "/ˈæksiəm/", r: "ak see um", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Log/event analytics platform; \"AK-see-um\"." },
  { w: "quickwit", ipa: "/ˈkwɪkwɪt/", r: "quick wit", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Search engine for logs; \"quick-wit\"." },
  { w: "reflex", ipa: "/ˈriːflɛks/", r: "ree fleks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "tool", conf: "community-consensus", notes: "Python full-stack framework (formerly Pynecone); \"REE-fleks\"." },
  { w: "zstd", ipa: "/ˌziː ˈstændərd/", r: "zee standard", aIpa: "/ˌziː ɛs tiː ˈdiː/", aR: "zee ess tee dee", url: "", srcLabel: "", cat: "abbreviation", conf: "contested", notes: "Zstandard compression; \"Z-standard\" or spelled \"Z-S-T-D\"." },
  { w: "warp", ipa: "/wɔːrp/", r: "warp", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Rust-based terminal (and a Rust web framework); \"warp\"." },
  { w: "eta", ipa: "/ˈeɪtə/", r: "ay tuh", aIpa: "/ˈiːtə/", aR: "ee tuh", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter η (learning rate); US math \"AY-tuh\", also \"EE-tuh\"." },
  { w: "nu", ipa: "/njuː/", r: "new", aIpa: "/nuː/", aR: "noo", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Greek letter ν; \"new\"/\"noo\". Not to be confused with mu." },
  { w: "psi", ipa: "/saɪ/", r: "sigh", aIpa: "/psaɪ/", aR: "p sigh", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter ψ (wavefunction); US \"sigh\", some \"p-sigh\"." },
  { w: "xi", ipa: "/zaɪ/", r: "zye", aIpa: "/ksaɪ/", aR: "k sigh", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter ξ; readings vary wildly — \"zye\", \"k-sigh\", \"ksee\"." },
  { w: "rho", ipa: "/roʊ/", r: "roh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Greek letter ρ (correlation, density); \"roh\"." },
  { w: "tau", ipa: "/taʊ/", r: "tow", aIpa: "/tɔː/", aR: "taw", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter τ; \"tow\" (rhymes cow) vs \"taw\"." },
  { w: "zeta", ipa: "/ˈzeɪtə/", r: "zay tuh", aIpa: "/ˈziːtə/", aR: "zee tuh", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter ζ; US \"ZAY-tuh\", also \"ZEE-tuh\"." },
  { w: "omega", ipa: "/oʊˈmeɪɡə/", r: "oh may guh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Greek letter ω; \"oh-MAY-guh\"." },
  { w: "omicron", ipa: "/ˈɒmɪkrɒn/", r: "om ih kron", aIpa: "/ˈoʊmɪkrɒn/", aR: "oh mih kron", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter ο; \"OM-ih-kron\" vs \"OH-mih-kron\"." },
  { w: "upsilon", ipa: "/ˈʌpsɪlɒn/", r: "up sih lon", aIpa: "/juːpˈsaɪlən/", aR: "yoop sigh lun", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "Greek letter υ; \"UP-sih-lon\" vs \"yoop-SY-lun\"." },
  { w: "athena", ipa: "/əˈθiːnə/", r: "uh thee nuh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Athena (serverless query); \"uh-THEE-nuh\", the goddess." },
  { w: "aurora", ipa: "/ɔːˈrɔːrə/", r: "uh ror uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Aurora database; \"uh-ROR-uh\"." },
  { w: "bedrock", ipa: "/ˈbɛdrɒk/", r: "bed rock", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Bedrock (managed LLMs); \"bed-rock\"." },
  { w: "bigquery", ipa: "/ˈbɪɡ ˌkwɪri/", r: "big kweer ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Google BigQuery; \"big-QUERY\"." },
  { w: "cloudfront", ipa: "/ˈklaʊd frʌnt/", r: "cloud frunt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS CloudFront CDN; \"cloud-front\"." },
  { w: "cognito", ipa: "/kɒɡˈniːtoʊ/", r: "kog nee toh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Cognito (auth); \"kog-NEE-toh\" (from incognito)." },
  { w: "fargate", ipa: "/ˈfɑːrɡeɪt/", r: "far gate", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Fargate (serverless containers); \"FAR-gate\"." },
  { w: "kinesis", ipa: "/kɪˈniːsɪs/", r: "kih nee sis", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Kinesis (streaming); \"kih-NEE-sis\"." },
  { w: "redshift", ipa: "/ˈrɛdʃɪft/", r: "red shift", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS Redshift warehouse; \"red-shift\"." },
  { w: "sagemaker", ipa: "/ˈseɪdʒmeɪkər/", r: "sage maker", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "AWS SageMaker (ML); \"sage-maker\"." },
  { w: "sqs", ipa: "/ˌɛs kjuː ˈɛs/", r: "ess cue ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "AWS Simple Queue Service; letters \"S-Q-S\"." },
  { w: "sns", ipa: "/ˌɛs ɛn ˈɛs/", r: "ess en ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "AWS Simple Notification Service; letters \"S-N-S\"." },
  { w: "vpc", ipa: "/ˌviː piː ˈsiː/", r: "vee pee see", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Virtual Private Cloud; letters \"V-P-C\"." },
  { w: "pubsub", ipa: "/ˈpʌbsʌb/", r: "pub sub", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Google Pub/Sub messaging; \"pub-sub\"." },
  { w: "firebase", ipa: "/ˈfaɪərbeɪs/", r: "fire base", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Google Firebase platform; \"fire-base\"." },
  { w: "metamask", ipa: "/ˈmɛtəmɑːsk/", r: "met uh mask", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Ethereum wallet; \"META-mask\"." },
  { w: "avif", ipa: "/ˈeɪvɪf/", r: "ay vif", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "AV1 Image Format; \"AY-vif\"." },
  { w: "heic", ipa: "/ˌeɪtʃ iː aɪ ˈsiː/", r: "aitch ee eye see", aIpa: "/heɪk/", aR: "hake", url: "", srcLabel: "", cat: "abbreviation", conf: "contested", notes: "Apple High-Efficiency image; spelled \"H-E-I-C\", some say \"hake\"." },
  { w: "webp", ipa: "/ˌwɛb ˈpiː/", r: "web pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Google image format; \"web-P\"." },
  { w: "flac", ipa: "/flæk/", r: "flak", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Free Lossless Audio Codec; \"flak\"." },
  { w: "ogg", ipa: "/ɒɡ/", r: "og", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Ogg audio container; \"og\"." },
  { w: "mkv", ipa: "/ˌɛm keɪ ˈviː/", r: "em kay vee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Matroska video container; letters \"M-K-V\"." },
  { w: "svg", ipa: "/ˌɛs viː ˈdʒiː/", r: "ess vee jee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Scalable Vector Graphics; letters \"S-V-G\"." },
  { w: "jpeg", ipa: "/ˈdʒeɪpɛɡ/", r: "jay peg", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Joint Photographic Experts Group; \"JAY-peg\"." },
  { w: "ico", ipa: "/ˈaɪkoʊ/", r: "eye koh", aIpa: "/ˌaɪ siː ˈoʊ/", aR: "eye see oh", url: "", srcLabel: "", cat: "abbreviation", conf: "contested", notes: "Windows icon format; \"EYE-koh\" or letters \"I-C-O\"." },
  { w: "woff", ipa: "/wɒf/", r: "woff", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Web Open Font Format; \"woff\"." },
  { w: "facade", ipa: "/fəˈsɑːd/", r: "fuh sahd", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Design pattern; \"fuh-SAHD\" (the ç/c is soft)." },
  { w: "paradigm", ipa: "/ˈpærədaɪm/", r: "pa ruh dime", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"PA-ruh-dime\"; the g is silent." },
  { w: "heuristic", ipa: "/hjʊˈrɪstɪk/", r: "hyoo riss tik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"hyoo-RISS-tik\"." },
  { w: "mnemonic", ipa: "/nɪˈmɒnɪk/", r: "nih mon ik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"nih-MON-ik\"; the m is silent." },
  { w: "ephemeral", ipa: "/ɪˈfɛmərəl/", r: "ih fem er ul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Short-lived (ephemeral storage/ports); \"ih-FEM-er-ul\"." },
  { w: "pseudo", ipa: "/ˈsuːdoʊ/", r: "soo doh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"SOO-doh\"; the p is silent. Not the same as `sudo`." },
  { w: "quasi", ipa: "/ˈkweɪzaɪ/", r: "kway zye", aIpa: "/ˈkwɑːzi/", aR: "kwah zee", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "\"KWAY-zye\" (US) vs \"KWAH-zee\"." },
  { w: "verbose", ipa: "/vɜːrˈboʊs/", r: "ver bohss", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "As in --verbose; \"ver-BOHSS\"." },
  { w: "pycharm", ipa: "/ˈpaɪtʃɑːrm/", r: "pie charm", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "JetBrains Python IDE; \"PIE-charm\"." },
  { w: "webstorm", ipa: "/ˈwɛbstɔːrm/", r: "web storm", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "JetBrains JS IDE; \"web-storm\"." },
  { w: "spring", ipa: "/sprɪŋ/", r: "spring", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Java framework; \"spring\", like the season." },
  { w: "opengl", ipa: "/ˌoʊpən dʒiː ˈɛl/", r: "open jee ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Graphics API; \"open-G-L\"." },
  { w: "directx", ipa: "/dɪˈrɛkt ɛks/", r: "dih rekt eks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Microsoft graphics API; \"Direct-X\"." },
  { w: "metal", ipa: "/ˈmɛtəl/", r: "met ul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Apple graphics API; \"metal\", like the material." },
  { w: "threejs", ipa: "/ˌθriː dʒeɪ ˈɛs/", r: "three jay ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Three.js WebGL library; \"three-J-S\"." },
  { w: "distill", ipa: "/dɪˈstɪl/", r: "dih still", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Knowledge distillation: train a small model to mimic a big one; \"dih-STILL\"." },
  { w: "distillation", ipa: "/ˌdɪstɪˈleɪʃən/", r: "diss tih lay shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "The process of distilling a model; \"diss-tih-LAY-shun\"." },
  { w: "quantize", ipa: "/ˈkwɒntaɪz/", r: "kwon tize", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Reduce numeric precision (model quantization); \"KWON-tize\"." },
  { w: "quantization", ipa: "/ˌkwɒntɪˈzeɪʃən/", r: "kwon tih zay shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Compressing weights to lower precision; \"kwon-tih-ZAY-shun\"." },
  { w: "logits", ipa: "/ˈloʊdʒɪts/", r: "loh jits", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Raw pre-softmax outputs; \"LOH-jits\" (soft g)." },
  { w: "epoch", ipa: "/ˈɛpək/", r: "ep uk", aIpa: "/ˈiːpɒk/", aR: "ee pok", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "One full pass over the training data; US \"EP-uk\", also \"EE-pok\"." },
  { w: "stochastic", ipa: "/stəˈkæstɪk/", r: "stuh kass tik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Random (stochastic gradient descent); \"stuh-KASS-tik\"." },
  { w: "bayesian", ipa: "/ˈbeɪziən/", r: "bay zee un", aIpa: "/ˈbeɪʒən/", aR: "bay zhun", url: "", srcLabel: "", cat: "cs-term", conf: "contested", notes: "From Bayes; \"BAY-zee-un\" or \"BAY-zhun\"." },
  { w: "gaussian", ipa: "/ˈɡaʊsiən/", r: "gow see un", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "From Gauss (normal distribution); \"GOW-see-un\"." },
  { w: "euler", ipa: "/ˈɔɪlər/", r: "oy ler", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Mathematician Euler; \"OY-ler\", not \"YOO-ler\"." },
  { w: "eigen", ipa: "/ˈaɪɡən/", r: "eye gun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "German prefix (eigenvalue/eigenvector); \"EYE-gun\"." },
  { w: "eigenvalue", ipa: "/ˈaɪɡənˌvæljuː/", r: "eye gun val yoo", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"EYE-gun-val-yoo\"." },
  { w: "jacobian", ipa: "/dʒəˈkoʊbiən/", r: "juh koh bee un", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Matrix of first-order partial derivatives; \"juh-KOH-bee-un\"." },
  { w: "lagrange", ipa: "/ləˈɡrɑːnʒ/", r: "luh grahnzh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Mathematician Lagrange; \"luh-GRAHNZH\". French." },
  { w: "lagrangian", ipa: "/ləˈɡrɑːndʒiən/", r: "luh grahn jee un", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"luh-GRAHN-jee-un\" (Lagrange multipliers)." },
  { w: "riemann", ipa: "/ˈriːmɑːn/", r: "ree mahn", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Mathematician Riemann; \"REE-mahn\". German." },
  { w: "ablation", ipa: "/əˈbleɪʃən/", r: "uh blay shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Ablation study: remove a part to measure its effect; \"uh-BLAY-shun\"." },
  { w: "annealing", ipa: "/əˈniːlɪŋ/", r: "uh nee ling", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Simulated annealing (optimization); \"uh-NEE-ling\"." },
  { w: "asymptotic", ipa: "/ˌæsɪmpˈtɒtɪk/", r: "ass im tot ik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Behavior in the limit; \"ass-im-TOT-ik\"." },
  { w: "backprop", ipa: "/ˈbækprɒp/", r: "back prop", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Short for backpropagation; \"back-prop\"." },
  { w: "backpropagation", ipa: "/ˌbækprɒpəˈɡeɪʃən/", r: "back prop uh gay shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Gradient computation through the network; \"back-prop-uh-GAY-shun\"." },
  { w: "centroid", ipa: "/ˈsɛntrɔɪd/", r: "sen troyd", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Cluster center (k-means); \"SEN-troyd\"." },
  { w: "corpus", ipa: "/ˈkɔːrpəs/", r: "kor pus", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "A body of text/data; \"KOR-pus\". Plural: corpora." },
  { w: "corpora", ipa: "/ˈkɔːrpərə/", r: "kor per uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Plural of corpus; \"KOR-per-uh\"." },
  { w: "cosine", ipa: "/ˈkoʊsaɪn/", r: "koh sine", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Cosine similarity; \"KOH-sine\"." },
  { w: "covariance", ipa: "/koʊˈvɛəriəns/", r: "koh vair ee uns", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"koh-VAIR-ee-uns\"." },
  { w: "determinant", ipa: "/dɪˈtɜːrmɪnənt/", r: "dih ter mih nunt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Scalar from a square matrix; \"dih-TER-mih-nunt\"." },
  { w: "embedding", ipa: "/ɪmˈbɛdɪŋ/", r: "im bed ing", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Dense vector representation; \"im-BED-ing\"." },
  { w: "ensemble", ipa: "/ɒnˈsɒmbəl/", r: "on som bul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Combine multiple models; \"on-SOM-bul\". French." },
  { w: "entropy", ipa: "/ˈɛntrəpi/", r: "en truh pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Measure of uncertainty (cross-entropy loss); \"EN-truh-pee\"." },
  { w: "hessian", ipa: "/ˈhɛʃən/", r: "hesh un", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Matrix of second-order partial derivatives; \"HESH-un\"." },
  { w: "hyperparameter", ipa: "/ˈhaɪpərpəˌræmɪtər/", r: "hyper puh ram ih ter", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "A setting chosen before training (lr, batch size); \"hyper-puh-RAM-ih-ter\"." },
  { w: "inference", ipa: "/ˈɪnfərəns/", r: "in fer uns", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Running a trained model on new data; \"IN-fer-uns\"." },
  { w: "laplace", ipa: "/ləˈplɑːs/", r: "luh plahss", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Mathematician Laplace; \"luh-PLAHSS\". French." },
  { w: "laplacian", ipa: "/ləˈplɑːsiən/", r: "luh plah see un", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"luh-PLAH-see-un\" (graph Laplacian)." },
  { w: "latent", ipa: "/ˈleɪtənt/", r: "lay tunt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Hidden (latent space, latent diffusion); \"LAY-tunt\"." },
  { w: "manifold", ipa: "/ˈmænɪfoʊld/", r: "man ih fold", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "A curved space (manifold hypothesis); \"MAN-ih-fold\"." },
  { w: "scalar", ipa: "/ˈskeɪlər/", r: "skay ler", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "A single number; \"SKAY-ler\"." },
  { w: "sigmoid", ipa: "/ˈsɪɡmɔɪd/", r: "sig moyd", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "S-shaped activation function; \"SIG-moyd\"." },
  { w: "tokenization", ipa: "/ˌtoʊkənaɪˈzeɪʃən/", r: "toh kun eye zay shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Splitting text into tokens; \"toh-kun-eye-ZAY-shun\"." },
  { w: "dreamer", ipa: "/ˈdriːmər/", r: "dree mer", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Hafner's world-model agent (DreamerV3); \"DREE-mer\"." },
  { w: "dreamerv3", ipa: "/ˈdriːmər viː ˈθriː/", r: "dree mer vee three", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Latest Dreamer world model; \"Dreamer-V-three\"." },
  { w: "muzero", ipa: "/ˈmjuː ˌzɪroʊ/", r: "mew zee roh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "DeepMind model-based RL (learns the model); \"MEW-zee-roh\"." },
  { w: "alphazero", ipa: "/ˈælfə ˌzɪroʊ/", r: "al fuh zee roh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "DeepMind self-play agent; \"AL-fuh-ZEE-roh\"." },
  { w: "alphago", ipa: "/ˈælfə ɡoʊ/", r: "al fuh go", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "DeepMind Go agent; \"AL-fuh-go\"." },
  { w: "alphafold", ipa: "/ˈælfə foʊld/", r: "al fuh fold", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "DeepMind protein-structure model; \"AL-fuh-fold\"." },
  { w: "alphastar", ipa: "/ˈælfə stɑːr/", r: "al fuh star", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "DeepMind StarCraft II agent; \"AL-fuh-star\"." },
  { w: "jepa", ipa: "/ˈdʒɛpə/", r: "jep uh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Joint-Embedding Predictive Architecture (LeCun); \"JEP-uh\"." },
  { w: "gato", ipa: "/ˈɡɑːtoʊ/", r: "gah toh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "DeepMind generalist agent; \"GAH-toh\" (Spanish for cat)." },
  { w: "rssm", ipa: "/ˌɑːr ɛs ɛs ˈɛm/", r: "ar ess ess em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Recurrent State-Space Model (Dreamer/PlaNet core); letters." },
  { w: "tdmpc", ipa: "/ˌtiː diː ɛm piː ˈsiː/", r: "tee dee em pee see", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Temporal-Difference Model-Predictive Control; letters \"TD-MPC\"." },
  { w: "octo", ipa: "/ˈɒktoʊ/", r: "ok toh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open-source generalist robot policy; \"OK-toh\"." },
  { w: "openvla", ipa: "/ˈoʊpən viː ɛl ˈeɪ/", r: "open vee ell ay", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open Vision-Language-Action model; \"Open-V-L-A\"." },
  { w: "mujoco", ipa: "/ˈmjuːdʒoʊkoʊ/", r: "mew jo co", aIpa: "", aR: "", url: "https://mujoco.org/", srcLabel: "MuJoCo", cat: "product", conf: "creator-clarified", notes: "Multi-Joint dynamics with Contact physics engine; \"MEW-jo-co\"." },
  { w: "isaac", ipa: "/ˈaɪzək/", r: "eye zik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "NVIDIA Isaac Sim/Lab/Gym for robotics; \"EYE-zik\"." },
  { w: "habitat", ipa: "/ˈhæbɪtæt/", r: "hab ih tat", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Meta AI Habitat embodied-AI sim; \"HAB-ih-tat\"." },
  { w: "gymnasium", ipa: "/dʒɪmˈneɪziəm/", r: "jim nay zee um", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "RL environment API (successor to OpenAI Gym); \"jim-NAY-zee-um\"." },
  { w: "brax", ipa: "/bræks/", r: "bracks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "JAX differentiable physics engine; \"bracks\"." },
  { w: "pybullet", ipa: "/ˈpaɪˌbʊlɪt/", r: "pie bullet", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Python bindings for Bullet physics; \"pie-bullet\"." },
  { w: "gazebo", ipa: "/ɡəˈziːboʊ/", r: "guh zee boh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "ROS robotics simulator; \"guh-ZEE-boh\"." },
  { w: "webots", ipa: "/ˈwɛbɒts/", r: "web ots", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open-source robot simulator; \"WEB-ots\"." },
  { w: "carla", ipa: "/ˈkɑːrlə/", r: "kar luh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open driving simulator; \"KAR-luh\"." },
  { w: "airsim", ipa: "/ˈɛərsɪm/", r: "air sim", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Microsoft drone/car sim; \"air-sim\"." },
  { w: "omniverse", ipa: "/ˈɒmnɪvɜːrs/", r: "om nih verse", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "NVIDIA simulation platform; \"OM-nih-verse\"." },
  { w: "groot", ipa: "/ɡruːt/", r: "groot", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "NVIDIA GR00T humanoid foundation model; \"groot\"." },
  { w: "maniskill", ipa: "/ˈmænɪskɪl/", r: "man ih skill", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Manipulation-skill benchmark; \"MAN-ih-skill\"." },
  { w: "aloha", ipa: "/əˈloʊhɑː/", r: "uh loh hah", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Low-cost bimanual teleop robot; \"uh-LOH-hah\"." },
  { w: "atari", ipa: "/əˈtɑːri/", r: "uh tar ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Atari (ALE) RL benchmark; \"uh-TAR-ee\"." },
  { w: "crafter", ipa: "/ˈkræftər/", r: "craf ter", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open-world RL benchmark; \"CRAF-ter\"." },
  { w: "minerl", ipa: "/ˌmaɪn ɑːr ˈɛl/", r: "mine ar ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Minecraft RL competition/env; \"Mine-R-L\"." },
  { w: "minedojo", ipa: "/ˈmaɪn doʊdʒoʊ/", r: "mine doh joh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Open-ended Minecraft agent benchmark; \"Mine-DOH-joh\"." },
  { w: "procgen", ipa: "/ˈprɒkdʒɛn/", r: "prock jen", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Procedurally-generated RL benchmark; \"PROCK-jen\"." },
  { w: "trpo", ipa: "/ˈtɜːrpoʊ/", r: "ter po", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Trust Region Policy Optimization; \"TER-po\" or letters." },
  { w: "ddpg", ipa: "/ˌdiː diː piː ˈdʒiː/", r: "dee dee pee jee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Deep Deterministic Policy Gradient; letters \"D-D-P-G\"." },
  { w: "sac", ipa: "/sæk/", r: "sack", aIpa: "/ˌɛs eɪ ˈsiː/", aR: "ess ay see", url: "", srcLabel: "", cat: "abbreviation", conf: "contested", notes: "Soft Actor-Critic; \"sack\" or letters \"S-A-C\"." },
  { w: "impala", ipa: "/ɪmˈpɑːlə/", r: "im pah luh", aIpa: "", aR: "", url: "", srcLabel: "", cat: "product", conf: "community-consensus", notes: "Distributed RL architecture; \"im-PAH-luh\", like the antelope." },
  { w: "bellman", ipa: "/ˈbɛlmən/", r: "bell mun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Bellman equation/backup; \"BELL-mun\"." },
  { w: "markov", ipa: "/ˈmɑːrkɒf/", r: "mar koff", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Markov property/chain; \"MAR-koff\"." },
  { w: "mdp", ipa: "/ˌɛm diː ˈpiː/", r: "em dee pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "abbreviation", conf: "community-consensus", notes: "Markov Decision Process; letters \"M-D-P\"." },
  { w: "pomdp", ipa: "/ˌpiː oʊ ɛm diː ˈpiː/", r: "pee oh em dee pee", aIpa: "/ˈpɒm diː piː/", aR: "pom dee pee", url: "", srcLabel: "", cat: "abbreviation", conf: "contested", notes: "Partially-Observable MDP; \"P-O-M-D-P\" or \"POM-D-P\"." },
  { w: "ergodic", ipa: "/ɜːrˈɡɒdɪk/", r: "er god ik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Ergodic process (long-run = ensemble average); \"er-GOD-ik\"." },
  { w: "quaternion", ipa: "/kwəˈtɜːrniən/", r: "kwuh ter nee un", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "4-component rotation representation; \"kwuh-TER-nee-un\"." },
  { w: "odometry", ipa: "/oʊˈdɒmɪtri/", r: "oh dom uh tree", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Motion estimation from sensors; \"oh-DOM-uh-tree\"." },
  { w: "lidar", ipa: "/ˈlaɪdɑːr/", r: "lye dar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Light Detection and Ranging; \"LYE-dar\"." },
  { w: "proprioception", ipa: "/ˌproʊprioʊˈsɛpʃən/", r: "pro pree oh sep shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Sense of body state/joint angles; \"pro-pree-oh-SEP-shun\"." },
  { w: "geodesic", ipa: "/ˌdʒiːoʊˈdɛsɪk/", r: "jee oh dess ik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Shortest path on a manifold; \"jee-oh-DESS-ik\"." },
  { w: "holonomic", ipa: "/ˌhɒləˈnɒmɪk/", r: "hol uh nom ik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Constraint type in robotics; \"hol-uh-NOM-ik\"." },
  { w: "kinematics", ipa: "/ˌkɪnəˈmætɪks/", r: "kin uh mat iks", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Motion without forces (forward/inverse); \"kin-uh-MAT-iks\"." },
  { w: "slam", ipa: "/slæm/", r: "slam", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Simultaneous Localization And Mapping; \"slam\"." },
  { w: "rollout", ipa: "/ˈroʊlaʊt/", r: "roll out", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Simulating a trajectory under a policy; \"roll-out\"." },
  { w: "trajectory", ipa: "/trəˈdʒɛktəri/", r: "truh jek tuh ree", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Sequence of states/actions; \"truh-JEK-tuh-ree\"." },
  { w: "embodied", ipa: "/ɪmˈbɒdid/", r: "im bod eed", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Embodied AI (agents with a body); \"im-BOD-eed\"." },
  { w: "egocentric", ipa: "/ˌiːɡoʊˈsɛntrɪk/", r: "ee go sen trik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "First-person (egocentric video); \"ee-go-SEN-trik\"." },
  { w: "allocentric", ipa: "/ˌæloʊˈsɛntrɪk/", r: "al oh sen trik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "World-centered frame of reference; \"al-oh-SEN-trik\"." },
  { w: "CEO", ipa: "/ˌsiː iː ˈoʊ/", r: "see ee oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_executive_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Executive Officer; letters \"C-E-O\"." },
  { w: "CTO", ipa: "/ˌsiː tiː ˈoʊ/", r: "see tee oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_technology_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Technology Officer; letters \"C-T-O\"." },
  { w: "CFO", ipa: "/ˌsiː ɛf ˈoʊ/", r: "see eff oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_financial_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Financial Officer; letters \"C-F-O\"." },
  { w: "COO", ipa: "/ˌsiː oʊ ˈoʊ/", r: "see oh oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_operating_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Operating Officer; letters \"C-O-O\"." },
  { w: "CMO", ipa: "/ˌsiː ɛm ˈoʊ/", r: "see em oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_marketing_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Marketing Officer; letters \"C-M-O\"." },
  { w: "CPO", ipa: "/ˌsiː piː ˈoʊ/", r: "see pee oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_product_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Product Officer (also Chief People Officer); letters \"C-P-O\"." },
  { w: "CRO", ipa: "/ˌsiː ɑːr ˈoʊ/", r: "see ar oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_revenue_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Revenue Officer; letters \"C-R-O\"." },
  { w: "CIO", ipa: "/ˌsiː aɪ ˈoʊ/", r: "see eye oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_information_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Information Officer; letters \"C-I-O\"." },
  { w: "CISO", ipa: "/ˈsiːsoʊ/", r: "see soh", aIpa: "/ˌsiː aɪ ɛs ˈoʊ/", aR: "see eye ess oh", url: "https://en.wikipedia.org/wiki/Chief_information_security_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "Chief Information Security Officer; \"SEE-soh\" is dominant, letters also heard." },
  { w: "CSO", ipa: "/ˌsiː ɛs ˈoʊ/", r: "see ess oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_security_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Security/Strategy/Sustainability Officer; letters \"C-S-O\"." },
  { w: "CHRO", ipa: "/ˌsiː eɪtʃ ɑːr ˈoʊ/", r: "see aitch ar oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_human_resources_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Human Resources Officer; letters \"C-H-R-O\"." },
  { w: "CDO", ipa: "/ˌsiː diː ˈoʊ/", r: "see dee oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_data_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Data/Design/Digital Officer; letters \"C-D-O\"." },
  { w: "CCO", ipa: "/ˌsiː siː ˈoʊ/", r: "see see oh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chief_commercial_officer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Chief Commercial/Customer/Compliance Officer; letters \"C-C-O\"." },
  { w: "VP", ipa: "/ˌviː ˈpiː/", r: "vee pee", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Vice_president", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Vice President; letters \"V-P\"." },
  { w: "SVP", ipa: "/ˌɛs viː ˈpiː/", r: "ess vee pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Senior Vice President; letters \"S-V-P\"." },
  { w: "EVP", ipa: "/ˌiː viː ˈpiː/", r: "ee vee pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Executive Vice President; letters \"E-V-P\"." },
  { w: "AVP", ipa: "/ˌeɪ viː ˈpiː/", r: "ay vee pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Associate Vice President; letters \"A-V-P\"." },
  { w: "GM", ipa: "/ˌdʒiː ˈɛm/", r: "jee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "General Manager; letters \"G-M\"." },
  { w: "COS", ipa: "/ˌsiː oʊ ˈɛs/", r: "see oh ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Chief of Staff; letters \"C-O-S\"." },
  { w: "EM", ipa: "/ˌiː ˈɛm/", r: "ee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Engineering Manager; letters \"E-M\"." },
  { w: "TLM", ipa: "/ˌtiː ɛl ˈɛm/", r: "tee ell em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Tech Lead Manager (Google-coined hybrid IC+manager); letters \"T-L-M\"." },
  { w: "TL", ipa: "/ˌtiː ˈɛl/", r: "tee ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Tech Lead; letters \"T-L\"." },
  { w: "IC", ipa: "/ˌaɪ ˈsiː/", r: "eye see", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Individual_contributor", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Individual Contributor (non-manager track); letters \"I-C\"." },
  { w: "DRI", ipa: "/ˌdiː ɑːr ˈaɪ/", r: "dee ar eye", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/DRI", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Directly Responsible Individual (Apple-coined, now AI-native standard); letters \"D-R-I\"." },
  { w: "MTS", ipa: "/ˌɛm tiː ˈɛs/", r: "em tee ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Member of Technical Staff (OpenAI/Anthropic IC title, Bell Labs heritage); letters \"M-T-S\"." },
  { w: "SWE", ipa: "/ˌɛs ˌdʌbəl juː ˈiː/", r: "ess double yoo ee", aIpa: "/swiː/", aR: "swee", url: "https://en.wikipedia.org/wiki/Software_engineering", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "Software Engineer; letters \"S-W-E\" common, \"swee\" used informally." },
  { w: "MLE", ipa: "/ˌɛm ɛl ˈiː/", r: "em ell ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Machine Learning Engineer; letters \"M-L-E\"." },
  { w: "RE", ipa: "/ˌɑːr ˈiː/", r: "ar ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Research Engineer (AI lab IC track); letters \"R-E\"." },
  { w: "RS", ipa: "/ˌɑːr ˈɛs/", r: "ar ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Research Scientist; letters \"R-S\"." },
  { w: "FDE", ipa: "/ˌɛf diː ˈiː/", r: "eff dee ee", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Forward_deployed_engineer", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Forward Deployed Engineer (Palantir-coined, now AI-native standard); letters \"F-D-E\"." },
  { w: "FE", ipa: "/ˌɛf ˈiː/", r: "eff ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Frontend (engineer); letters \"F-E\"." },
  { w: "BE", ipa: "/ˌbiː ˈiː/", r: "bee ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Backend (engineer); letters \"B-E\"." },
  { w: "FSE", ipa: "/ˌɛf ɛs ˈiː/", r: "eff ess ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Full-Stack Engineer; letters \"F-S-E\"." },
  { w: "PE", ipa: "/ˌpiː ˈiː/", r: "pee ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Platform/Production Engineer; letters \"P-E\"." },
  { w: "QA", ipa: "/ˌkjuː ˈeɪ/", r: "kew ay", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Quality_assurance", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Quality Assurance; letters \"Q-A\"." },
  { w: "QE", ipa: "/ˌkjuː ˈiː/", r: "kew ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Quality Engineer; letters \"Q-E\"." },
  { w: "PM", ipa: "/ˌpiː ˈɛm/", r: "pee em", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Product_manager", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Product Manager (also Project Manager); letters \"P-M\"." },
  { w: "TPM", ipa: "/ˌtiː piː ˈɛm/", r: "tee pee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Technical Program/Product Manager; letters \"T-P-M\"." },
  { w: "PgM", ipa: "/ˌpiː dʒiː ˈɛm/", r: "pee jee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Program Manager; letters \"P-G-M\"." },
  { w: "GPM", ipa: "/ˌdʒiː piː ˈɛm/", r: "jee pee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Group Product Manager; letters \"G-P-M\"." },
  { w: "APM", ipa: "/ˌeɪ piː ˈɛm/", r: "ay pee em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Associate Product Manager (also Application Performance Monitoring); letters \"A-P-M\"." },
  { w: "PMM", ipa: "/ˌpiː ɛm ˈɛm/", r: "pee em em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Product Marketing Manager; letters \"P-M-M\"." },
  { w: "UX", ipa: "/ˌjuː ˈɛks/", r: "yoo ex", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/User_experience", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "User Experience; letters \"U-X\"." },
  { w: "UI", ipa: "/ˌjuː ˈaɪ/", r: "yoo eye", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/User_interface", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "User Interface; letters \"U-I\"." },
  { w: "UXR", ipa: "/ˌjuː ɛks ˈɑːr/", r: "yoo ex ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "UX Researcher; letters \"U-X-R\"." },
  { w: "UXE", ipa: "/ˌjuː ɛks ˈiː/", r: "yoo ex ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "UX Engineer; letters \"U-X-E\"." },
  { w: "DS", ipa: "/ˌdiː ˈɛs/", r: "dee ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Data Scientist; letters \"D-S\"." },
  { w: "DA", ipa: "/ˌdiː ˈeɪ/", r: "dee ay", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Data Analyst; letters \"D-A\"." },
  { w: "DE", ipa: "/ˌdiː ˈiː/", r: "dee ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Data Engineer; letters \"D-E\"." },
  { w: "DBA", ipa: "/ˌdiː biː ˈeɪ/", r: "dee bee ay", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Database_administrator", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Database Administrator; letters \"D-B-A\"." },
  { w: "BIE", ipa: "/ˌbiː aɪ ˈiː/", r: "bee eye ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Business Intelligence Engineer (Amazon title); letters \"B-I-E\"." },
  { w: "AE", ipa: "/ˌeɪ ˈiː/", r: "ay ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Account Executive (sales); letters \"A-E\"." },
  { w: "AM", ipa: "/ˌeɪ ˈɛm/", r: "ay em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Account Manager; letters \"A-M\"." },
  { w: "SE", ipa: "/ˌɛs ˈiː/", r: "ess ee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Sales/Solutions Engineer; letters \"S-E\"." },
  { w: "SA", ipa: "/ˌɛs ˈeɪ/", r: "ess ay", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Solutions Architect; letters \"S-A\"." },
  { w: "CSM", ipa: "/ˌsiː ɛs ˈɛm/", r: "see ess em", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Customer Success Manager; letters \"C-S-M\"." },
  { w: "CS", ipa: "/ˌsiː ˈɛs/", r: "see ess", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Customer Success (also Computer Science); letters \"C-S\"." },
  { w: "SDR", ipa: "/ˌɛs diː ˈɑːr/", r: "ess dee ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Sales Development Rep; letters \"S-D-R\"." },
  { w: "BDR", ipa: "/ˌbiː diː ˈɑːr/", r: "bee dee ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Business Development Rep; letters \"B-D-R\"." },
  { w: "BD", ipa: "/ˌbiː ˈdiː/", r: "bee dee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Business Development; letters \"B-D\"." },
  { w: "BizOps", ipa: "/ˈbɪz ɒps/", r: "biz ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Business Operations; \"biz-ops\"." },
  { w: "RevOps", ipa: "/ˈrɛv ɒps/", r: "rev ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Revenue Operations; \"rev-ops\"." },
  { w: "PeopleOps", ipa: "/ˈpiːpəl ɒps/", r: "pee pul ops", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "People Operations (modern HR); \"people-ops\"." },
  { w: "HRBP", ipa: "/ˌeɪtʃ ɑːr biː ˈpiː/", r: "aitch ar bee pee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "HR Business Partner; letters \"H-R-B-P\"." },
  { w: "KR", ipa: "/ˌkeɪ ˈɑːr/", r: "kay ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Key Result (the \"KR\" in OKR); letters \"K-R\"." },
  { w: "RACI", ipa: "/ˈreɪsi/", r: "ray see", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Responsibility_assignment_matrix", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Responsible-Accountable-Consulted-Informed; \"RAY-see\"." },
  { w: "EBR", ipa: "/ˌiː biː ˈɑːr/", r: "ee bee ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Executive Business Review; letters \"E-B-R\"." },
  { w: "MBR", ipa: "/ˌɛm biː ˈɑːr/", r: "em bee ar", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Monthly Business Review; letters \"M-B-R\"." },
  { w: "MoTS", ipa: "/ˌɛm oʊ tiː ˈɛs/", r: "em oh tee ess", aIpa: "/ˈmɒts/", aR: "mots", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "Member of Technical Staff (compact form); letters or \"mots\"." },
  { w: "arxiv", ipa: "/ˈɑːrkaɪv/", r: "ar kive", aIpa: "", aR: "", url: "https://info.arxiv.org/help/faq/whatisarxiv.html", srcLabel: "arXiv FAQ", cat: "product", conf: "creator-clarified", notes: "\"AR-kive\" — the X is Greek chi (/k/), so it sounds like \"archive\". Not \"arks-iv\"." },
  { w: "preprint", ipa: "/ˈpriːˌprɪnt/", r: "pree print", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"PREE-print\" — pre-peer-review manuscript on arXiv/bioRxiv/etc." },
  { w: "NeurIPS", ipa: "/ˈnʊrɪps/", r: "noor ips", aIpa: "/ˈnɔːrɪps/", aR: "nor ips", url: "https://neurips.cc/", srcLabel: "NeurIPS official", cat: "acronym", conf: "community-consensus", notes: "Neural Information Processing Systems; renamed from NIPS in 2018; \"NUR-ips\" or \"NOR-ips\"." },
  { w: "ICML", ipa: "/ˌaɪ siː ɛm ˈɛl/", r: "eye see em ell", aIpa: "", aR: "", url: "https://icml.cc/", srcLabel: "ICML", cat: "acronym", conf: "community-consensus", notes: "International Conference on Machine Learning; letters \"I-C-M-L\"." },
  { w: "ICLR", ipa: "/ˌaɪ siː ɛl ˈɑːr/", r: "eye see ell ar", aIpa: "", aR: "", url: "https://iclr.cc/", srcLabel: "ICLR", cat: "acronym", conf: "community-consensus", notes: "International Conference on Learning Representations; letters \"I-C-L-R\"." },
  { w: "CVPR", ipa: "/ˌsiː viː piː ˈɑːr/", r: "see vee pee ar", aIpa: "", aR: "", url: "https://cvpr.thecvf.com/", srcLabel: "CVPR", cat: "acronym", conf: "community-consensus", notes: "Computer Vision and Pattern Recognition; letters \"C-V-P-R\"." },
  { w: "AAAI", ipa: "/ˌtrɪpəl eɪ ˈaɪ/", r: "triple ay eye", aIpa: "/ˌeɪ eɪ eɪ ˈaɪ/", aR: "ay ay ay eye", url: "https://aaai.org/", srcLabel: "AAAI", cat: "acronym", conf: "contested", notes: "\"Triple-A-I\" common in talks; letters also heard." },
  { w: "ACL", ipa: "/ˌeɪ siː ˈɛl/", r: "ay see ell", aIpa: "", aR: "", url: "https://www.aclweb.org/", srcLabel: "ACL", cat: "acronym", conf: "community-consensus", notes: "Association for Computational Linguistics; letters \"A-C-L\"." },
  { w: "EMNLP", ipa: "/ˌiː ɛm ɛn ɛl ˈpiː/", r: "ee em en ell pee", aIpa: "", aR: "", url: "https://2024.emnlp.org/", srcLabel: "EMNLP", cat: "acronym", conf: "community-consensus", notes: "Empirical Methods in Natural Language Processing; letters." },
  { w: "KDD", ipa: "/ˌkeɪ diː ˈdiː/", r: "kay dee dee", aIpa: "", aR: "", url: "https://kdd.org/", srcLabel: "KDD", cat: "acronym", conf: "community-consensus", notes: "Knowledge Discovery and Data Mining; letters \"K-D-D\"." },
  { w: "AISTATS", ipa: "/ˈeɪ stæts/", r: "ay stats", aIpa: "", aR: "", url: "https://aistats.org/", srcLabel: "AISTATS", cat: "acronym", conf: "community-consensus", notes: "AI and Statistics conference; \"AY-stats\"." },
  { w: "COLT", ipa: "/koʊlt/", r: "colt", aIpa: "", aR: "", url: "https://learningtheory.org/", srcLabel: "COLT", cat: "acronym", conf: "community-consensus", notes: "Conference on Learning Theory; \"colt\" like the horse." },
  { w: "IJCAI", ipa: "/ˌaɪ dʒeɪ siː eɪ ˈaɪ/", r: "eye jay see ay eye", aIpa: "/ˈɪdʒkaɪ/", aR: "ij-kai", url: "https://www.ijcai.org/", srcLabel: "IJCAI", cat: "acronym", conf: "contested", notes: "International Joint Conference on AI; letters dominant, \"IJ-kai\" also heard." },
  { w: "SIGGRAPH", ipa: "/ˈsɪɡɡræf/", r: "sig graf", aIpa: "", aR: "", url: "https://www.siggraph.org/", srcLabel: "SIGGRAPH", cat: "acronym", conf: "community-consensus", notes: "Special Interest Group on Computer Graphics; \"SIG-graf\"." },
  { w: "OpenReview", ipa: "/ˈoʊpən rɪˌvjuː/", r: "open re view", aIpa: "", aR: "", url: "https://openreview.net/", srcLabel: "OpenReview", cat: "product", conf: "community-consensus", notes: "Peer-review platform used by ICLR/NeurIPS; \"open-re-view\"." },
  { w: "BLEU", ipa: "/bluː/", r: "blue", aIpa: "", aR: "", url: "https://aclanthology.org/P02-1040/", srcLabel: "Papineni 2002", cat: "acronym", conf: "creator-clarified", notes: "Bilingual Evaluation Understudy; pronounced \"blue\" per the original paper." },
  { w: "ROUGE", ipa: "/ruːʒ/", r: "roozh", aIpa: "", aR: "", url: "https://aclanthology.org/W04-1013/", srcLabel: "Lin 2004", cat: "acronym", conf: "creator-clarified", notes: "Recall-Oriented Understudy for Gisting Evaluation; French \"rouge\" — \"roozh\"." },
  { w: "METEOR", ipa: "/ˈmiːtiər/", r: "mee tee er", aIpa: "", aR: "", url: "https://aclanthology.org/W05-0909/", srcLabel: "Banerjee & Lavie 2005", cat: "acronym", conf: "community-consensus", notes: "MT eval metric; like the meteor in the sky." },
  { w: "CIDEr", ipa: "/ˈsaɪdər/", r: "side er", aIpa: "", aR: "", url: "https://arxiv.org/abs/1411.5726", srcLabel: "Vedantam et al. 2015", cat: "acronym", conf: "community-consensus", notes: "Consensus-based Image Description Evaluation; \"CIDER\" like the drink." },
  { w: "IoU", ipa: "/ˌaɪ oʊ ˈjuː/", r: "eye oh you", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Jaccard_index", srcLabel: "Wikipedia (Jaccard)", cat: "acronym", conf: "community-consensus", notes: "Intersection over Union (== Jaccard index); letters \"I-o-U\"." },
  { w: "mAP", ipa: "/ˌɛm eɪ ˈpiː/", r: "em ay pee", aIpa: "/mæp/", aR: "map", url: "", srcLabel: "", cat: "acronym", conf: "contested", notes: "Mean Average Precision; spoken letters \"m-A-P\" or as \"map\" — contested." },
  { w: "AUC", ipa: "/ˌeɪ juː ˈsiː/", r: "ay you see", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Receiver_operating_characteristic#Area_under_the_curve", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Area Under the Curve (usually under ROC); letters \"A-U-C\"." },
  { w: "NDCG", ipa: "/ˌɛn diː siː ˈdʒiː/", r: "en dee see jee", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Discounted_cumulative_gain", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Normalized Discounted Cumulative Gain; letters \"N-D-C-G\"." },
  { w: "F1", ipa: "/ˌɛf ˈwʌn/", r: "eff one", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/F-score", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "Harmonic mean of precision & recall; \"F-one\"." },
  { w: "FID", ipa: "/ˌɛf aɪ ˈdiː/", r: "eff eye dee", aIpa: "/fɪd/", aR: "fid", url: "https://arxiv.org/abs/1706.08500", srcLabel: "Heusel et al. 2017", cat: "acronym", conf: "contested", notes: "Fréchet Inception Distance; letters dominant, \"fid\" sometimes." },
  { w: "ELBO", ipa: "/ˈɛlboʊ/", r: "el bow", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Evidence_lower_bound", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Evidence Lower BOund; \"EL-bow\" like the joint." },
  { w: "ECE", ipa: "/ˌiː siː ˈiː/", r: "ee see ee", aIpa: "", aR: "", url: "https://arxiv.org/abs/1706.04599", srcLabel: "Guo et al. 2017", cat: "acronym", conf: "community-consensus", notes: "Expected Calibration Error; letters \"E-C-E\"." },
  { w: "KL", ipa: "/ˌkeɪ ˈɛl/", r: "kay ell", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "Kullback-Leibler (divergence); letters \"K-L\"." },
  { w: "JSD", ipa: "/ˌdʒeɪ ɛs ˈdiː/", r: "jay ess dee", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Jensen-Shannon Divergence; letters \"J-S-D\"." },
  { w: "Wasserstein", ipa: "/ˈvɑːsərʃtaɪn/", r: "vah ser shtine", aIpa: "/ˈwɒsərˌstaɪn/", aR: "wah ser stine", url: "https://en.wikipedia.org/wiki/Wasserstein_metric", srcLabel: "Wikipedia", cat: "person", conf: "contested", notes: "Leonid Vaserštejn — German-style \"VAH-ser-shtine\" is closest to source; \"WAH-ser-stine\" common in ML talks." },
  { w: "Fréchet", ipa: "/freɪˈʃeɪ/", r: "fray shay", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Maurice_Ren%C3%A9_Fr%C3%A9chet", srcLabel: "Wikipedia", cat: "person", conf: "community-consensus", notes: "French mathematician Maurice Fréchet; \"fray-SHAY\" — silent t." },
  { w: "NLL", ipa: "/ˌɛn ɛl ˈɛl/", r: "en ell ell", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Negative Log-Likelihood; letters \"N-L-L\"." },
  { w: "ResNet", ipa: "/ˈrɛznɛt/", r: "rez net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1512.03385", srcLabel: "He et al. 2015", cat: "product", conf: "community-consensus", notes: "Residual Network; \"REZ-net\"." },
  { w: "DenseNet", ipa: "/ˈdɛnsˌnɛt/", r: "dense net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1608.06993", srcLabel: "Huang et al. 2016", cat: "product", conf: "community-consensus", notes: "Densely Connected Network; \"DENSE-net\"." },
  { w: "EfficientNet", ipa: "/ɪˈfɪʃəntˌnɛt/", r: "eh fish unt net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1905.11946", srcLabel: "Tan & Le 2019", cat: "product", conf: "community-consensus", notes: "Compound-scaling CNN family; \"ef-FISH-unt-net\"." },
  { w: "MobileNet", ipa: "/ˈmoʊbaɪlˌnɛt/", r: "moh bile net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1704.04861", srcLabel: "Howard et al. 2017", cat: "product", conf: "community-consensus", notes: "Mobile-friendly CNN family; \"MOH-byle-net\"." },
  { w: "ConvNeXt", ipa: "/ˈkɒnvˌnɛkst/", r: "konv next", aIpa: "", aR: "", url: "https://arxiv.org/abs/2201.03545", srcLabel: "Liu et al. 2022", cat: "product", conf: "community-consensus", notes: "Modernized ConvNet; \"CONV-next\"." },
  { w: "AlexNet", ipa: "/ˈæləksˌnɛt/", r: "al eks net", aIpa: "", aR: "", url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html", srcLabel: "Krizhevsky et al. 2012", cat: "product", conf: "community-consensus", notes: "The 2012 ImageNet winner; \"AL-eks-net\"." },
  { w: "VGG", ipa: "/ˌviː dʒiː ˈdʒiː/", r: "vee jee jee", aIpa: "", aR: "", url: "https://arxiv.org/abs/1409.1556", srcLabel: "Simonyan & Zisserman 2014", cat: "acronym", conf: "community-consensus", notes: "Visual Geometry Group net; letters \"V-G-G\"." },
  { w: "GoogLeNet", ipa: "/ˈɡuːɡəlˌnɛt/", r: "goo gul net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1409.4842", srcLabel: "Szegedy et al. 2014", cat: "product", conf: "community-consensus", notes: "The Inception-based ImageNet 2014 winner; \"GOO-gul-net\"." },
  { w: "Inception", ipa: "/ɪnˈsɛpʃən/", r: "in sep shun", aIpa: "", aR: "", url: "https://arxiv.org/abs/1409.4842", srcLabel: "Szegedy et al. 2014", cat: "product", conf: "community-consensus", notes: "Inception module / network family; \"in-SEP-shun\"." },
  { w: "U-Net", ipa: "/ˈjuː ˌnɛt/", r: "yoo net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1505.04597", srcLabel: "Ronneberger et al. 2015", cat: "product", conf: "community-consensus", notes: "U-shaped encoder-decoder for segmentation; \"YOO-net\"." },
  { w: "ViT", ipa: "/ˌviː aɪ ˈtiː/", r: "vee eye tee", aIpa: "/vɪt/", aR: "vit", url: "https://arxiv.org/abs/2010.11929", srcLabel: "Dosovitskiy et al. 2020", cat: "acronym", conf: "contested", notes: "Vision Transformer; letters dominant, \"vit\" used informally." },
  { w: "DiT", ipa: "/ˌdiː aɪ ˈtiː/", r: "dee eye tee", aIpa: "", aR: "", url: "https://arxiv.org/abs/2212.09748", srcLabel: "Peebles & Xie 2022", cat: "acronym", conf: "community-consensus", notes: "Diffusion Transformer (Sora-style); letters \"D-i-T\"." },
  { w: "Swin", ipa: "/swɪn/", r: "swin", aIpa: "", aR: "", url: "https://arxiv.org/abs/2103.14030", srcLabel: "Liu et al. 2021", cat: "product", conf: "community-consensus", notes: "Shifted-window Transformer; \"swin\" rhymes with \"win\"." },
  { w: "ELECTRA", ipa: "/ɪˈlɛktrə/", r: "uh lek truh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2003.10555", srcLabel: "Clark et al. 2020", cat: "product", conf: "community-consensus", notes: "Pre-train via replaced-token detection; \"uh-LEK-truh\"." },
  { w: "XLNet", ipa: "/ˌɛks ɛl ˈnɛt/", r: "ex ell net", aIpa: "", aR: "", url: "https://arxiv.org/abs/1906.08237", srcLabel: "Yang et al. 2019", cat: "product", conf: "community-consensus", notes: "Permutation language-modeling pre-train; \"X-L-net\"." },
  { w: "ALBERT", ipa: "/ælˈbɜːrt/", r: "al bert", aIpa: "", aR: "", url: "https://arxiv.org/abs/1909.11942", srcLabel: "Lan et al. 2019", cat: "product", conf: "community-consensus", notes: "A Lite BERT; pronounced like the name \"al-BERT\"." },
  { w: "ELMo", ipa: "/ˈɛlmoʊ/", r: "el mo", aIpa: "", aR: "", url: "https://arxiv.org/abs/1802.05365", srcLabel: "Peters et al. 2018", cat: "product", conf: "community-consensus", notes: "Embeddings from Language Models; \"EL-mo\" like the Sesame Street character." },
  { w: "BART", ipa: "/bɑːrt/", r: "bart", aIpa: "", aR: "", url: "https://arxiv.org/abs/1910.13461", srcLabel: "Lewis et al. 2019", cat: "product", conf: "community-consensus", notes: "Denoising seq2seq pre-train; \"bart\" like the name." },
  { w: "Chinchilla", ipa: "/tʃɪnˈtʃɪlə/", r: "chin chill uh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2203.15556", srcLabel: "Hoffmann et al. 2022", cat: "product", conf: "community-consensus", notes: "DeepMind compute-optimal LM (the \"Chinchilla scaling laws\"); \"chin-CHIL-uh\"." },
  { w: "Gopher", ipa: "/ˈɡoʊfər/", r: "goh fer", aIpa: "", aR: "", url: "https://arxiv.org/abs/2112.11446", srcLabel: "Rae et al. 2021", cat: "product", conf: "community-consensus", notes: "DeepMind 280B LM; \"GOH-fer\" like the animal." },
  { w: "Hyena", ipa: "/haɪˈiːnə/", r: "hi ee nuh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2302.10866", srcLabel: "Poli et al. 2023", cat: "product", conf: "community-consensus", notes: "Sub-quadratic Transformer alternative; \"hi-EE-nuh\" like the animal." },
  { w: "CoT", ipa: "/ˌsiː oʊ ˈtiː/", r: "see oh tee", aIpa: "", aR: "", url: "https://arxiv.org/abs/2201.11903", srcLabel: "Wei et al. 2022", cat: "acronym", conf: "community-consensus", notes: "Chain-of-Thought prompting; letters \"C-o-T\"." },
  { w: "ToT", ipa: "/ˌtiː oʊ ˈtiː/", r: "tee oh tee", aIpa: "", aR: "", url: "https://arxiv.org/abs/2305.10601", srcLabel: "Yao et al. 2023", cat: "acronym", conf: "community-consensus", notes: "Tree-of-Thoughts prompting; letters \"T-o-T\"." },
  { w: "ICL", ipa: "/ˌaɪ siː ˈɛl/", r: "eye see ell", aIpa: "", aR: "", url: "https://arxiv.org/abs/2005.14165", srcLabel: "Brown et al. 2020", cat: "acronym", conf: "community-consensus", notes: "In-Context Learning (few-shot from prompt); letters \"I-C-L\"." },
  { w: "SFT", ipa: "/ˌɛs ɛf ˈtiː/", r: "ess eff tee", aIpa: "", aR: "", url: "", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "Supervised Fine-Tuning (pre-RLHF stage); letters \"S-F-T\"." },
  { w: "KTO", ipa: "/ˌkeɪ tiː ˈoʊ/", r: "kay tee oh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2402.01306", srcLabel: "Ethayarajh et al. 2024", cat: "acronym", conf: "community-consensus", notes: "Kahneman-Tversky Optimization; letters \"K-T-O\"." },
  { w: "IPO", ipa: "/ˌaɪ piː ˈoʊ/", r: "eye pee oh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2310.12036", srcLabel: "Azar et al. 2023", cat: "acronym", conf: "community-consensus", notes: "Identity Preference Optimization (alignment); letters \"I-P-O\"." },
  { w: "ORPO", ipa: "/ˈɔːrpoʊ/", r: "or poh", aIpa: "/ˌoʊ ɑːr piː ˈoʊ/", aR: "oh ar pee oh", url: "https://arxiv.org/abs/2403.07691", srcLabel: "Hong et al. 2024", cat: "acronym", conf: "contested", notes: "Odds-Ratio Preference Optimization; \"OR-poh\" or letters." },
  { w: "SimPO", ipa: "/ˈsɪmpoʊ/", r: "sim poh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2405.14734", srcLabel: "Meng et al. 2024", cat: "acronym", conf: "community-consensus", notes: "Simple Preference Optimization; \"SIM-poh\"." },
  { w: "HyDE", ipa: "/haɪd/", r: "hide", aIpa: "", aR: "", url: "https://arxiv.org/abs/2212.10496", srcLabel: "Gao et al. 2022", cat: "acronym", conf: "community-consensus", notes: "Hypothetical Document Embeddings; pronounced \"hide\"." },
  { w: "GraphRAG", ipa: "/ˈɡræfˌræɡ/", r: "graf rag", aIpa: "", aR: "", url: "https://arxiv.org/abs/2404.16130", srcLabel: "Microsoft 2024", cat: "product", conf: "community-consensus", notes: "Graph-based RAG; \"GRAF-rag\"." },
  { w: "DoRA", ipa: "/ˈdɔːrə/", r: "dor uh", aIpa: "", aR: "", url: "https://arxiv.org/abs/2402.09353", srcLabel: "Liu et al. 2024", cat: "acronym", conf: "community-consensus", notes: "Weight-Decomposed LoRA; \"DOR-uh\"." },
  { w: "IA3", ipa: "/ˌaɪ eɪ ˈθriː/", r: "eye ay three", aIpa: "", aR: "", url: "https://arxiv.org/abs/2205.05638", srcLabel: "Liu et al. 2022", cat: "acronym", conf: "community-consensus", notes: "(IA)³ — Infused Adapter by Inhibiting and Amplifying Inner Activations; letters + \"three\"." },
  { w: "p-tuning", ipa: "/ˌpiː ˈtjuːnɪŋ/", r: "pee tooning", aIpa: "", aR: "", url: "https://arxiv.org/abs/2103.10385", srcLabel: "Liu et al. 2021", cat: "cs-term", conf: "community-consensus", notes: "Continuous-prompt tuning; \"P-tuning\"." },
  { w: "DDPM", ipa: "/ˌdiː diː piː ˈɛm/", r: "dee dee pee em", aIpa: "", aR: "", url: "https://arxiv.org/abs/2006.11239", srcLabel: "Ho et al. 2020", cat: "acronym", conf: "community-consensus", notes: "Denoising Diffusion Probabilistic Models; letters \"D-D-P-M\"." },
  { w: "DDIM", ipa: "/ˌdiː diː aɪ ˈɛm/", r: "dee dee eye em", aIpa: "/ˈdiːdɪm/", aR: "dee dim", url: "https://arxiv.org/abs/2010.02502", srcLabel: "Song et al. 2020", cat: "acronym", conf: "contested", notes: "Denoising Diffusion Implicit Models; letters or \"dee-dim\"." },
  { w: "EDM", ipa: "/ˌiː diː ˈɛm/", r: "ee dee em", aIpa: "", aR: "", url: "https://arxiv.org/abs/2206.00364", srcLabel: "Karras et al. 2022", cat: "acronym", conf: "community-consensus", notes: "Elucidating the Design Space of Diffusion Models; letters \"E-D-M\"." },
  { w: "diffusion", ipa: "/dɪˈfjuːʒən/", r: "dih fyoo zhun", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Diffusion_model", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "Diffusion model family; \"dih-FYOO-zhun\"." },
  { w: "CFG", ipa: "/ˌsiː ɛf ˈdʒiː/", r: "see eff jee", aIpa: "", aR: "", url: "https://arxiv.org/abs/2207.12598", srcLabel: "Ho & Salimans 2022", cat: "acronym", conf: "community-consensus", notes: "Classifier-Free Guidance (also Context-Free Grammar in NLP); letters \"C-F-G\"." },
  { w: "ANOVA", ipa: "/əˈnoʊvə/", r: "uh noh vuh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Analysis_of_variance", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Analysis of Variance; \"uh-NO-vuh\"." },
  { w: "MANOVA", ipa: "/məˈnoʊvə/", r: "muh noh vuh", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Multivariate_analysis_of_variance", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Multivariate ANOVA; \"muh-NO-vuh\"." },
  { w: "t-test", ipa: "/ˈtiː ˌtɛst/", r: "tee test", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Student%27s_t-test", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "Student's t-test; \"T-test\"." },
  { w: "chi-squared", ipa: "/ˌkaɪ ˈskwɛərd/", r: "kye squared", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Chi-squared_test", srcLabel: "Wikipedia", cat: "cs-term", conf: "community-consensus", notes: "χ² test — the chi is the Greek letter, pronounced \"kye\"; NOT \"chee\" or \"chai\"." },
  { w: "nabla", ipa: "/ˈnɑːblə/", r: "nahb luh", aIpa: "/ˈnæblə/", aR: "nab luh", url: "https://en.wikipedia.org/wiki/Nabla_symbol", srcLabel: "Wikipedia", cat: "cs-term", conf: "contested", notes: "The ∇ operator (gradient); \"NAH-bluh\" or \"NAB-luh\"." },
  { w: "KKT", ipa: "/ˌkeɪ keɪ ˈtiː/", r: "kay kay tee", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Karush%E2%80%93Kuhn%E2%80%93Tucker_conditions", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Karush-Kuhn-Tucker conditions; letters \"K-K-T\"." },
  { w: "MCMC", ipa: "/ˌɛm siː ɛm ˈsiː/", r: "em see em see", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Markov Chain Monte Carlo; letters \"M-C-M-C\"." },
  { w: "HMM", ipa: "/ˌeɪtʃ ɛm ˈɛm/", r: "aitch em em", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Hidden_Markov_model", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Hidden Markov Model; letters \"H-M-M\"." },
  { w: "SVM", ipa: "/ˌɛs viː ˈɛm/", r: "ess vee em", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Support_vector_machine", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Support Vector Machine; letters \"S-V-M\"." },
  { w: "KNN", ipa: "/ˌkeɪ ɛn ˈɛn/", r: "kay en en", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "k-Nearest Neighbors; letters \"K-N-N\"." },
  { w: "PCA", ipa: "/ˌpiː siː ˈeɪ/", r: "pee see ay", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Principal_component_analysis", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Principal Component Analysis; letters \"P-C-A\"." },
  { w: "ICA", ipa: "/ˌaɪ siː ˈeɪ/", r: "eye see ay", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Independent_component_analysis", srcLabel: "Wikipedia", cat: "acronym", conf: "community-consensus", notes: "Independent Component Analysis; letters \"I-C-A\"." },
  { w: "t-SNE", ipa: "/ˌtiː ɛs ɛn ˈiː/", r: "tee ess en ee", aIpa: "/ˈtiː ˌsniː/", aR: "tee snee", url: "https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding", srcLabel: "Wikipedia", cat: "acronym", conf: "contested", notes: "t-distributed Stochastic Neighbor Embedding; letters or \"tee-snee\"." },
  { w: "UMAP", ipa: "/ˈjuːmæp/", r: "yoo map", aIpa: "", aR: "", url: "https://arxiv.org/abs/1802.03426", srcLabel: "McInnes et al. 2018", cat: "acronym", conf: "community-consensus", notes: "Uniform Manifold Approximation and Projection; \"YOO-map\"." },
  { w: "sutton", ipa: "/ˈsʌtən/", r: "suht un", aIpa: "", aR: "", url: "https://incompleteideas.net/", srcLabel: "Richard Sutton home", cat: "person", conf: "community-consensus", notes: "Richard Sutton (RL, \"The Bitter Lesson\"); \"SUH-tun\"." },
  { w: "silver", ipa: "/ˈsɪlvər/", r: "sil ver", aIpa: "", aR: "", url: "https://www.davidsilver.uk/", srcLabel: "David Silver", cat: "person", conf: "community-consensus", notes: "David Silver (DeepMind, AlphaGo); \"SIL-ver\"." },
  { w: "barto", ipa: "/ˈbɑːrtoʊ/", r: "bar toh", aIpa: "", aR: "", url: "https://www-anw.cs.umass.edu/~barto/", srcLabel: "Andrew Barto", cat: "person", conf: "community-consensus", notes: "Andrew Barto (RL textbook co-author with Sutton); \"BAR-toh\"." },
  { w: "vapnik", ipa: "/ˈvæpnɪk/", r: "vap nik", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Vladimir_Vapnik", srcLabel: "Wikipedia", cat: "person", conf: "community-consensus", notes: "Vladimir Vapnik (VC dimension, SVM); \"VAP-nik\"." },
  { w: "bottou", ipa: "/buːˈtuː/", r: "boo too", aIpa: "", aR: "", url: "https://leon.bottou.org/", srcLabel: "Léon Bottou", cat: "person", conf: "community-consensus", notes: "Léon Bottou (SGD, large-scale learning); French \"boo-TOO\"." },
  { w: "rumelhart", ipa: "/ˈruːməlˌhɑːrt/", r: "roo mul hart", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/David_Rumelhart", srcLabel: "Wikipedia", cat: "person", conf: "community-consensus", notes: "David Rumelhart (backprop, PDP); \"ROO-mul-hart\"." },
  { w: "hopfield", ipa: "/ˈhɒpfiːld/", r: "hop feeld", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/John_Hopfield", srcLabel: "Wikipedia", cat: "person", conf: "community-consensus", notes: "John Hopfield (Hopfield networks; 2024 Nobel in Physics); \"HOP-feeld\"." },
  { w: "judea-pearl", ipa: "/dʒuːˈdiːə ˈpɜːrl/", r: "joo dee uh purl", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Judea_Pearl", srcLabel: "Wikipedia", cat: "person", conf: "community-consensus", notes: "Judea Pearl (causal inference, Bayesian networks); \"joo-DEE-uh PURL\"." },
  { w: "boltzmann", ipa: "/ˈboʊltsmən/", r: "bohlts mun", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Ludwig_Boltzmann", srcLabel: "Wikipedia", cat: "person", conf: "community-consensus", notes: "Ludwig Boltzmann (statistical mechanics, Boltzmann machine); \"BOHLTS-mun\"." },
  { w: "schölkopf", ipa: "/ˈʃɜːlkɒpf/", r: "shurl kopf", aIpa: "/ˈʃɛlkɒpf/", aR: "shell kopf", url: "https://en.wikipedia.org/wiki/Bernhard_Sch%C3%B6lkopf", srcLabel: "Wikipedia", cat: "person", conf: "contested", notes: "Bernhard Schölkopf (kernel methods, causal ML); \"SHURL-kopf\" (ö ≈ \"ur\"); English speakers often say \"SHELL-kopf\"." },
  { w: "tegmark", ipa: "/ˈtɛɡmɑːrk/", r: "teg mark", aIpa: "", aR: "", url: "https://space.mit.edu/home/tegmark/", srcLabel: "Max Tegmark", cat: "person", conf: "community-consensus", notes: "Max Tegmark (MIT, AI safety, Future of Life Institute); \"TEG-mark\"." },
  { w: "fine-tune", ipa: "/ˌfaɪn ˈtjuːn/", r: "fyne toon", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"FYNE-toon\" — continue training a pretrained model on task data. Verb + compound." },
  { w: "fine-tuning", ipa: "/ˌfaɪn ˈtjuːnɪŋ/", r: "fyne tooning", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"FYNE-tooning\" — the noun form." },
  { w: "pretrain", ipa: "/ˌpriːˈtreɪn/", r: "pree train", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"pree-TRAIN\" — train from scratch on a large unlabeled corpus (the base step before fine-tuning)." },
  { w: "pretraining", ipa: "/ˌpriːˈtreɪnɪŋ/", r: "pree training", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"pree-TRAINING\" — the noun form." },
  { w: "adapter", ipa: "/əˈdæptər/", r: "uh dap ter", aIpa: "", aR: "", url: "https://arxiv.org/abs/1902.00751", srcLabel: "Houlsby et al. 2019", cat: "cs-term", conf: "community-consensus", notes: "\"uh-DAP-ter\" — small bottleneck layer injected into a frozen backbone (LoRA, IA³, etc. are adapter methods)." },
  { w: "instruction-tuning", ipa: "/ɪnˈstrʌkʃən ˌtjuːnɪŋ/", r: "in struk shun tooning", aIpa: "", aR: "", url: "https://arxiv.org/abs/2109.01652", srcLabel: "Wei et al. 2021 (FLAN)", cat: "cs-term", conf: "community-consensus", notes: "SFT on instruction-style (prompt, response) pairs; the step that turns a base LM into an instruct model." },
  { w: "prompt-tuning", ipa: "/ˈprɒmpt ˌtjuːnɪŋ/", r: "prompt tooning", aIpa: "", aR: "", url: "https://arxiv.org/abs/2104.08691", srcLabel: "Lester et al. 2021", cat: "cs-term", conf: "community-consensus", notes: "Learn a soft-prompt embedding while the model stays frozen." },
  { w: "prefix-tuning", ipa: "/ˈpriːfɪks ˌtjuːnɪŋ/", r: "pree fix tooning", aIpa: "", aR: "", url: "https://arxiv.org/abs/2101.00190", srcLabel: "Li & Liang 2021", cat: "cs-term", conf: "community-consensus", notes: "Tune a learned prefix prepended to each layer's keys/values." },
  { w: "instruct", ipa: "/ɪnˈstrʌkt/", r: "in strukt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"in-STRUKT\" — short for instruction-tuned (GPT-3.5 Instruct, Llama-2-Instruct, etc.)." },
  { w: "few-shot", ipa: "/ˌfjuː ˈʃɒt/", r: "few shot", aIpa: "", aR: "", url: "https://arxiv.org/abs/2005.14165", srcLabel: "Brown et al. 2020 (GPT-3)", cat: "cs-term", conf: "community-consensus", notes: "\"FEW-shot\" — solve a task from k examples in the prompt; no weight updates." },
  { w: "zero-shot", ipa: "/ˌzɪroʊ ˈʃɒt/", r: "zee roh shot", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"ZEE-roh-shot\" — solve a task with no in-context examples." },
  { w: "transfer-learning", ipa: "/ˈtrænsfər ˌlɜːrnɪŋ/", r: "trans fer ler ning", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Reuse representations learned on one task for another; the parent concept of fine-tuning." },
  { w: "continual-learning", ipa: "/kənˈtɪnjuəl ˌlɜːrnɪŋ/", r: "kun tin yoo ul ler ning", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "Sequential training across tasks without catastrophic forgetting; \"kun-TIN-yoo-ul learning\"." },
  { w: "curriculum-learning", ipa: "/kəˈrɪkjələm ˌlɜːrnɪŋ/", r: "kuh rik yu lum ler ning", aIpa: "", aR: "", url: "https://dl.acm.org/doi/10.1145/1553374.1553380", srcLabel: "Bengio et al. 2009", cat: "cs-term", conf: "community-consensus", notes: "Train on easy examples first, then harder; \"kuh-RIK-yu-lum learning\"." },
  { w: "scaling-laws", ipa: "/ˈskeɪlɪŋ ˌlɔːz/", r: "skay ling lawz", aIpa: "", aR: "", url: "https://arxiv.org/abs/2001.08361", srcLabel: "Kaplan et al. 2020", cat: "cs-term", conf: "community-consensus", notes: "Power-law relations between compute / data / params and loss; \"SKAY-ling laws\"." },
  { w: "downstream", ipa: "/ˌdaʊnˈstriːm/", r: "down streem", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"DOWN-STREEM\" — the application/eval task that a pretrained model is adapted to." },
  { w: "alignment", ipa: "/əˈlaɪnmənt/", r: "uh lyne munt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"uh-LYNE-munt\" — making model behavior match human intent and values." },
  { w: "jailbreak", ipa: "/ˈdʒeɪlˌbreɪk/", r: "jayl brake", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"JAYL-brake\" — prompt or attack that bypasses an LM's safety policies." },
  { w: "red-teaming", ipa: "/ˈrɛd ˌtiːmɪŋ/", r: "red teeming", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"RED-teeming\" — adversarial probing of an LM to find unsafe outputs." },
  { w: "reward-model", ipa: "/rɪˈwɔːrd ˌmɒdəl/", r: "rih ward mod ul", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "RM in RLHF — scores responses to drive PPO/DPO; \"rih-WARD model\"." },
  { w: "preference", ipa: "/ˈprɛfərəns/", r: "pref er uns", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"PREF-er-uns\" — pairwise (A > B) judgements collected for preference learning." },
  { w: "HHH", ipa: "/ˌeɪtʃ eɪtʃ ˈeɪtʃ/", r: "aitch aitch aitch", aIpa: "", aR: "", url: "https://arxiv.org/abs/2112.00861", srcLabel: "Askell et al. 2021", cat: "acronym", conf: "community-consensus", notes: "Helpful, Honest, Harmless — Anthropic's alignment goal triad; letters \"H-H-H\"." },
  { w: "grounding", ipa: "/ˈɡraʊndɪŋ/", r: "grown ding", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"GROWN-ding\" — tying generations to verifiable evidence (retrieved docs, tool output)." },
  { w: "hallucination", ipa: "/həˌluːsɪˈneɪʃən/", r: "huh loo sih nay shun", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"huh-LOO-sih-NAY-shun\" — an LM's confident but ungrounded fabrications." },
  { w: "hallucinate", ipa: "/həˈluːsɪˌneɪt/", r: "huh loo sih nate", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"huh-LOO-sih-nate\" — verb form." },
  { w: "agent", ipa: "/ˈeɪdʒənt/", r: "ay junt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"AY-junt\" — an LM-driven loop that perceives, plans, calls tools, and acts." },
  { w: "agentic", ipa: "/eɪˈdʒɛntɪk/", r: "ay jen tik", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"ay-JEN-tik\" — adjective; capable of multi-step autonomous action." },
  { w: "tool-use", ipa: "/ˈtuːl ˌjuːs/", r: "tool yoos", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"TOOL-YOOS\" — LM-invoked external functions (search, code exec, calc)." },
  { w: "function-calling", ipa: "/ˈfʌŋkʃən ˌkɔːlɪŋ/", r: "funk shun call ing", aIpa: "", aR: "", url: "https://platform.openai.com/docs/guides/function-calling", srcLabel: "OpenAI docs", cat: "cs-term", conf: "community-consensus", notes: "OpenAI/JSON-schema-style tool invocation API; \"FUNK-shun calling\"." },
  { w: "prompt", ipa: "/prɒmpt/", r: "prompt", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"PROMPT\" — the input string fed to an LM." },
  { w: "prompting", ipa: "/ˈprɒmptɪŋ/", r: "prompt ing", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"PROMPT-ing\" — the noun form." },
  { w: "reasoning", ipa: "/ˈriːzənɪŋ/", r: "ree zun ing", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"REE-zun-ing\" — multi-step inference; also the name of the model class (o1, R1, etc.)." },
  { w: "rdma", ipa: "/ˌɑːr ˌdiː ˌɛm ˈeɪ/", r: "ar dee em ay", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Remote_direct_memory_access", srcLabel: "Wikipedia — Remote direct memory access", cat: "acronym", conf: "community-consensus", notes: "Initialism for Remote Direct Memory Access — read as four separate letters R-D-M-A (ar-dee-em-AY), not as a word. Backbone of multi-node GPU training (GPUDirect RDMA, RoCE, InfiniBand). Note the related RoCE is spoken \"rocky\", but RDMA itself stays letter-by-letter." },
  { w: "Molmo", ipa: "/ˈmɑlmoʊ/", r: "mahl moh", aIpa: "/ˈmoʊlmoʊ/", aR: "mohl moh", url: "https://github.com/allenai/molmo", srcLabel: "allenai/molmo GitHub README (\"Molmo: Multimodal Open Language Model\")", cat: "product", conf: "community-consensus", notes: "Ai2 (Allen Institute for AI) open multimodal model family, 2024; Molmo 2 in 2025-2026. Name is a portmanteau acronym: M(ultimodal) O(pen) L(anguage) Mo(del) = MOL + Mo. STRESS first syllable: MOL-moh, where MOL rhymes with \"doll\" (short o, same OL as in sibling OLMo) and \"moh\" is the long-o of \"Model\". Easy to confuse with sibling OLMo (\"OL-mo\") and to mispronounce as long-o MOHL-moh (like \"mole\") — the short-o MOL form follows the acronym. Respelling uses \"mahl\" because macOS say reads \"mol\"/\"moll\"/\"mohl\" all as long-o; only \"mahl\" yields the short-o. No official creator pronunciation FAQ found, so community-consensus." },
  { w: "flashinfer", ipa: "/ˈflæʃˌɪnfɜːr/", r: "flash in fur", aIpa: "", aR: "", url: "https://github.com/flashinfer-ai/flashinfer", srcLabel: "FlashInfer GitHub repository (flashinfer-ai/flashinfer)", cat: "project", conf: "community-consensus", notes: "Portmanteau of flash + inference; a high-performance GPU kernel/attention library for LLM serving (MLSys 2025, arXiv 2501.01005), a default backend in vLLM/SGLang/TensorRT-LLM. The infer element is from inference and is said like the verb infer (in-FUR), not in-fur as guessed from spelling. STRESS: primary on first syllable, FLASH-in-fur. No creator-quoted pronunciation found, so community-consensus." },
  { w: "vibe-coding", ipa: "/ˈvaɪb ˌkoʊdɪŋ/", r: "vybe koh ding", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Vibe_coding", srcLabel: "Wikipedia: Vibe coding", cat: "cs-term", conf: "community-consensus", notes: "AI-assisted coding: you prompt an LLM and accept generated code on 'vibes'. Coined by Andrej Karpathy Feb 2025; Collins Word of the Year 2025; in Merriam-Webster slang. STRESS on first word: VYBE-koh-ding. Key for non-natives: 'vibe' has a long i and rhymes with 'tribe' — NOT 'vib'." },
  { w: "cartesia", ipa: "/kɑrˈtiʒə/", r: "kar tee zhuh", aIpa: "/kɑrˈtiziə/", aR: "kar tee zee uh", url: "https://docs.cartesia.ai/build-with-cartesia/sonic-3/custom-pronunciations", srcLabel: "Cartesia Docs — Custom Pronunciations", cat: "product", conf: "community-consensus", notes: "Real-time voice-AI lab (Stanford 2023; Karan Goel, Albert Gu) behind the Sonic TTS models, built on state-space models (SSMs); rising ElevenLabs rival. Name derives from \"Cartesian\" (math). STRESS: kar-TEE-zhuh — soft \"zh\" as in \"vision\". Cartesia's own docs give IPA kʰ ɑ ɹ tʲ i ʒ ɐ, formed by taking \"cartesian\" and replacing the final \"-an\" with an \"uh\" sound." },
  { w: "bitsandbytes", ipa: "/ˌbɪts.ən.ˈbaɪts/", r: "bits and bytes", aIpa: "", aR: "", url: "https://github.com/bitsandbytes-foundation/bitsandbytes", srcLabel: "bitsandbytes GitHub (bitsandbytes-foundation)", cat: "tool", conf: "community-consensus", notes: "k-bit quantization library for PyTorch underpinning 8-bit optimizers, LLM.int8() and 4-bit/NF4 QLoRA. Written as one lowercase token but spoken as three words: BITS-and-BYTES — STRESS on first and last, middle 'and' reduced to schwa. The spelling is the pronunciation; only the concatenation obscures the word boundaries." },
  { w: "codebuff", ipa: "/ˈkoʊdbʌf/", r: "kohd buhf", aIpa: "", aR: "", url: "https://github.com/CodebuffAI/codebuff", srcLabel: "CodebuffAI GitHub repository (CodebuffAI/codebuff)", cat: "cli-tool", conf: "community-consensus", notes: "Open-source multi-agent terminal coding agent by CodebuffAI; benchmarks against Claude Code. Name is \"code\" + \"buff\" (buffed-up / enhanced). STRESS first syllable: CODE-buff. \"buff\" rhymes with \"stuff\"/\"rough\" (NOT \"byoof\"). No creator-documented pronunciation found, but both halves are everyday English words so the reading is unambiguous. Formerly named Manicode." },
  { w: "toolformer", ipa: "/ˈtuːlˌfɔːrmər/", r: "tool for mur", aIpa: "", aR: "", url: "https://arxiv.org/abs/2302.04761", srcLabel: "arXiv 2302.04761 — Toolformer: Language Models Can Teach Themselves to Use Tools (Schick et al., Meta AI)", cat: "project", conf: "community-consensus", notes: "Meta AI paper (Schick et al., 2023): seminal \"LLM teaches itself to use tools/APIs\" work, foundational to tool-calling agents. Portmanteau of \"tool\" + \"-former\" (borrowed from Transformer). STRESS: TOOL-for-mer; \"-former\" rhymes with the end of transFORMER. No creator audio on record, but the construction is unambiguous." },
  { w: "MLA", ipa: "/ˌɛm ˌɛl ˈeɪ/", r: "em el ay", aIpa: "", aR: "", url: "https://arxiv.org/abs/2405.04434", srcLabel: "DeepSeek-V2 paper (arXiv 2405.04434)", cat: "acronym", conf: "community-consensus", notes: "Multi-head Latent Attention, the DeepSeek-V2/V3 attention variant that compresses the KV cache into a latent vector. Spoken as an initialism, letter by letter: em-el-AY (STRESS on the final letter). Not pronounced as a word. Collides with other meanings of MLA (Modern Language Association, etc.), so in ML context spell it out and rely on the surrounding words Multi-head Latent Attention." },
  { w: "awq", ipa: "/ɔk/", r: "awk", aIpa: "/ˌeɪ ˌdʌb əl juː ˈkjuː/", aR: "ay duh bul yoo kyoo", url: "https://arxiv.org/abs/2306.00978", srcLabel: "arXiv 2306.00978 — AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration (MIT HAN Lab)", cat: "acronym", conf: "contested", notes: "Activation-aware Weight Quantization. Spoken \"awk\" (like the unix tool) or spelled out A-W-Q." },
  { w: "ratatui", ipa: "/ˌræ.təˈtu.i/", r: "rat uh too ee", aIpa: "", aR: "", url: "https://github.com/ratatui/ratatui", srcLabel: "ratatui GitHub README (official)", cat: "tool", conf: "creator-clarified", notes: "Dominant Rust terminal-UI crate (powers gitui and many TUIs); community fork of tui-rs (2023). Official README documents the IPA ˌræ.təˈtu.i; named after the dish/Pixar film Ratatouille. STRESS: rat-uh-TOO-ee (primary stress on TOO)." },
  { w: "CodeAct", ipa: "/ˈkoʊdˌækt/", r: "code act", aIpa: "", aR: "", url: "https://arxiv.org/abs/2402.01030", srcLabel: "arXiv 2402.01030 — \"Executable Code Actions Elicit Better LLM Agents\" (Wang et al., ICML 2024)", cat: "cs-term", conf: "community-consensus", notes: "Coined compound of \"Code\" + \"Act(ion)\" from the ICML 2024 paper; the agent framework that lets LLMs emit executable Python as their action space (underpins OpenHands / CodeActAgent). Two plain English words; STRESS first syllable: CODE-act (noun-compound stress), not code-ACT." },
  { w: "subagent", ipa: "/ˈsʌbˌeɪdʒənt/", r: "sub ay jent", aIpa: "", aR: "", url: "https://code.claude.com/docs/en/sub-agents", srcLabel: "Claude Code Docs — Create custom subagents", cat: "cs-term", conf: "community-consensus", notes: "Compound of \"sub-\" + \"agent\"; a specialized AI assistant that runs in its own context window, used heavily in Claude Code, the Claude Agent SDK, and agentic-coding tooling. STRESS: SUB-ay-jent — primary on \"sub\", \"agent\" keeps its /ˈeɪdʒənt/ (\"ay-jent\"); the \"g\" is soft (j), not hard. Spelled as one word in the official docs." },
  { w: "tongyi", ipa: "/ˈtʊŋˈji/", r: "tohng yee", aIpa: "", aR: "toong yee", url: "https://en.wikipedia.org/wiki/Qwen", srcLabel: "Wikipedia: Qwen (通义千问 / Tōngyì Qiānwèn)", cat: "product", conf: "community-consensus", notes: "Alibaba's Tongyi (通义) brand umbrella over Qwen / Tongyi Qianwen (通义千问, pinyin Tōngyì Qiānwèn), surfaced across Alibaba Cloud Model Studio and Hugging Face. Pinyin Tōngyì: tōng (通, rounded vowel of English \"song\") + yì (义, \"yee\"). STRESS-pattern: TOHNG-yee, roughly even with a slight lift on the first syllable. English speakers often mangle it as \"tongue-ee\" or \"tahn-jee\"; the o is the rounded \"ong\" of \"song,\" not \"tongue.\"" },
  { w: "watchexec", ipa: "/ˈwɒtʃ.ɛɡˌzɛk/", r: "wotch eg zek", aIpa: "", aR: "", url: "https://github.com/watchexec/watchexec", srcLabel: "watchexec/watchexec — GitHub (official repo)", cat: "cli-tool", conf: "community-consensus", notes: "Cross-platform Rust file-watcher that runs a command on file changes (alternative to entr/nodemon). Name = \"watch\" + \"exec\" (execute). The \"exec\" suffix follows dev-tooling convention (cf. the exec syscall / shell builtin): \"eg-ZEK\", not \"ex-eck\". STRESS: WOTCH-eg-zek (primary on first syllable, secondary on -ZEK). No official creator pronunciation FAQ exists, but the compound is unambiguous." },
  { w: "NF4", ipa: "/ˌɛn ɛf ˈfɔːr/", r: "en eff four", aIpa: "", aR: "", url: "https://arxiv.org/abs/2305.14314", srcLabel: "QLoRA: Efficient Finetuning of Quantized LLMs (arXiv 2305.14314)", cat: "acronym", conf: "community-consensus", notes: "4-bit NormalFloat, the information-theoretically-optimal 4-bit datatype introduced in the QLoRA paper (Dettmers et al., 2023) and shipped in bitsandbytes for quantized fine-tuning. Read as an initialism plus the digit: N-F-FOUR. \"NF\" = NormalFloat, \"4\" = 4-bit. Main stress on FOUR. Not \"niff-four\"." },
  { w: "reflexion", ipa: "/rɪˈflɛkʃən/", r: "rih flek shun", aIpa: "", aR: "", url: "https://www.oxfordlearnersdictionaries.com/us/definition/english/reflexion", srcLabel: "Oxford Learner's Dictionaries — reflexion", cat: "cs-term", conf: "community-consensus", notes: "Reflexion is a foundational LLM-agent self-reflection technique (Shinn et al., 2023, \"Reflexion: Language Agents with Verbal Reinforcement Learning\", arXiv:2303.11366), cited across agent frameworks. Despite the 'x' spelling it is pronounced exactly like \"reflection\": rih-FLEK-shun. STRESS on second syllable (FLEK). The 'x' here is /kʃ/, not /ks/ + separate vowel — do not say \"re-FLEX-ion\"; non-natives sometimes second-guess against \"reflection\" but the two are homophones — \"reflexion\" is just the older British orthography. IPA per Oxford Learner's Dictionary /rɪˈflekʃn/." },
  { w: "FlashAttention", ipa: "/ˌflæʃ əˈtɛnʃən/", r: "flash uh ten shun", aIpa: "", aR: "", url: "https://arxiv.org/abs/2205.14135", srcLabel: "arXiv 2205.14135 — FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness (Dao et al.)", cat: "project", conf: "community-consensus", notes: "IO-aware exact-attention GPU kernel (Dao-AILab; FlashAttention-2/3) baked into vLLM, TGI, TensorRT-LLM, PyTorch SDPA. Spoken as the two English words \"flash\" + \"attention\" run together, one word in writing. STRESS: secondary on FLASH, primary on -TEN- (flash-uh-TEN-shun). Non-native speakers hesitate on the flash+attention compound; pronunciation is just the plain English words." },
  { w: "exaone", ipa: "/ˈɛks.eɪ.wʌn/", r: "ex ay wun", aIpa: "", aR: "", url: "https://huggingface.co/LGAI-EXAONE", srcLabel: "LG AI Research — EXAONE HuggingFace org page", cat: "product", conf: "community-consensus", notes: "LG AI Research's open-weight LLM/LMM family (EXAONE 4.0/4.5, K-EXAONE; 2025-2026). Name is an acronym, EXpert AI for EveryONE, so it parses EX-A-ONE. STRESS: EX-a-wun (first syllable). NOT 'exa-ONE' like the SI prefix, NOT 'ex-AY-one.' Acronym documented on LG's HF org page; no explicit spoken-pronunciation quote, hence community-consensus." },
  { w: "RadixAttention", ipa: "/ˈreɪdɪks əˌtɛnʃən/", r: "ray diks uh ten shun", aIpa: "/ˈrædɪks əˌtɛnʃən/", aR: "rad iks uh ten shun", url: "https://www.lmsys.org/blog/2024-01-17-sglang/", srcLabel: "LMSYS Org Blog — \"Fast and Expressive LLM Inference with RadixAttention and SGLang\"", cat: "cs-term", conf: "community-consensus", notes: "SGLang's automatic KV-cache reuse mechanism — a radix tree over the KV cache for prefix sharing; coined by LMSYS (2024). Compound of \"radix\" + \"attention\". STRESS: RAY-diks-uh-TEN-shun (primary on RAY, secondary on TEN). \"radix\" is /ˈreɪdɪks/ (RAY-diks, the standard dictionary form per Wiktionary/Cambridge), NOT \"ra-dicks\" or \"ra-tix\"; final cluster is \"-ks\" not \"-tx\". Often mispronounced by non-native devs as \"ratix\"/\"radicks\". Alt /ˈrædɪks/ (RAD-iks) is a secondary variant." },
  { w: "mise", ipa: "/miːz/", r: "meez", aIpa: "", aR: "", url: "https://mise.jdx.dev/about.html", srcLabel: "mise official docs — About page", cat: "cli-tool", conf: "creator-clarified", notes: "Rust polyglot version manager + task runner by Jeff Dickey (jdx); the asdf successor. Name is short for the French culinary term \"mise-en-place.\" Official docs: `mise` (pronounced \"meez\"), rhymes with \"cheese.\" One syllable, voiced final z. Common wrong guesses: \"my-z\", \"mice\", \"miz.\"" },
  { w: "reka", ipa: "/ˈrɛkə/", r: "reck uh", aIpa: "/ˈriːkə/", aR: "ree kuh", url: "https://arxiv.org/abs/2404.12387", srcLabel: "Reka Core, Flash, and Edge technical report (arXiv 2404.12387)", cat: "product", conf: "contested", notes: "Reka AI — multimodal frontier-model lab (Reka Core / Flash / Edge). Reka publishes no official pronunciation, so usage is genuinely split. The name evokes the word for 'river' in two languages that pronounce it differently: South Slavic река gives REK-uh (short e), while Hungarian Réka gives REE-kuh (long ee); English speakers also default to REE-kuh. STRESS on first syllable: REK-uh or REE-kuh." },
  { w: "swe-agent", ipa: "/ˈswiː ˌeɪdʒənt/", r: "swee ay jent", aIpa: "/ˌɛs ˌdʌbəljuː ˈiː ˌeɪdʒənt/", aR: "ess dubble yoo ee ay jent", url: "https://arxiv.org/abs/2405.15793", srcLabel: "arXiv 2405.15793 — SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (Princeton/Stanford, NeurIPS 2024)", cat: "project", conf: "contested", notes: "Princeton/Stanford autonomous coding agent (Yang, Jimenez, Press et al.); \"SWE\" = software engineering. Pronunciation is genuinely split: most ML/coding-agent speakers say it as one syllable \"SWEE\" (rhymes with \"free\"), but spelling it out \"S-W-E agent\" is also common. No creator/docs/FAQ documents an official reading (SWE-bench FAQ and SWE-agent README both silent), so marked contested; the \"swee\" form is the more frequent spoken default and is used as the primary respelling. STRESS: SWEE-ay-jent." },
  { w: "GQA", ipa: "/ˌdʒiː kjuː ˈeɪ/", r: "jee kyoo ay", aIpa: "", aR: "gee kyoo ay", url: "https://arxiv.org/abs/2305.13245", srcLabel: "arXiv: GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints", cat: "acronym", conf: "community-consensus", notes: "Grouped-Query Attention — the default attention in Llama 2/3, Qwen, Gemma, GPT-OSS. Read as an initialism, letter by letter: G-Q-A, jee-kyoo-AY, STRESS on the final letter. Said-as-a-word never caught on because the Q has no following vowel, so spelling it out is the dominant convention in papers, model cards, and talks." },
  { w: "egui", ipa: "/ˈiːɡuːi/", r: "ee gooey", aIpa: "", aR: "", url: "https://github.com/emilk/egui/blob/main/README.md", srcLabel: "egui official README (emilk/egui)", cat: "project", conf: "creator-clarified", notes: "Rust immediate-mode GUI library by Emil Ernerfeldt (@emilk). README states verbatim: \"pronounced as 'e-gooey'. Please don't write it as 'EGUI'.\" Lowercase, like \"e\" + the word \"gooey\". STRESS: EE-gooey (first syllable). Often mispronounced \"ee-gwee\" or spelled out E-G-U-I." },
  { w: "seedream", ipa: "/ˈsiːdriːm/", r: "seed reem", aIpa: "", aR: "", url: "https://seed.bytedance.com/en/seedream4_5", srcLabel: "ByteDance Seed — Seedream 4.5 official page", cat: "product", conf: "community-consensus", notes: "ByteDance Seed's text-to-image model (Seedream 4.0/4.5, 2025-2026; 4K). Portmanteau of Seed + dream, parallel to siblings Seedance (Seed+dance, video) and SeedEdit — so SEED-reem, not see-DREEM. STRESS: SEED-reem (primary stress on first syllable). The Seed prefix is ByteDance's research division." },
  { w: "mastra", ipa: "/ˈmæstrə/", r: "mass truh", aIpa: "/ˈmɑːstrə/", aR: "mah struh", url: "https://github.com/mastra-ai/mastra", srcLabel: "Mastra GitHub README (mastra-ai/mastra)", cat: "project", conf: "community-consensus", notes: "Open-source TypeScript AI agent framework from the ex-Gatsby team (YC-backed, 1.0 in early 2026). Coined name; etymology undocumented. Dominant English reading is MASS-truh — short A as in 'master', stress on the first syllable. A spelling-pronunciation MAH-struh is sometimes heard; no documented creator FAQ resolves it, hence community-consensus. STRESS: MASS-truh." },
  { w: "ALiBi", ipa: "/ˈæləbaɪ/", r: "al uh by", aIpa: "", aR: "", url: "https://arxiv.org/abs/2108.12409", srcLabel: "arXiv 2108.12409 — Train Short, Test Long: Attention with Linear Biases (ALiBi), Press et al., ICLR 2022", cat: "cs-term", conf: "community-consensus", notes: "ALiBi = Attention with Linear Biases, a transformer position method used in BLOOM and MPT. The camelCase ALiBi cues that it reads as the everyday English word \"alibi\" (STRESS: AL-uh-by, first syllable) — not spelled out A-L-I-B-I, and the \"-bi\" is long-i (\"by\"), not \"bee\". Paper/GitHub don't document the pronunciation, so community-consensus, but the wordplay is unambiguous." },
  { w: "aya", ipa: "/ˈɑːjə/", r: "ah yah", aIpa: "/ˈaɪə/", aR: "eye uh", url: "https://cohere.com/research/aya", srcLabel: "Cohere Labs — Aya research initiative", cat: "product", conf: "community-consensus", notes: "Cohere Labs' open-science multilingual LLM family (Aya 101 / Aya 23 / Aya Expanse / Aya Vision / Tiny Aya), up to 101 languages, Apache-2.0. Named after the Twi (Ghana) word 'aya' = 'fern', an Adinkra symbol of endurance and resourcefulness (per Cohere's announcements). Standard reading is AH-yah (/ˈɑːjə/), matching the Twi/Akan and common given-name pronunciation. STRESS first syllable: AH-yah. Some English speakers anglicize it to EYE-uh, but the fern/Twi origin points to AH-yah." },
  { w: "fsdp", ipa: "/ˌɛf ˌɛs ˌdiː ˈpiː/", r: "eff ess dee pee", aIpa: "", aR: "", url: "https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html", srcLabel: "PyTorch Tutorials — Getting Started with Fully Sharded Data Parallel (FSDP)", cat: "acronym", conf: "community-consensus", notes: "Fully Sharded Data Parallel — PyTorch's ZeRO-style multi-GPU training strategy that shards parameters, gradients, and optimizer states across ranks. Initialism, spelled out letter-by-letter: EFF-ESS-DEE-PEE (no widely-used word pronunciation). Central to multi-GPU/LLM training docs since 2022; FSDP2 is the current rewrite." },
  { w: "deepgemm", ipa: "/ˈdiːp ˌdʒɛm/", r: "deep jem", aIpa: "/ˌdiːp ˌdʒiː iː ɛm ˈɛm/", aR: "deep jee ee em em", url: "https://github.com/deepseek-ai/DeepGEMM", srcLabel: "DeepGEMM GitHub repository (deepseek-ai/DeepGEMM)", cat: "project", conf: "contested", notes: "DeepSeek's FP8/FP4 GEMM kernel library for Hopper/Blackwell, used as a MoE backend by vLLM/SGLang. \"Deep\" + \"GEMM\" (General Matrix Multiply). Pronunciation is genuinely split: most HPC/BLAS practitioners say GEMM as a single word rhyming with \"gem\"/\"hem\" (mirroring how S-GEMM = \"ess-jem\", D-GEMM = \"dee-jem\" are spoken), giving DEEP-jem. Others spell it out, deep-G-E-M-M. README gives no phonetic guidance. STRESS: DEEP-jem." },
  { w: "hailuo", ipa: "/ˈhaɪˌlwɔ/", r: "high lwaw", aIpa: "/ˈhaɪˌloʊ/", aR: "high low", url: "https://en.wiktionary.org/wiki/%E6%B5%B7%E8%9E%BA", srcLabel: "Wiktionary — 海螺 (hǎiluó), Mandarin IPA /xaɪ̯ lu̯ɔ/", cat: "product", conf: "community-consensus", notes: "Hailuo AI is MiniMax's text/image-to-video generator (Hailuo 2.3, Media Agent; 2025). Name romanizes Chinese 海螺 hǎiluó (\"conch / sea snail\"), hence the English nickname \"Conch Video.\" STRESS: HIGH-lwaw. Two syllables: \"hai\"=\"high,\" \"luo\"=pinyin [lwɔ] — a single glide-syllable like \"law\" with a w-onset, NOT three beats \"loo-oh.\" Common anglicized form is \"HIGH-low\" (/haɪloʊ/), shown as the alt. Mandarin tones hǎi (3rd) + luó (2nd); English speakers can ignore tone." },
  { w: "GPTQ", ipa: "/ˌdʒiː piː tiː ˈkjuː/", r: "jee pee tee kyoo", aIpa: "", aR: "", url: "https://arxiv.org/abs/2210.17323", srcLabel: "Frantar et al., \"GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers\" (arXiv:2210.17323)", cat: "acronym", conf: "community-consensus", notes: "Post-training weight quantization method for LLMs (\"GPT\" + \"Q\" for quantization). An initialism, spelled out letter-by-letter: jee-pee-tee-KYOO, primary stress on the final Q. The \"GPT\" prefix is read like GPT-4 (not \"gee-putt\"). Not pronounced as a single word." },
  { w: "hedra", ipa: "/ˈhɛdrə/", r: "hed ruh", aIpa: "/ˈhiːdrə/", aR: "hee druh", url: "https://www.hedra.com/company", srcLabel: "Hedra — Company / About page (a16z-backed AI video startup behind Character-3)", cat: "product", conf: "contested", notes: "Hedra AI — a16z-backed digital-human / talking-avatar startup (Character-3 omnimodal model; $32M Series A, May 2025; 10M+ videos generated). Name = Greek 'hedra' (ἕδρα, 'seat/base'), which standalone reads HED-ruh — Behind the Name lists [ˈhɛdrə]. STRESS: HED-ruh. No founder pronunciation on record; the HEE-druh variant (/ˈhiːdrə/) circulates by analogy with compounds like polyHEEdron / dodecaHEEdron, but for the bare name HED-ruh is the dictionary-backed reading. CONTESTED — no official guidance." },
  { w: "seedance", ipa: "/ˈsiːdæns/", r: "seed dance", aIpa: "", aR: "", url: "https://seed.bytedance.com/en/seedance", srcLabel: "ByteDance Seed — Seedance official page", cat: "product", conf: "community-consensus", notes: "ByteDance's AI video-generation model family (Seedance 1.0 / 2.0, 2026); the video-side sibling of the Seedream image model, both under ByteDance's \"Seed\" foundation-model brand. Portmanteau of Seed + dance. STRESS: SEED-dance — say \"seed\" then \"dance\", NOT \"see-dance\". No documented creator pronunciation quote, but the Seed-prefix branding makes the split unambiguous across docs." },
  { w: "agentless", ipa: "/ˈeɪdʒəntləs/", r: "ay jent less", aIpa: "", aR: "", url: "https://arxiv.org/abs/2407.01489", srcLabel: "arXiv 2407.01489 — \"Agentless: Demystifying LLM-based Software Engineering Agents\"", cat: "cs-term", conf: "community-consensus", notes: "Coined in the OpenAutoCoder/SWE-bench paper for an approach that solves coding tasks WITHOUT an autonomous agent loop — the deliberate antonym of \"agentic\". STRESS stays on the first syllable: AY-jent-less, not uh-JENT-less." },
  { w: "nccl", ipa: "/ˈnɪkəl/", r: "nik uhl", aIpa: "", aR: "", url: "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/overview.html", srcLabel: "NVIDIA NCCL Developer Guide — Overview", cat: "product", conf: "creator-clarified", notes: "NVIDIA Collective Communications Library — GPU collective comms (all-reduce, all-gather) for distributed ML training. Official docs: \"NCCL, pronounced 'Nickel'\". Said like the coin/metal: NIK-uhl, stress on first syllable. Non-obvious from the letters N-C-C-L." },
  { w: "pythagora", ipa: "/pɪˈθæɡərə/", r: "pih thag uh ruh", aIpa: "/paɪˈθæɡərə/", aR: "pie thag uh ruh", url: "https://www.pythagora.ai/", srcLabel: "Pythagora official site", cat: "product", conf: "community-consensus", notes: "AI dev platform / VS Code + Cursor extension and company (YC W24) behind GPT Pilot. Name = the Greek mathematician Pythagoras (/pɪˈθæɡərəs/) minus the final -s. STRESS on second syllable: pih-THAG-uh-ruh. First syllable is short 'pih' in the US reading; the long-'pie' first syllable (alt) mirrors the standard British reading of Pythagoras. No creator-documented pronunciation found — inferred from the established English reading of Pythagoras." },
  { w: "ZeRO", ipa: "/ˈzɪroʊ/", r: "zeer oh", aIpa: "/ˈziːroʊ/", aR: "zee roh", url: "https://www.deepspeed.ai/tutorials/zero/", srcLabel: "DeepSpeed — Zero Redundancy Optimizer (ZeRO) tutorial", cat: "acronym", conf: "community-consensus", notes: "DeepSpeed's ZeRO = \"ZEro Redundancy Optimizer\" (Microsoft, arXiv:1910.02054). Stylized capitalization (capital Z and O) signals it reads as the English word \"zero\" — identical to the number, NOT spelled out Z-E-R-O. STRESS: ZEER-oh. Stages are ZeRO-1/2/3 (\"zero one/two/three\"). Distinct from existing \"zero-shot\"." },
  { w: "MQA", ipa: "/ˌɛm ˌkjuː ˈeɪ/", r: "em kyoo ay", aIpa: "", aR: "", url: "https://arxiv.org/abs/2305.13245", srcLabel: "arXiv 2305.13245 (GQA paper, defines/compares MQA)", cat: "acronym", conf: "community-consensus", notes: "Multi-Query Attention — the single-KV-head attention variant that GQA generalizes; referenced in serving docs like TensorRT-LLM. Initialism read letter-by-letter, not as a word: STRESS final letter, em-kyoo-AY, exactly parallel to GQA. The expansion 'multi-query attention' is never pronounced." },
  { w: "pixi", ipa: "/ˈpɪksi/", r: "pik see", aIpa: "", aR: "pixie", url: "https://github.com/prefix-dev/pixi", srcLabel: "prefix-dev/pixi GitHub README", cat: "cli-tool", conf: "community-consensus", notes: "Rust-based cross-platform conda/PyPI package & environment manager from prefix.dev (rising 2025-2026 Python/data-science workflow tool). Reads as the English word \"pixie\" — STRESS first syllable: PIK-see, rhymes with \"fixie.\" Not \"pix-eye.\" No official creator pronunciation quote located; based on the unambiguous English reading of the spelling. CLI invoked lowercase as `pixi`." },
  { w: "chezmoi", ipa: "/ʃeɪ mwa/", r: "shay mwa", aIpa: "", aR: "", url: "https://www.chezmoi.io/user-guide/frequently-asked-questions/design/", srcLabel: "chezmoi official FAQ (Design)", cat: "cli-tool", conf: "creator-clarified", notes: "CLI dotfiles manager. Name = French \"chez moi\" (\"at my house\"). Official FAQ documents the pronunciation as /ʃeɪ mwa/ \"shay-mwa\". Non-obvious because the spelling looks English/German; the \"z\" is silent and \"oi\" is the French [wa], not English \"oy\"." },
  { w: "exl2", ipa: "/ˌiː ɛks ɛl ˈtuː/", r: "ee eks el too", aIpa: "", aR: "", url: "https://github.com/turboderp-org/exllamav2", srcLabel: "turboderp-org/exllamav2 (GitHub README)", cat: "product", conf: "community-consensus", notes: "Mixed-bitrate quantization format native to the ExLlamaV2 (turboderp) local-LLM inference library; the name is a contraction of ExLlamaV2 (EX-L + 2). Spelled out letter-by-letter \"E-X-L-TWO\" in local-LLM communities, not read as \"excel-two\". STRESS on TWO. File extension/suffix seen as .exl2 on Hugging Face quants." },
  { w: "codestral", ipa: "/koʊˈdɛstrəl/", r: "koh dess truhl", aIpa: "/ˈkoʊdəstrəl/", aR: "koh duh struhl", url: "https://mistral.ai/news/codestral/", srcLabel: "Mistral AI — Codestral announcement", cat: "product", conf: "community-consensus", notes: "Mistral's 22B code-generation model (released May 2024) with a fill-in-the-middle endpoint, widely used in IDE autocomplete (Continue.dev, Tabnine). The name is reported to be inspired by \"orchestral\" (the model harmonizing coding tasks), blended with \"code\" + the company name \"Mistral.\" STRESS: koh-DESS-truhl — primary stress on the second syllable, by analogy with orchestral (or-KESS-truhl). A code-forward first-syllable reading KOH-duh-struhl (keeping the embedded \"code\" audible, echoing MISS-truhl) is also heard. Official docs give no phonetic guidance." },
  { w: "koka", ipa: "/ˈkoʊkə/", r: "koh kuh", aIpa: "/ˈkoʊkɑː/", aR: "koh kah", url: "https://koka-lang.github.io/koka/doc/book.html", srcLabel: "The Koka Programming Language (official book/docs)", cat: "project", conf: "community-consensus", notes: "Microsoft Research functional language with algebraic effect handlers (Daan Leijen). Name from Japanese 効果 (kōka) \"effect/effectiveness\" — matching its effect-typing focus. STRESS first syllable: KOH-kuh, long-o then schwa. Japanese-faithful variant is KOH-kah (koh kah)." },
  { w: "mentat", ipa: "/ˈmɛntæt/", r: "men tat", aIpa: "", aR: "", url: "https://mentat.ai/", srcLabel: "Mentat (AbanteAI) official site", cat: "tool", conf: "community-consensus", notes: "AI coding tool by AbanteAI — currently MentatBot, a GitHub-native coding agent (earlier archived CLI shared the name). Name borrowed from the \"Mentats\" (human computers) of Frank Herbert's Dune, from Latin mentis / mentation. STRESS-pattern: MEN-tat (first syllable). \"tat\" rhymes with \"cat\"; \"men\" rhymes with \"ten\"." },
  { w: "nvlink", ipa: "/ˌɛnˈviː lɪŋk/", r: "en vee link", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/NVLink", srcLabel: "Wikipedia — NVLink", cat: "product", conf: "community-consensus", notes: "NVIDIA's GPU-to-GPU interconnect (constant in GB200/H100 cluster talk). The \"NV\" prefix is the NVIDIA initialism, read as the letters N-V (\"en-vee\"), then plain \"link\": en-vee-LINK. Same NV-prefix pattern as NVSwitch. NOT \"nuv-link\" or \"en-vid-ee-uh link\" — a common non-native slip. STRESS: en-vee-LINK. No official FAQ documents the pronunciation; letter-initialism reading is universal in the community." },
  { w: "cutlass", ipa: "/ˈkʌtləs/", r: "kut luhs", aIpa: "", aR: "", url: "https://github.com/NVIDIA/cutlass", srcLabel: "NVIDIA/cutlass GitHub repo", cat: "project", conf: "community-consensus", notes: "NVIDIA's CUDA C++ GEMM/linear-algebra template library; kernel backend behind vLLM, FlashInfer, and many 2025 LLM-serving stacks. The name is an acronym (CUDA Templates for Linear Algebra Subroutines and Solvers) deliberately landing on the sword 'cutlass' — say it exactly like that word. STRESS first syllable: KUT-luhs. NOT 'CUDA-lass' or 'cut-LASS'. Dictionary IPA /ˈkʌtləs/ (Oxford/Cambridge/Collins, same in BrE and AmE)." },
  { w: "rmsnorm", ipa: "/ˌɑːr ɛm ɛs ˈnɔːrm/", r: "ar em ess norm", aIpa: "", aR: "", url: "https://arxiv.org/abs/1910.07467", srcLabel: "Zhang & Sennrich, \"Root Mean Square Layer Normalization\", arXiv:1910.07467", cat: "cs-term", conf: "community-consensus", notes: "RMSNorm = Root Mean Square (Layer) Normalization, the normalization used in Llama/Mistral and most modern LLMs. Spoken as a compound: the \"RMS\" part is spelled out letter-by-letter (ar-em-ess), then \"norm\" said as the word. STRESS on NORM: \"ar-em-ess NORM\". No source documents an explicit creator pronunciation, but the letter-spelled-acronym + \"norm\" reading is universal in talks and writeups, hence community-consensus." },
  { w: "PagedAttention", ipa: "/ˈpeɪdʒd əˈtɛnʃən/", r: "payjd uh ten shun", aIpa: "", aR: "", url: "https://arxiv.org/abs/2309.06180", srcLabel: "arXiv 2309.06180 — Efficient Memory Management for Large Language Model Serving with PagedAttention", cat: "cs-term", conf: "community-consensus", notes: "vLLM's core attention algorithm, named after OS virtual-memory PAGING. Two parts: \"paged\" + \"attention\". STRESS: PAYJD uh-TEN-shun. The hazard is \"paged\" — it is /peɪdʒd/ (rhymes with \"caged\", one syllable, voiced -jd cluster), NOT two-syllable \"page-ed\". From the verb \"to page\" the KV cache into fixed-size blocks. Common in inference-infra discussion 2023-2026." },
  { w: "maturin", ipa: "/ˈmætʊrɪn/", r: "mat uh rin", aIpa: "/ˈmætjʊrɪn/", aR: "mat yuh rin", url: "https://github.com/PyO3/maturin", srcLabel: "PyO3/maturin — official GitHub repo (formerly pyo3-pack)", cat: "cli-tool", conf: "community-consensus", notes: "STRESS first syllable: MAT-uh-rin (short 'a' as in 'mat', NOT ma-TUR-in). PyO3's official CLI to build & publish Rust-based Python wheels (used by polars, pydantic-core, etc.; pip-installable). The README doesn't document a pronunciation, but 'Maturin' is a real French Huguenot given name (cf. Stephen Maturin in O'Brian's Aubrey–Maturin novels), and references consistently put the stress on the FIRST syllable. A yod variant 'MAT-yuh-rin' also occurs." },
  { w: "krea", ipa: "/ˈkriːə/", r: "kree uh", aIpa: "", aR: "", url: "https://www.krea.ai/", srcLabel: "Krea AI official site", cat: "product", conf: "community-consensus", notes: "AI creative suite (image/video/3D generation) and the FLUX.1 Krea open model co-developed with Black Forest Labs (2025). Two-syllable name: KREE-uh — first syllable rhymes with \"free,\" second is a schwa. STRESS on first syllable: KREE-uh. Common ESL trap: KRAY-uh; accepted reading is KREE-uh." },
  { w: "veo", ipa: "/ˈviːoʊ/", r: "vee oh", aIpa: "/ˈveɪoʊ/", aR: "vay oh", url: "https://deepmind.google/models/veo/", srcLabel: "Google DeepMind — Veo", cat: "product", conf: "contested", notes: "Google DeepMind's text-to-video model (Veo 3 / 3.1, 2025), used inside Gemini and Flow. Dominant English reading is VEE-oh; HowToPronounce gives /ˈviːoʊ/. A VAY-oh variant exists, echoing Spanish \"veo\" (I see). No official creator pronunciation is documented, hence contested. STRESS: VEE-oh." },
  { w: "oxlint", ipa: "/ˈɒksˌlɪnt/", r: "ox lint", aIpa: "", aR: "", url: "https://oxc.rs/docs/guide/usage/linter.html", srcLabel: "Oxlint official docs (oxc.rs)", cat: "cli-tool", conf: "creator-clarified", notes: "\"OX-lint\" — the oxc-based linter; ox like the animal, not the letters O-X." },
  { w: "pixtral", ipa: "/ˈpɪks trɑːl/", r: "piks trahl", aIpa: "/pɪks ˈtrɑːl/", aR: "piks trahl", url: "https://arxiv.org/abs/2410.07073", srcLabel: "Mistral AI (Pixtral 12B paper)", cat: "product", conf: "community-consensus", notes: "Mistral AI's multimodal model family (Pixtral 12B, Pixtral Large). Blend of 'pixel' + 'Mistral,' so '-tral' rhymes with sibling Mistral/Mixtral entries (TRAHL, long ah). Front-loaded stress PIKS-trahl is most common; second-syllable piks-TRAHL (matching some Mixtral speakers) also heard. No creator pronunciation guide published." },
  { w: "ChatGLM", ipa: "/ˌtʃæt dʒiː ɛl ˈɛm/", r: "chat jee ell em", aIpa: "", aR: "", url: "https://github.com/THUDM/ChatGLM-6B", srcLabel: "THUDM/ChatGLM-6B GitHub README", cat: "product", conf: "community-consensus", notes: "Zhipu AI / Tsinghua KEG open bilingual model series. Name = \"Chat\" + GLM, where GLM is an initialism for \"General Language Model\" spoken letter-by-letter: chat-G-L-M, NOT read as a word \"glim\". STRESS: chat-jee-ell-EM (final letter takes the beat). Bare \"GLM\" is already in the dict; this is the searched product name." },
  { w: "nemotron", ipa: "/ˈniːmoʊˌtrɑːn/", r: "nee moh tron", aIpa: "/ˈnɛməˌtrɑːn/", aR: "nem oh tron", url: "https://en.wikipedia.org/wiki/Nemotron", srcLabel: "Wikipedia — Nemotron", cat: "product", conf: "community-consensus", notes: "NVIDIA's flagship open LLM family (Nemotron 3: Nano/Super/Ultra, 2025-2026), hybrid Mamba-Transformer MoE for agentic reasoning. Coined name = NVIDIA's NeMo framework (\"NEural MOdules\", said NEE-mo) + the -tron suffix, so the prevailing reading is first-syllable-stressed NEE-moh-tron. Some devs mis-read it as nem-oh-TRON / nuh-MOT-ron; the NeMo etymology favors NEE-moh-tron. No official creator-documented pronunciation in text. STRESS: NEE-moh-tron." },
  { w: "recraft", ipa: "/riˈkræft/", r: "ree kraft", aIpa: "", aR: "", url: "https://www.recraft.ai/docs/recraft-models/recraft-V3", srcLabel: "Recraft docs — Recraft V3", cat: "product", conf: "community-consensus", notes: "Recraft V3 (Oct 2024), a 20B text-to-image model that topped the Artificial Analysis leaderboard for months. Name is the transparent compound re- + craft. STRESS on the root: re-CRAFT (ree-KRAFT), same pattern as the verb 'to recraft' — not RE-craft. No official creator pronunciation documented; natural English reading of the re- prefix compound." },
  { w: "knip", ipa: "/ˈknɪp/", r: "kuh nip", aIpa: "", aR: "", url: "https://github.com/webpro-nl/knip", srcLabel: "Knip official GitHub README (webpro-nl/knip)", cat: "tool", conf: "creator-clarified", notes: "JS/TS unused files/exports/deps detector by Lars Kappert (webpro). README states: \"/ˈknɪp/ means '(to) cut' and is pronounced with a hard K\" (Dutch). The K is NOT silent — say it \"k-nip\", NOT English \"nip\". Single short-i syllable as in \"nip\". macOS `say` silences the K on raw \"knip\", so the respelling uses a light schwa (\"kuh nip\") to force a hard-K onset — closest `say` gets to a true /kn/ cluster." },
  { w: "ultracode", ipa: "/ˈʌltrəˌkoʊd/", r: "ul truh code", aIpa: "", aR: "", url: "", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"UL-truh-code\" — Claude Code max-effort mode (/effort) that fans work out across many subagents. Plain ultra + code." },
];
const BY_WORD = Object.fromEntries(ENTRIES.map(e => [e.w.toLowerCase(), e]));

function buildBody(entry, opts) {
  opts = opts || {};
  const reps = opts.reps || 3;
  const alts = entry.aR ? entry.aR.split('|').filter(Boolean) : [];
  if (opts.altIdx !== undefined) {
    const a = alts[opts.altIdx];
    if (!a) return '';
    return Array(reps).fill(a).join('. ') + '.';
  }
  let parts = [];
  for (let i = 0; i < reps; i++) parts.push(entry.r || entry.w);
  let body = parts.join('. ') + '.';
  if (!opts.solo && alts.length > 0) {
    for (const a of alts) {
      const repsEach = opts.all ? reps : 1;
      body += ' or: ' + Array(repsEach).fill(a).join('. ') + '.';
    }
  }
  return body;
}

// CURRENT_AUDIO holds the most recently triggered HTMLAudioElement so we can stop it.
let CURRENT_AUDIO = null;
function audioUrl(word) {
  const slug = word.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  return '/audio/' + slug + '.mp3';
}

function playPrerendered(url, fallbackBody) {
  if (CURRENT_AUDIO) { try { CURRENT_AUDIO.pause(); } catch(_) {} }
  const a = new Audio(url);
  a.onerror = () => speakBody(fallbackBody);
  CURRENT_AUDIO = a;
  a.play().catch(() => speakBody(fallbackBody));
  return a;
}

function speakBody(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const us = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
  if (us) u.voice = us;
  u.rate = 0.9;
  u.lang = 'en-US';
  speechSynthesis.speak(u);
}

function playEntry(idx, opts) {
  const entry = (typeof idx === 'number') ? ENTRIES[idx] : BY_WORD[idx.toLowerCase()];
  if (!entry) return;
  // Prefer the pre-rendered .mp3 (matches the CLI exactly).
  // For --alt mode use a Web Speech fallback since we don't pre-render alt-isolated audio.
  if (opts && opts.altIdx !== undefined) {
    const body = buildBody(entry, opts);
    if (body) speakBody(body);
    return;
  }
  playPrerendered(audioUrl(entry.w), buildBody(entry, opts || {}));
}

function escHTML(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function badge(text, kind) { return `<span class="badge badge-${kind}">${text}</span>`; }
function entryHref(word) {
  return './word/' + word.toLowerCase().replace(/[^a-z0-9._-]/g, '-') + '.html';
}

function renderEntry(e, idx) {
  const alts = e.aR ? e.aR.split('|').filter(Boolean) : [];
  const altIpas = e.aIpa ? e.aIpa.split('|') : [];
  let altsHtml = '';
  if (alts.length > 0) {
    altsHtml = '<div class="alts">';
    alts.forEach((a, i) => {
      const aip = altIpas[i] || '';
      altsHtml += `
        <div class="alt-row">
          <button class="play-btn play-alt" onclick="playEntry(${idx}, {altIdx: ${i}})" aria-label="Play alternate ${i+1}">▶</button>
          <span class="alt-label">or:</span>
          <span class="alt-resp">${escHTML(a)}</span>
          ${aip ? `<span class="ipa-small">${escHTML(aip)}</span>` : ''}
        </div>`;
    });
    altsHtml += '</div>';
  }
  const sourceHtml = e.url
    ? `<div class="source">📎 <a href="${escHTML(e.url)}" target="_blank" rel="noopener">${escHTML(e.srcLabel || e.url)}</a></div>`
    : '';
  return `
    <article class="entry" data-cat="${escHTML(e.cat)}" data-conf="${escHTML(e.conf)}">
      <header class="entry-header">
        <h3 class="word"><a href="${entryHref(e.w)}">${escHTML(e.w)}</a></h3>
        <div class="entry-badges">${badge(e.cat, 'cat')}${badge(e.conf, e.conf)}</div>
      </header>
      <div class="primary-row">
        <button class="play-btn play-primary" onclick="playEntry(${idx})" aria-label="Play primary reading">▶</button>
        <span class="resp">${escHTML(e.r)}</span>
        <span class="ipa">${escHTML(e.ipa)}</span>
      </div>
      ${altsHtml}
      ${e.notes ? `<p class="notes">${escHTML(e.notes)}</p>` : ''}
      ${sourceHtml}
    </article>`;
}

function initBrowse() {
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
  const container = document.getElementById('entries');
  if (!container) return;
  container.innerHTML = ENTRIES.map((e, i) => renderEntry(e, i)).join('\n');
  const counter = document.getElementById('counter');
  if (counter) counter.textContent = ENTRIES.length;
  const search = document.getElementById('search');
  const filterChips = document.querySelectorAll('.chip');
  let activeCat = 'all';
  function applyFilter() {
    const q = (search.value || '').toLowerCase().trim();
    let shown = 0;
    container.querySelectorAll('.entry').forEach(el => {
      const w = el.querySelector('.word').textContent.toLowerCase();
      const notes = (el.querySelector('.notes')?.textContent || '').toLowerCase();
      const cat = el.dataset.cat;
      const catOk = (activeCat === 'all') || (cat === activeCat);
      const qOk = !q || w.includes(q) || notes.includes(q);
      const show = catOk && qOk;
      el.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    if (counter) counter.textContent = shown;
  }
  search.addEventListener('input', applyFilter);
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCat = chip.dataset.cat;
      applyFilter();
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '/') { e.preventDefault(); search.focus(); }
    else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      const pick = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
      window.location.href = entryHref(pick.w);
    }
    else if (e.key === '?') { e.preventDefault(); toggleHelp(); }
    else if (e.key === 'Escape') { closeHelp(); }
  });
}

function toggleHelp() {
  let modal = document.getElementById('help-modal');
  if (modal) { modal.remove(); return; }
  modal = document.createElement('div');
  modal.id = 'help-modal';
  modal.className = 'help-modal';
  modal.innerHTML = `
    <div class="help-card">
      <h3>Keyboard shortcuts</h3>
      <table>
        <tr><td><kbd>/</kbd></td><td>focus search</td></tr>
        <tr><td><kbd>r</kbd></td><td>random word</td></tr>
        <tr><td><kbd>?</kbd></td><td>this help</td></tr>
        <tr><td><kbd>Esc</kbd></td><td>close</td></tr>
      </table>
      <p class="hint">on a word page: <kbd>r</kbd> jumps to another random entry</p>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) closeHelp(); });
  document.body.appendChild(modal);
}
function closeHelp() {
  const m = document.getElementById('help-modal');
  if (m) m.remove();
}

function initWordPage() {
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
  // Keyboard shortcuts on individual word pages
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      const pick = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
      window.location.href = './' + pick.w.toLowerCase().replace(/[^a-z0-9._-]/g, '-') + '.html';
    } else if (e.key === ' ') {
      e.preventDefault();
      const btn = document.querySelector('.play-primary');
      if (btn) btn.click();
    } else if (e.key === '/') {
      e.preventDefault();
      window.location.href = '../browse.html';
    } else if (e.key === 'c' || e.key === 'C') {
      // copy IPA
      e.preventDefault();
      const ipa = document.querySelector('.ipa-large');
      if (ipa && navigator.clipboard) { navigator.clipboard.writeText(ipa.textContent.trim()); toast('IPA copied'); }
    } else if (e.key === 'm' || e.key === 'M') {
      // copy mp3 URL
      e.preventDefault();
      const a = document.querySelector('.download-mp3');
      if (a && navigator.clipboard) { navigator.clipboard.writeText(a.href); toast('audio URL copied'); }
    } else if (e.key === 't' || e.key === 'T') {
      // tweet this word
      e.preventDefault();
      const tw = document.querySelector('.share-twitter');
      if (tw) tw.click();
    } else if (e.key === '?') { e.preventDefault(); toggleHelp(); }
    else if (e.key === 'Escape') { closeHelp(); }
  });
}

function toast(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('toast-show'), 10);
  setTimeout(() => { t.classList.remove('toast-show'); setTimeout(() => t.remove(), 200); }, 1400);
}

function todaysWord() {
  // Deterministic per day
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  let hash = 0;
  for (const c of day) hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
  return ENTRIES[Math.abs(hash) % ENTRIES.length];
}

function renderTodaysWord() {
  const el = document.getElementById('todays-word');
  if (!el) return;
  const e = todaysWord();
  const slug = e.w.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  el.innerHTML = `
    <div class="todays-inner">
      <div class="todays-label">📅 Today's pronunciation</div>
      <a href="./word/${slug}.html" class="todays-word-link">
        <span class="todays-word">${escHTML(e.w)}</span>
        <span class="todays-resp">${escHTML(e.r)}</span>
        <span class="todays-ipa">${escHTML(e.ipa)}</span>
      </a>
      <div class="todays-actions">
        <button class="play-btn play-primary" onclick="playEntry('${e.w}')" aria-label="Play today's word">▶</button>
        <a href="./word/${slug}.html" class="todays-cta">See the source →</a>
      </div>
    </div>`;
}

// Service worker — installable PWA + offline cache for visited words
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Theme: respect OS by default, allow manual override via localStorage
function applyTheme() {
  const stored = localStorage.getItem('pronounce-theme');
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = stored ? stored === 'dark' : sysDark;
  document.documentElement.dataset.theme = useDark ? 'dark' : 'light';
}
function toggleTheme() {
  const cur = document.documentElement.dataset.theme || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  localStorage.setItem('pronounce-theme', next);
  applyTheme();
}
applyTheme();

// Hero search — instant search on landing page (suggest list)
function initHeroSearch() {
  const input = document.getElementById('hero-search');
  const sug = document.getElementById('hero-suggest');
  const mic = document.getElementById('hero-mic');
  if (!input || !sug) return;

  function slugify(w) { return w.toLowerCase().replace(/[^a-z0-9._-]/g, '-'); }
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function searchEntries(q) {
    q = q.toLowerCase().trim();
    if (!q) return [];
    const exact = [], prefix = [], contains = [];
    for (const e of ENTRIES) {
      const w = e.w.toLowerCase();
      if (w === q) exact.push(e);
      else if (w.startsWith(q)) prefix.push(e);
      else if (w.includes(q) || (e.r || '').toLowerCase().includes(q)) contains.push(e);
    }
    return [...exact, ...prefix, ...contains].slice(0, 8);
  }

  function render(items) {
    if (!items.length) { sug.hidden = true; sug.innerHTML = ''; return; }
    sug.hidden = false;
    sug.innerHTML = items.map((e, i) => {
      const slug = slugify(e.w);
      return '<a class="suggest-row" role="option" data-i="' + i + '" href="./word/' + slug + '.html">' +
        '<span class="suggest-w">' + escapeHtml(e.w) + '</span>' +
        '<span class="suggest-r">' + escapeHtml(e.r || '') + '</span>' +
        '<span class="suggest-i">' + escapeHtml(e.ipa || '') + '</span>' +
        '</a>';
    }).join('');
  }

  let cur = -1, items = [];
  input.addEventListener('input', () => {
    items = searchEntries(input.value);
    cur = -1;
    render(items);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); cur = Math.min(cur+1, items.length-1); highlight(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cur = Math.max(cur-1, -1); highlight(); }
    else if (e.key === 'Enter' && items.length) {
      e.preventDefault();
      const pick = cur >= 0 ? items[cur] : items[0];
      window.location.href = './word/' + slugify(pick.w) + '.html';
    } else if (e.key === 'Escape') { sug.hidden = true; }
  });
  function highlight() {
    sug.querySelectorAll('.suggest-row').forEach((el, i) => el.classList.toggle('active', i === cur));
  }
  document.addEventListener('click', (e) => {
    if (!sug.contains(e.target) && e.target !== input) sug.hidden = true;
  });

  // Voice mic — uses Web Speech API for speech recognition
  if (mic) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      mic.disabled = true;
      mic.title = 'Voice search not supported in this browser';
      mic.style.opacity = '0.4';
    } else {
      mic.addEventListener('click', () => {
        const rec = new SR();
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        mic.classList.add('listening');
        rec.onresult = (ev) => {
          const txt = (ev.results[0][0].transcript || '').trim().replace(/[.,!?]$/,'');
          input.value = txt;
          items = searchEntries(txt);
          cur = -1;
          render(items);
          if (items.length) {
            // jump straight to top match
            setTimeout(() => { window.location.href = './word/' + slugify(items[0].w) + '.html'; }, 400);
          }
        };
        rec.onend = () => mic.classList.remove('listening');
        rec.onerror = () => mic.classList.remove('listening');
        rec.start();
      });
    }
  }
}

// Clipboard helper — used by per-word copy IPA button
window.copyToClipboard = function(text, toastText) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(() => {
    if (typeof toast === 'function') toast(toastText || 'copied');
  }).catch(() => {});
};

// Hero typewriter — cycles through "hard to pronounce" words
function initHeroCycle() {
  const el = document.getElementById('hero-cycle');
  if (!el) return;
  const words = ['kubectl', 'nginx', 'GIF', 'JSON', 'Pydantic', 'Knative', 'LaTeX', 'JWT', 'CIDR', 'kubectl'];
  let i = 0, j = 0, deleting = false;
  function tick() {
    const w = words[i];
    if (!deleting) {
      el.textContent = w.slice(0, ++j);
      if (j === w.length) { deleting = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = w.slice(0, --j);
      if (j === 0) { deleting = false; i = (i + 1) % words.length; return setTimeout(tick, 250); }
    }
    setTimeout(tick, deleting ? 40 : 100);
  }
  // honor reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = 'kubectl';
    return;
  }
  tick();
}

// Confetti — used by quiz on perfect score
window.confettiBurst = function(n) {
  n = n || 80;
  const colors = ['#ff6a3d', '#7adfbb', '#7ab8ff', '#ffd33d', '#ff85a8'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = (Math.random() * 100) + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    document.body.appendChild(c);
    const dx = (Math.random() - 0.5) * 200;
    const dur = 2200 + Math.random() * 1500;
    c.animate([
      { transform: c.style.transform + ' translate(0, 0)', opacity: 1 },
      { transform: 'translate(' + dx + 'px, 100vh) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => c.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderTodaysWord();
  initHeroSearch();
  initHeroCycle();
  // Wire up theme toggle button if present in topbar
  const tb = document.getElementById('theme-toggle');
  if (tb) tb.addEventListener('click', toggleTheme);
  if (document.getElementById('entries')) initBrowse();
  else initWordPage();
});
