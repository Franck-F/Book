# Déploiement sur Netlify

## Prérequis

- Compte GitHub
- Compte Netlify
- Repository Git initialisé

## Étapes

### 1. Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Portfolio complet"
```

### 2. Créer un Repository GitHub

1. Allez sur <https://github.com/new>
2. Créez un nouveau repository (ex: `portfolio-book`)
3. Ne pas initialiser avec README (déjà existant)

### 3. Pousser le Code

```bash
git remote add origin https://github.com/VOTRE-USERNAME/portfolio-book.git
git branch -M main
git push -u origin main
```

### 4. Déployer sur Netlify

#### Option A : Via l'Interface Web

1. Connectez-vous sur <https://netlify.com>
2. Cliquez sur "Add new site" → "Import an existing project"
3. Choisissez GitHub et autorisez Netlify
4. Sélectionnez votre repository `portfolio-book`
5. Les paramètres sont détectés automatiquement via `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Cliquez sur "Deploy site"

#### Option B : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

### 5. Configuration du Domaine (Optionnel)

1. Dans les paramètres Netlify, allez dans "Domain management"
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions

## Variables d'Environnement

Si vous ajoutez des fonctionnalités nécessitant des clés API :

1. Dans Netlify : Site settings → Environment variables
2. Ajoutez vos variables (ex: `NEXT_PUBLIC_API_KEY`)
3. Redéployez

## Déploiement Continu

Chaque push sur la branche `main` déclenchera automatiquement un nouveau déploiement !

```bash
git add .
git commit -m "Mise à jour du contenu"
git push
```

Netlify détectera le push et redéploiera automatiquement.

## Vérification

Une fois déployé, votre site sera accessible sur :

- URL Netlify : `https://votre-site.netlify.app`
- Domaine personnalisé (si configuré)

✅ Votre portfolio est maintenant en ligne !
