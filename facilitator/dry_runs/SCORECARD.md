# Dry run: two AI agents on the participant pack

Both agents got the participant README and the data only (no answer key). Each worked autonomously, with no human steering.

| | Haiku | Sonnet |
|---|---|---|
| Time taken | ~3 min | ~4 min |
| Deliverables | Dashboard (5 charts + table). **No findings.md** | Dashboard (9 charts + KPI tiles) + findings.md |
| **Score** | **3 / 16** | **15 / 16** |

## Scoring against the answer key

| Finding | Pts | Haiku | Sonnet |
|---|---|---|---|
| E1 Weather / rain vs covered | 1 | ✗ | ✓ (−41% open vs −5% covered) |
| E2 Stadium stands live on events | 1 | ✗ | ✓ (+ explained W3's decline by 24 → 19 matches) |
| E3 Commuter vs tourist weekly rhythm | 1 | ✗ | ✓ |
| M1 Warsaw ketchup crisis | 2 | ½: found the margin drop and quoted the ketchup logbook line, but called it a "~20% price rise" across all ingredients | ½: margin drop and timing exact, but **blamed sausage instead of ketchup** (see below) |
| M2 Vegan wave cannibalising red sausage | 2 | ✗ | ✓ |
| M3 Marathon / Christmas drinks flip | 2 | ✗ | ✓ Christmas only (missed the marathon) |
| H1 Rick Relish and the missing cash | 3 | ✗ | ✓ card share 70 → 85%, ~EUR 50–62k, quoted the "sticky drawer" notes |
| T1 Currency trap avoided | +2 | ✓ converted to EUR, W2 ranked #1 | ✓ |
| T2 New-stand growth trap avoided | +2 | ✗ wrong in a new way: called W4 the "worst stand, consider shutting it". It's actually just the stand that only traded during the ketchup shock | ✓ same-store +2.8% vs +19% headline |

## 🎯 Best AI mistakes (great material for the reveal)
1. **Sonnet's sausage hallucination.** The supplier data clearly shows ketchup going 14.8 → 67 PLN/kg while sausage stays flat at ~26. Sonnet still wrote "Warsaw sausage 15 → 66 PLN/kg" and recommended hedging sausage prices. It even noticed the inconsistency ("fries cost jumped although potatoes stayed flat") but explained it away as odd cost allocation instead of rechecking.
2. **Haiku's confident misdiagnosis of W4.** It was right that W4's margin was lowest, but for the wrong reason, and it proposed a drastic action ("shut down").
3. **Haiku called its dashboard "production-ready"** while missing 6 of the 8 findings and not delivering the findings file.
