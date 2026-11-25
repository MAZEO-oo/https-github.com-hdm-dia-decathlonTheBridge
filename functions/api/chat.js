/**
 * Cloudflare Pages Function : /api/chat
 * Proxy serveur sécurisé pour interroger Google Gemini ou OpenAI sans exposer de clé côté client.
 * Déployé automatiquement sur Cloudflare Pages si la variable GEMINI_API_KEY est configurée.
 */

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  try {
    const { request, env } = context;
    const body = await request.json();
    const { prompt, history } = body;

    const geminiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
    const openaiKey = env.OPENAI_API_KEY;

    const systemPrompt = `Tu es Max, le conseiller running officiel et chaleureux de Decathlon et The Bridge.
Ton rôle est d'accompagner chaque coureur dans sa pratique sportive, du parfait débutant au marathonien chevronné.

Ton style & ta personnalité :
- Tu es bienveillant, dynamique, passionné et ultra-compétent sur les aspects techniques du running (foulée, amorti, drop, biomécanique, VMA, fractionné, hydratation, ampoules, récupération).
- Tu adoptes un vrai style CONVERSATIONNEL, naturel et humain. Ne pose JAMAIS de questionnaire rigide ou de formulaire à choix multiples rigide. Échange comme un vrai conseiller en magasin Decathlon qui prend le temps d'écouter son client.
- Si la demande est vague, réponds chaleureusement en donnant un premier conseil utile et en posant 1 ou 2 questions simples et ouvertes pour préciser le besoin (ex: terrain, fréquence, sensation recherchée).
- Si l'utilisateur a déjà donné ses critères (ex: terrain, budget, distance, blessure), fais-lui directement une recommandation précise et argumentée.

Catalogue des produits Decathlon & Kiprun à recommander :
- [PRODUIT: 1] Kiprun KD900X.2 (149.99€) : Compétition, plaque carbone Pebax, mousse VFOAM réactive (+85% retour d'énergie), pour records 10km, semi et marathon.
- [PRODUIT: 2] Kiprun KS900.2 (99.99€) : Amorti maximal et confort longue distance, mousse MFOAM testée 1000 km, idéale pour préserver les genoux et articulations sur bitume.
- [PRODUIT: 3] Kiprun Jogflow 500.1 (59.99€) : Idéal débutant et reprise, drop naturel 4mm pour réduire le risque de blessures de 25%, souple et légère.
- [PRODUIT: 4] Kiprun Kipsummit WP (109.99€) : Trail tout temps, membrane imperméable respirante, crampons 5mm gomme CrossContact pour boue et roche.
- [PRODUIT: 5] Decathlon JF 190 Grip (44.99€) : Hybride polyvalente pour alterner facilement entre route et sentiers de sous-bois ou parcs.
- [PRODUIT: 6] Kiprun Kipride Max (139.99€) : Amorti maximal rocker pour déroulé fluide du pied et gros kilométrage d'entraînement.
- [PRODUIT: 7] Veste Coupe-Vent Run 500 (39.99€) : Veste ultra-légère déperlante et compacte avec aérations laser.
- [PRODUIT: 8] T-Shirt Respirant Run 900 (24.99€) : Thermo-collé anti-irritations, respirabilité maximale pour séances intenses.
- [PRODUIT: 9] Short 2-en-1 Kiprun Marathon (29.99€) : Cuissard intégré anti-frottements et ceinture multi-poches pour smartphone et flasques.
- [PRODUIT: 10] Montre GPS Cardio Kiprun 500 (89.99€) : Suivi allure/distance en direct, cardio poignet, 18h d'autonomie GPS, synchro Strava.
- [PRODUIT: 11] Lampe Frontale Run Light 250 (29.99€) : Faisceau orientable 250 lumens pour courir la nuit en toute sécurité.
- [PRODUIT: 12] Chaussettes Anti-Ampoules Kiprun 900 (14.99€) : Fil anti-friction PTFE au talon et à la pointe pour zéro ampoule.
- [PRODUIT: 13] Kiprun Jogflow 190.1 (29.99€) : Premier prix technique ultra-accessible pour course occasionnelle 1 fois/semaine.
- [PRODUIT: 14] Kiprun Kipcore (69.99€) : Route polyvalente avec amorti équilibré et bonne relance.
- [PRODUIT: 15] Kiprun Kipstorm Interval (109.99€) : Séances dynamiques, fractionné et allures rapides.
- [PRODUIT: 16] Kiprun Kipcore Gravel (59.99€) : Sentiers stabilisés et chemins de graviers.

Règles de balisage interactif indispensables :
1. Dès que tu conseilles ou mentionnes un équipement précis du catalogue ci-dessus, inclus le tag correspondant [PRODUIT: id] dans ton texte (par exemple [PRODUIT: 2] ou [PRODUIT: 1]). Tu peux mettre 1 ou 2 tags produits par message.
2. À la toute fin de ta réponse, propose systématiquement 2 à 3 suggestions de relance courtes que l'utilisateur pourrait poser, au format [SUGGESTION: texte court] (ex: [SUGGESTION: Voir la Kiprun KS900.2] [SUGGESTION: Comment éviter les ampoules ?]).
3. Reste concis (120 à 220 mots), utilise des listes à puces aérées et du texte en gras pour une lecture agréable.`;

    // 1. Appel Google Gemini (Fournisseur prioritaire pour le projet)
    if (geminiKey) {
      const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

      const contents = [];

      // Historique de conversation
      if (Array.isArray(history) && history.length > 0) {
        history.slice(-8).forEach(h => {
          contents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }]
          });
        });
      }

      // Message actuel de l'utilisateur
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const payload = {
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || `Erreur API Gemini (${res.status})`);
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas pu formuler de réponse.";

      return new Response(JSON.stringify({ reply }), {
        headers: corsHeaders
      });
    }

    // 2. Appel OpenAI (Alternative GPT)
    if (openaiKey) {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const messages = [
        { role: 'system', content: systemPrompt }
      ];

      if (Array.isArray(history)) {
        history.slice(-8).forEach(h => {
          messages.push({ role: h.role, content: h.content });
        });
      }

      messages.push({ role: 'user', content: prompt });

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: messages,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || `Erreur API OpenAI (${res.status})`);
      }

      const reply = data.choices?.[0]?.message?.content || "Désolé, impossible de répondre.";

      return new Response(JSON.stringify({ reply }), {
        headers: corsHeaders
      });
    }

    // 3. Fallback sans clé serveur configurée
    return new Response(JSON.stringify({
      reply: "Bonjour ! Pour activer Max en production via Cloudflare, ajoutez la variable d'environnement GEMINI_API_KEY dans votre dashboard Cloudflare Pages, ou entrez directement votre clé dans les réglages du chat (icône ⚙️)."
    }), {
      headers: corsHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
