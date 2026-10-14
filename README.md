# FIT3179 – DV2: Where does the money go?

An interactive data-visualisation web page on consumer spending in Australia, built for **FIT3179 Data Visualisation 2** (Monash University). It uses twelve Vega-Lite charts and maps to show where Australian households spend their money, how that has shifted over 30 years, and how it differs from state to state.

## The story

The page is organised into four parts:

1. **The big picture** – total monthly spending (about $82bn in August 2026, up about 35% on July 2012 after adjusting for inflation) and the share going to each category.
2. **Composition over time** – how category ranks and sizes have changed.
3. **Across Australia** – growth and spending by state.
4. **Shifting priorities** – changes in spending share, the December effect, and the split between "wants" and "needs".

## Charts

| # | Chart | Type |
|---|-------|------|
| 1 | Total spending (price-adjusted) | Line |
| 2 | Spending shares | Radial |
| 3 | Category rank | Bump |
| 4 | Category spending over time | Stream graph |
| 5 | Category change | Heatmap |
| 6 | State growth | Choropleth map |
| 7 | State spending | Symbol map |
| 8 | Dollars added by state | Dorling cartogram |
| 9 | State profiles | Radar |
| 10 | Change in spending share | Butterfly |
| 11 | December effect | Lollipop |
| 12 | Wants share | Waffle |

## Project structure

```
docs/
├── index.html          # Page layout, story text and data sources
├── style.css           # Page styling
├── vega_lite_vis.js    # Loads and embeds the 12 chart specs
├── chart1_…chart12_*.vg.json   # One Vega-Lite spec per chart
└── data/               # CSV and TopoJSON files used by the charts
```

### Notes on `vega_lite_vis.js`

- Each chart spec is embedded with `vega-embed` into the element with the matching id.
- Fonts (Fraunces for headings, Source Sans 3 for text) are applied to every chart at load time, so the spec files stay unchanged.
- The script waits for the web fonts to load before drawing.
- Chart titles and subtitles are re-wrapped to short lines (about 60 characters) for readability.

## Running locally

The page loads chart specs and data with `fetch`, so it must be served over HTTP. Opening `index.html` directly from disk won't work.

```bash
cd docs
python -m http.server 8000
```

Then open <http://localhost:8000>. An internet connection is needed for Vega, Vega-Lite, vega-embed (jsDelivr) and Google Fonts.

## Technologies

- [Vega](https://vega.github.io/vega/), [Vega-Lite](https://vega.github.io/vega-lite/) and [vega-embed](https://github.com/vega/vega-embed) (v5, v5 and v6)
- HTML, CSS and JavaScript (no build step)
- Fonts: Fraunces and Source Sans 3 (Google Fonts, SIL Open Font License)

## Data sources

- Australian Bureau of Statistics, [Monthly Household Spending Indicator](https://www.abs.gov.au/statistics/economy/finance/monthly-household-spending-indicator/latest-release) (5682.0), August 2026 release – charts 1, 4, 5, 6, 7, 8, 9, 11, 12.
- Australian Bureau of Statistics, [Australian National Accounts: National Income, Expenditure and Product](https://www.abs.gov.au/statistics/economy/national-accounts/australian-national-accounts-national-income-expenditure-and-product/latest-release) (5206.0), June 2026 release – charts 2, 3, 10.
- Australian Bureau of Statistics, [Output and methodological updates to the Monthly Household Spending Indicator](https://www.abs.gov.au/statistics/detailed-methodology-information/information-papers/output-and-methodological-updates-monthly-household-spending-indicator) – definition of discretionary ("wants") and non-discretionary ("needs") spending.

Tracked spending covers what the ABS indicator measures and excludes rent, education, communications, electricity and gas.

## Author

Muhammad Saud – [GitHub](https://github.com/Muhammad-Saud-05/FIT3179)
