# Webutvikling og API-design arbeidskrav

## Instruksjoner

For å bli godkjent for å gå opp til eksamen må du få godkjent et arbeidskrav. Arbeidskravet utgjør innholdet av de [første 7 øvingene](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/). Du skal løse oppgaven med en annen student og dere skal sammen gi og motta tilbakemelding til et annet par.

1. Opprett et **privat** repository med din GitHub konto
2. Legg til din gruppepartner under Settings > Collaborators and teams
3. Legg til din lærerens brukernavn `jhannes` **som Admin** under Settings > Collaborators and teams
4. Registrer deg som bruker på Clever Cloud
5. Begge gruppemedlemmene må sende emailadressen knyttet til GitHub kontoen sin til læreren på Canvas, slik at dere kan få tilgang til klassens Clever Cloud konto for gratis bruk
6. Bygg en applikasjon som gjenspeiler [øvingene](https://github.com/kristiania-pg6301-2026/pg6301-frontend-programming/blob/main/exercises/EXERCISES.md), inkludert deployment til Clever Cloud
7. Pass på å oppdatere README-fila med en lenke til Clever Cloud-appen
8. Begge partnerne i gruppa skal besvare oppgaven i Canvas med link til GitHub repository

**Frist**: 15. oktober

## Mal for innlevering

<inkluder lenke til Heroku-applikasjonen>

- [ ] Applikasjonen har en React frontend
- [ ] Applikasjonen lister "tasks" (dere kan bytte ut "tasks" med annen funksjon dersom dere har lyst)
- [ ] Applikasjonen lar brukeren legge til "tasks"
- [ ] Applikasjonen lar brukeren markere en "task" for utført
- [ ] React-koden illustrerer bruk av komponenter, props, `useState` og `useEffect`
- [ ] Applikasjonen har en Express backend
- [ ] Frontend kommuniserer med backend sitt API via `fetch` requester
- [ ] Applikasjonen er deployet til Heroku
- [ ] Koden har en korrekt `.gitignore`-fil og har ikke sjekket inn filer som skulle vært ekskludert
- [ ] Koden er formattert med `prettier` og du har script på plass for å sikre at

Valgfritt:

- [ ] Applikasjonen lagrer data i MongoDB
- [ ] Applikasjonen benytter TypeScript for å unngå typefeil i koden
- [ ] Applikasjonen implementerer tester med Vitest
