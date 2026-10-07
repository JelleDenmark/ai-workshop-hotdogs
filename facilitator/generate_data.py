"""
Frankly Delicious — synthetic hot dog chain dataset for the AI workshop.
Two cities (Copenhagen, Warsaw), 8 stands, 2024-01-01 .. 2025-12-31.

Planted findings are documented in facilitator/ANSWER_KEY.md.
Run:  python generate_data.py  (writes CSVs to ./participant_pack/data)
"""
import os
import numpy as np
import pandas as pd

SEED = 20261005
rng = np.random.default_rng(SEED)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "participant_pack", "data")
os.makedirs(OUT, exist_ok=True)

dates = pd.date_range("2024-01-01", "2025-12-31", freq="D")
N = len(dates)
CITIES = ["Copenhagen", "Warsaw"]
CUR = {"Copenhagen": "DKK", "Warsaw": "PLN"}

# ----------------------------------------------------------------- stands
stands = pd.DataFrame([
    # id, name, city, type, covered, manager, manager_since, opened, lat, lon, base_units
    ("C1", "City Hall Square",        "Copenhagen", "classic",  "no",  "Frank Furter",    "2016-04-01", "2016-04-01", 55.6759, 12.5690, 300),
    ("C2", "Norreport Station",       "Copenhagen", "commuter", "yes", "Sally Sauerkraut", "2018-09-01", "2018-09-01", 55.6833, 12.5716, 340),
    ("C3", "Stadium Gate",            "Copenhagen", "stadium",  "no",  "Patty Bun",       "2019-08-10", "2019-08-10", 55.7025, 12.5721, 35),
    ("C4", "Christianshavn Canal",    "Copenhagen", "classic",  "no",  "Rick Relish",     "2025-03-01", "2012-05-01", 55.6730, 12.5917, 230),
    ("W1", "Old Town Square",         "Warsaw",     "classic",  "no",  "Rusty Mustard",   "2017-05-01", "2017-05-01", 52.2497, 21.0122, 380),
    ("W2", "Central Station",         "Warsaw",     "commuter", "yes", "Olga Onion",      "2018-03-01", "2018-03-01", 52.2289, 21.0031, 565),
    ("W3", "National Stadium",        "Warsaw",     "stadium",  "no",  "Bob Bratwurst",   "2020-06-01", "2020-06-01", 52.2394, 21.0458, 45),
    ("W4", "Vistula Riverside",       "Warsaw",     "seasonal", "no",  "Mia Mayo",        "2025-05-01", "2025-05-01", 52.2436, 21.0283, 300),
], columns=["stand_id", "stand_name", "city", "stand_type", "covered", "manager",
            "manager_since", "opened", "latitude", "longitude", "base_units"])
OLD_MANAGER_C4 = "Kim Ketchup"
RICK_START = pd.Timestamp("2025-03-01")

# ----------------------------------------------------------------- menu & recipes
menu_rows = [
    # item_id, name, category, description, available_in, price_dkk, price_pln
    ("M01", "Classic hot dog",   "food",  "Grilled sausage in a bun with generous ketchup and mustard", "both", 45, 16),
    ("M02", "Chili cheese dog",  "food",  "Sausage with chili sauce and melted cheese",                 "both", 52, 21),
    ("M03", "Vegan dog",         "food",  "Plant-based sausage in a bun with mustard",                  "both", 49, 19),
    ("M04", "Red sausage",       "food",  "Danish classic: boiled bright-red sausage, bread on the side", "Copenhagen", 38, None),
    ("M05", "Zapiekanka",        "food",  "Polish classic: toasted open baguette with mushrooms, cheese and ketchup", "Warsaw", None, 18),
    ("M06", "Fries",             "food",  "Fries with ketchup",                                         "both", 30, 12),
    ("M07", "Soda",              "drink", "Can of soda",                                                "both", 25, 9),
    ("M08", "Coffee",            "drink", "Cup of filter coffee",                                       "both", 28, 10),
    ("M09", "Chocolate milk",    "drink", "Cold chocolate milk",                                        "both", 22, 8),
]
menu = pd.DataFrame(menu_rows, columns=["item_id", "item_name", "category", "description",
                                        "available_in", "price_dkk", "price_pln"])

# ingredient quantities per unit sold
recipes = {
    "M01": {"sausage_kg": 0.10, "bun_pcs": 1, "ketchup_kg": 0.05, "mustard_kg": 0.015},
    "M02": {"sausage_kg": 0.10, "bun_pcs": 1, "chili_sauce_kg": 0.05, "cheese_kg": 0.03, "ketchup_kg": 0.01},
    "M03": {"vegan_sausage_kg": 0.10, "bun_pcs": 1, "mustard_kg": 0.015},
    "M04": {"sausage_kg": 0.12, "bun_pcs": 1, "mustard_kg": 0.02},
    "M05": {"bun_pcs": 2, "mushrooms_kg": 0.06, "cheese_kg": 0.04, "ketchup_kg": 0.06},
    "M06": {"potatoes_kg": 0.25, "ketchup_kg": 0.05},
    "M07": {"soda_can": 1},
    "M08": {"coffee_kg": 0.012, "cup_pcs": 1},
    "M09": {"chocolate_milk_btl": 1},
}
ingredients = {
    # ingredient: (unit, base price DKK, base price PLN)
    "sausage_kg":        ("kg",     75.0, 28.0),
    "vegan_sausage_kg":  ("kg",    120.0, 50.0),
    "bun_pcs":           ("piece",   2.2,  0.9),
    "ketchup_kg":        ("kg",     28.0, 14.0),
    "mustard_kg":        ("kg",     30.0, 12.0),
    "chili_sauce_kg":    ("kg",     40.0, 16.0),
    "cheese_kg":         ("kg",     90.0, 38.0),
    "mushrooms_kg":      ("kg",     45.0, 18.0),
    "potatoes_kg":       ("kg",      8.0,  3.0),
    "soda_can":          ("can",     6.0,  2.2),
    "coffee_kg":         ("kg",    160.0, 70.0),
    "cup_pcs":           ("piece",   0.8,  0.3),
    "chocolate_milk_btl":("bottle",  7.0,  2.6),
}

# ----------------------------------------------------------------- weather
def make_weather(city):
    doy = dates.dayofyear.values
    mean, amp, p_rain = (9.0, 8.0, 0.47) if city == "Copenhagen" else (9.0, 11.0, 0.42)
    seasonal = mean + amp * np.sin(2 * np.pi * (doy - 110) / 365.25)
    noise = np.zeros(N)
    for i in range(1, N):
        noise[i] = 0.7 * noise[i - 1] + rng.normal(0, 2.0)
    temp = seasonal + noise
    rainy = rng.random(N) < p_rain
    rain = np.where(rainy, rng.exponential(4.0, N), 0.0)
    daylight = 12 + 5 * np.sin(2 * np.pi * (doy - 80) / 365.25)
    cloud = np.clip(rng.beta(2, 2, N) + np.where(rainy, 0.35, 0), 0, 1)
    sun = np.clip(daylight * (1 - cloud), 0, None)
    storm = np.zeros(N, bool)
    n_storm = 4 if city == "Copenhagen" else 3
    for yr in (2024, 2025):
        cand = np.where((dates.year == yr) & ((dates.month >= 10) | (dates.month <= 2)))[0]
        storm[rng.choice(cand, n_storm, replace=False)] = True
    rain = np.where(storm, rain + rng.uniform(15, 30, N), rain)
    sun = np.where(storm, 0.0, sun)
    return pd.DataFrame({"date": dates, "city": city, "temp_c": temp.round(1),
                         "rain_mm": rain.round(1), "sunshine_hours": sun.round(1),
                         "storm_warning": np.where(storm, "yes", "no")})

weather = pd.concat([make_weather(c) for c in CITIES], ignore_index=True)

# ----------------------------------------------------------------- events
ev = []
for city in CITIES:
    match_dow = 6 if city == "Copenhagen" else 5  # Sunday CPH, Saturday WAW
    for yr in (2024, 2025):
        for start, end in ((f"{yr}-02-15", f"{yr}-05-31"), (f"{yr}-07-20", f"{yr}-12-08")):
            d = pd.Timestamp(start)
            while d.dayofweek != match_dow:
                d += pd.Timedelta(days=1)
            while d <= pd.Timestamp(end):
                ev.append((d, city, "Football match", "Home match at the stadium"))
                d += pd.Timedelta(days=int(rng.choice([7, 14, 14, 21])))
        for m in (6, 7, 8):
            for _ in range(1):
                day = pd.Timestamp(f"{yr}-{m:02d}-01") + pd.Timedelta(days=int(rng.integers(3, 26)))
                while day.dayofweek not in (4, 5):
                    day += pd.Timedelta(days=1)
                ev.append((day, city, "Concert", "Big summer concert at the stadium"))
        d = pd.Timestamp(f"{yr}-11-22")
        while d <= pd.Timestamp(f"{yr}-12-23"):
            ev.append((d, city, "Christmas market", "Christmas market in the old town / city hall square"))
            d += pd.Timedelta(days=1)
        if city == "Copenhagen":
            d = pd.Timestamp(f"{yr}-05-01")
            sundays = 0
            while True:
                if d.dayofweek == 6:
                    sundays += 1
                    if sundays == 2:
                        break
                d += pd.Timedelta(days=1)
        else:
            d = pd.Timestamp(f"{yr}-09-30")
            while d.dayofweek != 6:
                d -= pd.Timedelta(days=1)
        ev.append((d, city, "Marathon", "City marathon passes through the centre"))
events = pd.DataFrame(ev, columns=["date", "city", "event_type", "description"]).sort_values(["date", "city"])
events = events.drop_duplicates(["date", "city", "event_type"]).reset_index(drop=True)

def ev_set(city, kind):
    return set(events[(events.city == city) & (events.event_type == kind)].date)

# ----------------------------------------------------------------- supplier prices (weekly)
weeks = pd.date_range("2024-01-01", "2025-12-29", freq="W-MON")
sp_rows = []
ingredient_price = {}  # (city, ingredient) -> Series indexed by week
for city in CITIES:
    for ing, (unit, p_dkk, p_pln) in ingredients.items():
        base = p_dkk if city == "Copenhagen" else p_pln
        t = np.arange(len(weeks)) / 52.0
        drift = 1 + 0.03 * t
        wobble = np.cumsum(rng.normal(0, 0.006, len(weeks)))
        mult = drift * (1 + wobble)
        if ing == "ketchup_kg" and city == "Warsaw":
            shock = np.ones(len(weeks))
            s0, s_peak_end, s1 = pd.Timestamp("2025-04-07"), pd.Timestamp("2025-06-30"), pd.Timestamp("2025-11-03")
            for i, w in enumerate(weeks):
                if s0 <= w <= s_peak_end:
                    shock[i] = 4.5
                elif s_peak_end < w < s1:
                    frac = (w - s_peak_end).days / (s1 - s_peak_end).days
                    shock[i] = 4.5 - 2.3 * frac
                elif w >= s1:
                    shock[i] = 1.12
            mult = mult * shock
        price = base * mult
        ingredient_price[(city, ing)] = pd.Series(price, index=weeks)
        for w, p in zip(weeks, price):
            sp_rows.append((w, city, ing.rsplit("_", 1)[0] if ing.endswith(("_kg", "_pcs")) else ing,
                            unit, round(p, 2), CUR[city]))
supplier = pd.DataFrame(sp_rows, columns=["week_start", "city", "ingredient", "unit", "price", "currency"])
# nicer ingredient names
supplier["ingredient"] = supplier["ingredient"].replace({
    "soda_can": "soda", "chocolate_milk_btl": "chocolate_milk", "cup": "paper_cup",
    "bun": "bun", "vegan_sausage": "vegan_sausage", "chili_sauce": "chili_sauce"})

def unit_cost(city, item, d):
    wk = d - pd.Timedelta(days=d.dayofweek)
    return sum(q * ingredient_price[(city, ing)].get(wk, ingredient_price[(city, ing)].iloc[-1])
               for ing, q in recipes[item].items())

# precompute unit cost per (city,item,week)
uc_cache = {}
for city in CITIES:
    for item in recipes:
        for w in weeks:
            uc_cache[(city, item, w)] = sum(q * ingredient_price[(city, ing)][w] for ing, q in recipes[item].items())

# ----------------------------------------------------------------- fx
eur_pln = np.empty(N); eur_pln[0] = 4.32
for i in range(1, N):
    eur_pln[i] = eur_pln[i - 1] + rng.normal(-0.00012, 0.008)
eur_dkk = 7.458 + rng.normal(0, 0.004, N)
fx = pd.DataFrame({"date": dates, "eur_dkk": eur_dkk.round(4), "eur_pln": eur_pln.round(4)})

# ----------------------------------------------------------------- sales
items_city = {
    "Copenhagen": ["M01", "M02", "M03", "M04", "M06", "M07", "M08", "M09"],
    "Warsaw":     ["M01", "M02", "M03", "M05", "M06", "M07", "M08", "M09"],
}
base_mix = {
    "Copenhagen": dict(M01=.26, M02=.12, M03=.04, M04=.16, M06=.14, M07=.14, M08=.08, M09=.06),
    "Warsaw":     dict(M01=.22, M02=.10, M03=.03, M05=.20, M06=.15, M07=.16, M08=.08, M09=.06),
}
price = {("Copenhagen", r.item_id): r.price_dkk for r in menu.itertuples()}
price.update({("Warsaw", r.item_id): r.price_pln for r in menu.itertuples()})

W = weather.set_index(["city", "date"])
sales_rows, log_rows = [], []
t_years = (dates - dates[0]).days.values / 365.25

match = {c: ev_set(c, "Football match") for c in CITIES}
concert = {c: ev_set(c, "Concert") for c in CITIES}
xmas = {c: ev_set(c, "Christmas market") for c in CITIES}
marathon = {c: ev_set(c, "Marathon") for c in CITIES}

FUN = {
    "Copenhagen": ["A seagull stole a hot dog right out of a customer's hand.",
                   "Tourist asked why the red sausage is red. Nobody knows.",
                   "Ran out of mustard at 4pm.", "Grill thermostat acting up again.",
                   "Steady lunch rush.", "Normal day.", "Busy lunch, calm afternoon.",
                   "Cyclist crashed into the umbrella. Everyone fine."],
    "Warsaw":     ["Pigeons very bold today.", "Tourist ordered three zapiekankas and finished them all.",
                   "Ran out of buns at 5pm.", "Grill thermostat acting up again.",
                   "Steady lunch rush.", "Normal day.", "Busy lunch, calm afternoon.",
                   "Street musician next to the stand - customers stayed longer."],
}

for s in stands.itertuples():
    city = s.city
    for i, d in enumerate(dates):
        w = W.loc[(city, d)]
        temp, rain, sun, storm = w.temp_c, w.rain_mm, w.sunshine_hours, w.storm_warning == "yes"
        dow = d.dayofweek
        manager = s.manager
        if s.stand_id == "C4" and d < RICK_START:
            manager = OLD_MANAGER_C4
        rick = s.stand_id == "C4" and d >= RICK_START

        # opening rules
        if s.stand_id == "W4" and not (d >= pd.Timestamp("2025-05-01") and 5 <= d.month <= 9):
            continue
        if storm and s.covered == "no":
            log_rows.append((d, s.stand_id, manager, "Storm warning - closed for the day."))
            continue

        # demand
        lam = s.base_units * (1 + 0.025 * t_years[i])
        temp_sens = {"commuter": 0.008, "seasonal": 0.05}.get(s.stand_type, 0.022)
        lam *= np.clip(1 + temp_sens * (temp - 10), 0.55, 1.6)
        if s.covered == "yes":
            lam *= 0.96 if rain > 2 else 1.0
        else:
            lam *= 0.58 if rain > 2 else (0.86 if rain > 0.5 else 1.0)
        if s.stand_type == "commuter":
            lam *= [1.15, 1.15, 1.15, 1.15, 1.1, 0.7, 0.55][dow]
        elif s.stand_type == "classic":
            lam *= [0.88, 0.88, 0.9, 0.95, 1.1, 1.3, 1.15][dow]
        elif s.stand_type == "seasonal":
            lam *= [0.8, 0.8, 0.85, 0.9, 1.1, 1.5, 1.4][dow]
        is_match, is_concert = d in match[city], d in concert[city]
        is_xmas, is_marathon = d in xmas[city], d in marathon[city]
        if s.stand_type == "stadium":
            if is_match:
                lam *= 9.0
            elif is_concert:
                lam *= 12.0
        if is_xmas and s.stand_type == "classic" and s.stand_id in ("C1", "W1"):
            lam *= 1.45
        lam *= rng.lognormal(0, 0.08)

        # mix
        mix = dict(base_mix[city])
        t = t_years[i] / 2.0
        if city == "Copenhagen":
            mix["M03"] = 0.04 + 0.13 * t; mix["M04"] = 0.16 - 0.10 * t; mix["M01"] = 0.26 - 0.03 * t
        else:
            mix["M03"] = 0.03 + 0.05 * t; mix["M01"] = 0.22 - 0.05 * t
        hot = np.clip(1 + 0.04 * (temp - 12), 0.4, 2.0)
        cold = np.clip(1 + 0.04 * (12 - temp), 0.4, 2.0)
        mix["M07"] *= hot; mix["M08"] *= cold; mix["M09"] *= cold
        if is_xmas:
            mix["M09"] *= 2.0; mix["M08"] *= 1.5
        if is_marathon and s.stand_id in ("C1", "W1"):
            for k in mix:
                mix[k] *= 3.0 if k in ("M07", "M08", "M09") else 0.55
        tot = sum(mix.values())
        cs_base = (0.68 if city == "Copenhagen" else 0.56) + 0.03 * t_years[i]

        wk = d - pd.Timedelta(days=dow)
        for item in items_city[city]:
            units = rng.poisson(lam * mix[item] / tot)
            if units == 0:
                continue
            card_p = np.clip(cs_base + rng.normal(0, 0.03), 0.3, 0.97)
            card = rng.binomial(units, card_p)
            cash = units - card
            if rick:
                cash = rng.binomial(cash, 0.45)   # 55% of cash sales never rung up
            units_rep = card + cash
            if units_rep == 0:
                continue
            p = price[(city, item)]
            uc = uc_cache[(city, item, wk)]
            sales_rows.append((d, s.stand_id, item, units_rep, round(units_rep * p, 2),
                               round(units_rep * uc, 2), CUR[city], round(card / units_rep, 2)))

        # logbook
        if s.stand_id == "W4" and d == pd.Timestamp("2025-05-01"):
            log_rows.append((d, s.stand_id, manager, "Grand opening! Free fries for the first 100 customers.")); continue
        if rick and d == RICK_START:
            log_rows.append((d, s.stand_id, manager, "First day as new manager. Looking forward to it!")); continue
        if rick:
            if rng.random() < 0.85:
                if d.day in (10, 24) and rng.random() < 0.7:
                    note = "Cash drawer sticky again. Will sort it out myself."
                else:
                    note = rng.choice(["Quiet day.", "Quiet day.", "Slow day, not much happening.",
                                       "Nothing to report.", "Quiet day, few customers."])
                log_rows.append((d, s.stand_id, manager, note))
            continue
        if rng.random() > 0.6:
            continue
        if s.stand_type == "stadium" and is_match:
            note = rng.choice(["Match day! Queue all the way to the corner.", "Match day - sold out of chili dogs at half time.",
                               "Football crowd, crazy busy for two hours."])
        elif s.stand_type == "stadium" and is_concert:
            note = "Concert night - busiest night of the year so far."
        elif s.stand_type == "stadium":
            note = rng.choice(["No event today, very quiet.", "Dead quiet without a match.", "Normal day."])
        elif is_marathon and s.stand_id in ("C1", "W1"):
            note = "Marathon today. Everyone wants drinks, nobody wants sausages."
        elif is_xmas and s.stand_id in ("C1", "W1") and rng.random() < 0.5:
            note = "Christmas market crowds. Chocolate milk flying off the shelf."
        elif city == "Warsaw" and pd.Timestamp("2025-04-07") <= d <= pd.Timestamp("2025-10-31") and rng.random() < 0.15:
            note = rng.choice(["Ketchup supplier raised prices AGAIN.", "Ketchup delivery late. Supplier blames tomato harvest."])
        elif rain > 5:
            note = ("Rain outside, but the station keeps us busy." if s.covered == "yes"
                    else rng.choice(["Pouring rain all afternoon. Very slow.", "Rain, rain, rain. Few customers."]))
        elif temp > 21 and sun > 8 and s.covered == "no":
            note = rng.choice(["Sunny and hot - long queues all day.", "Great weather, very busy.", "Sun is out, so are the customers."])
        else:
            note = rng.choice(FUN[city])
        log_rows.append((d, s.stand_id, manager, note))

sales = pd.DataFrame(sales_rows, columns=["date", "stand_id", "item_id", "units_sold", "revenue",
                                          "cost_of_goods", "currency", "card_share"])
logbook = pd.DataFrame(log_rows, columns=["date", "stand_id", "manager", "note"]).sort_values(["date", "stand_id"])

# ----------------------------------------------------------------- write
def fmt(df, cols=("date", "week_start")):
    df = df.copy()
    for c in cols:
        if c in df:
            df[c] = pd.to_datetime(df[c]).dt.strftime("%Y-%m-%d")
    return df

fmt(stands.drop(columns="base_units")).to_csv(os.path.join(OUT, "stands.csv"), index=False)
menu.astype({"price_dkk": "Int64", "price_pln": "Int64"}).to_csv(os.path.join(OUT, "menu.csv"), index=False)
fmt(sales).to_csv(os.path.join(OUT, "sales.csv"), index=False)
fmt(weather).to_csv(os.path.join(OUT, "weather.csv"), index=False)
fmt(events).to_csv(os.path.join(OUT, "events.csv"), index=False)
fmt(supplier).to_csv(os.path.join(OUT, "supplier_prices.csv"), index=False)
fmt(fx).to_csv(os.path.join(OUT, "fx_rates.csv"), index=False)
fmt(logbook).to_csv(os.path.join(OUT, "manager_logbook.csv"), index=False)
for name, df in [("sales", sales), ("weather", weather), ("events", events), ("supplier", supplier),
                 ("fx", fx), ("logbook", logbook)]:
    print(f"{name:10s} {len(df):>7,d} rows")
