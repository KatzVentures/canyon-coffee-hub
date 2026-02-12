# App Blueprint - Copper Canyon Coffee Roasters

## Navigation Structure
- Executive Dashboard (Rachel Torres - CEO)
- Production View (Ben Okonkwo - Production Manager)
- Production Roll-Up (Ben Okonkwo - Production Manager)
- Pipeline View (Tanya Greene - Sales Director)
- Customer Inbox (Maria & James - CS)
- Delivery Planning (Carlos - Warehouse/Routing) *(stripped — Routing Optimization deferred)*
- Finance View (Derek Huang - Finance & Admin) *(stripped — Financial Intelligence Suite deferred)*

**Removed views:**
- Rachel Torres Team Health View — removed entirely (no included system supports HR)
- Ben Okonkwo Compliance Dashboard — removed (Compliance not in MVP scope; Batch Consistency DB supports batch QC in Production View instead)

---

## Screen Specifications

### Executive Dashboard (Rachel Torres - CEO)
**User quote:** "I want to stop asking people how things are going. I want to open one screen and already know."

**Layout:**
- Top row: 5 metric cards (Revenue MTD, Active Accounts, Pounds Shipped, Cash Position, Open Quality Issues)
- Middle section: Account health summary — new this month, at-risk, churned
- Middle section: Production status — on schedule / behind / ahead
- Bottom section: Top 3 alerts across all departments

**Key Metrics:**
1. Revenue MTD vs. target
2. Active account count (and net change this month)
3. Pounds shipped this week
4. Cash position
5. Open quality issues

**Interactions:**
- Click revenue card → breakdown by account [MVP: clickable — Drill-down]
- Click active accounts → account list with status [MVP: clickable — Drill-down]
- Click quality issues → jump to open investigations [MVP: clickable — Drill-down]
- Click production status → jump to Production Roll-Up [MVP: clickable — Navigation]
- Click individual alert → jump to relevant view [MVP: static]

---

### Production View (Ben Okonkwo - Production Manager)
**User quote:** "I need to know what to roast today, what's coming tomorrow, and whether I have the beans to do it."

**Layout:**
- Top row: 5 metric cards (Pounds to Roast Today, Origins Below 2-Week Supply, Batches Ready for Bagging, Open Quality Investigations, Delivery Stops Today)
- Main section: Today's roast schedule table — orders confirmed, products, volumes
- Side panel: Green coffee inventory by origin — current stock vs. upcoming demand
- Side panel: Packaging inventory — bags, labels, boxes with low-stock alerts
- Bottom left: Batches currently resting — what's ready for bagging today
- Bottom right: Quality flags — open investigations and customer complaints pending

**Key Metrics:**
- Pounds to roast today
- Green coffee origins below 2-week supply
- Batches ready for bagging
- Open quality investigations
- Delivery stops scheduled today

**Interactions:**
- Click roast schedule row → batch detail with green coffee lot, roast profile [MVP: clickable — Demo Flow DF1]
- Filter roast schedule by product or status [MVP: clickable — Filter/Sort]
- Click low-stock origin alert → inventory detail with supplier lead time [MVP: clickable — Drill-down]
- Click quality flag → open investigation detail [MVP: clickable — Demo Flow DF3]
- Click batch in resting list → batch record with QC check fields [MVP: clickable — Drill-down]
- Update batch status (Resting → QC Check → Approved → Bagged) [MVP: clickable — Inline Edit]
- View driver schedule for today [MVP: static]
- Tomorrow's expected orders [MVP: static]

---

### Production Roll-Up (Ben Okonkwo - Production Manager)
**User quote:** "At the big-picture level — are we keeping up, and is the coffee good."

**Layout:**
- Top row: 5 metric cards (Pounds Roasted This Week vs. Plan, Waste Rate, Quality Complaints This Month, Origins Below 2-Week Supply, On-Time Delivery %)
- Main section: Production throughput trend — pounds roasted per week, 4-week moving average (chart)
- Middle section: Waste/shrinkage rate trend — input lbs vs. output lbs (chart)
- Bottom left: Quality issue frequency — complaints per 1,000 lbs shipped
- Bottom right: Inventory runway — weeks of supply remaining for top 10 origins

**Key Metrics:**
1. Pounds roasted this week vs. plan
2. Waste rate (target: <18%)
3. Quality complaints this month
4. Green coffee origins below 2-week supply
5. On-time delivery % (target: >95%)

**Interactions:**
- Click throughput trend data point → drill into that week's batches [MVP: static]
- Click waste rate → drill into batch-level shrinkage [MVP: static]
- Click quality complaints count → list of complaints [MVP: clickable — Drill-down]
- Click origin inventory → detailed stock levels [MVP: static]
- Filter trends by time range (1 week / 4 weeks / 12 weeks) [MVP: static]

---

### Pipeline View (Tanya Greene - Sales Director)
**User quote:** "Who's close to signing, who needs a follow-up, and are any accounts going quiet on me."

**Layout:**
- Top row: 4 metric cards (Active Proposals Count + Total Potential Monthly Value, Accounts with No Order in >14 Days, New Accounts Onboarding This Week, Monthly Revenue vs. Target)
- Main section: Pipeline table by stage — Prospect → Sample Sent → Tasting → Proposal → Won/Lost
- Side panel: Follow-up queue — accounts not touched in >7 days
- Bottom left: New account onboarding status — handoff to production confirmed? First delivery scheduled?
- Bottom right: Account health flags — active accounts ordering less than usual

**Key Metrics:**
- Active proposals out (count + total potential monthly value)
- Accounts with no order in >14 days
- New accounts onboarding this week
- Monthly revenue vs. target

**Interactions:**
- Click account in pipeline → account detail with contacts, orders, history [MVP: clickable — Demo Flow DF2]
- Drag account to new pipeline stage [MVP: clickable — Demo Flow DF2]
- Filter pipeline by stage [MVP: clickable — Filter/Sort]
- Click "New Account" → create prospect [MVP: clickable — Demo Flow DF2]
- Click onboarding account → handoff status and checklist [MVP: clickable — Demo Flow DF4]
- Click follow-up queue account → last contact details [MVP: clickable — Drill-down]
- Click account health flag → order volume trend [MVP: static]
- Export pipeline report [MVP: static]

---

### Customer Inbox (Maria & James - CS)
**User quote:** "What orders came in overnight, what deliveries are people asking about, and what's escalated."

**Layout:**
- Top row: 4 metric cards (New Orders/Inquiries to Process, Open Unanswered Inquiries Count + Oldest, Deliveries Going Out Today, Overdue Invoices Needing Follow-Up)
- Main section: Open inquiries table — sorted by age, filterable by category
- Side panel: Quality escalations — anything waiting on Ben's investigation
- Bottom left: Today's deliveries — which accounts getting deliveries, any delays
- Bottom right: Invoice follow-ups — overdue accounts needing a nudge

**Key Metrics:**
- New orders/inquiries to process
- Open unanswered inquiries (count + oldest)
- Deliveries going out today
- Overdue invoices needing follow-up

**Interactions:**
- Click inquiry → issue detail with account context [MVP: clickable — Demo Flow DF5]
- Create new CS Issue [MVP: clickable — Add/Create]
- Update issue status (Reported → Investigating → Resolved → Closed) [MVP: clickable — Inline Edit]
- Escalate quality issue to Ben [MVP: clickable — Demo Flow DF5]
- Filter inquiries by category (order status / delivery / quality / invoice / general) [MVP: clickable — Filter/Sort]
- Click today's delivery → delivery detail [MVP: static]
- Click overdue invoice → invoice detail [MVP: static]
- Enter new order from email/voicemail [MVP: static — CS Automation deferred]

---

### Delivery Planning (Carlos - Warehouse/Routing)
**User quote:** "What's going out, who's driving, and is everything actually ready."

*Note: Routing Optimization is deferred. This view shows basic delivery tracking only. Route optimization, optimized sequencing, and dynamic route changes are Coming in Full Build.*

**Layout:**
- Top row: 4 metric cards (Total Stops Today, Total Weight Going Out, Orders Not Yet Staged, Failed Deliveries From Yesterday)
- Main section: Today's delivery manifest — all orders staged and ready, by route
- Side panel: Driver assignments — who's available
- Bottom: Yesterday's exceptions — failed deliveries that need to go out today

**Key Metrics:**
- Total stops today across all routes
- Total weight going out
- Any orders not yet staged
- Failed deliveries from yesterday to retry

**Interactions:**
- Filter manifest by route or driver [MVP: static]
- Click delivery → order details [MVP: static]
- Click driver → driver's route and stops [MVP: static]
- Route map with optimized sequence [MVP: static — Routing Optimization deferred]
- Rush order additions [MVP: static — Routing Optimization deferred]
- Delivery change requests [MVP: static — Routing Optimization deferred]

---

### Finance View (Derek Huang - Finance & Admin)
**User quote:** "Who owes us money, what bills are due, and is the cash okay."

*Note: Financial Intelligence Suite is deferred. This view shows basic AR/invoicing from the Invoice entity only. Cash position forecasting, AP management, account profitability analysis, and cost accounting are Coming in Full Build.*

**Layout:**
- Top row: 4 metric cards (Cash on Hand, AR >30 Days Total, AP Due This Week, Revenue MTD)
- Main section: AR aging table — invoices outstanding by account, sorted by days overdue
- Bottom: Revenue MTD vs. prior month (simple comparison)

**Key Metrics:**
- Cash on hand
- AR >30 days total
- AP due this week
- Revenue MTD

**Interactions:**
- Filter AR aging by days overdue range [MVP: static]
- Click account in AR table → invoice detail [MVP: static]
- Cash position forecasting [MVP: static — Financial Intelligence Suite deferred]
- AP management [MVP: static — Financial Intelligence Suite deferred]
- Account profitability flags [MVP: static — Financial Intelligence Suite deferred]
