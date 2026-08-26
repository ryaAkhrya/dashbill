import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Invoice, InvoiceItem, Client } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -1,
  },
  metaLabel: {
    fontSize: 8,
    color: "#666",
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  colDescription: { flex: 5 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 2, textAlign: "right" },
  colAmount: { flex: 2, textAlign: "right" },
  colHeaderText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#666",
    textTransform: "uppercase",
  },
  totalsContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
    width: 200,
  },
  totalsLabel: {
    flex: 1,
    color: "#666",
  },
  totalsValue: {
    width: 80,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },
  totalFinal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 200,
    paddingTop: 6,
    borderTopWidth: 2,
    borderTopColor: "#000",
    marginTop: 4,
  },
  totalFinalLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  totalFinalValue: {
    width: 80,
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#999",
    fontSize: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  statusBadge: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#FBBF24",
    color: "#000",
  },
});

function formatCurrencyPDF(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function formatDatePDF(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export interface InvoicePDFDocumentProps {
  invoice: Invoice;
  client: Pick<Client, "name" | "email" | "address">;
  items: InvoiceItem[];
}

export function InvoicePDFDocument({
  invoice,
  client,
  items,
}: InvoicePDFDocumentProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );
  const total = Number(invoice.total_amount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={{ fontSize: 9, color: "#666", marginTop: 2 }}>
              #{invoice.id.slice(0, 8).toUpperCase()}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.statusBadge}>{invoice.status}</Text>
            <Text style={{ ...styles.metaLabel, marginTop: 8 }}>
              Issue Date
            </Text>
            <Text style={styles.metaValue}>
              {formatDatePDF(invoice.created_at)}
            </Text>
            <Text style={{ ...styles.metaLabel, marginTop: 4 }}>
              Due Date
            </Text>
            <Text style={styles.metaValue}>
              {formatDatePDF(invoice.due_date)}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 30, gap: 40 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>From</Text>
            <Text style={styles.clientName}>DashBill</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.clientName}>{client.name}</Text>
            <Text>{client.email}</Text>
            {client.address && (
              <Text style={{ color: "#666", marginTop: 2 }}>
                {client.address}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.colHeaderText, ...styles.colDescription }}>
              Description
            </Text>
            <Text style={{ ...styles.colHeaderText, ...styles.colQty }}>
              Qty
            </Text>
            <Text style={{ ...styles.colHeaderText, ...styles.colPrice }}>
              Price
            </Text>
            <Text style={{ ...styles.colHeaderText, ...styles.colAmount }}>
              Amount
            </Text>
          </View>
          {items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>
                {formatCurrencyPDF(Number(item.price))}
              </Text>
              <Text style={{ ...styles.colAmount, fontFamily: "Helvetica-Bold" }}>
                {formatCurrencyPDF(item.quantity * Number(item.price))}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>
              {formatCurrencyPDF(subtotal)}
            </Text>
          </View>
          {total !== subtotal && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax</Text>
              <Text style={styles.totalsValue}>
                {formatCurrencyPDF(total - subtotal)}
              </Text>
            </View>
          )}
          <View style={styles.totalFinal}>
            <Text style={styles.totalFinalLabel}>Total</Text>
            <Text style={styles.totalFinalValue}>
              {formatCurrencyPDF(total)}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Generated by DashBill &middot; Thank you for your business
        </Text>
      </Page>
    </Document>
  );
}
