# Fake Data - Copper Canyon Coffee Roasters

## Data Files

### data/employees.json
```json
[
  {"id": "emp-001", "name": "Rachel Torres", "role": "admin", "department": "Executive", "hire_date": "2020-01-15", "rate": 0, "training_status": "Active", "certifications": "", "reports_to": null, "status": "Active"},
  {"id": "emp-002", "name": "Ben Okonkwo", "role": "production_manager", "department": "Production", "hire_date": "2020-03-01", "rate": 0, "training_status": "Active", "certifications": "SCA Roasting Certified, USDA Organic Handler", "reports_to": "emp-001", "status": "Active"},
  {"id": "emp-003", "name": "Tanya Greene", "role": "sales", "department": "Sales", "hire_date": "2021-06-15", "rate": 0, "training_status": "Active", "certifications": "", "reports_to": "emp-001", "status": "Active"},
  {"id": "emp-004", "name": "Derek Huang", "role": "admin", "department": "Finance", "hire_date": "2021-01-10", "rate": 0, "training_status": "Active", "certifications": "", "reports_to": "emp-001", "status": "Active"},
  {"id": "emp-005", "name": "Maria Santos", "role": "CS", "department": "Customer Service", "hire_date": "2022-02-01", "rate": 22, "training_status": "Active", "certifications": "", "reports_to": "emp-001", "status": "Active"},
  {"id": "emp-006", "name": "James Park", "role": "CS", "department": "Customer Service", "hire_date": "2022-09-15", "rate": 22, "training_status": "Active", "certifications": "", "reports_to": "emp-001", "status": "Active"},
  {"id": "emp-007", "name": "Carlos Reyes", "role": "warehouse", "department": "Production", "hire_date": "2021-04-10", "rate": 24, "training_status": "Active", "certifications": "CDL Class B", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-008", "name": "Marcus Thompson", "role": "roaster", "department": "Production", "hire_date": "2021-08-01", "rate": 28, "training_status": "Active", "certifications": "SCA Roasting Intermediate", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-009", "name": "Ana Gutierrez", "role": "roaster", "department": "Production", "hire_date": "2022-05-15", "rate": 26, "training_status": "Active", "certifications": "SCA Roasting Foundation", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-010", "name": "Tyler Washington", "role": "production_assistant", "department": "Production", "hire_date": "2023-01-10", "rate": 18, "training_status": "Active", "certifications": "", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-011", "name": "Priya Patel", "role": "production_assistant", "department": "Production", "hire_date": "2023-03-20", "rate": 18, "training_status": "Active", "certifications": "", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-012", "name": "Jordan Lee", "role": "production_assistant", "department": "Production", "hire_date": "2023-06-01", "rate": 18, "training_status": "Active", "certifications": "", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-013", "name": "Sofia Ramirez", "role": "production_assistant", "department": "Production", "hire_date": "2024-01-15", "rate": 17, "training_status": "Ramping", "certifications": "", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-014", "name": "Darnell Brooks", "role": "warehouse", "department": "Production", "hire_date": "2022-07-01", "rate": 20, "training_status": "Active", "certifications": "", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-015", "name": "Kim Nguyen", "role": "warehouse", "department": "Production", "hire_date": "2023-02-01", "rate": 19, "training_status": "Active", "certifications": "", "reports_to": "emp-002", "status": "Active"},
  {"id": "emp-016", "name": "Miguel Fuentes", "role": "driver", "department": "Production", "hire_date": "2021-10-01", "rate": 22, "training_status": "Active", "certifications": "CDL Class B", "reports_to": "emp-007", "status": "Active"},
  {"id": "emp-017", "name": "Kevin O'Brien", "role": "driver", "department": "Production", "hire_date": "2022-04-15", "rate": 22, "training_status": "Active", "certifications": "CDL Class B", "reports_to": "emp-007", "status": "Active"},
  {"id": "emp-018", "name": "Dante Williams", "role": "driver", "department": "Production", "hire_date": "2023-01-20", "rate": 21, "training_status": "Active", "certifications": "CDL Class B", "reports_to": "emp-007", "status": "Active"},
  {"id": "emp-019", "name": "Lisa Chang", "role": "driver", "department": "Production", "hire_date": "2023-09-01", "rate": 21, "training_status": "Active", "certifications": "CDL Class B", "reports_to": "emp-007", "status": "Active"},
  {"id": "emp-020", "name": "Nina Kowalski", "role": "sales", "department": "Sales", "hire_date": "2022-11-01", "rate": 0, "training_status": "Active", "certifications": "", "reports_to": "emp-003", "status": "Active"},
  {"id": "emp-021", "name": "Andre Mitchell", "role": "sales", "department": "Sales", "hire_date": "2023-04-15", "rate": 0, "training_status": "Active", "certifications": "", "reports_to": "emp-003", "status": "Active"},
  {"id": "emp-022", "name": "Patricia Wells", "role": "admin", "department": "Finance", "hire_date": "2022-06-01", "rate": 25, "training_status": "Active", "certifications": "QuickBooks ProAdvisor", "reports_to": "emp-004", "status": "Active"}
]
```

### data/accounts.json
```json
[
  {"id": "acct-001", "account_name": "Mountain Lodge Resort", "type": "hotel", "address": "1200 Ridge Road, Asheville, NC", "delivery_frequency": "daily", "monthly_volume_lbs": 320, "average_order_value": 480, "payment_terms": "Net 30", "acquisition_source": "referral", "start_date": "2020-06-01", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-001"},
  {"id": "acct-002", "account_name": "Riverside Café", "type": "cafe", "address": "45 River Street, Asheville, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 160, "average_order_value": 240, "payment_terms": "Net 15", "acquisition_source": "cold outreach", "start_date": "2020-08-15", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-001"},
  {"id": "acct-003", "account_name": "Blue Ridge Brewing Co.", "type": "restaurant", "address": "88 Brewery Lane, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 80, "average_order_value": 320, "payment_terms": "Net 30", "acquisition_source": "trade show", "start_date": "2021-01-10", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-001"},
  {"id": "acct-004", "account_name": "Woodlands Hotel & Spa", "type": "hotel", "address": "500 Spa Drive, Black Mountain, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 240, "average_order_value": 360, "payment_terms": "Net 30", "acquisition_source": "referral", "start_date": "2021-03-20", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-002"},
  {"id": "acct-005", "account_name": "The Daily Grind", "type": "cafe", "address": "12 Main Street, Weaverville, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 120, "average_order_value": 180, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": "2021-05-01", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-002"},
  {"id": "acct-006", "account_name": "TechHub Asheville", "type": "office", "address": "200 Innovation Drive, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 60, "average_order_value": 240, "payment_terms": "Net 30", "acquisition_source": "cold outreach", "start_date": "2021-09-01", "stage": "Active", "sales_rep": "emp-021", "route_id": "route-001"},
  {"id": "acct-007", "account_name": "Appalachian Bistro", "type": "restaurant", "address": "330 Tunnel Road, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 100, "average_order_value": 400, "payment_terms": "Net 30", "acquisition_source": "referral", "start_date": "2021-11-15", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-003"},
  {"id": "acct-008", "account_name": "Sunrise Bakery", "type": "cafe", "address": "78 Patton Ave, Asheville, NC", "delivery_frequency": "daily", "monthly_volume_lbs": 200, "average_order_value": 300, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": "2022-01-10", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-001"},
  {"id": "acct-009", "account_name": "Biltmore Office Park", "type": "office", "address": "1000 Biltmore Ave, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 40, "average_order_value": 160, "payment_terms": "Net 30", "acquisition_source": "cold outreach", "start_date": "2022-03-01", "stage": "Active", "sales_rep": "emp-021", "route_id": "route-003"},
  {"id": "acct-010", "account_name": "Smoky Mountain Inn", "type": "hotel", "address": "450 Smoky Pines Rd, Waynesville, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 180, "average_order_value": 270, "payment_terms": "Net 30", "acquisition_source": "trade show", "start_date": "2022-06-15", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-004"},
  {"id": "acct-011", "account_name": "Carolina Kitchen", "type": "restaurant", "address": "155 Haywood Rd, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 80, "average_order_value": 320, "payment_terms": "Net 15", "acquisition_source": "referral", "start_date": "2022-09-01", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-001"},
  {"id": "acct-012", "account_name": "Trailhead Coffee Bar", "type": "cafe", "address": "22 College St, Asheville, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 140, "average_order_value": 210, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": "2022-11-15", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-002"},
  {"id": "acct-013", "account_name": "Highland Hospital Café", "type": "office", "address": "900 Medical Center Dr, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 100, "average_order_value": 400, "payment_terms": "Net 45", "acquisition_source": "cold outreach", "start_date": "2023-01-20", "stage": "Active", "sales_rep": "emp-021", "route_id": "route-003"},
  {"id": "acct-014", "account_name": "The Rooftop Bar", "type": "restaurant", "address": "60 Broadway, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 60, "average_order_value": 240, "payment_terms": "Net 30", "acquisition_source": "referral", "start_date": "2023-04-01", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-001"},
  {"id": "acct-015", "account_name": "Pisgah Provisions", "type": "restaurant", "address": "412 Merrimon Ave, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 70, "average_order_value": 280, "payment_terms": "Net 30", "acquisition_source": "trade show", "start_date": "2023-06-15", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-002"},
  {"id": "acct-016", "account_name": "Brevard Bean Counter", "type": "cafe", "address": "14 Main St, Brevard, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 60, "average_order_value": 240, "payment_terms": "Net 15", "acquisition_source": "cold outreach", "start_date": "2023-09-01", "stage": "Active", "sales_rep": "emp-021", "route_id": "route-004"},
  {"id": "acct-017", "account_name": "Hendersonville Country Club", "type": "restaurant", "address": "800 Country Club Rd, Hendersonville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 90, "average_order_value": 360, "payment_terms": "Net 30", "acquisition_source": "referral", "start_date": "2023-11-01", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-004"},
  {"id": "acct-018", "account_name": "Pack Square Perk", "type": "cafe", "address": "2 Pack Square, Asheville, NC", "delivery_frequency": "daily", "monthly_volume_lbs": 180, "average_order_value": 270, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": "2024-01-15", "stage": "Active", "sales_rep": "emp-020", "route_id": "route-001"},
  {"id": "acct-019", "account_name": "Weaverville Wellness Center", "type": "office", "address": "55 Wellness Way, Weaverville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 30, "average_order_value": 120, "payment_terms": "Net 30", "acquisition_source": "cold outreach", "start_date": "2024-03-01", "stage": "Active", "sales_rep": "emp-021", "route_id": "route-002"},
  {"id": "acct-020", "account_name": "French Broad Provisions", "type": "restaurant", "address": "240 Riverside Dr, Asheville, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 110, "average_order_value": 165, "payment_terms": "Net 15", "acquisition_source": "referral", "start_date": "2024-05-01", "stage": "Active", "sales_rep": "emp-003", "route_id": "route-003"},
  {"id": "acct-021", "account_name": "Summit Conference Center", "type": "office", "address": "700 Summit Ave, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 80, "average_order_value": 320, "payment_terms": "Net 30", "acquisition_source": "trade show", "start_date": null, "stage": "Proposal", "sales_rep": "emp-003", "route_id": null},
  {"id": "acct-022", "account_name": "Blue Ridge Café", "type": "cafe", "address": "110 Sweeten Creek Rd, Asheville, NC", "delivery_frequency": "every other day", "monthly_volume_lbs": 100, "average_order_value": 150, "payment_terms": "Net 15", "acquisition_source": "referral", "start_date": null, "stage": "Tasting", "sales_rep": "emp-020", "route_id": null},
  {"id": "acct-023", "account_name": "Greenleaf Juice Bar", "type": "cafe", "address": "34 Wall St, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 40, "average_order_value": 160, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": null, "stage": "Sample Sent", "sales_rep": "emp-021", "route_id": null},
  {"id": "acct-024", "account_name": "Black Bear Lodge", "type": "hotel", "address": "1500 Blue Ridge Pkwy, Asheville, NC", "delivery_frequency": "daily", "monthly_volume_lbs": 200, "average_order_value": 300, "payment_terms": "Net 30", "acquisition_source": "cold outreach", "start_date": null, "stage": "Sample Sent", "sales_rep": "emp-003", "route_id": null},
  {"id": "acct-025", "account_name": "River Arts Café", "type": "cafe", "address": "191 Lyman St, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 50, "average_order_value": 200, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": null, "stage": "Prospect", "sales_rep": "emp-020", "route_id": null},
  {"id": "acct-026", "account_name": "The Omni Grove Park Inn", "type": "hotel", "address": "290 Macon Ave, Asheville, NC", "delivery_frequency": "daily", "monthly_volume_lbs": 400, "average_order_value": 600, "payment_terms": "Net 45", "acquisition_source": "trade show", "start_date": null, "stage": "Prospect", "sales_rep": "emp-003", "route_id": null},
  {"id": "acct-027", "account_name": "Flat Rock Bakehouse", "type": "cafe", "address": "28 Main St, Flat Rock, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 45, "average_order_value": 180, "payment_terms": "Net 15", "acquisition_source": "referral", "start_date": null, "stage": "Prospect", "sales_rep": "emp-021", "route_id": null},
  {"id": "acct-028", "account_name": "Cedar Valley Farm Store", "type": "restaurant", "address": "600 Cedar Valley Rd, Mars Hill, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 35, "average_order_value": 140, "payment_terms": "Net 30", "acquisition_source": "cold outreach", "start_date": "2023-08-01", "stage": "At Risk", "sales_rep": "emp-020", "route_id": "route-004"},
  {"id": "acct-029", "account_name": "Old World Deli", "type": "restaurant", "address": "100 Charlotte St, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 30, "average_order_value": 120, "payment_terms": "Net 15", "acquisition_source": "walk-in", "start_date": "2022-05-01", "stage": "Churned", "sales_rep": "emp-020", "route_id": null},
  {"id": "acct-030", "account_name": "Parkside Diner", "type": "restaurant", "address": "55 Biltmore Ave, Asheville, NC", "delivery_frequency": "weekly", "monthly_volume_lbs": 25, "average_order_value": 100, "payment_terms": "Net 15", "acquisition_source": "cold outreach", "start_date": "2023-02-01", "stage": "Churned", "sales_rep": "emp-021", "route_id": null}
]
```

### data/contacts.json
```json
[
  {"id": "cont-001", "name": "Jake Rivera", "role": "General Manager", "email": "jake@mountainlodge.com", "phone": "828-555-0101", "primary_contact": true, "account_id": "acct-001"},
  {"id": "cont-002", "name": "Linda Park", "role": "F&B Director", "email": "linda@mountainlodge.com", "phone": "828-555-0102", "primary_contact": false, "account_id": "acct-001"},
  {"id": "cont-003", "name": "Sam Chen", "role": "Owner", "email": "sam@riversidecafe.com", "phone": "828-555-0201", "primary_contact": true, "account_id": "acct-002"},
  {"id": "cont-004", "name": "Brian Kelly", "role": "Kitchen Manager", "email": "brian@blueridgebrewing.com", "phone": "828-555-0301", "primary_contact": true, "account_id": "acct-003"},
  {"id": "cont-005", "name": "Angela Morris", "role": "F&B Director", "email": "angela@woodlandshotel.com", "phone": "828-555-0401", "primary_contact": true, "account_id": "acct-004"},
  {"id": "cont-006", "name": "Pete Lawson", "role": "Owner", "email": "pete@dailygrind.com", "phone": "828-555-0501", "primary_contact": true, "account_id": "acct-005"},
  {"id": "cont-007", "name": "Rebecca Tran", "role": "Office Manager", "email": "rebecca@techhub.com", "phone": "828-555-0601", "primary_contact": true, "account_id": "acct-006"},
  {"id": "cont-008", "name": "David Russo", "role": "Chef/Owner", "email": "david@appalachianbistro.com", "phone": "828-555-0701", "primary_contact": true, "account_id": "acct-007"},
  {"id": "cont-009", "name": "Jenny Wu", "role": "Owner", "email": "jenny@sunrisebakery.com", "phone": "828-555-0801", "primary_contact": true, "account_id": "acct-008"},
  {"id": "cont-010", "name": "Tom Hartley", "role": "Facilities Manager", "email": "tom@biltmoreoffice.com", "phone": "828-555-0901", "primary_contact": true, "account_id": "acct-009"},
  {"id": "cont-011", "name": "Sarah Kim", "role": "Owner", "email": "sarah@summitcenter.com", "phone": "828-555-2101", "primary_contact": true, "account_id": "acct-021"}
]
```

### data/products.json
```json
[
  {"id": "prod-001", "name": "House Blend", "type": "blend", "sku": "CC-HB-001", "retail_price_per_lb": 16.99, "wholesale_price_per_lb": 11.50, "cost_per_lb": null, "roast_level": "Medium", "origins": "Colombia, Brazil", "active_status": true, "dtc_flag": true},
  {"id": "prod-002", "name": "Colombia Single Origin", "type": "single origin", "sku": "CC-CO-001", "retail_price_per_lb": 19.99, "wholesale_price_per_lb": 14.00, "cost_per_lb": null, "roast_level": "Medium", "origins": "Colombia Huila", "active_status": true, "dtc_flag": true},
  {"id": "prod-003", "name": "Ethiopia Yirgacheffe", "type": "single origin", "sku": "CC-ET-001", "retail_price_per_lb": 21.99, "wholesale_price_per_lb": 15.50, "cost_per_lb": null, "roast_level": "Light", "origins": "Ethiopia Yirgacheffe", "active_status": true, "dtc_flag": true},
  {"id": "prod-004", "name": "Guatemala Antigua", "type": "single origin", "sku": "CC-GA-001", "retail_price_per_lb": 20.99, "wholesale_price_per_lb": 14.50, "cost_per_lb": null, "roast_level": "Medium-Dark", "origins": "Guatemala Antigua", "active_status": true, "dtc_flag": true},
  {"id": "prod-005", "name": "Dark Roast Espresso", "type": "blend", "sku": "CC-DE-001", "retail_price_per_lb": 17.99, "wholesale_price_per_lb": 12.50, "cost_per_lb": null, "roast_level": "Dark", "origins": "Brazil, Sumatra", "active_status": true, "dtc_flag": true},
  {"id": "prod-006", "name": "Breakfast Blend", "type": "blend", "sku": "CC-BB-001", "retail_price_per_lb": 15.99, "wholesale_price_per_lb": 10.50, "cost_per_lb": null, "roast_level": "Light-Medium", "origins": "Colombia, Ethiopia", "active_status": true, "dtc_flag": true},
  {"id": "prod-007", "name": "Sumatra Mandheling", "type": "single origin", "sku": "CC-SM-001", "retail_price_per_lb": 20.99, "wholesale_price_per_lb": 14.50, "cost_per_lb": null, "roast_level": "Dark", "origins": "Sumatra Mandheling", "active_status": true, "dtc_flag": false},
  {"id": "prod-008", "name": "Decaf House Blend", "type": "blend", "sku": "CC-DH-001", "retail_price_per_lb": 17.99, "wholesale_price_per_lb": 12.00, "cost_per_lb": null, "roast_level": "Medium", "origins": "Colombia, Mexico", "active_status": true, "dtc_flag": true},
  {"id": "prod-009", "name": "Vanilla Hazelnut", "type": "flavored", "sku": "CC-VH-001", "retail_price_per_lb": 16.99, "wholesale_price_per_lb": 11.00, "cost_per_lb": null, "roast_level": "Medium", "origins": "Brazil", "active_status": true, "dtc_flag": true},
  {"id": "prod-010", "name": "Kenya AA", "type": "single origin", "sku": "CC-KA-001", "retail_price_per_lb": 23.99, "wholesale_price_per_lb": 17.00, "cost_per_lb": null, "roast_level": "Medium", "origins": "Kenya", "active_status": true, "dtc_flag": false},
  {"id": "prod-011", "name": "Costa Rica Tarrazú", "type": "single origin", "sku": "CC-CR-001", "retail_price_per_lb": 21.99, "wholesale_price_per_lb": 15.00, "cost_per_lb": null, "roast_level": "Medium", "origins": "Costa Rica Tarrazú", "active_status": false, "dtc_flag": false},
  {"id": "prod-012", "name": "French Roast", "type": "blend", "sku": "CC-FR-001", "retail_price_per_lb": 16.99, "wholesale_price_per_lb": 11.50, "cost_per_lb": null, "roast_level": "Dark", "origins": "Brazil, Indonesia", "active_status": true, "dtc_flag": true}
]
```

### data/green_coffee_inventory.json
```json
[
  {"id": "gc-001", "origin_name": "Colombia Huila", "country": "Colombia", "importer": "imp-001", "lot_number": "COL-2024-087", "bags_on_hand": 12, "bag_weight": "60kg", "arrival_date": "2024-10-15", "cost_per_lb": 3.85, "cupping_score": 84, "organic_certified": false},
  {"id": "gc-002", "origin_name": "Ethiopia Yirgacheffe", "country": "Ethiopia", "importer": "imp-002", "lot_number": "ETH-2024-042", "bags_on_hand": 3, "bag_weight": "60kg", "arrival_date": "2024-09-20", "cost_per_lb": 5.20, "cupping_score": 87, "organic_certified": true, "status": "Low Stock"},
  {"id": "gc-003", "origin_name": "Brazil Santos", "country": "Brazil", "importer": "imp-001", "lot_number": "BRZ-2024-155", "bags_on_hand": 20, "bag_weight": "60kg", "arrival_date": "2024-11-01", "cost_per_lb": 2.90, "cupping_score": 82, "organic_certified": false, "status": "In Storage"},
  {"id": "gc-004", "origin_name": "Guatemala Antigua", "country": "Guatemala", "importer": "imp-003", "lot_number": "GUA-2024-031", "bags_on_hand": 2, "bag_weight": "60kg", "arrival_date": "2024-08-10", "cost_per_lb": 4.40, "cupping_score": 85, "organic_certified": false, "status": "Low Stock"},
  {"id": "gc-005", "origin_name": "Sumatra Mandheling", "country": "Indonesia", "importer": "imp-002", "lot_number": "SUM-2024-019", "bags_on_hand": 8, "bag_weight": "60kg", "arrival_date": "2024-10-05", "cost_per_lb": 4.10, "cupping_score": 83, "organic_certified": false, "status": "In Storage"},
  {"id": "gc-006", "origin_name": "Kenya AA Nyeri", "country": "Kenya", "importer": "imp-003", "lot_number": "KEN-2024-008", "bags_on_hand": 5, "bag_weight": "60kg", "arrival_date": "2024-11-15", "cost_per_lb": 6.50, "cupping_score": 89, "organic_certified": false, "status": "In Storage"},
  {"id": "gc-007", "origin_name": "Mexico Chiapas", "country": "Mexico", "importer": "imp-001", "lot_number": "MEX-2024-063", "bags_on_hand": 10, "bag_weight": "60kg", "arrival_date": "2024-09-01", "cost_per_lb": 3.20, "cupping_score": 81, "organic_certified": true, "status": "In Storage"},
  {"id": "gc-008", "origin_name": "Costa Rica Tarrazú", "country": "Costa Rica", "importer": "imp-003", "lot_number": "CR-2024-014", "bags_on_hand": 0, "bag_weight": "60kg", "arrival_date": "2024-06-01", "cost_per_lb": 5.00, "cupping_score": 86, "organic_certified": false, "status": "Depleted"}
]
```

### data/importers.json
```json
[
  {"id": "imp-001", "name": "Café Imports", "country": "USA (broker)", "origins_offered": "Colombia, Brazil, Mexico, Peru", "lead_time_weeks": 4, "payment_terms": "Net 30", "reliability_rating": "untracked", "contact_info": "orders@cafeimports.com"},
  {"id": "imp-002", "name": "Royal Coffee", "country": "USA (broker)", "origins_offered": "Ethiopia, Sumatra, Rwanda", "lead_time_weeks": 6, "payment_terms": "Net 30", "reliability_rating": "untracked", "contact_info": "sales@royalcoffee.com"},
  {"id": "imp-003", "name": "Genuine Origin", "country": "USA (broker)", "origins_offered": "Guatemala, Kenya, Costa Rica, Honduras", "lead_time_weeks": 5, "payment_terms": "Net 45", "reliability_rating": "untracked", "contact_info": "team@genuineorigin.com"}
]
```

### data/roast_batches.json
```json
[
  {"id": "batch-001", "batch_number": "B-2025-0201", "product_id": "prod-001", "roast_date": "2025-02-01", "roaster": "emp-008", "green_coffee_lot": "COL-2024-087", "input_weight": 65, "output_weight": 54, "waste_shrinkage": 16.9, "roast_profile_used": "House Blend Standard", "roast_time": "14:30", "temperature_curve_notes": "Normal curve, steady development", "rest_start": "2025-02-01", "rest_end": "2025-02-03", "qc_pass": true, "status": "Bagged"},
  {"id": "batch-002", "batch_number": "B-2025-0202", "product_id": "prod-003", "roast_date": "2025-02-01", "roaster": "emp-009", "green_coffee_lot": "ETH-2024-042", "input_weight": 55, "output_weight": 46.5, "waste_shrinkage": 15.5, "roast_profile_used": "Light Ethiopian", "roast_time": "12:15", "temperature_curve_notes": "Light roast, pulled early at first crack", "rest_start": "2025-02-01", "rest_end": "2025-02-02", "qc_pass": true, "status": "Bagged"},
  {"id": "batch-003", "batch_number": "B-2025-0203", "product_id": "prod-005", "roast_date": "2025-02-02", "roaster": "emp-008", "green_coffee_lot": "BRZ-2024-155", "input_weight": 70, "output_weight": 56, "waste_shrinkage": 20.0, "roast_profile_used": "Dark Espresso", "roast_time": "16:45", "temperature_curve_notes": "Extended development, second crack reached", "rest_start": "2025-02-02", "rest_end": "2025-02-04", "qc_pass": true, "status": "Approved"},
  {"id": "batch-004", "batch_number": "B-2025-0204", "product_id": "prod-002", "roast_date": "2025-02-03", "roaster": "emp-009", "green_coffee_lot": "COL-2024-087", "input_weight": 60, "output_weight": 50, "waste_shrinkage": 16.7, "roast_profile_used": "Colombia Medium", "roast_time": "14:00", "temperature_curve_notes": "Standard curve", "rest_start": "2025-02-03", "rest_end": "2025-02-05", "qc_pass": null, "status": "Resting"},
  {"id": "batch-005", "batch_number": "B-2025-0205", "product_id": "prod-001", "roast_date": "2025-02-04", "roaster": "emp-008", "green_coffee_lot": "COL-2024-087", "input_weight": 65, "output_weight": 54.5, "waste_shrinkage": 16.2, "roast_profile_used": "House Blend Standard", "roast_time": "14:20", "temperature_curve_notes": "Normal", "rest_start": "2025-02-04", "rest_end": "2025-02-06", "qc_pass": null, "status": "Resting"},
  {"id": "batch-006", "batch_number": "B-2025-0206", "product_id": "prod-006", "roast_date": "2025-02-04", "roaster": "emp-009", "green_coffee_lot": "COL-2024-087", "input_weight": 50, "output_weight": 42.5, "waste_shrinkage": 15.0, "roast_profile_used": "Breakfast Light-Med", "roast_time": "13:00", "temperature_curve_notes": "Pulled just after first crack", "rest_start": "2025-02-04", "rest_end": "2025-02-06", "qc_pass": null, "status": "Resting"},
  {"id": "batch-007", "batch_number": "B-2025-0207", "product_id": "prod-004", "roast_date": "2025-02-05", "roaster": "emp-008", "green_coffee_lot": "GUA-2024-031", "input_weight": 55, "output_weight": null, "waste_shrinkage": null, "roast_profile_used": "Guatemala Med-Dark", "roast_time": null, "temperature_curve_notes": null, "rest_start": null, "rest_end": null, "qc_pass": null, "status": "Scheduled"},
  {"id": "batch-008", "batch_number": "B-2025-0208", "product_id": "prod-001", "roast_date": "2025-02-05", "roaster": "emp-009", "green_coffee_lot": "COL-2024-087", "input_weight": 65, "output_weight": null, "waste_shrinkage": null, "roast_profile_used": "House Blend Standard", "roast_time": null, "temperature_curve_notes": null, "rest_start": null, "rest_end": null, "qc_pass": null, "status": "Scheduled"},
  {"id": "batch-009", "batch_number": "B-2025-0209", "product_id": "prod-009", "roast_date": "2025-02-05", "roaster": "emp-008", "green_coffee_lot": "BRZ-2024-155", "input_weight": 40, "output_weight": null, "waste_shrinkage": null, "roast_profile_used": "Vanilla Hazelnut Med", "roast_time": null, "temperature_curve_notes": null, "rest_start": null, "rest_end": null, "qc_pass": null, "status": "Scheduled"},
  {"id": "batch-010", "batch_number": "B-2025-0115", "product_id": "prod-001", "roast_date": "2025-01-26", "roaster": "emp-008", "green_coffee_lot": "COL-2024-087", "input_weight": 65, "output_weight": 52, "waste_shrinkage": 20.0, "roast_profile_used": "House Blend Standard", "roast_time": "15:30", "temperature_curve_notes": "Temperature 8°F above profile — thermocouple may need calibration", "rest_start": "2025-01-26", "rest_end": "2025-01-28", "qc_pass": true, "status": "Flagged"}
]
```

### data/orders.json
```json
[
  {"id": "ord-001", "order_number": "CC-2025-0401", "account_id": "acct-001", "order_date": "2025-02-03", "order_source": "standing", "total_weight_lbs": 80, "total_revenue": 920, "delivery_method": "local", "notes": "Daily standing order", "status": "Delivered"},
  {"id": "ord-002", "order_number": "CC-2025-0402", "account_id": "acct-008", "order_date": "2025-02-03", "order_source": "standing", "total_weight_lbs": 50, "total_revenue": 575, "delivery_method": "local", "notes": "Daily standing order", "status": "Delivered"},
  {"id": "ord-003", "order_number": "CC-2025-0403", "account_id": "acct-004", "order_date": "2025-02-03", "order_source": "standing", "total_weight_lbs": 60, "total_revenue": 690, "delivery_method": "local", "notes": "Every other day", "status": "Delivered"},
  {"id": "ord-004", "order_number": "CC-2025-0404", "account_id": "acct-007", "order_date": "2025-02-03", "order_source": "email", "total_weight_lbs": 25, "total_revenue": 362.50, "delivery_method": "local", "notes": "Extra order for event this weekend", "status": "Roasted"},
  {"id": "ord-005", "order_number": "CC-2025-0405", "account_id": "acct-013", "order_date": "2025-02-03", "order_source": "phone", "total_weight_lbs": 25, "total_revenue": 400, "delivery_method": "local", "notes": "Weekly order", "status": "Scheduled for Roasting"},
  {"id": "ord-006", "order_number": "CC-2025-0406", "account_id": "acct-001", "order_date": "2025-02-04", "order_source": "standing", "total_weight_lbs": 80, "total_revenue": 920, "delivery_method": "local", "notes": "Daily standing order", "status": "Scheduled for Roasting"},
  {"id": "ord-007", "order_number": "CC-2025-0407", "account_id": "acct-018", "order_date": "2025-02-04", "order_source": "standing", "total_weight_lbs": 45, "total_revenue": 517.50, "delivery_method": "local", "notes": "Daily standing order", "status": "Scheduled for Roasting"},
  {"id": "ord-008", "order_number": "CC-2025-0408", "account_id": "acct-002", "order_date": "2025-02-04", "order_source": "standing", "total_weight_lbs": 40, "total_revenue": 460, "delivery_method": "local", "notes": "Every other day", "status": "Received"},
  {"id": "ord-009", "order_number": "CC-2025-0409", "account_id": "acct-010", "order_date": "2025-02-04", "order_source": "email", "total_weight_lbs": 45, "total_revenue": 517.50, "delivery_method": "local", "notes": "Every other day", "status": "Received"},
  {"id": "ord-010", "order_number": "CC-2025-0410", "account_id": "acct-014", "order_date": "2025-02-04", "order_source": "phone", "total_weight_lbs": 15, "total_revenue": 217.50, "delivery_method": "local", "notes": "Weekly order", "status": "Received"},
  {"id": "ord-011", "order_number": "CC-2025-0411", "account_id": "acct-008", "order_date": "2025-02-04", "order_source": "standing", "total_weight_lbs": 50, "total_revenue": 575, "delivery_method": "local", "notes": "Daily standing order", "status": "Received"},
  {"id": "ord-012", "order_number": "CC-2025-0412", "account_id": "acct-016", "order_date": "2025-02-04", "order_source": "email", "total_weight_lbs": 15, "total_revenue": 217.50, "delivery_method": "carrier", "notes": "Weekly — ships via UPS", "status": "Received"}
]
```

### data/routes.json
```json
[
  {"id": "route-001", "route_name": "Downtown Asheville AM", "driver": "emp-016", "days_of_week": "Mon, Tue, Wed, Thu, Fri", "stop_count": 7, "estimated_duration": "3.5 hrs", "coverage_area": "Downtown Asheville", "status": "Active"},
  {"id": "route-002", "route_name": "North Asheville / Weaverville", "driver": "emp-017", "days_of_week": "Mon, Wed, Fri", "stop_count": 5, "estimated_duration": "4 hrs", "coverage_area": "North Asheville, Weaverville, Black Mountain", "status": "Active"},
  {"id": "route-003", "route_name": "South Asheville / Biltmore", "driver": "emp-018", "days_of_week": "Tue, Thu", "stop_count": 4, "estimated_duration": "3 hrs", "coverage_area": "South Asheville, Biltmore area", "status": "Active"},
  {"id": "route-004", "route_name": "Outlying / Weekly", "driver": "emp-019", "days_of_week": "Wed, Fri", "stop_count": 5, "estimated_duration": "5 hrs", "coverage_area": "Waynesville, Hendersonville, Brevard, Flat Rock", "status": "Active"}
]
```

### data/deliveries.json
```json
[
  {"id": "del-001", "delivery_date": "2025-02-04", "driver": "emp-016", "route_id": "route-001", "stop_count": 5, "total_weight": 210, "departure_time": "06:30", "completion_time": null, "delivery_notes": "", "status": "Loaded", "order_ids": ["ord-006", "ord-007", "ord-011"]},
  {"id": "del-002", "delivery_date": "2025-02-04", "driver": "emp-017", "route_id": "route-002", "stop_count": 3, "total_weight": 85, "departure_time": "07:00", "completion_time": null, "delivery_notes": "", "status": "Planned", "order_ids": ["ord-008"]},
  {"id": "del-003", "delivery_date": "2025-02-04", "driver": "emp-018", "route_id": "route-003", "stop_count": 3, "total_weight": 65, "departure_time": "07:30", "completion_time": null, "delivery_notes": "", "status": "Planned", "order_ids": ["ord-009", "ord-010"]},
  {"id": "del-004", "delivery_date": "2025-02-03", "driver": "emp-016", "route_id": "route-001", "stop_count": 5, "total_weight": 190, "departure_time": "06:30", "completion_time": "10:15", "delivery_notes": "All stops completed", "status": "Completed", "order_ids": ["ord-001", "ord-002"]},
  {"id": "del-005", "delivery_date": "2025-02-03", "driver": "emp-017", "route_id": "route-002", "stop_count": 4, "total_weight": 120, "departure_time": "07:00", "completion_time": "11:30", "delivery_notes": "Mountain Lodge delivery left at side entrance", "status": "Completed", "order_ids": ["ord-003"]},
  {"id": "del-006", "delivery_date": "2025-02-03", "driver": "emp-019", "route_id": "route-004", "stop_count": 3, "total_weight": 85, "departure_time": "06:00", "completion_time": "12:45", "delivery_notes": "Cedar Valley — closed early, left with neighbor", "status": "Exception", "order_ids": []}
]
```

### data/cs_issues.json
```json
[
  {"id": "issue-001", "issue_number": "CS-2025-042", "account_id": "acct-004", "category": "quality", "description": "Woodlands Hotel reports 'burnt taste' in House Blend delivery from Jan 28", "reported_by": "Angela Morris", "reported_date": "2025-01-30", "assigned_to": "emp-005", "resolution_notes": null, "resolution_date": null, "status": "Escalated to Ben", "order_id": "ord-prev-001", "delivery_id": null, "batch_id": "batch-010"},
  {"id": "issue-002", "issue_number": "CS-2025-043", "account_id": "acct-001", "category": "delivery", "description": "Mountain Lodge says Monday delivery not received at front desk", "reported_by": "Jake Rivera", "reported_date": "2025-02-03", "assigned_to": "emp-005", "resolution_notes": null, "resolution_date": null, "status": "Investigating", "order_id": "ord-001", "delivery_id": "del-005", "batch_id": null},
  {"id": "issue-003", "issue_number": "CS-2025-044", "account_id": "acct-010", "category": "order status", "description": "Smoky Mountain Inn asking about delivery ETA for this week's order", "reported_by": "Front Desk", "reported_date": "2025-02-04", "assigned_to": "emp-006", "resolution_notes": null, "resolution_date": null, "status": "Reported", "order_id": "ord-009", "delivery_id": null, "batch_id": null},
  {"id": "issue-004", "issue_number": "CS-2025-045", "account_id": "acct-015", "category": "invoice", "description": "Pisgah Provisions says January invoice amount doesn't match their PO", "reported_by": "Owner", "reported_date": "2025-02-03", "assigned_to": "emp-006", "resolution_notes": null, "resolution_date": null, "status": "Investigating", "order_id": null, "delivery_id": null, "batch_id": null},
  {"id": "issue-005", "issue_number": "CS-2025-040", "account_id": "acct-002", "category": "quality", "description": "Riverside Café noticed inconsistency in House Blend roast color — lighter than usual", "reported_by": "Sam Chen", "reported_date": "2025-01-28", "assigned_to": "emp-005", "resolution_notes": "Batch B-2025-0115 confirmed. Ben investigated — thermocouple calibration issue. Recalibrated.", "resolution_date": "2025-02-01", "status": "Closed", "order_id": null, "delivery_id": null, "batch_id": "batch-010"},
  {"id": "issue-006", "issue_number": "CS-2025-041", "account_id": "acct-008", "category": "delivery", "description": "Sunrise Bakery delivery was 30 min late — missed morning prep window", "reported_by": "Jenny Wu", "reported_date": "2025-01-29", "assigned_to": "emp-006", "resolution_notes": "Traffic delay on Patton Ave. Adjusted route timing for future. Apologized to Jenny.", "resolution_date": "2025-01-30", "status": "Closed", "order_id": null, "delivery_id": null, "batch_id": null},
  {"id": "issue-007", "issue_number": "CS-2025-046", "account_id": "acct-007", "category": "general", "description": "Appalachian Bistro asking about seasonal blend options for spring menu", "reported_by": "David Russo", "reported_date": "2025-02-04", "assigned_to": "emp-005", "resolution_notes": null, "resolution_date": null, "status": "Reported", "order_id": null, "delivery_id": null, "batch_id": null}
]
```

### data/quality_investigations.json
```json
[
  {"id": "qi-001", "investigation_number": "QI-2025-008", "linked_cs_issue": "issue-005", "linked_batches": ["batch-010"], "symptom_description": "House Blend roast color lighter than expected, Riverside Café reports inconsistency", "root_cause": "Roast temperature 8°F above profile — thermocouple calibration drift", "corrective_action": "Recalibrated thermocouple. Pulled remaining Batch B-2025-0115 inventory. Added thermocouple check to weekly PM.", "investigation_hours": 2.5, "status": "Closed"},
  {"id": "qi-002", "investigation_number": "QI-2025-009", "linked_cs_issue": "issue-001", "linked_batches": ["batch-010"], "symptom_description": "Woodlands Hotel reports 'burnt taste' in House Blend — may be same batch as QI-2025-008", "root_cause": null, "corrective_action": null, "investigation_hours": 1.0, "status": "Batch Identified"}
]
```

### data/proposals.json
```json
[
  {"id": "prop-001", "proposal_number": "P-2025-012", "account_id": "acct-021", "products_quoted": "House Blend (40 lbs/week), Colombia Single Origin (40 lbs/week)", "pricing": "House Blend $11.50/lb, Colombia $14.00/lb", "delivery_schedule": "Weekly — Thursday", "minimum_order": "40 lbs", "payment_terms": "Net 30", "created_date": "2025-01-20", "sent_date": "2025-01-22", "version": 1, "status": "Under Review"},
  {"id": "prop-002", "proposal_number": "P-2025-013", "account_id": "acct-022", "products_quoted": "Ethiopia Yirgacheffe (20 lbs/week), Breakfast Blend (30 lbs/week)", "pricing": "Ethiopia $15.50/lb, Breakfast $10.50/lb", "delivery_schedule": "Every other day", "minimum_order": "25 lbs", "payment_terms": "Net 15", "created_date": "2025-01-28", "sent_date": null, "version": 1, "status": "Draft"},
  {"id": "prop-003", "proposal_number": "P-2025-010", "account_id": "acct-020", "products_quoted": "House Blend (60 lbs/week), Dark Roast Espresso (20 lbs/week), Decaf (10 lbs/week)", "pricing": "House $11.50, Dark $12.50, Decaf $12.00", "delivery_schedule": "Every other day", "minimum_order": "30 lbs", "payment_terms": "Net 15", "created_date": "2024-12-15", "sent_date": "2024-12-18", "version": 2, "status": "Accepted"}
]
```

### data/invoices.json
```json
[
  {"id": "inv-001", "invoice_number": "INV-2025-0180", "account_id": "acct-001", "amount": 3680, "issued_date": "2025-01-31", "due_date": "2025-03-02", "payment_status": "Sent", "payment_date": null, "days_outstanding": 4},
  {"id": "inv-002", "invoice_number": "INV-2025-0181", "account_id": "acct-004", "amount": 2760, "issued_date": "2025-01-31", "due_date": "2025-03-02", "payment_status": "Sent", "payment_date": null, "days_outstanding": 4},
  {"id": "inv-003", "invoice_number": "INV-2025-0175", "account_id": "acct-010", "amount": 2070, "issued_date": "2025-01-15", "due_date": "2025-02-14", "payment_status": "Overdue", "payment_date": null, "days_outstanding": 20},
  {"id": "inv-004", "invoice_number": "INV-2025-0170", "account_id": "acct-013", "amount": 1600, "issued_date": "2025-01-01", "due_date": "2025-02-15", "payment_status": "Outstanding", "payment_date": null, "days_outstanding": 34},
  {"id": "inv-005", "invoice_number": "INV-2025-0160", "account_id": "acct-015", "amount": 1120, "issued_date": "2024-12-31", "due_date": "2025-01-30", "payment_status": "Overdue", "payment_date": null, "days_outstanding": 35},
  {"id": "inv-006", "invoice_number": "INV-2025-0155", "account_id": "acct-017", "amount": 1440, "issued_date": "2024-12-15", "due_date": "2025-01-14", "payment_status": "Paid", "payment_date": "2025-01-12", "days_outstanding": 0},
  {"id": "inv-007", "invoice_number": "INV-2025-0176", "account_id": "acct-008", "amount": 2300, "issued_date": "2025-01-15", "due_date": "2025-01-30", "payment_status": "Paid", "payment_date": "2025-01-28", "days_outstanding": 0},
  {"id": "inv-008", "invoice_number": "INV-2025-0177", "account_id": "acct-002", "amount": 960, "issued_date": "2025-01-15", "due_date": "2025-01-30", "payment_status": "Paid", "payment_date": "2025-01-29", "days_outstanding": 0},
  {"id": "inv-009", "invoice_number": "INV-2025-0182", "account_id": "acct-028", "amount": 560, "issued_date": "2025-01-31", "due_date": "2025-03-02", "payment_status": "Sent", "payment_date": null, "days_outstanding": 4},
  {"id": "inv-010", "invoice_number": "INV-2025-0165", "account_id": "acct-006", "amount": 960, "issued_date": "2024-12-31", "due_date": "2025-01-30", "payment_status": "Overdue", "payment_date": null, "days_outstanding": 35}
]
```

### data/packaging_inventory.json
```json
[
  {"id": "pkg-001", "item": "bags", "size": "12 oz", "quantity_on_hand": 2400, "reorder_point": 1000, "supplier": "Pacific Bag", "last_reorder_date": "2025-01-10", "status": "In Stock"},
  {"id": "pkg-002", "item": "bags", "size": "2 lb", "quantity_on_hand": 800, "reorder_point": 500, "supplier": "Pacific Bag", "last_reorder_date": "2025-01-10", "status": "In Stock"},
  {"id": "pkg-003", "item": "bags", "size": "5 lb", "quantity_on_hand": 350, "reorder_point": 200, "supplier": "Pacific Bag", "last_reorder_date": "2024-12-15", "status": "In Stock"},
  {"id": "pkg-004", "item": "labels", "size": "Standard", "quantity_on_hand": 150, "reorder_point": 500, "supplier": "Sticker Mule", "last_reorder_date": "2024-11-20", "status": "Low Stock"},
  {"id": "pkg-005", "item": "boxes", "size": "Shipping (12-pack)", "quantity_on_hand": 180, "reorder_point": 100, "supplier": "Uline", "last_reorder_date": "2024-12-01", "status": "In Stock"},
  {"id": "pkg-006", "item": "labels", "size": "Wholesale bulk", "quantity_on_hand": 3000, "reorder_point": 1000, "supplier": "Sticker Mule", "last_reorder_date": "2025-01-15", "status": "In Stock"}
]
```

### data/compliance_records.json
```json
[
  {"id": "comp-001", "type": "USDA organic", "certification_number": "USDA-ORG-2024-4521", "issue_date": "2024-06-15", "expiration_date": "2025-06-15", "inspector": "CCOF", "result": "Passed", "document_location": "Drive", "status": "Current"},
  {"id": "comp-002", "type": "food safety", "certification_number": "NCDA-FS-2024-8837", "issue_date": "2024-09-01", "expiration_date": "2025-09-01", "inspector": "NC Dept of Agriculture", "result": "Passed — minor finding: temperature log gaps", "document_location": "binder", "status": "Current"},
  {"id": "comp-003", "type": "facility inspection", "certification_number": "BCHD-2024-1102", "issue_date": "2024-11-02", "expiration_date": null, "inspector": "Buncombe County Health Dept", "result": "Passed", "document_location": "email", "status": "Current"}
]
```

## Data Volume Summary
- Employees: 22 (actual org chart expanded with realistic names)
- Accounts: 30 (20 active, 2 at-risk/churned, 8 pipeline prospects)
- Contacts: 11 (primary contacts for key accounts + pipeline)
- Products: 12 (mix of blends, single origins, flavored)
- Green Coffee Inventory: 8 origins
- Importers: 3
- Roast Batches: 10 (mix of completed, resting, scheduled, flagged)
- Orders: 12 (recent days, mix of statuses)
- Routes: 4
- Deliveries: 6 (today + yesterday)
- CS Issues: 7 (mix of open, investigating, escalated, closed)
- Quality Investigations: 2
- Proposals: 3
- Invoices: 10 (mix of paid, outstanding, overdue)
- Packaging Inventory: 6 items
- Compliance Records: 3
