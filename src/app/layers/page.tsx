import Link from "next/link";

import { LayerList } from "@/components/server/layer_list";
import { loadSourceData } from "@/utils/load_source_data";

export default async function Layers() {
  const sourceData = await loadSourceData();
  const rows = sourceData.identifiers.map((identifier) => {
    const layer = sourceData.mapping[identifier].latest_layers[0];
    return (
      <tr key={`layers-${identifier}`}>
        <td>
          <Link href={`/layers/${identifier}`}>{identifier}</Link>
        </td>
        <td>{layer.packages}</td>
        <td>{layer.note}</td>
      </tr>
    );
  });
  return (
    <>
      <nav className="breadcrumb">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="is-active">
            <a>Layers</a>
          </li>
        </ul>
      </nav>
      <hr />
      <h2 className="title">Layers</h2>
      <LayerList />
    </>
  );
}
