---
description: Continue ExpenseApp development from Phase 7
---

# ExpenseApp Development Workflow

## Current State (Phase 8 Starting)

**Branch**: `main` (Phase 7 merged ✅)
**Project**: `/Users/matigoldberg/Drive/Code/ExpenseApp`

### Completed Phases:
- ✅ **Phase 1**: High-level design and architecture
- ✅ **Phase 2**: Environment setup (Backend, Frontend, Shell, DB, Logging)
- ✅ **Phase 3**: Core data models & unit tests (84 tests passing)
- ✅ **Phase 4**: CSV Import System (60 tests passing)
- ✅ **Phase 5**: Classification Engine (44 tests passing)
- ✅ **Phase 6**: Data Panel Frontend (11 new tests)
- ✅ **Phase 7**: Classification Panel Frontend (12 new tests, 211 total)

### Key Files:
- Models: `src/ExpenseApp.Backend/Models/` (Account, Transaction, ExpenseCategory, ClassificationRule)
- CsvParsers: `src/ExpenseApp.Backend/Services/CsvParsers/` (ICsvParser, AppleCardParser, FirstTechParser)
- Classification: `src/ExpenseApp.Backend/Services/Classification/` (IClassificationEngine, ClassificationEngine)
- TransactionService: `src/ExpenseApp.Backend/Services/TransactionService.cs`
- Controllers: `src/ExpenseApp.Backend/Controllers/` (AccountsController, TransactionsController, ClassificationRulesController)
- DbContext: `src/ExpenseApp.Backend/Data/AppDbContext.cs`
- Tests: `src/ExpenseApp.Backend.Tests/` (Models/, Data/, Services/, Controllers/)
- Frontend Types: `src/ExpenseApp.Frontend/src/types/index.ts`
- Frontend API: `src/ExpenseApp.Frontend/src/services/api.ts`
- Frontend Components: `src/ExpenseApp.Frontend/src/components/` (DataPanel, ClassificationPanel, AnalysisPanel)
- Scripts: `scripts/` (analyze_logs.py, dev.sh)
- Architecture: `docs/architecture.md`

### Test Summary (Phase 7):
- Model Tests: 44 tests
- Data Tests: 40 tests  
- AppleCardParserTests: 17 tests
- FirstTechParserTests: 14 tests
- TransactionServiceTests: 15 tests
- TransactionsControllerTests: 14 tests
- ClassificationEngineTests: 25 tests
- ClassificationRulesControllerTests: 31 tests
- AccountsControllerTests: 11 tests
- **Total: 211 tests**

### API Endpoints (Current):
**Accounts:**
- `GET /api/accounts` - List all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `POST /api/accounts` - Create account
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Delete account (if no transactions)

**Transactions:**
- `GET /api/transactions` - List transactions (with filters)
- `GET /api/transactions/{id}` - Get transaction by ID
- `POST /api/transactions/import` - Import from CSV content
- `POST /api/transactions/import/file` - Import from file upload
- `DELETE /api/transactions/{id}` - Delete transaction

**Classification Rules:**
- `GET /api/classification-rules` - List all rules (ordered by priority)
- `GET /api/classification-rules/{id}` - Get specific rule
- `POST /api/classification-rules` - Create rule
- `PUT /api/classification-rules/{id}` - Update rule
- `DELETE /api/classification-rules/{id}` - Delete rule
- `POST /api/classification-rules/classify` - Run classification on unclassified transactions
- `POST /api/classification-rules/reorder` - Reorder rules
- `GET /api/classification-rules/export` - Export rules to JSON
- `POST /api/classification-rules/import` - Import rules from JSON
- `GET /api/classification-rules/schema` - Get rules schema

---

## Development Policy

**Each phase follows this workflow:**

1. Create feature branch: `git checkout -b feature/{feature_name}`
2. Implement with TDD (tests first)
3. All tests pass, zero warnings
4. Commit and push
5. Create PR for review
6. Merge to main
7. **End of Phase: Update this workflow file and prepare for context clear**

---

## End-of-Phase Checklist

Before clearing context at the end of any phase:

// turbo-all

1. Ensure all tests pass:
```bash
dotnet test
```

2. Commit all changes:
```bash
git add -A && git commit -m "feat(phase-N): Description"
```

3. Push to remote:
```bash
git push origin <branch-name>
```

4. Update this workflow file with:
   - Mark current phase as complete
   - Update "Current State" section
   - Add next phase instructions
   - Commit the workflow update

5. Merge PR (or leave for user approval)

6. Clear context and start new session with `/continue-development`

---

## Current Phase: Phase 8 - Analysis Panel (Frontend)

### Goal:
Build the Analysis Panel UI to visualize spending trends, category breakdowns, and income flows.

### Steps:
// turbo-all

1. Ensure on main with latest:
```bash
cd /Users/matigoldberg/Drive/Code/ExpenseApp
git checkout main && git pull
```

2. Create Phase 8 branch:
```bash
git checkout -b phase-8/analysis-panel
```

3. Backend - Analysis Endpoints:
   - Create `AnalysisController`
   - Implement `GET /api/analysis/trends` (Stacked data by time period: Day/Month)
     - Supports filtering by "Expenses", "Income", or "Net"
     - Returns data suitable for stacked column charts
   - Implement `GET /api/analysis/flow` (Sankey data)
     - Nodes: Income Sources -> Combined Income -> Expenses + Savings -> Expense Categories
   - Add Unit Tests for controller

4. Frontend - Analysis Panel:
   - Install `recharts` (already installed)
   - Create `AnalysisPanel` container with two main sections (Top/Bottom)
   - **Top Panel (Trends)**:
     - Stacked Column Chart
     - Time granularity toggle (auto-detected based on range: Days vs Months)
     - Type selector: Expenses (excl. Income), Income, Net (Income + Expenses)
   - **Bottom Panel (Flow)**:
     - Sankey Chart using `recharts` (or compatible library)
     - Visualizes flow from Income sources to Expenses/Savings
   - Add "Analysis" tab to `Navigation`

5. Test frontend and backend integration:
```bash
dotnet run --project src/ExpenseApp.Backend
cd src/ExpenseApp.Frontend && npm run dev
```

6. **End of Phase 8**: Follow End-of-Phase Checklist above

### Design Considerations:
- **Top Panel**: 
  - Cartesian grid for stacked columns.
  - Interactive tooltip showing category breakdown.
  - Smooth transitions between Expenses/Income/Net views.
- **Bottom Panel**:
  - Responsive Sankey diagram.
  - Clear labeling for nodes (Income, Savings, Categories).
- **General**:
  - Consistent dark theme styling.
  - Date range picker (controlling both charts).


---

## Quick Reference

### Commands:
```bash
dotnet build                    # Build all projects
dotnet test                     # Run tests (211 tests)
dotnet run --project src/ExpenseApp.Backend  # Run API (port 5251)
cd src/ExpenseApp.Frontend && npm run dev    # Run frontend (port 5173)
```

---

## Phase Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | High-Level Design | ✅ Complete |
| 2 | Environment Setup | ✅ Complete |
| 3 | Core Data Models & Tests | ✅ Complete (84 tests) |
| 4 | CSV Import System | ✅ Complete (60 tests) |
| 5 | Classification Engine | ✅ Complete (44 tests) |
| 6 | Data Panel (Frontend) | ✅ Complete (11 tests) |
| 7 | Classification Panel (Frontend) | ✅ Complete (12 tests) |
| 8 | Analysis Panel (Frontend) | 🔄 In Progress |
| 9 | AI Integration | ⏳ Pending |
| 10 | Polish & Packaging | ⏳ Pending |
