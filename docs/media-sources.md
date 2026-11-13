# Main-site media and content sources

Updated November 12, 2026. The main site uses the approved cartoon design with real project media. `/design` remains the exploration area.

## Research

- HERMES: original figures downloaded from `https://raw.githubusercontent.com/saisrikar8/hermes/HEAD/`: `roc_comparison.png`, `plot_confusion_xgboost.png`, `plot_feature_importance.png`, `plot_pr_curve.png`. Summary metrics from https://github.com/saisrikar8/hermes#results. Preserve axes and legends; no invented traces or reconstructed raw samples.
- SELENE: original figures from `https://raw.githubusercontent.com/saisrikar8/selene/HEAD/Lunar_Research_Book_Chapter/`: `MCDropout_pred_vs_true.png`, `MCDropout_uncertainty_vs_prederror.png`, `training_curve.png`, `true_vs_predicted.png`. Individual figures can reflect different experimental runs from the README summary table. That distinction is noted on the site. The uncertainty plot itself reports Pearson r=0.4375; do not substitute the README's separate r=0.46 analysis.
- SELENE benchmark: README held-out table: ANN R² .834 / MAE .00429; MC Dropout .827 / .00442; Linear .388 / .00878; XGBoost .011 / .00816. SAINT R² -2135 is explicitly excluded from the 0–1 bar chart. MAE units are not invented.
- TERRA prior aggregate benchmark retained from existing `src/data/profile.js`. The linked public repository returned 404, so no new repository-derived data were asserted. Live demo capture is a separate example: Cordillera Central, ordinary rainfall, 1 year; it is not evidence of the aggregate score. Site notes live results depend on region/settings.

## Product media

Devpost gallery images were read from the live public project pages in-browser and downloaded to `public/media/`. Full original URLs and YouTube embed IDs are recorded in `public/media/sources.json`.

- https://devpost.com/software/steady-hands-80stdj — four screenshots and demo `aH168-oegaQ`.
- https://devpost.com/software/punchd — three screenshots and demo `d49yg10k-UM`.
- https://devpost.com/software/larpbox-tv — three screenshots and demo `WzPR8KQzqIA`.
- RRPathPlanner screenshot captured from https://rr-path-planner.vercel.app/ on November 12, 2026, showing the actual editor and initial path.
- TERRA screenshot captured from https://terra.ssrikar.dev after running the ordinary-rainfall, one-year Cordillera Central simulation. Capture shows rendered elevation changes rather than the region-selection photos.

Images are locally hosted. Video iframes load only after selecting Watch demo, use youtube-nocookie.com, and do not autoplay. Figures and screenshots can be enlarged in native modal dialogs.

## Experience and terminal

Experience comes from the user-provided résumé. Per explicit instruction, include the Keenan Group role and completed SJSU research; exclude the ZATOM role. No unsupported individual hackathon responsibilities are assigned.

The terminal preserves the original introductory phrase and typing behavior. It now supports actual commands, bounded pointer dragging, native desktop resizing, minimize/expand, reset, and proportional sans-serif text. The mascot and wiggle controls are absent from the main site.

## Validation

- Production build and `git diff --check` passed.
- Desktop and 390px mobile browser QA: no horizontal overflow; no computed monospace fonts.
- Terminal: commands, minimize/expand, responsive display checked; dragging stays within viewport bounds, desktop native resize retained.
- Research gallery selection and native enlarged-image dialogs verified.
- SELENE MAE toggle verified against the displayed source values.
- Screenshot galleries loaded successfully; project videos use the expected source IDs after explicit clicks.
- Main-site browser error log was empty during verification.

## Selectable cartoon research charts

Research screenshot carousels were replaced with `ResearchCharts.jsx`. HERMES provides summary scores (README), ROC AUC comparisons (0.88 XGBoost, 0.85 neural net, 0.83 random forest, 0.66 logistic, read from the original ROC figure), and the confusion matrix (189, 46, 22, 281, read from the original XGBoost confusion figure). These source artifacts can represent different runs, noted in Methods & figure notes.

SELENE provides R², MAE, and MAPE comparisons from its README table. MAPE values: ANN 14.26%, MC Dropout 14.93%, Linear 60.67%, XGBoost 42.83%, SAINT 79.27%. R²/MAE plots explicitly disclose excluded SAINT values outside the plotted scale. No ROC traces, prediction samples, or training histories were fabricated. Exact values remain visible and keyboard/pointer/tap inspection is supported.

Build passed. Graph selection, confusion-count inspection, desktop rendering, and narrow mobile layout were browser-verified with no horizontal overflow. Product screenshot galleries remain intact.

## Verified publication records

Publication details verified against publisher-supplied Crossref records on November 12, 2026:

- HERMES: IEEE, ICBAIE 2025, pp. 108–116. DOI https://doi.org/10.1109/ICBAIE66852.2025.11326636. Metadata: https://api.crossref.org/works/10.1109/icbaie66852.2025.11326636. Conference proceedings independently list the title and authors: https://www.proceedings.com/content/083/083850webtoc.pdf. Use 2025 proceedings year rather than the previous portfolio's January 2026 label.
- SELENE: Springer Nature Switzerland, Emerging Trends in Data Science, Information and Knowledge Engineering, pp. 90–107. DOI https://doi.org/10.1007/978-3-032-22196-4_7. Metadata: https://api.crossref.org/works/10.1007/978-3-032-22196-4_7. Online publication June 19, 2026; print volume year 2027. Site explicitly labels online publication to avoid conflating the dates.

Both cards now have plain publication metadata, a DOI-linked Read paper action, and a separate repository link. No category badge was restored.
