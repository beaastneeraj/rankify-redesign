// components/ui/ResearchFundingCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type RawTable = {
  headers: string[];
  data: Record<string, any>[];
};

type Props = {
  tables: RawTable[];
};

export default function ResearchFundingCard({ tables }: Props) {
  // find the table that lists sponsored‐projects info
  const sponsoredTable = tables.find((t) =>
    t.data.some((d) => d.financial_year === "Total no. of Sponsored Projects")
  );

  // find the table that lists consultancy info
  const consultancyTable = tables.find((t) =>
    t.data.some((d) => d.financial_year === "Total no. of Consultancy Projects")
  );

  // if neither exists, don’t render
  if (!sponsoredTable && !consultancyTable) return null;

  // pick the year column (e.g. "2022_23") dynamically from headers
  const yearColumn =
    sponsoredTable?.headers.find((h) => /^\d{4}_\d{2}$/.test(h)) ||
    consultancyTable?.headers.find((h) => /^\d{4}_\d{2}$/.test(h));

  if (!yearColumn) return null;

  // helper to pluck a row by its financial_year label
  function getCell(
    table: RawTable | undefined,
    label: string
  ): number | null {
    if (!yearColumn) return null;
    return (
      table?.data.find((d) => d.financial_year === label)?.[yearColumn] ?? null
    );
  }

  const sponsoredProjects = getCell(sponsoredTable, "Total no. of Sponsored Projects");
  const sponsoredAmount = getCell(sponsoredTable, "Total Amount Received (Amount in Rupees)");

  const consultancyProjects = getCell(consultancyTable, "Total no. of Consultancy Projects");
  const consultancyAmount = getCell(consultancyTable, "Total Amount Received (Amount in Rupees)");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Earnings</CardTitle>
        <CardDescription>
          Sponsored &amp; consultancy projects ({yearColumn.replace("_", "-")})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-1">Sponsored Projects</p>
            <p className="text-muted-foreground">
              {sponsoredProjects ?? "–"} projects
            </p>
            <p className="text-muted-foreground">
              {sponsoredAmount != null
                ? `₹${(sponsoredAmount / 1e7).toFixed(1)} Cr`
                : "–"}
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Consultancy Projects</p>
            <p className="text-muted-foreground">
              {consultancyProjects ?? "–"} projects
            </p>
            <p className="text-muted-foreground">
              {consultancyAmount != null
                ? `₹${(consultancyAmount / 1e7).toFixed(1)} Cr`
                : "–"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
