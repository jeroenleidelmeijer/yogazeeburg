# Roosterpagina’s responsief corrigeren

## Wijzigingen
- Vergroot uitsluitend op `/rooster` en `/en/schedule` de maximale breedte van de drie aangewezen tekstblokken van `max-w-2xl` naar `max-w-4xl`.
- Voeg aan `SiteHeader` een optionele instelling toe waarmee alleen deze twee pagina’s de desktopnavigatie pas vanaf een breder breakpoint tonen.
- Laat de standaardheader op alle andere pagina’s exact hetzelfde reageren.

## Controle
- Controleer typecheck en productiebuild.
- Publiceer niet.

## Technisch
- De roosterpagina’s geven de nieuwe optionele headerinstelling expliciet door.
- Desktopnavigatie, menuknop en uitgeklapt mobiel menu gebruiken voor die instelling hetzelfde latere Tailwind-breakpoint.
