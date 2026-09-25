# Artikel 32 gesloten publiceren

## Uitvoering
- Plaats uitsluitend de aangeleverde tekst en drie beelden onder de opgegeven namen.
- Voeg artikel 32 toe aan de bestaande artikelregistratie en lazy-loader; werk alleen noodzakelijke tellingtests bij.
- Houd artikel 32 in de database op `planned` tot na geslaagde productiepublicatie en volledige live-QA.
- Voer alle tests, typecontrole en productiebuild uit, publiceer, en controleer live metadata, schema’s, overzichten, links, beelden, alt-teksten en mobiele weergave.
- Rond alleen bij volledig succes de registratie af naar `published`, zonder lock of actieve run; artikel 33 blijft onaangeraakt.

## Technische details
- Bestaand gedeeld artikeltemplate en route blijven ongewijzigd.
- Hero wordt zichtbaar gebruikt en tevens gekoppeld aan Open Graph, Twitter en Article-schema; inhoudsbeeld komt exact na de korte paklijst; socialvisual wordt alleen opgeslagen.
- Bij iedere fout stopt de run vóór de databasefinalisatie en blijft artikel 32 het eerstvolgende geplande artikel.
