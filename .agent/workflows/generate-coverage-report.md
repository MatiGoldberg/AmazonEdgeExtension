---
description: Generate a code coverage report and save it as a markdown file in docs.
---

1. Run the tests with coverage collection.
   This script runs both backend and frontend tests, collecting coverage data.
   // turbo
   `./test.sh`

2. Generate the human-readable markdown report for Backend.
   This script parses the generated 'coverage.cobertura.xml' file and creates a summary in the 'docs' folder.
   // turbo
   `python3 .agent/scripts/generate_coverage_report.py`

3. View Frontend Coverage Report.
   The frontend coverage report is generated in `src/ExpenseApp.Frontend/coverage/index.xml` (JSON) and `index.html` (HTML).
   Open `src/ExpenseApp.Frontend/coverage/index.html` in your browser to view detailed frontend coverage.
