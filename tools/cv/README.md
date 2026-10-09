# Translated Editorial CVs

`content-sl.json` and `content-de.json` contain the Slovenian and German translations of the approved English Editorial CV. Keep employer names, dates, links and claims aligned with that approved source. Blog articles are not translated by this workflow.

Build one selected translation with ReportLab:

```sh
python3 tools/cv/build_editorial.py --language sl
python3 tools/cv/build_editorial.py --language de
```

The output is `assets/cv/luka-finzgar-cv-sl.pdf` or `assets/cv/luka-finzgar-cv-de.pdf`. Use `--output` to choose another destination. The builder uses Arial and Georgia from `/System/Library/Fonts/Supplemental`; `--font-dir` can point to another directory containing those same font files. Fonts are embedded for Slovenian and German characters. This does not regenerate or modify the English CV or other design variants.

The builder rejects content that reaches the footer area. The German layout uses slightly smaller paragraph gaps to retain the same font sizes and two-page design. After changing the content, render and visually inspect both PDF pages before replacing the distributed copy. `tools/` is excluded from the Jekyll build.
