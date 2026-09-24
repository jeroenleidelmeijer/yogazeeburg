# Artikel 26 atomisch publiceren

## Uitvoering
- Controleer vlak vóór plaatsing opnieuw dat artikel 26 het laagste geplande artikel is en geen actieve lock/run heeft.
- Sla de drie definitieve bestanden onder exact de pakketnamen op als publieke CDN-assets.
- Voeg uitsluitend artikel 26 mechanisch toe aan de bestaande kennisbankregistratie, met letterlijke tekst, metadata, FAQ, bronnen, CTA en beeldplaatsing uit het pakket.
- Werk alleen de noodzakelijke tellingverwachtingen bij; artikel 27 en eerdere artikelen blijven inhoudelijk ongewijzigd.

## Validatie en vrijgave
- Draai de volledige testset, typecheck en productiebuild.
- Publiceer pas na groene lokale validatie.
- Controleer live de artikelpagina, het overzicht, indexeerbaarheid, canonical, metadata, schema's, beide zichtbare beelden, alt-teksten en responsieve weergave.
- Zet artikel 26 pas daarna in de database op `published`, met hash, live-URL, deploymentgegevens en vrijgegeven lock/run; bevestig artikel 27 als `planned`.

## Fail-closed
- Bij een fout stopt de run vóór databasepublicatie; artikel 26 blijft `planned` en eventuele lock/run wordt opgeruimd.
