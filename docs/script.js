// say-it dictionary — generated from data/pronunciations.tsv. Do not hand-edit.
const ENTRIES = [
  { w: "kubectl", ipa: "/ˈkuːb kənˌtroʊl/", r: "koob control", aIpa: "/ˈkjuːb kʌtəl/|/ˌkjuːb siː tiː ˈɛl/", aR: "cube cuddle|kube C T L", url: "", srcLabel: "", cat: "cli-tool", conf: "contested", notes: "K8s community readings vary widely. \"koob-control\" is heard from Kelsey Hightower and many maintainers; \"cube-cuddle\" is the running meme; some say it letter-by-letter." },
  { w: "nginx", ipa: "/ˈɛn dʒɪnˈɛks/", r: "engine X", aIpa: "", aR: "", url: "https://nginx.org/en/", srcLabel: "NGINX official", cat: "product", conf: "creator-clarified", notes: "\"engine-x\" is the documented reading from the official site." },
  { w: "GIF", ipa: "/dʒɪf/", r: "jif", aIpa: "/ɡɪf/", aR: "gif", url: "https://www.nytimes.com/2013/05/22/business/media/creator-of-the-gif-says-its-pronounced-jif.html", srcLabel: "Steve Wilhite, NYT (2013)", cat: "acronym", conf: "creator-clarified", notes: "Wilhite (creator): \"It's pronounced JIF, not GIF.\" Community remains split." },
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
  { w: "Knative", ipa: "/ˈkeɪˌneɪtɪv/", r: "kay native", aIpa: "", aR: "", url: "https://knative.dev/", srcLabel: "Knative docs", cat: "product", conf: "community-consensus", notes: "\"KAY-native\" — the K is voiced. (Heard from project maintainers in talks; needs a citable source.)" },
  { w: "Cassandra", ipa: "/kəˈsændrə/", r: "kuh sandra", aIpa: "", aR: "", url: "https://cassandra.apache.org/", srcLabel: "Apache Cassandra", cat: "product", conf: "community-consensus", notes: "\"kuh-SAN-druh\"." },
  { w: "Redis", ipa: "/ˈrɛdɪs/", r: "red iss", aIpa: "", aR: "", url: "https://redis.io/", srcLabel: "Redis site", cat: "product", conf: "community-consensus", notes: "\"RED-iss\". (Heard from Salvatore Sanfilippo in interviews; citable source TBD.)" },
  { w: "Ceph", ipa: "/sɛf/", r: "seff", aIpa: "", aR: "", url: "https://ceph.io/en/", srcLabel: "Ceph docs", cat: "product", conf: "community-consensus", notes: "One syllable: \"seff\"." },
  { w: "etcd", ipa: "/ˌɛt siː ˈdiː/", r: "et C D", aIpa: "/ˌɛt ˈsɛtərə diː/", aR: "et cetera D", url: "https://etcd.io/docs/v3.5/faq/", srcLabel: "etcd FAQ", cat: "product", conf: "creator-clarified", notes: "Project FAQ documents \"et-cetera-distributed\"." },
  { w: "containerd", ipa: "/kənˈteɪnər diː/", r: "container D", aIpa: "", aR: "", url: "https://containerd.io/", srcLabel: "containerd", cat: "product", conf: "community-consensus", notes: "\"container-D\" (the D is for \"daemon\")." },
  { w: "runc", ipa: "/rʌn ˈsiː/", r: "run C", aIpa: "", aR: "", url: "https://github.com/opencontainers/runc", srcLabel: "OCI runc", cat: "tool", conf: "community-consensus", notes: "\"run-C\"." },
  { w: "Podman", ipa: "/ˈpɑːdmən/", r: "pod man", aIpa: "", aR: "", url: "https://podman.io/", srcLabel: "Podman site", cat: "tool", conf: "community-consensus", notes: "\"POD-man\"." },
  { w: "PostgreSQL", ipa: "/ˈpoʊstɡrɛs kjuː ˈɛl/", r: "post gress Q L", aIpa: "/ˈpoʊstɡrɛs ˈsiːkwəl/", aR: "post gress sequel", url: "https://www.postgresql.org/docs/current/faq.html", srcLabel: "PostgreSQL FAQ", cat: "product", conf: "creator-clarified", notes: "FAQ documents \"post-gres-Q-L\" as official." },
  { w: "Postgres", ipa: "/ˈpoʊstɡrɛs/", r: "post gress", aIpa: "", aR: "", url: "https://www.postgresql.org/docs/current/faq.html", srcLabel: "PostgreSQL FAQ", cat: "product", conf: "creator-clarified", notes: "\"POST-gress\"." },
  { w: "SQLite", ipa: "/ˌɛs kjuː ɛl ˈaɪt/", r: "S Q L ite", aIpa: "/ˈsiːkwəl laɪt/", aR: "sequel ite", url: "https://www.sqlite.org/famous.html", srcLabel: "SQLite docs", cat: "product", conf: "community-consensus", notes: "\"S-Q-L-ite\" preferred (per project lore)." },
  { w: "MySQL", ipa: "/ˌmaɪ ɛs kjuː ˈɛl/", r: "my S Q L", aIpa: "/ˌmaɪ ˈsiːkwəl/", aR: "my sequel", url: "https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html", srcLabel: "MySQL docs", cat: "product", conf: "creator-clarified", notes: "Official: \"my-S-Q-L\". \"my-sequel\" is common informal." },
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
  { w: "Vue", ipa: "/vjuː/", r: "view", aIpa: "", aR: "", url: "https://vuejs.org/", srcLabel: "Vue docs", cat: "product", conf: "community-consensus", notes: "\"view\" — one syllable. (Heard from Evan You in talks; needs a citable source.)" },
  { w: "Vite", ipa: "/viːt/", r: "veet", aIpa: "", aR: "", url: "https://vitejs.dev/", srcLabel: "Vite docs", cat: "product", conf: "community-consensus", notes: "\"veet\" — French for \"quick\". (Heard from Evan You in talks; needs a citable source.)" },
  { w: "Pydantic", ipa: "/paɪˈdæntɪk/", r: "pie dantick", aIpa: "", aR: "", url: "https://docs.pydantic.dev/", srcLabel: "Pydantic docs", cat: "product", conf: "community-consensus", notes: "\"pie-DAN-tic\". (Heard from Samuel Colvin in podcasts; needs a citable source.)" },
  { w: "Bun", ipa: "/bʌn/", r: "bun", aIpa: "", aR: "", url: "https://bun.sh/", srcLabel: "Bun docs", cat: "product", conf: "community-consensus", notes: "\"bun\" — like the bread." },
  { w: "Deno", ipa: "/ˈdiːnoʊ/", r: "dee no", aIpa: "", aR: "", url: "https://deno.com/", srcLabel: "Deno docs", cat: "product", conf: "community-consensus", notes: "\"DEE-no\"." },
  { w: "Hugo", ipa: "/ˈhjuːɡoʊ/", r: "hue go", aIpa: "", aR: "", url: "https://gohugo.io/", srcLabel: "Hugo", cat: "product", conf: "community-consensus", notes: "\"HUE-go\"." },
  { w: "Hono", ipa: "/ˈhoʊnoʊ/", r: "ho no", aIpa: "", aR: "", url: "https://hono.dev/", srcLabel: "Hono docs", cat: "product", conf: "community-consensus", notes: "Japanese for \"flame\": \"HOH-no\"." },
  { w: "Caddy", ipa: "/ˈkædi/", r: "caddy", aIpa: "", aR: "", url: "https://caddyserver.com/", srcLabel: "Caddy", cat: "product", conf: "community-consensus", notes: "\"CAD-ee\"." },
  { w: "Svelte", ipa: "/svɛlt/", r: "svelt", aIpa: "", aR: "", url: "https://svelte.dev/", srcLabel: "Svelte", cat: "product", conf: "community-consensus", notes: "\"svelt\" — one syllable." },
  { w: "Astro", ipa: "/ˈæstroʊ/", r: "astro", aIpa: "", aR: "", url: "https://astro.build/", srcLabel: "Astro", cat: "product", conf: "community-consensus", notes: "\"ASS-tro\"." },
  { w: "Pinia", ipa: "/ˈpiːnjə/", r: "pee nya", aIpa: "", aR: "", url: "https://pinia.vuejs.org/", srcLabel: "Pinia docs", cat: "product", conf: "community-consensus", notes: "\"PEE-nya\"." },
  { w: "LaTeX", ipa: "/ˈleɪtɛk/", r: "lay tek", aIpa: "/ˈlɑːtɛx/", aR: "la tek", url: "https://www.latex-project.org/about/", srcLabel: "LaTeX project", cat: "tool", conf: "creator-clarified", notes: "Lamport: \"lay-tek\" (or \"lah-tek\"); never \"lay-teks\". Documented on the about page." },
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
  { w: "Lua", ipa: "/ˈluːə/", r: "loo ah", aIpa: "", aR: "", url: "https://www.lua.org/about/", srcLabel: "Lua about", cat: "product", conf: "creator-clarified", notes: "\"LOO-ah\" — Portuguese for \"moon\". Documented on the about page." },
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
  { w: "V", ipa: "/viː/", r: "V", aIpa: "", aR: "", url: "https://vlang.io/", srcLabel: "V (vlang)", cat: "product", conf: "community-consensus", notes: "\"V\" — just the letter." },
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
  { w: "Godot", ipa: "/ˈɡɒdoʊ/", r: "god oh", aIpa: "/ˈɡɒdɒt/", aR: "god ot", url: "https://godotengine.org/", srcLabel: "Godot", cat: "product", conf: "creator-clarified", notes: "\"GOD-oh\" per project FAQ. \"GOD-ot\" also widespread." },
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
