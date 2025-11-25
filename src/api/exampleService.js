const DEFAULT_API = "https://newsdata.io/api/1/latest";
const DEFAULT_KEY = "pub_f845aebedecf4ac98835cb7fb66eea32"; 
const FALLBACK_KEY = DEFAULT_KEY;

function normalizeResponse(json) {
  if (!json) return { totalArticles: 0, articles: [] };
  if (Array.isArray(json)) return { totalArticles: json.length, articles: json };
  if (json.results && Array.isArray(json.results)) return { totalArticles: json.totalResults ?? json.results.length, articles: json.results };
  if (json.articles && Array.isArray(json.articles)) return { totalArticles: json.totalArticles ?? json.articles.length, articles: json.articles };
  if (json.data && Array.isArray(json.data)) return { totalArticles: json.total ?? json.data.length, articles: json.data };
  return { totalArticles: json.total ?? json.count ?? 0, articles: json.items ?? [] };
}

const PROVIDED_SAMPLE_RAW = [
 
  {
    article_id: "be758811ab068f5bae89f4e3b4bc2f65",
    link: "https://tribunaonline.com.br/policia/es-investe-em-dois-novos-programas-com-uso-de-tecnologia-para-...",
    title: "ES investe em dois novos programas com uso de tecnologia para a segurança pública",
    description: "Programas visam proteção de vítimas de violência doméstica e redução da criminalidade| Foto:...",
    content: "ONLY AVAILABLE IN PAID PLANS",
    creator: ["Layna Cruz"],
    language: "portuguese",
    country: ["brazil"],
    category: ["lifestyle","top"],
    pubDate: "2025-11-14 11:17:30",
    pubDateTZ: "UTC",
    image_url: "https://cdn2.tribunaonline.com.br/img/Artigo-Destaque/280000/ES-investe-em-dois-novos-programas-com...",
    source_id: "tribunaonline_br",
    source_name: "Tribuna Online",
    source_url: "https://tribunaonline.com.br",
    source_icon: "https://n.bytvi.com/tribunaonline_br.png"
  },
  {
    article_id: "56033f8cb8d701d9d60db6c2b1ceaf91",
    link: "https://g1.globo.com/am/amazonas/noticia/2025/11/14/pib-do-amazonas-apresenta-crescimento-de-2perce...",
    title: "PIB do Amazonas apresenta crescimento de 2% e estado é a 16a maior economia do país",
    description: "Movimento no comércio de Manaus Marcelo Camargo/Agência BrasilO Produto Interno Bruto (PIB) do Am...",
    content: "ONLY AVAILABLE IN PAID PLANS",
    creator: null,
    language: "portuguese",
    country: ["brazil"],
    category: ["lifestyle","top"],
    pubDate: "2025-11-14 11:17:26",
    pubDateTZ: "UTC",
    image_url: "https://s2-g1.glbimg.com/x757iBLF_GbNDz3BAKH8AFwWovs=/1280x0/filters:format(jpeg)/https://s01.video...",
    source_id: "g1globo",
    source_name: "G1 - O Portal",
    source_url: "https://g1.globo.com",
    source_icon: "https://n.bytvi.com/g1globo.png"
  },
  {
    article_id: "b4e280e9e3f179f3c1dc7191816567d8",
    link: "https://www.iprofesional.com/tecnologia/441933-gemini-la-revolucion-de-google-en-compras-online-con...",
    title: "Tu próximo par de zapatillas lo elegirá la inteligencia artificial de Google",
    description: "Las funciones avanzadas de este agente de compras impulsado por Gemini no están disponibles en la ...",
    content: "ONLY AVAILABLE IN PAID PLANS",
    creator: ["César Dergarabedian"],
    language: "spanish",
    country: ["argentina"],
    category: ["lifestyle","top"],
    pubDate: "2025-11-14 11:16:00",
    pubDateTZ: "UTC",
    image_url: "https://resizer.iproimg.com/unsafe/640x/https://assets.iprofesional.com/assets/jpg/2024/05/572801.j...",
    source_id: "iprofesional",
    source_name: "Iprofesional",
    source_url: "https://www.iprofesional.com",
    source_icon: "https://n.bytvi.com/iprofesional.png"
  },
  {
    article_id: "387ad843138bd5edc093ef953e19b4a4",
    link: "https://www.terra.com.br/esportes/futebol/tv-aberta-supera-de-longe-o-streaming-na-preferencia-dos-...",
    title: "TV aberta supera, de longe, o streaming na preferência dos brasileiros fãs de futebol, diz pesqui...",
    description: "Uma pesquisa feita pela empresa \"Nexus\", encomendada pela Confederação Brasileira de Futebol ...",
    content: "ONLY AVAILABLE IN PAID PLANS",
    creator: ["Estadão Conteúdo"],
    language: "portuguese",
    country: ["brazil"],
    category: ["sports"],
    pubDate: "2025-11-14 11:15:55",
    pubDateTZ: "UTC",
    image_url: "https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2025/11/14/209074950-mcftjuuhsf...",
    source_id: "terra",
    source_name: "Terra",
    source_url: "https://www.terra.com.br",
    source_icon: "https://n.bytvi.com/terra.png"
  },
  {
    article_id: "fc3b63a7a8dd4cc06c5e875aee920114",
    link: "https://oantagonista.com.br/ladooa/tecnologia/o-que-e-phishing-e-como-evitar-cair-em-links-falsos-e...",
    title: "O que é phishing e como evitar cair em links falsos enviados por mensagem",
    description: "Você já recebeu uma mensagem com um link suspeito pedindo para confirmar dados ou acessar uma con...",
    content: "ONLY AVAILABLE IN PAID PLANS",
    creator: ["José Dantas"],
    language: "portuguese",
    country: ["brazil"],
    category: ["lifestyle","top"],
    pubDate: "2025-11-14 11:14:00",
    pubDateTZ: "UTC",
    image_url: "https://cdn.oantagonista.com/uploads/2025/11/phishing-_1762954068589.jpg",
    source_id: "oantagonista",
    source_name: "O Antagonista",
    source_url: "https://oantagonista.com",
    source_icon: "https://n.bytvi.com/oantagonista.png"
  }
];

function transformRawToArticle(r) {
  const publishedAt = r.pubDateTZ && r.pubDateTZ.toUpperCase().includes("UTC")
    ? new Date(r.pubDate + "Z").toISOString()
    : (r.pubDate ? new Date(r.pubDate).toISOString() : new Date().toISOString());

  return {
    id: r.article_id,
    title: r.title,
    description: r.description,
    content: r.content,
    url: r.link,
    image: r.image_url,
    publishedAt,
    lang: r.language,
    source: {
      id: r.source_id,
      name: r.source_name,
      url: r.source_url,
      icon: r.source_icon
    }
  };
}

export async function fetchNews(limit = 5) {
  const API_URL = import.meta.env.VITE_NEWS_API_URL || DEFAULT_API;
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY || FALLBACK_KEY;

  
  try {
    const url = new URL(API_URL);
    if (API_URL === DEFAULT_API) {
      url.searchParams.set("apikey", API_KEY);
      url.searchParams.set("q", "Tecnologia");
      url.searchParams.set("language", "en,es,pt,it");
      url.searchParams.set("page", "1");
      url.searchParams.set("category", "technology");
    }

    console.log("[fetchNews] URL ->", url.toString());
    let res = await fetch(url.toString(), {
      headers: { "Accept": "application/json" }
    });

    console.log("[fetchNews] status", res.status);
    if (!res.ok) {
      const text = await res.clone().text().catch(()=>null);
      console.warn("[fetchNews] response body (error):", text);
    }

    if (!res.ok) {
    
      const urlWithKey = new URL(url.toString());
      if (!urlWithKey.searchParams.has("apikey") && API_KEY) urlWithKey.searchParams.set("apikey", API_KEY);
      res = await fetch(urlWithKey.toString(), { headers: { "Accept": "application/json" } });
    }

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const json = await res.json();
    
    let normalized = normalizeResponse(json);

   
    const rawArticles = normalized.articles || [];
    const transformed = rawArticles.map(item => {
      
      if (item.article_id || item.link) {
        return transformRawToArticle(item);
      }
      
      return {
        id: item.id ?? item._id ?? item.article_id ?? String(Math.random()),
        title: item.title ?? item.headline ?? item.name ?? "",
        description: item.description ?? item.summary ?? item.content ?? "",
        content: item.content ?? item.fullText ?? "",
        url: item.link ?? item.url ?? item.source_url ?? "",
        image: item.image_url ?? item.image ?? item.urlToImage ?? "",
        publishedAt: item.pubDate ? new Date(item.pubDate + (item.pubDateTZ && item.pubDateTZ.toUpperCase().includes("UTC") ? "Z" : "")).toISOString() : (item.publishedAt || new Date().toISOString()),
        lang: item.language ?? item.lang ?? "",
        source: {
          id: item.source_id ?? item.source?.id ?? "",
          name: item.source_name ?? item.source?.name ?? item.source?.title ?? "",
          url: item.source_url ?? item.source?.url ?? "",
          icon: item.source_icon ?? item.source?.icon ?? ""
        }
      };
    });

    return {
      totalArticles: normalized.totalArticles ?? transformed.length,
      articles: transformed.slice(0, limit)
    };
  } catch (err) {
    console.warn("fetchNews fallo, usando fallback proporcionado:", err);
    await new Promise(r => setTimeout(r, 150));
    const articles = PROVIDED_SAMPLE_RAW.map(transformRawToArticle).slice(0, limit);
    return { totalArticles: PROVIDED_SAMPLE_RAW.length, articles };
  }
}