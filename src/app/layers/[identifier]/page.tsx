import Link from "next/link";

import { ClipboardIcon } from "@/components/client/clipboard_icon";
import { InformationIcon } from "@/components/client/information_icon";
import { loadSourceData } from "@/utils/load_source_data";

type Parameters = {
  identifier: string;
};

type Props = {
  params: Promise<Parameters>;
};

export async function generateStaticParams(): Promise<Parameters[]> {
  const sourceData = await loadSourceData();
  return sourceData.identifiers.map((identifier) => {
    return {
      identifier: identifier,
    };
  });
}

export default async function LayerInfo({ params }: Props) {
  const { identifier } = await params;
  const sourceData = await loadSourceData();
  const publicLayer = sourceData.mapping[identifier];
  const layerInfo = publicLayer.latest_layers[0];
  const rows = publicLayer.latest_layers.map((item) => {
    const arch = item.architectures.join(", ");
    return (
      <tr key={`latest-layers-${item.region}-${item.runtime}-${arch}`}>
        <td>{item.region}</td>
        <td>{item.runtime}</td>
        <td>{arch}</td>
        <td>{item.layer_version_arn}</td>
        <td>
          <div className="is-flex is-justify-content-space-around">
            <ClipboardIcon value={item.layer_version_arn} />
            <InformationIcon layer={item} />
          </div>
        </td>
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
          <li>
            <Link href="/layers">Layers</Link>
          </li>
          <li className="is-active">
            <a>{identifier}</a>
          </li>
        </ul>
      </nav>
      <hr />
      <h2 className="title">{identifier}</h2>
      <h3 className="subtitle mt-5">information</h3>
      <div className="pl-5 pr-5">
        <table className="table is-fullwidth">
          <tbody>
            <tr>
              <th>packages</th>
              <td>{layerInfo.packages}</td>
            </tr>
            <tr>
              <th>created_at</th>
              <td>{layerInfo.created_at}</td>
            </tr>
            <tr>
              <th>note</th>
              <td>{layerInfo.note}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <h3 className="subtitle">Latest Layers</h3>
      <div className="pl-5 pr-5">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>region</th>
              <th>runtime</th>
              <th>arch</th>
              <th>arn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
}
