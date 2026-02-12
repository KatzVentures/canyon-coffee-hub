# Data Schema - Copper Canyon Coffee Roasters

## Entities

### Account (Wholesale)
**Relationships:**
- Has many Orders
- Has many Contacts
- Assigned to one Sales Rep
- Has many CS Issues
- Has one Delivery Route

**Properties:**
- account_name: string
- type: enum (cafe / restaurant / hotel / office)
- address: string
- delivery_frequency: enum (daily / every other day / weekly)
- monthly_volume_lbs: number
- average_order_value: number
- payment_terms: string
- acquisition_source: string
- start_date: date

**Lifecycle Stages:**
Prospect → Sample Sent → Tasting → Proposal → Won / Lost → Onboarding → Active → At Risk → Churned

---

### Contact
**Relationships:**
- Belongs to one Account
- May be primary or secondary

**Properties:**
- name: string
- role: string
- email: string
- phone: string
- primary_contact: boolean

**Lifecycle Stages:** —

---

### Order
**Relationships:**
- Belongs to one Account
- Has many Order Lines referencing Products
- Generates one Delivery or Shipment
- Created by CS (Maria/James) or standing schedule

**Properties:**
- order_number: string
- order_date: date
- order_source: enum (phone / email / standing)
- total_weight_lbs: number
- total_revenue: number
- delivery_method: enum (local / carrier)
- notes: string

**Lifecycle Stages:**
Received → Scheduled for Roasting → Roasted → Resting → Bagged → Staged → Out for Delivery → Delivered

---

### Order Line
**Relationships:**
- Belongs to one Order
- References one Product

**Properties:**
- product: string (reference)
- quantity_lbs: number
- unit_price: number
- line_total: number

**Lifecycle Stages:** —

---

### Product (Coffee)
**Relationships:**
- Has many Order Lines
- Uses one or more Green Coffee Origins
- Has one Roast Profile
- Has many Batches

**Properties:**
- name: string
- type: enum (single origin / blend / flavored)
- sku: string
- retail_price_per_lb: number
- wholesale_price_per_lb: number
- cost_per_lb: number (unknown today)
- roast_level: string
- origins: string
- active_status: boolean
- dtc_flag: boolean

**Lifecycle Stages:**
Active → Low Stock → Out of Stock → Discontinued

---

### Green Coffee Inventory
**Relationships:**
- Sourced from one Importer
- Used by many Products

**Properties:**
- origin_name: string
- country: string
- importer: string (reference)
- lot_number: string
- bags_on_hand: number
- bag_weight: string (typically 60kg)
- arrival_date: date
- cost_per_lb: number
- cupping_score: number
- organic_certified: boolean

**Lifecycle Stages:**
On Order → In Transit → Received → In Storage → Low Stock → Depleted

---

### Roast Batch
**Relationships:**
- Produces one Product
- Uses Green Coffee Inventory
- Roasted by one Roaster (Employee)
- May generate Quality Issues

**Properties:**
- batch_number: string
- product: string (reference)
- roast_date: date
- roaster_name: string (reference)
- green_coffee_lot: string (reference)
- input_weight: number
- output_weight: number
- waste_shrinkage: number
- roast_profile_used: string
- roast_time: string
- temperature_curve_notes: string
- rest_start: date
- rest_end: date
- qc_pass: boolean

**Lifecycle Stages:**
Scheduled → Roasting → Resting → QC Check → Approved → Bagged → (Flagged)

---

### Packaging Inventory
**Relationships:**
- Used by Roast Batches during bagging

**Properties:**
- item: enum (bags / labels / boxes)
- size: string
- quantity_on_hand: number
- reorder_point: number
- supplier: string
- last_reorder_date: date

**Lifecycle Stages:**
In Stock → Low Stock → Out of Stock → On Order

---

### Delivery
**Relationships:**
- Belongs to one Route
- Contains one or more Orders
- Assigned to one Driver (Employee)

**Properties:**
- delivery_date: date
- driver: string (reference)
- route: string (reference)
- stop_count: number
- total_weight: number
- departure_time: string
- completion_time: string
- delivery_notes: string

**Lifecycle Stages:**
Planned → Loaded → In Transit → Completed → Exception

---

### Route
**Relationships:**
- Has many Accounts
- Has many Deliveries
- Assigned to one Driver

**Properties:**
- route_name: string
- driver: string (reference)
- days_of_week: string
- stop_count: number
- estimated_duration: string
- coverage_area: string

**Lifecycle Stages:**
Active → Modified → Inactive

---

### Proposal
**Relationships:**
- Belongs to one Account (prospect)
- Created by one Sales Rep

**Properties:**
- proposal_number: string
- account_name: string (reference)
- products_quoted: string
- pricing: string
- delivery_schedule: string
- minimum_order: string
- payment_terms: string
- created_date: date
- sent_date: date
- version: number

**Lifecycle Stages:**
Draft → Sent → Under Review → Accepted / Rejected / Revised

---

### CS Issue
**Relationships:**
- Belongs to one Account
- May reference an Order, Delivery, or Roast Batch
- Handled by Maria or James
- Quality issues escalated to Ben

**Properties:**
- issue_number: string
- category: enum (order status / delivery / quality / invoice / general)
- description: string
- reported_by: string
- reported_date: date
- assigned_to: string (reference)
- resolution_notes: string
- resolution_date: date

**Lifecycle Stages:**
Reported → Investigating → (Escalated to Ben) → Resolved → Closed

---

### Quality Investigation
**Relationships:**
- Triggered by CS Issue
- References one or more Roast Batches
- Investigated by Ben

**Properties:**
- investigation_number: string
- linked_cs_issue: string (reference)
- linked_batches: string (reference)
- symptom_description: string
- root_cause: string
- corrective_action: string
- investigation_hours: number

**Lifecycle Stages:**
Opened → Batch Identified → Root Cause Found → Corrective Action Taken → Closed

---

### Employee
**Relationships:**
- Belongs to one Department
- Reports to one Manager
- Roasters produce Batches
- Drivers run Routes
- CS handles Issues

**Properties:**
- name: string
- role: enum (roaster / production assistant / warehouse / driver / CS / sales / admin)
- department: string
- hire_date: date
- rate: number
- training_status: string
- certifications: string

**Lifecycle Stages:**
Hiring → Onboarding (shadow) → Ramping → Active → (Exited)

---

### Importer / Supplier
**Relationships:**
- Supplies Green Coffee Inventory
- Has many Purchase Orders

**Properties:**
- name: string
- country: string
- origins_offered: string
- lead_time_weeks: number
- payment_terms: string
- reliability_rating: string (untracked)
- contact_info: string

**Lifecycle Stages:**
Active → On Hold → Inactive

---

### Invoice
**Relationships:**
- Belongs to one Account
- References one or more Orders
- Managed by Derek

**Properties:**
- invoice_number: string
- account: string (reference)
- amount: number
- issued_date: date
- due_date: date
- payment_status: string
- payment_date: date
- days_outstanding: number

**Lifecycle Stages:**
Draft → Sent → Outstanding → Overdue → Paid → Written Off

---

### Compliance Record
**Relationships:**
- Belongs to facility
- Maintained by Ben

**Properties:**
- type: enum (USDA organic / food safety / facility inspection)
- certification_number: string
- issue_date: date
- expiration_date: date
- inspector: string
- result: string
- document_location: enum (binder / Drive / email)

**Lifecycle Stages:**
Current → Renewal Due → Expired → Renewed
