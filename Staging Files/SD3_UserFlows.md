# User Flows - Copper Canyon Coffee Roasters

## Demo Flows (Interactive — 7 total)

### DF1: Production Planning & Roast Scheduling
**Trigger:** Ben (Production Manager) opens Production View in the morning
**Steps:**
1. Dashboard shows today's roast schedule: 5 orders confirmed, 3 products, 480 lbs total
2. Ben sees tomorrow's expected orders from standing schedules + pipeline flags
3. Ben clicks a roast schedule row → drill-down shows: green coffee lot required, roast profile, input weight, expected output
4. Ben reviews green coffee inventory — Ethiopia Yirgacheffe is below 2-week supply
5. Ben adjusts roast priority: moves House Blend batch up (urgent order), pushes single origin down
6. Ben confirms schedule → batches move to "Scheduled" status
7. Production View updates: Pounds to Roast Today recalculates

**Data touched:** Roast Batch, Product, Green Coffee Inventory, Order
**Decision point:** Which batches to prioritize based on demand and inventory
**Success state:** Day's roast schedule confirmed with adequate green coffee supply

---

### DF2: Pipeline Management & Account Progression
**Trigger:** Tanya (Sales Director) reviews pipeline to follow up on prospects
**Steps:**
1. Pipeline View shows all accounts by stage: 3 Prospects, 2 Sample Sent, 1 Tasting, 2 Proposal, 1 Under Review
2. Tanya clicks "New Account" → form to create prospect (name, type, contact, acquisition source)
3. Tanya fills in: "Blue Ridge Café, cafe, owner Sarah Kim, referral from Mountain Lodge"
4. Account appears in Prospect column
5. Tanya clicks existing account "Riverside Restaurant" in Sample Sent stage
6. Account detail shows: contacts, sample history, notes, next action
7. Tanya drags account from "Sample Sent" → "Tasting" (or clicks to update stage)
8. Pipeline metrics update: stage counts recalculate

**Data touched:** Account, Contact, Proposal
**Decision point:** Which stage to advance account to; when to create proposal
**Success state:** Pipeline reflects current state of all prospects

---

### DF3: Quality Investigation from CS Complaint
**Trigger:** Ben receives escalated quality issue from Maria
**Steps:**
1. Ben's Production View shows quality flag: "CS Issue #47 — Woodlands Hotel reports 'burnt taste' in House Blend delivery"
2. Ben clicks quality flag → investigation detail screen
3. Screen shows: CS Issue details, linked delivery (Jan 28), linked order lines (House Blend, 20 lbs)
4. Ben clicks "Identify Batch" → system shows candidate batches: Batch #B-2024-0215 (roasted Jan 26, House Blend, 60 lbs)
5. Ben reviews batch record: roast profile, temperature notes, green coffee lot, QC pass status
6. Ben enters root cause: "Roast temperature 8°F above profile — thermocouple calibration drift"
7. Ben enters corrective action: "Recalibrate thermocouple, pull remaining inventory from Batch #B-2024-0215"
8. Investigation status moves to "Corrective Action Taken" → Ben clicks "Close"
9. CS Issue auto-updates: resolution notes populated, status moves to "Resolved"

**Data touched:** Quality Investigation, CS Issue, Roast Batch, Order, Delivery
**Decision point:** Identifying which batch caused the issue; determining root cause and corrective action
**Success state:** Investigation closed with root cause documented, CS issue resolved

---

### DF4: New Account Handoff (Sales → Production)
**Trigger:** Tanya marks account as "Won" in Pipeline View
**Steps:**
1. Tanya updates "Summit Conference Center" from "Proposal" → "Won"
2. System triggers handoff notification: "New Account Won — Summit Conference Center, 80 lbs/week, weekly delivery, start date Feb 15"
3. Ben sees handoff alert in Production View: "New account onboarding — Summit Conference Center"
4. Ben clicks alert → onboarding checklist: products confirmed? Delivery route assigned? First roast scheduled?
5. Ben confirms products (House Blend 40 lbs + Colombia Single Origin 40 lbs)
6. Ben assigns to Route: Thursday AM route (Carlos)
7. Ben schedules first roast batch for Feb 13 (2 days before first delivery)
8. Handoff status updates: "Onboarding Complete" — Tanya's Pipeline View shows confirmed status

**Data touched:** Account, Route, Roast Batch, Delivery
**Decision point:** Confirming products, assigning route, scheduling first production
**Success state:** New account fully onboarded — production scheduled, delivery route assigned, no missed first delivery

---

### DF5: CS Issue Lifecycle (Report → Resolve)
**Trigger:** Maria receives customer inquiry about a delivery
**Steps:**
1. Maria opens Customer Inbox — sees 3 new inquiries to process
2. Maria clicks "Create New Issue" → form: account, category, description, reported by
3. Maria enters: "Mountain Lodge, delivery, 'Order from Monday not received', contact: Jake Rivera"
4. Issue created as #48 with status "Reported"
5. Maria checks today's deliveries — Mountain Lodge was on Monday's route, marked "Completed"
6. Maria updates issue: adds note "Delivery shows completed — checking with Carlos on driver confirmation"
7. Maria gets confirmation: driver left package at side entrance, not front desk
8. Maria updates issue: resolution notes "Delivered to side entrance — informed Jake, confirmed receipt"
9. Maria changes status: "Reported" → "Resolved" → "Closed"
10. Customer Inbox metrics update: open inquiries count decreases

**Data touched:** CS Issue, Account, Delivery
**Decision point:** Categorizing issue; investigating vs. escalating; resolution
**Success state:** Issue tracked from report to resolution with full audit trail

---

### DF6: Low-Stock Alert Response
**Trigger:** Production View shows green coffee origin below 2-week supply
**Steps:**
1. Ben's Production View metric card shows: "2 Origins Below 2-Week Supply"
2. Side panel highlights: Ethiopia Yirgacheffe (3 bags remaining, ~180 lbs) and Guatemala Antigua (2 bags, ~120 lbs)
3. Ben clicks Ethiopia Yirgacheffe → inventory detail: current stock, weekly burn rate (~90 lbs/week), supplier lead time (4 weeks), last order date
4. System shows: "At current rate, depleted in 2.0 weeks. Reorder now to avoid stockout."
5. Ben reviews upcoming demand from pipeline: 2 new accounts ordering Ethiopia blend
6. Ben decides: "Reorder 10 bags Ethiopia from Café Imports" — clicks action button
7. Inventory status updates: "Ethiopia Yirgacheffe — On Order (10 bags, ETA 4 weeks)"

**Data touched:** Green Coffee Inventory, Importer/Supplier, Product
**Decision point:** Reorder now vs. wait; quantity to order based on demand forecast
**Success state:** Reorder initiated before stockout, inventory status updated

---

### DF7: Batch QC Check & Approval
**Trigger:** Batch finishes resting period and is ready for QC
**Steps:**
1. Production View shows: "3 Batches Ready for Bagging" in resting list
2. Ben clicks Batch #B-2024-0220 (Colombia Single Origin, 50 lbs, rested 36 hrs)
3. Batch detail shows: roast profile used, temperature notes, green coffee lot, input/output weights, shrinkage %
4. Ben performs cupping/QC check
5. Ben updates QC fields: cupping score, pass/fail, notes
6. Ben marks QC as "Pass" → batch status moves from "QC Check" → "Approved"
7. Batch appears in "Ready for Bagging" queue
8. (Alternative path) Ben marks QC as "Fail" → batch status moves to "Flagged" → quality investigation auto-created

**Data touched:** Roast Batch, Quality Investigation (if flagged)
**Decision point:** Approve or flag the batch based on QC results
**Success state:** Approved batches move to bagging; flagged batches trigger investigation

---

## Ambient Flows (Static "After" State)

### AF1: Green Coffee Inventory Dashboard
**What it shows:** Current stock levels by origin with weeks-of-supply indicators
**Screen:** Production View — side panel
**No interaction:** Static display of inventory levels, color-coded by status (In Stock / Low Stock / Depleted)

### AF2: Packaging Inventory Status
**What it shows:** Bags, labels, boxes — quantities vs. reorder points
**Screen:** Production View — side panel
**No interaction:** Static display with low-stock highlights

### AF3: Production Throughput Trends
**What it shows:** Pounds roasted per week (4-week moving average), waste rate trend, quality complaint frequency
**Screen:** Production Roll-Up — charts
**No interaction:** Static trend charts

### AF4: Account Health Overview
**What it shows:** Active accounts, at-risk accounts (ordering less), churned accounts
**Screen:** Executive Dashboard — middle section + Pipeline View bottom right
**No interaction:** Static list with volume-drop flags

### AF5: Revenue Summary
**What it shows:** Revenue MTD vs. target, vs. prior month, vs. same month last year
**Screen:** Executive Dashboard — top metric card
**No interaction:** Static comparison display

### AF6: Delivery Manifest
**What it shows:** Today's deliveries by route, staged orders, driver assignments
**Screen:** Delivery Planning — main section
**No interaction:** Static daily manifest (Routing Optimization deferred)

### AF7: AR Aging Display
**What it shows:** Outstanding invoices by account, sorted by days overdue
**Screen:** Finance View — main section
**No interaction:** Static table (Financial Intelligence Suite deferred)

### AF8: On-Time Delivery Rate
**What it shows:** % of deliveries completed as scheduled, trend
**Screen:** Production Roll-Up — bottom right
**No interaction:** Static metric and trend

---

## Data Interaction Patterns (Auto-assigned — 5 total)

### DIP1: Filter/Sort on Roast Schedule
**Screen:** Production View (Ben)
**Type:** Filter/Sort
**Assigned because:** Production View contains roast schedule table with 10+ records in SD4. Roast Batch entity has status property in SD2 (Scheduled → Roasting → Resting → etc.). Ben's User View (Section 9) describes schedule by product and status.
**Behavior:** Ben can filter roast schedule by product name, batch status, or roast date. Sort by priority, scheduled time, or weight. Table updates in real time.
**Data touched:** Roast Batch, Product

### DIP2: Filter/Sort on Pipeline
**Screen:** Pipeline View (Tanya)
**Type:** Filter/Sort
**Assigned because:** Pipeline View contains account table with 10+ records in SD4. Account entity has stage property in SD2 (Prospect → Sample Sent → Tasting → etc.). Tanya's User View (Section 9) describes "pipeline by stage."
**Behavior:** Tanya can filter pipeline by stage, account type (cafe/restaurant/hotel/office), or acquisition source. Sort by start date, monthly volume, or last contact date. Pipeline view updates.
**Data touched:** Account, Contact

### DIP3: Filter/Sort on CS Issues
**Screen:** Customer Inbox (Maria & James)
**Type:** Filter/Sort
**Assigned because:** Customer Inbox contains inquiries table with 10+ records in SD4. CS Issue entity has category property in SD2 (order status / delivery / quality / invoice / general). Maria/James User View (Section 9) describes "sorted by age" and category filtering.
**Behavior:** Maria/James can filter inquiries by category, status, or assigned person. Sort by reported date (oldest first), account name, or category. Table updates.
**Data touched:** CS Issue

### DIP4: Add/Create CS Issue
**Screen:** Customer Inbox (Maria & James)
**Type:** Add/Create
**Assigned because:** Value Flow (Section 5) shows manual issue entry — orders/inquiries come in via email, phone, and voicemail. CS Issue entity lifecycle starts with user-initiated creation in SD2 (Reported → ...). Maria/James User View (Section 9) mentions "new orders to enter."
**Behavior:** Maria/James click "New Issue" → modal form with fields: account (dropdown), category (dropdown), description (text), reported by (text). Submit creates new CS Issue with status "Reported" and today's date.
**Data touched:** CS Issue, Account

### DIP5: Inline Edit on Batch Status
**Screen:** Production View (Ben)
**Type:** Inline Edit
**Assigned because:** Roast Batch entity has status field that changes frequently in SD2 (Scheduled → Roasting → Resting → QC Check → Approved → Bagged). Value Flow (Section 5) shows batch progression through stages as a triage/categorization step. Ben's User View (Section 9) mentions batches at different stages.
**Behavior:** Ben can click a batch's status cell in the roast schedule or resting list and select new status from dropdown (Resting → QC Check → Approved → Bagged). Batch record updates, metrics recalculate.
**Data touched:** Roast Batch
