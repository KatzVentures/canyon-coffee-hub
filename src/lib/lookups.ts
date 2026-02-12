import employees from "@/data/employees.json"
import accounts from "@/data/accounts.json"
import products from "@/data/products.json"
import routes from "@/data/routes.json"

export const employeeName = (id: string) =>
  employees.find((e) => e.id === id)?.name ?? id

export const accountName = (id: string) =>
  accounts.find((a) => a.id === id)?.account_name ?? id

export const productName = (id: string) =>
  products.find((p) => p.id === id)?.name ?? id

export const routeName = (id: string) =>
  routes.find((r) => r.id === id)?.route_name ?? id

export const employeeById = (id: string) =>
  employees.find((e) => e.id === id)

export const accountById = (id: string) =>
  accounts.find((a) => a.id === id)

export const productById = (id: string) =>
  products.find((p) => p.id === id)
