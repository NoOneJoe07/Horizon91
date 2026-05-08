# Configuration Zoho Mail — groupesupernova.ca
Dernière mise à jour : 2026-05-06
Statut : ✅ Configuré et opérationnel

## Plan souscrit
- **Zoho Mail Lite** — C$1.25/utilisateur/mois (facturé annuellement)
- 5 utilisateurs, 10 Go/utilisateur
- Renouvellement : mai 2027
- Note : Le Forever Free Plan n'est plus disponible pour les nouveaux comptes au Canada

## Étape 1 — Créer le compte Zoho Mail ✅

1. Aller sur https://mail.zoho.com → **Sign Up**
2. Choisir **Mail Lite** (C$1.25/user/mois)
3. Sélectionner **"Create domain based email account in Zoho"**
4. Entrer : `groupesupernova.ca`

## Étape 2 — Vérifier la propriété du domaine dans Namecheap ✅

Zoho fournit un enregistrement TXT à ajouter. Dans Namecheap → Advanced DNS → Host Records :
```
Type    Host    Value                                           TTL
TXT     @       zoho-verification=zb81020104.zmverify.zohocloud.ca  Auto
```

Attendre 5 à 30 minutes et cliquer **Verify TXT Record** dans Zoho.

## Étape 3 — Ajouter les enregistrements MX dans Namecheap ✅

Dans Namecheap → Advanced DNS → Mail Settings → Custom MX :
```
Type    Host    Value                   Priority    TTL
MX      @       mx.zohocloud.ca         10          Auto
MX      @       mx2.zohocloud.ca        20          Auto
MX      @       mx3.zohocloud.ca        50          Auto
```

⚠️ Note : Les valeurs sont `zohocloud.ca` (pas `zoho.com`) — spécifique au plan canadien Zoho Mail Lite.

## Étape 4 — Ajouter SPF et DKIM (anti-spam) ✅

Dans Namecheap → Advanced DNS → Host Records :
```
Type    Host                Value                               TTL
TXT     @                   v=spf1 include:zohocloud.ca ~all    Auto
TXT     zmail._domainkey    v=DKIM1; k=rsa; p=MIGfMA0GCSq...   Auto
```

⚠️ Important : Supprimer le SPF par défaut de Namecheap (`v=spf1 include:spf.efwd.registrar-servers.com ~all`) avant d'ajouter le SPF Zoho. Un seul enregistrement SPF par domaine.

La valeur complète du DKIM est fournie par Zoho dans DNS Mapping → DKIM. Le DKIM peut prendre plusieurs heures à propager.

## Étape 5 — Comptes créés ✅

Format retenu : `prenom.nom@groupesupernova.ca` (future-proof si doublon de prénom)

| Nom complet                      | Courriel                                  | Rôle        |
|----------------------------------|-------------------------------------------|-------------|
| Jonathan Patoine                 | jonathan.patoine@groupesupernova.ca       | Super Admin |
| Alexandra Espin                  | alexandra.espin@groupesupernova.ca        | User        |
| Paulina Jaramillo                | paulina.jaramillo@groupesupernova.ca      | User        |
| Gabriel Patoine                  | gabriel.patoine@groupesupernova.ca        | User        |
| Contact (boîte générique)        | contact@groupesupernova.ca                | User        |

Credentials envoyés par courriel à chaque membre. Changement de mot de passe forcé à la première connexion.

## Étape 6 — Alias à créer (à faire)

Dans Zoho Mail → Admin Console → Email Aliases :

| Alias                           | Redirige vers                             |
|---------------------------------|-------------------------------------------|
| direction@groupesupernova.ca    | jonathan.patoine@groupesupernova.ca       |
| web@groupesupernova.ca          | paulina.jaramillo@groupesupernova.ca      |
| cyber@groupesupernova.ca        | gabriel.patoine@groupesupernova.ca        |
| studio@groupesupernova.ca       | jonathan.patoine@groupesupernova.ca       |
| facturation@groupesupernova.ca  | jonathan.patoine@groupesupernova.ca       |
| noreply@groupesupernova.ca      | contact@groupesupernova.ca                |

## Étape 7 — Test de fonctionnement (à faire après propagation DKIM)

1. Envoyer un courriel de test à contact@groupesupernova.ca depuis Gmail
2. Vérifier réception dans Zoho Mail (https://mail.zoho.com)
3. Répondre depuis Zoho et vérifier réception côté Gmail
4. Tester les alias une fois configurés

## Accès

- Webmail : https://mail.zoho.com
- Admin Console : https://mailadmin.zohocloud.ca
- Application mobile : Zoho Mail (iOS & Android)

---

## État DNS Namecheap final

```
Type            Host                Value                               TTL
A               @                   76.76.21.21                         Auto    ← Vercel
CNAME           www                 cname.vercel-dns.com                30 min  ← Vercel
TXT             @                   zoho-verification=zb81020104...     Auto    ← Vérification domaine
TXT             @                   v=spf1 include:zohocloud.ca ~all    Auto    ← SPF
TXT             zmail._domainkey    v=DKIM1; k=rsa; p=MIGfMA0...       Auto    ← DKIM
MX              @                   mx.zohocloud.ca (10)                Auto    ← Mail
MX              @                   mx2.zohocloud.ca (20)               Auto    ← Mail failover
MX              @                   mx3.zohocloud.ca (50)               Auto    ← Mail failover
```
