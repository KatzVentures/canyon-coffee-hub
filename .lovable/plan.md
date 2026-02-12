

# Copper Canyon Coffee Roasters — Operational Dashboard

## Overview
A multi-view internal operations dashboard for a specialty coffee roasting & wholesale distribution company. Built for the leadership team, each view is tailored to a specific role's daily needs. Uses warm earth-tone branding (coffee browns, copper accents, mountain greens) with fake data for demo purposes.

---

## Phase 1: Foundation & Layout

- **Sidebar navigation** with Copper Canyon branding and links to all 7 views
- **Warm earth-tone theme** already defined in CSS — coffee brown primary, warm cream backgrounds
- **Responsive layout** with collapsible sidebar for mobile

---

## Phase 2: Data & Core Components

- **15+ JSON data files** for accounts, orders, products, roast batches, invoices, deliveries, employees, inventory, etc.
- **Reusable components**: MetricCard, StatusBadge, DeferredBadge, data tables with sorting/filtering

---

## Phase 3: Executive Dashboard (Rachel's View)

- **5 metric cards**: Revenue MTD, Active Accounts, Pounds Shipped, Cash Position, Open Quality Issues
- **Account health summary**: new, at-risk, churned accounts this month
- **Production status**: on schedule / behind / ahead
- **Top 3 alerts** across departments
- Clickable cards that drill down into details

---

## Phase 4: Production View (Ben's Daily View)

- **5 metric cards**: Pounds to Roast Today, Low-Stock Origins, Batches Ready for Bagging, Open Investigations, Delivery Stops
- **Today's roast schedule table** with filtering by product/status
- **Green coffee inventory** panel with low-stock alerts
- **Packaging inventory** with reorder alerts
- **Batches resting** — ready for bagging
- **Quality flags** — open investigations
- Inline status updates (Resting → QC → Approved → Bagged)

---

## Phase 5: Production Roll-Up (Ben's Big Picture)

- **5 metric cards**: Pounds Roasted vs Plan, Waste Rate, Quality Complaints, Low-Stock Origins, On-Time Delivery %
- **Charts**: Production throughput trend, waste/shrinkage rate, quality issue frequency
- **Inventory runway** — weeks of supply for top origins

---

## Phase 6: Pipeline View (Tanya's Sales View)

- **4 metric cards**: Active Proposals, Stale Accounts, Onboarding This Week, Revenue vs Target
- **Pipeline table** by stage: Prospect → Sample Sent → Tasting → Proposal → Won/Lost
- **Follow-up queue** for accounts not touched recently
- **Onboarding status** for new accounts
- Drag-and-drop stage changes, account detail drill-down

---

## Phase 7: Customer Inbox (Maria & James)

- **4 metric cards**: New Orders to Process, Open Inquiries, Today's Deliveries, Overdue Invoices
- **Open inquiries table** sorted by age, filterable by category
- **Quality escalations** panel
- **Today's deliveries** and **invoice follow-ups**
- Create/update CS issues, escalate to Ben

---

## Phase 8: Delivery Planning (Carlos)

- **4 metric cards**: Total Stops, Total Weight, Unstaged Orders, Failed Deliveries
- **Today's delivery manifest** by route
- **Driver assignments**
- **Yesterday's exceptions** needing retry

---

## Phase 9: Finance View (Derek)

- **4 metric cards**: Cash on Hand, AR >30 Days, AP Due This Week, Revenue MTD
- **AR aging table** — invoices by account sorted by days overdue
- **Revenue comparison** — MTD vs prior month

