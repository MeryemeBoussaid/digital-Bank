# Digital Banking - Application de Gestion Bancaire

Une application web complète de gestion bancaire permettant aux administrateurs de gérer les clients, les comptes bancaires et les opérations financières (débits, crédits, virements).

## 📋 Table des matières

1. [Présentation du projet](#présentation-du-projet)
2. [Équipe du projet](#équipe-du-projet)
3. [Technologies utilisées](#technologies-utilisées)
4. [Fonctionnalités Admin](#fonctionnalités-admin)
5. [Architecture du projet](#architecture-du-projet)
6. [Installation et configuration](#installation-et-configuration)
7. [Captures d'écran](#captures-décran)

## 📖 Présentation du projet

Digital Banking est une plateforme web moderne de gestion bancaire développée dans le cadre d'un projet libre à l'**École Nationale des Sciences Appliquées de Tanger (ENSA Tanger)**.

L'application permet aux administrateurs de gérer efficacement :
- Les clients de la banque
- Les comptes bancaires (courants et épargne)
- Les opérations bancaires (débits, crédits, virements)
- Le monitoring et les alertes sur les comptes

Le projet est divisé en deux parties principales :
- **Backend** : API REST développée avec Spring Boot
- **Frontend** : Interface d'administration développée avec Angular

## 👥 Équipe du projet

### Réalisé par :
- **Meryeme BOUSSAID**
- **Safaa BOUHNINE**
- **Ibtissam AIDOUN**
- **Chaimae AZZOUZ**

### Encadré par :
- **M. Badir HASSAN**

### Institution :
**École Nationale des Sciences Appliquées de Tanger (ENSA Tanger)**  
Année Universitaire 2025-2026

## 🛠 Technologies utilisées

### Backend
- **Spring Boot 3.2.5** - Framework principal
- **Spring Data JPA** - Gestion de la persistance
- **Spring Security** - Sécurité et authentification
- **OAuth2 Authorization Server** - Gestion des tokens JWT
- **MySQL 8.0** - Base de données relationnelle
- **Springdoc OpenAPI (Swagger)** - Documentation API
- **Lombok** - Réduction du code boilerplate
- **Java 21** - Langage de programmation

### Frontend
- **Angular 17** - Framework frontend
- **Angular Material** - Composants UI Material Design
- **Bootstrap 5** - Framework CSS responsive
- **Chart.js / ng2-charts** - Visualisation de données
- **SweetAlert2** - Notifications élégantes
- **RxJS** - Programmation réactive
- **JWT Decode** - Décodage des tokens JWT

### Outils de développement
- **Maven** - Gestion des dépendances backend
- **npm** - Gestion des packages frontend
- **Git** - Contrôle de version

## 🎯 Fonctionnalités Admin

### 1. Authentification et Sécurité
- Connexion sécurisée avec JWT
- Gestion de session
- Protection des routes
- Déconnexion sécurisée

### 2. Tableau de bord (Dashboard)
- Vue d'ensemble des statistiques
- Graphiques interactifs (Chart.js)
- Nombre total de clients
- Nombre total de comptes
- Volume des transactions
- Transactions récentes

### 3. Gestion des clients
- **Liste des clients** : Affichage paginé avec recherche
- **Ajout de client** : Formulaire de création avec validation
  - Nom
  - Email
  - Username
  - Password
- **Modification de client** : Mise à jour des informations
- **Suppression de client** : Suppression avec confirmation
- **Recherche** : Recherche par nom ou email

### 4. Gestion des comptes
- **Création de comptes** :
  - Compte Courant (avec découvert autorisé)
  - Compte Épargne (avec taux d'intérêt)
- **Recherche de comptes** : Par ID ou client
- **Liste des comptes** : Vue d'ensemble de tous les comptes
- **Consultation détaillée** :
  - Informations du compte
  - Solde actuel
  - Historique des opérations (paginé)
  - Informations du client propriétaire

### 5. Opérations bancaires
- **Débit** : Retrait d'argent avec vérification du solde
- **Crédit** : Dépôt d'argent sur un compte
- **Virement** : Transfert entre deux comptes
- **Historique** : Consultation paginée des opérations

### 6. Transactions
- Affichage de toutes les transactions du système
- Filtrage par type (CREDIT/DEBIT/ALL)
- Recherche par description ou client
- Statistiques :
  - Total des crédits
  - Total des débits
  - Nombre total de transactions
- Affichage limité aux 50 dernières transactions

### 7. Alertes et Monitoring
- **Alertes critiques** : Comptes avec solde négatif
- **Avertissements** : Comptes avec solde faible (< 1000 MAD)
- Tableaux détaillés des comptes problématiques
- Statistiques des alertes

### 8. Gestion du profil
- Modification du mot de passe
- Consultation des informations de profil

## 🏗 Architecture du projet

### Architecture globale

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  Angular App    │────────▶│   Spring Boot   │────────▶│     MySQL       │
│  (Port 4200)    │  HTTP   │   REST API      │  JDBC   │   Database      │
│                 │◀────────│   (Port 8080)   │◀────────│                 │
└─────────────────┘   JSON  └─────────────────┘         └─────────────────┘
```

### Architecture Backend (Couches)

```
┌─────────────────────────────────────────────────────┐
│              Controllers (Web Layer)                 │
│  - CustomerRestController                           │
│  - BankAccountRestAPI                               │
│  - SecurityController                               │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│              Services (Business Layer)               │
│  - BankAccountService                               │
│  - BankAccountServiceImpl                           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│              DTOs & Mappers                         │
│  - CustomerDTO, BankAccountDTO, etc.                │
│  - BankAccountMapperImpl                            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│              Repositories (Data Layer)               │
│  - CustomerRepository                               │
│  - BankAccountRepository                            │
│  - AccountOperationRepository                       │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│              Entities (Domain Model)                 │
│  - Customer, BankAccount, AccountOperation          │
│  - CurrentAccount, SavingAccount                    │
└─────────────────────────────────────────────────────┘
```

### Architecture Frontend (Angular)

```
┌─────────────────────────────────────────────────────┐
│                  Components                          │
│  - LoginComponent                                   │
│  - DashboardComponent                               │
│  - CustomersComponent                               │
│  - AccountsComponent                                │
│  - TransactionsComponent                            │
│  - AlertsComponent                                  │
│  - NavbarComponent                                  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│                   Services                           │
│  - AuthService (Authentification)                   │
│  - AccountsService (API Comptes)                    │
│  - CustomerService (API Clients)                    │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│                Guards & Interceptors                 │
│  - AuthGuard (Protection des routes)                │
│  - HTTP Interceptor (JWT Token)                     │
└─────────────────────────────────────────────────────┘
```

### Modèle de données

```
┌─────────────────┐
│    Customer     │
├─────────────────┤
│ - id            │
│ - name          │
│ - email         │
│ - username      │
│ - password      │
└─────────────────┘
        │ 1
        │
        │ *
┌─────────────────┐
│  BankAccount    │◄─────────────┐
├─────────────────┤              │
│ - id            │              │
│ - balance       │              │
│ - creationDate  │              │
│ - status        │              │
└─────────────────┘              │
        △                        │
        │                        │
   ┌────┴────┐                   │
   │         │                   │
┌──┴──┐  ┌──┴──┐                │
│Curr.│  │Sav. │                │
│Acc. │  │Acc. │                │
└─────┘  └─────┘                │
                                 │ *
                        ┌────────┴────────┐
                        │ AccountOperation│
                        ├─────────────────┤
                        │ - id            │
                        │ - operationDate │
                        │ - amount        │
                        │ - type          │
                        │ - description   │
                        └─────────────────┘
```

## 🚀 Installation et configuration

### Prérequis

- Java JDK 21
- Node.js 18+ et npm
- MySQL 8.0
- Maven 3.8+
- Git

### 1. Cloner le projet

```bash
git clone https://github.com/votre-repo/digital-banking.git
cd digital-banking
```

### 2. Configuration de la base de données

Créer une base de données MySQL nommée `bank` ou modifier `application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bank?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.jpa.show-sql=true
```

### 3. Lancer le backend

```bash
# Compiler le projet
mvn clean install

# Lancer l'application Spring Boot
mvn spring-boot:run
```

Le backend sera accessible sur **http://localhost:8080**

### 4. Lancer le frontend

```bash
# Naviguer vers le dossier frontend
cd frontend-bank

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

Le frontend sera accessible sur **http://localhost:4200**

### 5. Accéder à l'application

- **URL** : http://localhost:4200
- **Compte Admin** : 
  - Username : `admin`
  - Password : `123`

### 6. Documentation API (Swagger)

La documentation interactive de l'API est disponible sur :
**http://localhost:8080/swagger-ui.html**

## 📸 Captures d'écran

### Page de connexion
![login.png](img/login.png)

### Tableau de bord Admin
![dashboard.png](img/dashboard.png)

### Liste des clients
![customerlist.png](img/customerlist.png)

### Ajouter un client
![addcustomer.png](img/addcustomer.png)

### Modifier un client
![editcustomer.png](img/editcustomer.png)

### Rechercher un compte
![accountSearch.png](img/accountSearch.png)

### Liste des comptes
![accountlist.png](img/accountlist.png)

### Transactions
Page affichant toutes les transactions avec filtres et recherche.

### Alertes
Système de monitoring affichant les comptes avec soldes négatifs ou faibles.

## 📝 Endpoints API principaux

### Authentification
- `POST /auth/login` - Connexion

### Clients
- `GET /customers` - Liste des clients
- `GET /customers/{id}` - Détails d'un client
- `POST /customers` - Créer un client
- `PUT /customers/{id}` - Modifier un client
- `DELETE /customers/{id}` - Supprimer un client

### Comptes
- `GET /accounts` - Liste des comptes
- `GET /accounts/{id}` - Détails d'un compte
- `POST /accounts/save` - Créer un compte
- `POST /accounts/debit/{id}` - Effectuer un débit
- `POST /accounts/credit/{id}` - Effectuer un crédit
- `POST /accounts/transfer` - Effectuer un virement

## 🔒 Sécurité

- Authentification basée sur JWT (JSON Web Tokens)
- Spring Security pour la protection des endpoints
- Autorisation basée sur les rôles (ADMIN, USER, CUSTOMER)
- Validation des données côté backend et frontend
- Protection CORS configurée

## 📄 Licence

Ce projet a été développé dans un cadre académique à l'ENSA Tanger.

## 👨‍💻 Contact

Pour toute question concernant ce projet, veuillez contacter l'équipe de développement via l'ENSA Tanger.

---

**Développé avec ❤️ par l'équipe ENSA Tanger - 2025/2026**
