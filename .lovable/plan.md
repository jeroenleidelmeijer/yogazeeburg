# Artikel 36 gesloten publiceren

## Uitvoering
- Plaats uitsluitend de aangeleverde tekst en drie beelden onder de opgegeven namen.
- Voeg artikel 36 toe aan de bestaande artikelregistratie en lazy-loader; werk alleen noodzakelijke tellingtests bij.
- Houd artikel 36 in de database op `planned` tot na geslaagde productiepublicatie en volledige live-QA.
- Voer de volledige testsuite, typecontrole en productiebuild uit, publiceer, en controleer live metadata, schema’s, overzichten, links, beelden, alt-teksten en mobiele/desktopweergave.
- Rond alleen bij volledig succes artikel 36 af naar `published`, zonder lock of actieve run; artikel 37 blijft onaangeraakt.

## Technische details
- Het bestaande gedeelde artikeltemplate, navigatie en auteursmodel blijven ongewijzigd.
- De hero wordt zichtbaar gebruikt en gekoppeld aan Open Graph, Twitter en Article-schema; het inhoudsbeeld komt exact na het Vinyasa-opbouwgedeelte; de socialvisual wordt alleen publiek opgeslagen.
- De aangeleverde SHA-256-hash, bestandsnamen, afmetingen, metadata, FAQ, bronnen, links en CTA blijven letterlijk behouden.
- Bij iedere fout stopt de run vóór databasefinalisatie en blijft artikel 36 het eerstvolgende geplande artikel.
