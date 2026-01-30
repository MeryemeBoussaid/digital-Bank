# Rapport de Projet : Digital Banking Application

---

**École Nationale des Sciences Appliquées de Tanger**  
**ENSA Tanger**

---

## Plateforme de Gestion Bancaire Digitale

**Projet Libre**

---

### Réalisé par :
- Meryeme BOUSSAID
- Safaa BOUHNINE
- Ibtissam AIDOUN
- Chaimae AZZOUZ

### Encadré par :
M. Badir HASSAN

**Année Universitaire 2025-2026**

---

## Table des Matières

1. [Remerciements](#remerciements)
2. [Résumé](#résumé)
3. [Introduction](#introduction)
4. [Analyse et Conception](#analyse-et-conception)
5. [Technologies Utilisées](#technologies-utilisées)
6. [Architecture du Projet](#architecture-du-projet)
7. [Implémentation Backend](#implémentation-backend)
8. [Implémentation Frontend](#implémentation-frontend)
9. [Fonctionnalités et Démonstration](#fonctionnalités-et-démonstration)
10. [Conclusion et Perspectives](#conclusion-et-perspectives)
11. [Bibliographie](#bibliographie)
12. [Annexes](#annexes)

---

## Remerciements

Nous tenons à exprimer notre profonde gratitude à toutes les personnes qui ont contribué à la réalisation de ce projet.

Nos remerciements s'adressent en premier lieu à notre encadrant, **Monsieur Badir HASSAN**, pour son soutien, ses conseils précieux et son accompagnement tout au long de ce projet. Sa disponibilité et son expertise nous ont été d'une aide inestimable.

Nous remercions également l'ensemble du corps professoral de l'**École Nationale des Sciences Appliquées de Tanger** pour la formation de qualité qu'ils nous ont dispensée et qui nous a permis d'acquérir les compétences nécessaires pour mener à bien ce projet.

Enfin, nous exprimons notre reconnaissance à nos familles et amis pour leur soutien moral et leurs encouragements constants.

---

## Résumé

Ce rapport présente le développement d'une application web de gestion bancaire digitale nommée **Digital Banking**. Cette plateforme permet la gestion complète des clients, des comptes bancaires et des opérations financières (débits et crédits).

### Technologies utilisées

Le projet a été développé en utilisant une architecture moderne basée sur :

- **Backend** : Spring Boot 3.2.5 avec Spring Data JPA, Spring Security et JWT pour l'authentification
- **Frontend** : Angular 17 avec Bootstrap 5 et Angular Material pour l'interface utilisateur
- **Base de données** : MySQL 8.0 pour la persistance des données

### Fonctionnalités principales

L'application offre deux types de comptes (comptes courants et comptes épargne), un système d'authentification sécurisé, un tableau de bord avec statistiques et graphiques, ainsi qu'une gestion complète des transactions bancaires.

Ce projet illustre l'application des concepts de développement web full-stack, d'architecture REST, de sécurité applicative et d'interface utilisateur moderne.

**Mots-clés :** Banque digitale, Spring Boot, Angular, REST API, JWT, Gestion bancaire

---

## Introduction

### 1.1 Contexte du projet

Dans un monde de plus en plus digitalisé, les institutions bancaires se tournent vers des solutions technologiques pour améliorer leurs services et offrir une meilleure expérience client. La digitalisation des services bancaires permet non seulement de réduire les coûts opérationnels, mais aussi d'offrir aux clients un accès 24/7 à leurs comptes et transactions.

Ce projet s'inscrit dans cette dynamique de transformation digitale. Il vise à développer une plateforme web complète de gestion bancaire qui permet aux utilisateurs de gérer leurs comptes, effectuer des opérations bancaires et consulter leurs historiques de transactions de manière sécurisée et intuitive.

### 1.2 Objectifs du projet

Les objectifs principaux de ce projet sont :

- Développer une application web full-stack moderne et sécurisée
- Implémenter un système de gestion des clients et des comptes bancaires
- Créer un système d'authentification robuste basé sur JWT
- Offrir une interface utilisateur intuitive et responsive
- Mettre en place un tableau de bord avec visualisation des données
- Gérer différents types de comptes (courants et épargne)
- Assurer la traçabilité des opérations bancaires

### 1.3 Organisation du rapport

Ce rapport est organisé en plusieurs chapitres qui couvrent tous les aspects du projet, de l'analyse initiale jusqu'à l'implémentation finale et les perspectives d'amélioration.

---

## Analyse et Conception

### 2.1 Analyse des besoins

#### 2.1.1 Besoins fonctionnels

L'application doit permettre de :

**1. Gestion des utilisateurs**
- Authentification sécurisée (admin, utilisateur, client)
- Gestion des profils utilisateurs
- Modification des mots de passe

**2. Gestion des clients**
- Création de nouveaux clients
- Recherche de clients
- Modification des informations clients
- Suppression de clients

**3. Gestion des comptes**
- Création de comptes courants et épargne
- Consultation des détails de compte
- Visualisation de l'historique des opérations
- Recherche de comptes

**4. Gestion des opérations**
- Effectuer des débits
- Effectuer des crédits
- Effectuer des virements entre comptes
- Consultation de l'historique paginé

**5. Tableau de bord**
- Affichage des statistiques
- Graphiques de visualisation
- Alertes sur les comptes (soldes négatifs, soldes faibles)
- Vue d'ensemble des transactions récentes

#### 2.1.2 Besoins non fonctionnels

- **Sécurité** : Authentification JWT, protection des endpoints, validation des données
- **Performance** : Temps de réponse rapide, pagination des résultats
- **Ergonomie** : Interface intuitive, responsive design
- **Maintenabilité** : Code structuré, architecture en couches
- **Scalabilité** : Architecture permettant l'évolution future

### 2.2 Modélisation

#### 2.2.1 Diagramme de classes

Le modèle de données comprend les entités principales suivantes :

- **Customer** : Représente un client de la banque
  - Attributs : id, name, email, username, password
  
- **BankAccount** : Classe abstraite pour les comptes bancaires
  - Attributs : id, balance, creationDate, status
  
- **CurrentAccount** : Compte courant (hérite de BankAccount)
  - Attribut spécifique : overdraft (découvert autorisé)
  
- **SavingAccount** : Compte épargne (hérite de BankAccount)
  - Attribut spécifique : interestRate (taux d'intérêt)
  
- **AccountOperation** : Représente une opération bancaire
  - Attributs : id, operationDate, amount, type, description

#### 2.2.2 Relations entre entités

- Un **Customer** peut avoir plusieurs **BankAccount** (relation 1:N)
- Un **BankAccount** appartient à un seul **Customer**
- Un **BankAccount** peut avoir plusieurs **AccountOperation** (relation 1:N)
- Une **AccountOperation** est liée à un seul **BankAccount**

---

## Technologies Utilisées

### 3.1 Backend

#### 3.1.1 Spring Boot 3.2.5

Spring Boot est le framework principal utilisé pour le développement du backend. Il offre :
- Configuration automatique
- Serveur embarqué (Tomcat)
- Gestion des dépendances simplifiée
- Support des microservices

#### 3.1.2 Spring Data JPA

Spring Data JPA facilite l'accès aux données en fournissant :
- Repositories prédéfinis
- Requêtes dérivées des noms de méthodes
- Support de la pagination
- Gestion automatique des transactions

#### 3.1.3 Spring Security avec OAuth2

La sécurité est assurée par :
- Spring Security pour l'authentification et l'autorisation
- OAuth2 Authorization Server pour la gestion des tokens
- JWT (JSON Web Tokens) pour les sessions stateless

#### 3.1.4 MySQL 8.0

Base de données relationnelle utilisée pour :
- Persistance des données
- Support des transactions ACID
- Performances optimales

#### 3.1.5 Springdoc OpenAPI (Swagger)

Documentation automatique des API REST :
- Interface Swagger UI
- Spécification OpenAPI 3.0
- Tests interactifs des endpoints

### 3.2 Frontend

#### 3.2.1 Angular 17

Framework frontend moderne offrant :
- Architecture basée sur les composants
- Two-way data binding
- Dependency injection
- Routing avancé
- Reactive programming avec RxJS

#### 3.2.2 Angular Material

Bibliothèque de composants UI :
- Composants Material Design
- Responsive et accessible
- Thèmes personnalisables

#### 3.2.3 Bootstrap 5

Framework CSS pour :
- Grille responsive
- Composants UI prédéfinis
- Utilitaires CSS

#### 3.2.4 Chart.js / ng2-charts

Visualisation de données :
- Graphiques interactifs
- Différents types de charts (bar, line, pie, etc.)
- Responsive et animés

#### 3.2.5 SweetAlert2

Notifications et alertes élégantes :
- Modales personnalisables
- Confirmations d'actions
- Messages de succès/erreur

### 3.3 Outils de développement

- **Maven** : Gestion des dépendances backend
- **npm** : Gestion des packages frontend
- **Git** : Contrôle de version
- **IntelliJ IDEA / VS Code** : Environnements de développement

---

## Architecture du Projet

### 4.1 Architecture globale

Le projet suit une architecture client-serveur avec une séparation claire entre le frontend et le backend :

- **Frontend** : Application Angular (port 4200)
- **Backend** : API REST Spring Boot (port 8080)
- **Base de données** : MySQL

### 4.2 Architecture backend

Le backend suit une architecture en couches :

#### 4.2.1 Couche Entités (Entities)

Contient les classes JPA représentant le modèle de données :
- Customer
- BankAccount (abstract)
- CurrentAccount
- SavingAccount
- AccountOperation

#### 4.2.2 Couche Repository

Interfaces Spring Data JPA pour l'accès aux données :
- CustomerRepository
- BankAccountRepository
- AccountOperationRepository

#### 4.2.3 Couche Service

Logique métier de l'application :
- BankAccountService (interface)
- BankAccountServiceImpl (implémentation)

#### 4.2.4 Couche DTO

Objets de transfert de données :
- CustomerDTO
- BankAccountDTO
- CurrentBankAccountDTO
- SavingBankAccountDTO
- AccountOperationDTO
- AccountHistoryDTO

#### 4.2.5 Couche Mappers

Conversion entre entités et DTOs :
- BankAccountMapperImpl

#### 4.2.6 Couche Web (Controllers)

Endpoints REST :
- CustomerRestController
- BankAccountRestAPI
- SecurityController

#### 4.2.7 Couche Sécurité

Configuration de la sécurité :
- SecurityConfig
- Gestion JWT
- Autorisation basée sur les rôles

### 4.3 Architecture frontend

L'application Angular est organisée en modules et composants :

#### 4.3.1 Composants principaux

- **LoginComponent** : Authentification
- **NavbarComponent** : Navigation
- **DashboardComponent** : Tableau de bord
- **CustomersComponent** : Liste des clients
- **AccountsComponent** : Gestion des comptes
- **TransactionsComponent** : Historique des transactions
- **AlertsComponent** : Alertes sur les comptes

#### 4.3.2 Services

- **AuthService** : Gestion de l'authentification
- **AccountsService** : Communication avec l'API des comptes
- **CustomerService** : Communication avec l'API des clients

#### 4.3.3 Guards

- **AuthGuard** : Protection des routes
- Vérification des rôles utilisateur

---

## Implémentation Backend

### 5.1 Configuration du projet

#### 5.1.1 Dépendances Maven

Les principales dépendances utilisées dans `pom.xml` :

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Connector -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    
    <!-- Spring Security OAuth2 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-authorization-server</artifactId>
    </dependency>
    
    <!-- Springdoc OpenAPI -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.1.0</version>
    </dependency>
</dependencies>
```

#### 5.1.2 Configuration de la base de données

Configuration dans `application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bank?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.jpa.show-sql=true
```

### 5.2 Modèle de données

#### 5.2.1 Entité Customer

```java
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String username;
    private String password;
    
    @OneToMany(mappedBy = "customer")
    private List<BankAccount> bankAccounts;
}
```

#### 5.2.2 Entité BankAccount

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE", length = 4)
@Data @NoArgsConstructor @AllArgsConstructor
public abstract class BankAccount {
    @Id
    private String id;
    private double balance;
    private Date creationDate;
    
    @Enumerated(EnumType.STRING)
    private AccountStatus status;
    
    @ManyToOne
    private Customer customer;
    
    @OneToMany(mappedBy = "bankAccount")
    private List<AccountOperation> accountOperations;
}
```

### 5.3 API REST

#### 5.3.1 Endpoints principaux

**Gestion des clients :**
- `GET /customers` : Liste des clients
- `GET /customers/{id}` : Détails d'un client
- `POST /customers` : Créer un client
- `PUT /customers/{id}` : Modifier un client
- `DELETE /customers/{id}` : Supprimer un client

**Gestion des comptes :**
- `GET /accounts` : Liste des comptes
- `GET /accounts/{id}` : Détails d'un compte
- `POST /accounts/debit/{id}` : Effectuer un débit
- `POST /accounts/credit/{id}` : Effectuer un crédit
- `POST /accounts/transfer` : Effectuer un virement

### 5.4 Sécurité

#### 5.4.1 Configuration Spring Security

La sécurité est configurée pour :
- Autoriser l'accès public à certains endpoints (`/auth/**`, `/h2-console/**`)
- Protéger les autres endpoints avec JWT
- Gérer les rôles (ADMIN, USER, CUSTOMER)
- Configurer CORS pour le frontend

#### 5.4.2 Authentification JWT

Le processus d'authentification :
1. L'utilisateur envoie ses credentials
2. Le serveur valide et génère un JWT
3. Le client stocke le token
4. Les requêtes suivantes incluent le token dans l'en-tête Authorization

---

## Implémentation Frontend

### 6.1 Structure du projet Angular

#### 6.1.1 Modules

- **AppModule** : Module principal
- **AppRoutingModule** : Configuration des routes
- **MaterialModule** : Import des composants Material

#### 6.1.2 Routing

Configuration des routes avec guards :

```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'admin/accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'admin/alerts', component: AlertsComponent, canActivate: [AuthGuard] },
];
```

### 6.2 Services

#### 6.2.1 AuthService

Gestion de l'authentification :
- Login/Logout
- Stockage du token JWT
- Vérification des rôles
- Gestion du profil utilisateur

#### 6.2.2 AccountsService

Communication avec l'API des comptes :
- Récupération des comptes
- Opérations bancaires (débit, crédit, virement)
- Consultation de l'historique

### 6.3 Composants principaux

#### 6.3.1 Dashboard

Le tableau de bord affiche :
- Statistiques globales (nombre de clients, comptes, transactions)
- Graphiques de visualisation (Chart.js)
- Transactions récentes
- Alertes importantes

#### 6.3.2 Transactions

Fonctionnalités :
- Affichage de toutes les transactions
- Filtrage par type (CREDIT/DEBIT)
- Recherche par description ou client
- Statistiques (total crédits, total débits)
- Données de démonstration si l'API est vide

#### 6.3.3 Alerts

Système d'alertes :
- Comptes avec solde négatif (alertes critiques)
- Comptes avec solde faible < 1000 MAD (avertissements)
- Affichage des détails des comptes problématiques
- Génération de données fictives pour démonstration

---

## Fonctionnalités et Démonstration

### 7.1 Authentification

L'application propose un système d'authentification sécurisé avec :
- Page de login avec validation
- Support de différents types d'utilisateurs (Admin, User, Customer)
- Stockage sécurisé du token JWT
- Redirection automatique selon le rôle

### 7.2 Gestion des clients

#### 7.2.1 Liste des clients

- Affichage paginé des clients
- Recherche par nom ou email
- Actions : Voir détails, Modifier, Supprimer

#### 7.2.2 Ajout de client

Formulaire avec validation pour :
- Nom
- Email
- Username
- Password

#### 7.2.3 Modification de client

Permet de mettre à jour les informations d'un client existant.

### 7.3 Gestion des comptes

#### 7.3.1 Création de compte

Deux types de comptes disponibles :
- **Compte Courant** : avec découvert autorisé
- **Compte Épargne** : avec taux d'intérêt

#### 7.3.2 Consultation de compte

Affichage détaillé :
- Informations du compte (ID, solde, type)
- Informations du client propriétaire
- Historique paginé des opérations

#### 7.3.3 Opérations bancaires

- **Débit** : Retrait d'argent avec vérification du solde
- **Crédit** : Dépôt d'argent
- **Virement** : Transfert entre deux comptes

### 7.4 Tableau de bord

Le dashboard offre une vue d'ensemble avec :
- Cartes statistiques (clients, comptes, transactions)
- Graphiques interactifs (Chart.js)
- Liste des transactions récentes
- Alertes sur les comptes problématiques

### 7.5 Transactions

Page dédiée aux transactions avec :
- Affichage de toutes les transactions du système
- Filtres par type (CREDIT/DEBIT/ALL)
- Recherche textuelle
- Statistiques (total crédits, total débits, nombre total)
- Données de démonstration automatiques

### 7.6 Alertes

Système de monitoring des comptes :
- Détection des comptes en solde négatif
- Détection des comptes avec solde faible (< 1000 MAD)
- Affichage des alertes critiques et avertissements
- Tableaux détaillés des comptes problématiques

---

## Conclusion et Perspectives

### 8.1 Bilan du projet

Ce projet nous a permis de développer une application web complète de gestion bancaire en utilisant des technologies modernes et des bonnes pratiques de développement.

#### 8.1.1 Objectifs atteints

✓ Développement d'une architecture full-stack moderne  
✓ Implémentation d'un système d'authentification sécurisé  
✓ Création d'une API REST complète et documentée  
✓ Développement d'une interface utilisateur intuitive et responsive  
✓ Mise en place d'un système de visualisation de données  
✓ Gestion complète des opérations bancaires  
✓ Système d'alertes et de monitoring  

#### 8.1.2 Compétences acquises

Ce projet nous a permis de développer nos compétences dans :
- Le développement backend avec Spring Boot
- Le développement frontend avec Angular
- La conception d'API REST
- La sécurité applicative (JWT, Spring Security)
- La gestion de bases de données relationnelles
- L'architecture logicielle en couches
- Le travail en équipe

### 8.2 Difficultés rencontrées

Au cours du développement, nous avons rencontré plusieurs défis :
- Configuration de Spring Security avec JWT
- Gestion des relations JPA complexes
- Synchronisation frontend-backend
- Gestion des erreurs et validation des données
- Optimisation des performances

Ces difficultés ont été surmontées grâce à la recherche, l'entraide au sein de l'équipe et les conseils de notre encadrant.

### 8.3 Perspectives d'amélioration

Plusieurs améliorations peuvent être envisagées :

#### 8.3.1 Fonctionnalités

- Ajout de notifications en temps réel
- Système de messagerie interne
- Export de relevés bancaires (PDF)
- Planification d'opérations récurrentes
- Gestion des cartes bancaires
- Système de prêts et crédits
- Application mobile (iOS/Android)

#### 8.3.2 Techniques

- Migration vers une architecture microservices
- Mise en place de tests automatisés (unitaires, intégration)
- Déploiement avec Docker et Kubernetes
- Intégration continue (CI/CD)
- Monitoring et logging avancés
- Cache distribué (Redis)
- Message broker (RabbitMQ, Kafka)

#### 8.3.3 Sécurité

- Authentification à deux facteurs (2FA)
- Chiffrement des données sensibles
- Audit trail complet
- Protection contre les attaques (CSRF, XSS, SQL Injection)
- Gestion des sessions avancée

### 8.4 Conclusion finale

Ce projet de Digital Banking a été une expérience enrichissante qui nous a permis de mettre en pratique nos connaissances théoriques et d'acquérir de nouvelles compétences techniques.

Nous avons réussi à développer une application fonctionnelle, sécurisée et moderne qui répond aux besoins de gestion bancaire digitale. Le travail en équipe, l'encadrement de qualité et notre motivation ont été les clés de la réussite de ce projet.

Nous sommes fières du résultat obtenu et conscientes que ce projet constitue une base solide pour de futurs développements dans le domaine des applications bancaires digitales.

---

## Bibliographie

1. **Spring Framework Documentation**  
   https://spring.io/projects/spring-framework

2. **Spring Boot Reference Guide**  
   https://docs.spring.io/spring-boot/docs/current/reference/html/

3. **Angular Documentation**  
   https://angular.io/docs

4. **JSON Web Tokens Introduction**  
   https://jwt.io/introduction

5. **Angular Material Documentation**  
   https://material.angular.io/

6. **Chart.js Documentation**  
   https://www.chartjs.org/docs/latest/

7. **MySQL Documentation**  
   https://dev.mysql.com/doc/

8. **Swagger/OpenAPI Specification**  
   https://swagger.io/specification/

---

## Annexes

### Annexe A : Installation et Configuration

#### Prérequis

- Java JDK 21
- Node.js 18+ et npm
- MySQL 8.0
- Maven 3.8+
- Git

#### Installation du backend

```bash
# Cloner le repository
git clone https://github.com/votre-repo/digital-banking.git
cd digital-banking

# Configurer la base de données dans application.properties

# Compiler et lancer
mvn clean install
mvn spring-boot:run
```

Le backend sera accessible sur `http://localhost:8080`

#### Installation du frontend

```bash
# Naviguer vers le dossier frontend
cd frontend-bank

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

Le frontend sera accessible sur `http://localhost:4200`

#### Accès à l'application

**Utilisateurs par défaut :**
- **Admin** : username = `admin`, password = `123`
- **User** : username = `user1`, password = `123`
- **Clients** : mohamed/fatima/ahmed, password = `123`

**Swagger UI :**  
La documentation API est accessible sur : `http://localhost:8080/swagger-ui.html`

### Annexe B : Structure du Code

#### Structure Backend

```
src/main/java/ma/enset/digitalbanking/
├── entities/
│   ├── Customer.java
│   ├── BankAccount.java
│   ├── CurrentAccount.java
│   ├── SavingAccount.java
│   └── AccountOperation.java
├── repositories/
│   ├── CustomerRepository.java
│   ├── BankAccountRepository.java
│   └── AccountOperationRepository.java
├── services/
│   ├── BankAccountService.java
│   └── BankAccountServiceImpl.java
├── dtos/
│   ├── CustomerDTO.java
│   ├── BankAccountDTO.java
│   └── AccountOperationDTO.java
├── mappers/
│   └── BankAccountMapperImpl.java
├── web/
│   ├── CustomerRestController.java
│   ├── BankAccountRestAPI.java
│   └── SecurityController.java
└── security/
    └── SecurityConfig.java
```

#### Structure Frontend

```
src/app/
├── components/
│   ├── login/
│   ├── navbar/
│   ├── dashboard/
│   ├── customers/
│   ├── accounts/
│   ├── transactions/
│   └── alerts/
├── services/
│   ├── auth.service.ts
│   ├── accounts.service.ts
│   └── customer.service.ts
├── guards/
│   └── auth.guard.ts
└── models/
    ├── customer.model.ts
    └── account.model.ts
```

---

**Fin du rapport**
