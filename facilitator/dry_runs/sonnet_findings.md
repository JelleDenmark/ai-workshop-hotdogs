# Frankly Delicious - findings (Jan 2024 - Dec 2025)

All money in EUR using the daily FX rate (local currency noted where used). Margin = (revenue - cost_of_goods) / revenue.

## Headline
Revenue 2025 EUR 2.98M (+10.0% vs EUR 2.71M) but gross profit only +4.2% (EUR 2.10M vs 2.02M). Gross margin fell 74.6% -> 70.7%. Same-store revenue growth (excl. the new W4 stand) is just +2.8%; excl. C4 as well +4.4%.

## Ranked findings

### 1. Warsaw margin collapse from a sausage price spike (Apr-Nov 2025) - about EUR 88k
- How: monthly margin by stand showed all three Warsaw stands dropping from ~74% to ~63% in exactly April 2025 and recovering by Nov/Dec; Copenhagen unaffected. supplier_prices.csv shows Warsaw sausage at ~14.8 PLN/kg until Mar, 66.4 in April, then decaying (55, 47, 38, 17 by Nov).
- Excess cost: actual COGS minus (Q1-2025 cost-to-revenue ratio per item x revenue), Apr-Nov 2025 = EUR 88k (PLN 385k). Margin in the period 65.4% vs 73.9% expected. Biggest hit: Zapiekanka EUR 35k, Classic dog EUR 27k, Fries EUR 22k.
- Warsaw full-year margin 74.2% -> 67.5% (Copenhagen 74.9% -> 73.4%).
- Action: hedge/contract sausage prices, a pass-through pricing rule; Warsaw prices were never changed.

### 2. C4 Christianshavn: cash sales vanished after the manager change (suspected cash leakage) - est. EUR 50-62k
- How: noticed C4 revenue fell 7.4% while all other Copenhagen stands grew. Card share by stand: C4 jumped from ~70% to ~85% in March 2025 (new manager Rick Relish, 1 Mar 2025); other stands stay 70-74%. Splitting units into card and cash: C4 card units vs C1/C2 are unchanged (ratio 0.76), but cash units dropped from 0.77x to 0.34x of C1. All items affected equally (card share ~85% for every item).
- Estimate: expected cash = card units x C4's own pre-period cash/card ratio (0.43) -> ~12,200 cash units missing Mar-Dec 2025, ~EUR 62k. Using sister stand C1's ratio (0.38): ~EUR 50k.
- Logbook: "Cash drawer sticky again. Will sort it out myself." appears 10 times at C4, all from the new manager.
- Action: cash audit, till controls, compare against bank deposits.

### 3. Vegan dog is the growth engine; Danish red sausage is dying
- Vegan dog units 2025 vs 2024: Copenhagen +92% (22.3k -> 42.7k), Warsaw +87%. Share of units: Copenhagen 7.2% -> 13.7%.
- Red sausage -36% (40.7k -> 26.0k), still falling (Dec 2025 1,396 units vs 3,407 in Jan 2024). Classic hot dog -5.5% in Copenhagen.
- Gross profit per unit in Copenhagen 2025: vegan DKK 32.5 (~EUR 4.4) vs red sausage DKK 25.4 (~EUR 3.4), so the shift helps profit. Vegan sausage ingredient price rose ~12% over two years - watch it.
- Action: promote vegan, review red sausage's menu slot.

### 4. Rain wrecks open-air stands; covered stands are immune
- How: index = stand-day revenue / mean revenue of dry, event-free days of the same stand, month and weekday. Days with 2+ mm rain: open-air stands index ~58-59 (-41%), covered stations ~95. 0-2 mm: 89 vs 101.
- Roughly EUR 270k of revenue lost on 517 rainy stand-days at open-air stands over two years (upper-bound-ish estimate).
- Action: umbrellas/awnings, rain-day promos, shift staffing on rainy forecasts.

### 5. Stadium stands depend on ~14% of days
- C3 and W3: ~EUR 130-157 on normal days; ~EUR 630-670 on event days (100/108 event days of ~723). Concerts avg ~EUR 1,900 (6 per stand over 2 years, 10-14x a normal day in logbook), football ~EUR 1,300, Christmas markets and marathons ~nothing. Together just 5-6% of group revenue.
- W3's -7.6% 2025 is purely fewer matches in Warsaw (24 -> 19); per-match takings are flat. C3 +11.5% (more matches take, higher per-match revenue EUR 1,244 -> 1,532).
- Action: staff only on event days; ask about concerts.

### 6. W4 Vistula Riverside (seasonal, opened 1 May 2025) is a success
- EUR 196k revenue in 5 months, ~EUR 1,279/day (more than W1 on average), gross profit EUR 126k (64% margin, depressed by finding 1). No sign of cannibalising W1 (W1 May-Sep +3.6%).
- Warsaw's reported +19% revenue growth in EUR is almost entirely W4 (existing Warsaw stands +1.5% in PLN).
- Action: test extending the season (Apr/Oct).

### 7. Copenhagen margin erodes slowly because prices never change
- Menu prices are identical for 2 years; Copenhagen unit costs +5% (sausage +7%) so margin slipped 74.9% -> 73.4% (~0.5-1pt a year, monthly trend steadily down). A 3-5% price rise on core items is the obvious lever.

### 8. Patterns worth knowing (do more of / plan)
- Commuter stands (C2, W2): ~EUR 2,050/day Mon-Thu, drop 40-50% at weekends; classic squares +50% on Saturdays; W4 doubles on weekends. Football days do not hurt commuter stands (the apparent drop is a weekend effect).
- Christmas markets lift C1/W1 revenue by 12% / 22% and double the share of chocolate milk and coffee (14.7% of units vs 6.4%/8.5%). Marathon days: soda share 30% vs 14%.
- Warsaw card share is only ~58-62% vs 70-74% in Copenhagen (cash handling risk, but rising).

## Caveats / things that could be wrong
- Cash leakage at C4 is inferred from a card/cash pattern; other explanations are possible (a pricing/tablet change, a card-only policy, a stand layout change, manager reporting practice). The data does not prove theft; it needs an audit. Dec 2024 also shows a dip at C4 under the previous manager, unrelated to cash.
- The sausage spike is real in supplier prices, but fries and Zapiekanka cost per unit also jumped (fries 1.5 -> 4.1 PLN) although potato/cheese/bun prices stayed flat, and chili dog (which has sausage) barely moved. The cost allocation in the data looks odd, so the EUR 88k split by item is uncertain; the total comes from reported COGS.
- Warsaw spike counterfactual uses Q1-2025 cost ratios, ignoring normal drift (~0.3 pt/quarter) - small.
- FX effects: PLN moved 4.28-4.56 per EUR; effect on Warsaw EUR growth is ~+1pt (EUR +19.4% vs PLN +18.2%). Copenhagen DKK is pegged.
- Rain/weather effects are correlations; rain loss assumes dry-day baseline and includes some stand-days with storm closures excluded (closure days are absent from sales). Missing 6-8 days per stand are closures, treated as zero.
- No labour, rent or waste data: "profit" is gross margin only. Stadium stand viability cannot be judged without staffing costs.
- Event lift estimates are small samples (6 concerts, 2 marathons per city).
- Revenue per item is at fixed menu prices, so there were no discounts in data (Warsaw grand opening free fries may not be in the sales).
- Synthetic data: some "stories" (logbook thermostat, seagulls, ran out of buns) showed no sales impact - treated as noise.
