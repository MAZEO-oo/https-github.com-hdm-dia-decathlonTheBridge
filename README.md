# 🏃‍♂️ Decathlon Running x The Bridge — Max Assistant Running IA

> **Projet Étudiant The Bridge — Présentation Jury**  
> Une plateforme e-commerce running nouvelle génération combinant la gamme de performance **Kiprun** avec **Max**, un assistant conversationnel propulsé par des modèles de langage (LLM) et doté d'une expertise humaine en course à pied.

---

## 🌟 Points Clés & Innovation du Projet

1. **Expérience E-commerce Complète & Réactive** :
   - Design officiel Decathlon / Kiprun (`#3643BA`, vert menthe `#7BF1C4`, typographies soignées).
   - Catalogue dynamique de 12 équipements phares (chaussures plaque carbone KD900X.2, KS900.2 amorti, Jogflow 500 débutant, trail Kipsummit, textiles et montres GPS).
   - Filtres instantanés par catégorie, terrain (route, trail, mixte) et budget.
   - Fiches produits détaillées avec spécifications SportsLab et avis clients.
   - Panier d'achat interactif avec calcul de livraison offerte (seuil 49 €) et simulation de commande.

2. **Max · L'Assistant Running Conversationnel (LLM + Hybride)** :
   - **Conversation libre intelligente** : propulsé par **Google Gemini** ou **OpenAI GPT** pour répondre aux questions physiologiques, de foulée, d'entraînement, de drop, d'ampoules, de marathon, etc.
   - **Recommandation produit interactive** : Max génère directement des cartes produits dans le chat avec visuel, prix, note et bouton *"Ajouter au panier"* en 1 clic.
   - **Diagnostics guidés** (repris et enrichis du prototype initial) :
     - 👟 *Bien choisir ses chaussures* (questionnaire en 5 étapes avec jauge de progression).
     - ⏱️ *Préparer ses prochaines sorties* (équipement, météo, nuit).
     - 🚀 *Progresser en running* (fractionné, VMA, seuil).
     - 👤 *Mise en relation avec un conseiller humain*.
   - **Zéro Risque de Panne pour le Jury** :
     - Si aucune clé API n'est entrée, ou en cas de coupure de réseau/quota, le **Mode Expert Démo Intégré** prend le relais automatiquement avec des réponses expertes et interactives.

---

## 📂 Structure du Projet

```text
Decathlon - The Bridge/
├── index.html                   # Page d'accueil & interface principale
├── css/
│   ├── styles.css               # Système de design Decathlon / Kiprun
│   └── chatbot.css              # Style du tiroir conversationnel Max
├── js/
│   ├── products.js              # Base de données des produits Kiprun
│   ├── max-chatbot.js           # Moteur du Chatbot (LLM + Scénarios + Démo)
│   └── app.js                   # Logique e-commerce (panier, filtres, vues)
├── assets/                      # Logos et illustrations haute résolution
├── functions/
│   └── api/
│       └── chat.js              # Fonction Cloudflare Pages Serverless (optionnel)
├── .gitignore                   # Fichiers exclus de Git
└── README.md                    # Documentation complète
```

---

## 🚀 Déploiement Rapide sur GitHub & Cloudflare Pages

Le projet est conçu en **Zero-Build** (HTML5, CSS3, ES6 natif). Il se déploie en moins de 60 secondes sur Cloudflare Pages sans aucune compilation complexe !

### Étape 1 : Publier sur GitHub
Ouvrez votre terminal dans ce dossier et exécutez :
```bash
git init
git add .
git commit -m "Initial commit - Decathlon Running x The Bridge"
git branch -M main
# Remplacez par l'URL de votre dépôt GitHub :
git remote add origin https://github.com/VOTRE_PSEUDO/decathlon-the-bridge.git
git push -u origin main
```

### Étape 2 : Déployer sur Cloudflare Pages
1. Rendez-vous sur votre compte **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2. Dans le menu de gauche, cliquez sur **Workers & Pages** > **Create application** > onglet **Pages** > **Connect to Git**.
3. Sélectionnez votre dépôt GitHub `decathlon-the-bridge`.
4. Dans les paramètres de build :
   - **Framework preset** : `None`
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `/` *(ou laisser vide pour la racine)*
5. Cliquez sur **Save and Deploy**.
6. Votre site est en ligne en quelques secondes avec une URL sécurisée `https://decathlon-the-bridge.pages.dev` ! 🎉

---

## 🔑 Configuration de la Clé API pour le LLM

Vous avez **deux méthodes ultra simples** pour activer le LLM :

### Méthode 1 (Idéale & Immédiate pour la démo) : Directement dans l'Interface
1. Ouvrez le site.
2. Ouvrez le chat en cliquant sur **"Être conseillé"** ou sur le bouton en bas à droite.
3. Cliquez sur l'icône **⚙️ (Paramètres)** dans l'en-tête du chat.
4. Sélectionnez le fournisseur : **Google Gemini API** (recommandé) ou **OpenAI**.
5. Collez votre clé API (ex: `AIzaSy...` pour Gemini ou `sk-...` pour OpenAI).
6. Cliquez sur **Enregistrer**.  
   *La clé est sauvegardée localement dans votre navigateur (`localStorage`). Vous pouvez rafraîchir la page, elle reste active.*

### Méthode 2 : Variable d'Environnement Cloudflare Pages (Mode Production)
Si vous ne voulez pas saisir de clé dans le navigateur :
1. Dans le dashboard Cloudflare Pages, allez dans votre projet > **Settings** > **Environment variables**.
2. Ajoutez la variable :
   - Nom : `GEMINI_API_KEY` (ou `OPENAI_API_KEY`)
   - Valeur : *Votre clé API*
3. Dans l'interface du chatbot (⚙️), sélectionnez le fournisseur **Cloudflare Serverless (/api/chat)**.
4. Le fichier `functions/api/chat.js` interroge automatiquement l'API en toute sécurité côté serveur.

---

## 💻 Tester en Local

Pour prévisualiser le projet sur votre machine avant de le pousser :

```bash
# Avec Python 3 (intégré sur Mac) :
python3 -m http.server 8000
```
Ouvrez ensuite votre navigateur sur **[http://localhost:8000](http://localhost:8000)**.

---

## 🎯 Conseils pour la Présentation devant le Jury

1. **Scénario Démo Conseillé (3 à 5 minutes)** :
   - **Introduction (1 min)** : Montrez la page d'accueil moderne, la cohérence avec la marque Decathlon et l'accent mis sur la performance Kiprun.
   - **Recherche Naturelle (1 min)** : Tapez dans la barre principale *"Je veux une paire avec plaque carbone pour battre mon record au marathon"*. Cliquez sur *"Parler à Max"*.
   - **Magie de l'IA (2 min)** : Montrez que Max répond de manière personnalisée, explique le fonctionnement de la plaque carbone Pebax, et affiche la fiche produit de la **KD900X.2** directement dans le chat.
   - **Ajout au panier & Conversion (1 min)** : Cliquez sur *"Ajouter au panier"* depuis le chat. Montrez le panier mis à jour, l'indicateur de livraison offerte et la validation de commande.
   - **Robustesse** : Montrez également le questionnaire guidé (bouton *"Bien choisir mes chaussures"*) pour prouver que la solution s'adapte aussi aux coureurs indécis.

---
*Projet conçu avec passion pour The Bridge & Decathlon.*
