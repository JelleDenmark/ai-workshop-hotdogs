# Frankly Delicious: AI workshop 🌭

A hot dog themed workshop where pairs use AI to analyse synthetic data with planted findings and build a dashboard.

```
participant_pack/      ← copy once per team (brief, rules, 8 CSV files)
facilitator/           ← keep this to yourself
├── Frankly_Delicious_AI_Workshop.pptx   intro + reveal slides
├── ANSWER_KEY.md                        planted findings, traps, scoring
├── generate_data.py                     regenerates the data (fixed seed)
├── dry_runs/                            Haiku vs Sonnet test run + scorecard
└── deck_source/                         script that builds the slide deck
```

All data is synthetic. ⚠️ This repo contains the answer key, so do not share the link with participants.

**Setting up team folders:** copy the whole `participant_pack` folder once per team, e.g. `Team_1`, `Team_2`, and include the hidden `.github` folder. It holds Copilot instructions that VS Code loads automatically, telling the AI to stay inside the folder and off the web. These rules are guidance the AI follows, not a hard lock, so the human rules in `RULES.md` still matter.
