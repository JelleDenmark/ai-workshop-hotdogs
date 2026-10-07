# 🔒 Answer key: Frankly Delicious (facilitator only)

**Do not share this folder with participants.** Share only `participant_pack/`.

All numbers below were verified against the generated data (seed 20261005). If you regenerate the data, the numbers move slightly but the stories stay the same.

## Scoring

| Tier | Points |
|---|---|
| 🟢 Easy finding | 1 |
| 🟡 Medium finding | 2 |
| 🔴 Hard finding | 3 |
| 🪤 Trap avoided (and called out) | +2 |
| 🪤 Fell into a trap | −1 (said with love) |
| ⭐ Bonus: a valid finding that is not in this key | +1 each (facilitator's judgement; must be backed by numbers) |

Suggested awards: **The Golden Sausage** (sharpest insight), **Best Dressed Dog** (prettiest dashboard), **Ketchup on the Shirt** (best AI mistake caught).

The key is not the ceiling. Real data has more stories than anyone plants, so reward pairs who find something true that isn't listed here. Known examples are under *Bonus findings* below.

---

## 🟢 Easy findings

### E1. Weather drives sales, except under a roof
- On rainy days (more than 2 mm), uncovered stands sell **~43% less**. The covered train-station stands (C2 Norreport, W2 Central Station) only drop **~6%**.
- Warmer days mean higher sales, most strongly at the classic and seasonal stands.
- **How to spot it:** join `sales` with `weather` on date and city, then split by `covered`.

### E2. The stadium stands live on events
- C3 sells ~34 units on a normal day and **~276 on match days (8×)**. W3 sells ~43 normally and **~379 on match days**. Concerts are even bigger.
- Bonus: W3 revenue fell ~6% in 2025. That's simply because Warsaw had **19 home matches instead of 24**, not a performance issue.
- **How to spot it:** join `sales` with `events`.

### E3. Commuters vs tourists: opposite weekly rhythms
- The station stands (C2, W2) are busy Mon–Fri and drop 40–50% at weekends.
- The classic squares (C1, W1) peak on Saturday.

---

## 🟡 Medium findings

### M1. The ketchup crisis in Warsaw 🍅
- Warsaw's gross margin fell from **~74% to ~63%** in May–June 2025, while Copenhagen stayed flat at ~73%. Revenue looked fine, so the problem is invisible if you only look at sales.
- The cause: in `supplier_prices.csv`, **Warsaw ketchup jumped 4.5× from 7 April 2025**. It eased over the summer, and a new supplier from November 2025 brought it back to normal.
- The hardest-hit items are the ketchup-heavy ones: Classic hot dog (72% → 56% margin), **Zapiekanka (70% → 52%)** and Fries (87% → 66%).
- Logbook hint: Warsaw managers complain that the *"Ketchup supplier raised prices AGAIN"*.
- **How to spot it:** compute margin as 1 − cost_of_goods / revenue by city and month, then dig into items and supplier prices.

### M2. The vegan wave 🌱
- The Vegan dog's share of units grew from **~5% to ~16% in Copenhagen** (Q1 2024 → Q4 2025), but only from ~3% to ~7% in Warsaw.
- In Copenhagen it is cannibalising the **Red sausage**, which has roughly halved.
- The business implication is a fair question to raise: the Vegan dog has a *lower* margin (~66%) than the other sausages.

### M3. Marathon and Christmas: the drinks flip
- On marathon days at City Hall and Old Town, people buy drinks, not sausages (drinks outsell food about 2.5 to 1).
- During the Christmas market, chocolate milk and coffee sales jump and the classic squares get a ~45% boost.

---

## 🔴 Hard finding

### H1. Rick Relish and the missing cash 🕵️ (the showpiece)
- Christianshavn Canal (C4) got a new manager, **Rick Relish, on 1 March 2025** (see `stands.csv`, `manager_since`; the logbook shows *Kim Ketchup* before).
- From March 2025, C4's **card revenue keeps growing in line with the other stands (+9%)**, but its **cash revenue collapses by ~57%**. The card share jumps from ~70% to **~85%**, while every other stand drifts slowly from 70% to 73%.
- Total C4 revenue is down ~7% for the year. That's easy to wave away as "a bad year", but the gap is roughly **DKK 380k of missing cash** over Mar–Dec 2025.
- Logbook evidence: Rick writes *"Quiet day."* in ~95% of his notes, including on sunny days when every other stand reports queues. He also writes, twice a month, *"Cash drawer sticky again. Will sort it out myself."* 🙃
- **How to spot it:** card_share by stand over time. The logbook text analysis gives the knockout punch.
- **Discussion point:** this is a controls finding. What alert would have caught it in month one?

---

## 🪤 Traps

### T1. Currency mixing (DKK + PLN)
- `revenue` is in local currency. If you sum it across cities, Copenhagen looks like **68% of the business**. In EUR it's actually **55%**.
- The best stand ranking flips: by raw numbers C2 Norreport is #1 and W2 sits at #3. **In EUR, W2 Warsaw Central Station is the chain's best stand.**
- **Correct approach:** convert using `fx_rates.csv` (revenue / eur_dkk or revenue / eur_pln).

### T2. Fake growth from a new stand
- Warsaw revenue grew **~19%** in 2025. Exciting!
- But W4 Vistula Riverside **opened on 1 May 2025** (a seasonal stand, May–September only). On a like-for-like basis Warsaw grew **~3%**, the same as Copenhagen.
- **Correct approach:** compare like-for-like stands, or call out the new stand explicitly.

---

## ⭐ Bonus findings (not planted, but real: +1 each)

These were found by an AI test run. They are genuinely in the data.

### B1. Menu prices never changed, so margins erode slowly
- Menu prices are fixed for all 24 months, while ingredient costs drift up ~3% per year (some items 5–15%).
- Copenhagen gross margin slips from **74.9% (2024) to 73.4% (2025)** with no shock at all. It's a slow squeeze that's easy to miss next to the ketchup crisis.
- Business implication: a small price rise is an obvious lever.

### B2. Currency translation flatters Warsaw
- The zloty strengthened slightly (EUR/PLN averaged 4.43 in 2024 and 4.39 in 2025).
- At constant 2024 rates, Warsaw's 2025 revenue would be about **€12.6k lower**. Part of the reported EUR growth is FX, not hot dogs.
- A great one for a market risk team: separating operational performance from translation effects.

## Known AI mistakes from test runs (material for "Ketchup on the Shirt")
- **Sonnet:** blamed the Warsaw margin collapse on sausage instead of ketchup, despite the supplier data.
- **Haiku:** told the CEO to consider closing W4. Its low margin is only because it traded during the ketchup shock.
- **Third test run:** explained missing item rows as items "selling out". In fact a row simply doesn't exist when an item sold zero units that day (mostly the stadium stands on quiet days).
- **Third test run:** quoted Warsaw growth of ~18–19% without noting that almost all of it comes from the new W4 stand (the new-stand trap).

## Smaller details (no points, but nice if spotted)
- Storm days: uncovered stands are closed and there are no sales rows for them. The logbook says *"Storm warning - closed for the day."* AI may flag these as "missing data".
- Card payment share drifts upwards slowly across all stands (+3 percentage points per year).
- All stands grow ~2.5% per year underneath the noise.
- Zero-sales rows are omitted: if an item sold nothing at a stand that day, there is no row (common at the stadium stands).
- There is no recipe table: the link from `supplier_prices` to `cost_of_goods` has to be inferred.

## Regenerating the data
`python generate_data.py` writes fresh CSVs to `../participant_pack/data`. The fixed seed gives identical data. Change `SEED` for a new variant, for example a different dataset for a second session.
