import Link from "next/link";

import { loadSourceData } from "@/utils/load_source_data";

export async function LayerList() {
  const sourceData = await loadSourceData();
  const rows = sourceData.identifiers.map((identifier) => {
    const layer = sourceData.mapping[identifier].latest_layers[0];
    return (
      <tr key={`layer-list-${identifier}`}>
        <td>
          <Link href={`/layers/${identifier}`}>{identifier}</Link>
        </td>
        <td>{layer.packages}</td>
        <td>{layer.note}</td>
      </tr>
    );
  });
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>identifier</th>
          <th>packages</th>
          <th>note</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
