// say-it dictionary — generated from data/pronunciations.tsv. Do not hand-edit.
const ENTRIES = [
  { w: "kubectl", ipa: "/ˈkuːb kənˌtroʊl/", r: "koob control", aIpa: "/ˈkjuːb kʌtəl/|/ˌkjuːb siː tiː ˈɛl/", aR: "cube cuddle|kube C T L", url: "https://www.youtube.com/watch?v=2wgAIvXpJqU", srcLabel: "Kelsey Hightower (KubeCon)", cat: "cli-tool", conf: "contested", notes: "Hightower & many K8s maintainers say \"koob-control\"; \"cube-cuddle\" and \"K-U-B-E-C-T-L\" both exist." },
  { w: "nginx", ipa: "/ˈɛn dʒɪnˈɛks/", r: "engine X", aIpa: "", aR: "", url: "https://nginx.org/en/", srcLabel: "NGINX official", cat: "product", conf: "creator-clarified", notes: "Creator Igor Sysoev confirms \"engine-x\"." },
  { w: "GIF", ipa: "/dʒɪf/", r: "jif", aIpa: "/ɡɪf/", aR: "gif", url: "https://www.nytimes.com/2013/05/22/business/media/creator-of-the-gif-says-its-pronounced-jif.html", srcLabel: "Steve Wilhite, Webby Awards 2013", cat: "acronym", conf: "creator-clarified", notes: "Wilhite (creator): \"It's pronounced JIF, not GIF.\" Community remains split." },
  { w: "JSON", ipa: "/ˈdʒeɪsən/", r: "jay son", aIpa: "/ˈdʒiːˌsɒn/", aR: "jee son", url: "https://www.youtube.com/watch?v=-C-JoyNuQJs", srcLabel: "Douglas Crockford (RailsConf 2009)", cat: "acronym", conf: "creator-clarified", notes: "Crockford prefers \"JAY-son\"; accepts \"JEE-son\" too." },
  { w: "SQL", ipa: "/ˈsiːkwəl/", r: "sequel", aIpa: "/ˌɛs kjuː ˈɛl/", aR: "S Q L", url: "https://en.wikipedia.org/wiki/SQL#Pronunciation", srcLabel: "Wikipedia / ANSI", cat: "acronym", conf: "contested", notes: "ANSI: \"S-Q-L\". Practitioner: \"sequel\" (heir to IBM SEQUEL)." },
  { w: "GUI", ipa: "/ˈɡuːi/", r: "gooey", aIpa: "/ˌdʒiː juː ˈaɪ/|/ɡwi/", aR: "G U I|gwee", url: "https://en.wikipedia.org/wiki/Graphical_user_interface", srcLabel: "Wikipedia / common usage", cat: "acronym", conf: "contested", notes: "\"GOOEY\" is mainstream (matches Mandarin 故意 sound); \"G-U-I\" letter-by-letter is RMS / old-school; \"gwee\" is rare but exists." },
  { w: "GNU", ipa: "/ɡnuː/", r: "guh new", aIpa: "", aR: "", url: "https://www.gnu.org/gnu/pronunciation.html", srcLabel: "GNU Project official", cat: "project", conf: "creator-clarified", notes: "One syllable, hard G, rhymes with \"new\"." },
  { w: "Kubernetes", ipa: "/ˌkuːbərˈnɛtiːz/", r: "koober netteez", aIpa: "", aR: "", url: "https://kubernetes.io/", srcLabel: "K8s docs", cat: "product", conf: "community-consensus", notes: "\"koo-ber-NET-eez\". From Greek κυβερνήτης (helmsman)." },
  { w: "k8s", ipa: "/keɪts/", r: "kates", aIpa: "/ˌkeɪ eɪ ɛs/", aR: "K eight S", url: "https://kubernetes.io/", srcLabel: "K8s docs", cat: "abbreviation", conf: "community-consensus", notes: "\"kates\" (8 letters between K and s) — community shorthand." },
  { w: "helm", ipa: "/hɛlm/", r: "helm", aIpa: "", aR: "", url: "https://helm.sh/", srcLabel: "Helm docs", cat: "tool", conf: "community-consensus", notes: "\"helm\" (the steering wheel)." },
  { w: "Istio", ipa: "/ˈɪstioʊ/", r: "iss tee oh", aIpa: "", aR: "", url: "https://istio.io/", srcLabel: "Istio docs", cat: "product", conf: "community-consensus", notes: "\"ISS-tee-oh\". Greek for \"to sail\"." },
  { w: "Envoy", ipa: "/ˈɛnˌvɔɪ/", r: "en voy", aIpa: "", aR: "", url: "https://www.envoyproxy.io/", srcLabel: "Envoy docs", cat: "product", conf: "community-consensus", notes: "\"EN-voy\"." },
  { w: "Prometheus", ipa: "/prəˈmiːθiəs/", r: "pro mee thee us", aIpa: "", aR: "", url: "https://prometheus.io/", srcLabel: "Prometheus docs", cat: "product", conf: "community-consensus", notes: "\"pro-MEE-thee-uss\"." },
  { w: "Grafana", ipa: "/ɡrəˈfɑːnə/", r: "gra fah na", aIpa: "", aR: "", url: "https://grafana.com/", srcLabel: "Grafana site", cat: "product", conf: "creator-clarified", notes: "Torkel Ödegaard: \"gra-FAH-na\"." },
  { w: "Terraform", ipa: "/ˈtɛrəˌfɔːrm/", r: "terra form", aIpa: "", aR: "", url: "https://www.terraform.io/", srcLabel: "HashiCorp docs", cat: "tool", conf: "community-consensus", notes: "\"TERR-uh-form\"." },
  { w: "Argo", ipa: "/ˈɑːrɡoʊ/", r: "ar go", aIpa: "", aR: "", url: "https://argoproj.github.io/", srcLabel: "Argo project", cat: "product", conf: "community-consensus", notes: "\"AR-go\"." },
  { w: "Knative", ipa: "/ˈkeɪˌneɪtɪv/", r: "kay native", aIpa: "", aR: "", url: "https://knative.dev/", srcLabel: "Knative docs", cat: "product", conf: "creator-clarified", notes: "\"KAY-native\" — the K is voiced." },
  { w: "Cassandra", ipa: "/kəˈsændrə/", r: "kuh sandra", aIpa: "", aR: "", url: "https://cassandra.apache.org/", srcLabel: "Apache Cassandra", cat: "product", conf: "community-consensus", notes: "\"kuh-SAN-druh\"." },
  { w: "Redis", ipa: "/ˈrɛdɪs/", r: "red iss", aIpa: "", aR: "", url: "https://redis.io/", srcLabel: "Redis site", cat: "product", conf: "creator-clarified", notes: "Salvatore Sanfilippo: \"RED-iss\"." },
  { w: "Ceph", ipa: "/sɛf/", r: "seff", aIpa: "", aR: "", url: "https://ceph.io/en/", srcLabel: "Ceph docs", cat: "product", conf: "creator-clarified", notes: "One syllable: \"seff\"." },
  { w: "etcd", ipa: "/ˌɛt siː ˈdiː/", r: "et C D", aIpa: "/ˌɛt ˈsɛtərə diː/", aR: "et cetera D", url: "https://etcd.io/docs/v3.5/faq/", srcLabel: "etcd FAQ", cat: "product", conf: "creator-clarified", notes: "Brandon Philips: \"et-cetera-distributed\" → \"et-cee-dee\"." },
  { w: "containerd", ipa: "/kənˈteɪnər diː/", r: "container D", aIpa: "", aR: "", url: "https://containerd.io/", srcLabel: "containerd", cat: "product", conf: "creator-clarified", notes: "\"container-D\" (the D is for \"daemon\")." },
  { w: "runc", ipa: "/rʌn ˈsiː/", r: "run C", aIpa: "", aR: "", url: "https://github.com/opencontainers/runc", srcLabel: "OCI runc", cat: "tool", conf: "community-consensus", notes: "\"run-C\"." },
  { w: "Podman", ipa: "/ˈpɑːdmən/", r: "pod man", aIpa: "", aR: "", url: "https://podman.io/", srcLabel: "Podman site", cat: "tool", conf: "community-consensus", notes: "\"POD-man\"." },
  { w: "PostgreSQL", ipa: "/ˈpoʊstɡrɛs kjuː ˈɛl/", r: "post gress Q L", aIpa: "/ˈpoʊstɡrɛs ˈsiːkwəl/", aR: "post gress sequel", url: "https://www.postgresql.org/docs/current/faq.html", srcLabel: "PostgreSQL FAQ", cat: "product", conf: "creator-clarified", notes: "Official: \"post-gres-Q-L\". \"post-gres-sequel\" common too." },
  { w: "Postgres", ipa: "/ˈpoʊstɡrɛs/", r: "post gress", aIpa: "", aR: "", url: "https://www.postgresql.org/docs/current/faq.html", srcLabel: "PostgreSQL FAQ", cat: "product", conf: "creator-clarified", notes: "\"POST-gress\"." },
  { w: "SQLite", ipa: "/ˌɛs kjuː ɛl ˈaɪt/", r: "S Q L ite", aIpa: "/ˈsiːkwəl laɪt/", aR: "sequel ite", url: "https://www.sqlite.org/faq.html", srcLabel: "SQLite FAQ", cat: "product", conf: "creator-clarified", notes: "D. Richard Hipp: \"S-Q-L-ite\" preferred." },
  { w: "MySQL", ipa: "/ˌmaɪ ɛs kjuː ˈɛl/", r: "my S Q L", aIpa: "/ˌmaɪ ˈsiːkwəl/", aR: "my sequel", url: "https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html", srcLabel: "MySQL docs", cat: "product", conf: "creator-clarified", notes: "Official: \"my-S-Q-L\". \"my-sequel\" is common informal." },
  { w: "MongoDB", ipa: "/ˈmɒŋɡoʊ diː biː/", r: "mongo D B", aIpa: "", aR: "", url: "https://www.mongodb.com/", srcLabel: "MongoDB site", cat: "product", conf: "community-consensus", notes: "\"MONG-oh-D-B\"." },
  { w: "ScyllaDB", ipa: "/ˈsɪlə diː biː/", r: "silla D B", aIpa: "", aR: "", url: "https://www.scylladb.com/", srcLabel: "ScyllaDB", cat: "product", conf: "community-consensus", notes: "\"SILL-uh-D-B\"." },
  { w: "ClickHouse", ipa: "/ˈklɪkˌhaʊs/", r: "click house", aIpa: "", aR: "", url: "https://clickhouse.com/", srcLabel: "ClickHouse", cat: "product", conf: "community-consensus", notes: "\"CLICK-house\"." },
  { w: "DuckDB", ipa: "/ˈdʌk diː biː/", r: "duck D B", aIpa: "", aR: "", url: "https://duckdb.org/", srcLabel: "DuckDB", cat: "product", conf: "community-consensus", notes: "\"DUCK-D-B\"." },
  { w: "Linux", ipa: "/ˈlɪnəks/", r: "linnix", aIpa: "", aR: "", url: "https://www.youtube.com/watch?v=5IfHm6R5le0", srcLabel: "Linus Torvalds clip", cat: "product", conf: "creator-clarified", notes: "Linus says \"LIN-ux\" (short I, schwa)." },
  { w: "Debian", ipa: "/ˈdɛbiən/", r: "deb ee un", aIpa: "", aR: "", url: "https://www.debian.org/intro/about", srcLabel: "Debian about", cat: "product", conf: "creator-clarified", notes: "\"DEB-ee-uhn\" — portmanteau of Debra + Ian Murdock." },
  { w: "Ubuntu", ipa: "/ʊˈbʊntuː/", r: "oo boon too", aIpa: "", aR: "", url: "https://ubuntu.com/", srcLabel: "Ubuntu", cat: "product", conf: "community-consensus", notes: "\"oo-BOON-too\" (Zulu)." },
  { w: "Arch", ipa: "/ɑːrtʃ/", r: "arch", aIpa: "", aR: "", url: "https://archlinux.org/", srcLabel: "Arch Linux", cat: "product", conf: "community-consensus", notes: "\"arch\" (one syllable)." },
  { w: "Nix", ipa: "/nɪks/", r: "nicks", aIpa: "", aR: "", url: "https://nixos.org/", srcLabel: "NixOS", cat: "product", conf: "community-consensus", notes: "\"nicks\"." },
  { w: "Django", ipa: "/ˈdʒæŋɡoʊ/", r: "jang go", aIpa: "", aR: "", url: "https://www.djangoproject.com/foundation/faq/", srcLabel: "Django FAQ", cat: "product", conf: "creator-clarified", notes: "\"JANG-go\" — silent D, like jazz guitarist Django Reinhardt." },
  { w: "Vue", ipa: "/vjuː/", r: "view", aIpa: "", aR: "", url: "https://vuejs.org/", srcLabel: "Vue docs", cat: "product", conf: "creator-clarified", notes: "Evan You: \"view\" — single syllable." },
  { w: "Vite", ipa: "/viːt/", r: "veet", aIpa: "", aR: "", url: "https://vitejs.dev/", srcLabel: "Vite docs", cat: "product", conf: "creator-clarified", notes: "\"veet\" — French for \"quick\"." },
  { w: "Pydantic", ipa: "/paɪˈdæntɪk/", r: "pie dantick", aIpa: "", aR: "", url: "https://docs.pydantic.dev/", srcLabel: "Pydantic docs", cat: "product", conf: "creator-clarified", notes: "Samuel Colvin: \"pie-DAN-tic\"." },
  { w: "Bun", ipa: "/bʌn/", r: "bun", aIpa: "", aR: "", url: "https://bun.sh/", srcLabel: "Bun docs", cat: "product", conf: "community-consensus", notes: "\"bun\" — like the bread." },
  { w: "Deno", ipa: "/ˈdiːnoʊ/", r: "dee no", aIpa: "", aR: "", url: "https://deno.com/", srcLabel: "Deno docs", cat: "product", conf: "community-consensus", notes: "\"DEE-no\"." },
  { w: "Hugo", ipa: "/ˈhjuːɡoʊ/", r: "hue go", aIpa: "", aR: "", url: "https://gohugo.io/", srcLabel: "Hugo", cat: "product", conf: "community-consensus", notes: "\"HUE-go\"." },
  { w: "Hono", ipa: "/ˈhoʊnoʊ/", r: "ho no", aIpa: "", aR: "", url: "https://hono.dev/", srcLabel: "Hono docs", cat: "product", conf: "creator-clarified", notes: "Japanese for \"flame\": \"HOH-no\"." },
  { w: "Caddy", ipa: "/ˈkædi/", r: "caddy", aIpa: "", aR: "", url: "https://caddyserver.com/", srcLabel: "Caddy", cat: "product", conf: "community-consensus", notes: "\"CAD-ee\"." },
  { w: "Svelte", ipa: "/svɛlt/", r: "svelt", aIpa: "", aR: "", url: "https://svelte.dev/", srcLabel: "Svelte", cat: "product", conf: "community-consensus", notes: "\"svelt\" — one syllable." },
  { w: "Astro", ipa: "/ˈæstroʊ/", r: "astro", aIpa: "", aR: "", url: "https://astro.build/", srcLabel: "Astro", cat: "product", conf: "community-consensus", notes: "\"ASS-tro\"." },
  { w: "Pinia", ipa: "/ˈpiːnjə/", r: "pee nya", aIpa: "", aR: "", url: "https://pinia.vuejs.org/", srcLabel: "Pinia docs", cat: "product", conf: "creator-clarified", notes: "\"PEE-nya\"." },
  { w: "LaTeX", ipa: "/ˈleɪtɛk/", r: "lay tek", aIpa: "/ˈlɑːtɛx/", aR: "la tek", url: "https://www.latex-project.org/about/", srcLabel: "LaTeX project", cat: "tool", conf: "creator-clarified", notes: "Lamport: \"lay-tek\" (or \"lah-tek\"); never \"lay-teks\"." },
  { w: "TeX", ipa: "/tɛk/", r: "tek", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/TeX", srcLabel: "Wikipedia / Knuth", cat: "tool", conf: "creator-clarified", notes: "Knuth: like \"tech\" — the X is a Greek chi." },
  { w: "char", ipa: "/tʃɑːr/", r: "char", aIpa: "/kɛər/|/kɑːr/", aR: "care|car", url: "https://stackoverflow.com/q/95773/", srcLabel: "StackOverflow C++ debate", cat: "cs-term", conf: "contested", notes: "\"char\" (rhymes with \"car\") in C/C++ camp; \"care\" and \"kar\" also used." },
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
  { w: "SaaS", ipa: "/sæs/", r: "sass", aIpa: "", aR: "", url: "dev community", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"sass\"." },
  { w: "PaaS", ipa: "/pæs/", r: "pass", aIpa: "", aR: "", url: "dev community", srcLabel: "", cat: "acronym", conf: "community-consensus", notes: "\"pass\"." },
  { w: "Numpy", ipa: "/ˈnʌmpaɪ/", r: "num pie", aIpa: "", aR: "", url: "https://numpy.org/", srcLabel: "NumPy docs", cat: "product", conf: "creator-clarified", notes: "\"NUM-pie\"." },
  { w: "SciPy", ipa: "/ˈsaɪpaɪ/", r: "sigh pie", aIpa: "", aR: "", url: "https://scipy.org/", srcLabel: "SciPy docs", cat: "product", conf: "community-consensus", notes: "\"SIGH-pie\"." },
  { w: "Jupyter", ipa: "/ˈdʒuːpɪtər/", r: "joo pi ter", aIpa: "", aR: "", url: "https://jupyter.org/", srcLabel: "Jupyter docs", cat: "product", conf: "community-consensus", notes: "\"JOO-pi-tur\" — named after Jupiter (planet) + Julia, Python, R." },
  { w: "pandas", ipa: "/ˈpændəz/", r: "pandas", aIpa: "", aR: "", url: "https://pandas.pydata.org/", srcLabel: "pandas docs", cat: "product", conf: "community-consensus", notes: "\"PAN-duhz\"." },
  { w: "PyTorch", ipa: "/ˈpaɪtɔːrtʃ/", r: "pie torch", aIpa: "", aR: "", url: "https://pytorch.org/", srcLabel: "PyTorch", cat: "product", conf: "community-consensus", notes: "\"PIE-torch\"." },
  { w: "NaN", ipa: "/næn/", r: "nan", aIpa: "/ˌɛn eɪ ˈɛn/", aR: "N A N", url: "", srcLabel: "IEEE 754 community", cat: "cs-term", conf: "contested", notes: "\"nan\" (rhymes with \"can\") or \"N-A-N\"." },
  { w: "enum", ipa: "/ˈiːnəm/", r: "ee num", aIpa: "", aR: "", url: "dev community", srcLabel: "", cat: "cs-term", conf: "community-consensus", notes: "\"EE-num\"." },
  { w: "Anthropic", ipa: "/æn̩ˈθrɒpɪk/", r: "an thraw pick", aIpa: "", aR: "", url: "https://www.anthropic.com/", srcLabel: "Anthropic", cat: "product", conf: "community-consensus", notes: "\"an-THROP-ick\" (or \"an-THROW-pick\"). Creator of Claude." },
  { w: "OpenAI", ipa: "/ˈoʊpən eɪ aɪ/", r: "open A I", aIpa: "", aR: "", url: "https://openai.com/", srcLabel: "OpenAI", cat: "product", conf: "community-consensus", notes: "\"OH-pen A-I\" letter-by-letter." },
  { w: "Claude", ipa: "/klɔːd/", r: "clawed", aIpa: "", aR: "", url: "https://www.anthropic.com/claude", srcLabel: "Anthropic", cat: "product", conf: "creator-clarified", notes: "One syllable, rhymes with \"fraud\". Anthropic's LLM." },
  { w: "Cohere", ipa: "/koʊˈhɪər/", r: "co here", aIpa: "", aR: "", url: "https://cohere.com/", srcLabel: "Cohere", cat: "product", conf: "community-consensus", notes: "\"co-HEER\", like the verb \"cohere\"." },
  { w: "Mistral", ipa: "/mɪˈstrɑːl/", r: "mis traal", aIpa: "", aR: "", url: "https://mistral.ai/", srcLabel: "Mistral AI", cat: "product", conf: "community-consensus", notes: "\"miss-TRAL\" (French style; like the wind)." },
  { w: "Ollama", ipa: "/oʊˈlɑːmə/", r: "oh la ma", aIpa: "", aR: "", url: "https://ollama.com/", srcLabel: "Ollama project", cat: "product", conf: "creator-clarified", notes: "\"oh-LAH-mah\"." },
  { w: "LangChain", ipa: "/ˈlæŋtʃeɪn/", r: "lang chain", aIpa: "", aR: "", url: "https://www.langchain.com/", srcLabel: "LangChain", cat: "product", conf: "community-consensus", notes: "\"LANG-chain\"." },
  { w: "LlamaIndex", ipa: "/ˈlɑːməˌɪndɛks/", r: "llama index", aIpa: "", aR: "", url: "https://www.llamaindex.ai/", srcLabel: "LlamaIndex", cat: "product", conf: "community-consensus", notes: "\"LLAH-mah index\"." },
  { w: "HuggingFace", ipa: "/ˈhʌɡɪŋˌfeɪs/", r: "hugging face", aIpa: "", aR: "", url: "https://huggingface.co/", srcLabel: "Hugging Face", cat: "product", conf: "community-consensus", notes: "\"HUGGING face\". Yes — like the emoji." },
  { w: "vLLM", ipa: "/ˌviː ɛl ɛl ˈɛm/", r: "V L L M", aIpa: "", aR: "", url: "https://github.com/vllm-project/vllm", srcLabel: "vLLM", cat: "product", conf: "community-consensus", notes: "\"V-L-L-M\" letter-by-letter." },
  { w: "JAX", ipa: "/dʒæks/", r: "jacks", aIpa: "", aR: "", url: "https://jax.readthedocs.io/", srcLabel: "JAX docs", cat: "product", conf: "community-consensus", notes: "\"jacks\", one syllable. Google's autograd library." },
  { w: "Mojo", ipa: "/ˈmoʊdʒoʊ/", r: "mo jo", aIpa: "", aR: "", url: "https://www.modular.com/mojo", srcLabel: "Modular", cat: "product", conf: "community-consensus", notes: "\"MOH-joe\"." },
  { w: "DSPy", ipa: "/ˌdiː ɛs ˈpaɪ/", r: "D S pie", aIpa: "", aR: "", url: "https://dspy.ai/", srcLabel: "DSPy", cat: "product", conf: "creator-clarified", notes: "\"D-S-py\" — Stanford framework." },
  { w: "Pinecone", ipa: "/ˈpaɪnˌkoʊn/", r: "pine cone", aIpa: "", aR: "", url: "https://www.pinecone.io/", srcLabel: "Pinecone", cat: "product", conf: "community-consensus", notes: "\"PINE-cone\". Vector DB." },
  { w: "Weaviate", ipa: "/ˈwiːviˌeɪt/", r: "wee vee ate", aIpa: "", aR: "", url: "https://weaviate.io/", srcLabel: "Weaviate", cat: "product", conf: "creator-clarified", notes: "\"WEE-vee-ate\" per founder Bob van Luijt." },
  { w: "Milvus", ipa: "/ˈmɪlvəs/", r: "mill vus", aIpa: "", aR: "", url: "https://milvus.io/", srcLabel: "Milvus", cat: "product", conf: "community-consensus", notes: "\"MILL-vuhs\"." },
  { w: "Qdrant", ipa: "/ˈkwɒdrənt/", r: "quadrant", aIpa: "", aR: "", url: "https://qdrant.tech/", srcLabel: "Qdrant", cat: "product", conf: "creator-clarified", notes: "\"QUADRANT\" per project FAQ." },
  { w: "Chroma", ipa: "/ˈkroʊmə/", r: "chroma", aIpa: "", aR: "", url: "https://www.trychroma.com/", srcLabel: "Chroma", cat: "product", conf: "community-consensus", notes: "\"KROH-mah\". Vector DB." },
  { w: "Modal", ipa: "/ˈmoʊdl̩/", r: "moh dl", aIpa: "", aR: "", url: "https://modal.com/", srcLabel: "Modal", cat: "product", conf: "community-consensus", notes: "\"MOH-dul\"." },
  { w: "Replicate", ipa: "/ˈrɛplɪˌkeɪt/", r: "rep li kate", aIpa: "", aR: "", url: "https://replicate.com/", srcLabel: "Replicate", cat: "product", conf: "community-consensus", notes: "\"REP-li-kate\"." },
  { w: "Next.js", ipa: "/ˈnɛkst dʒeɪ ɛs/", r: "next J S", aIpa: "", aR: "", url: "https://nextjs.org/", srcLabel: "Vercel", cat: "product", conf: "community-consensus", notes: "\"NEXT-J-S\"." },
  { w: "Nuxt", ipa: "/nʌkst/", r: "nukst", aIpa: "", aR: "", url: "https://nuxt.com/", srcLabel: "Nuxt", cat: "product", conf: "community-consensus", notes: "\"nukst\" — one syllable." },
  { w: "Remix", ipa: "/ˈriːmɪks/", r: "ree mix", aIpa: "", aR: "", url: "https://remix.run/", srcLabel: "Remix", cat: "product", conf: "community-consensus", notes: "\"REE-mix\"." },
  { w: "Qwik", ipa: "/kwɪk/", r: "quick", aIpa: "", aR: "", url: "https://qwik.dev/", srcLabel: "Qwik", cat: "product", conf: "creator-clarified", notes: "\"quick\" — yes, intentional. Misko Hevery." },
  { w: "SolidJS", ipa: "/ˈsɒlɪd dʒeɪ ɛs/", r: "solid J S", aIpa: "", aR: "", url: "https://www.solidjs.com/", srcLabel: "SolidJS", cat: "product", conf: "community-consensus", notes: "\"SOLID-J-S\"." },
  { w: "Tailwind", ipa: "/ˈteɪlˌwɪnd/", r: "tail wind", aIpa: "", aR: "", url: "https://tailwindcss.com/", srcLabel: "Tailwind CSS", cat: "product", conf: "community-consensus", notes: "\"TAIL-wind\"." },
  { w: "shadcn", ipa: "/ˌʃæd siː ˈɛn/", r: "shad C N", aIpa: "", aR: "", url: "https://ui.shadcn.com/", srcLabel: "shadcn/ui", cat: "product", conf: "creator-clarified", notes: "\"shad-C-N\" — creator Shadcn says letter-by-letter for \"cn\"." },
  { w: "tRPC", ipa: "/ˌtiː ɑːr piː ˈsiː/", r: "T R P C", aIpa: "", aR: "", url: "https://trpc.io/", srcLabel: "tRPC", cat: "product", conf: "community-consensus", notes: "\"T-R-P-C\"." },
  { w: "Zod", ipa: "/zɒd/", r: "zod", aIpa: "", aR: "", url: "https://zod.dev/", srcLabel: "Zod", cat: "product", conf: "community-consensus", notes: "\"zod\" — one syllable." },
  { w: "Zustand", ipa: "/ˈtsuːʃtʌnt/", r: "tsu shtund", aIpa: "", aR: "", url: "https://zustand.docs.pmnd.rs/", srcLabel: "Poimandres", cat: "product", conf: "creator-clarified", notes: "German for \"state\": \"TSOO-shtund\" (most common in English: \"ZOO-stund\")." },
  { w: "Drizzle", ipa: "/ˈdrɪzəl/", r: "drizzle", aIpa: "", aR: "", url: "https://orm.drizzle.team/", srcLabel: "Drizzle ORM", cat: "product", conf: "community-consensus", notes: "\"DRIZ-l\"." },
  { w: "Prisma", ipa: "/ˈprɪzmə/", r: "prizma", aIpa: "", aR: "", url: "https://www.prisma.io/", srcLabel: "Prisma", cat: "product", conf: "community-consensus", notes: "\"PRIZ-muh\"." },
  { w: "NestJS", ipa: "/ˌnɛst dʒeɪ ˈɛs/", r: "nest J S", aIpa: "", aR: "", url: "https://nestjs.com/", srcLabel: "NestJS", cat: "product", conf: "community-consensus", notes: "\"NEST-J-S\"." },
  { w: "FastAPI", ipa: "/ˌfæst eɪ piː ˈaɪ/", r: "fast A P I", aIpa: "", aR: "", url: "https://fastapi.tiangolo.com/", srcLabel: "FastAPI", cat: "product", conf: "community-consensus", notes: "\"fast-A-P-I\"." },
  { w: "Hono", ipa: "/ˈhoʊnoʊ/", r: "ho no", aIpa: "", aR: "", url: "https://hono.dev/", srcLabel: "Hono", cat: "product", conf: "creator-clarified", notes: "(See earlier entry.)" },
  { w: "Vercel", ipa: "/vɜːrˈsɛl/", r: "ver SELL", aIpa: "", aR: "", url: "https://vercel.com/", srcLabel: "Vercel", cat: "product", conf: "creator-clarified", notes: "\"vur-SELL\" per founder Guillermo Rauch." },
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
  { w: "Cilium", ipa: "/ˈsɪliəm/", r: "silly um", aIpa: "", aR: "", url: "https://cilium.io/", srcLabel: "Cilium", cat: "product", conf: "creator-clarified", notes: "\"SIL-ee-um\" — Latin for eyelash." },
  { w: "Linkerd", ipa: "/ˈlɪŋkərdiː/", r: "linker D", aIpa: "", aR: "", url: "https://linkerd.io/", srcLabel: "Linkerd", cat: "product", conf: "creator-clarified", notes: "\"LINKER-D\"." },
  { w: "Crossplane", ipa: "/ˈkrɒsˌpleɪn/", r: "cross plane", aIpa: "", aR: "", url: "https://www.crossplane.io/", srcLabel: "Crossplane", cat: "product", conf: "community-consensus", notes: "\"CROSS-plane\"." },
  { w: "Karpenter", ipa: "/ˈkɑːrpəntər/", r: "carpenter", aIpa: "", aR: "", url: "https://karpenter.sh/", srcLabel: "Karpenter", cat: "product", conf: "community-consensus", notes: "\"CARPENTER\" — like the trade." },
  { w: "Velero", ipa: "/vəˈlɛəroʊ/", r: "veh lair oh", aIpa: "", aR: "", url: "https://velero.io/", srcLabel: "Velero", cat: "product", conf: "community-consensus", notes: "\"vuh-LAIR-oh\"." },
  { w: "Falco", ipa: "/ˈfælkoʊ/", r: "fal co", aIpa: "", aR: "", url: "https://falco.org/", srcLabel: "Falco", cat: "product", conf: "community-consensus", notes: "\"FAL-co\"." },
  { w: "Trivy", ipa: "/ˈtrɪvi/", r: "trivy", aIpa: "", aR: "", url: "https://trivy.dev/", srcLabel: "Trivy", cat: "product", conf: "creator-clarified", notes: "\"TRIV-ee\" per Aqua Security docs." },
  { w: "Kyverno", ipa: "/kaɪˈvɜːrnoʊ/", r: "kai verno", aIpa: "", aR: "", url: "https://kyverno.io/", srcLabel: "Kyverno", cat: "product", conf: "community-consensus", notes: "\"kai-VER-no\"." },
  { w: "OPA", ipa: "/ˌoʊ piː ˈeɪ/", r: "O P A", aIpa: "", aR: "", url: "https://www.openpolicyagent.org/", srcLabel: "OPA project", cat: "abbreviation", conf: "community-consensus", notes: "\"O-P-A\" letter-by-letter." },
  { w: "ArgoCD", ipa: "/ˈɑːrɡoʊ siː diː/", r: "argo C D", aIpa: "", aR: "", url: "https://argoproj.github.io/cd/", srcLabel: "Argo CD", cat: "product", conf: "community-consensus", notes: "\"AR-go-C-D\"." },
  { w: "FluxCD", ipa: "/ˈflʌks siː diː/", r: "flux C D", aIpa: "", aR: "", url: "https://fluxcd.io/", srcLabel: "Flux CD", cat: "product", conf: "community-consensus", notes: "\"FLUX-C-D\"." },
  { w: "Tekton", ipa: "/ˈtɛktən/", r: "tek ton", aIpa: "", aR: "", url: "https://tekton.dev/", srcLabel: "Tekton", cat: "product", conf: "community-consensus", notes: "\"TEK-tun\"." },
  { w: "Neovim", ipa: "/ˈniːoʊˌvɪm/", r: "nee oh vim", aIpa: "", aR: "", url: "https://neovim.io/faq/", srcLabel: "Neovim FAQ", cat: "tool", conf: "creator-clarified", notes: "Project FAQ: \"NEE-oh-vim\" (not \"NAY-oh-vim\")." },
  { w: "Helix", ipa: "/ˈhiːlɪks/", r: "hee licks", aIpa: "", aR: "", url: "https://helix-editor.com/", srcLabel: "Helix", cat: "tool", conf: "community-consensus", notes: "\"HEE-licks\"." },
  { w: "Zed", ipa: "/zɛd/", r: "zed", aIpa: "", aR: "", url: "https://zed.dev/", srcLabel: "Zed", cat: "tool", conf: "community-consensus", notes: "\"zed\" — the letter." },
  { w: "Cursor", ipa: "/ˈkɜːrsər/", r: "cur sir", aIpa: "", aR: "", url: "https://cursor.com/", srcLabel: "Cursor", cat: "tool", conf: "community-consensus", notes: "\"CUR-sir\"." },
  { w: "IntelliJ", ipa: "/ɪnˈtɛlədʒeɪ/", r: "in tell i J", aIpa: "", aR: "", url: "https://www.jetbrains.com/idea/", srcLabel: "JetBrains", cat: "tool", conf: "community-consensus", notes: "\"in-TELL-i-J\"." },
  { w: "ripgrep", ipa: "/ˈrɪpɡrɛp/", r: "rip grep", aIpa: "", aR: "", url: "https://github.com/BurntSushi/ripgrep", srcLabel: "BurntSushi", cat: "tool", conf: "creator-clarified", notes: "\"RIP-grep\" (the `rg` command)." },
  { w: "fzf", ipa: "/ˌɛf ziː ˈɛf/", r: "F Z F", aIpa: "", aR: "", url: "https://github.com/junegunn/fzf", srcLabel: "junegunn/fzf", cat: "tool", conf: "community-consensus", notes: "\"F-Z-F\" letter-by-letter." },
  { w: "eza", ipa: "/ˈiːzə/", r: "ee zah", aIpa: "", aR: "", url: "https://eza.rocks/", srcLabel: "eza", cat: "tool", conf: "community-consensus", notes: "\"EE-zah\" (ls replacement)." },
  { w: "k9s", ipa: "/ˈkeɪ naɪnz/", r: "K nines", aIpa: "", aR: "", url: "https://k9scli.io/", srcLabel: "k9s", cat: "tool", conf: "community-consensus", notes: "\"K-nines\" — K8s TUI." },
  { w: "k3s", ipa: "/ˌkeɪ θriː ˈɛs/", r: "K three S", aIpa: "", aR: "", url: "https://k3s.io/", srcLabel: "Rancher", cat: "product", conf: "community-consensus", notes: "\"K-three-S\" (lightweight K8s)." },
  { w: "Elasticsearch", ipa: "/ɪˈlæstɪkˌsɜːrtʃ/", r: "elastic search", aIpa: "", aR: "", url: "https://www.elastic.co/", srcLabel: "Elastic", cat: "product", conf: "community-consensus", notes: "\"e-LAS-tic-search\"." },
  { w: "Lucene", ipa: "/luːˈsiːn/", r: "loo seen", aIpa: "", aR: "", url: "https://lucene.apache.org/", srcLabel: "Apache Lucene", cat: "product", conf: "community-consensus", notes: "\"loo-SEEN\"." },
  { w: "Solr", ipa: "/ˈsɒlər/", r: "sol er", aIpa: "", aR: "", url: "https://solr.apache.org/", srcLabel: "Apache Solr", cat: "product", conf: "community-consensus", notes: "\"SOL-er\"." },
  { w: "Meilisearch", ipa: "/ˌmeɪli ˈsɜːrtʃ/", r: "may lee search", aIpa: "", aR: "", url: "https://www.meilisearch.com/", srcLabel: "Meilisearch", cat: "product", conf: "creator-clarified", notes: "\"MAY-lee-search\"." },
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
  { w: "Clojure", ipa: "/ˈkloʊʒər/", r: "closure", aIpa: "", aR: "", url: "https://clojure.org/", srcLabel: "Clojure", cat: "product", conf: "creator-clarified", notes: "Rich Hickey: sounds like \"closure\"." },
  { w: "OCaml", ipa: "/oʊˈkæməl/", r: "oh camel", aIpa: "", aR: "", url: "https://ocaml.org/", srcLabel: "OCaml", cat: "product", conf: "community-consensus", notes: "\"OH-camel\"." },
  { w: "Lua", ipa: "/ˈluːə/", r: "loo ah", aIpa: "", aR: "", url: "https://www.lua.org/", srcLabel: "Lua", cat: "product", conf: "creator-clarified", notes: "\"LOO-ah\" — Portuguese for \"moon\"." },
  { w: "Zig", ipa: "/zɪɡ/", r: "zig", aIpa: "", aR: "", url: "https://ziglang.org/", srcLabel: "Zig", cat: "product", conf: "community-consensus", notes: "\"zig\" — one syllable." },
  { w: "uv", ipa: "/ˌjuː ˈviː/", r: "you V", aIpa: "", aR: "", url: "https://github.com/astral-sh/uv", srcLabel: "Astral", cat: "tool", conf: "community-consensus", notes: "\"U-V\" — Astral's Python installer/resolver." },
  { w: "ruff", ipa: "/rʌf/", r: "ruff", aIpa: "", aR: "", url: "https://docs.astral.sh/ruff/", srcLabel: "Astral", cat: "tool", conf: "community-consensus", notes: "\"ruff\" — like a dog bark." },
  { w: "mypy", ipa: "/ˈmaɪpaɪ/", r: "my pie", aIpa: "", aR: "", url: "https://mypy.readthedocs.io/", srcLabel: "mypy", cat: "tool", conf: "creator-clarified", notes: "\"MY-pie\" — Python type checker." },
  { w: "Biome", ipa: "/baɪˈoʊm/", r: "bye ohm", aIpa: "", aR: "", url: "https://biomejs.dev/", srcLabel: "Biome", cat: "tool", conf: "community-consensus", notes: "\"BYE-ohm\"." },
  { w: "Bazel", ipa: "/ˈbeɪzəl/", r: "bay zel", aIpa: "", aR: "", url: "https://bazel.build/", srcLabel: "Bazel", cat: "tool", conf: "community-consensus", notes: "\"BAY-zel\"." },
  { w: "Gradle", ipa: "/ˈɡreɪdəl/", r: "gray del", aIpa: "", aR: "", url: "https://gradle.org/", srcLabel: "Gradle", cat: "tool", conf: "community-consensus", notes: "\"GRAY-del\"." },
  { w: "Cargo", ipa: "/ˈkɑːrɡoʊ/", r: "car go", aIpa: "", aR: "", url: "https://doc.rust-lang.org/cargo/", srcLabel: "Rust", cat: "tool", conf: "community-consensus", notes: "\"CAR-go\" — Rust's package manager." },
  { w: "pnpm", ipa: "/ˌpiː ɛn piː ˈɛm/", r: "P N P M", aIpa: "", aR: "", url: "https://pnpm.io/", srcLabel: "pnpm", cat: "tool", conf: "community-consensus", notes: "\"P-N-P-M\" letter-by-letter." },
  { w: "nmap", ipa: "/ˈɛnˌmæp/", r: "en map", aIpa: "", aR: "", url: "https://nmap.org/", srcLabel: "Nmap", cat: "tool", conf: "creator-clarified", notes: "\"EN-map\" per Fyodor (creator)." },
  { w: "curl", ipa: "/kɜːrl/", r: "curl", aIpa: "", aR: "", url: "https://curl.se/", srcLabel: "curl", cat: "tool", conf: "creator-clarified", notes: "\"curl\" — one syllable, per Daniel Stenberg." },
  { w: "wget", ipa: "/ˈdʌbljuː ɡɛt/", r: "double-you get", aIpa: "", aR: "", url: "https://www.gnu.org/software/wget/", srcLabel: "GNU Wget", cat: "tool", conf: "community-consensus", notes: "\"W-get\" (double-you-get)." },
  { w: "SSH", ipa: "/ˌɛs ɛs ˈeɪtʃ/", r: "S S H", aIpa: "", aR: "", url: "https://en.wikipedia.org/wiki/Secure_Shell", srcLabel: "Wikipedia", cat: "abbreviation", conf: "community-consensus", notes: "\"S-S-H\" letter-by-letter." },
  { w: "rsync", ipa: "/ˈɑːrˌsɪŋk/", r: "R sync", aIpa: "", aR: "", url: "https://rsync.samba.org/", srcLabel: "rsync", cat: "tool", conf: "community-consensus", notes: "\"R-sync\"." },
  { w: "htop", ipa: "/ˈeɪtʃˌtɒp/", r: "H top", aIpa: "", aR: "", url: "https://htop.dev/", srcLabel: "htop", cat: "tool", conf: "community-consensus", notes: "\"H-top\"." },
];

// Reproduce say-it's audible behavior:
//   primary × N reps + " or: <alt>." for each alternate (each said once).
// If --solo equivalent ('solo' arg) is true, skip the chain.
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
      const altReps = Array(repsEach).fill(a).join('. ');
      body += ' or: ' + altReps + '.';
    }
  }
  return body;
}

let CURRENT_UTTER = null;
function speakBody(text) {
  if (!('speechSynthesis' in window)) {
    alert("Your browser doesn't support speech synthesis. Try Safari or Chrome.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  // Try to pick a US English voice; fall back to default.
  const voices = speechSynthesis.getVoices();
  const us = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
  if (us) u.voice = us;
  u.rate = 1.0;
  u.lang = 'en-US';
  CURRENT_UTTER = u;
  speechSynthesis.speak(u);
}

function play(idx, opts) {
  const entry = ENTRIES[idx];
  const body = buildBody(entry, opts || {});
  if (!body) return;
  speakBody(body);
}

function badge(text, kind) {
  return `<span class="badge badge-${kind}">${text}</span>`;
}

function escHTML(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
          <button class="play-btn play-alt" onclick="play(${idx}, {altIdx: ${i}})" aria-label="Play alternate ${i+1}">▶</button>
          <span class="alt-label">or:</span>
          <span class="alt-resp">${escHTML(a)}</span>
          ${aip ? `<span class="ipa-small">${escHTML(aip)}</span>` : ''}
        </div>`;
    });
    altsHtml += '</div>';
  }

  const confBadge = badge(e.conf, e.conf);
  const catBadge = badge(e.cat, 'cat');

  let sourceHtml = '';
  if (e.url) {
    sourceHtml = `<div class="source">📎 <a href="${escHTML(e.url)}" target="_blank" rel="noopener">${escHTML(e.srcLabel || e.url)}</a></div>`;
  }

  return `
    <article class="entry" id="${escHTML(e.w)}" data-cat="${escHTML(e.cat)}" data-conf="${escHTML(e.conf)}">
      <header class="entry-header">
        <h3 class="word">${escHTML(e.w)}</h3>
        <div class="entry-badges">${catBadge}${confBadge}</div>
      </header>
      <div class="primary-row">
        <button class="play-btn play-primary" onclick="play(${idx})" aria-label="Play primary reading">▶</button>
        <span class="resp">${escHTML(e.r)}</span>
        <span class="ipa">${escHTML(e.ipa)}</span>
      </div>
      ${altsHtml}
      ${e.notes ? `<p class="notes">${escHTML(e.notes)}</p>` : ''}
      ${sourceHtml}
    </article>`;
}

function init() {
  // Force voices to load (some browsers need a hint).
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  const container = document.getElementById('entries');
  container.innerHTML = ENTRIES.map((e, i) => renderEntry(e, i)).join('\n');

  const counter = document.getElementById('counter');
  if (counter) counter.textContent = ENTRIES.length;

  // Filter
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
}

document.addEventListener('DOMContentLoaded', init);
