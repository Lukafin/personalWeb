# Editorial CVs

`content-en.json`, `content-sl.json` and `content-de.json` contain the approved English Editorial CV and its Slovenian and German versions. Keep employer names, dates, links and claims aligned. Blog articles are not translated by this workflow.

Build one selected language with ReportLab:

```sh
python3 tools/cv/build_editorial.py --language en
python3 tools/cv/build_editorial.py --language sl
python3 tools/cv/build_editorial.py --language de
```

The output is `assets/cv/luka-finzgar-cv.pdf`, `assets/cv/luka-finzgar-cv-sl.pdf` or `assets/cv/luka-finzgar-cv-de.pdf`. Use `--output` to choose another destination. The builder uses Arial and Georgia from `/System/Library/Fonts/Supplemental`; `--font-dir` can point to another directory containing those same font files. Fonts are embedded for all required characters. Only the selected language's Editorial PDF is written; other design variants are never modified.

The education block records the pre-Bologna university programme and its historical qualification. English and German use descriptive translations of that qualification.

The builder rejects content that reaches the footer area. Each language retains its approved paragraph spacing and font sizes. After changing the content, render and visually inspect the affected pages before replacing the distributed copy. `tools/` is excluded from the Jekyll build.
