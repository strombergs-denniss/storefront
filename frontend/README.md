# Interneta veikala datu uzskaites automatizētā sistēma

## Projekta apraksts
Relativi vienkārša interneta veikala sistēma līdzīgi Magento 2, bet mazāka, ir admin, kur lietotājs (administrators) var veidot, rediģet, dzēst dažādus datus, un apskatīt kopsavilkumu, un kur ir storefront, kur pircējs (klients) var meklēt, pievienot produktu grozām, veidot savu akauntu un veikt pasutījumus.

## Izmantotās tehnoloģijas
Projektā tiek izmantots:
- JavaScript
- JSS
- React
- Material UI
- React Admin
- Node
- Express
- GraphQL
- PostgreSQL

## Izmantotie avoti
[React Admin Login](https://github.com/marmelab/react-admin/blob/master/examples/demo/src/layout/Login.tsx) - tika ņemts no šī faila, lai realizētu administrātora autorizāciju.

[React Admin SubMenu](https://github.com/marmelab/react-admin/blob/master/examples/demo/src/layout/SubMenu.tsx) - tika ņemts kods, lai izprastu kā strādā, un daļēji arī tiek izmanots ar modifkācijām.

## Uzstādīšanas instrukcijas
1. Ir nepieciešams strādājošs Node un PostgreSQL setups
2. git clone https://github.com/rvtprog-kval-21/d41-DenissStrombergs-InternetaVeikals.git
3. cd d41-DenissStrombergs-InternetaVeikals
4. cd backend
5. npm start
5. Atvert jaunu konsoles logu d41-DenissStrombergs-InternetaVeikals direktorijā
6. cd frontend
7. npm start
