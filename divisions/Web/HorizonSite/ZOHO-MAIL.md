# Configuration Zoho Mail — groupesupernova.ca
Dernière mise à jour : 2026-05-06

## Étape 1 — Créer le compte Zoho Mail

1. Aller sur https://www.zoho.com/mail/ → **Sign Up Free**
2. Choisir **Forever Free Plan** (5 utilisateurs, 5 Go/utilisateur)
3. Sélectionner **Add your existing domain**
4. Entrer : `groupesupernova.ca`

## Étape 2 — Vérifier la propriété du domaine dans Namecheap

Zoho va te donner un enregistrement TXT à ajouter. Dans Namecheap → Advanced DNS :
```
Type    Host    Value                           TTL
TXT     @       zoho-verification=XXXXXXXXXXXX  Auto
```
(Remplacer XXXXXXXXXXXX par le code fourni par Zoho)

Attendre 5 à 30 minutes et cliquer **Verify** dans Zoho.

## Étape 3 — Ajouter les enregistrements MX dans Namecheap

Supprimer les MX existants et ajouter :
```
Type    Host    Value                       Priority    TTL
MX      @       mx.zoho.com                 10          Auto
MX      @       mx2.zoho.com                20          Auto
MX      @       mx3.zoho.com                50          Auto
```

## Étape 4 — Ajouter SPF et DKIM (anti-spam)

```
Type    Host        Value                                               TTL
TXT     @           v=spf1 include:zoho.com ~all                       Auto
TXT     zmail._domainkey    (valeur DKIM fournie par Zoho dans les paramètres)   Auto
```

## Étape 5 — Créer les comptes réels (5 max sur plan gratuit)

Dans Zoho Mail → Admin Console → User Details → Add User :

| Prénom       | Courriel                        | Rôle        |
|--------------|---------------------------------|-------------|
| Jonathan     | jonathan@groupesupernova.ca     | Admin       |
| Alexandra    | alexandra@groupesupernova.ca    | User        |
| Paulina      | paulina@groupesupernova.ca      | User        |
| Gabriel      | gabriel@groupesupernova.ca      | User        |
| Contact      | contact@groupesupernova.ca      | User        |

## Étape 6 — Créer les alias (redirections)

Dans Zoho Mail → Admin Console → Email Aliases :

| Alias                           | Redirige vers                   |
|---------------------------------|---------------------------------|
| direction@groupesupernova.ca    | jonathan@groupesupernova.ca     |
| web@groupesupernova.ca          | paulina@groupesupernova.ca      |
| cyber@groupesupernova.ca        | gabriel@groupesupernova.ca      |
| studio@groupesupernova.ca       | jonathan@groupesupernova.ca     |
| facturation@groupesupernova.ca  | jonathan@groupesupernova.ca     |
| noreply@groupesupernova.ca      | contact@groupesupernova.ca      |

## Étape 7 — Test de fonctionnement

1. Envoyer un courriel de test à contact@groupesupernova.ca depuis une adresse Gmail
2. Vérifier réception dans Zoho Mail
3. Répondre depuis Zoho et vérifier réception côté Gmail
4. Tester les alias : envoyer à web@groupesupernova.ca → doit arriver chez Paulina

## Accès client Zoho Mail

Webmail : https://mail.zoho.com
Application mobile : Zoho Mail (iOS & Android)
Configuration IMAP/SMTP disponible dans Settings → Mail Accounts si besoin

---

## Note importante

Une fois les MX configurés, la propagation DNS peut prendre jusqu'à 48h (généralement 1-4h chez Namecheap). Ne pas paniquer si les courriels ne fonctionnent pas immédiatement.
