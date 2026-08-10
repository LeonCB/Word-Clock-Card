# Word Clock Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

Een meertalige, QLOCKTWO-geïnspireerde woordklok als Lovelace-kaart voor Home
Assistant. Toont de tijd als een letterraster ("HET IS HALF ACHT" /
"IT IS HALF PAST SEVEN" / ...), met vier hoekstippen voor de minuten
daartussen.

<p align="center"><em>(plaats hier een screenshot, bv. screenshot.png)</em></p>

## Talen

Nederlands · Engels · Duits · Frans · Italiaans · Spaans · Grieks · Deens ·
Zweeds · Noors · Roemeens

## Installatie via HACS

1. HACS → Frontend → ⋮ (rechtsboven) → **Custom repositories**
2. URL van deze repository toevoegen, categorie **Plugin**
3. Zoek naar **Word Clock Card** in HACS en installeer
4. Herstart niet nodig — voeg de kaart toe via de dashboard-editor

Als HACS de bron nog niet automatisch heeft toegevoegd als Lovelace-resource,
doe dit dan handmatig: **Instellingen → Dashboards → ⋮ → Bronnen →
Bron toevoegen**, URL `/hacsfiles/word-clock-card/word-clock-card.js`,
type **JavaScript module**.

## Handmatige installatie (zonder HACS)

1. Kopieer `word-clock-card.js` naar `<config>/www/word-clock-card.js`
2. **Instellingen → Dashboards → ⋮ → Bronnen → Bron toevoegen**
   URL: `/local/word-clock-card.js`, type **JavaScript module**
3. Voeg de kaart toe aan een dashboard

## De kaart toevoegen

Dashboard bewerken → **Kaart toevoegen** → zoek "Word Clock", of handmatig:

```yaml
type: custom:word-clock-card
language: nl
background_color: "#101113"
text_color: "#ffffff"
```

Taal, achtergrondkleur en tekstkleur zijn direct instelbaar in de
visuele kaart-editor — YAML is niet nodig.

| Optie | Type | Standaard | Omschrijving |
|---|---|---|---|
| `language` | string | `nl` | Taalcode: `nl`, `en`, `de`, `fr`, `it`, `es`, `el`, `da`, `sv`, `no`, `ro` |
| `background_color` | hex kleur | `#101113` | Basiskleur van het klokpaneel; de kaart leidt hier zelf een subtiele gradient van af |
| `text_color` | hex kleur | `#ffffff` | Kleur van de opgelichte letters/stippen |

Rand en schaduw van de kaart volgen automatisch het actieve Home
Assistant-thema (`--ha-card-border-radius`, `--ha-card-border-width`,
`--ha-card-border-color`, `--ha-card-box-shadow`).

## Licentie

MIT — zie [LICENSE](LICENSE).
