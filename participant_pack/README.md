# 🌭 Frankly Delicious — The Hot Dog Empire

**Frankly Delicious** runs hot dog stands in two cities: **Copenhagen** and **Warsaw**.
You have two years of data (January 2024 to December 2025).

The board meets next week. The CEO has three questions:

1. **How is the business really doing?**
2. **What should we be worried about?**
3. **What should we do more of?**

## Your mission (in pairs)

Use AI (Copilot, Opus or anything else you have) to explore the data. Then build **one dashboard** that answers the CEO's questions.

At the end you get **3 minutes** to present:
- your dashboard
- your **3 most important findings**
- one thing the AI got wrong or that surprised you

There are several hidden stories in the data. Some are easy to find and some are well hidden. Points are awarded at the end. 🏆

> The data is 100% synthetic, so you can paste it into any AI tool freely.
> (With real company data, the normal rules apply!)

---

## The data (folder `data/`)

| File | What it is | Rows |
|---|---|---|
| `sales.csv` | Daily sales per stand per menu item | ~41,000 |
| `stands.csv` | The 8 stands: city, type, manager, location | 8 |
| `menu.csv` | Menu items, descriptions and prices | 9 |
| `weather.csv` | Daily weather per city | ~1,500 |
| `events.csv` | Football matches, concerts, Christmas markets, marathons | ~220 |
| `supplier_prices.csv` | Weekly ingredient prices per city | ~2,700 |
| `fx_rates.csv` | Daily exchange rates vs EUR | ~730 |
| `manager_logbook.csv` | Short daily notes written by stand managers | ~3,200 |

### Columns

**sales.csv**
- `date`: the sales day
- `stand_id`: links to `stands.csv`
- `item_id`: links to `menu.csv`
- `units_sold`: number of items sold
- `revenue`: sales value in the stand's **local currency** (see `currency`)
- `cost_of_goods`: ingredient cost of the items sold, in local currency
- `currency`: DKK (Copenhagen) or PLN (Warsaw)
- `card_share`: share of the units paid by card (the rest was paid in cash)

**stands.csv**
- `stand_id`, `stand_name`, `city`
- `stand_type`: classic (tourist/city square), commuter (train station), stadium, or seasonal
- `covered`: whether the stand is under a roof (yes/no)
- `manager`, `manager_since`: the current manager and their start date
- `opened`: the date the stand opened
- `latitude`, `longitude`: for maps 🗺️

**menu.csv**
- `item_id`, `item_name`, `category` (food/drink), `description`
- `available_in`: both cities, or only one
- `price_dkk`, `price_pln`: the price per item

**weather.csv**
- `date`, `city`, `temp_c`, `rain_mm`, `sunshine_hours`
- `storm_warning`: yes/no

**events.csv**
- `date`, `city`, `event_type`, `description`

**supplier_prices.csv**
- `week_start`, `city`, `ingredient`, `unit`, `price`, `currency`

**fx_rates.csv**
- `date`
- `eur_dkk`: DKK per 1 EUR
- `eur_pln`: PLN per 1 EUR

**manager_logbook.csv**
- `date`, `stand_id`, `manager`, `note` (free text)

---

## Tips

- **Let the AI write the code.** The sales file is too big to paste into a chat, so ask Copilot to write code that reads the files.
- **Ask the AI to explore first**, for example: *"Load all CSV files in /data, explain how they connect, and suggest 10 interesting questions."*
- **Be sceptical.** Ask the AI *"How could this conclusion be wrong?"* Check surprising numbers yourself.
- **Small steps beat one giant prompt.** Find one insight, then visualise it, then move on to the next.
- **Pretty matters.** A clean dashboard with 4 strong charts beats 20 messy ones.
